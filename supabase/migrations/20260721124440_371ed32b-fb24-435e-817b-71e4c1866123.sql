-- Harden referral click recording to be idempotent within a short window.
-- If the same anonymous session clicks the same code within 60s, do NOT create a duplicate click row;
-- the attribution upsert still bumps last_click_at & extends the 30-day window.
CREATE OR REPLACE FUNCTION public.resolve_referral_code(_code text, _session_id text, _source text DEFAULT NULL::text, _campaign text DEFAULT NULL::text, _ip_hash text DEFAULT NULL::text, _ua_hash text DEFAULT NULL::text, _country_code text DEFAULT NULL::text)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  rc RECORD;
  aff RECORD;
  uid UUID := auth.uid();
  recent_clicks INT;
  dedup_hit INT;
  attr_id UUID;
BEGIN
  IF _code IS NULL OR char_length(_code) NOT BETWEEN 4 AND 20 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'invalid_code');
  END IF;
  IF _session_id IS NULL OR char_length(_session_id) NOT BETWEEN 8 AND 128 THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'invalid_session');
  END IF;

  SELECT * INTO rc FROM public.referral_codes WHERE code_upper = upper(_code);
  IF NOT FOUND OR NOT rc.active OR (rc.expires_at IS NOT NULL AND rc.expires_at < now()) THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'code_unavailable');
  END IF;

  SELECT * INTO aff FROM public.affiliates WHERE id = rc.affiliate_id;
  IF NOT FOUND OR aff.status <> 'active' THEN
    RETURN jsonb_build_object('ok', false, 'reason', 'affiliate_unavailable');
  END IF;

  IF uid IS NOT NULL AND uid = aff.user_id THEN
    INSERT INTO public.affiliate_fraud_flags(affiliate_id, flag_type, severity, details)
    VALUES (aff.id, 'self_referral', 'medium', jsonb_build_object('user_id', uid));
    RETURN jsonb_build_object('ok', false, 'reason', 'self_referral');
  END IF;

  SELECT count(*) INTO recent_clicks
    FROM public.referral_clicks
    WHERE referral_code_id = rc.id
      AND anonymous_session_id = _session_id
      AND created_at > now() - INTERVAL '1 hour';
  IF recent_clicks >= 20 THEN
    INSERT INTO public.affiliate_fraud_flags(affiliate_id, flag_type, severity, details)
    VALUES (aff.id, 'click_inflation', 'low',
      jsonb_build_object('session', _session_id, 'code_id', rc.id));
    RETURN jsonb_build_object('ok', false, 'reason', 'rate_limited');
  END IF;

  -- Idempotency: skip duplicate click within a 60s window for same (session, code)
  SELECT count(*) INTO dedup_hit
    FROM public.referral_clicks
    WHERE referral_code_id = rc.id
      AND anonymous_session_id = _session_id
      AND created_at > now() - INTERVAL '60 seconds';

  IF dedup_hit = 0 THEN
    INSERT INTO public.referral_clicks(
      referral_code_id, affiliate_id, anonymous_session_id, ip_hash, ua_hash,
      country_code, source, campaign
    ) VALUES (
      rc.id, aff.id, _session_id, _ip_hash, _ua_hash, _country_code, _source, _campaign
    );
  END IF;

  INSERT INTO public.referral_attributions(
    affiliate_id, referral_code_id, anonymous_session_id, source, campaign
  ) VALUES (aff.id, rc.id, _session_id, _source, _campaign)
  ON CONFLICT (anonymous_session_id, referral_code_id) DO UPDATE
    SET last_click_at = now(),
        expires_at = now() + INTERVAL '30 days',
        updated_at = now()
  RETURNING id INTO attr_id;

  RETURN jsonb_build_object(
    'ok', true,
    'attribution_id', attr_id,
    'code', rc.code,
    'deduped', dedup_hit > 0
  );
END $function$;

-- Ensure admin approval is fully idempotent: allow re-approving an already-approved app
-- (creates missing affiliate, missing role, missing code without erroring).
CREATE OR REPLACE FUNCTION public.admin_update_application(_app_id uuid, _new_status affiliate_app_status, _notes text DEFAULT NULL::text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  app_row public.affiliate_applications%ROWTYPE;
  new_aff_id UUID;
  new_code TEXT;
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501';
  END IF;

  SELECT * INTO app_row FROM public.affiliate_applications WHERE id = _app_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'Application not found' USING ERRCODE='P0002'; END IF;

  UPDATE public.affiliate_applications
    SET status = _new_status,
        internal_notes = COALESCE(_notes, internal_notes),
        reviewed_by = auth.uid(),
        reviewed_at = now()
  WHERE id = _app_id;

  IF _new_status = 'approved' THEN
    IF app_row.user_id IS NULL THEN
      RAISE EXCEPTION 'Application has no linked user' USING ERRCODE='P0001';
    END IF;

    INSERT INTO public.affiliates(user_id, application_id, display_name, country_code)
    VALUES (app_row.user_id, app_row.id, app_row.full_name, app_row.country_code)
    ON CONFLICT (user_id) DO UPDATE
      SET status='active',
          suspended_at=NULL,
          application_id = COALESCE(public.affiliates.application_id, EXCLUDED.application_id),
          updated_at=now()
    RETURNING id INTO new_aff_id;

    IF new_aff_id IS NULL THEN
      SELECT id INTO new_aff_id FROM public.affiliates WHERE user_id = app_row.user_id;
    END IF;

    INSERT INTO public.user_roles(user_id, role) VALUES (app_row.user_id, 'affiliate')
      ON CONFLICT DO NOTHING;

    IF NOT EXISTS (SELECT 1 FROM public.referral_codes WHERE affiliate_id = new_aff_id) THEN
      new_code := public.generate_referral_code();
      INSERT INTO public.referral_codes(affiliate_id, code) VALUES (new_aff_id, new_code);
    END IF;
  END IF;

  PERFORM public.log_admin_action(
    'application_' || _new_status::text, 'affiliate_application', _app_id,
    jsonb_build_object('notes', _notes)
  );
END $function$;
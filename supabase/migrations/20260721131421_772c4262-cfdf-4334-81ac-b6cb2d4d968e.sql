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

  -- First-valid-click attribution: expires_at is fixed at initial creation and
  -- NEVER extended on subsequent clicks. last_click_at may update for reporting.
  INSERT INTO public.referral_attributions(
    affiliate_id, referral_code_id, anonymous_session_id, source, campaign
  ) VALUES (aff.id, rc.id, _session_id, _source, _campaign)
  ON CONFLICT (anonymous_session_id, referral_code_id) DO UPDATE
    SET last_click_at = now(),
        updated_at = now()
  RETURNING id INTO attr_id;

  RETURN jsonb_build_object(
    'ok', true,
    'attribution_id', attr_id,
    'code', rc.code,
    'deduped', dedup_hit > 0
  );
END $function$;
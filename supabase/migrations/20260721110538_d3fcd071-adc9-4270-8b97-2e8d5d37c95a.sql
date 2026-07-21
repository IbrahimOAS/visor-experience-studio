
-- ============ ENUMS ============
DO $$ BEGIN
  CREATE TYPE public.affiliate_app_status AS ENUM ('pending','reviewing','approved','rejected');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.affiliate_status AS ENUM ('active','suspended');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.conversion_status AS ENUM ('pending','converted','expired','void');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Add 'affiliate' to existing app_role enum if not present
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum e JOIN pg_type t ON e.enumtypid = t.oid
    WHERE t.typname = 'app_role' AND e.enumlabel = 'affiliate'
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'affiliate';
  END IF;
END $$;

-- ============ TABLES ============

-- affiliate_applications
CREATE TABLE IF NOT EXISTS public.affiliate_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 120),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  country_code TEXT NOT NULL CHECK (char_length(country_code) BETWEEN 2 AND 3),
  primary_platform TEXT NOT NULL CHECK (char_length(primary_platform) <= 60),
  profile_url TEXT NOT NULL CHECK (char_length(profile_url) <= 500),
  follower_range TEXT NOT NULL CHECK (char_length(follower_range) <= 60),
  fitness_niche TEXT NOT NULL CHECK (char_length(fitness_niche) <= 120),
  audience_countries TEXT[] NOT NULL DEFAULT '{}',
  reason TEXT NOT NULL CHECK (char_length(reason) BETWEEN 1 AND 2000),
  accepted_terms BOOLEAN NOT NULL DEFAULT FALSE,
  status public.affiliate_app_status NOT NULL DEFAULT 'pending',
  internal_notes TEXT,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.affiliate_applications TO authenticated;
GRANT ALL ON public.affiliate_applications TO service_role;
ALTER TABLE public.affiliate_applications ENABLE ROW LEVEL SECURITY;

-- affiliates
CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES public.affiliate_applications(id) ON DELETE SET NULL,
  status public.affiliate_status NOT NULL DEFAULT 'active',
  display_name TEXT,
  country_code TEXT,
  commission_model TEXT NOT NULL DEFAULT 'pending',
  approved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  suspended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.affiliates TO authenticated;
GRANT ALL ON public.affiliates TO service_role;
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

-- referral_codes
CREATE TABLE IF NOT EXISTS public.referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  code_upper TEXT GENERATED ALWAYS AS (upper(code)) STORED,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS referral_codes_code_upper_uidx ON public.referral_codes(code_upper);
GRANT SELECT ON public.referral_codes TO authenticated;
GRANT ALL ON public.referral_codes TO service_role;
ALTER TABLE public.referral_codes ENABLE ROW LEVEL SECURITY;

-- referral_clicks (no direct client access)
CREATE TABLE IF NOT EXISTS public.referral_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_code_id UUID REFERENCES public.referral_codes(id) ON DELETE SET NULL,
  affiliate_id UUID REFERENCES public.affiliates(id) ON DELETE SET NULL,
  anonymous_session_id TEXT,
  ip_hash TEXT,
  ua_hash TEXT,
  country_code TEXT,
  source TEXT,
  campaign TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.referral_clicks TO authenticated;
GRANT ALL ON public.referral_clicks TO service_role;
ALTER TABLE public.referral_clicks ENABLE ROW LEVEL SECURITY;

-- referral_attributions
CREATE TABLE IF NOT EXISTS public.referral_attributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  referral_code_id UUID NOT NULL REFERENCES public.referral_codes(id) ON DELETE CASCADE,
  anonymous_session_id TEXT NOT NULL,
  first_click_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_click_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '30 days'),
  converted_user_id UUID REFERENCES auth.users(id),
  conversion_status public.conversion_status NOT NULL DEFAULT 'pending',
  source TEXT,
  campaign TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (anonymous_session_id, referral_code_id)
);
GRANT SELECT ON public.referral_attributions TO authenticated;
GRANT ALL ON public.referral_attributions TO service_role;
ALTER TABLE public.referral_attributions ENABLE ROW LEVEL SECURITY;

-- affiliate_fraud_flags
CREATE TABLE IF NOT EXISTS public.affiliate_fraud_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID REFERENCES public.affiliates(id) ON DELETE CASCADE,
  attribution_id UUID REFERENCES public.referral_attributions(id) ON DELETE SET NULL,
  flag_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'low',
  details JSONB NOT NULL DEFAULT '{}',
  resolved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.affiliate_fraud_flags TO authenticated;
GRANT ALL ON public.affiliate_fraud_flags TO service_role;
ALTER TABLE public.affiliate_fraud_flags ENABLE ROW LEVEL SECURITY;

-- admin_audit_logs
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  details JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.admin_audit_logs TO authenticated;
GRANT ALL ON public.admin_audit_logs TO service_role;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- ============ RLS POLICIES ============

-- affiliate_applications
CREATE POLICY "own app insert" ON public.affiliate_applications
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid() AND accepted_terms = TRUE);
CREATE POLICY "own app read" ON public.affiliate_applications
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "admin/mod read all apps" ON public.affiliate_applications
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'moderator'));
CREATE POLICY "admin update apps" ON public.affiliate_applications
  FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.has_role(auth.uid(),'admin'));

-- affiliates
CREATE POLICY "own affiliate read" ON public.affiliates
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY "admin read all affiliates" ON public.affiliates
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- referral_codes
CREATE POLICY "own codes read" ON public.referral_codes
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.affiliates a
    WHERE a.id = referral_codes.affiliate_id AND a.user_id = auth.uid()
  ));
CREATE POLICY "admin codes read" ON public.referral_codes
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- referral_clicks (admin-only read)
CREATE POLICY "admin clicks read" ON public.referral_clicks
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- referral_attributions
CREATE POLICY "own affiliate attributions" ON public.referral_attributions
  FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.affiliates a
    WHERE a.id = referral_attributions.affiliate_id AND a.user_id = auth.uid()
  ));
CREATE POLICY "admin attributions read" ON public.referral_attributions
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- affiliate_fraud_flags (admin only)
CREATE POLICY "admin fraud read" ON public.affiliate_fraud_flags
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- admin_audit_logs (admin only)
CREATE POLICY "admin audit read" ON public.admin_audit_logs
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- ============ TRIGGERS: updated_at ============
CREATE TRIGGER trg_affiliate_apps_updated BEFORE UPDATE ON public.affiliate_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_affiliates_updated BEFORE UPDATE ON public.affiliates
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_referral_codes_updated BEFORE UPDATE ON public.referral_codes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_referral_attr_updated BEFORE UPDATE ON public.referral_attributions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ SERVER FUNCTIONS ============

-- Generate a random referral code (Crockford-ish base32, no ambiguous chars, 10 chars)
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  alphabet TEXT := 'ABCDEFGHJKMNPQRSTVWXYZ23456789';
  candidate TEXT;
  i INT;
  n INT;
  exists_row BOOLEAN;
BEGIN
  LOOP
    candidate := '';
    FOR i IN 1..10 LOOP
      n := (get_byte(gen_random_bytes(1), 0) % length(alphabet)) + 1;
      candidate := candidate || substr(alphabet, n, 1);
    END LOOP;
    SELECT EXISTS(SELECT 1 FROM public.referral_codes WHERE code_upper = candidate) INTO exists_row;
    EXIT WHEN NOT exists_row;
  END LOOP;
  RETURN candidate;
END $$;
REVOKE EXECUTE ON FUNCTION public.generate_referral_code() FROM PUBLIC, anon, authenticated;

-- Audit logger
CREATE OR REPLACE FUNCTION public.log_admin_action(
  _action TEXT, _target_type TEXT, _target_id UUID, _details JSONB DEFAULT '{}'::jsonb
) RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO public.admin_audit_logs(actor_id, action, target_type, target_id, details)
  VALUES (auth.uid(), _action, _target_type, _target_id, COALESCE(_details,'{}'::jsonb));
$$;
REVOKE EXECUTE ON FUNCTION public.log_admin_action(TEXT,TEXT,UUID,JSONB) FROM PUBLIC, anon, authenticated;

-- Submit affiliate application (authenticated only, rate limited)
CREATE OR REPLACE FUNCTION public.submit_affiliate_application(payload JSONB)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid UUID := auth.uid();
  recent_count INT;
  new_id UUID;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'Not authenticated' USING ERRCODE='42501'; END IF;

  -- Rate limit: max 3 applications per user per 24h
  SELECT count(*) INTO recent_count
    FROM public.affiliate_applications
    WHERE user_id = uid AND created_at > now() - INTERVAL '24 hours';
  IF recent_count >= 3 THEN
    RAISE EXCEPTION 'Too many applications. Please try again later.' USING ERRCODE='P0001';
  END IF;

  IF COALESCE((payload->>'accepted_terms')::boolean, FALSE) IS NOT TRUE THEN
    RAISE EXCEPTION 'Terms must be accepted' USING ERRCODE='22023';
  END IF;

  INSERT INTO public.affiliate_applications(
    user_id, full_name, email, country_code, primary_platform, profile_url,
    follower_range, fitness_niche, audience_countries, reason, accepted_terms
  ) VALUES (
    uid,
    payload->>'full_name',
    payload->>'email',
    payload->>'country_code',
    payload->>'primary_platform',
    payload->>'profile_url',
    payload->>'follower_range',
    payload->>'fitness_niche',
    COALESCE(ARRAY(SELECT jsonb_array_elements_text(payload->'audience_countries')), '{}'),
    payload->>'reason',
    TRUE
  ) RETURNING id INTO new_id;

  RETURN new_id;
END $$;
GRANT EXECUTE ON FUNCTION public.submit_affiliate_application(JSONB) TO authenticated;

-- Admin: mark application as reviewing / add notes
CREATE OR REPLACE FUNCTION public.admin_update_application(
  _app_id UUID, _new_status public.affiliate_app_status, _notes TEXT DEFAULT NULL
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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

  IF _new_status = 'approved' AND app_row.status <> 'approved' THEN
    IF app_row.user_id IS NULL THEN
      RAISE EXCEPTION 'Application has no linked user' USING ERRCODE='P0001';
    END IF;

    INSERT INTO public.affiliates(user_id, application_id, display_name, country_code)
    VALUES (app_row.user_id, app_row.id, app_row.full_name, app_row.country_code)
    ON CONFLICT (user_id) DO UPDATE SET status='active', suspended_at=NULL, updated_at=now()
    RETURNING id INTO new_aff_id;

    -- Grant affiliate role
    INSERT INTO public.user_roles(user_id, role) VALUES (app_row.user_id, 'affiliate')
      ON CONFLICT DO NOTHING;

    -- Ensure a starter referral code
    IF NOT EXISTS (SELECT 1 FROM public.referral_codes WHERE affiliate_id = new_aff_id) THEN
      new_code := public.generate_referral_code();
      INSERT INTO public.referral_codes(affiliate_id, code) VALUES (new_aff_id, new_code);
    END IF;
  END IF;

  PERFORM public.log_admin_action(
    'application_' || _new_status::text, 'affiliate_application', _app_id,
    jsonb_build_object('notes', _notes)
  );
END $$;
GRANT EXECUTE ON FUNCTION public.admin_update_application(UUID, public.affiliate_app_status, TEXT) TO authenticated;

-- Admin: suspend / reactivate affiliate
CREATE OR REPLACE FUNCTION public.admin_set_affiliate_status(
  _affiliate_id UUID, _status public.affiliate_status, _reason TEXT DEFAULT NULL
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501';
  END IF;
  UPDATE public.affiliates
    SET status = _status,
        suspended_at = CASE WHEN _status='suspended' THEN now() ELSE NULL END
  WHERE id = _affiliate_id;
  PERFORM public.log_admin_action(
    'affiliate_' || _status::text, 'affiliate', _affiliate_id,
    jsonb_build_object('reason', _reason)
  );
END $$;
GRANT EXECUTE ON FUNCTION public.admin_set_affiliate_status(UUID, public.affiliate_status, TEXT) TO authenticated;

-- Admin: deactivate referral code
CREATE OR REPLACE FUNCTION public.admin_set_code_active(_code_id UUID, _active BOOLEAN)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(),'admin') THEN
    RAISE EXCEPTION 'Not authorized' USING ERRCODE='42501';
  END IF;
  UPDATE public.referral_codes SET active = _active WHERE id = _code_id;
  PERFORM public.log_admin_action(
    CASE WHEN _active THEN 'code_activated' ELSE 'code_deactivated' END,
    'referral_code', _code_id, '{}'::jsonb
  );
END $$;
GRANT EXECUTE ON FUNCTION public.admin_set_code_active(UUID, BOOLEAN) TO authenticated;

-- Public: resolve referral code (creates click, upserts attribution)
CREATE OR REPLACE FUNCTION public.resolve_referral_code(
  _code TEXT,
  _session_id TEXT,
  _source TEXT DEFAULT NULL,
  _campaign TEXT DEFAULT NULL,
  _ip_hash TEXT DEFAULT NULL,
  _ua_hash TEXT DEFAULT NULL,
  _country_code TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rc RECORD;
  aff RECORD;
  uid UUID := auth.uid();
  recent_clicks INT;
  is_self BOOLEAN := FALSE;
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

  -- Self-referral check
  IF uid IS NOT NULL AND uid = aff.user_id THEN
    is_self := TRUE;
    INSERT INTO public.affiliate_fraud_flags(affiliate_id, flag_type, severity, details)
    VALUES (aff.id, 'self_referral', 'medium', jsonb_build_object('user_id', uid));
    RETURN jsonb_build_object('ok', false, 'reason', 'self_referral');
  END IF;

  -- Basic click-inflation guard: cap 20 clicks per session per code per hour
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

  INSERT INTO public.referral_clicks(
    referral_code_id, affiliate_id, anonymous_session_id, ip_hash, ua_hash,
    country_code, source, campaign
  ) VALUES (
    rc.id, aff.id, _session_id, _ip_hash, _ua_hash, _country_code, _source, _campaign
  );

  INSERT INTO public.referral_attributions(
    affiliate_id, referral_code_id, anonymous_session_id, source, campaign
  ) VALUES (aff.id, rc.id, _session_id, _source, _campaign)
  ON CONFLICT (anonymous_session_id, referral_code_id) DO UPDATE
    SET last_click_at = now(),
        expires_at = now() + INTERVAL '30 days',
        updated_at = now()
  RETURNING id INTO attr_id;

  RETURN jsonb_build_object('ok', true, 'attribution_id', attr_id, 'code', rc.code);
END $$;
GRANT EXECUTE ON FUNCTION public.resolve_referral_code(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,TEXT) TO anon, authenticated;

-- Affiliate: get own dashboard payload
CREATE OR REPLACE FUNCTION public.get_my_affiliate()
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  aff RECORD;
  codes JSONB;
  clicks_total INT;
BEGIN
  IF auth.uid() IS NULL THEN RETURN NULL; END IF;
  SELECT * INTO aff FROM public.affiliates WHERE user_id = auth.uid();
  IF NOT FOUND THEN RETURN NULL; END IF;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'id', id, 'code', code, 'active', active, 'expires_at', expires_at, 'created_at', created_at
  ) ORDER BY created_at), '[]'::jsonb) INTO codes
  FROM public.referral_codes WHERE affiliate_id = aff.id;

  SELECT count(*) INTO clicks_total FROM public.referral_clicks WHERE affiliate_id = aff.id;

  RETURN jsonb_build_object(
    'affiliate', to_jsonb(aff),
    'codes', codes,
    'clicks_total', clicks_total
  );
END $$;
GRANT EXECUTE ON FUNCTION public.get_my_affiliate() TO authenticated;

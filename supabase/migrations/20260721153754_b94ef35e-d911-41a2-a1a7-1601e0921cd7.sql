DO $$
DECLARE
  match_count INT;
  founder_id UUID;
BEGIN
  SELECT count(*) INTO match_count
  FROM auth.users
  WHERE lower(email) = lower('veyntatech@gmail.com')
    AND email_confirmed_at IS NOT NULL;

  IF match_count = 0 THEN
    RAISE EXCEPTION 'Bootstrap aborted: no confirmed user matches founder email';
  ELSIF match_count > 1 THEN
    RAISE EXCEPTION 'Bootstrap aborted: multiple users match founder email';
  END IF;

  SELECT id INTO founder_id
  FROM auth.users
  WHERE lower(email) = lower('veyntatech@gmail.com')
    AND email_confirmed_at IS NOT NULL;

  INSERT INTO public.user_roles(user_id, role)
  VALUES (founder_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;

  INSERT INTO public.admin_audit_logs(actor_id, action, target_type, target_id, details)
  VALUES (
    founder_id,
    'initial_admin_bootstrap',
    'user',
    founder_id,
    jsonb_build_object('method', 'one_time_migration', 'email', 'veyntatech@gmail.com')
  );
END $$;
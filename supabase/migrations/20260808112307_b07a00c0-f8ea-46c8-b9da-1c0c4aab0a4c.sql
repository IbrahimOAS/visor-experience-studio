-- Revoke direct API execution of SECURITY DEFINER functions.
-- None of these are invoked via client RPC; triggers and server-side code are unaffected.

REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_admin_action(text, text, uuid, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.generate_referral_code() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.prevent_profile_privilege_escalation() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.admin_set_affiliate_status(uuid, affiliate_status, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.admin_set_code_active(uuid, boolean) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.admin_update_application(uuid, affiliate_app_status, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_admin_dashboard_metrics() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_my_affiliate() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.submit_affiliate_application(jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.resolve_referral_code(text, text, text, text, text, text, text) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;
GRANT EXECUTE ON FUNCTION public.log_admin_action(text, text, uuid, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.generate_referral_code() TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_set_affiliate_status(uuid, affiliate_status, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_set_code_active(uuid, boolean) TO service_role;
GRANT EXECUTE ON FUNCTION public.admin_update_application(uuid, affiliate_app_status, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_admin_dashboard_metrics() TO service_role;
GRANT EXECUTE ON FUNCTION public.get_my_affiliate() TO service_role;
GRANT EXECUTE ON FUNCTION public.submit_affiliate_application(jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.resolve_referral_code(text, text, text, text, text, text, text) TO service_role;
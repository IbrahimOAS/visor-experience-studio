
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.prevent_profile_privilege_escalation() FROM PUBLIC, anon, authenticated;

CREATE POLICY "Admins can view payment events"
ON public.payment_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

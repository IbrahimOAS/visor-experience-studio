
-- 1. Roles infrastructure
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN null; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2. Admin SELECT policy for coach_applications
DROP POLICY IF EXISTS "Admins can view coach applications" ON public.coach_applications;
CREATE POLICY "Admins can view coach applications"
  ON public.coach_applications FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Tighten permissive INSERT policies (replace WITH CHECK (true) with basic bounds)
DROP POLICY IF EXISTS "Anyone can submit a coach application" ON public.coach_applications;
CREATE POLICY "Anyone can submit a coach application"
  ON public.coach_applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(country) BETWEEN 1 AND 100
    AND length(city) BETWEEN 1 AND 100
    AND length(specialization) BETWEEN 1 AND 200
    AND (message IS NULL OR length(message) <= 5000)
    AND (phone IS NULL OR length(phone) <= 50)
    AND (website IS NULL OR length(website) <= 500)
    AND (certification IS NULL OR length(certification) <= 500)
    AND status = 'new'
  );

DROP POLICY IF EXISTS "Anyone can submit a support request" ON public.support_submissions;
CREATE POLICY "Anyone can submit a support request"
  ON public.support_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(full_name) BETWEEN 1 AND 200
    AND length(email) BETWEEN 3 AND 320
    AND length(topic) BETWEEN 1 AND 200
    AND length(message) BETWEEN 1 AND 10000
    AND (company IS NULL OR length(company) <= 200)
    AND (phone IS NULL OR length(phone) <= 50)
    AND status = 'new'
  );

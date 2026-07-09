
CREATE TABLE public.coach_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  specialization TEXT NOT NULL,
  years_experience INTEGER,
  certification TEXT,
  website TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.coach_applications TO anon, authenticated;
GRANT SELECT ON public.coach_applications TO authenticated;
GRANT ALL ON public.coach_applications TO service_role;

ALTER TABLE public.coach_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a coach application"
  ON public.coach_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_coach_applications_updated_at
BEFORE UPDATE ON public.coach_applications
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

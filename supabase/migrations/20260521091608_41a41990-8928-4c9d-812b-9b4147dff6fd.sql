
CREATE TABLE public.ambassador_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT NOT NULL,
  city TEXT,
  role_type TEXT NOT NULL,
  region TEXT,
  institution TEXT,
  year_of_study TEXT,
  community_name TEXT,
  profession TEXT,
  age_range TEXT,
  languages TEXT,
  social_handles TEXT,
  time_commitment TEXT,
  leadership_experience TEXT,
  motivation TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.ambassador_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit ambassador application"
  ON public.ambassador_applications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view ambassador applications"
  ON public.ambassador_applications FOR SELECT
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update ambassador applications"
  ON public.ambassador_applications FOR UPDATE
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete ambassador applications"
  ON public.ambassador_applications FOR DELETE
  USING (public.is_admin(auth.uid()));

CREATE TRIGGER update_ambassador_applications_updated_at
  BEFORE UPDATE ON public.ambassador_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


CREATE TABLE public.vacancy_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT,
  preferred_division TEXT NOT NULL,
  preferred_role TEXT NOT NULL,
  application_type TEXT NOT NULL,
  weekly_availability TEXT NOT NULL,
  relevant_experience TEXT NOT NULL,
  tools TEXT,
  portfolio_url TEXT,
  short_intro TEXT NOT NULL,
  motivation TEXT NOT NULL,
  cv_path TEXT NOT NULL,
  portfolio_file_path TEXT,
  consent_code_of_conduct BOOLEAN NOT NULL DEFAULT false,
  consent_safeguarding BOOLEAN NOT NULL DEFAULT false,
  consent_data_privacy BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.vacancy_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.vacancy_applications TO authenticated;
GRANT ALL ON public.vacancy_applications TO service_role;

ALTER TABLE public.vacancy_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a vacancy application"
  ON public.vacancy_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    consent_code_of_conduct = true
    AND consent_safeguarding = true
    AND consent_data_privacy = true
  );

CREATE POLICY "Admins can view vacancy applications"
  ON public.vacancy_applications
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update vacancy applications"
  ON public.vacancy_applications
  FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete vacancy applications"
  ON public.vacancy_applications
  FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE TRIGGER update_vacancy_applications_updated_at
  BEFORE UPDATE ON public.vacancy_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage policies for vacancy-applications bucket
CREATE POLICY "Anyone can upload vacancy application files"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'vacancy-applications');

CREATE POLICY "Admins can read vacancy application files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'vacancy-applications' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete vacancy application files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'vacancy-applications' AND public.is_admin(auth.uid()));

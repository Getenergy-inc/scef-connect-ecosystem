ALTER TABLE public.vacancy_applications
  ADD COLUMN IF NOT EXISTS reference_number text;

CREATE UNIQUE INDEX IF NOT EXISTS vacancy_applications_reference_number_key
  ON public.vacancy_applications (reference_number)
  WHERE reference_number IS NOT NULL;
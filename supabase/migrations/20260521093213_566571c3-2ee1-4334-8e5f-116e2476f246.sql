-- Waitlist applications table
CREATE TABLE public.waitlist_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  city TEXT,
  age_range TEXT,
  gender TEXT,
  applicant_type TEXT NOT NULL,
  program_interest TEXT NOT NULL,
  preferred_african_region TEXT,
  motivation TEXT,
  skills_background TEXT,
  local_chapter_status TEXT,
  referral_source TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT waitlist_applications_status_check CHECK (status IN ('new','reviewed','shortlisted','accepted','rejected','waitlisted')),
  CONSTRAINT waitlist_applications_consent_check CHECK (consent = true)
);

CREATE INDEX idx_waitlist_applications_status ON public.waitlist_applications(status);
CREATE INDEX idx_waitlist_applications_program ON public.waitlist_applications(program_interest);
CREATE INDEX idx_waitlist_applications_country ON public.waitlist_applications(country);
CREATE INDEX idx_waitlist_applications_created_at ON public.waitlist_applications(created_at DESC);

ALTER TABLE public.waitlist_applications ENABLE ROW LEVEL SECURITY;

-- Anyone (incl. anonymous) may submit
CREATE POLICY "Anyone can submit waitlist application"
ON public.waitlist_applications
FOR INSERT
WITH CHECK (consent = true);

-- Only admins can read
CREATE POLICY "Admins can view all waitlist applications"
ON public.waitlist_applications
FOR SELECT
USING (public.is_admin(auth.uid()));

-- Only admins can update
CREATE POLICY "Admins can update waitlist applications"
ON public.waitlist_applications
FOR UPDATE
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Only admins can delete
CREATE POLICY "Admins can delete waitlist applications"
ON public.waitlist_applications
FOR DELETE
USING (public.is_admin(auth.uid()));

-- Timestamp trigger
CREATE TRIGGER trg_waitlist_applications_updated_at
BEFORE UPDATE ON public.waitlist_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Stamp reviewer when status changes off 'new'
CREATE OR REPLACE FUNCTION public.stamp_waitlist_application_review()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status AND NEW.status <> 'new' THEN
    NEW.reviewed_at := now();
    NEW.reviewed_by := COALESCE(NEW.reviewed_by, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_waitlist_applications_review
BEFORE UPDATE ON public.waitlist_applications
FOR EACH ROW
EXECUTE FUNCTION public.stamp_waitlist_application_review();
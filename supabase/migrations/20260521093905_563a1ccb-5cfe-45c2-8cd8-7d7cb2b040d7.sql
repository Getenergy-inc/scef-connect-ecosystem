CREATE TABLE public.vocational_scholarship_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  state_region TEXT NOT NULL,
  preferred_african_region TEXT NOT NULL,
  age_range TEXT NOT NULL,
  training_category TEXT NOT NULL,
  education_level TEXT NOT NULL,
  employment_status TEXT NOT NULL,
  why_scholarship TEXT NOT NULL,
  community_impact TEXT NOT NULL,
  is_scef_member BOOLEAN NOT NULL DEFAULT false,
  chapter_connection TEXT,
  scholarship_need TEXT NOT NULL,
  consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.vocational_scholarship_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit vocational scholarship application"
ON public.vocational_scholarship_waitlist
FOR INSERT
WITH CHECK (consent = true);

CREATE POLICY "Admins can view vocational scholarship applications"
ON public.vocational_scholarship_waitlist
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update vocational scholarship applications"
ON public.vocational_scholarship_waitlist
FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete vocational scholarship applications"
ON public.vocational_scholarship_waitlist
FOR DELETE
USING (public.is_admin(auth.uid()));

CREATE TRIGGER update_vocational_scholarship_waitlist_updated_at
BEFORE UPDATE ON public.vocational_scholarship_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER stamp_vocational_scholarship_review
BEFORE UPDATE ON public.vocational_scholarship_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.stamp_waitlist_application_review();

CREATE INDEX idx_vocational_scholarship_region ON public.vocational_scholarship_waitlist(preferred_african_region);
CREATE INDEX idx_vocational_scholarship_category ON public.vocational_scholarship_waitlist(training_category);
CREATE INDEX idx_vocational_scholarship_status ON public.vocational_scholarship_waitlist(status);
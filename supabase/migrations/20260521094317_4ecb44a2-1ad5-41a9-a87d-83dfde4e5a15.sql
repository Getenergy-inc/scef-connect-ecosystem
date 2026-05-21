CREATE TABLE public.capacity_training_waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  region_state TEXT NOT NULL,
  applicant_category TEXT NOT NULL,
  training_area TEXT NOT NULL,
  delivery_preference TEXT NOT NULL,
  applying_as TEXT NOT NULL,
  organization_name TEXT,
  why_training TEXT NOT NULL,
  knowledge_application TEXT NOT NULL,
  is_scef_member BOOLEAN NOT NULL DEFAULT false,
  consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.capacity_training_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit capacity training application"
ON public.capacity_training_waitlist
FOR INSERT
WITH CHECK (consent = true);

CREATE POLICY "Admins can view capacity training applications"
ON public.capacity_training_waitlist
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update capacity training applications"
ON public.capacity_training_waitlist
FOR UPDATE
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete capacity training applications"
ON public.capacity_training_waitlist
FOR DELETE
USING (public.is_admin(auth.uid()));

CREATE TRIGGER update_capacity_training_waitlist_updated_at
BEFORE UPDATE ON public.capacity_training_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER stamp_capacity_training_review
BEFORE UPDATE ON public.capacity_training_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.stamp_waitlist_application_review();

CREATE INDEX idx_capacity_training_area ON public.capacity_training_waitlist(training_area);
CREATE INDEX idx_capacity_training_category ON public.capacity_training_waitlist(applicant_category);
CREATE INDEX idx_capacity_training_country ON public.capacity_training_waitlist(country);
CREATE INDEX idx_capacity_training_status ON public.capacity_training_waitlist(status);
CREATE TABLE public.green_horizon_waitlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Nigeria',
  state TEXT,
  lga_community TEXT,
  applicant_type TEXT NOT NULL,
  located_in_borno BOOLEAN NOT NULL DEFAULT false,
  farming_experience TEXT,
  permaculture_interest BOOLEAN NOT NULL DEFAULT false,
  available_practical_training BOOLEAN NOT NULL DEFAULT false,
  support_needed TEXT[] NOT NULL DEFAULT '{}',
  motivation TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT green_horizon_status_check CHECK (status IN ('new','reviewed','shortlisted','accepted','rejected','waitlisted')),
  CONSTRAINT green_horizon_consent_check CHECK (consent = true),
  CONSTRAINT green_horizon_farming_exp_check CHECK (farming_experience IS NULL OR farming_experience IN ('yes','no','some'))
);

CREATE INDEX idx_green_horizon_status ON public.green_horizon_waitlist(status);
CREATE INDEX idx_green_horizon_created_at ON public.green_horizon_waitlist(created_at DESC);
CREATE INDEX idx_green_horizon_borno ON public.green_horizon_waitlist(located_in_borno);

ALTER TABLE public.green_horizon_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit green horizon waitlist"
ON public.green_horizon_waitlist
FOR INSERT
WITH CHECK (consent = true);

CREATE POLICY "Admins can view green horizon waitlist"
ON public.green_horizon_waitlist
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update green horizon waitlist"
ON public.green_horizon_waitlist
FOR UPDATE
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete green horizon waitlist"
ON public.green_horizon_waitlist
FOR DELETE
USING (public.is_admin(auth.uid()));

CREATE TRIGGER trg_green_horizon_waitlist_updated_at
BEFORE UPDATE ON public.green_horizon_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_green_horizon_waitlist_review
BEFORE UPDATE ON public.green_horizon_waitlist
FOR EACH ROW
EXECUTE FUNCTION public.stamp_waitlist_application_review();
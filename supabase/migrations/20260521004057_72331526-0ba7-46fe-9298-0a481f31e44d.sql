
-- Status workflow + admin notes for waitlist submissions
ALTER TABLE public.waitlist_submissions
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS reviewed_by UUID,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;

-- Normalize default to workflow term
ALTER TABLE public.waitlist_submissions
  ALTER COLUMN submission_status SET DEFAULT 'new';

-- Backfill: treat legacy 'submitted' as 'new'
UPDATE public.waitlist_submissions
  SET submission_status = 'new'
  WHERE submission_status IN ('submitted', '') OR submission_status IS NULL;

-- Enforce allowed statuses via validation trigger (avoid CHECK constraint rigidity)
CREATE OR REPLACE FUNCTION public.validate_waitlist_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.submission_status NOT IN ('new', 'reviewed', 'accepted', 'rejected') THEN
    RAISE EXCEPTION 'Invalid submission_status: %', NEW.submission_status;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_validate_waitlist_status ON public.waitlist_submissions;
CREATE TRIGGER trg_validate_waitlist_status
  BEFORE INSERT OR UPDATE ON public.waitlist_submissions
  FOR EACH ROW EXECUTE FUNCTION public.validate_waitlist_status();

-- Allow admins to update status / notes
DROP POLICY IF EXISTS "Admins can update waitlist submissions" ON public.waitlist_submissions;
CREATE POLICY "Admins can update waitlist submissions"
  ON public.waitlist_submissions
  FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

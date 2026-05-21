-- Attach validation trigger to enforce allowed status values
DROP TRIGGER IF EXISTS validate_waitlist_status_trigger ON public.waitlist_submissions;
CREATE TRIGGER validate_waitlist_status_trigger
BEFORE INSERT OR UPDATE ON public.waitlist_submissions
FOR EACH ROW
EXECUTE FUNCTION public.validate_waitlist_status();

-- Auto-stamp reviewed_at / reviewed_by when admin changes status away from 'new'
CREATE OR REPLACE FUNCTION public.stamp_waitlist_review()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.submission_status IS DISTINCT FROM OLD.submission_status
     AND NEW.submission_status <> 'new' THEN
    NEW.reviewed_at := now();
    NEW.reviewed_by := COALESCE(NEW.reviewed_by, auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS stamp_waitlist_review_trigger ON public.waitlist_submissions;
CREATE TRIGGER stamp_waitlist_review_trigger
BEFORE UPDATE ON public.waitlist_submissions
FOR EACH ROW
EXECUTE FUNCTION public.stamp_waitlist_review();
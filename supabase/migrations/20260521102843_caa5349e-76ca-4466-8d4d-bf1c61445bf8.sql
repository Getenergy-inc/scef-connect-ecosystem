CREATE OR REPLACE FUNCTION public.validate_waitlist_status()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  IF NEW.submission_status NOT IN ('new', 'reviewed', 'shortlisted', 'accepted', 'rejected', 'waitlisted') THEN
    RAISE EXCEPTION 'Invalid submission_status: %', NEW.submission_status;
  END IF;
  RETURN NEW;
END;
$function$;
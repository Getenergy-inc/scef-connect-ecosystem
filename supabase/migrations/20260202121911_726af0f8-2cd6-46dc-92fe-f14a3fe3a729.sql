-- Create a function to clean up old partnership inquiries (data retention policy)
-- Inquiries older than 1 year will be automatically eligible for cleanup
-- This function can be called periodically via a cron job or edge function

CREATE OR REPLACE FUNCTION public.cleanup_old_partnership_inquiries()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count integer;
BEGIN
  -- Delete inquiries that are:
  -- 1. Older than 1 year AND
  -- 2. Have been processed (status is not 'pending')
  DELETE FROM public.partnership_inquiries
  WHERE created_at < NOW() - INTERVAL '1 year'
    AND status != 'pending'
  RETURNING 1 INTO deleted_count;
  
  -- Get actual count
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  -- Log the cleanup action
  IF deleted_count > 0 THEN
    PERFORM public.log_audit(
      'cleanup',
      'partnership_inquiries',
      gen_random_uuid(),
      NULL,
      jsonb_build_object('deleted_count', deleted_count),
      NULL
    );
  END IF;
  
  RETURN deleted_count;
END;
$$;

-- Grant execute permission to service role (for edge function use)
GRANT EXECUTE ON FUNCTION public.cleanup_old_partnership_inquiries() TO service_role;

-- Add a comment explaining the data retention policy
COMMENT ON FUNCTION public.cleanup_old_partnership_inquiries() IS 
'Data retention policy: Automatically cleans up processed partnership inquiries older than 1 year. 
Run periodically via scheduled edge function or cron job to maintain GDPR/data privacy compliance.';
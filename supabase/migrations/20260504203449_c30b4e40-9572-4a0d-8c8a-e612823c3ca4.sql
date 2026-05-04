
REVOKE ALL ON FUNCTION public.generate_receipt_number() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.generate_badge_code(TEXT) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.generate_receipt_number() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.generate_badge_code(TEXT) TO authenticated, service_role;

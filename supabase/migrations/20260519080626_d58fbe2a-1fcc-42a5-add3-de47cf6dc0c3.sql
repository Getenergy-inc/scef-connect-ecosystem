CREATE POLICY "Admins can view waitlist submissions"
  ON public.waitlist_submissions
  FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));
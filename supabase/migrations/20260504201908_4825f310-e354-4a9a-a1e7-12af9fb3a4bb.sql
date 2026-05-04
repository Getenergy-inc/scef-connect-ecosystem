
-- Create buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('profile-photos', 'profile-photos', true),
  ('contributor-photos', 'contributor-photos', true),
  ('certificates', 'certificates', true),
  ('media-uploads', 'media-uploads', true),
  ('receipts', 'receipts', false),
  ('school-documents', 'school-documents', false),
  ('chapter-documents', 'chapter-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Public buckets: anyone can read
CREATE POLICY "Public read profile-photos" ON storage.objects FOR SELECT USING (bucket_id = 'profile-photos');
CREATE POLICY "Public read contributor-photos" ON storage.objects FOR SELECT USING (bucket_id = 'contributor-photos');
CREATE POLICY "Public read certificates" ON storage.objects FOR SELECT USING (bucket_id = 'certificates');
CREATE POLICY "Public read media-uploads" ON storage.objects FOR SELECT USING (bucket_id = 'media-uploads');

-- Authenticated users upload to own folder (path prefix = their uid)
CREATE POLICY "Users upload own profile-photos" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users update own profile-photos" ON storage.objects FOR UPDATE
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users delete own profile-photos" ON storage.objects FOR DELETE
  USING (bucket_id = 'profile-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own contributor-photos" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'contributor-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users update own contributor-photos" ON storage.objects FOR UPDATE
  USING (bucket_id = 'contributor-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users upload own school-documents" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'school-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users view own school-documents" ON storage.objects FOR SELECT
  USING (bucket_id = 'school-documents' AND (auth.uid()::text = (storage.foldername(name))[1] OR is_admin(auth.uid())));

CREATE POLICY "Users upload own chapter-documents" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'chapter-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users view own chapter-documents" ON storage.objects FOR SELECT
  USING (bucket_id = 'chapter-documents' AND (auth.uid()::text = (storage.foldername(name))[1] OR is_admin(auth.uid())));

-- Receipts: owner reads, only system writes (admins/edge functions via service role)
CREATE POLICY "Users view own receipts" ON storage.objects FOR SELECT
  USING (bucket_id = 'receipts' AND (auth.uid()::text = (storage.foldername(name))[1] OR is_admin(auth.uid())));

-- Media uploads: authenticated users can upload (moderated downstream)
CREATE POLICY "Authenticated upload media" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media-uploads' AND auth.uid() IS NOT NULL);

-- Certificates: only admins/system write
CREATE POLICY "Admins manage certificates" ON storage.objects FOR ALL
  USING (bucket_id = 'certificates' AND is_admin(auth.uid()))
  WITH CHECK (bucket_id = 'certificates' AND is_admin(auth.uid()));

-- Admins manage all
CREATE POLICY "Admins manage all storage" ON storage.objects FOR ALL
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

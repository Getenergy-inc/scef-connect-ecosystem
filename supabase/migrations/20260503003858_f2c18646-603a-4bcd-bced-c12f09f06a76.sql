-- Private storage bucket for scholarship application documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('scholarship-docs', 'scholarship-docs', false)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for scholarship-docs bucket
-- Folder convention: {user_id}/{filename}

CREATE POLICY "Users can upload own scholarship docs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'scholarship-docs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can view own scholarship docs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'scholarship-docs'
  AND (auth.uid()::text = (storage.foldername(name))[1] OR is_admin(auth.uid()))
);

CREATE POLICY "Users can update own scholarship docs"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'scholarship-docs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete own scholarship docs before review"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'scholarship-docs'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins manage all scholarship docs"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'scholarship-docs' AND is_admin(auth.uid()))
WITH CHECK (bucket_id = 'scholarship-docs' AND is_admin(auth.uid()));

-- Helpful index for scholarship applications lookup
CREATE INDEX IF NOT EXISTS idx_applications_user_type
  ON public.applications (user_id, application_type, submitted_at DESC);
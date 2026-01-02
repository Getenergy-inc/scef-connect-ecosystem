-- Create storage bucket for eLibrary resources
INSERT INTO storage.buckets (id, name, public)
VALUES ('elibrary', 'elibrary', true);

-- Allow anyone to view files (for published resources)
CREATE POLICY "Public can view eLibrary files"
ON storage.objects FOR SELECT
USING (bucket_id = 'elibrary');

-- Allow admins to upload files
CREATE POLICY "Admins can upload eLibrary files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'elibrary' 
  AND is_admin(auth.uid())
);

-- Allow admins to update files
CREATE POLICY "Admins can update eLibrary files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'elibrary' 
  AND is_admin(auth.uid())
);

-- Allow admins to delete files
CREATE POLICY "Admins can delete eLibrary files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'elibrary' 
  AND is_admin(auth.uid())
);
-- Media contributor submissions
CREATE TABLE public.media_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  contributor_name TEXT NOT NULL,
  contributor_email TEXT NOT NULL,
  organization TEXT,
  category TEXT NOT NULL,
  program TEXT,
  year TEXT,
  location TEXT,
  caption TEXT NOT NULL,
  story TEXT,
  photo_url TEXT NOT NULL,
  photo_alt TEXT,
  consent_publish BOOLEAN NOT NULL DEFAULT false,
  consent_accuracy BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  reviewer_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT media_submissions_status_check
    CHECK (status IN ('pending','approved','rejected','archived')),
  CONSTRAINT media_submissions_email_format
    CHECK (contributor_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  CONSTRAINT media_submissions_lengths
    CHECK (
      length(contributor_name) BETWEEN 1 AND 200
      AND length(caption) BETWEEN 1 AND 300
      AND length(COALESCE(story,'')) <= 5000
      AND length(COALESCE(organization,'')) <= 200
      AND length(COALESCE(location,'')) <= 200
    )
);

ALTER TABLE public.media_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit (must give both consents)
CREATE POLICY "Anyone can submit media"
ON public.media_submissions
FOR INSERT
WITH CHECK (
  consent_publish = true
  AND consent_accuracy = true
  AND status = 'pending'
);

-- Approved submissions are publicly readable
CREATE POLICY "Approved submissions are public"
ON public.media_submissions
FOR SELECT
USING (status = 'approved');

-- Owners can view their own submissions (any status)
CREATE POLICY "Owners view own submissions"
ON public.media_submissions
FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

-- Admins manage everything
CREATE POLICY "Admins manage all submissions"
ON public.media_submissions
FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Timestamps trigger
CREATE TRIGGER update_media_submissions_updated_at
BEFORE UPDATE ON public.media_submissions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_media_submissions_user ON public.media_submissions(user_id);
CREATE INDEX idx_media_submissions_status ON public.media_submissions(status);
CREATE INDEX idx_media_submissions_category ON public.media_submissions(category);

-- Storage policies for the existing public 'media-uploads' bucket
CREATE POLICY "Public can read media-uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'media-uploads');

CREATE POLICY "Anyone can upload to media-uploads/submissions"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media-uploads'
  AND (storage.foldername(name))[1] = 'submissions'
);

CREATE POLICY "Admins manage media-uploads"
ON storage.objects FOR ALL
USING (bucket_id = 'media-uploads' AND public.is_admin(auth.uid()))
WITH CHECK (bucket_id = 'media-uploads' AND public.is_admin(auth.uid()));
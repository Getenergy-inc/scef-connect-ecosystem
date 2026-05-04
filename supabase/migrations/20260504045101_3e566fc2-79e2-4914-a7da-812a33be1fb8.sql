-- ========== Hall of Fame & Appreciation Wall ==========

CREATE TABLE public.hall_of_fame_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NULL,
  slug TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  photo_url TEXT,
  role TEXT NOT NULL,
  contribution_type TEXT,
  year_start INTEGER,
  year_end INTEGER,
  program_supported TEXT,
  country TEXT,
  region TEXT,
  contribution_summary TEXT,
  testimony TEXT,
  badge TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  consent_public_display BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'pending',
  social_links JSONB DEFAULT '{}'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  submitted_email TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_hof_status ON public.hall_of_fame_profiles(status);
CREATE INDEX idx_hof_featured ON public.hall_of_fame_profiles(is_featured) WHERE is_featured = true;
CREATE INDEX idx_hof_year ON public.hall_of_fame_profiles(year_start);
CREATE INDEX idx_hof_country ON public.hall_of_fame_profiles(country);
CREATE INDEX idx_hof_program ON public.hall_of_fame_profiles(program_supported);

ALTER TABLE public.hall_of_fame_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Approved profiles are public"
ON public.hall_of_fame_profiles FOR SELECT
USING (status = 'approved' AND consent_public_display = true);

CREATE POLICY "Owners can view their own profile"
ON public.hall_of_fame_profiles FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.hall_of_fame_profiles FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can submit a profile"
ON public.hall_of_fame_profiles FOR INSERT
WITH CHECK (
  status = 'pending'
  AND length(full_name) BETWEEN 1 AND 200
  AND (submitted_email IS NULL OR submitted_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
  AND length(COALESCE(testimony, '')) <= 5000
  AND length(COALESCE(contribution_summary, '')) <= 2000
);

CREATE POLICY "Owners can update own pending profile"
ON public.hall_of_fame_profiles FOR UPDATE
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id AND status = 'pending')
WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Admins manage all profiles"
ON public.hall_of_fame_profiles FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

CREATE TRIGGER update_hof_profiles_updated_at
BEFORE UPDATE ON public.hall_of_fame_profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Media uploads attached to a profile
CREATE TABLE public.hall_of_fame_media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.hall_of_fame_profiles(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT NOT NULL DEFAULT 'image',
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_hof_media_profile ON public.hall_of_fame_media(profile_id);

ALTER TABLE public.hall_of_fame_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Media of approved profiles is public"
ON public.hall_of_fame_media FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.hall_of_fame_profiles p
  WHERE p.id = profile_id AND p.status = 'approved' AND p.consent_public_display = true
));

CREATE POLICY "Owners view own media"
ON public.hall_of_fame_media FOR SELECT
USING (EXISTS (
  SELECT 1 FROM public.hall_of_fame_profiles p
  WHERE p.id = profile_id AND p.user_id = auth.uid()
));

CREATE POLICY "Admins view all media"
ON public.hall_of_fame_media FOR SELECT
USING (is_admin(auth.uid()));

CREATE POLICY "Anyone can attach media to a profile"
ON public.hall_of_fame_media FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.hall_of_fame_profiles p
    WHERE p.id = profile_id AND (p.status = 'pending' OR p.user_id = auth.uid() OR is_admin(auth.uid()))
  )
);

CREATE POLICY "Admins manage all media"
ON public.hall_of_fame_media FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Storage bucket for Hall of Fame media (public)
INSERT INTO storage.buckets (id, name, public) VALUES ('hall-of-fame', 'hall-of-fame', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read hall-of-fame media"
ON storage.objects FOR SELECT
USING (bucket_id = 'hall-of-fame');

CREATE POLICY "Anyone can upload hall-of-fame media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'hall-of-fame');

CREATE POLICY "Admins can update hall-of-fame media"
ON storage.objects FOR UPDATE
USING (bucket_id = 'hall-of-fame' AND is_admin(auth.uid()));

CREATE POLICY "Admins can delete hall-of-fame media"
ON storage.objects FOR DELETE
USING (bucket_id = 'hall-of-fame' AND is_admin(auth.uid()));
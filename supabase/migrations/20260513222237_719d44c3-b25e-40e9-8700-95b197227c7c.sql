
CREATE TABLE public.monthly_program_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  program_slug TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('brief','regional_report')),
  title TEXT NOT NULL,
  region TEXT,
  country TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_size INTEGER,
  is_published BOOLEAN NOT NULL DEFAULT true,
  uploaded_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_mpa_slug ON public.monthly_program_assets(program_slug);

ALTER TABLE public.monthly_program_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published assets are public"
ON public.monthly_program_assets FOR SELECT
USING (is_published = true OR public.is_admin(auth.uid()));

CREATE POLICY "Admins manage assets"
ON public.monthly_program_assets FOR ALL
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE TRIGGER trg_mpa_updated_at
BEFORE UPDATE ON public.monthly_program_assets
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO storage.buckets (id, name, public)
VALUES ('monthly-program-assets', 'monthly-program-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read monthly program assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'monthly-program-assets');

CREATE POLICY "Admins upload monthly program assets"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'monthly-program-assets' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins update monthly program assets"
ON storage.objects FOR UPDATE
USING (bucket_id = 'monthly-program-assets' AND public.is_admin(auth.uid()));

CREATE POLICY "Admins delete monthly program assets"
ON storage.objects FOR DELETE
USING (bucket_id = 'monthly-program-assets' AND public.is_admin(auth.uid()));

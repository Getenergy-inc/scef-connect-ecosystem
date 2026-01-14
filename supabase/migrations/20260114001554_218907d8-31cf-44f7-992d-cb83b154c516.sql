-- Create CRS Partners table
CREATE TABLE public.crs_partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  acronym TEXT,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  service_description TEXT NOT NULL,
  partner_since INTEGER NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.crs_partners ENABLE ROW LEVEL SECURITY;

-- Public can view active CRS partners
CREATE POLICY "CRS partners are publicly readable"
ON public.crs_partners
FOR SELECT
USING (is_active = true);

-- Admins can manage CRS partners
CREATE POLICY "Admins can manage CRS partners"
ON public.crs_partners
FOR ALL
USING (EXISTS (
  SELECT 1 FROM user_roles
  WHERE user_roles.user_id = auth.uid()
  AND user_roles.role IN ('admin', 'super_admin', 'hq_admin')
));

-- Add updated_at trigger
CREATE TRIGGER update_crs_partners_updated_at
BEFORE UPDATE ON public.crs_partners
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial data
INSERT INTO public.crs_partners (name, acronym, logo_url, service_description, partner_since, website_url, display_order)
VALUES 
  ('PancoKrato Integrated Services', 'PKIS', '/assets/partners/pkis-logo.jpg', 'Operations & Administration', 2005, 'https://pancokrato.com', 1),
  ('GetEnergy.ng', NULL, '/assets/partners/getenergy-logo.jpg', 'Energy Trading Services', 2024, 'https://getenergy.ng', 2);
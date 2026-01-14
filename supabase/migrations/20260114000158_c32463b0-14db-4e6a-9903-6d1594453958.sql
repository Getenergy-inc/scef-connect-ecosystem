-- Create endorsements table for CMS-managed partner endorsements
CREATE TABLE public.endorsements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  acronym TEXT,
  logo_url TEXT NOT NULL,
  website_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.endorsements ENABLE ROW LEVEL SECURITY;

-- Public read access for endorsements
CREATE POLICY "Endorsements are publicly readable"
ON public.endorsements
FOR SELECT
USING (is_active = true);

-- Admin write access
CREATE POLICY "Admins can manage endorsements"
ON public.endorsements
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'super_admin', 'hq_admin')
  )
);

-- Trigger for updated_at
CREATE TRIGGER update_endorsements_updated_at
BEFORE UPDATE ON public.endorsements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial endorsements
INSERT INTO public.endorsements (name, acronym, logo_url, website_url, description, display_order) VALUES
('Civil Society Action Coalition on Education For All', 'CSACEFA', '/assets/endorsements/csacefa-logo.jpg', 'https://csacefa.org', 'Nigerian coalition advocating for quality education access', 1),
('Forum for African Women Educationalists - Kenya Chapter', 'FAWE Kenya', '/assets/endorsements/fawe-logo.jpg', 'https://fawe.org', 'Pan-African NGO promoting girls'' and women''s education', 2);
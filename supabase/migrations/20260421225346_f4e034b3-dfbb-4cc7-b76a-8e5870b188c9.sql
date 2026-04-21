-- Seed master taxonomy: services
INSERT INTO public.services (slug, name, category, display_order) VALUES
  ('scholarships', 'Scholarships & Learner Support', 'support', 1),
  ('rmsa', 'School Infrastructure / RMSA', 'infrastructure', 2),
  ('women-girls', 'Women & Girls Education', 'inclusion', 3),
  ('special-needs', 'Special Needs Education', 'inclusion', 4),
  ('eoa', 'Digital Learning / EOA', 'digital', 5),
  ('elibrary', 'eLibrary / Knowledge Access', 'digital', 6),
  ('nesa', 'NESA / Recognition & Awards', 'recognition', 7),
  ('tvet', 'TVET / Skills Development', 'skills', 8),
  ('media', 'Media & Advocacy', 'advocacy', 9),
  ('chapters', 'Local Chapters', 'community', 10),
  ('csr', 'CSR Funded Projects', 'partnerships', 11),
  ('research', 'Research / Policy / Governance', 'governance', 12)
ON CONFLICT (slug) DO NOTHING;

-- Seed master taxonomy: membership types
INSERT INTO public.membership_types (slug, name, price, currency, billing_cycle, description, display_order) VALUES
  ('general', 'General Member', 0, 'USD', 'lifetime', 'Free entry-level membership for anyone aligned with SCEF''s mission.', 1),
  ('youth', 'Youth Member', 0, 'USD', 'annual', 'Free membership for individuals 18–35 active in education advocacy.', 2),
  ('standard', 'Standard Member', 50, 'USD', 'annual', 'Voting member with full access to programs, certifications, and AGC.', 3),
  ('organizational', 'Organizational Member', 500, 'USD', 'annual', 'Institutional membership for schools, NGOs, and agencies.', 4),
  ('lifetime', 'Lifetime Member', 1000, 'USD', 'lifetime', 'One-time lifetime membership with permanent voting rights.', 5)
ON CONFLICT (slug) DO NOTHING;

-- Sponsor profiles table (was missing)
CREATE TABLE IF NOT EXISTS public.sponsor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  organization_name text NOT NULL,
  contact_person text,
  organization_type text,
  industry text,
  budget_range text,
  focus_area text,
  preferred_regions text[],
  partnership_type text,
  reporting_expectations text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.sponsor_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users manage own sponsor profile" ON public.sponsor_profiles;
CREATE POLICY "Users manage own sponsor profile" ON public.sponsor_profiles
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins manage all sponsor profiles" ON public.sponsor_profiles;
CREATE POLICY "Admins manage all sponsor profiles" ON public.sponsor_profiles
  FOR ALL USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

DROP TRIGGER IF EXISTS update_sponsor_profiles_updated_at ON public.sponsor_profiles;
CREATE TRIGGER update_sponsor_profiles_updated_at
  BEFORE UPDATE ON public.sponsor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to assign role based on engagement path
CREATE OR REPLACE FUNCTION public.assign_path_role(_user_id uuid, _path text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _role app_role;
BEGIN
  _role := CASE _path
    WHEN 'ambassador' THEN 'ambassador'::app_role
    WHEN 'volunteer' THEN 'volunteer'::app_role
    WHEN 'sponsor' THEN 'partner'::app_role
    WHEN 'endorser' THEN 'partner'::app_role
    ELSE 'member'::app_role
  END;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, _role)
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;
-- ============================================
-- ONBOARDING SYSTEM SCHEMA EXTENSION
-- ============================================

-- 1. Extend profiles with onboarding fields
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS age_band text,
  ADD COLUMN IF NOT EXISTS occupation text,
  ADD COLUMN IF NOT EXISTS organization text,
  ADD COLUMN IF NOT EXISTS preferred_language text DEFAULT 'en',
  ADD COLUMN IF NOT EXISTS communication_preferences jsonb DEFAULT '{"email": true, "sms": false}'::jsonb,
  ADD COLUMN IF NOT EXISTS engagement_path text,
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS onboarding_step text DEFAULT 'intent';

-- 2. Membership types (catalog)
CREATE TABLE IF NOT EXISTS public.membership_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  price numeric DEFAULT 0,
  currency text DEFAULT 'USD',
  billing_cycle text DEFAULT 'annual',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.membership_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Membership types are publicly readable"
  ON public.membership_types FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins manage membership types"
  ON public.membership_types FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- 3. User memberships (per-user active membership)
CREATE TABLE IF NOT EXISTS public.memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  membership_type_id uuid NOT NULL REFERENCES public.membership_types(id),
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  end_date date,
  payment_status text NOT NULL DEFAULT 'pending',
  membership_status text NOT NULL DEFAULT 'active',
  renewal_date date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own memberships"
  ON public.memberships FOR SELECT
  USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE POLICY "Users insert own memberships"
  ON public.memberships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage memberships"
  ON public.memberships FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 4. Services catalog (for preferred services taxonomy)
CREATE TABLE IF NOT EXISTS public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category text,
  description text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are publicly readable"
  ON public.services FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins manage services"
  ON public.services FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- 5. User service preferences
CREATE TABLE IF NOT EXISTS public.user_service_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  service_id uuid NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  preference_level text DEFAULT 'interested',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, service_id)
);

ALTER TABLE public.user_service_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own service preferences"
  ON public.user_service_preferences FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins view all service preferences"
  ON public.user_service_preferences FOR SELECT
  USING (is_admin(auth.uid()));

-- 6. Ambassador profiles
CREATE TABLE IF NOT EXISTS public.ambassador_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  tier_interest text,
  advocacy_focus text[],
  preferred_programs text[],
  hours_per_month integer,
  public_profile_links jsonb DEFAULT '{}'::jsonb,
  experience_summary text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ambassador_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own ambassador profile"
  ON public.ambassador_profiles FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all ambassador profiles"
  ON public.ambassador_profiles FOR ALL
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE TRIGGER update_ambassador_profiles_updated_at
  BEFORE UPDATE ON public.ambassador_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7. Sponsor profiles (links a user account to sponsor info; CSR inquiries remain for public leads)
CREATE TABLE IF NOT EXISTS public.sponsor_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  organization_name text NOT NULL,
  sponsor_type text,
  industry text,
  budget_range text,
  support_type text[],
  csr_focus_areas text[],
  preferred_regions text[],
  reporting_frequency text,
  partnership_status text NOT NULL DEFAULT 'prospect',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.sponsor_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own sponsor profile"
  ON public.sponsor_profiles FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all sponsor profiles"
  ON public.sponsor_profiles FOR ALL
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE TRIGGER update_sponsor_profiles_updated_at
  BEFORE UPDATE ON public.sponsor_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 8. Endorser profiles (user-linked; existing endorsements table is for public display)
CREATE TABLE IF NOT EXISTS public.endorser_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  institution_name text NOT NULL,
  institution_type text,
  endorsement_type text,
  endorsement_scope text,
  representative_name text,
  collaboration_interests text[],
  public_display_permission boolean DEFAULT false,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.endorser_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own endorser profile"
  ON public.endorser_profiles FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage all endorser profiles"
  ON public.endorser_profiles FOR ALL
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE TRIGGER update_endorser_profiles_updated_at
  BEFORE UPDATE ON public.endorser_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Generic applications workflow (chapter/ambassador/judge/NRC/sponsor/etc.)
CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  application_type text NOT NULL,
  related_entity_id uuid,
  status text NOT NULL DEFAULT 'submitted',
  payload jsonb DEFAULT '{}'::jsonb,
  notes text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own applications"
  ON public.applications FOR SELECT
  USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE POLICY "Users create own applications"
  ON public.applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins manage applications"
  ON public.applications FOR UPDATE
  USING (is_admin(auth.uid()));

CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 10. Seed membership types
INSERT INTO public.membership_types (slug, name, description, price, billing_cycle, display_order) VALUES
  ('general', 'General Member', 'Free membership open to all supporters of education in Africa.', 0, 'lifetime', 1),
  ('youth', 'Youth Member', 'Free membership for learners and young advocates under 25.', 0, 'annual', 2),
  ('standard', 'Standard Member', 'Annual membership with full access to programs, events, and benefits.', 50, 'annual', 3),
  ('organizational', 'Organizational Member', 'Annual membership for institutions and partner organizations.', 500, 'annual', 4),
  ('lifetime', 'Lifetime Member', 'One-time lifetime membership with all benefits in perpetuity.', 1000, 'lifetime', 5)
ON CONFLICT (slug) DO NOTHING;

-- 11. Seed services taxonomy
INSERT INTO public.services (slug, name, category, display_order) VALUES
  ('scholarships', 'Scholarships & Learner Support', 'programs', 1),
  ('rmsa', 'School Infrastructure / RMSA', 'programs', 2),
  ('women-girls', 'Women & Girls Education', 'programs', 3),
  ('special-needs', 'Special Needs Education', 'programs', 4),
  ('digital-learning', 'Digital Learning / EOA', 'programs', 5),
  ('elibrary', 'eLibrary / Knowledge Access', 'programs', 6),
  ('nesa', 'NESA / Recognition & Awards', 'recognition', 7),
  ('tvet', 'TVET / Skills Development', 'programs', 8),
  ('media', 'Media & Advocacy', 'media', 9),
  ('chapters', 'Local Chapters', 'community', 10),
  ('csr-projects', 'CSR Funded Projects', 'partnerships', 11),
  ('research', 'Research / Policy / Governance', 'institutional', 12)
ON CONFLICT (slug) DO NOTHING;

-- 12. Update handle_new_user trigger to mark onboarding incomplete
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, onboarding_completed, onboarding_step)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    false,
    'intent'
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'member')
  ON CONFLICT DO NOTHING;
  
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.id)
  ON CONFLICT DO NOTHING;
  
  RETURN NEW;
END;
$function$;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add unique constraint on profiles.user_id if not present (needed for ON CONFLICT)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_user_id_key'
  ) THEN
    ALTER TABLE public.profiles ADD CONSTRAINT profiles_user_id_key UNIQUE (user_id);
  END IF;
END$$;
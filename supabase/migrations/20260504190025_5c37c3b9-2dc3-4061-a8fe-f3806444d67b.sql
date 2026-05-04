
-- ============= School WASH Nominations =============
CREATE TABLE public.wash_nominations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NULL,
  school_name TEXT NOT NULL,
  school_address TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  enrollment_total INTEGER,
  girls_enrollment INTEGER,
  current_facilities TEXT,
  needs_summary TEXT NOT NULL,
  needs_categories TEXT[] NOT NULL DEFAULT '{}',
  has_water_access BOOLEAN DEFAULT false,
  has_disability_access BOOLEAN DEFAULT false,
  evidence_urls TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  reviewed_by UUID,
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_wash_nom_status ON public.wash_nominations(status);
CREATE INDEX idx_wash_nom_country ON public.wash_nominations(country);
ALTER TABLE public.wash_nominations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit WASH nomination"
ON public.wash_nominations FOR INSERT
WITH CHECK (
  status = 'pending'
  AND length(school_name) BETWEEN 2 AND 200
  AND contact_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(needs_summary) BETWEEN 10 AND 5000
);

CREATE POLICY "Owners view own WASH nominations"
ON public.wash_nominations FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Admins manage WASH nominations"
ON public.wash_nominations FOR ALL
USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

CREATE TRIGGER update_wash_nominations_updated_at
BEFORE UPDATE ON public.wash_nominations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============= School WASH Sponsorships (interest/intent) =============
CREATE TABLE public.wash_sponsorships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NULL,
  sponsor_name TEXT NOT NULL,
  sponsor_email TEXT NOT NULL,
  sponsor_phone TEXT,
  organization TEXT,
  sponsorship_type TEXT NOT NULL, -- 'toilets' | 'hygiene' | 'water' | 'disability_access' | 'general'
  amount_pledged NUMERIC(14,2),
  currency TEXT DEFAULT 'USD',
  preferred_country TEXT,
  preferred_school_id UUID REFERENCES public.wash_nominations(id) ON DELETE SET NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_wash_spon_status ON public.wash_sponsorships(status);
ALTER TABLE public.wash_sponsorships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit sponsorship"
ON public.wash_sponsorships FOR INSERT
WITH CHECK (
  status = 'pending'
  AND length(sponsor_name) BETWEEN 2 AND 200
  AND sponsor_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND sponsorship_type IN ('toilets','hygiene','water','disability_access','general')
);

CREATE POLICY "Owners view own sponsorships"
ON public.wash_sponsorships FOR SELECT
USING (auth.uid() IS NOT NULL AND auth.uid() = user_id);

CREATE POLICY "Admins manage sponsorships"
ON public.wash_sponsorships FOR ALL
USING (is_admin(auth.uid())) WITH CHECK (is_admin(auth.uid()));

CREATE TRIGGER update_wash_sponsorships_updated_at
BEFORE UPDATE ON public.wash_sponsorships
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============= Contributor badge code (SCEF-[ROLE]-[YEAR]-[ID]) =============
ALTER TABLE public.hall_of_fame_profiles
  ADD COLUMN IF NOT EXISTS badge_code TEXT UNIQUE;

CREATE INDEX IF NOT EXISTS idx_hof_badge_code ON public.hall_of_fame_profiles(badge_code);

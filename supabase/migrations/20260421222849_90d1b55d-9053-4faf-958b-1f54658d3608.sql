-- ============= CSR FUNDING FUNNEL =============
-- Public intake → admin assigns to project → milestones → reports

-- 1. Inquiries (public intake)
CREATE TABLE IF NOT EXISTS public.csr_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  country TEXT,
  organization_type TEXT, -- corporate, foundation, govt, individual, diaspora
  funding_range TEXT,     -- under_5k, 5k_50k, 50k_250k, 250k_plus
  focus_areas TEXT[],     -- scholarships, infrastructure, digital, etc
  preferred_regions TEXT[],
  timeline TEXT,
  message TEXT,
  source TEXT DEFAULT 'csr_landing',
  status TEXT NOT NULL DEFAULT 'new', -- new, qualified, in_discussion, converted, declined
  assigned_to UUID,
  notes TEXT,
  converted_project_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.csr_inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can insert an inquiry
CREATE POLICY "Anyone can submit a CSR inquiry"
  ON public.csr_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only admins can view / update
CREATE POLICY "Admins view inquiries"
  ON public.csr_inquiries FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins update inquiries"
  ON public.csr_inquiries FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins delete inquiries"
  ON public.csr_inquiries FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- 2. CSR Projects (a funded engagement)
CREATE TABLE IF NOT EXISTS public.csr_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID REFERENCES public.csr_inquiries(id) ON DELETE SET NULL,
  partner_name TEXT NOT NULL,
  project_name TEXT NOT NULL,
  description TEXT,
  focus_area TEXT,
  region TEXT,
  country TEXT,
  total_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'USD',
  disbursed_amount NUMERIC(14,2) NOT NULL DEFAULT 0,
  start_date DATE,
  end_date DATE,
  status TEXT NOT NULL DEFAULT 'planning', -- planning, active, completed, paused, cancelled
  managed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.csr_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage projects"
  ON public.csr_projects FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- 3. Milestones
CREATE TABLE IF NOT EXISTS public.csr_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.csr_projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  amount NUMERIC(14,2) DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- pending, in_progress, completed, blocked
  completed_at TIMESTAMPTZ,
  evidence_url TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.csr_milestones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage milestones"
  ON public.csr_milestones FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- 4. Project Reports
CREATE TABLE IF NOT EXISTS public.csr_project_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.csr_projects(id) ON DELETE CASCADE,
  report_period TEXT NOT NULL, -- e.g. "Q1 2026"
  beneficiaries_reached INT DEFAULT 0,
  funds_disbursed NUMERIC(14,2) DEFAULT 0,
  highlights TEXT,
  challenges TEXT,
  document_url TEXT,
  published_at TIMESTAMPTZ,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.csr_project_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage reports"
  ON public.csr_project_reports FOR ALL
  TO authenticated
  USING (public.is_admin(auth.uid()))
  WITH CHECK (public.is_admin(auth.uid()));

-- updated_at triggers
CREATE TRIGGER trg_csr_inquiries_updated
  BEFORE UPDATE ON public.csr_inquiries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_csr_projects_updated
  BEFORE UPDATE ON public.csr_projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_csr_milestones_updated
  BEFORE UPDATE ON public.csr_milestones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_csr_inquiries_status ON public.csr_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_csr_inquiries_created ON public.csr_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_csr_projects_status ON public.csr_projects(status);
CREATE INDEX IF NOT EXISTS idx_csr_milestones_project ON public.csr_milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_csr_reports_project ON public.csr_project_reports(project_id);
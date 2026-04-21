
-- ============================================================
-- SCEF Phase 3: Staff Office + AI Productivity Schema
-- ============================================================

-- Add 'staff' to engagement path enumeration is implicit (text col)
-- Add new app_role for staff (staff already exists in enum from prior work)
-- Verify enum has 'staff' — if not, this is a no-op safe add
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'staff'
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'staff';
  END IF;
END$$;

-- ============================================================
-- staff_departments (master taxonomy)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.staff_departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.staff_departments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Departments are publicly readable"
  ON public.staff_departments FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins manage departments"
  ON public.staff_departments FOR ALL
  TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Seed departments
INSERT INTO public.staff_departments (slug, name, description, display_order) VALUES
  ('bgeo', 'Board Governance & Executive Office', 'BOT/BOA/BOD support and executive operations', 1),
  ('management', 'Management Team', 'Senior management and coordination', 2),
  ('lcs', 'Local Chapter Services', 'Chapter onboarding, support, compliance', 3),
  ('santos-media', 'Santos Media', 'NESA TV, radio, webinars, content', 4),
  ('programs', 'Programs Team', 'EduAid, NESA, RMSA, EOA, eLibrary delivery', 5),
  ('ombdd', 'Operations & Compliance', 'Internal operations, audits, compliance', 6),
  ('tdsd', 'Technology & Digital Services', 'Platform, data, IT support', 7),
  ('partnerships', 'Partnerships & CSR', 'Partner sourcing, CSR fund management', 8),
  ('hr-admin', 'Admin / HR', 'People, hiring, internal admin', 9)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- staff_profiles (extended staff data)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.staff_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  department_slug text REFERENCES public.staff_departments(slug),
  job_role text,
  office_type text, -- 'remote' | 'hybrid' | 'onsite'
  work_region text,
  supervisor_id uuid,
  reporting_line text,
  access_level text NOT NULL DEFAULT 'standard', -- 'standard' | 'manager' | 'director' | 'executive'
  employee_id text UNIQUE,
  status text NOT NULL DEFAULT 'pending', -- 'pending' | 'active' | 'suspended' | 'archived'
  approved_by uuid,
  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.staff_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own staff profile"
  ON public.staff_profiles FOR SELECT
  USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE POLICY "Users insert own staff profile"
  ON public.staff_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own staff profile"
  ON public.staff_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins manage all staff profiles"
  ON public.staff_profiles FOR ALL
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE TRIGGER update_staff_profiles_updated_at
  BEFORE UPDATE ON public.staff_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Helper: has staff access (active staff profile)
CREATE OR REPLACE FUNCTION public.has_staff_access(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.staff_profiles
    WHERE user_id = _user_id AND status = 'active'
  ) OR public.is_admin(_user_id)
$$;

-- ============================================================
-- staff_tasks (daily/weekly/monthly tasks + planner items)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.staff_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  assigned_by uuid,
  title text NOT NULL,
  description text,
  task_type text NOT NULL DEFAULT 'daily', -- 'daily' | 'weekly' | 'monthly'
  priority text NOT NULL DEFAULT 'medium', -- 'low' | 'medium' | 'high' | 'urgent'
  status text NOT NULL DEFAULT 'todo', -- 'todo' | 'in_progress' | 'done' | 'cancelled'
  due_date date,
  due_time time,
  completed_at timestamptz,
  department_slug text,
  ai_generated boolean DEFAULT false,
  tags text[],
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_staff_tasks_user_due ON public.staff_tasks(user_id, due_date);
CREATE INDEX idx_staff_tasks_status ON public.staff_tasks(status);

ALTER TABLE public.staff_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Staff view own + assigned tasks"
  ON public.staff_tasks FOR SELECT
  USING (
    auth.uid() = user_id
    OR auth.uid() = assigned_by
    OR is_admin(auth.uid())
  );

CREATE POLICY "Staff create own tasks"
  ON public.staff_tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id OR has_staff_access(auth.uid()));

CREATE POLICY "Staff update own tasks"
  ON public.staff_tasks FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = assigned_by OR is_admin(auth.uid()));

CREATE POLICY "Staff delete own tasks"
  ON public.staff_tasks FOR DELETE
  USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE TRIGGER update_staff_tasks_updated_at
  BEFORE UPDATE ON public.staff_tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- staff_reports (daily, weekly, monthly)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.staff_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  report_type text NOT NULL, -- 'daily' | 'weekly' | 'monthly'
  report_date date NOT NULL,
  period_end date,
  department_slug text,
  -- structured fields
  key_tasks_completed text,
  issues_encountered text,
  pending_tasks text,
  support_needed text,
  next_priorities text,
  highlights text,
  -- workflow
  status text NOT NULL DEFAULT 'draft', -- 'draft' | 'submitted' | 'under_review' | 'changes_requested' | 'approved'
  submitted_at timestamptz,
  reviewed_by uuid,
  reviewed_at timestamptz,
  review_notes text,
  -- AI assistance
  ai_assisted boolean DEFAULT false,
  source_report_ids uuid[], -- for rollups
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, report_type, report_date)
);

CREATE INDEX idx_staff_reports_user_date ON public.staff_reports(user_id, report_date DESC);
CREATE INDEX idx_staff_reports_status ON public.staff_reports(status);
CREATE INDEX idx_staff_reports_dept ON public.staff_reports(department_slug, report_type);

ALTER TABLE public.staff_reports ENABLE ROW LEVEL SECURITY;

-- Helper: is manager of department (access_level >= manager and same dept)
CREATE OR REPLACE FUNCTION public.is_dept_manager(_user_id uuid, _dept_slug text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.staff_profiles
    WHERE user_id = _user_id
      AND status = 'active'
      AND department_slug = _dept_slug
      AND access_level IN ('manager', 'director', 'executive')
  ) OR public.is_admin(_user_id)
$$;

CREATE POLICY "Staff view own reports"
  ON public.staff_reports FOR SELECT
  USING (
    auth.uid() = user_id
    OR is_admin(auth.uid())
    OR is_dept_manager(auth.uid(), department_slug)
  );

CREATE POLICY "Staff create own reports"
  ON public.staff_reports FOR INSERT
  WITH CHECK (auth.uid() = user_id AND has_staff_access(auth.uid()));

CREATE POLICY "Staff update own draft reports"
  ON public.staff_reports FOR UPDATE
  USING (
    (auth.uid() = user_id AND status IN ('draft', 'changes_requested'))
    OR is_admin(auth.uid())
    OR is_dept_manager(auth.uid(), department_slug)
  );

CREATE POLICY "Admins delete reports"
  ON public.staff_reports FOR DELETE
  USING (is_admin(auth.uid()));

CREATE TRIGGER update_staff_reports_updated_at
  BEFORE UPDATE ON public.staff_reports
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- ai_assistant_logs (audit trail for AI usage)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.ai_assistant_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  tool_name text NOT NULL, -- 'daily_planner' | 'weekly_planner' | 'monthly_planner' | 'report_assistant' | 'task_breakdown' | 'meeting_summary' | 'comms_assistant' | 'partner_summary' | 'chapter_support'
  prompt_summary text,
  output_preview text,
  tokens_used integer,
  model text,
  related_entity_type text,
  related_entity_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_ai_logs_user ON public.ai_assistant_logs(user_id, created_at DESC);
CREATE INDEX idx_ai_logs_tool ON public.ai_assistant_logs(tool_name);

ALTER TABLE public.ai_assistant_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own AI logs"
  ON public.ai_assistant_logs FOR SELECT
  USING (auth.uid() = user_id OR is_admin(auth.uid()));

CREATE POLICY "Users insert own AI logs"
  ON public.ai_assistant_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

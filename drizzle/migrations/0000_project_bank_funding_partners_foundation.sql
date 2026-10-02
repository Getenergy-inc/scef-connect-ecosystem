CREATE TYPE public.project_status AS ENUM ('IDEA','CONCEPT','DESIGN','FUNDING_READY','FUNDRAISING','PARTIALLY_FUNDED','FUNDED','PRE_IMPLEMENTATION','ACTIVE','PAUSED','COMPLETED','CLOSED','ARCHIVED');
CREATE TYPE public.funding_status AS ENUM ('NOT_ASSESSED','FUNDING_NEEDED','FUNDER_MATCHING','APPLICATION_IN_PROGRESS','APPLICATION_SUBMITTED','PARTIALLY_FUNDED','FULLY_FUNDED','SELF_FUNDED','CLOSED');
CREATE TYPE public.opportunity_verification AS ENUM ('VERIFIED_ACTIVE','VERIFIED_UPCOMING','VERIFIED_CLOSED','UNVERIFIED','CONFLICT_REQUIRES_RESOLUTION','SUSPICIOUS','DUPLICATE');
CREATE TYPE public.application_stage AS ENUM ('DISCOVERY','VERIFICATION','ELIGIBILITY','PROJECT_MATCHING','MANAGEMENT_REVIEW','GO_NO_GO','PROPOSAL','BUDGET','DOCUMENTATION','INTERNAL_REVIEW','APPROVAL','SUBMISSION_READY','SUBMITTED','ACKNOWLEDGED','DUE_DILIGENCE','SHORTLISTED','AWARDED','UNSUCCESSFUL','CLOSED');
CREATE TYPE public.partner_stage AS ENUM ('PROSPECT','RESEARCHED','CONTACT_PLANNED','CONTACTED','RESPONDED','MEETING','DUE_DILIGENCE','PROPOSAL','NEGOTIATION','MOU_REVIEW','FORMAL_PARTNER','INACTIVE','DECLINED');
CREATE TYPE public.eligibility_status AS ENUM ('ELIGIBLE','LIKELY_ELIGIBLE','REQUIRES_CONFIRMATION','NOT_ELIGIBLE');

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_code text UNIQUE NOT NULL,
  title text NOT NULL,
  slug text UNIQUE,
  programme_id uuid REFERENCES public.programs(id) ON DELETE SET NULL,
  pillar text, summary text, problem_statement text, proposed_solution text, objectives text,
  beneficiary_description text, country text, state_region text, location text,
  start_date date, end_date date, duration_months int,
  project_status public.project_status NOT NULL DEFAULT 'IDEA',
  funding_status public.funding_status NOT NULL DEFAULT 'NOT_ASSESSED',
  total_budget numeric DEFAULT 0, currency text DEFAULT 'USD', funding_secured numeric DEFAULT 0,
  funding_gap numeric GENERATED ALWAYS AS (COALESCE(total_budget,0) - COALESCE(funding_secured,0)) STORED,
  project_lead text, theory_of_change text, sustainability_strategy text, scalability_strategy text,
  gender_strategy text, youth_strategy text, climate_relevance text, safeguarding_requirements text,
  risk_rating text, public_visibility boolean NOT NULL DEFAULT false,
  readiness jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_by uuid DEFAULT auth.uid(), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.project_work_packages (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE, wp_number int, title text NOT NULL, description text, objective text, start_date date, end_date date, lead text, budget numeric, status text DEFAULT 'PLANNED', created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.project_activities (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), activity_code text, project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE, work_package_id uuid REFERENCES public.project_work_packages(id) ON DELETE SET NULL, title text NOT NULL, description text, responsible_person text, location text, start_date date, due_date date, completion_date date, status text NOT NULL DEFAULT 'NOT_STARTED' CHECK (status IN ('NOT_STARTED','PLANNED','IN_PROGRESS','DELAYED','COMPLETED','VERIFIED','CANCELLED')), budget_line text, evidence_required boolean DEFAULT true, verification_required boolean DEFAULT true, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.project_milestones (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE, milestone text NOT NULL, expected_date date, actual_date date, owner text, status text DEFAULT 'PLANNED', evidence text, delay_reason text, corrective_action text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.project_budget_lines (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE, category text NOT NULL, subcategory text, description text, unit text, quantity numeric DEFAULT 1, unit_cost numeric DEFAULT 0, total numeric GENERATED ALWAYS AS (COALESCE(quantity,0)*COALESCE(unit_cost,0)) STORED, currency text DEFAULT 'USD', funding_source text, contribution_type text CHECK (contribution_type IN ('FUNDER','SCEF','PARTNER','CASH','IN_KIND')), work_package_id uuid REFERENCES public.project_work_packages(id) ON DELETE SET NULL, activity_id uuid REFERENCES public.project_activities(id) ON DELETE SET NULL, eligibility_status text NOT NULL DEFAULT 'REQUIRES_CONFIRMATION' CHECK (eligibility_status IN ('VERIFIED_ELIGIBLE','POTENTIALLY_ELIGIBLE','NOT_ELIGIBLE','REQUIRES_CONFIRMATION')), notes text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.project_risks (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE, risk text NOT NULL, category text CHECK (category IN ('Financial','Operational','Safeguarding','Political','Environmental','Security','Technology','Partner','Reputational','Regulatory','Procurement','Data Protection')), probability int CHECK (probability BETWEEN 1 AND 5), impact int CHECK (impact BETWEEN 1 AND 5), risk_rating int GENERATED ALWAYS AS (probability*impact) STORED, mitigation text, owner text, trigger_event text, status text DEFAULT 'OPEN', review_date date, created_at timestamptz NOT NULL DEFAULT now());

CREATE TABLE public.funders (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation text NOT NULL, funder_type text, country text, region text, website text, funding_themes text[], typical_geography text, typical_applicants text, typical_instruments text, typical_funding_range text, relationship_status text DEFAULT 'NONE', primary_contact text, last_researched date, verification_status text NOT NULL DEFAULT 'UNVERIFIED', notes text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.funding_opportunities (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), funder_id uuid REFERENCES public.funders(id) ON DELETE SET NULL, programme text, call_title text NOT NULL, reference_number text, official_url text, instrument text, description text, opening_date date, deadline timestamptz, deadline_timezone text, funding_min numeric, funding_max numeric, currency text DEFAULT 'USD', eligible_countries text[], eligible_applicants text, eligible_activities text, ineligible_activities text, cofinancing_required boolean, cofinancing_percentage numeric, duration_min int, duration_max int, consortium_required boolean, lead_applicant_rules text, application_method text, evaluation_criteria text, required_documents text, eligibility jsonb NOT NULL DEFAULT '{}'::jsonb, overall_eligibility public.eligibility_status NOT NULL DEFAULT 'REQUIRES_CONFIRMATION', verification_status public.opportunity_verification NOT NULL DEFAULT 'UNVERIFIED', last_verified date, source_date date, management_decision text CHECK (management_decision IN ('GO','HOLD','NO_GO','MORE_INFO')), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE UNIQUE INDEX funding_opp_dedupe ON public.funding_opportunities (COALESCE(funder_id::text,''), lower(call_title), COALESCE(reference_number,''), deadline) NULLS NOT DISTINCT;
CREATE TABLE public.project_funder_matches (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), project_id uuid NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE, opportunity_id uuid NOT NULL REFERENCES public.funding_opportunities(id) ON DELETE CASCADE, theme_match text, geography_match text, applicant_match text, budget_match text, duration_match text, partner_match text, strategic_match text, eligibility_status public.eligibility_status NOT NULL DEFAULT 'REQUIRES_CONFIRMATION', recommended_project_configuration text, notes text, created_at timestamptz NOT NULL DEFAULT now(), UNIQUE (project_id, opportunity_id));
CREATE TABLE public.funding_applications (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), opportunity_id uuid REFERENCES public.funding_opportunities(id) ON DELETE SET NULL, project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL, title text NOT NULL, lead_applicant text DEFAULT 'Santos Creations Educational Foundation (SCEF), Nigeria', owner text, amount_requested numeric, currency text DEFAULT 'USD', stage public.application_stage NOT NULL DEFAULT 'DISCOVERY', submission_evidence text, submitted_at timestamptz, notes text, created_by uuid DEFAULT auth.uid(), created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.application_requirements (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), application_id uuid NOT NULL REFERENCES public.funding_applications(id) ON DELETE CASCADE, requirement text NOT NULL, mandatory boolean DEFAULT true, responsible_person text, status text NOT NULL DEFAULT 'NOT_STARTED' CHECK (status IN ('NOT_STARTED','REQUESTED','IN_PROGRESS','READY','VERIFIED','APPROVED','NOT_APPLICABLE')), due_date date, file_path text, notes text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.application_approvals (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), application_id uuid NOT NULL REFERENCES public.funding_applications(id) ON DELETE CASCADE, approval_step text NOT NULL CHECK (approval_step IN ('FUNDING_MANAGER','PROGRAMME_LEAD','FINANCE','COMPLIANCE','EXECUTIVE')), approver_id uuid NOT NULL DEFAULT auth.uid(), approver_name text, decision text NOT NULL CHECK (decision IN ('APPROVED','REJECTED','CHANGES_REQUESTED')), comments text, version_approved text, decided_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.proposal_versions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), application_id uuid NOT NULL REFERENCES public.funding_applications(id) ON DELETE CASCADE, version text NOT NULL, editor_id uuid DEFAULT auth.uid(), sections jsonb NOT NULL DEFAULT '{}'::jsonb, change_summary text, approval_status text DEFAULT 'DRAFT', created_at timestamptz NOT NULL DEFAULT now());

CREATE TABLE public.partners (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), organisation text NOT NULL, website text, country text, partner_type text, contact_name text, contact_email text, contact_phone text, relationship_owner text, interest_areas text[], relevant_programmes text[], stage public.partner_stage NOT NULL DEFAULT 'PROSPECT', verification text NOT NULL DEFAULT 'UNVERIFIED' CHECK (verification IN ('UNVERIFIED','VERIFIED')), agreement_status text, agreement_start date, agreement_expiry date, public_display_permission boolean NOT NULL DEFAULT false, logo_url text, engagement_history text, source_table text, source_id uuid, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());

DO $$ DECLARE t text; BEGIN
FOREACH t IN ARRAY ARRAY['projects','project_work_packages','project_activities','project_milestones','project_budget_lines','project_risks','funders','funding_opportunities','project_funder_matches','funding_applications','application_requirements','application_approvals','proposal_versions','partners'] LOOP
  EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
  EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
  EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  EXECUTE format('CREATE POLICY "Admins manage %s" ON public.%I FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()))', t, t);
END LOOP; END $$;
GRANT SELECT (id, organisation, website, country, partner_type, logo_url, stage, verification, public_display_permission) ON public.partners TO anon;
CREATE POLICY "Public sees formal verified permitted partners" ON public.partners FOR SELECT TO anon, authenticated USING (stage = 'FORMAL_PARTNER' AND verification = 'VERIFIED' AND public_display_permission);

CREATE POLICY "No update approvals" ON public.application_approvals AS RESTRICTIVE FOR UPDATE TO authenticated USING (false);
CREATE POLICY "No delete approvals" ON public.application_approvals AS RESTRICTIVE FOR DELETE TO authenticated USING (false);
CREATE POLICY "Approved versions locked" ON public.proposal_versions AS RESTRICTIVE FOR UPDATE TO authenticated USING (approval_status <> 'APPROVED');

CREATE OR REPLACE FUNCTION public.enforce_application_gate() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.stage = 'SUBMISSION_READY' AND OLD.stage IS DISTINCT FROM 'SUBMISSION_READY' THEN
    IF NOT EXISTS (SELECT 1 FROM application_approvals WHERE application_id = NEW.id AND approval_step='EXECUTIVE' AND decision='APPROVED' AND approver_id IS DISTINCT FROM NEW.created_by) THEN
      RAISE EXCEPTION 'Executive approval by someone other than the drafter is required before Submission Ready';
    END IF;
  END IF;
  IF NEW.stage = 'SUBMITTED' AND OLD.stage IS DISTINCT FROM 'SUBMITTED' THEN
    IF OLD.stage <> 'SUBMISSION_READY' THEN RAISE EXCEPTION 'Only Submission Ready applications can be marked Submitted'; END IF;
    IF COALESCE(trim(NEW.submission_evidence),'') = '' THEN RAISE EXCEPTION 'Submission evidence is required'; END IF;
    NEW.submitted_at := COALESCE(NEW.submitted_at, now());
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END $$;
CREATE TRIGGER trg_application_gate BEFORE UPDATE ON public.funding_applications FOR EACH ROW EXECUTE FUNCTION public.enforce_application_gate();

CREATE OR REPLACE FUNCTION public.audit_row_change() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO audit_logs (action_type, entity_type, entity_id, user_id, old_values, new_values)
  VALUES (lower(TG_OP), TG_TABLE_NAME, CASE WHEN TG_OP='DELETE' THEN OLD.id ELSE NEW.id END, auth.uid(),
    CASE WHEN TG_OP <> 'INSERT' THEN to_jsonb(OLD) END, CASE WHEN TG_OP <> 'DELETE' THEN to_jsonb(NEW) END);
  RETURN COALESCE(NEW, OLD);
END $$;
REVOKE EXECUTE ON FUNCTION public.audit_row_change() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.enforce_application_gate() FROM PUBLIC, anon, authenticated;
DO $$ DECLARE t text; BEGIN
FOREACH t IN ARRAY ARRAY['projects','project_budget_lines','funding_opportunities','funding_applications','application_approvals','partners'] LOOP
  EXECUTE format('CREATE TRIGGER trg_audit_%s AFTER INSERT OR UPDATE OR DELETE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.audit_row_change()', t, t);
END LOOP;
FOREACH t IN ARRAY ARRAY['projects','funders','funding_opportunities','partners'] LOOP
  EXECUTE format('CREATE TRIGGER trg_updated_%s BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column()', t, t);
END LOOP; END $$;

INSERT INTO public.partners (organisation, website, partner_type, stage, verification, public_display_permission, logo_url, source_table, source_id)
SELECT name, website_url, 'Implementation Partner', 'PROSPECT', 'UNVERIFIED', false, logo_url, 'crs_partners', id FROM public.crs_partners;
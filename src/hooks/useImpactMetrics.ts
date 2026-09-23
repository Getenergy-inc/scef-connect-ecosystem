import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ImpactMetricRow = {
  id: string;
  programme: string;
  metric_name: string;
  metric_value: string | null;
  unit: string | null;
  reporting_period: string | null;
  geographic_scope: string | null;
  metric_type: "ACHIEVED" | "TARGET" | "PROJECTED" | "ESTIMATED";
  evidence_status:
    | "VERIFIED"
    | "EXTERNAL_VERIFIED"
    | "SELF_REPORTED"
    | "VERIFICATION_IN_PROGRESS"
    | "UNVERIFIED";
  workflow_state:
    | "DRAFT"
    | "EVIDENCE_UPLOADED"
    | "UNDER_REVIEW"
    | "VERIFIED"
    | "APPROVED_FOR_PUBLICATION"
    | "PUBLISHED"
    | "WITHDRAWN";
  evidence_source: string | null;
  source_url: string | null;
  verification_date: string | null;
  methodology: string | null;
  public_display: boolean;
  display_key: string | null;
  notes: string | null;
  updated_at: string;
};

/** Published metrics only — safe for public pages. */
export const usePublishedImpactMetrics = (programme?: string) =>
  useQuery({
    queryKey: ["impact-metrics", "published", programme ?? "all"],
    queryFn: async () => {
      let query = supabase
        .from("impact_metrics")
        .select("*")
        .eq("public_display", true)
        .eq("workflow_state", "PUBLISHED")
        .order("programme", { ascending: true });
      if (programme) query = query.eq("programme", programme);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as ImpactMetricRow[];
    },
  });

/** All metrics — admin views only (RLS restricts rows to admins). */
export const useAllImpactMetrics = () =>
  useQuery({
    queryKey: ["impact-metrics", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("impact_metrics")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ImpactMetricRow[];
    },
  });

export type ClaimRegisterRow = {
  id: string;
  claim_ref: string | null;
  page_path: string;
  programme: string | null;
  exact_claim: string;
  claim_type: string | null;
  current_figure: string | null;
  source: string | null;
  evidence_available: boolean;
  verification_status: string;
  risk_level: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  recommended_correction: string | null;
  approved_public_wording: string | null;
  reviewer: string | null;
  review_date: string | null;
  next_review_date: string | null;
};

export const useClaimsRegister = () =>
  useQuery({
    queryKey: ["claims-evidence-register"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("claims_evidence_register")
        .select("*")
        .order("claim_ref", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ClaimRegisterRow[];
    },
  });

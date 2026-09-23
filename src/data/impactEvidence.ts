/**
 * SCEF Impact Evidence Governance — shared definitions and approved public wording.
 *
 * Policy: no numeric impact, beneficiary or financial claim may be displayed as an
 * achieved historical fact unless the corresponding record in the `impact_metrics`
 * table is metric_type = ACHIEVED and evidence_status = VERIFIED | EXTERNAL_VERIFIED
 * and public_display = true.
 */

export type MetricType = "ACHIEVED" | "TARGET" | "PROJECTED" | "ESTIMATED";

export type EvidenceStatus =
  | "VERIFIED"
  | "EXTERNAL_VERIFIED"
  | "SELF_REPORTED"
  | "VERIFICATION_IN_PROGRESS"
  | "UNVERIFIED";

export const METRIC_TYPE_LABEL: Record<MetricType, string> = {
  ACHIEVED: "Current Result",
  TARGET: "Strategic Target",
  PROJECTED: "Projected Reach",
  ESTIMATED: "Estimate",
};

export const EVIDENCE_STATUS_LABEL: Record<EvidenceStatus, string> = {
  VERIFIED: "Verified",
  EXTERNAL_VERIFIED: "Verified — external source",
  SELF_REPORTED: "Self-reported",
  VERIFICATION_IN_PROGRESS: "Verification in progress",
  UNVERIFIED: "Unverified",
};

/** Short placeholder used inside counters, pills and cards. */
export const PENDING_METRIC = "Verification in progress";

/** Sentence-length placeholder for section-level copy. */
export const PENDING_METRIC_NOTE =
  "SCEF is currently consolidating and validating programme-level impact records. Verified statistics and supporting reports will be published progressively as the verification process is completed.";

/** Shorter variant for card bodies. */
export const PENDING_METRIC_SHORT =
  "Impact data verification in progress.";

/** True only when a metric may be shown publicly as an achieved result. */
export const isPubliclyVerifiedAchievement = (
  metricType: MetricType,
  evidenceStatus: EvidenceStatus,
  publicDisplay: boolean,
) =>
  publicDisplay &&
  metricType === "ACHIEVED" &&
  (evidenceStatus === "VERIFIED" || evidenceStatus === "EXTERNAL_VERIFIED");

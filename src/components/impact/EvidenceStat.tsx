import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  MetricType,
  METRIC_TYPE_LABEL,
  PENDING_METRIC,
} from "@/data/impactEvidence";

interface EvidenceStatProps {
  /** Display value. Leave undefined for metrics without approved evidence. */
  value?: string | null;
  label: string;
  /** Classification shown as a small caption when a value is displayed. */
  metricType?: MetricType;
  reportingPeriod?: string;
  icon?: ReactNode;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

/**
 * Renders an impact figure only when an approved value is supplied.
 * Without a value it shows the approved "verification in progress" wording,
 * so no unsupported number is ever presented as an achieved result.
 */
export const EvidenceStat = ({
  value,
  label,
  metricType,
  reportingPeriod,
  icon,
  className,
  valueClassName,
  labelClassName,
}: EvidenceStatProps) => {
  const hasValue = Boolean(value && value.trim());

  return (
    <div className={cn("text-center", className)}>
      {icon}
      <div
        className={cn(
          hasValue
            ? "font-display text-3xl font-bold text-scef-gold md:text-4xl"
            : "text-sm font-semibold italic text-muted-foreground",
          valueClassName,
        )}
      >
        {hasValue ? value : PENDING_METRIC}
      </div>
      <div className={cn("mt-1 text-sm text-muted-foreground", labelClassName)}>
        {label}
      </div>
      {hasValue && (metricType || reportingPeriod) && (
        <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground/80">
          {[metricType ? METRIC_TYPE_LABEL[metricType] : null, reportingPeriod]
            .filter(Boolean)
            .join(" · ")}
        </div>
      )}
    </div>
  );
};

export default EvidenceStat;

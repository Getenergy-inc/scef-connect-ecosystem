import { GraduationCap } from "lucide-react";

/**
 * EduAid-Africa service brand chip.
 *
 * Renders the institutional branding for every training, webinar and advocacy
 * service in the format:
 *
 *     EduAid-Africa · {Title} · {Medium}
 *
 * Use this on every training/advocacy card, calendar row, and detail header so
 * stakeholders immediately see the service owner, the service name, and the
 * medium of delivery (e.g. Webinar, Walk, Conference, School Training).
 */
export type ServiceMedium =
  | "Webinar"
  | "Conference"
  | "Advocacy Walk"
  | "School Training"
  | "Workshop"
  | "Roundtable"
  | "Mentorship Circle"
  | "Media Episode"
  | "Campaign"
  | "Showcase"
  | "Hybrid Program Week";

interface Props {
  title: string;
  medium: ServiceMedium | string;
  /** Compact = single inline chip; default = stacked label + medium pill. */
  compact?: boolean;
  className?: string;
}

export const EduAidServiceBrand = ({ title, medium, compact = false, className = "" }: Props) => {
  if (compact) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full bg-scef-blue-darker/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-scef-blue-darker ring-1 ring-scef-blue-darker/15 ${className}`}
      >
        <GraduationCap className="h-3 w-3 text-scef-gold-dark" />
        <span>EduAid-Africa</span>
        <span aria-hidden className="text-scef-blue-darker/40">·</span>
        <span className="normal-case tracking-normal">{title}</span>
        <span aria-hidden className="text-scef-blue-darker/40">·</span>
        <span className="text-scef-gold-dark">{medium}</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex flex-wrap items-center gap-1.5 ${className}`}>
      <span className="inline-flex items-center gap-1.5 rounded-md bg-scef-blue-darker px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
        <GraduationCap className="h-3 w-3 text-scef-gold" />
        EduAid-Africa
      </span>
      <span className="text-[11px] font-semibold text-scef-blue-darker">{title}</span>
      <span aria-hidden className="text-scef-blue-darker/40">·</span>
      <span className="inline-flex items-center rounded-md bg-scef-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-scef-gold-dark ring-1 ring-scef-gold/30">
        {medium}
      </span>
    </div>
  );
};

export default EduAidServiceBrand;

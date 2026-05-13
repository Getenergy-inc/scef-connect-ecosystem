import { Link } from "react-router-dom";
import { ArrowRight, CalendarRange } from "lucide-react";

interface Props {
  className?: string;
}

/**
 * Compact teaser banner that links to the NESA-Africa Master Timeline page.
 * Designed to be embedded near the top of related pages (NESA-Africa,
 * EduAid-Africa, Rebuild My School Africa, NESA TV, Donate, Monthly Advocacy).
 */
export const MasterTimelineCTA = ({ className = "" }: Props) => {
  return (
    <section className={`container mx-auto px-4 py-6 ${className}`}>
      <Link
        to="/programs/nesa-africa/timeline"
        className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-xl border border-scef-gold/40 bg-scef-blue-darker text-white p-5 md:p-6 hover:shadow-lg transition"
      >
        <div className="flex items-start md:items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-scef-gold text-scef-blue-dark">
            <CalendarRange className="w-5 h-5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
              NESA-Africa · 2026 Season
            </p>
            <p className="font-display text-lg md:text-xl font-bold">
              2026 Season Programme Timeline
            </p>
            <p className="text-sm text-white/80">
              Pre-nomination 20 May → Blue Garnet Gala 22 Oct 2026 → Rebuild My School Africa & EduAid-Africa impact through Oct 2027.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 self-start md:self-auto rounded-md bg-scef-gold text-scef-blue-dark font-semibold px-4 py-2">
          View Timeline
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
        </span>
      </Link>
    </section>
  );
};

export default MasterTimelineCTA;

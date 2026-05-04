import { ShieldCheck, BadgeCheck, FileCheck2 } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Compact trust banner shown at the top of every dashboard.
 * Reinforces SCEF's verifiable institutional identity (Reg. IT-41501)
 * and surfaces verification + governance entry points.
 */
export const DashboardTrustBanner = () => {
  return (
    <div className="mb-6 rounded-xl border border-scef-gold/30 bg-gradient-to-r from-scef-blue-darker/95 via-scef-blue-dark to-scef-blue-darker/95 text-white shadow-md overflow-hidden">
      <div className="px-4 sm:px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-scef-gold/15 border border-scef-gold/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-scef-gold" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-scef-gold font-semibold">
              Verified Institution
            </p>
            <p className="text-sm font-semibold leading-tight">
              SCEF — Registered Nonprofit Educational Foundation (NG)
            </p>
            <p className="text-xs text-white/70">
              Reg. No. <span className="font-mono text-white">IT-41501</span> · admin@santoscreations.org
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/resources/verification"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-dark transition-colors"
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            Verify Certificate
          </Link>
          <Link
            to="/governance"
            className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-white/25 text-white hover:bg-white/10 transition-colors"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            Governance
          </Link>
        </div>
      </div>
    </div>
  );
};

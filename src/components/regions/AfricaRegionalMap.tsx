import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AFRICA_REGIONS,
  SCEF_BRAND,
  STATUS_LABEL,
  type AfricaRegion,
} from "@/data/africaRegions";
import {
  GraduationCap,
  Wallet,
  Vote,
  Accessibility,
  Users,
  Building2,
  MapPin,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

// Simplified Africa silhouette path (decorative, donor-ready outline).
const AFRICA_PATH =
  "M50 6 L62 8 L72 14 L78 22 L82 30 L80 38 L84 46 L82 56 L78 64 L74 72 L70 80 L62 88 L54 92 L46 90 L40 82 L36 74 L32 66 L28 58 L24 50 L22 42 L24 34 L28 26 L34 18 L42 10 Z";

const STATUS_TONE: Record<string, string> = {
  active: "bg-[#0F8A5F] text-white",
  proposed: "bg-[#D4AF37]/20 text-[#7a6420] border border-[#D4AF37]/40",
  planned: "bg-white text-[#0B1F3A] border border-[#0B1F3A]/20",
  "to-be-activated": "bg-[#0B1F3A]/10 text-[#0B1F3A] border border-[#0B1F3A]/20",
};

interface Props {
  /** Where region CTAs should link. `/regions/:slug` (default) or `/chapters/:slug`. */
  detailBase?: "/regions" | "/chapters";
  /** Tone for outer section background. */
  variant?: "light" | "navy";
  showHeader?: boolean;
}

export const AfricaRegionalMap = ({
  detailBase = "/regions",
  variant = "light",
  showHeader = true,
}: Props) => {
  const [active, setActive] = useState<AfricaRegion>(AFRICA_REGIONS[1]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const onContinent = AFRICA_REGIONS.filter((r) => !r.offContinent);
  const offContinent = AFRICA_REGIONS.filter((r) => r.offContinent);

  const sectionBg = variant === "navy" ? SCEF_BRAND.navy : SCEF_BRAND.lightBg;
  const headingColor = variant === "navy" ? "#FFFFFF" : SCEF_BRAND.navy;
  const subColor = variant === "navy" ? "rgba(255,255,255,0.78)" : "#475569";

  return (
    <section
      aria-labelledby="africa-regions-heading"
      className="py-16 md:py-24"
      style={{ backgroundColor: sectionBg }}
    >
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                backgroundColor: `${SCEF_BRAND.gold}22`,
                color: SCEF_BRAND.goldDeep,
              }}
            >
              <MapPin className="w-3.5 h-3.5" /> One Continent · Ten Regions
            </div>
            <h2
              id="africa-regions-heading"
              className="font-display text-3xl md:text-5xl font-bold tracking-tight"
              style={{ color: headingColor }}
            >
              Explore Africa's Regions
            </h2>
            <p
              className="mt-4 text-base md:text-lg leading-relaxed"
              style={{ color: subColor }}
            >
              Discover the education champions, cultural heritage, local chapter
              activities, edu-tourism opportunities, Special Needs School
              nominations, regional voting, GFA Wzip regional wallets, and
              Rebuild My School Africa interventions connected to the 2026–2027
              NESA-Africa Legacy Impact pathway.
            </p>
          </div>
        )}

        {/* Desktop: map + active card */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          {/* Map */}
          <div className="col-span-7">
            <div
              className="relative rounded-3xl p-6 shadow-sm border"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: `${SCEF_BRAND.navy}14`,
              }}
            >
              <svg
                viewBox="0 0 100 100"
                role="img"
                aria-label="Map of Africa highlighting ten SCEF regions"
                className="w-full h-auto"
              >
                <defs>
                  <linearGradient id="africaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={SCEF_BRAND.navy} stopOpacity="0.92" />
                    <stop offset="100%" stopColor={SCEF_BRAND.navyDeep} stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d={AFRICA_PATH}
                  fill="url(#africaFill)"
                  stroke={SCEF_BRAND.gold}
                  strokeOpacity="0.45"
                  strokeWidth="0.4"
                />
                {onContinent.map((r) => {
                  const isActive = r.slug === active.slug;
                  return (
                    <g
                      key={r.slug}
                      transform={`translate(${r.mapX} ${r.mapY})`}
                      className="cursor-pointer"
                      onClick={() => setActive(r)}
                      onMouseEnter={() => setActive(r)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${r.name} region`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") setActive(r);
                      }}
                    >
                      <circle
                        r={isActive ? 3.2 : 2.4}
                        fill={isActive ? SCEF_BRAND.gold : SCEF_BRAND.white}
                        stroke={isActive ? SCEF_BRAND.gold : SCEF_BRAND.navy}
                        strokeWidth="0.5"
                      />
                      {isActive && (
                        <circle
                          r="5"
                          fill="none"
                          stroke={SCEF_BRAND.gold}
                          strokeOpacity="0.45"
                          strokeWidth="0.6"
                        />
                      )}
                      <text
                        y="-4"
                        textAnchor="middle"
                        fontSize="2.6"
                        fontWeight={isActive ? 700 : 500}
                        fill={isActive ? SCEF_BRAND.gold : SCEF_BRAND.white}
                      >
                        {r.shortName}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Off-continent chips */}
              <div className="mt-4 flex flex-wrap gap-2">
                {offContinent.map((r) => {
                  const isActive = r.slug === active.slug;
                  return (
                    <button
                      key={r.slug}
                      type="button"
                      onClick={() => setActive(r)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
                      style={{
                        backgroundColor: isActive
                          ? SCEF_BRAND.gold
                          : `${SCEF_BRAND.navy}10`,
                        color: isActive ? SCEF_BRAND.navy : SCEF_BRAND.navy,
                        border: `1px solid ${
                          isActive ? SCEF_BRAND.gold : `${SCEF_BRAND.navy}20`
                        }`,
                      }}
                    >
                      {r.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active region card */}
          <div className="col-span-5">
            <RegionCard region={active} detailBase={detailBase} />
          </div>
        </div>

        {/* Mobile / tablet: stacked accordions */}
        <div className="lg:hidden space-y-3">
          {/* Simplified SVG also on mobile */}
          <div
            className="rounded-2xl p-4 border"
            style={{
              backgroundColor: "#FFFFFF",
              borderColor: `${SCEF_BRAND.navy}14`,
            }}
          >
            <svg
              viewBox="0 0 100 100"
              role="img"
              aria-label="Map of Africa highlighting ten SCEF regions"
              className="w-full h-auto max-h-72"
            >
              <path
                d={AFRICA_PATH}
                fill={SCEF_BRAND.navy}
                stroke={SCEF_BRAND.gold}
                strokeOpacity="0.45"
                strokeWidth="0.4"
              />
              {onContinent.map((r) => (
                <g
                  key={r.slug}
                  transform={`translate(${r.mapX} ${r.mapY})`}
                  onClick={() => setOpenSlug(r.slug)}
                >
                  <circle r="2.6" fill={SCEF_BRAND.gold} />
                </g>
              ))}
            </svg>
          </div>

          {AFRICA_REGIONS.map((r) => {
            const open = openSlug === r.slug;
            return (
              <div
                key={r.slug}
                className="rounded-2xl border bg-white overflow-hidden"
                style={{ borderColor: `${SCEF_BRAND.navy}1f` }}
              >
                <button
                  type="button"
                  onClick={() => setOpenSlug(open ? null : r.slug)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left"
                  aria-expanded={open}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: SCEF_BRAND.gold }}
                    />
                    <span
                      className="font-semibold"
                      style={{ color: SCEF_BRAND.navy }}
                    >
                      {r.name}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      open ? "rotate-180" : ""
                    }`}
                    style={{ color: SCEF_BRAND.navy }}
                  />
                </button>
                {open && (
                  <div className="px-4 pb-5">
                    <RegionCard
                      region={r}
                      detailBase={detailBase}
                      compact
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p
          className="mt-10 max-w-3xl mx-auto text-center text-sm md:text-base leading-relaxed"
          style={{ color: subColor }}
        >
          Each region connects to the 2026–2027 NESA-Africa Legacy Impact pathway —
          EduAid-Africa Edu-Tourism Conferences, Special Needs School nominations,
          regional voting, GFA Wzip regional wallets, and Rebuild My School Africa
          interventions.
        </p>
      </div>
    </section>
  );
};

const RegionCard = ({
  region,
  detailBase,
  compact = false,
}: {
  region: AfricaRegion;
  detailBase: "/regions" | "/chapters";
  compact?: boolean;
}) => {
  const badges: { icon: typeof GraduationCap; label: string; status: string }[] = [
    { icon: Accessibility, label: "Special Needs nominations", status: region.nominationStatus },
    { icon: Vote, label: "Regional voting", status: region.votingStatus },
    { icon: Wallet, label: "GFA Wzip wallet", status: region.walletStatus },
    { icon: Building2, label: "Rebuild My School", status: region.interventionStatus },
    { icon: GraduationCap, label: "EduAid Edu-Tourism", status: region.eduTourismStatus },
    { icon: Users, label: "Local chapter", status: region.chapterStatus },
  ];

  return (
    <div
      className={`rounded-3xl border bg-white p-6 md:p-7 shadow-sm ${compact ? "" : ""}`}
      style={{ borderColor: `${SCEF_BRAND.navy}1f` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span
          className="px-2.5 py-1 rounded-full text-[11px] font-semibold"
          style={{
            backgroundColor: `${SCEF_BRAND.gold}1f`,
            color: SCEF_BRAND.goldDeep,
          }}
        >
          Region
        </span>
        <h3
          className="font-display text-xl md:text-2xl font-bold"
          style={{ color: SCEF_BRAND.navy }}
        >
          {region.name}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-slate-600 mb-4">
        {region.summary}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-5">
        {badges.map(({ icon: Icon, label, status }) => (
          <span
            key={label}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-medium ${STATUS_TONE[status]}`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {label}: {STATUS_LABEL[status as keyof typeof STATUS_LABEL]}
            </span>
          </span>
        ))}
      </div>

      <div
        className="rounded-xl p-3 mb-5 text-xs leading-relaxed"
        style={{
          backgroundColor: SCEF_BRAND.lightBg,
          color: SCEF_BRAND.navy,
        }}
      >
        <span className="font-semibold">Legacy Pathway: </span>
        {region.legacyPathway}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Link
          to={`${detailBase}/${region.slug}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#0B1F3A] hover:opacity-90 transition"
          style={{ backgroundColor: SCEF_BRAND.gold }}
        >
          View {region.shortName} <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          to={`/nominate?region=${region.slug}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition"
          style={{ backgroundColor: SCEF_BRAND.green }}
        >
          Nominate a School
        </Link>
        <Link
          to={`/vote?region=${region.slug}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition"
          style={{ backgroundColor: SCEF_BRAND.navy }}
        >
          Vote for Intervention
        </Link>
        <Link
          to={`/wallet?region=${region.slug}`}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold border hover:bg-slate-50 transition"
          style={{ borderColor: `${SCEF_BRAND.navy}33`, color: SCEF_BRAND.navy }}
        >
          Support Regional Wallet
        </Link>
        <Link
          to={`/chapters?region=${encodeURIComponent(region.name)}`}
          className="sm:col-span-2 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold border hover:bg-slate-50 transition"
          style={{ borderColor: `${SCEF_BRAND.navy}33`, color: SCEF_BRAND.navy }}
        >
          Join Local Chapter
        </Link>
      </div>
    </div>
  );
};

export default AfricaRegionalMap;

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

// Tessellated region polygons (decorative, donor-ready). Coordinates in a
// 0–100 viewBox approximating the African continent silhouette.
const REGION_POLYGONS: Record<string, { points: string; cx: number; cy: number }> = {
  "north-africa":   { points: "30,6 70,6 80,16 76,26 30,26 22,18", cx: 50, cy: 16 },
  "sahel-region":   { points: "30,28 64,28 66,40 58,46 36,46 26,38", cx: 46, cy: 37 },
  "west-africa":    { points: "6,40 24,32 30,44 28,56 16,62 4,52",  cx: 16, cy: 47 },
  "horn-of-africa": { points: "76,28 92,30 94,42 84,46 76,40",       cx: 84, cy: 37 },
  "central-africa": { points: "32,48 58,48 60,60 50,68 38,68 30,58", cx: 45, cy: 58 },
  "east-africa":    { points: "62,48 76,48 80,58 74,68 64,66 60,58", cx: 70, cy: 58 },
  "southern-africa":{ points: "30,70 62,70 70,82 56,94 38,94 24,82", cx: 46, cy: 82 },
  "indian-ocean":   { points: "84,74 94,74 96,82 90,90 82,84",       cx: 89, cy: 82 },
};

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
              <MapPin className="w-3.5 h-3.5" /> 8 African Regions · 2 Global Networks
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
              SCEF and NESA-Africa organise the continent into{" "}
              <strong>8 approved African regions</strong> — North, West, Central,
              East, Southern, Sahel, Horn of Africa, and Indian Ocean — extended
              by <strong>2 global networks</strong>: the African Diaspora and
              Friends of Africa. Each region connects to Special Needs School
              nominations, regional voting, GFA Wzip regional wallets, and
              Rebuild My School Africa interventions across the 2026–2027
              NESA-Africa Legacy Impact pathway.
            </p>
          </div>
        )}

        {/* Desktop: map + active card */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          {/* Map */}
          <div className="col-span-7">
            <div
              className="relative rounded-3xl p-6 shadow-lg border overflow-hidden"
              style={{
                background: `radial-gradient(120% 90% at 30% 20%, ${SCEF_BRAND.navy} 0%, ${SCEF_BRAND.navyDeep} 70%)`,
                borderColor: `${SCEF_BRAND.gold}33`,
              }}
            >
              <svg
                viewBox="0 0 100 100"
                role="img"
                aria-label="Map of Africa highlighting 8 SCEF regions and 2 global networks"
                className="w-full h-auto"
              >
                <defs>
                  <filter id="regionGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="1.6" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {onContinent.map((r) => {
                  const poly = REGION_POLYGONS[r.slug];
                  if (!poly) return null;
                  const isActive = r.slug === active.slug;
                  return (
                    <g
                      key={r.slug}
                      className="cursor-pointer outline-none group"
                      onClick={() => setActive(r)}
                      onMouseEnter={() => setActive(r)}
                      onFocus={() => setActive(r)}
                      tabIndex={0}
                      role="button"
                      aria-label={`${r.name} region`}
                      aria-pressed={isActive}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActive(r);
                        }
                      }}
                    >
                      <polygon
                        points={poly.points}
                        fill={isActive ? SCEF_BRAND.gold : `${SCEF_BRAND.navy}E6`}
                        fillOpacity={isActive ? 1 : 0.92}
                        stroke={SCEF_BRAND.gold}
                        strokeOpacity={isActive ? 1 : 0.55}
                        strokeWidth={isActive ? 0.6 : 0.4}
                        filter={isActive ? "url(#regionGlow)" : undefined}
                        className="transition-all duration-300 group-hover:[fill:hsl(45_92%_52%)] group-hover:[stroke-width:0.7] group-focus-visible:[stroke:#ffffff] group-focus-visible:[stroke-width:0.9]"
                      />
                      <text
                        x={poly.cx}
                        y={poly.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="3"
                        fontWeight={isActive ? 700 : 600}
                        fill={isActive ? SCEF_BRAND.navy : "#FFFFFF"}
                        pointerEvents="none"
                        className="transition-colors duration-300 group-hover:[fill:hsl(221_53%_12%)]"
                        style={{ letterSpacing: "0.04em" }}
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
                          : "transparent",
                        color: isActive ? SCEF_BRAND.navy : SCEF_BRAND.gold,
                        border: `1px solid ${
                          isActive ? SCEF_BRAND.gold : `${SCEF_BRAND.gold}66`
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
            className="rounded-2xl p-4 border overflow-hidden"
            style={{
              background: `radial-gradient(120% 90% at 30% 20%, ${SCEF_BRAND.navy} 0%, ${SCEF_BRAND.navyDeep} 70%)`,
              borderColor: `${SCEF_BRAND.gold}33`,
            }}
          >
            <svg
              viewBox="0 0 100 100"
              role="img"
              aria-label="Map of Africa highlighting 8 SCEF regions"
              className="w-full h-auto max-h-80"
            >
              {onContinent.map((r) => {
                const poly = REGION_POLYGONS[r.slug];
                if (!poly) return null;
                const isOpen = openSlug === r.slug;
                return (
                  <g
                    key={r.slug}
                    onClick={() => setOpenSlug(isOpen ? null : r.slug)}
                    className="cursor-pointer"
                  >
                    <polygon
                      points={poly.points}
                      fill={isOpen ? SCEF_BRAND.gold : `${SCEF_BRAND.navy}E6`}
                      stroke={SCEF_BRAND.gold}
                      strokeOpacity={isOpen ? 1 : 0.55}
                      strokeWidth="0.4"
                    />
                    <text
                      x={poly.cx}
                      y={poly.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="2.8"
                      fontWeight={600}
                      fill={isOpen ? SCEF_BRAND.navy : "#FFFFFF"}
                      pointerEvents="none"
                    >
                      {r.shortName}
                    </text>
                  </g>
                );
              })}
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

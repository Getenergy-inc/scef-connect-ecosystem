// SCEF Local Chapter status rules — single source of truth.
// Statuses are derived deterministically from region/country data so the
// region and country detail pages always show the same value.

import {
  REGION_BY_SLUG,
  type ScefCountry,
  type ScefRegion,
  type ScefRegionSlug,
} from "@/data/scefRegions";

export type ChapterStatus = "active" | "pending" | "archived";

export type ChapterStatusInfo = {
  status: ChapterStatus;
  label: string; // user-facing
  description: string; // short rule explanation
  badgeClass: string; // tailwind classes for badge styling
  dotClass: string; // tailwind classes for status dot
};

// Countries/regions explicitly archived (paused operations). Empty for now —
// extend as governance decisions are recorded.
const ARCHIVED_REGION_SLUGS: ScefRegionSlug[] = [];
const ARCHIVED_COUNTRY_SLUGS: string[] = [];

const STATUS_STYLES: Record<ChapterStatus, Pick<ChapterStatusInfo, "label" | "badgeClass" | "dotClass">> = {
  active: {
    label: "Active",
    badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    dotClass: "bg-emerald-500",
  },
  pending: {
    label: "Pending",
    badgeClass: "bg-amber-500/10 text-amber-700 border-amber-500/30",
    dotClass: "bg-amber-500",
  },
  archived: {
    label: "Archived",
    badgeClass: "bg-muted text-muted-foreground border-border",
    dotClass: "bg-muted-foreground",
  },
};

// Region rule:
//   archived → on the archive list
//   active   → GFA Wallet is Active AND at least one linked program
//   pending  → everything else (Forming / Pending Setup / no programs)
export function getRegionStatus(region: ScefRegion): ChapterStatusInfo {
  let status: ChapterStatus;
  let description: string;

  if (ARCHIVED_REGION_SLUGS.includes(region.slug)) {
    status = "archived";
    description = "Regional chapter operations are paused pending governance review.";
  } else if (region.walletStatus === "Active" && region.linkedPrograms.length > 0) {
    status = "active";
    description = "GFA Wallet is live and linked SCEF programs are running in this region.";
  } else {
    status = "pending";
    description =
      region.walletStatus === "Pending Setup"
        ? "Regional GFA Wallet setup is pending; chapter is in preparation."
        : "Regional chapter is forming — onboarding members and activating the GFA Wallet.";
  }

  return { status, description, ...STATUS_STYLES[status] };
}

// Country rule: inherits from primary region, downgraded to pending if the
// region is active but the country has no specific activation signal.
// (No per-country activation data yet → all countries currently inherit
// "pending" until reporting comes online, except when explicitly archived.)
export function getCountryStatus(country: ScefCountry): ChapterStatusInfo {
  if (ARCHIVED_COUNTRY_SLUGS.includes(country.slug)) {
    return {
      status: "archived",
      description: "Country chapter is archived pending governance review.",
      ...STATUS_STYLES.archived,
    };
  }

  const region = REGION_BY_SLUG[country.primaryRegion];
  const regionStatus = getRegionStatus(region);

  // Country chapters remain "pending" until per-country activation reporting
  // is available, even when the parent region is active.
  if (regionStatus.status === "active") {
    return {
      status: "pending",
      description: `${region.name} is active; country activation reporting is in progress.`,
      ...STATUS_STYLES.pending,
    };
  }

  return regionStatus;
}

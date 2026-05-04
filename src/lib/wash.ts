// School WASH (Water, Sanitation & Hygiene) types and constants

export const WASH_NEEDS_CATEGORIES = [
  "Toilet Construction",
  "Toilet Renovation",
  "Girls' Hygiene Facilities",
  "Menstrual Hygiene Support",
  "Handwashing Stations",
  "Solar Water System",
  "Disability-Friendly Toilets",
  "Hygiene Education & Training",
] as const;

export const WASH_SPONSORSHIP_TYPES = [
  { value: "toilets", label: "School Toilets" },
  { value: "hygiene", label: "Girls' Hygiene & MHM" },
  { value: "water", label: "Water & Solar Systems" },
  { value: "disability_access", label: "Disability-Friendly Access" },
  { value: "general", label: "General WASH Support" },
] as const;

export type WashSponsorshipType = (typeof WASH_SPONSORSHIP_TYPES)[number]["value"];

export interface WashNominationInput {
  school_name: string;
  school_address: string;
  country: string;
  region?: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  enrollment_total?: number;
  girls_enrollment?: number;
  current_facilities?: string;
  needs_summary: string;
  needs_categories: string[];
  has_water_access?: boolean;
  has_disability_access?: boolean;
}

export interface WashSponsorshipInput {
  sponsor_name: string;
  sponsor_email: string;
  sponsor_phone?: string;
  organization?: string;
  sponsorship_type: WashSponsorshipType;
  amount_pledged?: number;
  currency?: string;
  preferred_country?: string;
  message?: string;
}

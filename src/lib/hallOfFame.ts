export interface HoFProfile {
  id: string;
  user_id: string | null;
  slug: string;
  full_name: string;
  photo_url: string | null;
  role: string;
  contribution_type: string | null;
  year_start: number | null;
  year_end: number | null;
  program_supported: string | null;
  country: string | null;
  region: string | null;
  contribution_summary: string | null;
  testimony: string | null;
  badge: string | null;
  is_verified: boolean;
  is_featured: boolean;
  consent_public_display: boolean;
  status: "pending" | "approved" | "rejected";
  social_links: Record<string, string> | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  submitted_email: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface HoFMedia {
  id: string;
  profile_id: string;
  media_url: string;
  media_type: string;
  caption: string | null;
  display_order: number;
  created_at: string;
}

export const HOF_ROLES = [
  "Volunteer",
  "Ambassador",
  "Staff",
  "Donor",
  "Partner",
  "Sponsor",
  "Contributor",
  "Board Member",
  "Chapter Lead",
];

export const HOF_CONTRIBUTION_TYPES = [
  "Financial",
  "Time & Skills",
  "Advocacy",
  "Mentorship",
  "Logistics",
  "Media & Communications",
  "In-kind",
  "Strategic Partnership",
];

export const HOF_PROGRAMS = [
  "EduAid Africa",
  "Rebuild My School Africa",
  "Women & Girls Education",
  "Special Needs Education",
  "Education Online Africa",
  "eLibrary Nigeria",
  "NESA-Africa",
  "Santos Media",
  "Local Chapters",
  "General Operations",
];

export const HOF_BADGES = [
  "Pioneer (2007–2012)",
  "Decade Builder (2013–2019)",
  "Continental Champion (2020+)",
  "Lifetime Honour",
  "Recognition of Service",
];

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export function uniqueSlug(name: string): string {
  return `${slugify(name)}-${Math.random().toString(36).slice(2, 7)}`;
}

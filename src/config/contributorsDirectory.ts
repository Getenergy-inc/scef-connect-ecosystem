/**
 * Single source of truth for the SCEF Contributor Directory.
 *
 * EVERY contributor entry is a PLACEHOLDER awaiting a real passport
 * photograph / headshot from SCEF, NESA-Africa, EduAid-Africa,
 * volunteer / ambassador records and Facebook archive sources.
 *
 * To add a real passport photo later:
 *   1. Drop the file in `src/assets/photos/contributors/<slug>.jpg`
 *   2. Import it and set the `photo` field on the matching entry.
 *   3. The circular avatar will automatically replace the placeholder.
 *
 * RULES:
 *  - No AI-generated faces.
 *  - No stock people.
 *  - No generic cartoon avatars.
 *  - Names below are intentionally generic role labels so we never
 *    misattribute a real person until verified records arrive.
 */

export type ContributorRole =
  | "Volunteer"
  | "Ambassador"
  | "Partner"
  | "Educator"
  | "Contributor"
  | "Intern"
  | "Chapter Executive";

export type ContributorBadge =
  | "Founding Volunteer"
  | "Ambassador"
  | "Local Chapter Executive"
  | "Education Advocate"
  | "Media Contributor"
  | "Sustainability Advocate"
  | "BOA Member"
  | "Youth Leader";

export type ContributorProgram =
  | "NESA-Africa"
  | "EduAid-Africa"
  | "Advocacy"
  | "ESG"
  | "Media"
  | "Local Chapter"
  | "Teacher Training"
  | "RMSA"
  | "EOA";

export type ContributorCategory =
  | "founding"
  | "volunteer-leaders"
  | "ambassadors"
  | "educators"
  | "media-advocacy"
  | "chapter-presidents"
  | "boa"
  | "youth-leaders"
  | "sustainability";

export const contributorCategoryLabels: Record<ContributorCategory, string> = {
  founding: "Founding Contributors",
  "volunteer-leaders": "Volunteer Leaders",
  ambassadors: "Ambassadors",
  educators: "Educators & Trainers",
  "media-advocacy": "Media & Advocacy Team",
  "chapter-presidents": "Local Chapter Presidents",
  boa: "BOA Members",
  "youth-leaders": "Youth Leaders",
  sustainability: "Sustainability Advocates",
};

export interface Contributor {
  id: string;
  /** Display name. Until verified records arrive, use a respectful role label. */
  name: string;
  role: ContributorRole;
  country: string;
  chapter?: string;
  yearJoined: string;
  summary: string;
  programs: ContributorProgram[];
  badges: ContributorBadge[];
  categories: ContributorCategory[];
  /** Optional real passport photo / headshot. Leave undefined to render placeholder. */
  photo?: string;
  links?: { label: string; href: string }[];
  /** Optional longer story shown in the profile modal. */
  story?: string;
  /** Optional event photo IDs from volunteersArchive. */
  eventPhotoIds?: string[];
}

/**
 * Seed directory — placeholder roster. Replace `name` and set `photo`
 * as real records & passport photographs are uploaded into the project.
 */
export const contributors: Contributor[] = [
  {
    id: "c-founding-1",
    name: "Founding Volunteer (record pending)",
    role: "Volunteer",
    country: "Nigeria",
    chapter: "Niger State",
    yearJoined: "2007",
    summary: "Early SCEF volunteer supporting community education outreach in Minna.",
    programs: ["Advocacy", "Local Chapter"],
    badges: ["Founding Volunteer", "Education Advocate"],
    categories: ["founding", "volunteer-leaders"],
  },
  {
    id: "c-aiesec-1",
    name: "AIESEC Cohort Volunteer (record pending)",
    role: "Intern",
    country: "Nigeria",
    chapter: "Kwara State",
    yearJoined: "2008",
    summary: "Joined SCEF through AIESEC partnership for school outreach activities.",
    programs: ["Advocacy", "Teacher Training"],
    badges: ["Founding Volunteer"],
    categories: ["founding", "volunteer-leaders"],
  },
  {
    id: "c-vso-1",
    name: "VSO Partner Volunteer (record pending)",
    role: "Partner",
    country: "Nigeria",
    chapter: "Kwara State",
    yearJoined: "2013",
    summary: "Engaged through VSO programme with the Kwara State Ministry of Education.",
    programs: ["Teacher Training", "Local Chapter"],
    badges: ["Education Advocate"],
    categories: ["volunteer-leaders", "educators"],
  },
  {
    id: "c-eduaid-1",
    name: "EduAid-Africa Coordinator (record pending)",
    role: "Contributor",
    country: "Nigeria",
    yearJoined: "2015",
    summary: "Supports EduAid-Africa scholarships and learner sponsorship programmes.",
    programs: ["EduAid-Africa", "Advocacy"],
    badges: ["Education Advocate"],
    categories: ["volunteer-leaders", "educators"],
  },
  {
    id: "c-amb-1",
    name: "NESA-Africa Ambassador (record pending)",
    role: "Ambassador",
    country: "Ghana",
    yearJoined: "2020",
    summary: "Continental ambassador advancing NESA-Africa standards engagement.",
    programs: ["NESA-Africa", "Advocacy"],
    badges: ["Ambassador", "Education Advocate"],
    categories: ["ambassadors"],
  },
  {
    id: "c-amb-2",
    name: "NESA-Africa Ambassador (record pending)",
    role: "Ambassador",
    country: "Kenya",
    yearJoined: "2021",
    summary: "East Africa ambassador supporting educator recognition campaigns.",
    programs: ["NESA-Africa", "Media"],
    badges: ["Ambassador", "Media Contributor"],
    categories: ["ambassadors", "media-advocacy"],
  },
  {
    id: "c-chapter-1",
    name: "Local Chapter President (record pending)",
    role: "Chapter Executive",
    country: "Nigeria",
    chapter: "Lagos",
    yearJoined: "2023",
    summary: "Leads chapter activations, school outreach and community advocacy.",
    programs: ["Local Chapter", "Advocacy", "RMSA"],
    badges: ["Local Chapter Executive"],
    categories: ["chapter-presidents", "volunteer-leaders"],
  },
  {
    id: "c-chapter-2",
    name: "Local Chapter President (record pending)",
    role: "Chapter Executive",
    country: "Rwanda",
    chapter: "Kigali",
    yearJoined: "2024",
    summary: "Pan-African chapter rollout — community learning hubs.",
    programs: ["Local Chapter", "EduAid-Africa"],
    badges: ["Local Chapter Executive"],
    categories: ["chapter-presidents"],
  },
  {
    id: "c-edu-1",
    name: "Teacher Trainer (record pending)",
    role: "Educator",
    country: "Nigeria",
    yearJoined: "2018",
    summary: "Facilitates SCEF teacher development workshops across regional hubs.",
    programs: ["Teacher Training", "EduAid-Africa"],
    badges: ["Education Advocate"],
    categories: ["educators"],
  },
  {
    id: "c-media-1",
    name: "NESA TV Contributor (record pending)",
    role: "Contributor",
    country: "Nigeria",
    yearJoined: "2022",
    summary: "Production support for NESA TV broadcasts and documentary content.",
    programs: ["Media", "NESA-Africa"],
    badges: ["Media Contributor"],
    categories: ["media-advocacy"],
  },
  {
    id: "c-media-2",
    name: "It's In Me Radio Host (record pending)",
    role: "Contributor",
    country: "Nigeria",
    yearJoined: "2020",
    summary: "Hosts education advocacy episodes on It's In Me Radio.",
    programs: ["Media", "Advocacy"],
    badges: ["Media Contributor", "Education Advocate"],
    categories: ["media-advocacy"],
  },
  {
    id: "c-esg-1",
    name: "ESG Campaign Lead (record pending)",
    role: "Volunteer",
    country: "Nigeria",
    yearJoined: "2022",
    summary: "Drives ESG and sustainability advocacy across local chapters.",
    programs: ["ESG", "Advocacy"],
    badges: ["Sustainability Advocate"],
    categories: ["sustainability", "volunteer-leaders"],
  },
  {
    id: "c-youth-1",
    name: "Youth Leader (record pending)",
    role: "Volunteer",
    country: "Senegal",
    yearJoined: "2024",
    summary: "Mobilises youth participation in continental advocacy walks.",
    programs: ["Advocacy", "Local Chapter"],
    badges: ["Youth Leader"],
    categories: ["youth-leaders"],
  },
  {
    id: "c-boa-1",
    name: "BOA Member (record pending)",
    role: "Partner",
    country: "Nigeria",
    yearJoined: "2024",
    summary: "Provides governance oversight as a Board of Advisors member.",
    programs: ["Advocacy", "NESA-Africa"],
    badges: ["BOA Member", "Education Advocate"],
    categories: ["boa"],
  },
];

export const allCountries = Array.from(new Set(contributors.map((c) => c.country))).sort();
export const allRoles: ContributorRole[] = [
  "Volunteer",
  "Ambassador",
  "Partner",
  "Educator",
  "Contributor",
  "Intern",
  "Chapter Executive",
];
export const allPrograms: ContributorProgram[] = [
  "NESA-Africa",
  "EduAid-Africa",
  "Advocacy",
  "ESG",
  "Media",
  "Local Chapter",
  "Teacher Training",
  "RMSA",
  "EOA",
];
export const allYears = Array.from(new Set(contributors.map((c) => c.yearJoined))).sort();

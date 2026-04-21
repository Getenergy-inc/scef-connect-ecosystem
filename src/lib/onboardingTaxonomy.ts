// Shared taxonomies for onboarding forms — kept in one place so they stay
// consistent with the seeded `services` and `membership_types` tables.

export const SERVICE_OPTIONS = [
  { value: "scholarships", label: "Scholarships & Learner Support" },
  { value: "rmsa", label: "School Infrastructure / RMSA" },
  { value: "women-girls", label: "Women & Girls Education" },
  { value: "special-needs", label: "Special Needs Education" },
  { value: "eoa", label: "Digital Learning / EOA" },
  { value: "elibrary", label: "eLibrary / Knowledge Access" },
  { value: "nesa", label: "NESA / Recognition & Awards" },
  { value: "tvet", label: "TVET / Skills Development" },
  { value: "media", label: "Media & Advocacy" },
  { value: "chapters", label: "Local Chapters" },
  { value: "csr", label: "CSR Funded Projects" },
  { value: "research", label: "Research / Policy / Governance" },
];

export const MEMBERSHIP_TIERS = [
  { value: "general", label: "General Member", price: "Free" },
  { value: "youth", label: "Youth Member (18–35)", price: "Free" },
  { value: "standard", label: "Standard Member", price: "$50/yr" },
  { value: "organizational", label: "Organizational Member", price: "$500/yr" },
  { value: "lifetime", label: "Lifetime Member", price: "$1,000 one-time" },
];

export const AGE_BANDS = [
  { value: "under-18", label: "Under 18" },
  { value: "18-25", label: "18–25" },
  { value: "26-35", label: "26–35" },
  { value: "36-45", label: "36–45" },
  { value: "46-60", label: "46–60" },
  { value: "60-plus", label: "60+" },
];

export const AMBASSADOR_TIERS = [
  { value: "youth", label: "Youth Ambassador" },
  { value: "standard", label: "Standard Ambassador" },
  { value: "honorary", label: "Honorary Ambassador" },
];

export const ADVOCACY_FOCUS = [
  { value: "girls-education", label: "Girls' Education" },
  { value: "rural-access", label: "Rural Access" },
  { value: "digital-skills", label: "Digital Skills" },
  { value: "special-needs", label: "Special Needs" },
  { value: "tvet", label: "TVET / Vocational" },
  { value: "policy", label: "Policy & Research" },
];

export const HOURS_PER_MONTH = [
  { value: 5, label: "1–5 hours" },
  { value: 10, label: "6–10 hours" },
  { value: 20, label: "11–20 hours" },
  { value: 40, label: "20+ hours" },
];

export const FUNDING_RANGES = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-50k", label: "$10,000 – $50,000" },
  { value: "50k-250k", label: "$50,000 – $250,000" },
  { value: "250k-1m", label: "$250,000 – $1M" },
  { value: "1m-plus", label: "$1M+" },
];

export const PARTNERSHIP_TYPES = [
  { value: "csr-funding", label: "CSR Funding" },
  { value: "in-kind", label: "In-kind Support" },
  { value: "media", label: "Media Partnership" },
  { value: "research", label: "Research Collaboration" },
  { value: "scholarship", label: "Scholarship Sponsorship" },
];

export const AFRICAN_REGIONS = [
  { value: "west-africa", label: "West Africa" },
  { value: "east-africa", label: "East Africa" },
  { value: "north-africa", label: "North Africa" },
  { value: "central-africa", label: "Central Africa" },
  { value: "southern-africa", label: "Southern Africa" },
  { value: "diaspora", label: "Diaspora" },
];

export const ENDORSEMENT_TYPES = [
  { value: "institutional", label: "Institutional Endorsement" },
  { value: "advisory", label: "Advisory Support" },
  { value: "moral", label: "Moral Endorsement" },
  { value: "strategic", label: "Strategic Partnership" },
];

export const INSTITUTION_TYPES = [
  { value: "ngo", label: "NGO / Non-profit" },
  { value: "academic", label: "Academic Institution" },
  { value: "government", label: "Government Agency" },
  { value: "intl-org", label: "International Organization" },
  { value: "private", label: "Private Sector" },
  { value: "faith", label: "Faith-based Organization" },
];

export const AWARDS_ROLES = [
  { value: "applicant", label: "Applicant / Nominee" },
  { value: "judge", label: "Judge / Jury Member" },
  { value: "nrc", label: "NRC (National Research Committee)" },
  { value: "sponsor", label: "Awards Sponsor" },
];

export const CHAPTER_INTENT = [
  { value: "join-existing", label: "Join an existing chapter" },
  { value: "start-new", label: "Apply to start a new chapter" },
  { value: "express-interest", label: "Express interest (no immediate assignment)" },
];

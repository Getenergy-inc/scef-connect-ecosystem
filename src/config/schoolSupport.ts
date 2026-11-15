/**
 * Single source of truth for "Support a Special-Needs School Across Africa".
 * A Rebuild My School Africa (RMSA) service, delivered by EduAid-Africa for SCEF.
 */
export const BASE = "https://0dccfe96-032e-496e-82bd-c8af7c5b9e55.lovableproject.com/support-a-special-needs-school";
export const CANONICAL_URL = "https://eduaid.africa/support-a-special-needs-school";
export const SITE = "scef" as const;

export const VOTING_OPEN = false as const;
export const COUNTRY_MAP_APPROVED = false as const;
export const SUPPORTER_DASHBOARD_ENABLED = false as const;
export const SUPPORTER_DASHBOARD_URL = "https://eduaid.africa/account";

export const OWNERSHIP_LINE =
  "Support a Special-Needs School Across Africa is a service of Rebuild My School Africa (RMSA), an EduAid-Africa programme of Santos Creations Educational Foundation (SCEF).";
export const SERVICE_BAND =
  "A Rebuild My School Africa service, delivered by EduAid-Africa for Santos Creations Educational Foundation";
export const UTILITY_LINE =
  "A service of Rebuild My School Africa · EduAid-Africa · Santos Creations Educational Foundation · Jointly presented with NESA-Africa";
export const NOT_AWARD_TIER =
  "Regional school selection is separate from NESA-Africa award recognition. Donations, sponsorship and regional participation do not affect NESA-Africa judging or recognition decisions.";
export const CAMPAIGN_LINE = "Eight African Regions. Eight Supported Schools. One Inclusive Future.";
export const NOMINATION_RULE =
  "A nomination begins verification. It does not guarantee publication, voting eligibility, funding, a grant or an intervention. Only verified and approved schools are profiled.";
export const VOTING_LABEL = "Voting Opens in September 2027, Subject to Verification and Approval";
export const PAYMENT_NOTICE =
  "Completing this form does not confirm payment. Support is confirmed only after reconciliation and an official receipt.";
export const SUPPORT_CONDITION = "subject to due diligence, available funds and written approval";
export const BANK_NARRATION_NOTICE =
  "Put your EA reference in the transfer narration. Pay only into accounts named EduAid Africa Ltd.";
export const NO_PERSONAL_ACCOUNT = "EduAid-Africa will never ask you to pay into a personal account.";
export const DRAFT_MAP_NOTICE = "Draft regional map, pending written programme approval";
export const ILLUSTRATIVE_VIDEO_CAPTION = "Illustrative AI-generated video · not a beneficiary school";

export const REGION_TARGET_USD = 150_000;
export const TOTAL_TARGET_USD = REGION_TARGET_USD * 8;

export const CTAS = {
  nominate: { label: "Nominate a Special-Needs School", href: `${BASE}/participate?participation=nominate` },
  verified: { label: "View Verified Schools", href: "#verified-schools" },
  vote: { label: VOTING_LABEL, href: "#vote", disabled: true },
  donate: { label: "Donate to the Support Fund", href: "#donate" },
  sponsor: { label: "Sponsor a Regional School", href: "#sponsor-form" },
  partner: { label: "Become a Programme Partner", href: "#sponsor-form", mode: "partner" as const },
  volunteer: { label: "Volunteer Your Skills", href: `${BASE}/participate?participation=volunteer` },
} as const;

export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfSFHcQc9ehWdnPTfPRyzeMruCVOzVyjyI29uUSRR6E2g1JWw/viewform";
export const GOOGLE_FORM_EMBED = `${GOOGLE_FORM_URL}?embedded=true`;
export const NESA_NOMINATION_FORM = "https://forms.gle/E2FmpTkRq53JxRbS7";
export const YOUTUBE = { specialNeeds: "Hdu_qlFLfrQ", eduaid: "aP0SskrfioI" } as const;

export type RegionKey = "north" | "west" | "central" | "east" | "southern" | "sahel" | "horn" | "indian";
export interface Region { key: RegionKey; number: number; name: string; color: string; desk: string }

export const REGIONS: Region[] = [
  { key: "north", number: 1, name: "North Africa", color: "#7B4A1E", desk: "rmsanafricaeduaidafrica@gmail.com" },
  { key: "west", number: 2, name: "West Africa", color: "#2E7D32", desk: "rmsawafricaeduaidafrica@gmail.com" },
  { key: "central", number: 3, name: "Central Africa", color: "#2563A6", desk: "rmsacafricaeduaidafrica@gmail.com" },
  { key: "east", number: 4, name: "East Africa", color: "#A86B12", desk: "rmsaeafricaeduaidafrica@gmail.com" },
  { key: "southern", number: 5, name: "Southern Africa", color: "#9B2C4A", desk: "rmsasafricaeduaidafrica@gmail.com" },
  { key: "sahel", number: 6, name: "Sahel Region", color: "#C25E1F", desk: "rmsasaheleduaidafrica@gmail.com" },
  { key: "horn", number: 7, name: "Horn of Africa", color: "#6B4FA0", desk: "rmsahornafricaeduaidafrica@gmail.com" },
  { key: "indian", number: 8, name: "Indian Ocean Islands", color: "#0F8A84", desk: "rmsaindianoceaneduaidafrica@gmail.com" },
];
export const REGION_NOTE = "These are programme-operational regions, not an African Union classification.";
export const regionByKey = (k?: string | null) => REGIONS.find((r) => r.key === k);

export interface Country { name: string; id: string; region: RegionKey; island?: boolean }
const c = (region: RegionKey, list: [string, string, boolean?][]): Country[] =>
  list.map(([name, id, island]) => ({ name, id, region, island: !!island }));

export const COUNTRIES: Country[] = [
  ...c("north", [["Algeria", "012"], ["Egypt", "818"], ["Libya", "434"], ["Morocco", "504"], ["Tunisia", "788"]]),
  ...c("sahel", [["Burkina Faso", "854"], ["Chad", "148"], ["Mali", "466"], ["Mauritania", "478"], ["Niger", "562"], ["Sudan", "729"]]),
  ...c("west", [["Benin", "204"], ["Cabo Verde", "132", true], ["Côte d'Ivoire", "384"], ["The Gambia", "270"], ["Ghana", "288"], ["Guinea", "324"], ["Guinea-Bissau", "624"], ["Liberia", "430"], ["Nigeria", "566"], ["Senegal", "686"], ["Sierra Leone", "694"], ["Togo", "768"]]),
  ...c("central", [["Cameroon", "120"], ["Central African Republic", "140"], ["Republic of the Congo", "178"], ["DR Congo", "180"], ["Equatorial Guinea", "226"], ["Gabon", "266"], ["São Tomé and Príncipe", "678", true]]),
  ...c("east", [["Burundi", "108"], ["Kenya", "404"], ["Rwanda", "646"], ["South Sudan", "728"], ["Tanzania", "834"], ["Uganda", "800"]]),
  ...c("horn", [["Djibouti", "262"], ["Eritrea", "232"], ["Ethiopia", "231"], ["Somalia", "706"]]),
  ...c("southern", [["Angola", "024"], ["Botswana", "072"], ["Eswatini", "748"], ["Lesotho", "426"], ["Malawi", "454"], ["Mozambique", "508"], ["Namibia", "516"], ["South Africa", "710"], ["Zambia", "894"], ["Zimbabwe", "716"]]),
  ...c("indian", [["Comoros", "174", true], ["Madagascar", "450"], ["Mauritius", "480", true], ["Seychelles", "690", true]]),
];
export const DISPUTED = { name: "Western Sahara", id: "732", color: "#C9C4B4", note: "disputed territory, not assigned" };
/** world-atlas uses "Somaliland" with no numeric id; it is rendered as Somalia. */
export const SOMALILAND_AS = "706";
export const countriesIn = (k: RegionKey) => COUNTRIES.filter((x) => x.region === k);

export type CategoryIcon = "eye" | "ear" | "accessibility" | "puzzle" | "message-circle" | "brain" | "layers" | "sprout";
export interface Category { title: string; description: string; icon: CategoryIcon; color: string; tags: string[]; image: { src: string; alt: string; credit: string } | null }
export const CATEGORIES: Category[] = [
  { title: "Visual Support Education", description: "Schools supporting learners who are blind or have low vision.", icon: "eye", color: "#2E7D32", tags: ["Braille", "Low vision"], image: null },
  { title: "Deaf and Hearing Support Education", description: "Schools supporting Deaf and hard-of-hearing learners.", icon: "ear", color: "#6B4521", tags: ["Sign language", "Captioning"], image: null },
  { title: "Physical and Mobility Support Education", description: "Schools supporting learners with physical disabilities, mobility challenges or cerebral palsy.", icon: "accessibility", color: "#1F5C22", tags: ["Access", "Mobility"], image: null },
  { title: "Intellectual and Developmental Support Education", description: "Schools supporting learners with intellectual or developmental disabilities, including Down syndrome.", icon: "puzzle", color: "#3D9B3D", tags: ["Adapted learning"], image: null },
  { title: "Autism and Communication Support Education", description: "Schools supporting autistic learners and learners with speech, language or communication needs.", icon: "message-circle", color: "#8A5A2B", tags: ["AAC", "Sensory"], image: null },
  { title: "Learning, Emotional and Behavioural Support Education", description: "Schools supporting learners with dyslexia, dyscalculia, ADHD and significant emotional, behavioural or psychosocial needs.", icon: "brain", color: "#4C8A3A", tags: ["Learning", "Wellbeing"], image: null },
  { title: "Multiple and Complex Disabilities", description: "Schools serving learners with more than one disability or multidisciplinary needs.", icon: "layers", color: "#553517", tags: ["Multidisciplinary care"], image: null },
  { title: "Inclusive, Early-Intervention and Vocational Education", description: "Inclusive mainstream schools, specialist units, early-intervention centres, resource centres and vocational or transition programmes.", icon: "sprout", color: "#24602A", tags: ["Inclusion", "Transition"], image: null },
];
export const CATEGORY_RULE =
  "Schools may select more than one category but state one principal category. Regional selection is one approved school per region, in any category, not eight category winners.";

/** Empty slots stay hidden until filled with a YouTube id. */
export const CAT_VIDEOS: (string | null)[] = [null, null, null, null, null, null, null, null];
export const REGION_VIDEOS: Partial<Record<RegionKey, string>> = {};
export const CAMPAIGN_VIDEOS: { fiveWays: string | null; eduTourism: string | null; donationTracking: string | null } = {
  fiveWays: null, eduTourism: null, donationTracking: null,
};

export const ACCOUNTS = [
  { label: "EduAid-Africa website", href: "https://eduaid.africa" },
  { label: "EduAid-Africa Webinar Series", href: "https://eduaid.africa/webinars" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/eduaid-africa-6b4b3838a" },
  { label: "YouTube", href: "https://www.youtube.com/watch?v=aP0SskrfioI" },
  { label: "Santos Creations Educational Foundation", href: "https://santoscreations.org" },
  { label: "NESA-Africa", href: "https://nesa.africa" },
];
export const NESA_EMAIL = "info@nesa.africa";
/** Hidden until official handles are confirmed. */
export const SOCIAL_SLOTS: Record<"facebook" | "instagram" | "x" | "tiktok" | "whatsapp", string | null> = {
  facebook: null, instagram: null, x: null, tiktok: null, whatsapp: null,
};

export type Currency = "USD" | "NGN" | "GBP" | "EUR";
export const CURRENCIES: Currency[] = ["USD", "NGN", "GBP", "EUR"];
export interface BankAccount { currency: Currency; number: string; purpose: string; accountName: string; bank: string }
export const BANK_ACCOUNTS: BankAccount[] = [
  { currency: "NGN", number: "1305744507", purpose: "Scholarships & Education Support", accountName: "EduAid Africa Ltd", bank: "Providus Bank" },
  { currency: "USD", number: "1307264500", purpose: "International Education Support", accountName: "EduAid Africa Ltd", bank: "Providus Bank" },
  { currency: "EUR", number: "1307264531", purpose: "European Education Funding", accountName: "EduAid Africa Ltd", bank: "Providus Bank" },
  { currency: "GBP", number: "1307264548", purpose: "UK Education Support", accountName: "EduAid Africa Ltd", bank: "Providus Bank" },
];
export const bankFor = (cur: Currency) => BANK_ACCOUNTS.find((b) => b.currency === cur)!;

export const DONATION_PRESETS: Record<Currency, number[]> = {
  USD: [25, 50, 100, 250, 500, 1000],
  NGN: [10000, 25000, 50000, 100000, 250000, 500000],
  GBP: [20, 40, 80, 200, 400, 800],
  EUR: [25, 50, 100, 250, 500, 1000],
};
export const DEFAULT_PRESET_INDEX = 2;
export const SPONSOR_PRESETS_USD = [5000, 10000, 25000, 50000, 75000, 150000];

export const SPONSOR_SCOPES = [
  { value: "whole-region", label: "A whole region (US$150,000)" },
  { value: "share", label: "A share of a regional target" },
  { value: "one-school", label: "One verified school" },
  { value: "project", label: "A specific project" },
  { value: "in-kind", label: "In-kind support" },
];
export const SPONSOR_PROJECTS = [
  "Accessible classrooms", "Assistive technology", "Accessible transportation", "Learning materials", "Teacher training",
  "Renewable energy", "Water and sanitation", "Vocational training", "Connectivity and digital learning",
  "A specific renovation project", "Programme verification and monitoring", "Approved documentary and impact reporting",
];
export const PARTNER_CONTRIBUTIONS = [
  "Funding", "Professional expertise", "Construction and renovation services", "Assistive equipment", "Technology",
  "Teaching and training", "Logistics", "Monitoring and evaluation", "Media and public education",
  "Volunteer mobilisation", "Safeguarding expertise", "Independent audit or programme assurance",
];

export type StatValue = number | string | null;
export const PUBLIC_STATS: {
  schoolsNominated: StatValue; approvedForVoting: StatValue; fundsPledgedUsd: StatValue; fundsReconciledUsd: StatValue;
  interventionsCompleted: StatValue; lastUpdated: StatValue;
  regional: Record<RegionKey, { pledgedUsd: number | null; reconciledUsd: number | null }>;
  pipeline: { nominated: StatValue; verified: StatValue; approved: StatValue; selected: StatValue };
  moneyTrail: { pledged: StatValue; transfersReported: StatValue; reconciled: StatValue; receiptsIssued: StatValue };
  interventions: { planned: StatValue; inProgress: StatValue; completed: StatValue };
  votes: { verifiedVotes: StatValue; regionsOpen: StatValue };
} = {
  schoolsNominated: null, approvedForVoting: null, fundsPledgedUsd: null, fundsReconciledUsd: null,
  interventionsCompleted: null, lastUpdated: null,
  regional: Object.fromEntries(REGIONS.map((r) => [r.key, { pledgedUsd: null, reconciledUsd: null }])) as Record<RegionKey, { pledgedUsd: null; reconciledUsd: null }>,
  pipeline: { nominated: null, verified: null, approved: null, selected: null },
  moneyTrail: { pledged: null, transfersReported: null, reconciled: null, receiptsIssued: null },
  interventions: { planned: null, inProgress: null, completed: null },
  votes: { verifiedVotes: null, regionsOpen: null },
};

/** Field names that must never appear in any form on this page. */
export const FORBIDDEN_FIELD_PATTERN = /card|cvv|pin|password|otp/i;

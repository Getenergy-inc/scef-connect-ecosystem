// SCEF Local Chapter Services — canonical 10-region taxonomy
// Single source of truth. No project-specific chapters. Cross-region
// countries use `secondaryTags`, never duplicate primary country records.

export type ScefRegionSlug =
  | "north-africa"
  | "west-africa"
  | "central-africa"
  | "east-africa"
  | "southern-africa"
  | "sahel-region"
  | "horn-of-africa"
  | "indian-ocean"
  | "diaspora-global-africa"
  | "friends-of-africa";

export type ScefRegionScope = "African Region" | "Cross-Regional" | "Global Network";

export type ScefCountry = {
  name: string;
  code?: string; // ISO 3166-1 alpha-2
  slug: string;
  primaryRegion: ScefRegionSlug;
  secondaryTags?: ScefRegionSlug[];
};

export type ScefRegion = {
  slug: ScefRegionSlug;
  name: string;
  scope: ScefRegionScope;
  shortDescription: string;
  countries: string[]; // names listed under this region (primary or grouping)
  linkedPrograms: string[];
  walletStatus: "Active" | "Forming" | "Pending Setup";
  impactPathway: string;
};

export const SCEF_PROGRAMS = [
  "SCEF General",
  "NESA-Africa",
  "EduAid-Africa",
  "Rebuild My School Africa",
  "eLibrary Nigeria",
  "Education Online Africa",
  "Women & Girls Education",
  "Special Needs Education Support",
  "Training & Webinars",
  "Santos Media",
  "NESA Africa TV",
  "It's In Me Radio",
  "Sophia Help Center",
] as const;

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ── Countries (primary region assignment, with secondary tags for overlaps) ──
export const SCEF_COUNTRIES: ScefCountry[] = [
  // North Africa
  { name: "Algeria", code: "DZ", slug: "algeria", primaryRegion: "north-africa" },
  { name: "Egypt", code: "EG", slug: "egypt", primaryRegion: "north-africa" },
  { name: "Libya", code: "LY", slug: "libya", primaryRegion: "north-africa" },
  { name: "Morocco", code: "MA", slug: "morocco", primaryRegion: "north-africa" },
  { name: "Sudan", code: "SD", slug: "sudan", primaryRegion: "north-africa", secondaryTags: ["sahel-region", "horn-of-africa"] },
  { name: "Tunisia", code: "TN", slug: "tunisia", primaryRegion: "north-africa" },
  { name: "Western Sahara", code: "EH", slug: "western-sahara", primaryRegion: "north-africa" },

  // West Africa
  { name: "Benin", code: "BJ", slug: "benin", primaryRegion: "west-africa" },
  { name: "Burkina Faso", code: "BF", slug: "burkina-faso", primaryRegion: "west-africa", secondaryTags: ["sahel-region"] },
  { name: "Cabo Verde", code: "CV", slug: "cabo-verde", primaryRegion: "west-africa" },
  { name: "Côte d'Ivoire", code: "CI", slug: "cote-divoire", primaryRegion: "west-africa" },
  { name: "Gambia", code: "GM", slug: "gambia", primaryRegion: "west-africa" },
  { name: "Ghana", code: "GH", slug: "ghana", primaryRegion: "west-africa" },
  { name: "Guinea", code: "GN", slug: "guinea", primaryRegion: "west-africa" },
  { name: "Guinea-Bissau", code: "GW", slug: "guinea-bissau", primaryRegion: "west-africa" },
  { name: "Liberia", code: "LR", slug: "liberia", primaryRegion: "west-africa" },
  { name: "Mali", code: "ML", slug: "mali", primaryRegion: "west-africa", secondaryTags: ["sahel-region"] },
  { name: "Mauritania", code: "MR", slug: "mauritania", primaryRegion: "west-africa", secondaryTags: ["sahel-region"] },
  { name: "Niger", code: "NE", slug: "niger", primaryRegion: "west-africa", secondaryTags: ["sahel-region"] },
  { name: "Nigeria", code: "NG", slug: "nigeria", primaryRegion: "west-africa", secondaryTags: ["sahel-region"] },
  { name: "Senegal", code: "SN", slug: "senegal", primaryRegion: "west-africa", secondaryTags: ["sahel-region"] },
  { name: "Sierra Leone", code: "SL", slug: "sierra-leone", primaryRegion: "west-africa" },
  { name: "Togo", code: "TG", slug: "togo", primaryRegion: "west-africa" },

  // Central Africa
  { name: "Angola", code: "AO", slug: "angola", primaryRegion: "central-africa" },
  { name: "Cameroon", code: "CM", slug: "cameroon", primaryRegion: "central-africa" },
  { name: "Central African Republic", code: "CF", slug: "central-african-republic", primaryRegion: "central-africa" },
  { name: "Chad", code: "TD", slug: "chad", primaryRegion: "central-africa", secondaryTags: ["sahel-region"] },
  { name: "Republic of the Congo", code: "CG", slug: "republic-of-the-congo", primaryRegion: "central-africa" },
  { name: "Democratic Republic of the Congo", code: "CD", slug: "democratic-republic-of-the-congo", primaryRegion: "central-africa" },
  { name: "Equatorial Guinea", code: "GQ", slug: "equatorial-guinea", primaryRegion: "central-africa" },
  { name: "Gabon", code: "GA", slug: "gabon", primaryRegion: "central-africa" },
  { name: "São Tomé and Príncipe", code: "ST", slug: "sao-tome-and-principe", primaryRegion: "central-africa" },

  // East Africa
  { name: "Burundi", code: "BI", slug: "burundi", primaryRegion: "east-africa" },
  { name: "Comoros", code: "KM", slug: "comoros", primaryRegion: "east-africa", secondaryTags: ["indian-ocean"] },
  { name: "Djibouti", code: "DJ", slug: "djibouti", primaryRegion: "east-africa", secondaryTags: ["horn-of-africa"] },
  { name: "Eritrea", code: "ER", slug: "eritrea", primaryRegion: "east-africa", secondaryTags: ["horn-of-africa"] },
  { name: "Ethiopia", code: "ET", slug: "ethiopia", primaryRegion: "east-africa", secondaryTags: ["horn-of-africa"] },
  { name: "Kenya", code: "KE", slug: "kenya", primaryRegion: "east-africa", secondaryTags: ["horn-of-africa"] },
  { name: "Rwanda", code: "RW", slug: "rwanda", primaryRegion: "east-africa" },
  { name: "Seychelles", code: "SC", slug: "seychelles", primaryRegion: "east-africa", secondaryTags: ["indian-ocean"] },
  { name: "Somalia", code: "SO", slug: "somalia", primaryRegion: "east-africa", secondaryTags: ["horn-of-africa"] },
  { name: "South Sudan", code: "SS", slug: "south-sudan", primaryRegion: "east-africa", secondaryTags: ["sahel-region", "horn-of-africa"] },
  { name: "Tanzania", code: "TZ", slug: "tanzania", primaryRegion: "east-africa" },
  { name: "Uganda", code: "UG", slug: "uganda", primaryRegion: "east-africa", secondaryTags: ["horn-of-africa"] },

  // Southern Africa
  { name: "Botswana", code: "BW", slug: "botswana", primaryRegion: "southern-africa" },
  { name: "Eswatini", code: "SZ", slug: "eswatini", primaryRegion: "southern-africa" },
  { name: "Lesotho", code: "LS", slug: "lesotho", primaryRegion: "southern-africa" },
  { name: "Malawi", code: "MW", slug: "malawi", primaryRegion: "southern-africa" },
  { name: "Mozambique", code: "MZ", slug: "mozambique", primaryRegion: "southern-africa" },
  { name: "Namibia", code: "NA", slug: "namibia", primaryRegion: "southern-africa" },
  { name: "South Africa", code: "ZA", slug: "south-africa", primaryRegion: "southern-africa" },
  { name: "Zambia", code: "ZM", slug: "zambia", primaryRegion: "southern-africa" },
  { name: "Zimbabwe", code: "ZW", slug: "zimbabwe", primaryRegion: "southern-africa" },

  // Indian Ocean (primary only for non-overlapping)
  { name: "Madagascar", code: "MG", slug: "madagascar", primaryRegion: "indian-ocean" },
  { name: "Mauritius", code: "MU", slug: "mauritius", primaryRegion: "indian-ocean" },
  { name: "Réunion", code: "RE", slug: "reunion", primaryRegion: "indian-ocean" },
  { name: "Mayotte", code: "YT", slug: "mayotte", primaryRegion: "indian-ocean" },
];

// ── Regions ──
export const SCEF_REGIONS: ScefRegion[] = [
  {
    slug: "north-africa",
    name: "North Africa",
    scope: "African Region",
    shortDescription:
      "Mediterranean and Saharan nations advancing literacy, STEM and inclusive education.",
    countries: ["Algeria", "Egypt", "Libya", "Morocco", "Sudan", "Tunisia", "Western Sahara"],
    linkedPrograms: ["NESA-Africa", "EduAid-Africa", "Education Online Africa", "Women & Girls Education"],
    walletStatus: "Forming",
    impactPathway:
      "School verification → regional voting → GFA Wallet activation → EduAid-Africa intervention.",
  },
  {
    slug: "west-africa",
    name: "West Africa",
    scope: "African Region",
    shortDescription:
      "Sixteen-country block anchoring SCEF's strongest grassroots delivery base.",
    countries: [
      "Benin","Burkina Faso","Cabo Verde","Côte d'Ivoire","Gambia","Ghana","Guinea",
      "Guinea-Bissau","Liberia","Mali","Mauritania","Niger","Nigeria","Senegal","Sierra Leone","Togo",
    ],
    linkedPrograms: ["NESA-Africa", "EduAid-Africa", "Rebuild My School Africa", "eLibrary Nigeria", "Education Online Africa", "Women & Girls Education", "Special Needs Education Support", "Santos Media"],
    walletStatus: "Active",
    impactPathway:
      "School nomination → regional voting → GFA Wallet activation → Rebuild My School Africa intervention.",
  },
  {
    slug: "central-africa",
    name: "Central Africa",
    scope: "African Region",
    shortDescription:
      "Equatorial nations expanding teacher training, school rebuilding and digital learning.",
    countries: [
      "Angola","Cameroon","Central African Republic","Chad","Republic of the Congo",
      "Democratic Republic of the Congo","Equatorial Guinea","Gabon","São Tomé and Príncipe",
    ],
    linkedPrograms: ["NESA-Africa", "EduAid-Africa", "Education Online Africa", "Special Needs Education Support"],
    walletStatus: "Forming",
    impactPathway:
      "School verification → regional voting → GFA Wallet activation → EduAid-Africa intervention.",
  },
  {
    slug: "east-africa",
    name: "East Africa",
    scope: "African Region",
    shortDescription:
      "Innovation corridor combining edtech, refugee education and girls' empowerment.",
    countries: [
      "Burundi","Comoros","Djibouti","Eritrea","Ethiopia","Kenya","Rwanda","Seychelles",
      "Somalia","South Sudan","Tanzania","Uganda",
    ],
    linkedPrograms: ["NESA-Africa", "EduAid-Africa", "Rebuild My School Africa", "Education Online Africa", "Women & Girls Education", "Santos Media"],
    walletStatus: "Active",
    impactPathway:
      "School nomination → regional voting → GFA Wallet activation → Rebuild My School Africa intervention.",
  },
  {
    slug: "southern-africa",
    name: "Southern Africa",
    scope: "African Region",
    shortDescription:
      "SADC partners scaling vocational pathways, special needs schools and STEM equity.",
    countries: ["Botswana","Eswatini","Lesotho","Malawi","Mozambique","Namibia","South Africa","Zambia","Zimbabwe"],
    linkedPrograms: ["NESA-Africa", "EduAid-Africa", "Special Needs Education Support", "Women & Girls Education", "Santos Media"],
    walletStatus: "Active",
    impactPathway:
      "School nomination → regional voting → GFA Wallet activation → EduAid-Africa intervention.",
  },
  {
    slug: "sahel-region",
    name: "Sahel Region",
    scope: "Cross-Regional",
    shortDescription:
      "Cross-regional advocacy grouping for the Sahel belt — crisis education, displacement and resilience.",
    countries: ["Burkina Faso","Chad","Mali","Mauritania","Niger","Nigeria","Senegal","Sudan","South Sudan"],
    linkedPrograms: ["EduAid-Africa", "Rebuild My School Africa", "Special Needs Education Support", "Women & Girls Education"],
    walletStatus: "Forming",
    impactPathway:
      "Crisis-affected school identification → cross-regional advocacy → GFA Wallet activation → intervention.",
  },
  {
    slug: "horn-of-africa",
    name: "Horn of Africa",
    scope: "Cross-Regional",
    shortDescription:
      "Cross-regional grouping linking East and North Africa for humanitarian education response.",
    countries: ["Djibouti","Eritrea","Ethiopia","Kenya","Somalia","South Sudan","Sudan","Uganda"],
    linkedPrograms: ["EduAid-Africa", "Rebuild My School Africa", "Education Online Africa", "Special Needs Education Support"],
    walletStatus: "Forming",
    impactPathway:
      "Humanitarian school nomination → cross-regional voting → GFA Wallet activation → intervention.",
  },
  {
    slug: "indian-ocean",
    name: "Indian Ocean",
    scope: "Cross-Regional",
    shortDescription:
      "Island nations and territories advancing climate-resilient and inclusive education.",
    countries: ["Comoros","Madagascar","Mauritius","Seychelles","Réunion","Mayotte"],
    linkedPrograms: ["NESA-Africa", "EduAid-Africa", "Education Online Africa", "Women & Girls Education"],
    walletStatus: "Forming",
    impactPathway:
      "Island school nomination → regional voting → GFA Wallet activation → EduAid-Africa intervention.",
  },
  {
    slug: "diaspora-global-africa",
    name: "Diaspora / Global Africa",
    scope: "Global Network",
    shortDescription:
      "Africans living outside their country of origin powering advocacy, mentorship and fundraising.",
    countries: [
      "United States","Canada","United Kingdom","France","Germany","Netherlands","Belgium",
      "Portugal","Spain","Italy","Brazil","Caribbean","UAE","Saudi Arabia","Qatar","China","India","Australia",
    ],
    linkedPrograms: ["NESA-Africa", "EduAid-Africa", "Rebuild My School Africa", "Santos Media"],
    walletStatus: "Active",
    impactPathway:
      "Diaspora advocacy → mentorship → donor mobilisation → school intervention via GFA Wallet.",
  },
  {
    slug: "friends-of-africa",
    name: "Friends of Africa",
    scope: "Global Network",
    shortDescription:
      "Non-African allies, CSR partners, NGOs and philanthropies supporting African education through SCEF.",
    countries: [
      "United States","Canada","United Kingdom","European Union","Gulf States","India","China",
      "Japan","South Korea","Australia","New Zealand","Latin America","Caribbean",
    ],
    linkedPrograms: ["NESA-Africa", "EduAid-Africa", "Rebuild My School Africa", "Santos Media"],
    walletStatus: "Active",
    impactPathway:
      "Partner engagement → CSR funding → sponsorship → school intervention via GFA Wallet.",
  },
];

export const REGION_BY_SLUG: Record<ScefRegionSlug, ScefRegion> = SCEF_REGIONS.reduce(
  (acc, r) => { acc[r.slug] = r; return acc; },
  {} as Record<ScefRegionSlug, ScefRegion>,
);

export function countriesForRegion(slug: ScefRegionSlug): ScefCountry[] {
  return SCEF_COUNTRIES.filter(
    (c) => c.primaryRegion === slug || (c.secondaryTags ?? []).includes(slug),
  );
}

export function countrySlug(name: string): string {
  const found = SCEF_COUNTRIES.find((c) => c.name === name);
  return found?.slug ?? slugify(name);
}

export const SOPHIA_WHATSAPP_LOCAL_CHAPTER =
  "https://wa.me/2348109765897?text=" +
  encodeURIComponent("Hello Sophia, I want to join or support a SCEF regional local chapter.");

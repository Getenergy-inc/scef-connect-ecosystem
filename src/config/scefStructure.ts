// ========================================
// SCEF STRUCTURE — single source of truth
// Aligned to the SCEF Governance Framework 2026–2030.
// Wording below is approved institutional copy: do not paraphrase.
// Home, About and any structure-level component must read from here.
// ========================================

export type InitiativeStatus = "Active" | "Proposed";

export interface StructureLink {
  /** Display name, exactly as approved. */
  name: string;
  /** Short neutral description (no statistics, no claims). */
  description: string;
  /** Existing route only. Omit when no page exists yet. */
  href?: string;
}

export interface Pillar extends StructureLink {
  id: "nesa-africa" | "eduaid-africa" | "africas-education-enablers";
  number: 1 | 2 | 3;
  fullName?: string;
  focus: string[];
}

export interface Initiative extends StructureLink {
  status: InitiativeStatus;
}

export interface ScefCta {
  id: "join" | "ambassador" | "chapters" | "partner" | "donate" | "verify";
  label: string;
  /** Locale key under `scef.cta.*` — English label is the fallback. */
  labelKey: string;
  href: string;
}

// ---------- Identity ----------
export const SCEF_TAGLINE = "Education for All. Skills for the Future. Resilient Communities.";

export const SCEF_MISSION =
  "SCEF advances Education for All in Africa by connecting low-income and underserved learners, young people and communities with education access, digital learning, skills, mentoring and pathways to opportunity, through members, volunteers, local chapters and partnerships.";

export const SCEF_VISION =
  "An Africa where geography, gender, disability or economic circumstance does not decide the education and opportunity a learner receives.";

export const SCEF_VALUES = [
  "Access",
  "Inclusion",
  "Partnership",
  "Accountability",
  "Service",
  "Innovation",
  "Measurable Impact",
] as const;

export const SCEF_IMPACT_MODEL = [
  "Recognition",
  "Visibility",
  "Support",
  "Delivery",
  "Measurable Impact",
] as const;

/** SCEF is the umbrella institution; these functions sit at umbrella level. */
export const SCEF_UMBRELLA_FUNCTIONS = [
  "Governance",
  "Finance",
  "Safeguarding",
  "Data protection",
  "Brand",
  "Partner register",
  "Related-party disclosure",
] as const;

// ---------- Our Core Objectives (always shown on About as six cards) ----------
export const SCEF_CORE_OBJECTIVES = [
  { number: 1, title: "Continuous Education Standards System" },
  { number: 2, title: "Recognition as Standards Mechanism (NESA Engine)" },
  { number: 3, title: "Convert Standards into Action (Impact Pathways)" },
  { number: 4, title: "Pan-African Stakeholder Network" },
  { number: 5, title: "Trust & Evidence Layer (Data + Verification)" },
  { number: 6, title: "Scale via Media + Funding Infrastructure" },
] as const;

// ---------- Three strategic pillars ----------
export const SCEF_PILLARS: Pillar[] = [
  {
    id: "nesa-africa",
    number: 1,
    name: "NESA-Africa",
    fullName:
      "New Education Standard Award Africa — The African Blue-Garnet Awards for Education",
    description: "Recognition, evidence, awards and NESA-Africa TV.",
    href: "/programs/nesa-africa",
    focus: ["Recognition", "Evidence", "Awards", "NESA-Africa TV"],
  },
  {
    id: "eduaid-africa",
    number: 2,
    name: "EduAid-Africa",
    description:
      "Scholarships, education support, CSR for Education, grants and community programmes.",
    href: "/programs/eduaid-africa",
    focus: [
      "Scholarships",
      "Education support",
      "CSR for Education",
      "Grants",
      "Women & Girls Education",
      "Special Needs Education",
      "Rebuild My School Africa",
      "Chapters",
      "EduAid-Africa Webinar Series",
      "EduAid-Africa e-Journal",
    ],
  },
  {
    id: "africas-education-enablers",
    number: 3,
    name: "Africa's Education Enablers",
    description: "Impact interviews, evidence and institutional profiles.",
    focus: [
      "Impact interviews",
      "Evidence",
      "Institutional profiles",
      "Africa's Education Enablers Podcast & Impact Interview Series",
    ],
  },
];

/** Links for the EduAid-Africa sub-programmes that must never be hidden. */
export const EDUAID_PROTECTED_LINKS: StructureLink[] = [
  { name: "Women & Girls Education", description: "", href: "/programs/women-girls-education" },
  { name: "Special Needs Education", description: "", href: "/programs/special-needs-education" },
  { name: "Rebuild My School Africa", description: "", href: "/programs/rebuild-my-school-africa" },
];

// ---------- Permanent delivery platforms ----------
export const SCEF_PLATFORMS: StructureLink[] = [
  {
    name: "SCEF Academy",
    description:
      "Youth and women's training, entrepreneurship, skills and certificate services.",
  },
  {
    name: "NESA-Africa TV & Weekly Education News",
    description: "Education video programming and weekly news.",
    href: "/media/nesa-tv",
  },
  {
    name: "It's In Me Radio",
    description: "Audio programming since 2003.",
    href: "/media/its-in-me-radio",
  },
  {
    name: "Africa's Education Enablers Podcast",
    description: "Impact interviews with people and institutions enabling education.",
  },
  {
    name: "EduAid-Africa Webinar Series",
    description: "Online sessions on education access, support and practice.",
    href: "/media/eduaid-webinars",
  },
  {
    name: "EduAid-Africa e-Journal",
    description: "Written evidence, practice notes and education commentary.",
  },
  {
    name: "Education Online Africa",
    description: "Digital learning platform.",
    href: "/programs/digital-learning",
  },
  {
    name: "eLibrary Nigeria",
    description: "Digital library resources for learners and educators.",
    href: "/programs/elibrary-nigeria",
  },
  {
    name: "My Career My Life",
    description: "Career guidance for students and young people.",
    href: "/programs/my-career-my-life",
  },
  {
    name: "SCEF Media / Santos Media",
    description: "Coordinates all SCEF media, including NESA-Africa TV and It's In Me Radio.",
    href: "/divisions/santos-media",
  },
];

// ---------- Other initiatives ----------
export const SCEF_OTHER_INITIATIVES: Initiative[] = [
  {
    name: "Green Skills & Coalition Programme",
    description: "Green skills for young people and communities.",
    status: "Proposed",
  },
  {
    name: "Green Horizon Initiative",
    description: "Environmental education and green skills.",
    href: "/programs/green-horizon-initiative",
    status: "Active",
  },
  {
    name: "SCEF Green Communities — Badagry Coastal Ecosystem Resilience and Adaptation Scaling Initiative",
    description: "Coastal resilience and adaptation in Badagry communities.",
    status: "Proposed",
  },
  {
    name: "AI-READY AFRICA",
    description: "AI readiness for learners and educators.",
    status: "Proposed",
  },
];

// ---------- Participation pathways ----------
export const SCEF_PARTICIPATION_PATHWAYS: StructureLink[] = [
  {
    name: "Africans in Africa",
    description: "Join through a local or online chapter in your country.",
    href: "/chapters",
  },
  {
    name: "Africans in the Diaspora",
    description: "Africans living outside the continent.",
    href: "/diaspora-africa",
  },
  {
    name: "Friends of Africa",
    description: "Supporters outside Africa join via Friends of EduAid-Africa.",
    href: "/friends-of-africa",
  },
];

/** Region wording — use verbatim. */
export const SCEF_REGIONS_WORDING =
  "eight African regional groupings, plus Africans in the Diaspora and Friends of Africa";

// ---------- Governance ----------
export const SCEF_DIVISIONS = [
  { code: "BGEO", name: "Board Governance & Executive Office" },
  { code: "SOBCD", name: "Strategic Operations & Business Compliance Division" },
  { code: "TDSD", name: "Technology & Digital Services Division" },
  { code: "OMBDD", name: "Online Media Business Development Division" },
  { code: "Santos Media", name: "Santos Media Division" },
  { code: "LCS", name: "Local Chapter Services" },
] as const;

export const SCEF_FUNDERS_DISCLOSURE =
  "Since 2023, SCEF's operating costs, including staff salaries, have been funded by Pancokrato Integrated Services (PKIS) and GET Energy Trading Services (GETS). Both are related parties to SCEF's founder and are disclosed under SCEF's conflict-of-interest policy. Neither has any role in NESA-Africa recognition decisions.";

// ---------- NESA-Africa 2026 ----------
export const NESA_2026_PROGRAMME = {
  name: "NESA-Africa 2026 Online Awards Programme",
  date: "13 December 2026",
  isoDate: "2026-12-13",
  format: "online",
  label: "NESA-Africa 2026 Online Awards Programme — 13 December 2026 (online)",
  focus: "9 Africa Education Icons and Certificates of Recognition",
} as const;

export const NESA_RECOGNITION_STATEMENT =
  "Recognition is evidence-led and decided by independent judges. There is no public voting in 2026.";

// ---------- CTAs (consistent label → destination) ----------
export const SCEF_CTAS: Record<ScefCta["id"], ScefCta> = {
  join: { id: "join", label: "Join SCEF", labelKey: "scef.cta.join", href: "/get-involved/membership" },
  ambassador: { id: "ambassador", label: "Become an Ambassador", labelKey: "scef.cta.ambassador", href: "/get-involved/ambassador" },
  chapters: { id: "chapters", label: "Browse Chapters", labelKey: "scef.cta.chapters", href: "/chapters" },
  partner: { id: "partner", label: "Partner With Us", labelKey: "scef.cta.partner", href: "/partner-with-us" },
  donate: { id: "donate", label: "Donate / Fund a School", labelKey: "scef.cta.donate", href: "/wallet/donate" },
  verify: { id: "verify", label: "Verify Certificate", labelKey: "scef.cta.verify", href: "/resources/verification" },
};

export const SCEF_CTA_ORDER: ScefCta["id"][] = [
  "join",
  "ambassador",
  "chapters",
  "partner",
  "donate",
  "verify",
];

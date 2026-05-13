/**
 * Single source of truth for the Volunteers & Contributors page.
 * All entries are PLACEHOLDERS awaiting real archive photos.
 *
 * To swap in a real image later:
 *   1. Drop the file into `src/assets/photos/archive/...`
 *   2. Import it and set the `src` field on the matching item.
 *   3. The placeholder tile will automatically be replaced.
 *
 * No AI-generated faces, no stock people. Tiles render a labeled
 * SCEF-pattern placeholder until a real photograph is supplied.
 */

export type ArchiveCategory =
  | "school-outreach"
  | "volunteers"
  | "ambassadors"
  | "teacher-training"
  | "eduaid-africa"
  | "nesa-africa"
  | "esg-campaigns"
  | "girls-education"
  | "conferences"
  | "community-development"
  | "educational-tours"
  | "media-broadcasting"
  | "award-ceremonies"
  | "advocacy-walks"
  | "local-chapters"
  | "aiesec-vso";

export const categoryLabels: Record<ArchiveCategory, string> = {
  "school-outreach": "School Outreach",
  volunteers: "Volunteers",
  ambassadors: "Ambassadors",
  "teacher-training": "Teacher Training",
  "eduaid-africa": "EduAid-Africa",
  "nesa-africa": "NESA-Africa",
  "esg-campaigns": "ESG Campaigns",
  "girls-education": "Girls Education",
  conferences: "Conferences",
  "community-development": "Community Development",
  "educational-tours": "Educational Tours",
  "media-broadcasting": "Media & Broadcasting",
  "award-ceremonies": "Award Ceremonies",
  "advocacy-walks": "Advocacy Walks",
  "local-chapters": "Local Chapters",
  "aiesec-vso": "AIESEC & VSO",
};

export interface ArchiveItem {
  id: string;
  year: string;
  category: ArchiveCategory;
  caption: string;
  /** Optional real photograph. Leave undefined to render a labeled placeholder. */
  src?: string;
  /** Optional longer story shown in lightbox. */
  story?: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  body: string;
  category: ArchiveCategory;
  src?: string;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "1997",
    title: "The Santos idea is born — Minna, Niger State",
    body: "Educational advocacy concept launched through postcard production and tourism storytelling — the seed of SCEF.",
    category: "advocacy-walks",
  },
  {
    year: "2003",
    title: "Foundation activities begin",
    body: "SCEF advocacy formalised. It's In Me Radio launches; A Time with Santos TV concept and Nija Youth Tours introduced.",
    category: "media-broadcasting",
  },
  {
    year: "2007",
    title: "Volunteer expansion — AIESEC collaboration",
    body: "Youth volunteer network grows across Nigeria through AIESEC partnerships and grassroots community engagement.",
    category: "aiesec-vso",
  },
  {
    year: "2013–2014",
    title: "VSO partnership & Kwara Ministry of Education",
    body: "Engagement with the Kwara State Ministry of Education and integration of local volunteers via VSO programmes.",
    category: "aiesec-vso",
  },
  {
    year: "2015",
    title: "EduAid-Africa expansion",
    body: "Scholarships, school support and digital learning programmes scale across Nigeria and into the wider continent.",
    category: "eduaid-africa",
  },
  {
    year: "2020",
    title: "NESA-Africa growth",
    body: "The New Education Standards Award Africa establishes itself as a continental recognition platform.",
    category: "nesa-africa",
  },
  {
    year: "2024–2027",
    title: "Pan-African chapter rollout",
    body: "Local chapters activated across countries, states and cities. ESG advocacy and digital learning expand continent-wide.",
    category: "local-chapters",
  },
];

export const archiveGallery: ArchiveItem[] = [
  { id: "g1", year: "2007", category: "aiesec-vso", caption: "AIESEC volunteer cohort — early outreach" },
  { id: "g2", year: "2008", category: "school-outreach", caption: "School visit — Niger State" },
  { id: "g3", year: "2010", category: "volunteers", caption: "Community volunteer briefing" },
  { id: "g4", year: "2012", category: "teacher-training", caption: "Teacher development workshop" },
  { id: "g5", year: "2013", category: "aiesec-vso", caption: "VSO partnership session — Kwara" },
  { id: "g6", year: "2014", category: "advocacy-walks", caption: "Education advocacy walk" },
  { id: "g7", year: "2015", category: "eduaid-africa", caption: "EduAid-Africa launch — learner sponsorship" },
  { id: "g8", year: "2016", category: "girls-education", caption: "Girls education programme" },
  { id: "g9", year: "2017", category: "community-development", caption: "Community development project" },
  { id: "g10", year: "2018", category: "conferences", caption: "Pan-African education summit" },
  { id: "g11", year: "2019", category: "educational-tours", caption: "Nija Youth Tour — educational travel" },
  { id: "g12", year: "2020", category: "nesa-africa", caption: "NESA-Africa first continental ceremony" },
  { id: "g13", year: "2020", category: "media-broadcasting", caption: "It's In Me Radio recording session" },
  { id: "g14", year: "2021", category: "award-ceremonies", caption: "Educator recognition gala" },
  { id: "g15", year: "2022", category: "esg-campaigns", caption: "ESG & sustainability campaign" },
  { id: "g16", year: "2022", category: "ambassadors", caption: "Ambassador induction" },
  { id: "g17", year: "2023", category: "local-chapters", caption: "Local chapter inauguration" },
  { id: "g18", year: "2023", category: "media-broadcasting", caption: "NESA TV studio production" },
  { id: "g19", year: "2024", category: "school-outreach", caption: "Rebuild My School — site visit" },
  { id: "g20", year: "2024", category: "girls-education", caption: "Girls in STEM workshop" },
  { id: "g21", year: "2024", category: "conferences", caption: "Continental partners convening" },
  { id: "g22", year: "2025", category: "advocacy-walks", caption: "Monthly advocacy walk" },
  { id: "g23", year: "2025", category: "eduaid-africa", caption: "EduAid webinar broadcast" },
  { id: "g24", year: "2025", category: "community-development", caption: "Community learning hub opening" },
];

export interface VolunteerStory {
  id: string;
  title: string;
  excerpt: string;
  category: ArchiveCategory;
  year: string;
}

export const volunteerStories: VolunteerStory[] = [
  {
    id: "s1",
    title: "Supporting education through community outreach",
    excerpt: "How grassroots volunteers carried the SCEF mission into schools across Niger and Kwara States.",
    category: "school-outreach",
    year: "2009",
  },
  {
    id: "s2",
    title: "A volunteer journey with SCEF",
    excerpt: "From AIESEC intern to long-term contributor — a decade of education advocacy.",
    category: "volunteers",
    year: "2014",
  },
  {
    id: "s3",
    title: "Youth leadership and advocacy",
    excerpt: "Young Africans stepping forward as ambassadors for educational standards.",
    category: "ambassadors",
    year: "2018",
  },
  {
    id: "s4",
    title: "Teacher development impact",
    excerpt: "Training programmes that strengthened classroom practice in over 40 schools.",
    category: "teacher-training",
    year: "2021",
  },
  {
    id: "s5",
    title: "Rebuilding schools through partnerships",
    excerpt: "How the Rebuild My School Africa initiative turned recognition into infrastructure.",
    category: "community-development",
    year: "2024",
  },
];

export interface EventHighlight {
  id: string;
  title: string;
  blurb: string;
  category: ArchiveCategory;
  year: string;
}

export const eventHighlights: EventHighlight[] = [
  { id: "e1", title: "NESA-Africa continental gala", blurb: "Recognising educators across 54 nations.", category: "award-ceremonies", year: "2023" },
  { id: "e2", title: "EduAid-Africa webinar series", blurb: "Live continental conversations on learning equity.", category: "eduaid-africa", year: "2024" },
  { id: "e3", title: "School visits & site assessments", blurb: "Documenting needs across rural communities.", category: "school-outreach", year: "2024" },
  { id: "e4", title: "Monthly advocacy walks", blurb: "Communities marching for education and inclusion.", category: "advocacy-walks", year: "2025" },
  { id: "e5", title: "Pan-African education conferences", blurb: "Convening ministries, partners and chapters.", category: "conferences", year: "2024" },
  { id: "e6", title: "Training workshops", blurb: "Equipping teachers, ambassadors and chapter leads.", category: "teacher-training", year: "2025" },
];

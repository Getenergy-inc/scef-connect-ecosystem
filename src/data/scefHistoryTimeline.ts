// SCEF Historical Timeline 1997 — 2026
// Content rules: do not invent funders; partners are NOT funders unless direct
// grant/contract/MoU evidence exists. ESSPIN listed as an education programme
// partner. Future global institutions are target/proposed strategic partners.

export type FundingStatus =
  | "Self-funded / Founder-led"
  | "Volunteer-supported"
  | "Programme partner support"
  | "In-kind partner support"
  | "Direct funder not stated"
  | "Mixed: donations + partner support"
  | "Donor & sponsor supported"
  | "Proposed / In development";

export type ProjectType =
  | "Education advocacy"
  | "Youth empowerment"
  | "Digital learning"
  | "Media education"
  | "CSR/partnership"
  | "Local chapters"
  | "SCEF 2035";

export interface HistoryYear {
  id: string;
  year: number;
  slug: string;
  title: string;
  short_summary: string;
  detailed_history: string;
  projects: string[];
  partners: string[];
  funding_support_status: FundingStatus;
  notes: string;
  impact_summary: string;
  related_programs: string[];
  related_links?: { label: string; href: string }[];
  project_types: ProjectType[];
  seo_title: string;
  seo_description: string;
  status: "published";
}

const y = (
  year: number,
  data: Omit<HistoryYear, "id" | "year" | "slug" | "seo_title" | "seo_description" | "status">,
): HistoryYear => ({
  id: `scef-${year}`,
  year,
  slug: String(year),
  status: "published",
  seo_title: `SCEF History ${year} | Santos Creations Educational Foundation`,
  seo_description: `Read the ${year} history of Santos Creations Educational Foundation — ${data.short_summary}`.slice(0, 158),
  ...data,
});

export const scefHistoryTimeline: HistoryYear[] = [
  y(1997, {
    title: "Founding Vision and Educational Tourism Roots",
    short_summary:
      "Santos Creations begins as an educational tourism and cultural heritage vision in Minna, Niger State.",
    detailed_history:
      "In 1997, Engr. Babashola Santos Vincent Aderibigbe began the vision that later evolved into Santos Creations Educational Foundation through a tourism postcard production project in Minna, Niger State. The work focused on documenting Nigerian culture, heritage and learning environments for educational use.",
    projects: ["Tourism postcard production", "Educational tourism", "Cultural heritage documentation"],
    partners: ["Founder-led initiative", "Local community networks"],
    funding_support_status: "Self-funded / Founder-led",
    notes: "Origin year of the SCEF vision.",
    impact_summary: "Established the founding idea connecting culture, tourism and education.",
    related_programs: ["SCEF History", "Educational Tourism"],
    project_types: ["Education advocacy", "Media education"],
  }),
  y(1998, {
    title: "Cultural Documentation Continues",
    short_summary: "Continued cultural and educational documentation in Niger State communities.",
    detailed_history:
      "Through 1998 the founder-led initiative expanded postcard and cultural documentation work, building the early visual archive that would inform later media-for-education programmes.",
    projects: ["Heritage photo documentation", "Community outreach"],
    partners: ["Local community networks"],
    funding_support_status: "Self-funded / Founder-led",
    notes: "Early formative period; no formal organisation yet.",
    impact_summary: "Strengthened the cultural-education link guiding SCEF's later mission.",
    related_programs: ["Educational Tourism"],
    project_types: ["Media education", "Education advocacy"],
  }),
  y(1999, {
    title: "Youth & Education Concept Development",
    short_summary: "Concept of linking media, youth and education advocacy takes shape.",
    detailed_history:
      "The founder developed the conceptual frame combining youth empowerment, tourism and education advocacy that would later anchor 'A Time with Santos' and 'It's In Me' programmes.",
    projects: ["Programme concept design", "Youth dialogues"],
    partners: ["Local volunteers"],
    funding_support_status: "Self-funded / Founder-led",
    notes: "Pre-launch incubation of media-for-education ideas.",
    impact_summary: "Defined the SCEF media-and-education methodology.",
    related_programs: ["Santos Media"],
    project_types: ["Youth empowerment", "Media education"],
  }),
  y(2000, {
    title: "Turn of the Millennium Outreach",
    short_summary: "Volunteer-driven outreach to schools and youth groups begins informally.",
    detailed_history:
      "Informal outreach to schools and youth groups in Niger State began, framed around culture, civic awareness and learning. No formal funders engaged.",
    projects: ["School visits", "Youth civic dialogues"],
    partners: ["Local schools", "Community volunteers"],
    funding_support_status: "Volunteer-supported",
    notes: "Direct funder not stated.",
    impact_summary: "Built early SCEF goodwill with schools and youth.",
    related_programs: ["Education Advocacy"],
    project_types: ["Education advocacy", "Youth empowerment"],
  }),
  y(2001, {
    title: "Programme Design Phase",
    short_summary: "Design of recurring youth media and education programmes.",
    detailed_history:
      "Structured planning for recurring radio and TV-style youth education programmes began, preparing for the 2003 formal launch.",
    projects: ["Radio concept design", "TV concept design"],
    partners: ["Local volunteers", "Community radio contacts"],
    funding_support_status: "Self-funded / Founder-led",
    notes: "Direct funder not stated.",
    impact_summary: "Laid groundwork for It's In Me Radio and A Time with Santos TV.",
    related_programs: ["It's In Me Radio", "A Time with Santos"],
    project_types: ["Media education", "Youth empowerment"],
  }),
  y(2002, {
    title: "Pre-Launch Mobilisation",
    short_summary: "Mobilising volunteers and partners ahead of the formal SCEF launch.",
    detailed_history:
      "Mobilisation of volunteers, youth ambassadors and community partners ahead of the 2003 launch of foundation programmes.",
    projects: ["Volunteer recruitment", "Partnership scoping"],
    partners: ["Community volunteers", "Local schools"],
    funding_support_status: "Volunteer-supported",
    notes: "Direct funder not stated.",
    impact_summary: "Built the volunteer base needed for the 2003 launch.",
    related_programs: ["SCEF Volunteers"],
    project_types: ["Youth empowerment", "Education advocacy"],
  }),
  y(2003, {
    title: "Formal Launch — October 14, 2003",
    short_summary:
      "On 14 October 2003, SCEF formally launched advocacy with It's In Me Radio, A Time with Santos TV concept and Nija Youth Tours.",
    detailed_history:
      "SCEF formally launched its advocacy work on 14 October 2003. It's In Me Radio launched as a youth media programme; the A Time with Santos TV concept was introduced; and Nija Youth Tours began as an educational tourism initiative for young Nigerians.",
    projects: ["It's In Me Radio launch", "A Time with Santos (TV concept)", "Nija Youth Tours"],
    partners: ["Community radio partners", "Local youth networks"],
    funding_support_status: "Volunteer-supported",
    notes: "Foundation activities formally begin. Direct funder not stated.",
    impact_summary: "SCEF becomes an active youth education advocacy platform.",
    related_programs: ["It's In Me Radio", "A Time with Santos", "Nija Youth Tours"],
    project_types: ["Media education", "Youth empowerment", "Education advocacy"],
  }),
  y(2004, {
    title: "Radio & Youth Tour Expansion",
    short_summary: "Expansion of radio episodes and Nija Youth Tours across Niger State.",
    detailed_history:
      "It's In Me Radio expanded its episode catalogue; Nija Youth Tours organised additional educational tours for young Nigerians across Niger State.",
    projects: ["Expanded radio episodes", "Additional youth tours"],
    partners: ["Community radio partners", "Local schools"],
    funding_support_status: "Volunteer-supported",
    notes: "Direct funder not stated.",
    impact_summary: "Grew the SCEF youth audience and volunteer base.",
    related_programs: ["It's In Me Radio", "Nija Youth Tours"],
    project_types: ["Media education", "Youth empowerment"],
  }),
  y(2005, {
    title: "Community Education Advocacy Scales",
    short_summary: "Community-level education advocacy and youth engagement scale up.",
    detailed_history:
      "Community-level advocacy, school visits and youth-led media production scaled across multiple LGAs, reinforcing the SCEF model of media-driven education advocacy.",
    projects: ["School advocacy visits", "Youth-led radio production"],
    partners: ["Local schools", "Community volunteers"],
    funding_support_status: "Volunteer-supported",
    notes: "Direct funder not stated.",
    impact_summary: "Wider community presence and credibility for SCEF.",
    related_programs: ["Education Advocacy"],
    project_types: ["Education advocacy", "Media education"],
  }),
  y(2006, {
    title: "Strategic Partnership Scoping",
    short_summary: "Scoping conversations with NGOs and education stakeholders begin.",
    detailed_history:
      "SCEF began scoping conversations with NGOs and education stakeholders that would later lead to partnerships with AIESEC and VSO.",
    projects: ["Stakeholder mapping", "Partnership scoping"],
    partners: ["Education stakeholders (scoping)"],
    funding_support_status: "Volunteer-supported",
    notes: "Direct funder not stated.",
    impact_summary: "Prepared SCEF for the AIESEC collaboration in 2007.",
    related_programs: ["Partnerships"],
    project_types: ["CSR/partnership", "Education advocacy"],
  }),
  y(2007, {
    title: "AIESEC Collaboration & Volunteer Expansion",
    short_summary:
      "AIESEC collaboration begins — a growing network of contributors and youth development supporters across Nigeria.",
    detailed_history:
      "AIESEC collaboration began, bringing international and Nigerian youth volunteers into SCEF's education and youth development work. The contributor network expanded across multiple states.",
    projects: ["AIESEC volunteer placements", "Youth development workshops"],
    partners: ["AIESEC (volunteer partner)"],
    funding_support_status: "In-kind partner support",
    notes: "AIESEC contributed volunteers, not direct funding.",
    impact_summary: "Significant growth in the SCEF contributor network.",
    related_programs: ["SCEF Volunteers", "Youth Development"],
    project_types: ["Youth empowerment", "CSR/partnership"],
  }),
  y(2008, {
    title: "Continued AIESEC Volunteer Engagement",
    short_summary: "Continued volunteer placements and youth empowerment activities.",
    detailed_history:
      "AIESEC volunteer placements continued through 2008, supporting youth empowerment, education advocacy and community outreach across SCEF programmes.",
    projects: ["Volunteer placements", "Youth empowerment workshops"],
    partners: ["AIESEC (volunteer partner)"],
    funding_support_status: "In-kind partner support",
    notes: "Direct funder not stated.",
    impact_summary: "Sustained the SCEF contributor model.",
    related_programs: ["SCEF Volunteers"],
    project_types: ["Youth empowerment", "CSR/partnership"],
  }),
  y(2009, {
    title: "Programme Consolidation & Naija Youth Tours",
    short_summary:
      "Consolidation of media, education advocacy and continued Naija Youth Tours (Nija Youth Tours) educational tourism programmes.",
    detailed_history:
      "SCEF consolidated its media, youth tours and education advocacy work, refining systems for documentation, reporting and volunteer coordination. Naija Youth Tours (Nija Youth Tours) continued as an educational tourism programme connecting young Nigerians with cultural heritage and learning sites.",
    projects: ["Programme documentation", "Volunteer coordination systems", "Naija Youth Tours"],
    partners: ["AIESEC", "Local schools"],
    funding_support_status: "In-kind partner support",
    notes: "Direct funder not stated.",
    impact_summary: "Stronger internal systems and sustained Naija Youth Tours educational tourism reach.",
    related_programs: ["SCEF Operations", "Naija Youth Tours"],
    project_types: ["Education advocacy", "Youth empowerment", "Media education"],
  }),
  y(2010, {
    title: "Health-Education Partnership Engagement",
    short_summary: "Early engagement with PharmAccess on health-and-education linkages.",
    detailed_history:
      "SCEF engaged with PharmAccess on health-and-education linkages, recognising that learner wellbeing is foundational to learning outcomes. PharmAccess is listed as a programme partner.",
    projects: ["Health-education advocacy"],
    partners: ["PharmAccess (programme partner)"],
    funding_support_status: "Programme partner support",
    notes: "PharmAccess listed as a programme partner, not as a direct funder of SCEF.",
    impact_summary: "Introduced health-education thinking into SCEF advocacy.",
    related_programs: ["Health & Education"],
    project_types: ["Education advocacy", "CSR/partnership"],
  }),
  y(2011, {
    title: "ESSPIN Programme Engagement Begins",
    short_summary: "Engagement with ESSPIN as an education programme partner begins.",
    detailed_history:
      "SCEF engaged with the Education Sector Support Programme in Nigeria (ESSPIN) as an education programme partner, contributing to advocacy and community education work. ESSPIN remains listed as an education programme partner unless direct grant, payment, contract or MoU evidence is documented.",
    projects: ["Education sector advocacy"],
    partners: ["ESSPIN (education programme partner)"],
    funding_support_status: "Programme partner support",
    notes: "ESSPIN listed as a programme partner, not a direct funder of SCEF.",
    impact_summary: "Aligned SCEF with national education sector improvement work.",
    related_programs: ["Education Advocacy"],
    project_types: ["Education advocacy", "CSR/partnership"],
  }),
  y(2012, {
    title: "Northern Nigeria Education Advocacy",
    short_summary: "Stronger advocacy across Northern Nigeria states.",
    detailed_history:
      "SCEF deepened education advocacy in Northern Nigeria, working alongside community groups and education stakeholders to highlight access and quality issues.",
    projects: ["Community education forums"],
    partners: ["Community groups", "Education stakeholders"],
    funding_support_status: "Volunteer-supported",
    notes: "Direct funder not stated.",
    impact_summary: "Wider geographic footprint for SCEF advocacy.",
    related_programs: ["Education Advocacy"],
    project_types: ["Education advocacy"],
  }),
  y(2013, {
    title: "VSO Partnership & Kwara Engagement",
    short_summary:
      "VSO partnership begins; engagement with the Kwara State Ministry of Education and integration of local volunteers.",
    detailed_history:
      "Engagement with the Kwara State Ministry of Education began, alongside integration of local volunteers through VSO programmes. SCEF contributed advocacy and volunteer coordination support.",
    projects: ["Kwara education engagement", "VSO volunteer integration"],
    partners: ["VSO (volunteer programme partner)", "Kwara State Ministry of Education"],
    funding_support_status: "In-kind partner support",
    notes: "VSO and Kwara State listed as programme partners. Direct funder not stated.",
    impact_summary: "Embedded SCEF in Kwara State education work.",
    related_programs: ["Education Advocacy", "SCEF Volunteers"],
    project_types: ["Education advocacy", "CSR/partnership"],
  }),
  y(2014, {
    title: "Continued VSO & Kwara Programmes",
    short_summary: "Continued VSO volunteer integration and Kwara education advocacy.",
    detailed_history:
      "VSO volunteer integration and Kwara State Ministry of Education engagement continued, supporting teacher training advocacy and community education forums.",
    projects: ["Teacher training advocacy", "Community education forums"],
    partners: ["VSO", "Kwara State Ministry of Education"],
    funding_support_status: "In-kind partner support",
    notes: "Direct funder not stated.",
    impact_summary: "Sustained SCEF presence in Kwara education work.",
    related_programs: ["Education Advocacy"],
    project_types: ["Education advocacy", "CSR/partnership"],
  }),
  y(2015, {
    title: "EduAid-Africa Expansion",
    short_summary:
      "Scholarships, school support and digital learning programmes scale across Nigeria and into the wider continent.",
    detailed_history:
      "EduAid-Africa scaled up, expanding scholarship support, school support work and early digital learning programmes across Nigeria and into the wider continent.",
    projects: ["EduAid-Africa scholarships", "School support", "Digital learning pilots"],
    partners: ["Schools", "Community partners"],
    funding_support_status: "Mixed: donations + partner support",
    notes: "Mixed donor/partner support; specific direct funders not listed unless documented.",
    impact_summary: "EduAid-Africa becomes a flagship SCEF programme.",
    related_programs: ["EduAid-Africa"],
    project_types: ["Education advocacy", "Digital learning"],
    related_links: [{ label: "EduAid-Africa", href: "/programs/eduaid-africa" }],
  }),
  y(2016, {
    title: "eLibrary Nigeria Foundations",
    short_summary: "Foundational work on eLibrary Nigeria as a digital learning platform begins.",
    detailed_history:
      "SCEF began foundational work on eLibrary Nigeria, framing digital reading and learning access as a core pillar of education equity.",
    projects: ["eLibrary Nigeria concept", "Digital learning curriculum scoping"],
    partners: ["Schools", "Community libraries"],
    funding_support_status: "Volunteer-supported",
    notes: "Direct funder not stated.",
    impact_summary: "Anchored digital learning in the SCEF programme stack.",
    related_programs: ["eLibrary Nigeria"],
    project_types: ["Digital learning", "Education advocacy"],
    related_links: [{ label: "eLibrary Nigeria", href: "/programs/elibrary-nigeria" }],
  }),
  y(2017, {
    title: "Standards Mechanism Concept",
    short_summary: "Concept of NESA as a continental standards mechanism begins to form.",
    detailed_history:
      "SCEF began articulating the concept of a continental education standards mechanism — the foundation for what would become NESA-Africa.",
    projects: ["NESA concept design", "Standards framework scoping"],
    partners: ["Education stakeholders (scoping)"],
    funding_support_status: "Self-funded / Founder-led",
    notes: "Direct funder not stated.",
    impact_summary: "Set the stage for NESA-Africa.",
    related_programs: ["NESA-Africa"],
    project_types: ["Education advocacy"],
  }),
  y(2018, {
    title: "NESA-Africa Standards Engine Launch",
    short_summary: "The New Education Standards Award Africa is created as a continental recognition mechanism.",
    detailed_history:
      "NESA-Africa launched as a continental recognition mechanism — converting education standards into a public recognition and accountability system across Africa.",
    projects: ["NESA-Africa launch", "Categories framework"],
    partners: ["Education stakeholders across Africa"],
    funding_support_status: "Mixed: donations + partner support",
    notes: "Direct funders not listed unless documented.",
    impact_summary: "SCEF establishes a continental standards platform.",
    related_programs: ["NESA-Africa"],
    project_types: ["Education advocacy", "Media education"],
    related_links: [{ label: "NESA-Africa", href: "/programs/nesa-africa" }],
  }),
  y(2019, {
    title: "NESA-Africa Continental Outreach",
    short_summary: "Outreach across African countries to onboard nominees and partners.",
    detailed_history:
      "NESA-Africa expanded outreach across multiple African countries, building the nominee, judge and partner base needed for a continental awards cycle.",
    projects: ["Continental outreach", "Nominee onboarding"],
    partners: ["African education stakeholders"],
    funding_support_status: "Mixed: donations + partner support",
    notes: "Direct funder not stated.",
    impact_summary: "Widened NESA-Africa's continental footprint.",
    related_programs: ["NESA-Africa"],
    project_types: ["Education advocacy", "Local chapters"],
  }),
  y(2020, {
    title: "NESA-Africa Growth & Pandemic Response",
    short_summary:
      "NESA-Africa establishes itself as a continental recognition platform during the COVID-19 period.",
    detailed_history:
      "Through 2020 NESA-Africa established itself as a continental recognition platform. SCEF also responded to the COVID-19 disruption by pushing digital learning and remote education advocacy.",
    projects: ["NESA-Africa awards cycle", "Digital learning response"],
    partners: ["Schools", "Digital learning partners"],
    funding_support_status: "Mixed: donations + partner support",
    notes: "Direct funder not stated.",
    impact_summary: "NESA-Africa cements its continental role; digital learning emphasis grows.",
    related_programs: ["NESA-Africa", "Digital Learning"],
    project_types: ["Education advocacy", "Digital learning"],
  }),
  y(2021, {
    title: "Education Online Africa & eLibrary Launch Phase",
    short_summary: "Digital learning and reading access expand through Education Online Africa and eLibrary Nigeria.",
    detailed_history:
      "Education Online Africa (EOA) and eLibrary Nigeria advanced as flagship digital learning and reading-access platforms, anchoring SCEF's response to digital equity gaps.",
    projects: ["Education Online Africa", "eLibrary Nigeria expansion"],
    partners: ["Schools", "Community libraries"],
    funding_support_status: "Mixed: donations + partner support",
    notes: "Direct funder not stated.",
    impact_summary: "Digital learning becomes a core SCEF pillar.",
    related_programs: ["Education Online Africa", "eLibrary Nigeria"],
    project_types: ["Digital learning", "Education advocacy"],
  }),
  y(2022, {
    title: "Rebuild My School Africa (RMSA) Foundations",
    short_summary: "Foundational work on Rebuild My School Africa begins.",
    detailed_history:
      "SCEF began foundational work on Rebuild My School Africa (RMSA), framing school infrastructure as a critical pillar of education access and dignity.",
    projects: ["RMSA concept", "School needs assessments"],
    partners: ["Schools", "Community partners"],
    funding_support_status: "Volunteer-supported",
    notes: "Direct funder not stated.",
    impact_summary: "RMSA enters the SCEF programme stack.",
    related_programs: ["Rebuild My School Africa"],
    project_types: ["Education advocacy", "CSR/partnership"],
    related_links: [{ label: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" }],
  }),
  y(2023, {
    title: "Women & Girls + Special Needs Programmes",
    short_summary: "Women & Girls Education and Special Needs Education Support take formal shape.",
    detailed_history:
      "SCEF formalised Women & Girls Education and Special Needs Education Support as dedicated programmes within its portfolio, alongside ongoing NESA-Africa and EduAid-Africa work.",
    projects: ["Women & Girls Education", "Special Needs Education Support"],
    partners: ["Schools", "Community partners"],
    funding_support_status: "Mixed: donations + partner support",
    notes: "Direct funder not stated.",
    impact_summary: "SCEF strengthens equity and inclusion across its programmes.",
    related_programs: ["Women & Girls Education", "Special Needs Education"],
    project_types: ["Education advocacy", "Youth empowerment"],
  }),
  y(2024, {
    title: "Pan-African Chapter Rollout Begins",
    short_summary:
      "Local chapter development, ESG and sustainability advocacy, digital learning transformation and continuous monthly programming.",
    detailed_history:
      "SCEF began rolling out local chapters across countries, states and cities, with parallel emphasis on ESG/sustainability advocacy, digital learning transformation and a continuous monthly programme calendar.",
    projects: ["Local chapter rollout", "ESG advocacy", "Monthly programme calendar"],
    partners: ["Local chapter leads", "Community organisations"],
    funding_support_status: "Mixed: donations + partner support",
    notes: "Direct funder not stated.",
    impact_summary: "SCEF transitions to a Pan-African chapter-driven model.",
    related_programs: ["Local Chapters", "ESG Advocacy"],
    project_types: ["Local chapters", "CSR/partnership"],
    related_links: [{ label: "Local Chapters", href: "/local-chapters" }],
  }),
  y(2025, {
    title: "Continental Expansion & CSR Partnerships",
    short_summary: "Expanded continental presence, CSR partnerships and monthly advocacy programming.",
    detailed_history:
      "SCEF expanded its continental presence, deepened CSR partnership engagement and ran a continuous monthly advocacy calendar across its programme areas.",
    projects: ["CSR partnership programme", "Monthly advocacy calendar", "Continental chapter growth"],
    partners: ["CSR partners", "Local chapter leads"],
    funding_support_status: "Donor & sponsor supported",
    notes: "Donor and sponsor names listed only where direct documentation exists.",
    impact_summary: "Stronger Pan-African footprint and CSR partnership pipeline.",
    related_programs: ["NESA-Africa", "EduAid-Africa", "Local Chapters"],
    project_types: ["CSR/partnership", "Local chapters", "Education advocacy"],
  }),
  y(2026, {
    title: "Unified SCEF Ecosystem & SCEF 2035 Roadmap",
    short_summary:
      "Launch of the unified SCEF web ecosystem, monthly programme calendar and the SCEF 2035 vision roadmap.",
    detailed_history:
      "SCEF launched its unified web ecosystem connecting the HQ site, programme microsites, local chapters and dashboards. The SCEF 2035 vision roadmap formalised SCEF's strategic direction toward a continental, standards-led education institution. Target/proposed strategic partners for SCEF 2035 are listed as proposed unless confirmed.",
    projects: [
      "Unified SCEF web ecosystem",
      "Sophia AI support assistant",
      "GFA Wallet integration",
      "SCEF 2035 roadmap",
    ],
    partners: ["Target/proposed strategic partners (SCEF 2035)"],
    funding_support_status: "Donor & sponsor supported",
    notes: "Future global institutions remain target/proposed strategic partners unless confirmed.",
    impact_summary: "SCEF positioned as a unified continental education institution.",
    related_programs: ["SCEF 2035", "NESA-Africa", "EduAid-Africa", "Local Chapters"],
    project_types: ["SCEF 2035", "Education advocacy", "Digital learning", "CSR/partnership"],
    related_links: [
      { label: "Vision 2037 / SCEF 2035", href: "/about/vision-2037" },
      { label: "Programs", href: "/programs" },
    ],
  }),
];

export const getHistoryYear = (slug: string) =>
  scefHistoryTimeline.find((h) => h.slug === slug);

export const PROJECT_TYPES: ProjectType[] = [
  "Education advocacy",
  "Youth empowerment",
  "Digital learning",
  "Media education",
  "CSR/partnership",
  "Local chapters",
  "SCEF 2035",
];

export const FUNDING_STATUSES: FundingStatus[] = [
  "Self-funded / Founder-led",
  "Volunteer-supported",
  "Programme partner support",
  "In-kind partner support",
  "Direct funder not stated",
  "Mixed: donations + partner support",
  "Donor & sponsor supported",
  "Proposed / In development",
];

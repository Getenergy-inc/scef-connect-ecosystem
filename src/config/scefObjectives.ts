// SCEF 6 Core Objectives - FINAL APPROVED VERSION
// These are the official objectives - do NOT modify the wording

export interface SCEFObjective {
  id: number;
  title: string;
  shortTitle: string;
  deliveryTools?: string[];
  measurePlaceholder?: string;
}

export const scefObjectives: SCEFObjective[] = [
  {
    id: 1,
    title: "To build the platform for advocating a continuous, ever-growing standard of education in Africa—through standards frameworks, benchmarking, recognition, and endorsed certification/verification systems.",
    shortTitle: "Standards & Recognition",
    deliveryTools: ["NESA-Africa", "Certification/Verification Systems"],
    measurePlaceholder: "Benchmarking metrics to be defined"
  },
  {
    id: 2,
    title: "To expand equitable access to learning and certification by deploying integrated digital platforms for resources, skills, and verifiable outcomes across Africa and the diaspora.",
    shortTitle: "Digital Access & Certification",
    deliveryTools: ["Education Online Africa (EOA)", "eLibrary Nigeria", "ACDL/AWPC"],
    measurePlaceholder: "Platform usage & certification rates"
  },
  {
    id: 3,
    title: "To strengthen education advocacy and knowledge dissemination by developing media channels (TV, radio, webinars, podcasts, publications) that promote adoption of quality and inclusion practices.",
    shortTitle: "Media & Advocacy",
    deliveryTools: ["NESA Africa TV", "It's In Me Radio", "EduAid Webinars"],
    measurePlaceholder: "Media reach & engagement metrics"
  },
  {
    id: 4,
    title: "To establish and monitor compliant delivery networks by onboarding, supporting, and auditing local chapters (physical and online) to implement programs with measurable reporting.",
    shortTitle: "Chapter Networks",
    deliveryTools: ["Local Chapter System", "Chapter Compliance Framework"],
    measurePlaceholder: "Active chapters & compliance rates"
  },
  {
    id: 5,
    title: "To mobilize and manage education funding with accountability—including CSR for Education Funds Management Services—using verified project pipelines, tracked disbursement, and ESG/SDG-aligned reporting.",
    shortTitle: "Funding & Accountability",
    deliveryTools: ["SCEF–FMS", "CSR Partnership Program", "ESG/SDG Reporting"],
    measurePlaceholder: "Funds mobilized & disbursement tracking"
  },
  {
    id: 6,
    title: "To scale Education for All across Africa's five regions (North, West, Central, East, Southern) with support from a sixth region: the African diaspora, by building renewable multi-year partnerships with institutions, multilaterals, and global education funders.",
    shortTitle: "Pan-African Scale",
    deliveryTools: ["Regional Chapters", "Diaspora Engagement", "Institutional Partnerships"],
    measurePlaceholder: "Regional coverage & partnership metrics"
  }
];

// Short display version for cards/lists
export const objectivesShort = scefObjectives.map(obj => obj.title);

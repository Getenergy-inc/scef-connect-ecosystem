// SCEF 6 Core Objectives - Updated 2025
// Each objective starts with "To…" and includes SMART-style targets

export interface SCEFObjective {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  smartMeasures: string[];
  icon: string;
}

export const scefObjectives: SCEFObjective[] = [
  {
    id: 1,
    title: "To build the SCEF platform for advocating a continuous, ever-growing standard of education in Africa.",
    shortTitle: "Standards Platform",
    description: "Build the foundational platform for continuous education standards advocacy.",
    smartMeasures: [
      "Publish Africa-wide Standards & Governance Framework v1 by Q4 2026",
      "Run quarterly reviews/updates from 2027",
      "Pilot adoption/benchmarking with partners across all 5 African regions by 2030",
      "Include diaspora support as the 6th region"
    ],
    icon: "target"
  },
  {
    id: 2,
    title: "To strengthen layered governance and accountability for Education-for-All delivery across Africa and the diaspora.",
    shortTitle: "Governance & Accountability",
    description: "Strengthen governance workflows and accountability mechanisms.",
    smartMeasures: [
      "Implement governance workflows (BoT/BoA/BoD approvals, compliance logs, reporting templates) by Q2 2026",
      "Publish annual governance & performance reports starting 2026"
    ],
    icon: "shield"
  },
  {
    id: 3,
    title: "To deploy digital platforms that expand access, learning, verification, and certification at scale.",
    shortTitle: "Digital Platforms",
    description: "Deploy unified digital platforms for access and certification.",
    smartMeasures: [
      "Launch/upgrade unified platforms (web/app, dashboards, certification/verification modules, multilingual UI) by Q4 2026",
      "Maintain sitewide language readiness",
      "Improve completion/verification rates annually through 2035"
    ],
    icon: "laptop"
  },
  {
    id: 4,
    title: "To build and monitor a chapter-driven implementation network across the 5 African regions, supported by diaspora (6th region), to deliver local education outcomes.",
    shortTitle: "Chapter Network",
    description: "Build chapter-driven implementation network across Africa.",
    smartMeasures: [
      "Standardize chapter onboarding + compliance checklist by Q2 2026",
      "Activate and monitor chapters across all 5 regions by 2030",
      "Include at least 10 diaspora chapters",
      "Publish quarterly chapter performance dashboards from 2026"
    ],
    icon: "globe"
  },
  {
    id: 5,
    title: "To mobilize, manage, and report education funding transparently—especially through CSR for Education Funds Management Services (SCEF–FMS).",
    shortTitle: "Funding & CSR Management",
    description: "Mobilize and manage education funding transparently.",
    smartMeasures: [
      "Operate verified project pipeline + tracked disbursement + ESG/SDG reporting by Q2 2026",
      "Deliver quarterly outcome reports for CSR partners starting 2026",
      "Grow multi-year partner commitments (targeting 10-year renewable partnerships) through 2035"
    ],
    icon: "trending-up"
  },
  {
    id: 6,
    title: "To deliver measurable, inclusive impact through integrated programs aligned with SDG 4, AU Agenda 2063, sustainability, ESG, and Africa development finance priorities.",
    shortTitle: "Measurable Impact",
    description: "Deliver measurable impact aligned with global development goals.",
    smartMeasures: [
      "Track outcomes across programs annually",
      "By 2035: 100,000+ scholarships awarded",
      "By 2035: 1,000 schools rebuilt",
      "By 2035: 4 million learners reached",
      "By 2035: 54 chapters active",
      "By 2035: 250+ ambassadors",
      "By 2035: $50m mobilized",
      "Annual progress reporting"
    ],
    icon: "bar-chart-3"
  }
];

// Short website-friendly version
export const objectivesShort = [
  "Build Africa's continuous education standards platform",
  "Strengthen layered governance and accountability",
  "Deploy scalable digital learning and certification platforms",
  "Build chapter-driven implementation across 5 regions + diaspora",
  "Mobilize and manage education funding transparently",
  "Deliver measurable, inclusive impact aligned with SDG 4 & AU 2063"
];

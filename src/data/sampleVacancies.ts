// Sample Vacancies Data for Initial Display
// This data can be edited or replaced via the Admin CMS

export interface VacancyData {
  title: string;
  department: string;
  division: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  applicationEmail: string;
}

export const sampleVacancies: VacancyData[] = [
  {
    title: "Partnerships & CSR Officer",
    department: "Partnerships",
    division: "SOBCD",
    location: "Lagos, Nigeria / Remote",
    employmentType: "full-time",
    description: "Lead partnership development and CSR engagement for SCEF's education programs across Africa. Build relationships with corporate partners, foundations, and government agencies to secure funding and support for our initiatives.",
    requirements: [
      "Bachelor's degree in Business, International Relations, or related field",
      "3+ years experience in partnership development or CSR",
      "Strong network in African education or development sectors",
      "Excellent communication and presentation skills",
      "Fluency in English; French is a plus"
    ],
    responsibilities: [
      "Identify and cultivate partnerships with corporate entities and foundations",
      "Develop and present partnership proposals aligned with SCEF programs",
      "Manage CSR for Education Funds relationships",
      "Coordinate with program teams on partner engagement",
      "Prepare impact reports for partners"
    ],
    applicationEmail: "partnership@santoscreations.org"
  },
  {
    title: "Grants & Proposal Writer",
    department: "Business Development",
    division: "OMBDD",
    location: "Remote",
    employmentType: "contract",
    description: "Research funding opportunities and write compelling grant proposals for SCEF's education programs. Support the organization in securing institutional funding from multilaterals, foundations, and government agencies.",
    requirements: [
      "Bachelor's degree in relevant field",
      "2+ years experience in grant writing for NGOs",
      "Proven track record of successful grant applications",
      "Strong research and writing skills",
      "Knowledge of SDG 4 and education development"
    ],
    responsibilities: [
      "Research and identify grant opportunities",
      "Write and submit grant proposals",
      "Coordinate with program teams on project design",
      "Maintain grants calendar and tracking system",
      "Prepare funder reports"
    ],
    applicationEmail: "businessdevelopment@santoscreations.org"
  },
  {
    title: "Program Coordinator — EduAid-Africa",
    department: "Programs",
    division: "SOBCD",
    location: "Lagos, Nigeria",
    employmentType: "full-time",
    description: "Coordinate the EduAid-Africa scholarship and education support program. Manage beneficiary selection, disbursement tracking, and impact measurement for education aid initiatives across Africa.",
    requirements: [
      "Bachelor's degree in Education, Social Sciences, or related field",
      "2+ years program coordination experience",
      "Experience in scholarship or grant management",
      "Strong organizational and data management skills",
      "Passion for education access and equity"
    ],
    responsibilities: [
      "Manage scholarship application and selection process",
      "Track disbursements and beneficiary progress",
      "Coordinate with chapter teams on local delivery",
      "Prepare program reports and impact assessments",
      "Support beneficiary communications"
    ],
    applicationEmail: "hr@santoscreations.org"
  },
  {
    title: "Project Coordinator — Rebuild My School Africa",
    department: "Programs",
    division: "SOBCD/LCS",
    location: "Nigeria / Regional Travel",
    employmentType: "full-time",
    description: "Coordinate school rebuilding and infrastructure projects under the RMSA program. Work with local chapters, contractors, and communities to deliver quality school infrastructure across Africa.",
    requirements: [
      "Bachelor's degree in Project Management, Engineering, or related field",
      "3+ years experience in project coordination",
      "Experience in construction or infrastructure projects",
      "Strong vendor and stakeholder management skills",
      "Willingness to travel within Africa"
    ],
    responsibilities: [
      "Coordinate school rebuilding projects from planning to completion",
      "Manage contractors and ensure quality standards",
      "Work with local chapters on community engagement",
      "Track project budgets and timelines",
      "Document and report on project progress"
    ],
    applicationEmail: "hr@santoscreations.org"
  },
  {
    title: "Media Producer — NESA Africa TV",
    department: "Media",
    division: "Santos Media",
    location: "Lagos, Nigeria / Remote",
    employmentType: "contract",
    description: "Produce video content for NESA Africa TV including award shows, educational documentaries, and promotional content. Join our media team to tell the story of African education excellence.",
    requirements: [
      "Bachelor's degree in Media, Film, or Communications",
      "2+ years video production experience",
      "Proficiency in video editing software (Premiere, Final Cut)",
      "Experience with live streaming platforms",
      "Creative storytelling abilities"
    ],
    responsibilities: [
      "Produce video content for NESA Africa TV",
      "Edit and post-produce award show footage",
      "Create promotional videos for programs",
      "Manage live stream productions",
      "Coordinate with media volunteers"
    ],
    applicationEmail: "nesa.africa@santoscreations.org"
  },
  {
    title: "Chapter Support Officer",
    department: "Chapter Services",
    division: "LCS",
    location: "Remote",
    employmentType: "full-time",
    description: "Support SCEF local chapters across Africa with onboarding, compliance, and capacity building. Help chapters succeed in delivering education programs in their communities.",
    requirements: [
      "Bachelor's degree in relevant field",
      "2+ years experience in chapter/member support roles",
      "Strong communication and training skills",
      "Experience with CRM or membership systems",
      "Understanding of African education landscape"
    ],
    responsibilities: [
      "Onboard and train new chapter leaders",
      "Monitor chapter compliance and reporting",
      "Provide ongoing support to chapter teams",
      "Coordinate inter-chapter collaboration",
      "Prepare chapter performance reports"
    ],
    applicationEmail: "hr@santoscreations.org"
  },
  {
    title: "UI/Frontend Developer",
    department: "Technology",
    division: "TDSD",
    location: "Remote",
    employmentType: "contract",
    description: "Build and maintain SCEF's digital platforms including the main website, learning platforms, and member dashboards. Work with React, TypeScript, and modern frontend technologies.",
    requirements: [
      "3+ years experience in frontend development",
      "Proficiency in React, TypeScript, and Tailwind CSS",
      "Experience with responsive and accessible design",
      "Understanding of i18n/RTL requirements",
      "Portfolio of relevant projects"
    ],
    responsibilities: [
      "Develop and maintain frontend applications",
      "Implement responsive, accessible UI components",
      "Support multilingual and RTL implementations",
      "Collaborate with design and backend teams",
      "Optimize performance and user experience"
    ],
    applicationEmail: "hr@santoscreations.org"
  },
  {
    title: "Localization / i18n Coordinator",
    department: "Technology",
    division: "TDSD",
    location: "Remote",
    employmentType: "part-time",
    description: "Coordinate translation and localization of SCEF's digital content across 8 languages including Arabic RTL. Manage translation workflows and ensure quality across all platforms.",
    requirements: [
      "Fluency in English plus at least 2 African/European languages",
      "Experience with localization workflows",
      "Understanding of i18n technical requirements",
      "Strong project coordination skills",
      "Attention to cultural nuance"
    ],
    responsibilities: [
      "Coordinate translation across 8 languages",
      "Manage translation vendor relationships",
      "Review and QA translated content",
      "Maintain translation glossaries",
      "Support RTL implementation for Arabic"
    ],
    applicationEmail: "hr@santoscreations.org"
  },
  {
    title: "Volunteer Coordinator",
    department: "Human Resources",
    division: "SOBCD",
    location: "Lagos, Nigeria / Remote",
    employmentType: "full-time",
    description: "Manage SCEF's volunteer program including recruitment, training, and placement. Build a thriving volunteer community across Africa and the diaspora.",
    requirements: [
      "Bachelor's degree in HR, Social Sciences, or related field",
      "2+ years experience in volunteer management",
      "Strong interpersonal and organizational skills",
      "Experience with volunteer management systems",
      "Passion for community engagement"
    ],
    responsibilities: [
      "Recruit and onboard volunteers",
      "Develop volunteer training programs",
      "Match volunteers with program needs",
      "Track volunteer hours and impact",
      "Recognize and retain volunteer talent"
    ],
    applicationEmail: "volunteer@santoscreations.org"
  }
];

// SCEF Email Directory - Complete
// All emails linked to Zohomail host + supporting addresses

export const emailDirectory = {
  // Executive Office
  executive: "babashola@santoscreations.org",
  office: "office@santoscreations.org",
  admin: "admin@santoscreations.org",

  // General Inquiries
  info: "info@santoscreations.org",
  infoNg: "info@santoscreations.com.ng",
  support: "support@santoscreations.org",
  donation: "donation@santoscreations.org",

  // Get Involved
  membership: "membership@santoscreations.org",
  internship: "internship@santoscreations.org",
  volunteer: "volunteer@santoscreations.org",

  // Partnerships & Business
  partnership: "partnership@santoscreations.org",
  partnerships: "partnerships@santoscreations.org",
  businessDevelopment: "businessdevelopment@santoscreations.org",

  // Programs
  nesa: "nesa.africa@santoscreations.org",
  eoa: "eon@santoscreations.org",
  elibrary: "elibrarynigeria@santoscreations.org",
  certificate: "certificate@santoscreations.org",

  // HR & Leadership
  hr: "hr@santoscreations.org",
  adminHr: "admin.hr@santoscreations.org",

  // Operations & Finance (SOBCD)
  sobcd: "sobcd@santoscreations.org",
  reportsSobcd: "reports.sobcd@santoscreations.org",
  finance: "finance@santoscreations.org",
  legal: "legal@santoscreations.org",
  wallet: "wallet@santoscreations.org",

  // Technology & Digital Services (TDSD)
  tdsd: "tdsd@santoscreations.org",
  reportsTdsd: "reports.tdsd@santoscreations.org",
  devteam: "devteam@santoscreations.org",
  tech: "tech@santoscreations.org",
  techsupport: "techsupport@santoscreations.org",
  uxui: "uxui@santoscreations.org",
  security: "security@santoscreations.org",
  data: "data@santoscreations.org",

  // Outreach, Media & Business Dev (OMBDD)
  ombdd: "ombdd@santoscreations.org",
  reportsOmbdd: "reports.ombdd@santoscreations.org",
  media: "media@santoscreations.org",
  social: "social@santoscreations.org",
  pr: "pr@santoscreations.org",
  graphics: "graphics@santoscreations.org",
  events: "events@santoscreations.org",

  // Chapters
  chapters: "chapters@santoscreations.org",

  // Named Staff
  folashade: "folashade@santoscreations.org",
  funmi: "Funmi.Omitowoju@santoscreations.com.ng",
  vincesantos: "vincesantos@santoscreations.com.ng",

  // External / Gmail
  mediaGmail: "media.santoscreations@gmail.com",
  reportGmail: "report.santoscreations1@gmail.com",
};

// Categorized email list for display (public-facing categories)
export const emailCategories = {
  executive: [
    { label: "Executive Office (CVO)", email: "babashola@santoscreations.org" },
    { label: "Office", email: "office@santoscreations.org" },
    { label: "Admin", email: "admin@santoscreations.org" },
  ],
  general: [
    { label: "General Inquiries", email: "info@santoscreations.org" },
    { label: "Support", email: "support@santoscreations.org" },
    { label: "Donations", email: "donation@santoscreations.org" },
  ],
  getInvolved: [
    { label: "Membership", email: "membership@santoscreations.org" },
    { label: "Internship", email: "internship@santoscreations.org" },
    { label: "Volunteer", email: "volunteer@santoscreations.org" },
  ],
  partnerships: [
    { label: "Partnership", email: "partnership@santoscreations.org" },
    { label: "Business Development", email: "businessdevelopment@santoscreations.org" },
    { label: "Chapters", email: "chapters@santoscreations.org" },
    { label: "Events", email: "events@santoscreations.org" },
  ],
  programs: [
    { label: "NESA Africa", email: "nesa.africa@santoscreations.org" },
    { label: "Education Online Africa", email: "eon@santoscreations.org" },
    { label: "eLibrary Nigeria", email: "elibrarynigeria@santoscreations.org" },
    { label: "Certifications", email: "certificate@santoscreations.org" },
  ],
  hr: [
    { label: "Human Resources", email: "hr@santoscreations.org" },
    { label: "HR Admin", email: "admin.hr@santoscreations.org" },
  ],
  operations: [
    { label: "SOBCD Division", email: "sobcd@santoscreations.org" },
    { label: "Finance", email: "finance@santoscreations.org" },
    { label: "Legal", email: "legal@santoscreations.org" },
    { label: "Wallet / Payments", email: "wallet@santoscreations.org" },
  ],
  technology: [
    { label: "TDSD Division", email: "tdsd@santoscreations.org" },
    { label: "Dev Team", email: "devteam@santoscreations.org" },
    { label: "Tech Support", email: "techsupport@santoscreations.org" },
    { label: "Security", email: "security@santoscreations.org" },
    { label: "UX/UI", email: "uxui@santoscreations.org" },
    { label: "Data", email: "data@santoscreations.org" },
  ],
  media: [
    { label: "OMBDD Division", email: "ombdd@santoscreations.org" },
    { label: "Media", email: "media@santoscreations.org" },
    { label: "Social Media", email: "social@santoscreations.org" },
    { label: "PR", email: "pr@santoscreations.org" },
    { label: "Graphics", email: "graphics@santoscreations.org" },
  ],
};

// Category display names
export const categoryLabels: Record<string, string> = {
  executive: "Executive Office",
  general: "General Inquiries",
  getInvolved: "Get Involved",
  partnerships: "Partnerships & Chapters",
  programs: "Programs",
  hr: "HR & Recruitment",
  operations: "Operations & Finance",
  technology: "Technology & Digital",
  media: "Media & Outreach",
};

// Helper functions
export const getMailtoLink = (email: string) => `mailto:${email}`;

export const getZohoComposeLink = (email: string) =>
  `https://mail.zoho.com/zm/#compose?to=${encodeURIComponent(email)}`;

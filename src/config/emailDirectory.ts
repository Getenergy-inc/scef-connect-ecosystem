// SCEF Email Directory - Complete
// All emails linked to Zohomail host + supporting addresses

export const emailDirectory = {
  // Executive Office
  executive: "media.santoscreations@gmail.com",
  office: "media.santoscreations@gmail.com",
  admin: "media.santoscreations@gmail.com",

  // General Inquiries
  info: "media.santoscreations@gmail.com",
  infoNg: "media.santoscreations@gmail.com",
  support: "media.santoscreations@gmail.com",
  donation: "media.santoscreations@gmail.com",

  // Get Involved
  membership: "media.santoscreations@gmail.com",
  internship: "media.santoscreations@gmail.com",
  volunteer: "media.santoscreations@gmail.com",

  // Partnerships & Business
  partnership: "media.santoscreations@gmail.com",
  partnerships: "media.santoscreations@gmail.com",
  businessDevelopment: "media.santoscreations@gmail.com",

  // Programs
  nesa: "nesa.africa@gmail.com",
  eoa: "media.santoscreations@gmail.com",
  elibrary: "media.santoscreations@gmail.com",
  certificate: "media.santoscreations@gmail.com",

  // HR & Leadership
  hr: "media.santoscreations@gmail.com",
  adminHr: "media.santoscreations@gmail.com",

  // Operations & Finance (SOBCD)
  sobcd: "media.santoscreations@gmail.com",
  reportsSobcd: "media.santoscreations@gmail.com",
  finance: "media.santoscreations@gmail.com",
  legal: "media.santoscreations@gmail.com",
  wallet: "media.santoscreations@gmail.com",

  // Technology & Digital Services (TDSD)
  tdsd: "media.santoscreations@gmail.com",
  reportsTdsd: "media.santoscreations@gmail.com",
  devteam: "media.santoscreations@gmail.com",
  tech: "media.santoscreations@gmail.com",
  techsupport: "media.santoscreations@gmail.com",
  uxui: "media.santoscreations@gmail.com",
  security: "media.santoscreations@gmail.com",
  data: "media.santoscreations@gmail.com",

  // Outreach, Media & Business Dev (OMBDD)
  ombdd: "media.santoscreations@gmail.com",
  reportsOmbdd: "media.santoscreations@gmail.com",
  media: "media.santoscreations@gmail.com",
  social: "media.santoscreations@gmail.com",
  pr: "media.santoscreations@gmail.com",
  graphics: "media.santoscreations@gmail.com",
  events: "media.santoscreations@gmail.com",

  // Chapters
  chapters: "media.santoscreations@gmail.com",

  // Named Staff
  folashade: "media.santoscreations@gmail.com",
  funmi: "media.santoscreations@gmail.com",
  vincesantos: "media.santoscreations@gmail.com",

  // External / Gmail
  mediaGmail: "media.santoscreations@gmail.com",
  reportGmail: "media.santoscreations@gmail.com",
};

// Categorized email list for display (public-facing categories)
export const emailCategories = {
  executive: [
    { label: "Executive Office (CVO)", email: "media.santoscreations@gmail.com" },
    { label: "Office", email: "media.santoscreations@gmail.com" },
    { label: "Admin", email: "media.santoscreations@gmail.com" },
  ],
  general: [
    { label: "General Inquiries", email: "media.santoscreations@gmail.com" },
    { label: "Support", email: "media.santoscreations@gmail.com" },
    { label: "Donations", email: "media.santoscreations@gmail.com" },
  ],
  getInvolved: [
    { label: "Membership", email: "media.santoscreations@gmail.com" },
    { label: "Internship", email: "media.santoscreations@gmail.com" },
    { label: "Volunteer", email: "media.santoscreations@gmail.com" },
  ],
  partnerships: [
    { label: "Partnership", email: "media.santoscreations@gmail.com" },
    { label: "Business Development", email: "media.santoscreations@gmail.com" },
    { label: "Chapters", email: "media.santoscreations@gmail.com" },
    { label: "Events", email: "media.santoscreations@gmail.com" },
  ],
  programs: [
    { label: "NESA Africa", email: "nesa.africa@gmail.com" },
    { label: "Education Online Africa", email: "media.santoscreations@gmail.com" },
    { label: "eLibrary Nigeria", email: "media.santoscreations@gmail.com" },
    { label: "Certifications", email: "media.santoscreations@gmail.com" },
  ],
  hr: [
    { label: "Human Resources", email: "media.santoscreations@gmail.com" },
    { label: "HR Admin", email: "media.santoscreations@gmail.com" },
  ],
  operations: [
    { label: "SOBCD Division", email: "media.santoscreations@gmail.com" },
    { label: "Finance", email: "media.santoscreations@gmail.com" },
    { label: "Legal", email: "media.santoscreations@gmail.com" },
    { label: "Wallet / Payments", email: "media.santoscreations@gmail.com" },
  ],
  technology: [
    { label: "TDSD Division", email: "media.santoscreations@gmail.com" },
    { label: "Dev Team", email: "media.santoscreations@gmail.com" },
    { label: "Tech Support", email: "media.santoscreations@gmail.com" },
    { label: "Security", email: "media.santoscreations@gmail.com" },
    { label: "UX/UI", email: "media.santoscreations@gmail.com" },
    { label: "Data", email: "media.santoscreations@gmail.com" },
  ],
  media: [
    { label: "OMBDD Division", email: "media.santoscreations@gmail.com" },
    { label: "Media", email: "media.santoscreations@gmail.com" },
    { label: "Social Media", email: "media.santoscreations@gmail.com" },
    { label: "PR", email: "media.santoscreations@gmail.com" },
    { label: "Graphics", email: "media.santoscreations@gmail.com" },
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

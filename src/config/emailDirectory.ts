// SCEF Institutional Email Directory
// All emails linked to Zohomail host

export const emailDirectory = {
  // Core Operations
  general: {
    info: "info@santoscreations.org",
    office: "office@santoscreations.org",
  },
  
  // Get Involved
  membership: "membership@santoscreations.org",
  internship: "internship@santoscreations.org",
  volunteer: "volunteer@santoscreations.org",
  
  // Partnerships & Business
  partnership: "partnership@santoscreations.org",
  businessDevelopment: "businessdevelopment@santoscreations.org",
  
  // Programs
  nesa: "nesa.africa@santoscreations.org",
  eoa: "eon@santoscreations.org",
  elibrary: "elibrarynigeria@santoscreations.org",
  certificate: "certificate@santoscreations.org",
  
  // HR & Leadership
  hr: "hr@santoscreations.org",
  executive: "babashola@santoscreations.org",
};

// Email labels for display
export const emailLabels = {
  info: "General Inquiries",
  office: "Office",
  membership: "Membership",
  internship: "Internship",
  volunteer: "Volunteer",
  partnership: "Partnership",
  businessDevelopment: "Business Development",
  nesa: "NESA Africa",
  eoa: "Education Online Africa",
  elibrary: "eLibrary Nigeria",
  certificate: "Certifications",
  hr: "Human Resources",
  executive: "Executive Office",
};

// Helper to create mailto link
export const getMailtoLink = (email: string) => `mailto:${email}`;

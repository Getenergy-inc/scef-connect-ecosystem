// SCEF Email Directory - Complete
// All emails linked to Zohomail host

export const emailDirectory = {
  // General Inquiries
  info: "info@santoscreations.org",
  office: "office@santoscreations.org",
  
  // Get Involved
  membership: "membership@santoscreations.org",
  internship: "internship@santoscreations.org",
  volunteer: "volunteer@santoscreations.org",
  
  // Partnerships & Business
  partnership: "partnership@santoscreations.org",
  partners: "partners@santoscreations.org", // CSR interest
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

// Categorized email list for display
export const emailCategories = {
  general: [
    { label: "General Inquiries", email: "info@santoscreations.org" },
    { label: "Office", email: "office@santoscreations.org" },
  ],
  getInvolved: [
    { label: "Membership", email: "membership@santoscreations.org" },
    { label: "Internship", email: "internship@santoscreations.org" },
    { label: "Volunteer", email: "volunteer@santoscreations.org" },
  ],
  partnerships: [
    { label: "Partnership", email: "partnership@santoscreations.org" },
    { label: "CSR Interest", email: "partners@santoscreations.org" },
    { label: "Business Development", email: "businessdevelopment@santoscreations.org" },
  ],
  programs: [
    { label: "NESA Africa", email: "nesa.africa@santoscreations.org" },
    { label: "Education Online Africa", email: "eon@santoscreations.org" },
    { label: "eLibrary Nigeria", email: "elibrarynigeria@santoscreations.org" },
    { label: "Certifications", email: "certificate@santoscreations.org" },
  ],
  hr: [
    { label: "Human Resources", email: "hr@santoscreations.org" },
    { label: "Executive Office", email: "babashola@santoscreations.org" },
  ],
};

// Full flat list for comprehensive display
export const allEmails = [
  { label: "General Inquiries", email: "info@santoscreations.org", category: "general" },
  { label: "Office", email: "office@santoscreations.org", category: "general" },
  { label: "Membership", email: "membership@santoscreations.org", category: "getInvolved" },
  { label: "Internship", email: "internship@santoscreations.org", category: "getInvolved" },
  { label: "Volunteer", email: "volunteer@santoscreations.org", category: "getInvolved" },
  { label: "Partnership", email: "partnership@santoscreations.org", category: "partnerships" },
  { label: "CSR Interest", email: "partners@santoscreations.org", category: "partnerships" },
  { label: "Business Development", email: "businessdevelopment@santoscreations.org", category: "partnerships" },
  { label: "NESA Africa", email: "nesa.africa@santoscreations.org", category: "programs" },
  { label: "Education Online Africa", email: "eon@santoscreations.org", category: "programs" },
  { label: "eLibrary Nigeria", email: "elibrarynigeria@santoscreations.org", category: "programs" },
  { label: "Certifications", email: "certificate@santoscreations.org", category: "programs" },
  { label: "Human Resources", email: "hr@santoscreations.org", category: "hr" },
  { label: "Executive Office", email: "babashola@santoscreations.org", category: "hr" },
];

// Helper functions
export const getMailtoLink = (email: string) => `mailto:${email}`;

export const getZohoComposeLink = (email: string) => 
  `https://mail.zoho.com/zm/#compose?to=${encodeURIComponent(email)}`;

// ========================================
// SCEF Route Constants - Single Source of Truth
// Use these constants for all navigation to prevent 404s
// ========================================

export const ROUTES = {
  // Core pages
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  
  // Auth
  AUTH: "/auth",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  
  // Programs
  PROGRAMS: "/programs",
  NESA_AFRICA: "/programs/nesa-africa",
  EDUAID_AFRICA: "/programs/eduaid-africa",
  REBUILD_MY_SCHOOL: "/programs/rebuild-my-school-africa",
  WOMEN_GIRLS_EDUCATION: "/programs/women-girls-education",
  SPECIAL_NEEDS_EDUCATION: "/programs/special-needs-education",
  DIGITAL_LEARNING: "/programs/digital-learning",
  ELIBRARY_NIGERIA: "/programs/elibrary-nigeria",
  INCLUSION_ACCESS: "/programs/inclusion-access",
  
  // Chapters
  LOCAL_CHAPTERS: "/local-chapters",
  CHAPTERS: "/chapters",
  JOIN_CHAPTER: "/chapters/join-online",
  
  // Get Involved
  GET_INVOLVED: "/get-involved",
  MEMBERSHIP: "/membership",
  AMBASSADOR: "/get-involved/ambassador",
  NRC: "/get-involved/nrc",
  JUDGE: "/get-involved/judge",
  DONATE: "/donate",
  DONATION_SUCCESS: "/donation-success",
  WALLET: "/wallet",
  WALLET_DONATE: "/wallet/donate",
  
  // Governance
  GOVERNANCE: "/governance",
  
  // Partners
  PARTNERS: "/partners",
  PARTNER_WITH_US: "/partner-with-us",
  
  // Media
  MEDIA: "/media",
  NESA_TV: "/media/nesa-tv",
  NESA_AWARDS_TV: "/media/nesa-awards-tv",
  NESA_AWARDS_PLATINUM: "/media/nesa-awards-tv/platinum",
  NESA_AWARDS_AFRICA_ICON: "/media/nesa-awards-tv/africa-icon",
  NESA_AWARDS_GOLD_CERTIFICATE: "/media/nesa-awards-tv/gold-certificate",
  NESA_AWARDS_BLUE_GARNET_GALA: "/media/nesa-awards-tv/blue-garnet-gala",
  ITS_IN_ME_RADIO: "/media/its-in-me-radio",
  EDUAID_WEBINARS: "/media/eduaid-webinars",
  EDUCATION_TOURISM: "/media/education-tourism-show",
  
  // NESA Awards
  AWARDS_PLATINUM: "/awards/platinum",
  AWARDS_ICON: "/awards/icon",
  AWARDS_GOLD: "/awards/gold",
  AWARDS_BLUE_GARNET: "/awards/blue-garnet",
  
  // Vote & Nominate
  VOTE: "/vote",
  NOMINATE: "/nominate",
  CALENDAR: "/calendar",
  
  // Categories
  CATEGORIES: "/categories",
  CATEGORIES_NIGERIA: "/categories/nigeria",
  
  // Divisions
  DIVISIONS: "/divisions",
  DIVISION_BGEO: "/divisions/bgeo",
  DIVISION_SOBCD: "/divisions/sobcd",
  DIVISION_TDSD: "/divisions/tdsd",
  DIVISION_OMBDD: "/divisions/ombdd",
  DIVISION_SANTOS_MEDIA: "/divisions/santos-media",
  DIVISION_LCS: "/divisions/lcs",
  
  // Dashboard
  DASHBOARD: "/dashboard",
  DASHBOARD_WELCOME: "/dashboard/welcome",
  DASHBOARD_PROFILE: "/dashboard/profile",
  DASHBOARD_ACTIVITY: "/dashboard/activity",
  DASHBOARD_ELIBRARY: "/dashboard/elibrary",
  DASHBOARD_SETTINGS: "/dashboard/settings",
  
  // Chapter Inbox
  CHAPTER_INBOX: "/chapter/inbox",
  
  // Messages & Decisions
  MESSAGES: "/messages",
  DECISIONS: "/decisions",
  
  // Portals (Role-based)
  PORTAL_JURY: "/portal/jury",
  PORTAL_NRC: "/portal/nrc",
  PORTAL_AMBASSADOR: "/portal/ambassador",
  PORTAL_CHAPTER_ADMIN: "/portal/chapter-admin",
  PORTAL_SPONSOR: "/portal/sponsor",
  
  // Admin
  ADMIN: "/admin",
  ADMIN_DIGITAL_BOARD: "/admin/digital-board",
  ADMIN_ENDORSEMENTS: "/admin/endorsements",
  ADMIN_CRS_PARTNERS: "/admin/crs-partners",
  ADMIN_VACANCIES: "/admin/vacancies",
  ADMIN_FINANCE_OVERVIEW: "/admin/finance/overview",
  ADMIN_BANK_ACCOUNTS: "/admin/finance/bank-accounts",
  ADMIN_DISBURSEMENTS: "/admin/finance/disbursements",
  
  // Resources
  ORGANIZATIONAL_PROFILE: "/resources/organizational-profile",
  CERTIFICATIONS: "/certifications",
  
  // Other
  VACANCIES: "/vacancies",
  UPDATES: "/updates",
  REPORTS: "/reports",
  CASE_STUDIES: "/case-studies",
  
  // Legal
  PRIVACY: "/privacy",
  TERMS: "/terms",
  ACCESSIBILITY: "/accessibility",
  HELP: "/help",
} as const;

// Type for route values
export type AppRoute = typeof ROUTES[keyof typeof ROUTES];

// Dynamic route helpers
export const dynamicRoutes = {
  category: (slug: string) => `/categories/${slug}` as const,
  messagesRoom: (roomId: string) => `/messages/${roomId}` as const,
  voteStage: (stage: 'gold' | 'blue-garnet') => `/vote?stage=${stage}` as const,
  governanceSection: (section: 'bot' | 'boa' | 'bod' | 'lcps' | 'management') => 
    `/governance#${section}` as const,
  localChaptersSection: (section: 'start') => `/local-chapters#${section}` as const,
  getInvolvedSection: (section: 'ambassador' | 'volunteer') => 
    `/get-involved#${section}` as const,
};

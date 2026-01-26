// ========================================
// SCEF Site Content Configuration
// Central config for all content - ready for CMS integration
// ========================================

export const siteContent = {
  // Utility Navigation Links (Top Strip)
  utilityLinks: [
    { name: "Board of Trustees", href: "/governance#bot" },
    { name: "Board of Advisors", href: "/governance#boa" },
    { name: "Board of Directors", href: "/governance#bod" },
    { name: "LCPs", href: "/governance#lcps" },
    { name: "Management Team", href: "/governance#management" },
  ],

  // Main Navigation
  navLinks: [
    { name: "About SCEF", href: "/about" },
    { 
      name: "Our Work", 
      href: "/programs",
      children: [
        { name: "All Programs", href: "/programs" },
        { name: "NESA-Africa 2025–2037", href: "/programs/nesa-africa" },
        { name: "EduAid-Africa", href: "/programs/eduaid-africa" },
        { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
        { name: "Women & Girls Education", href: "/programs/women-girls-education" },
        { name: "Special Needs Education", href: "/programs/special-needs-education" },
        { name: "Education Online Africa", href: "/programs/digital-learning" },
        { name: "eLibrary Nigeria", href: "/programs/elibrary-nigeria" },
      ]
    },
    { 
      name: "Local Chapters", 
      href: "/local-chapters",
      children: [
        { name: "Find a Chapter", href: "/local-chapters" },
        { name: "Start a Chapter", href: "/local-chapters#start" },
        { name: "Chapter Directory", href: "/chapters" },
      ]
    },
    { 
      name: "Get Involved", 
      href: "/get-involved",
      children: [
        { name: "Become a Member", href: "/membership" },
        { name: "Become an Ambassador", href: "/get-involved#ambassador" },
        { name: "Volunteer", href: "/get-involved#volunteer" },
        { name: "Partner with Us", href: "/partners" },
        { name: "Donate", href: "/donate" },
      ]
    },
    {
      name: "SCEF Media",
      href: "/media",
      children: [
        { name: "Media Hub", href: "/media" },
        { divider: true },
        { name: "NESA Africa TV", href: "/media/nesa-tv" },
        { name: "NESA Awards TV", href: "/media/nesa-awards-tv" },
        { divider: true },
        { name: "Platinum Recognition Show", href: "/media/nesa-awards-tv/platinum" },
        { name: "Africa Icon Blue Garnet Awards", href: "/media/nesa-awards-tv/africa-icon" },
        { name: "Gold Certificate Awards", href: "/media/nesa-awards-tv/gold-certificate" },
        { name: "Blue Garnet Gala", href: "/media/nesa-awards-tv/blue-garnet-gala" },
        { divider: true },
        { name: "It's In Me Radio", href: "/media/its-in-me-radio" },
        { name: "EduAid Webinars & Podcast", href: "/media/eduaid-webinars" },
        { name: "Education Tourism Show", href: "/media/education-tourism-show" },
      ]
    },
  ],

  // Homepage Configuration
  homepage: {
    hero: {
      headline: "Achieving Education for All in 57 African Countries – Driven by Membership, Diaspora Strength, CSR Partnerships, and Grassroots Empowerment",
      primaryCta: { text: "Join as a Member", href: "/membership" },
      secondaryCta: { text: "Become Ambassador", href: "/get-involved#ambassador" },
      bgImage: "/hero-education.jpg",
    },
    digitalBoard: {
      position: "center", // "center" | "right"
      rotationSeconds: 6,
    },
    programs: [
      {
        id: "nesa-africa",
        title: "New Education Standard Award Africa (NESA-Africa)",
        image: "/assets/nesa-africa-logo.jpg",
        video: "/videos/nesa-africa-promo.mp4",
        href: "/programs/nesa-africa",
        description: "Recognizing excellence in African education through prestigious awards.",
      },
      {
        id: "eduaid-africa",
        title: "Education Aid Africa (EduAid-Africa)",
        image: "/assets/eduaid-africa-logo.jpg",
        video: "/videos/eduaid-africa-promo.mp4",
        href: "/programs/eduaid-africa",
        description: "Scholarships, grants, and educational support for African students.",
      },
      {
        id: "rebuild-my-school",
        title: "Rebuild My School Africa (RMSA)",
        image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600",
        href: "/programs/rebuild-my-school-africa",
        description: "Infrastructure development and school rebuilding initiatives.",
      },
      {
        id: "elibrary-nigeria",
        title: "eLibrary Nigeria",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600",
        href: "/programs/elibrary-nigeria",
        description: "Digital library resources for Nigerian students and educators.",
      },
      {
        id: "education-online-africa",
        title: "Education Online Africa (EOA)",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600",
        href: "/programs/digital-learning",
        description: "Digital learning platforms bridging the education gap across Africa.",
      },
      {
        id: "women-girls-education",
        title: "Women & Girls Education",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
        href: "/programs/women-girls-education",
        description: "Empowering women and girls through quality education across Africa.",
      },
      {
        id: "special-needs-education",
        title: "Special Needs Education",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
        href: "/programs/special-needs-education",
        description: "Inclusive education for children with special needs across Africa.",
      },
    ],
  },

  // Footer Configuration
  footerLinks: {
    quickLinks: [
      { name: "About SCEF", href: "/about" },
      { name: "Programs", href: "/programs" },
      { name: "Local Chapters", href: "/local-chapters" },
      { name: "Get Involved", href: "/get-involved" },
      { name: "Governance", href: "/governance" },
    ],
    programs: [
      { name: "EduAid-Africa", href: "/programs/eduaid-africa" },
      { name: "NESA-Africa", href: "/programs/nesa-africa" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
      { name: "eLibrary Nigeria", href: "/programs/elibrary-nigeria" },
    ],
    support: [
      { name: "Donate", href: "/donate" },
      { name: "Partner With Us", href: "/partners" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/help" },
    ],
  },

  socialLinks: [
    { name: "Facebook", href: "https://facebook.com/scef", icon: "facebook" },
    { name: "Twitter", href: "https://twitter.com/scef", icon: "twitter" },
    { name: "LinkedIn", href: "https://linkedin.com/company/scef", icon: "linkedin" },
    { name: "YouTube", href: "https://youtube.com/@scef", icon: "youtube" },
  ],

  // Brand Information
  brand: {
    name: "Santos Creations",
    tagline: "Educational Foundation",
    fullName: "Santos Creations Educational Foundation",
    acronym: "SCEF",
    founded: "1997",
    registered: "2010",
  },

  // Membership Pricing
  membership: {
    tiers: [
      { name: "General", price: 0, currency: "USD", period: "", description: "Free, 18+, limited benefits" },
      { name: "Youth", price: 0, currency: "USD", period: "", description: "Free, 13–17 with parental consent" },
      { name: "Standard", price: 50, currency: "USD", period: "year", description: "Full access with voting rights" },
      { name: "Organizational", price: 200, currency: "USD", period: "year", description: "For institutions and organizations" },
      { name: "Lifetime", price: 1000, currency: "USD", period: "one-time", description: "Permanent commitment" },
    ],
  },

  // Ambassador Pricing
  ambassador: {
    tiers: [
      { name: "Ambassador-1", price: 100, currency: "USD", period: "year", commitment: "5 hours/month", requirements: "Standard/Lifetime membership" },
      { name: "Ambassador-2", price: 200, currency: "USD", period: "year", commitment: "10 hours/month", requirements: "Ambassador-1 experience" },
      { name: "Ambassador-3", price: 300, currency: "USD", period: "year", commitment: "15 hours/month", requirements: "Ambassador-2 experience" },
    ],
  },
};

export type SiteContent = typeof siteContent;

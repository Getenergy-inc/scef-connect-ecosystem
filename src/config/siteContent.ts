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

  // Main Navigation — 2026 refactor: About · Programs · Chapters · Media · Get Involved · Login
  navLinks: [
    {
      name: "About",
      href: "/about",
      children: [
        { name: "About SCEF", href: "/about", description: "Who we are & what we stand for" },
        { name: "Vision & Mission", href: "/about#vision", description: "Our long-term agenda" },
        { name: "Governance", href: "/governance", description: "Boards, councils & leadership" },
        { name: "Impact", href: "/reports", description: "Our results across Africa" },
      ],
    },
    {
      name: "Programs",
      href: "/programs",
      megaMenu: true,
      groups: [
        {
          title: "Education & Access",
          items: [
            { name: "EduAid-Africa", href: "/programs/eduaid-africa", description: "Scholarships, CSR funding & school support", icon: "GraduationCap" },
            { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa", description: "School renewal & infrastructure", icon: "School" },
            { name: "School WASH & Sanitation", href: "/programs/school-wash", description: "Toilets, hygiene, water & inclusion", icon: "Droplets" },
            { name: "NESA-Africa", href: "/programs/nesa-africa", description: "Continental education awards engine", icon: "Award" },
          ],
        },
        {
          title: "Digital & Inclusion",
          items: [
            { name: "Education Online Africa", href: "/programs/digital-learning", description: "Digital learning & certification", icon: "Laptop" },
            { name: "eLibrary Africa", href: "/programs/elibrary-nigeria", description: "Accessible knowledge hub", icon: "Library" },
            { name: "Women & Girls Education", href: "/programs/women-girls-education", description: "Empowerment through education", icon: "Heart" },
            { name: "Special Needs Education", href: "/programs/special-needs-education", description: "Inclusive advocacy for all learners", icon: "Accessibility" },
          ],
        },
        {
          title: "Training & Career",
          items: [
            { name: "Training & Development", href: "/programs/training-development", description: "Teacher & school capacity building", icon: "BookOpen" },
            { name: "My Career My Life", href: "/programs/my-career-my-life", description: "Career guidance for students", icon: "Compass" },
            { name: "All Programs", href: "/programs", description: "Browse the full programs hub", icon: "LayoutGrid" },
          ],
        },
      ],
    },
    {
      name: "Chapters",
      href: "/local-chapters",
      children: [
        { name: "Join a Chapter", href: "/chapters/join-online", description: "Engage in your region" },
        { name: "Start a Chapter", href: "/chapters/start", description: "Lead SCEF where you live" },
        { name: "Chapter Directory", href: "/chapters", description: "Discover the full network" },
      ],
    },
    {
      name: "Media",
      href: "/media",
      megaMenu: true,
      groups: [
        {
          title: "Video & Audio",
          items: [
            { name: "Media Hub", href: "/media", description: "All SCEF media in one place", icon: "LayoutGrid" },
            { name: "NESA TV", href: "/media/nesa-tv", description: "Stories shaping African education", icon: "Tv" },
            { name: "It's In Me Radio", href: "/media/its-in-me-radio", description: "Voices of African youth", icon: "Radio" },
            { name: "Webinars", href: "/media/eduaid-webinars", description: "Conversations with educators", icon: "Mic" },
          ],
        },
        {
          title: "Stories & Advocacy",
          items: [
            { name: "News & Stories", href: "/updates", description: "The latest from SCEF", icon: "Newspaper" },
            { name: "Advocacy Campaigns", href: "/case-studies", description: "Education for All in action", icon: "Megaphone" },
            { name: "Meet Our Contributors", href: "/contributors", description: "Volunteers, interns & ambassadors (2007 – Present)", icon: "Award" },
          ],
        },
      ],
    },
    {
      name: "Get Involved",
      href: "/get-involved",
      children: [
        { name: "Donate", href: "/donate", description: "Fund education across Africa" },
        { name: "Become a Volunteer", href: "/get-involved/volunteer", description: "Use your skills for education" },
        { name: "Meet Our Contributors", href: "/contributors", description: "2007 – Present" },
        { name: "Submit Your Story", href: "/contributors/submit", description: "Share your SCEF testimony" },
        { name: "Verify Certificate", href: "/verify-certificate", description: "Authenticate an SCEF badge code" },
        { name: "CSR & Partnerships", href: "/partner-with-us", description: "Institutional partnerships" },
      ],
    },
    {
      name: "Login",
      href: "/auth/sign-in",
      children: [
        { name: "Member Login", href: "/auth/sign-in", description: "Access your dashboard & wallet" },
        { name: "Staff Login", href: "/auth/sign-in?role=staff", description: "Internal operations & admin" },
      ],
    },
  ],

  // Homepage Configuration
  homepage: {
    hero: {
      headline: "Empowering Africa Through Education, Innovation, and Opportunity",
      subheadline: "SCEF is a membership-driven organization advancing education across regions through advocacy, digital access, and partnerships.",
      primaryCta: { text: "Explore Membership", href: "/membership" },
      secondaryCta: { text: "Support the Mission", href: "/donate" },
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

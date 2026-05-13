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

  // Main Navigation — Simplified (6 top-level items, mobile-first)
  navLinks: [
    {
      name: "About",
      href: "/about",
      children: [
        { name: "Who We Are", href: "/about", description: "Mission, identity & approach" },
        { name: "Vision 2037", href: "/about/vision-2037", description: "Our continental agenda to 2037" },
        { name: "History", href: "/about/history", description: "Our journey since 1997" },
        { name: "Governance", href: "/governance", description: "CVO, BOT, BOA, Organisational Secretary" },
        { name: "Impact & Reports", href: "/reports", description: "Verified outcomes across Africa" },
        { name: "Contact", href: "/contact", description: "Reach our team" },
      ],
    },
    {
      name: "Programs",
      href: "/programs",
      megaMenu: true,
      groups: [
        {
          title: "Flagship Programs",
          items: [
            { name: "EduAid-Africa", href: "/programs/eduaid-africa", description: "Scholarships, CSR funding & school support", icon: "GraduationCap" },
            { name: "New Education Standards Award Africa", href: "/programs/nesa-africa", description: "Continental education awards engine", icon: "Award" },
            { name: "Education Online Africa", href: "/programs/digital-learning", description: "Digital learning & certification", icon: "Laptop" },
            { name: "eLibrary Africa / Nigeria", href: "/programs/elibrary-nigeria", description: "Accessible knowledge hub", icon: "Library" },
          ],
        },
        {
          title: "Schools & Learners",
          items: [
            { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa", description: "School renewal & infrastructure", icon: "School" },
            { name: "Send a Child to School", href: "/programs/send-a-child-to-school", description: "Sponsor a learner's full year", icon: "Heart" },
            { name: "School WASH & Sanitation", href: "/programs/school-wash", description: "Toilets, hygiene & inclusion", icon: "Accessibility" },
            { name: "My Career, My Life", href: "/programs/my-career-my-life", description: "Career pathways for students", icon: "Star" },
          ],
        },
        {
          title: "All Programs",
          items: [
            { name: "Browse All Programs", href: "/programs", description: "Full programs hub", icon: "LayoutGrid" },
            { name: "Women & Girls Education", href: "/programs/women-girls-education", description: "Empowerment through education", icon: "Heart" },
            { name: "Special Needs Education", href: "/programs/special-needs-education", description: "Inclusive advocacy for all learners", icon: "Accessibility" },
          ],
        },
      ],
    },
    {
      name: "Get Involved",
      href: "/get-involved",
      megaMenu: true,
      groups: [
        {
          title: "Membership",
          items: [
            { name: "Become a Member", href: "/membership", description: "Tiers & benefits", icon: "Heart" },
            { name: "Ambassador Program", href: "/get-involved/ambassador", description: "Lead the movement", icon: "Crown" },
            { name: "Volunteer", href: "/get-involved/volunteer", description: "Use your skills", icon: "Heart" },
            { name: "Internships", href: "/get-involved/internships", description: "Learn while contributing", icon: "GraduationCap" },
          ],
        },
        {
          title: "Partner With Us",
          items: [
            { name: "CSR Partnerships", href: "/partner-with-us#csr", description: "Corporate social responsibility", icon: "LayoutGrid" },
            { name: "Sponsor a School", href: "/support-us#sponsor-school", description: "Adopt a school for a year", icon: "School" },
            { name: "Sponsor NESA-Africa", href: "/support-us#sponsor-nesa", description: "Awards, gala & nominations", icon: "Award" },
            { name: "Strategic Partnership", href: "/partner-with-us#strategic", description: "Multi-year partnership", icon: "Sparkles" },
          ],
        },
        {
          title: "Advocacy & Training",
          items: [
            { name: "Monthly Advocacy", href: "/advocacy/monthly", description: "Pan-African campaign weeks", icon: "Sparkles" },
            { name: "Webinars & Calendar", href: "/calendar", description: "July 2026 – June 2027", icon: "Mic" },
            { name: "Teacher Training", href: "/programs/training-development", description: "Classroom innovation", icon: "GraduationCap" },
            { name: "Advocacy Walks", href: "/advocacy/walks", description: "Community mobilisation", icon: "Heart" },
          ],
        },
      ],
    },
    {
      name: "Chapters",
      href: "/local-chapters",
      children: [
        { name: "About Local Chapters", href: "/local-chapters", description: "How chapters work" },
        { name: "Browse Chapters", href: "/chapters", description: "Country directory" },
        { name: "Start a Chapter", href: "/chapters/start", description: "Lead SCEF where you live" },
        { name: "Diaspora Chapters", href: "/chapters?type=diaspora", description: "Africans abroad" },
      ],
    },
    {
      name: "Media",
      href: "/media",
      children: [
        { name: "NESA TV", href: "/media/nesa-tv", description: "Stories shaping African education" },
        { name: "It's In Me Radio", href: "/media/its-in-me-radio", description: "Voices of African youth" },
        { name: "News & Press", href: "/updates", description: "Announcements & blog" },
        { name: "Events Calendar", href: "/calendar", description: "Webinars, walks & gala" },
        { name: "Gallery", href: "/media/gallery", description: "Photos & highlights" },
      ],
    },
    {
      name: "Support",
      href: "/support-us",
      megaMenu: true,
      groups: [
        {
          title: "Sponsor Programs",
          items: [
            { name: "Donate Now", href: "/donate", description: "General support", icon: "Heart" },
            { name: "Sponsor NESA-Africa", href: "/support-us#sponsor-nesa", description: "Awards & gala", icon: "Award" },
            { name: "Rebuild My School", href: "/support-us#rebuild-school", description: "Infrastructure", icon: "School" },
            { name: "Send a Child to School", href: "/support-us#send-child", description: "Sponsor a learner", icon: "GraduationCap" },
          ],
        },
        {
          title: "Other Ways to Give",
          items: [
            { name: "Buy Gala Ticket", href: "/support-us/gala-tickets", description: "Attend NESA gala", icon: "Crown" },
            { name: "Support eLibrary", href: "/support-us#support-elibrary", description: "Digital knowledge", icon: "Library" },
            { name: "Buy Merchandise", href: "/support-us/merchandise", description: "Branded SCEF gear", icon: "Sparkles" },
            { name: "All Support Options", href: "/support-us", description: "Full overview", icon: "LayoutGrid" },
          ],
        },
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

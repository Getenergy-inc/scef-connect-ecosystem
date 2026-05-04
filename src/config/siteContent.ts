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

  // Main Navigation — 2026 IA (6-part, premium, low cognitive load)
  navLinks: [
    {
      name: "About",
      href: "/about",
      children: [
        { name: "Overview", href: "/about", description: "Who we are & what we stand for" },
        { name: "Our History", href: "/about#history", description: "From 1997 to a Pan-African institution" },
        { name: "Vision 2035", href: "/about#vision", description: "Our long-term agenda" },
        { name: "Governance", href: "/governance", description: "Boards, councils & leadership" },
        { name: "Our Divisions", href: "/divisions", description: "Six operational divisions" },
        { name: "Our Work", href: "/programs", description: "How we deliver impact across Africa" },
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
            { name: "EduAid Africa", href: "/programs/eduaid-africa", description: "Advocacy-driven access to education", icon: "GraduationCap" },
            { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa", description: "Member-supported school renewal", icon: "School" },
            { name: "Women & Girls Education", href: "/programs/women-girls-education", description: "Empowering through education", icon: "Heart" },
            { name: "Special Needs Education", href: "/programs/special-needs-education", description: "Inclusive advocacy for all learners", icon: "Accessibility" },
          ],
        },
        {
          title: "Digital Learning",
          items: [
            { name: "Education Online Africa", href: "/programs/digital-learning", description: "Digital learning & certification", icon: "Laptop" },
            { name: "eLibrary Nigeria", href: "/programs/elibrary-nigeria", description: "Accessible knowledge hub", icon: "Library" },
          ],
        },
        {
          title: "Flagship Initiatives",
          items: [
            { name: "NESA-Africa", href: "/programs/nesa-africa", description: "Continental education awards engine", icon: "Award" },
            { name: "All Programs", href: "/programs", description: "Browse the full programs hub", icon: "LayoutGrid" },
          ],
        },
      ],
    },
    {
      name: "Awards",
      href: "/awards",
      megaMenu: true,
      groups: [
        {
          title: "Award Tiers",
          items: [
            { name: "Platinum Certificate", href: "/awards/platinum", description: "Lifetime contribution honour", icon: "Crown" },
            { name: "Africa Education Icon", href: "/awards/icon", description: "Continental icons of impact", icon: "Star" },
            { name: "Gold Certificate", href: "/awards/gold", description: "Excellence across categories", icon: "Medal" },
            { name: "Blue Garnet Award", href: "/awards/blue-garnet", description: "Flagship recognition", icon: "Sparkles" },
          ],
        },
        {
          title: "Explore",
          items: [
            { name: "Awards Hub", href: "/awards", description: "Full awards ecosystem overview", icon: "Award" },
            { name: "Categories (17)", href: "/categories", description: "Browse the category architecture", icon: "LayoutGrid" },
            { name: "NESA Calendar", href: "/calendar", description: "2026 cycle dates & milestones", icon: "Plane" },
          ],
        },
        {
          title: "Participate",
          items: [
            { name: "Nominate", href: "/nominate", description: "Submit a nomination", icon: "Heart" },
            { name: "Become a Judge", href: "/get-involved/judge", description: "Join the jury panel", icon: "Medal" },
            { name: "Apply to NRC", href: "/get-involved/nrc", description: "Nominee Review Committee", icon: "Star" },
          ],
        },
      ],
    },
    {
      name: "Chapters",
      href: "/local-chapters",
      children: [
        { name: "Browse Chapters", href: "/chapters", description: "Discover the full network" },
        { name: "Join a Chapter", href: "/chapters/join-online", description: "Engage in your region" },
        { name: "Start a Chapter", href: "/chapters/start", description: "Lead SCEF where you live" },
      ],
    },
    {
      name: "Media",
      href: "/media",
      megaMenu: true,
      groups: [
        {
          title: "Video Platforms",
          items: [
            { name: "Media Hub", href: "/media", description: "All SCEF media in one place", icon: "LayoutGrid" },
            { name: "NESA Africa TV", href: "/media/nesa-tv", description: "Stories shaping African education", icon: "Tv" },
            { name: "NESA Awards TV", href: "/media/nesa-awards-tv", description: "Awards broadcasts & highlights", icon: "Clapperboard" },
          ],
        },
        {
          title: "Signature Shows",
          items: [
            { name: "Platinum Recognition Show", href: "/media/nesa-awards-tv/platinum", description: "Honoring lifetime contribution", icon: "Crown" },
            { name: "Africa Icon Blue Garnet Awards", href: "/media/nesa-awards-tv/africa-icon", description: "Continental icons of impact", icon: "Star" },
            { name: "Gold Certificate Awards", href: "/media/nesa-awards-tv/gold-certificate", description: "Excellence across categories", icon: "Medal" },
            { name: "Blue Garnet Gala", href: "/media/nesa-awards-tv/blue-garnet-gala", description: "The flagship gala night", icon: "Sparkles" },
          ],
        },
        {
          title: "Audio & Learning Media",
          items: [
            { name: "It's In Me Radio", href: "/media/its-in-me-radio", description: "Voices of African youth", icon: "Radio" },
            { name: "EduAid Webinars & Podcast", href: "/media/eduaid-webinars", description: "Conversations with educators", icon: "Mic" },
            { name: "Education Tourism Show", href: "/media/education-tourism-show", description: "Learning across borders", icon: "Plane" },
            { name: "Hall of Fame & Appreciation Wall", href: "/hall-of-fame", description: "Honouring SCEF contributors since 2007", icon: "Award" },
          ],
        },
      ],
    },
    {
      name: "Get Involved",
      href: "/join",
      children: [
        { name: "Become a Member", href: "/membership", description: "Global participation" },
        { name: "Become an Ambassador", href: "/get-involved/ambassador", description: "Lead advocacy in your region" },
        { name: "Volunteer", href: "/get-involved#volunteer", description: "Contribute time & skills" },
        { name: "Partnership / CSR", href: "/partner-with-us", description: "Institutional partnerships" },
        { name: "Donate", href: "/donate", description: "Fund education across Africa" },
        { name: "Hall of Fame & Appreciation Wall", href: "/hall-of-fame", description: "Honouring contributors since 2007" },
        { name: "Submit Your Testimony", href: "/hall-of-fame/submit", description: "Share your SCEF story" },
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

// ========================================
// SCEF Site Content Configuration
// Central config for all content - ready for CMS integration
// ========================================

export const siteContent = {
  brand: {
    name: "Santos Creations",
    tagline: "Educational Foundation",
    fullName: "Santos Creations Educational Foundation",
    acronym: "SCEF",
    founded: "1997",
    registered: "2010",
  },

  utilityLinks: [
    { label: "Board of Trustees", href: "/governance/bot" },
    { label: "Board of Advisors", href: "/governance/boa" },
    { label: "Board of Directors", href: "/governance/bod" },
    { label: "LCPs", href: "/governance/lcps" },
    { label: "Management Team", href: "/governance/management" },
  ],

  navLinks: [
    { label: "About SCEF", href: "/about" },
    {
      label: "Our Work",
      dropdown: [
        { label: "New Education Standard Award Africa (NESA-Africa)", href: "/programs/nesa-africa" },
        { label: "Education Aid Africa (EduAid Africa)", href: "/programs/eduaid-africa" },
        { label: "Rebuild My School Africa (RMSA)", href: "/programs/rebuild-my-school-africa" },
        { label: "Women & Girls Education", href: "/programs/women-girls-education" },
        { label: "Special Needs Education Support", href: "/programs/special-needs" },
        { label: "Education Online Africa (Certification Services)", href: "/programs/education-online-africa" },
        { label: "eLibrary Nigeria", href: "/programs/elibrary-nigeria" },
        { label: "Programs Hub", href: "/programs", highlight: true },
      ],
    },
    {
      label: "Local Chapters",
      dropdown: [
        { label: "Browse Chapters", href: "/local-chapters" },
        { label: "Join a Chapter", href: "/local-chapters/join" },
        { label: "Create a Chapter", href: "/local-chapters/create" },
        { label: "Upgrade Chapter", href: "/local-chapters/upgrade" },
        { label: "Apply as Local Chapter President", href: "/local-chapters/leadership" },
      ],
    },
    {
      label: "Get Involved",
      dropdown: [
        { label: "Become a Member", href: "/membership/join" },
        { label: "Become an Ambassador", href: "/membership/ambassador" },
        { label: "Volunteer", href: "/volunteer/apply" },
        { label: "Apply for Scholarship", href: "/scholarships/apply" },
        { label: "Partner / CSR", href: "/partnerships/csr" },
        { label: "Donate", href: "/donate", highlight: true },
      ],
    },
    {
      label: "Santos Media",
      dropdown: [
        { label: "Media Hub", href: "/media" },
        { label: "NESA Africa TV", href: "/media/nesa-tv" },
        { label: "It's In Me Radio", href: "/media/its-in-me-radio" },
        { label: "EduAid Africa Webinar & Podcast", href: "/media/eduaid-webinars" },
        { label: "Education Tourism Show", href: "/media/education-tourism-show" },
      ],
    },
  ],

  hero: {
    headline: "Achieving Education for All in 57 African Countries",
    subtext: "Driven by Membership, Diaspora Strength, CSR Partnerships, and Grassroots Empowerment",
    primaryCta: { label: "Join as a Member", href: "/membership/join" },
    secondaryCta: { label: "Become Ambassador", href: "/membership/ambassador" },
  },

  engagementPaths: [
    { icon: "GraduationCap", label: "Learn & Get Certified", href: "/programs/education-online-africa" },
    { icon: "Users", label: "Join a Local Chapter", href: "/local-chapters/join" },
    { icon: "Heart", label: "Donate or Partner", href: "/donate" },
    { icon: "Globe", label: "Become an Ambassador", href: "/membership/ambassador" },
  ],

  impactStats: [
    { value: "5,000+", label: "Scholarships Supported" },
    { value: "85+", label: "Schools Rebuilt" },
    { value: "180K+", label: "Women & Girls Reached" },
    { value: "950+", label: "Special Needs Supported" },
    { value: "120+", label: "Active Chapters" },
    { value: "45+", label: "Partners & Donors" },
  ],

  programs: {
    core: [
      {
        title: "Education Aid Africa (EduAid Africa)",
        description: "Providing scholarships, learning materials, and educational support to underserved communities across Africa.",
        href: "/programs/eduaid-africa",
        icon: "BookOpen",
      },
      {
        title: "Rebuild My School Africa (RMSA)",
        description: "Renovating and constructing schools to create safe, inspiring learning environments for African children.",
        href: "/programs/rebuild-my-school-africa",
        icon: "Building",
      },
      {
        title: "New Education Standard Award Africa (NESA-Africa)",
        description: "Recognizing and celebrating excellence in education across the African continent.",
        href: "/programs/nesa-africa",
        icon: "Award",
      },
      {
        title: "Women & Girls Education",
        description: "Empowering women and girls through quality education, breaking barriers and building futures.",
        href: "/programs/women-girls-education",
        icon: "Heart",
      },
    ],
    digital: [
      {
        title: "Education Online Africa (Certification Services)",
        description: "Digital learning platform offering accredited courses and professional certifications.",
        href: "/programs/education-online-africa",
        icon: "Monitor",
      },
      {
        title: "Africa Workplace Productivity Certification",
        description: "Professional development programs enhancing workplace skills across African industries.",
        href: "/programs/education-online-africa",
        icon: "Briefcase",
      },
      {
        title: "Special Needs Education Support",
        description: "Inclusive education initiatives ensuring every child has access to quality learning.",
        href: "/programs/special-needs",
        icon: "Accessibility",
      },
      {
        title: "eLibrary Nigeria",
        description: "Digital library resources making knowledge accessible to learners nationwide.",
        href: "/programs/elibrary-nigeria",
        icon: "Library",
      },
    ],
  },

  media: [
    {
      title: "NESA Africa TV",
      description: "Watch inspiring stories of educational excellence across Africa",
      href: "/media/nesa-tv",
      icon: "Tv",
      cta: "Watch Now",
    },
    {
      title: "It's In Me Radio",
      description: "Listen to voices shaping Africa's educational future",
      href: "/media/its-in-me-radio",
      icon: "Radio",
      cta: "Listen Now",
    },
    {
      title: "EduAid Africa Webinar & Podcast",
      description: "Join expert discussions on education transformation",
      href: "/media/eduaid-webinars",
      icon: "Podcast",
      cta: "Join Webinar",
    },
    {
      title: "Education Tourism Show",
      description: "Explore educational destinations and experiences",
      href: "/media/education-tourism-show",
      icon: "Plane",
      cta: "Explore",
    },
  ],

  divisions: [
    {
      title: "Board Governance & Executive Office",
      shortTitle: "BOT + CVO Office",
      description: "Strategic oversight and executive leadership driving SCEF's vision across Africa.",
      href: "/divisions/governance-executive",
    },
    {
      title: "Strategic Operations & Business Compliance Division",
      shortTitle: "SOBCD",
      description: "Ensuring operational excellence, compliance, and sustainable business practices.",
      href: "/divisions/sobcd",
    },
    {
      title: "Technology & Digital Services Division",
      shortTitle: "TDSD",
      description: "Powering digital transformation in African education through innovative technology.",
      href: "/divisions/tdsd",
    },
    {
      title: "Online Media Business Development Division",
      shortTitle: "OMBDD",
      description: "Expanding SCEF's digital presence and media partnerships across the continent.",
      href: "/divisions/ombdd",
    },
    {
      title: "Santos Media & Local Chapter Services Division",
      shortTitle: "SM + LCS",
      description: "Coordinating grassroots chapters and media advocacy for education.",
      href: "/divisions/sm-lcs",
    },
  ],

  digitalBoard: {
    rotationSeconds: 8,
    items: [
      {
        id: "1",
        title: "NESA Africa Awards 2026",
        summary: "Nominations now open for the New Education Standard Award Africa",
        mediaType: "announcement",
        ctaLabel: "Submit Nomination",
        ctaHref: "/programs/nesa-africa",
        priority: 1,
      },
      {
        id: "2",
        title: "Join Our Ambassador Program",
        summary: "Become a voice for education transformation in your community",
        mediaType: "announcement",
        ctaLabel: "Apply Now",
        ctaHref: "/membership/ambassador",
        priority: 2,
      },
      {
        id: "3",
        title: "Education Online Africa Launch",
        summary: "New certification courses now available for African professionals",
        mediaType: "announcement",
        ctaLabel: "Explore Courses",
        ctaHref: "/programs/education-online-africa",
        priority: 3,
      },
    ],
  },

  footer: {
    programs: [
      { label: "EduAid Africa", href: "/programs/eduaid-africa" },
      { label: "RMSA", href: "/programs/rebuild-my-school-africa" },
      { label: "NESA-Africa", href: "/programs/nesa-africa" },
      { label: "Education Online Africa", href: "/programs/education-online-africa" },
    ],
    chapters: [
      { label: "Find a Chapter", href: "/local-chapters" },
      { label: "Join a Chapter", href: "/local-chapters/join" },
      { label: "Create a Chapter", href: "/local-chapters/create" },
    ],
    getInvolved: [
      { label: "Become a Member", href: "/membership/join" },
      { label: "Volunteer", href: "/volunteer/apply" },
      { label: "Partner with Us", href: "/partnerships/csr" },
      { label: "Donate", href: "/donate" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },

  socialLinks: [
    { platform: "Facebook", href: "https://facebook.com/scef" },
    { platform: "Twitter", href: "https://twitter.com/scef" },
    { platform: "LinkedIn", href: "https://linkedin.com/company/scef" },
    { platform: "Instagram", href: "https://instagram.com/scef" },
    { platform: "YouTube", href: "https://youtube.com/scef" },
  ],
};

export type SiteContent = typeof siteContent;

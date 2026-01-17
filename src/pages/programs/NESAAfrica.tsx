import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, Trophy, Star, Users, Calendar, 
  ArrowRight, CheckCircle, Vote, Medal, Sparkles,
  Play, ExternalLink, Globe, Crown, Gem,
  BookOpen, Target, Building2, Heart, Radio,
  GraduationCap, School, Accessibility
} from "lucide-react";
import { ProgramVideoSection } from "@/components/programs/ProgramVideoSection";
import { EventCountdown } from "@/components/ui/event-countdown";

// Key Event Dates for Countdowns
const countdownEvents = [
  {
    name: "Platinum Recognition Show",
    date: new Date("2026-02-28T18:00:00"),
    type: "show" as const,
  },
  {
    name: "Blue Garnet Awards Gala",
    date: new Date("2026-06-27T18:00:00"),
    type: "gala" as const,
  },
  {
    name: "Rebuild My School Africa Launch",
    date: new Date("2026-06-28T09:00:00"),
    type: "legacy" as const,
  },
];
// NESA-Africa Brand Colors matching nesa.africa
const nesaColors = {
  dark: "#1A1A1A",
  darkAlt: "#0D0D0D",
  gold: "#C4A052",
  goldLight: "#D4B46A",
  goldDark: "#A38642",
  text: "#FFFFFF",
  textMuted: "#9CA3AF",
};

// Programme Overview Pillars
const programmePillars = [
  {
    title: "Public Education & Awareness",
    platform: "EduAid-Africa Webinar Series",
    icon: Radio,
    desc: "Stakeholder education on challenges, standards, and informed participation",
  },
  {
    title: "Recognition & Standards",
    platform: "NESA-Africa Awards Cycle",
    icon: Award,
    desc: "Standards-based continental education recognition and accountability",
  },
  {
    title: "Legacy Impact",
    platform: "Rebuild My School Africa",
    icon: School,
    desc: "Post-award infrastructure projects for inclusive education",
  },
];

// Updated 2025 Programme Timeline
const programmeTimeline = [
  { 
    phase: "EduAid-Africa Webinars", 
    date: "14 Oct 2025 – Jun 2026", 
    desc: "Public education series on SDG 4, CSR, STEM, inclusion, and NESA standards",
    type: "awareness",
    active: true 
  },
  { 
    phase: "Platinum Recognition Show", 
    date: "28 February 2026", 
    desc: "3-hour TV Show — Non-competitive baseline recognition of service",
    type: "recognition",
    active: false 
  },
  { 
    phase: "Africa Education Icon Show", 
    date: "28 March 2026", 
    desc: "3-hour TV Show — Lifetime impact recognition (9 Icons, 2005–2025)",
    type: "recognition",
    active: false 
  },
  { 
    phase: "Icon Nominations Close", 
    date: "30 April 2026", 
    desc: "Final deadline for Africa Education Icon nominations",
    type: "deadline",
    active: false 
  },
  { 
    phase: "Gold Public Voting", 
    date: "10 Apr – 16 May 2026", 
    desc: "Mass participation voting across 125 sub-categories",
    type: "voting",
    active: false 
  },
  { 
    phase: "Gold Certificate Winners Show", 
    date: "17 May 2026", 
    desc: "3-hour TV Show — 125 Gold winners announced",
    type: "recognition",
    active: false 
  },
  { 
    phase: "Blue Garnet Voting", 
    date: "18 May – 17 Jun 2026", 
    desc: "40% public vote + 60% independent jury review",
    type: "voting",
    active: false 
  },
  { 
    phase: "Blue Garnet Awards Gala", 
    date: "27 June 2026", 
    desc: "Grand ceremony in Lagos + live broadcast — 9 Blue Garnet winners",
    type: "gala",
    active: false 
  },
  { 
    phase: "Rebuild My School Africa", 
    date: "Jun 2026 – Jun 2027", 
    desc: "Legacy phase: 5 Special Needs facilities across Africa's regions",
    type: "legacy",
    active: false 
  },
];

// Award Phases with detailed info
const awardPhases = [
  {
    title: "Platinum Certificate",
    subtitle: "Baseline Recognition of Service",
    period: "February – June 2026",
    showDate: "28 February 2026",
    icon: Medal,
    features: [
      "Non-competitive entry layer",
      "Verification by NESA Nominee Research Corps (NRC)",
      "Governance & safeguarding checks",
      "Certificate validity: 1 year",
      "Global QR-code authentication",
    ],
    color: "#E5E4E2",
  },
  {
    title: "Africa Education Icon",
    subtitle: "Lifetime Impact Recognition",
    period: "March – April 2026",
    showDate: "28 March 2026",
    icon: Crown,
    features: [
      "Honours 9 Icons only",
      "Documented impact 2005–2025",
      "African regions + diaspora + Friends of Africa",
      "Non-competitive lifetime recognition",
      "Independent verification",
    ],
    color: nesaColors.gold,
  },
  {
    title: "Gold Certificate",
    subtitle: "Competitive Classification Stage",
    period: "10 April – 16 May 2026",
    showDate: "17 May 2026",
    icon: Trophy,
    features: [
      "9 Award Categories",
      "125 Sub-Categories",
      "1 Gold Winner per Sub-Category",
      "Public voting only — no judges",
      "Transparent digital audit trail",
    ],
    color: "#FFD700",
  },
  {
    title: "Blue Garnet Award",
    subtitle: "Highest Competitive Honour",
    period: "18 May – 17 June 2026",
    showDate: "27 June 2026 (Gala)",
    icon: Gem,
    features: [
      "From 125 Gold Certificate winners",
      "9 Blue Garnet Award winners",
      "40% Public Voting + 60% Jury Review",
      "Elite continental honour",
      "Blue Garnet stone in certificate & plaque",
    ],
    color: "#1E3A5F",
  },
];

// Webinar Themes
const webinarThemes = [
  { theme: "Education for All & SDG 4", icon: GraduationCap },
  { theme: "CSR & Private Sector Education Impact", icon: Building2 },
  { theme: "NGOs & Community-Driven Education", icon: Heart },
  { theme: "STEM & Innovation", icon: Target },
  { theme: "Creative Arts & Education", icon: Sparkles },
  { theme: "Inclusion, Disability & Special Needs", icon: Accessibility },
];

// Legacy Regions
const legacyRegions = [
  "North Africa",
  "West Africa", 
  "East Africa",
  "Central Africa",
  "Southern Africa",
];

const awardCategories = [
  { 
    name: "Africa Icon Blue Garnet Award", 
    desc: "Lifetime Achievement (10+ years of institutional impact)",
    type: "lifetime",
    link: "https://nesa.africa/nomination/sub-categories/africa-lifetime-education-icon"
  },
  { 
    name: "Blue Garnet & Gold Certificate Awards", 
    desc: "Public voting + expert judging across 125 subcategories",
    type: "competitive",
    link: "https://nesa.africa/competitive"
  },
  { 
    name: "Platinum Certificate of Recognition", 
    desc: "Merit-based recognition through expert panel evaluation",
    type: "non-competitive",
    link: "https://nesa.africa/non-competitive"
  },
  { 
    name: "Outstanding Student Award", 
    desc: "Recognizing academic excellence and leadership",
    type: "competitive",
    link: "https://nesa.africa/competitive"
  },
  { 
    name: "Teacher of Excellence", 
    desc: "Honoring educators making exceptional impact",
    type: "competitive",
    link: "https://nesa.africa/competitive"
  },
  { 
    name: "Innovation in Education", 
    desc: "Rewarding creative teaching approaches",
    type: "competitive",
    link: "https://nesa.africa/competitive"
  },
];

const nominationPaths = [
  {
    title: "Lifetime Achievement",
    badge: "Africa Icon Blue Garnet Award",
    period: "2005–2025",
    desc: "Reserved for lifetime achievement. Nominees must have 10+ years institutional achievements.",
    features: ["Institutional Achievements", "Long-term Impact", "Legacy Recognition"],
    link: "https://nesa.africa/nomination/sub-categories/africa-lifetime-education-icon",
    icon: Crown,
  },
  {
    title: "Public Voting",
    badge: "Blue Garnet & Gold Certificate Awards",
    period: "Annual Competition",
    desc: "Open competition with public participation through AGC voting and expert judging.",
    features: ["Public Voting", "Expert Judging", "125 Subcategories"],
    link: "https://nesa.africa/competitive",
    icon: Vote,
  },
  {
    title: "Expert Selection",
    badge: "Platinum Certificate of Recognition",
    period: "Merit-Based",
    desc: "Merit-based recognition through expert panel evaluation and institutional review.",
    features: ["No Voting", "Internal Judging", "Global Nomination"],
    link: "https://nesa.africa/non-competitive",
    icon: Gem,
  },
];

const NESAAfrica = () => {
  return (
    <>
      <Helmet>
        <title>NESA-Africa 2025 | Project & Programmes Layout - SCEF</title>
        <meta 
          name="description" 
          content="NESA-Africa 2025: A standards-based continental education recognition programme. EduAid Webinars (Oct 2025), Awards Cycle (Feb–Jun 2026), Legacy Phase (Jun 2026–2027)." 
        />
        <meta property="og:title" content="NESA-Africa 2025 | Project & Programmes Layout" />
        <meta property="og:description" content="Standards-led education accountability cycle: Education → Recognition → Public Participation → Legacy Impact" />
        <meta property="og:image" content="https://nesa.africa/images/headhero.png" />
        <link rel="canonical" href="https://santoscreations.org/programs/nesa-africa" />
      </Helmet>
      
      <div className="min-h-screen" style={{ backgroundColor: nesaColors.dark }}>
        <Header />
        
        <main>
          {/* Hero Section - Dark theme matching nesa.africa */}
          <section className="relative pt-32 pb-24 overflow-hidden" style={{ backgroundColor: nesaColors.darkAlt }}>
            {/* Decorative gold accents */}
            <div className="absolute inset-0">
              <div 
                className="absolute top-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: nesaColors.gold }}
              />
              <div 
                className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10"
                style={{ backgroundColor: nesaColors.gold }}
              />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                {/* Badge */}
                <div 
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-8 border"
                  style={{ 
                    backgroundColor: `${nesaColors.gold}20`,
                    borderColor: nesaColors.gold,
                    color: nesaColors.gold
                  }}
                >
                  <Award className="w-5 h-5" />
                  <span>NESA-Africa 2025 — Nominations Open Now</span>
                </div>
                
                {/* Main Heading */}
                <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4">
                  Honoring Africa's{" "}
                  <span style={{ color: nesaColors.gold }}>Changemakers</span>
                </h1>
                
                <p className="text-xl md:text-2xl font-medium mb-6" style={{ color: nesaColors.gold }}>
                  Building the Future of Education
                </p>
                
                <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto" style={{ color: nesaColors.textMuted }}>
                  At the New Education Standard Award Africa (NESA–Africa) 2025, we celebrate the real 
                  changemakers shaping the future of education across Africa. A pan-African celebration 
                  of educational transformation, social impact, and legacy.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <a href="https://nesa.africa" target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="lg" 
                      className="text-lg px-8 py-6 font-bold border-2"
                      style={{ 
                        backgroundColor: nesaColors.gold,
                        borderColor: nesaColors.goldDark,
                        color: nesaColors.dark
                      }}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Read More About NESA
                    </Button>
                  </a>
                  <a href="https://nesa.africa/competitive" target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="lg" 
                      className="text-lg px-8 py-6 font-bold"
                      style={{ 
                        backgroundColor: 'transparent',
                        border: `2px solid ${nesaColors.gold}`,
                        color: nesaColors.gold
                      }}
                    >
                      <Trophy className="w-5 h-5 mr-2" />
                      Nominate Now
                    </Button>
                  </a>
                </div>

                {/* Quick Action Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  {[
                    { label: "Refer", icon: Users, link: "https://nesa.africa" },
                    { label: "Nominate", icon: Trophy, link: "https://nesa.africa/competitive" },
                    { label: "Tickets", icon: Calendar, link: "https://nesa.africa" },
                    { label: "Watch", icon: Play, link: "https://nesa.africa/nesatv" },
                  ].map((item) => (
                    <a 
                      key={item.label}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border transition-all hover:scale-105"
                      style={{ 
                        borderColor: `${nesaColors.gold}40`,
                        backgroundColor: `${nesaColors.gold}10`
                      }}
                    >
                      <item.icon className="w-5 h-5" style={{ color: nesaColors.gold }} />
                      <span className="text-sm font-medium text-white">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Stats Banner */}
          <section 
            className="py-6 border-y"
            style={{ 
              backgroundColor: nesaColors.dark,
              borderColor: `${nesaColors.gold}30`
            }}
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center gap-8 flex-wrap text-center">
                <p className="font-bold" style={{ color: nesaColors.gold }}>
                  Blue Garnet Awards Gala • 27 June 2026 • Lagos, Nigeria
                </p>
                <span style={{ color: nesaColors.textMuted }}>|</span>
                <p style={{ color: nesaColors.textMuted }}>
                  EduAid Webinars Begin: 14 October 2025
                </p>
              </div>
            </div>
          </section>

          {/* Event Countdowns Section */}
          <section className="py-16" style={{ backgroundColor: nesaColors.darkAlt }}>
            <div className="container mx-auto px-4">
              <div className="text-center mb-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                  Upcoming <span style={{ color: nesaColors.gold }}>Key Events</span>
                </h2>
                <p style={{ color: nesaColors.textMuted }} className="max-w-xl mx-auto">
                  Live countdown to NESA-Africa's major milestones
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {countdownEvents.map((event) => (
                  <EventCountdown
                    key={event.name}
                    targetDate={event.date}
                    eventName={event.name}
                    eventType={event.type}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Nomination Paths - Three Cards */}
          <section className="py-20" style={{ backgroundColor: nesaColors.dark }}>
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Choose Your <span style={{ color: nesaColors.gold }}>Nomination Path</span>
                </h2>
                <p style={{ color: nesaColors.textMuted }} className="max-w-2xl mx-auto">
                  Select the appropriate award category based on the nominee's achievements and recognition type.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {nominationPaths.map((path) => (
                  <a
                    key={path.title}
                    href={path.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-2xl border transition-all hover:-translate-y-2 hover:shadow-2xl"
                    style={{ 
                      backgroundColor: `${nesaColors.gold}08`,
                      borderColor: `${nesaColors.gold}30`
                    }}
                  >
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${nesaColors.gold}20` }}
                    >
                      <path.icon className="w-7 h-7" style={{ color: nesaColors.gold }} />
                    </div>
                    <p className="text-sm font-medium mb-2" style={{ color: nesaColors.gold }}>{path.title}</p>
                    <h3 className="font-display text-xl font-bold text-white mb-2">{path.badge}</h3>
                    <p className="text-sm mb-4" style={{ color: nesaColors.textMuted }}>{path.period}</p>
                    <p className="text-sm mb-6" style={{ color: nesaColors.textMuted }}>{path.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {path.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-white">
                          <CheckCircle className="w-4 h-4" style={{ color: nesaColors.gold }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div 
                      className="flex items-center gap-2 font-semibold group-hover:gap-3 transition-all"
                      style={{ color: nesaColors.gold }}
                    >
                      Nominate Now
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section 
            className="py-16 border-y"
            style={{ 
              backgroundColor: nesaColors.darkAlt,
              borderColor: `${nesaColors.gold}20`
            }}
          >
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {[
                  { value: "15+", label: "Years Running" },
                  { value: "54", label: "African Countries" },
                  { value: "10,000+", label: "Nominees" },
                  { value: "1,000+", label: "Awardees" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-display text-3xl md:text-4xl font-bold" style={{ color: nesaColors.gold }}>
                      {stat.value}
                    </p>
                    <p style={{ color: nesaColors.textMuted }} className="text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Programme Overview Section */}
          <section className="py-20" style={{ backgroundColor: nesaColors.dark }}>
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                  style={{ backgroundColor: `${nesaColors.gold}20`, color: nesaColors.gold }}
                >
                  <BookOpen className="w-4 h-4" />
                  October 2025 – June 2027
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Programme <span style={{ color: nesaColors.gold }}>Overview</span>
                </h2>
                <p style={{ color: nesaColors.textMuted }} className="max-w-3xl mx-auto text-lg">
                  NESA-Africa 2025 is a standards-based continental education recognition and accountability 
                  programme designed to document verified education service, engage the public through 
                  structured participation, and leave a post-award legacy through inclusive education infrastructure.
                </p>
              </div>

              {/* Three Pillars */}
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {programmePillars.map((pillar) => (
                  <div 
                    key={pillar.title}
                    className="p-6 rounded-2xl border text-center"
                    style={{ 
                      backgroundColor: `${nesaColors.gold}08`,
                      borderColor: `${nesaColors.gold}30`
                    }}
                  >
                    <div 
                      className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${nesaColors.gold}20` }}
                    >
                      <pillar.icon className="w-8 h-8" style={{ color: nesaColors.gold }} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-white mb-2">{pillar.title}</h3>
                    <p className="text-sm font-medium mb-3" style={{ color: nesaColors.gold }}>{pillar.platform}</p>
                    <p className="text-sm" style={{ color: nesaColors.textMuted }}>{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EduAid Webinar Series Section */}
          <section className="py-20" style={{ backgroundColor: nesaColors.darkAlt }}>
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                    style={{ backgroundColor: `${nesaColors.gold}20`, color: nesaColors.gold }}
                  >
                    <Radio className="w-4 h-4" />
                    Phase 1 — Public Education & Awareness
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                    EduAid-Africa <span style={{ color: nesaColors.gold }}>Webinar Series</span>
                  </h2>
                  <p style={{ color: nesaColors.gold }} className="text-lg font-medium mb-4">
                    📅 14 October 2025 – June 2026
                  </p>
                  <p style={{ color: nesaColors.textMuted }} className="max-w-2xl mx-auto">
                    The official public education and engagement framework for NESA-Africa — educating 
                    stakeholders on education challenges, NESA standards, and preparing the public for 
                    nominations and voting.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {webinarThemes.map((item) => (
                    <div 
                      key={item.theme}
                      className="flex items-center gap-3 p-4 rounded-xl border"
                      style={{ 
                        backgroundColor: nesaColors.dark,
                        borderColor: `${nesaColors.gold}20`
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${nesaColors.gold}20` }}
                      >
                        <item.icon className="w-5 h-5" style={{ color: nesaColors.gold }} />
                      </div>
                      <p className="text-sm font-medium text-white">{item.theme}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl border text-center" style={{ borderColor: `${nesaColors.gold}30` }}>
                  <p style={{ color: nesaColors.textMuted }}>
                    <strong style={{ color: nesaColors.gold }}>Frequency:</strong> 2–4 webinars monthly • 
                    Pan-African speakers & practitioners • Recorded and archived for public access
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Award Phases Section */}
          <section className="py-20" style={{ backgroundColor: nesaColors.dark }}>
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Award <span style={{ color: nesaColors.gold }}>Phases</span>
                </h2>
                <p style={{ color: nesaColors.textMuted }} className="max-w-2xl mx-auto">
                  Four structured phases from baseline recognition to the highest continental honour.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {awardPhases.map((phase, index) => (
                  <div 
                    key={phase.title}
                    className="p-6 rounded-2xl border"
                    style={{ 
                      backgroundColor: nesaColors.darkAlt,
                      borderColor: `${nesaColors.gold}40`
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${phase.color}30` }}
                      >
                        <phase.icon className="w-7 h-7" style={{ color: phase.color }} />
                      </div>
                      <div>
                        <span 
                          className="text-xs font-bold px-2 py-1 rounded"
                          style={{ backgroundColor: `${nesaColors.gold}20`, color: nesaColors.gold }}
                        >
                          Phase {index + 2}
                        </span>
                        <h3 className="font-display text-xl font-bold text-white mt-2">{phase.title}</h3>
                        <p className="text-sm" style={{ color: nesaColors.gold }}>{phase.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: `${nesaColors.gold}10` }}>
                      <p className="text-sm" style={{ color: nesaColors.textMuted }}>
                        <strong style={{ color: nesaColors.gold }}>Period:</strong> {phase.period}
                      </p>
                      <p className="text-sm" style={{ color: nesaColors.textMuted }}>
                        <strong style={{ color: nesaColors.gold }}>📺 Show:</strong> {phase.showDate}
                      </p>
                    </div>

                    <ul className="space-y-2">
                      {phase.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-white">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: nesaColors.gold }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Full Programme Timeline */}
          <section className="py-20" style={{ backgroundColor: nesaColors.darkAlt }}>
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Programme <span style={{ color: nesaColors.gold }}>Timeline</span>
                </h2>
                <p style={{ color: nesaColors.textMuted }} className="max-w-2xl mx-auto">
                  Complete schedule from public education phase through legacy implementation.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="space-y-4">
                  {programmeTimeline.map((item, index) => (
                    <div 
                      key={item.phase}
                      className="flex flex-col md:flex-row md:items-center gap-4 p-5 rounded-2xl border transition-all"
                      style={{ 
                        backgroundColor: item.active ? `${nesaColors.gold}15` : nesaColors.dark,
                        borderColor: item.active ? nesaColors.gold : `${nesaColors.gold}20`
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold"
                        style={{ 
                          backgroundColor: item.active ? nesaColors.gold : `${nesaColors.gold}20`,
                          color: item.active ? nesaColors.dark : nesaColors.gold
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <h3 className="font-display font-bold text-white">{item.phase}</h3>
                          <span 
                            className="text-sm font-medium px-3 py-1 rounded-full w-fit"
                            style={{ backgroundColor: `${nesaColors.gold}20`, color: nesaColors.gold }}
                          >
                            {item.date}
                          </span>
                        </div>
                        <p className="text-sm mt-1" style={{ color: nesaColors.textMuted }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Legacy Phase - Rebuild My School Africa */}
          <section className="py-20" style={{ backgroundColor: nesaColors.dark }}>
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                    style={{ backgroundColor: `${nesaColors.gold}20`, color: nesaColors.gold }}
                  >
                    <School className="w-4 h-4" />
                    Post-Award Legacy Phase
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                    Rebuild My School <span style={{ color: nesaColors.gold }}>Africa</span>
                  </h2>
                  <p style={{ color: nesaColors.gold }} className="text-lg font-medium mb-4">
                    📅 June 2026 – June 2027 • Implemented via EduAid-Africa
                  </p>
                  <p style={{ color: nesaColors.textMuted }} className="max-w-2xl mx-auto">
                    Translate recognition into direct, measurable education impact by rebuilding or 
                    renovating one Special Needs Education facility in each African region.
                  </p>
                </div>

                <div className="grid md:grid-cols-5 gap-4 mb-8">
                  {legacyRegions.map((region) => (
                    <div 
                      key={region}
                      className="p-4 rounded-xl border text-center"
                      style={{ 
                        backgroundColor: `${nesaColors.gold}10`,
                        borderColor: `${nesaColors.gold}30`
                      }}
                    >
                      <Accessibility className="w-6 h-6 mx-auto mb-2" style={{ color: nesaColors.gold }} />
                      <p className="text-sm font-medium text-white">{region}</p>
                    </div>
                  ))}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    "Inclusive classrooms",
                    "Accessibility & assistive facilities",
                    "Learning resources for children with disabilities"
                  ].map((focus) => (
                    <div 
                      key={focus}
                      className="flex items-center gap-3 p-4 rounded-xl"
                      style={{ backgroundColor: nesaColors.darkAlt }}
                    >
                      <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: nesaColors.gold }} />
                      <p className="text-sm text-white">{focus}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-2xl border text-center" style={{ borderColor: `${nesaColors.gold}30` }}>
                  <p className="font-medium text-white mb-2">Funding Channels</p>
                  <p className="text-sm" style={{ color: nesaColors.textMuted }}>
                    Ticket contributions • EduAid-Africa donations • CSR & partner contributions • Post-award campaigns
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Positioning Statement */}
          <section 
            className="py-16 border-y"
            style={{ 
              backgroundColor: nesaColors.darkAlt,
              borderColor: `${nesaColors.gold}20`
            }}
          >
            <div className="container mx-auto px-4 text-center">
              <blockquote className="max-w-3xl mx-auto">
                <p className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                  "NESA-Africa 2025 is not an event. It is a{" "}
                  <span style={{ color: nesaColors.gold }}>standards-led education accountability cycle</span>{" "}
                  that connects:"
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-lg" style={{ color: nesaColors.gold }}>
                  <span>Education</span>
                  <ArrowRight className="w-5 h-5" />
                  <span>Recognition</span>
                  <ArrowRight className="w-5 h-5" />
                  <span>Public Participation</span>
                  <ArrowRight className="w-5 h-5" />
                  <span>Legacy Impact</span>
                </div>
                <p className="mt-6 text-sm" style={{ color: nesaColors.textMuted }}>
                  Delivered with governance, transparency, and continental relevance.
                </p>
              </blockquote>
            </div>
          </section>

          {/* Award Categories */}
          <section className="py-20" style={{ backgroundColor: nesaColors.darkAlt }}>
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Award <span style={{ color: nesaColors.gold }}>Categories</span>
                </h2>
                <p style={{ color: nesaColors.textMuted }} className="max-w-2xl mx-auto">
                  Multiple award tracks recognizing excellence at every level of education across Africa.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {awardCategories.map((category) => (
                  <a 
                    key={category.name}
                    href={category.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-6 rounded-2xl border transition-all hover:border-opacity-100"
                    style={{ 
                      backgroundColor: nesaColors.dark,
                      borderColor: `${nesaColors.gold}30`
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${nesaColors.gold}20` }}
                    >
                      <Sparkles className="w-6 h-6" style={{ color: nesaColors.gold }} />
                    </div>
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                      style={{ 
                        backgroundColor: `${nesaColors.gold}20`,
                        color: nesaColors.gold
                      }}
                    >
                      {category.type === 'lifetime' ? 'Lifetime' : category.type === 'competitive' ? 'Competitive' : 'Non-Competitive'}
                    </div>
                    <h3 className="font-display font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-sm" style={{ color: nesaColors.textMuted }}>{category.desc}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Video Section */}
          <ProgramVideoSection
            programName="NESA-Africa"
            videoUrl="https://www.youtube.com/embed/nQCXDX_X3rs"
            videoType="youtube"
            description="Watch the vision behind NESA Africa, past award highlights, and exclusive interviews with African educators shaping the future of education."
            thumbnailUrl="/assets/nesa-africa-logo.jpg"
          />

          {/* CTA Section */}
          <section className="py-20" style={{ backgroundColor: nesaColors.darkAlt }}>
            <div className="container mx-auto px-4 text-center">
              <div 
                className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6"
                style={{ backgroundColor: `${nesaColors.gold}20` }}
              >
                <Trophy className="w-10 h-10" style={{ color: nesaColors.gold }} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Nominate a Champion of <span style={{ color: nesaColors.gold }}>Education</span>
              </h2>
              <p className="max-w-xl mx-auto mb-8" style={{ color: nesaColors.textMuted }}>
                Know someone making an exceptional impact in African education? 
                Submit your nomination today on nesa.africa
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://nesa.africa/competitive" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    className="font-bold px-8"
                    style={{ 
                      backgroundColor: nesaColors.gold,
                      color: nesaColors.dark
                    }}
                  >
                    <Award className="w-5 h-5 mr-2" />
                    Submit Nomination
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="https://nesa.africa" target="_blank" rel="noopener noreferrer">
                  <Button 
                    size="lg" 
                    className="font-bold px-8"
                    style={{ 
                      backgroundColor: 'transparent',
                      border: `2px solid ${nesaColors.gold}`,
                      color: nesaColors.gold
                    }}
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Visit NESA Africa
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NESAAfrica;

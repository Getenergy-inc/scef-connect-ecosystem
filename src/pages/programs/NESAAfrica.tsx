import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, Trophy, Star, Users, Calendar, 
  ArrowRight, CheckCircle, Vote, Medal, Sparkles,
  Play, ExternalLink, Globe, Crown, Gem
} from "lucide-react";
import { ProgramVideoSection } from "@/components/programs/ProgramVideoSection";

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

const awardCategories = [
  { 
    name: "Africa Icon Blue Garnet Award", 
    desc: "Lifetime Achievement (10+ years of institutional impact)",
    type: "lifetime",
    link: "https://nesa.africa/nomination/sub-categories/africa-lifetime-education-icon"
  },
  { 
    name: "Blue Garnet & Gold Certificate Awards", 
    desc: "Public voting + expert judging across 101 subcategories",
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

const timeline = [
  { phase: "Nominations Open", date: "Open Now", desc: "Submit nominations for all categories", active: true },
  { phase: "Public Voting Begins", date: "June 2025", desc: "AGC voting and public participation", active: false },
  { phase: "Judging Process", date: "July - August 2025", desc: "Expert panel evaluation", active: false },
  { phase: "Award Gala Ceremony", date: "10 September 2025", desc: "Grand celebration and recognition", active: false },
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
    features: ["Public Voting", "Expert Judging", "101 Subcategories"],
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
        <title>NESA-Africa 2025 | New Education Standard Award Africa - SCEF</title>
        <meta 
          name="description" 
          content="NESA-Africa 2025 celebrates educational transformation across Africa. Nominate changemakers shaping the future of education. Awards Gala: 10 September 2025." 
        />
        <meta property="og:title" content="NESA-Africa 2025 | Honoring Africa's Changemakers" />
        <meta property="og:description" content="Pan-African celebration of educational transformation, social impact, and legacy. Nominate a Hero Today." />
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
                  NESA Africa Awards Gala • 10 September 2025
                </p>
                <span style={{ color: nesaColors.textMuted }}>|</span>
                <p style={{ color: nesaColors.textMuted }}>
                  The NESA Africa 2025 Awards Have Begun!
                </p>
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

          {/* Timeline Section */}
          <section className="py-20" style={{ backgroundColor: nesaColors.dark }}>
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Awards <span style={{ color: nesaColors.gold }}>Timeline</span>
                </h2>
                <p style={{ color: nesaColors.textMuted }} className="max-w-2xl mx-auto">
                  Follow the journey from nomination to the grand celebration.
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-4 gap-6">
                  {timeline.map((item, index) => (
                    <div key={item.phase} className="relative">
                      {index < timeline.length - 1 && (
                        <div 
                          className="hidden md:block absolute top-8 left-full w-full h-0.5"
                          style={{ backgroundColor: `${nesaColors.gold}30` }}
                        />
                      )}
                      <div 
                        className="rounded-2xl p-6 h-full border"
                        style={{ 
                          backgroundColor: item.active ? `${nesaColors.gold}15` : nesaColors.darkAlt,
                          borderColor: item.active ? nesaColors.gold : `${nesaColors.gold}20`
                        }}
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center mb-4 font-bold text-lg"
                          style={{ 
                            backgroundColor: item.active ? nesaColors.gold : `${nesaColors.gold}20`,
                            color: item.active ? nesaColors.dark : nesaColors.gold
                          }}
                        >
                          {index + 1}
                        </div>
                        <p 
                          className="text-sm font-medium mb-2"
                          style={{ color: nesaColors.gold }}
                        >
                          {item.date}
                        </p>
                        <h3 className="font-display font-bold text-white mb-2">{item.phase}</h3>
                        <p className="text-sm" style={{ color: nesaColors.textMuted }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

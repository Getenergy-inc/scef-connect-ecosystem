import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { useEffect, useState } from "react";
import { 
  Target, Eye, Heart, Users, Award, Globe, ArrowRight, 
  Shield, Building2, Tv, Laptop, TrendingUp, CheckCircle2,
  GraduationCap, Handshake, BookOpen, School, Wrench,
  Accessibility, ChevronDown, ChevronUp, Download, BarChart3,
  Radio, Play, FileText, MapPin, Clock, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import aboutHeroImage from "@/assets/about-scef-hero.jpg";

// Image Generation Prompt (for hero):
// "Create a premium, realistic website hero banner for a Pan-African education NGO. 
// Scene: a modern TVET classroom/workshop in Africa with diverse students practicing 
// hands-on technical skills and an inclusive learning area where a special needs learner 
// is engaged confidently using assistive learning technology beside peers. 
// Mood: hopeful, professional, dignified, non-stereotyped. Lighting: bright natural light, 
// clean environment. Style: ultra-realistic, 4K, corporate documentary feel. 
// Composition: wide banner with negative space on the left for headline text. 
// Include subtle black/gold/emerald accents and faint African geometric patterns. 
// No visible logos, no text in image."

const divisionIcons = {
  bgeo: Shield,
  sobcd: Building2,
  tdsd: Laptop,
  ombdd: TrendingUp,
  santosMedia: Tv,
  lcs: Globe,
};

const divisionLinks = {
  bgeo: "/governance",
  sobcd: "/divisions/sobcd",
  tdsd: "/divisions/tdsd",
  ombdd: "/divisions/ombdd",
  santosMedia: "/divisions/santos-media",
  lcs: "/divisions/lcs",
};

const quickNavItems = [
  { id: "who-we-are", label: "Who We Are" },
  { id: "why-we-exist", label: "Why We Exist" },
  { id: "what-we-do", label: "What We Do" },
  { id: "tvet-inclusion", label: "TVET & Inclusion" },
  { id: "objectives", label: "Objectives" },
  { id: "divisions", label: "How We Work" },
  { id: "impact", label: "Impact" },
  { id: "sustainability", label: "Sustainability" },
  { id: "get-involved", label: "Get Involved" },
  { id: "faqs", label: "FAQs" },
];

const About = () => {
  const { t, isRTL } = useLocale();
  const [activeSection, setActiveSection] = useState("who-we-are");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Account for sticky nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = quickNavItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(quickNavItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const programs = [
    { key: "nesa", icon: Award, href: "/programs/nesa-africa" },
    { key: "eduaid", icon: GraduationCap, href: "/programs/eduaid-africa" },
    { key: "rmsa", icon: School, href: "/programs/rebuild-my-school-africa" },
    { key: "eoa", icon: Laptop, href: "/programs/digital-learning" },
    { key: "womenGirls", icon: Heart, href: "/programs/women-girls-education" },
    { key: "specialNeeds", icon: Accessibility, href: "/programs/special-needs-education" },
    { key: "elibrary", icon: BookOpen, href: "/programs/elibrary-nigeria" },
  ];

  const divisionKeys = ["bgeo", "sobcd", "tdsd", "ombdd", "santosMedia", "lcs"];

  const faqs = [
    {
      q: "What does SCEF do differently?",
      a: "Governance + chapters + digital platforms + media advocacy—integrated into one accountable system. We don't just fund projects; we build sustainable education ecosystems with measurable outcomes."
    },
    {
      q: "Can I support TVET or special needs education directly?",
      a: "Yes. Choose a program and donate/partner to a specific track (TVET lab support or inclusive learning support). 100% of designated funds go to your chosen initiative with transparent reporting."
    },
    {
      q: "Do you work across countries?",
      a: "Yes—through structured local chapters and diaspora engagement. We operate in 54+ African countries and diaspora communities, each with local leadership aligned to SCEF governance standards."
    },
    {
      q: "How do partners track impact?",
      a: "Through detailed reports, digital updates via our Digital Board, and program dashboards. CSR partners receive quarterly impact statements and annual audited reports."
    },
  ];

  const impactStats = [
    { label: "Countries/Regions", value: "54+", icon: MapPin },
    { label: "Active Chapters", value: "120+", icon: Globe },
    { label: "Learners Supported", value: "50K+", icon: GraduationCap },
    { label: "Schools Supported", value: "200+", icon: School },
    { label: "Scholarships", value: "5K+", icon: Award },
    { label: "Media Reach", value: "1M+", icon: Play },
  ];

  return (
    <>
      <Helmet>
        <title>About Santos Creations Educational Foundation (SCEF)</title>
        <meta 
          name="description" 
          content="Santos Creations Educational Foundation (SCEF) is a membership-driven Pan-African education foundation advancing Education for All through governance, local chapters, digital learning, TVET workforce readiness, inclusive education, and transparent partnerships across Africa and the diaspora." 
        />
        <meta name="keywords" content="SCEF, Pan-African education, TVET, inclusive education, education governance, local chapters, Africa education, SDG 4, AU Agenda 2063" />
        <link rel="canonical" href="https://scef.org/about" />
      </Helmet>
      
      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />
        
        <main>
          {/* SECTION 1: Hero with Dual Image Layout */}
          <section id="top" className="relative bg-scef-blue overflow-hidden">
            {/* Hero Image Grid */}
            <div className="grid lg:grid-cols-2">
              {/* Left: Hero Content */}
              <div className="relative py-24 lg:py-32 px-6 lg:px-12 flex flex-col justify-center bg-gradient-to-br from-scef-blue via-scef-blue to-scef-blue-darker">
                <div className="absolute inset-0 bg-gradient-to-r from-scef-blue/0 to-scef-blue/80 lg:hidden" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-scef-gold/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 max-w-xl">
                  {/* Region Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-gold text-sm font-semibold mb-6 border border-scef-gold/30">
                    <Globe className="w-4 h-4" />
                    Regional Africa • Diaspora Africa
                  </div>
                  
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    About Santos Creations Educational Foundation (SCEF)
                  </h1>
                  
                  <p className="text-lg md:text-xl text-white/85 leading-relaxed mb-6">
                    Building a continuous, ever-growing standard of education in Africa.
                  </p>
                  
                  <p className="text-base text-white/70 leading-relaxed mb-8">
                    SCEF is a membership-driven Pan-African education foundation advancing Education for All through governance, local chapters, digital learning, TVET workforce readiness, inclusive education, and transparent partnerships.
                  </p>

                  {/* Primary CTAs */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-bold shadow-lg" asChild>
                      <Link to="/membership">
                        Join SCEF
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm font-semibold" asChild>
                      <Link to="/partners">
                        Partner With Us
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-scef-gold/60 text-scef-gold hover:bg-scef-gold/10 backdrop-blur-sm font-semibold" asChild>
                      <Link to="/donate">
                        <Heart className="w-4 h-4" />
                        Donate
                      </Link>
                    </Button>
                  </div>

                  {/* Trust Line */}
                  <div className="pt-6 border-t border-white/20">
                    <p className="text-xs text-white/50 flex flex-wrap gap-x-3 gap-y-1">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Founded 1997</span>
                      <span>•</span>
                      <span>Registered 2010</span>
                      <span>•</span>
                      <span>SDG 4 + AU Agenda 2063</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right: Hero Image */}
              <div className="relative hidden lg:block">
                <img 
                  src={aboutHeroImage}
                  alt="Inclusive TVET classroom with learners building practical skills and a special needs learner using assistive learning technology."
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-scef-blue/40" />
              </div>
            </div>
            
            {/* Mobile Hero Image */}
            <div className="lg:hidden relative h-64">
              <img 
                src={aboutHeroImage}
                alt="Inclusive TVET classroom with learners building practical skills and a special needs learner using assistive learning technology."
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scef-blue/80 to-transparent" />
            </div>
          </section>
          
          {/* Mission Snapshot Cards */}
          <section className="py-12 bg-background border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card rounded-2xl p-6 border-2 border-scef-gold/20 hover:border-scef-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-scef-gold" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">Standards & Recognition</h3>
                  <p className="text-sm text-muted-foreground mb-3">NESA-Africa</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" /> Recognition awards for educators</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" /> Quality benchmarking programs</li>
                  </ul>
                </div>
                
                <div className="bg-card rounded-2xl p-6 border-2 border-scef-blue/20 hover:border-scef-blue/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-scef-blue/10 flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-scef-blue" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">Scholarships & Funding</h3>
                  <p className="text-sm text-muted-foreground mb-3">EduAid-Africa</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-blue shrink-0 mt-0.5" /> Learner sponsorship pathways</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-blue shrink-0 mt-0.5" /> CSR partnership programs</li>
                  </ul>
                </div>
                
                <div className="bg-card rounded-2xl p-6 border-2 border-scef-gold/20 hover:border-scef-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center mb-4">
                    <Accessibility className="w-6 h-6 text-scef-gold" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">Inclusion & Access</h3>
                  <p className="text-sm text-muted-foreground mb-3">Women & Girls + Special Needs</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" /> Assistive learning support</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" /> Girls education advocacy</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: Quick Navigation (Sticky) */}
          <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
            <div className="container mx-auto px-4">
              <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
                {quickNavItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all",
                      activeSection === item.id
                        ? "bg-scef-blue text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* SECTION 3: Who We Are */}
          <section id="who-we-are" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-6">
                  <Target className="w-4 h-4" />
                  Who We Are
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  A Structured Education Impact Ecosystem
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Santos Creations Educational Foundation (SCEF) is a structured education impact ecosystem—built to help education systems improve, scale, and stay accountable. We connect local chapters, partners, digital platforms, and media advocacy to deliver measurable outcomes in:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {[
                    "School support & infrastructure",
                    "Scholarships & learner support",
                    "TVET and workforce readiness",
                    "Special needs education support",
                    "Women & girls education",
                    "Education quality recognition (NESA-Africa)",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-scef-gold mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light">
                    <Link to="/programs">
                      Explore Our Programs
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/local-chapters">
                      Join a Chapter
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/donate">
                      Donate Now
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: Why We Exist */}
          <section id="why-we-exist" className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why We Exist
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Across Africa, learning is still limited by:
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    "Unsafe or under-equipped school environments",
                    "Poor access to skills training and TVET labs",
                    "Gaps in inclusion for learners with disabilities",
                    "Funding constraints and low accountability",
                    "Limited pathways from learning to decent work",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-destructive/5 rounded-xl border border-destructive/10">
                      <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                        <span className="text-destructive text-sm font-bold">{i + 1}</span>
                      </div>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-scef-blue/5 rounded-2xl p-8 border border-scef-blue/10">
                  <p className="text-lg text-foreground leading-relaxed">
                    <strong className="text-scef-blue">SCEF exists to change that</strong>—by building a governance-backed, chapter-driven delivery model that makes education transformation measurable, inclusive, and scalable.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: What We Do (Programs) */}
          <section id="what-we-do" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  What We Do
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Featured Programs designed to work together on access, quality, inclusion, skills, and recognition.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {programs.map((program) => {
                  const Icon = program.icon;
                  return (
                    <Link
                      key={program.key}
                      to={program.href}
                      className="group bg-card rounded-2xl p-6 border border-border hover:border-scef-gold hover:shadow-lg transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center mb-4 group-hover:bg-scef-gold/20 transition-colors">
                        <Icon className="w-6 h-6 text-scef-gold" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                        {t(`about.programs.cards.${program.key}`).split(' — ')[0]}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`about.programs.cards.${program.key}`).split(' — ')[1] || t(`about.programs.cards.${program.key}`)}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-scef-blue group-hover:text-scef-gold transition-colors">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-scef-blue text-white hover:bg-scef-blue-dark">
                  <Link to="/get-involved">Apply / Participate</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/partners">Partner / Sponsor</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/donate">Donate to a Program</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* SECTION 6: TVET + Special Needs Spotlight */}
          <section id="tvet-inclusion" className="py-20 bg-scef-blue-darker text-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6">
                    <Wrench className="w-4 h-4" />
                    Spotlight
                  </div>
                  
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                    TVET, Skills, and Inclusive Education: Practical Learning for Every Learner
                  </h2>
                  
                  <p className="text-lg text-white/80 leading-relaxed mb-6">
                    We believe education must prepare learners for life—through skills, confidence, and opportunity, not only certificates. SCEF supports TVET-aligned pathways and inclusive learning environments that empower:
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Learners building real-world skills (technical, digital, vocational)",
                      "Students in special needs settings accessing supportive tools",
                      "Communities creating practical learning hubs linked to local opportunity",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-scef-gold mt-0.5 shrink-0" />
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-white/10 rounded-xl p-6 mb-8">
                    <h3 className="font-semibold text-white mb-4">What this looks like:</h3>
                    <ul className="space-y-2 text-sm text-white/80">
                      <li><strong className="text-scef-gold">TVET support:</strong> starter equipment, training linkages, digital skills certification pathways</li>
                      <li><strong className="text-scef-gold">Inclusive access:</strong> advocacy for learning aids, accessible content, inclusive teacher support</li>
                      <li><strong className="text-scef-gold">Outcomes focus:</strong> employability skills, entrepreneurship readiness, community value creation</li>
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-semibold" asChild>
                      <Link to="/donate">Support a TVET Lab / Inclusive Classroom</Link>
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                      <Link to="/partners">Partner as CSR Skills Sponsor</Link>
                    </Button>
                  </div>
                </div>

                {/* TVET + Inclusion Image - uses the bottom half of the hero image */}
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                    <img 
                      src={aboutHeroImage}
                      alt="TVET workshop learners practicing hands-on skills alongside an inclusive classroom supporting a special needs learner."
                      className="w-full h-full object-cover object-bottom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-scef-gold/20 rounded-full blur-2xl" />
                  
                  {/* Floating stats */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                      <p className="text-2xl font-bold text-scef-blue">54+</p>
                      <p className="text-xs text-muted-foreground">Countries</p>
                    </div>
                    <div className="bg-scef-gold/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                      <p className="text-2xl font-bold text-scef-blue">5K+</p>
                      <p className="text-xs text-scef-blue/80">Learners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: 6 Core Objectives - Updated with SMART measures */}
          <section id="objectives" className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our 6 Core Objectives
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Each objective includes SMART-style targets with clear deliverables and timelines.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
                {[
                  {
                    title: "To build the SCEF platform for advocating a continuous, ever-growing standard of education in Africa.",
                    shortTitle: "Standards Platform",
                    measures: ["Publish Africa-wide Standards & Governance Framework v1 by Q4 2026", "Pilot adoption across all 5 African regions by 2030"]
                  },
                  {
                    title: "To strengthen layered governance and accountability for Education-for-All delivery across Africa and the diaspora.",
                    shortTitle: "Governance & Accountability",
                    measures: ["Implement governance workflows (BoT/BoA/BoD) by Q2 2026", "Publish annual governance & performance reports starting 2026"]
                  },
                  {
                    title: "To deploy digital platforms that expand access, learning, verification, and certification at scale.",
                    shortTitle: "Digital Platforms",
                    measures: ["Launch unified platforms (web/app, dashboards, certification) by Q4 2026", "Improve completion/verification rates annually through 2035"]
                  },
                  {
                    title: "To build and monitor a chapter-driven implementation network across the 5 African regions, supported by diaspora (6th region).",
                    shortTitle: "Chapter Network",
                    measures: ["Standardize chapter onboarding + compliance by Q2 2026", "Activate chapters across all 5 regions + 10 diaspora chapters by 2030"]
                  },
                  {
                    title: "To mobilize, manage, and report education funding transparently—especially through CSR for Education Funds Management Services (SCEF–FMS).",
                    shortTitle: "Funding & CSR Management",
                    measures: ["Operate verified project pipeline + ESG/SDG reporting by Q2 2026", "Grow 10-year renewable partnerships through 2035"]
                  },
                  {
                    title: "To deliver measurable, inclusive impact through integrated programs aligned with SDG 4, AU Agenda 2063, sustainability, ESG, and Africa development finance priorities.",
                    shortTitle: "Measurable Impact",
                    measures: ["By 2035: 100,000+ scholarships, 1,000 schools rebuilt", "By 2035: 4M learners reached, 54 chapters, $50m mobilized"]
                  },
                ].map((objective, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-scef-gold hover:shadow-md transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-scef-blue flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-scef-gold uppercase tracking-wide">{objective.shortTitle}</span>
                        <p className="text-foreground leading-relaxed mt-1">{objective.title}</p>
                      </div>
                    </div>
                    <div className="pl-14 space-y-2">
                      {objective.measures.map((measure, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" />
                          <span>{measure}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light">
                  <Link to="/governance">
                    <Shield className="w-4 h-4" />
                    Visit Governance Hub
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/divisions">
                    View Our Divisions
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* SECTION 8: How SCEF Works (Divisions) */}
          <section id="divisions" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  How SCEF Works (Six Divisions)
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our operational structure ensures coordinated delivery of programs, governance, and stakeholder engagement.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
                {divisionKeys.map((divKey) => {
                  const Icon = divisionIcons[divKey as keyof typeof divisionIcons];
                  const link = divisionLinks[divKey as keyof typeof divisionLinks];
                  return (
                    <Link 
                      key={divKey} 
                      to={link}
                      className="bg-card rounded-2xl p-6 border border-border hover:border-scef-gold hover:shadow-lg transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-scef-blue/10 flex items-center justify-center group-hover:bg-scef-gold/10 transition-colors">
                          <Icon className="w-5 h-5 text-scef-blue group-hover:text-scef-gold transition-colors" />
                        </div>
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-scef-gold text-scef-blue">
                          {t(`divisions.items.${divKey}.code`)}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                        {t(`divisions.items.${divKey}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>{t(`divisions.items.${divKey}.lead`)}</strong>
                      </p>
                      <p className="text-sm text-muted-foreground">{t(`divisions.items.${divKey}.mandate`)}</p>
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-scef-blue text-white hover:bg-scef-blue-dark">
                  <Link to="/local-chapters">Join a Local Chapter</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/get-involved">Volunteer / Intern</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* SECTION 9: Impact & Accountability */}
          <section id="impact" className="py-20 bg-scef-blue text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Impact & Accountability
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Measurable outcomes and transparent reporting for all stakeholders.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                {impactStats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
                      <Icon className="w-8 h-8 text-scef-gold mx-auto mb-3" />
                      <div className="text-3xl font-display font-bold text-white mb-1">{stat.value}</div>
                      <p className="text-sm text-white/60">{stat.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-semibold" asChild>
                  <Link to="/reports">
                    <Download className="w-4 h-4" />
                    Download Organizational Profile
                  </Link>
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/case-studies">
                    <FileText className="w-4 h-4" />
                    View Reports & Case Studies
                  </Link>
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/updates">
                    <BarChart3 className="w-4 h-4" />
                    See Real-Time Updates
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* SECTION 10: Sustainability & Alignment */}
          <section id="sustainability" className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Sustainability & Alignment
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  SCEF aligns programs with SDG 4 and broader SDG outcomes, and supports Africa-wide scalability through AU Agenda 2063. Our approach prioritizes:
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {[
                    { label: "Inclusion", desc: "Girls and learners with disabilities" },
                    { label: "Local ownership", desc: "Chapter delivery" },
                    { label: "Transparent reporting", desc: "Partner-ready" },
                    { label: "Measurable outcomes", desc: "Evidence-based learning support" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-card rounded-xl border border-border">
                      <Sparkles className="w-5 h-5 text-scef-gold mt-0.5 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground">{item.label}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light">
                    <Link to="/partners">CSR Partnership</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/donate">Sponsor a Program</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 11: Get Involved */}
          <section id="get-involved" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Get Involved
                </h2>
                <p className="text-lg text-muted-foreground">
                  Choose your pathway to make an impact.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-10">
                {[
                  { icon: Users, title: "Join as Member", desc: "Become part of the movement", href: "/membership", color: "scef-blue" },
                  { icon: Award, title: "Become Ambassador", desc: "Represent SCEF, mobilize support", href: "/membership", color: "scef-gold" },
                  { icon: Handshake, title: "Partner/CSR", desc: "Fund measurable projects", href: "/partners", color: "scef-blue" },
                  { icon: Heart, title: "Donate", desc: "Support a learner or school", href: "/donate", color: "scef-gold" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={i}
                      to={item.href}
                      className="group bg-card rounded-2xl p-6 border border-border hover:border-scef-gold hover:shadow-lg transition-all text-center"
                    >
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors",
                        item.color === "scef-gold" ? "bg-scef-gold/10 group-hover:bg-scef-gold/20" : "bg-scef-blue/10 group-hover:bg-scef-blue/20"
                      )}>
                        <Icon className={cn(
                          "w-8 h-8",
                          item.color === "scef-gold" ? "text-scef-gold" : "text-scef-blue"
                        )} />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </Link>
                  );
                })}
              </div>

              <p className="text-center text-muted-foreground">
                You can start small—membership, a one-time donation, or joining your local chapter.
              </p>
            </div>
          </section>

          {/* SECTION 12: FAQs */}
          <section id="faqs" className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
                  FAQs
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-card rounded-xl border border-border overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                      >
                        <h3 className="font-semibold text-foreground pr-4">{faq.q}</h3>
                        {expandedFaq === i ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                        )}
                      </button>
                      {expandedFaq === i && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 13: Final CTA */}
          <section id="final-cta" className="py-20 bg-scef-blue-darker text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Be part of Africa's education transformation.
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                Join the movement to make education accessible, inclusive, and impactful across the continent.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-bold" asChild>
                  <Link to="/membership">
                    <Users className="w-5 h-5" />
                    Join
                  </Link>
                </Button>
                <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20" asChild>
                  <Link to="/donate">
                    <Heart className="w-5 h-5" />
                    Donate
                  </Link>
                </Button>
                <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20" asChild>
                  <Link to="/partners">
                    <Handshake className="w-5 h-5" />
                    Partner
                  </Link>
                </Button>
                <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20" asChild>
                  <Link to="/media">
                    <Play className="w-5 h-5" />
                    Watch SCEF Media
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;
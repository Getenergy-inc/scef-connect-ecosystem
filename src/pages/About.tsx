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
          {/* SECTION 1: Hero */}
          <section id="top" className="relative pt-32 pb-24 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-[url('/images/about/about-hero-tvet-inclusive.jpg')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-scef-gold/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-scef-blue-light/30 rounded-full blur-2xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 border border-white/20 backdrop-blur-sm">
                  <Building2 className="w-4 h-4" />
                  About SCEF
                </div>
                
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  About Santos Creations Educational Foundation (SCEF)
                </h1>
                
                <p className="text-xl md:text-2xl text-white/85 leading-relaxed mb-8 max-w-3xl">
                  SCEF is a membership-driven Pan-African education foundation advancing Education for All through governance, local chapters, digital learning, TVET workforce readiness, inclusive education, and transparent partnerships—across Africa and the diaspora.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-bold" asChild>
                    <Link to="/membership">
                      <Users className="w-5 h-5" />
                      Join as a Member
                    </Link>
                  </Button>
                  <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm font-semibold" asChild>
                    <Link to="/donate">
                      <Heart className="w-5 h-5" />
                      Donate to Support
                    </Link>
                  </Button>
                </div>

                {/* Secondary Actions */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
                  <Link to="/membership" className="hover:text-scef-gold transition-colors flex items-center gap-1">
                    <ArrowRight className="w-4 h-4" /> Become an Ambassador
                  </Link>
                  <Link to="/partners" className="hover:text-scef-gold transition-colors flex items-center gap-1">
                    <ArrowRight className="w-4 h-4" /> Partner with Us (CSR)
                  </Link>
                  <Link to="/local-chapters" className="hover:text-scef-gold transition-colors flex items-center gap-1">
                    <ArrowRight className="w-4 h-4" /> Join a Local Chapter
                  </Link>
                  <Link to="/media" className="hover:text-scef-gold transition-colors flex items-center gap-1">
                    <ArrowRight className="w-4 h-4" /> Watch SCEF Media
                  </Link>
                </div>

                {/* Trust Line */}
                <div className="mt-10 pt-6 border-t border-white/20">
                  <p className="text-sm text-white/60 flex flex-wrap gap-x-4 gap-y-1">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Founded 1997</span>
                    <span>•</span>
                    <span>Registered 2010</span>
                    <span>•</span>
                    <span>SDG 4 + AU Agenda 2063 aligned</span>
                    <span>•</span>
                    <span>HQ-led governance + chapter-driven delivery</span>
                  </p>
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

                {/* Image placeholder for TVET + Inclusion */}
                <div className="relative">
                  {/* Image Generation Prompt for spotlight:
                  "TVET workshop learners practicing hands-on skills alongside an inclusive classroom 
                  supporting a special needs learner. Split composition showing both environments." */}
                  <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-scef-blue to-scef-blue-darker overflow-hidden border border-white/10">
                    <img 
                      src="/images/about/tvet-inclusive-spotlight.jpg" 
                      alt="TVET workshop learners practicing hands-on skills alongside an inclusive classroom supporting a special needs learner."
                      className="w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                        const placeholder = document.createElement('div');
                        placeholder.className = 'text-center p-8';
                        placeholder.innerHTML = '<div class="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center"><svg class="w-12 h-12 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div><p class="text-white/60 text-sm">TVET & Inclusive Education</p>';
                        e.currentTarget.parentElement!.appendChild(placeholder);
                      }}
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-scef-gold/20 rounded-full blur-2xl" />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: 6 Core Objectives */}
          <section id="objectives" className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our 6 Core Objectives
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
                {[
                  "Establish layered governance for education delivery.",
                  "Deploy digital platforms for access and certification.",
                  "Develop media for knowledge dissemination.",
                  "Onboard and monitor local chapters for compliance.",
                  "Secure funding and partnerships with accountability.",
                  "Align operations with UN SDGs and AU Agenda 2063 for scalability.",
                ].map((objective, index) => (
                  <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-6 border border-border hover:border-scef-gold hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-full bg-scef-blue flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-foreground leading-relaxed">{objective}</p>
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
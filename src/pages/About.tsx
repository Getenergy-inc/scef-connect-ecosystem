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
  Radio, Play, FileText, MapPin, Clock, Sparkles, Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { CRSPartnersSection } from "@/components/sections/CRSPartnersSection";
import aboutHeroImage from "@/assets/about-scef-hero.jpg";

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

const About = () => {
  const { t, isRTL } = useLocale();
  const [activeSection, setActiveSection] = useState("who-we-are");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [heroExpanded, setHeroExpanded] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const quickNavItems = [
    { id: "who-we-are", label: t("about.quickNav.whoWeAre") },
    { id: "why-we-exist", label: t("about.quickNav.whyWeExist") },
    { id: "what-we-do", label: t("about.quickNav.whatWeDo") },
    { id: "tvet-inclusion", label: t("about.quickNav.tvetInclusion") },
    { id: "objectives", label: t("about.quickNav.objectives") },
    { id: "divisions", label: t("about.quickNav.howWeWork") },
    { id: "impact", label: t("about.quickNav.impact") },
    { id: "sustainability", label: t("about.quickNav.sustainability") },
    { id: "get-involved", label: t("about.quickNav.getInvolved") },
    { id: "faqs", label: t("about.quickNav.faqs") },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMobileNavOpen(false);
  };

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
  }, [quickNavItems]);

  const programs = [
    { key: "nesa", title: t("about.programs.cards.nesa"), desc: t("about.whatWeDo.programs.nesa.desc"), icon: Award, href: "/programs/nesa-africa" },
    { key: "eduaid", title: t("about.programs.cards.eduaid"), desc: t("about.whatWeDo.programs.eduaid.desc"), icon: GraduationCap, href: "/programs/eduaid-africa" },
    { key: "rmsa", title: t("about.programs.cards.rmsa"), desc: t("about.whatWeDo.programs.rmsa.desc"), icon: School, href: "/programs/rebuild-my-school-africa" },
    { key: "eoa", title: t("about.programs.cards.eoa"), desc: t("about.whatWeDo.programs.eoa.desc"), icon: Laptop, href: "/programs/digital-learning" },
    { key: "womenGirls", title: t("about.programs.cards.womenGirls"), desc: t("about.whatWeDo.programs.womenGirls.desc"), icon: Heart, href: "/programs/women-girls-education" },
    { key: "specialNeeds", title: t("about.programs.cards.specialNeeds"), desc: t("about.whatWeDo.programs.specialNeeds.desc"), icon: Accessibility, href: "/programs/special-needs-education" },
    { key: "elibrary", title: t("about.programs.cards.elibrary"), desc: t("about.whatWeDo.programs.elibrary.desc"), icon: BookOpen, href: "/programs/elibrary-nigeria" },
    { key: "nesaTv", title: t("about.whatWeDo.programs.nesaTv.title"), desc: t("about.whatWeDo.programs.nesaTv.desc"), icon: Tv, href: "/media/nesa-tv" },
  ];

  const divisionKeys = ["bgeo", "sobcd", "tdsd", "ombdd", "santosMedia", "lcs"] as const;

  const divisionsData = divisionKeys.map(key => ({
    key,
    code: t(`divisions.items.${key}.code`),
    title: t(`divisions.items.${key}.title`),
    lead: t(`divisions.items.${key}.lead`),
    mandate: t(`divisions.items.${key}.mandate`),
  }));

  const faqs = [
    { q: t("about.faqs.items.0.q"), a: t("about.faqs.items.0.a") },
    { q: t("about.faqs.items.1.q"), a: t("about.faqs.items.1.a") },
    { q: t("about.faqs.items.2.q"), a: t("about.faqs.items.2.a") },
    { q: t("about.faqs.items.3.q"), a: t("about.faqs.items.3.a") },
  ];

  const whoWeAreOutcomes = [
    t("about.who.outcomes.0"),
    t("about.who.outcomes.1"),
    t("about.who.outcomes.2"),
    t("about.who.outcomes.3"),
    t("about.who.outcomes.4"),
    t("about.who.outcomes.5"),
  ];

  const whyWeExistChallenges = [
    t("about.whyWeExist.challenges.0"),
    t("about.whyWeExist.challenges.1"),
    t("about.whyWeExist.challenges.2"),
    t("about.whyWeExist.challenges.3"),
    t("about.whyWeExist.challenges.4"),
  ];

  const tvetEmpowerPoints = [
    t("about.tvetSpotlight.empowerPoints.0"),
    t("about.tvetSpotlight.empowerPoints.1"),
    t("about.tvetSpotlight.empowerPoints.2"),
  ];

  const objectives = [
    { title: t("about.objectives.items.0"), shortTitle: t("about.objectives.shortTitles.0"), tools: ["NESA-Africa", t("about.objectives.tools.certificationSystems")] },
    { title: t("about.objectives.items.1"), shortTitle: t("about.objectives.shortTitles.1"), tools: ["EOA", "eLibrary Nigeria", "ACDL/AWPC"] },
    { title: t("about.objectives.items.2"), shortTitle: t("about.objectives.shortTitles.2"), tools: ["NESA Africa TV", "It's In Me Radio", t("about.objectives.tools.webinars")] },
    { title: t("about.objectives.items.3"), shortTitle: t("about.objectives.shortTitles.3"), tools: [t("about.objectives.tools.localChapters"), t("about.objectives.tools.complianceFramework")] },
    { title: t("about.objectives.items.4"), shortTitle: t("about.objectives.shortTitles.4"), tools: ["SCEF–FMS", t("about.objectives.tools.csrPrograms"), t("about.objectives.tools.esgReporting")] },
    { title: t("about.objectives.items.5"), shortTitle: t("about.objectives.shortTitles.5"), tools: [t("about.objectives.tools.regionalChapters"), t("about.objectives.tools.diaspora"), t("about.objectives.tools.partnerships")] },
  ];

  const sustainabilityPriorities = [
    { label: t("about.sustainability.priorities.inclusion.label"), desc: t("about.sustainability.priorities.inclusion.desc") },
    { label: t("about.sustainability.priorities.ownership.label"), desc: t("about.sustainability.priorities.ownership.desc") },
    { label: t("about.sustainability.priorities.transparency.label"), desc: t("about.sustainability.priorities.transparency.desc") },
    { label: t("about.sustainability.priorities.outcomes.label"), desc: t("about.sustainability.priorities.outcomes.desc") },
  ];

  const getInvolvedPathways = [
    { icon: Users, title: t("about.getInvolved.pathways.member.title"), desc: t("about.getInvolved.pathways.member.desc"), href: "/get-involved/membership", color: "scef-blue" },
    { icon: Award, title: t("about.getInvolved.pathways.ambassador.title"), desc: t("about.getInvolved.pathways.ambassador.desc"), href: "/get-involved/ambassador", color: "scef-gold" },
    { icon: Handshake, title: t("about.getInvolved.pathways.partner.title"), desc: t("about.getInvolved.pathways.partner.desc"), href: "/partner-with-us", color: "scef-blue" },
    { icon: Heart, title: t("about.getInvolved.pathways.donate.title"), desc: t("about.getInvolved.pathways.donate.desc"), href: "/donate", color: "scef-gold" },
    { icon: Globe, title: t("about.getInvolved.pathways.chapter.title"), desc: t("about.getInvolved.pathways.chapter.desc"), href: "/chapters/join-online", color: "scef-blue" },
    { icon: Users, title: t("about.getInvolved.pathways.volunteer.title"), desc: t("about.getInvolved.pathways.volunteer.desc"), href: "/get-involved/volunteer", color: "scef-gold" },
  ];

  const impactAccountabilityItems = [
    t("about.impact.accountability.0"),
    t("about.impact.accountability.1"),
    t("about.impact.accountability.2"),
    t("about.impact.accountability.3"),
    t("about.impact.accountability.4"),
  ];

  return (
    <>
      <Helmet>
        <title>{t("about.hero.title")}</title>
        <meta name="description" content={t("about.hero.subtitle")} />
        <meta name="keywords" content="SCEF, Pan-African education, TVET, inclusive education, education governance, local chapters, Africa education, SDG 4, AU Agenda 2063" />
        <link rel="canonical" href="https://scef.org/about" />
      </Helmet>
      
      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />
        
        <main>
          {/* HERO SECTION */}
          <section id="top" className="relative bg-scef-blue overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left: Hero Content */}
              <div className="relative py-20 lg:py-28 px-6 lg:px-12 flex flex-col justify-center bg-gradient-to-br from-scef-blue via-scef-blue to-scef-blue-darker">
                <div className="absolute inset-0 bg-gradient-to-r from-scef-blue/0 to-scef-blue/80 lg:hidden" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-scef-gold/10 rounded-full blur-3xl" />
                
                <div className="relative z-10 max-w-xl">
                  {/* Eyebrow */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-gold text-sm font-semibold mb-6 border border-scef-gold/30">
                    <Globe className="w-4 h-4" />
                    {t("about.hero.regionBadge")}
                  </div>
                  
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                    {t("about.hero.title")}
                  </h1>
                  
                  <h2 className="text-lg md:text-xl text-white/85 leading-relaxed mb-6 font-medium">
                    {t("about.hero.tagline")}
                  </h2>
                  
                  {/* Short visible preview */}
                  <p className="text-base text-white/70 leading-relaxed mb-4">
                    {t("about.hero.description")}
                  </p>

                  {/* Collapsible "Read more" section */}
                  <Collapsible open={heroExpanded} onOpenChange={setHeroExpanded}>
                    <CollapsibleContent className="text-base text-white/70 leading-relaxed space-y-4 mb-4">
                      <p>{t("about.hero.expanded.p1")}</p>
                      <p>{t("about.hero.expanded.p2")}</p>
                      <p>{t("about.hero.expanded.p3")}</p>
                    </CollapsibleContent>
                    <CollapsibleTrigger asChild>
                      <button className="inline-flex items-center gap-2 text-scef-gold hover:text-scef-gold-light text-sm font-medium mb-6 transition-colors">
                        {heroExpanded ? (
                          <>{t("labels.readLess")} <ChevronUp className="w-4 h-4" /></>
                        ) : (
                          <>{t("labels.readMore")} <ChevronDown className="w-4 h-4" /></>
                        )}
                      </button>
                    </CollapsibleTrigger>
                  </Collapsible>

                  {/* Quick Facts chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/20">
                      {t("about.hero.facts.founded")}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/20">
                      {t("about.hero.facts.registered")}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-scef-gold/20 text-scef-gold text-xs font-medium border border-scef-gold/30">
                      {t("about.hero.facts.alignment")}
                    </span>
                  </div>

                  {/* Primary CTAs */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-bold shadow-lg" asChild>
                      <Link to="/get-involved/membership">
                        {t("about.hero.ctaJoin")}
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm font-semibold" asChild>
                      <Link to="/partner-with-us">
                        {t("about.hero.ctaPartner")}
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="border-2 border-scef-gold/60 text-scef-gold hover:bg-scef-gold/10 backdrop-blur-sm font-semibold" asChild>
                      <Link to="/donate">
                        <Heart className="w-4 h-4" />
                        {t("about.hero.ctaDonate")}
                      </Link>
                    </Button>
                  </div>

                  {/* Secondary CTA */}
                  <div className="text-sm text-white/60">
                    <Link to="/chapters/join-online" className="text-scef-gold hover:text-scef-gold-light underline underline-offset-2">
                      {t("about.hero.ctaJoinChapter")} →
                    </Link>
                    <p className="mt-1 text-xs">
                      {t("about.hero.joinChapterHelper")}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right: Hero Image */}
              <div className="relative hidden lg:block">
                <img 
                  src={aboutHeroImage}
                  alt={t("about.hero.imageAlt")}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-scef-blue/40" />
              </div>
            </div>
            
            {/* Mobile Hero Image */}
            <div className="lg:hidden relative h-64">
              <img 
                src={aboutHeroImage}
                alt={t("about.hero.imageAlt")}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scef-blue/80 to-transparent" />
            </div>
          </section>
          
          {/* THREE PILLAR CARDS */}
          <section className="py-12 bg-background border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Card 1: Standards & Recognition */}
                <div className="bg-card rounded-2xl p-6 border-2 border-scef-gold/20 hover:border-scef-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-scef-gold" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{t("about.missionSnapshot.standards.title")}</h3>
                  <p className="text-sm text-scef-gold font-medium mb-3">{t("about.missionSnapshot.standards.subtitle")}</p>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" /> {t("about.missionSnapshot.standards.point1")}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" /> {t("about.missionSnapshot.standards.point2")}</li>
                  </ul>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href="https://nesa.africa" target="_blank" rel="noopener noreferrer">
                      {t("about.missionSnapshot.visitNesa")} <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
                
                {/* Card 2: Scholarships & Funding */}
                <div className="bg-card rounded-2xl p-6 border-2 border-scef-blue/20 hover:border-scef-blue/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-scef-blue/10 flex items-center justify-center mb-4">
                    <GraduationCap className="w-6 h-6 text-scef-blue" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{t("about.missionSnapshot.scholarships.title")}</h3>
                  <p className="text-sm text-scef-blue font-medium mb-3">{t("about.missionSnapshot.scholarships.subtitle")}</p>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-blue shrink-0 mt-0.5" /> {t("about.missionSnapshot.scholarships.point1")}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-blue shrink-0 mt-0.5" /> {t("about.missionSnapshot.scholarships.point2")}</li>
                  </ul>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href="https://edu-aid-chi.vercel.app" target="_blank" rel="noopener noreferrer">
                      {t("about.missionSnapshot.visitEduaid")} <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
                
                {/* Card 3: Inclusion & Access */}
                <div className="bg-card rounded-2xl p-6 border-2 border-scef-gold/20 hover:border-scef-gold/40 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center mb-4">
                    <Accessibility className="w-6 h-6 text-scef-gold" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{t("about.missionSnapshot.inclusion.title")}</h3>
                  <p className="text-sm text-scef-gold font-medium mb-3">{t("about.missionSnapshot.inclusion.subtitle")}</p>
                  <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" /> {t("about.missionSnapshot.inclusion.point1")}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-scef-gold shrink-0 mt-0.5" /> {t("about.missionSnapshot.inclusion.point2")}</li>
                  </ul>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/programs/inclusion-access">
                      {t("about.whatWeDo.learnMore")} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* STICKY ANCHOR NAV */}
          <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
            <div className="container mx-auto px-4">
              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
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
              
              {/* Mobile Nav Dropdown */}
              <div className="md:hidden py-3">
                <Collapsible open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
                  <CollapsibleTrigger asChild>
                    <button className="w-full flex items-center justify-between px-4 py-2 bg-muted rounded-lg">
                      <span className="text-sm font-medium text-foreground">
                        {quickNavItems.find(item => item.id === activeSection)?.label || t("about.quickNav.navigate")}
                      </span>
                      <Menu className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-1">
                    {quickNavItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "w-full px-4 py-2 text-sm text-left rounded-lg transition-colors",
                          activeSection === item.id
                            ? "bg-scef-blue text-white"
                            : "text-muted-foreground hover:bg-muted"
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </nav>

          {/* WHO WE ARE */}
          <section id="who-we-are" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-6">
                  <Target className="w-4 h-4" />
                  {t("about.who.badge")}
                </div>
                
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t("about.who.title")}
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t("about.who.body")}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {whoWeAreOutcomes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl">
                      <CheckCircle2 className="w-5 h-5 text-scef-gold mt-0.5 shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light">
                    <Link to="/programs">
                      {t("about.who.ctaPrograms")} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/chapters">{t("about.who.ctaChapter")}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/donate">{t("about.who.ctaDonate")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* WHY WE EXIST */}
          <section id="why-we-exist" className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t("about.whyWeExist.title")}
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t("about.whyWeExist.intro")}
                </p>

                <div className="space-y-4 mb-10">
                  {whyWeExistChallenges.map((item, i) => (
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
                    <strong className="text-scef-blue">{t("about.whyWeExist.solution")}</strong>{t("about.whyWeExist.solutionDesc")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* WHAT WE DO (PROGRAMS) */}
          <section id="what-we-do" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("about.whatWeDo.title")}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t("about.whatWeDo.intro")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
                      <h3 className="font-display text-base font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors leading-tight">
                        {program.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {program.desc}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-scef-blue group-hover:text-scef-gold transition-colors">
                        {t("about.whatWeDo.learnMore")} <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-scef-blue text-white hover:bg-scef-blue-dark">
                  <Link to="/get-involved/apply">{t("about.whatWeDo.ctaApply")}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/partner-with-us">{t("about.whatWeDo.ctaPartner")}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/donate?type=program">{t("about.whatWeDo.ctaDonate")}</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* TVET & INCLUSION */}
          <section id="tvet-inclusion" className="py-20 bg-scef-blue-darker text-white">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6">
                    <Wrench className="w-4 h-4" />
                    {t("about.tvetSpotlight.badge")}
                  </div>
                  
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                    {t("about.tvetSpotlight.title")}
                  </h2>
                  
                  <p className="text-lg text-white/80 leading-relaxed mb-6">
                    {t("about.tvetSpotlight.intro")}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {tvetEmpowerPoints.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-scef-gold mt-0.5 shrink-0" />
                        <span className="text-white/90">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Collapsible details on mobile */}
                  <Collapsible>
                    <div className="bg-white/10 rounded-xl p-6 mb-8">
                      <h3 className="font-semibold text-white mb-4">{t("about.tvetSpotlight.whatLooksLike")}</h3>
                      <CollapsibleContent className="lg:block">
                        <ul className="space-y-2 text-sm text-white/80">
                          <li><strong className="text-scef-gold">{t("about.tvetSpotlight.tvetSupport")}</strong> {t("about.tvetSpotlight.tvetSupportDesc")}</li>
                          <li><strong className="text-scef-gold">{t("about.tvetSpotlight.inclusiveAccess")}</strong> {t("about.tvetSpotlight.inclusiveAccessDesc")}</li>
                          <li><strong className="text-scef-gold">{t("about.tvetSpotlight.outcomesFocus")}</strong> {t("about.tvetSpotlight.outcomesFocusDesc")}</li>
                        </ul>
                      </CollapsibleContent>
                      <CollapsibleTrigger asChild>
                        <button className="lg:hidden mt-4 text-scef-gold text-sm font-medium flex items-center gap-1">
                          {t("about.tvetSpotlight.showDetails")} <ChevronDown className="w-4 h-4" />
                        </button>
                      </CollapsibleTrigger>
                    </div>
                  </Collapsible>

                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-semibold" asChild>
                      <Link to="/donate?focus=tvet-inclusion">{t("about.tvetSpotlight.ctaTvet")}</Link>
                    </Button>
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                      <Link to="/partner-with-us/csr">{t("about.tvetSpotlight.ctaCsr")}</Link>
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                    <img 
                      src={aboutHeroImage}
                      alt={t("about.tvetSpotlight.imageAlt")}
                      className="w-full h-full object-cover object-bottom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/60 via-transparent to-transparent" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-scef-gold/20 rounded-full blur-2xl" />
                </div>
              </div>
            </div>
          </section>

          {/* OBJECTIVES */}
          <section id="objectives" className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("about.objectives.title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("about.objectives.subtitle")}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-10">
                {objectives.map((objective, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 border border-border hover:border-scef-gold hover:shadow-md transition-all">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-scef-blue flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-semibold text-scef-gold uppercase tracking-wide">{objective.shortTitle}</span>
                        <p className="text-foreground leading-relaxed mt-1 text-sm">{objective.title}</p>
                      </div>
                    </div>
                    <div className={cn("flex flex-wrap gap-2", isRTL ? "pr-14" : "pl-14")}>
                      {objective.tools.map((tool, i) => (
                        <span key={i} className="px-2 py-1 text-xs rounded-full bg-scef-gold/10 text-scef-gold border border-scef-gold/20">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light">
                  <Link to="/about/governance">
                    <Shield className="w-4 h-4" />
                    {t("about.objectives.ctaGovernance")}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/about/divisions">
                    {t("about.objectives.ctaDivisions")}
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* HOW WE WORK (DIVISIONS) */}
          <section id="divisions" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("about.divisionsSection.title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("about.divisionsSection.subtitle")}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
                {divisionsData.map((division, index) => {
                  const divKey = divisionKeys[index];
                  const Icon = divisionIcons[divKey];
                  const link = divisionLinks[divKey];
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
                          {division.code}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                        {division.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-1">
                        <strong>{division.lead}</strong>
                      </p>
                      <p className="text-sm text-muted-foreground">{division.mandate}</p>
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-scef-blue text-white hover:bg-scef-blue-dark">
                  <Link to="/chapters/join">{t("about.divisionsSection.ctaChapter")}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/get-involved/volunteer">{t("about.divisionsSection.ctaVolunteer")}</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* IMPACT & ACCOUNTABILITY - NO FAKE METRICS */}
          <section id="impact" className="py-20 bg-scef-blue text-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  {t("about.impact.title")}
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto">
                  {t("about.impact.subtitle")}
                </p>
              </div>

              {/* Accountability Framework */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
                  <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-scef-gold" />
                    {t("about.impact.frameworkTitle")}
                  </h3>
                  <p className="text-white/80 mb-6">
                    {t("about.impact.frameworkDesc")}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {impactAccountabilityItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-scef-gold mt-0.5 shrink-0" />
                        <span className="text-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reporting Status */}
              <div className="max-w-4xl mx-auto mb-12">
                <div className="bg-scef-gold/20 rounded-2xl p-6 border border-scef-gold/30 text-center">
                  <BarChart3 className="w-10 h-10 text-scef-gold mx-auto mb-4" />
                  <h4 className="font-semibold text-white mb-2">{t("about.impact.reportingTitle")}</h4>
                  <p className="text-white/70 text-sm mb-4">
                    {t("about.impact.reportingDesc")}
                  </p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white/80 text-sm">
                    <Clock className="w-4 h-4" />
                    {t("about.impact.reportingStatus")}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-semibold" asChild>
                  <Link to="/resources/organizational-profile">
                    <Download className="w-4 h-4" />
                    {t("about.impact.ctaProfile")}
                  </Link>
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/resources/reports">
                    <FileText className="w-4 h-4" />
                    {t("about.impact.ctaReports")}
                  </Link>
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/updates">
                    <BarChart3 className="w-4 h-4" />
                    {t("about.impact.ctaUpdates")}
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* SUSTAINABILITY & ALIGNMENT */}
          <section id="sustainability" className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t("about.sustainability.title")}
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t("about.sustainability.body")}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-10">
                  {sustainabilityPriorities.map((item, i) => (
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
                    <Link to="/partner-with-us/csr">{t("about.sustainability.ctaCsr")}</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/donate?type=sponsor">{t("about.sustainability.ctaSponsor")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* GET INVOLVED */}
          <section id="get-involved" className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("about.getInvolved.title")}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {t("about.getInvolved.subtitle")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
                {getInvolvedPathways.map((item, i) => {
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
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="py-20 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
                  {t("about.faqs.title")}
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

          {/* FINAL CTA */}
          <section id="final-cta" className="py-20 bg-scef-blue-darker text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {t("about.final.title")}
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                {t("about.final.subtitle")}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-bold" asChild>
                  <Link to="/get-involved/membership">
                    <Users className="w-5 h-5" />
                    {t("about.final.ctaJoin")}
                  </Link>
                </Button>
                <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20" asChild>
                  <Link to="/donate">
                    <Heart className="w-5 h-5" />
                    {t("about.final.ctaDonate")}
                  </Link>
                </Button>
                <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20" asChild>
                  <Link to="/partner-with-us">
                    <Handshake className="w-5 h-5" />
                    {t("about.final.ctaPartner")}
                  </Link>
                </Button>
                <Button size="lg" className="bg-white/10 text-white border border-white/30 hover:bg-white/20" asChild>
                  <Link to="/media">
                    <Play className="w-5 h-5" />
                    {t("about.final.ctaMedia")}
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          
          {/* CRS Partners */}
          <CRSPartnersSection variant="compact" />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default About;

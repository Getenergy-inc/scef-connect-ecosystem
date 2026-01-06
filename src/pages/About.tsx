import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { 
  Target, Eye, Heart, Users, Award, Globe, ArrowRight, 
  Shield, Building2, Tv, Laptop, TrendingUp, CheckCircle2,
  GraduationCap, Handshake
} from "lucide-react";

const divisions = [
  {
    code: "SOBCD",
    titleKey: "about.divisions.items.sobcd",
    icon: Shield,
  },
  {
    code: "TDSD",
    titleKey: "about.divisions.items.tdsd",
    icon: Laptop,
  },
  {
    code: "OMBDD",
    titleKey: "about.divisions.items.ombdd",
    icon: TrendingUp,
  },
  {
    code: "Santos Media",
    titleKey: "about.divisions.items.santosMedia",
    icon: Tv,
  },
  {
    code: "LCS",
    titleKey: "about.divisions.items.lcs",
    icon: Globe,
  },
];

const About = () => {
  const { t } = useLocale();

  const objectives = [
    t("about.objectives.items.0"),
    t("about.objectives.items.1"),
    t("about.objectives.items.2"),
    t("about.objectives.items.3"),
    t("about.objectives.items.4"),
    t("about.objectives.items.5"),
  ];

  const governanceLayers = [
    { title: t("nav.utility.bot"), description: "Fiduciary oversight, institutional integrity, and strategic direction" },
    { title: t("nav.utility.boa"), description: "Program advisors and chapter advisors providing domain expertise" },
    { title: t("nav.utility.bod"), description: "Operational governance and cross-border coordination" },
    { title: t("nav.utility.lcps"), description: "Country-level execution, community engagement, and compliance reporting" },
  ];

  return (
    <>
      <Helmet>
        <title>About SCEF - Institutional Leadership for Africa's Education</title>
        <meta 
          name="description" 
          content="SCEF is Africa's institutional platform for education governance, delivery, certification, funding, and recognition. Founded in 1997, governing education across Africa and the diaspora." 
        />
        <meta name="keywords" content="SCEF, African education, education governance, Pan-African, education institution" />
        <link rel="canonical" href="https://scef.org/about" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-scef-gold/20 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 border-2 border-black">
                  <Building2 className="w-4 h-4" />
                  {t("nav.top.about")}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t("about.hero.title")}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  {t("about.hero.subtitle")}
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    <Link to="/membership">
                      {t("about.hero.ctaJoin")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" asChild className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                    <Link to="/donate">
                      <Heart className="w-4 h-4" />
                      {t("about.hero.ctaDonate")}
                    </Link>
                  </Button>
                  <Button size="lg" asChild className="bg-transparent border-2 border-scef-gold text-scef-gold hover:bg-scef-gold/10">
                    <Link to="/get-involved">
                      {t("about.hero.ctaAmbassador")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Are */}
          <section className="py-20 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
                    <Target className="w-4 h-4" />
                    {t("about.who.title")}
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {t("about.who.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {t("about.who.body")}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                      <Link to="/programs">
                        {t("about.who.ctaPrograms")}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button size="lg" asChild className="bg-scef-blue text-white hover:bg-scef-blue-light border-2 border-black font-semibold">
                      <Link to="/updates">
                        {t("about.who.ctaUpdates")}
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-scef-gold/20 to-scef-blue/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card rounded-3xl p-8 border-2 border-black">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background rounded-2xl p-6 text-center border-2 border-black">
                        <div className="text-3xl font-display font-bold text-scef-blue mb-1">1997</div>
                        <p className="text-sm text-muted-foreground">Founded</p>
                      </div>
                      <div className="bg-background rounded-2xl p-6 text-center border-2 border-black">
                        <div className="text-3xl font-display font-bold text-scef-gold mb-1">2010</div>
                        <p className="text-sm text-muted-foreground">Registered</p>
                      </div>
                      <div className="bg-background rounded-2xl p-6 text-center border-2 border-black">
                        <div className="text-3xl font-display font-bold text-scef-blue mb-1">54+</div>
                        <p className="text-sm text-muted-foreground">Countries</p>
                      </div>
                      <div className="bg-background rounded-2xl p-6 text-center border-2 border-black">
                        <div className="text-3xl font-display font-bold text-scef-gold mb-1">50K+</div>
                        <p className="text-sm text-muted-foreground">Impacted</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-card rounded-2xl p-10 border-2 border-black hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-scef-gold/20 flex items-center justify-center mb-6 border-2 border-black">
                    <Eye className="w-7 h-7 text-scef-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t("about.vision.title")}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t("about.vision.body")}
                  </p>
                </div>
                
                <div className="bg-card rounded-2xl p-10 border-2 border-black hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-scef-blue/20 flex items-center justify-center mb-6 border-2 border-black">
                    <Target className="w-7 h-7 text-scef-blue" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t("about.history.title")}</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t("about.history.body")}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Objectives */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("about.objectives.title")}
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-scef-blue flex items-center justify-center text-white font-bold text-sm shrink-0 border-2 border-black">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                  <a href="/scef-profile.pdf" target="_blank" rel="noopener noreferrer">
                    {t("about.objectives.ctaDownload")}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Governance */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
                  <Shield className="w-4 h-4" />
                  {t("about.trust.title")}
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("about.trust.body")}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {governanceLayers.map((layer, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 border-2 border-black text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center mx-auto mb-4 border-2 border-black">
                      <span className="font-bold text-scef-blue">{index + 1}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{layer.title}</h3>
                    <p className="text-sm text-muted-foreground">{layer.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                  <Link to="/governance">
                    {t("about.trust.ctaHub")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Operations / Divisions */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("about.divisions.title")}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {divisions.map((division) => (
                  <div key={division.code} className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <division.icon className="w-6 h-6 text-scef-blue" />
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-scef-gold text-scef-blue border-2 border-black">
                        {division.code}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{t(division.titleKey)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Programs Spotlight */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("about.programs.title")}
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {t("about.programs.intro")}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
                <div className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                  <Award className="w-8 h-8 text-scef-gold mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">NESA Africa</h3>
                  <p className="text-sm text-muted-foreground">{t("about.programs.cards.nesa")}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                  <Heart className="w-8 h-8 text-scef-blue mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">EduAid Africa</h3>
                  <p className="text-sm text-muted-foreground">{t("about.programs.cards.eduaid")}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                  <Building2 className="w-8 h-8 text-scef-gold mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">RMSA</h3>
                  <p className="text-sm text-muted-foreground">{t("about.programs.cards.rmsa")}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                  <Laptop className="w-8 h-8 text-scef-blue mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">EOA</h3>
                  <p className="text-sm text-muted-foreground">{t("about.programs.cards.eoa")}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                  <Users className="w-8 h-8 text-scef-gold mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">Women & Girls</h3>
                  <p className="text-sm text-muted-foreground">{t("about.programs.cards.womenGirls")}</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                  <Globe className="w-8 h-8 text-scef-blue mb-4" />
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">Special Needs</h3>
                  <p className="text-sm text-muted-foreground">{t("about.programs.cards.specialNeeds")}</p>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                  <Link to="/programs">
                    {t("about.programs.ctaAll")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* EOA Spotlight */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
                  <GraduationCap className="w-4 h-4" />
                  EOA
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t("about.eoaSpotlight.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t("about.eoaSpotlight.body")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    <Link to="/programs/eoa">
                      {t("about.eoaSpotlight.ctaStart")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" asChild className="bg-scef-blue text-white hover:bg-scef-blue-light border-2 border-black font-semibold">
                    <Link to="/programs/eoa#certify">
                      {t("about.eoaSpotlight.ctaCertify")}
                    </Link>
                  </Button>
                  <Button size="lg" asChild className="bg-transparent border-2 border-scef-blue text-scef-blue hover:bg-scef-blue/10">
                    <Link to="/partners">
                      {t("about.eoaSpotlight.ctaPartner")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Sustainability */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t("about.sustainability.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t("about.sustainability.body")}
                </p>
                <div className="bg-card rounded-2xl p-8 border-2 border-black mb-8">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    {t("about.sustainability.csrFundsTitle")}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t("about.sustainability.csrFundsBody")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                      <Link to="/partners">
                        {t("about.sustainability.ctaCsr")}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button size="lg" asChild className="bg-scef-blue text-white hover:bg-scef-blue-light border-2 border-black font-semibold">
                      <Link to="/contact">
                        {t("about.sustainability.ctaRequest")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-scef-blue border-t-2 border-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                {t("about.final.title")}
              </h2>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-semibold border-2 border-black">
                  <Link to="/membership">
                    {t("about.final.ctaJoin")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" asChild className="bg-transparent border-2 border-scef-gold text-scef-gold hover:bg-scef-gold/10">
                  <Link to="/donate">
                    <Heart className="w-4 h-4" />
                    {t("about.final.ctaDonate")}
                  </Link>
                </Button>
                <Button size="lg" asChild className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                  <Link to="/partners">
                    {t("about.final.ctaPartner")}
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

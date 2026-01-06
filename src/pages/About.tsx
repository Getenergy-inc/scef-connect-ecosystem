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
  const { t } = useLocale();

  const objectives = [
    t("about.objectives.items.0"),
    t("about.objectives.items.1"),
    t("about.objectives.items.2"),
    t("about.objectives.items.3"),
    t("about.objectives.items.4"),
    t("about.objectives.items.5"),
  ];

  const divisionKeys = ["bgeo", "sobcd", "tdsd", "ombdd", "santosMedia", "lcs"];

  return (
    <>
      <Helmet>
        <title>{t("about.hero.title")} - SCEF</title>
        <meta 
          name="description" 
          content={t("about.hero.subtitle")} 
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
              </div>
            </div>
          </section>

          {/* Why SCEF */}
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
                    <Button asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black">
                      <Link to="/programs">
                        {t("about.who.ctaPrograms")}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="border-2 border-black">
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
                        <p className="text-sm text-muted-foreground">{t("about.history.title")}</p>
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
                  {t("about.trust.title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("about.trust.body")}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {["bot", "boa", "bod", "lcps"].map((layer, index) => (
                  <div key={layer} className="bg-card rounded-2xl p-6 border-2 border-black text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center mx-auto mb-4 border-2 border-black">
                      <span className="font-bold text-scef-blue">{index + 1}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{t(`governance.layers.${layer}.title`)}</h3>
                    <p className="text-sm text-muted-foreground">{t(`governance.layers.${layer}.description`)}</p>
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
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("divisions.hero.subtitle")}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {divisionKeys.map((divKey) => {
                  const Icon = divisionIcons[divKey as keyof typeof divisionIcons];
                  const link = divisionLinks[divKey as keyof typeof divisionLinks];
                  return (
                    <Link 
                      key={divKey} 
                      to={link}
                      className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg hover:border-scef-gold transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="w-6 h-6 text-scef-blue group-hover:text-scef-gold transition-colors" />
                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-scef-gold text-scef-blue border-2 border-black">
                          {t(`divisions.items.${divKey}.code`)}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-scef-gold transition-colors">
                        {t(`divisions.items.${divKey}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">{t(`divisions.items.${divKey}.mandate`)}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-scef-blue group-hover:text-scef-gold transition-colors">
                        Learn more <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
                  <Award className="w-4 h-4" />
                  {t("about.eoaSpotlight.title")}
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  {t("about.eoaSpotlight.title")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t("about.eoaSpotlight.body")}
                </p>
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                  <Link to="/certifications">
                    <GraduationCap className="w-4 h-4" />
                    {t("about.eoaSpotlight.ctaStart")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Membership & Partnerships */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Membership */}
                <div className="bg-card rounded-2xl p-10 border-2 border-black hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-scef-blue/20 flex items-center justify-center mb-6 border-2 border-black">
                    <Users className="w-7 h-7 text-scef-blue" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t("home.final.ctaJoin")}</h2>
                  <p className="text-muted-foreground mb-6">
                    {t("about.hero.subtitle")}
                  </p>
                  <Button asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black">
                    <Link to="/membership">
                      {t("about.hero.ctaJoin")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                {/* Partnerships */}
                <div className="bg-card rounded-2xl p-10 border-2 border-black hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-scef-gold/20 flex items-center justify-center mb-6 border-2 border-black">
                    <Handshake className="w-7 h-7 text-scef-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">{t("home.partnerships.title")}</h2>
                  <p className="text-muted-foreground mb-6">
                    {t("home.partnerships.body")}
                  </p>
                  <Button asChild className="bg-scef-blue text-white hover:bg-scef-blue-dark border-2 border-black">
                    <Link to="/partners">
                      {t("about.hero.ctaCsr")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-scef-blue border-t-2 border-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                {t("about.final.title")}
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                {t("about.hero.subtitle")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold" asChild>
                  <Link to="/membership">
                    {t("about.final.ctaJoin")}
                  </Link>
                </Button>
                <Button size="lg" className="bg-transparent text-white border-2 border-scef-gold hover:bg-scef-gold/20" asChild>
                  <Link to="/donate">
                    {t("about.final.ctaDonate")}
                  </Link>
                </Button>
                <Button size="lg" className="bg-transparent text-white border-2 border-scef-gold hover:bg-scef-gold/20" asChild>
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

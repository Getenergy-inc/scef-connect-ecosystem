import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { 
  Building2, Globe, Target, FileText, 
  Download, CheckCircle, Calendar, MapPin, ArrowRight,
  Briefcase, Heart
} from "lucide-react";
import { Link } from "react-router-dom";

const OrganizationalProfile = () => {
  const { t, isRTL } = useLocale();

  const quickFacts = [
    { labelKey: "organizationalProfile.facts.founded", value: "1997", icon: Calendar },
    { labelKey: "organizationalProfile.facts.registered", value: "2010", icon: FileText },
    { labelKey: "organizationalProfile.facts.headquarters", value: "Lagos, Nigeria", icon: MapPin },
    { labelKey: "organizationalProfile.facts.alignment", value: "SDG 4 + AU 2063", icon: Globe },
  ];

  const corePrograms = [
    { nameKey: "nav.dropdown.work.nesa", descKey: "about.programs.cards.nesa", link: "/programs/nesa-africa" },
    { nameKey: "nav.dropdown.work.eduaid", descKey: "about.programs.cards.eduaid", link: "/programs/eduaid-africa" },
    { nameKey: "nav.dropdown.work.rmsa", descKey: "about.programs.cards.rmsa", link: "/programs/rebuild-my-school-africa" },
    { nameKey: "nav.dropdown.work.eoa", descKey: "about.programs.cards.eoa", link: "/programs/digital-learning" },
    { nameKey: "nav.dropdown.work.womenGirls", descKey: "about.programs.cards.womenGirls", link: "/programs/women-girls-education" },
    { nameKey: "nav.dropdown.work.specialNeeds", descKey: "about.programs.cards.specialNeeds", link: "/programs/special-needs-education" },
  ];

  const divisions = [
    { name: "BGEO", fullNameKey: "divisions.items.bgeo.title" },
    { name: "SOBCD", fullNameKey: "divisions.items.sobcd.title" },
    { name: "TDSD", fullNameKey: "divisions.items.tdsd.title" },
    { name: "OMBDD", fullNameKey: "divisions.items.ombdd.title" },
    { name: "Santos Media", fullNameKey: "divisions.items.santosMedia.title" },
    { name: "LCS", fullNameKey: "divisions.items.lcs.title" },
  ];

  const partnershipBenefits = t("organizationalProfile.partnership.benefits") as unknown as string[] || [];

  return (
    <>
      <Helmet>
        <title>{t("organizationalProfile.hero.title")} - SCEF</title>
        <meta name="description" content={t("organizationalProfile.hero.subtitle")} />
      </Helmet>

      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-scef-gold flex items-center justify-center mb-6 border-2 border-black">
                  <Building2 className="w-10 h-10 text-scef-blue" />
                </div>
                <p className="text-scef-gold font-medium mb-4">{t("organizationalProfile.hero.badge")}</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t("organizationalProfile.hero.title")}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  {t("organizationalProfile.hero.subtitle")}
                </p>
                <Button 
                  size="lg" 
                  className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {t("organizationalProfile.hero.download")}
                </Button>
              </div>
            </div>
          </section>

          {/* Quick Facts */}
          <section className="py-12 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {quickFacts.map((fact) => (
                  <Card key={fact.labelKey} className="border-2 border-black text-center">
                    <CardContent className="pt-6">
                      <fact.icon className="w-8 h-8 text-scef-gold mx-auto mb-2" />
                      <p className="font-display font-bold text-xl text-foreground">{fact.value}</p>
                      <p className="text-sm text-muted-foreground">{t(fact.labelKey)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="border-2 border-black">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <Target className="w-6 h-6 text-scef-blue" />
                      </div>
                      <CardTitle className="text-2xl">{t("organizationalProfile.mission.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {t("organizationalProfile.mission.description")}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-black">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                        <Globe className="w-6 h-6 text-scef-blue" />
                      </div>
                      <CardTitle className="text-2xl">{t("organizationalProfile.vision.title")}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {t("organizationalProfile.vision.description")}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Core Programs */}
          <section className="py-16 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    {t("organizationalProfile.programs.title")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("organizationalProfile.programs.subtitle")}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {corePrograms.map((program) => (
                    <Card key={program.link} className="border-2 border-black hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{t(program.nameKey)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{t(program.descKey)}</p>
                        <Link 
                          to={program.link}
                          className="text-scef-blue hover:text-scef-gold text-sm font-medium inline-flex items-center"
                        >
                          {t("organizationalProfile.programs.learnMore")} <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Organizational Structure */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    {t("organizationalProfile.structure.title")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("organizationalProfile.structure.subtitle")}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {divisions.map((division) => (
                    <div 
                      key={division.name}
                      className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border-2 border-black"
                    >
                      <div className="w-10 h-10 rounded-lg bg-scef-gold/20 flex items-center justify-center flex-shrink-0 border border-black">
                        <Briefcase className="w-5 h-5 text-scef-blue" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{division.name}</p>
                        <p className="text-sm text-muted-foreground">{t(division.fullNameKey)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button asChild variant="outline" className="border-2 border-black">
                    <Link to="/divisions">
                      {t("organizationalProfile.structure.viewAll")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Partnership Benefits */}
          <section className="py-16 bg-scef-blue/5 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                      {t("organizationalProfile.partnership.title")}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {t("organizationalProfile.partnership.subtitle")}
                    </p>
                    <ul className="space-y-3">
                      {Array.isArray(partnershipBenefits) && partnershipBenefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-scef-gold mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <Card className="border-2 border-black">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-2">{t("organizationalProfile.partnership.partner.title")}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {t("organizationalProfile.partnership.partner.subtitle")}
                        </p>
                        <Button asChild className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                          <Link to="/partner-with-us">
                            {t("about.hero.ctaPartner")}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-black">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-2">{t("organizationalProfile.partnership.support.title")}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {t("organizationalProfile.partnership.support.subtitle")}
                        </p>
                        <Button asChild variant="outline" className="w-full border-2 border-black">
                          <Link to="/donate">
                            {t("cta.donateNow")}
                            <Heart className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-scef-blue">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  {t("organizationalProfile.cta.title")}
                </h2>
                <p className="text-white/80 mb-8">
                  {t("organizationalProfile.cta.subtitle")}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                  >
                    <Link to="/get-involved/membership">{t("organizationalProfile.cta.join")}</Link>
                  </Button>
                  <Button 
                    asChild
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    <Link to="/about">{t("organizationalProfile.cta.learn")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default OrganizationalProfile;

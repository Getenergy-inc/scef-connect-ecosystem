import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { 
  Heart, Users, GraduationCap, HandHeart, Accessibility, 
  BookOpen, Globe, ArrowRight, CheckCircle, Target,
  Lightbulb, Eye
} from "lucide-react";

const InclusionAccess = () => {
  const { t, isRTL } = useLocale();

  const pillars = [
    {
      icon: Users,
      key: "womenGirls",
      color: "bg-pink-100 text-pink-700",
    },
    {
      icon: Accessibility,
      key: "specialNeeds",
      color: "bg-purple-100 text-purple-700",
    },
    {
      icon: Eye,
      key: "visualHearing",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Lightbulb,
      key: "learning",
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const impactAreas = [
    { icon: GraduationCap, labelKey: "inclusionAccess.impact.girlsEnrolled", metric: "Growing" },
    { icon: HandHeart, labelKey: "inclusionAccess.impact.specialNeeds", metric: "Supported" },
    { icon: Globe, labelKey: "inclusionAccess.impact.countries", metric: "Expanding" },
    { icon: BookOpen, labelKey: "inclusionAccess.impact.resources", metric: "In Progress" },
  ];

  const approachItems = t("inclusionAccess.approach.items") as unknown as string[] || [];

  const programLinks = [
    { titleKey: "nav.dropdown.work.womenGirls", href: "/programs/women-girls-education", icon: Users },
    { titleKey: "nav.dropdown.work.specialNeeds", href: "/programs/special-needs-education", icon: Accessibility },
  ];

  return (
    <>
      <Helmet>
        <title>{t("inclusionAccess.hero.title")} - SCEF</title>
        <meta name="description" content={t("inclusionAccess.hero.subtitle")} />
      </Helmet>

      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-gradient-to-br from-scef-blue via-scef-blue to-purple-900 overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-scef-gold flex items-center justify-center mb-6 border-2 border-black">
                  <Heart className="w-10 h-10 text-scef-blue" />
                </div>
                <p className="text-scef-gold font-medium mb-4">{t("inclusionAccess.hero.badge")}</p>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t("inclusionAccess.hero.title")}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  {t("inclusionAccess.hero.subtitle")}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                    asChild
                  >
                    <Link to="/donate?focus=inclusion">
                      {t("inclusionAccess.hero.ctaDonate")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/partner-with-us">{t("inclusionAccess.hero.ctaPartner")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Program Pillars */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("inclusionAccess.pillars.title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("inclusionAccess.pillars.subtitle")}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {pillars.map((pillar) => {
                  const initiatives = t(`inclusionAccess.pillars.${pillar.key}.initiatives`) as unknown as string[] || [];
                  return (
                    <Card key={pillar.key} className="border-2 border-black hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center flex-shrink-0 border-2 border-black`}>
                            <pillar.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <CardTitle className="text-xl mb-1">{t(`inclusionAccess.pillars.${pillar.key}.title`)}</CardTitle>
                            <CardDescription>{t(`inclusionAccess.pillars.${pillar.key}.description`)}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <h4 className="text-sm font-semibold text-foreground mb-3">{t("labels.featured")}:</h4>
                        <ul className="space-y-2">
                          {Array.isArray(initiatives) && initiatives.map((initiative, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-scef-gold mt-0.5 flex-shrink-0" />
                              <span className="text-muted-foreground">{initiative}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Impact Metrics */}
          <section className="py-16 bg-scef-blue/5 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {impactAreas.map((area) => (
                    <Card key={area.labelKey} className="border-2 border-black text-center p-6">
                      <area.icon className="w-8 h-8 text-scef-gold mx-auto mb-2" />
                      <p className="font-display font-bold text-lg text-foreground">{area.metric}</p>
                      <p className="text-xs text-muted-foreground">{t(area.labelKey)}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Our Approach */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                    {t("inclusionAccess.approach.title")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("inclusionAccess.approach.subtitle")}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {Array.isArray(approachItems) && approachItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg border-2 border-black">
                      <Target className="w-5 h-5 text-scef-gold mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Related Programs */}
          <section className="py-16 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {t("inclusionAccess.programs.title")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("inclusionAccess.programs.subtitle")}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {programLinks.map((program) => (
                    <Link key={program.href} to={program.href}>
                      <Card className="border-2 border-black hover:shadow-lg transition-all hover:border-scef-gold h-full">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center border-2 border-black">
                              <program.icon className="w-6 h-6 text-scef-blue" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">{t(program.titleKey)}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                {t("labels.readMore")} <ArrowRight className="w-3 h-3" />
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-scef-blue">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  {t("inclusionAccess.cta.title")}
                </h2>
                <p className="text-white/80 mb-8">
                  {t("inclusionAccess.cta.subtitle")}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                  >
                    <Link to="/donate?focus=inclusion">{t("inclusionAccess.cta.donate")}</Link>
                  </Button>
                  <Button 
                    asChild
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    <Link to="/partner-with-us">{t("inclusionAccess.cta.partner")}</Link>
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

export default InclusionAccess;

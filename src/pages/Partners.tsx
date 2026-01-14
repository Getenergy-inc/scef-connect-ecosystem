import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { 
  Handshake, Building2, GraduationCap, Globe, ArrowRight, 
  CheckCircle2, Users, Heart, Award, Briefcase
} from "lucide-react";
import { CRSPartnersSection } from "@/components/sections/CRSPartnersSection";

const colorClasses = {
  gold: "bg-gold/10 text-gold border-gold/20",
  terracotta: "bg-terracotta/10 text-terracotta border-terracotta/20",
  forest: "bg-forest/10 text-forest border-forest/20",
  primary: "bg-primary/10 text-primary border-primary/20",
};

const partnershipIcons = {
  corporate: Building2,
  training: GraduationCap,
  government: Globe,
  institutional: Briefcase,
};

const partnershipColors = {
  corporate: "gold",
  training: "terracotta",
  government: "forest",
  institutional: "primary",
};

const Partners = () => {
  const { t } = useLocale();

  const partnershipTypes = ["corporate", "training", "government", "institutional"];

  const impactStats = [
    { value: "50K+", label: t("home.impact.metrics.scholarships") },
    { value: "54+", label: t("home.impact.metrics.chapters") },
    { value: "100+", label: t("home.impact.metrics.partners") },
    { value: "$2M+", label: "Programs Funded" },
  ];

  return (
    <>
      <Helmet>
        <title>{t("home.partnerships.title")} - SCEF</title>
        <meta 
          name="description" 
          content={t("home.partnerships.body")} 
        />
        <meta name="keywords" content="SCEF partnership, education CSR Africa, training partner, government education partnership" />
        <link rel="canonical" href="https://scef.org/partners" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  <Handshake className="w-4 h-4" />
                  {t("home.partnerships.title")}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  {t("home.partnerships.title")}
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-8">
                  {t("home.partnerships.body")}
                </p>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/partners/inquiry">
                    <Handshake className="w-5 h-5" />
                    {t("home.partnerships.ctaCsr")}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-16 bg-card border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-display font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CRS Partners Section - CMS Driven */}
          <CRSPartnersSection />

          {/* Partnership Types */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("home.partnerships.title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("home.partnerships.body")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {partnershipTypes.map((type) => {
                  const Icon = partnershipIcons[type as keyof typeof partnershipIcons];
                  const color = partnershipColors[type as keyof typeof partnershipColors];
                  const colors = colorClasses[color as keyof typeof colorClasses];
                  
                  return (
                    <div
                      key={type}
                      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="p-8">
                        <div className={`w-14 h-14 rounded-xl ${colors} border flex items-center justify-center mb-6`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                          {t(`partners.types.${type}.title`)}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {t(`partners.types.${type}.description`)}
                        </p>
                        <ul className="space-y-3 mb-6">
                          {[0, 1, 2, 3].map((idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                              {t(`partners.types.${type}.benefits.${idx}`)}
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" asChild>
                          <Link to={`/partners/${type}`}>
                            {t(`partners.types.${type}.cta`)}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Partner */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {t("home.partnerships.title")}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    {t("home.partnerships.body")}
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-gold shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">{t("governance.bgeo.metrics.trust")}</h4>
                        <p className="text-sm text-muted-foreground">{t("governance.bgeo.metrics.trustDesc")}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-terracotta shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">{t("governance.bgeo.metrics.scale")}</h4>
                        <p className="text-sm text-muted-foreground">{t("governance.bgeo.metrics.scaleDesc")}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-forest shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">{t("home.impact.metrics.chapters")}</h4>
                        <p className="text-sm text-muted-foreground">{t("home.chaptersBlock.body")}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">{t("home.impact.title")}</h4>
                        <p className="text-sm text-muted-foreground">{t("home.impact.cta")}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-earth to-earth/90 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-african-pattern opacity-10" />
                  <div className="relative">
                    <h3 className="font-display text-2xl font-bold text-cream mb-6">
                      {t("home.partnerships.ctaCsr")}
                    </h3>
                    <p className="text-cream/80 mb-8">
                      {t("home.partnerships.body")}
                    </p>
                    <div className="space-y-4">
                      <Button variant="hero" className="w-full" size="lg" asChild>
                        <Link to="/partners/inquiry">
                          {t("home.partnerships.ctaRequest")}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="heroOutline" className="w-full" size="lg" asChild>
                        <Link to="/contact">
                          {t("footer.contact")}
                        </Link>
                      </Button>
                    </div>
                  </div>
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

export default Partners;

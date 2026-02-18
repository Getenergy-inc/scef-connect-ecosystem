import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { 
  Shield, Users, Building2, Globe, ArrowRight, CheckCircle2, 
  FileText, Mail, Phone, Crown, UserCircle, HeartHandshake
} from "lucide-react";
import { GovernanceProfileSection } from "@/components/governance/GovernanceProfileSection";
import { EmailDirectory } from "@/components/contact/EmailDirectory";

const colorClasses = {
  gold: "bg-scef-gold/25 text-scef-gold-dark border-scef-gold/40",
  terracotta: "bg-terracotta/15 text-terracotta border-terracotta/30",
  forest: "bg-forest/15 text-forest border-forest/30",
  primary: "bg-primary/15 text-primary border-primary/30",
};

const layerIcons = {
  bot: Shield,
  boa: Users,
  bod: Building2,
  lcps: Globe,
};

const layerColors = {
  bot: "gold",
  boa: "terracotta",
  bod: "forest",
  lcps: "primary",
};


const Governance = () => {
  const { t } = useLocale();

  const governanceLayers = [
    { id: "bot", level: 1 },
    { id: "boa", level: 2 },
    { id: "bod", level: 3 },
    { id: "lcps", level: 4 },
  ];




  const policyKeys = [
    "constitution",
    "ethics",
    "financial",
    "antiCorruption",
    "conflict",
    "whistleblower",
  ];

  return (
    <>
      <Helmet>
        <title>{t("governance.hero.title")} - SCEF | BGEO Division</title>
        <meta 
          name="description" 
          content={t("governance.hero.subtitle")} 
        />
        <meta name="keywords" content="SCEF governance, BGEO, Board of Trustees, education governance Africa, institutional oversight" />
        <link rel="canonical" href="https://scef.org/governance" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section id="top" className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  <Shield className="w-4 h-4" />
                  {t("governance.hero.badge")}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  {t("governance.hero.title").split('.')[0]}. <span className="text-gradient-gold">{t("governance.hero.title").split('.')[1]}</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-8">
                  {t("governance.hero.subtitle")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#bot" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    {t("governance.hero.anchors.bot")}
                  </a>
                  <a href="#boa" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    {t("governance.hero.anchors.boa")}
                  </a>
                  <a href="#bod" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    {t("governance.hero.anchors.bod")}
                  </a>
                  <a href="#lcps" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    {t("governance.hero.anchors.lcps")}
                  </a>
                  <a href="#management" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    {t("governance.hero.anchors.management")}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* BGEO Division Overview */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                      {t("governance.bgeo.title").split(' ')[0]} <span className="text-gradient-gold">{t("governance.bgeo.title").split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {t("governance.bgeo.body")}
                    </p>
                    <div className="space-y-3">
                      {[0, 1, 2, 3].map((idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-gold" />
                          <span className="text-foreground">{t(`governance.bgeo.points.${idx}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-background rounded-2xl border border-border p-8">
                    <h3 className="font-display text-xl font-bold text-foreground mb-4">{t("governance.bgeo.whyTitle")}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {t("governance.bgeo.whyBody")}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-display font-bold text-gold">{t("governance.bgeo.metrics.trust")}</div>
                        <p className="text-xs text-muted-foreground">{t("governance.bgeo.metrics.trustDesc")}</p>
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold text-terracotta">{t("governance.bgeo.metrics.scale")}</div>
                        <p className="text-xs text-muted-foreground">{t("governance.bgeo.metrics.scaleDesc")}</p>
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold text-forest">{t("governance.bgeo.metrics.continuity")}</div>
                        <p className="text-xs text-muted-foreground">{t("governance.bgeo.metrics.continuityDesc")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Executive Leadership - Now using database profiles */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Executive <span className="text-gradient-gold">Leadership</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  SCEF's executive structure ensures strategic direction, governance compliance, and member representation at the highest levels.
                </p>
              </div>
            </div>
          </section>

          {/* Governance Layers */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("governance.layers.title").split(' ').slice(0, 2).join(' ')} <span className="text-gradient-gold">{t("governance.layers.title").split(' ').slice(2).join(' ')}</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("governance.layers.subtitle")}
                </p>
              </div>

              <div className="space-y-8">
                {governanceLayers.map((layer) => {
                  const Icon = layerIcons[layer.id as keyof typeof layerIcons];
                  const color = layerColors[layer.id as keyof typeof layerColors];
                  const colors = colorClasses[color as keyof typeof colorClasses];
                  
                  return (
                    <div
                      key={layer.level}
                      id={layer.id}
                      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow scroll-mt-24"
                    >
                      <div className="grid lg:grid-cols-3 gap-0">
                        {/* Header */}
                        <div className="p-8 lg:p-10 flex items-start gap-6">
                          <div className="flex flex-col items-center">
                            <div className={`w-16 h-16 rounded-xl ${colors} border flex items-center justify-center mb-3`}>
                              <Icon className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground">{t("governance.layers.level")} {layer.level}</span>
                          </div>
                          <div>
                            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                              {t(`governance.layers.${layer.id}.title`)}
                            </h3>
                            <span className="inline-block px-3 py-1 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                              {t(`governance.layers.${layer.id}.count`)}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border">
                          <p className="text-muted-foreground leading-relaxed">
                            {t(`governance.layers.${layer.id}.description`)}
                          </p>
                        </div>

                        {/* Responsibilities */}
                        <div className="p-8 lg:p-10 bg-muted/30 border-t lg:border-t-0 lg:border-l border-border">
                          <h4 className="font-semibold text-foreground mb-4">{t("governance.layers.keyResponsibilities")}</h4>
                          <ul className="space-y-2">
                            {[0, 1, 2, 3].map((idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                {t(`governance.layers.${layer.id}.responsibilities.${idx}`)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Leadership Profiles - Board of Trustees */}
          <GovernanceProfileSection 
            boardType="bot"
            title="Board of Trustees"
            subtitle="Our fiduciary oversight body ensuring organizational integrity"
          />

          {/* Leadership Profiles - Board of Advisors */}
          <GovernanceProfileSection 
            boardType="boa"
            title="Board of Advisors"
            subtitle="Expert advisors providing specialized guidance"
          />

          {/* Leadership Profiles - Board of Directors */}
          <GovernanceProfileSection 
            boardType="bod"
            title="Board of Directors"
            subtitle="Regional operational governance leaders"
          />

          {/* Leadership Profiles - Local Chapter Presidents */}
          <GovernanceProfileSection 
            boardType="lcp"
            title="Local Chapter Presidents"
            subtitle="Country-level leadership driving local impact"
          />

          {/* Management Team Profiles from Database */}
          <section id="management" className="py-20 bg-card scroll-mt-24">
            <div className="container mx-auto px-4">
              <GovernanceProfileSection 
                boardType="management"
                title="Meet the Team"
                subtitle="The professionals leading our day-to-day operations"
              />
            </div>
          </section>

          {/* Endorsement Letters */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Endorsement <span className="text-gradient-gold">Letters</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Official endorsements from partner organizations affirming SCEF's mission and governance standards.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <a
                    href="/assets/endorsements/csacefa-lagos-endorsement.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-scef-gold/15 border border-scef-gold/30 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-scef-gold" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        CSACEFA Lagos Endorsement
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Civil Society Action Coalition on Education For All (CSACEFA) Lagos State chapter officially endorses SCEF's education standards mission.
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        View PDF <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </a>

                  <a
                    href="/assets/endorsements/csacefa-lagos-endorsement-2.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-card rounded-xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        CSACEFA Lagos Endorsement (Page 2)
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Continuation of the official endorsement detailing CSACEFA's commitment to collaborate with SCEF on education reform initiatives.
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        View PDF <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Policies & Documents */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {t("governance.policies.title").split(' ')[0]} & <span className="text-gradient-gold">{t("governance.policies.title").split(' ').slice(-1)}</span>
                  </h2>
                  <p className="text-muted-foreground">
                    {t("governance.policies.subtitle")}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {policyKeys.map((key) => (
                    <div key={key} className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors">
                      <FileText className="w-8 h-8 text-gold mb-3" />
                      <h3 className="font-semibold text-foreground mb-1">{t(`governance.policies.items.${key}.title`)}</h3>
                      <p className="text-sm text-muted-foreground">{t(`governance.policies.items.${key}.desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Leadership */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {t("governance.contact.title")}
                  </h2>
                  <p className="text-muted-foreground">
                    {t("governance.contact.subtitle")}
                  </p>
                </div>
                
                <EmailDirectory 
                  variant="full" 
                  showCategories={["executive", "general", "partnerships", "hr", "programs", "operations"]} 
                />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-to-br from-earth to-earth/90 relative overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                {t("governance.cta.title")}
              </h2>
              <p className="text-cream/80 max-w-2xl mx-auto mb-8">
                {t("governance.cta.subtitle")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/partners">
                    {t("governance.cta.ctaPartner")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/donate">
                    {t("governance.cta.ctaDonate")}
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/local-chapters">
                    {t("governance.cta.ctaChapter")}
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

export default Governance;

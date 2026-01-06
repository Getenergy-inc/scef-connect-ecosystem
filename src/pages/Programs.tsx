import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { ArrowRight, Award, BookOpen, Home, Heart, Accessibility, Globe, Library, ExternalLink } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import heroImage from "@/assets/hero-programs.jpg";

const programIcons = {
  nesa: Award,
  eduaid: BookOpen,
  rmsa: Home,
  womenGirls: Heart,
  specialNeeds: Accessibility,
  eoa: Globe,
  elibrary: Library,
};

const programLinks = {
  nesa: "/programs/nesa-africa",
  eduaid: "/programs/eduaid-africa",
  rmsa: "/programs/rebuild-my-school-africa",
  womenGirls: "/programs/women-girls-education",
  specialNeeds: "/programs/special-needs-education",
  eoa: "/programs/digital-learning",
  elibrary: "/programs/elibrary-nigeria",
};

const Programs = () => {
  const { t } = useLocale();

  const programKeys = ["nesa", "eduaid", "rmsa", "womenGirls", "specialNeeds", "eoa", "elibrary"];

  return (
    <>
      <Helmet>
        <title>{t("home.programs.title")} - SCEF</title>
        <meta 
          name="description" 
          content={t("about.programs.intro")} 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <OptimizedImage src={heroImage} alt="SCEF Programs - African students graduating" className="absolute inset-0 w-full h-full" imgClassName="opacity-30" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-scef-blue/80 to-scef-blue/95" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-scef-gold text-sm mb-6">
                  <BookOpen className="w-4 h-4" />
                  {t("home.programs.title")}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t("about.programs.title")}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  {t("about.programs.intro")}
                </p>
              </div>
            </div>
          </section>

          {/* External Platforms Section */}
          <section className="py-16 bg-scef-blue/5 border-y-2 border-border">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {t("home.eoa.title")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("home.eoa.body")}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* eLibrary Nigeria */}
                <a
                  href="https://www.elibrarynigeria.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl border-2 border-border p-8 hover:border-scef-blue/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-scef-blue/10 border-2 border-scef-blue/20 flex items-center justify-center mb-6">
                    <Library className="w-7 h-7 text-scef-blue" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors flex items-center gap-2">
                    eLibrary Nigeria
                    <ExternalLink className="w-4 h-4 text-scef-gold" />
                  </h3>
                  <p className="text-sm text-scef-gold font-medium mb-4">elibrarynigeria.com.ng</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {t("about.programs.cards.eoa")}
                  </p>
                </a>

                {/* NESA Africa */}
                <a
                  href="https://nesa.africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl border-2 border-border p-8 hover:border-scef-blue/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-scef-blue/10 border-2 border-scef-blue/20 flex items-center justify-center mb-6">
                    <Award className="w-7 h-7 text-scef-blue" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors flex items-center gap-2">
                    NESA Africa
                    <ExternalLink className="w-4 h-4 text-scef-gold" />
                  </h3>
                  <p className="text-sm text-scef-gold font-medium mb-4">nesa.africa</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {t("about.programs.cards.nesa")}
                  </p>
                </a>

                {/* EduAid Africa */}
                <a
                  href="https://eduaid.africa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl border-2 border-border p-8 hover:border-scef-blue/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-scef-blue/10 border-2 border-scef-blue/20 flex items-center justify-center mb-6">
                    <BookOpen className="w-7 h-7 text-scef-blue" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors flex items-center gap-2">
                    EduAid Africa
                    <ExternalLink className="w-4 h-4 text-scef-gold" />
                  </h3>
                  <p className="text-sm text-scef-gold font-medium mb-4">eduaid.africa</p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {t("about.programs.cards.eduaid")}
                  </p>
                </a>
              </div>
            </div>
          </section>

          {/* Programs Grid */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {t("home.programs.ctaAll")}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("about.programs.intro")}
                </p>
              </div>
              <div className="space-y-8">
                {programKeys.map((programKey) => {
                  const Icon = programIcons[programKey as keyof typeof programIcons];
                  const link = programLinks[programKey as keyof typeof programLinks];
                  
                  return (
                    <div
                      key={programKey}
                      className="group bg-card rounded-2xl border-2 border-border overflow-hidden hover:border-scef-blue/30 hover:shadow-lg transition-all duration-500"
                    >
                      <div className="grid lg:grid-cols-3 gap-0">
                        {/* Content */}
                        <div className="lg:col-span-2 p-8 lg:p-12">
                          <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-xl bg-scef-blue/10 border-2 border-scef-blue/20 flex items-center justify-center shrink-0">
                              <Icon className="w-8 h-8 text-scef-blue" />
                            </div>
                            <div className="flex-1">
                              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                                {t(`programs.items.${programKey}.title`)}
                              </h2>
                              <p className="text-sm font-medium text-scef-gold mb-4">
                                {t(`programs.items.${programKey}.subtitle`)}
                              </p>
                              <p className="text-muted-foreground leading-relaxed mb-6">
                                {t(`about.programs.cards.${programKey}`)}
                              </p>
                              <Link
                                to={link}
                                className="inline-flex items-center gap-2 text-scef-blue font-semibold hover:gap-3 transition-all"
                              >
                                {t("home.programs.ctaAll")}
                                <ArrowRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                        
                        {/* Features */}
                        <div className="bg-scef-blue/5 p-8 lg:p-12 flex flex-col justify-center border-l-2 border-border">
                          <h3 className="font-display font-semibold text-foreground mb-4">{t("programs.items." + programKey + ".title")}</h3>
                          <p className="text-sm text-muted-foreground">
                            {t(`about.programs.cards.${programKey}`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Programs;

import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/ui/reveal";
import { useLocale } from "@/contexts/LocaleContext";
import { BarChart3, ArrowRight, MapPin, Users, Award, BookOpen } from "lucide-react";

const impactMetrics = [
  { value: "54+", label: "Regions Reached", icon: MapPin },
  { value: "15K+", label: "Learners Impacted", icon: Users },
  { value: "500+", label: "Partners & Sponsors", icon: Award },
  { value: "300+", label: "Recognized Leaders", icon: BookOpen },
];

const focusAreas = [
  {
    title: "Standards & Recognition",
    description: "NESA-Africa benchmarks excellence across regional education systems.",
    href: "/programs/nesa-africa",
  },
  {
    title: "Access & Scholarships",
    description: "EduAid-Africa expanding learning access through scholarships and grants.",
    href: "/programs/eduaid-africa",
  },
  {
    title: "Infrastructure",
    description: "Rebuild My School Africa restoring schools across underserved communities.",
    href: "/programs/rebuild-my-school-africa",
  },
  {
    title: "Digital Learning",
    description: "Education Online Africa scaling certified learning continent-wide.",
    href: "/programs/digital-learning",
  },
];

const CaseStudies = () => {
  const { isRTL } = useLocale();

  return (
    <>
      <Helmet>
        <title>Impact & Case Studies — SCEF</title>
        <meta name="description" content="SCEF's measurable impact across 54+ African regions through education programs, partnerships, and standards." />
      </Helmet>

      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />

        <main>
          {/* HERO */}
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-scef-blue-darker via-scef-blue to-scef-blue" />
            <div className="absolute top-1/4 right-0 w-[36rem] h-[36rem] bg-scef-gold/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-scef-gold text-xs font-semibold uppercase tracking-widest mb-8">
                  <BarChart3 className="w-3.5 h-3.5" />
                  Impact
                </div>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
                  Real progress. <span className="text-scef-gold">Real reach.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
                  Measurable outcomes from SCEF programs and partners across 54+ African regions.
                </p>
              </div>
            </div>
          </section>

          {/* METRICS BAND */}
          <section className="py-16 md:py-20 bg-background border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {impactMetrics.map((m, i) => (
                  <Reveal key={m.label} delay={i * 80}>
                    <div className="text-center p-6 rounded-2xl bg-card border border-border hover:border-scef-gold/40 transition-all duration-500 hover:shadow-lg">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-scef-gold/10 flex items-center justify-center">
                        <m.icon className="w-6 h-6 text-scef-gold" />
                      </div>
                      <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1 tracking-tight">
                        {m.value}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                        {m.label}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* FOCUS AREAS */}
          <section className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4">
              <Reveal>
                <div className="text-center mb-14 max-w-2xl mx-auto">
                  <p className="text-xs uppercase tracking-widest text-scef-gold font-semibold mb-3">Focus areas</p>
                  <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                    Where we deliver impact
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Four pillars driving measurable change across the continent.
                  </p>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {focusAreas.map((area, i) => (
                  <Reveal key={area.title} delay={i * 80}>
                    <Link
                      to={area.href}
                      className="group block p-8 rounded-2xl bg-card border border-border hover:border-scef-gold/40 hover:shadow-xl transition-all duration-500 h-full"
                    >
                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-scef-blue transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-muted-foreground mb-5 leading-relaxed">
                        {area.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-scef-blue text-sm font-semibold group-hover:gap-3 transition-all">
                        Explore program
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* DETAILED CASE STUDIES NOTE */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <Reveal>
                <p className="text-xs uppercase tracking-widest text-scef-gold font-semibold mb-3">Coming Soon</p>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Detailed case studies in production
                </h2>
                <p className="text-muted-foreground mb-8">
                  Documented stories from chapters and partners — verified, sourced, and reporting in progress.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button asChild className="bg-scef-blue text-white hover:bg-scef-blue-dark">
                    <Link to="/programs">
                      Explore Programs
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/about">About SCEF</Link>
                  </Button>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CaseStudies;

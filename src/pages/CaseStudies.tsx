import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";

const CaseStudies = () => {
  const { isRTL } = useLocale();

  return (
    <>
      <Helmet>
        <title>Case Studies - SCEF</title>
        <meta name="description" content="Explore SCEF's impact through detailed case studies of education transformation across Africa." />
      </Helmet>
      
      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />
        
        <main>
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-scef-pattern opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6">
                  <BookOpen className="w-4 h-4" />
                  Case Studies
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  Case Studies
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Detailed documentation of SCEF's impact across programs, chapters, and communities.
                </p>
              </div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-muted/50 rounded-2xl p-12 border border-border">
                  <div className="w-20 h-20 rounded-full bg-scef-gold/10 flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-scef-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Case Studies Coming Soon
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                    We're documenting impactful stories from our programs and chapters. Check back soon for detailed case studies.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light">
                      <Link to="/programs">
                        Explore Programs
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/about">
                        About SCEF
                      </Link>
                    </Button>
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

export default CaseStudies;
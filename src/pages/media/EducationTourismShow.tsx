import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { MapPin, Play, Calendar, Users, ArrowRight, Plane } from "lucide-react";

const EducationTourismShow = () => {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>Education Tourism Show - Santos Media | SCEF</title>
        <meta name="description" content="Education Tourism Show - Exploring educational destinations, exchange programs, and learning journeys across Africa." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 border-2 border-black">
                  <Plane className="w-4 h-4" />
                  Santos Media
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Education Tourism Show
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Explore educational destinations, exchange programs, study abroad opportunities, and learning journeys across Africa and beyond.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    <Play className="w-4 h-4" />
                    Watch Episodes
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <MapPin className="w-4 h-4" />
                    Explore Destinations
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Destinations */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
                Featured Educational Destinations
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {['Nigeria', 'Kenya', 'South Africa', 'Ghana'].map((country) => (
                  <div key={country} className="bg-card rounded-2xl border-2 border-black overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-scef-blue to-scef-gold/50 flex items-center justify-center">
                      <MapPin className="w-12 h-12 text-white" />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-display font-bold text-foreground">{country}</h3>
                      <p className="text-sm text-muted-foreground">Coming Soon</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Feature Your Institution
              </h2>
              <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                <Link to="/contact">
                  Partner With Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default EducationTourismShow;
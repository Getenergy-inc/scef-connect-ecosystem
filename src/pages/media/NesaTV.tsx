import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Tv, Play, Calendar, Users, ArrowRight } from "lucide-react";

const NesaTV = () => {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>NESA Africa TV - Santos Media | SCEF</title>
        <meta name="description" content="NESA Africa TV - Broadcasting education excellence across Africa. Watch award ceremonies, documentaries, and educational content." />
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
                  <Tv className="w-4 h-4" />
                  Santos Media
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  NESA Africa TV
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Broadcasting education excellence across Africa. Watch NESA Award ceremonies, education documentaries, and inspiring stories of impact.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    <Play className="w-4 h-4" />
                    Watch Live
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Calendar className="w-4 h-4" />
                    View Schedule
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Video Placeholder */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="aspect-video max-w-4xl mx-auto bg-card rounded-2xl border-2 border-black flex items-center justify-center">
                <div className="text-center">
                  <Tv className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-muted-foreground">Live Stream Coming Soon</p>
                  <p className="text-sm text-muted-foreground">Subscribe to get notified</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Join Our Media Team
              </h2>
              <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                <Link to="/volunteer/media">
                  <Users className="w-4 h-4" />
                  Become a Media Volunteer
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

export default NesaTV;
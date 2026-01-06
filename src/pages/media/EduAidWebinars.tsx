import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Video, Play, Calendar, Users, ArrowRight, Mic } from "lucide-react";

const EduAidWebinars = () => {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>EduAid Webinars & Podcast - Santos Media | SCEF</title>
        <meta name="description" content="EduAid Africa Webinars & Podcast - Expert discussions on education, scholarships, and African development." />
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
                  <Video className="w-4 h-4" />
                  Santos Media
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  EduAid Webinars & Podcast
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Expert discussions on education policy, scholarship opportunities, skill development, and African development stories.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    <Play className="w-4 h-4" />
                    Watch Latest
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Mic className="w-4 h-4" />
                    Listen to Podcast
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Content Grid */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
                Upcoming Webinars
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-2xl border-2 border-black overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Video className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-muted-foreground mb-2">Coming Soon</p>
                      <h3 className="font-display font-bold text-foreground mb-2">Webinar Title {i}</h3>
                      <p className="text-sm text-muted-foreground">Expert discussion on education topics.</p>
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
                Be a Guest Speaker
              </h2>
              <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                <Link to="/contact">
                  Apply to Speak
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

export default EduAidWebinars;
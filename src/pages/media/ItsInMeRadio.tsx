import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Radio, Play, Calendar, Users, ArrowRight, Headphones } from "lucide-react";

const ItsInMeRadio = () => {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>It's In Me Radio - Santos Media | SCEF</title>
        <meta name="description" content="It's In Me Radio - Inspiring Africa through the airwaves. Listen to education talks, motivational content, and community stories." />
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
                  <Radio className="w-4 h-4" />
                  Santos Media
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  It's In Me Radio
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Inspiring Africa through the airwaves. Listen to education talks, motivational content, success stories, and community voices.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    <Headphones className="w-4 h-4" />
                    Listen Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Calendar className="w-4 h-4" />
                    Show Schedule
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Audio Placeholder */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto bg-card rounded-2xl border-2 border-black p-8 text-center">
                <Radio className="w-16 h-16 mx-auto mb-4 text-scef-gold" />
                <p className="text-lg font-medium text-foreground mb-2">Live Broadcast Coming Soon</p>
                <p className="text-sm text-muted-foreground mb-6">Subscribe to get notified when we go live</p>
                <Button className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black">
                  Subscribe for Updates
                </Button>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Share Your Story on Radio
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

export default ItsInMeRadio;
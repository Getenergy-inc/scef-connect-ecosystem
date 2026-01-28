import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Play, Tv, Award, Calendar, ArrowRight } from "lucide-react";
import { ROUTES } from "@/routes";

const NesaTv = () => {
  return (
    <>
      <Helmet>
        <title>NESA Africa TV | SCEF Media</title>
        <meta name="description" content="Watch NESA Africa TV - Your destination for educational excellence content, award ceremonies, and inspiring stories from across Africa." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-scef-blue via-scef-blue-dark to-scef-dark py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <Tv className="w-10 h-10 text-scef-gold" />
                  <span className="text-scef-gold font-semibold">SCEF Media</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  NESA Africa TV
                </h1>
                <p className="text-lg text-white/70 mb-8 max-w-2xl">
                  Your premier destination for educational excellence content. Watch award ceremonies, 
                  documentaries, success stories, and inspiring content from across Africa.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-scef-gold text-scef-dark hover:bg-scef-gold-dark">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Live
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <Link to={ROUTES.NESA_AWARDS_TV}>
                      <Award className="w-4 h-4 mr-2" />
                      Awards Shows
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Featured Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold mb-8">Featured Shows</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-scef-gold/20 to-scef-blue/20 flex items-center justify-center">
                    <Award className="w-16 h-16 text-scef-gold" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold mb-2">NESA Awards Ceremony</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Watch the prestigious NESA Awards recognizing excellence in African education.
                    </p>
                    <Button variant="link" className="p-0" asChild>
                      <Link to={ROUTES.NESA_AWARDS_TV}>
                        Watch Now <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <Play className="w-16 h-16 text-purple-500" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold mb-2">Success Stories</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Inspiring stories of educators and students transforming education across Africa.
                    </p>
                    <Button variant="link" className="p-0">
                      Coming Soon <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center">
                    <Calendar className="w-16 h-16 text-green-500" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold mb-2">EduAid Webinars</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Educational webinars and expert discussions on African education.
                    </p>
                    <Button variant="link" className="p-0" asChild>
                      <Link to={ROUTES.EDUAID_WEBINARS}>
                        Watch Now <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold mb-4">
                Stay Connected
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Subscribe to NESA Africa TV for the latest content, live events, and exclusive behind-the-scenes access.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to={ROUTES.CALENDAR}>
                    <Calendar className="w-4 h-4 mr-2" />
                    View Schedule
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={ROUTES.MEDIA}>
                    Back to Media Hub
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

export default NesaTv;

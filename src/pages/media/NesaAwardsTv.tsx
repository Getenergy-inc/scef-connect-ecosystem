import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Award, Crown, Star, Gem, Play, ArrowRight } from "lucide-react";
import { ROUTES } from "@/routes";

const awardShows = [
  {
    title: "Platinum Recognition Show",
    description: "The highest tier of NESA recognition celebrating exceptional contributions to African education.",
    icon: Crown,
    color: "from-slate-300 to-slate-500",
    href: ROUTES.NESA_AWARDS_PLATINUM,
  },
  {
    title: "Africa Icon Blue Garnet Awards",
    description: "Honoring visionary leaders who have transformed the educational landscape across the continent.",
    icon: Gem,
    color: "from-blue-400 to-indigo-600",
    href: ROUTES.NESA_AWARDS_AFRICA_ICON,
  },
  {
    title: "Gold Certificate Awards",
    description: "Recognizing outstanding achievement and excellence in educational practice and innovation.",
    icon: Star,
    color: "from-yellow-400 to-amber-500",
    href: ROUTES.NESA_AWARDS_GOLD_CERTIFICATE,
  },
  {
    title: "Blue Garnet Gala",
    description: "The prestigious annual celebration bringing together Africa's finest educators and institutions.",
    icon: Award,
    color: "from-scef-gold to-scef-gold-dark",
    href: ROUTES.NESA_AWARDS_BLUE_GARNET_GALA,
  },
];

const NesaAwardsTv = () => {
  return (
    <>
      <Helmet>
        <title>NESA Awards TV | SCEF Media</title>
        <meta name="description" content="Watch NESA Awards TV - Coverage of Africa's most prestigious education awards ceremonies and recognition events." />
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
                  <Award className="w-10 h-10 text-scef-gold" />
                  <span className="text-scef-gold font-semibold">SCEF Media</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  NESA Awards TV
                </h1>
                <p className="text-lg text-white/70 mb-8 max-w-2xl">
                  Your exclusive destination for NESA Awards coverage. Watch live ceremonies, 
                  relive memorable moments, and celebrate excellence in African education.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-scef-gold text-scef-dark hover:bg-scef-gold-dark">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Latest
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                    <Link to={ROUTES.CALENDAR}>
                      View Schedule
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Award Shows Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold mb-8 text-center">
                Award Shows & Ceremonies
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {awardShows.map((show) => (
                  <Card key={show.title} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className={`h-32 bg-gradient-to-r ${show.color} flex items-center justify-center`}>
                      <show.icon className="w-16 h-16 text-white/90" />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-display text-xl">{show.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{show.description}</p>
                      <Button variant="link" className="p-0" asChild>
                        <Link to={show.href}>
                          Watch Episodes <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* CTA */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold mb-4">
                Be Part of the Excellence
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Nominate deserving educators and institutions for the next NESA Awards.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to={ROUTES.NOMINATE}>
                    Submit Nomination
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to={ROUTES.VOTE}>
                    Vote Now
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

export default NesaAwardsTv;

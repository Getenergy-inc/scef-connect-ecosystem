import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Play, ArrowLeft, Calendar } from "lucide-react";
import { ROUTES } from "@/routes";

const NesaAwardsBlueGarnetGala = () => {
  return (
    <>
      <Helmet>
        <title>Blue Garnet Gala | NESA Awards TV</title>
        <meta name="description" content="Watch the Blue Garnet Gala - The prestigious annual celebration bringing together Africa's finest educators and institutions." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-scef-gold via-amber-600 to-orange-700 py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <Link 
                to={ROUTES.NESA_AWARDS_TV}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to NESA Awards TV
              </Link>
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Blue Garnet Gala
                </h1>
                <p className="text-lg text-white/90 mb-8 max-w-2xl">
                  The prestigious annual celebration bringing together Africa's finest educators, 
                  institutions, and stakeholders for an unforgettable evening of recognition.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-white text-scef-dark hover:bg-white/90">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Past Galas
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10" asChild>
                    <Link to={ROUTES.CALENDAR}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Next Event
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl font-bold mb-4">The Premier Event</h2>
                <p className="text-muted-foreground mb-8">
                  The Blue Garnet Gala is the crown jewel of the NESA calendar, where 
                  educational excellence is celebrated with grandeur and distinction. 
                  Coverage of past and upcoming galas will be available here.
                </p>
                <Button variant="outline" asChild>
                  <Link to={ROUTES.NESA_AWARDS_TV}>
                    Explore Other Shows
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

export default NesaAwardsBlueGarnetGala;

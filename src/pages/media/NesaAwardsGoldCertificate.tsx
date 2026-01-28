import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, Play, ArrowLeft } from "lucide-react";
import { ROUTES } from "@/routes";

const NesaAwardsGoldCertificate = () => {
  return (
    <>
      <Helmet>
        <title>Gold Certificate Awards | NESA Awards TV</title>
        <meta name="description" content="Watch the Gold Certificate Awards - Recognizing outstanding achievement and excellence in educational practice and innovation." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-yellow-600 via-amber-700 to-orange-800 py-20 overflow-hidden">
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
                  <Star className="w-12 h-12 text-yellow-300" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Gold Certificate Awards
                </h1>
                <p className="text-lg text-white/70 mb-8 max-w-2xl">
                  Recognizing outstanding achievement and excellence in educational practice, 
                  innovation, and dedication to student success across Africa.
                </p>
                <Button size="lg" className="bg-white text-amber-800 hover:bg-white/90">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Episodes
                </Button>
              </div>
            </div>
          </section>
          
          {/* Content */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl font-bold mb-4">Coming Soon</h2>
                <p className="text-muted-foreground mb-8">
                  Episodes showcasing Gold Certificate recipients and their incredible 
                  contributions to education are being prepared.
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

export default NesaAwardsGoldCertificate;

import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Award, CheckCircle, ArrowRight, Star, Users, Building2 } from "lucide-react";

const Endorse = () => {
  const { t } = useLocale();

  return (
    <>
      <Helmet>
        <title>Endorse SCEF - Lend Your Support</title>
        <meta name="description" content="Endorse SCEF and our programs. Show your support for education transformation across Africa." />
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
                  <Award className="w-4 h-4" />
                  Endorsement
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Endorse SCEF & Our Programs
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Lend your voice and credibility to Africa's education transformation. Your endorsement helps us reach more partners, donors, and communities.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    <Link to="/contact">
                      Submit Endorsement
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Who Can Endorse */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
                Who Can Endorse?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-card rounded-2xl p-6 border-2 border-black text-center">
                  <Building2 className="w-12 h-12 mx-auto mb-4 text-scef-blue" />
                  <h3 className="font-display font-bold text-foreground mb-2">Institutions</h3>
                  <p className="text-sm text-muted-foreground">Universities, schools, and education bodies</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border-2 border-black text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-scef-gold" />
                  <h3 className="font-display font-bold text-foreground mb-2">Leaders</h3>
                  <p className="text-sm text-muted-foreground">Government officials, educators, and advocates</p>
                </div>
                <div className="bg-card rounded-2xl p-6 border-2 border-black text-center">
                  <Star className="w-12 h-12 mx-auto mb-4 text-scef-blue" />
                  <h3 className="font-display font-bold text-foreground mb-2">Public Figures</h3>
                  <p className="text-sm text-muted-foreground">Celebrities, influencers, and thought leaders</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Ready to Add Your Voice?
              </h2>
              <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                <Link to="/contact">
                  Contact Us to Endorse
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

export default Endorse;
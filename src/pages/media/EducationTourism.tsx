import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Plane, MapPin, GraduationCap, Camera, Calendar } from "lucide-react";
import { ROUTES } from "@/routes";

const EducationTourism = () => {
  return (
    <>
      <Helmet>
        <title>Education Tourism Show | SCEF Media</title>
        <meta name="description" content="Watch the Education Tourism Show - Exploring educational institutions and learning destinations across Africa." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-teal-800 via-emerald-900 to-scef-dark py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <Plane className="w-10 h-10 text-scef-gold" />
                  <span className="text-scef-gold font-semibold">SCEF Media</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Education Tourism Show
                </h1>
                <p className="text-lg text-white/70 mb-8 max-w-2xl">
                  Explore the best educational institutions, learning destinations, and 
                  academic experiences across Africa. Your guide to educational excellence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-scef-gold text-scef-dark hover:bg-scef-gold-dark">
                    <Camera className="w-4 h-4 mr-2" />
                    Watch Latest
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <MapPin className="w-4 h-4 mr-2" />
                    Explore Destinations
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Featured Destinations */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold mb-8">Featured Destinations</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {["Nigeria", "Kenya", "South Africa"].map((country) => (
                  <Card key={country} className="group overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                      <GraduationCap className="w-16 h-16 text-teal-500/50" />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{country}</span>
                      </div>
                      <h3 className="font-display text-lg font-semibold mb-2">
                        Top Universities & Schools
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Discover leading educational institutions and their unique offerings.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Explore {country}
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
                Plan Your Educational Journey
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Whether you're a student looking for the right school or an educator exploring 
                partnership opportunities, we're here to guide you.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to={ROUTES.CONTACT}>
                    Get Guidance
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

export default EducationTourism;

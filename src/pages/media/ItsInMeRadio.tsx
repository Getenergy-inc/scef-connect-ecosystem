import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Radio, Play, Headphones, Mic2, Calendar } from "lucide-react";
import { ROUTES } from "@/routes";

const ItsInMeRadio = () => {
  return (
    <>
      <Helmet>
        <title>It's In Me Radio | SCEF Media</title>
        <meta name="description" content="Listen to It's In Me Radio - Inspiring audio content celebrating potential, education, and African success stories." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-scef-dark py-20 overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <Radio className="w-10 h-10 text-scef-gold" />
                  <span className="text-scef-gold font-semibold">SCEF Media</span>
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  It's In Me Radio
                </h1>
                <p className="text-lg text-white/70 mb-8 max-w-2xl">
                  Inspiring audio content that celebrates the potential within every African. 
                  Listen to success stories, educational discussions, and motivational content.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-scef-gold text-scef-dark hover:bg-scef-gold-dark">
                    <Play className="w-4 h-4 mr-2" />
                    Listen Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    <Headphones className="w-4 h-4 mr-2" />
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Featured Episodes */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold mb-8">Latest Episodes</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((episode) => (
                  <Card key={episode} className="group overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                      <Mic2 className="w-20 h-20 text-purple-500/50" />
                    </div>
                    <CardContent className="p-6">
                      <p className="text-xs text-muted-foreground mb-2">Episode {episode}</p>
                      <h3 className="font-display text-lg font-semibold mb-2">
                        Inspiring Educational Journeys
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Stories of educators and students who overcame challenges to achieve excellence.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Play Episode
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
          
          {/* About Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl font-bold mb-4">
                  About the Show
                </h2>
                <p className="text-muted-foreground mb-8">
                  "It's In Me Radio" is dedicated to amplifying the voices of African educators, 
                  students, and changemakers. Through inspiring interviews, educational discussions, 
                  and motivational content, we celebrate the potential that exists within every individual.
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
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ItsInMeRadio;

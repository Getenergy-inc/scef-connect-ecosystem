import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Users, Search, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

const JoinChapter = () => {
  const { t } = useLocale();
  const [searchCountry, setSearchCountry] = useState("");

  return (
    <>
      <Helmet>
        <title>Join a Local Chapter - SCEF</title>
        <meta name="description" content="Join a SCEF local chapter in your country. Connect with changemakers and participate in education impact projects." />
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
                  <Users className="w-4 h-4" />
                  {t('nav.chapters')}
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t('home.chaptersBlock.title')}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  {t('home.chaptersBlock.body')}
                </p>
              </div>
            </div>
          </section>

          {/* Search */}
          <section className="py-12 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto">
                <Label htmlFor="country-search" className="text-lg font-medium mb-4 block text-center">
                  Find Your Country Chapter
                </Label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    id="country-search"
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    placeholder="Search by country name..."
                    className="pl-12 py-6 text-lg border-2 border-black"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Chapter List Placeholder */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {['Nigeria', 'Kenya', 'Ghana', 'South Africa', 'Tanzania', 'Uganda'].map((country) => (
                  <div key={country} className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <MapPin className="w-6 h-6 text-scef-gold" />
                      <h3 className="font-display font-bold text-foreground">{country} Chapter</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Join the growing community of education advocates in {country}.</p>
                    <Button size="sm" className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black">
                      Join Chapter
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Don't See Your Country?
              </h2>
              <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                <Link to="/local-chapters/create">
                  Create a New Chapter
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

export default JoinChapter;
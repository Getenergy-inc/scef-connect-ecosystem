import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");

  const quickLinks = [
    { title: "NESA Africa Program", href: "/programs/nesa-africa" },
    { title: "EduAid Africa Scholarships", href: "/programs/eduaid-africa" },
    { title: "Join as a Member", href: "/membership" },
    { title: "Local Chapters", href: "/local-chapters" },
    { title: "Donate to SCEF", href: "/donate" },
    { title: "About SCEF", href: "/about" },
  ];

  return (
    <>
      <Helmet>
        <title>Search | SCEF</title>
        <meta name="description" content="Search Santos Creations Educational Foundation website" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-8">
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-8 text-center">
                Search SCEF
              </h1>
              
              <div className="max-w-2xl mx-auto">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search programs, chapters, resources..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="pl-12 h-14 text-lg bg-white"
                    />
                  </div>
                  <Button size="lg" className="h-14 px-8 bg-scef-gold text-scef-blue hover:bg-scef-gold-dark font-semibold">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">Quick Links</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="p-4 bg-card rounded-xl border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all"
                  >
                    <span className="text-foreground font-medium">{link.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Search;

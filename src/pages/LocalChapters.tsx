import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Users, Search, Filter, Globe, Building, Wifi, ArrowRight, Plus } from "lucide-react";

const chapters = [
  {
    id: 1,
    name: "Lagos Chapter",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    members: 1250,
    type: "Physical",
    image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=600",
    description: "Our flagship chapter serving the Greater Lagos metropolitan area.",
  },
  {
    id: 2,
    name: "Nairobi Chapter",
    location: "Nairobi, Kenya",
    country: "Kenya",
    members: 890,
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600",
    description: "A thriving community of educators and advocates in East Africa.",
  },
  {
    id: 3,
    name: "Accra Chapter",
    location: "Accra, Ghana",
    country: "Ghana",
    members: 650,
    type: "Physical",
    image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=600",
    description: "Leading education transformation in West Africa.",
  },
  {
    id: 4,
    name: "Johannesburg Chapter",
    location: "Johannesburg, South Africa",
    country: "South Africa",
    members: 720,
    type: "Physical",
    image: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=600",
    description: "Bridging educational gaps in Southern Africa.",
  },
  {
    id: 5,
    name: "Cairo Chapter",
    location: "Cairo, Egypt",
    country: "Egypt",
    members: 430,
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600",
    description: "Connecting North African education advocates.",
  },
  {
    id: 6,
    name: "Online Global",
    location: "Worldwide",
    country: "Global",
    members: 3200,
    type: "Online",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
    description: "Join from anywhere in the world. Our digital-first community.",
  },
];

const typeIcons = {
  Physical: Building,
  Hybrid: Globe,
  Online: Wifi,
};

const typeColors = {
  Physical: "bg-scef-blue text-white border-2 border-black",
  Hybrid: "bg-scef-gold text-scef-blue border-2 border-black",
  Online: "bg-white text-scef-blue border-2 border-black",
};

const LocalChapters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredChapters = chapters.filter((chapter) => {
    const matchesSearch = 
      chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || chapter.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Helmet>
        <title>Local Chapters - SCEF | Join a Community Near You</title>
        <meta 
          name="description" 
          content="Find and join a SCEF local chapter near you. Connect with education advocates in your community or join our global online chapter." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 border-2 border-black">
                  <MapPin className="w-4 h-4" />
                  Local Chapters
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Join a <span className="text-scef-gold">Chapter</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Connect with like-minded individuals in your community. Find a local chapter or start one of your own.
                </p>
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 bg-background border-b-2 border-black sticky top-16 z-40">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by city, country, or chapter name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border-2 border-black focus:border-scef-blue focus:outline-none transition-colors"
                  />
                </div>
                
                {/* Type Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-card border-2 border-black focus:border-scef-blue focus:outline-none transition-colors"
                  >
                    <option value="all">All Types</option>
                    <option value="Physical">Physical</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Online">Online</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Chapters Grid */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredChapters.map((chapter) => {
                  const TypeIcon = typeIcons[chapter.type as keyof typeof typeIcons];
                  return (
                    <div
                      key={chapter.id}
                      className="group bg-card rounded-2xl overflow-hidden border-2 border-black hover:shadow-xl transition-all duration-500"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={chapter.image}
                          alt={chapter.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-scef-blue/80 to-transparent" />
                        
                        {/* Type Badge */}
                        <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${typeColors[chapter.type as keyof typeof typeColors]}`}>
                          <TypeIcon className="w-3 h-3" />
                          {chapter.type}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                          {chapter.name}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <MapPin className="w-4 h-4 text-scef-gold" />
                          {chapter.location}
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {chapter.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-scef-blue text-sm font-medium">
                            <Users className="w-4 h-4" />
                            {chapter.members.toLocaleString()} members
                          </div>
                          <Button className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black" size="sm">
                            Join
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredChapters.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No chapters found matching your search.</p>
                  <Button className="border-2 border-black" variant="outline" onClick={() => { setSearchQuery(""); setTypeFilter("all"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Create Chapter CTA */}
          <section className="py-16 bg-scef-blue border-t-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl font-bold text-white mb-4">
                  Start a Chapter in <span className="text-scef-gold">Your Area</span>
                </h2>
                <p className="text-white/70 mb-8">
                  Don't see a chapter near you? Become a founding member and lead the education transformation movement in your community.
                </p>
                <Button className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold" size="lg" asChild>
                  <Link to="/local-chapters/create">
                    <Plus className="w-5 h-5" />
                    Start a New Chapter
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

export default LocalChapters;

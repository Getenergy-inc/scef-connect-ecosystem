import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { 
  MapPin, Users, Search, Filter, Globe, Building, Wifi, 
  ArrowRight, Plus, CheckCircle2, TrendingUp
} from "lucide-react";

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
  Physical: "bg-forest text-cream",
  Hybrid: "bg-terracotta text-cream",
  Online: "bg-gold text-earth",
};

const chapterPathway = [
  {
    stage: "Online",
    description: "Start with a virtual presence and build your community",
    requirements: ["5 founding members", "Approved leadership", "Completed training"],
  },
  {
    stage: "Hybrid",
    description: "Combine online and occasional in-person meetings",
    requirements: ["25+ active members", "Regular activities", "Local partnerships"],
  },
  {
    stage: "Physical",
    description: "Full in-person operations with dedicated space",
    requirements: ["100+ members", "Sustainable funding", "Registered locally"],
  },
];

const Chapters = () => {
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
        <title>Chapters - SCEF | Local Execution, Continental Governance</title>
        <meta 
          name="description" 
          content="SCEF operates compliant local chapters across Africa—online, hybrid, and physical—ensuring community ownership under strong institutional oversight." 
        />
        <meta name="keywords" content="SCEF chapters, local chapters Africa, education community, join chapter" />
        <link rel="canonical" href="https://scef.org/chapters" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  <Globe className="w-4 h-4" />
                  Local Chapters
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Local Execution, <span className="text-gradient-gold">Continental Governance</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-8">
                  SCEF operates compliant local chapters across Africa—online, hybrid, and physical—ensuring community ownership under strong institutional oversight.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/chapters/join">
                      <Users className="w-5 h-5" />
                      Join a Chapter
                    </Link>
                  </Button>
                  <Button variant="heroOutline" size="lg" asChild>
                    <Link to="/chapters/create">
                      <Plus className="w-5 h-5" />
                      Create Online Chapter
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Chapter Pathway */}
          <section className="py-16 bg-card border-b border-border">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                  Chapter <span className="text-gradient-gold">Pathway</span>
                </h2>
                <p className="text-muted-foreground">Start online, grow to physical presence</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {chapterPathway.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="bg-background rounded-2xl p-6 border border-border h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          {index + 1}
                        </div>
                        <h3 className="font-display text-lg font-bold text-foreground">{stage.stage}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{stage.description}</p>
                      <ul className="space-y-2">
                        {stage.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle2 className="w-3 h-3 text-primary" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {index < chapterPathway.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <TrendingUp className="w-8 h-8 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Filters */}
          <section className="py-8 bg-background sticky top-16 z-40 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by city, country, or chapter name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-muted-foreground" />
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors"
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
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredChapters.map((chapter) => {
                  const TypeIcon = typeIcons[chapter.type as keyof typeof typeIcons];
                  return (
                    <div
                      key={chapter.id}
                      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-500"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={chapter.image}
                          alt={chapter.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                        
                        <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${typeColors[chapter.type as keyof typeof typeColors]}`}>
                          <TypeIcon className="w-3 h-3" />
                          {chapter.type}
                        </span>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {chapter.name}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                          <MapPin className="w-4 h-4" />
                          {chapter.location}
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {chapter.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-primary text-sm font-medium">
                            <Users className="w-4 h-4" />
                            {chapter.members.toLocaleString()} members
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/chapters/${chapter.id}`}>
                              Join
                              <ArrowRight className="w-3 h-3" />
                            </Link>
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
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setTypeFilter("all"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Create Chapter CTA */}
          <section className="py-20 bg-earth">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                Start a Chapter in <span className="text-gradient-gold">Your Area</span>
              </h2>
              <p className="text-cream/70 max-w-2xl mx-auto mb-8">
                Don't see a chapter near you? Become a founding member and lead the education transformation movement in your community. Start online—upgrade to physical as you grow.
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/chapters/create">
                  <Plus className="w-5 h-5" />
                  Create an Online Chapter
                  <ArrowRight className="w-5 h-5" />
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

export default Chapters;

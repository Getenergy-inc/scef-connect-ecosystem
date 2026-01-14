import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MapPin, Users, Search, Filter, Globe, Building, Wifi, ArrowRight, Plus, UserPlus, Award, GraduationCap, BookOpen, Heart, Hammer, Accessibility, Monitor } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";

interface Chapter {
  id: number;
  name: string;
  location: string;
  country: string;
  region: string;
  members: number;
  type: "Physical" | "Hybrid" | "Online";
  image: string;
  description: string;
}

const chapters: Chapter[] = [
  // NORTH AFRICA
  {
    id: 1,
    name: "Egypt Online Chapter",
    location: "Egypt",
    country: "Egypt",
    region: "North Africa",
    members: 430,
    type: "Online",
    image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=600",
    description: "Connecting Egyptian education advocates virtually across the nation.",
  },
  {
    id: 2,
    name: "Morocco Online Chapter",
    location: "Morocco",
    country: "Morocco",
    region: "North Africa",
    members: 340,
    type: "Online",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600",
    description: "Connecting Moroccan education advocates across the diaspora.",
  },
  // WEST AFRICA
  {
    id: 3,
    name: "Nigeria Online Chapter",
    location: "Nigeria",
    country: "Nigeria",
    region: "West Africa",
    members: 1250,
    type: "Online",
    image: "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=600",
    description: "Connect with Nigerian education advocates from anywhere in the world.",
  },
  {
    id: 4,
    name: "Ghana Online Chapter",
    location: "Ghana",
    country: "Ghana",
    region: "West Africa",
    members: 650,
    type: "Online",
    image: "https://images.unsplash.com/photo-1596005554384-d293674c91d7?w=600",
    description: "Leading education transformation in Ghana digitally.",
  },
  {
    id: 5,
    name: "Senegal Hybrid Chapter",
    location: "Dakar, Senegal",
    country: "Senegal",
    region: "West Africa",
    members: 280,
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1589804148813-a5c98a8dd1ee?w=600",
    description: "Blending in-person gatherings with digital engagement across Senegal.",
  },
  // EAST AFRICA
  {
    id: 6,
    name: "Kenya Online Chapter",
    location: "Kenya",
    country: "Kenya",
    region: "East Africa",
    members: 890,
    type: "Online",
    image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600",
    description: "A thriving online community of East African educators and advocates.",
  },
  {
    id: 7,
    name: "Tanzania Online Chapter",
    location: "Tanzania",
    country: "Tanzania",
    region: "East Africa",
    members: 380,
    type: "Online",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600",
    description: "Building education networks across Tanzania online.",
  },
  {
    id: 8,
    name: "Ethiopia Online Chapter",
    location: "Ethiopia",
    country: "Ethiopia",
    region: "East Africa",
    members: 290,
    type: "Online",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600",
    description: "Supporting Ethiopian education initiatives through digital engagement.",
  },
  {
    id: 9,
    name: "Rwanda Online Chapter",
    location: "Rwanda",
    country: "Rwanda",
    region: "East Africa",
    members: 210,
    type: "Online",
    image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600",
    description: "Empowering Rwandan educators with online resources and community.",
  },
  // SOUTHERN AFRICA
  {
    id: 10,
    name: "South Africa Online Chapter",
    location: "South Africa",
    country: "South Africa",
    region: "Southern Africa",
    members: 720,
    type: "Online",
    image: "https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=600",
    description: "Bridging educational gaps in Southern Africa through digital connection.",
  },
  {
    id: 11,
    name: "Zimbabwe Hybrid Chapter",
    location: "Harare, Zimbabwe",
    country: "Zimbabwe",
    region: "Southern Africa",
    members: 185,
    type: "Hybrid",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600",
    description: "Combining local meetups with online collaboration for Zimbabwean educators.",
  },
  // CENTRAL AFRICA
  {
    id: 12,
    name: "Cameroon Online Chapter",
    location: "Cameroon",
    country: "Cameroon",
    region: "Central Africa",
    members: 175,
    type: "Online",
    image: "https://images.unsplash.com/photo-1589293837372-4f1aaf7bc3b3?w=600",
    description: "Uniting Cameroonian education advocates through digital platforms.",
  },
  // DIASPORA
  {
    id: 13,
    name: "United Kingdom Chapter",
    location: "London, UK",
    country: "United Kingdom",
    region: "Diaspora",
    members: 560,
    type: "Online",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600",
    description: "UK-based Africans supporting education transformation back home.",
  },
  {
    id: 14,
    name: "United States Chapter",
    location: "USA",
    country: "United States",
    region: "Diaspora",
    members: 820,
    type: "Online",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600",
    description: "American diaspora community driving African education initiatives.",
  },
  {
    id: 15,
    name: "Canada Chapter",
    location: "Toronto, Canada",
    country: "Canada",
    region: "Diaspora",
    members: 320,
    type: "Online",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600",
    description: "Canadian-based advocates for African educational development.",
  },
  // PHYSICAL (10%)
  {
    id: 16,
    name: "Lagos Physical Chapter",
    location: "Lagos, Nigeria",
    country: "Nigeria",
    region: "West Africa",
    members: 520,
    type: "Physical",
    image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600",
    description: "Our flagship in-person chapter serving the Greater Lagos metropolitan area.",
  },
];

const regions = [
  { id: "all", label: "All Regions" },
  { id: "North Africa", label: "North Africa" },
  { id: "West Africa", label: "West Africa" },
  { id: "East Africa", label: "East Africa" },
  { id: "Central Africa", label: "Central Africa" },
  { id: "Southern Africa", label: "Southern Africa" },
  { id: "Diaspora", label: "Diaspora" },
];

const programs = [
  {
    id: "nesa-africa",
    name: "NESA Africa",
    description: "National Education Standards Assessment - Setting benchmarks for quality education",
    icon: Award,
    color: "bg-blue-100 text-blue-600",
    href: "/programs/nesa-africa",
  },
  {
    id: "eduaid-africa",
    name: "EduAid Africa",
    description: "Educational support and resources for underserved communities",
    icon: GraduationCap,
    color: "bg-green-100 text-green-600",
    href: "/programs/eduaid-africa",
  },
  {
    id: "rebuild-my-school-africa",
    name: "Rebuild My School Africa",
    description: "Infrastructure development for schools across Africa",
    icon: Hammer,
    color: "bg-orange-100 text-orange-600",
    href: "/programs/rebuild-my-school-africa",
  },
  {
    id: "women-girls-education",
    name: "Women & Girls Education",
    description: "Empowering women and girls through education access",
    icon: Heart,
    color: "bg-pink-100 text-pink-600",
    href: "/programs/women-girls-education",
  },
  {
    id: "special-needs-education",
    name: "Special Needs Education",
    description: "Inclusive education for learners with special needs",
    icon: Accessibility,
    color: "bg-purple-100 text-purple-600",
    href: "/programs/special-needs-education",
  },
  {
    id: "education-online-africa",
    name: "Education Online Africa",
    description: "Digital learning platforms and resources for Africa",
    icon: Monitor,
    color: "bg-cyan-100 text-cyan-600",
    href: "/programs/digital-learning",
  },
  {
    id: "elibrary-nigeria",
    name: "eLibrary Nigeria",
    description: "Digital library resources for Nigerian learners and educators",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-600",
    href: "/programs/elibrary-nigeria",
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
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);

  const handleJoinClick = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setJoinDialogOpen(true);
  };

  const filteredChapters = chapters.filter((chapter) => {
    const matchesSearch = 
      chapter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chapter.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || chapter.type === typeFilter;
    const matchesRegion = regionFilter === "all" || chapter.region === regionFilter;
    return matchesSearch && matchesType && matchesRegion;
  });

  // Group chapters by region for display
  const groupedChapters = regions
    .filter(r => r.id !== "all")
    .map(region => ({
      region: region.label,
      chapters: filteredChapters.filter(c => c.region === region.id)
    }))
    .filter(group => group.chapters.length > 0);

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
              <div className="flex flex-col gap-4">
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
                  
                  {/* Region Filter */}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <select
                      value={regionFilter}
                      onChange={(e) => setRegionFilter(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-card border-2 border-black focus:border-scef-blue focus:outline-none transition-colors"
                    >
                      {regions.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.label}
                        </option>
                      ))}
                    </select>
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

                {/* Stats Summary */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Wifi className="w-4 h-4" />
                    {chapters.filter(c => c.type === "Online").length} Online
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {chapters.filter(c => c.type === "Hybrid").length} Hybrid
                  </span>
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {chapters.filter(c => c.type === "Physical").length} Physical
                  </span>
                  <span className="text-scef-blue font-medium">
                    {chapters.reduce((sum, c) => sum + c.members, 0).toLocaleString()} total members
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Chapters by Region */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 space-y-12">
              {groupedChapters.map((group) => (
                <div key={group.region}>
                  {/* Region Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      group.region === "Diaspora" 
                        ? "bg-purple-100 text-purple-600" 
                        : "bg-scef-blue/10 text-scef-blue"
                    }`}>
                      {group.region === "Diaspora" ? (
                        <Globe className="w-5 h-5" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-foreground">
                        {group.region}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {group.chapters.length} chapter{group.chapters.length !== 1 ? 's' : ''} • {group.chapters.reduce((sum, c) => sum + c.members, 0).toLocaleString()} members
                      </p>
                    </div>
                  </div>

                  {/* Chapters Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {group.chapters.map((chapter) => {
                      const TypeIcon = typeIcons[chapter.type];
                      return (
                        <div
                          key={chapter.id}
                          className="group bg-card rounded-2xl overflow-hidden border-2 border-black hover:shadow-xl transition-all duration-500"
                        >
                          {/* Image */}
                          <div className="relative h-44 overflow-hidden">
                            <img
                              src={chapter.image}
                              alt={chapter.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-scef-blue/80 to-transparent" />
                            
                            {/* Type Badge */}
                            <span className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${typeColors[chapter.type]}`}>
                              <TypeIcon className="w-3 h-3" />
                              {chapter.type}
                            </span>
                          </div>
                          
                          {/* Content */}
                          <div className="p-5">
                            <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                              {chapter.name}
                            </h3>
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                              <MapPin className="w-4 h-4 text-scef-gold" />
                              {chapter.location}
                            </div>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {chapter.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-scef-blue text-sm font-medium">
                                <Users className="w-4 h-4" />
                                {chapter.members.toLocaleString()}
                              </div>
                              <Button 
                                className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black" 
                                size="sm"
                                onClick={() => handleJoinClick(chapter)}
                              >
                                Join
                                <ArrowRight className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              {filteredChapters.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No chapters found matching your filters.</p>
                  <Button 
                    className="border-2 border-black" 
                    variant="outline" 
                    onClick={() => { 
                      setSearchQuery(""); 
                      setTypeFilter("all"); 
                      setRegionFilter("all"); 
                    }}
                  >
                    Clear All Filters
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

      {/* Join Chapter Dialog */}
      <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              Join {selectedChapter?.name}
            </DialogTitle>
            <DialogDescription>
              Choose how you'd like to join this chapter. You can become a general SCEF member or join as a program ambassador.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 pt-4">
            {/* Option 1: Direct SCEF Membership */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-scef-blue" />
                Join as SCEF Member
              </h3>
              <Card className="border-2 border-black hover:border-scef-blue transition-colors cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold group-hover:text-scef-blue transition-colors">
                        General Membership
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Join the SCEF community directly and participate in all chapter activities
                      </p>
                    </div>
                    <Button 
                      className="bg-scef-blue text-white hover:bg-scef-blue/90 border-2 border-black"
                      asChild
                    >
                      <Link to={`/chapters/join-online?country=${encodeURIComponent(selectedChapter?.country || '')}`}>
                        Join SCEF
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-black hover:border-scef-gold transition-colors cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold group-hover:text-scef-gold transition-colors">
                        SCEF Ambassador
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Become an official SCEF Ambassador and lead initiatives in your community
                      </p>
                    </div>
                    <Button 
                      className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black"
                      asChild
                    >
                      <Link to={`/get-involved/ambassador?country=${encodeURIComponent(selectedChapter?.country || '')}`}>
                        Apply
                        <Award className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Option 2: Program Ambassador */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Award className="w-5 h-5 text-scef-gold" />
                Join as Program Ambassador
              </h3>
              <p className="text-sm text-muted-foreground">
                Champion a specific SCEF program in your chapter and drive focused impact
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {programs.map((program) => {
                  const ProgramIcon = program.icon;
                  return (
                    <Card 
                      key={program.id} 
                      className="border-2 border-black hover:border-scef-blue transition-colors cursor-pointer group"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${program.color}`}>
                            <ProgramIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm group-hover:text-scef-blue transition-colors">
                              {program.name}
                            </h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {program.description}
                            </p>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-7 text-xs border-2 border-black"
                              asChild
                            >
                              <Link to={`/get-involved/ambassador?program=${program.id}&country=${encodeURIComponent(selectedChapter?.country || '')}`}>
                                Join as Ambassador
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
              <p>
                <strong>Note:</strong> Ambassador roles require an application review. You'll receive a confirmation 
                once your application has been approved by the SCEF team.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocalChapters;

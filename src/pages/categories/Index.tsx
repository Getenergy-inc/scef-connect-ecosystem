import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StageBanner } from "@/components/nesa/StageBanner";
import { CategoryCard } from "@/components/nesa/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Building2, 
  Search,
  Award,
  Layers,
  Trophy,
  Star,
  Filter
} from "lucide-react";
import {
  getAllCategories,
  getAfricaRegionalCategories,
  getNigeriaCategories,
  getCategoriesByTier,
  TOTAL_CATEGORIES,
  TOTAL_COMPETITIVE_SUBCATEGORIES,
  AFRICA_REGIONS,
  type NESACategory,
  type TierApplicability,
} from "@/config/nesaCategoriesConfig";

const tierFilters: { key: keyof TierApplicability; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'gold', label: 'Gold', icon: Trophy },
  { key: 'blueGarnet', label: 'Blue Garnet', icon: Award },
  { key: 'platinum', label: 'Platinum', icon: Star },
  { key: 'icon', label: 'Icon', icon: Star },
];

export default function CategoriesIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTierFilter, setActiveTierFilter] = useState<keyof TierApplicability | null>(null);

  const allCategories = getAllCategories();
  const africaCategories = getAfricaRegionalCategories();
  const nigeriaCategories = getNigeriaCategories();

  const filterCategories = (categories: NESACategory[]) => {
    let filtered = categories;
    
    if (activeTierFilter) {
      filtered = filtered.filter(cat => cat.tiers[activeTierFilter]);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(cat => 
        cat.name.toLowerCase().includes(query) ||
        cat.description.toLowerCase().includes(query) ||
        cat.baseSubcategories.some(sub => sub.name.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  return (
    <>
      <Helmet>
        <title>Award Categories | NESA-Africa 2025</title>
        <meta name="description" content="Explore the 17 official NESA-Africa 2025 award categories recognizing excellence in education across Africa." />
      </Helmet>

      <Header />
      <StageBanner />

      <main className="min-h-screen bg-gradient-to-b from-scef-dark to-slate-900">
        {/* Hero Section */}
        <section className="relative py-16 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <Badge className="mb-4 bg-scef-gold/20 text-scef-gold border-scef-gold/50">
              NESA-Africa 2025
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Award Categories
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              {TOTAL_CATEGORIES} official categories recognizing excellence in education across Africa and Nigeria
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-scef-gold">{TOTAL_CATEGORIES}</div>
                <div className="text-sm text-white/60">Categories</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-scef-gold">{TOTAL_COMPETITIVE_SUBCATEGORIES}</div>
                <div className="text-sm text-white/60">Competitive Subcategories</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-scef-gold">{AFRICA_REGIONS.length}</div>
                <div className="text-sm text-white/60">African Regions</div>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="text"
                placeholder="Search categories or subcategories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </section>

        {/* Tier Filters */}
        <section className="py-4 px-4 border-b border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-white/60 shrink-0" />
              <span className="text-sm text-white/60 shrink-0">Filter by tier:</span>
              <Button
                variant={activeTierFilter === null ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTierFilter(null)}
                className={activeTierFilter === null ? "bg-scef-gold text-scef-dark" : "text-white/70"}
              >
                All
              </Button>
              {tierFilters.map(filter => (
                <Button
                  key={filter.key}
                  variant={activeTierFilter === filter.key ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTierFilter(filter.key)}
                  className={activeTierFilter === filter.key ? "bg-scef-gold text-scef-dark" : "text-white/70"}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="africa" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8 bg-white/10">
                <TabsTrigger value="africa" className="data-[state=active]:bg-scef-gold data-[state=active]:text-scef-dark">
                  <Globe className="w-4 h-4 mr-2" />
                  Africa First
                </TabsTrigger>
                <TabsTrigger value="nigeria" className="data-[state=active]:bg-scef-gold data-[state=active]:text-scef-dark">
                  <Building2 className="w-4 h-4 mr-2" />
                  Nigeria
                </TabsTrigger>
                <TabsTrigger value="all" className="data-[state=active]:bg-scef-gold data-[state=active]:text-scef-dark">
                  <Layers className="w-4 h-4 mr-2" />
                  All ({TOTAL_CATEGORIES})
                </TabsTrigger>
              </TabsList>

              {/* Africa First Tab */}
              <TabsContent value="africa">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Africa Regional Categories</h2>
                  <p className="text-white/60">
                    Categories spanning all 5 African regions: {AFRICA_REGIONS.join(", ")}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterCategories(africaCategories).map(category => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
                {filterCategories(africaCategories).length === 0 && (
                  <div className="text-center py-12 text-white/60">
                    No categories match your search criteria.
                  </div>
                )}
              </TabsContent>

              {/* Nigeria Tab */}
              <TabsContent value="nigeria">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Nigeria Categories</h2>
                  <p className="text-white/60">
                    Categories specific to Nigerian organizations, states, and institutions.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterCategories(nigeriaCategories).map(category => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
                {filterCategories(nigeriaCategories).length === 0 && (
                  <div className="text-center py-12 text-white/60">
                    No categories match your search criteria.
                  </div>
                )}
              </TabsContent>

              {/* All Categories Tab */}
              <TabsContent value="all">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">All {TOTAL_CATEGORIES} Categories</h2>
                  <p className="text-white/60">
                    Complete list of NESA-Africa 2025 award categories.
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterCategories(allCategories).map(category => (
                    <CategoryCard key={category.id} category={category} />
                  ))}
                </div>
                {filterCategories(allCategories).length === 0 && (
                  <div className="text-center py-12 text-white/60">
                    No categories match your search criteria.
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Participate?
            </h2>
            <p className="text-white/70 mb-8">
              Nominate deserving organizations or vote for your favorites in the competitive categories.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-scef-dark" asChild>
                <Link to="/nominate">Start Nomination</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/vote">Vote Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <a href="https://nesa.africa" target="_blank" rel="noopener noreferrer">
                  Visit NESA.africa
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

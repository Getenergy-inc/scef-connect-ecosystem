import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StageBanner } from "@/components/nesa/StageBanner";
import { CategoryCard } from "@/components/nesa/CategoryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Search,
  ArrowLeft,
  Globe
} from "lucide-react";
import {
  getNigeriaCategories,
  NIGERIA_ZONES,
} from "@/config/nesaCategoriesConfig";

export default function NigeriaCategories() {
  const [searchQuery, setSearchQuery] = useState("");
  const nigeriaCategories = getNigeriaCategories();

  const filteredCategories = searchQuery.trim()
    ? nigeriaCategories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.baseSubcategories.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : nigeriaCategories;

  const totalSubcategories = nigeriaCategories.reduce((sum, cat) => sum + cat.totalSubcategoryCount, 0);

  return (
    <>
      <Helmet>
        <title>Nigeria Award Categories | NESA-Africa 2025</title>
        <meta name="description" content="Explore NESA-Africa 2025 award categories specific to Nigerian organizations, states, and institutions." />
      </Helmet>

      <Header />
      <StageBanner />

      <main className="min-h-screen bg-gradient-to-b from-scef-dark to-slate-900">
        {/* Breadcrumb */}
        <section className="py-4 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-sm text-white/60">
              <Link to="/categories" className="hover:text-scef-gold transition-colors flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                All Categories
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white">Nigeria Categories</span>
            </nav>
          </div>
        </section>

        {/* Hero */}
        <section className="py-12 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 rounded-full mb-6">
              <Building2 className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Nigeria Focus</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Nigeria Award Categories
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
              Award categories recognizing Nigerian corporations, NGOs, media organizations, 
              states, and institutions leading in educational development.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-green-400">{nigeriaCategories.length}</div>
                <div className="text-sm text-white/60">Categories</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-green-400">{totalSubcategories}</div>
                <div className="text-sm text-white/60">Subcategories</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-4">
                <div className="text-3xl font-bold text-green-400">{NIGERIA_ZONES.length}</div>
                <div className="text-sm text-white/60">Geopolitical Zones</div>
              </div>
            </div>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="text"
                placeholder="Search Nigeria categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
            </div>
          </div>
        </section>

        {/* Geopolitical Zones Reference */}
        <section className="py-6 px-4 bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-sm font-semibold text-white/60 mb-3">Nigeria Geopolitical Zones</h3>
            <div className="flex flex-wrap gap-2">
              {NIGERIA_ZONES.map(zone => (
                <Badge key={zone} variant="outline" className="bg-white/5 text-white/80 border-white/20">
                  {zone}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(category => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
            
            {filteredCategories.length === 0 && (
              <div className="text-center py-12 text-white/60">
                No categories match your search. Try a different term.
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Explore All Regions
            </h2>
            <p className="text-white/70 mb-8">
              View Africa-wide categories spanning all 5 regions.
            </p>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/categories">
                <Globe className="w-5 h-5 mr-2" />
                View Africa Regional Categories
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

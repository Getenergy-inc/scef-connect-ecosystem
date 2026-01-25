import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StageBanner } from "@/components/nesa/StageBanner";
import { CategoryTierBadges } from "@/components/nesa/CategoryTierBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Globe, 
  Building2, 
  Landmark,
  Award,
  Layers,
  ChevronRight,
  Vote,
  FileEdit,
  Clock,
  CheckCircle2,
  Info
} from "lucide-react";
import {
  getCategoryBySlug,
  getExpandedSubcategories,
  formatScope,
  AFRICA_REGIONS,
  type NESACategory,
} from "@/config/nesaCategoriesConfig";
import { isVotingOpen, getCurrentPhase } from "@/config/nesaSeasonConfig";

const scopeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  NIGERIA: Building2,
  AFRICA_REGIONAL: Globe,
  INTERNATIONAL: Landmark,
  ICON: Award,
};

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  if (!category) {
    return <Navigate to="/categories" replace />;
  }

  const ScopeIcon = scopeIcons[category.scope] || Globe;
  const expandedSubcategories = getExpandedSubcategories(category);
  const votingStatus = isVotingOpen();
  const currentPhase = getCurrentPhase();

  // Determine CTA based on tier and phase
  const getCTAConfig = () => {
    if (category.tiers.icon) {
      return {
        primary: { label: 'Nominate for Icon', href: '/nominate?category=icon', icon: FileEdit },
        secondary: null,
        status: 'Jury selection only - no public voting',
      };
    }

    if (category.tiers.gold && category.tiers.blueGarnet) {
      const isGoldVotingOpen = votingStatus.gold;
      const isBlueGarnetVotingOpen = votingStatus.blueGarnet;

      if (isGoldVotingOpen) {
        return {
          primary: { label: 'Vote Now (Gold)', href: '/vote?stage=gold', icon: Vote },
          secondary: { label: 'Nominate', href: '/nominate', icon: FileEdit },
          status: 'Gold voting is OPEN',
        };
      }
      if (isBlueGarnetVotingOpen) {
        return {
          primary: { label: 'Vote Now (Blue Garnet)', href: '/vote?stage=blue-garnet', icon: Vote },
          secondary: null,
          status: 'Blue Garnet voting is OPEN',
        };
      }
      return {
        primary: { label: 'Nominate', href: '/nominate', icon: FileEdit },
        secondary: { label: 'View Timeline', href: '/calendar', icon: Clock },
        status: currentPhase ? `Current phase: ${currentPhase.name}` : 'Voting not yet open',
      };
    }

    // Platinum to Gold track
    return {
      primary: { label: 'Apply for Platinum', href: 'https://nesa.africa/platinum', icon: FileEdit },
      secondary: { label: 'Learn More', href: '/awards/platinum', icon: Info },
      status: 'Platinum certification available',
    };
  };

  const ctaConfig = getCTAConfig();

  return (
    <>
      <Helmet>
        <title>{category.name} | NESA-Africa 2025</title>
        <meta name="description" content={category.description} />
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
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{category.name}</span>
            </nav>
          </div>
        </section>

        {/* Hero */}
        <section className="py-12 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap items-start gap-4 mb-6">
              <Badge variant="outline" className="text-scef-gold border-scef-gold/50 text-lg px-3 py-1">
                Category #{category.categoryNumber}
              </Badge>
              <CategoryTierBadges tiers={category.tiers} />
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                <ScopeIcon className="w-3 h-3 mr-1" />
                {formatScope(category.scope)}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mb-8">
              {category.description}
            </p>

            {/* Status and CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-white/70">{ctaConfig.status}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-scef-dark" asChild>
                <Link to={ctaConfig.primary.href}>
                  <ctaConfig.primary.icon className="w-5 h-5 mr-2" />
                  {ctaConfig.primary.label}
                </Link>
              </Button>
              {ctaConfig.secondary && (
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to={ctaConfig.secondary.href}>
                    <ctaConfig.secondary.icon className="w-5 h-5 mr-2" />
                    {ctaConfig.secondary.label}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 px-4 bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-scef-gold">{category.totalSubcategoryCount}</div>
                <div className="text-sm text-white/60">Total Subcategories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{category.baseSubcategories.length}</div>
                <div className="text-sm text-white/60">Base Categories</div>
              </div>
              {category.isRegional && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{AFRICA_REGIONS.length}</div>
                  <div className="text-sm text-white/60">African Regions</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  {Object.values(category.tiers).filter(Boolean).length}
                </div>
                <div className="text-sm text-white/60">Award Tiers</div>
              </div>
            </div>
          </div>
        </section>

        {/* Selection Notes */}
        {category.selectionNotes && (
          <section className="py-6 px-4 bg-amber-500/10 border-b border-amber-500/20">
            <div className="max-w-7xl mx-auto flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-400 mb-1">Selection Notes</h3>
                <p className="text-white/80 text-sm">{category.selectionNotes}</p>
              </div>
            </div>
          </section>
        )}

        {/* Subcategories */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Layers className="w-6 h-6 text-scef-gold" />
              <h2 className="text-2xl font-bold text-white">
                Subcategories ({category.totalSubcategoryCount})
              </h2>
            </div>

            {category.isRegional ? (
              // Regional categories - group by region
              <div className="space-y-8">
                {AFRICA_REGIONS.map(region => (
                  <div key={region}>
                    <h3 className="text-lg font-semibold text-scef-gold mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      {region}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {category.baseSubcategories.map(sub => (
                        <Card key={`${region}-${sub.id}`} className="bg-white/5 border-white/10 hover:border-scef-gold/30 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-white">{sub.name}</h4>
                                <p className="text-sm text-white/60">{region}</p>
                              </div>
                              <Badge variant="outline" className="text-xs bg-white/5">
                                Competitive
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Non-regional categories
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.baseSubcategories.map(sub => (
                  <Card key={sub.id} className="bg-white/5 border-white/10 hover:border-scef-gold/30 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-white">{sub.name}</h4>
                          {sub.zone && (
                            <p className="text-sm text-white/60">Zone: {sub.zone}</p>
                          )}
                          {sub.description && (
                            <p className="text-sm text-white/60 mt-1">{sub.description}</p>
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs bg-white/5">
                          {category.tiers.gold ? 'Competitive' : 'Certified'}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Award Track Explanation */}
        <section className="py-12 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8">Award Track</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.tiers.platinum && (
                <Card className="bg-gradient-to-br from-gray-700/50 to-gray-800/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-gray-900" />
                      </div>
                      Platinum
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/70 text-sm">
                    Baseline NRC-screened certification with 1-year validity (renewable).
                  </CardContent>
                </Card>
              )}
              {category.tiers.gold && (
                <Card className="bg-gradient-to-br from-amber-700/50 to-amber-800/50 border-amber-600">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-amber-900" />
                      </div>
                      Gold
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/70 text-sm">
                    Competitive classification with 100% public voting. One winner per subcategory.
                  </CardContent>
                </Card>
              )}
              {category.tiers.blueGarnet && (
                <Card className="bg-gradient-to-br from-blue-800/50 to-blue-900/50 border-blue-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      Blue Garnet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/70 text-sm">
                    Elite award with 40% public vote + 60% jury selection. 9 winners total.
                  </CardContent>
                </Card>
              )}
              {category.tiers.icon && (
                <Card className="bg-gradient-to-br from-purple-700/50 to-indigo-800/50 border-purple-600">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                      Icon
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/70 text-sm">
                    Lifetime achievement award for individuals with transformational 20-year impact.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Back to Categories */}
        <section className="py-8 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link to="/categories">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Categories
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

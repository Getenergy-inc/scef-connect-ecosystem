import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Vote, 
  Users, 
  Calendar,
  Globe,
  ChevronRight,
  Building2,
  Tv,
  Smartphone,
  Newspaper,
  Radio,
  Factory,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StageBanner } from '@/components/nesa/StageBanner';
import { 
  competitiveCategories, 
  AFRICA_REGIONS,
  TOTAL_GOLD_SUBCATEGORIES,
  formatPhaseDate, 
  nesaPhases,
  isVotingOpen 
} from '@/config/nesaSeasonConfig';

const categoryIcons: Record<string, any> = {
  'csr-education-africa': Building2,
  'csr-education-nigeria': Building2,
  'edutech-africa': Smartphone,
  'media-education-nigeria': Tv,
  'ngo-education-nigeria': Users,
  'ngo-education-africa': Users,
  'stem-africa': Factory,
  'creative-arts-nigeria': Radio,
  'education-friendly-state': Briefcase,
};

export default function GoldAward() {
  const goldVoting = nesaPhases.find(p => p.id === 'gold_voting');
  const goldShow = nesaPhases.find(p => p.id === 'gold_show');
  const votingStatus = isVotingOpen();

  return (
    <>
      <Helmet>
        <title>Gold Certificate | NESA-Africa 2025</title>
        <meta name="description" content="Competitive Gold Certificate awards across 9 categories and 135 subcategories. Public voting only - no judges. Advancing to Blue Garnet consideration." />
      </Helmet>

      <Header />
      <StageBanner />

      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 py-20 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-white" />
                <span className="text-white font-medium">NESA-Africa 2025 Awards</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Gold <span className="text-amber-200">Certificate</span>
              </h1>
              <p className="text-xl text-white/90 mb-4 max-w-2xl mx-auto">
                The competitive stage of NESA recognition. {TOTAL_GOLD_SUBCATEGORIES} subcategories across 9 major categories, determined by public voting.
              </p>
              <p className="text-lg text-amber-200 font-semibold mb-8">
                100% Public Voting • No Judges • Region-First Competition
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {votingStatus.gold ? (
                  <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50" asChild>
                    <Link to="/vote?stage=gold">
                      <Vote className="w-5 h-5 mr-2" />
                      Vote Now
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50" asChild>
                    <Link to="/nominate">
                      <Award className="w-5 h-5 mr-2" />
                      Nominate for Gold
                    </Link>
                  </Button>
                )}
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/media/nesa-awards-tv/gold-certificate">
                    <Calendar className="w-5 h-5 mr-2" />
                    Gold Show: {goldShow ? formatPhaseDate(goldShow.startDate) : 'May 17, 2026'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Voting Timeline */}
        <section className="py-12 bg-amber-100/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <p className="text-sm text-amber-700 font-medium uppercase tracking-wide mb-1">Voting Opens</p>
                <p className="text-2xl font-bold text-gray-800">
                  {goldVoting ? formatPhaseDate(goldVoting.startDate) : 'April 10, 2026'}
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-amber-500 hidden md:block" />
              <div className="text-center">
                <p className="text-sm text-amber-700 font-medium uppercase tracking-wide mb-1">Voting Closes</p>
                <p className="text-2xl font-bold text-gray-800">
                  {goldVoting ? formatPhaseDate(goldVoting.endDate) : 'May 16, 2026'}
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-amber-500 hidden md:block" />
              <div className="text-center">
                <p className="text-sm text-amber-700 font-medium uppercase tracking-wide mb-1">Winners Announced</p>
                <p className="text-2xl font-bold text-gray-800">
                  {goldShow ? formatPhaseDate(goldShow.startDate) : 'May 17, 2026'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Public Voting Only */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Why Public Voting Only?
              </h2>
              <p className="text-gray-600">
                Gold Certificate awards use <strong>100% public voting</strong> with no jury influence. This ensures maximum transparency and gives the public direct power in recognizing excellence. Jury involvement is reserved exclusively for the Blue Garnet final stage.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Democratic Process</h3>
                  <p className="text-sm text-gray-600">Every vote counts equally. No weighted scoring or expert override.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Vote className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Anti-Fraud Controls</h3>
                  <p className="text-sm text-gray-600">Advanced verification prevents vote manipulation and ensures integrity.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Globe className="w-12 h-12 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-800 mb-2">Region-First Logic</h3>
                  <p className="text-sm text-gray-600">Regional categories ensure fair representation across all of Africa.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 9 Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                9 Competitive Categories
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {TOTAL_GOLD_SUBCATEGORIES} total subcategories across regional and national competitions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitiveCategories.map((category) => {
                const IconComponent = categoryIcons[category.id] || Award;
                return (
                  <Card key={category.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                          <CardTitle className="text-base leading-tight">{category.name}</CardTitle>
                          <CardDescription className="text-xs mt-1">{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {category.isRegional && (
                          <Badge variant="outline" className="text-xs bg-amber-50">
                            <Globe className="w-3 h-3 mr-1" />
                            {category.regions?.length} Regions
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {category.totalSubcategoryCount} Subcategories
                        </Badge>
                      </div>
                      {category.isRegional && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {AFRICA_REGIONS.map((region) => (
                            <span key={region} className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                              {region}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Path to Blue Garnet */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <ChevronRight className="w-8 h-8 text-amber-400" />
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Gold Winners Advance to Blue Garnet
                </h3>
                <p className="text-gray-600 mb-4">
                  All Gold Certificate winners automatically qualify for Blue Garnet consideration. The Gold Winners TV Show on {goldShow ? formatPhaseDate(goldShow.startDate) : 'May 17, 2026'} opens the Blue Garnet voting portal.
                </p>
                <p className="text-sm text-amber-700 font-medium">
                  Blue Garnet uses 40% public voting + 60% jury selection for final awards.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-amber-500 to-yellow-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Be Part of NESA Gold</h2>
            <p className="text-amber-100 mb-8 max-w-xl mx-auto">
              Nominate deserving organizations or prepare to vote when the polls open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50" asChild>
                <Link to="/nominate">Submit Nomination</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/awards/blue-garnet">Explore Blue Garnet →</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

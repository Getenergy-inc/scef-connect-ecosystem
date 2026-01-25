import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Star, 
  Users, 
  Calendar,
  Globe,
  BookOpen,
  Wrench,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StageBanner } from '@/components/nesa/StageBanner';
import { formatPhaseDate, nesaPhases } from '@/config/nesaSeasonConfig';
import { iconSubcategories } from '@/config/nesaCategoriesConfig';

const iconIcons = {
  philanthropy: Heart,
  literary: BookOpen,
  technical: Wrench,
};

export default function IconAward() {
  const iconShow = nesaPhases.find(p => p.id === 'icon_show');
  const iconNominations = nesaPhases.find(p => p.id === 'icon_nominations');

  return (
    <>
      <Helmet>
        <title>Africa Education Icon | NESA-Africa 2025</title>
        <meta name="description" content="9 Icons honoured for a decade of exceptional contribution to education across Africa. Three subcategories recognizing philanthropy, literary advocacy, and technical education." />
      </Helmet>

      <Header />
      <StageBanner />

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-800 via-blue-900 to-indigo-900 py-20 text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
                <Star className="w-5 h-5 text-scef-gold" />
                <span className="text-white/90 font-medium">NESA-Africa 2025 Awards</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Africa Education <span className="text-scef-gold">Icon</span>
              </h1>
              <p className="text-xl text-white/80 mb-4 max-w-2xl mx-auto">
                Honouring 9 exceptional individuals who have shaped education across Africa over the past decade (2014–2024).
              </p>
              <p className="text-lg text-scef-gold font-semibold mb-8">
                3 Icons per subcategory • Selected across Africa, Diaspora & Friends of Africa
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-blue-900" asChild>
                  <Link to="/nominate?category=icon">
                    <Award className="w-5 h-5 mr-2" />
                    Nominate an Icon
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/media/nesa-awards-tv/africa-icon">
                    <Calendar className="w-5 h-5 mr-2" />
                    Icon Show: {iconShow ? formatPhaseDate(iconShow.startDate) : 'Mar 28, 2026'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 9 Icons Explained */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                9 Icons Honoured at the Blue Garnet Gala
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Three distinguished subcategories, each recognizing 3 outstanding individuals from across Africa, the Diaspora, and Friends of Africa.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {iconSubcategories.map((subcategory) => {
                const IconComponent = iconIcons[subcategory.id as keyof typeof iconIcons] || Star;
                return (
                  <Card key={subcategory.id} className="border-2 hover:border-blue-300 transition-colors">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-blue-700" />
                      </div>
                      <CardTitle className="text-lg leading-tight">{subcategory.name}</CardTitle>
                      <CardDescription>{subcategory.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="flex justify-center gap-2 mb-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                            <Star className="w-5 h-5 text-scef-gold" />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-blue-700 font-semibold">
                        {subcategory.iconsPerSubcategory} Icons Selected
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Selection Criteria */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                Icon Selection Process
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <Globe className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Pan-African Scope</h3>
                    <p className="text-gray-600 text-sm">
                      Icons are selected from across Africa's 5 regions, the global Diaspora, and Friends of Africa who have contributed significantly to the continent's education.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Calendar className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Decade of Impact (2014–2024)</h3>
                    <p className="text-gray-600 text-sm">
                      Nominees must demonstrate sustained contribution over the past decade, with measurable impact on education access, quality, or innovation.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Users className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Expert Selection Panel</h3>
                    <p className="text-gray-600 text-sm">
                      A distinguished panel of education leaders, policymakers, and sector experts reviews all nominations through a rigorous vetting process.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Award className="w-10 h-10 text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Blue Garnet Gala Honour</h3>
                    <p className="text-gray-600 text-sm">
                      All 9 Icons are honoured at the prestigious Blue Garnet Awards Gala in Lagos on June 27, 2026, with live global broadcast.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Nomination Deadline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-xl mx-auto border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-8 text-center">
                <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Icon Nominations Close
                </h3>
                <p className="text-3xl font-bold text-blue-700 mb-4">
                  {iconNominations ? formatPhaseDate(iconNominations.endDate) : 'April 30, 2026'}
                </p>
                <p className="text-gray-600 mb-6">
                  Don't miss the opportunity to honour Africa's education heroes
                </p>
                <Button size="lg" className="bg-blue-700 hover:bg-blue-800" asChild>
                  <Link to="/nominate?category=icon">Submit Nomination</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-br from-blue-800 to-indigo-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Know an Education Icon?</h2>
            <p className="text-blue-200 mb-8 max-w-xl mx-auto">
              Help us recognize those who have dedicated their lives to transforming education in Africa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-blue-900" asChild>
                <Link to="/nominate?category=icon">Nominate Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/awards/gold">Explore Gold Awards →</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

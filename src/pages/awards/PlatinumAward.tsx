import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Award, 
  CheckCircle, 
  QrCode, 
  Calendar, 
  Download,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StageBanner } from '@/components/nesa/StageBanner';
import { platinumCategories, formatPhaseDate, nesaPhases } from '@/config/nesaSeasonConfig';

export default function PlatinumAward() {
  const platinumShow = nesaPhases.find(p => p.id === 'platinum_show');

  return (
    <>
      <Helmet>
        <title>Platinum Certificate | NESA-Africa 2025</title>
        <meta name="description" content="The baseline recognition for all NESA-Africa nominees across 17 categories. Non-competitive, governance-verified certification." />
      </Helmet>

      <Header />
      <StageBanner />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 py-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">NESA-Africa 2025 Awards</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
                Platinum <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700">Certificate</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                The foundational recognition for all NESA nominees. A non-competitive, governance-verified certificate of excellence across 17 education categories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gray-700 hover:bg-gray-800 text-white" asChild>
                  <Link to="/nominate">
                    <Award className="w-5 h-5 mr-2" />
                    Submit Nomination
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-gray-400 text-gray-700" asChild>
                  <Link to="/media/nesa-awards-tv/platinum">
                    <Calendar className="w-5 h-5 mr-2" />
                    {platinumShow ? formatPhaseDate(platinumShow.startDate) : 'Feb 28, 2026'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What is Platinum */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  What is the Platinum Certificate?
                </h2>
                <p className="text-gray-600 mb-4">
                  The Platinum Certificate is the <strong>entry point</strong> to the NESA-Africa recognition system. Unlike competitive awards, Platinum recognition is granted to all verified nominees who meet our governance standards.
                </p>
                <p className="text-gray-600 mb-6">
                  This certificate validates that your contribution to education has been reviewed and endorsed by the National Recognition Committee (NRC) and meets SCEF's integrity standards.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Non-Competitive</h4>
                      <p className="text-sm text-gray-600">All verified nominees receive recognition</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">NRC Verified</h4>
                      <p className="text-sm text-gray-600">Reviewed by National Recognition Committee</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">1-Year Validity</h4>
                      <p className="text-sm text-gray-600">Certificates expire after one year</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <QrCode className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">QR Verification</h4>
                      <p className="text-sm text-gray-600">Each certificate has a unique verification code</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 border-2 border-gray-300">
                <div className="text-center mb-6">
                  <Award className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-800">Platinum Certificate</h3>
                  <p className="text-gray-600">NESA-Africa 2025</p>
                </div>
                <div className="border-t border-gray-300 pt-6 space-y-3">
                  <p className="text-sm text-gray-600 text-center">
                    Certified by Santos Creations Educational Foundation
                  </p>
                  <div className="flex justify-center gap-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center">
                      <QrCode className="w-10 h-10 text-gray-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Scan QR code to verify authenticity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 17 Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                17 Recognition Categories
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Platinum Certificate covers all major areas of educational excellence across Africa
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {platinumCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{category}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certificate Download */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto border-2 border-scef-gold/30">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Certificate Download</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-600 text-center">
                  Platinum recipients can download their certificate with an optional donation to support SCEF's educational initiatives.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg text-center">
                    <Users className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-800">General Public</h4>
                    <p className="text-sm text-gray-600 mb-3">Minimum $5 optional donation</p>
                    <Button size="sm" variant="outline" disabled>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                  <div className="p-4 bg-scef-gold/10 rounded-lg text-center">
                    <Shield className="w-8 h-8 text-scef-gold mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-800">Verified Supporters</h4>
                    <p className="text-sm text-gray-600 mb-3">Optional $20 minimum donation</p>
                    <Button size="sm" className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark" disabled>
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center border-t pt-4">
                  <strong>Disclaimer:</strong> Donations are optional and do not affect eligibility or recognition status.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gray-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Be Recognized?</h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Submit your nomination or that of a deserving organization for Platinum recognition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-gray-900" asChild>
                <Link to="/nominate">Start Nomination</Link>
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

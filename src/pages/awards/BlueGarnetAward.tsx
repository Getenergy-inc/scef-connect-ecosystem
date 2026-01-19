import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Vote, 
  Users, 
  Calendar,
  Ticket,
  MapPin,
  Tv,
  Shield,
  Scale,
  FileCheck,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StageBanner } from '@/components/nesa/StageBanner';
import { 
  formatPhaseDate, 
  nesaPhases,
  isVotingOpen,
  AFRICA_REGIONS
} from '@/config/nesaSeasonConfig';

export default function BlueGarnetAward() {
  const blueGarnetVoting = nesaPhases.find(p => p.id === 'blue_garnet_voting');
  const blueGarnetGala = nesaPhases.find(p => p.id === 'blue_garnet_gala');
  const rebuildPhase = nesaPhases.find(p => p.id === 'rebuild_phase');
  const votingStatus = isVotingOpen();

  return (
    <>
      <Helmet>
        <title>Blue Garnet Awards | NESA-Africa 2025</title>
        <meta name="description" content="The pinnacle of NESA recognition. Blue Garnet Gala in Lagos on June 27, 2026. 60% jury + 40% public voting. Live broadcast worldwide." />
      </Helmet>

      <Header />
      <StageBanner />

      <main className="min-h-screen bg-gradient-to-b from-blue-950 to-slate-900">
        {/* Hero Section */}
        <section className="relative py-24 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-700/30 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6">
                <Award className="w-5 h-5 text-scef-gold" />
                <span className="text-white/90 font-medium">NESA-Africa 2025 Awards</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6">
                Blue <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Garnet</span>
              </h1>
              <p className="text-xl text-white/80 mb-4 max-w-2xl mx-auto">
                The pinnacle of NESA recognition. The most prestigious education awards ceremony in Africa.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                <Badge className="bg-scef-gold/20 text-scef-gold border-scef-gold/30 text-sm py-1">
                  <Vote className="w-4 h-4 mr-1" />
                  40% Public Vote
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 text-sm py-1">
                  <Scale className="w-4 h-4 mr-1" />
                  60% Jury Selection
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20 text-sm py-1">
                  <Tv className="w-4 h-4 mr-1" />
                  Live Global Broadcast
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {votingStatus.blueGarnet ? (
                  <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-blue-900" asChild>
                    <Link to="/vote?stage=blue-garnet">
                      <Vote className="w-5 h-5 mr-2" />
                      Vote Now
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-blue-900" asChild>
                    <Link to="/tickets/blue-garnet-gala">
                      <Ticket className="w-5 h-5 mr-2" />
                      Get Gala Tickets
                    </Link>
                  </Button>
                )}
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/media/nesa-awards-tv/blue-garnet-gala">
                    <Calendar className="w-5 h-5 mr-2" />
                    June 27, 2026 • Lagos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Gala Details */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  The Blue Garnet Awards Gala
                </h2>
                <p className="text-gray-600 mb-6">
                  An evening of celebration and recognition, bringing together Africa's education champions, government officials, corporate leaders, and media personalities for the continent's most prestigious education awards ceremony.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Lagos, Nigeria</p>
                      <p className="text-sm text-gray-600">Premier venue (to be announced)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {blueGarnetGala ? formatPhaseDate(blueGarnetGala.startDate) : 'June 27, 2026'}
                      </p>
                      <p className="text-sm text-gray-600">Evening gala event</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Tv className="w-5 h-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Live Global Broadcast</p>
                      <p className="text-sm text-gray-600">NESA Africa TV + Partner Stations</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 text-white">
                <div className="text-center mb-6">
                  <Award className="w-20 h-20 text-scef-gold mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Blue Garnet Trophy</h3>
                  <p className="text-blue-200">The Ultimate Recognition</p>
                </div>
                <div className="border-t border-white/20 pt-6">
                  <p className="text-sm text-blue-200 text-center">
                    Blue Garnet winners receive the prestigious trophy, lifetime recognition, and entry into the NESA Hall of Excellence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voting Structure */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                60/40 Selection Process
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Blue Garnet combines public engagement with expert evaluation for balanced, credible outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-2 border-blue-200">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-10 h-10 text-blue-700" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-blue-700">60%</CardTitle>
                  <CardDescription className="text-lg">Jury Selection</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      Distinguished education experts
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      Industry leaders & policymakers
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      Blind evaluation process
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      Conflict of interest protocols
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-scef-gold/50">
                <CardHeader className="text-center">
                  <div className="w-20 h-20 bg-scef-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-scef-gold" />
                  </div>
                  <CardTitle className="text-4xl font-bold text-scef-gold">40%</CardTitle>
                  <CardDescription className="text-lg">Public Voting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <Vote className="w-4 h-4 text-scef-gold" />
                      Open to all verified voters
                    </li>
                    <li className="flex items-center gap-2">
                      <Vote className="w-4 h-4 text-scef-gold" />
                      One vote per person per category
                    </li>
                    <li className="flex items-center gap-2">
                      <Vote className="w-4 h-4 text-scef-gold" />
                      Anti-fraud verification
                    </li>
                    <li className="flex items-center gap-2">
                      <Vote className="w-4 h-4 text-scef-gold" />
                      Real-time vote tracking
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Voting period: {blueGarnetVoting ? `${formatPhaseDate(blueGarnetVoting.startDate)} – ${formatPhaseDate(blueGarnetVoting.endDate)}` : 'May 18 – June 17, 2026'}
              </p>
            </div>
          </div>
        </section>

        {/* Integrity Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto border-2 border-blue-200">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 text-blue-700 mx-auto mb-4" />
                <CardTitle className="text-2xl">Integrity & Transparency</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileCheck className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Audit Logs</p>
                    <p className="text-sm text-gray-600">Complete audit trail for all voting and jury decisions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Sponsor Firewall</p>
                    <p className="text-sm text-gray-600">Sponsors and endorsers cannot influence winner selection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Scale className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <p className="font-medium text-gray-800">Independent Oversight</p>
                    <p className="text-sm text-gray-600">Results verified by independent governance committee</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rebuild My School Africa */}
        <section className="py-16 bg-gradient-to-br from-green-800 to-emerald-900 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Heart className="w-12 h-12 text-scef-gold mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">
                After the Gala: Rebuild My School Africa
              </h2>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                The Blue Garnet Gala launches the RMSA Legacy Phase ({rebuildPhase ? `${formatPhaseDate(rebuildPhase.startDate)} – ${formatPhaseDate(rebuildPhase.endDate)}` : 'June 2026 – June 2027'}). Ticket contributions and partner donations fund the renovation of 5 Special Needs Education facilities – one in each African region.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {AFRICA_REGIONS.map((region) => (
                  <Badge key={region} className="bg-white/20 text-white border-white/30 text-sm py-1">
                    {region} Africa
                  </Badge>
                ))}
              </div>
              <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-green-900" asChild>
                <Link to="/programs/rebuild-my-school-africa">
                  Learn About RMSA
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-blue-950 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Be Part of History</h2>
            <p className="text-blue-200 mb-8 max-w-xl mx-auto">
              Join us for Africa's most prestigious education awards ceremony.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-blue-900" asChild>
                <Link to="/tickets/blue-garnet-gala">
                  <Ticket className="w-5 h-5 mr-2" />
                  Get Gala Tickets
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/donate">
                  <Heart className="w-5 h-5 mr-2" />
                  Support NESA
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

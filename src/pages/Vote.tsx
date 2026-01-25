import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Vote as VoteIcon, Trophy, Gem, Calendar, 
  CheckCircle, AlertCircle, Clock, ExternalLink, Layers
} from "lucide-react";
import { StageBanner } from "@/components/nesa/StageBanner";
import { 
  getCurrentPhase, 
  nesaPhases, 
  formatPhaseDate,
  getTimeRemaining 
} from "@/config/nesaSeasonConfig";
import {
  getCompetitiveCategories,
  TOTAL_COMPETITIVE_SUBCATEGORIES,
} from "@/config/nesaCategoriesConfig";
import { useEffect, useState } from "react";

const nesaColors = {
  dark: "#1A1A1A",
  darkAlt: "#0D0D0D",
  gold: "#C4A052",
  goldLight: "#D4B46A",
  textMuted: "#9CA3AF",
};

const Vote = () => {
  const [searchParams] = useSearchParams();
  const stage = searchParams.get('stage') || 'gold';
  const currentPhase = getCurrentPhase();
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0 });

  const goldVotingPhase = nesaPhases.find(p => p.id === 'gold_voting');
  const blueGarnetVotingPhase = nesaPhases.find(p => p.id === 'blue_garnet_voting');
  const competitiveCategories = getCompetitiveCategories();

  const isGoldVotingOpen = currentPhase?.id === 'gold_voting';
  const isBlueGarnetVotingOpen = currentPhase?.id === 'blue_garnet_voting';
  const isAnyVotingOpen = isGoldVotingOpen || isBlueGarnetVotingOpen;

  const activePhase = stage === 'blue-garnet' ? blueGarnetVotingPhase : goldVotingPhase;

  useEffect(() => {
    if (!activePhase) return;
    
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(activePhase.startDate);
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [activePhase]);

  return (
    <>
      <Helmet>
        <title>Vote - NESA-Africa 2025 | SCEF</title>
        <meta 
          name="description" 
          content={`Vote for your favorite education changemakers in the NESA-Africa 2025 awards. ${TOTAL_COMPETITIVE_SUBCATEGORIES} subcategories. Gold stage: 100% public vote. Blue Garnet: 40% public + 60% jury.`}
        />
      </Helmet>
      
      <div className="min-h-screen" style={{ backgroundColor: nesaColors.dark }}>
        <Header />
        <StageBanner compact />
        
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border"
                style={{ 
                  backgroundColor: `${nesaColors.gold}20`,
                  borderColor: nesaColors.gold,
                  color: nesaColors.gold
                }}
              >
                <VoteIcon className="w-4 h-4" />
                <span>NESA-Africa 2025 Voting</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Cast Your <span style={{ color: nesaColors.gold }}>Vote</span>
              </h1>
              
              <p style={{ color: nesaColors.textMuted }} className="text-lg max-w-2xl mx-auto">
                Your vote shapes Africa's education recognition. Participate in transparent, 
                audit-logged voting for the continent's education champions.
              </p>
            </div>

            {/* Stage Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              <Link to="/vote?stage=gold">
                <Button
                  variant={stage === 'gold' ? 'default' : 'outline'}
                  className="gap-2"
                  style={stage === 'gold' ? { 
                    backgroundColor: nesaColors.gold, 
                    color: nesaColors.dark 
                  } : { 
                    borderColor: nesaColors.gold, 
                    color: nesaColors.gold 
                  }}
                >
                  <Trophy className="w-4 h-4" />
                  Gold Certificate Voting
                </Button>
              </Link>
              <Link to="/vote?stage=blue-garnet">
                <Button
                  variant={stage === 'blue-garnet' ? 'default' : 'outline'}
                  className="gap-2"
                  style={stage === 'blue-garnet' ? { 
                    backgroundColor: '#1E3A5F', 
                    color: 'white' 
                  } : { 
                    borderColor: '#1E3A5F', 
                    color: '#1E3A5F' 
                  }}
                >
                  <Gem className="w-4 h-4" />
                  Blue Garnet Voting
                </Button>
              </Link>
            </div>

            {/* Voting Status Card */}
            <div className="max-w-3xl mx-auto mb-12">
              <div 
                className="p-8 rounded-2xl border text-center"
                style={{ 
                  backgroundColor: `${nesaColors.gold}08`,
                  borderColor: `${nesaColors.gold}30`
                }}
              >
                {stage === 'gold' ? (
                  <>
                    <Trophy className="w-16 h-16 mx-auto mb-4" style={{ color: '#FFD700' }} />
                    <h2 className="text-2xl font-bold text-white mb-2">Gold Certificate Voting</h2>
                    <p style={{ color: nesaColors.textMuted }} className="mb-4">
                      100% Public Vote — No Judges • {TOTAL_COMPETITIVE_SUBCATEGORIES} Sub-Categories • {competitiveCategories.length} Award Categories
                    </p>
                    
                    {isGoldVotingOpen ? (
                      <div className="flex items-center justify-center gap-2 text-green-400 mb-6">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Voting is OPEN</span>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <div className="flex items-center justify-center gap-2 text-amber-400 mb-3">
                          <Clock className="w-5 h-5" />
                          <span className="font-semibold">Opens on {goldVotingPhase && formatPhaseDate(goldVotingPhase.startDate)}</span>
                        </div>
                        <div className="flex justify-center gap-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white">{timeRemaining.days}</div>
                            <div className="text-xs" style={{ color: nesaColors.textMuted }}>Days</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white">{timeRemaining.hours}</div>
                            <div className="text-xs" style={{ color: nesaColors.textMuted }}>Hours</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-white">{timeRemaining.minutes}</div>
                            <div className="text-xs" style={{ color: nesaColors.textMuted }}>Minutes</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-sm mb-6" style={{ color: nesaColors.textMuted }}>
                      Voting Period: {goldVotingPhase && `${formatPhaseDate(goldVotingPhase.startDate)} – ${formatPhaseDate(goldVotingPhase.endDate)}`}
                    </p>
                  </>
                ) : (
                  <>
                    <Gem className="w-16 h-16 mx-auto mb-4" style={{ color: '#1E3A5F' }} />
                    <h2 className="text-2xl font-bold text-white mb-2">Blue Garnet Voting</h2>
                    <p style={{ color: nesaColors.textMuted }} className="mb-4">
                      40% Public Vote + 60% Jury Review • 9 Blue Garnet Winners
                    </p>
                    
                    {isBlueGarnetVotingOpen ? (
                      <div className="flex items-center justify-center gap-2 text-green-400 mb-6">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Voting is OPEN</span>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <div className="flex items-center justify-center gap-2 text-amber-400 mb-3">
                          <Clock className="w-5 h-5" />
                          <span className="font-semibold">Opens on {blueGarnetVotingPhase && formatPhaseDate(blueGarnetVotingPhase.startDate)}</span>
                        </div>
                      </div>
                    )}
                    
                    <p className="text-sm mb-6" style={{ color: nesaColors.textMuted }}>
                      Voting Period: {blueGarnetVotingPhase && `${formatPhaseDate(blueGarnetVotingPhase.startDate)} – ${formatPhaseDate(blueGarnetVotingPhase.endDate)}`}
                    </p>
                    
                    <div 
                      className="p-4 rounded-lg mb-6"
                      style={{ backgroundColor: `${nesaColors.gold}10` }}
                    >
                      <AlertCircle className="w-5 h-5 mx-auto mb-2" style={{ color: nesaColors.gold }} />
                      <p className="text-sm" style={{ color: nesaColors.textMuted }}>
                        Blue Garnet voting is open only to Gold Certificate winners from the previous stage.
                      </p>
                    </div>
                  </>
                )}

                {isAnyVotingOpen ? (
                  <a href="https://nesa.africa/vote" target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="lg"
                      className="font-bold gap-2"
                      style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}
                    >
                      Vote on NESA.africa
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                ) : (
                  <Button 
                    size="lg"
                    disabled
                    className="font-bold opacity-50"
                  >
                    Voting Not Yet Open
                  </Button>
                )}
              </div>
            </div>

            {/* Categories Preview */}
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-white">
                  Award Categories ({competitiveCategories.length})
                </h3>
                <Button variant="outline" size="sm" className="border-white/30 text-white" asChild>
                  <Link to="/categories">
                    <Layers className="w-4 h-4 mr-1" />
                    View All 17
                  </Link>
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {competitiveCategories.map((category) => (
                  <Link 
                    key={category.id}
                    to={`/categories/${category.slug}`}
                    className="block p-4 rounded-xl border transition-all hover:border-amber-500/50"
                    style={{ 
                      backgroundColor: `${nesaColors.gold}05`,
                      borderColor: `${nesaColors.gold}20`
                    }}
                  >
                    <h4 className="font-semibold text-white mb-1 text-sm">{category.name}</h4>
                    <p className="text-xs" style={{ color: nesaColors.textMuted }}>
                      {category.totalSubcategoryCount} sub-categories
                      {category.isRegional && ' • Regional'}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Vote;

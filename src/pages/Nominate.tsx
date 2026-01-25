import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, Trophy, Crown, Medal, Gem, 
  ArrowRight, ExternalLink, CheckCircle, Users, Layers
} from "lucide-react";
import { StageBanner } from "@/components/nesa/StageBanner";
import {
  getCompetitiveCategories,
  getCategoriesByTier,
  TOTAL_COMPETITIVE_SUBCATEGORIES,
  TOTAL_CATEGORIES,
  iconSubcategories,
} from "@/config/nesaCategoriesConfig";

const nesaColors = {
  dark: "#1A1A1A",
  darkAlt: "#0D0D0D",
  gold: "#C4A052",
  goldLight: "#D4B46A",
  textMuted: "#9CA3AF",
};

const Nominate = () => {
  const competitiveCategories = getCompetitiveCategories();
  const platinumCategories = getCategoriesByTier('platinum');

  const nominationTracks = [
    {
      id: 'platinum',
      title: 'Platinum Certificate',
      subtitle: 'Baseline Recognition of Service',
      icon: Medal,
      color: '#E5E4E2',
      description: 'Non-competitive entry layer. Verification by NESA Nominee Research Corps (NRC) with governance and safeguarding checks.',
      features: [
        `${platinumCategories.length} categories available`,
        'Certificate validity: 1 year',
        'Global QR-code verification',
        'No public voting required',
      ],
      link: 'https://nesa.africa/non-competitive',
      deadline: 'Open until Feb 2026',
    },
    {
      id: 'icon',
      title: 'Africa Education Icon',
      subtitle: 'Lifetime Impact Recognition',
      icon: Crown,
      color: '#C4A052',
      description: 'Honours 9 Icons across 3 subcategories for documented impact from 2005–2025. Non-competitive lifetime recognition.',
      features: [
        '3 Icon subcategories',
        '9 Icons total (3 per subcategory)',
        '2005–2025 impact window',
        'Expert panel selection',
      ],
      link: 'https://nesa.africa/nomination/sub-categories/africa-lifetime-education-icon',
      deadline: 'Closes 30 April 2026',
    },
    {
      id: 'competitive',
      title: 'Gold & Blue Garnet',
      subtitle: 'Competitive Awards Track',
      icon: Trophy,
      color: '#FFD700',
      description: `Public voting competition across ${competitiveCategories.length} categories. Gold winners advance to Blue Garnet with jury evaluation.`,
      features: [
        `${TOTAL_COMPETITIVE_SUBCATEGORIES} Gold subcategories`,
        '9 Blue Garnet winners',
        'Gold: 100% public vote',
        'Blue Garnet: 60% jury + 40% public',
      ],
      link: 'https://nesa.africa/competitive',
      deadline: 'Open until April 2026',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Nominate - NESA-Africa 2025 | SCEF</title>
        <meta 
          name="description" 
          content={`Nominate Africa's education changemakers for NESA-Africa 2025 awards. Choose from Platinum, Icon, or Competitive tracks across ${TOTAL_CATEGORIES} categories.`}
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
                <Award className="w-4 h-4" />
                <span>NESA-Africa 2025 Nominations</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Nominate a <span style={{ color: nesaColors.gold }}>Changemaker</span>
              </h1>
              
              <p style={{ color: nesaColors.textMuted }} className="text-lg max-w-2xl mx-auto">
                Recognize individuals, organizations, and institutions driving educational 
                excellence across Africa. Select the appropriate nomination track below.
              </p>

              <Button variant="outline" className="mt-6 border-white/30 text-white" asChild>
                <Link to="/categories">
                  <Layers className="w-4 h-4 mr-2" />
                  Browse All {TOTAL_CATEGORIES} Categories
                </Link>
              </Button>
            </div>

            {/* Nomination Tracks */}
            <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
              {nominationTracks.map((track) => (
                <div
                  key={track.id}
                  className="p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ 
                    backgroundColor: `${nesaColors.gold}08`,
                    borderColor: `${track.color}40`
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${track.color}20` }}
                  >
                    <track.icon className="w-8 h-8" style={{ color: track.color }} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{track.title}</h3>
                  <p className="text-sm font-medium mb-3" style={{ color: track.color }}>
                    {track.subtitle}
                  </p>
                  
                  <p className="text-sm mb-4" style={{ color: nesaColors.textMuted }}>
                    {track.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {track.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-white">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: nesaColors.gold }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-xs mb-4" style={{ color: nesaColors.textMuted }}>
                    Deadline: {track.deadline}
                  </div>
                  
                  <a href={track.link} target="_blank" rel="noopener noreferrer">
                    <Button 
                      className="w-full gap-2 font-semibold"
                      style={{ 
                        backgroundColor: track.color,
                        color: track.id === 'competitive' ? nesaColors.dark : 'white'
                      }}
                    >
                      Nominate Now
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                </div>
              ))}
            </div>

            {/* Icon Subcategories */}
            <div className="max-w-4xl mx-auto mb-16">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Africa Education Icon Subcategories
              </h3>
              <p className="text-center mb-8" style={{ color: nesaColors.textMuted }}>
                9 Icons honoured at the Blue Garnet Gala (3 per subcategory)
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                {iconSubcategories.map((sub) => (
                  <div 
                    key={sub.id}
                    className="p-4 rounded-xl border text-center"
                    style={{ 
                      backgroundColor: `${nesaColors.gold}10`,
                      borderColor: `${nesaColors.gold}30`
                    }}
                  >
                    <Crown className="w-8 h-8 mx-auto mb-2" style={{ color: nesaColors.gold }} />
                    <h4 className="font-semibold text-white text-sm mb-1">{sub.name}</h4>
                    <p className="text-xs" style={{ color: nesaColors.textMuted }}>
                      {sub.iconsPerSubcategory} Icons • 2005–2025
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Competitive Categories Grid */}
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <h3 className="text-xl font-bold text-white">
                  Gold & Blue Garnet Categories ({competitiveCategories.length})
                </h3>
                <Button variant="outline" size="sm" className="border-white/30 text-white" asChild>
                  <Link to="/categories">
                    <Layers className="w-4 h-4 mr-1" />
                    View All
                  </Link>
                </Button>
              </div>
              <p className="text-center mb-8" style={{ color: nesaColors.textMuted }}>
                Total: {TOTAL_COMPETITIVE_SUBCATEGORIES} subcategories across all categories
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <div className="flex items-start justify-between mb-2">
                      <Trophy className="w-5 h-5" style={{ color: '#FFD700' }} />
                      {category.isRegional && (
                        <span 
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${nesaColors.gold}20`, color: nesaColors.gold }}
                        >
                          Regional
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1">{category.name}</h4>
                    <p className="text-xs" style={{ color: nesaColors.textMuted }}>
                      {category.totalSubcategoryCount} sub-categories
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {category.baseSubcategories.slice(0, 3).map((sub) => (
                        <span 
                          key={sub.id}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${nesaColors.gold}10`, color: nesaColors.textMuted }}
                        >
                          {sub.name}
                        </span>
                      ))}
                      {category.baseSubcategories.length > 3 && (
                        <span 
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${nesaColors.gold}10`, color: nesaColors.textMuted }}
                        >
                          +{category.baseSubcategories.length - 3} more
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <a href="https://nesa.africa" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg"
                  className="gap-2 font-bold"
                  style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}
                >
                  Visit NESA.africa for Full Details
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Nominate;

import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { Users, Heart, Award, MapPin, Handshake, ArrowRight } from "lucide-react";
import heroLanding from "@/assets/hero-landing.png";

export const HeroSection = () => {
  const { t, isRTL } = useLocale();

  return (
    <section className="relative min-h-[85vh] flex items-center bg-scef-blue overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: `url(${heroLanding})` }}
      />
      {/* Multi-layer overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-scef-blue/95 via-scef-blue/80 to-scef-blue/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-scef-blue/60 via-transparent to-scef-blue/70" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-24">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/60 backdrop-blur-sm text-white text-sm mb-8 border border-scef-gold/30 shadow-lg">
            <MapPin className="w-4 h-4 text-scef-gold" />
            <span className="font-medium">Serving 57 African Countries & Diaspora</span>
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            {t('hero.headline')}
          </h1>
          
          {/* Subtext */}
          <p className="text-lg md:text-xl text-white leading-relaxed mb-10 max-w-2xl drop-shadow-md">
            {t('hero.subtext')}
          </p>
          
          {/* Primary CTAs */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              size="lg"
              asChild
              className="bg-scef-gold text-scef-blue hover:bg-scef-gold-dark font-semibold text-lg px-8 py-6 border-2 border-black"
            >
              <Link to="/membership">
                <Users className="w-5 h-5" />
                {t('hero.cta.member')}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-white text-white hover:bg-white hover:text-scef-blue font-semibold text-lg px-8 py-6"
            >
              <Link to="/donate">
                <Heart className="w-5 h-5" />
                {t('hero.cta.donate')}
              </Link>
            </Button>
          </div>
          
          {/* Secondary CTAs */}
          <div className="flex flex-wrap gap-4 text-sm">
            <Link 
              to="/membership"
              className="flex items-center gap-2 text-scef-gold hover:text-scef-gold-light transition-colors"
            >
              <Award className="w-4 h-4" />
              {t('hero.cta.ambassador')}
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link 
              to="/local-chapters"
              className="flex items-center gap-2 text-white/80 hover:text-scef-gold transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {t('hero.cta.chapter')}
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link 
              to="/partners"
              className="flex items-center gap-2 text-white/80 hover:text-scef-gold transition-colors"
            >
              <Handshake className="w-4 h-4" />
              {t('hero.cta.partner')}
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { Users, Heart, Award, MapPin, Handshake, ArrowRight } from "lucide-react";
import heroLanding from "@/assets/hero-landing.png";

export const HeroSection = () => {
  const { t, isRTL } = useLocale();

  return (
    <section className="relative min-h-[80vh] flex items-center bg-scef-blue overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroLanding})` }}
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-scef-blue/90 via-scef-blue/70 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 border border-white/20">
            <MapPin className="w-4 h-4 text-scef-gold" />
            Serving 54+ African Countries & Diaspora
          </div>
          
          {/* Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {t('hero.headline')}
          </h1>
          
          {/* Subtext */}
          <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-3xl">
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

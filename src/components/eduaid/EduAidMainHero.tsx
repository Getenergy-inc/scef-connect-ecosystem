import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

interface HeroStat {
  value: string;
  label: string;
}

interface EduAidMainHeroProps {
  welcomeText: string;
  title: string;
  description: string;
  stats: HeroStat[];
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
}

export default function EduAidMainHero({
  welcomeText,
  title,
  description,
  stats,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: EduAidMainHeroProps) {
  const { isRTL } = useLocale();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0A1628]">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628] via-[#1F892B]/20 to-[#0A1628]" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#1F892B]/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container relative z-10 px-4 md:px-8 py-20" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1F892B]/20 border border-[#1F892B]/40 rounded-full text-[#4ADE80] text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-[#4ADE80] rounded-full animate-pulse" />
            {welcomeText}
          </div>

          {/* Main headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-up">
            {title.split(' ').map((word, i) => (
              <span key={i} className={word === 'Education,' || word === 'Futures' ? 'text-[#1F892B]' : ''}>
                {word}{' '}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#FFD700] font-display">{stat.value}</div>
                <div className="text-sm text-slate-400 uppercase tracking-wide mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Button
              asChild
              size="lg"
              className="bg-[#1F892B] hover:bg-[#1F892B]/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-[#1F892B]/30 transition-all"
            >
              <Link to={primaryButtonLink} className="flex items-center gap-2">
                {primaryButtonText}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/10 px-8 py-6 text-lg rounded-xl"
            >
              <Link to={secondaryButtonLink} className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                {secondaryButtonText}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

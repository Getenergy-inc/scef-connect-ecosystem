import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Vote, 
  Play, 
  Ticket, 
  Heart, 
  ChevronRight,
  Clock,
  Tv,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  getCurrentPhase,
  getNextPhase,
  getTimeRemaining,
  getPrimaryCTA,
  type PhaseConfig,
} from '@/config/nesaSeasonConfig';

interface StageBannerProps {
  className?: string;
  compact?: boolean;
}

const ctaIcons = {
  nominate: Award,
  vote: Vote,
  watch: Play,
  tickets: Ticket,
  donate: Heart,
};

export function StageBanner({ className, compact = false }: StageBannerProps) {
  const [currentPhase, setCurrentPhase] = useState<PhaseConfig | null>(null);
  const [nextPhase, setNextPhase] = useState<PhaseConfig | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  const primaryCTA = getPrimaryCTA();
  const CTAIcon = ctaIcons[primaryCTA.variant];

  useEffect(() => {
    const updatePhases = () => {
      setCurrentPhase(getCurrentPhase());
      setNextPhase(getNextPhase());
    };
    
    updatePhases();
    const phaseInterval = setInterval(updatePhases, 60000); // Update every minute
    
    return () => clearInterval(phaseInterval);
  }, []);

  useEffect(() => {
    if (!nextPhase?.showCountdown) return;

    const updateCountdown = () => {
      setCountdown(getTimeRemaining(nextPhase.startDate));
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, [nextPhase]);

  const displayPhase = currentPhase || nextPhase;

  if (!displayPhase) return null;

  if (compact) {
    return (
      <div className={cn(
        "bg-gradient-to-r from-scef-blue via-scef-blue-dark to-scef-blue",
        "border-b border-scef-gold/30",
        className
      )}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2 text-white">
              <Tv className="w-4 h-4 text-scef-gold" />
              <span className="font-medium">{displayPhase.shortName}</span>
              {nextPhase?.showCountdown && countdown.total > 0 && (
                <span className="text-scef-gold">
                  {countdown.days}d {countdown.hours}h {countdown.minutes}m
                </span>
              )}
            </div>
            <Button size="sm" variant="outline" className="border-scef-gold text-scef-gold hover:bg-scef-gold hover:text-scef-blue-dark" asChild>
              <Link to={primaryCTA.href}>
                <CTAIcon className="w-3 h-3 mr-1" />
                {primaryCTA.text}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-gradient-to-r from-scef-blue via-scef-blue-dark to-scef-blue",
      "border-b-2 border-scef-gold/40",
      className
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Phase Info */}
          <div className="flex items-center gap-4">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: displayPhase.color }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-scef-gold font-semibold text-sm uppercase tracking-wide">
                  NESA-Africa 2025
                </span>
                <ChevronRight className="w-4 h-4 text-white/50" />
                <span className="text-white font-medium">
                  {displayPhase.name}
                </span>
              </div>
              <p className="text-white/70 text-sm hidden md:block">
                {displayPhase.description}
              </p>
            </div>
          </div>

          {/* Countdown + CTA */}
          <div className="flex items-center gap-4">
            {nextPhase?.showCountdown && countdown.total > 0 && (
              <div className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2">
                <Clock className="w-4 h-4 text-scef-gold" />
                <div className="flex gap-2 text-white font-mono text-sm">
                  <div className="text-center">
                    <span className="block text-lg font-bold text-scef-gold">{countdown.days}</span>
                    <span className="text-xs text-white/60">days</span>
                  </div>
                  <span className="text-scef-gold">:</span>
                  <div className="text-center">
                    <span className="block text-lg font-bold text-scef-gold">{countdown.hours}</span>
                    <span className="text-xs text-white/60">hrs</span>
                  </div>
                  <span className="text-scef-gold">:</span>
                  <div className="text-center">
                    <span className="block text-lg font-bold text-scef-gold">{countdown.minutes}</span>
                    <span className="text-xs text-white/60">min</span>
                  </div>
                  <span className="text-scef-gold hidden sm:block">:</span>
                  <div className="text-center hidden sm:block">
                    <span className="block text-lg font-bold text-scef-gold">{countdown.seconds}</span>
                    <span className="text-xs text-white/60">sec</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold"
                asChild
              >
                <Link to={primaryCTA.href}>
                  <CTAIcon className="w-4 h-4 mr-1" />
                  {primaryCTA.text}
                </Link>
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/programs/nesa-africa">
                  <Calendar className="w-4 h-4 mr-1" />
                  Calendar
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StageBanner } from "@/components/nesa/StageBanner";
import { 
  nesaPhases, 
  formatPhaseDate, 
  getCurrentPhase,
  getTimeRemaining
} from "@/config/nesaSeasonConfig";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Tv, 
  Vote, 
  Award,
  Building,
  Radio,
  Ticket,
  ChevronRight,
  CheckCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const nesaColors = {
  dark: "#1A1A1A",
  darkAlt: "#0D0D0D",
  gold: "#C4A052",
  goldLight: "#D4B46A",
  textMuted: "#9CA3AF",
};

// Map phase IDs to icons and event types
const phaseConfig: Record<string, { icon: typeof CalendarIcon; type: string; location?: string }> = {
  webinar_series: { icon: Radio, type: "Online Series" },
  platinum_show: { icon: Tv, type: "Live Broadcast", location: "Online" },
  icon_show: { icon: Tv, type: "Live Broadcast", location: "Online" },
  icon_nominations: { icon: Award, type: "Nominations" },
  gold_voting: { icon: Vote, type: "Public Voting" },
  gold_show: { icon: Tv, type: "Live Broadcast", location: "Online" },
  blue_garnet_voting: { icon: Vote, type: "Voting & Jury" },
  blue_garnet_gala: { icon: Ticket, type: "Gala Event", location: "Lagos, Nigeria" },
  rebuild_phase: { icon: Building, type: "Impact Phase" },
};

const Calendar = () => {
  const currentPhase = getCurrentPhase();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const now = new Date();

  // Find next upcoming event
  const nextEvent = nesaPhases
    .filter(p => p.startDate > now && p.showCountdown)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())[0];

  useEffect(() => {
    if (!nextEvent) return;
    
    const interval = setInterval(() => {
      setCountdown(getTimeRemaining(nextEvent.startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [nextEvent]);

  // Group phases by month/year
  const groupedPhases = nesaPhases.reduce((acc, phase) => {
    const monthYear = phase.startDate.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
    if (!acc[monthYear]) acc[monthYear] = [];
    acc[monthYear].push(phase);
    return acc;
  }, {} as Record<string, typeof nesaPhases>);

  const isPast = (date: Date) => date < now;
  const isActive = (phase: typeof nesaPhases[0]) => 
    now >= phase.startDate && now <= phase.endDate;

  return (
    <>
      <Helmet>
        <title>NESA-Africa 2025 Calendar | SCEF</title>
        <meta 
          name="description" 
          content="View the complete NESA-Africa 2025-2026 event calendar. Key dates for nominations, voting, recognition shows, and the Blue Garnet Awards Gala." 
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
                <CalendarIcon className="w-4 h-4" />
                <span>NESA-Africa 2025–2026</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                Event <span style={{ color: nesaColors.gold }}>Calendar</span>
              </h1>
              
              <p style={{ color: nesaColors.textMuted }} className="text-lg max-w-2xl mx-auto">
                Track all key dates from webinars to the Blue Garnet Awards Gala. 
                Mark your calendar and never miss a moment.
              </p>
            </div>

            {/* Next Event Countdown */}
            {nextEvent && (
              <div className="max-w-3xl mx-auto mb-16">
                <div 
                  className="p-6 md:p-8 rounded-2xl border text-center"
                  style={{ 
                    backgroundColor: `${nesaColors.gold}10`,
                    borderColor: `${nesaColors.gold}40`
                  }}
                >
                  <p className="text-sm font-medium mb-2" style={{ color: nesaColors.gold }}>
                    Next Event
                  </p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {nextEvent.name}
                  </h2>
                  <p className="text-sm mb-6" style={{ color: nesaColors.textMuted }}>
                    {formatPhaseDate(nextEvent.startDate)}
                  </p>
                  
                  <div className="flex justify-center gap-4 md:gap-8 mb-6">
                    <div className="text-center">
                      <div 
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: nesaColors.gold }}
                      >
                        {countdown.days}
                      </div>
                      <div className="text-xs" style={{ color: nesaColors.textMuted }}>Days</div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: nesaColors.gold }}
                      >
                        {countdown.hours}
                      </div>
                      <div className="text-xs" style={{ color: nesaColors.textMuted }}>Hours</div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: nesaColors.gold }}
                      >
                        {countdown.minutes}
                      </div>
                      <div className="text-xs" style={{ color: nesaColors.textMuted }}>Minutes</div>
                    </div>
                    <div className="text-center">
                      <div 
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: nesaColors.gold }}
                      >
                        {countdown.seconds}
                      </div>
                      <div className="text-xs" style={{ color: nesaColors.textMuted }}>Seconds</div>
                    </div>
                  </div>

                  {nextEvent.ctaEnabled && (
                    <Link to={nextEvent.ctaHref}>
                      <Button
                        className="gap-2 font-semibold"
                        style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}
                      >
                        {nextEvent.ctaText}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-8 text-center">
                Full Timeline
              </h3>

              <div className="relative">
                {/* Timeline line */}
                <div 
                  className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
                  style={{ backgroundColor: `${nesaColors.gold}30` }}
                />

                {Object.entries(groupedPhases).map(([monthYear, phases], groupIndex) => (
                  <div key={monthYear} className="mb-12">
                    {/* Month Header */}
                    <div className="relative flex items-center justify-center mb-8">
                      <div 
                        className="px-4 py-2 rounded-full text-sm font-semibold z-10"
                        style={{ 
                          backgroundColor: nesaColors.dark,
                          border: `1px solid ${nesaColors.gold}`,
                          color: nesaColors.gold
                        }}
                      >
                        {monthYear}
                      </div>
                    </div>

                    {/* Events in this month */}
                    <div className="space-y-6">
                      {phases.map((phase, index) => {
                        const config = phaseConfig[phase.id] || { icon: CalendarIcon, type: "Event" };
                        const Icon = config.icon;
                        const past = isPast(phase.endDate);
                        const active = isActive(phase);

                        return (
                          <div 
                            key={phase.id}
                            className={`relative flex items-start gap-4 md:gap-8 ${
                              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                            }`}
                          >
                            {/* Timeline dot */}
                            <div 
                              className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10 flex items-center justify-center"
                              style={{ 
                                backgroundColor: active ? nesaColors.gold : past ? '#4B5563' : nesaColors.dark,
                                border: `2px solid ${active ? nesaColors.gold : past ? '#6B7280' : nesaColors.gold}`,
                              }}
                            >
                              {past && <CheckCircle className="w-3 h-3 text-gray-400" />}
                            </div>

                            {/* Spacer for alternating layout */}
                            <div className="hidden md:block md:w-1/2" />

                            {/* Event Card */}
                            <div 
                              className={`ml-10 md:ml-0 md:w-1/2 p-5 rounded-xl border transition-all ${
                                active ? 'ring-2 ring-[#C4A052]' : ''
                              }`}
                              style={{ 
                                backgroundColor: `${nesaColors.gold}08`,
                                borderColor: active ? nesaColors.gold : `${nesaColors.gold}20`,
                                opacity: past ? 0.6 : 1
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <div 
                                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                  style={{ 
                                    backgroundColor: phase.color,
                                    opacity: past ? 0.5 : 1
                                  }}
                                >
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    {active && (
                                      <span 
                                        className="px-2 py-0.5 rounded text-xs font-semibold"
                                        style={{ 
                                          backgroundColor: nesaColors.gold,
                                          color: nesaColors.dark
                                        }}
                                      >
                                        NOW
                                      </span>
                                    )}
                                    {past && (
                                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-700 text-gray-300">
                                        Completed
                                      </span>
                                    )}
                                  </div>
                                  
                                  <h4 className="font-semibold text-white text-sm md:text-base">
                                    {phase.name}
                                  </h4>
                                  
                                  <p className="text-xs mt-1" style={{ color: nesaColors.textMuted }}>
                                    {phase.description}
                                  </p>

                                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                                    <div className="flex items-center gap-1" style={{ color: nesaColors.textMuted }}>
                                      <Clock className="w-3 h-3" />
                                      <span>{formatPhaseDate(phase.startDate)}</span>
                                      {phase.startDate.getTime() !== phase.endDate.getTime() && (
                                        <span>– {formatPhaseDate(phase.endDate)}</span>
                                      )}
                                    </div>
                                    
                                    {config.location && (
                                      <div className="flex items-center gap-1" style={{ color: nesaColors.textMuted }}>
                                        <MapPin className="w-3 h-3" />
                                        <span>{config.location}</span>
                                      </div>
                                    )}

                                    <span 
                                      className="px-2 py-0.5 rounded"
                                      style={{ 
                                        backgroundColor: `${nesaColors.gold}15`,
                                        color: nesaColors.gold
                                      }}
                                    >
                                      {config.type}
                                    </span>
                                  </div>

                                  {phase.ctaEnabled && !past && (
                                    <Link to={phase.ctaHref} className="inline-block mt-3">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1 text-xs h-8"
                                        style={{ 
                                          borderColor: nesaColors.gold,
                                          color: nesaColors.gold
                                        }}
                                      >
                                        {phase.ctaText}
                                        <ChevronRight className="w-3 h-3" />
                                      </Button>
                                    </Link>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Dates Summary */}
            <div className="max-w-4xl mx-auto mt-16">
              <h3 className="text-xl font-bold text-white mb-6 text-center">
                Key Dates at a Glance
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Platinum Show", date: "28 Feb 2026", icon: Tv },
                  { label: "Icon Nominations Close", date: "30 Apr 2026", icon: Award },
                  { label: "Gold Voting Opens", date: "10 Apr 2026", icon: Vote },
                  { label: "Gold Show", date: "17 May 2026", icon: Tv },
                  { label: "Blue Garnet Voting", date: "18 May – 17 Jun 2026", icon: Vote },
                  { label: "Blue Garnet Gala", date: "27 Jun 2026", icon: Ticket },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl border"
                    style={{ 
                      backgroundColor: `${nesaColors.gold}05`,
                      borderColor: `${nesaColors.gold}20`
                    }}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" style={{ color: nesaColors.gold }} />
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs" style={{ color: nesaColors.textMuted }}>{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Link to="/nominate">
                <Button 
                  size="lg"
                  className="gap-2 font-bold"
                  style={{ backgroundColor: nesaColors.gold, color: nesaColors.dark }}
                >
                  Start Your NESA Journey
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Calendar;
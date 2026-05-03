import { useState } from "react";
import { Link } from "react-router-dom";
import { Megaphone } from "lucide-react";

/**
 * Slim, professional top ticker. Smooth marquee (no flashing).
 * - Pause on hover/focus
 * - Reduced-motion fallback (static list)
 * - Accessible: role=marquee, aria-live=off (decorative continuous loop)
 */

type Item = { icon: string; label: string; href: string };

const ITEMS: Item[] = [
  { icon: "🎓", label: "Scholarship 2026 Open", href: "/scholarship/eduaid-2026" },
  { icon: "🏫", label: "Nominate a School", href: "/nominate" },
  { icon: "💰", label: "Donate Now", href: "/donate" },
  { icon: "🗳", label: "Vote with AGC", href: "/vote" },
  { icon: "📺", label: "Watch NESA TV", href: "/media/nesa-tv" },
  { icon: "📅", label: "EduAid Training Calendar — July 2026", href: "/programs/training-development" },
  { icon: "🎯", label: "My Career My Life — August 2026", href: "/programs/my-career-my-life" },
];

export const AnnouncementTicker = () => {
  const [paused, setPaused] = useState(false);
  // Duplicate the list so the marquee loops seamlessly.
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div
      className="border-b border-scef-gold/30 bg-scef-blue-darker text-white"
      role="region"
      aria-label="Latest announcements"
    >
      <div className="container mx-auto flex items-center gap-3 px-4 py-2 md:px-8">
        <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-scef-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-scef-blue-darker sm:inline-flex">
          <Megaphone className="h-3 w-3" /> Live
        </span>

        <div
          className="group relative flex-1 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-scef-blue-darker to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-scef-blue-darker to-transparent" />

          <div
            className="flex min-w-max gap-8 whitespace-nowrap py-1 motion-safe:animate-[ticker_45s_linear_infinite] motion-reduce:animate-none"
            style={{ animationPlayState: paused ? "paused" : "running" }}
            aria-hidden="false"
          >
            {loop.map((item, i) => (
              <Link
                key={`${item.href}-${i}`}
                to={item.href}
                className="inline-flex items-center gap-2 text-xs font-medium text-white/90 transition-colors hover:text-scef-gold focus-visible:text-scef-gold focus-visible:outline-none md:text-sm"
              >
                <span aria-hidden>{item.icon}</span>
                <span>{item.label}</span>
                <span className="text-scef-gold/60" aria-hidden>•</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee keyframes scoped here so we don't touch tailwind config */}
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default AnnouncementTicker;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Megaphone,
  School,
  Tv,
  Vote,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import scholarshipImg from "@/assets/digital-board/eduaid-africa-flyer.jpg";
import rmsaImg from "@/assets/digital-board/rebuild-school-flyer.jpg";
import specialNeedsImg from "@/assets/digital-board/special-needs-flyer.jpg";
import mediaImg from "@/assets/digital-board/media-hub-flyer.jpg";

/**
 * SCEF Digital Board — combined system:
 * 1. Top marquee ticker (pause on hover, reduced-motion safe)
 * 2. Hero rotating image-card carousel (auto-advance, swipe, prev/next, dots)
 * 3. Live activity feed strip ("Reporting in progress" placeholders)
 *
 * Uses semantic SCEF tokens (scef-blue-darker, scef-gold). No flashing/blinking.
 */

type Slide = {
  badge: string;
  title: string;
  description: string;
  cta: { label: string; href: string };
  icon: React.ComponentType<{ className?: string }>;
  image: string;
};

const slides: Slide[] = [
  {
    badge: "Scholarship Open",
    title: "EduAid-Africa Scholarship 2026–2027",
    description:
      "Apply for vocational, college, polytechnic, university and professional certification support.",
    cta: { label: "Apply Now", href: "/scholarship/eduaid-2026" },
    icon: GraduationCap,
    image: scholarshipImg,
  },
  {
    badge: "Rebuild a School",
    title: "Rebuild My School Africa",
    description:
      "Nominate, donate, adopt or vote with AGC to support schools across Africa.",
    cta: { label: "Nominate a School", href: "/nominate" },
    icon: School,
    image: rmsaImg,
  },
  {
    badge: "Inclusion First",
    title: "Support Special Needs Schools",
    description:
      "Help schools for the blind, deaf, autism centres, inclusive schools and vocational institutions.",
    cta: { label: "Support Now", href: "/programs/special-needs-education" },
    icon: Vote,
    image: specialNeedsImg,
  },
  {
    badge: "Media & Advocacy",
    title: "NESA TV & It's In Me Radio",
    description:
      "Watch education advocacy stories, school transformation updates and African education leaders.",
    cta: { label: "Watch Stories", href: "/media/nesa-tv" },
    icon: Tv,
    image: mediaImg,
  },
];

const tickerItems = [
  { icon: "🎓", label: "EduAid-Africa Scholarship 2026–2027 Now Open", href: "/scholarship/eduaid-2026" },
  { icon: "🏫", label: "Nominate a School for Rebuild My School Africa", href: "/nominate" },
  { icon: "♿", label: "Support Special Needs Schools Across Africa", href: "/programs/special-needs-education" },
  { icon: "🗳", label: "Vote with AGC through GFA Wallet", href: "/vote" },
  { icon: "🤝", label: "Partner with SCEF for CSR Education Funds", href: "/partner-with-us" },
];

// Per project rules: unverified metrics must show "Reporting in progress".
const liveStats = [
  { label: "Schools nominated", value: "Reporting in progress" },
  { label: "AGC votes cast", value: "Reporting in progress" },
  { label: "Active campaigns", value: "Reporting in progress" },
  { label: "Scholarship applications", value: "Reporting in progress" },
];

export const SCEFDigitalBoard = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(m.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const timer = window.setInterval(
      () => setActive((prev) => (prev + 1) % slides.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion]);

  const slide = slides[active];
  const Icon = slide.icon;

  const next = () => setActive((a) => (a + 1) % slides.length);
  const prev = () => setActive((a) => (a - 1 + slides.length) % slides.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  // Duplicate ticker list for seamless marquee loop
  const ticker = [...tickerItems, ...tickerItems];

  return (
    <section aria-label="SCEF announcements and live activity" className="bg-background">
      {/* 1. Top ticker */}
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
            className="relative flex-1 overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-scef-blue-darker to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-scef-blue-darker to-transparent" />
            <div
              className="flex min-w-max gap-8 whitespace-nowrap py-1 motion-safe:animate-[scef-marquee_45s_linear_infinite] motion-reduce:animate-none"
              style={{ animationPlayState: paused ? "paused" : "running" }}
            >
              {ticker.map((item, i) => (
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
      </div>

      {/* 2. Hero digital board */}
      <div className="container mx-auto grid gap-6 px-4 py-10 md:grid-cols-2 md:gap-10 md:px-8 md:py-14">
        {/* Copy column */}
        <div className="flex flex-col justify-center">
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-scef-gold-dark">
            <Megaphone className="h-3.5 w-3.5" /> Smart Digital Announcement Board
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-scef-blue-darker md:text-4xl lg:text-5xl">
            Transforming Education Across Africa
          </h2>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
            Stay updated on SCEF services, scholarships, school rebuilding campaigns, AGC voting,
            CSR partnerships and education advocacy programs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-scef-blue-darker text-white hover:bg-scef-blue">
              <Link to="/wallet/donate">Donate Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-scef-blue-darker text-scef-blue-darker"
            >
              <Link to="/nominate">Nominate a School</Link>
            </Button>
          </div>
        </div>

        {/* Carousel column */}
        <div
          className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-border"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
          aria-label="Featured announcements"
        >
          <div className="relative aspect-[4/3] w-full sm:aspect-[5/4] md:aspect-[4/3]">
            {slides.map((s, i) => (
              <article
                key={s.title}
                aria-hidden={i !== active}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === active ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
              >
                <img
                  src={s.image}
                  alt=""
                  aria-hidden
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/40 to-[#0A0A0A]/10" />
              </article>
            ))}

            {/* Active slide content */}
            <div
              key={`content-${active}`}
              className="relative flex h-full flex-col justify-end p-5 text-white motion-safe:animate-fade-in md:p-8"
              aria-live="polite"
            >
              <span className="mb-3 inline-flex w-fit items-center rounded-full bg-scef-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-scef-blue-darker">
                {slide.badge}
              </span>
              <div className="flex items-start gap-3">
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm md:inline-flex">
                  <Icon className="h-5 w-5 text-scef-gold" />
                </span>
                <h3 className="font-display text-xl font-bold leading-tight md:text-2xl lg:text-3xl">
                  {slide.title}
                </h3>
              </div>
              <p className="mt-2 max-w-md text-sm text-white/85 md:text-base">
                {slide.description}
              </p>
              <Button
                asChild
                className="mt-4 w-fit bg-scef-gold font-bold text-[#0A0A0A] hover:bg-scef-gold-hover"
              >
                <Link to={slide.cta.href}>{slide.cta.label}</Link>
              </Button>
            </div>

            {/* Side controls */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous announcement"
              className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next announcement"
              className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors hover:bg-white/35"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div
              className="absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5"
              role="tablist"
              aria-label="Choose announcement"
            >
              {slides.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to ${s.badge}`}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? "w-7 bg-scef-gold" : "w-2.5 bg-white/60 hover:bg-white/85"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Live activity feed */}
      <div className="container mx-auto px-4 pb-10 md:px-8">
        <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-sm md:px-6">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-scef-gold opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-scef-gold" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-scef-blue-darker">
              Live Activity
            </span>
          </div>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {liveStats.map((stat) => (
              <li key={stat.label} className="rounded-lg bg-background p-3 ring-1 ring-border">
                <p className="text-sm font-bold text-scef-blue-darker md:text-base">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @keyframes scef-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default SCEFDigitalBoard;

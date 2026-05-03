import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play, GraduationCap, School, Award, Heart, Handshake, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Hero-adjacent rotating campaign board.
 * - Auto-advance every 5s, pause on hover/focus, manual prev/next + dots
 * - Smooth fade+slide transitions (no flashing)
 * - Respects prefers-reduced-motion (no auto-advance)
 * - Mobile-first; one slide visible at a time
 */

type Slide = {
  eyebrow: string;
  title: string;
  desc: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  Icon: React.ComponentType<{ className?: string }>;
  accent: "gold" | "blue";
};

const SLIDES: Slide[] = [
  {
    eyebrow: "Scholarship Open",
    title: "EduAid-Africa Scholarship 2026–2027",
    desc: "Apply for vocational, college, polytechnic and tertiary scholarships across Africa.",
    cta: { label: "Apply Now", href: "/scholarship/eduaid-2026" },
    ctaSecondary: { label: "Learn More", href: "/scholarship/eduaid-2026" },
    Icon: GraduationCap,
    accent: "gold",
  },
  {
    eyebrow: "Rebuild My School Africa",
    title: "Nominate a School in Your Region",
    desc: "Help rebuild classrooms, libraries and inclusive learning spaces through verified community nominations.",
    cta: { label: "Nominate a School", href: "/nominate" },
    ctaSecondary: { label: "Adopt a School", href: "/wallet/donate" },
    Icon: School,
    accent: "blue",
  },
  {
    eyebrow: "Inclusion is Non-Negotiable",
    title: "Support Special Needs Education",
    desc: "Schools for the blind, deaf, autism centres and inclusive vocational training need your backing.",
    cta: { label: "Support Now", href: "/programs/special-needs-education" },
    Icon: Heart,
    accent: "gold",
  },
  {
    eyebrow: "NESA-Africa Awards",
    title: "Call for Entries — Recognize Education Champions",
    desc: "Nominate institutions, leaders and innovators advancing African education.",
    cta: { label: "Nominate Now", href: "/programs/nesa-africa" },
    ctaSecondary: { label: "Vote with AGC", href: "/vote" },
    Icon: Award,
    accent: "blue",
  },
  {
    eyebrow: "CSR Partnership",
    title: "Manage Education Funds with Accountability",
    desc: "Allocate, deploy and monitor CSR funds via GFA Wallet with public reporting.",
    cta: { label: "Partner With Us", href: "/partner-with-us" },
    Icon: Handshake,
    accent: "gold",
  },
  {
    eyebrow: "Voice & Visibility",
    title: "NESA TV · It's In Me Radio",
    desc: "Watch and listen to leaders, learners and changemakers shaping education across Africa.",
    cta: { label: "Watch NESA TV", href: "/media/nesa-tv" },
    ctaSecondary: { label: "Listen to Radio", href: "/media/its-in-me-radio" },
    Icon: Radio,
    accent: "blue",
  },
];

const INTERVAL_MS = 5000;

export const AnnouncementBoard = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(m.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    timer.current = window.setTimeout(next, INTERVAL_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, paused, reducedMotion, next]);

  const slide = SLIDES[index];
  const accentBg = slide.accent === "gold" ? "bg-scef-gold/10" : "bg-scef-blue-darker/5";
  const accentRing = slide.accent === "gold" ? "ring-scef-gold/40" : "ring-scef-blue-darker/30";
  const iconBg = slide.accent === "gold" ? "bg-scef-gold text-scef-blue-darker" : "bg-scef-blue-darker text-scef-gold";

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured announcements"
      className="border-b border-border bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container mx-auto px-4 py-6 md:px-8 md:py-8">
        <div
          className={`relative overflow-hidden rounded-2xl border border-border ${accentBg} ring-1 ${accentRing} transition-colors duration-500`}
        >
          {/* Slide */}
          <div
            key={index}
            className="grid items-center gap-6 px-5 py-6 motion-safe:animate-fade-in md:grid-cols-[auto_1fr_auto] md:px-8 md:py-7"
            aria-live="polite"
          >
            <div className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-sm md:flex ${iconBg}`}>
              <slide.Icon className="h-7 w-7" />
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-scef-gold-dark md:text-xs">
                {slide.eyebrow}
              </p>
              <h3 className="mt-1 font-display text-lg font-bold leading-tight text-scef-blue-darker md:text-2xl">
                {slide.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground md:text-base">
                {slide.desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 md:justify-end">
              <Button asChild size="sm" className="bg-scef-blue-darker text-white hover:bg-scef-blue">
                <Link to={slide.cta.href}>{slide.cta.label}</Link>
              </Button>
              {slide.ctaSecondary && (
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="border-scef-blue-darker text-scef-blue-darker"
                >
                  <Link to={slide.ctaSecondary.href}>{slide.ctaSecondary.label}</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between border-t border-border bg-background/60 px-3 py-2 md:px-5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous announcement"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-scef-blue-darker transition-colors hover:bg-scef-blue-darker hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Resume auto-advance" : "Pause auto-advance"}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-scef-blue-darker transition-colors hover:bg-scef-blue-darker hover:text-white"
              >
                {paused || reducedMotion ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next announcement"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-scef-blue-darker transition-colors hover:bg-scef-blue-darker hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose announcement">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to ${s.eyebrow}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-scef-gold" : "w-2.5 bg-scef-blue-darker/25 hover:bg-scef-blue-darker/50"
                  }`}
                />
              ))}
            </div>

            <span className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground md:inline">
              {index + 1} / {SLIDES.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementBoard;

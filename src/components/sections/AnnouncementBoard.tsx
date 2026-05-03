import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

import scholarshipImg from "@/assets/digital-board/eduaid-africa-flyer.jpg";
import rmsaImg from "@/assets/digital-board/rebuild-school-flyer.jpg";
import specialNeedsImg from "@/assets/digital-board/special-needs-flyer.jpg";
import nesaImg from "@/assets/digital-board/nesa-africa-flyer.jpg";
import partnerImg from "@/assets/digital-board/get-involved-flyer.jpg";
import mediaImg from "@/assets/digital-board/media-hub-flyer.jpg";

/**
 * Hero-adjacent rotating campaign board (image cards).
 * - Auto-advance every 5s, pause on hover/focus, manual prev/next + dots
 * - Smooth fade transitions (no flashing)
 * - Touch swipe on mobile
 * - Respects prefers-reduced-motion
 */

type Badge = "LIVE" | "NEW" | "URGENT" | "FEATURED";

type Slide = {
  badge?: Badge;
  eyebrow: string;
  title: string;
  desc: string;
  cta: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  image: string;
};

const SLIDES: Slide[] = [
  {
    badge: "LIVE",
    eyebrow: "Scholarship Open",
    title: "EduAid-Africa Scholarship 2026–2027",
    desc: "Apply now for funding across vocational, college, polytechnic and tertiary education.",
    cta: { label: "Apply Now", href: "/scholarship/eduaid-2026" },
    ctaSecondary: { label: "Learn More", href: "/scholarship/eduaid-2026" },
    image: scholarshipImg,
  },
  {
    badge: "FEATURED",
    eyebrow: "Rebuild My School Africa",
    title: "Nominate a School in Your Region",
    desc: "Help rebuild classrooms, libraries and inclusive learning spaces through verified nominations.",
    cta: { label: "Nominate", href: "/nominate" },
    ctaSecondary: { label: "Adopt a School", href: "/wallet/donate" },
    image: rmsaImg,
  },
  {
    badge: "URGENT",
    eyebrow: "Inclusion Is Non-Negotiable",
    title: "Support Special Needs Education",
    desc: "Schools for the blind, deaf, autism centres and inclusive vocational training need backing.",
    cta: { label: "Support Now", href: "/programs/special-needs-education" },
    image: specialNeedsImg,
  },
  {
    badge: "NEW",
    eyebrow: "NESA-Africa Awards",
    title: "Call for Entries — Recognize Education Champions",
    desc: "Nominate institutions, leaders and innovators advancing African education.",
    cta: { label: "Nominate", href: "/programs/nesa-africa" },
    ctaSecondary: { label: "Vote with AGC", href: "/vote" },
    image: nesaImg,
  },
  {
    badge: "FEATURED",
    eyebrow: "CSR Partnership",
    title: "Manage Education Funds with Accountability",
    desc: "Allocate, deploy and monitor CSR funds via GFA Wallet with transparent public reporting.",
    cta: { label: "Partner With Us", href: "/partner-with-us" },
    image: partnerImg,
  },
  {
    eyebrow: "Voice & Visibility",
    title: "NESA TV · It's In Me Radio",
    desc: "Watch and listen to leaders, learners and changemakers shaping African education.",
    cta: { label: "Watch", href: "/media/nesa-tv" },
    ctaSecondary: { label: "Listen", href: "/media/its-in-me-radio" },
    image: mediaImg,
  },
];

const INTERVAL_MS = 5500;

const badgeStyles: Record<Badge, string> = {
  LIVE: "bg-scef-gold text-scef-blue-darker",
  NEW: "bg-scef-gold text-scef-blue-darker",
  URGENT: "bg-destructive text-destructive-foreground",
  FEATURED: "bg-white text-scef-blue-darker",
};

export const AnnouncementBoard = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timer = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

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

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured announcements"
      className="bg-background"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container mx-auto px-4 py-8 md:px-8 md:py-10">
        <div
          className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-border"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Slides stack — fade between them */}
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9] md:aspect-[24/9]">
            {SLIDES.map((s, i) => {
              const active = i === index;
              return (
                <article
                  key={s.title}
                  aria-hidden={!active}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    active ? "opacity-100" : "pointer-events-none opacity-0"
                  }`}
                >
                  {/* Background image */}
                  <img
                    src={s.image}
                    alt=""
                    aria-hidden
                    loading={i === 0 ? "eager" : "lazy"}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Gradient overlay (black → transparent, top) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0A0A0A]/45 to-[#0A0A0A]/15" />
                  <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker/55 via-transparent to-transparent" />

                  {/* Content */}
                  <div className="relative flex h-full flex-col justify-end p-5 text-white md:p-10">
                    <div className="max-w-2xl">
                      {s.badge && (
                        <span
                          className={`mb-3 inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] ${badgeStyles[s.badge]}`}
                        >
                          {s.badge === "LIVE" && (
                            <span className="me-1.5 inline-block h-1.5 w-1.5 rounded-full bg-scef-blue-darker motion-safe:animate-pulse" />
                          )}
                          {s.badge}
                        </span>
                      )}
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-scef-gold md:text-xs">
                        {s.eyebrow}
                      </p>
                      <h3 className="mt-1.5 font-display text-xl font-bold leading-tight md:text-3xl lg:text-4xl">
                        {s.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm text-white/85 md:text-base">
                        {s.desc}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-2 md:mt-5">
                        <Button
                          asChild
                          className="bg-scef-gold font-bold text-[#0A0A0A] hover:bg-scef-gold-hover"
                        >
                          <Link to={s.cta.href}>{s.cta.label}</Link>
                        </Button>
                        {s.ctaSecondary && (
                          <Button
                            asChild
                            variant="outline"
                            className="border-white/70 bg-transparent text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                          >
                            <Link to={s.ctaSecondary.href}>{s.ctaSecondary.label}</Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Side controls (desktop) */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous announcement"
              className="absolute left-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:inline-flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next announcement"
              className="absolute right-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/55 md:inline-flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Footer controls — dots + play/pause + counter */}
          <div className="flex items-center justify-between gap-3 border-t border-border bg-background px-4 py-2.5 md:px-5">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Resume auto-advance" : "Pause auto-advance"}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-scef-blue-darker transition-colors hover:bg-scef-blue-darker hover:text-white"
            >
              {paused || reducedMotion ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
            </button>

            <div className="flex flex-1 items-center justify-center gap-1.5" role="tablist" aria-label="Choose announcement">
              {SLIDES.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to ${s.eyebrow}`}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-7 bg-scef-gold" : "w-2.5 bg-scef-blue-darker/25 hover:bg-scef-blue-darker/50"
                  }`}
                />
              ))}
            </div>

            <span className="min-w-[42px] text-right text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {index + 1} / {SLIDES.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementBoard;

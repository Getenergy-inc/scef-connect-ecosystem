import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import scholarshipImg from "@/assets/digital-board/eduaid-africa-flyer.jpg";
import rmsaImg from "@/assets/digital-board/rebuild-school-flyer.jpg";
import specialNeedsImg from "@/assets/digital-board/special-needs-flyer.jpg";
import nesaImg from "@/assets/digital-board/nesa-africa-flyer.jpg";
import nesaTvImg from "@/assets/digital-board/nesa-tv-flyer.jpg";

type Badge = "LIVE" | "NEW" | "URGENT" | "FEATURED";

type Slide = {
  image: string;
  badge: Badge;
  title: string;
  blurb: string;
  cta: string;
  href: string;
};

const slides: Slide[] = [
  {
    image: scholarshipImg,
    badge: "LIVE",
    title: "EduAid-Africa Scholarship 2026–2027",
    blurb: "Applications open for African students across all regions.",
    cta: "Apply Now",
    href: "/scholarship/eduaid-2026",
  },
  {
    image: rmsaImg,
    badge: "URGENT",
    title: "Rebuild My School Africa",
    blurb: "Nominate a school in your community for renewal and equipment.",
    cta: "Nominate a School",
    href: "/nominate",
  },
  {
    image: specialNeedsImg,
    badge: "FEATURED",
    title: "Special Needs School Support",
    blurb: "Adopt a special needs school and help transform inclusive education.",
    cta: "Support Now",
    href: "/programs/special-needs-education",
  },
  {
    image: nesaImg,
    badge: "NEW",
    title: "NESA-Africa Awards",
    blurb: "Celebrating Africa's most impactful education changemakers.",
    cta: "Learn More",
    href: "/programs/nesa-africa",
  },
  {
    image: nesaTvImg,
    badge: "LIVE",
    title: "NESA TV — Advocacy Media",
    blurb: "Watch education leaders, policy stories and program updates.",
    cta: "Watch Now",
    href: "/media/nesa-tv",
  },
];

const badgeStyles: Record<Badge, string> = {
  LIVE: "bg-red-500 text-white",
  NEW: "bg-[#D4AF37] text-[#0A0A0A]",
  URGENT: "bg-orange-500 text-white",
  FEATURED: "bg-[#0B5D3B] text-white",
};

export const HeroDigitalBoard = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((p) => (p + 1) % slides.length),
    [],
  );
  const prev = useCallback(
    () => setActive((p) => (p - 1 + slides.length) % slides.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(next, 5000);
    return () => window.clearInterval(t);
  }, [paused, next]);

  return (
    <section
      className="bg-background py-10 md:py-14"
      aria-label="Featured advocacy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-[#0A0A0A] shadow-xl">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            {slides.map((s, i) => (
              <div
                key={s.title}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  i === active ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                aria-hidden={i !== active}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                />
                {/* Brand overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/85 via-[#0B5D3B]/55 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex items-end md:items-center">
                  <div className="w-full max-w-2xl p-6 md:p-12">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${badgeStyles[s.badge]}`}
                    >
                      {s.badge}
                    </span>
                    <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-white md:text-4xl">
                      {s.title}
                    </h2>
                    <p className="mt-2 max-w-lg text-sm text-white/85 md:text-base">
                      {s.blurb}
                    </p>
                    <Link
                      to={s.href}
                      className="mt-5 inline-flex items-center rounded-lg bg-[#D4AF37] px-6 py-3 text-sm font-semibold text-[#0A0A0A] shadow-lg transition-all hover:bg-[#E5C24A] hover:shadow-xl"
                    >
                      {s.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70 md:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition hover:bg-black/70 md:inline-flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div
            className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2"
            role="tablist"
            aria-label="Slide navigation"
          >
            {slides.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active
                    ? "w-8 bg-[#D4AF37]"
                    : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDigitalBoard;

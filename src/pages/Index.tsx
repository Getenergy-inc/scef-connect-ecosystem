import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Heart, GraduationCap, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";

import advocacyImg from "@/assets/hero-education.jpg";
import womenGirlsImg from "@/assets/digital-board/women-girls-education-flyer.jpg";
import csrImg from "@/assets/digital-board/programs-hub-flyer.jpg";

/**
 * Minimal Welcome Landing — full-bleed rotating advocacy backdrops with
 * primary CTA links. The richer marketing page lives at /home.
 */

const backdrops = [
  {
    src: advocacyImg,
    eyebrow: "Education Advocacy",
    headline: "Empowering Africa Through Education",
  },
  {
    src: womenGirlsImg,
    eyebrow: "Women & Girls Education",
    headline: "Equal Access. Stronger Futures.",
  },
  {
    src: csrImg,
    eyebrow: "CSR Education Funds Management",
    headline: "Trusted Stewardship of Education Funding",
  },
];

const ctas = [
  { label: "Explore Programs", href: "/home", icon: ArrowRight, primary: true },
  { label: "Donate / Fund a School", href: "/wallet/donate", icon: Heart },
  { label: "Apply for Scholarship", href: "/scholarship/eduaid-2026", icon: GraduationCap },
  { label: "Partner With Us", href: "/partner-with-us", icon: Briefcase },
  { label: "Join SCEF", href: "/get-involved/membership", icon: Users },
];

const Index = () => {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(m.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    m.addEventListener?.("change", handler);
    return () => m.removeEventListener?.("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const t = window.setInterval(
      () => setActive((p) => (p + 1) % backdrops.length),
      6500,
    );
    return () => window.clearInterval(t);
  }, [reducedMotion]);

  const current = backdrops[active];

  return (
    <>
      <Helmet>
        <title>Santos Creations Educational Foundation — Welcome</title>
        <meta
          name="description"
          content="Welcome to Santos Creations Educational Foundation. Pan-African education advocacy, scholarships, school rebuilding and CSR funds management."
        />
        <link rel="canonical" href="https://santoscreations.org" />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden bg-scef-blue-darker text-white">
        <HeaderScreenshot />

        {/* Rotating full-bleed backdrops */}
        <div className="absolute inset-0">
          {backdrops.map((b, i) => (
            <img
              key={b.src}
              src={b.src}
              alt=""
              aria-hidden
              loading={i === 0 ? "eager" : "lazy"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ease-in-out ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          {/* Readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-scef-blue-darker/85 via-scef-blue-darker/60 to-scef-blue-darker/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--scef-blue-darker)/0.4)_100%)]" />
        </div>

        {/* Content */}
        <main className="relative z-10 flex min-h-screen flex-col">
          <div className="h-[88px] md:h-[96px]" />

          <div className="container mx-auto flex flex-1 flex-col items-center justify-center px-4 py-12 text-center md:px-8">
            <p
              key={`eyebrow-${active}`}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-scef-gold/40 bg-scef-blue-darker/50 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-scef-gold backdrop-blur-sm motion-safe:animate-fade-in"
            >
              {current.eyebrow}
            </p>

            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
              Welcome to{" "}
              <span className="block text-scef-gold">Santos Creations</span>
              <span className="block text-2xl font-semibold text-white/85 md:text-3xl lg:text-4xl">
                Educational Foundation
              </span>
            </h1>

            <p
              key={`headline-${active}`}
              className="mt-6 max-w-2xl text-base text-white/85 motion-safe:animate-fade-in md:text-lg"
            >
              {current.headline}
            </p>

            {/* Primary CTAs */}
            <div className="mt-10 flex w-full max-w-3xl flex-wrap items-center justify-center gap-3">
              {ctas.map((cta) => {
                const Icon = cta.icon;
                return (
                  <Button
                    key={cta.href}
                    asChild
                    size="lg"
                    variant={cta.primary ? "default" : "outline"}
                    className={
                      cta.primary
                        ? "bg-scef-gold font-bold text-scef-blue-darker hover:bg-scef-gold-hover"
                        : "border-white/40 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                    }
                  >
                    <Link to={cta.href} className="inline-flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {cta.label}
                    </Link>
                  </Button>
                );
              })}
            </div>

            {/* Backdrop indicators */}
            <div className="mt-12 flex items-center justify-center gap-2" role="tablist" aria-label="Featured advocacy">
              {backdrops.map((b, i) => (
                <button
                  key={b.src}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show ${b.eyebrow}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-10 bg-scef-gold" : "w-4 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;

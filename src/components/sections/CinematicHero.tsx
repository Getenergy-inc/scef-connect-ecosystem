import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-classroom.jpg";
import heroVideo from "@/assets/nesa-hero-bg-video.mp4";

/**
 * Cinematic, full-screen institutional hero.
 * Fullscreen autoplay muted looping video over a static image fallback.
 * Premium dark gradient wash + gold accent CTAs.
 */
export const CinematicHero = () => {
  const keywords = ["Educate.", "Empower.", "Advocate.", "Transform."];

  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{ minHeight: "min(94vh, 920px)" }}
    >
      {/* Static image fallback — visible until video loads, also used on devices that block autoplay */}
      <div className="absolute inset-0 -z-20">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full object-cover animate-[heroZoom_28s_ease-in-out_infinite_alternate]"
          aria-hidden="true"
        />
      </div>

      {/* Cinematic video — autoplay muted looping */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={heroVideo}
        poster={heroImage}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Cinematic gradient wash — deeper, richer */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-scef-blue-darker/70 via-scef-blue-darker/85 to-scef-blue-darker" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,hsl(45_92%_42%/0.20),transparent_55%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,hsl(217_91%_18%/0.55),transparent_50%)]" />

      {/* Subtle grain/film texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Floating keyword overlays — desktop only, more subtle */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden lg:block">
        {keywords.map((word, i) => (
          <span
            key={word}
            className="absolute font-display text-white/[0.045] font-bold select-none"
            style={{
              fontSize: `${5 + i * 1.6}rem`,
              top: `${12 + i * 19}%`,
              left: i % 2 === 0 ? `${4 + i * 4}%` : "auto",
              right: i % 2 !== 0 ? `${4 + i * 4}%` : "auto",
              animation: `floatY ${10 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Content — generous spacing */}
      <div className="relative z-10 container mx-auto flex min-h-[inherit] flex-col justify-center px-6 py-28 md:px-8 md:py-36">
        <div className="max-w-4xl animate-fade-up">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-scef-gold/30 bg-scef-gold/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-scef-gold animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-scef-gold-light">
              Santos Creations Educational Foundation
            </span>
          </div>

          <h1 className="font-display text-[2.5rem] font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[5rem]">
            Empowering Africa Through{" "}
            <span className="text-gradient-gold italic">Education</span>,
            Innovation, and Opportunity.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            A membership-driven foundation advancing education across regions
            through advocacy, digital access, and strategic partnerships.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker shadow-gold hover:bg-scef-gold-hover"
              asChild
            >
              <Link to="/get-involved/membership">
                Explore Membership
                <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-white/40 bg-white/5 px-7 font-semibold text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
              asChild
            >
              <Link to="/donate">Support the Mission</Link>
            </Button>
          </div>
        </div>

        {/* Bottom meta strip — refined, more breathing room */}
        <div className="mt-20 hidden max-w-2xl grid-cols-4 gap-x-10 border-t border-white/10 pt-8 sm:grid md:mt-24">
          {[
            { k: "Founded", v: "1997" },
            { k: "Regions", v: "5+" },
            { k: "Programs", v: "8+" },
            { k: "Languages", v: "9" },
          ].map((m) => (
            <div key={m.k}>
              <div className="font-display text-2xl font-bold text-scef-gold">
                {m.v}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/50">
                {m.k}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-2 text-white/55">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
            Scroll
          </span>
          <span className="relative block h-9 w-5 rounded-full border border-white/40">
            <span className="absolute left-1/2 top-1.5 block h-1.5 w-0.5 -translate-x-1/2 animate-[scrollDot_1.8s_ease-in-out_infinite] rounded-full bg-scef-gold" />
          </span>
        </div>
      </div>

      <style>{`
        @keyframes heroZoom {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes scrollDot {
          0% { transform: translate(-50%, 0); opacity: 1; }
          70% { transform: translate(-50%, 14px); opacity: 0; }
          100% { transform: translate(-50%, 0); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import heroVideo from "@/assets/nesa-hero-bg-video.mp4";

/**
 * Cinematic, full-screen institutional hero.
 * Fullscreen autoplay muted looping video with image fallback (Ken Burns).
 * Premium dark gradient wash + gold accent CTAs.
 */
export const CinematicHero = () => {
  const keywords = ["Educate.", "Empower.", "Advocate.", "Transform."];

  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{ minHeight: "min(94vh, 920px)" }}
    >
      {/* Background video with image poster fallback */}
      <div className="absolute inset-0 -z-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={heroImage}
          className="h-full w-full object-cover animate-[heroZoom_28s_ease-in-out_infinite_alternate]"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        {/* Image fallback layer (covered by video when it loads) */}
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          aria-hidden="true"
        />
      </div>

      {/* Cinematic gradient wash */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-scef-blue-darker/85 via-scef-blue-darker/70 to-scef-blue-darker/95" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,hsl(45_92%_42%/0.18),transparent_55%)]" />

      {/* Floating keyword overlays */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        {keywords.map((word, i) => (
          <span
            key={word}
            className="absolute font-display text-white/[0.06] font-bold select-none"
            style={{
              fontSize: `${4 + i * 1.5}rem`,
              top: `${15 + i * 18}%`,
              left: i % 2 === 0 ? `${5 + i * 4}%` : "auto",
              right: i % 2 !== 0 ? `${5 + i * 4}%` : "auto",
              animation: `floatY ${8 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-[inherit] flex-col justify-center px-4 py-24 md:py-32">
        <div className="max-w-4xl animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-scef-gold/30 bg-scef-gold/10 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-scef-gold animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-scef-gold-light">
              Santos Creations Educational Foundation
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering Africa Through{" "}
            <span className="text-gradient-gold">Education, Innovation,</span>{" "}
            and Opportunity
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            SCEF connects advocacy, digital learning, awards, partnerships, and
            funding solutions to advance education across 57 African countries.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker shadow-gold hover:bg-scef-gold-hover"
              asChild
            >
              <Link to="/programs">
                Explore Our Services
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
            <Link
              to="/about"
              className="ms-2 inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-scef-gold"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 transition-colors group-hover:border-scef-gold">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              Watch our story
            </Link>
          </div>
        </div>

        {/* Bottom meta strip */}
        <div className="mt-16 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-4 border-t border-white/10 pt-8 sm:grid-cols-4">
          {[
            { k: "Founded", v: "1997" },
            { k: "Countries", v: "57" },
            { k: "Programs", v: "8+" },
            { k: "Languages", v: "9" },
          ].map((m) => (
            <div key={m.k}>
              <div className="font-display text-2xl font-bold text-scef-gold">
                {m.v}
              </div>
              <div className="text-[11px] uppercase tracking-[0.16em] text-white/55">
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

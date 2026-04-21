import { useEffect, useRef, useState } from "react";
import { Globe2, GraduationCap, Handshake, Award, HeartHandshake } from "lucide-react";

/**
 * Impact Band — labels only, no numbers.
 * Premium icon-led layout with staggered fade-up reveal on scroll.
 */
const items = [
  { icon: Globe2, label: "Regions Reached" },
  { icon: GraduationCap, label: "Learners Impacted" },
  { icon: Handshake, label: "Partners & Sponsors" },
  { icon: Award, label: "Recognized Leaders" },
  { icon: HeartHandshake, label: "Volunteers" },
];

export const ImpactBand = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-scef-blue-darker py-24 md:py-32"
    >
      {/* Premium background treatment */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(45_92%_42%/0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-scef-pattern opacity-[0.04]" />
      <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-scef-gold/40 to-transparent" />
      <div className="absolute bottom-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-scef-gold/40 to-transparent" />

      <div className="container relative mx-auto px-6 md:px-8">
        <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
          Our Reach
        </p>
        <h2 className="mb-14 text-center font-display text-2xl font-bold text-white md:text-3xl">
          Building education impact across Africa
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-5 md:gap-y-0">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="group relative flex flex-col items-center text-center transition-all duration-700 ease-out"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 110}ms`,
                }}
              >
                {/* Glassmorphic icon plate */}
                <div className="relative mb-5">
                  <div className="absolute inset-0 rounded-2xl bg-scef-gold/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 md:w-[72px] md:h-[72px] rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm flex items-center justify-center group-hover:border-scef-gold/40 group-hover:bg-scef-gold/5 transition-all duration-500">
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-scef-gold transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                  </div>
                </div>

                <div className="text-sm md:text-base font-semibold leading-tight text-white">
                  {item.label}
                </div>
                <div className="mt-2 h-px w-8 bg-scef-gold/30 group-hover:w-12 group-hover:bg-scef-gold transition-all duration-500" />
              </div>
            );
          })}
        </div>

        <p className="mt-14 text-center text-xs text-white/40">
          Reporting in progress — verified figures coming with our 2026 impact report.
        </p>
      </div>
    </section>
  );
};

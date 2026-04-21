import { useEffect, useRef, useState } from "react";

/**
 * Single horizontal impact band with animated count-up on scroll into view.
 * Numbers reflect institutional foundational targets ("Reporting in progress" rule).
 */
const stats = [
  { value: 54, suffix: "+", label: "Regions Reached" },
  { value: 15000, suffix: "+", label: "Learners Impacted", format: "k" },
  { value: 500, suffix: "+", label: "Partners & Sponsors" },
  { value: 300, suffix: "+", label: "Recognized Leaders" },
  { value: 200, suffix: "+", label: "Volunteers" },
];

const formatValue = (n: number, format?: string, suffix = "") => {
  if (format === "k" && n >= 1000) {
    return `${Math.round(n / 1000)}K${suffix}`;
  }
  return `${n.toLocaleString()}${suffix}`;
};

const useCountUp = (target: number, start: boolean, duration = 1600) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return val;
};

const StatItem = ({
  stat,
  start,
  index,
}: {
  stat: (typeof stats)[number];
  start: boolean;
  index: number;
}) => {
  const v = useCountUp(stat.value, start);
  return (
    <div
      className="group relative text-center"
      style={{
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="font-display text-4xl font-bold leading-none text-white tabular-nums md:text-5xl lg:text-6xl">
        {formatValue(v, stat.format, stat.suffix)}
      </div>
      <div className="mt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {stat.label}
      </div>
    </div>
  );
};

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
      { threshold: 0.3 }
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
        <p className="mb-14 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
          Our Reach
        </p>
        <div className="grid grid-cols-2 gap-y-14 sm:grid-cols-3 md:grid-cols-5 md:gap-y-0">
          {stats.map((s, i) => (
            <StatItem key={s.label} stat={s} start={inView} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

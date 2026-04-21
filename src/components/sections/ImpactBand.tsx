import { useEffect, useRef, useState } from "react";

/**
 * Single horizontal impact band with animated count-up on scroll into view.
 * Numbers reflect institutional foundational targets ("Reporting in progress" rule).
 */
const stats = [
  { value: 54, suffix: "", label: "Countries reach" },
  { value: 15000, suffix: "+", label: "Students reached", format: "k" },
  { value: 500, suffix: "+", label: "Partners & sponsors" },
  { value: 300, suffix: "+", label: "Awarded leaders" },
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
}: {
  stat: (typeof stats)[number];
  start: boolean;
}) => {
  const v = useCountUp(stat.value, start);
  return (
    <div className="text-center">
      <div className="font-display text-3xl font-bold text-scef-blue-darker md:text-4xl tabular-nums">
        {formatValue(v, stat.format, stat.suffix)}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
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
      className="relative border-y border-border bg-gradient-to-b from-background via-muted/30 to-background py-16"
    >
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-scef-gold-dark">
          Our Reach — Real progress. Real communities.
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

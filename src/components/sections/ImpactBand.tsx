/**
 * Single horizontal impact band. Numbers shown as institutional ranges
 * (per "Reporting in progress" rule — these are stated foundational targets).
 */
const stats = [
  { value: "57", label: "African countries" },
  { value: "8+", label: "Active programs" },
  { value: "500+", label: "Partners & sponsors" },
  { value: "9", label: "Languages supported" },
  { value: "1997", label: "Year founded" },
];

export const ImpactBand = () => {
  return (
    <section className="relative border-y border-border bg-background py-14">
      <div className="container mx-auto px-4">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-scef-gold-dark">
          Our Reach — Real progress. Real communities.
        </p>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-scef-blue-darker md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { useLocale } from "@/contexts/LocaleContext";

const stats = [
  { value: "1997", label: "Founding Year", sub: "Established in Nigeria" },
  { value: "5+", label: "African Regions", sub: "North, West, East, Central, Southern" },
  { value: "2035", label: "Vision Horizon", sub: "Continental standards system" },
  { value: "9", label: "Languages", sub: "Pan-African accessibility" },
];

/**
 * Institutional credibility band — founding year, regional reach, vision horizon.
 * Uses verified facts only; no unverified metrics.
 */
export const InstitutionalStats = () => {
  const { t } = useLocale();
  return (
    <section className="border-y border-border bg-card py-12 md:py-14">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-3xl font-bold leading-none tracking-tight text-scef-blue-darker md:text-4xl">
                {t(`home.stats.${s.label}.value`) || s.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-scef-blue-darker">
                {t(`home.stats.${s.label}.label`) || s.label}
              </div>
              <div className="mt-1 text-xs leading-tight text-muted-foreground">
                {t(`home.stats.${s.label}.sub`) || s.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

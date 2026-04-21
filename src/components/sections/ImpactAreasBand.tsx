import { Users, BookOpen, Sparkles, Network, Leaf } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const areas = [
  { icon: Users, label: "Access & Inclusion" },
  { icon: BookOpen, label: "Quality Education" },
  { icon: Sparkles, label: "Skills & Empowerment" },
  { icon: Network, label: "Partnerships & Collaboration" },
  { icon: Leaf, label: "Sustainable Impact" },
];

export const ImpactAreasBand = () => {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden bg-scef-blue-darker py-14 text-white md:py-16">
      <div className="absolute inset-0 bg-scef-pattern opacity-[0.05]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
          {/* Headline */}
          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_55%)]">
              {t("home.impactAreas.eyebrow") || "Focus Areas"}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold leading-tight md:text-[1.75rem]">
              {t("home.impactAreas.title") || "Driving Impact Where It Matters"}
            </h2>
          </div>

          {/* Items */}
          <div className="md:col-span-9">
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
              {areas.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-scef-gold">
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <div className="text-sm font-semibold leading-tight text-white">
                    {t(`home.impactAreas.items.${label}`) || label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

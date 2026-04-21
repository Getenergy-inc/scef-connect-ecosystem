import { Compass, Award, Target, Network, ShieldCheck, Megaphone } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const objectives = [
  { icon: Compass, title: "Continuous Standards System", body: "An ever-growing framework for education quality across Africa." },
  { icon: Award, title: "Recognition as Mechanism", body: "NESA Engine surfaces and rewards verified excellence." },
  { icon: Target, title: "Standards into Action", body: "Awards translate into scholarships, schools, and outcomes." },
  { icon: Network, title: "Pan-African Network", body: "Members, chapters, and partners across regions." },
  { icon: ShieldCheck, title: "Trust & Evidence Layer", body: "Verification, audit logs, and public accountability." },
  { icon: Megaphone, title: "Media + Funding Scale", body: "Santos Media and GFA Wallet power sustainable reach." },
];

/**
 * Six SCEF Core Objectives — must remain visible per project knowledge.
 */
export const CoreObjectives = () => {
  const { t } = useLocale();
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-12 text-center md:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
            {t("home.objectives.eyebrow") || "Our Core Objectives"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            {t("home.objectives.title") || "Six pillars guiding our work"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-lg"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-gold-dark">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg font-bold leading-tight text-scef-blue-darker">
                {t(`home.objectives.items.${title}.title`) || title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {t(`home.objectives.items.${title}.body`) || body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

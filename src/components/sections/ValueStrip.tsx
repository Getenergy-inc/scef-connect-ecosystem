import { BookOpen, Lightbulb, Users, ShieldCheck, Globe2 } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const values = [
  { icon: BookOpen, title: "Education Advocacy", sub: "Expanding access for every learner" },
  { icon: Lightbulb, title: "Skills & Innovation", sub: "Preparing for real-world impact" },
  { icon: Users, title: "Inclusion & Equity", sub: "Opening opportunities for all" },
  { icon: ShieldCheck, title: "Accountability", sub: "Delivering measurable outcomes" },
  { icon: Globe2, title: "Pan-African Impact", sub: "Scaling across regions" },
];

/**
 * Value strip — 5 short, scannable value points immediately under the hero.
 */
export const ValueStrip = () => {
  const { t } = useLocale();
  return (
    <section className="border-y border-border bg-card py-10 md:py-12">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
          {values.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight text-scef-blue-darker">
                  {t(`home.values.${title}.title`) || title}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-muted-foreground">
                  {t(`home.values.${title}.sub`) || sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import {
  BookOpen, GraduationCap, Heart, Leaf, Stethoscope, Users, Laptop, Compass,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const items = [
  { icon: BookOpen, label: "Education Access", desc: "Removing barriers to quality learning" },
  { icon: GraduationCap, label: "Teacher Development", desc: "Training, mentoring and wellbeing for educators" },
  { icon: Heart, label: "Girls & Women Education", desc: "Equity, safeguarding and leadership pathways" },
  { icon: Leaf, label: "ESG & Sustainability", desc: "Green schools, climate literacy, social impact" },
  { icon: Stethoscope, label: "Health Education Advocacy", desc: "Schools as safe, healthy spaces" },
  { icon: Users, label: "Local Chapter Development", desc: "Community-led action across Africa" },
  { icon: Laptop, label: "Digital Learning", desc: "EOA, eLibrary and technology in classrooms" },
  { icon: Compass, label: "Youth Career Pathways", desc: "My Career, My Life and TVET tracks" },
];

/**
 * Impact strip — labels only, no unverified numbers. Subtle hover lift.
 */
export const ImpactStripLabels = () => {
  const { t } = useLocale();
  return (
    <section className="bg-card py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
            {t("home.impact.eyebrow") || "Our Impact"}
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-scef-blue-darker md:text-[2rem]">
            {t("home.impact.title") || "Eight focus areas driving Africa's education future"}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-5">
          {items.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group flex flex-col items-center justify-center rounded-xl border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-md"
            >
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="text-sm font-semibold leading-tight text-scef-blue-darker">
                {t(`home.impact.items.${label}`) || label}
              </div>
              <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

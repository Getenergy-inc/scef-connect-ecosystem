import { Layers, MapPin, Globe2, Radio, Handshake } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const blocks = [
  { icon: Layers, title: "Programs", sub: "Deliver education outcomes" },
  { icon: MapPin, title: "Chapters", sub: "Execute locally" },
  { icon: Globe2, title: "Platforms", sub: "Scale access" },
  { icon: Radio, title: "Media", sub: "Build awareness" },
  { icon: Handshake, title: "Partnerships & CSR Funding", sub: "Sustain and expand impact" },
];

/**
 * How SCEF Works — 5 ecosystem blocks, single-line descriptions, dark institutional band.
 */
export const HowSCEFWorks = () => {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden bg-scef-blue-darker py-20 text-white md:py-24">
      <div className="absolute inset-0 bg-scef-pattern opacity-[0.05]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(45_92%_42%/0.10),transparent_60%)]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="mb-12 text-center md:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-light">
            {t("home.how.eyebrow") || "How It Works"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">
            {t("home.how.title") || "How SCEF Delivers Impact"}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5">
          {blocks.map(({ icon: Icon, title, sub }) => (
            <div
              key={title}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:bg-white/[0.06]"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold ring-1 ring-scef-gold/30 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div className="text-base font-semibold leading-tight text-white">
                {t(`home.how.blocks.${title}.title`) || title}
              </div>
              <div className="mt-1 text-xs text-white/65">
                {t(`home.how.blocks.${title}.sub`) || sub}
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-white/70 md:text-base">
          {t("home.how.closing") ||
            "A connected system designed for measurable, scalable results."}
        </p>
      </div>
    </section>
  );
};

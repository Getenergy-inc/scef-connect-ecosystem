import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, GraduationCap, Users, ShieldCheck, Globe2 } from "lucide-react";
import heroImg from "@/assets/hero-schoolgirl.jpg";
import { useLocale } from "@/contexts/LocaleContext";
import { QuickJumpMenu } from "@/components/layout/QuickJumpMenu";

const pillars = [
  { icon: BookOpen, title: "Education Advocacy", sub: "Expanding access for every learner" },
  { icon: GraduationCap, title: "Skills & Innovation", sub: "Preparing for real-world impact" },
  { icon: Users, title: "Inclusion & Equity", sub: "Opening opportunities for all" },
  { icon: ShieldCheck, title: "Accountability & Funding", sub: "Managing education impact transparently" },
  { icon: Globe2, title: "Pan-African Impact", sub: "Scaling across regions" },
];

/**
 * Split-layout hero: copy left, photograph right, pillar strip beneath.
 * Matches the institutional reference design.
 */
export const LandingHero = () => {
  const { t } = useLocale();

  return (
    <section className="relative bg-scef-blue-darker text-white">
      {/* Subtle pattern wash */}
      <div className="pointer-events-none absolute inset-0 bg-scef-pattern opacity-[0.05]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(217_91%_25%/0.6),transparent_55%)]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="grid items-center gap-10 py-12 md:grid-cols-12 md:gap-12 md:py-20 lg:py-24">
          {/* LEFT — Copy */}
          <div className="md:col-span-6 lg:col-span-5">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold-light ring-1 ring-white/15">
              {t("home.heroV2.eyebrow") || "Pan-African Education Foundation · Since 1997"}
            </p>
            <h1 className="font-display text-[2.5rem] font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.75rem]">
              Empowering Africa through{" "}
              <span className="text-scef-gold">education, innovation, and opportunity.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
              A membership-driven Pan-African education foundation advancing
              education through advocacy, digital access, partnerships,
              transparent funding, local chapters, training, and career
              pathways.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover"
                asChild
              >
                <Link to="/get-involved/membership">
                  Explore Membership
                  <ArrowRight className="ms-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="h-12 bg-white px-7 font-semibold text-scef-blue-darker hover:bg-white/90"
                asChild
              >
                <Link to="/donate">Support the Mission</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <Link to="/nominate">Nominate a School</Link>
              </Button>
              <QuickJumpMenu variant="dark" />
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="md:col-span-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-black/40">
              <img
                src={heroImg}
                alt={t("home.heroV2.imageAlt") || "African schoolchildren in green uniforms standing together at school"}
                width={1920}
                height={1080}
                className="h-full w-full object-cover aspect-[16/10]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/40 via-transparent to-transparent" />
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-white/55 md:hidden">
              <span className="h-px w-6 bg-scef-gold/60" />
              {t("home.heroV2.scrollCue") || "Scroll to explore"}
              <span className="h-px w-6 bg-scef-gold/60" />
            </div>
          </div>
        </div>

        {/* Pillar strip */}
        <div className="border-t border-white/10 py-6 md:py-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
            {pillars.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold ring-1 ring-scef-gold/30">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold leading-tight text-white">
                    {t(`home.heroV2.pillars.${title}.title`) || title}
                  </div>
                  <div className="text-[11px] leading-tight text-white/60">
                    {t(`home.heroV2.pillars.${title}.sub`) || sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

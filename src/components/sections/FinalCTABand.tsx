import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Final CTA band — institutional dark blue with three primary CTAs.
 * Matches landing reference: Join SCEF (gold), Donate (outline), Partner (outline).
 */
export const FinalCTABand = () => {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden bg-scef-blue-darker py-16 text-white md:py-20">
      <div className="absolute inset-0 bg-scef-pattern opacity-[0.06]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(45_92%_42%/0.10),transparent_60%)]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-light">
            {t("home.finalCta.eyebrow") || "Join Us"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-[2.5rem]">
            Join the Movement for Education for All in Africa
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            Be part of a Pan-African education movement helping children, youth, teachers, women, schools,
            and communities access quality learning, digital opportunity, sustainable development, and
            community-led transformation.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover" asChild>
              <Link to="/auth/sign-up">Become a Member</Link>
            </Button>
            <Button size="lg" className="h-12 bg-white px-7 font-semibold text-scef-blue-darker hover:bg-white/90" asChild>
              <Link to="/support-us">Sponsor a Program</Link>
            </Button>
            <Button size="lg" className="h-12 bg-white px-7 font-semibold text-scef-blue-darker hover:bg-white/90" asChild>
              <Link to="/women-girls-empowerment">Support Girls Education</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white" asChild>
              <Link to="/partner-with-us">Partner With SCEF</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white" asChild>
              <Link to="/wallet">Pay via GFA Wallet</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

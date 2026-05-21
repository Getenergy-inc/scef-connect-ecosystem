import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const FinalCtaLean = () => {
  return (
    <section className="relative bg-scef-blue-darker py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-scef-pattern opacity-[0.06]" />
      <div className="container relative mx-auto px-6 text-center md:px-8">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Be Part of Africa's <span className="text-scef-gold">Education Transformation</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80">
          Partner with SCEF to support scholarships, school transformation,
          teacher development, digital learning, and community-led education
          impact.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="h-12 bg-scef-gold px-7 font-semibold text-scef-blue-darker hover:bg-scef-gold-hover">
            <Link to="/membership">Become a Member</Link>
          </Button>
          <Button asChild size="lg" className="h-12 bg-white px-7 font-semibold text-scef-blue-darker hover:bg-white/90">
            <Link to="/sponsor">Sponsor a Program</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white">
            <Link to="/adopt-a-school">Adopt a School</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaLean;

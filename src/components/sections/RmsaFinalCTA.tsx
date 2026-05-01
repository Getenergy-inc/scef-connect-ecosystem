import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ClipboardCheck, Vote, Handshake } from "lucide-react";

export const RmsaFinalCTA = () => {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-20 text-white md:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B5D3B]/40 via-transparent to-scef-gold/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(145_75%_22%/0.5),transparent_55%)]" />

      <div className="container relative mx-auto px-6 text-center md:px-8">
        <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          Be part of Africa&apos;s{" "}
          <span className="bg-gradient-to-r from-scef-gold to-[#F1C75B] bg-clip-text text-transparent">
            education transformation
          </span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
          Whether you give once, vote weekly or partner long-term — every action
          rebuilds a classroom and reshapes a child&apos;s future.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="h-12 bg-scef-gold px-7 font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover">
            <Link to="/donate"><Heart className="me-2 h-4 w-4" /> Donate</Link>
          </Button>
          <Button asChild size="lg" className="h-12 bg-[#0B5D3B] px-7 font-semibold text-white hover:bg-[#0E7549]">
            <Link to="/programs/rebuild-my-school-africa"><ClipboardCheck className="me-2 h-4 w-4" /> Nominate</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 border-scef-gold/60 bg-transparent px-7 font-semibold text-scef-gold hover:bg-scef-gold/15 hover:text-scef-gold">
            <Link to="/vote"><Vote className="me-2 h-4 w-4" /> Vote with AGC</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 border-white/40 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white">
            <Link to="/partner-with-us"><Handshake className="me-2 h-4 w-4" /> Become a Partner</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

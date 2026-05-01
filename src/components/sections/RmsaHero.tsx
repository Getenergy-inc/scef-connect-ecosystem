import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { School, Accessibility, Heart, Vote, HandHeart, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-classroom.jpg";

/**
 * RMSA-led hero — EduAid-Africa flagship service.
 * Dark green/black gradient over an authentic African classroom photo.
 */
export const RmsaHero = () => {
  return (
    <section className="relative isolate overflow-hidden bg-[#0A0A0A] text-white">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="African students in a renewed classroom"
          className="h-full w-full object-cover opacity-60"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B5D3B]/85 via-[#0A0A0A]/80 to-[#0A0A0A]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(45_92%_42%/0.18),transparent_55%)]" />
      </div>

      <div className="container relative mx-auto px-6 py-20 md:px-8 md:py-28 lg:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-scef-gold/40 bg-scef-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
            <span className="h-1.5 w-1.5 rounded-full bg-scef-gold" />
            A service of EduAid-Africa
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-[4rem]">
            Rebuild My{" "}
            <span className="bg-gradient-to-r from-scef-gold to-[#F1C75B] bg-clip-text text-transparent">
              School Africa
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Rebuilding schools, supporting special needs education, and
            transforming learning environments across Africa — funded by
            members, partners and AGC voters through the GFA Wallet.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-12 bg-scef-gold px-6 font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover"
            >
              <Link to="/programs/rebuild-my-school-africa">
                <School className="me-2 h-4 w-4" /> Nominate a School
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-white/40 bg-white/5 px-6 font-semibold text-white hover:bg-white/15 hover:text-white"
            >
              <Link to="/programs/special-needs-education">
                <Accessibility className="me-2 h-4 w-4" /> Nominate a Special Needs School
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="h-12 bg-[#0B5D3B] px-6 font-semibold text-white hover:bg-[#0E7549]"
            >
              <Link to="/donate">
                <Heart className="me-2 h-4 w-4" /> Donate
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-scef-gold/60 bg-transparent px-6 font-semibold text-scef-gold hover:bg-scef-gold/15 hover:text-scef-gold"
            >
              <Link to="/vote">
                <Vote className="me-2 h-4 w-4" /> Vote with AGC
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
            >
              <Link to="/partner-with-us">
                <HandHeart className="me-2 h-4 w-4" /> Adopt a School
                <ArrowRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

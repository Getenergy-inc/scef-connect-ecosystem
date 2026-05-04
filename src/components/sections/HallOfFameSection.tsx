import { Link } from "react-router-dom";
import { Award, Heart, Sparkles, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HallOfFameSection = () => (
  <section className="bg-scef-blue-darker py-20 text-white md:py-24">
    <div className="container mx-auto px-6 md:px-8">
      <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
            Recognition Wall · Since 2007
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] md:text-5xl">
            Hall of Fame & <span className="text-gradient-gold italic">Appreciation Wall</span>
          </h2>
          <p className="mt-5 max-w-xl text-base text-white/75 md:text-lg">
            Celebrating SCEF volunteers, ambassadors, partners and supporters from 2007 till date — the people whose
            contributions shaped African education impact.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
              <Link to="/hall-of-fame"><Award className="me-2 h-4 w-4" /> View Hall of Fame</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link to="/hall-of-fame/submit"><Sparkles className="me-2 h-4 w-4" /> Submit Your Testimony</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link to="/hall-of-fame/submit"><UserPlus className="me-2 h-4 w-4" /> Nominate a Contributor</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link to="/get-involved/volunteer"><Heart className="me-2 h-4 w-4" /> Become a Volunteer</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm"
            >
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-br from-scef-gold/10 to-white/[0.02]">
                <Award className="h-6 w-6 text-scef-gold/50" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

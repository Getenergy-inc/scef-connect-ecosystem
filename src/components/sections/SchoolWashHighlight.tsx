import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Droplets, Heart, School, Sparkles, ArrowRight } from "lucide-react";

/**
 * Reusable School WASH highlight section, shown on EduAid Africa
 * and Rebuild My School Africa to surface the new WASH initiative.
 */
export const SchoolWashHighlight = () => (
  <section className="bg-scef-blue-darker py-16 text-white md:py-20">
    <div className="container mx-auto px-6 md:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
            <Droplets className="h-3.5 w-3.5" /> School WASH & Sanitation
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] md:text-4xl">
            Safe Toilets. Better Hygiene. <span className="text-gradient-gold italic">Better Learning.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-white/75">
            Through EduAid-Africa and Rebuild My School Africa, SCEF supports school sanitation and
            hygiene interventions — toilet construction, girls' hygiene support, handwashing systems,
            solar water and disability-friendly access.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
              <Link to="/programs/school-wash#sponsor"><Heart className="me-2 h-4 w-4" /> Support School WASH</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link to="/programs/school-wash#nominate"><School className="me-2 h-4 w-4" /> Nominate a School</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link to="/programs/school-wash#sponsor"><Sparkles className="me-2 h-4 w-4" /> Sponsor Girls' Hygiene</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            "School Toilets",
            "Girls' Hygiene & MHM",
            "Handwashing Stations",
            "Solar Water Systems",
            "Disability-Friendly Access",
            "Maintenance Training",
          ].map((label) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm">
              {label}
            </div>
          ))}
          <Link
            to="/programs/school-wash"
            className="col-span-2 inline-flex items-center justify-center gap-2 rounded-xl border border-scef-gold/40 bg-scef-gold/10 p-3 text-sm font-semibold text-scef-gold hover:bg-scef-gold/20"
          >
            Learn more about School WASH <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

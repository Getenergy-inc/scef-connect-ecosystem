import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CVOSpotlight = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-scef-blue to-scef-blue-darker">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 animate-fade-in">
          <div className="w-40 h-40 md:w-52 md:h-52 rounded-2xl overflow-hidden border-4 border-scef-gold/40 shadow-2xl shrink-0 hover-scale">
            <img
              src="/assets/governance/babashola-aderibigbe.jpg"
              alt="Babashola Aderibigbe — Chief Visionary Officer, SCEF"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center md:text-left">
            <blockquote className="text-lg md:text-xl text-white/90 italic leading-relaxed mb-4">
              "Education is not just a right — it is the most powerful engine for transformation across Africa. At SCEF, we are building the systems that make quality education measurable, inclusive, and sustainable."
            </blockquote>
            <div className="flex flex-col items-center md:items-start gap-1">
              <span className="text-scef-gold font-display font-bold text-lg">Babashola Aderibigbe</span>
              <span className="text-white/60 text-sm">Chief Visionary Officer &amp; Founder, SCEF</span>
            </div>
            <div className="mt-4">
              <Button variant="outline" size="sm" className="border-scef-gold/40 text-scef-gold hover:bg-scef-gold/10 gap-2" asChild>
                <Link to="/governance">
                  Meet the Leadership <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

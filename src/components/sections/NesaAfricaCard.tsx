import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NesaAfricaCard = () => {
  return (
    <section className="py-12 bg-scef-blue-darker">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div className="rounded-xl overflow-hidden border border-white/10">
            <img
              src="/assets/nesa-africa-2025-card.jpg"
              alt="NESA Africa 2025"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-scef-gold/20 text-scef-gold text-xs font-semibold mb-4">
              <Award className="w-3 h-3" />
              Now Open
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              NESA Africa <span className="text-scef-gold">2025</span>
            </h2>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Recognises excellence, innovation, and impact across Africa's education ecosystem.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://nesa.africa" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-dark gap-1">
                  Visit nesa.africa <ArrowRight className="w-3 h-3" />
                </Button>
              </a>
              <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/programs/nesa-africa">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

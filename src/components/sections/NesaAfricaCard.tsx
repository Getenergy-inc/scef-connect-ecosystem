import { Link } from "react-router-dom";
import { ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NesaAfricaCard = () => {
  return (
    <section className="py-16 bg-scef-blue-darker">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Card Image */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-scef-gold/20">
            <img
              src="/assets/nesa-africa-2025-card.jpg"
              alt="NESA Africa 2025 – New Education Standard Awards Africa. Visit www.nesa.africa"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-gold text-sm font-semibold mb-6 border border-scef-gold/30">
              <Award className="w-4 h-4" />
              Now Open
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              NESA Africa <span className="text-scef-gold">2025</span>
            </h2>
            <p className="text-white/80 leading-relaxed mb-6">
              The New Education Standard Awards Africa recognises excellence, innovation, and impact across Africa's education ecosystem. Nominate, vote, and celebrate the best in education.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://nesa.africa" target="_blank" rel="noopener noreferrer">
                <Button className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-dark font-semibold gap-2">
                  Visit nesa.africa
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link to="/programs/nesa-africa">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

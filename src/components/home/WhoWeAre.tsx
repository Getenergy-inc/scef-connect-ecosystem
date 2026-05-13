import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Three-line "Who we are" block placed directly under the hero so visitors
 * understand SCEF in under 5 seconds.
 */
export const WhoWeAre = () => {
  return (
    <section className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid gap-6 md:grid-cols-[2fr_1fr] md:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
              Who We Are
            </p>
            <ul className="space-y-2 font-display text-lg md:text-xl text-scef-blue-darker leading-snug">
              <li>
                <span className="text-scef-gold font-bold mr-2">1.</span>
                A Pan-African membership-based not-for-profit foundation.
              </li>
              <li>
                <span className="text-scef-gold font-bold mr-2">2.</span>
                We run a continuous standards system for education across Africa.
              </li>
              <li>
                <span className="text-scef-gold font-bold mr-2">3.</span>
                We turn recognition into measurable school, learner and community impact.
              </li>
            </ul>
          </div>
          <div className="md:text-right">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-scef-blue-darker hover:text-scef-gold transition-colors"
            >
              Read our full story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;

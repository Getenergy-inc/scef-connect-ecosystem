import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/**
 * Welcome + brief About SCEF intro, sits directly under the Hero.
 * Leads users into the Core Services and the Pathway entry chooser.
 */
export const WelcomeAboutIntro = () => {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            Welcome
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            Welcome to Santos Creations Educational Foundation
          </h2>
          <p className="mx-auto mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            SCEF is a membership-driven Pan-African education foundation
            advancing learning, opportunity and equity across the continent
            since 1997. We work with governments, schools, partners, chapters
            and members to deliver a continuous standards system for African
            education — from advocacy and scholarships to school rebuilding,
            training, recognition and transparent funding.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full bg-scef-blue-darker px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-scef-blue-darker/90"
            >
              About SCEF
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#core-services"
              className="inline-flex items-center gap-2 rounded-full border border-scef-blue-darker/20 px-6 py-3 text-sm font-semibold text-scef-blue-darker transition-colors hover:border-scef-gold hover:text-scef-gold-dark"
            >
              Scroll to Our Core Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeAboutIntro;

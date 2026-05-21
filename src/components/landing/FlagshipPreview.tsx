import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const programs = [
  { name: "EduAid-Africa", body: "Scholarships, school support, teacher development & community impact.", to: "/programs/eduaid-africa" },
  { name: "NESA-Africa", body: "Pan-African recognition for educators, schools and changemakers.", to: "/programs/nesa-africa" },
  { name: "eLibrary Africa", body: "Digital library access and EdTech tools for African schools.", to: "/programs/elibrary-nigeria" },
  { name: "Rebuild My School Africa", body: "Rebuilding, equipping, and transforming under-served schools.", to: "/programs/rebuild-my-school-africa" },
  { name: "My Career My Life", body: "Career pathways, TVET and youth empowerment programs.", to: "/programs/my-career-my-life" },
  { name: "Send a Child to School", body: "Direct sponsorship to keep vulnerable children in school.", to: "/programs/send-a-child-to-school" },
];

export const FlagshipPreview = () => {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
            Flagship Programs
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
            Flagship Programs Powering Africa's Education Future
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <Link
              key={p.to}
              to={p.to}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-scef-gold/40 hover:shadow-md"
            >
              <h3 className="font-display text-lg font-bold text-scef-blue-darker">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-scef-blue-darker group-hover:text-scef-gold">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
            <Link to="/flagship-programs">
              Explore All Programs
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FlagshipPreview;

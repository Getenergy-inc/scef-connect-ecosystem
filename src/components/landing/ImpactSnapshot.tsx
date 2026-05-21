import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpenCheck,
  Users,
  Heart,
  Laptop,
  School,
  HandHeart,
} from "lucide-react";

const pillars = [
  { icon: BookOpenCheck, title: "Education Access", body: "Expanding equitable access to quality learning for every child." },
  { icon: Users, title: "Teacher Development", body: "Training and supporting educators across the continent." },
  { icon: Heart, title: "Girls & Women Education", body: "Backing girls and women through learning and leadership." },
  { icon: Laptop, title: "Digital Learning", body: "Bringing EdTech, eLibraries, and AI-supported tools to schools." },
  { icon: School, title: "School Support", body: "Rebuilding, equipping, and transforming under-served schools." },
  { icon: HandHeart, title: "Community Education", body: "Empowering local chapters and community-led education projects." },
];

export const ImpactSnapshot = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
            Impact Snapshot
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
            Impact That Moves Communities Forward
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-scef-gold/40 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-scef-gold/15 text-scef-gold-dark">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-scef-blue-darker">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/our-impact">
              Explore Our Impact
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSnapshot;

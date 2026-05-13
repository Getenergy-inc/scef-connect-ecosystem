import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Milestone {
  year: string;
  title: string;
  body: string;
}

const milestones: Milestone[] = [
  {
    year: "1997",
    title: "The idea is born",
    body:
      "Santos begins as a creative education and tourism advocacy idea through postcard production in Minna, Niger State.",
  },
  {
    year: "2003",
    title: "Foundation activities begin",
    body:
      "SCEF formally begins advocacy. It's In Me Radio launches; A Time with Santos TV concept and Nija Youth Tours are introduced.",
  },
  {
    year: "2007",
    title: "Volunteer expansion",
    body:
      "AIESEC collaboration begins — a growing network of contributors and youth development supporters across Nigeria.",
  },
  {
    year: "2013–14",
    title: "VSO partnership",
    body:
      "Engagement with the Kwara State Ministry of Education and integration of local volunteers through VSO programs.",
  },
  {
    year: "2015",
    title: "EduAid-Africa expansion",
    body:
      "Scholarships, school support and digital learning programs scale across Nigeria and into the wider continent.",
  },
  {
    year: "2020",
    title: "NESA-Africa growth",
    body:
      "The New Education Standards Award Africa establishes itself as a continental recognition platform.",
  },
  {
    year: "2024–27",
    title: "Pan-African expansion",
    body:
      "Local chapter development, ESG and sustainability advocacy, digital learning transformation and a continuous monthly program calendar.",
  },
];

export const HistoricalTimeline = () => {
  return (
    <section className="bg-background border-y border-border">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mb-12">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
            Our Journey
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker leading-tight">
            From a postcard idea in Minna to a Pan-African movement
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            A continuous standards system for education in Africa — built one community,
            one school, one volunteer at a time.
          </p>
        </div>

        <ol className="relative grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {milestones.map((m) => (
            <li
              key={m.year}
              className="group relative rounded-xl border border-border bg-card p-5 transition-all hover:border-scef-gold/50 hover:shadow-lg"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-display text-2xl font-bold text-scef-blue-darker">
                  {m.year}
                </span>
                <span className="h-2 w-2 rounded-full bg-scef-gold" />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-foreground">
                {m.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {m.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            asChild
            className="bg-scef-blue-darker hover:bg-scef-blue-dark text-white font-semibold"
          >
            <Link to="/about/history">Read the full history</Link>
          </Button>
          <Button asChild variant="outline" className="font-semibold">
            <Link to="/volunteers">Meet our contributors</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HistoricalTimeline;

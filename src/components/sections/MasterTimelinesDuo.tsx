import { Link } from "react-router-dom";
import {
  Award,
  ArrowRight,
  CalendarRange,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const nesaHighlights = [
  "Public Pre-Nomination Launch",
  "Evidence Education Campaign",
  "Platinum Award TV Show",
  "Africa Education Icon Online TV Show",
  "Gold Recognition Online TV Show",
  "NESA-Africa Momentum Show",
  "Blue Garnet Awards Gala",
  "Rebuild My School Africa Transition",
];

const eduaidHighlights = [
  "EduAid-Africa Monthly Webinars",
  "My Career, My Life Sessions",
  "Send a Child to School Campaign",
  "Rebuild My School Africa",
  "Teacher Training & Capacity Development",
  "Girls & Women Education Support",
  "eLibrary Africa / eLibrary Nigeria Access",
  "School Adoption & CSR Funding",
  "Local Chapter Education Projects",
  "Impact Reporting & Donor Updates",
];

export const MasterTimelinesDuo = () => {
  return (
    <section
      id="master-timelines"
      aria-labelledby="master-timelines-heading"
      className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-20"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
            SCEF 2026–2027
          </p>
          <h2
            id="master-timelines-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl"
          >
            Recognition to Impact — Two Master Timelines
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            From recognition to impact — NESA-Africa celebrates education
            excellence, while EduAid-Africa turns visibility into scholarships,
            school support, teacher development, and sustainable learning
            opportunities.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* NESA-Africa */}
          <article
            aria-labelledby="nesa-master-heading"
            className="group flex flex-col overflow-hidden rounded-2xl border border-scef-gold/30 bg-scef-blue-darker text-white shadow-sm"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=70"
                alt="NESA-Africa awards gala recognition"
                loading="lazy"
                className="h-full w-full object-cover opacity-80 transition group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker via-scef-blue-darker/40 to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-scef-gold/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-blue-darker">
                <Award className="h-3.5 w-3.5" /> Recognition
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                NESA-Africa 2026–2027
              </p>
              <h3 id="nesa-master-heading" className="mt-1 font-display text-2xl font-bold">
                Master Timeline 2026–2027
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Follow the full NESA-Africa journey from public pre-nomination
                campaigns and online TV shows to the Blue Garnet Awards Gala
                and post-gala school impact transition.
              </p>

              <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {nesaHighlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-white/85">
                    <CalendarRange className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild variant="secondary" size="sm">
                  <Link to="/nesa-africa/master-timeline">
                    View NESA Timeline <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="heroOutline" size="sm">
                  <Link to="/wallet/donate?fund=nesa-africa">Sponsor NESA-Africa</Link>
                </Button>
                <Button asChild variant="heroOutline" size="sm">
                  <Link to="/nesa-africa/gala-tickets">Buy Gala Ticket</Link>
                </Button>
              </div>
            </div>
          </article>

          {/* EduAid-Africa */}
          <article
            aria-labelledby="eduaid-master-heading"
            className="group flex flex-col overflow-hidden rounded-2xl border border-scef-blue-darker/15 bg-card shadow-sm"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1600&q=70"
                alt="African students learning in classroom"
                loading="lazy"
                className="h-full w-full object-cover transition group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-scef-blue-darker px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold ring-1 ring-scef-gold/30">
                <GraduationCap className="h-3.5 w-3.5" /> Impact
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-blue-darker">
                EduAid-Africa 2026–2027
              </p>
              <h3
                id="eduaid-master-heading"
                className="mt-1 font-display text-2xl font-bold text-scef-blue-darker"
              >
                Master Timeline 2026–2027
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Explore the EduAid-Africa education impact cycle covering
                scholarships, school support, teacher training, career
                guidance, girls education, digital learning, monthly webinars,
                school adoption, and Rebuild My School Africa impact reporting.
              </p>

              <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {eduaidHighlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link to="/eduaid-africa/master-timeline">
                    View EduAid Timeline <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/wallet/donate?fund=eduaid-africa">Sponsor EduAid-Africa</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/wallet/donate?fund=adopt-school">Adopt a School</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link to="/wallet/donate?fund=send-a-child-to-school">
                    Send a Child to School
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </div>

        <p className="mx-auto mt-10 max-w-3xl rounded-xl border border-scef-gold/30 bg-scef-gold/5 px-6 py-5 text-center text-sm font-medium leading-relaxed text-scef-blue-darker md:text-base">
          NESA-Africa creates recognition. EduAid-Africa creates impact.
          Together, they form SCEF&rsquo;s recognition-to-impact model for
          transforming education across Africa.
        </p>
      </div>
    </section>
  );
};

export default MasterTimelinesDuo;

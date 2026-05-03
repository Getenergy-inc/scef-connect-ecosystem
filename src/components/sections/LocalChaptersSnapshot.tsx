import { Link } from "react-router-dom";
import { MapPin, ArrowRight, Plus } from "lucide-react";

const chapters = [
  { country: "Nigeria", campaigns: 12, nominations: 5, raised: "Reporting in progress", to: "/chapters" },
  { country: "Ghana", campaigns: 7, nominations: 3, raised: "Reporting in progress", to: "/chapters" },
  { country: "Kenya", campaigns: 6, nominations: 4, raised: "Reporting in progress", to: "/chapters" },
  { country: "Uganda", campaigns: 4, nominations: 2, raised: "Reporting in progress", to: "/chapters" },
];

export const LocalChaptersSnapshot = () => {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            On the Ground
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            SCEF Local Chapters Across Africa & the Diaspora
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Country and regional chapters drive school nominations, donations
            and intervention delivery in their own communities.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {chapters.map((c) => (
            <article
              key={c.country}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-scef-blue-darker text-scef-gold">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-scef-blue-darker">
                {c.country}
              </h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Active campaigns</dt>
                  <dd className="font-semibold text-foreground">{c.campaigns}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Special needs noms.</dt>
                  <dd className="font-semibold text-foreground">{c.nominations}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Raised</dt>
                  <dd className="text-xs italic text-muted-foreground">{c.raised}</dd>
                </div>
              </dl>
              <Link
                to={c.to}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-scef-blue-darker transition-colors hover:text-scef-gold-dark"
              >
                View Chapter <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/chapters"
            className="inline-flex items-center gap-2 rounded-md bg-scef-blue-darker px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-scef-blue"
          >
            Browse All Chapters <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/chapters/start-chapter"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-scef-blue-darker transition-colors hover:border-scef-gold hover:text-scef-gold-dark"
          >
            <Plus className="h-4 w-4" /> Start a Chapter
          </Link>
        </div>
      </div>
    </section>
  );
};

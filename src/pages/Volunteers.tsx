import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { photoLibrary, type SCEFPhoto } from "@/config/photoLibrary";
import { Users, Heart, Handshake, Award } from "lucide-react";

const yearFilters = ["All", "2022", "2023", "2024"] as const;
type YearFilter = (typeof yearFilters)[number];

const Volunteers = () => {
  const [year, setYear] = useState<YearFilter>("All");

  const photos = useMemo<SCEFPhoto[]>(() => {
    if (year === "All") return photoLibrary;
    return photoLibrary.filter((p) => p.year === year);
  }, [year]);

  return (
    <PageShell
      title="Meet Our Volunteers & Contributors"
      description="Celebrating the people, volunteers, ambassadors, educators and partners who have supported SCEF's journey across Africa since 2007."
      eyebrow="Our People · 2007 — Present"
      heading="Meet Our Volunteers & Contributors"
      intro="Celebrating the people, volunteers, ambassadors, educators, partners and contributors who have powered SCEF's journey across Africa since 2007 — through outreach, advocacy, training, awards and community development."
    >
      {/* Filter bar */}
      <section className="border-b border-border bg-card/40">
        <div className="container mx-auto px-4 py-6 flex flex-wrap items-center gap-3">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mr-2">
            Filter by year
          </span>
          {yearFilters.map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                year === y
                  ? "bg-scef-blue-darker text-white"
                  : "bg-muted text-foreground hover:bg-scef-gold/15"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry gallery */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {photos.map((p) => (
            <figure
              key={p.id}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border bg-card"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <figcaption className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                    {p.year}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    {p.category.replace("-", " ")}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground leading-snug">
                  {p.caption}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {photos.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            No photos for this year yet — check back soon.
          </p>
        )}
      </section>

      {/* CTA band */}
      <section className="bg-scef-blue-darker text-white">
        <div className="container mx-auto px-4 py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Be part of the next chapter
            </h2>
            <p className="mt-3 text-white/75">
              Volunteers, ambassadors, educators and partners power every SCEF
              program — from school outreach to NESA-Africa, EduAid-Africa and
              local chapter development across the continent.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker font-semibold"
            >
              <Link to="/get-involved/volunteer">
                <Handshake className="w-4 h-4 mr-2" />
                Become a Volunteer
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
            >
              <Link to="/get-involved/ambassador">
                <Award className="w-4 h-4 mr-2" />
                Become an Ambassador
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
            >
              <Link to="/auth/sign-up">
                <Users className="w-4 h-4 mr-2" />
                Become a Member
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
            >
              <Link to="/donate">
                <Heart className="w-4 h-4 mr-2" />
                Donate Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default Volunteers;

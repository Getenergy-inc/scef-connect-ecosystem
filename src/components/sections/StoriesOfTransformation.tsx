import { Link } from "react-router-dom";
import { Play, Radio, ArrowRight } from "lucide-react";
import s1 from "@/assets/rmsa/school-before-after.jpg";
import s2 from "@/assets/rmsa/sign-language-girls.jpg";
import s3 from "@/assets/rmsa/vocational-training.jpg";
import s4 from "@/assets/rmsa/community-partner.jpg";

const stories = [
  { image: s1, kind: "NESA TV", title: "Schools rebuilt across three regions", to: "/media/nesa-tv" },
  { image: s2, kind: "Impact Story", title: "Sign language classrooms in Ghana", to: "/programs/special-needs-education" },
  { image: s3, kind: "It's In Me Radio", title: "Vocational pathways for special needs youth", to: "/media/its-in-me-radio" },
  { image: s4, kind: "Partner Spotlight", title: "Community partners on the ground", to: "/partners" },
];

export const StoriesOfTransformation = () => {
  return (
    <section className="bg-card py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            Media & Storytelling
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            Stories of Transformation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Documentary-style coverage from NESA TV, It's In Me Radio, school
            transformations and the partners making it possible.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stories.map((s) => (
            <Link
              key={s.title}
              to={s.to}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent" />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-scef-gold/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-scef-blue-darker">
                  {s.kind.includes("Radio") ? <Radio className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                  {s.kind}
                </div>
                <div className="absolute inset-x-4 bottom-4">
                  <h3 className="font-display text-base font-bold leading-tight text-white">
                    {s.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/media"
            className="inline-flex items-center gap-2 rounded-md bg-scef-blue-darker px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-scef-blue"
          >
            Watch Impact Stories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

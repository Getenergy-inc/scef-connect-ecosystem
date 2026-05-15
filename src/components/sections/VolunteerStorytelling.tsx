import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, Award, Handshake } from "lucide-react";
import { photoLibrary } from "@/config/photoLibrary";
import legacyCohort2009 from "@/assets/legacy/scef-international-cohort-2009.jpg";

/**
 * "Powered by Volunteers, Educators & Change Makers Across Africa"
 * Documentary-style storytelling block for the homepage.
 */
export const VolunteerStorytelling = () => {
  // Pick 6 documentary photos for the masonry grid.
  const photos = photoLibrary.slice(0, 6);

  return (
    <section className="relative bg-scef-blue-darker text-white">
      <div className="pointer-events-none absolute inset-0 bg-scef-pattern opacity-[0.04]" />
      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          {/* Copy column */}
          <div className="md:col-span-5">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
              Our People · 2007 — Present
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Powered by Volunteers, Educators & Change Makers Across Africa
            </h2>
            <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed">
              For over a decade, SCEF has worked with volunteers, educators, ambassadors,
              partners, schools and communities to advance education, sustainability,
              advocacy and social impact across Africa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker font-semibold"
              >
                <Link to="/volunteers">
                  <Users className="w-4 h-4 mr-2" />
                  Meet Our Contributors
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
              >
                <Link to="/get-involved">
                  <Heart className="w-4 h-4 mr-2" />
                  Join the Movement
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
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
            </div>
          </div>

          {/* Masonry */}
          <div className="md:col-span-7">
            {/* Featured legacy archive photo */}
            <figure className="group relative mb-3 overflow-hidden rounded-xl ring-1 ring-scef-gold/30 md:mb-4">
              <img
                src={legacyCohort2009}
                alt="SCEF early international volunteer cohort and contributors group photo, Nigeria, August 2009"
                loading="lazy"
                className="h-full w-full object-cover aspect-[16/9] transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/90 via-scef-blue-darker/20 to-transparent" />
              <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-scef-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-scef-blue-darker">
                Since 2007 · Legacy Archive
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                  August 2009 · Nigeria
                </span>
                <span className="mt-1 block text-sm md:text-base font-semibold text-white leading-tight">
                  Early SCEF international volunteer cohort — AIESEC collaboration & grassroots education advocacy
                </span>
              </figcaption>
            </figure>

            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {photos.map((p, i) => {
                // varied row spans for a documentary masonry feel
                const span =
                  i === 0 ? "row-span-2" : i === 3 ? "row-span-2" : "row-span-1";
                return (
                  <figure
                    key={p.id}
                    className={`group relative overflow-hidden rounded-xl ring-1 ring-white/10 ${span}`}
                  >
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      className="h-full w-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/85 via-scef-blue-darker/10 to-transparent opacity-90" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-3">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                        {p.year}
                      </span>
                      <span className="mt-1 block text-xs md:text-sm font-semibold text-white leading-tight">
                        {p.caption}
                      </span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VolunteerStorytelling;

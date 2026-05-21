import host from "@/assets/nesa-gallery/nesa-host-keynote.jpg";
import trio from "@/assets/nesa-gallery/nesa-guests-trio.jpg";
import team from "@/assets/nesa-gallery/nesa-team-group.jpg";
import hostGuests from "@/assets/nesa-gallery/nesa-host-with-guests.jpg";
import quad from "@/assets/nesa-gallery/nesa-guests-quad.jpg";
import selfie from "@/assets/nesa-gallery/nesa-guests-selfie.jpg";
import couple from "@/assets/nesa-gallery/nesa-host-couple.jpg";
import stageLineup from "@/assets/nesa-gallery/nesa-team-stage-lineup.jpg";

const photos = [
  { src: host, alt: "NESA-Africa host delivering keynote on stage", span: "md:col-span-2 md:row-span-2" },
  { src: stageLineup, alt: "NESA-Africa hosts, honorees and crew on the New Education Standard Award Africa stage", span: "md:col-span-2 md:row-span-2" },
  { src: team, alt: "NESA-Africa production and partner team on the purple carpet", span: "md:col-span-2" },
  { src: hostGuests, alt: "NESA-Africa host with two guests at the awards backdrop", span: "" },
  { src: couple, alt: "NESA-Africa guests in formal attire at the awards backdrop", span: "" },
  { src: trio, alt: "Three guests at the New Education Standard Award Africa stage", span: "" },
  { src: quad, alt: "Four guests posing at the NESA-Africa awards backdrop", span: "" },
  { src: selfie, alt: "NESA-Africa guests sharing a celebratory moment", span: "md:col-span-2" },
];

export const NesaEventGallery = () => {
  return (
    <section
      aria-labelledby="nesa-gallery-heading"
      className="bg-background py-16 md:py-24"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
            On the Purple Carpet
          </p>
          <h2
            id="nesa-gallery-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl"
          >
            NESA-Africa Moments
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Hosts, honorees, partners, and the production team behind the
            New Education Standard Award Africa.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[200px] md:gap-4">
          {photos.map((p) => (
            <figure
              key={p.src}
              className={`group relative overflow-hidden rounded-2xl bg-muted shadow-sm ring-1 ring-border ${p.span}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-scef-blue-darker/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NesaEventGallery;

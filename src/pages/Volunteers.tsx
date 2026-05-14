import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArchiveTile } from "@/components/volunteers/ArchiveTile";
import { ArchiveLightbox } from "@/components/volunteers/ArchiveLightbox";
import { ContributorDirectory } from "@/components/volunteers/ContributorDirectory";
import LegacyContributorsGallery from "@/components/volunteers/LegacyContributorsGallery";
import {
  archiveGallery,
  categoryLabels,
  eventHighlights,
  timelineMilestones,
  volunteerStories,
  type ArchiveCategory,
  type ArchiveItem,
} from "@/config/volunteersArchive";
import {
  Users,
  Heart,
  Handshake,
  Award,
  Camera,
  ArrowRight,
  MapPin,
  Image as ImageIcon,
} from "lucide-react";

const galleryCategories: (ArchiveCategory | "all")[] = [
  "all",
  "school-outreach",
  "volunteers",
  "ambassadors",
  "teacher-training",
  "eduaid-africa",
  "nesa-africa",
  "esg-campaigns",
  "girls-education",
  "conferences",
  "community-development",
  "educational-tours",
  "media-broadcasting",
  "award-ceremonies",
  "advocacy-walks",
  "local-chapters",
  "aiesec-vso",
];

const Volunteers = () => {
  const [filter, setFilter] = useState<ArchiveCategory | "all">("all");
  const [lightboxItem, setLightboxItem] = useState<ArchiveItem | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? archiveGallery : archiveGallery.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <Helmet>
        <title>Meet Our Volunteers & Contributors (2007 – Present) — SCEF</title>
        <meta
          name="description"
          content="Celebrating the volunteers, ambassadors, educators, contributors, partners, schools and communities who have supported SCEF's journey across Africa since 2007."
        />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        {/* ============== 1. HERO ============== */}
        <section className="relative isolate overflow-hidden bg-scef-blue-darker text-white">
          <div className="absolute inset-0 bg-scef-pattern opacity-[0.06]" />
          <div className="absolute inset-0 bg-gradient-to-br from-scef-blue-darker via-scef-blue-darker/95 to-scef-blue-dark" />
          <div className="container relative mx-auto px-4 py-20 md:py-28">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-scef-gold mb-4">
                Our People · 2007 — Present
              </p>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Meet Our Volunteers & Contributors
              </h1>
              <p className="mt-5 text-base md:text-xl text-white/80 leading-relaxed max-w-2xl">
                Powered by real people creating real educational impact across Africa since 2007 —
                volunteers, ambassadors, educators, partners, schools and communities.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker font-semibold">
                  <Link to="/get-involved/volunteer">
                    <Handshake className="w-4 h-4 mr-2" /> Join as Volunteer
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
                  <Link to="/get-involved/ambassador">
                    <Award className="w-4 h-4 mr-2" /> Become an Ambassador
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
                  <Link to="/partner-with-us">
                    <Users className="w-4 h-4 mr-2" /> Partner With SCEF
                  </Link>
                </Button>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-scef-gold/30 bg-scef-blue-darker/50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold/90">
                <Camera className="w-3.5 h-3.5" />
                Archive photo integration in progress
              </div>
            </div>
          </div>
        </section>

        <main className="flex-1">
          {/* ============== LEGACY CONTRIBUTORS (real archive photos) ============== */}
          <LegacyContributorsGallery />

          {/* ============== 2. DOCUMENTARY TIMELINE ============== */}
          <section className="bg-background border-b border-border">
            <div className="container mx-auto px-4 py-16 md:py-20">
              <div className="max-w-3xl mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
                  Documentary Timeline
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker leading-tight">
                  A Pan-African journey, told through the people who built it
                </h2>
              </div>

              <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {timelineMilestones.map((m) => (
                  <li
                    key={m.year}
                    className="group rounded-xl border border-border bg-card overflow-hidden hover:border-scef-gold/50 hover:shadow-lg transition-all"
                  >
                    <ArchiveTile
                      src={m.src}
                      alt={m.title}
                      caption={m.title}
                      year={m.year}
                      category={m.category}
                      aspect="aspect-[16/10]"
                    />
                    <div className="p-5">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
                        {m.year}
                      </p>
                      <h3 className="mt-1 font-display text-lg font-semibold text-scef-blue-darker">
                        {m.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ============== 2.5 CONTRIBUTOR DIRECTORY ============== */}
          <ContributorDirectory />

          {/* ============== 3. MASONRY GALLERY ============== */}
          <section className="bg-card/40 border-b border-border">
            <div className="container mx-auto px-4 py-16 md:py-20">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
                    Archive Gallery
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker leading-tight">
                    Two decades of volunteer-powered impact
                  </h2>
                </div>
                <Link
                  to="/media/archive"
                  className="inline-flex items-center text-sm font-semibold text-scef-blue-darker hover:text-scef-gold"
                >
                  Browse Media Archive <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              {/* Filter chips */}
              <div className="flex flex-wrap gap-2 mb-8">
                {galleryCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      filter === c
                        ? "bg-scef-blue-darker text-white"
                        : "bg-muted text-foreground hover:bg-scef-gold/15"
                    }`}
                  >
                    {c === "all" ? "All categories" : categoryLabels[c]}
                  </button>
                ))}
              </div>

              {/* Masonry */}
              <div className="columns-2 sm:columns-3 lg:columns-4 gap-4">
                {visible.map((item, i) => (
                  <div key={item.id} className="mb-4 break-inside-avoid">
                    <ArchiveTile
                      src={item.src}
                      alt={item.caption}
                      caption={item.caption}
                      year={item.year}
                      category={item.category}
                      aspect={i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}
                      onClick={() => setLightboxItem(item)}
                    />
                  </div>
                ))}
              </div>

              {visible.length === 0 && (
                <p className="text-center text-muted-foreground py-12">
                  No photos in this category yet — archive integration in progress.
                </p>
              )}
            </div>
          </section>

          {/* ============== 4. VOLUNTEER STORIES ============== */}
          <section className="bg-background border-b border-border">
            <div className="container mx-auto px-4 py-16 md:py-20">
              <div className="max-w-3xl mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
                  Volunteer Stories
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker leading-tight">
                  Real journeys, real impact
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {volunteerStories.map((s) => (
                  <article
                    key={s.id}
                    className="group rounded-xl border border-border bg-card overflow-hidden hover:border-scef-gold/50 hover:shadow-lg transition-all"
                  >
                    <ArchiveTile
                      alt={s.title}
                      caption={s.title}
                      year={s.year}
                      category={s.category}
                      aspect="aspect-[16/10]"
                    />
                    <div className="p-5">
                      <h3 className="font-display text-lg font-semibold text-scef-blue-darker leading-snug">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.excerpt}</p>
                      <Link
                        to="/media/archive"
                        className="mt-4 inline-flex items-center text-sm font-semibold text-scef-blue-darker hover:text-scef-gold"
                      >
                        Read story <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ============== 5. EVENT HIGHLIGHTS ============== */}
          <section className="bg-scef-blue-darker text-white relative">
            <div className="absolute inset-0 bg-scef-pattern opacity-[0.04]" />
            <div className="container relative mx-auto px-4 py-16 md:py-20">
              <div className="max-w-3xl mb-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
                  Event Highlights
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                  Cinematic moments from across the continent
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {eventHighlights.map((e) => (
                  <div key={e.id} className="rounded-xl overflow-hidden ring-1 ring-white/10">
                    <ArchiveTile
                      alt={e.title}
                      caption={e.title}
                      year={e.year}
                      category={e.category}
                      aspect="aspect-[16/10]"
                    />
                    <div className="p-4 bg-scef-blue-darker/60">
                      <h3 className="font-semibold text-white">{e.title}</h3>
                      <p className="mt-1 text-sm text-white/70">{e.blurb}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============== 6. LOCAL CHAPTER CONTRIBUTORS ============== */}
          <section className="bg-background border-b border-border">
            <div className="container mx-auto px-4 py-16 md:py-20">
              <div className="grid gap-10 lg:grid-cols-2 items-center">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
                    Local Chapter Impact
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker leading-tight">
                    Communities, schools & chapters across Africa
                  </h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">
                    Volunteers in communities, school outreach, regional chapter meetings, community
                    learning activities and environmental sustainability campaigns — the SCEF
                    movement lives where its chapters live.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild className="bg-scef-blue-darker hover:bg-scef-blue-dark text-white font-semibold">
                      <Link to="/chapters"><MapPin className="w-4 h-4 mr-2" /> Browse Chapters</Link>
                    </Button>
                    <Button asChild variant="outline" className="font-semibold">
                      <Link to="/chapters/start">Start a Chapter</Link>
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {archiveGallery
                    .filter((p) => ["local-chapters", "community-development", "school-outreach", "esg-campaigns"].includes(p.category))
                    .slice(0, 4)
                    .map((p) => (
                      <ArchiveTile
                        key={p.id}
                        alt={p.caption}
                        caption={p.caption}
                        year={p.year}
                        category={p.category}
                        aspect="aspect-square"
                        onClick={() => setLightboxItem(p)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </section>

          {/* ============== 7. MEDIA ARCHIVE CONNECTION ============== */}
          <section className="bg-card/40 border-b border-border">
            <div className="container mx-auto px-4 py-12 md:py-16">
              <div className="rounded-2xl border border-border bg-background p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 text-scef-gold text-[11px] font-semibold uppercase tracking-[0.2em] mb-2">
                    <ImageIcon className="w-4 h-4" /> Media Archive
                  </div>
                  <h2 className="font-display text-2xl font-bold text-scef-blue-darker">
                    Explore the full SCEF media archive
                  </h2>
                  <p className="mt-2 text-muted-foreground max-w-2xl">
                    Search and filter contributor stories, programmes and event coverage across
                    NESA-Africa, EduAid-Africa, RMSA, NESA TV and It's In Me Radio.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-scef-blue-darker hover:bg-scef-blue-dark text-white font-semibold">
                    <Link to="/media/archive">Open Archive <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
                  </Button>
                  <Button asChild variant="outline" className="font-semibold">
                    <Link to="/media/submit">Submit Media</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* ============== 8. CTA ============== */}
          <section className="bg-scef-blue-darker text-white">
            <div className="container mx-auto px-4 py-16 md:py-20">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
                  Become part of the movement
                </h2>
                <p className="mt-4 text-white/80 leading-relaxed">
                  Join the growing network of volunteers, educators, ambassadors, partners and
                  change makers advancing education and sustainable impact across Africa.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker font-semibold">
                  <Link to="/get-involved/volunteer"><Handshake className="w-4 h-4 mr-2" /> Become a Volunteer</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
                  <Link to="/get-involved/ambassador"><Award className="w-4 h-4 mr-2" /> Become an Ambassador</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
                  <Link to="/chapters"><MapPin className="w-4 h-4 mr-2" /> Join a Local Chapter</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
                  <Link to="/partner-with-us"><Users className="w-4 h-4 mr-2" /> Partner With Us</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
                  <Link to="/wallet/donate"><Heart className="w-4 h-4 mr-2" /> Donate Now</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>

      <ArchiveLightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
  );
};

export default Volunteers;

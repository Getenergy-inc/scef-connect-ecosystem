import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Globe, Building, Wifi, ArrowLeft, ArrowRight, UserPlus, Award, Mail } from "lucide-react";
import { useChapterBySlug, CHAPTER_TYPE_LABEL } from "@/hooks/useChapters";

const TYPE_ICON = { online: Wifi, hybrid: Globe, physical: Building } as const;

const PROGRAM_LINKS = [
  { id: "nesa-africa", label: "NESA-Africa Activities" },
  { id: "eduaid-africa", label: "EduAid-Africa Webinars" },
  { id: "rebuild-my-school-africa", label: "Rebuild My School Africa" },
  { id: "women-girls-education", label: "Women & Girls Education" },
  { id: "special-needs-education", label: "Special Needs Support" },
  { id: "elibrary-nigeria", label: "eLibrary Nigeria" },
];

export default function ChapterDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: chapter, isLoading } = useChapterBySlug(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20 text-muted-foreground">Loading chapter…</div>
        <Footer />
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <h1 className="font-display text-3xl font-bold text-scef-blue-darker mb-4">Chapter not found</h1>
          <Button asChild><Link to="/chapters"><ArrowLeft className="w-4 h-4 mr-2" />Browse all chapters</Link></Button>
        </div>
        <Footer />
      </div>
    );
  }

  const TypeIcon = TYPE_ICON[chapter.chapter_type];
  const typeLabel = CHAPTER_TYPE_LABEL[chapter.chapter_type];
  const location = [chapter.city, chapter.country].filter(Boolean).join(", ");

  return (
    <>
      <Helmet>
        <title>{chapter.name} — SCEF Local Chapter</title>
        <meta name="description" content={chapter.description ?? `${chapter.name} — a SCEF local chapter in ${location}.`} />
        <link rel="canonical" href={`https://santoscreations.org/chapters/${chapter.slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-16 bg-scef-blue-darker overflow-hidden">
            {chapter.image_url && (
              <img src={chapter.image_url} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" loading="lazy" />
            )}
            <div className="container mx-auto px-4 relative z-10">
              <Link to="/chapters" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-scef-gold mb-6">
                <ArrowLeft className="w-4 h-4" /> All Chapters
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-scef-gold/15 px-3 py-1 text-xs font-semibold text-scef-gold">
                  <TypeIcon className="w-3.5 h-3.5" /> {typeLabel}
                </span>
                {chapter.region && (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90">{chapter.region}</span>
                )}
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">{chapter.name}</h1>
              <p className="flex items-center gap-2 text-white/80 mb-4">
                <MapPin className="w-4 h-4 text-scef-gold" /> {location}
              </p>
              {chapter.description && (
                <p className="max-w-2xl text-lg text-white/80 leading-relaxed">{chapter.description}</p>
              )}
              <p className="mt-2 text-sm italic text-white/60">
                <Users className="inline w-4 h-4 mr-1" />
                Reporting in progress
              </p>
            </div>
          </section>

          {/* Body */}
          <section className="py-14">
            <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold text-scef-blue-darker mb-3">About this chapter</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {chapter.description ?? `Local SCEF chapter serving ${location}.`} Chapters drive school nominations,
                      training delivery, fundraising and regional media coordination for all SCEF programmes.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-display text-xl font-bold text-scef-blue-darker mb-4">Programmes coordinated locally</h2>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {PROGRAM_LINKS.map((p) => (
                        <li key={p.id}>
                          <Link
                            to={`/programs/${p.id}`}
                            className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm hover:border-scef-gold hover:text-scef-blue-darker"
                          >
                            {p.label}
                            <ArrowRight className="w-4 h-4 opacity-60" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <aside className="space-y-4">
                <Card>
                  <CardContent className="p-6 space-y-3">
                    <h3 className="font-display text-lg font-bold text-scef-blue-darker">Get involved</h3>
                    <Button className="w-full" asChild>
                      <Link to={`/chapters/join-online?country=${encodeURIComponent(chapter.country)}&chapter=${chapter.slug}`}>
                        <UserPlus className="w-4 h-4 mr-2" /> Join this chapter
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/get-involved/ambassador?country=${encodeURIComponent(chapter.country)}&chapter=${chapter.slug}`}>
                        <Award className="w-4 h-4 mr-2" /> Apply as Ambassador
                      </Link>
                    </Button>
                    <Button variant="ghost" className="w-full" asChild>
                      <Link to="/contact"><Mail className="w-4 h-4 mr-2" />Contact chapter leads</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-sm space-y-2">
                    <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="font-medium">{typeLabel}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Region</span><span className="font-medium">{chapter.region ?? "—"}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Country</span><span className="font-medium">{chapter.country}</span></div>
                    {chapter.city && <div className="flex justify-between"><span className="text-muted-foreground">City</span><span className="font-medium">{chapter.city}</span></div>}
                    <div className="flex justify-between"><span className="text-muted-foreground">Members</span><span className="italic text-muted-foreground">Reporting in progress</span></div>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

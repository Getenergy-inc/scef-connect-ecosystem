import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { photoLibrary, type PhotoCategory } from "@/config/photoLibrary";
import { supabase } from "@/integrations/supabase/client";
import { Search, Image as ImageIcon, Film, Radio, Award, Users, Megaphone, GraduationCap, Building2, Heart } from "lucide-react";

type CategoryFilter = "all" | PhotoCategory | string;

const categories: { id: CategoryFilter; label: string; icon: typeof ImageIcon }[] = [
  { id: "all", label: "All Media", icon: ImageIcon },
  { id: "school-outreach", label: "School Outreach", icon: GraduationCap },
  { id: "classroom", label: "Teacher Training", icon: Users },
  { id: "volunteers", label: "Volunteers", icon: Heart },
  { id: "girls-education", label: "Girls & STEM", icon: Users },
  { id: "awards", label: "NESA Awards", icon: Award },
  { id: "advocacy", label: "Advocacy", icon: Megaphone },
  { id: "rebuild", label: "Rebuild My School", icon: Building2 },
  { id: "landscape", label: "Landscapes", icon: ImageIcon },
];

const programLinks = [
  { label: "NESA TV", to: "/media/nesa-tv", icon: Film },
  { label: "It's In Me Radio", to: "/media/its-in-me-radio", icon: Radio },
  { label: "EduAid Webinars", to: "/media/eduaid-webinars", icon: Users },
  { label: "Education Tourism", to: "/media/education-tourism", icon: GraduationCap },
];

const MediaArchive = () => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryFilter>("all");
  const [published, setPublished] = useState<
    { id: string; src: string; alt: string; caption: string; year: string; category: string }[]
  >([]);

  useEffect(() => {
    supabase
      .from("media_submissions")
      .select("id, photo_url, photo_alt, caption, year, category")
      .eq("status", "published")
      .order("reviewed_at", { ascending: false })
      .limit(200)
      .then(({ data }) => {
        setPublished(
          (data ?? []).map((d: any) => ({
            id: `sub-${d.id}`,
            src: d.photo_url,
            alt: d.photo_alt ?? d.caption,
            caption: d.caption,
            year: d.year ?? "",
            category: d.category ?? "",
          }))
        );
      });
  }, []);

  const allItems = useMemo(
    () => [...published, ...photoLibrary.map((p) => ({ ...p, category: p.category as string }))],
    [published]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((p) => {
      const matchesCat = cat === "all" || p.category === cat;
      const matchesQ =
        !q ||
        p.caption.toLowerCase().includes(q) ||
        p.alt.toLowerCase().includes(q) ||
        p.year.includes(q) ||
        p.category.includes(q);
      return matchesCat && matchesQ;
    });
  }, [query, cat, allItems]);

  return (
    <PageShell
      title="SCEF Historical Media Archive"
      description="Browse photos, videos and stories from SCEF programs — school outreach, NESA-Africa, EduAid, advocacy walks, training, awards and local chapters across Africa."
      eyebrow="Media · 2007 — Present"
      heading="SCEF Historical Media Archive"
      intro="A growing visual record of SCEF's work across Africa — search by program, year or activity, or jump directly to NESA TV, It's In Me Radio and our webinar archives."
    >
      {/* Program shortcuts */}
      <section className="border-b border-border bg-card/40">
        <div className="container mx-auto px-4 py-6 flex flex-wrap gap-3">
          {programLinks.map(({ label, to, icon: Icon }) => (
            <Button
              key={to}
              asChild
              variant="outline"
              size="sm"
              className="font-semibold"
            >
              <Link to={to}>
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      {/* Search + categories */}
      <section className="container mx-auto px-4 py-8">
        <div className="relative max-w-xl mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by activity, program, year…"
            className="pl-9 h-11"
            aria-label="Search media archive"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map(({ id, label, icon: Icon }) => {
            const active = cat === id;
            return (
              <button
                key={id}
                onClick={() => setCat(id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  active
                    ? "bg-scef-blue-darker text-white"
                    : "bg-muted text-foreground hover:bg-scef-gold/15"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          {results.length} {results.length === 1 ? "item" : "items"} ·{" "}
          <span className="italic">Reporting in progress — archive expanding monthly.</span>
        </p>
      </section>

      {/* Results grid */}
      <section className="container mx-auto px-4 pb-16">
        {results.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-xl">
            <ImageIcon className="w-8 h-8 mx-auto text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">
              No media matches your search. Try a different term or category.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <figure
                key={p.id}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-scef-gold/50 hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <figcaption className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                      {p.year}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      {p.category.replace("-", " ")}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug">
                    {p.caption}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-scef-blue-darker text-white">
        <div className="container mx-auto px-4 py-14">
          <h2 className="font-display text-2xl md:text-3xl font-bold max-w-2xl">
            Have photos or stories from an SCEF program?
          </h2>
          <p className="mt-3 text-white/75 max-w-2xl">
            Help grow the archive — contributors, chapter leads and partners can
            submit historical photos, event highlights and program documentation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker font-semibold"
            >
              <Link to="/media/submit">Submit Media</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
            >
              <Link to="/media/my-submissions">My Submissions</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
            >
              <Link to="/volunteers">Meet Our Contributors</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default MediaArchive;

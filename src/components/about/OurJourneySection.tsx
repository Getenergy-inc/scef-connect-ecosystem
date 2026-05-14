import { useEffect, useMemo, useState } from "react";
import { X, Pencil, Save, RotateCcw } from "lucide-react";
import foundations from "@/assets/legacy/scef-foundations-team.jpg";
import exchange from "@/assets/legacy/scef-international-exchange.jpg";
import community from "@/assets/legacy/scef-community-learning-2009.jpg";
import leadership from "@/assets/legacy/scef-leadership-collaboration.jpg";

interface Story {
  id: string;
  src: string;
  title: string;
  label: string;
  badge?: string;
  description: string;
  tags: string[];
}

const defaultStories: Story[] = [
  {
    id: "foundations",
    src: foundations,
    title: "Foundations of the Vision",
    label: "Early SCEF Contributors",
    badge: "Since 2007",
    description:
      "SCEF began as a bold grassroots vision powered by educators, youth advocates, professionals, and volunteers committed to transforming education and community development across Africa.",
    tags: ["Education Leadership", "Community Advocacy", "Pan-African Vision", "Grassroots Impact"],
  },
  {
    id: "community",
    src: community,
    title: "Global Connections & Community Learning",
    label: "International Education Exchange",
    badge: "2009",
    description:
      "Through educational exchange, community engagement, volunteerism, and global collaboration, SCEF expanded its reach across cultures, institutions, and youth communities.",
    tags: ["International Collaboration", "Youth Development", "Volunteer Engagement", "Education Exchange"],
  },
  {
    id: "exchange",
    src: exchange,
    title: "Cross-Cultural Solidarity",
    label: "Legacy Volunteers",
    badge: "Since 2007",
    description:
      "Solidarity moments with partners and volunteers from across continents — strengthening SCEF's commitment to inclusive, dignity-driven education advocacy.",
    tags: ["Global Partners", "Solidarity", "Advocacy"],
  },
  {
    id: "leadership",
    src: leadership,
    title: "Building the Future Together",
    label: "Community Leadership",
    badge: "Since 2007",
    description:
      "Today, SCEF continues to grow through partnerships, local chapters, ambassadors, educators, volunteers, media advocates, and supporters working together to empower Africa's future.",
    tags: ["Leadership", "Partnerships", "Local Chapters", "Educational Innovation"],
  },
];

const milestones = [
  { year: "2007", text: "Early grassroots advocacy and educational outreach" },
  { year: "2010", text: "International educational collaboration and youth engagement" },
  { year: "2015", text: "Expansion into advocacy, training, and media initiatives" },
  { year: "2020", text: "Pan-African digital transformation and ecosystem development" },
  { year: "2025+", text: "Continental expansion through EduAid-Africa, NESA-Africa, ESG advocacy, local chapters, and GFA Wallet innovation" },
];

const STORAGE_KEY = "scef.ourJourney.overrides.v1";

type Override = Partial<Pick<Story, "label" | "badge" | "description">> & { showBadge?: boolean };
type Overrides = Record<string, Override>;

function loadOverrides(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function OurJourneySection() {
  const [lightbox, setLightbox] = useState<Story | null>(null);
  const [overrides, setOverrides] = useState<Overrides>({});
  const [editMode, setEditMode] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    setOverrides(loadOverrides());
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("edit") === "1") setEditMode(true);
    }
  }, []);

  const stories = useMemo<Story[]>(
    () =>
      defaultStories.map((s) => {
        const o = overrides[s.id] || {};
        return {
          ...s,
          label: o.label ?? s.label,
          description: o.description ?? s.description,
          badge: o.showBadge === false ? undefined : (o.badge ?? s.badge),
        };
      }),
    [overrides]
  );

  const saveOverride = (id: string, patch: Override) => {
    const next = { ...overrides, [id]: { ...overrides[id], ...patch } };
    setOverrides(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const resetOverride = (id: string) => {
    const next = { ...overrides };
    delete next[id];
    setOverrides(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <section id="our-journey" className="py-20 bg-background border-y border-border">
      <div className="container px-4 md:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-scef-gold/10 text-scef-blue-darker text-xs font-semibold tracking-wider uppercase mb-4">
            SCEF Movement Archive
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker mb-4">
            Our Journey Through People, Purpose & Impact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From grassroots educational advocacy to a growing Pan-African movement, SCEF has been
            powered by passionate educators, volunteers, youth leaders, development advocates, and
            global contributors since 2007.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setEditMode((v) => !v)}
              className={`inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                editMode
                  ? "bg-scef-gold text-scef-blue-darker border-scef-gold"
                  : "bg-transparent text-muted-foreground border-border hover:border-scef-gold/60"
              }`}
              aria-pressed={editMode}
            >
              <Pencil className="w-3.5 h-3.5" />
              {editMode ? "Editing captions — click a card" : "Edit captions"}
            </button>
            {editMode && Object.keys(overrides).length > 0 && (
              <button
                onClick={() => {
                  localStorage.removeItem(STORAGE_KEY);
                  setOverrides({});
                }}
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset all
              </button>
            )}
          </div>
        </div>

        {/* Storytelling gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <article
              key={s.id}
              className={`group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500 ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <button
                onClick={() => (editMode ? setEditing(s.id) : setLightbox(s))}
                aria-label={editMode ? `Edit ${s.title}` : `Open ${s.title}`}
                className="block w-full text-left"
              >
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3] lg:aspect-[16/11]" : "aspect-[4/3]"}`}>
                  <img
                    src={s.src}
                    alt={s.label}
                    loading="lazy"
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/80 via-scef-blue-darker/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {s.badge && (
                    <span className="absolute top-3 right-3 bg-scef-gold text-scef-blue-darker text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                      {s.badge}
                    </span>
                  )}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-scef-blue-darker text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wider">
                    {s.label}
                  </span>

                  {editMode && (
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 bg-scef-gold text-scef-blue-darker text-[10px] font-bold px-2 py-1 rounded-full shadow">
                      <Pencil className="w-3 h-3" /> Click to edit
                    </span>
                  )}

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display text-lg md:text-xl font-bold mb-1.5 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/90 line-clamp-3 mb-3">
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/15 border border-white/30 backdrop-blur"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>

        <MovementTimeline milestones={milestones} />
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-label={lightbox.title}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.label}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="text-white mt-4 text-center">
              <p className="text-scef-gold text-xs font-semibold uppercase tracking-wider">{lightbox.label}</p>
              <h4 className="font-display text-xl font-bold mt-1">{lightbox.title}</h4>
              <p className="text-white/80 text-sm mt-2 max-w-2xl mx-auto">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <EditCaptionModal
          story={stories.find((s) => s.id === editing)!}
          onClose={() => setEditing(null)}
          onSave={(patch) => {
            saveOverride(editing, patch);
            setEditing(null);
          }}
          onReset={() => {
            resetOverride(editing);
            setEditing(null);
          }}
        />
      )}
    </section>
  );
}

function EditCaptionModal({
  story,
  onClose,
  onSave,
  onReset,
}: {
  story: Story;
  onClose: () => void;
  onSave: (patch: Override) => void;
  onReset: () => void;
}) {
  const [label, setLabel] = useState(story.label);
  const [description, setDescription] = useState(story.description);
  const [badge, setBadge] = useState(story.badge ?? "Since 2007");
  const [showBadge, setShowBadge] = useState(Boolean(story.badge));

  return (
    <div
      role="dialog"
      aria-label={`Edit ${story.title}`}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-scef-gold font-semibold">Edit caption</p>
            <h4 className="font-display text-lg font-bold text-scef-blue-darker">{story.title}</h4>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Photo caption / label</label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-scef-gold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-scef-gold"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-foreground mb-2">
              <input
                type="checkbox"
                checked={showBadge}
                onChange={(e) => setShowBadge(e.target.checked)}
                className="rounded"
              />
              Show date badge
            </label>
            <input
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              disabled={!showBadge}
              placeholder="e.g. Since 2007 or 2009"
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-scef-gold disabled:opacity-50"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset to default
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-sm font-semibold px-4 py-2 rounded-md border border-border hover:bg-muted"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                onSave({
                  label: label.trim(),
                  description: description.trim(),
                  badge: badge.trim() || undefined,
                  showBadge,
                })
              }
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md bg-scef-gold text-scef-blue-darker hover:opacity-90"
            >
              <Save className="w-4 h-4" /> Save
            </button>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground mt-4">
          Edits are saved on this device. Use Reset to restore the original caption.
        </p>
      </div>
    </div>
  );
}

function MovementTimeline({ milestones }: { milestones: { year: string; text: string }[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [lineProgress, setLineProgress] = useState(0);
  // refs created via useMemo below

  const itemRefs = useMemo(
    () => milestones.map(() => ({ current: null as HTMLDivElement | null })),
    [milestones.length]
  );
  const wrapperRef = useMemo(() => ({ current: null as HTMLDivElement | null }), []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setRevealed(new Set(milestones.map((_, i) => i)));
      setLineProgress(100);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setRevealed((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );

    itemRefs.forEach((r) => r.current && observer.observe(r.current));

    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.6;
      const scrolled = Math.min(Math.max(vh - rect.top, 0), total);
      setLineProgress(Math.min(100, (scrolled / total) * 100));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [itemRefs, milestones.length, wrapperRef]);

  return (
    <div className="mt-16">
      <h3 className="font-display text-xl font-bold text-scef-blue-darker text-center mb-8">
        SCEF Movement Timeline
      </h3>
      <div className="relative" ref={(el) => (wrapperRef.current = el)}>
        {/* Track */}
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-scef-gold/15 md:-translate-x-1/2"
          aria-hidden
        />
        {/* Animated progress line */}
        <div
          className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-scef-gold md:-translate-x-1/2 transition-[height] duration-500 ease-out"
          style={{ height: `${lineProgress}%` }}
          aria-hidden
        />
        <div className="space-y-6">
          {milestones.map((m, idx) => {
            const isRevealed = revealed.has(idx);
            return (
              <div
                key={m.year}
                ref={(el) => (itemRefs[idx].current = el)}
                data-idx={idx}
                className={`relative flex md:items-center gap-4 md:gap-8 transition-all duration-700 ease-out ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } ${
                  isRevealed
                    ? "opacity-100 translate-y-0"
                    : `opacity-0 translate-y-6 ${idx % 2 === 0 ? "md:-translate-x-6" : "md:translate-x-6"}`
                }`}
                style={{ transitionDelay: isRevealed ? `${idx * 120}ms` : "0ms" }}
              >
                <span
                  className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-scef-gold ring-4 ring-background z-10 transition-transform duration-500 ${
                    isRevealed ? "scale-100" : "scale-0"
                  }`}
                  style={{ transitionDelay: isRevealed ? `${idx * 120 + 150}ms` : "0ms" }}
                />
                <div className="hidden md:block flex-1" />
                <div className="ml-10 md:ml-0 flex-1 bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm">
                  <div className="text-scef-gold font-bold text-sm mb-1">{m.year}</div>
                  <p className="text-sm text-foreground/90 leading-relaxed">{m.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Award, CalendarRange, GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import nesaRecognition from "@/assets/nesa-africa-recognition.png";
import masterTimelinesBg from "@/assets/master-timelines-bg.jpg";

type CTA = { label: string; to: string; variant?: string };
type Timeline = {
  id: string;
  slug: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  image_alt: string | null;
  badge_label: string | null;
  highlights: string[];
  ctas: CTA[];
  display_order: number;
  is_active: boolean;
};

const FALLBACK: Timeline[] = [
  {
    id: "fallback-nesa",
    slug: "nesa-africa",
    eyebrow: "NESA-Africa · 2026 Season",
    title: "NESA-Africa 2026 Season Programme Timeline",
    description:
      "Explore the full 2026 season journey from public pre-nomination activation on 20 May 2026 to the Blue Garnet Awards Gala on 22 October 2026, followed by a 12-month Rebuild My School Africa and EduAid-Africa impact phase.",
    image_url: nesaRecognition,
    image_alt: "NESA-Africa education recognition",
    badge_label: "Recognition",
    highlights: [
      "Public Pre-Nomination Activation — 20 May 2026",
      "Platinum Recognition Show — 5 July 2026",
      "Africa Education Icon Show — 12 July 2026",
      "Gold Certificate Voting — 20 Jul – 15 Aug 2026",
      "Gold Winners Show — 22 August 2026",
      "Momentum Phase — 23 Aug – 15 Sep 2026",
      "Blue Garnet Voting — 16 Sep – 22 Oct 2026",
      "Blue Garnet Awards Gala — 22 October 2026",
      "Rebuild My School Africa — 23 Oct 2026 → Oct 2027",
    ],
    ctas: [
      { label: "View Timeline", to: "/programs/nesa-africa/timeline", variant: "secondary" },
      { label: "Nominate Now", to: "/nominate", variant: "heroOutline" },
      { label: "Watch NESA TV", to: "/media/nesa-tv", variant: "heroOutline" },
      { label: "Sponsor NESA-Africa", to: "/wallet/donate?fund=nesa-africa", variant: "heroOutline" },
    ],
    display_order: 1,
    is_active: true,
  },
  {
    id: "fallback-eduaid",
    slug: "eduaid-africa",
    eyebrow: "EduAid-Africa 2026–2027",
    title: "Master Timeline 2026–2027",
    description:
      "Explore the EduAid-Africa education impact cycle covering scholarships, school support, teacher training, career guidance, girls education, digital learning, monthly webinars, school adoption, and Rebuild My School Africa impact reporting.",
    image_url:
      "https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&w=1600&q=70",
    image_alt: "African students learning in classroom",
    badge_label: "Impact",
    highlights: [
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
    ],
    ctas: [
      { label: "View EduAid Timeline", to: "/eduaid-africa/master-timeline", variant: "default" },
      { label: "Sponsor EduAid-Africa", to: "/wallet/donate?fund=eduaid-africa", variant: "outline" },
      { label: "Adopt a School", to: "/wallet/donate?fund=adopt-school", variant: "outline" },
      { label: "Send a Child to School", to: "/wallet/donate?fund=send-a-child-to-school", variant: "outline" },
    ],
    display_order: 2,
    is_active: true,
  },
];

const isExternal = (to: string) => /^https?:\/\//i.test(to);

export const MasterTimelinesDuo = () => {
  const { data } = useQuery({
    queryKey: ["master-timelines"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("master_timelines")
        .select("*")
        .eq("is_active", true)
        .order("display_order");
      if (error) throw error;
      return (data ?? []) as Timeline[];
    },
  });

  const timelines = data && data.length ? data : FALLBACK;
  const nesa = timelines.find((t) => t.slug === "nesa-africa") ?? FALLBACK[0];
  const eduaid = timelines.find((t) => t.slug === "eduaid-africa") ?? FALLBACK[1];

  const renderCta = (c: CTA, key: string) => {
    const variant = (c.variant ?? "default") as any;
    if (isExternal(c.to)) {
      return (
        <Button key={key} asChild variant={variant} size="sm">
          <a href={c.to} target="_blank" rel="noopener noreferrer">{c.label}</a>
        </Button>
      );
    }
    return (
      <Button key={key} asChild variant={variant} size="sm">
        <Link to={c.to}>{c.label}</Link>
      </Button>
    );
  };

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
                src={nesaRecognition}
                alt="NESA-Africa education recognition"
                loading="lazy"
                className="h-full w-full object-cover opacity-90 transition group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker via-scef-blue-darker/40 to-transparent" />
              {nesa.badge_label && (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-scef-gold/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-blue-darker">
                  <Award className="h-3.5 w-3.5" /> {nesa.badge_label}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
              {nesa.eyebrow && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                  {nesa.eyebrow}
                </p>
              )}
              <h3 id="nesa-master-heading" className="mt-1 font-display text-2xl font-bold">
                {nesa.title}
              </h3>
              {nesa.description && (
                <p className="mt-2 text-sm leading-relaxed text-white/80">{nesa.description}</p>
              )}

              <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {nesa.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-white/85">
                    <CalendarRange className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {nesa.ctas.map((c, i) => renderCta(c, `nesa-${i}`))}
              </div>
            </div>
          </article>

          {/* EduAid-Africa */}
          <article
            aria-labelledby="eduaid-master-heading"
            className="group flex flex-col overflow-hidden rounded-2xl border border-scef-blue-darker/15 bg-card shadow-sm"
          >
            <div className="relative h-44 w-full overflow-hidden">
              {eduaid.image_url && (
                <img
                  src={eduaid.image_url}
                  alt={eduaid.image_alt ?? ""}
                  loading="lazy"
                  className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              {eduaid.badge_label && (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-scef-blue-darker px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold ring-1 ring-scef-gold/30">
                  <GraduationCap className="h-3.5 w-3.5" /> {eduaid.badge_label}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
              {eduaid.eyebrow && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-blue-darker">
                  {eduaid.eyebrow}
                </p>
              )}
              <h3
                id="eduaid-master-heading"
                className="mt-1 font-display text-2xl font-bold text-scef-blue-darker"
              >
                {eduaid.title}
              </h3>
              {eduaid.description && (
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{eduaid.description}</p>
              )}

              <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                {eduaid.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {eduaid.ctas.map((c, i) => renderCta(c, `eduaid-${i}`))}
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

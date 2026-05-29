import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Search } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { HistoryCTAs } from "@/components/history/HistoryCTAs";
import {
  scefHistoryTimeline,
  PROJECT_TYPES,
  FUNDING_STATUSES,
  type ProjectType,
  type FundingStatus,
} from "@/data/scefHistoryTimeline";

const ALL = "all" as const;

const History = () => {
  const [query, setQuery] = useState("");
  const [projectType, setProjectType] = useState<ProjectType | typeof ALL>(ALL);
  const [funding, setFunding] = useState<FundingStatus | typeof ALL>(ALL);
  const [openYear, setOpenYear] = useState<string | undefined>(undefined);

  const partnerCategories = useMemo(() => {
    const set = new Set<string>();
    scefHistoryTimeline.forEach((y) => y.partners.forEach((p) => set.add(p)));
    return Array.from(set).sort();
  }, []);
  const [partner, setPartner] = useState<string>(ALL);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return scefHistoryTimeline.filter((y) => {
      if (projectType !== ALL && !y.project_types.includes(projectType)) return false;
      if (funding !== ALL && y.funding_support_status !== funding) return false;
      if (partner !== ALL && !y.partners.includes(partner)) return false;
      if (!q) return true;
      const hay = [
        y.year,
        y.title,
        y.short_summary,
        y.detailed_history,
        y.projects.join(" "),
        y.partners.join(" "),
        y.related_programs.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, projectType, funding, partner]);

  return (
    <PageShell
      title="Our History 1997–2026"
      description="Year-by-year history of Santos Creations Educational Foundation from 1997 to 2026 — education advocacy, youth empowerment, digital learning, partnerships, funding support, and the SCEF 2035 vision."
      eyebrow="About SCEF"
      heading="Our History"
      intro="Santos Creations Educational Foundation's journey from 1997 to 2026 — from a founding educational tourism and cultural heritage vision in Minna, Niger State to a Pan-African education, advocacy, digital learning, youth empowerment, CSR partnership, and sustainable development organisation."
    >
      {/* Year quick-nav */}
      <section className="border-b border-scef-blue/10 bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
            Jump to year
          </p>
          <div className="flex flex-wrap gap-2">
            {scefHistoryTimeline.map((y) => (
              <button
                key={y.year}
                onClick={() => {
                  setOpenYear(y.slug);
                  document
                    .getElementById(`year-${y.year}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="px-3 py-1.5 text-xs font-semibold rounded-md border border-scef-blue/20 bg-background text-scef-blue-darker hover:bg-scef-blue hover:text-white transition-colors"
              >
                {y.year}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search year, project, partner…"
              className="pl-9"
              aria-label="Search history"
            />
          </div>
          <Select value={projectType} onValueChange={(v) => setProjectType(v as ProjectType | typeof ALL)}>
            <SelectTrigger><SelectValue placeholder="Project type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All project types</SelectItem>
              {PROJECT_TYPES.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={partner} onValueChange={setPartner}>
            <SelectTrigger><SelectValue placeholder="Partner category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All partners</SelectItem>
              {partnerCategories.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={funding} onValueChange={(v) => setFunding(v as FundingStatus | typeof ALL)}>
            <SelectTrigger><SelectValue placeholder="Funding / support status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All funding/support</SelectItem>
              {FUNDING_STATUSES.map((f) => (
                <SelectItem key={f} value={f}>{f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Showing {filtered.length} of {scefHistoryTimeline.length} years. Partners are listed as
          programme/volunteer partners — not as funders — unless direct grant, contract, payment or
          MoU evidence is documented.
        </p>
      </section>

      {/* Timeline accordion */}
      <section className="container mx-auto px-4 pb-12">
        <Accordion
          type="single"
          collapsible
          value={openYear}
          onValueChange={setOpenYear}
          className="max-w-4xl mx-auto divide-y divide-border border border-border rounded-xl bg-card"
        >
          {filtered.map((y) => (
            <AccordionItem key={y.year} value={y.slug} id={`year-${y.year}`} className="border-0 px-4 md:px-6">
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-start gap-4 text-left w-full pr-4">
                  <div className="flex flex-col items-center pt-1">
                    <span className="font-display text-2xl font-bold text-scef-blue-darker leading-none">
                      {y.year}
                    </span>
                    <span className="mt-2 h-2 w-2 rounded-full bg-scef-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-base md:text-lg font-semibold text-scef-blue-darker">
                      {y.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {y.short_summary}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Badge variant="secondary" className="text-[10px]">
                        {y.funding_support_status}
                      </Badge>
                      {y.project_types.slice(0, 2).map((p) => (
                        <Badge key={p} variant="outline" className="text-[10px] border-scef-blue/30">
                          {p}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="pl-0 md:pl-16 space-y-4 text-sm">
                  <p className="leading-relaxed text-foreground/90">{y.detailed_history}</p>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-scef-blue-darker mb-1.5">
                        Key projects
                      </h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                        {y.projects.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-scef-blue-darker mb-1.5">
                        Partners / institutional links
                      </h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                        {y.partners.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-scef-blue-darker mb-1.5">
                        Funding / support status
                      </h3>
                      <p className="text-muted-foreground">{y.funding_support_status}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{y.notes}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-scef-blue-darker mb-1.5">
                        Impact
                      </h3>
                      <p className="text-muted-foreground">{y.impact_summary}</p>
                    </div>
                  </div>

                  {y.related_programs.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-scef-blue-darker mb-1.5">
                        Related programmes
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {y.related_programs.map((p) => (
                          <Badge key={p} variant="outline" className="text-[10px] border-scef-gold/40">
                            {p}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button asChild size="sm" className="bg-scef-blue-darker hover:bg-scef-blue-dark text-white">
                      <Link to={`/history/${y.slug}`}>
                        Read full {y.year} history <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No history entries match your filters.
            </div>
          )}
        </Accordion>
      </section>

      <section className="bg-muted/30 border-t border-scef-blue/10">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-3">
            Continue the SCEF story
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Help write the next chapter of African education by joining, partnering with or supporting SCEF.
          </p>
          <HistoryCTAs />
          <div className="mt-6">
            <Button asChild variant="link" className="text-scef-blue-darker">
              <Link to="/about/vision-2037">
                Read Vision 2037 / SCEF 2035 <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default History;

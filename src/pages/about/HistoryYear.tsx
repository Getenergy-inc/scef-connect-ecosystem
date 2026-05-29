import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { HistoryCTAs } from "@/components/history/HistoryCTAs";
import { getHistoryYear, scefHistoryTimeline } from "@/data/scefHistoryTimeline";
import { Helmet } from "react-helmet-async";

const HistoryYearPage = () => {
  const { year } = useParams<{ year: string }>();
  const entry = year ? getHistoryYear(year) : undefined;

  if (!entry) return <Navigate to="/about/history" replace />;

  const idx = scefHistoryTimeline.findIndex((y) => y.slug === entry.slug);
  const prev = scefHistoryTimeline[idx - 1];
  const next = scefHistoryTimeline[idx + 1];
  const related = scefHistoryTimeline
    .filter((y) => y.year !== entry.year && y.related_programs.some((p) => entry.related_programs.includes(p)))
    .slice(0, 4);

  return (
    <PageShell
      title={entry.seo_title}
      description={entry.seo_description}
      eyebrow={`SCEF History · ${entry.year}`}
      heading={`SCEF History: ${entry.year}`}
      intro={`A detailed look at Santos Creations Educational Foundation's work, partnerships, funding/support record, and impact in ${entry.year}.`}
    >
      <Helmet>
        <meta name="robots" content="index,follow" />
      </Helmet>

      <section className="container mx-auto px-4 py-10 max-w-4xl space-y-10">
        <Card>
          <CardContent className="p-6 md:p-8 space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
              A. Year Overview
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker">
              {entry.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">{entry.short_summary}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <Badge variant="secondary">{entry.funding_support_status}</Badge>
              {entry.project_types.map((p) => (
                <Badge key={p} variant="outline" className="border-scef-blue/30">{p}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
            B. Main Milestone
          </p>
          <h3 className="font-display text-xl font-semibold text-scef-blue-darker mb-2">
            {entry.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">{entry.short_summary}</p>
        </section>

        <section>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
            C. Detailed History
          </p>
          <p className="text-foreground/90 leading-relaxed">{entry.detailed_history}</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
              D. Projects and Programs
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {entry.projects.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
              E. Partners and Institutional Links
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              {entry.partners.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
              F. Funding and Support Status
            </p>
            <p className="font-medium text-scef-blue-darker">{entry.funding_support_status}</p>
            <p className="text-sm text-muted-foreground mt-1">{entry.notes}</p>
            <p className="mt-2 text-xs text-muted-foreground italic">
              Partners are listed as programme/volunteer/CSR partners — not as direct funders —
              unless explicit grant, contract, payment or MoU evidence is documented.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
              G. Notes and Impact
            </p>
            <p className="text-muted-foreground">{entry.impact_summary}</p>
          </div>
        </section>

        {entry.related_links && entry.related_links.length > 0 && (
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
              Related links
            </p>
            <div className="flex flex-wrap gap-2">
              {entry.related_links.map((l) => (
                <Button key={l.href} asChild size="sm" variant="outline" className="border-scef-blue/30">
                  <Link to={l.href}>{l.label}</Link>
                </Button>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
              H. Related Years
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.year}
                  to={`/history/${r.slug}`}
                  className="block rounded-lg border border-border p-4 hover:border-scef-gold/50 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-scef-blue-darker">{r.year}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <p className="mt-1 text-sm font-semibold text-foreground">{r.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{r.short_summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <div className="flex gap-2">
            {prev && (
              <Button asChild variant="outline" size="sm" className="border-scef-blue/30">
                <Link to={`/history/${prev.slug}`}>
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> {prev.year}
                </Link>
              </Button>
            )}
            {next && (
              <Button asChild variant="outline" size="sm" className="border-scef-blue/30">
                <Link to={`/history/${next.slug}`}>
                  {next.year} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            )}
          </div>
          <Button asChild size="sm" className="bg-scef-blue-darker hover:bg-scef-blue-dark text-white">
            <Link to="/about/history">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> I. Back to Full History
            </Link>
          </Button>
        </section>
      </section>

      <section className="bg-muted/30 border-t border-scef-blue/10">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
            J. Take action
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-6">
            Partner with SCEF and continue this story
          </h2>
          <HistoryCTAs />
        </div>
      </section>
    </PageShell>
  );
};

export default HistoryYearPage;

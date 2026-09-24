import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ShieldCheck, Scale, Mail } from "lucide-react";
import { usePublishedImpactMetrics } from "@/hooks/useImpactMetrics";
import {
  METRIC_TYPE_LABEL,
  EVIDENCE_STATUS_LABEL,
  PENDING_METRIC_NOTE,
} from "@/data/impactEvidence";

const DOCUMENTS = [
  { title: "Annual Report", note: "Document pending publication" },
  { title: "Audited Financial Statements", note: "Document pending publication" },
  { title: "Programme Impact Report", note: "Document pending publication" },
  { title: "Monitoring & Evaluation Framework", note: "Document pending publication" },
  { title: "Safeguarding Policy", note: "Document pending publication" },
  { title: "Data Protection Policy", note: "Document pending publication" },
  { title: "Procurement & Financial Controls", note: "Document pending publication" },
];

const Transparency = () => {
  const { data: metrics = [], isLoading } = usePublishedImpactMetrics();
  const achieved = metrics.filter((m) => m.metric_type === "ACHIEVED");
  const targets = metrics.filter((m) => m.metric_type !== "ACHIEVED");

  return (
    <>
      <Helmet>
        <title>Transparency & Impact Evidence — SCEF</title>
        <meta
          name="description"
          content="Santos Creations Educational Foundation (SCEF) transparency centre: verified impact data, strategic targets, governance, institutional documents and the contact point for donor due diligence."
        />
        <link rel="canonical" href="https://santoscreations.org/transparency" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <section className="border-b border-border bg-scef-blue py-16 text-white">
            <div className="container mx-auto max-w-5xl px-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
                Institutional Transparency
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold md:text-4xl">
                Transparency &amp; Impact Evidence
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/80">
                Santos Creations Educational Foundation (SCEF), Nigeria, publishes
                impact figures only where supporting evidence has been reviewed and
                approved. Achieved results, strategic targets and estimates are
                classified separately so that funders, governments and institutional
                reviewers can assess each figure on its evidence.
              </p>
            </div>
          </section>

          <section className="py-14">
            <div className="container mx-auto max-w-5xl px-6">
              <h2 className="font-display text-2xl font-bold text-scef-blue-darker">
                Verified impact
              </h2>
              {isLoading ? (
                <p className="mt-4 text-sm text-muted-foreground">Loading…</p>
              ) : achieved.length === 0 ? (
                <div className="mt-4 rounded-xl border border-border bg-card p-6">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {PENDING_METRIC_NOTE}
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {achieved.map((m) => (
                    <Card key={m.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="font-display text-3xl text-scef-gold">
                          {m.metric_value}
                          {m.unit ? ` ${m.unit}` : ""}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-1 text-xs text-muted-foreground">
                        <div className="text-sm font-semibold text-scef-blue-darker">
                          {m.metric_name}
                        </div>
                        <div>{m.programme}</div>
                        {m.reporting_period && (
                          <div>Reporting period: {m.reporting_period}</div>
                        )}
                        {m.verification_date && (
                          <div>Last verified: {m.verification_date}</div>
                        )}
                        {m.evidence_source && <div>Source: {m.evidence_source}</div>}
                        <Badge variant="secondary" className="mt-2">
                          {EVIDENCE_STATUS_LABEL[m.evidence_status]}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="border-y border-border bg-muted/40 py-14">
            <div className="container mx-auto max-w-5xl px-6">
              <h2 className="font-display text-2xl font-bold text-scef-blue-darker">
                Strategic targets
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Future objectives, clearly separated from achieved results.
              </p>
              {targets.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">
                  Approved strategic targets will be published here as they are
                  confirmed in SCEF programme documentation.
                </p>
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {targets.map((m) => (
                    <Card key={m.id}>
                      <CardContent className="space-y-1 p-5 text-xs text-muted-foreground">
                        <Badge variant="outline">
                          {METRIC_TYPE_LABEL[m.metric_type]}
                        </Badge>
                        <div className="pt-2 font-display text-2xl text-scef-blue-darker">
                          {m.metric_value}
                          {m.unit ? ` ${m.unit}` : ""}
                        </div>
                        <div className="text-sm font-semibold text-scef-blue-darker">
                          {m.metric_name}
                        </div>
                        <div>{m.programme}</div>
                        {m.reporting_period && <div>Horizon: {m.reporting_period}</div>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="py-14">
            <div className="container mx-auto max-w-5xl px-6">
              <h2 className="font-display text-2xl font-bold text-scef-blue-darker">
                Institutional documents
              </h2>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {DOCUMENTS.map((d) => (
                  <div
                    key={d.title}
                    className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                  >
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-scef-gold" />
                    <div>
                      <div className="text-sm font-semibold text-scef-blue-darker">
                        {d.title}
                      </div>
                      <div className="text-xs text-muted-foreground">{d.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-border bg-card py-14">
            <div className="container mx-auto max-w-5xl px-6 grid gap-6 md:grid-cols-3">
              <div>
                <Scale className="mb-3 h-6 w-6 text-scef-gold" />
                <h3 className="font-display text-lg font-semibold text-scef-blue-darker">
                  Legal identity
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Santos Creations Educational Foundation (SCEF), a not-for-profit
                   foundation founded in 1997 and incorporated in Nigeria on 28 October
                   2010 (CAC Reg. IT-41501). Programme names such as
                  NESA-Africa, EduAid-Africa and Rebuild My School Africa are
                  programme brands of SCEF, not separate legal entities.
                </p>
              </div>
              <div>
                <ShieldCheck className="mb-3 h-6 w-6 text-scef-gold" />
                <h3 className="font-display text-lg font-semibold text-scef-blue-darker">
                  Governance
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  SCEF operates a Board of Trustees, Board of Advisors, Board of
                  Directors, Local Chapter Presidents and management divisions.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-3">
                  <Link to="/governance">View governance</Link>
                </Button>
              </div>
              <div>
                <Mail className="mb-3 h-6 w-6 text-scef-gold" />
                <h3 className="font-display text-lg font-semibold text-scef-blue-darker">
                  Institutional due diligence
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Funders, auditors and institutional partners may request evidence
                  packs, reporting periods and methodology notes.
                </p>
                <Button asChild variant="outline" size="sm" className="mt-3">
                  <Link to="/contact">Contact SCEF</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Transparency;

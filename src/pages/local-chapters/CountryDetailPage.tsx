import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MapPin, Wallet, Users, ExternalLink } from "lucide-react";
import {
  SCEF_COUNTRIES,
  REGION_BY_SLUG,
  type ScefRegionSlug,
} from "@/data/scefRegions";

const PROGRAM_ROUTES: Record<string, string> = {
  "NESA-Africa": "/programs/nesa-africa",
  "EduAid-Africa": "/programs/eduaid-africa",
  "Rebuild My School Africa": "/programs/rebuild-my-school-africa",
  "eLibrary Nigeria": "/programs/elibrary-nigeria",
  "Education Online Africa": "/programs/digital-learning",
  "Women & Girls Education": "/programs/women-girls-education",
  "Special Needs Education Support": "/programs/special-needs-education",
  "Santos Media": "/media",
  "NESA Africa TV": "/media/nesa-tv",
  "It's In Me Radio": "/media/its-in-me-radio",
  "Training & Webinars": "/media/webinars",
  "Sophia Help Center": "/support/faqs",
  "SCEF General": "/about",
};

import { getCountryStatus, getRegionStatus } from "@/data/chapterStatus";

const WALLET_VARIANT: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  Forming: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  "Pending Setup": "bg-muted text-muted-foreground border-border",
};

const CountryDetailPage = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>();
  const country = SCEF_COUNTRIES.find((c) => c.slug === countrySlug);

  if (!country) return <Navigate to="/local-chapters" replace />;

  const primary = REGION_BY_SLUG[country.primaryRegion];
  const secondary = (country.secondaryTags ?? [])
    .map((s) => REGION_BY_SLUG[s as ScefRegionSlug])
    .filter(Boolean);

  const allPrograms = Array.from(
    new Set([primary, ...secondary].flatMap((r) => r.linkedPrograms)),
  );
  const countryStatus = getCountryStatus(country);
  const regionStatus = getRegionStatus(primary);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${country.name} – SCEF Local Chapter`}</title>
        <meta
          name="description"
          content={`SCEF online local chapter for ${country.name}. Linked to ${primary.name}. Programs, GFA Wallet status and ways to join.`}
        />
        <link rel="canonical" href={`/local-chapters/country/${country.slug}`} />
      </Helmet>
      <Header />

      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <Link
          to={`/local-chapters/region/${primary.slug}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> {primary.name}
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline">{country.code ?? "—"}</Badge>
            <Link to={`/local-chapters/region/${primary.slug}`}>
              <Badge className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
                {primary.name}
              </Badge>
            </Link>
            {secondary.map((r) => (
              <Link key={r.slug} to={`/local-chapters/region/${r.slug}`}>
                <Badge variant="secondary">{r.name}</Badge>
              </Link>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-scef-blue-darker mb-3">
            {country.name} Online Chapter
          </h1>
          <p className="text-muted-foreground max-w-3xl">
            Official SCEF online local chapter for {country.name}, operating under the{" "}
            {primary.name} regional structure.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" /> Chapter Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={countryStatus.badgeClass}>
                <span className={`inline-block h-2 w-2 rounded-full mr-2 ${countryStatus.dotClass}`} />
                Online · {countryStatus.label}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                {countryStatus.description}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Wallet className="h-4 w-4" /> Regional GFA Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className={WALLET_VARIANT[primary.walletStatus]}>
                {primary.walletStatus}
              </Badge>
              <p className="text-xs text-muted-foreground mt-2">
                Regional chapter: <span className="font-medium">{regionStatus.label}</span> · Routed via {primary.name} wallet.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Sub-chapters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground italic">
              State / city chapters: Reporting in progress
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Linked SCEF Programs</h2>
          <div className="flex flex-wrap gap-2">
            {allPrograms.map((p) => {
              const href = PROGRAM_ROUTES[p];
              return href ? (
                <Link key={p} to={href}>
                  <Badge variant="secondary" className="hover:bg-scef-gold/20">
                    {p} <ExternalLink className="h-3 w-3 ml-1" />
                  </Badge>
                </Link>
              ) : (
                <Badge key={p} variant="secondary">{p}</Badge>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">Impact Pathway</h2>
          <Card>
            <CardContent className="pt-6 text-sm leading-relaxed">
              {primary.impactPathway}
            </CardContent>
          </Card>
        </section>

        <section className="rounded-lg border bg-muted/30 p-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold mb-1">Get involved in {country.name}</h3>
            <p className="text-sm text-muted-foreground">
              Join the online chapter, nominate a school, or start a state/city chapter.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to="/chapters/start">Start a chapter</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-scef-gold text-scef-blue-darker"
            >
              <Link to="/programs/rebuild-my-school-africa">Nominate a school</Link>
            </Button>
            <Button asChild className="bg-scef-blue-darker hover:bg-scef-blue-darker/90">
              <Link
                to={`/chapters/join-online?country=${country.slug}&region=${primary.slug}`}
              >
                Join online
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CountryDetailPage;

import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, MapPin, Wallet, Users, ExternalLink } from "lucide-react";
import {
  REGION_BY_SLUG,
  SCEF_REGIONS,
  countriesForRegion,
  countrySlug,
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

const STATUS_VARIANT: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  Forming: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  "Pending Setup": "bg-muted text-muted-foreground border-border",
};

const RegionDetailPage = () => {
  const { regionSlug } = useParams<{ regionSlug: string }>();
  const region = regionSlug ? REGION_BY_SLUG[regionSlug as ScefRegionSlug] : undefined;

  if (!region) {
    const known = SCEF_REGIONS.some((r) => r.slug === regionSlug);
    if (!known) return <Navigate to="/local-chapters" replace />;
  }
  if (!region) return null;

  const countries = useMemo(() => countriesForRegion(region.slug), [region.slug]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{`${region.name} – SCEF Local Chapters`}</title>
        <meta
          name="description"
          content={`${region.name}: ${region.shortDescription} Browse country chapters, linked programs and GFA Wallet status.`}
        />
        <link rel="canonical" href={`/local-chapters/region/${region.slug}`} />
      </Helmet>
      <Navbar />

      <main className="container mx-auto px-4 py-10 max-w-6xl">
        <Link
          to="/local-chapters"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Local Chapter Services
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="outline">{region.scope}</Badge>
            <Badge className={STATUS_VARIANT[region.walletStatus]}>
              GFA Wallet · {region.walletStatus}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-scef-blue-darker mb-3">
            {region.name}
          </h1>
          <p className="text-muted-foreground max-w-3xl">{region.shortDescription}</p>
        </header>

        <section className="grid gap-4 md:grid-cols-3 mb-10">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4" /> Countries Covered
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{countries.length}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Wallet className="h-4 w-4" /> GFA Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{region.walletStatus}</CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Active Chapters
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground italic">
              Reporting in progress
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">Impact Pathway</h2>
          <Card>
            <CardContent className="pt-6 text-sm leading-relaxed">
              {region.impactPathway}
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Linked SCEF Programs</h2>
          <div className="flex flex-wrap gap-2">
            {region.linkedPrograms.map((p) => {
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
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-bold">Country Chapters</h2>
            <span className="text-sm text-muted-foreground">{countries.length} countries</span>
          </div>
          {countries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No countries listed for this region yet.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {countries.map((c) => (
                <Link
                  key={c.slug}
                  to={`/local-chapters/country/${c.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-colors hover:border-scef-gold">
                    <CardContent className="pt-5 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-semibold text-scef-blue-darker group-hover:text-scef-gold">
                            {c.name}
                          </p>
                          {c.code && (
                            <p className="text-xs text-muted-foreground">{c.code}</p>
                          )}
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-scef-gold" />
                      </div>
                      <p className="text-xs italic text-muted-foreground mt-2">
                        Online chapter · Reporting in progress
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-lg border bg-muted/30 p-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold mb-1">Get involved in {region.name}</h3>
            <p className="text-sm text-muted-foreground">
              Join the online regional chapter or start a country/city chapter.
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/chapters/start">Start a chapter</Link>
            </Button>
            <Button asChild className="bg-scef-blue-darker hover:bg-scef-blue-darker/90">
              <Link to={`/chapters/join-online?region=${region.slug}`}>Join online</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RegionDetailPage;

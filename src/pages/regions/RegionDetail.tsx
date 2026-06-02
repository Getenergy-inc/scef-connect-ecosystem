import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  AFRICA_REGIONS,
  getRegionBySlug,
  SCEF_BRAND,
  STATUS_LABEL,
} from "@/data/africaRegions";
import {
  Accessibility,
  Vote,
  Wallet,
  Building2,
  GraduationCap,
  Users,
  MapPin,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const SOPHIA_WA =
  "https://wa.me/2348109765897?text=Hello%20Sophia%2C%20I%20want%20to%20join%20or%20support%20a%20SCEF%20regional%20local%20chapter.";

const RegionDetail = () => {
  const { slug = "" } = useParams();
  const region = getRegionBySlug(slug);

  if (!region) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Region not found</h1>
          <p className="text-muted-foreground mb-6">
            The region you're looking for isn't one of the ten approved SCEF regions.
          </p>
          <Button asChild>
            <Link to="/chapters">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Local Chapter Services
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const blocks = [
    { icon: Accessibility, title: "Special Needs School Nomination", status: region.nominationStatus,
      body: "Identify and nominate special needs schools in this region for the 2026–2027 NESA-Africa Legacy Impact pathway." },
    { icon: Vote, title: "Regional Voting", status: region.votingStatus,
      body: "Regional public voting determines which nominated schools enter the Rebuild My School Africa intervention pipeline." },
    { icon: Wallet, title: "GFA Wzip Regional Wallet", status: region.walletStatus,
      body: "A dedicated regional wallet for transparent fundraising, sponsorships, donation tracking, and intervention funding." },
    { icon: Building2, title: "Rebuild My School Africa", status: region.interventionStatus,
      body: "Direct school rebuild and renovation projects targeting Special Needs Education facilities in this region." },
    { icon: GraduationCap, title: "EduAid-Africa Edu-Tourism Conference", status: region.eduTourismStatus,
      body: "Regional edu-tourism advocacy, fundraising and partner-engagement events tied to the Legacy Impact pathway." },
    { icon: Users, title: "Local Chapter Status", status: region.chapterStatus,
      body: "Online, hybrid and physical chapter activity across countries and communities in this region." },
  ];

  return (
    <>
      <Helmet>
        <title>{region.name} | SCEF Regional Impact — NESA-Africa Legacy Pathway</title>
        <meta
          name="description"
          content={`${region.name} regional page: ${region.summary}`}
        />
        <link rel="canonical" href={`https://santoscreations.org/regions/${region.slug}`} />
      </Helmet>

      <div className="min-h-screen" style={{ backgroundColor: SCEF_BRAND.lightBg }}>
        <Header />
        <main>
          {/* Hero */}
          <section className="pt-28 pb-12" style={{ backgroundColor: SCEF_BRAND.navy }}>
            <div className="container mx-auto px-4 max-w-5xl">
              <Link
                to="/chapters"
                className="inline-flex items-center gap-1.5 text-xs font-semibold mb-5"
                style={{ color: SCEF_BRAND.gold }}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All regions
              </Link>
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                style={{ backgroundColor: `${SCEF_BRAND.gold}22`, color: SCEF_BRAND.gold }}
              >
                <MapPin className="w-3.5 h-3.5" /> SCEF Region
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                {region.name}
              </h1>
              <p className="text-base md:text-lg leading-relaxed max-w-3xl"
                 style={{ color: "rgba(255,255,255,0.82)" }}>
                {region.summary}
              </p>
              <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>
                <span className="font-semibold" style={{ color: SCEF_BRAND.gold }}>Countries / communities covered: </span>
                {region.countriesCovered}
              </p>
            </div>
          </section>

          {/* Pathway summary */}
          <section className="py-10">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="rounded-2xl bg-white border p-6"
                   style={{ borderColor: `${SCEF_BRAND.navy}1f` }}>
                <p className="text-sm font-semibold mb-1" style={{ color: SCEF_BRAND.goldDeep }}>
                  2026–2027 NESA-Africa Legacy Impact Pathway
                </p>
                <p className="text-sm md:text-base" style={{ color: SCEF_BRAND.navy }}>
                  {region.legacyPathway}
                </p>
              </div>
            </div>
          </section>

          {/* Impact blocks */}
          <section className="py-6 pb-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="grid md:grid-cols-2 gap-4">
                {blocks.map(({ icon: Icon, title, status, body }) => (
                  <div key={title}
                       className="rounded-2xl bg-white border p-5"
                       style={{ borderColor: `${SCEF_BRAND.navy}1f` }}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${SCEF_BRAND.gold}22`, color: SCEF_BRAND.goldDeep }}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <h3 className="font-display font-bold" style={{ color: SCEF_BRAND.navy }}>{title}</h3>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{body}</p>
                    <span className="inline-flex text-[11px] font-semibold px-2 py-1 rounded-md"
                          style={{ backgroundColor: SCEF_BRAND.lightBg, color: SCEF_BRAND.navy }}>
                      Status: {STATUS_LABEL[status]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Compliance */}
          <section className="pb-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="rounded-2xl p-6 border"
                   style={{ backgroundColor: SCEF_BRAND.navy, borderColor: `${SCEF_BRAND.gold}55` }}>
                <div className="flex items-start gap-3 text-white">
                  <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" style={{ color: SCEF_BRAND.gold }} />
                  <p className="text-sm leading-relaxed">
                    All regional fundraising, sponsorship, donation, wallet activity,
                    school nominations, regional voting, and local chapter activities
                    are governed by SCEF/NESA-Africa compliance, safeguarding, data
                    protection, and financial accountability standards. Local chapters
                    cannot independently raise funds, sign contracts, use the SCEF name,
                    or operate wallets outside approved SCEF governance and compliance
                    procedures.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTAs */}
          <section className="pb-20">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-center"
                  style={{ color: SCEF_BRAND.navy }}>
                Choose how you want to support {region.shortName}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  { to: `/chapters?region=${encodeURIComponent(region.name)}`, label: "Join a Local Chapter" },
                  { to: "/chapters/join-online", label: "Start an Online Chapter" },
                  { to: `/get-involved/ambassador?region=${region.slug}`, label: "Become a Regional Ambassador" },
                  { to: `/nominate?region=${region.slug}`, label: "Nominate a Special Needs School" },
                  { to: `/vote?region=${region.slug}`, label: "Vote for Regional Intervention" },
                  { to: `/wallet?region=${region.slug}`, label: "Support a Regional Wallet" },
                  { to: "/programs/eduaid-africa", label: "Partner With EduAid-Africa" },
                  { to: "/programs/rebuild-my-school-africa", label: "Support Rebuild My School Africa" },
                  { to: SOPHIA_WA, label: "Contact Sophia Support", external: true },
                ].map(({ to, label, external }) => (
                  external ? (
                    <a key={label} href={to} target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition"
                       style={{ backgroundColor: SCEF_BRAND.green }}>
                      {label} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link key={label} to={to}
                          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold border hover:bg-white transition bg-white"
                          style={{ borderColor: `${SCEF_BRAND.navy}33`, color: SCEF_BRAND.navy }}>
                      {label} <ArrowRight className="w-4 h-4" />
                    </Link>
                  )
                ))}
              </div>
            </div>
          </section>

          {/* Other regions */}
          <section className="pb-24">
            <div className="container mx-auto px-4 max-w-5xl">
              <h3 className="font-display text-lg font-bold mb-4" style={{ color: SCEF_BRAND.navy }}>
                Explore other regions
              </h3>
              <div className="flex flex-wrap gap-2">
                {AFRICA_REGIONS.filter((r) => r.slug !== region.slug).map((r) => (
                  <Link key={r.slug} to={`/regions/${r.slug}`}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white border hover:border-[--gold]"
                        style={{ borderColor: `${SCEF_BRAND.navy}22`, color: SCEF_BRAND.navy }}>
                    {r.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RegionDetail;

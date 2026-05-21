import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Crown, Star, Medal, Sparkles, LayoutGrid, Calendar, Heart } from "lucide-react";
import { AwardPathways } from "@/components/awards/AwardPathways";

const tiers = [
  { icon: Crown, title: "Platinum Certificate", desc: "Lifetime contribution honour.", href: "/awards/platinum" },
  { icon: Star, title: "Africa Education Icon", desc: "Continental icons of impact.", href: "/awards/icon" },
  { icon: Medal, title: "Gold Certificate", desc: "Excellence across categories.", href: "/awards/gold" },
  { icon: Sparkles, title: "Blue Garnet Award", desc: "Flagship recognition.", href: "/awards/blue-garnet" },
];

const explore = [
  { icon: LayoutGrid, title: "Categories (17)", desc: "Full category architecture.", href: "/categories" },
  { icon: Calendar, title: "NESA Calendar", desc: "2026 cycle dates & milestones.", href: "/calendar" },
];

const participate = [
  { icon: Heart, title: "Get Involved with NESA", desc: "Pathways into the awards.", href: "/get-involved" },
  { icon: Award, title: "Apply to Join NRC", desc: "Nominee Review Committee.", href: "/get-involved/nrc" },
  { icon: Medal, title: "Become a Judge", desc: "Join the jury panel.", href: "/get-involved/judge" },
];

const Awards = () => (
  <>
    <Helmet>
      <title>Awards Hub — SCEF & NESA-Africa</title>
      <meta name="description" content="The SCEF awards ecosystem — NESA-Africa, Platinum, Africa Icon, Gold, and Blue Garnet — recognizing education excellence across Africa." />
    </Helmet>
    <div className="min-h-screen bg-background">
      <HeaderScreenshot />
      <div className="h-[88px] md:h-[96px]" />
      <main>
        <section className="bg-scef-blue-darker py-24 text-white md:py-32">
          <div className="container mx-auto px-6 md:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">Awards Ecosystem</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Recognition as a <span className="text-gradient-gold italic">standards mechanism</span> for African education.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              The NESA-Africa awards engine recognizes excellence across regions, sectors, and stakeholder communities — converting recognition into lasting impact.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                <Link to="/programs/nesa-africa">Explore NESA-Africa <ArrowRight className="ms-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
        </section>

        <AwardPathways />

        {[
          { label: "Award Programs", items: tiers },
          { label: "Explore Awards", items: explore },
          { label: "Participation", items: participate },
        ].map((section) => (
          <section key={section.label} className="border-b border-border bg-background py-20">
            <div className="container mx-auto px-6 md:px-8">
              <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">{section.label}</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {section.items.map(({ icon: Icon, title, desc, href }) => (
                  <Link key={href} to={href} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-xl">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-scef-blue-darker/[0.06] text-scef-blue-darker group-hover:bg-scef-blue-darker group-hover:text-scef-gold transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-scef-blue-darker">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  </>
);

export default Awards;

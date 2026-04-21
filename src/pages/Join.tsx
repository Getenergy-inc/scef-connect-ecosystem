import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { MembershipBadge } from "@/components/ui/membership-badge";
import {
  ArrowRight,
  Users,
  MapPin,
  Megaphone,
  Heart,
  Handshake,
  HandHeart,
  CheckCircle2,
} from "lucide-react";
import { EndorsedBySection } from "@/components/sections/EndorsedBySection";

/**
 * Join SCEF — dedicated conversion page.
 * 3 primary entry paths (Member, Chapter, Ambassador) with role clarity strip
 * and lower-priority secondary actions (Volunteer, Partner, Donate).
 */
const Join = () => {
  const paths = [
    {
      id: "member",
      eyebrow: "Primary path",
      title: "Become a Member",
      description:
        "Join SCEF at the core level and contribute to programs, advocacy, and initiatives across regions.",
      benefits: [
        "Access to programs",
        "Participation in initiatives",
        "Global network connection",
      ],
      cta: "Join as Member",
      href: "/membership",
      icon: Users,
      featured: true,
    },
    {
      id: "chapter",
      eyebrow: "Regional",
      title: "Join a Local Chapter",
      description:
        "Engage with SCEF at the regional level through local chapters and community-driven initiatives.",
      benefits: [
        "Regional events & meetups",
        "Community-led projects",
        "Direct chapter network",
      ],
      cta: "Find a Chapter",
      ctaSecondary: { label: "Start a Chapter", href: "/local-chapters#start" },
      href: "/local-chapters",
      icon: MapPin,
    },
    {
      id: "ambassador",
      eyebrow: "Leadership",
      title: "Become an Ambassador",
      description:
        "Represent SCEF and lead advocacy efforts within your network or region.",
      benefits: [
        "Official ambassador title",
        "Leadership training",
        "Recognition & media features",
      ],
      cta: "Apply as Ambassador",
      href: "/get-involved/ambassador",
      icon: Megaphone,
    },
  ];

  const roles = [
    { label: "Member", scope: "Global participation" },
    { label: "Chapter Member", scope: "Regional engagement" },
    { label: "Ambassador", scope: "Leadership & representation" },
  ];

  const secondary = [
    { label: "Volunteer", href: "/get-involved#volunteer", icon: HandHeart },
    { label: "Partner With Us", href: "/partner-with-us", icon: Handshake },
    { label: "Donate", href: "/donate", icon: Heart },
  ];

  return (
    <>
      <Helmet>
        <title>Join SCEF — Three Paths to Be Part of the Movement</title>
        <meta
          name="description"
          content="Become a Member, join a local Chapter, or apply as an Ambassador. Three clear paths into Africa's leading membership-run education NGO."
        />
        <link rel="canonical" href="https://santoscreations.org/join" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* Hero */}
          <section className="relative overflow-hidden bg-scef-blue-darker py-24 md:py-32 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(45_92%_42%/0.18),transparent_60%)]" />
            <div className="absolute inset-0 bg-scef-pattern opacity-[0.04]" />
            <div className="container relative mx-auto px-6 md:px-8 max-w-4xl text-center">
              <MembershipBadge variant="subtle" label="Membership-run NGO" className="mb-8" />
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                Join the movement <span className="text-scef-gold italic">advancing</span> Education for All in Africa.
              </h1>
              <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-white/70 leading-relaxed">
                Three clear paths. One mission. Choose how you want to contribute to SCEF's work
                across regions, programs, and advocacy.
              </p>
            </div>
          </section>

          {/* 3 Path Cards */}
          <section className="py-20 md:py-28">
            <div className="container mx-auto px-6 md:px-8">
              <div className="grid gap-6 md:gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
                {paths.map((p, i) => {
                  const Icon = p.icon;
                  return (
                    <Reveal key={p.id} delay={i * 80}>
                      <article
                        className={`group relative h-full flex flex-col rounded-3xl border bg-card p-8 md:p-10 transition-all duration-500 ${
                          p.featured
                            ? "border-scef-gold/60 shadow-gold ring-1 ring-scef-gold/20 lg:scale-[1.02]"
                            : "border-border hover:border-scef-blue/40 hover:shadow-xl"
                        }`}
                      >
                        {p.featured && (
                          <div className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-scef-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-scef-blue-darker">
                            Recommended
                          </div>
                        )}

                        <div className="mb-6 flex items-center gap-4">
                          <div
                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                              p.featured
                                ? "bg-scef-gold text-scef-blue-darker"
                                : "bg-scef-blue/10 text-scef-blue"
                            }`}
                          >
                            <Icon className="h-7 w-7" strokeWidth={1.8} />
                          </div>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            {p.eyebrow}
                          </span>
                        </div>

                        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                          {p.title}
                        </h2>
                        <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                          {p.description}
                        </p>

                        <ul className="mt-6 space-y-2.5 flex-1">
                          {p.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                              <CheckCircle2
                                className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                                  p.featured ? "text-scef-gold" : "text-scef-blue"
                                }`}
                              />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 space-y-2">
                          <Button
                            size="lg"
                            asChild
                            className={`w-full h-12 font-semibold ${
                              p.featured
                                ? "bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover shadow-gold"
                                : "bg-scef-blue text-white hover:bg-scef-blue-dark"
                            }`}
                          >
                            <Link to={p.href}>
                              {p.cta}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          {p.ctaSecondary && (
                            <Button
                              variant="ghost"
                              size="sm"
                              asChild
                              className="w-full text-xs text-muted-foreground hover:text-scef-blue"
                            >
                              <Link to={p.ctaSecondary.href}>{p.ctaSecondary.label}</Link>
                            </Button>
                          )}
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Role clarity strip */}
          <section className="border-y border-border bg-muted/40 py-16">
            <div className="container mx-auto px-6 md:px-8 max-w-5xl">
              <p className="mb-8 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">
                Role clarity
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {roles.map((r) => (
                  <div
                    key={r.label}
                    className="rounded-2xl border border-border bg-card p-6 text-center"
                  >
                    <div className="font-display text-lg font-bold text-foreground">{r.label}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      → {r.scope}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Secondary actions */}
          <section className="py-20">
            <div className="container mx-auto px-6 md:px-8 max-w-5xl text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                Other ways to contribute
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Not ready to commit to membership? You can still support the mission.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                {secondary.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Button
                      key={s.label}
                      variant="outline"
                      size="lg"
                      asChild
                      className="h-12 border-2 hover:border-scef-gold hover:text-scef-blue-darker"
                    >
                      <Link to={s.href}>
                        <Icon className="mr-2 h-4 w-4" />
                        {s.label}
                      </Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          </section>
          <EndorsedBySection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Join;

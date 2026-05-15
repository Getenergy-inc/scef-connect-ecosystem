import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Cpu,
  Crown,
  HeartPulse,
  ShieldCheck,
  Compass,
  Briefcase,
  Leaf,
  HandHeart,
  Quote,
  ArrowRight,
} from "lucide-react";

const SECTIONS = [
  {
    id: "girls-education-access",
    icon: GraduationCap,
    title: "Girls Education Access",
    body: "We invest in school access, scholarships, learning materials, school uniforms, and inclusive educational opportunities so every African girl can stay in school and complete her education.",
  },
  {
    id: "stem-digital",
    icon: Cpu,
    title: "STEM & Digital Learning",
    body: "Through Education Online Africa and partner programmes, we open pathways into STEM, coding, AI literacy, and digital tools so girls and young women can lead the future of work and innovation.",
  },
  {
    id: "women-leadership",
    icon: Crown,
    title: "Women Leadership",
    body: "We build leadership pipelines for women educators, professionals, youth leaders, mentors, and Local Chapter Presidents (LCPs) — strengthening the bench of African women in decision-making roles.",
  },
  {
    id: "menstrual-health",
    icon: HeartPulse,
    title: "Menstrual Health Awareness",
    body: "Menstruation should never end a girl's education. Our advocacy campaigns and partner-funded sanitary kits keep girls in school and break the silence around menstrual and reproductive health.",
  },
  {
    id: "safe-learning-spaces",
    icon: ShieldCheck,
    title: "Safe Learning Spaces",
    body: "We promote safeguarding, anti-harassment policies, gender-sensitive school facilities, mental wellbeing support, and inclusive classrooms across SCEF-aligned schools and chapters.",
  },
  {
    id: "career-mentorship",
    icon: Compass,
    title: "Career Mentorship",
    body: "My Career, My Life and the SCEF Mentor Network connect girls and young women with mentors across industries — from medicine and engineering to media, finance, public service, and the creative economy.",
  },
  {
    id: "entrepreneurship",
    icon: Briefcase,
    title: "Entrepreneurship Support",
    body: "We back women-led enterprises through financial literacy, digital business skills, market access, and seed-grant pathways via partner CSR funds and the GFA Wallet ecosystem.",
  },
  {
    id: "esg-sustainability",
    icon: Leaf,
    title: "ESG & Sustainability Leadership",
    body: "Women and girls are central to climate resilience and sustainable development. We equip them to lead ESG initiatives, environmental advocacy, and community-development projects in their chapters.",
  },
  {
    id: "sponsorship",
    icon: HandHeart,
    title: "Sponsorship Opportunities",
    body: "Corporates, foundations, and individuals can sponsor a girl child, fund mentorship cohorts, underwrite STEM labs, or back continent-wide women empowerment campaigns. All giving is routed through the GFA Wallet for transparency.",
  },
];

const SPONSORSHIPS = [
  { label: "Sponsor a Girl Child", to: "/wallet/donate?fund=sponsor-a-girl" },
  { label: "Support Women Leadership", to: "/wallet/donate?fund=women-leadership" },
  { label: "Sponsor Girls in STEM", to: "/wallet/donate?fund=girls-in-stem" },
  { label: "Support Menstrual Health Awareness", to: "/wallet/donate?fund=menstrual-health" },
  { label: "Sponsor Women Entrepreneurship", to: "/wallet/donate?fund=women-entrepreneurship" },
  { label: "Fund Safe Learning Spaces", to: "/wallet/donate?fund=safe-learning-spaces" },
];

const TESTIMONIALS = [
  {
    quote:
      "Verified storytelling in progress. SCEF chapters are documenting impact stories from girls, women leaders, and mentors across Africa.",
    name: "SCEF Storytelling Desk",
    role: "Reporting in progress",
  },
  {
    quote:
      "Verified storytelling in progress. Mentor and mentee testimonials will be published as our 2026 cycle evidence is consolidated.",
    name: "SCEF Mentor Network",
    role: "Reporting in progress",
  },
];

const WomenGirlsEmpowerment = () => {
  return (
    <>
      <Helmet>
        <title>Empowering African Women &amp; Girls Through Education, Leadership &amp; Opportunity — SCEF</title>
        <meta
          name="description"
          content="SCEF's continental Women & Girls Empowerment programme: girls education access, STEM, women leadership, menstrual health, safe learning spaces, mentorship, entrepreneurship, and ESG leadership across Africa."
        />
        <link rel="canonical" href="https://santoscreationsorg.lovable.app/women-girls-empowerment" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Project",
          name: "SCEF Women & Girls Empowerment",
          description:
            "Pan-African programme advancing girls education, STEM and digital inclusion, women leadership, menstrual health, safeguarding, mentorship, entrepreneurship, and ESG leadership.",
          url: "https://santoscreationsorg.lovable.app/women-girls-empowerment",
          parentOrganization: {
            "@type": "NGO",
            name: "Santos Creations Educational Foundation",
          },
          areaServed: "Africa",
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px] md:h-[96px]" />

        <main>
          {/* Hero / Overview */}
          <section className="relative overflow-hidden bg-gradient-to-br from-scef-blue-darker via-scef-blue to-scef-blue-darker py-20 md:py-28">
            <div className="absolute inset-0 bg-scef-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center text-white">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-scef-gold/20 text-scef-gold text-xs font-semibold uppercase tracking-wider ring-1 ring-scef-gold/40 mb-5">
                  Continental Pillar
                </span>
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
                  Empowering African Women &amp; Girls Through{" "}
                  <span className="text-scef-gold">Education, Leadership &amp; Opportunity</span>
                </h1>
                <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-3xl mx-auto">
                  Creating safer, smarter, healthier, and more empowered futures
                  for African girls and women through education, leadership,
                  mentorship, digital inclusion, wellbeing, ESG advocacy, and
                  economic opportunity.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-darker font-semibold">
                    <Link to="/wallet/donate?fund=girls-education">
                      Sponsor a Girl Child
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                    <Link to="/partner-with-us">Partner With SCEF</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Pillar sections */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center mb-14">
                <h2 className="font-display text-2xl md:text-4xl font-bold text-scef-blue-darker mb-3">
                  Our Empowerment Pillars
                </h2>
                <p className="text-muted-foreground">
                  Nine integrated workstreams operating across SCEF-aligned
                  schools, local chapters, and partner organisations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SECTIONS.map(({ id, icon: Icon, title, body }) => (
                  <article
                    key={id}
                    id={id}
                    className="rounded-2xl bg-card border border-border p-6 hover:border-scef-gold/50 hover:shadow-lg transition-all duration-300 scroll-mt-28"
                  >
                    <div className="w-12 h-12 rounded-xl bg-scef-gold/10 text-scef-gold-dark flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-scef-blue-darker mb-2">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {body}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Sponsorship Opportunities */}
          <section
            id="sponsorship-opportunities"
            className="py-16 md:py-20 bg-scef-blue/[0.04] scroll-mt-28"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="font-display text-2xl md:text-4xl font-bold text-scef-blue-darker mb-3">
                  Sponsorship Opportunities
                </h2>
                <p className="text-muted-foreground">
                  Direct, designated giving routed through the GFA Wallet for
                  full transparency and reporting.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {SPONSORSHIPS.map((s) => (
                  <Link
                    key={s.label}
                    to={s.to}
                    className="group flex items-center justify-between gap-3 rounded-xl bg-card border border-border p-5 hover:border-scef-gold hover:shadow-md transition-all"
                  >
                    <span className="font-semibold text-scef-blue-darker">
                      {s.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-scef-gold-dark transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section
            id="testimonials"
            className="py-16 md:py-20 scroll-mt-28"
          >
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto text-center mb-10">
                <h2 className="font-display text-2xl md:text-4xl font-bold text-scef-blue-darker mb-3">
                  Testimonials &amp; Stories
                </h2>
                <p className="text-muted-foreground">
                  Reporting in progress. Verified stories from girls, mentors,
                  and women leaders will be published progressively.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {TESTIMONIALS.map((t, i) => (
                  <figure
                    key={i}
                    className="rounded-2xl bg-card border border-border p-6"
                  >
                    <Quote className="w-7 h-7 text-scef-gold mb-3" />
                    <blockquote className="text-sm md:text-base text-foreground/90 leading-relaxed mb-4">
                      "{t.quote}"
                    </blockquote>
                    <figcaption className="text-xs text-muted-foreground">
                      <span className="font-semibold text-scef-blue-darker">
                        {t.name}
                      </span>{" "}
                      — {t.role}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-scef-blue-darker to-scef-blue text-white">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-2xl md:text-4xl font-bold mb-4">
                  An Africa where every girl and woman can{" "}
                  <span className="text-scef-gold">thrive</span>.
                </h2>
                <p className="text-white/85 leading-relaxed mb-8">
                  SCEF is helping build an Africa where every girl and woman can
                  learn, lead, innovate, thrive, participate, influence, and
                  build sustainable futures.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-darker font-semibold">
                    <Link to="/wallet/donate?fund=women-empowerment">
                      Support the Programme
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                    <Link to="/get-involved/volunteer?role=mentor">Become a Mentor</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                    <Link to="/partner-with-us">Partner With SCEF</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default WomenGirlsEmpowerment;

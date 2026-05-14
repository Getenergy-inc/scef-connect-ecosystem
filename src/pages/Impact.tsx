import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Heart,
  Leaf,
  Stethoscope,
  Users,
  Laptop,
  Compass,
  Download,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import heroImage from "@/assets/hero-education.jpg";

const focusAreas = [
  {
    icon: BookOpen,
    title: "Education Access",
    desc: "Removing barriers to quality learning — scholarships, school fees, learning materials, and inclusive enrolment pathways for under-served communities.",
  },
  {
    icon: GraduationCap,
    title: "Teacher Development",
    desc: "Training, mentoring, classroom innovation, and wellbeing for educators across formal, informal, and special needs education environments.",
  },
  {
    icon: Heart,
    title: "Girls & Women Education",
    desc: "Equity, safeguarding, mentorship, and leadership pathways for girls and women across primary, secondary, tertiary, and vocational education.",
  },
  {
    icon: Leaf,
    title: "ESG & Sustainability",
    desc: "Green schools, climate literacy, sustainability programs, and social impact initiatives aligned with SDG 4 and AU Agenda 2063.",
  },
  {
    icon: Stethoscope,
    title: "Health Education Advocacy",
    desc: "Schools as safe, healthy, and inclusive learning spaces — WASH, nutrition, mental health awareness, and reproductive health education.",
  },
  {
    icon: Users,
    title: "Local Chapter Development",
    desc: "Community-led education, advocacy, and development action across SCEF's growing network of African and diaspora chapters.",
  },
  {
    icon: Laptop,
    title: "Digital Learning",
    desc: "Education Online Africa, eLibrary Africa, and technology-enabled classrooms expanding access to certified courses, books, and research.",
  },
  {
    icon: Compass,
    title: "Youth Career Pathways",
    desc: "My Career, My Life, TVET, employability, entrepreneurship, and mentorship tracks preparing African youth for the future of work.",
  },
];

const ctas = [
  { label: "View Full Impact", to: "/reports", primary: true },
  { label: "Support Our Impact", to: "/support-us" },
  { label: "Partner With SCEF", to: "/partner-with-us" },
  { label: "Download Impact Brief", to: "/resources/organizational-profile", icon: Download },
];

const Impact = () => {
  return (
    <>
      <Helmet>
        <title>Our Impact — Eight Focus Areas Driving Africa's Education Future | SCEF</title>
        <meta
          name="description"
          content="Explore SCEF's impact across education access, teacher development, girls and women education, ESG, health education, digital learning, local chapters, and youth career pathways."
        />
        <link rel="canonical" href="https://santoscreations.org/impact" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-scef-blue-darker via-scef-blue to-scef-blue-dark text-white py-20 md:py-28 overflow-hidden">
            <img
              src={heroImage}
              alt="African students learning in a community classroom"
              className="absolute inset-0 h-full w-full object-cover opacity-20"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-scef-blue-darker/90 via-scef-blue/80 to-scef-blue-dark/90" />
            <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-scef-gold text-xs font-semibold uppercase tracking-widest mb-6">
                Our Impact
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                Impact That Moves{" "}
                <span className="text-scef-gold">Communities Forward</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Eight focus areas driving Africa's education future — from education access and
                teacher development to digital learning, local chapter action, and youth career
                pathways across the continent.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {ctas.map((c) => {
                  const Icon = c.icon;
                  return (
                    <Link
                      key={c.label}
                      to={c.to}
                      className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                        c.primary
                          ? "bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover"
                          : "border-2 border-scef-gold/50 text-white hover:bg-scef-gold/10"
                      }`}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                      {c.label}
                      {!Icon && <ArrowRight className="h-4 w-4" />}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Focus areas */}
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-12 max-w-3xl mx-auto">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                  Impact Snapshot
                </p>
                <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-scef-blue-darker">
                  Eight focus areas, one continental mission
                </h2>
                <p className="mt-4 text-muted-foreground">
                  SCEF advances measurable, qualitative impact through education access, teacher
                  development, equity, sustainability, health, community action, digital learning,
                  and youth career pathways.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {focusAreas.map(({ icon: Icon, title, desc }) => (
                  <article
                    key={title}
                    className="flex flex-col rounded-2xl border-2 border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-lg"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight text-scef-blue-darker">
                      {title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-scef-blue-darker text-white">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Help us scale impact across <span className="text-scef-gold">Africa</span>
              </h2>
              <p className="text-white/80 mt-4">
                Your support strengthens schools, teachers, learners, communities, and the
                continental movement for education excellence.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  to="/support-us"
                  className="inline-flex items-center gap-2 rounded-lg bg-scef-gold text-scef-blue-darker px-5 py-3 text-sm font-semibold hover:bg-scef-gold-hover"
                >
                  Support Our Impact <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/partner-with-us"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-scef-gold/50 text-white px-5 py-3 text-sm font-semibold hover:bg-scef-gold/10"
                >
                  Partner With SCEF
                </Link>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 text-white px-5 py-3 text-sm font-semibold hover:bg-white/10"
                >
                  Explore Programs
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Impact;

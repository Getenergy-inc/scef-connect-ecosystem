import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  GraduationCap,
  Mic,
  School,
  Users,
  Video,
  Megaphone,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import careerImg from "@/assets/hero-classroom.jpg";

const roles = [
  { Icon: Briefcase, label: "Career mentor" },
  { Icon: Mic, label: "Webinar host or moderator" },
  { Icon: School, label: "School outreach volunteer" },
  { Icon: Users, label: "Youth mentor" },
  { Icon: Video, label: "Content & media volunteer" },
  { Icon: Sparkles, label: "Project coordinator" },
  { Icon: Megaphone, label: "Local chapter support volunteer" },
  { Icon: GraduationCap, label: "Speaker or trainer" },
];

const benefits = [
  "Gain practical project experience",
  "Build leadership and communication skills",
  "Support young people with career direction",
  "Receive recognition for service",
  "Grow your professional and social-impact network",
  "Contribute to education transformation in your community",
];

export default function VolunteerMyCareerMyLife() {
  return (
    <>
      <Helmet>
        <title>Volunteer for My Career, My Life | SCEF</title>
        <meta
          name="description"
          content="Volunteer on the SCEF My Career, My Life project — mentor young people, host webinars, support school outreach and student guidance across Africa."
        />
        <link rel="canonical" href="/volunteer/my-career-my-life" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px]" />

        <main>
          {/* Hero */}
          <section className="relative border-b border-border bg-scef-blue-darker">
            <div className="absolute inset-0">
              <img
                src={careerImg}
                alt="Young people in a career mentorship session"
                className="h-full w-full object-cover opacity-30"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker via-scef-blue-darker/85 to-scef-blue-darker/40" />
            </div>
            <div className="relative container mx-auto max-w-6xl px-6 md:px-8 py-20 md:py-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">
                Featured Project · Volunteer Opportunity
              </p>
              <h1 className="mt-3 font-display text-white text-[clamp(2rem,4.6vw,3.1rem)] font-bold leading-[1.1] tracking-tight max-w-3xl">
                Volunteer Your Skills for a Project That Changes Lives
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-white/85">
                My Career, My Life helps young people understand career options,
                build confidence, connect with mentors, and prepare for future
                opportunities — and we need volunteers to make it happen.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/volunteer?project=my-career-my-life"
                  className="inline-flex items-center gap-1.5 rounded-md bg-scef-gold px-5 py-2.5 text-[13px] font-semibold text-scef-blue-darker hover:bg-scef-gold/90"
                >
                  Volunteer for My Career, My Life
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/programs/my-career-my-life"
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/40 bg-white/10 px-5 py-2.5 text-[13px] font-semibold text-white backdrop-blur hover:bg-white/15"
                >
                  About the program
                </Link>
              </div>
            </div>
          </section>

          {/* About the project */}
          <section className="bg-white border-b border-border">
            <div className="container mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-20 grid gap-10 md:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                  The Project
                </p>
                <h2 className="mt-3 font-display text-2xl md:text-[28px] font-bold tracking-tight text-scef-blue-darker">
                  My Career, My Life
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  Across SCEF local chapters, My Career, My Life runs career
                  talks, mentorship sessions, school visits, webinars, student
                  guidance clinics, and community outreach. Volunteers support
                  delivery on the ground and online.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                  Whether you have one hour a month or one day a week, there is
                  a role that fits your skills, location, and availability.
                </p>
              </div>

              <aside className="rounded-xl border border-border bg-muted/40 p-6">
                <h3 className="font-display text-[15px] font-bold uppercase tracking-wider text-scef-blue-darker">
                  Benefits for volunteers
                </h3>
                <ul className="mt-4 space-y-2">
                  {benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-[13.5px] text-foreground/85"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          {/* Volunteer roles */}
          <section className="bg-muted/40 border-b border-border">
            <div className="container mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Open Volunteer Roles
              </p>
              <h2 className="mt-3 font-display text-2xl md:text-[28px] font-bold tracking-tight text-scef-blue-darker max-w-2xl">
                Choose a role that fits your skills
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {roles.map((r) => (
                  <div
                    key={r.label}
                    className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-sm"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-scef-blue-darker/5 text-scef-blue-darker ring-1 ring-scef-blue-darker/10">
                      <r.Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[14px] font-semibold leading-snug text-scef-blue-darker">
                      {r.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Link
                  to="/volunteer?project=my-career-my-life"
                  className="inline-flex items-center gap-1.5 rounded-md bg-scef-blue-darker px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-scef-blue-darker/90"
                >
                  Volunteer for My Career, My Life
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/local-chapters"
                  className="inline-flex items-center gap-1.5 rounded-md border border-scef-gold px-5 py-2.5 text-[13px] font-semibold text-scef-blue-darker hover:bg-scef-gold/10"
                >
                  Find a local chapter
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

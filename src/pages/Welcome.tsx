import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Globe2, Users, ShieldCheck, ArrowRight } from "lucide-react";
import scefLogo from "@/assets/scef-logo.png";

/**
 * Welcome cover gate — three entry points: Visitor, Member, Staff.
 * Brand palette: deep green #0B5D3B, gold #D4AF37, black #0A0A0A, white.
 */

const paths = [
  {
    icon: Globe2,
    title: "Visitor",
    blurb:
      "Explore SCEF programs, campaigns, scholarships and how to support education across Africa.",
    cta: "Enter Public Site",
    href: "/home",
    accent: "from-[#0B5D3B] to-[#0E7549]",
  },
  {
    icon: Users,
    title: "Member",
    blurb:
      "Sign in to your member portal — manage donations, votes, AGC wallet, chapter activity and applications.",
    cta: "Go to Member Portal",
    href: "/dashboard",
    accent: "from-[#D4AF37] to-[#B8961F]",
  },
  {
    icon: ShieldCheck,
    title: "Staff",
    blurb:
      "Secure access for SCEF staff, chapter administrators and division leads. Login required.",
    cta: "Staff Login",
    href: "/staff",
    accent: "from-[#0A0A0A] to-[#2a2a2a]",
  },
];

const Welcome = () => {
  return (
    <>
      <Helmet>
        <title>Welcome — Santos Creations Educational Foundation</title>
        <meta
          name="description"
          content="Choose how you want to enter the SCEF ecosystem: Visitor, Member, or Staff."
        />
        <link rel="canonical" href="https://santoscreations.org/welcome" />
      </Helmet>

      <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">
        {/* Ambient brand wash */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(150_75%_20%/0.55),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(45_65%_45%/0.18),transparent_55%)]" />

        <main className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-10 md:px-10 md:py-14">
          {/* Header */}
          <header className="flex items-center justify-between">
            <Link to="/welcome" className="flex items-center gap-3">
              <img
                src={scefLogo}
                alt="Santos Creations Educational Foundation"
                className="h-10 w-auto md:h-12"
              />
              <span className="hidden font-display text-sm font-semibold tracking-tight text-white/90 sm:inline">
                Santos Creations Educational Foundation
              </span>
            </Link>
            <Link
              to="/home"
              className="text-xs font-medium text-white/70 transition-colors hover:text-[#D4AF37]"
            >
              Skip to public site →
            </Link>
          </header>

          {/* Hero */}
          <section className="mx-auto mt-10 max-w-3xl text-center md:mt-16">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-[#D4AF37] backdrop-blur-sm">
              Welcome
            </p>
            <h1 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight md:text-5xl">
              How would you like to{" "}
              <span className="text-[#D4AF37]">enter SCEF?</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/75 md:text-base">
              Choose your entry point. You can switch at any time.
            </p>
          </section>

          {/* Cards */}
          <section className="mt-10 grid flex-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
            {paths.map(({ icon: Icon, title, blurb, cta, href, accent }) => (
              <Link
                key={title}
                to={href}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37]/50 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-[#D4AF37]/10 md:p-8"
              >
                <div
                  className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg ring-1 ring-white/10`}
                >
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>

                <h2 className="font-display text-2xl font-bold tracking-tight text-white">
                  {title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">
                  {blurb}
                </p>

                <span className="mt-6 inline-flex items-center justify-between rounded-lg bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0A0A0A] transition-all group-hover:bg-[#E5C24A]">
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </section>

          {/* Footer note */}
          <footer className="mt-12 text-center text-[11px] uppercase tracking-[0.2em] text-white/45 md:mt-16">
            Pan-African Education Foundation · Since 1997
          </footer>
        </main>
      </div>
    </>
  );
};

export default Welcome;

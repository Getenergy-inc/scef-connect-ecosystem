import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, School, Laptop, HeartHandshake, Users, ShieldCheck, Eye, MapPin, BarChart3 } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const principles = [
  { icon: ShieldCheck, label: "Transparently managed" },
  { icon: MapPin, label: "Locally implemented through chapters" },
  { icon: BarChart3, label: "Aligned with measurable outcomes" },
  { icon: Eye, label: "Reported with accountability" },
];

const managed = [
  { icon: GraduationCap, label: "Scholarships & education aid" },
  { icon: School, label: "School infrastructure projects" },
  { icon: Laptop, label: "Digital learning access" },
  { icon: HeartHandshake, label: "Inclusive education programs" },
  { icon: Users, label: "Community-based initiatives" },
];

/**
 * CSR & Education Fund Management — institutional positioning band.
 * Communicates SCEF's role as a CSR fund management services NGO.
 */
export const CSRFundManagement = () => {
  const { t } = useLocale();
  return (
    <section className="relative overflow-hidden bg-card py-20 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-scef-pattern opacity-[0.03]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            {t("home.csr.eyebrow") || "CSR & Education Fund Management"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            {t("home.csr.title") || "Managing Education Impact with Accountability"}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("home.csr.body") ||
              "SCEF partners with organizations, institutions, and donors to design, manage, and deliver education-focused CSR and impact funding across African regions."}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2 md:gap-8">
          {/* Funding Principles */}
          <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
            <h3 className="font-display text-base font-bold uppercase tracking-wider text-scef-blue-darker">
              {t("home.csr.principlesTitle") || "How We Manage Funding"}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {principles.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground md:text-[15px]">
                    {t(`home.csr.principles.${label}`) || label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* What We Manage */}
          <div className="rounded-2xl border border-border bg-background p-6 md:p-8">
            <h3 className="font-display text-base font-bold uppercase tracking-wider text-scef-blue-darker">
              {t("home.csr.managedTitle") || "What We Manage"}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {managed.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-scef-blue/10 text-scef-blue ring-1 ring-scef-blue/20">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <span className="text-sm leading-relaxed text-foreground md:text-[15px]">
                    {t(`home.csr.managed.${label}`) || label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/partner-with-us"
            className="inline-flex items-center gap-2 rounded-md bg-scef-blue-darker px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-scef-blue"
          >
            {t("home.csr.ctaPartner") || "Partner With Us"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-scef-blue-darker transition-colors hover:border-scef-gold hover:text-scef-gold-dark"
          >
            {t("home.csr.ctaFund") || "Fund a Project"}
          </Link>
        </div>
      </div>
    </section>
  );
};

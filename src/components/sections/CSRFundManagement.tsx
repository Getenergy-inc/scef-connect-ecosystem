import { Link } from "react-router-dom";
import {
  ArrowRight,
  Coins,
  Rocket,
  Wallet,
  BarChart3,
  Megaphone,
  Building2,
  Accessibility,
  GraduationCap,
  Wrench,
  Monitor,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const steps = [
  { slug: "fund-allocation", icon: Coins, title: "Fund Allocation", blurb: "CSR partners commit to scholarships, infrastructure, special needs, vocational or digital learning." },
  { slug: "project-deployment", icon: Rocket, title: "Project Deployment", blurb: "Funds deployed via EduAid-Africa programs and Rebuild My School Africa." },
  { slug: "wallet-management", icon: Wallet, title: "Wallet Management", blurb: "GFA Wallet & AGC enable escrow, staged disbursement and real-time tracking." },
  { slug: "monitoring", icon: BarChart3, title: "Monitoring & Reporting", blurb: "RBM, ESG and SDG 4-aligned dashboards with project-level financials." },
  { slug: "public-engagement", icon: Megaphone, title: "Public Engagement", blurb: "Visibility via NESA TV, It's In Me Radio and AGC-powered voting campaigns." },
];

const interventions = [
  { icon: Building2, label: "School Infrastructure" },
  { icon: Accessibility, label: "Special Needs Education" },
  { icon: GraduationCap, label: "Scholarships & Grants" },
  { icon: Wrench, label: "Vocational & Skills" },
  { icon: Monitor, label: "Digital Education" },
];

/**
 * CSR & Education Fund Management — institutional positioning band.
 * Includes 5-step process flow + 5 intervention icons linking to /csr-fund-management.
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
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("home.csr.body") ||
              "SCEF partners with organizations, institutions and donors to design, manage and deliver education-focused CSR funds — transparently routed through EduAid-Africa and the GFA Wallet."}
          </p>
        </div>

        {/* 5-step process flow */}
        <div className="mx-auto mt-14 max-w-7xl">
          <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {/* connector line (desktop) */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-transparent via-scef-gold/40 to-transparent lg:block"
            />
            {steps.map(({ slug, icon: Icon, title, blurb }, idx) => (
              <Link
                key={title}
                to={`/csr-fund-management#${slug}`}
                className="group relative flex flex-col items-center rounded-xl p-3 text-center transition-colors hover:bg-background"
              >
                <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-scef-blue-darker text-scef-gold ring-4 ring-card shadow-md transition-transform group-hover:scale-105">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-scef-gold text-[10px] font-bold text-scef-blue-darker">
                    {idx + 1}
                  </span>
                </div>
                <h3 className="font-display text-sm font-bold leading-tight text-scef-blue-darker group-hover:text-scef-gold-dark md:text-[15px]">
                  {title}
                </h3>
                <p className="mt-2 max-w-[14rem] text-xs leading-relaxed text-muted-foreground">
                  {blurb}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Intervention areas */}
        <div className="mx-auto mt-16 max-w-5xl">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Key intervention areas
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {interventions.map(({ icon: Icon, label }) => (
              <Link
                key={label}
                to="/csr-fund-management"
                className="group flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-4 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-scef-gold/40 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="text-xs font-semibold leading-tight text-scef-blue-darker">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm italic leading-relaxed text-muted-foreground md:text-base">
          {t("home.csr.tagline") ||
            "Ensuring every investment in education delivers real, measurable outcomes."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/csr-fund-management"
            className="inline-flex items-center gap-2 rounded-md bg-scef-blue-darker px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-scef-blue"
          >
            {t("home.csr.ctaLearn") || "Learn How It Works"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/partner-with-us"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-semibold text-scef-blue-darker transition-colors hover:border-scef-gold hover:text-scef-gold-dark"
          >
            {t("home.csr.ctaPartner") || "Partner With Us"}
          </Link>
        </div>
      </div>
    </section>
  );
};

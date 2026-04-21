import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, MapPin, BarChart3, BookOpen, FileCheck } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const cards = [
  {
    icon: ShieldCheck,
    title: "Transparent Fund Management",
    blurb: "Clear governance from contribution to disbursement.",
  },
  {
    icon: MapPin,
    title: "Local Chapter Implementation",
    blurb: "Programs delivered on the ground where they matter.",
  },
  {
    icon: BarChart3,
    title: "Measurable Impact Tracking",
    blurb: "Outcomes monitored against agreed indicators.",
  },
  {
    icon: BookOpen,
    title: "Education Program Delivery",
    blurb: "Scholarships, infrastructure, and inclusive access.",
  },
  {
    icon: FileCheck,
    title: "Partner Reporting & Accountability",
    blurb: "Structured reporting for donors and sponsors.",
  },
];

/**
 * CSR & Education Fund Management — institutional positioning band.
 * 5-icon grid, minimal text, premium card layout.
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
              "SCEF partners with organizations, institutions, and donors to design, manage, and deliver education-focused CSR and impact funding across African regions."}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-5">
          {cards.map(({ icon: Icon, title, blurb }) => (
            <div
              key={title}
              className="group flex flex-col items-center rounded-xl border border-border bg-background p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30 transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-sm font-bold leading-tight text-scef-blue-darker md:text-[15px]">
                {t(`home.csr.cards.${title}.title`) || title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {t(`home.csr.cards.${title}.blurb`) || blurb}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm italic leading-relaxed text-muted-foreground md:text-base">
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

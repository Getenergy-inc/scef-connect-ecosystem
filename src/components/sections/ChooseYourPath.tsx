import { Link } from "react-router-dom";
import { Users, MapPin, UserPlus, Handshake, Heart, ArrowRight } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const paths = [
  {
    icon: Users,
    title: "Become a Member",
    blurb: "Join a global network shaping education.",
    cta: "Join Now",
    href: "/get-involved/membership",
    iconColor: "text-[hsl(145_63%_35%)]",
    iconBg: "bg-[hsl(145_63%_35%)]/12",
    btn: "bg-[hsl(145_63%_35%)] hover:bg-[hsl(145_63%_30%)]",
  },
  {
    icon: MapPin,
    title: "Join a Local Chapter",
    blurb: "Drive impact in your community.",
    cta: "Find a Chapter",
    href: "/local-chapters",
    iconColor: "text-scef-blue",
    iconBg: "bg-scef-blue/12",
    btn: "bg-scef-blue hover:bg-scef-blue-dark",
  },
  {
    icon: UserPlus,
    title: "Become an Ambassador",
    blurb: "Lead advocacy and represent SCEF.",
    cta: "Apply Now",
    href: "/get-involved/ambassador",
    iconColor: "text-[hsl(265_60%_50%)]",
    iconBg: "bg-[hsl(265_60%_50%)]/12",
    btn: "bg-[hsl(265_60%_50%)] hover:bg-[hsl(265_60%_42%)]",
  },
  {
    icon: Handshake,
    title: "Partner or Sponsor",
    blurb: "Collaborate to scale education impact.",
    cta: "Partner With Us",
    href: "/partner-with-us",
    iconColor: "text-[hsl(22_88%_52%)]",
    iconBg: "bg-[hsl(22_88%_52%)]/12",
    btn: "bg-[hsl(22_88%_52%)] hover:bg-[hsl(22_88%_44%)]",
  },
  {
    icon: Heart,
    title: "Donate",
    blurb: "Support access to education across regions.",
    cta: "Donate Now",
    href: "/donate",
    iconColor: "text-[hsl(340_75%_50%)]",
    iconBg: "bg-[hsl(340_75%_50%)]/12",
    btn: "bg-[hsl(340_75%_50%)] hover:bg-[hsl(340_75%_42%)]",
  },
];

export const ChooseYourPath = () => {
  const { t } = useLocale();
  return (
    <section className="bg-card py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mb-12 text-center md:mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(145_63%_35%)]">
            {t("home.paths.eyebrow") || "Get Involved"}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            {t("home.paths.title") || "Choose Your Path to Impact"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            {t("home.paths.intro") || "Five clear pathways. Pick the one that fits how you want to contribute."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {paths.map(({ icon: Icon, title, blurb, cta, href, iconColor, iconBg, btn }, idx) => {
            const isPrimary = idx === 0;
            return (
              <div
                key={title}
                className={`group relative flex flex-col items-center rounded-xl border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isPrimary
                    ? "border-scef-gold/60 shadow-md ring-1 ring-scef-gold/30 lg:scale-[1.03]"
                    : "border-border"
                }`}
              >
                {isPrimary && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-scef-gold px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-scef-blue-darker shadow">
                    {t("home.paths.recommended") || "Recommended"}
                  </span>
                )}
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full ${iconBg} ${iconColor}`}>
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="font-display text-base font-bold leading-tight text-scef-blue-darker md:text-lg">
                  {t(`home.paths.cards.${title}.title`) || title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`home.paths.cards.${title}.blurb`) || blurb}
                </p>
                <Link
                  to={href}
                  className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md ${btn} px-4 py-2.5 text-sm font-semibold text-white transition-colors`}
                >
                  {t(`home.paths.cards.${title}.cta`) || cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

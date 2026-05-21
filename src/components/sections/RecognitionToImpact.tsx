import { Link } from "react-router-dom";
import { ArrowRight, Award, Eye, HandCoins, Sparkles } from "lucide-react";

/**
 * Core Story — Recognition → Visibility → Support → Impact
 * Anchors SCEF's signature model and routes visitors to NESA-Africa
 * and EduAid-Africa.
 */
const steps = [
  {
    Icon: Award,
    title: "Recognition",
    text: "NESA-Africa celebrates educators, schools, leaders, and organizations shaping the future of African education.",
  },
  {
    Icon: Eye,
    title: "Visibility",
    text: "Recognition creates a platform — credible visibility that attracts allies, funders, partners, and policy attention.",
  },
  {
    Icon: HandCoins,
    title: "Support",
    text: "Visibility unlocks sponsorship, donations, partnerships, and CSR support for education priorities across Africa.",
  },
  {
    Icon: Sparkles,
    title: "Impact",
    text: "EduAid-Africa converts that support into scholarships, school aid, teacher training, digital access, and sustainable learning.",
  },
];

export const RecognitionToImpact = () => {
  return (
    <section className="bg-white border-y border-border">
      <div className="container mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Our Core Story
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
            From Recognition to Real Education Impact
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            SCEF uses a simple but powerful model: recognition creates visibility,
            visibility attracts support, and support drives education impact across
            Africa.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-xl border border-border bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-scef-blue-darker/5 text-scef-blue-darker ring-1 ring-scef-blue-darker/10">
                  <s.Icon className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[17px] font-bold leading-tight text-scef-blue-darker">
                {s.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/programs/nesa-africa"
            className="inline-flex items-center gap-1.5 rounded-md bg-scef-blue-darker px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-scef-blue-darker/90"
          >
            Explore NESA-Africa
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/programs/eduaid-africa"
            className="inline-flex items-center gap-1.5 rounded-md border border-scef-gold px-5 py-2.5 text-[13px] font-semibold text-scef-blue-darker hover:bg-scef-gold/10"
          >
            Explore EduAid-Africa
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            to="/about"
            className="ml-1 text-[13px] font-semibold text-primary hover:underline"
          >
            Learn about SCEF →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecognitionToImpact;

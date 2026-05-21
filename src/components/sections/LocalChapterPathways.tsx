import { Link } from "react-router-dom";
import { ArrowRight, Check, MapPin, Megaphone, Users2 } from "lucide-react";

type Card = {
  Icon: typeof Users2;
  tag: string;
  title: string;
  text: string;
  benefits: string[];
  cta: string;
  href: string;
  accent: "navy" | "gold" | "green";
};

const cards: Card[] = [
  {
    Icon: Users2,
    tag: "Member",
    title: "Become a Local Chapter Member",
    text:
      "Join your local chapter and participate in education advocacy, school support, webinars, campaigns, and community projects.",
    benefits: [
      "Join a recognised education-impact network",
      "Participate in local chapter activities",
      "Access webinars and training",
      "Support school and community projects",
      "Grow your education-impact network",
    ],
    cta: "Become a Member",
    href: "/membership",
    accent: "navy",
  },
  {
    Icon: Megaphone,
    tag: "Ambassador",
    title: "Apply as a Local Chapter Ambassador",
    text:
      "Represent SCEF in your country or community and help mobilise members, volunteers, schools, partners, and sponsors.",
    benefits: [
      "Represent SCEF locally",
      "Lead awareness campaigns",
      "Support events and education advocacy",
      "Build leadership and project experience",
      "Receive recognition for your service",
    ],
    cta: "Apply as Ambassador",
    href: "/ambassador",
    accent: "gold",
  },
  {
    Icon: MapPin,
    tag: "Volunteer",
    title: "Volunteer for a Project",
    text:
      "Volunteer on active SCEF projects such as My Career, My Life, Rebuild My School Africa, Send a Child to School, and Women & Girls Empowerment.",
    benefits: [
      "Gain practical project experience",
      "Mentor and support young people",
      "Join school outreach and webinars",
      "Build leadership and communication skills",
      "Contribute to real education impact",
    ],
    cta: "Volunteer for a Project",
    href: "/volunteer",
    accent: "green",
  },
];

const accentMap = {
  navy: {
    bar: "bg-scef-blue-darker",
    tag: "bg-scef-blue-darker/10 text-scef-blue-darker",
    cta: "bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90",
  },
  gold: {
    bar: "bg-scef-gold",
    tag: "bg-scef-gold/15 text-scef-blue-darker",
    cta: "bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90",
  },
  green: {
    bar: "bg-[#1F892B]",
    tag: "bg-[#1F892B]/15 text-[#1F892B]",
    cta: "bg-[#1F892B] text-white hover:bg-[#1F892B]/90",
  },
} as const;

export const LocalChapterPathways = () => {
  return (
    <section className="bg-white border-y border-border">
      <div className="container mx-auto max-w-6xl px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Local Chapter Pathways
          </p>
          <h2 className="mt-3 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
            Join SCEF Through Your Local Chapter
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            SCEF local chapters connect members, ambassadors, volunteers,
            schools, sponsors, and community leaders to real education-impact
            projects across Africa and the diaspora. Choose the pathway that
            fits you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((c) => {
            const a = accentMap[c.accent];
            return (
              <article
                key={c.href}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className={`h-1 w-full ${a.bar}`} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-scef-blue-darker/5 text-scef-blue-darker ring-1 ring-scef-blue-darker/10">
                      <c.Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${a.tag}`}
                    >
                      {c.tag}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-[18px] font-bold leading-tight text-scef-blue-darker">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">
                    {c.text}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {c.benefits.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-[12.5px] text-foreground/80"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex-1" />
                  <Link
                    to={c.href}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2.5 text-[13px] font-semibold transition ${a.cta}`}
                  >
                    {c.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
          <Link to="/chapters/signup" className="inline-flex items-center rounded-md bg-scef-blue-darker px-4 py-2 font-semibold text-white hover:bg-scef-blue-darker/90">
            Sign up for a local chapter →
          </Link>
          <Link to="/local-chapters" className="font-semibold text-primary hover:underline">
            Browse local chapters →
          </Link>
          <Link to="/chapters/start" className="font-semibold text-primary hover:underline">
            Start a chapter in your country →
          </Link>
          <Link
            to="/volunteer/my-career-my-life"
            className="font-semibold text-primary hover:underline"
          >
            Featured project: My Career, My Life →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LocalChapterPathways;

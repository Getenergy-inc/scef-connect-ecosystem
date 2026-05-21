import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users } from "lucide-react";
import webinarWomenGirls from "@/assets/eduaid-webinar-women-girls.jpg";
import webinarInequality from "@/assets/eduaid-webinar-inequality-gap.jpg";
import webinarFinancing from "@/assets/eduaid-webinar-financing-education.jpg";

const webinars = [
  {
    image: webinarWomenGirls,
    topic: "Women and Girls in Education",
    subtitle: "Removing Barriers",
    date: "28 Oct 2025",
    speakers: "Dr. Martha R.L. Muhwezi · Amarachi Crystal Omereife · Onayi Amina Lawal",
    tag: "Gender Equity",
  },
  {
    image: webinarInequality,
    topic: "Bridging the Education Inequality Gap in Nigeria",
    subtitle: "Policy · Access · Equity",
    date: "14 Oct 2025",
    speakers: "Adeyinka Akinyede-Ashaolu · Bosede Ogidan",
    tag: "Access & Equity",
  },
  {
    image: webinarFinancing,
    topic: "Financing Education: Public & Private Roles",
    subtitle: "Sustainable Funding Models",
    date: "25 Nov 2025",
    speakers: "Gabriel Olufunmi · Tumi Tiyamiyu · Comfort Shaibu",
    tag: "Education Finance",
  },
];

/**
 * EduAid-Africa Monthly Webinar Showcase
 * Uses the official EduAid-Africa webinar flyer assets as the primary visual.
 * Styled to echo the navy/green/gold institutional flyer aesthetic.
 */
export default function EduAidWebinarShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] py-16 md:py-24">
      {/* Geometric accent shapes echoing the flyer language */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-16 right-[8%] h-40 w-20 rounded-full bg-scef-gold/70" />
        <div className="absolute top-24 right-[18%] h-28 w-16 rounded-full bg-[#1F892B]/80" />
        <div className="absolute bottom-10 left-[6%] h-24 w-14 rounded-full bg-scef-gold/50" />
        <div className="absolute bottom-32 left-[14%] h-16 w-16 rounded-full bg-[#1F892B]/60" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1F892B]/50 bg-[#1F892B]/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#4ADE80]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ADE80]" />
            EduAid-Africa Webinar Series
          </div>
          <h2 className="font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Monthly Conversations Shaping{" "}
            <span className="text-[#4ADE80]">African Education</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            Live monthly sessions convening policymakers, educators, funders and
            advocates around the most urgent education questions on the continent.
          </p>
        </div>

        {/* Flyer grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {webinars.map((w) => (
            <article
              key={w.topic}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.4)]"
            >
              {/* Official flyer */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0A1628]">
                <img
                  src={w.image}
                  alt={`EduAid-Africa Webinar — ${w.topic}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent opacity-60" />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-scef-gold/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0A1628]">
                  {w.tag}
                </div>
              </div>

              {/* Metadata */}
              <div className="border-t border-white/10 p-5">
                <h3 className="mb-1 text-base font-bold leading-snug text-white">
                  {w.topic}
                </h3>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#4ADE80]">
                  {w.subtitle}
                </p>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-start gap-2">
                    <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold" />
                    <span>{w.date}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold" />
                    <span className="leading-relaxed">{w.speakers}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/media/webinars"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1F892B] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1F892B]/30 transition-all hover:bg-[#1F892B]/90 hover:shadow-xl"
          >
            Register for the Next Webinar
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/media/webinars"
            className="inline-flex items-center gap-2 rounded-xl border border-scef-gold/60 px-6 py-3 text-sm font-semibold text-scef-gold transition-all hover:bg-scef-gold/10"
          >
            Browse Webinar Archive
          </Link>
        </div>
      </div>
    </section>
  );
}

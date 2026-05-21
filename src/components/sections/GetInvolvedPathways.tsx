import { Link } from "react-router-dom";
import {
  ArrowRight, Users, HeartHandshake, GraduationCap, HandCoins, Award,
  Plane, Hammer, MapPin, Globe2, Sparkles, Handshake, Info,
} from "lucide-react";

type Pathway = {
  title: string;
  text: string;
  cta: string;
  href: string;
  Icon: typeof Users;
  group: "Join" | "Support" | "Apply" | "Connect" | "Learn";
};

const pathways: Pathway[] = [
  {
    group: "Join",
    title: "Become a Member",
    text: "Join SCEF's growing network of education advocates, professionals, diaspora supporters, and community leaders.",
    cta: "Become a Member",
    href: "/membership",
    Icon: Users,
  },
  {
    group: "Join",
    title: "Volunteer With SCEF",
    text: "Support campaigns, webinars, school visits, local chapters, media outreach, and education-impact projects.",
    cta: "Volunteer With Us",
    href: "/volunteer",
    Icon: HeartHandshake,
  },
  {
    group: "Join",
    title: "Apply for Internship",
    text: "Gain hands-on experience in nonprofit operations, education programs, media, research, partnerships, and community development.",
    cta: "Apply for Internship",
    href: "/internship",
    Icon: GraduationCap,
  },
  {
    group: "Support",
    title: "Donate to Education Impact",
    text: "Support scholarships, school materials, teacher development, digital learning, and community education projects.",
    cta: "Donate Now",
    href: "/donate",
    Icon: HandCoins,
  },
  {
    group: "Support",
    title: "Sponsor a Program",
    text: "Partner with SCEF to sponsor awards, school transformation, webinars, scholarships, or regional education projects.",
    cta: "Sponsor a Program",
    href: "/sponsorship",
    Icon: Award,
  },
  {
    group: "Apply",
    title: "Apply for EduTourism",
    text: "Join education-focused travel, school visits, cultural exchange, learning missions, and impact experiences across Africa.",
    cta: "Apply for EduTourism",
    href: "/edutourism",
    Icon: Plane,
  },
  {
    group: "Apply",
    title: "Join a Project",
    text: "Take part in active SCEF projects supporting schools, students, teachers, women and girls, and local communities.",
    cta: "Join a Project",
    href: "/projects",
    Icon: Hammer,
  },
  {
    group: "Connect",
    title: "Join or Start a Local Chapter",
    text: "Represent SCEF in your community, city, school, region, or country through local education advocacy and action.",
    cta: "Join a Local Chapter",
    href: "/local-chapters",
    Icon: MapPin,
  },
  {
    group: "Connect",
    title: "Regional Coverage",
    text: "Explore SCEF's regional education-impact focus across Africa and opportunities for regional leadership.",
    cta: "View Regional Coverage",
    href: "/regional-coverage",
    Icon: Globe2,
  },
  {
    group: "Connect",
    title: "Diaspora Africa Network",
    text: "Connect African diaspora supporters with education-impact opportunities, partnerships, funding, mentorship, and projects.",
    cta: "Join Diaspora Africa",
    href: "/diaspora-africa",
    Icon: Sparkles,
  },
  {
    group: "Connect",
    title: "Friends of Africa Partnerships",
    text: "Partner with SCEF as a global friend of African education through sponsorship, advocacy, technical support, or institutional collaboration.",
    cta: "Become a Partner",
    href: "/friends-of-africa",
    Icon: Handshake,
  },
  {
    group: "Learn",
    title: "About SCEF",
    text: "Learn about SCEF's mission, leadership, governance, programs, and recognition-to-impact model.",
    cta: "About SCEF",
    href: "/about",
    Icon: Info,
  },
];

const groupAccent: Record<Pathway["group"], string> = {
  Join: "bg-emerald-50 text-emerald-800",
  Support: "bg-amber-50 text-amber-800",
  Apply: "bg-sky-50 text-sky-800",
  Connect: "bg-violet-50 text-violet-800",
  Learn: "bg-slate-100 text-slate-700",
};

export const GetInvolvedPathways = () => {
  return (
    <section className="bg-muted/40 border-y border-border">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Visitor Pathways
          </p>
          <h2 className="mt-2 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
            How Would You Like to Get Involved?
          </h2>
          <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
            Choose the path that fits you — whether you want to join, support, apply,
            or partner with SCEF. Every pathway leads to real education impact across Africa.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pathways.map((p) => (
            <Link
              key={p.href}
              to={p.href}
              className="group flex h-full flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-scef-blue-darker/5 text-scef-blue-darker ring-1 ring-scef-blue-darker/10">
                  <p.Icon className="h-5 w-5" />
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${groupAccent[p.group]}`}
                >
                  {p.group}
                </span>
              </div>
              <h3 className="mt-4 font-display text-[15.5px] font-bold leading-tight text-scef-blue-darker">
                {p.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground line-clamp-4 flex-1">
                {p.text}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-primary group-hover:gap-2 transition-all">
                {p.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedPathways;

import { Link } from "react-router-dom";
import {
  GraduationCap, Award, Laptop, Library, Compass, School, Heart, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: GraduationCap,
    title: "EduAid-Africa",
    blurb: "Scholarships, CSR funding and integrated school support across the continent.",
    learnHref: "/programs/eduaid-africa",
    supportHref: "/support-us#sponsor-eduaid",
  },
  {
    icon: Award,
    title: "New Education Standards Award Africa",
    blurb: "Continental awards engine recognising excellence across 135 education subcategories.",
    learnHref: "/programs/nesa-africa",
    supportHref: "/support-us#sponsor-nesa",
  },
  {
    icon: Laptop,
    title: "Education Online Africa",
    blurb: "Digital learning, certified courses and the ACDL/AWPC pathway for educators.",
    learnHref: "/programs/digital-learning",
    supportHref: "/support-us#support-elibrary",
  },
  {
    icon: Library,
    title: "eLibrary Africa / Nigeria",
    blurb: "Open digital library hubs putting books and research into every learner's hands.",
    learnHref: "/programs/elibrary-nigeria",
    supportHref: "/support-us#support-elibrary",
  },
  {
    icon: Compass,
    title: "My Career, My Life",
    blurb: "Career guidance, mentorship and employability programs for African youth.",
    learnHref: "/programs/my-career-my-life",
    supportHref: "/support-us#support-mcml",
  },
  {
    icon: School,
    title: "Rebuild My School Africa",
    blurb: "School renewal — classrooms, furniture, WASH facilities and digital labs.",
    learnHref: "/programs/rebuild-my-school-africa",
    supportHref: "/support-us#rebuild-school",
  },
  {
    icon: Heart,
    title: "Send a Child to School",
    blurb: "Sponsor a learner's full academic year — fees, books, uniform and meals.",
    learnHref: "/programs/send-a-child-to-school",
    supportHref: "/support-us#send-child",
  },
];

export const FeaturedPrograms = () => {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            Featured Programs
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            Seven flagship programs powering Africa's education future
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Each program is designed for measurable impact — from policy advocacy and standards
            recognition to direct school, teacher and learner support.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.map(({ icon: Icon, title, blurb, learnHref, supportHref }) => (
            <article
              key={title}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-lg"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-lg font-bold leading-tight text-scef-blue-darker">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {blurb}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Button asChild size="sm" variant="outline" className="border-scef-blue/30 text-scef-blue-darker hover:bg-scef-blue hover:text-white">
                  <Link to={learnHref}>
                    Learn More
                    <ArrowRight className="ms-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild size="sm" className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-darker font-semibold">
                  <Link to={supportHref}>Support</Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

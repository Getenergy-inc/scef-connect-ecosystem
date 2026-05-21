import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Leaf, Award, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import capacityImg from "@/assets/photos/scef-classroom-teacher.jpg";
import greenImg from "@/assets/photos/scef-landscape-aerial.jpg";
import vocationalImg from "@/assets/photos/scef-girls-stem.jpg";
import volunteerImg from "@/assets/photos/scef-volunteers-outreach.jpg";

type Card = {
  title: string;
  text: string;
  cta: string;
  href: string;
  image: string;
  imageAlt: string;
  Icon: typeof GraduationCap;
};

const cards: Card[] = [
  {
    title: "Capacity Training",
    text: "Apply for teacher training, digital learning, school leadership, policy, TVET, and community education capacity programs.",
    cta: "Join Training Waitlist",
    href: "/apply/capacity-training",
    image: capacityImg,
    imageAlt: "Teacher and learners in a SCEF classroom training session",
    Icon: GraduationCap,
  },
  {
    title: "Green Horizon Initiative",
    text: "Join the Borno pilot waitlist for agriculture livelihood, permaculture training, food security, and community farming opportunities.",
    cta: "Join Green Horizon Waitlist",
    href: "/apply/green-horizon",
    image: greenImg,
    imageAlt: "Aerial farmland landscape used in SCEF community projects",
    Icon: Leaf,
  },
  {
    title: "Vocational Training Scholarship",
    text: "Apply for regional vocational training scholarship opportunities across Africa.",
    cta: "Apply for Scholarship Waitlist",
    href: "/apply/vocational-scholarship",
    image: vocationalImg,
    imageAlt: "Young learners participating in SCEF STEM and skills programme",
    Icon: Award,
  },
  {
    title: "Volunteer for a Project",
    text: "Support SCEF projects such as My Career My Life, Rebuild My School Africa, Women & Girls Empowerment, and local chapter activities.",
    cta: "Volunteer for a Project",
    href: "/volunteer",
    image: volunteerImg,
    imageAlt: "SCEF volunteers working with community members on the ground",
    Icon: HandHeart,
  },
];

export function ApplicationsWaitlistsSection() {
  return (
    <section className="bg-white border-t border-border py-14 md:py-20" aria-labelledby="apps-waitlists-title">
      <div className="container mx-auto max-w-6xl px-6 md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Open intake
        </p>
        <div className="mt-3 h-px w-10 bg-primary/40" />
        <h2
          id="apps-waitlists-title"
          className="mt-4 font-display text-2xl md:text-[28px] font-bold tracking-tight text-scef-blue-darker max-w-3xl"
        >
          2026–2027 Applications &amp; Waitlists
        </h2>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
          SCEF is opening waitlists for upcoming 2026–2027 programs, including capacity trainings, vocational
          scholarships, the Green Horizon agriculture livelihood project, local chapter opportunities,
          volunteer roles, internships, and regional education-impact projects.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title, text, cta, href, image, imageAlt, Icon }) => (
            <article
              key={title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-md"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/95 text-scef-blue-darker ring-1 ring-border">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-lg font-semibold text-scef-blue-darker">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {text}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-5 justify-between border-scef-blue-darker/20 text-scef-blue-darker hover:bg-scef-blue-darker hover:text-white"
                >
                  <Link to={href} aria-label={`${cta} — ${title}`}>
                    <span>{cta}</span>
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            size="lg"
            className="bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90 font-semibold"
          >
            <Link to="/apply">
              View All Applications
              <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

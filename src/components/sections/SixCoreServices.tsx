import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, School, Trophy, Monitor, BookOpen, Wallet } from "lucide-react";
import eduaidImg from "@/assets/eduaid-hero.jpg";
import rmsaImg from "@/assets/rmsa/school-before-after.jpg";
import nesaImg from "@/assets/nesa-africa-stage-thumbnail.jpg";
import onlineImg from "@/assets/hero-education.jpg";
import libraryImg from "@/assets/hero-programs.jpg";
import walletImg from "@/assets/gfa-wallet-logo.jpg";

const services = [
  {
    icon: GraduationCap,
    title: "EduAid-Africa",
    blurb:
      "Digital education funding platform for scholarships, grants, CSR partnerships, and school intervention programs.",
    image: eduaidImg,
    cta: "Explore EduAid-Africa",
    href: "/programs/eduaid-africa",
  },
  {
    icon: School,
    title: "Rebuild My School Africa",
    blurb:
      "School infrastructure and inclusion service rebuilding schools, supporting special needs and vocational learning.",
    image: rmsaImg,
    cta: "Rebuild a School",
    href: "/programs/rebuild-my-school-africa",
  },
  {
    icon: Trophy,
    title: "NESA-Africa",
    blurb:
      "Continental recognition platform celebrating change-makers, institutions, and leaders advancing education across Africa.",
    image: nesaImg,
    cta: "Discover NESA-Africa",
    href: "/programs/nesa-africa",
  },
  {
    icon: Monitor,
    title: "Education Online Africa",
    blurb:
      "Digital learning, training, certification, and career development for students, teachers, and institutions.",
    image: onlineImg,
    cta: "Start Learning",
    href: "/programs/digital-learning",
  },
  {
    icon: BookOpen,
    title: "eLibrary Nigeria / Africa",
    blurb:
      "Digital knowledge platform providing books, research resources, and learning materials for schools and learners.",
    image: libraryImg,
    cta: "Access eLibrary",
    href: "/programs/elibrary-nigeria",
  },
  {
    icon: Wallet,
    title: "GFA Wallet / AGC",
    blurb:
      "Financial infrastructure powering transparent donations, scholarship disbursements, voting, and impact tracking with AGC.",
    image: walletImg,
    cta: "Open EduAid Wallet",
    href: "/wallet",
  },
];

export const SixCoreServices = () => {
  return (
    <section className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            What we deliver
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-scef-blue-darker md:text-[2.5rem]">
            Our 6 Core Education Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Six integrated services advancing African education — from funding
            and infrastructure to recognition, learning, knowledge, and
            transparent finance.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, blurb, image, cta, href }) => (
            <article
              key={title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/85 via-[#0B5D3B]/30 to-transparent" />
                <div className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-scef-gold text-scef-blue-darker shadow-lg">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="absolute bottom-4 left-4 right-4 font-display text-xl font-bold text-white">
                  {title}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {blurb}
                </p>
                <Link
                  to={href}
                  className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-scef-blue-darker transition-colors hover:text-scef-gold-dark"
                >
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

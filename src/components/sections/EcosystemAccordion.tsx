import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Info,
  GraduationCap,
  BookOpen,
  Compass,
  Wallet,
  Users,
  Handshake,
  Megaphone,
  Droplets,
  ArrowRight,
} from "lucide-react";

const sections = [
  {
    id: "about",
    icon: Info,
    title: "About SCEF",
    summary:
      "A Pan-African nonprofit (Reg. IT-41501) advocating and achieving Education for All — through scholarships, school support, WASH, women & girls empowerment, special needs, training and transparent funding.",
    cta: { label: "Learn About SCEF", href: "/about" },
  },
  {
    id: "programs",
    icon: GraduationCap,
    title: "Programs & Services",
    summary:
      "EduAid-Africa, Rebuild My School Africa, NESA-Africa, Education Online Africa, eLibrary, Women & Girls Education, Special Needs Education, and more — one integrated education ecosystem.",
    cta: { label: "Explore Programs", href: "/programs" },
  },
  {
    id: "wash",
    icon: Droplets,
    title: "School WASH & Sanitation",
    summary:
      "Toilet construction, girls' hygiene, handwashing systems, solar water and disability-friendly access — improving health, dignity and learning outcomes.",
    cta: { label: "Support School WASH", href: "/programs/school-wash" },
  },
  {
    id: "training",
    icon: BookOpen,
    title: "Training & Development",
    summary:
      "From July 2026, monthly EduAid webinar training for teachers, schools, NGOs, education leaders and chapters — covering pedagogy, leadership, inclusion, hygiene and digital learning.",
    cta: { label: "View Training Calendar", href: "/programs/training-development" },
  },
  {
    id: "career",
    icon: Compass,
    title: "Career Guidance — My Career My Life",
    summary:
      "Launching August 2026. Career guidance, counseling and seminars for JSS, SS2/SS3 students through schools, radio, podcast and one-on-one support.",
    cta: { label: "Register Your School", href: "/programs/my-career-my-life" },
  },
  {
    id: "wallet",
    icon: Wallet,
    title: "Funding & GFA Wallet",
    summary:
      "Powered by GetFinance Africa Wallet and Afri-Gold Coin (AGC) — donations, voting, CSR funding, scholarships and training payments tracked transparently.",
    cta: { label: "Open Wallet", href: "/wallet" },
  },
  {
    id: "chapters",
    icon: Users,
    title: "Local Chapters",
    summary:
      "Community-led chapters across Africa's five regions and diaspora — nominating schools, coordinating volunteers, mobilizing partners and reporting local impact.",
    cta: { label: "Join or Start a Chapter", href: "/chapters" },
  },
  {
    id: "csr",
    icon: Handshake,
    title: "CSR & Partnerships",
    summary:
      "Deploy education CSR funds through verified projects with transparent disbursement and measurable impact reporting across scholarships, school WASH, training and more.",
    cta: { label: "Become a Partner", href: "/partner-with-us" },
  },
  {
    id: "advocacy",
    icon: Megaphone,
    title: "Advocacy & Media",
    summary:
      "NESA TV, It's In Me Radio, EduAid Webinars, advocacy campaigns and digital storytelling — amplifying Education for All in Africa.",
    cta: { label: "Explore Media", href: "/media" },
  },
];

export const EcosystemAccordion = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-6 md:px-8">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold-dark">
            Welcome to SCEF
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-scef-blue-darker md:text-5xl">
            Explore Our <span className="italic text-scef-gold-dark">Ecosystem</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A guided walkthrough of every part of SCEF — programs, training, funding, chapters, partnerships and advocacy.
          </p>
        </div>

        <Accordion type="multiple" className="mt-10 space-y-3">
          {sections.map(({ id, icon: Icon, title, summary, cta }) => (
            <AccordionItem
              key={id}
              value={id}
              className="overflow-hidden rounded-2xl border border-border bg-card data-[state=open]:border-scef-gold/40"
            >
              <AccordionTrigger className="px-5 py-5 hover:no-underline md:px-6">
                <div className="flex items-center gap-4 text-left">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-scef-gold/15 text-scef-gold-dark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-display text-base font-semibold text-scef-blue-darker md:text-lg">
                    {title}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-6 pt-0 md:px-6">
                <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{summary}</p>
                <Button asChild size="sm" className="mt-4 bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90">
                  <Link to={cta.href}>
                    {cta.label} <ArrowRight className="ms-2 h-4 w-4" />
                  </Link>
                </Button>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

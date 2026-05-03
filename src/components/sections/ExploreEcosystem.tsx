import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Info,
  BookOpen,
  GraduationCap,
  Compass,
  Wallet,
  MapPin,
  Handshake,
  Radio,
  ArrowRight,
} from "lucide-react";

/**
 * Explore SCEF Ecosystem — collapsible accordion of 8 ecosystem pillars.
 * Each item shows a short summary + bullet list + CTA to the full page.
 */
const items = [
  {
    icon: Info,
    title: "About SCEF",
    summary: "Pan-African education foundation founded in 1997.",
    bullets: [
      "Vision: 1 million+ learners impacted by 2035",
      "Mission aligned with SDG 4, AU Agenda 2063 and ESG",
      "Strategic objectives: 100K scholarships, $50M raised, regional chapters",
    ],
    ctaLabel: "View Full About Page",
    ctaHref: "/about",
  },
  {
    icon: BookOpen,
    title: "Programs & Services",
    summary: "Nine flagship initiatives advancing African education.",
    bullets: [
      "EduAid-Africa · Rebuild My School Africa · NESA-Africa",
      "Education Online Africa · eLibrary Nigeria/Africa",
      "Women & Girls · Special Needs · My Career My Life · SCEF Media",
    ],
    ctaLabel: "Explore All Programs",
    ctaHref: "/programs",
  },
  {
    icon: GraduationCap,
    title: "Training & Development",
    summary: "EduAid-Africa Monthly Training Calendar — starting July 2026.",
    bullets: [
      "Teacher training, school leadership, inclusive education",
      "TVET, digital learning, monitoring & evaluation",
      "Certification pathways for African educators",
    ],
    ctaLabel: "View Training Calendar",
    ctaHref: "/programs/training-development",
  },
  {
    icon: Compass,
    title: "My Career My Life",
    summary: "Career guidance for JSS, SS2 and SS3 students — starting August 2026.",
    bullets: [
      "Subject-to-career alignment and TVET awareness",
      "Mentorship, school visits, and volunteer media production",
      "Open to public, private and faith-based schools",
    ],
    ctaLabel: "Register Your School",
    ctaHref: "/programs/my-career-my-life",
  },
  {
    icon: Wallet,
    title: "Wallet / Funding (GFA + AGC)",
    summary: "Transparent education funding through GFA Wallet and Afri Gold Coin.",
    bullets: [
      "Donations, AGC voting, scholarship funding",
      "CSR tracking, training sponsorship, chapter wallets",
      "Live impact dashboards for every contribution",
    ],
    ctaLabel: "Open Wallet / Donate",
    ctaHref: "/wallet",
  },
  {
    icon: MapPin,
    title: "Local Chapters",
    summary: "Five African regions powering grassroots impact.",
    bullets: [
      "Join or start a chapter in your country, state or city",
      "School nominations, training coordination, local fundraising",
      "Volunteer engagement and community campaigns",
    ],
    ctaLabel: "View Chapters",
    ctaHref: "/chapters",
  },
  {
    icon: Handshake,
    title: "CSR & Partnerships",
    summary: "End-to-end CSR lifecycle for corporate, foundation and government partners.",
    bullets: [
      "School and training sponsorship pathways",
      "Girls education and special needs support tracks",
      "ESG reporting and verified impact dashboards",
    ],
    ctaLabel: "Become a Partner",
    ctaHref: "/partner-with-us",
  },
  {
    icon: Radio,
    title: "Advocacy & Media",
    summary: "Storytelling that drives recognition, action and accountability.",
    bullets: [
      "NESA TV, It's In Me Radio, and webinars",
      "Campaigns, digital billboards, advocacy storytelling",
      "Media production roles for student volunteers",
    ],
    ctaLabel: "Explore Media",
    ctaHref: "/media",
  },
];

export const ExploreEcosystem = () => {
  return (
    <section className="bg-neutral-50 py-14 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#0B5D3B] uppercase mb-3">
            Discover the platform
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-4">
            Explore the SCEF Ecosystem
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            Eight pillars working together to advance education across Africa.
            Tap any section to see what's inside.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {items.map(({ icon: Icon, title, summary, bullets, ctaLabel, ctaHref }) => (
            <AccordionItem
              key={title}
              value={title}
              className="bg-white border border-neutral-200 rounded-xl px-5 md:px-6 data-[state=open]:border-[#D4AF37] data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="hover:no-underline py-5">
                <div className="flex items-center gap-4 text-left">
                  <span className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#0B5D3B]/10 text-[#0B5D3B]">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-[#0A0A0A]">
                      {title}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-0.5 font-normal">
                      {summary}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-1 pl-[60px]">
                <ul className="space-y-2 mb-5">
                  {bullets.map((b) => (
                    <li
                      key={b}
                      className="text-sm md:text-base text-neutral-700 flex gap-2"
                    >
                      <span className="text-[#D4AF37] font-bold">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={ctaHref}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0B5D3B] hover:bg-[#0E7549] text-white text-sm font-semibold transition-colors"
                >
                  {ctaLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

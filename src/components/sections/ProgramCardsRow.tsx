import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { useRef, useState } from "react";
import nesaStage from "@/assets/nesa-stage-hosts.jpg";
import nesaLogo from "@/assets/nesa-africa-logo.jpg";
import eduaidLogo from "@/assets/eduaid-africa-logo.jpg";
import eduaidWebinar from "@/assets/eduaid-webinar-women-girls.jpg";
import classroomPhoto from "@/assets/hero-classroom.jpg";
import elibraryPhoto from "@/assets/hero-education.jpg";
import schoolgirlPhoto from "@/assets/hero-schoolgirl.jpg";
import mediaVideo from "@/assets/nesa-hero-bg-video.mp4";
import mediaPoster from "@/assets/hero-media.jpg";

type Accent = "navy" | "green" | "gold" | "blue";

type Card = {
  title: string;
  label: string;
  description: string;
  href: string;
  cta: string;
  image: string;
  alt: string;
  accent: Accent;
  badge?: string; // small logo badge overlay
  badgeAlt?: string;
  isVideo?: boolean;
  videoSrc?: string;
};

const accentClasses: Record<Accent, { label: string; cta: string; bar: string }> = {
  navy: {
    label: "bg-scef-blue-darker/10 text-scef-blue-darker",
    cta: "text-scef-blue-darker",
    bar: "bg-scef-blue-darker",
  },
  green: {
    label: "bg-emerald-50 text-emerald-800",
    cta: "text-emerald-700",
    bar: "bg-emerald-600",
  },
  gold: {
    label: "bg-amber-50 text-amber-800",
    cta: "text-amber-700",
    bar: "bg-amber-500",
  },
  blue: {
    label: "bg-sky-50 text-sky-800",
    cta: "text-sky-700",
    bar: "bg-sky-600",
  },
};

const cards: Card[] = [
  {
    title: "EduAid-Africa",
    label: "Funding & Partnerships",
    description:
      "Funding education support through partnerships, scholarships, school aid, teacher development, and community programs.",
    href: "/programs/eduaid-africa",
    cta: "Explore EduAid-Africa",
    image: eduaidWebinar,
    alt: "EduAid-Africa education support and partnership program",
    accent: "green",
    badge: eduaidLogo,
    badgeAlt: "EduAid-Africa logo",
  },
  {
    title: "NESA-Africa",
    label: "Recognition & Awards",
    description:
      "Recognising educators, schools, leaders, and organisations advancing education excellence across Africa.",
    href: "/programs/nesa-africa",
    cta: "Explore NESA-Africa",
    image: nesaStage,
    alt: "NESA-Africa education award event",
    accent: "gold",
    badge: nesaLogo,
    badgeAlt: "NESA-Africa logo",
  },
  {
    title: "Rebuild My School Africa",
    label: "School Transformation",
    description:
      "Supporting school improvement, infrastructure advocacy, learning spaces, and community-driven school transformation.",
    href: "/programs/rebuild-my-school-africa",
    cta: "View Program",
    image: classroomPhoto,
    alt: "African classroom and school support program",
    accent: "navy",
  },
  {
    title: "eLibrary Africa",
    label: "Digital Learning",
    description:
      "Expanding access to digital learning resources, online libraries, and education technology for students and schools.",
    href: "/programs/elibrary-nigeria",
    cta: "Explore eLibrary",
    image: elibraryPhoto,
    alt: "Student using digital learning resources",
    accent: "blue",
  },
  {
    title: "Women & Girls Empowerment",
    label: "Inclusion & Leadership",
    description:
      "Supporting girls' education, women leadership, STEM inclusion, safeguarding, mentorship, and wellbeing.",
    href: "/programs/women-girls-empowerment",
    cta: "Explore Program",
    image: schoolgirlPhoto,
    alt: "Women and girls education webinar",
    accent: "green",
  },
  {
    title: "Media & Advocacy",
    label: "Stories & Campaigns",
    description:
      "Stories, campaigns, webinars, and media programs amplifying education impact across Africa.",
    href: "/media",
    cta: "Watch & Explore",
    image: mediaPoster,
    alt: "SCEF media and advocacy video",
    accent: "navy",
    isVideo: true,
    videoSrc: mediaVideo,
  },
];

const VideoMedia = ({ poster, src, alt }: { poster: string; src: string; alt: string }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const handleEnter = () => {
    const v = ref.current;
    if (!v) return;
    // Avoid hover preview on touch/coarse pointers
    if (window.matchMedia?.("(hover: none)").matches) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const handleLeave = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-scef-blue-darker"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <img
        src={poster}
        alt={alt}
        loading="lazy"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={ref}
        src={src}
        muted
        playsInline
        loop
        preload="none"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/40 via-transparent to-transparent">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg ring-1 ring-black/10">
          <Play className="h-5 w-5 translate-x-0.5 fill-scef-blue-darker text-scef-blue-darker" />
        </span>
      </div>
    </div>
  );
};

export const ProgramCardsRow = () => {
  return (
    <section className="bg-white border-y border-border">
      <div className="container mx-auto max-w-7xl px-6 md:px-8 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Programs & Initiatives
            </p>
            <h2 className="mt-2 font-display text-2xl md:text-[32px] font-bold tracking-tight text-scef-blue-darker">
              Explore Our Programs
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
              Discover SCEF's core education-impact programs supporting recognition, scholarships,
              school transformation, digital learning, women and girls empowerment, and
              community-led education action across Africa.
            </p>
          </div>
          <Link
            to="/programs"
            className="hidden md:inline-flex items-center gap-1 text-[13px] font-medium text-primary hover:text-scef-blue-darker whitespace-nowrap"
          >
            View all programs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const a = accentClasses[card.accent];
            return (
              <Link
                key={card.title}
                to={card.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
              >
                {/* Media */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  {card.isVideo && card.videoSrc ? (
                    <VideoMedia poster={card.image} src={card.videoSrc} alt={card.alt} />
                  ) : (
                    <img
                      src={card.image}
                      alt={card.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}

                  {/* Small brand badge overlay */}
                  {card.badge && (
                    <div className="absolute top-3 left-3 flex h-10 w-10 items-center justify-center rounded-md bg-white/95 p-1 shadow-md ring-1 ring-black/5">
                      <img
                        src={card.badge}
                        alt={card.badgeAlt ?? ""}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}

                  {/* Accent bar */}
                  <span className={`absolute bottom-0 left-0 h-1 w-full ${a.bar}`} />
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`self-start rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider ${a.label}`}
                  >
                    {card.label}
                  </span>
                  <h3 className="mt-3 font-display text-[17px] font-bold leading-tight text-scef-blue-darker">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground line-clamp-3">
                    {card.description}
                  </p>
                  <span
                    className={`mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold ${a.cta} group-hover:gap-2 transition-all`}
                  >
                    {card.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            to="/programs"
            className="inline-flex items-center gap-1 text-[13px] font-medium text-primary"
          >
            View all programs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramCardsRow;

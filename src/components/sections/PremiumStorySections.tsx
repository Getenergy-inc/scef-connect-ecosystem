import { Link } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  HeartHandshake,
  MapPin,
  Handshake,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type CTA = { label: string; to: string; variant?: "default" | "secondary" | "outline" | "heroOutline" };
type Tone = "dark" | "light";

type StoryCard = {
  id: string;
  tone: Tone;
  badge: string;
  badgeIcon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  ctas: CTA[];
};

const cards: StoryCard[] = [
  {
    id: "our-journey",
    tone: "dark",
    badge: "Our Journey",
    badgeIcon: BookOpen,
    eyebrow: "SCEF 1997 — Today",
    title: "From a Postcard Idea in Minna to a Pan-African Movement",
    description:
      "SCEF's journey began with a creative education and tourism advocacy idea in Minna and has grown into a Pan-African education, advocacy, ESG, health, and social impact movement.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "African students gathered for an outdoor learning session",
    highlights: [
      "1997 creative roots in Minna",
      "2003 formal education advocacy launch",
      "It's In Me Radio and youth advocacy",
      "AIESEC and VSO volunteer collaborations",
      "EduAid-Africa and NESA-Africa expansion",
      "Local chapters across Africa and the diaspora",
    ],
    ctas: [
      { label: "Explore Our History", to: "/about/history", variant: "secondary" },
      { label: "Meet Our Contributors", to: "/volunteers", variant: "heroOutline" },
    ],
  },
  {
    id: "monthly-calendar",
    tone: "light",
    badge: "July 2026 — June 2027",
    badgeIcon: CalendarDays,
    eyebrow: "Program Weeks",
    title: "Explore Our Monthly Advocacy, Webinar & Training Calendar",
    description:
      "Every month, SCEF leads a focused education, advocacy, and capacity-building theme across Africa. Each theme runs as a flexible Program Week, allowing local chapters, schools, partners, and regional teams to choose one suitable day for webinars, trainings, walks, outreach, or advocacy activities.",
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "African educators participating in a training workshop",
    highlights: [
      "Monthly Program Weeks",
      "Webinars and school training",
      "Local chapter activities",
      "Advocacy walks and outreach",
      "Online, physical, or hybrid delivery",
      "Certificates and impact reports",
    ],
    ctas: [
      { label: "View Full Calendar", to: "/advocacy/calendar", variant: "default" },
      { label: "Register for a Webinar", to: "/advocacy/calendar#register", variant: "outline" },
      { label: "Host a Program Day", to: "/advocacy/calendar#host", variant: "outline" },
    ],
  },
  {
    id: "support-options",
    tone: "dark",
    badge: "Support Options",
    badgeIcon: HeartHandshake,
    eyebrow: "Designated Funds",
    title: "Choose How You Want to Support Africa's Education Future",
    description:
      "Support SCEF, NESA-Africa, and EduAid-Africa through scholarships, school rebuilding, digital learning, advocacy campaigns, awards, merchandise, gala tickets, edu-tourism, and event hosting partnerships.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "African students smiling in a classroom",
    highlights: [
      "Sponsor NESA-Africa",
      "Send a Child to School",
      "Rebuild My School Africa",
      "Support eLibrary Africa",
      "Buy Award Gala Tickets",
      "Sponsor Advocacy Campaign",
    ],
    ctas: [
      { label: "View Support Options", to: "/support-us", variant: "secondary" },
      { label: "Donate Now", to: "/wallet/donate", variant: "heroOutline" },
      { label: "Sponsor a Program", to: "/wallet/donate?fund=programs", variant: "heroOutline" },
    ],
  },
  {
    id: "local-chapters",
    tone: "light",
    badge: "On the Ground",
    badgeIcon: MapPin,
    eyebrow: "Local Chapters",
    title: "SCEF Local Chapters Across Africa & the Diaspora",
    description:
      "SCEF Local Chapters drive education advocacy, training, health awareness, ESG programs, school outreach, youth empowerment, and community development tailored to local needs.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "Community volunteers meeting in an African village setting",
    highlights: [
      "Led by Local Chapter Presidents",
      "Managed by Boards of Advisers",
      "Supported by ambassadors and volunteers",
      "Localized education and ESG projects",
      "Country and diaspora chapter expansion",
      "Community-based impact delivery",
    ],
    ctas: [
      { label: "Join a Local Chapter", to: "/local-chapters", variant: "default" },
      { label: "Start a Chapter", to: "/chapters/start", variant: "outline" },
      { label: "Become a Local Partner", to: "/partner-with-us", variant: "outline" },
    ],
  },
  {
    id: "verified-network",
    tone: "dark",
    badge: "Verified Network",
    badgeIcon: Handshake,
    eyebrow: "Trusted Partners",
    title: "Trusted Education, Advocacy & Operational Partners",
    description:
      "SCEF works with verified education networks, development institutions, CSR partners, media organizations, local chapter partners, and operational supporters to expand measurable education impact across Africa.",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "Education leaders shaking hands at a partnership meeting",
    highlights: [
      "CSR and institutional partners",
      "Schools and NGOs",
      "Media and advocacy partners",
      "Development collaborators",
      "Education networks",
      "Local implementation partners",
    ],
    ctas: [
      { label: "Partner With Us", to: "/partner-with-us", variant: "secondary" },
      { label: "Become a CSR Partner", to: "/csr-funding-intake", variant: "heroOutline" },
      { label: "Sponsor a School", to: "/wallet/donate?fund=adopt-school", variant: "heroOutline" },
    ],
  },
  {
    id: "training-webinars",
    tone: "light",
    badge: "Training & Webinars",
    badgeIcon: GraduationCap,
    eyebrow: "EduAid-Africa Capacity",
    title: "EduAid-Africa Training & Webinar Programs",
    description:
      "Continuous monthly programs powering teacher capacity, school leadership, inclusive education, digital learning, girls education, ESG awareness, and career readiness across Africa.",
    image:
      "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=1600&q=70",
    imageAlt: "African teacher leading a classroom training session",
    highlights: [
      "Teacher training",
      "School leadership programs",
      "Inclusive education support",
      "Digital learning and EdTech",
      "Career guidance systems",
      "Girls education and safeguarding",
    ],
    ctas: [
      { label: "Register for Training", to: "/advocacy/training-webinars", variant: "default" },
      { label: "Sponsor a Webinar", to: "/wallet/donate?fund=webinars", variant: "outline" },
      { label: "Request School Training", to: "/partner-with-us#training", variant: "outline" },
    ],
  },
];

const officialChannels: StoryCard = {
  id: "official-channels",
  tone: "dark",
  badge: "Official Channels",
  badgeIcon: ShieldCheck,
  eyebrow: "Verified Payments",
  title: "Official Donation & Payment Channels",
  description:
    "All SCEF ecosystem transactions flow through verified channels. Visitors can support SCEF, EduAid-Africa, NESA-Africa, GFA Wallet, scholarships, training, advocacy campaigns, and sponsorship programs through the official Support page.",
  image:
    "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=1800&q=70",
  imageAlt: "African students walking to school holding books",
  highlights: [
    "Verified bank accounts",
    "SCEF donations",
    "EduAid-Africa support",
    "NESA-Africa sponsorships",
    "GFA Wallet technology support",
    "Transparent payment guidance",
  ],
  ctas: [
    { label: "View Official Accounts", to: "/support-us/official-accounts", variant: "secondary" },
    { label: "Donate Now", to: "/wallet/donate", variant: "heroOutline" },
    { label: "Pay Membership Fee", to: "/get-involved/membership", variant: "heroOutline" },
  ],
};

const isExternal = (to: string) => /^https?:\/\//i.test(to);

const renderCta = (c: CTA, tone: Tone, key: string) => {
  // Map variants per tone for legibility
  const variant: CTA["variant"] =
    c.variant ?? (tone === "dark" ? "heroOutline" : "default");
  const inner = isExternal(c.to) ? (
    <a href={c.to} target="_blank" rel="noopener noreferrer">
      {c.label}
    </a>
  ) : (
    <Link to={c.to}>{c.label}</Link>
  );
  return (
    <Button key={key} asChild size="sm" variant={variant as any}>
      {inner}
    </Button>
  );
};

const PremiumCard = ({ card, fullWidth = false }: { card: StoryCard; fullWidth?: boolean }) => {
  const dark = card.tone === "dark";
  const BadgeIcon = card.badgeIcon;
  return (
    <article
      aria-labelledby={`${card.id}-heading`}
      className={[
        "group flex flex-col overflow-hidden rounded-2xl border shadow-sm",
        dark
          ? "border-scef-gold/30 bg-scef-blue-darker text-white"
          : "border-scef-blue-darker/15 bg-card",
        fullWidth ? "lg:flex-row" : "",
      ].join(" ")}
    >
      <div
        className={[
          "relative w-full overflow-hidden",
          fullWidth ? "h-56 lg:h-auto lg:w-2/5" : "h-44 md:h-48",
        ].join(" ")}
      >
        <img
          src={card.image}
          alt={card.imageAlt}
          loading="lazy"
          className={[
            "h-full w-full object-cover transition group-hover:scale-[1.02]",
            dark ? "opacity-80" : "",
          ].join(" ")}
        />
        <div
          className={[
            "absolute inset-0",
            dark
              ? "bg-gradient-to-t from-scef-blue-darker via-scef-blue-darker/40 to-transparent"
              : "bg-gradient-to-t from-card via-card/30 to-transparent",
            fullWidth ? "lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-transparent" : "",
          ].join(" ")}
        />
        <span
          className={[
            "absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
            dark
              ? "bg-scef-gold/90 text-scef-blue-darker"
              : "bg-scef-blue-darker text-scef-gold ring-1 ring-scef-gold/30",
          ].join(" ")}
        >
          <BadgeIcon className="h-3.5 w-3.5" /> {card.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p
          className={[
            "text-[11px] font-semibold uppercase tracking-[0.18em]",
            dark ? "text-scef-gold" : "text-scef-blue-darker",
          ].join(" ")}
        >
          {card.eyebrow}
        </p>
        <h3
          id={`${card.id}-heading`}
          className={[
            "mt-1 font-display text-2xl font-bold leading-tight",
            dark ? "" : "text-scef-blue-darker",
          ].join(" ")}
        >
          {card.title}
        </h3>
        <p
          className={[
            "mt-2 text-sm leading-relaxed",
            dark ? "text-white/80" : "text-muted-foreground",
          ].join(" ")}
        >
          {card.description}
        </p>

        <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
          {card.highlights.map((h) => (
            <li
              key={h}
              className={[
                "flex items-start gap-2 text-xs",
                dark ? "text-white/85" : "text-muted-foreground",
              ].join(" ")}
            >
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-scef-gold" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {card.ctas.map((c, i) => renderCta(c, card.tone, `${card.id}-cta-${i}`))}
        </div>
      </div>
    </article>
  );
};

export const PremiumStorySections = () => {
  const rows: [StoryCard, StoryCard][] = [
    [cards[0], cards[1]],
    [cards[2], cards[3]],
    [cards[4], cards[5]],
  ];

  return (
    <section
      id="scef-story-sections"
      aria-label="SCEF programs, advocacy, partners and support overview"
      className="bg-gradient-to-b from-background to-muted/30 py-16 md:py-20"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="space-y-8 md:space-y-10">
          {rows.map(([a, b], i) => (
            <div key={i} className="grid gap-6 lg:grid-cols-2">
              <PremiumCard card={a} />
              <PremiumCard card={b} />
            </div>
          ))}
          <PremiumCard card={officialChannels} fullWidth />
        </div>
      </div>
    </section>
  );
};

export default PremiumStorySections;

import {
  MapPin,
  School,
  BarChart3,
  ArrowRight,
  Globe2,
  Users,
  Handshake,
  Award,
  GraduationCap,
  Building2,
  BookOpenCheck,
  CalendarCheck,
  BriefcaseBusiness,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Chapter {
  country: string;
  code: string;
  flag: string;
  tourism: string;
  landscape: string;
  campaigns: number;
  specialNeeds: number;
  raised: string;
  description: string;
}

const chapters: Chapter[] = [
  {
    country: "Nigeria",
    code: "NG",
    flag: "🇳🇬",
    tourism: "Zuma Rock • Lagos Coast • Yankari",
    landscape:
      "https://images.unsplash.com/photo-1576487248805-cf45a6fabc99?auto=format&fit=crop&w=1000&q=80",
    campaigns: 12,
    specialNeeds: 5,
    raised: "Reporting in progress",
    description:
      "Coordinating school nominations, volunteer recruitment, training support, and regional education advocacy.",
  },
  {
    country: "Ghana",
    code: "GH",
    flag: "🇬🇭",
    tourism: "Cape Coast • Kakum • Accra Arts",
    landscape:
      "https://images.unsplash.com/photo-1610123598195-eea6b6be8617?auto=format&fit=crop&w=1000&q=80",
    campaigns: 7,
    specialNeeds: 3,
    raised: "Reporting in progress",
    description:
      "Supporting local education campaigns, school registration, and community-led chapter reporting.",
  },
  {
    country: "Kenya",
    code: "KE",
    flag: "🇰🇪",
    tourism: "Maasai Mara • Nairobi • Coastline",
    landscape:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1000&q=80",
    campaigns: 6,
    specialNeeds: 4,
    raised: "Reporting in progress",
    description:
      "Driving inclusive education, special needs nominations, media documentation, and training coordination.",
  },
  {
    country: "Uganda",
    code: "UG",
    flag: "🇺🇬",
    tourism: "Lake Victoria • Bwindi • Kampala",
    landscape:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80",
    campaigns: 4,
    specialNeeds: 2,
    raised: "Reporting in progress",
    description:
      "Mobilizing volunteers, chapter members, training participation, and school support documentation.",
  },
];

interface ImpactItem {
  icon: LucideIcon;
  title: string;
  text: string;
}

const impactItems: ImpactItem[] = [
  { icon: Globe2, title: "Regions & Chapters Active", text: "Across African regions and the diaspora" },
  { icon: School, title: "Students & Schools Supported", text: "Through programs, chapters, and funded initiatives" },
  { icon: Handshake, title: "CSR & Funding Partners", text: "Organizations supporting education through CSR and collaboration" },
  { icon: Award, title: "Education Change Makers", text: "Honoured through NESA-Africa recognition" },
  { icon: Users, title: "Volunteers & Ambassadors", text: "Members driving advocacy on the ground" },
  { icon: Building2, title: "Schools Rebuilt", text: "Renewed and equipped through Rebuild My School Africa" },
  { icon: GraduationCap, title: "Teachers Trained", text: "Through EduAid-Africa monthly capacity programs" },
  { icon: BookOpenCheck, title: "Schools Registered for Training", text: "Onboarded for SCEF training and adopt-a-school" },
  { icon: BriefcaseBusiness, title: "Students Reached via MCML", text: "Through My Career My Life advocacy sessions" },
  { icon: CalendarCheck, title: "Career Sessions Delivered", text: "Live webinars, school visits and recorded segments" },
];

function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-56 overflow-hidden">
        <img
          src={chapter.landscape}
          alt={`${chapter.country} tourism and cultural representation`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3 py-2 shadow">
          <span className="text-2xl" aria-hidden>{chapter.flag}</span>
          <span className="text-xs font-black text-scef-blue-darker">{chapter.code}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-display text-3xl font-black text-white">{chapter.country}</h3>
          <p className="mt-1 flex items-center gap-2 text-sm text-white/85">
            <MapPin size={15} /> {chapter.tourism}
          </p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm leading-6 text-muted-foreground">{chapter.description}</p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-scef-blue-darker/10 p-3 text-center">
            <p className="text-2xl font-black text-scef-blue-darker">{chapter.campaigns}</p>
            <p className="mt-1 text-[11px] font-bold text-muted-foreground">Active campaigns</p>
          </div>
          <div className="rounded-2xl bg-scef-gold/20 p-3 text-center">
            <p className="text-2xl font-black text-scef-blue-darker">{chapter.specialNeeds}</p>
            <p className="mt-1 text-[11px] font-bold text-muted-foreground">Special needs noms.</p>
          </div>
          <div className="rounded-2xl bg-muted p-3 text-center">
            <BarChart3 className="mx-auto text-scef-blue-darker" size={24} />
            <p className="mt-1 text-[11px] font-bold text-muted-foreground">Raised</p>
          </div>
        </div>
        <div className="mt-5 rounded-2xl border border-dashed border-border bg-muted/40 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Funding Status</p>
          <p className="mt-1 font-black text-scef-blue-darker">{chapter.raised}</p>
        </div>
        <Link
          to="/local-chapters"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-scef-blue-darker px-5 py-3 font-black text-white transition hover:bg-scef-blue-darker/90"
        >
          View Chapter <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}

function ImpactCard({ item }: { item: ImpactItem }) {
  const Icon = item.icon;
  return (
    <article className="rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-scef-gold/20 text-scef-blue-darker">
        <Icon size={28} />
      </div>
      <h3 className="mt-5 font-display text-lg font-black text-scef-blue-darker">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
    </article>
  );
}

export default function LocalChaptersImpact() {
  return (
    <section className="bg-background px-4 py-20 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-scef-blue-darker">Local Chapters</p>
          <h2 className="mt-3 font-display text-4xl font-black leading-tight text-scef-blue-darker md:text-5xl">
            SCEF Local Chapters Across Africa & the Diaspora
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Country and regional chapters drive school nominations, donations and intervention delivery in their own communities — coordinating school registration, volunteer recruitment, physical training, media documentation and regional reporting for EduAid-Africa webinars and My Career My Life sessions.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.country} chapter={chapter} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/local-chapters" className="rounded-2xl bg-scef-gold px-6 py-4 font-black text-scef-blue-darker shadow hover:opacity-90">
            Browse All Chapters
          </Link>
          <Link to="/programs/eduaid-africa" className="rounded-2xl bg-scef-blue-darker px-6 py-4 font-black text-white shadow hover:opacity-90">
            Coordinate Training Through a Chapter
          </Link>
          <Link to="/chapters/start" className="rounded-2xl border border-scef-blue-darker px-6 py-4 font-black text-scef-blue-darker hover:bg-scef-blue-darker hover:text-white">
            Start a Chapter
          </Link>
        </div>

        <div className="mt-24">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-scef-blue-darker">Our Impact</p>
          <h2 className="mt-3 font-display text-4xl font-black text-scef-blue-darker md:text-5xl">Impact Snapshot</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {impactItems.map((item) => (
              <ImpactCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

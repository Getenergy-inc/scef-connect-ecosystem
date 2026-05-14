import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Handshake, Award, MapPin, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import intlEmbrace from "@/assets/legacy/contributors/intl-volunteer-embrace.jpg";
import legacyTeam from "@/assets/legacy/contributors/legacy-team-portrait.jpg";
import intlPortrait from "@/assets/legacy/contributors/intl-contributor-portrait.jpg";
import youthExchange from "@/assets/legacy/contributors/youth-exchange-thumbsup.jpg";
import earlyCollab from "@/assets/legacy/contributors/early-collaboration-moment.jpg";
import leadership from "@/assets/legacy/contributors/leadership-mentorship.jpg";

interface Photo {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  year: string;
  span?: string;
}

const photos: Photo[] = [
  {
    id: "intl-embrace",
    src: intlEmbrace,
    alt: "Historical SCEF volunteer collaboration photo",
    caption: "International Volunteer Collaboration",
    category: "International Volunteers & Contributors",
    year: "c. 2010",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: "legacy-team",
    src: legacyTeam,
    alt: "SCEF legacy volunteers and contributors",
    caption: "Legacy Team Archive",
    category: "Legacy Team Members",
    year: "2013–2014",
  },
  {
    id: "intl-portrait",
    src: intlPortrait,
    alt: "SCEF international contributor and education advocacy memory",
    caption: "Early SCEF Contributor Moment",
    category: "Education Advocacy Supporters",
    year: "c. 2010",
  },
  {
    id: "youth-exchange",
    src: youthExchange,
    alt: "SCEF people-powered education movement archive",
    caption: "Youth Exchange & Community Learning",
    category: "Youth & Volunteer Exchange",
    year: "c. 2010",
  },
  {
    id: "early-collab",
    src: earlyCollab,
    alt: "SCEF early contributor and leadership archive",
    caption: "Early SCEF Collaboration Moment",
    category: "Early SCEF Collaboration Moments",
    year: "c. 2009",
  },
  {
    id: "leadership",
    src: leadership,
    alt: "SCEF legacy volunteers and contributors",
    caption: "People Behind the Movement",
    category: "Leadership & Contributor Portraits",
    year: "c. 2011",
  },
];

const legacyMilestones = [
  { year: "2007", text: "Volunteer and contributor engagement strengthened" },
  { year: "2010", text: "International collaboration and youth exchange expanded" },
  { year: "2013–2014", text: "Volunteer-supported education advocacy continued" },
  { year: "2020+", text: "NESA-Africa and EduAid-Africa expanded contributor participation" },
  { year: "2025+", text: "Local chapters, ambassadors, and digital volunteers strengthen Pan-African impact" },
];

export default function LegacyContributorsGallery() {
  const [lightbox, setLightbox] = useState<Photo | null>(null);

  return (
    <section id="legacy-contributors" className="bg-card/40 border-b border-border">
      <div className="container mx-auto px-4 py-16 md:py-20">
        {/* Heading */}
        <div className="max-w-3xl mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
            People-Powered Archive · 2007 — Present
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker leading-tight">
            People Behind the Movement
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Behind every SCEF program is a network of people — volunteers, contributors, educators,
            supporters, and partners — who have helped expand education advocacy, youth empowerment,
            media outreach, and community impact across Africa and beyond.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[200px] gap-3 md:gap-4">
          {photos.map((p) => (
            <button
              key={p.id}
              onClick={() => setLightbox(p)}
              className={`group relative overflow-hidden rounded-2xl ring-1 ring-border bg-scef-blue-darker shadow-sm hover:shadow-xl transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-scef-gold ${p.span ?? ""}`}
              aria-label={`Open ${p.caption}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/90 via-scef-blue-darker/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />
              <span className="absolute top-2.5 right-2.5 bg-scef-gold text-scef-blue-darker text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                {p.year}
              </span>
              <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur text-scef-blue-darker text-[9px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                Archive
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-white">
                <p className="text-[10px] uppercase tracking-[0.18em] text-scef-gold/90 font-semibold">
                  {p.category}
                </p>
                <p className="mt-0.5 text-xs md:text-sm font-semibold leading-snug line-clamp-2">
                  {p.caption}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Legacy timeline labels */}
        <div className="mt-14">
          <h3 className="font-display text-xl font-bold text-scef-blue-darker text-center mb-6">
            Volunteer & Contributor Timeline
          </h3>
          <ol className="grid gap-3 md:grid-cols-5">
            {legacyMilestones.map((m) => (
              <li
                key={m.year}
                className="rounded-xl border border-border bg-card p-4 hover:border-scef-gold/50 transition-colors"
              >
                <p className="text-scef-gold font-bold text-sm">{m.year}</p>
                <p className="mt-1 text-xs text-foreground/85 leading-relaxed">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-border bg-background p-6 md:p-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
              Become Part of the SCEF Story
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker leading-tight">
              Join the people powering Africa's education movement
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Join the growing community of volunteers, ambassadors, educators, partners, and
              changemakers helping SCEF advance education, advocacy, ESG, health awareness, and
              sustainable impact across Africa.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker font-semibold">
              <Link to="/get-involved/volunteer"><Handshake className="w-4 h-4 mr-2" /> Volunteer With Us</Link>
            </Button>
            <Button asChild variant="outline" className="font-semibold">
              <Link to="/get-involved/ambassador"><Award className="w-4 h-4 mr-2" /> Become an Ambassador</Link>
            </Button>
            <Button asChild variant="outline" className="font-semibold">
              <Link to="/chapters"><MapPin className="w-4 h-4 mr-2" /> Join a Local Chapter</Link>
            </Button>
            <Button asChild variant="outline" className="font-semibold">
              <Link to="/partner-with-us"><Users className="w-4 h-4 mr-2" /> Partner With SCEF</Link>
            </Button>
            <Button asChild variant="ghost" className="font-semibold">
              <Link to="/hall-of-fame/submit"><FileText className="w-4 h-4 mr-2" /> Submit Your Story</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-label={lightbox.caption}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="text-white mt-4 text-center">
              <p className="text-scef-gold text-xs font-semibold uppercase tracking-wider">
                {lightbox.category} · {lightbox.year}
              </p>
              <h4 className="font-display text-xl font-bold mt-1">{lightbox.caption}</h4>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

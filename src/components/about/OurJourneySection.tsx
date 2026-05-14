import { useState } from "react";
import { X } from "lucide-react";
import foundations from "@/assets/legacy/scef-foundations-team.jpg";
import exchange from "@/assets/legacy/scef-international-exchange.jpg";
import community from "@/assets/legacy/scef-community-learning-2009.jpg";
import leadership from "@/assets/legacy/scef-leadership-collaboration.jpg";

interface Story {
  src: string;
  title: string;
  label: string;
  badge?: string;
  description: string;
  tags: string[];
}

const stories: Story[] = [
  {
    src: foundations,
    title: "Foundations of the Vision",
    label: "Early SCEF Contributors",
    badge: "Since 2007",
    description:
      "SCEF began as a bold grassroots vision powered by educators, youth advocates, professionals, and volunteers committed to transforming education and community development across Africa.",
    tags: ["Education Leadership", "Community Advocacy", "Pan-African Vision", "Grassroots Impact"],
  },
  {
    src: community,
    title: "Global Connections & Community Learning",
    label: "International Education Exchange",
    badge: "2009",
    description:
      "Through educational exchange, community engagement, volunteerism, and global collaboration, SCEF expanded its reach across cultures, institutions, and youth communities.",
    tags: ["International Collaboration", "Youth Development", "Volunteer Engagement", "Education Exchange"],
  },
  {
    src: exchange,
    title: "Cross-Cultural Solidarity",
    label: "Legacy Volunteers",
    description:
      "Solidarity moments with partners and volunteers from across continents — strengthening SCEF's commitment to inclusive, dignity-driven education advocacy.",
    tags: ["Global Partners", "Solidarity", "Advocacy"],
  },
  {
    src: leadership,
    title: "Building the Future Together",
    label: "Community Leadership",
    description:
      "Today, SCEF continues to grow through partnerships, local chapters, ambassadors, educators, volunteers, media advocates, and supporters working together to empower Africa's future.",
    tags: ["Leadership", "Partnerships", "Local Chapters", "Educational Innovation"],
  },
];

const milestones = [
  { year: "2007", text: "Early grassroots advocacy and educational outreach" },
  { year: "2010", text: "International educational collaboration and youth engagement" },
  { year: "2015", text: "Expansion into advocacy, training, and media initiatives" },
  { year: "2020", text: "Pan-African digital transformation and ecosystem development" },
  { year: "2025+", text: "Continental expansion through EduAid-Africa, NESA-Africa, ESG advocacy, local chapters, and GFA Wallet innovation" },
];

export default function OurJourneySection() {
  const [lightbox, setLightbox] = useState<Story | null>(null);

  return (
    <section id="our-journey" className="py-20 bg-background border-y border-border">
      <div className="container px-4 md:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-scef-gold/10 text-scef-blue-darker text-xs font-semibold tracking-wider uppercase mb-4">
            SCEF Movement Archive
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker mb-4">
            Our Journey Through People, Purpose & Impact
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            From grassroots educational advocacy to a growing Pan-African movement, SCEF has been
            powered by passionate educators, volunteers, youth leaders, development advocates, and
            global contributors since 2007.
          </p>
        </div>

        {/* Storytelling gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <article
              key={s.title}
              className={`group relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500 ${
                i === 0 ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <button
                onClick={() => setLightbox(s)}
                aria-label={`Open ${s.title}`}
                className="block w-full text-left"
              >
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3] lg:aspect-[16/11]" : "aspect-[4/3]"}`}>
                  <img
                    src={s.src}
                    alt={s.label}
                    loading="lazy"
                    className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/80 via-scef-blue-darker/10 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {s.badge && (
                    <span className="absolute top-3 right-3 bg-scef-gold text-scef-blue-darker text-[11px] font-bold px-2.5 py-1 rounded-full shadow">
                      {s.badge}
                    </span>
                  )}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-scef-blue-darker text-[10px] font-semibold px-2 py-1 rounded uppercase tracking-wider">
                    {s.label}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display text-lg md:text-xl font-bold mb-1.5 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/90 line-clamp-3 mb-3">
                      {s.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/15 border border-white/30 backdrop-blur"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>

        {/* Mini timeline */}
        <div className="mt-16">
          <h3 className="font-display text-xl font-bold text-scef-blue-darker text-center mb-8">
            SCEF Movement Timeline
          </h3>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-scef-gold/30 md:-translate-x-1/2" aria-hidden />
            <div className="space-y-6">
              {milestones.map((m, idx) => (
                <div
                  key={m.year}
                  className={`relative flex md:items-center gap-4 md:gap-8 ${
                    idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-scef-gold ring-4 ring-background z-10" />
                  <div className="hidden md:block flex-1" />
                  <div className="ml-10 md:ml-0 flex-1 bg-card border border-border rounded-xl p-4 md:p-5 shadow-sm">
                    <div className="text-scef-gold font-bold text-sm mb-1">{m.year}</div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{m.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-label={lightbox.title}
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
              alt={lightbox.label}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="text-white mt-4 text-center">
              <p className="text-scef-gold text-xs font-semibold uppercase tracking-wider">{lightbox.label}</p>
              <h4 className="font-display text-xl font-bold mt-1">{lightbox.title}</h4>
              <p className="text-white/80 text-sm mt-2 max-w-2xl mx-auto">{lightbox.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

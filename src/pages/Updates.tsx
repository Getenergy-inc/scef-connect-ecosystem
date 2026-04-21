import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Play, Volume2, FileText, Image as ImageIcon, Calendar, ArrowRight, Newspaper } from "lucide-react";

const updates = [
  {
    id: 1,
    type: "video",
    title: "NESA-Africa 2026 Nominations Now Open",
    description: "Submit your nominations for Africa's premier education recognition platform.",
    cta: { text: "Submit Nomination", href: "/programs/nesa-africa" },
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200",
    date: "2026-01-03",
  },
  {
    id: 2,
    type: "flyer",
    title: "EduAid Scholarship Cycle 2026",
    description: "Applications now open for the 2026 cycle. Advance your education journey.",
    cta: { text: "Apply Now", href: "/programs/eduaid-africa" },
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    date: "2026-01-02",
  },
  {
    id: 3,
    type: "announcement",
    title: "AEPC Certification Expansion",
    description: "Africa Education & Productivity Certification expands across new regions.",
    cta: { text: "Learn More", href: "/certifications" },
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200",
    date: "2026-01-01",
  },
  {
    id: 4,
    type: "audio",
    title: "It's In Me Radio — Latest Episode",
    description: "Voices of educators and learners shaping Africa's future.",
    cta: { text: "Listen Now", href: "/media" },
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1200",
    date: "2025-12-30",
  },
  {
    id: 5,
    type: "video",
    title: "Local Chapter Leadership Webinar",
    description: "Training session for Chapter Presidents on governance and impact reporting.",
    cta: { text: "Watch Now", href: "/governance" },
    thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200",
    date: "2025-12-28",
  },
  {
    id: 6,
    type: "announcement",
    title: "Pan-African Education Forum 2026",
    description: "Convening leaders, institutions, and partners across 54+ regions.",
    cta: { text: "Reserve Seat", href: "/contact" },
    thumbnail: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200",
    date: "2025-12-20",
  },
];

const typeIcons = {
  video: Play,
  audio: Volume2,
  announcement: FileText,
  flyer: ImageIcon,
};

const Updates = () => {
  const featured = updates[0];
  const rest = updates.slice(1);

  return (
    <>
      <Helmet>
        <title>News & Updates | SCEF</title>
        <meta name="description" content="Latest news, announcements, and updates from SCEF and partner programs across Africa." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* HERO — cinematic minimal */}
          <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-scef-blue-darker via-scef-blue to-scef-blue" />
            <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-scef-gold/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-scef-blue-darker/40 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-scef-gold text-xs font-semibold uppercase tracking-widest mb-8">
                  <Newspaper className="w-3.5 h-3.5" />
                  News & Updates
                </div>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05] tracking-tight">
                  Stories from <span className="text-scef-gold">Africa's</span> education movement
                </h1>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
                  Announcements, programs, and milestones — curated from SCEF and our regional partners.
                </p>
              </div>
            </div>
          </section>

          {/* FEATURED STORY */}
          <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4">
              <Reveal>
                <Link
                  to={featured.cta.href}
                  className="group block relative rounded-3xl overflow-hidden bg-card border border-border hover:border-scef-gold/40 transition-all duration-500 shadow-sm hover:shadow-2xl"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                      <img
                        src={featured.thumbnail}
                        alt={featured.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-scef-blue/40 via-transparent to-transparent" />
                      <span className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-scef-gold text-scef-blue-dark text-xs font-bold uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-4">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </div>
                      <h2 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-4 leading-tight group-hover:text-scef-blue transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
                        {featured.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-scef-blue font-semibold text-sm group-hover:gap-3 transition-all">
                        {featured.cta.text}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            </div>
          </section>

          {/* GRID */}
          <section className="pb-24 bg-background">
            <div className="container mx-auto px-4">
              <Reveal>
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-scef-gold font-semibold mb-2">More Updates</p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">Recent stories</h3>
                  </div>
                </div>
              </Reveal>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((update, i) => {
                  const TypeIcon = typeIcons[update.type as keyof typeof typeIcons];
                  return (
                    <Reveal key={update.id} delay={i * 60}>
                      <Link
                        to={update.cta.href}
                        className="group block bg-card rounded-2xl overflow-hidden border border-border hover:border-scef-gold/40 hover:shadow-xl transition-all duration-500 h-full"
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={update.thumbnail}
                            alt={update.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-scef-blue/30 via-transparent to-transparent" />
                          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-foreground text-[10px] font-bold uppercase tracking-wider">
                            <TypeIcon className="w-3 h-3" />
                            {update.type}
                          </span>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                            <Calendar className="w-3 h-3" />
                            {new Date(update.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </div>
                          <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-scef-blue transition-colors line-clamp-2">
                            {update.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {update.description}
                          </p>
                          <span className="inline-flex items-center gap-1.5 text-scef-blue text-sm font-semibold group-hover:gap-2.5 transition-all">
                            {update.cta.text}
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-to-br from-scef-blue-darker to-scef-blue text-white">
            <div className="container mx-auto px-4 text-center max-w-2xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Stay close to the work.
              </h2>
              <p className="text-white/70 mb-8">
                Subscribe to receive curated updates from SCEF and partner programs.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-light font-semibold" asChild>
                  <Link to="/membership">Become a Member</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
                  <Link to="/contact">Contact SCEF</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Updates;

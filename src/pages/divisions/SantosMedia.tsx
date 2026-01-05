import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Video, Radio, Tv, Mic, Camera, 
  ArrowRight, CheckCircle, Play, Film 
} from "lucide-react";

const responsibilities = [
  "NESA Africa TV",
  "It's In Me Radio",
  "EduAid Africa Webinars & Podcast",
  "Education Tourism & Impact Stories",
  "Content production, broadcast standards, and editorial integrity",
];

const channels = [
  { name: "NESA Africa TV", icon: Tv, desc: "Continental television covering NESA Awards, education documentaries, and institutional programming" },
  { name: "It's In Me Radio", icon: Radio, desc: "Pan-African radio with education talk shows, podcasts, and youth programming" },
  { name: "EduAid Africa Webinars & Podcast", icon: Video, desc: "Live and on-demand educational webinars and podcasts featuring experts and thought leaders" },
  { name: "Education Tourism & Impact Stories", icon: Camera, desc: "Video features showcasing schools, institutions, and education ecosystems across Africa" },
];

const SantosMedia = () => {
  return (
    <>
      <Helmet>
        <title>Santos Media Division | SCEF - Broadcasting & Content</title>
        <meta 
          name="description" 
          content="Santos Media produces SCEF's broadcast content including NESA Africa TV, It's In Me Radio, webinars, and educational documentaries." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <Link 
                  to="/divisions" 
                  className="inline-flex items-center gap-2 text-cream/70 hover:text-gold mb-6 transition-colors"
                >
                  ← Back to Divisions
                </Link>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6 ml-4">
                  <Video className="w-4 h-4" />
                  Division
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Santos <span className="text-gradient-gold">Media</span> Division
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  Produces and manages all SCEF-owned media platforms and education storytelling. Separated from OMBDD to protect editorial independence and credibility.
                </p>
              </div>
            </div>
          </section>

          {/* Mandate */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    Our <span className="text-gradient-gold">Mandate</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    Santos Media produces and manages all SCEF-owned media platforms and education storytelling. We create, produce, and distribute institutional-quality educational content across television, radio, and digital platforms—telling Africa's education story to the world.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Separated from OMBDD to protect editorial independence and credibility. From the NESA Africa Awards to educational documentaries, from webinars to podcasts—we operate four distinct media properties serving audiences across 54+ African countries and the global diaspora.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Tv, label: "Television" },
                      { icon: Radio, label: "Radio" },
                      { icon: Film, label: "Documentaries" },
                      { icon: Mic, label: "Podcasts" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                        <item.icon className="w-6 h-6 text-primary" />
                        <span className="font-medium text-foreground">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Video className="w-5 h-5 text-primary" />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-4">
                    {responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-forest mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Channels */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">
                Media <span className="text-gradient-gold">Properties</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Four distinct media platforms reaching millions of viewers, listeners, and participants across Africa and the diaspora.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {channels.map((channel) => (
                  <Link 
                    key={channel.name}
                    to="/media"
                    className="group p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all text-center"
                  >
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <channel.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">{channel.name}</h3>
                    <p className="text-muted-foreground text-sm">{channel.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Who We Serve */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
                Stakeholders We <span className="text-gradient-gold">Serve</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { title: "African Audiences", desc: "Educational, inspirational, and institutional content across all platforms" },
                  { title: "SCEF Programs", desc: "Event coverage, documentaries, promotional content, and brand storytelling" },
                  { title: "Media Partners", desc: "Content licensing, broadcast partnerships, and co-production opportunities" },
                  { title: "Advertisers", desc: "Premium placement across television, radio, and digital properties" },
                ].map((item) => (
                  <div key={item.title} className="text-center p-6 rounded-xl bg-card border border-border">
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Engage with Santos Media
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Explore our media library, partner on content production, or advertise with Africa's leading education media network.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/media">
                    <Play className="w-4 h-4 mr-2" />
                    Visit Media Hub
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Partner With Us</Link>
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

export default SantosMedia;

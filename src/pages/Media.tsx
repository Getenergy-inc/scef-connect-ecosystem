import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Radio, Video, Calendar, Image, ArrowRight, ExternalLink, Users } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { LiveIndicator } from "@/components/ui/live-indicator";
import { useLiveStreamStatus } from "@/hooks/useLiveStreamStatus";
import heroImage from "@/assets/hero-media.jpg";

const mediaChannels = [
  {
    id: "nesa-tv",
    icon: Video,
    title: "NESA Africa TV",
    description: "Watch inspiring documentaries, event coverage, and success stories from across Africa.",
    cta: "Watch Now",
    href: "https://www.youtube.com/@Nesa.africaTV/streams",
    external: true,
    color: "bg-scef-gold/10 text-scef-gold",
    hasLiveIndicator: true,
  },
  {
    id: "radio",
    icon: Radio,
    title: "It's In Me Radio",
    description: "Listen to podcasts and radio shows featuring educators, students, and changemakers.",
    cta: "Listen Now",
    href: "https://www.elibrarynigeria.com.ng",
    external: true,
    color: "bg-scef-blue/10 text-scef-blue",
    hasLiveIndicator: false,
  },
  {
    id: "webinar",
    icon: Calendar,
    title: "EduAid Webinar Series",
    description: "Join live webinars and access recordings on education topics and best practices.",
    cta: "View Schedule",
    href: "https://eduaid.africa",
    external: true,
    color: "bg-scef-gold/10 text-scef-gold",
    hasLiveIndicator: false,
  },
  {
    id: "tourism",
    icon: Play,
    title: "Education Tourism Show",
    description: "Explore educational institutions and learning centers across Africa.",
    cta: "Explore",
    href: "https://nesa.africa",
    external: true,
    color: "bg-scef-blue/10 text-scef-blue",
    hasLiveIndicator: false,
  },
];

const featuredContent = [
  {
    type: "video",
    title: "NESA Awards 2024 Highlights",
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
    duration: "15:30",
  },
  {
    type: "podcast",
    title: "Education Innovation in Nigeria",
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600",
    duration: "45:00",
  },
  {
    type: "video",
    title: "Rebuild My School: Ghana Story",
    thumbnail: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
    duration: "22:15",
  },
];

const Media = () => {
  const liveStatus = useLiveStreamStatus();
  return (
    <>
      <Helmet>
        <title>Santos Media - SCEF | TV, Radio & Educational Content</title>
        <meta 
          name="description" 
          content="Explore SCEF's media hub featuring NESA Africa TV, It's In Me Radio, webinars, and educational content from across Africa." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <OptimizedImage src={heroImage} alt="Santos Media studio" className="absolute inset-0 w-full h-full" imgClassName="opacity-30" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-scef-blue/80 to-scef-blue/95" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 border-2 border-black">
                  <Play className="w-4 h-4" />
                  Santos Media
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Media <span className="text-scef-gold">Hub</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Inspiring stories, educational content, and the voices driving change in African education.
                </p>
              </div>
            </div>
          </section>

          {/* Media Channels */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
                Our <span className="text-scef-gold">Channels</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {mediaChannels.map((channel) => (
                  channel.external ? (
                    <a
                      key={channel.id}
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-card rounded-2xl p-8 border-2 border-black hover:border-scef-blue/30 transition-all duration-500 hover:shadow-lg relative"
                    >
                      {/* Live indicator for NESA TV */}
                      {channel.hasLiveIndicator && liveStatus.isLive && (
                        <div className="absolute top-4 right-4">
                          <LiveIndicator isLive={true} />
                        </div>
                      )}
                      
                      <div className={`w-14 h-14 rounded-xl ${channel.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border-2 border-black`}>
                        <channel.icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-scef-blue transition-colors flex items-center gap-2">
                        {channel.title}
                        <ExternalLink className="w-4 h-4 text-scef-gold" />
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {channel.description}
                      </p>
                      
                      {/* Viewer count when live */}
                      {channel.hasLiveIndicator && liveStatus.isLive && liveStatus.viewerCount && liveStatus.viewerCount > 0 && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Users className="w-4 h-4" />
                          <span>{liveStatus.viewerCount.toLocaleString()} watching now</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-scef-blue font-semibold">
                        {channel.hasLiveIndicator && liveStatus.isLive ? "Watch Live" : channel.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </a>
                  ) : (
                    <Link
                      key={channel.id}
                      to={channel.href}
                      className="group bg-card rounded-2xl p-8 border-2 border-black hover:border-scef-blue/30 transition-all duration-500 hover:shadow-lg"
                    >
                      <div className={`w-14 h-14 rounded-xl ${channel.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border-2 border-black`}>
                        <channel.icon className="w-7 h-7" />
                      </div>
                      <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-scef-blue transition-colors">
                        {channel.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {channel.description}
                      </p>
                      <div className="flex items-center gap-2 text-scef-blue font-semibold">
                        {channel.cta}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </div>
          </section>

          {/* Featured Content */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Featured <span className="text-scef-gold">Content</span>
                  </h2>
                </div>
                <Button variant="outline" className="border-2 border-black" asChild>
                  <a href="https://www.youtube.com/@Nesa.africaTV/streams" target="_blank" rel="noopener noreferrer">
                    <Image className="w-4 h-4" />
                    View Gallery
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {featuredContent.map((content, index) => (
                  <div
                    key={index}
                    className="group relative rounded-2xl overflow-hidden cursor-pointer border-2 border-black"
                  >
                    <OptimizedImage
                      src={content.thumbnail}
                      alt={content.title}
                      className="w-full aspect-video group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-scef-blue/90 via-scef-blue/40 to-transparent" />
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-scef-gold flex items-center justify-center border-2 border-black">
                        <Play className="w-6 h-6 text-scef-blue ml-1" />
                      </div>
                    </div>
                    
                    {/* Content Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="px-2 py-1 rounded bg-scef-gold text-scef-blue text-xs font-semibold mb-2 inline-block">
                        {content.duration}
                      </span>
                      <h3 className="font-display text-lg font-bold text-white">
                        {content.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Submit CTA */}
          <section className="py-20 bg-scef-blue border-t-2 border-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Share Your <span className="text-scef-gold">Story</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Have inspiring content about education in Africa? Submit your videos, podcasts, or stories to be featured on Santos Media.
              </p>
              <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold" asChild>
                <Link to="/contact">
                  <ExternalLink className="w-4 h-4" />
                  Submit Content
                </Link>
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Media;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight, ExternalLink, Volume2, FileText, Image } from "lucide-react";
import { siteContent } from "@/config/siteContent";
import heroImage from "@/assets/hero-education.jpg";

// Digital Board Items (will be replaced by CMS data)
const boardItems = [
  {
    id: 1,
    type: "video",
    title: "NESA-Africa 2025 Nominations Open",
    description: "Submit nominations for Africa's most prestigious education awards.",
    cta: { text: "Submit Nomination", href: "/programs/nesa-africa" },
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600",
  },
  {
    id: 2,
    type: "flyer",
    title: "EduAid Scholarship Applications",
    description: "2025 scholarship cycle now accepting applications.",
    cta: { text: "Apply Now", href: "/programs/eduaid-africa" },
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
  },
  {
    id: 3,
    type: "announcement",
    title: "AEPC Certification Launch",
    description: "Africa Education & Productivity Certification now available.",
    cta: { text: "Learn More", href: "/certifications" },
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
  },
];

const typeIcons = {
  video: Play,
  audio: Volume2,
  announcement: FileText,
  flyer: Image,
};

export const HeroScreenshot = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { hero, digitalBoard } = siteContent;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % boardItems.length);
    }, digitalBoard.rotationSeconds * 1000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = boardItems[activeIndex];
  const TypeIcon = typeIcons[activeItem.type as keyof typeof typeIcons];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="African students in classroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker/95 via-scef-blue-dark/80 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Headline and CTAs */}
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4">
              {hero.headline}
            </h1>
            <p className="text-lg text-white/80 mb-8">
              {hero.subtext}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-bold px-8 py-6 text-base rounded-lg border-2 border-black shadow-lg"
                asChild
              >
                <Link to={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white hover:bg-white/90 text-scef-blue-dark font-bold px-8 py-6 text-base rounded-lg border-2 border-black shadow-lg"
                asChild
              >
                <Link to={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Digital Board Widget */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-black shadow-2xl overflow-hidden">
              {/* Board Header */}
              <div className="bg-scef-blue-darker/80 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-scef-gold animate-pulse" />
                  <span className="text-white text-sm font-semibold">Live Updates</span>
                </div>
                <Link
                  to="/updates"
                  className="text-white/70 hover:text-scef-gold text-xs font-medium transition-colors"
                >
                  View All
                </Link>
              </div>

              {/* Board Content */}
              <div className="relative">
                <img
                  src={activeItem.thumbnail}
                  alt={activeItem.title}
                  className="w-full h-48 object-cover"
                />
                
                {/* Type Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-scef-gold text-scef-blue-dark text-xs font-bold flex items-center gap-1.5 border border-black">
                  <TypeIcon className="w-3 h-3" />
                  {activeItem.type.charAt(0).toUpperCase() + activeItem.type.slice(1)}
                </div>

                {/* Play button for video */}
                {activeItem.type === "video" && (
                  <button className="absolute inset-0 flex items-center justify-center group">
                    <div className="w-14 h-14 rounded-full bg-scef-gold flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border-2 border-black">
                      <Play className="w-5 h-5 text-scef-blue-dark ml-0.5" />
                    </div>
                  </button>
                )}
              </div>

              {/* Text Content */}
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {activeItem.title}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  {activeItem.description}
                </p>
                <Button
                  size="sm"
                  className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold border border-black"
                  asChild
                >
                  <Link to={activeItem.cta.href}>
                    {activeItem.cta.text}
                    <ExternalLink className="w-3 h-3 ml-1.5" />
                  </Link>
                </Button>
              </div>

              {/* Navigation Dots */}
              <div className="px-5 pb-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setActiveIndex((prev) => (prev - 1 + boardItems.length) % boardItems.length)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <div className="flex gap-1.5">
                  {boardItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === activeIndex ? "w-5 bg-scef-gold" : "w-1.5 bg-white/30 hover:bg-white/50"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % boardItems.length)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

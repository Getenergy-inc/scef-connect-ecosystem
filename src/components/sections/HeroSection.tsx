import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Handshake, Globe, Play, ChevronLeft, ChevronRight, ExternalLink, Volume2, FileText, Image } from "lucide-react";
import { useState, useEffect } from "react";
import heroImage from "@/assets/hero-education.jpg";

const boardItems = [
  {
    id: 1,
    type: "video",
    title: "NESA-Africa 2025 Nominations Now Open",
    description: "Submit your nominations for the most prestigious education awards in Africa. Regional rotation hosting begins 2027.",
    cta: { text: "Submit Nomination", href: "/programs/nesa-africa" },
    thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
  },
  {
    id: 2,
    type: "flyer",
    title: "EduAid Scholarship Application",
    description: "Applications for the 2025 scholarship cycle are now open. Don't miss this opportunity!",
    cta: { text: "Apply Now", href: "/programs/eduaid-africa" },
    thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
  },
  {
    id: 3,
    type: "announcement",
    title: "AEPC Certification Program Launch",
    description: "Africa Education & Productivity Certification now available across 10 countries.",
    cta: { text: "Learn More", href: "/certifications" },
    thumbnail: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
  },
  {
    id: 4,
    type: "audio",
    title: "It's In Me Radio: Latest Episode",
    description: "Listen to inspiring stories from educators and students transforming their communities.",
    cta: { text: "Listen Now", href: "/media" },
    thumbnail: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800",
  },
];

const typeIcons = {
  video: Play,
  audio: Volume2,
  announcement: FileText,
  flyer: Image,
};

const typeColors = {
  video: "bg-scef-gold text-scef-blue-dark",
  audio: "bg-primary text-primary-foreground",
  announcement: "bg-primary text-primary-foreground",
  flyer: "bg-scef-gold text-scef-blue-dark",
};

export const HeroSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % boardItems.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeItem = boardItems[activeIndex];
  const TypeIcon = typeIcons[activeItem.type as keyof typeof typeIcons];

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background with SCEF Blue */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="African students engaged in education"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-scef-blue/90 via-scef-blue/85 to-scef-blue-dark/95" />
      </div>

      {/* Subtle Gold Accent Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-scef-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-scef-gold/5 rounded-full blur-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-scef-gold animate-pulse" />
            Aligned to UN SDG 4, 5, 10, 17 & AU Agenda 2063
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-semibold text-white mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Santos Creations{" "}
            <span className="text-scef-gold">
              Educational Foundation
            </span>
          </h1>

          {/* Subheadline */}
          <p className="font-body text-lg md:text-xl text-white/85 max-w-4xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Institutional platform governing pan-African education delivery, certifications, and local chapters since 1997. Aligned with UN SDGs 4,5,10,17 and AU Agenda 2063.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold px-8 py-6 text-base gap-2 shadow-lg hover:shadow-xl transition-all border-2 border-black"
              asChild
            >
              <Link to="/membership">
                <Users className="w-5 h-5" />
                Join as Member
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold px-8 py-6 text-base gap-2 shadow-lg hover:shadow-xl transition-all border-2 border-black"
              asChild
            >
              <Link to="/local-chapters">
                <Globe className="w-5 h-5" />
                Establish Local Chapter
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white/30 bg-white/5 text-white hover:bg-white hover:text-scef-blue-dark font-semibold px-8 py-6 text-base gap-2 backdrop-blur-sm transition-all"
              asChild
            >
              <Link to="/partners">
                <Handshake className="w-5 h-5" />
                Partner with SCEF
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Digital Board - Center Hero Area */}
      <div className="relative z-10 container mx-auto px-4 pb-16">
        <div className="max-w-5xl mx-auto animate-fade-up" style={{ animationDelay: "0.4s" }}>
          {/* Board Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-scef-gold animate-pulse" />
              <span className="text-white/90 text-sm font-semibold tracking-wide uppercase">Live Updates</span>
            </div>
            <Link to="/updates" className="text-white/70 hover:text-scef-gold text-sm font-medium flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Board Content */}
          <div className="relative rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border-2 border-black shadow-2xl">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative aspect-video lg:aspect-auto lg:min-h-[280px]">
                <img
                  src={activeItem.thumbnail}
                  alt={activeItem.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-dark/80 to-transparent lg:bg-gradient-to-t" />
                
                {/* Type Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full ${typeColors[activeItem.type as keyof typeof typeColors]} text-xs font-semibold flex items-center gap-2 border border-black`}>
                  <TypeIcon className="w-3 h-3" />
                  {activeItem.type.charAt(0).toUpperCase() + activeItem.type.slice(1)}
                </div>

                {/* Play Button for Video */}
                {activeItem.type === "video" && (
                  <button className="absolute inset-0 flex items-center justify-center group">
                    <div className="w-16 h-16 rounded-full bg-scef-gold flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg border-2 border-black">
                      <Play className="w-6 h-6 text-scef-blue-dark ml-1" />
                    </div>
                  </button>
                )}
              </div>

              {/* Content Side */}
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-3">
                  {activeItem.title}
                </h3>
                <p className="text-white/70 text-sm lg:text-base mb-6 leading-relaxed">
                  {activeItem.description}
                </p>
                <Button 
                  className="self-start bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold border-2 border-black"
                  asChild
                >
                  <Link to={activeItem.cta.href}>
                    {activeItem.cta.text}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + boardItems.length) % boardItems.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              
              <div className="flex gap-2">
                {boardItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-6 bg-scef-gold"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % boardItems.length)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

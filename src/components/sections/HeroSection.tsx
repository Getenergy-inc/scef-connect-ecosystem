import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Handshake, BookOpen, Building2, Play } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="African students engaged in education"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-earth/80 via-earth/70 to-earth/90" />
        <div className="absolute inset-0 bg-african-pattern opacity-30" />
      </div>

      {/* Animated Accent Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-terracotta/20 rounded-full blur-3xl animate-float" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/20 text-cream/90 text-sm mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Pan-African Education Governance Institution
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-bold text-cream mb-6 leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Governing Africa's{" "}
            <span className="text-gradient-gold">
              Education Future
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-cream/80 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            A pan-African, membership-driven institution governing, funding, certifying, and scaling education programs across Africa and the diaspora.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/membership">
                <Users className="w-5 h-5" />
                Join SCEF
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/partners">
                <Handshake className="w-5 h-5" />
                Partner With Us
              </Link>
            </Button>
          </div>

          {/* Secondary CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <Button variant="ghost" size="lg" className="text-cream/80 hover:text-cream hover:bg-cream/10" asChild>
              <Link to="/programs">
                <BookOpen className="w-4 h-4" />
                Explore Programs
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="text-cream/80 hover:text-cream hover:bg-cream/10" asChild>
              <Link to="/governance">
                <Building2 className="w-4 h-4" />
                View Governance
              </Link>
            </Button>
          </div>

          {/* Video Button */}
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <button className="group inline-flex items-center gap-4 text-cream/80 hover:text-gold transition-colors">
              <span className="w-16 h-16 rounded-full bg-cream/10 backdrop-blur-sm border border-cream/30 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                <Play className="w-6 h-6 text-cream group-hover:text-earth ml-1" />
              </span>
              <span className="text-sm font-medium">Watch Our Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-cream/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-cream/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

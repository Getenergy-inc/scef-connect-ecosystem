import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Handshake, Building2, Play, Globe } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32">
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
          <p className="font-body text-lg md:text-xl text-white/85 max-w-4xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Institutional platform governing pan-African education delivery, certifications, and local chapters since 1997. We establish governance frameworks, enforce compliance standards, and facilitate partnerships across Africa and the diaspora.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
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

          {/* Secondary CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-up" style={{ animationDelay: "0.35s" }}>
            <Button variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
              <Link to="/programs">
                Explore Programs
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="text-white/80 hover:text-white hover:bg-white/10" asChild>
              <Link to="/governance">
                <Building2 className="w-4 h-4" />
                View Governance
              </Link>
            </Button>
          </div>

          {/* Video Button */}
          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <button className="group inline-flex items-center gap-4 text-white/80 hover:text-scef-gold transition-colors">
              <span className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-scef-gold group-hover:border-scef-gold transition-all duration-300">
                <Play className="w-6 h-6 text-white group-hover:text-scef-blue-dark ml-1" />
              </span>
              <span className="text-sm font-semibold tracking-wide">Watch Our Story</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

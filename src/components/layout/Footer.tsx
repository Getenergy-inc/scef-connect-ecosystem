import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, BookOpen, Heart, ExternalLink } from "lucide-react";

const projectLinks = [
  { name: "NESA.africa", href: "https://nesa.africa" },
  { name: "EduAid.africa", href: "https://eduaid.africa" },
  { name: "eLibraryNigeria.com.ng", href: "https://www.elibrarynigeria.com.ng" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About SCEF", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Chapters", href: "/chapters" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "YouTube", href: "#", icon: Youtube },
];

export const Footer = () => {
  return (
    <footer className="bg-scef-blue text-white">
      {/* Program Logos Banner */}
      <div className="bg-scef-blue-dark border-b border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            <img 
              src="/assets/scef-logo.jpg" 
              alt="SCEF Logo" 
              className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
            />
            <img 
              src="/assets/nesa-africa-logo.jpg" 
              alt="NESA Africa Logo" 
              className="h-16 md:h-20 w-auto object-contain drop-shadow-lg rounded-full"
            />
            <img 
              src="/assets/eduaid-africa-logo.jpg" 
              alt="EduAid Africa Logo" 
              className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-scef-gold">
          Santos Creations Educational Foundation
        </h2>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {/* Location & Phone */}
          <div className="space-y-2">
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">Contact Info</h4>
            <p className="flex items-center justify-center sm:justify-start gap-2 text-white/90">
              <MapPin className="w-4 h-4 text-scef-gold" />
              Lagos, Nigeria
            </p>
            <p className="flex items-center justify-center sm:justify-start gap-2 text-white/70 text-sm">
              <Phone className="w-4 h-4 text-scef-gold" />
              +234 8056677770
            </p>
            <a href="mailto:info@santoscreations.org" className="flex items-center justify-center sm:justify-start gap-2 text-white/70 text-sm hover:text-scef-gold transition-colors">
              <Mail className="w-4 h-4 text-scef-gold" />
              info@santoscreations.org
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-white/70 hover:text-scef-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* External Platforms */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">Our Platforms</h4>
            <ul className="space-y-2">
              {projectLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-scef-gold transition-colors"
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tagline */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">Our Mission</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              Governing Africa's Education Future through advocacy, funding, and certification of educational excellence across the continent.
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-scef-gold hover:text-scef-blue transition-all duration-300"
              aria-label={social.name}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-white/50 text-center font-body">
            © 2026 Santos Creations Educational Foundation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

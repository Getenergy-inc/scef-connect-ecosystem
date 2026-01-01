import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, BookOpen, Heart } from "lucide-react";

const projectLinks = [
  { name: "NESA.africa", href: "https://nesa.africa" },
  { name: "EduAid.africa", href: "https://eduaid.africa" },
  { name: "eLibraryNigeria", href: "https://elibrarynigeria.org" },
  { name: "Main Site", href: "/" },
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
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-scef-gold">
          Santos Creations Educational Foundation
        </h2>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center sm:text-left">
          {/* Location & Phone */}
          <div className="space-y-2">
            <p className="flex items-center justify-center sm:justify-start gap-2 text-white/90">
              <MapPin className="w-4 h-4 text-scef-gold" />
              Lagos, Nigeria
            </p>
            <p className="text-white/70 text-sm">+234 803 000 0000</p>
            <p className="text-white/70 text-sm">+234 809 000 0000</p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <a href="mailto:info@santoscreations.org" className="flex items-center justify-center sm:justify-start gap-2 text-white/90 hover:text-scef-gold transition-colors">
              <Mail className="w-4 h-4 text-scef-gold" />
              info@santoscreations.org
            </a>
            <a href="mailto:support@santoscreations.org" className="block text-white/70 text-sm hover:text-scef-gold transition-colors pl-6">
              support@santoscreations.org
            </a>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">Projects</h4>
            <ul className="space-y-2">
              {projectLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-white/70 hover:text-scef-gold transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
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

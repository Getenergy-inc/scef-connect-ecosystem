import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, BookOpen, Heart } from "lucide-react";

const footerLinks = {
  about: [
    { name: "About SCEF", href: "/about" },
    { name: "Governance", href: "/governance" },
    { name: "Divisions", href: "/divisions" },
    { name: "Partners", href: "/partners" },
  ],
  programs: [
    { name: "All Programs", href: "/programs" },
    { name: "Certifications", href: "/certifications" },
    { name: "Media Hub", href: "/media" },
    { name: "eLibrary Nigeria", href: "/programs" },
  ],
  getInvolved: [
    { name: "Join SCEF", href: "/membership" },
    { name: "Local Chapters", href: "/chapters" },
    { name: "Volunteer", href: "/get-involved" },
    { name: "Donate", href: "/donate" },
  ],
  resources: [
    { name: "GFA Wallet", href: "/wallet" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact Us", href: "/contact" },
    { name: "Login", href: "/auth" },
  ],
};

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
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Build Africa's Education Future With Us
            </h3>
            <p className="text-white/70 font-body mb-6">
              Subscribe to our newsletter for the latest updates on programs, events, and impact stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-scef-gold transition-colors font-body"
              />
              <button className="px-6 py-3 bg-scef-gold hover:bg-scef-gold-light text-scef-blue font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-scef-gold flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-scef-blue" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-scef-gold">SCEF</span>
                <span className="text-xs text-white/60 font-body">Santos Creations Educational Foundation</span>
              </div>
            </Link>
            <p className="text-white/70 text-sm mb-6 leading-relaxed font-body">
              A pan-African, membership-driven institution governing, funding, certifying, and scaling education programs across Africa and the diaspora.
            </p>
            <div className="space-y-3 text-sm font-body">
              <a href="mailto:info@scef.org" className="flex items-center gap-3 text-white/70 hover:text-scef-gold transition-colors">
                <Mail className="w-4 h-4" />
                info@scef.org
              </a>
              <a href="tel:+234000000000" className="flex items-center gap-3 text-white/70 hover:text-scef-gold transition-colors">
                <Phone className="w-4 h-4" />
                +234 000 000 0000
              </a>
              <p className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4" />
                Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-scef-gold">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-white/70 hover:text-scef-gold transition-colors font-body">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-scef-gold">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-white/70 hover:text-scef-gold transition-colors font-body">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-scef-gold">Get Involved</h4>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-white/70 hover:text-scef-gold transition-colors font-body">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-scef-gold">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-white/70 hover:text-scef-gold transition-colors font-body">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
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
            <p className="text-sm text-white/50 flex items-center gap-2 font-body">
              © {new Date().getFullYear()} Santos Creations Educational Foundation. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-white/50 font-body">
              <Link to="/privacy" className="hover:text-scef-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-scef-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

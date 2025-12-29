import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, BookOpen, Heart } from "lucide-react";

const footerLinks = {
  about: [
    { name: "Our Story", href: "/about/history" },
    { name: "Vision & Mission", href: "/about/vision" },
    { name: "Governance", href: "/about/governance" },
    { name: "Partners", href: "/partnerships" },
  ],
  programs: [
    { name: "NESA-Africa", href: "/programs/nesa-africa" },
    { name: "EduAid-Africa", href: "/programs/eduaid-africa" },
    { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
    { name: "Women & Girls Education", href: "/programs/women-girls-education" },
  ],
  getInvolved: [
    { name: "Become a Member", href: "/membership" },
    { name: "Ambassador Program", href: "/get-involved/ambassador" },
    { name: "Volunteer", href: "/get-involved/volunteer" },
    { name: "Local Chapters", href: "/local-chapters" },
  ],
  resources: [
    { name: "Media Hub", href: "/media" },
    { name: "Events", href: "/events" },
    { name: "Resources", href: "/resources" },
    { name: "Contact Us", href: "/contact" },
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
    <footer className="bg-earth text-cream">
      {/* Newsletter Section */}
      <div className="border-b border-cream/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with SCEF
            </h3>
            <p className="text-cream/70 mb-6">
              Subscribe to our newsletter for the latest updates on our programs, events, and impact stories.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-cream/10 border border-cream/20 text-cream placeholder:text-cream/50 focus:outline-none focus:border-gold transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-earth font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105">
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
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-earth" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl">SCEF</span>
                <span className="text-xs text-cream/60">Santos Creations Educational Foundation</span>
              </div>
            </Link>
            <p className="text-cream/70 text-sm mb-6 leading-relaxed">
              Transforming education and building sustainable futures across Africa through advocacy, scholarships, and community empowerment.
            </p>
            <div className="space-y-3 text-sm">
              <a href="mailto:info@scef.org" className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors">
                <Mail className="w-4 h-4" />
                info@scef.org
              </a>
              <a href="tel:+234000000000" className="flex items-center gap-3 text-cream/70 hover:text-gold transition-colors">
                <Phone className="w-4 h-4" />
                +234 000 000 0000
              </a>
              <p className="flex items-center gap-3 text-cream/70">
                <MapPin className="w-4 h-4" />
                Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-gold">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-cream/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-gold">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-cream/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-gold">Get Involved</h4>
            <ul className="space-y-3">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-cream/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-gold">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-cream/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-gold hover:text-earth transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <p className="text-sm text-cream/50 flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-terracotta" /> by SCEF © {new Date().getFullYear()}
            </p>
            <div className="flex items-center gap-4 text-sm text-cream/50">
              <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

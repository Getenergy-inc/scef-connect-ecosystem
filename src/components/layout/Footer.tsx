import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ExternalLink, Briefcase } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import { emailDirectory } from "@/config/emailDirectory";

const projectLinks = [
  { name: "NESA.africa", href: "https://nesa.africa" },
  { name: "EduAid.africa", href: "https://eduaid.africa" },
  { name: "eLibraryNigeria.com.ng", href: "https://www.elibrarynigeria.com.ng" },
];

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "YouTube", href: "#", icon: Youtube },
];

export const Footer = () => {
  const { t, isRTL } = useLocale();

  const quickLinks = [
    { name: t("nav.top.about"), href: "/about" },
    { name: t("nav.top.work"), href: "/programs" },
    { name: t("nav.top.chapters"), href: "/chapters" },
    { name: t("nav.top.getInvolved"), href: "/get-involved" },
    { name: t("footer.columns.contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-scef-blue text-white" dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-scef-gold">
          Santos Creations Educational Foundation
        </h2>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8",
          isRTL ? "text-right" : "text-center sm:text-left"
        )}>
          {/* Location & Contact */}
          <div className="space-y-2">
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">
              {t("footer.columns.contact")}
            </h4>
            <p className={cn(
              "flex items-center gap-2 text-white/90",
              isRTL ? "justify-end sm:justify-start flex-row-reverse" : "justify-center sm:justify-start"
            )}>
              <MapPin className="w-4 h-4 text-scef-gold" />
              {t("footer.location")}
            </p>
            <p className={cn(
              "flex items-center gap-2 text-white/70 text-sm",
              isRTL ? "justify-end sm:justify-start flex-row-reverse" : "justify-center sm:justify-start"
            )}>
              <Phone className="w-4 h-4 text-scef-gold" />
              +234 8056677770
            </p>
            <a 
              href={`mailto:${emailDirectory.info}`}
              className={cn(
                "flex items-center gap-2 text-white/70 text-sm hover:text-scef-gold transition-colors",
                isRTL ? "justify-end sm:justify-start flex-row-reverse" : "justify-center sm:justify-start"
              )}
            >
              <Mail className="w-4 h-4 text-scef-gold" />
              {emailDirectory.info}
            </a>
            <a 
              href={`mailto:${emailDirectory.partnership}`}
              className={cn(
                "flex items-center gap-2 text-white/70 text-sm hover:text-scef-gold transition-colors",
                isRTL ? "justify-end sm:justify-start flex-row-reverse" : "justify-center sm:justify-start"
              )}
            >
              <Mail className="w-4 h-4 text-scef-gold" />
              {emailDirectory.partnership}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">
              {t("footer.columns.programs")}
            </h4>
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
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">
              {t("footer.columns.media")}
            </h4>
            <ul className="space-y-2">
              {projectLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 text-sm text-white/70 hover:text-scef-gold transition-colors",
                      isRTL && "flex-row-reverse"
                    )}
                  >
                    {link.name}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">
              {t("footer.columns.getInvolved")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/membership" className="text-sm text-white/70 hover:text-scef-gold transition-colors">
                  {t("nav.dropdown.getInvolved.member")}
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-sm text-white/70 hover:text-scef-gold transition-colors">
                  {t("nav.dropdown.getInvolved.ambassador")}
                </Link>
              </li>
              <li>
                <Link to="/vacancies" className="text-sm text-white/70 hover:text-scef-gold transition-colors flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  Join Our Team
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-sm text-white/70 hover:text-scef-gold transition-colors">
                  {t("nav.dropdown.getInvolved.donate")}
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-sm text-white/70 hover:text-scef-gold transition-colors">
                  {t("nav.dropdown.getInvolved.csr")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Email Directory */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-3 text-scef-gold">
              Email Us
            </h4>
            <ul className="space-y-1">
              <li>
                <a href={`mailto:${emailDirectory.membership}`} className="text-xs text-white/60 hover:text-scef-gold transition-colors">
                  Membership
                </a>
              </li>
              <li>
                <a href={`mailto:${emailDirectory.volunteer}`} className="text-xs text-white/60 hover:text-scef-gold transition-colors">
                  Volunteer
                </a>
              </li>
              <li>
                <a href={`mailto:${emailDirectory.internship}`} className="text-xs text-white/60 hover:text-scef-gold transition-colors">
                  Internship
                </a>
              </li>
              <li>
                <a href={`mailto:${emailDirectory.hr}`} className="text-xs text-white/60 hover:text-scef-gold transition-colors">
                  Careers (HR)
                </a>
              </li>
              <li>
                <a href={`mailto:${emailDirectory.certificate}`} className="text-xs text-white/60 hover:text-scef-gold transition-colors">
                  Certifications
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="container mx-auto px-4 py-6">
        <p className="text-center text-sm text-white/50 mb-4">{t("footer.social.label")}</p>
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

      {/* Legal Links */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
            <Link to="/privacy" className="hover:text-scef-gold transition-colors">
              {t("footer.legal.privacy")}
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-scef-gold transition-colors">
              {t("footer.legal.terms")}
            </Link>
            <span>|</span>
            <Link to="/accessibility" className="hover:text-scef-gold transition-colors">
              {t("footer.legal.accessibility")}
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-sm text-white/50 text-center font-body">
            © {new Date().getFullYear()} Santos Creations Educational Foundation. {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

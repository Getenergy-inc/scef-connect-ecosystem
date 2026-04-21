import { Link } from "react-router-dom";
import {
  Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin,
  ExternalLink, Heart, ArrowRight,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import { emailDirectory } from "@/config/emailDirectory";
import { Button } from "@/components/ui/button";

const footerColumns = [
  {
    title: "About",
    links: [
      { name: "About SCEF", href: "/about" },
      { name: "Our Work", href: "/programs" },
      { name: "Governance", href: "/governance" },
      { name: "Divisions", href: "/divisions" },
      { name: "Reports", href: "/reports" },
    ],
  },
  {
    title: "Programs",
    links: [
      { name: "EduAid Africa", href: "/programs/eduaid-africa" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
      { name: "Women & Girls Education", href: "/programs/women-girls-education" },
      { name: "Special Needs Education", href: "/programs/special-needs-education" },
      { name: "Education Online Africa", href: "/programs/digital-learning" },
      { name: "eLibrary Nigeria", href: "/programs/elibrary-nigeria" },
      { name: "NESA-Africa (2026–2037)", href: "/programs/nesa-africa" },
    ],
  },
  {
    title: "Chapters",
    links: [
      { name: "Find a Chapter", href: "/local-chapters" },
      { name: "Start a Chapter", href: "/local-chapters#start" },
      { name: "Chapter Directory", href: "/chapters" },
    ],
  },
  {
    title: "Membership",
    links: [
      { name: "Become a Member", href: "/membership" },
      { name: "Member Benefits", href: "/membership#benefits" },
      { name: "Member Directory", href: "/membership#directory" },
      { name: "Become an Ambassador", href: "/get-involved#ambassador" },
      { name: "Volunteer", href: "/get-involved#volunteer" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { name: "Partner With Us", href: "/partners" },
      { name: "Vacancies", href: "/vacancies" },
      { name: "Donate", href: "/donate" },
    ],
  },
  {
    title: "Media",
    links: [
      { name: "Media Hub", href: "/media" },
      { name: "NESA Africa TV", href: "/media/nesa-tv" },
      { name: "NESA Awards TV", href: "/media/nesa-awards-tv" },
      { name: "It's In Me Radio", href: "/media/its-in-me-radio" },
      { name: "EduAid Webinars", href: "/media/eduaid-webinars" },
      { name: "Education Tourism Show", href: "/media/education-tourism-show" },
    ],
  },
];

const externalProjects = [
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

const directoryEmails = [
  { label: "Membership", email: emailDirectory.membership },
  { label: "Volunteer", email: emailDirectory.volunteer },
  { label: "Internship", email: emailDirectory.internship },
  { label: "Careers (HR)", email: emailDirectory.hr },
  { label: "Certifications", email: emailDirectory.certificate },
  { label: "Partnerships", email: emailDirectory.partnership },
];

export const Footer = () => {
  const { t, isRTL } = useLocale();

  return (
    <footer
      className="relative bg-scef-blue-dark text-white overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Subtle gold gradient line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-scef-gold/60 to-transparent" />

      {/* Top CTA band */}
      <div className="relative border-b border-white/5">
        <div className="container mx-auto px-4 py-10 md:py-12">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
                Join the movement
              </p>
              <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight">
                Help us reach <span className="text-scef-gold">every learner</span> across Africa.
              </h2>
              <p className="mt-3 text-white/70 text-sm md:text-base max-w-xl">
                Membership, partnerships and donations power SCEF's pan-African education mission.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button
                asChild
                className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-dark font-semibold shadow-lg"
              >
                <Link to="/donate">
                  <Heart className="w-4 h-4 mr-1.5" />
                  Donate
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/30 text-white hover:bg-white hover:text-scef-blue-dark"
              >
                <Link to="/partners">
                  Partner With Us
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3">
            <Link to="/" className="inline-block group">
              <div className="font-display text-xl font-bold leading-tight group-hover:text-scef-gold transition-colors">
                Santos Creations
              </div>
              <div className="font-display text-xl font-bold text-scef-gold leading-tight">
                Educational Foundation
              </div>
            </Link>
            <p className="mt-4 text-sm text-white/65 leading-relaxed max-w-xs">
              A membership-run Educational Institutionalized NGO advocating Achieving Education for All across African regions.
            </p>

            <ul className="mt-5 space-y-2.5">
              <li className={cn("flex items-start gap-2.5 text-sm text-white/75", isRTL && "flex-row-reverse")}>
                <MapPin className="w-4 h-4 text-scef-gold mt-0.5 shrink-0" />
                <span>19 Godwin Okigbo Street, Surulere, Lagos, Nigeria</span>
              </li>
              <li>
                <a
                  href="tel:+2348056677770"
                  className={cn(
                    "flex items-center gap-2.5 text-sm text-white/75 hover:text-scef-gold transition-colors",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Phone className="w-4 h-4 text-scef-gold shrink-0" />
                  +234 805 667 7770
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${emailDirectory.info}`}
                  className={cn(
                    "flex items-center gap-2.5 text-sm text-white/75 hover:text-scef-gold transition-colors",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Mail className="w-4 h-4 text-scef-gold shrink-0" />
                  {emailDirectory.info}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
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
          ))}

          {/* Email directory + external */}
          <div className="col-span-2 md:col-span-3 lg:col-span-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-4">
              Email Directory
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {directoryEmails.map((item) => (
                <li key={item.label}>
                  <a
                    href={`mailto:${item.email}`}
                    className="text-xs text-white/60 hover:text-scef-gold transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold mt-6 mb-3">
              External Platforms
            </h4>
            <ul className="space-y-2">
              {externalProjects.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-scef-gold transition-colors",
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
        </div>
      </div>

      {/* Social + bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-scef-gold hover:text-scef-blue-dark hover:border-scef-gold transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/55">
              <Link to="/privacy" className="hover:text-scef-gold transition-colors">
                {t("footer.legal.privacy")}
              </Link>
              <Link to="/terms" className="hover:text-scef-gold transition-colors">
                {t("footer.legal.terms")}
              </Link>
              <Link to="/accessibility" className="hover:text-scef-gold transition-colors">
                {t("footer.legal.accessibility")}
              </Link>
              <Link to="/contact" className="hover:text-scef-gold transition-colors">
                Contact
              </Link>
            </div>

            <p className="text-xs text-white/50 text-center md:text-right">
              © {new Date().getFullYear()} Santos Creations Educational Foundation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

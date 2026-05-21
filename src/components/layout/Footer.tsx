import { Link } from "react-router-dom";
import {
  Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin,
  MessageCircle,
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import { emailDirectory } from "@/config/emailDirectory";

type ColLink = { name: string; href: string };

const columns: { title: string; links: ColLink[] }[] = [
  {
    title: "About",
    links: [
      { name: "About SCEF", href: "/about" },
      { name: "Mission & Vision", href: "/about#mission" },
      { name: "Governance", href: "/governance" },
      { name: "Management Team", href: "/governance?tier=management" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Programs",
    links: [
      { name: "EduAid-Africa", href: "/programs/eduaid-africa" },
      { name: "NESA-Africa", href: "/programs/nesa-africa" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
      { name: "eLibrary Africa", href: "/programs/elibrary-nigeria" },
      { name: "Send a Child to School", href: "/programs/send-a-child-to-school" },
      { name: "My Career, My Life", href: "/programs/my-career-my-life" },
      { name: "Women & Girls Empowerment", href: "/women-girls-empowerment" },
      { name: "Green Horizon Initiative", href: "/apply/green-horizon" },
    ],
  },
  {
    title: "CSR & Funding",
    links: [
      { name: "CSR Education Funds Management", href: "/csr-education-funds-management" },
      { name: "Sponsor a Program", href: "/sponsorship" },
      { name: "Adopt a School", href: "/programs/rebuild-my-school-africa" },
      { name: "Fund Scholarships", href: "/sponsorship?program=scholarships" },
      { name: "Request Partnership Proposal", href: "/csr-partnership" },
      { name: "Impact Reports", href: "/impact" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { name: "Become a Member", href: "/membership" },
      { name: "Volunteer", href: "/volunteer" },
      { name: "Internship", href: "/internship" },
      { name: "Local Chapters", href: "/local-chapters" },
      { name: "Ambassadors", href: "/ambassadors" },
      { name: "Diaspora Africa", href: "/diaspora-africa" },
      { name: "Friends of Africa", href: "/friends-of-africa" },
      { name: "EduTourism", href: "/edutourism" },
      { name: "Join a Project", href: "/projects" },
    ],
  },
];

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/santoscreations", icon: Facebook },
  { name: "Twitter", href: "https://twitter.com/santoscreations", icon: Twitter },
  { name: "Instagram", href: "https://instagram.com/santoscreations", icon: Instagram },
  { name: "LinkedIn", href: "https://linkedin.com/company/santoscreations", icon: Linkedin },
  { name: "YouTube", href: "https://youtube.com/@santoscreations", icon: Youtube },
];

export const Footer = () => {
  const { t, isRTL } = useLocale();

  return (
    <footer className="bg-scef-blue-darker text-white" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto max-w-7xl px-6 py-14 md:py-16">
        {/* Brand row */}
        <div className="mb-10 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-baseline gap-2">
              <span className="font-display text-lg font-bold text-white tracking-tight">SCEF</span>
              <span className="text-[11px] text-white/55 uppercase tracking-wider">
                Santos Creations Educational Foundation
              </span>
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-white/70">
              SCEF is a membership-based Pan-African NGO and CSR Education Funds Management
              organization advocating for Education for All in Africa.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md border border-white/15 flex items-center justify-center text-white/70 hover:bg-white hover:text-scef-blue-darker hover:border-white transition-colors"
                aria-label={social.name}
              >
                <social.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-white/65 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="mt-10 pt-8 border-t border-white/10 grid gap-4 md:grid-cols-4 text-[13px] text-white/65">
          <div className={cn("flex items-start gap-2", isRTL && "flex-row-reverse")}>
            <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-white/50" />
            <span>19 Godwin Okigbo Street, Surulere, Lagos</span>
          </div>
          <a href="tel:+2348056677770" className={cn("flex items-center gap-2 hover:text-white transition-colors", isRTL && "flex-row-reverse")}>
            <Phone className="w-3.5 h-3.5 shrink-0 text-white/50" />
            +234 805 667 7770
          </a>
          <a href={`mailto:${emailDirectory.info}`} className={cn("flex items-center gap-2 hover:text-white transition-colors", isRTL && "flex-row-reverse")}>
            <Mail className="w-3.5 h-3.5 shrink-0 text-white/50" />
            {emailDirectory.info}
          </a>
          <a href="https://wa.me/2348056677770" target="_blank" rel="noopener noreferrer" className={cn("flex items-center gap-2 hover:text-white transition-colors", isRTL && "flex-row-reverse")}>
            <MessageCircle className="w-3.5 h-3.5 shrink-0 text-white/50" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-white/55 text-center md:text-left">
              © 2026 Santos Creations Educational Foundation. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[12px] text-white/55">
              <Link to="/privacy" className="hover:text-white transition-colors">
                {t("footer.legal.privacy") || "Privacy"}
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                {t("footer.legal.terms") || "Terms"}
              </Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">
                {t("footer.legal.accessibility") || "Accessibility"}
              </Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
              <Link to="/governance" className="hover:text-white transition-colors">Governance</Link>
              <Link to="/resources/verification" className="hover:text-white transition-colors">Verify Certificate</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

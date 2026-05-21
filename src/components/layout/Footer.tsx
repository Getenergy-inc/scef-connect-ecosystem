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
    title: "Explore",
    links: [
      { name: "About", href: "/about" },
      { name: "Programs", href: "/programs" },
      { name: "Impact", href: "/impact" },
      { name: "Timelines", href: "/calendar" },
      { name: "Media", href: "/media" },
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
    ],
  },
  {
    title: "Get Involved",
    links: [
      { name: "Donate", href: "/donate" },
      { name: "Become a Member", href: "/membership" },
      { name: "Sponsor a Program", href: "/support-us" },
      { name: "Adopt a School", href: "/support-us#sponsor-school" },
      { name: "Partner With SCEF", href: "/partner-with-us" },
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
    <footer
      className="bg-scef-blue-darker text-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Main footer grid */}
      <div className="container mx-auto max-w-6xl px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-baseline gap-2">
              <span className="font-display text-lg font-bold text-white tracking-tight">
                SCEF
              </span>
              <span className="text-[11px] text-white/55 uppercase tracking-wider">
                Santos Creations Educational Foundation
              </span>
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-white/70 max-w-sm">
              A Pan-African educational foundation advancing education recognition,
              school transformation, and community-led impact across Africa.
            </p>
          </div>

          {/* Columns 2–4: Link lists */}
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

          {/* Column 5: Contact */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5">
              <li className={cn("flex items-start gap-2 text-[13px] text-white/65", isRTL && "flex-row-reverse")}>
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-white/50" />
                <span>19 Godwin Okigbo Street, Surulere, Lagos</span>
              </li>
              <li>
                <a
                  href="tel:+2348056677770"
                  className={cn("flex items-center gap-2 text-[13px] text-white/65 hover:text-white transition-colors", isRTL && "flex-row-reverse")}
                >
                  <Phone className="w-3.5 h-3.5 shrink-0 text-white/50" />
                  +234 805 667 7770
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${emailDirectory.info}`}
                  className={cn("flex items-center gap-2 text-[13px] text-white/65 hover:text-white transition-colors", isRTL && "flex-row-reverse")}
                >
                  <Mail className="w-3.5 h-3.5 shrink-0 text-white/50" />
                  {emailDirectory.info}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2348056677770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("flex items-center gap-2 text-[13px] text-white/65 hover:text-white transition-colors", isRTL && "flex-row-reverse")}
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0 text-white/50" />
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-5 flex items-center gap-1.5">
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
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto max-w-6xl px-6 py-5">
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
              <Link to="/sitemap" className="hover:text-white transition-colors">
                Sitemap
              </Link>
              <Link to="/governance" className="hover:text-white transition-colors">
                Governance
              </Link>
              <Link to="/resources/verification" className="hover:text-white transition-colors">
                Verify Certificate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

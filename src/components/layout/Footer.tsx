import { Link } from "react-router-dom";
import {
  Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin,
  MessageCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import { emailDirectory } from "@/config/emailDirectory";

interface FooterLogo {
  id: string;
  name: string;
  acronym: string | null;
  logo_url: string;
  website_url: string | null;
}

const FooterLogoStrip = ({
  label,
  items,
}: {
  label: string;
  items: FooterLogo[];
}) => {
  if (items.length === 0) return null;
  return (
    <div className="py-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-scef-gold/90 text-center mb-4">
        {label}
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-7 gap-y-4">
        {items.map((e) => (
          <a
            key={e.id}
            href={e.website_url || "#"}
            target={e.website_url ? "_blank" : undefined}
            rel={e.website_url ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-1.5 group"
            title={e.name}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white border border-white/10 transition-transform group-hover:scale-105">
              <img
                src={e.logo_url}
                alt={e.name}
                className="w-full h-full object-contain p-1"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] font-medium text-white/65 group-hover:text-scef-gold transition-colors text-center max-w-[80px] truncate">
              {e.acronym || e.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

const FooterEndorsements = () => {
  const { t } = useLocale();

  const { data: endorsements = [] } = useQuery({
    queryKey: ["endorsements", "footer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("endorsements")
        .select("id,name,acronym,logo_url,website_url")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as FooterLogo[];
    },
  });

  const { data: crsPartners = [] } = useQuery({
    queryKey: ["crs_partners", "footer"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crs_partners")
        .select("id,name,acronym,logo_url,website_url")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as FooterLogo[];
    },
  });

  if (endorsements.length === 0 && crsPartners.length === 0) return null;

  return (
    <div className="relative border-b border-white/5">
      <div className="container mx-auto px-4 py-2 divide-y divide-white/5">
        <FooterLogoStrip
          label={t("home.endorsedBy.title") || "Endorsed By"}
          items={endorsements}
        />
        <FooterLogoStrip
          label={t("home.crsPartners.title") || "CRS & Operational Partners"}
          items={crsPartners}
        />
      </div>
    </div>
  );
};

type ColLink = { name: string; href: string; external?: boolean };

const columns: { title: string; links: ColLink[] }[] = [
  {
    title: "Explore",
    links: [
      { name: "About SCEF", href: "/about" },
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
      { name: "eLibrary Africa", href: "/programs/elibrary-nigeria" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
      { name: "Send a Child to School", href: "/programs/send-a-child-to-school" },
      { name: "My Career, My Life", href: "/programs/my-career-my-life" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { name: "Become a Member", href: "/membership" },
      { name: "Sponsor a Program", href: "/support-us" },
      { name: "Adopt a School", href: "/support-us#sponsor-school" },
      { name: "Volunteer", href: "/get-involved/volunteer" },
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
      className="relative bg-scef-blue-dark text-white"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Subtle gold gradient line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-scef-gold/50 to-transparent" />

      {/* Endorsed By strip */}
      <FooterEndorsements />

      {/* Main footer grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="inline-flex items-baseline gap-2 group">
              <span className="font-display text-xl font-bold text-white group-hover:text-scef-gold transition-colors tracking-tight">
                SCEF
              </span>
              <span className="text-[11px] text-white/55 uppercase tracking-wider">
                Santos Creations Educational Foundation
              </span>
            </Link>
            <p className="mt-4 text-[13px] text-white/65 leading-relaxed max-w-xs">
              A membership-run pan-African educational foundation advancing Education for All across Africa.
            </p>

            <ul className="mt-5 space-y-2.5">
              <li className={cn("flex items-start gap-2.5 text-[13px] text-white/70", isRTL && "flex-row-reverse")}>
                <MapPin className="w-3.5 h-3.5 text-scef-gold mt-0.5 shrink-0" />
                <span>19 Godwin Okigbo Street, Surulere, Lagos, Nigeria</span>
              </li>
              <li>
                <a
                  href="tel:+2348056677770"
                  className={cn(
                    "flex items-center gap-2.5 text-[13px] text-white/70 hover:text-scef-gold transition-colors",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Phone className="w-3.5 h-3.5 text-scef-gold shrink-0" />
                  +234 805 667 7770
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${emailDirectory.info}`}
                  className={cn(
                    "flex items-center gap-2.5 text-[13px] text-white/70 hover:text-scef-gold transition-colors",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <Mail className="w-3.5 h-3.5 text-scef-gold shrink-0" />
                  {emailDirectory.info}
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/2348056677770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2.5 text-[13px] text-white/70 hover:text-scef-gold transition-colors",
                    isRTL && "flex-row-reverse"
                  )}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-scef-gold shrink-0" />
                  WhatsApp
                </a>
              </li>
            </ul>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-scef-gold hover:text-scef-blue-dark hover:border-scef-gold transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns 2–4: Link lists */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold/90 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-white/65 hover:text-scef-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-[12px] text-white/55 text-center md:text-left">
              © 2026 Santos Creations Educational Foundation. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[12px] text-white/55">
              <Link to="/privacy" className="hover:text-scef-gold transition-colors">
                {t("footer.legal.privacy") || "Privacy"}
              </Link>
              <Link to="/terms" className="hover:text-scef-gold transition-colors">
                {t("footer.legal.terms") || "Terms"}
              </Link>
              <Link to="/accessibility" className="hover:text-scef-gold transition-colors">
                {t("footer.legal.accessibility") || "Accessibility"}
              </Link>
              <Link to="/sitemap" className="hover:text-scef-gold transition-colors">
                Sitemap
              </Link>
              <Link to="/governance" className="hover:text-scef-gold transition-colors">
                Governance
              </Link>
              <Link to="/resources/verification" className="hover:text-scef-gold transition-colors">
                Verify Certificate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

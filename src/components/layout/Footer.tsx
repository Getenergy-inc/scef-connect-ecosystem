import { Link } from "react-router-dom";
import {
  Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin,
  ExternalLink, Heart, ArrowRight,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";
import { emailDirectory } from "@/config/emailDirectory";
import { Button } from "@/components/ui/button";

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
    <div className="py-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold text-center mb-5">
        {label}
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-5">
        {items.map((e) => (
          <a
            key={e.id}
            href={e.website_url || "#"}
            target={e.website_url ? "_blank" : undefined}
            rel={e.website_url ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center gap-1.5 group"
            title={e.name}
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow border border-white/10 transition-transform group-hover:scale-105">
              <img
                src={e.logo_url}
                alt={e.name}
                className="w-full h-full object-contain p-1"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] font-medium text-white/70 group-hover:text-scef-gold transition-colors text-center max-w-[90px] truncate">
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
      <div className="container mx-auto px-4 py-4 divide-y divide-white/5">
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


const footerColumns = [
  {
    title: "About SCEF",
    links: [
      { name: "Who We Are", href: "/about" },
      { name: "Vision 2037", href: "/about/vision-2037" },
      { name: "History", href: "/about/history" },
      { name: "Governance", href: "/governance" },
      { name: "Impact & Reports", href: "/reports" },
    ],
  },
  {
    title: "Programs",
    links: [
      { name: "EduAid-Africa", href: "/programs/eduaid-africa" },
      { name: "NESA-Africa", href: "/programs/nesa-africa" },
      { name: "Education Online Africa", href: "/programs/digital-learning" },
      { name: "eLibrary Africa / Nigeria", href: "/programs/elibrary-nigeria" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
      { name: "Send a Child to School", href: "/programs/send-a-child-to-school" },
      { name: "My Career, My Life", href: "/programs/my-career-my-life" },
    ],
  },
  {
    title: "Advocacy & Training",
    links: [
      { name: "Monthly Advocacy Services", href: "/advocacy/monthly" },
      { name: "Monthly Webinar Calendar", href: "/calendar" },
      { name: "Teacher Training", href: "/programs/training-development" },
      { name: "School Leadership", href: "/advocacy/school-leadership" },
      { name: "Health Education", href: "/advocacy/health-education" },
      { name: "ESG & Environment", href: "/advocacy/esg" },
      { name: "Teacher Wellbeing", href: "/advocacy/teacher-wellbeing" },
    ],
  },
  {
    title: "Membership",
    links: [
      { name: "Become a Member", href: "/membership" },
      { name: "Ambassador Program", href: "/get-involved/ambassador" },
      { name: "Volunteer", href: "/get-involved/volunteer" },
      { name: "Internships", href: "/get-involved/internships" },
      { name: "Referral & Rewards", href: "/get-involved/referral-rewards" },
    ],
  },
  {
    title: "Local Chapters",
    links: [
      { name: "About Local Chapters", href: "/local-chapters" },
      { name: "Start a Chapter", href: "/chapters/start" },
      { name: "Country Chapters", href: "/chapters" },
      { name: "Join a Chapter", href: "/chapters/join-online" },
    ],
  },
  {
    title: "Partner With Us",
    links: [
      { name: "CSR Partnerships", href: "/partner-with-us#csr" },
      { name: "Sponsor a School", href: "/support-us#sponsor-school" },
      { name: "Sponsor NESA-Africa", href: "/support-us#sponsor-nesa" },
      { name: "Bid to Host Next Event", href: "/support-us/bid-to-host" },
      { name: "Strategic Partner", href: "/partner-with-us#strategic" },
    ],
  },
  {
    title: "Support / Donate",
    links: [
      { name: "Donate Now", href: "/donate" },
      { name: "Official Bank Accounts", href: "/support-us/bank-accounts" },
      { name: "Buy Merchandise", href: "/support-us/merchandise" },
      { name: "Award Gala Tickets", href: "/support-us/gala-tickets" },
      { name: "All Support Options", href: "/support-us" },
    ],
  },
  {
    title: "News & Media",
    links: [
      { name: "NESA TV", href: "/media/nesa-tv" },
      { name: "It's In Me Radio", href: "/media/its-in-me-radio" },
      { name: "Press Releases", href: "/updates?type=press" },
      { name: "Blog", href: "/updates" },
      { name: "Events", href: "/calendar" },
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

      {/* Endorsed By strip — shows on every page */}
      <FooterEndorsements />

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 lg:gap-8">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
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

          {/* Link columns (6 columns × 1 = 5 cols) — Membership column highlighted */}
          {footerColumns.map((col) => (
            <div key={col.title} className="lg:col-span-1">
              <h4 className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.18em] mb-4",
                col.title === "Membership" ? "text-scef-gold" : "text-scef-gold/90"
              )}>
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
        </div>

        {/* Email directory + external (full width row below) */}
        <div className="mt-12 pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-4">
              Email Directory
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2">
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
          </div>

          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold mb-4">
              External Platforms
            </h4>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
              <Link to="/sitemap" className="hover:text-scef-gold transition-colors">
                Sitemap
              </Link>
              <Link to="/contact" className="hover:text-scef-gold transition-colors">
                Contact
              </Link>
            </div>

            <p className="text-xs text-white/50 text-center md:text-right">
              © 2026 Santos Creations Educational Foundation
            </p>
          </div>
        </div>
      </div>

      {/* Trust block: registration + verifiable identity */}
      <div className="border-t border-scef-gold/30 bg-scef-blue-darker/60">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-scef-gold/15 border border-scef-gold/40 flex items-center justify-center">
                <Heart className="w-4 h-4 text-scef-gold" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-scef-gold font-semibold">
                  Registered Nonprofit Educational Foundation
                </p>
                <p className="text-sm text-white font-semibold">
                  Santos Creations Educational Foundation (SCEF) — Nigeria
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 text-xs text-white/75">
              <div>
                <p className="text-scef-gold/80 uppercase tracking-wider text-[10px]">Reg. No.</p>
                <p className="text-white font-mono">IT-41501</p>
              </div>
              <div>
                <p className="text-scef-gold/80 uppercase tracking-wider text-[10px]">Email</p>
                <a href="mailto:admin@santoscreations.org" className="text-white hover:text-scef-gold">
                  admin@santoscreations.org
                </a>
              </div>
              <div>
                <p className="text-scef-gold/80 uppercase tracking-wider text-[10px]">Address</p>
                <p className="text-white/80">19 Godwin Okigbo St, Surulere, Lagos, NG</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-white/55">
            <Link to="/resources/verification" className="hover:text-scef-gold">Verify a Certificate</Link>
            <span>•</span>
            <Link to="/governance" className="hover:text-scef-gold">Governance</Link>
            <span>•</span>
            <Link to="/reports" className="hover:text-scef-gold">Annual Reports</Link>
            <span>•</span>
            <Link to="/contributors" className="hover:text-scef-gold">Contributors (2007–Present)</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

import {
  Building2, Layers, Award, MapPin, Tv, HeartHandshake,
  Shield, Users, Calendar, Library, BookOpen, FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface SiteMapLink {
  name: string;
  href: string;
  external?: boolean;
}

export interface SiteMapGroup {
  title: string;
  icon: LucideIcon;
  links: SiteMapLink[];
}

export const siteMapGroups: SiteMapGroup[] = [
  {
    title: "About SCEF",
    icon: Building2,
    links: [
      { name: "Home", href: "/" },
      { name: "About Overview", href: "/about" },
      { name: "Our History", href: "/about#history" },
      { name: "Vision 2035", href: "/about#vision" },
      { name: "Governance", href: "/governance" },
      { name: "Our Divisions", href: "/divisions" },
      { name: "Organizational Profile", href: "/resources/organizational-profile" },
      { name: "Reports", href: "/reports" },
      { name: "Case Studies", href: "/case-studies" },
      { name: "Updates", href: "/updates" },
    ],
  },
  {
    title: "Programs",
    icon: Layers,
    links: [
      { name: "All Programs", href: "/programs" },
      { name: "NESA Africa", href: "/programs/nesa-africa" },
      { name: "EduAid Africa", href: "/programs/eduaid-africa" },
      { name: "Rebuild My School Africa", href: "/programs/rebuild-my-school-africa" },
      { name: "Women & Girls Education", href: "/programs/women-girls-education" },
      { name: "Special Needs Education", href: "/programs/special-needs-education" },
      { name: "Education Online Africa", href: "/programs/digital-learning" },
      { name: "eLibrary Nigeria", href: "/programs/elibrary-nigeria" },
      { name: "Inclusion & Access", href: "/programs/inclusion-access" },
    ],
  },
  {
    title: "Divisions",
    icon: Shield,
    links: [
      { name: "Divisions Overview", href: "/divisions" },
      { name: "BGEO — Board & Executive", href: "/divisions/bgeo" },
      { name: "SOBCD — Strategic Ops", href: "/divisions/sobcd" },
      { name: "TDSD — Tech & Digital", href: "/divisions/tdsd" },
      { name: "OMBDD — Membership & Business Dev", href: "/divisions/ombdd" },
      { name: "Santos Media Division", href: "/divisions/santos-media" },
      { name: "LCS — Local Chapters", href: "/divisions/lcs" },
    ],
  },
  {
    title: "Awards (NESA)",
    icon: Award,
    links: [
      { name: "Awards Hub", href: "/awards" },
      { name: "Categories (17)", href: "/categories" },
      { name: "Nigeria Categories", href: "/categories/nigeria" },
      { name: "Platinum Certificate", href: "/awards/platinum" },
      { name: "Africa Education Icon", href: "/awards/icon" },
      { name: "Gold Certificate", href: "/awards/gold" },
      { name: "Blue Garnet Award", href: "/awards/blue-garnet" },
      { name: "NESA Calendar", href: "/calendar" },
      { name: "Nominate", href: "/nominate" },
      { name: "Vote", href: "/vote" },
    ],
  },
  {
    title: "Chapters",
    icon: MapPin,
    links: [
      { name: "Browse Local Chapters", href: "/local-chapters" },
      { name: "Chapter Directory", href: "/chapters" },
      { name: "Join a Chapter Online", href: "/chapters/join-online" },
      { name: "Start a Chapter", href: "/chapters/start" },
    ],
  },
  {
    title: "Media",
    icon: Tv,
    links: [
      { name: "Media Hub", href: "/media" },
      { name: "NESA Africa TV", href: "/media/nesa-tv" },
      { name: "NESA Awards TV", href: "/media/nesa-awards-tv" },
      { name: "Platinum Recognition Show", href: "/media/nesa-awards-tv/platinum" },
      { name: "Africa Icon Show", href: "/media/nesa-awards-tv/africa-icon" },
      { name: "Gold Certificate Awards", href: "/media/nesa-awards-tv/gold-certificate" },
      { name: "Blue Garnet Gala", href: "/media/nesa-awards-tv/blue-garnet-gala" },
      { name: "It's In Me Radio", href: "/media/its-in-me-radio" },
      { name: "EduAid Webinars", href: "/media/eduaid-webinars" },
      { name: "Education Tourism Show", href: "/media/education-tourism-show" },
    ],
  },
  {
    title: "Get Involved",
    icon: HeartHandshake,
    links: [
      { name: "Get Involved Hub", href: "/get-involved" },
      { name: "Become a Member", href: "/membership" },
      { name: "Become an Ambassador", href: "/get-involved/ambassador" },
      { name: "Volunteer", href: "/get-involved#volunteer" },
      { name: "NRC — Nominee Review Council", href: "/get-involved/nrc" },
      { name: "Judge / Jury", href: "/get-involved/judge" },
      { name: "Partner With Us", href: "/partner-with-us" },
      { name: "All Partners", href: "/partners" },
      { name: "Donate", href: "/donate" },
      { name: "Vacancies", href: "/vacancies" },
    ],
  },
  {
    title: "Member Tools",
    icon: Users,
    links: [
      { name: "Sign In", href: "/auth/sign-in" },
      { name: "Sign Up", href: "/auth/sign-up" },
      { name: "Dashboard", href: "/dashboard" },
      { name: "Welcome", href: "/dashboard/welcome" },
      { name: "Profile", href: "/dashboard/profile" },
      { name: "Activity", href: "/dashboard/activity" },
      { name: "Settings", href: "/dashboard/settings" },
      { name: "Messages", href: "/messages" },
      { name: "Decisions & Voting", href: "/decisions" },
      { name: "Wallet", href: "/wallet" },
      { name: "Chapter Inbox", href: "/chapter/inbox" },
    ],
  },
  {
    title: "Portals & Admin",
    icon: Shield,
    links: [
      { name: "Jury Portal", href: "/portal/jury" },
      { name: "NRC Portal", href: "/portal/nrc" },
      { name: "Ambassador Portal", href: "/portal/ambassador" },
      { name: "Chapter Admin Portal", href: "/portal/chapter-admin" },
      { name: "Sponsor Portal", href: "/portal/sponsor" },
      { name: "Admin Dashboard", href: "/admin" },
      { name: "Digital Board Admin", href: "/admin/digital-board" },
      { name: "Endorsements Admin", href: "/admin/endorsements" },
      { name: "CRS Partners Admin", href: "/admin/crs-partners" },
      { name: "Vacancies Admin", href: "/admin/vacancies" },
      { name: "Finance Overview", href: "/admin/finance/overview" },
      { name: "Bank Accounts", href: "/admin/finance/bank-accounts" },
      { name: "Disbursements", href: "/admin/finance/disbursements" },
    ],
  },
  {
    title: "Resources & Help",
    icon: BookOpen,
    links: [
      { name: "Certifications", href: "/certifications" },
      { name: "Contact", href: "/contact" },
      { name: "Help Center", href: "/help" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Use", href: "/terms" },
      { name: "Accessibility", href: "/accessibility" },
    ],
  },
  {
    title: "External Platforms",
    icon: Library,
    links: [
      { name: "NESA.africa", href: "https://nesa.africa", external: true },
      { name: "EduAid.africa", href: "https://eduaid.africa", external: true },
      { name: "eLibraryNigeria.com.ng", href: "https://www.elibrarynigeria.com.ng", external: true },
    ],
  },
];

export const totalPageCount = siteMapGroups.reduce(
  (acc, g) => acc + g.links.filter((l) => !l.external).length,
  0,
);

// Top-level "go to section" entries used by the landing-page quick-jump dropdown
export const quickJumpSections: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "About SCEF", href: "/about", icon: Building2 },
  { label: "Programs", href: "/programs", icon: Layers },
  { label: "Awards", href: "/awards", icon: Award },
  { label: "Chapters", href: "/local-chapters", icon: MapPin },
  { label: "Media", href: "/media", icon: Tv },
  { label: "Get Involved", href: "/get-involved", icon: HeartHandshake },
  { label: "Governance", href: "/governance", icon: Shield },
  { label: "Membership", href: "/membership", icon: Users },
  { label: "Calendar", href: "/calendar", icon: Calendar },
  { label: "Reports", href: "/reports", icon: FileText },
  { label: "All Pages (Sitemap)", href: "/sitemap", icon: Layers },
];

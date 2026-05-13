/**
 * 12 support option cards shown on the homepage.
 *
 * Each card routes to the existing GFA Wallet donate flow (`/donate`) with a
 * `?designation=` query param so the wallet pre-selects the correct fund.
 * No new payment logic — reuses the mandatory GFA Wallet payment layer.
 */

import {
  Award,
  Compass,
  School,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Megaphone,
  Footprints,
  ShoppingBag,
  Ticket,
  Plane,
  Building2,
  type LucideIcon,
} from "lucide-react";

export interface SupportOption {
  id: string;
  title: string;
  purpose: string;
  /** Label for the designated payment account (display only). */
  account: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
}

export const supportOptions: SupportOption[] = [
  {
    id: "sponsor-nesa",
    title: "Sponsor NESA-Africa",
    purpose: "Power continental educator recognition and the Blue Garnet Awards Gala.",
    account: "NESA-Africa Sponsorship Account",
    cta: "Sponsor NESA-Africa",
    href: "/donate?designation=nesa-sponsorship",
    icon: Award,
    featured: true,
  },
  {
    id: "my-career-my-life",
    title: "Support My Career, My Life",
    purpose: "Career discovery and mentorship for African secondary learners.",
    account: "EduAid-Africa Programmes Account",
    cta: "Support This Programme",
    href: "/donate?designation=my-career-my-life",
    icon: Compass,
  },
  {
    id: "rebuild-my-school",
    title: "Rebuild My School Africa",
    purpose: "Restore classrooms, sanitation and safe learning environments.",
    account: "RMSA Infrastructure Account",
    cta: "Fund a School",
    href: "/donate?designation=rebuild-my-school",
    icon: School,
    featured: true,
  },
  {
    id: "send-a-child",
    title: "Send a Child to School",
    purpose: "Sponsor uniforms, books, fees and transport for one learner.",
    account: "EduAid Scholarship Account",
    cta: "Sponsor a Child",
    href: "/donate?designation=send-a-child",
    icon: GraduationCap,
  },
  {
    id: "elibrary",
    title: "Support eLibrary Africa",
    purpose: "Build digital libraries for under-served African schools.",
    account: "eLibrary Programmes Account",
    cta: "Support eLibrary",
    href: "/donate?designation=elibrary",
    icon: BookOpen,
  },
  {
    id: "seminars-webinars",
    title: "Attend Seminars & Webinars",
    purpose: "Register for monthly advocacy, teacher training and webinars.",
    account: "EduAid Training Account",
    cta: "View Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    id: "advocacy-campaign",
    title: "Sponsor Advocacy Campaign",
    purpose: "Underwrite monthly advocacy themes and continental campaigns.",
    account: "Advocacy Campaign Account",
    cta: "Sponsor Campaign",
    href: "/donate?designation=advocacy-campaign",
    icon: Megaphone,
  },
  {
    id: "advocacy-walk",
    title: "Join an Advocacy Walk",
    purpose: "Walk with local chapters in your country for education reform.",
    account: "Local Chapter Activation Account",
    cta: "Find a Walk",
    href: "/chapters",
    icon: Footprints,
  },
  {
    id: "merchandise",
    title: "Buy Merchandise",
    purpose: "Branded SCEF / NESA-Africa apparel — proceeds fund programmes.",
    account: "Merchandise Account",
    cta: "Shop Merchandise",
    href: "/donate?designation=merchandise",
    icon: ShoppingBag,
  },
  {
    id: "gala-ticket",
    title: "Buy Award Gala Ticket",
    purpose: "Reserve your seat at the Blue Garnet Awards Gala on 22 October 2026.",
    account: "Gala Ticketing Account",
    cta: "Buy Gala Ticket",
    href: "/donate?designation=gala-ticket",
    icon: Ticket,
  },
  {
    id: "edu-tourism",
    title: "Join Edu-Tourism",
    purpose: "Sponsored education tours, school visits and chapter immersion.",
    account: "Edu-Tourism Account",
    cta: "Explore Edu-Tourism",
    href: "/media/education-tourism-show",
    icon: Plane,
  },
  {
    id: "bid-host",
    title: "Bid to Host Next Event",
    purpose: "Cities, partners and CSR sponsors — apply to host a future event.",
    account: "Event Hosting Bids Account",
    cta: "Submit a Bid",
    href: "/partner-with-us?type=host",
    icon: Building2,
  },
];

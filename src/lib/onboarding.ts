import { 
  Users, MapPin, Megaphone, HandHeart, Building2, Award, GraduationCap, Briefcase,
  type LucideIcon 
} from "lucide-react";

export type EngagementPath =
  | "member"
  | "chapter"
  | "ambassador"
  | "volunteer"
  | "sponsor"
  | "endorser"
  | "awards"
  | "staff";

export interface PathOption {
  id: EngagementPath;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

export const ENGAGEMENT_PATHS: PathOption[] = [
  {
    id: "member",
    title: "Join as a Member",
    description: "Become part of SCEF's Pan-African education movement.",
    icon: GraduationCap,
    badge: "Most popular",
  },
  {
    id: "chapter",
    title: "Join a Local Chapter",
    description: "Connect with SCEF in your country, region, or city.",
    icon: MapPin,
  },
  {
    id: "ambassador",
    title: "Become an Ambassador",
    description: "Champion SCEF programs in your community.",
    icon: Megaphone,
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Contribute your time and skills to active projects.",
    icon: HandHeart,
  },
  {
    id: "sponsor",
    title: "Partner / Sponsor",
    description: "Fund education impact through CSR and partnerships.",
    icon: Building2,
  },
  {
    id: "endorser",
    title: "Endorse / Institutionally Support",
    description: "Lend institutional credibility to SCEF's mission.",
    icon: Award,
  },
  {
    id: "awards",
    title: "Participate in NESA / Awards",
    description: "Apply, judge, nominate, or sponsor NESA-Africa.",
    icon: Users,
  },
  {
    id: "staff",
    title: "Join as Staff / Internal Team",
    description: "Apply for internal staff access. Approval required.",
    icon: Briefcase,
    badge: "Approval required",
  },
];

export const PATH_NEXT_STEP: Record<EngagementPath, { label: string; href: string }> = {
  member: { label: "Choose your membership tier", href: "/membership" },
  chapter: { label: "Find or start a chapter", href: "/local-chapters" },
  ambassador: { label: "Complete ambassador application", href: "/get-involved/ambassador" },
  volunteer: { label: "Browse volunteer opportunities", href: "/get-involved" },
  sponsor: { label: "Submit your CSR mandate", href: "/csr-funding-intake" },
  endorser: { label: "Submit endorsement details", href: "/partner-with-us" },
  awards: { label: "Explore NESA participation", href: "/awards" },
  staff: { label: "Awaiting admin approval", href: "/dashboard" },
};

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  GraduationCap, Sprout, Wrench, Briefcase, Users, Award,
  HeartHandshake, BookOpen, Plane, Building2, ArrowRight,
} from "lucide-react";

type ApplyCard = {
  title: string;
  label: string;
  description: string;
  href: string;
  cta: string;
  Icon: typeof GraduationCap;
  accent: "navy" | "green" | "gold" | "blue";
};

const cards: ApplyCard[] = [
  { title: "Capacity Training", label: "Teachers · Leaders · Volunteers", description: "Teacher training, school leadership, inclusive education, EdTech, curriculum, safeguarding, M&E and more.", href: "/apply/capacity-training", cta: "Join Capacity Training Waitlist", Icon: GraduationCap, accent: "navy" },
  { title: "Green Horizon Initiative Project", label: "Agriculture · Livelihood · Food Security", description: "Agriculture livelihood, permaculture training and food security pilot — starting in Borno State.", href: "/apply/green-horizon", cta: "Join Green Horizon Waitlist", Icon: Sprout, accent: "green" },
  { title: "Vocational Training Scholarship", label: "Skills · Trades · Enterprise", description: "Scholarships for vocational training across agriculture, ICT, fashion, energy, catering, trades and entrepreneurship.", href: "/apply/vocational-scholarship", cta: "Join Vocational Scholarship Waitlist", Icon: Wrench, accent: "gold" },
  { title: "My Career, My Life", label: "Career Guidance · Mentorship", description: "Youth career guidance, mentorship and project volunteer pathway with SCEF local chapters.", href: "/volunteer/my-career-my-life", cta: "Apply / Volunteer", Icon: Briefcase, accent: "blue" },
  { title: "Local Chapter Membership", label: "Community · Country · Diaspora", description: "Join an SCEF local chapter and contribute to education-impact projects in your community.", href: "/membership", cta: "Become a Member", Icon: Users, accent: "navy" },
  { title: "Ambassador Program", label: "Advocacy · Visibility · Network", description: "Apply to represent SCEF as a chapter, regional, country or thematic ambassador.", href: "/ambassadors", cta: "Apply as Ambassador", Icon: Award, accent: "gold" },
  { title: "Volunteer for a Project", label: "Active Delivery Roles", description: "Support SCEF projects — My Career My Life, RMSA, Women & Girls, Green Horizon, and local chapter activities.", href: "/volunteer", cta: "Volunteer for a Project", Icon: HeartHandshake, accent: "green" },
  { title: "Internship Program", label: "Hands-on Placements", description: "Structured internships across SCEF programs, divisions, media and local chapters.", href: "/internship", cta: "Apply for Internship", Icon: BookOpen, accent: "blue" },
  { title: "EduTourism", label: "Learning Travel · Exchange", description: "Education-focused travel, study tours and African learning experiences.", href: "/edutourism", cta: "Apply for EduTourism", Icon: Plane, accent: "navy" },
  { title: "Sponsorship / Partnership Interest", label: "CSR · Corporate · Foundations", description: "Submit a CSR education funds management, sponsorship or institutional partnership interest.", href: "/csr-partnership", cta: "Request Partnership Proposal", Icon: Building2, accent: "gold" },
];

const accentBar: Record<ApplyCard["accent"], string> = {
  navy: "bg-scef-blue-darker",
  green: "bg-emerald-600",
  gold: "bg-amber-500",
  blue: "bg-sky-600",
};
const accentChip: Record<ApplyCard["accent"], string> = {
  navy: "bg-scef-blue-darker/10 text-scef-blue-darker",
  green: "bg-emerald-50 text-emerald-800",
  gold: "bg-amber-50 text-amber-800",
  blue: "bg-sky-50 text-sky-800",
};

export default function ApplyHub() {
  return (
    <>
      <Helmet>
        <title>Apply for SCEF 2026–2027 Programs | Waitlists & Applications</title>
        <meta
          name="description"
          content="Join the SCEF 2026–2027 waiting list for capacity training, vocational scholarships, Green Horizon agriculture project, local chapter opportunities, volunteer roles, internships, EduTourism, and CSR partnerships."
        />
        <link rel="canonical" href="https://santoscreations.org/apply" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px]" />

        <main>
          <section className="bg-scef-blue-darker text-white">
            <div className="container mx-auto max-w-6xl px-6 md:px-8 py-14 md:py-20">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold">
                2026–2027 Applications & Waitlists
              </p>
              <h1 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl">
                Apply for SCEF 2026–2027 Programs
              </h1>
              <p className="mt-5 max-w-2xl text-[15px] md:text-base leading-relaxed text-white/80">
                Join the waiting list for SCEF capacity trainings, vocational scholarships, agriculture
                livelihood projects, local chapter opportunities, volunteer roles, internships,
                EduTourism, and regional education-impact programs.
              </p>
            </div>
          </section>

          <section className="bg-white py-14 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((c) => (
                  <article
                    key={c.title}
                    className="group relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <span className={`h-1 w-full ${accentBar[c.accent]}`} />
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-start gap-3">
                        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${accentChip[c.accent]}`}>
                          <c.Icon className="h-5 w-5" strokeWidth={1.75} />
                        </div>
                        <div className="flex-1">
                          <span className={`inline-block text-[10.5px] font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded ${accentChip[c.accent]}`}>
                            {c.label}
                          </span>
                          <h2 className="mt-2 font-display text-lg font-bold text-scef-blue-darker leading-tight">
                            {c.title}
                          </h2>
                        </div>
                      </div>
                      <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground flex-1">
                        {c.description}
                      </p>
                      <Button asChild size="sm" className="mt-5 w-full">
                        <Link to={c.href}>
                          {c.cta}
                          <ArrowRight className="ms-1 h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-12 rounded-2xl border border-border bg-muted/40 p-6 md:p-8 text-center">
                <h2 className="font-display text-xl md:text-2xl font-bold text-scef-blue-darker">
                  Looking for CSR or institutional partnership?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
                  SCEF helps companies, foundations and diaspora supporters channel CSR education
                  funds into scholarships, school transformation, and community-led education projects.
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Button asChild>
                    <Link to="/csr-education-funds-management">CSR Education Funds Management</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/csr-partnership">Request Partnership Proposal</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

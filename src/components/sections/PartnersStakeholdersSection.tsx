import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Building2, Heart, Briefcase, GraduationCap, 
  Tv, Users, Globe, UserCircle, BookOpen 
} from "lucide-react";

const stakeholders = [
  {
    icon: Building2,
    title: "Governments",
    description: "Collaborate on policy alignment and chapter establishment for national education governance.",
  },
  {
    icon: Heart,
    title: "Donors & Foundations",
    description: "Fund scalable programs with audited financial oversight via SOBCD.",
  },
  {
    icon: Briefcase,
    title: "Corporations & CSR",
    description: "Partner through OMBDD for sponsorships and revenue-integrated initiatives.",
  },
  {
    icon: GraduationCap,
    title: "Training Institutions & Exam Centres",
    description: "Integrate certifications and digital platforms via TDSD.",
  },
  {
    icon: Tv,
    title: "Media Partners",
    description: "Co-develop content with Santos Media Division.",
  },
  {
    icon: Users,
    title: "Volunteers (incl. NRC)",
    description: "Join via membership portal for program support.",
  },
  {
    icon: UserCircle,
    title: "Members & Ambassadors",
    description: "Access governance roles and productivity tools.",
  },
  {
    icon: Globe,
    title: "Local Chapters",
    description: "Receive LCS support for compliance and operations.",
  },
  {
    icon: BookOpen,
    title: "Learners & Beneficiaries",
    description: "Benefit from certified programs and digital access.",
  },
];

export const PartnersStakeholdersSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
            <Users className="w-4 h-4" />
            Partners & Stakeholders
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Who We <span className="text-scef-gold">Work With</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            SCEF serves a diverse ecosystem of stakeholders, each with clear engagement pathways and accountability structures.
          </p>
        </div>

        {/* Stakeholders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-12">
          {stakeholders.map((stakeholder, index) => (
            <div
              key={stakeholder.title}
              className="group bg-card rounded-xl p-5 border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-scef-blue/10 flex items-center justify-center shrink-0 border border-black group-hover:bg-scef-gold/20 transition-colors">
                  <stakeholder.icon className="w-5 h-5 text-scef-blue" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-foreground mb-1">
                    {stakeholder.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stakeholder.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold" asChild>
            <Link to="/partners">
              Explore Partnerships
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white border-2" asChild>
            <Link to="/membership">
              Join as Member
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

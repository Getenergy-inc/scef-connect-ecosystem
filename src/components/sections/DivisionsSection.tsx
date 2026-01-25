import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Laptop, TrendingUp, Tv, Globe, Building2 } from "lucide-react";

const divisions = [
  {
    code: "BGEO",
    title: "Board Governance & Executive Office",
    description: "Leads institutional governance, executive communications, compliance oversight, and coordination across all boards and the CVO office.",
    icon: Building2,
    href: "/divisions/bgeo",
  },
  {
    code: "SOBCD",
    title: "Strategic Operations & Business Compliance Division",
    description: "Oversees primary business development, marketing, fundraising, grant writing, compliance, and local chapter coordination.",
    icon: Shield,
    href: "/divisions/sobcd",
  },
  {
    code: "TDSD",
    title: "Technology & Digital Services Division",
    description: "Manages websites, mobile apps, APIs, databases, digital wallets, AI tools, ICT training, Education Online Africa, and eLibrary Nigeria.",
    icon: Laptop,
    href: "/divisions/tdsd",
  },
  {
    code: "OMBDD",
    title: "Online Media Business Development Division",
    description: "Drives media content creation, outreach campaigns, and secures media-related partnerships, sponsorships, and revenue streams.",
    icon: TrendingUp,
    href: "/divisions/ombdd",
  },
  {
    code: "Santos Media",
    title: "Santos Media Division",
    description: "Operates NESA Africa TV, It's In Me Radio, EduAid Webinar Series, and EduAid Education Tourism Show.",
    icon: Tv,
    href: "/divisions/santos-media",
  },
  {
    code: "LCS",
    title: "Local Chapter Services",
    description: "Handles chapter onboarding, compliance monitoring, performance tracking, and upgrades from online to physical operations.",
    icon: Globe,
    href: "/divisions/lcs",
  },
];

export const DivisionsSection = () => {
  return (
    <section className="py-24 bg-muted/30 border-y-2 border-black">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
            <Shield className="w-4 h-4" />
            Operational Structure
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Five Operational <span className="text-scef-gold">Divisions</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            SCEF operates through five specialized divisions, each with a clear mandate and accountability framework ensuring coordinated institutional delivery.
          </p>
        </div>

        {/* Divisions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {divisions.map((division, index) => (
            <Link
              key={division.code}
              to={division.href}
              className="group bg-card rounded-2xl p-6 border-2 border-black hover:border-scef-gold hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-scef-blue flex items-center justify-center border-2 border-black group-hover:bg-scef-gold transition-colors">
                  <division.icon className="w-6 h-6 text-scef-gold group-hover:text-scef-blue-dark transition-colors" />
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-scef-gold text-scef-blue border-2 border-black">
                  {division.code}
                </span>
              </div>
              
              <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-scef-blue transition-colors">
                {division.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {division.description}
              </p>
              
              <div className="flex items-center gap-2 text-scef-gold text-sm font-semibold">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white border-2" asChild>
            <Link to="/divisions">
              View All Divisions
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Building2, Globe, CheckCircle } from "lucide-react";

const governanceLayers = [
  {
    icon: Shield,
    title: "Board of Trustees",
    subtitle: "SCEF HQ",
    description: "Fiduciary oversight & institutional integrity",
    count: "7 Members",
    approves: ["Strategic direction", "Budget approval", "Senior appointments"],
    color: "bg-scef-gold/10 text-scef-gold border-scef-gold/30",
    iconBg: "bg-scef-gold text-scef-blue-dark",
  },
  {
    icon: Users,
    title: "Boards of Advisors",
    subtitle: "Programs & Chapters",
    description: "Specialized guidance & accountability",
    count: "5 per Program • 3 per Chapter",
    approves: ["Policy guidance", "Partnership strategy", "Performance review"],
    color: "bg-primary/10 text-primary border-primary/30",
    iconBg: "bg-primary text-primary-foreground",
  },
  {
    icon: Building2,
    title: "Board of Directors",
    subtitle: "Regional Operations",
    description: "Operational governance & performance",
    count: "3 per Region",
    approves: ["Regional budgets", "Chapter approvals", "Program execution"],
    color: "bg-scef-gold/10 text-scef-gold border-scef-gold/30",
    iconBg: "bg-scef-gold text-scef-blue-dark",
  },
  {
    icon: Globe,
    title: "Chapter Presidents",
    subtitle: "Country Leadership",
    description: "Local execution & delivery",
    count: "54+ Countries",
    approves: ["Local programs", "Member activities", "Community outreach"],
    color: "bg-primary/10 text-primary border-primary/30",
    iconBg: "bg-primary text-primary-foreground",
  },
];

export const GovernanceSnapshot = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <Shield className="w-4 h-4" />
            Multi-Layer Governance
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Governed for <span className="text-scef-gold">Trust</span>.{" "}
            Structured for <span className="text-scef-gold">Scale</span>.
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            SCEF's governance ensures fiduciary integrity, operational accountability, and local execution—trusted by governments, donors, and partners across 54+ African nations.
          </p>
        </div>

        {/* Governance Layers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {governanceLayers.map((layer, index) => (
            <div
              key={layer.title}
              className="group bg-card rounded-2xl p-6 border-2 border-black hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${layer.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform border-2 border-black`}>
                <layer.icon className="w-7 h-7" />
              </div>
              
              {/* Title & Subtitle */}
              <h3 className="font-display text-lg font-bold text-foreground mb-1">
                {layer.title}
              </h3>
              <p className="text-sm text-muted-foreground font-medium mb-3">
                {layer.subtitle}
              </p>
              
              {/* Count Badge */}
              <span className={`inline-block px-3 py-1 rounded-full ${layer.color} text-xs font-semibold mb-4 border`}>
                {layer.count}
              </span>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">
                {layer.description}
              </p>
              
              {/* Approves List */}
              <div className="space-y-2">
                {layer.approves.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-scef-gold flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-black hover:bg-primary hover:text-primary-foreground"
            asChild
          >
            <Link to="/governance">
              View Full Governance Framework
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

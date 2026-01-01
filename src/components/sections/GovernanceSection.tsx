import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Building2, Globe } from "lucide-react";

const governanceLayers = [
  {
    icon: Shield,
    title: "Board of Trustees",
    description: "Fiduciary oversight & integrity",
    count: "7 Members",
    color: "bg-gold/10 text-gold border-gold/20",
  },
  {
    icon: Users,
    title: "Boards of Advisors",
    description: "Program & Chapter guidance",
    count: "Expert Panels",
    color: "bg-terracotta/10 text-terracotta border-terracotta/20",
  },
  {
    icon: Building2,
    title: "Regional Directors",
    description: "Operational governance",
    count: "3 Per Region",
    color: "bg-forest/10 text-forest border-forest/20",
  },
  {
    icon: Globe,
    title: "Chapter Presidents",
    description: "Country execution",
    count: "Local Leadership",
    color: "bg-primary/10 text-primary border-primary/20",
  },
];

export const GovernanceSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Shield className="w-4 h-4" />
            Governance
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Governed for <span className="text-gradient-gold">Trust</span>.{" "}
            Structured for <span className="text-gradient-gold">Scale</span>.
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            SCEF's multi-layer governance ensures fiduciary integrity, operational accountability, and local execution—trusted by governments, donors, and partners.
          </p>
        </div>

        {/* Governance Layers */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {governanceLayers.map((layer, index) => (
            <div
              key={layer.title}
              className="group bg-background rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-xl ${layer.color} border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <layer.icon className="w-8 h-8" />
              </div>
              
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {layer.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {layer.description}
              </p>
              <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                {layer.count}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
            <Link to="/governance">
              View Full Governance Framework
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

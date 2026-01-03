import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Users, Building2, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";

const exploreItems = [
  {
    icon: GraduationCap,
    title: "Education Programs",
    description: "Scholarships, certifications, and learning platforms across Africa.",
    href: "/programs",
    color: "bg-scef-gold text-scef-blue-dark",
  },
  {
    icon: Users,
    title: "Local Chapters",
    description: "Join or start a chapter in your country to drive local impact.",
    href: "/local-chapters",
    color: "bg-primary text-primary-foreground",
  },
  {
    icon: Building2,
    title: "Governance",
    description: "Our multi-layer governance ensures accountability and trust.",
    href: "/governance",
    color: "bg-scef-gold text-scef-blue-dark",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    description: "Governments, corporations, and institutions can collaborate with SCEF.",
    href: "/partners",
    color: "bg-primary text-primary-foreground",
  },
];

export const ExploreSection = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-10">
          Explore
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exploreItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group block"
            >
              <div className="bg-card rounded-xl p-6 border-2 border-black hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1 h-full">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4 border border-black group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center text-primary text-sm font-medium">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold border-2 border-black"
            asChild
          >
            <Link to="/about">
              Learn More About SCEF
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

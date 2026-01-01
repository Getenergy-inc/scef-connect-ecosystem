import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Users, Building2, Globe, ArrowRight, CheckCircle2 } from "lucide-react";

const governanceLayers = [
  {
    level: 1,
    title: "Board of Trustees",
    count: "7 Members",
    description: "The highest governing body responsible for fiduciary oversight, institutional integrity, and strategic direction.",
    responsibilities: [
      "Fiduciary oversight and financial integrity",
      "Strategic policy approval",
      "Executive appointment and oversight",
      "Institutional compliance and ethics",
    ],
    icon: Shield,
    color: "gold",
  },
  {
    level: 2,
    title: "Boards of Advisors",
    count: "Program (5 each) & Chapter (3 each)",
    description: "Expert advisory panels providing guidance on program delivery and chapter operations.",
    responsibilities: [
      "Program strategy recommendations",
      "Chapter governance oversight",
      "Technical and domain expertise",
      "Stakeholder representation",
    ],
    icon: Users,
    color: "terracotta",
  },
  {
    level: 3,
    title: "Regional Boards of Directors",
    count: "3 Per Region",
    description: "Operational governance ensuring regional program execution and institutional standards.",
    responsibilities: [
      "Regional program coordination",
      "Operational decision-making",
      "Resource allocation oversight",
      "Performance monitoring",
    ],
    icon: Building2,
    color: "forest",
  },
  {
    level: 4,
    title: "Local Chapter Presidents",
    count: "Country Execution",
    description: "On-ground leadership executing programs and managing community engagement at country level.",
    responsibilities: [
      "Country-level program execution",
      "Community engagement and mobilization",
      "Local partnerships and advocacy",
      "Member services and support",
    ],
    icon: Globe,
    color: "primary",
  },
];

const colorClasses = {
  gold: "bg-gold/10 text-gold border-gold/20",
  terracotta: "bg-terracotta/10 text-terracotta border-terracotta/20",
  forest: "bg-forest/10 text-forest border-forest/20",
  primary: "bg-primary/10 text-primary border-primary/20",
};

const Governance = () => {
  return (
    <>
      <Helmet>
        <title>Governance - SCEF | Institutional Oversight & Accountability</title>
        <meta 
          name="description" 
          content="SCEF's multi-layer governance ensures fiduciary integrity, operational accountability, and local execution—trusted by governments, donors, and partners." 
        />
        <meta name="keywords" content="SCEF governance, education governance Africa, Board of Trustees, institutional oversight" />
        <link rel="canonical" href="https://scef.org/governance" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  <Shield className="w-4 h-4" />
                  Governance
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Governed for <span className="text-gradient-gold">Trust</span>.{" "}
                  Structured for <span className="text-gradient-gold">Scale</span>.
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  SCEF's multi-layer governance ensures fiduciary integrity, operational accountability, and local execution—trusted by governments, donors, and partners.
                </p>
              </div>
            </div>
          </section>

          {/* Governance Philosophy */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Why Governance <span className="text-gradient-gold">Matters</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Africa's education sector has suffered from fragmented initiatives, weak oversight, and short-term project thinking. SCEF's governance model addresses this by providing clear accountability structures, transparent decision-making, and institutional continuity that outlasts individual projects or political cycles.
                </p>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <div className="text-3xl font-display font-bold text-gold mb-2">Trust</div>
                    <p className="text-sm text-muted-foreground">Fiduciary integrity for donors & governments</p>
                  </div>
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <div className="text-3xl font-display font-bold text-terracotta mb-2">Scale</div>
                    <p className="text-sm text-muted-foreground">Continental reach with local execution</p>
                  </div>
                  <div className="bg-background rounded-xl p-6 border border-border">
                    <div className="text-3xl font-display font-bold text-forest mb-2">Continuity</div>
                    <p className="text-sm text-muted-foreground">Institutional permanence beyond projects</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Governance Layers */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Four-Layer <span className="text-gradient-gold">Governance Structure</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Each layer has clear mandates, accountability lines, and operational scope.
                </p>
              </div>

              <div className="space-y-8">
                {governanceLayers.map((layer) => {
                  const colors = colorClasses[layer.color as keyof typeof colorClasses];
                  return (
                    <div
                      key={layer.level}
                      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="grid lg:grid-cols-3 gap-0">
                        {/* Header */}
                        <div className="p-8 lg:p-10 flex items-start gap-6">
                          <div className="flex flex-col items-center">
                            <div className={`w-16 h-16 rounded-xl ${colors} border flex items-center justify-center mb-3`}>
                              <layer.icon className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground">Level {layer.level}</span>
                          </div>
                          <div>
                            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                              {layer.title}
                            </h3>
                            <span className="inline-block px-3 py-1 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                              {layer.count}
                            </span>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border">
                          <p className="text-muted-foreground leading-relaxed">
                            {layer.description}
                          </p>
                        </div>

                        {/* Responsibilities */}
                        <div className="p-8 lg:p-10 bg-muted/30 border-t lg:border-t-0 lg:border-l border-border">
                          <h4 className="font-semibold text-foreground mb-4">Key Responsibilities</h4>
                          <ul className="space-y-2">
                            {layer.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                {resp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-earth">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                Partner with an Accountable <span className="text-gradient-gold">Institution</span>
              </h2>
              <p className="text-cream/70 max-w-2xl mx-auto mb-8">
                Our governance structure provides the transparency and accountability that governments, donors, and corporate partners require.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/partners">
                    Partner With Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/contact">
                    Contact Leadership
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Governance;

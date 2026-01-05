import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, ArrowRight, Users, CheckCircle2, 
  Shield, Briefcase, Scale, Crown
} from "lucide-react";

const responsibilities = [
  "Board of Trustees (BoT) coordination and documentation",
  "Executive office administration",
  "Governance policies, resolutions, and compliance reporting",
  "Institutional integrity, ethics, and record keeping",
  "Liaison between Board, management, and external stakeholders",
];

const BGEO = () => {
  return (
    <>
      <Helmet>
        <title>Board Governance & Executive Office - SCEF</title>
        <meta 
          name="description" 
          content="The apex governance structure of SCEF providing strategic oversight, executive leadership, and organizational coordination across all operations." 
        />
        <meta name="keywords" content="SCEF governance, Board of Trustees, Executive Office, Organization Secretary, institutional leadership" />
        <link rel="canonical" href="https://scef.org/divisions/bgeo" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-primary overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  <Building2 className="w-4 h-4" />
                  BGEO
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Board Governance & <span className="text-gradient-gold">Executive Office</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-4">
                  Provides institutional leadership, fiduciary oversight, and governance coordination across the Foundation. This structure fits global NGO governance standards and donor expectations.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gold/20 text-gold border border-gold/30">
                  <Crown className="w-4 h-4" />
                  <span className="font-semibold">Led by: Organization Secretary</span>
                </div>
              </div>
            </div>
          </section>

          {/* Mandate */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Division <span className="text-gradient-gold">Mandate</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    The Board Governance & Executive Office provides institutional leadership, fiduciary oversight, and governance coordination across the Foundation. This structure fits global NGO governance standards and donor expectations, ensuring strategic direction flows from the Board of Trustees through to operational divisions.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Scale className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Governance Coordination</h4>
                        <p className="text-sm text-muted-foreground">Facilitate effective functioning of all governance bodies including BoT, BoA, and Regional Boards.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                      <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-gold" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Executive Leadership</h4>
                        <p className="text-sm text-muted-foreground">Coordinate executive appointments, performance oversight, and succession planning across divisions.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                      <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
                        <Shield className="w-6 h-6 text-forest" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">Institutional Integrity</h4>
                        <p className="text-sm text-muted-foreground">Ensure compliance with governance frameworks, legal requirements, and fiduciary responsibilities.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-2xl border border-border p-8">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-3">
                    {responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Governance Bodies */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Governance <span className="text-gradient-gold">Bodies</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  BGEO coordinates between multiple governance layers to ensure institutional alignment and accountability.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { title: "Board of Trustees", count: "7 Members", desc: "Fiduciary oversight and strategic direction" },
                  { title: "Boards of Advisors", count: "Programs & Chapters", desc: "Expert guidance and counsel" },
                  { title: "Regional Boards", count: "5 Regions", desc: "Operational governance across Africa" },
                  { title: "Chapter Presidents", count: "54+ Countries", desc: "Country-level execution and delivery" },
                ].map((body, index) => (
                  <div key={index} className="bg-background rounded-xl border border-border p-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-1">{body.count}</div>
                    <h4 className="font-semibold text-foreground mb-2">{body.title}</h4>
                    <p className="text-sm text-muted-foreground">{body.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stakeholders */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Stakeholders <span className="text-gradient-gold">Served</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Building2, title: "Board Members", desc: "Trustees, Advisors, and Directors across all governance levels" },
                  { icon: Briefcase, title: "Division Directors", desc: "Leadership of all five operational divisions" },
                  { icon: Users, title: "External Stakeholders", desc: "Government partners, donors, and institutional collaborators" },
                ].map((stakeholder, index) => (
                  <div key={index} className="bg-card rounded-xl border border-border p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <stakeholder.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{stakeholder.title}</h4>
                    <p className="text-sm text-muted-foreground">{stakeholder.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-earth">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                Partner With <span className="text-gradient-gold">SCEF Leadership</span>
              </h2>
              <p className="text-cream/80 max-w-2xl mx-auto mb-8">
                Engage with our governance and executive leadership on strategic partnerships, institutional collaboration, and high-level stakeholder relations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/partners">
                    Partner With Us
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="border-cream/30 text-cream hover:bg-cream/10" asChild>
                  <Link to="/governance">
                    View Governance Structure
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

export default BGEO;

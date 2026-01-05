import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, Scale, FileText, CheckCircle, 
  ArrowRight, Building, Users, BarChart3 
} from "lucide-react";

const responsibilities = [
  "Operational planning and execution oversight",
  "Compliance with local, regional, and international regulations",
  "Risk management and internal controls",
  "Grant compliance, MoUs, and partnership governance",
  "Monitoring & Evaluation (M&E) coordination",
  "Audit readiness and reporting",
];

const SOBCD = () => {
  return (
    <>
      <Helmet>
        <title>SOBCD - Strategic Operations & Business Compliance | SCEF</title>
        <meta 
          name="description" 
          content="SOBCD oversees SCEF's governance, compliance, finance, and strategic operations ensuring institutional integrity across all programs." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <Link 
                  to="/divisions" 
                  className="inline-flex items-center gap-2 text-cream/70 hover:text-gold mb-6 transition-colors"
                >
                  ← Back to Divisions
                </Link>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6 ml-4">
                  <Shield className="w-4 h-4" />
                  Division
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Strategic Operations & Business <span className="text-gradient-gold">Compliance</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  Ensures SCEF operates legally, ethically, and efficiently across all programs and countries. Critical for grant-makers, embassies, and institutional donors.
                </p>
              </div>
            </div>
          </section>

          {/* Mandate */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    Our <span className="text-gradient-gold">Mandate</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    SOBCD ensures SCEF operates legally, ethically, and efficiently across all programs and countries. We ensure that all programs, chapters, divisions, and initiatives operate within established legal, financial, and ethical standards—maintaining the trust that governments, donors, and partners place in the organization.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    This division is critical for grant-makers, embassies, and institutional donors. We provide the strategic oversight and compliance infrastructure that enables scalable, sustainable growth while maintaining the highest standards of accountability across 54+ African countries and the diaspora.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Scale, label: "Legal Compliance" },
                      { icon: Building, label: "Governance" },
                      { icon: BarChart3, label: "Financial Oversight" },
                      { icon: Users, label: "Board Support" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
                        <item.icon className="w-6 h-6 text-primary" />
                        <span className="font-medium text-foreground">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-card rounded-2xl p-8 border border-border">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Key Responsibilities
                  </h3>
                  <ul className="space-y-4">
                    {responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-forest mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Serve */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
                Stakeholders We <span className="text-gradient-gold">Serve</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { title: "Board of Trustees", desc: "Secretariat support, fiduciary guidance, and governance coordination" },
                  { title: "Program Directors", desc: "Compliance frameworks, reporting standards, and risk protocols" },
                  { title: "Donors & Foundations", desc: "Transparent reporting, audit coordination, and grant compliance" },
                  { title: "Government Partners", desc: "Regulatory adherence, MOU management, and institutional credibility" },
                ].map((item) => (
                  <div key={item.title} className="text-center p-6 rounded-xl bg-background border border-border">
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Engage with SOBCD
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                For governance inquiries, institutional partnerships, compliance consultations, or audit coordination, connect with our division leadership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Contact Us
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/governance">View Governance</Link>
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

export default SOBCD;

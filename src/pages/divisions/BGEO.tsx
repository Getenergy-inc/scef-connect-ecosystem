import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, Users, Building2, ArrowRight, CheckCircle, 
  FileText, Scale, Award, Globe, Star, Heart, Crown
} from "lucide-react";

const executiveRoles = [
  {
    title: "Chief Visionary Officer (CVO)",
    subtitle: "Founder & Strategic Leadership",
    description: "Provides strategic vision, institutional direction, and represents SCEF at the highest levels. Leads long-term planning, stakeholder engagement, and ensures alignment with the foundation's core mission.",
    icon: Crown,
    color: "bg-scef-gold/20 text-scef-gold border-scef-gold/40",
  },
  {
    title: "Organization Secretary / PRO",
    subtitle: "Governance & Communications",
    description: "Manages institutional records, governance compliance, board coordination, and official communications. Ensures regulatory adherence and maintains organizational transparency.",
    icon: FileText,
    color: "bg-scef-blue/20 text-scef-blue border-scef-blue/40",
  },
  {
    title: "Board of Trustees (BOT)",
    subtitle: "Fiduciary Oversight",
    description: "Provides fiduciary oversight, approves constitutional amendments, strategic partnerships, and major financial decisions. Ensures institutional integrity and long-term sustainability.",
    icon: Shield,
    color: "bg-scef-gold/20 text-scef-gold border-scef-gold/40",
  },
  {
    title: "Membership Council",
    subtitle: "Member Advocacy",
    description: "Represents member interests, oversees membership policies, and ensures member voices are heard in governance decisions. Facilitates member engagement and satisfaction.",
    icon: Users,
    color: "bg-scef-blue/20 text-scef-blue border-scef-blue/40",
  },
];

const responsibilities = [
  "Constitutional governance and policy development",
  "Board coordination and executive communications",
  "Compliance oversight and regulatory adherence",
  "Strategic planning and institutional direction",
  "Stakeholder relationship management",
  "Fiduciary oversight and financial accountability",
  "Official records and documentation management",
  "Inter-division coordination and alignment",
  "Institutional representation and advocacy",
  "Governance framework implementation",
];

const governanceBodies = [
  {
    name: "Board of Trustees",
    count: "7 Members",
    role: "Fiduciary oversight, constitutional matters, major approvals",
    icon: Shield,
  },
  {
    name: "Board of Advisors",
    count: "Expert Panels",
    role: "Program guidance, chapter support, specialized expertise",
    icon: Star,
  },
  {
    name: "Board of Directors",
    count: "3 Per Region",
    role: "Regional operational governance and oversight",
    icon: Building2,
  },
  {
    name: "Local Chapter Presidents",
    count: "54+ Countries",
    role: "Country-level execution and community engagement",
    icon: Globe,
  },
];

const BGEO = () => {
  return (
    <>
      <Helmet>
        <title>BGEO - Board Governance & Executive Office | SCEF</title>
        <meta 
          name="description" 
          content="BGEO leads SCEF's institutional governance, executive communications, compliance oversight, and board coordination across all governance layers." 
        />
        <meta name="keywords" content="SCEF governance, BGEO, Board of Trustees, CVO, institutional oversight, education governance Africa" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue-darker overflow-hidden">
            <div className="absolute inset-0 bg-scef-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <Link 
                  to="/divisions" 
                  className="inline-flex items-center gap-2 text-white/70 hover:text-scef-gold mb-6 transition-colors"
                >
                  ← Back to Divisions
                </Link>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 ml-4">
                  <Shield className="w-4 h-4" />
                  Division
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Board Governance & <span className="text-gradient-gold">Executive Office</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Leading institutional governance, executive communications, compliance oversight, and coordination across all boards and the CVO office.
                </p>
              </div>
            </div>
          </section>

          {/* Executive Leadership */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Executive <span className="text-gradient-gold">Leadership</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  SCEF's executive structure ensures strategic direction, governance compliance, and member representation at the highest levels.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {executiveRoles.map((role) => (
                  <div 
                    key={role.title}
                    className="bg-card rounded-2xl border-2 border-border p-8 hover:shadow-lg transition-shadow"
                  >
                    <div className={`w-14 h-14 rounded-xl ${role.color} border flex items-center justify-center mb-5`}>
                      <role.icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-1">
                      {role.title}
                    </h3>
                    <p className="text-sm text-scef-gold font-medium mb-3">
                      {role.subtitle}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mandate */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    Our <span className="text-gradient-gold">Mandate</span>
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    BGEO serves as the institutional backbone of SCEF, ensuring governance integrity, strategic alignment, and operational coherence across all divisions, programs, and chapters.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We coordinate between the Board of Trustees, executive leadership, and operational divisions to maintain institutional standards, regulatory compliance, and stakeholder trust.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Shield, label: "Governance" },
                      { icon: Scale, label: "Compliance" },
                      { icon: FileText, label: "Documentation" },
                      { icon: Award, label: "Accountability" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
                        <item.icon className="w-6 h-6 text-primary" />
                        <span className="font-medium text-foreground">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-background rounded-2xl p-8 border border-border">
                  <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
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

          {/* Governance Bodies */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">
                Governance <span className="text-gradient-gold">Layers</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                SCEF's multi-layer governance ensures fiduciary integrity, operational accountability, and local execution—trusted by governments, donors, and partners.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {governanceBodies.map((body) => (
                  <div key={body.name} className="p-6 rounded-xl bg-card border border-border text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <body.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{body.name}</h3>
                    <span className="inline-block px-3 py-1 rounded-full bg-scef-gold/10 text-scef-gold text-xs font-semibold mb-3">
                      {body.count}
                    </span>
                    <p className="text-muted-foreground text-sm">{body.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Membership Structure */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                  Membership <span className="text-gradient-gold">Structure</span>
                </h2>
                <p className="text-muted-foreground mb-12">
                  SCEF operates as a membership-based institution with tiered participation levels designed to engage diverse stakeholders.
                </p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { name: "General", price: "Free", desc: "Basic access, 18+, limited benefits" },
                    { name: "Youth", price: "Free", desc: "Ages 13-17 with parental consent" },
                    { name: "Standard", price: "$50/yr", desc: "Full access with voting rights" },
                    { name: "Organizational", price: "$200/yr", desc: "For institutions and organizations" },
                    { name: "Lifetime", price: "$1,000", desc: "Permanent membership commitment" },
                    { name: "Ambassador", price: "$100-$300/yr", desc: "Leadership commitment with time requirements" },
                  ].map((tier) => (
                    <div key={tier.name} className="bg-background rounded-xl border border-border p-6">
                      <h3 className="font-display font-bold text-foreground mb-1">{tier.name}</h3>
                      <p className="text-scef-gold font-semibold mb-2">{tier.price}</p>
                      <p className="text-sm text-muted-foreground">{tier.desc}</p>
                    </div>
                  ))}
                </div>
                
                <Button size="lg" className="mt-8" asChild>
                  <Link to="/get-involved/membership">
                    View Membership Options
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Learn More About Our Governance
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Explore our governance framework, meet our leadership, and understand how SCEF maintains institutional integrity across 54+ countries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/governance">
                    <Shield className="w-4 h-4 mr-2" />
                    Full Governance Framework
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact BGEO</Link>
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

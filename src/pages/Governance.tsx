import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Shield, Users, Building2, Globe, ArrowRight, CheckCircle2, 
  Briefcase, Scale, FileText, Mail, Phone
} from "lucide-react";

const governanceLayers = [
  {
    id: "bot",
    level: 1,
    title: "Board of Trustees (BOT)",
    count: "7 Members",
    description: "The highest governing body responsible for fiduciary oversight, institutional integrity, and strategic direction of the Foundation.",
    responsibilities: [
      "Fiduciary oversight and financial integrity",
      "Strategic policy approval and direction",
      "Executive appointment and performance oversight",
      "Institutional compliance and ethics enforcement",
    ],
    icon: Shield,
    color: "gold",
  },
  {
    id: "boa",
    level: 2,
    title: "Boards of Advisors (BOA)",
    count: "Program (5 each) & Chapter (3 each)",
    description: "Expert advisory panels providing specialized guidance on program delivery and chapter operations.",
    responsibilities: [
      "Program strategy recommendations",
      "Chapter governance oversight",
      "Technical and domain expertise",
      "Stakeholder representation and advocacy",
    ],
    icon: Users,
    color: "terracotta",
  },
  {
    id: "bod",
    level: 3,
    title: "Regional Boards of Directors (BOD)",
    count: "3 Per Region",
    description: "Operational governance ensuring regional program execution and adherence to institutional standards.",
    responsibilities: [
      "Regional program coordination",
      "Operational decision-making",
      "Resource allocation oversight",
      "Performance monitoring and reporting",
    ],
    icon: Building2,
    color: "forest",
  },
  {
    id: "lcps",
    level: 4,
    title: "Local Chapter Presidents (LCPs)",
    count: "54+ Countries",
    description: "On-ground leadership executing programs and managing community engagement at country level.",
    responsibilities: [
      "Country-level program execution",
      "Community engagement and mobilization",
      "Local partnerships and advocacy",
      "Member services and grassroots support",
    ],
    icon: Globe,
    color: "primary",
  },
];

const executiveOffice = [
  {
    role: "Organization Secretary",
    mandate: "Legal & Governance",
    description: "Provides institutional leadership, legal counsel, and ensures governance compliance across all SCEF operations.",
    icon: Scale,
  },
  {
    role: "Public Relations Officer (PRO)",
    mandate: "Communications & Stakeholder Relations",
    description: "Manages institutional communications, media relations, and stakeholder engagement strategies.",
    icon: Users,
  },
  {
    role: "Director of Operations",
    mandate: "SOBCD Leadership",
    description: "Oversees strategic operations, business compliance, and institutional risk management.",
    icon: Briefcase,
  },
  {
    role: "Director of Technology",
    mandate: "TDSD Leadership",
    description: "Leads digital infrastructure, platform development, and technology-enabled education delivery.",
    icon: Building2,
  },
  {
    role: "Director of Media Business",
    mandate: "OMBDD Leadership",
    description: "Drives digital growth, sponsorship acquisition, and online brand development.",
    icon: Globe,
  },
  {
    role: "Director of Santos Media",
    mandate: "SMD Leadership",
    description: "Manages broadcasting, content production, and media platform operations.",
    icon: FileText,
  },
  {
    role: "Director of Chapter Services",
    mandate: "LCS Leadership",
    description: "Supports local chapters with onboarding, compliance, and operational guidance.",
    icon: Users,
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
        <title>Governance & Executive Office - SCEF | BGEO Division</title>
        <meta 
          name="description" 
          content="SCEF's Board Governance & Executive Office (BGEO) provides institutional leadership, fiduciary oversight, and strategic direction for pan-African education transformation." 
        />
        <meta name="keywords" content="SCEF governance, BGEO, Board of Trustees, education governance Africa, institutional oversight" />
        <link rel="canonical" href="https://scef.org/governance" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section id="top" className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  <Shield className="w-4 h-4" />
                  BGEO — Board Governance & Executive Office
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Governed for <span className="text-gradient-gold">Trust</span>.{" "}
                  Structured for <span className="text-gradient-gold">Scale</span>.
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-8">
                  The Board Governance & Executive Office (BGEO) is the apex governance division providing institutional leadership, fiduciary oversight, and strategic direction for all SCEF operations across Africa.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#bot" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    Board of Trustees
                  </a>
                  <a href="#boa" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    Board of Advisors
                  </a>
                  <a href="#bod" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    Board of Directors
                  </a>
                  <a href="#lcps" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    Local Chapter Presidents
                  </a>
                  <a href="#management" className="px-4 py-2 bg-cream/10 hover:bg-cream/20 text-cream rounded-lg text-sm font-medium transition-colors">
                    Management Team
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* BGEO Division Overview */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                      BGEO <span className="text-gradient-gold">Division</span>
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The Board Governance & Executive Office serves as the institutional nerve center, coordinating board activities, executive leadership, and ensuring SCEF delivers on its pan-African education mandate with integrity and accountability.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                        <span className="text-foreground">Board coordination and governance</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                        <span className="text-foreground">Executive leadership and direction</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                        <span className="text-foreground">Institutional policy oversight</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                        <span className="text-foreground">Strategic stakeholder engagement</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-background rounded-2xl border border-border p-8">
                    <h3 className="font-display text-xl font-bold text-foreground mb-4">Why Governance Matters</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      Africa's education sector has suffered from fragmented initiatives and weak oversight. SCEF's governance model provides clear accountability, transparent decision-making, and institutional continuity.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-display font-bold text-gold">Trust</div>
                        <p className="text-xs text-muted-foreground">Fiduciary integrity</p>
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold text-terracotta">Scale</div>
                        <p className="text-xs text-muted-foreground">Continental reach</p>
                      </div>
                      <div>
                        <div className="text-2xl font-display font-bold text-forest">Continuity</div>
                        <p className="text-xs text-muted-foreground">Beyond projects</p>
                      </div>
                    </div>
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
                  Each layer has clear mandates, accountability lines, and operational scope ensuring transparent and effective governance.
                </p>
              </div>

              <div className="space-y-8">
                {governanceLayers.map((layer) => {
                  const colors = colorClasses[layer.color as keyof typeof colorClasses];
                  return (
                    <div
                      key={layer.level}
                      id={layer.id}
                      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow scroll-mt-24"
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

          {/* Executive Office / Management Team */}
          <section id="management" className="py-20 bg-card scroll-mt-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Executive <span className="text-gradient-gold">Management Team</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  SCEF's executive leadership oversees the six operational divisions, ensuring coordinated delivery of our pan-African education mandate.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {executiveOffice.map((exec, index) => (
                  <div 
                    key={index}
                    className="bg-background rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <exec.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-1">{exec.role}</h3>
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-gold/10 text-gold mb-3">
                      {exec.mandate}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {exec.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Policies & Documents */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    Policies & <span className="text-gradient-gold">Compliance</span>
                  </h2>
                  <p className="text-muted-foreground">
                    SCEF maintains comprehensive governance policies ensuring transparency, accountability, and ethical operations.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: "Constitution & Bylaws", desc: "Foundational governance document" },
                    { title: "Code of Ethics", desc: "Standards for trustees, staff, and volunteers" },
                    { title: "Financial Policy", desc: "Fiscal management and reporting standards" },
                    { title: "Anti-Corruption Policy", desc: "Zero tolerance for fraud and corruption" },
                    { title: "Conflict of Interest", desc: "Disclosure and management protocols" },
                    { title: "Whistleblower Protection", desc: "Safe reporting mechanisms" },
                  ].map((policy, idx) => (
                    <div key={idx} className="bg-card rounded-xl border border-border p-6 hover:border-primary/30 transition-colors">
                      <FileText className="w-8 h-8 text-gold mb-3" />
                      <h3 className="font-semibold text-foreground mb-1">{policy.title}</h3>
                      <p className="text-sm text-muted-foreground">{policy.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Contact Leadership */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Contact <span className="text-gradient-gold">Leadership</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  For governance inquiries, partnership discussions, or institutional matters, reach our executive office.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
                  <div className="flex items-center justify-center gap-2 text-foreground">
                    <Mail className="w-5 h-5 text-gold" />
                    <span>governance@scef.org</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-foreground">
                    <Phone className="w-5 h-5 text-gold" />
                    <span>+234 (0) 800 SCEF GOV</span>
                  </div>
                </div>
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
                  <Link to="/divisions">
                    View All Divisions
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

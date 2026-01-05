import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Building2, Shield, Laptop, TrendingUp, Tv, Globe, 
  ArrowRight, Users, CheckCircle2
} from "lucide-react";

const divisions = [
  {
    code: "BGEO",
    title: "Board Governance & Executive Office",
    description: "Provides institutional leadership, fiduciary oversight, and governance coordination across the Foundation.",
    mandate: "Provides institutional leadership, fiduciary oversight, and governance coordination across the Foundation.",
    icon: Building2,
    color: "primary",
    responsibilities: [
      "Board of Trustees (BoT) coordination and documentation",
      "Executive office administration",
      "Governance policies, resolutions, and compliance reporting",
      "Institutional integrity, ethics, and record keeping",
      "Liaison between Board, management, and external stakeholders",
    ],
    leader: "Organization Secretary",
    href: "/divisions/bgeo",
  },
  {
    code: "SOBCD",
    title: "Strategic Operations & Business Compliance Division",
    description: "Ensures SCEF operates legally, ethically, and efficiently across all programs and countries.",
    mandate: "Ensures SCEF operates legally, ethically, and efficiently across all programs and countries.",
    icon: Shield,
    color: "gold",
    responsibilities: [
      "Operational planning and execution oversight",
      "Compliance with local, regional, and international regulations",
      "Risk management and internal controls",
      "Grant compliance, MoUs, and partnership governance",
      "Monitoring & Evaluation (M&E) coordination",
      "Audit readiness and reporting",
    ],
    leader: "Director of Operations and Compliance",
    href: "/divisions/sobcd",
  },
  {
    code: "TDSD",
    title: "Technology & Digital Services Division",
    description: "Designs, builds, and maintains SCEF's digital ecosystem and data infrastructure.",
    mandate: "Designs, builds, and maintains SCEF's digital ecosystem and data infrastructure.",
    icon: Laptop,
    color: "terracotta",
    responsibilities: [
      "SCEF website, mobile app, dashboards, and CMS",
      "Education Online Africa (EOA) platform and certification systems",
      "Digital wallet, databases, APIs, and integrations",
      "Cybersecurity, data protection, and system scalability",
      "Digital analytics and performance monitoring",
    ],
    leader: "Director of Technology and Digital Innovation",
    href: "/divisions/tdsd",
  },
  {
    code: "OMBDD",
    title: "Online Media Business Development Division",
    description: "Drives visibility, partnerships, sponsorships, and revenue growth through digital engagement.",
    mandate: "Drives visibility, partnerships, sponsorships, and revenue growth through digital engagement.",
    icon: TrendingUp,
    color: "forest",
    responsibilities: [
      "Digital marketing and growth strategy",
      "Sponsorship acquisition and CSR engagement",
      "Fundraising campaigns and donor communications",
      "Brand positioning and audience development",
      "Business development for programs and media assets",
    ],
    leader: "Director of Media Business Development",
    href: "/divisions/ombdd",
  },
  {
    code: "SMD",
    title: "Santos Media Division",
    description: "Produces and manages all SCEF-owned media platforms and education storytelling.",
    mandate: "Produces and manages all SCEF-owned media platforms and education storytelling.",
    icon: Tv,
    color: "primary",
    responsibilities: [
      "NESA Africa TV",
      "It's In Me Radio",
      "EduAid Africa Webinars & Podcast",
      "Education Tourism & Impact Stories",
      "Content production, broadcast standards, and editorial integrity",
    ],
    leader: "Director of Santos Media",
    href: "/divisions/santos-media",
  },
  {
    code: "LCS",
    title: "Local Chapter Services Division",
    description: "Builds, supports, and monitors SCEF local chapters across Africa and the diaspora.",
    mandate: "Builds, supports, and monitors SCEF local chapters across Africa and the diaspora.",
    icon: Globe,
    color: "gold",
    responsibilities: [
      "Chapter onboarding, activation, and capacity building",
      "Leadership training and compliance support",
      "Chapter dashboards, reporting, and performance tracking",
      "Coordination of grassroots implementation of SCEF programs",
      "Community engagement and feedback loops",
    ],
    leader: "Director of Chapter Services and Support",
    href: "/divisions/lcs",
  },
];

const colorClasses = {
  gold: "bg-gold/10 text-gold border-gold/20",
  terracotta: "bg-terracotta/10 text-terracotta border-terracotta/20",
  forest: "bg-forest/10 text-forest border-forest/20",
  primary: "bg-primary/10 text-primary border-primary/20",
};

const Divisions = () => {
  return (
    <>
      <Helmet>
        <title>Divisions - SCEF | 6 Operational Divisions</title>
        <meta 
          name="description" 
          content="SCEF operates through 6 specialized divisions: Board Governance & Executive Office, SOBCD, TDSD, OMBDD, Santos Media, and Local Chapter Services." 
        />
        <meta name="keywords" content="SCEF divisions, BGEO, SOBCD, TDSD, OMBDD, Santos Media, Local Chapter Services" />
        <link rel="canonical" href="https://scef.org/divisions" />
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
                  <Building2 className="w-4 h-4" />
                  Organizational Structure
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  6 Operational <span className="text-gradient-gold">Divisions</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  SCEF operates through six specialized divisions, each with clear mandates, leadership, and operational scope to deliver on our institutional mission.
                </p>
              </div>
            </div>
          </section>

          {/* Division Cards */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="space-y-8">
                {divisions.map((division, index) => {
                  const colors = colorClasses[division.color as keyof typeof colorClasses];
                  return (
                    <div
                      key={division.code}
                      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="grid lg:grid-cols-3 gap-0">
                        {/* Header & Mandate */}
                        <div className="p-8 lg:p-10">
                          <div className="flex items-start gap-4 mb-6">
                            <div className={`w-14 h-14 rounded-xl ${colors} border flex items-center justify-center shrink-0`}>
                              <division.icon className="w-7 h-7" />
                            </div>
                            <div>
                              <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${colors} mb-2`}>
                                {division.code}
                              </span>
                              <h3 className="font-display text-xl font-bold text-foreground">
                                {division.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {division.description}
                          </p>
                        </div>

                        {/* Mandate */}
                        <div className="p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border bg-muted/20">
                          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            Mandate
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {division.mandate}
                          </p>
                        </div>

                        {/* Responsibilities & CTA */}
                        <div className="p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-border">
                          <h4 className="font-semibold text-foreground mb-4">Key Responsibilities</h4>
                          <ul className="space-y-2 mb-6">
                            {division.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                {resp}
                              </li>
                            ))}
                          </ul>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={division.href}>
                              View Division
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Work With Our <span className="text-gradient-gold">Divisions</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Each division welcomes collaboration with partners, volunteers, and stakeholders aligned with their mandate.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="default" size="lg" asChild>
                  <Link to="/partners">
                    Partner With SCEF
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">
                    Contact a Division
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

export default Divisions;

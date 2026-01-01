import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Handshake, Building2, GraduationCap, Globe, ArrowRight, 
  CheckCircle2, Users, Heart, Award, Briefcase
} from "lucide-react";

const partnershipTypes = [
  {
    icon: Building2,
    title: "Corporate Partners",
    description: "Align your CSR initiatives with impactful education programs across Africa.",
    benefits: [
      "Tax-deductible contributions",
      "Brand visibility across SCEF platforms",
      "Employee engagement opportunities",
      "Impact reporting and metrics",
    ],
    cta: "Corporate Partnership",
    href: "/partners/corporate",
    color: "gold",
  },
  {
    icon: GraduationCap,
    title: "Training Partners",
    description: "Become an AEPC affiliate training centre and deliver certifications.",
    benefits: [
      "Licensed curriculum access",
      "Revenue sharing model",
      "Marketing support",
      "Quality assurance framework",
    ],
    cta: "Training Partnership",
    href: "/partners/training",
    color: "terracotta",
  },
  {
    icon: Globe,
    title: "Government Partners",
    description: "Collaborate on national education policy and program implementation.",
    benefits: [
      "Policy advisory services",
      "Data and research access",
      "Joint program development",
      "Capacity building support",
    ],
    cta: "Government Partnership",
    href: "/partners/government",
    color: "forest",
  },
  {
    icon: Briefcase,
    title: "Institutional Partners",
    description: "Universities, NGOs, and multilaterals working in education.",
    benefits: [
      "Research collaboration",
      "Joint funding applications",
      "Knowledge exchange",
      "Network access",
    ],
    cta: "Institutional Partnership",
    href: "/partners/institutional",
    color: "primary",
  },
];

const impactStats = [
  { value: "50K+", label: "Students Impacted" },
  { value: "54+", label: "Countries Reached" },
  { value: "100+", label: "Partner Organizations" },
  { value: "$2M+", label: "Programs Funded" },
];

const colorClasses = {
  gold: "bg-gold/10 text-gold border-gold/20",
  terracotta: "bg-terracotta/10 text-terracotta border-terracotta/20",
  forest: "bg-forest/10 text-forest border-forest/20",
  primary: "bg-primary/10 text-primary border-primary/20",
};

const Partners = () => {
  return (
    <>
      <Helmet>
        <title>Partner With SCEF - Corporate, Training & Government Partnerships</title>
        <meta 
          name="description" 
          content="Partner with SCEF to scale education impact across Africa. Corporate CSR, training partnerships, government collaboration, and institutional alliances." 
        />
        <meta name="keywords" content="SCEF partnership, education CSR Africa, training partner, government education partnership" />
        <link rel="canonical" href="https://scef.org/partners" />
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
                  <Handshake className="w-4 h-4" />
                  Partnerships
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Partner With <span className="text-gradient-gold">SCEF</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed mb-8">
                  Join Africa's institutional education platform. Whether you're a corporation, government, training provider, or institution—we have partnership models designed for meaningful, scalable impact.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/partners/inquiry">
                    <Handshake className="w-5 h-5" />
                    Start Partnership Inquiry
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-16 bg-card border-b border-border">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {impactStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-4xl font-display font-bold text-primary mb-2">{stat.value}</div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Partnership Types */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Partnership <span className="text-gradient-gold">Models</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Choose the partnership model that aligns with your organization's goals and capabilities.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {partnershipTypes.map((type) => {
                  const colors = colorClasses[type.color as keyof typeof colorClasses];
                  return (
                    <div
                      key={type.title}
                      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="p-8">
                        <div className={`w-14 h-14 rounded-xl ${colors} border flex items-center justify-center mb-6`}>
                          <type.icon className="w-7 h-7" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                          {type.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {type.description}
                        </p>
                        <ul className="space-y-3 mb-6">
                          {type.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" asChild>
                          <Link to={type.href}>
                            {type.cta}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Partner */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Why Partner with <span className="text-gradient-gold">SCEF</span>?
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    SCEF provides the institutional infrastructure, governance, and continental reach that individual projects cannot achieve. Our partners benefit from:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-gold shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Institutional Credibility</h4>
                        <p className="text-sm text-muted-foreground">Governance and accountability structures trusted by governments and donors</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-terracotta shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Continental Scale</h4>
                        <p className="text-sm text-muted-foreground">Presence in 54+ countries with local chapter infrastructure</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-forest shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Established Networks</h4>
                        <p className="text-sm text-muted-foreground">Access to education professionals, institutions, and policymakers</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-foreground">Measurable Impact</h4>
                        <p className="text-sm text-muted-foreground">Data-driven reporting and transparent impact metrics</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-earth to-earth/90 rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-african-pattern opacity-10" />
                  <div className="relative">
                    <h3 className="font-display text-2xl font-bold text-cream mb-6">
                      Start Your Partnership Journey
                    </h3>
                    <p className="text-cream/80 mb-8">
                      Our partnerships team is ready to discuss how we can work together to transform education across Africa.
                    </p>
                    <div className="space-y-4">
                      <Button variant="hero" className="w-full" size="lg" asChild>
                        <Link to="/partners/inquiry">
                          Submit Partnership Inquiry
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="heroOutline" className="w-full" size="lg" asChild>
                        <Link to="/contact">
                          Contact Partnerships Team
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Partners;

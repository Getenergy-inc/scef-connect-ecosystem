import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Target, Eye, Heart, Users, Award, Globe, ArrowRight, 
  Shield, Building2, Tv, Laptop, TrendingUp, CheckCircle2,
  GraduationCap, Handshake
} from "lucide-react";

const objectives = [
  "Advocate for a continuously evolving education standard aligned to global best practices and AU Agenda 2063.",
  "Mobilize and deploy sustainable education funding through transparent, auditable financial systems.",
  "Expand equitable access to quality education—prioritizing women, girls, special-needs learners, and underserved communities.",
  "Recognize and reward excellence through continental awards, applied research, and industry-recognized certifications.",
  "Enable grassroots ownership and execution via compliant, accountable local chapters across 54+ countries.",
  "Build institutional trust through layered governance, real-time data, and radical transparency.",
];

const divisions = [
  {
    code: "SOBCD",
    title: "Strategic Operations & Business Compliance",
    description: "Governance, compliance, finance oversight, audits, risk management, and institutional integrity.",
    icon: Shield,
  },
  {
    code: "TDSD",
    title: "Technology & Digital Services",
    description: "Website, mobile apps, APIs, databases, wallets, AI tools, ICT training, Education Online Africa, eLibrary Nigeria.",
    icon: Laptop,
  },
  {
    code: "OMBDD",
    title: "Online Media Business Development",
    description: "Digital growth, sponsorships, partnerships, and online revenue development. Strict scope—no expansion beyond mandate.",
    icon: TrendingUp,
  },
  {
    code: "Santos Media",
    title: "Santos Media Division",
    description: "NESA Africa TV, It's In Me Radio, EduAid Webinar Series, Education Tourism Show. Broadcasting and content monetization.",
    icon: Tv,
  },
  {
    code: "LCS",
    title: "Local Chapter Services",
    description: "Chapter onboarding, compliance monitoring, performance tracking, and pathway upgrades (Online → Hybrid → Physical).",
    icon: Globe,
  },
];

const governanceLayers = [
  { title: "Board of Trustees (7)", description: "Fiduciary oversight, institutional integrity, and strategic direction" },
  { title: "Boards of Advisors", description: "Program advisors (5 each) and chapter advisors (3 each) providing domain expertise" },
  { title: "Regional Boards of Directors", description: "3 per region—operational governance and cross-border coordination" },
  { title: "Local Chapter Presidents", description: "Country-level execution, community engagement, and compliance reporting" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About SCEF - Institutional Leadership for Africa's Education</title>
        <meta 
          name="description" 
          content="SCEF is Africa's institutional platform for education governance, delivery, certification, funding, and recognition. Founded in 1997, governing education across Africa and the diaspora." 
        />
        <meta name="keywords" content="SCEF, African education, education governance, Pan-African, education institution" />
        <link rel="canonical" href="https://scef.org/about" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-scef-gold/20 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 border-2 border-black">
                  <Building2 className="w-4 h-4" />
                  About SCEF
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  The Institution Behind{" "}
                  <span className="text-scef-gold">Africa's Education Transformation</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Santos Creations Educational Foundation (SCEF) is a pan-African, membership-driven institution that governs, funds, certifies, digitizes, and scales education programs across Africa and the diaspora. We are not a project—we are the platform.
                </p>
              </div>
            </div>
          </section>

          {/* Why SCEF */}
          <section className="py-20 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
                    <Target className="w-4 h-4" />
                    Why We Exist
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Replacing Fragmentation with <span className="text-scef-gold">Institutional Structure</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Africa's education sector faces systemic fragmentation: weak governance, short-term funding cycles, limited standards enforcement, and siloed initiatives. SCEF exists to replace this fragmentation with a unified, accountable framework—providing institutional governance, digital infrastructure, transparent financial systems, and compliant local execution across 54+ countries.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-scef-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Unified governance framework</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-scef-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Digital infrastructure</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-scef-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Financial systems</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-scef-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Local execution</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-scef-gold/20 to-scef-blue/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-card rounded-3xl p-8 border-2 border-black">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background rounded-2xl p-6 text-center border-2 border-black">
                        <div className="text-3xl font-display font-bold text-scef-blue mb-1">1997</div>
                        <p className="text-sm text-muted-foreground">Founded</p>
                      </div>
                      <div className="bg-background rounded-2xl p-6 text-center border-2 border-black">
                        <div className="text-3xl font-display font-bold text-scef-gold mb-1">2010</div>
                        <p className="text-sm text-muted-foreground">Registered</p>
                      </div>
                      <div className="bg-background rounded-2xl p-6 text-center border-2 border-black">
                        <div className="text-3xl font-display font-bold text-scef-blue mb-1">54+</div>
                        <p className="text-sm text-muted-foreground">Countries</p>
                      </div>
                      <div className="bg-background rounded-2xl p-6 text-center border-2 border-black">
                        <div className="text-3xl font-display font-bold text-scef-gold mb-1">50K+</div>
                        <p className="text-sm text-muted-foreground">Impacted</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-card rounded-2xl p-10 border-2 border-black hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-scef-gold/20 flex items-center justify-center mb-6 border-2 border-black">
                    <Eye className="w-7 h-7 text-scef-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    A continuously improving, globally competitive education ecosystem across Africa—where every learner, educator, and institution operates within a framework of excellence, accountability, and innovation by 2035.
                  </p>
                </div>
                
                <div className="bg-card rounded-2xl p-10 border-2 border-black hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-scef-blue/20 flex items-center justify-center mb-6 border-2 border-black">
                    <Target className="w-7 h-7 text-scef-blue" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To govern, fund, digitize, certify, and scale quality education across Africa and the diaspora through institutional partnerships, technology innovation, media platforms, industry-recognized certifications, and accountable local chapter systems.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Objectives */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Strategic <span className="text-scef-gold">Objectives</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-4 bg-card rounded-xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-scef-blue flex items-center justify-center text-white font-bold text-sm shrink-0 border-2 border-black">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Governance */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
                  <Shield className="w-4 h-4" />
                  Governance
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Multi-Layer <span className="text-scef-gold">Governance Structure</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {governanceLayers.map((layer, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 border-2 border-black text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center mx-auto mb-4 border-2 border-black">
                      <span className="font-bold text-scef-blue">{index + 1}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{layer.title}</h3>
                    <p className="text-sm text-muted-foreground">{layer.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                  <Link to="/governance">
                    Full Governance Framework
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Operations / Divisions */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  5 Operational <span className="text-scef-gold">Divisions</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {divisions.map((division) => (
                  <div key={division.code} className="bg-card rounded-2xl p-6 border-2 border-black hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <division.icon className="w-6 h-6 text-scef-blue" />
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-scef-gold text-scef-blue border-2 border-black">
                        {division.code}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{division.title}</h3>
                    <p className="text-sm text-muted-foreground">{division.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
                  <Award className="w-4 h-4" />
                  Certifications
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Africa Education & Productivity <span className="text-scef-gold">Certification (AEPC)</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  A hybrid certification system combining online delivery with licensed physical exam centers. Integrated with affiliate training partners and the GFA Wallet for seamless, auditable transactions. Designed for workforce readiness and continental recognition.
                </p>
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                  <Link to="/certifications">
                    <GraduationCap className="w-4 h-4" />
                    Certifications Hub
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Membership & Partnerships */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Member-Run. Partner-Powered. <span className="text-scef-gold">Institutionally Governed.</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  SCEF operates as a membership-driven institution with tiered engagement pathways for individuals, organizations, and governments. Our governance ensures accountability to members, transparency to donors, and credibility to institutional partners.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    <Link to="/membership">
                      <Users className="w-4 h-4" />
                      Become a Member
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button size="lg" asChild className="bg-scef-blue text-white hover:bg-scef-blue-light border-2 border-black font-semibold">
                    <Link to="/partners">
                      <Handshake className="w-4 h-4" />
                      Partner With SCEF
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-scef-blue border-t-2 border-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                Partner with Africa's Education <span className="text-scef-gold">Institution</span>
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8">
                Join governments, foundations, corporations, and institutions across Africa and the diaspora in building a unified, accountable education ecosystem.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light font-semibold border-2 border-black">
                  <Link to="/membership">
                    Join SCEF
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" asChild className="bg-transparent border-2 border-scef-gold text-scef-gold hover:bg-scef-gold/10">
                  <Link to="/wallet/donate">
                    <Heart className="w-4 h-4" />
                    Donate
                  </Link>
                </Button>
                <Button size="lg" asChild className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                  <Link to="/auth">
                    Access Dashboard
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

export default About;

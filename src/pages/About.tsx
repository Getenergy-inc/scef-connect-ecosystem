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
  "Advocate a continuously evolving education standard aligned to global best practice.",
  "Mobilize and deploy sustainable education funding.",
  "Expand equitable access—women, girls, special-needs, underserved communities.",
  "Recognize excellence through awards, research, and certifications.",
  "Enable grassroots ownership via compliant local chapters.",
  "Build trust through governance, data, and transparency.",
];

const divisions = [
  {
    code: "SOBCD",
    title: "Strategic Operations & Business Compliance",
    description: "Governance, compliance, finance oversight",
    icon: Shield,
    color: "text-gold",
  },
  {
    code: "TDSD",
    title: "Technology & Digital Services",
    description: "Platforms, APIs, AI, ICT training, eLibrary Nigeria",
    icon: Laptop,
    color: "text-terracotta",
  },
  {
    code: "OMBDD",
    title: "Online Media Business Development",
    description: "Digital growth & sponsorships (strict scope)",
    icon: TrendingUp,
    color: "text-forest",
  },
  {
    code: "Santos Media",
    title: "Santos Media",
    description: "Broadcasting & content monetization",
    icon: Tv,
    color: "text-primary",
  },
  {
    code: "LCS",
    title: "Local Chapter Services",
    description: "Onboarding, compliance, upgrades",
    icon: Globe,
    color: "text-gold",
  },
];

const governanceLayers = [
  { title: "Board of Trustees (7)", description: "Fiduciary oversight & integrity" },
  { title: "Boards of Advisors", description: "Program (5 each) & Chapter (3 each)" },
  { title: "Regional Boards of Directors", description: "3 per region — Operational governance" },
  { title: "Local Chapter Presidents", description: "Country execution" },
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
          <section className="relative pt-32 pb-20 bg-earth overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl" />
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  <Building2 className="w-4 h-4" />
                  About SCEF
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Institutional Leadership for{" "}
                  <span className="text-gradient-gold">Africa's Education</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  Santos Creations Educational Foundation (SCEF) is a pan-African, membership-driven education governance and delivery institution. We design, regulate, fund, digitize, certify, recognize, and scale education initiatives across Africa and the diaspora.
                </p>
              </div>
            </div>
          </section>

          {/* Why SCEF */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                    <Target className="w-4 h-4" />
                    Why We Exist
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                    Replacing Fragmentation with <span className="text-gradient-gold">Structure</span>
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    Africa's education sector faces fragmentation, weak governance, short-term funding, and limited standards. SCEF exists to replace fragmentation with structure—providing a unified governance framework, digital and financial infrastructure, and compliant local execution.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Unified governance framework</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Digital infrastructure</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Financial systems</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">Local execution</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-terracotta/20 rounded-3xl blur-2xl" />
                  <div className="relative bg-background rounded-3xl p-8 border border-border">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-card rounded-2xl p-6 text-center border border-border">
                        <div className="text-3xl font-display font-bold text-primary mb-1">1997</div>
                        <p className="text-sm text-muted-foreground">Founded</p>
                      </div>
                      <div className="bg-card rounded-2xl p-6 text-center border border-border">
                        <div className="text-3xl font-display font-bold text-gold mb-1">2010</div>
                        <p className="text-sm text-muted-foreground">Registered</p>
                      </div>
                      <div className="bg-card rounded-2xl p-6 text-center border border-border">
                        <div className="text-3xl font-display font-bold text-terracotta mb-1">54+</div>
                        <p className="text-sm text-muted-foreground">Countries</p>
                      </div>
                      <div className="bg-card rounded-2xl p-6 text-center border border-border">
                        <div className="text-3xl font-display font-bold text-forest mb-1">50K+</div>
                        <p className="text-sm text-muted-foreground">Impacted</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="bg-card rounded-2xl p-10 border border-border">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-gold" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To build a continuously improving, globally competitive education standard in Africa by 2035.
                  </p>
                </div>
                
                <div className="bg-card rounded-2xl p-10 border border-border">
                  <div className="w-14 h-14 rounded-xl bg-terracotta/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-terracotta" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    To govern, fund, digitize, recognize, and expand access to quality education through partnerships, innovation, media, certifications, and accountable local chapter systems.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Objectives */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Strategic <span className="text-gradient-gold">Objectives</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-4 bg-background rounded-xl p-6 border border-border">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{objective}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Governance */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <Shield className="w-4 h-4" />
                  Governance
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Multi-Layer <span className="text-gradient-gold">Governance Structure</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {governanceLayers.map((layer, index) => (
                  <div key={index} className="bg-card rounded-2xl p-6 border border-border text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{layer.title}</h3>
                    <p className="text-sm text-muted-foreground">{layer.description}</p>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/governance">
                    Full Governance Framework
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Operations / Divisions */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  5 Operational <span className="text-gradient-gold">Divisions</span>
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {divisions.map((division) => (
                  <div key={division.code} className="bg-background rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <division.icon className={`w-6 h-6 ${division.color}`} />
                      <span className="text-xs font-semibold px-2 py-1 rounded-full bg-muted text-muted-foreground">
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
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold text-sm font-medium mb-6">
                  <Award className="w-4 h-4" />
                  Certifications
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Africa Education & Productivity <span className="text-gradient-gold">Certification (AEPC)</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Hybrid delivery, affiliate partners, licensed exam centres, payments via GFA Wallet.
                </p>
                <Button variant="default" size="lg" asChild>
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
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Member-Run, Partner-Powered, <span className="text-gradient-gold">Institutionally Governed</span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  SCEF is member-run, partner-powered, and institutionally governed.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="default" size="lg" asChild>
                    <Link to="/membership">
                      <Users className="w-4 h-4" />
                      Become a Member
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
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
          <section className="py-20 bg-earth">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-6">
                Join Africa's Education <span className="text-gradient-gold">Institution</span>
              </h2>
              <p className="text-cream/70 max-w-2xl mx-auto mb-8">
                Be part of the movement transforming education across Africa and the diaspora.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/membership">
                    Join SCEF
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/wallet/donate">
                    <Heart className="w-4 h-4" />
                    Donate
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
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

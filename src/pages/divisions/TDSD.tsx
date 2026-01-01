import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Monitor, Code, Cloud, Database, Cpu, 
  ArrowRight, CheckCircle, Globe, Smartphone 
} from "lucide-react";

const responsibilities = [
  "Platform development and maintenance (Web, Mobile, APIs)",
  "Education Online Africa infrastructure",
  "eLibrary Nigeria digital systems",
  "AI and automation integration",
  "Cybersecurity and data protection",
  "ICT training program development",
  "Technical support for chapters and programs",
  "Cloud infrastructure management",
];

const platforms = [
  { name: "Education Online Africa", desc: "E-learning platform serving students across the continent" },
  { name: "eLibrary Nigeria", desc: "Digital library with free access to educational resources" },
  { name: "GFA Wallet", desc: "Financial infrastructure for donations and AGC tokens" },
  { name: "Chapter Portal", desc: "Management system for local chapters" },
];

const TDSD = () => {
  return (
    <>
      <Helmet>
        <title>TDSD - Technology & Digital Services Division | SCEF</title>
        <meta 
          name="description" 
          content="TDSD powers SCEF's digital infrastructure including platforms, APIs, AI integration, and ICT training programs across Africa." 
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
                  <Monitor className="w-4 h-4" />
                  Division
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Technology & Digital <span className="text-gradient-gold">Services</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  Powering Africa's education transformation through innovative digital platforms, AI integration, and scalable technology infrastructure.
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
                    TDSD is responsible for all technology initiatives within SCEF—from building and maintaining digital platforms to implementing AI solutions and providing ICT training across Africa.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We bridge the digital divide by creating accessible, scalable technology solutions that empower educators, students, and institutions across the continent.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Code, label: "Development" },
                      { icon: Cloud, label: "Cloud Services" },
                      { icon: Cpu, label: "AI Integration" },
                      { icon: Database, label: "Data Systems" },
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
                    <Monitor className="w-5 h-5 text-primary" />
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

          {/* Platforms */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
                Our <span className="text-gradient-gold">Platforms</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {platforms.map((platform) => (
                  <div key={platform.name} className="p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-6 h-6 text-primary" />
                      <h3 className="font-display text-lg font-bold text-foreground">{platform.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">{platform.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Who We Serve */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
                Who We <span className="text-gradient-gold">Serve</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { title: "Students & Educators", desc: "Digital learning platforms and educational resources" },
                  { title: "Local Chapters", desc: "Technical infrastructure and management systems" },
                  { title: "Partner Organizations", desc: "API integrations and data services" },
                ].map((item) => (
                  <div key={item.title} className="text-center p-6 rounded-xl bg-card border border-border">
                    <h3 className="font-display text-lg font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Build With Us
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                For technology partnerships, platform access, or ICT training inquiries, connect with our team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Contact TDSD
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/programs">View Platforms</Link>
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

export default TDSD;

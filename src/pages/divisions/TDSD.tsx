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
  "SCEF website, mobile app, dashboards, and CMS",
  "Education Online Africa (EOA) platform and certification systems",
  "Digital wallet, databases, APIs, and integrations",
  "Cybersecurity, data protection, and system scalability",
  "Digital analytics and performance monitoring",
];

const platforms = [
  { name: "SCEF Website & Mobile App", desc: "Central digital presence with responsive design, mobile app, dashboards, and content management systems" },
  { name: "Education Online Africa (EOA)", desc: "Continental e-learning platform with certification systems serving students across 54+ countries" },
  { name: "Digital Wallet & Databases", desc: "Institutional financial infrastructure with APIs and integrations for donations, membership, and payments" },
  { name: "Cybersecurity & Data Protection", desc: "Enterprise-grade security, data protection protocols, and system scalability infrastructure" },
  { name: "Analytics & Performance Monitoring", desc: "Digital analytics dashboards for performance monitoring and data-driven decision making" },
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
                  Designs, builds, and maintains SCEF's digital ecosystem and data infrastructure. Positions SCEF as a modern, scalable education platform.
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
                    TDSD designs, builds, and maintains SCEF's digital ecosystem and data infrastructure. We are responsible for all technology initiatives within SCEF—from building and maintaining digital platforms to ensuring cybersecurity, data protection, and system scalability.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    This division positions SCEF as a modern, scalable education platform. We bridge the digital divide by creating accessible, scalable, and secure technology solutions that empower educators, students, chapters, and institutions across the continent.
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
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">
                Digital <span className="text-gradient-gold">Platforms</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Enterprise-grade platforms designed for continental scale, serving millions of users across education, finance, and administration.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                Stakeholders We <span className="text-gradient-gold">Serve</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {[
                  { title: "Students & Educators", desc: "Digital learning platforms, e-libraries, and certification systems" },
                  { title: "Local Chapters", desc: "Management portals, technical infrastructure, and operational support" },
                  { title: "Partner Organizations", desc: "API integrations, data services, and platform interconnectivity" },
                  { title: "Training Institutions", desc: "ICT curriculum, digital tools, and capacity building programs" },
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
                Partner with TDSD
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                For technology partnerships, platform integrations, ICT training programs, or technical consultations, connect with our division leadership.
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

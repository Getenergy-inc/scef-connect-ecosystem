import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  MapPin, Users, Building, Globe, 
  ArrowRight, CheckCircle, Award, Wifi 
} from "lucide-react";

const responsibilities = [
  "Chapter onboarding and activation",
  "Compliance monitoring and support",
  "Chapter governance framework enforcement",
  "Upgrade pathway management (Online → Hybrid → Physical)",
  "Local leadership training and certification",
  "Resource allocation and support",
  "Performance tracking and reporting",
  "Inter-chapter coordination and events",
];

const chapterTypes = [
  { 
    name: "Online Chapters", 
    icon: Wifi, 
    desc: "Digital-first communities for remote engagement",
    features: ["Virtual meetings", "Digital fundraising", "Online events"]
  },
  { 
    name: "Hybrid Chapters", 
    icon: Globe, 
    desc: "Combined online and physical presence",
    features: ["Mixed events", "Local outreach", "Digital tools"]
  },
  { 
    name: "Physical Chapters", 
    icon: Building, 
    desc: "Full local presence with office and staff",
    features: ["Community office", "Local programs", "Direct impact"]
  },
];

const LCS = () => {
  return (
    <>
      <Helmet>
        <title>LCS - Local Chapter Services | SCEF</title>
        <meta 
          name="description" 
          content="LCS manages SCEF's local chapter network—onboarding, compliance, upgrades, and support for chapters across Africa." 
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
                  <MapPin className="w-4 h-4" />
                  Division
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Local Chapter <span className="text-gradient-gold">Services</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  Empowering grassroots education leadership through compliant, governed, and well-supported local chapters across Africa.
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
                    LCS is responsible for the entire lifecycle of SCEF's local chapters—from onboarding new chapters to supporting their growth and ensuring governance compliance.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    We enable community ownership under strong institutional oversight, ensuring local chapters deliver SCEF's mission with accountability and impact.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Users, label: "Onboarding" },
                      { icon: Award, label: "Certification" },
                      { icon: Building, label: "Upgrades" },
                      { icon: MapPin, label: "Support" },
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
                    <MapPin className="w-5 h-5 text-primary" />
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

          {/* Chapter Types */}
          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground text-center mb-4">
                Chapter <span className="text-gradient-gold">Pathway</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                Chapters progress through compliance-based upgrades from online to hybrid to physical presence.
              </p>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {chapterTypes.map((type, index) => (
                  <div key={type.name} className="relative p-6 rounded-xl bg-background border border-border">
                    {index < chapterTypes.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <type.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">{type.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{type.desc}</p>
                    <ul className="space-y-2">
                      {type.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-forest" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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
                  { title: "Aspiring Chapter Leaders", desc: "Onboarding, training, and certification support" },
                  { title: "Active Chapters", desc: "Ongoing compliance, resources, and growth support" },
                  { title: "Chapter Members", desc: "Connection to the continental SCEF network" },
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
                Start a Chapter
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Ready to lead education transformation in your community? Start your chapter journey today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/chapters">
                    <MapPin className="w-4 h-4 mr-2" />
                    Browse Chapters
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact LCS</Link>
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

export default LCS;

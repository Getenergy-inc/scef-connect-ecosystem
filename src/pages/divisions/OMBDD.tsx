import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  TrendingUp, Target, Megaphone, Users, 
  ArrowRight, CheckCircle, BarChart3, Globe 
} from "lucide-react";

const responsibilities = [
  "Digital marketing and growth strategy",
  "Sponsorship acquisition and CSR engagement",
  "Fundraising campaigns and donor communications",
  "Brand positioning and audience development",
  "Business development for programs and media assets",
];

const OMBDD = () => {
  return (
    <>
      <Helmet>
        <title>OMBDD - Online Media Business Development | SCEF</title>
        <meta 
          name="description" 
          content="OMBDD drives SCEF's digital growth through strategic online marketing, sponsorships, and revenue generation initiatives." 
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
                  <TrendingUp className="w-4 h-4" />
                  Division
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Online Media Business <span className="text-gradient-gold">Development</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  Drives visibility, partnerships, sponsorships, and revenue growth through digital engagement. This is the revenue and partnership engine of SCEF.
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
                    OMBDD drives visibility, partnerships, sponsorships, and revenue growth through digital engagement. We focus on digital marketing and growth strategy, sponsorship acquisition and CSR engagement, fundraising campaigns and donor communications.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-8">
                    This is the revenue and partnership engine of SCEF. We handle brand positioning and audience development, as well as business development for programs and media assets. Content production is the mandate of Santos Media—separated to protect editorial independence and credibility.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { icon: Target, label: "Sponsorships" },
                      { icon: Megaphone, label: "Digital Marketing" },
                      { icon: BarChart3, label: "Revenue Growth" },
                      { icon: Globe, label: "Online Presence" },
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
                    <TrendingUp className="w-5 h-5 text-primary" />
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

          {/* Scope Notice */}
          <section className="py-12 bg-gold/10 border-y border-gold/20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  Important Scope Notice
                </h3>
                <p className="text-muted-foreground">
                  OMBDD's mandate is strictly limited to online media business development. Content production is handled by Santos Media. Program delivery is managed by respective program teams. Chapter operations fall under Local Chapter Services.
                </p>
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
                  { title: "Corporate Sponsors", desc: "Strategic sponsorship packages, brand partnerships, and visibility opportunities" },
                  { title: "SCEF Programs", desc: "Revenue generation, sponsorship acquisition, and fundraising campaign support" },
                  { title: "Advertisers", desc: "Digital advertising placements across SCEF's media properties and platforms" },
                  { title: "SCEF Leadership", desc: "Business intelligence, revenue forecasting, and growth strategy reporting" },
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
                Become a Sponsor
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Partner with Africa's leading education institution. Gain visibility across 54+ countries while supporting transformative education programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/partners">
                    Become a Sponsor
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
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

export default OMBDD;

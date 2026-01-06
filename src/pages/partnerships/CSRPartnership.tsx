import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Handshake, CheckCircle, ArrowRight, Building2, Heart, Shield } from "lucide-react";

const CSRPartnership = () => {
  const { t } = useLocale();

  const benefits = [
    { icon: Shield, title: "Transparent Reporting", desc: "Quarterly impact reports with verified metrics" },
    { icon: Building2, title: "Brand Visibility", desc: "Recognition across our platforms and events" },
    { icon: Heart, title: "Direct Impact", desc: "Funds go directly to education programs" },
  ];

  return (
    <>
      <Helmet>
        <title>CSR Partnership - Partner With SCEF</title>
        <meta name="description" content="Partner with SCEF for impactful CSR education initiatives across Africa. Transparent fund management and measurable outcomes." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 border-2 border-black">
                  <Handshake className="w-4 h-4" />
                  Partnerships
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  CSR Education Partnership
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Partner with SCEF to fund scholarships, rebuild schools, extend learning access, and create measurable education impact across Africa.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    <Link to="/partnerships/request">
                      Request a Proposal
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
                Why Partner With SCEF?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {benefits.map((benefit) => (
                  <div key={benefit.title} className="bg-card rounded-2xl p-6 border-2 border-black text-center">
                    <benefit.icon className="w-12 h-12 mx-auto mb-4 text-scef-gold" />
                    <h3 className="font-display font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-scef-blue">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-white mb-6">
                Ready to Make an Impact?
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                  <Link to="/partnerships/request">
                    Request Proposal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" asChild variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/donate">
                    <Heart className="w-4 h-4" />
                    Donate Now
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

export default CSRPartnership;
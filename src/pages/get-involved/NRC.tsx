import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Users, CheckCircle, ArrowRight, Globe, Award, Briefcase } from "lucide-react";

const NRC = () => {
  const { isRTL } = useLocale();

  const benefits = [
    { icon: Globe, title: "National Representation", description: "Represent SCEF and NESA in your country" },
    { icon: Award, title: "Recognition", description: "Official NRC certification and credentials" },
    { icon: Briefcase, title: "Leadership Role", description: "Lead national coordination efforts" },
    { icon: Users, title: "Network Access", description: "Connect with education leaders across Africa" },
  ];

  const requirements = [
    "Must be a citizen or permanent resident of the country you represent",
    "Minimum 5 years experience in education sector",
    "Strong network with educational institutions",
    "Commitment to SCEF's mission and values",
    "Ability to coordinate with local chapters",
  ];

  return (
    <>
      <Helmet>
        <title>Join National Representation Council (NRC) - SCEF</title>
        <meta name="description" content="Become a National Representative for SCEF. Lead education initiatives in your country and connect with pan-African education leaders." />
      </Helmet>
      
      <div className="min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-scef-pattern opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6">
                  <Users className="w-4 h-4" />
                  National Representation Council
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  Join the NRC
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Become a National Representative for SCEF. Lead education initiatives in your country 
                  and connect with pan-African education leaders shaping the future of African education.
                </p>
                <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-center mb-12">
                Why Join the NRC?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-card border border-border rounded-xl p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-scef-gold/10 flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-7 h-7 text-scef-gold" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Requirements Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-center mb-12">
                  Requirements
                </h2>
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-scef-gold mt-0.5 shrink-0" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 text-center">
                  <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light">
                    Start Your Application
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Questions? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
                  </p>
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

export default NRC;

import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Scale, CheckCircle, ArrowRight, Award, BookOpen, Users, Star } from "lucide-react";

const Judge = () => {
  const { isRTL } = useLocale();

  const benefits = [
    { icon: Award, title: "Prestigious Role", description: "Join an elite panel of education experts" },
    { icon: BookOpen, title: "Shape Standards", description: "Help define education excellence in Africa" },
    { icon: Users, title: "Network", description: "Connect with leading educators and policymakers" },
    { icon: Star, title: "Recognition", description: "Official NESA Judge certification" },
  ];

  const requirements = [
    "Minimum 10 years experience in education or related field",
    "Recognized expertise in education policy, pedagogy, or administration",
    "No conflicts of interest with nominated institutions",
    "Commitment to fairness and transparency",
    "Ability to review and evaluate submissions thoroughly",
    "Available for judging sessions as scheduled",
  ];

  return (
    <>
      <Helmet>
        <title>Become a NESA Judge - SCEF</title>
        <meta name="description" content="Join the NESA Africa judging panel. Help evaluate and recognize education excellence across the continent." />
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
                  <Scale className="w-4 h-4" />
                  NESA Judging Panel
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  Be a NESA Judge
                </h1>
                <p className="text-xl text-white/80 leading-relaxed mb-8">
                  Join the prestigious NESA Africa judging panel. Help evaluate and recognize 
                  education excellence across the continent while shaping the future of African education standards.
                </p>
                <Button size="lg" className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light">
                  Apply to be a Judge
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-center mb-12">
                Why Become a Judge?
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
                  Judge Requirements
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
                    Submit Your Application
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Questions? <Link to="/contact" className="text-primary hover:underline">Contact the NESA team</Link>
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

export default Judge;

import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/contexts/LocaleContext";
import { Crown, Send, CheckCircle, Users, Shield, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ChapterLeadership = () => {
  const { t } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Your leadership application has been submitted!");
    setIsSubmitting(false);
  };

  const responsibilities = [
    { icon: Users, title: "Chapter Coordination", desc: "Lead and grow your local community" },
    { icon: Shield, title: "Governance Compliance", desc: "Ensure adherence to SCEF standards" },
    { icon: TrendingUp, title: "Impact Reporting", desc: "Track and report chapter activities" },
  ];

  return (
    <>
      <Helmet>
        <title>Apply as Chapter Leader (LCP) - SCEF</title>
        <meta name="description" content="Apply to become a Local Chapter President (LCP) at SCEF. Lead education transformation in your country." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90 text-sm mb-6 border-2 border-black">
                  <Crown className="w-4 h-4" />
                  Leadership
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  Apply as Chapter Leader (LCP)
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Become a Local Chapter President and lead education transformation in your country.
                </p>
              </div>
            </div>
          </section>

          {/* Responsibilities */}
          <section className="py-12 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">LCP Responsibilities</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {responsibilities.map((item) => (
                  <div key={item.title} className="bg-card rounded-2xl p-6 border-2 border-black text-center">
                    <item.icon className="w-10 h-10 mx-auto mb-4 text-scef-gold" />
                    <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Form */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card rounded-2xl p-8 border-2 border-black">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Leadership Application</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required className="border-2 border-black" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required className="border-2 border-black" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" required className="border-2 border-black" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" type="tel" required className="border-2 border-black" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="experience">Leadership Experience *</Label>
                    <Textarea id="experience" required rows={4} placeholder="Describe your leadership experience..." className="border-2 border-black" />
                  </div>
                  <div>
                    <Label htmlFor="vision">Your Vision for the Chapter *</Label>
                    <Textarea id="vision" required rows={4} placeholder="What do you want to achieve?" className="border-2 border-black" />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default ChapterLeadership;
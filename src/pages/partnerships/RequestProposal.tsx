import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/contexts/LocaleContext";
import { FileText, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const RequestProposal = () => {
  const { t } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Your request has been submitted. We'll be in touch soon!");
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Request Proposal - Partner With SCEF</title>
        <meta name="description" content="Request a partnership proposal or meeting with SCEF. Let's discuss how we can work together for education in Africa." />
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
                  <FileText className="w-4 h-4" />
                  Partnerships
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  Request a Proposal
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Tell us about your organization and partnership goals. We'll prepare a customized proposal.
                </p>
              </div>
            </div>
          </section>

          {/* Form */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card rounded-2xl p-8 border-2 border-black">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Contact Name *</Label>
                      <Input id="name" required className="border-2 border-black" />
                    </div>
                    <div>
                      <Label htmlFor="company">Company / Organization *</Label>
                      <Input id="company" required className="border-2 border-black" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required className="border-2 border-black" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" className="border-2 border-black" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="partnership-type">Partnership Interest</Label>
                    <Input id="partnership-type" placeholder="e.g., Scholarship funding, School rebuilding, etc." className="border-2 border-black" />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" required rows={5} placeholder="Tell us about your partnership goals..." className="border-2 border-black" />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold">
                    {isSubmitting ? 'Submitting...' : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Request
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

export default RequestProposal;
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/contexts/LocaleContext";
import { Plus, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CreateChapter = () => {
  const { t } = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success("Your chapter application has been submitted for review!");
    setIsSubmitting(false);
  };

  const requirements = [
    "Minimum 5 founding members",
    "Identified chapter leader (LCP candidate)",
    "Clear country/region focus",
    "Commitment to SCEF governance standards",
  ];

  return (
    <>
      <Helmet>
        <title>Create a Local Chapter - SCEF</title>
        <meta name="description" content="Start a new SCEF chapter in your country. Bring education transformation to your community." />
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
                  <Plus className="w-4 h-4" />
                  {t('nav.chapters')}
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                  {t('home.chaptersBlock.ctaCreate')} a Chapter
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Start a new SCEF chapter in your country and lead the education transformation in your community.
                </p>
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="py-12 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <h2 className="font-display text-xl font-bold text-foreground mb-4 text-center">Requirements</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {requirements.map((req) => (
                    <div key={req} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-forest shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Form */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card rounded-2xl p-8 border-2 border-black">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Chapter Application</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" required className="border-2 border-black" />
                    </div>
                    <div>
                      <Label htmlFor="city">City/Region</Label>
                      <Input id="city" className="border-2 border-black" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="leader-name">Proposed Leader Name *</Label>
                      <Input id="leader-name" required className="border-2 border-black" />
                    </div>
                    <div>
                      <Label htmlFor="leader-email">Leader Email *</Label>
                      <Input id="leader-email" type="email" required className="border-2 border-black" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="founding-members">Number of Founding Members *</Label>
                    <Input id="founding-members" type="number" min="5" required className="border-2 border-black" />
                  </div>
                  <div>
                    <Label htmlFor="motivation">Why start this chapter? *</Label>
                    <Textarea id="motivation" required rows={4} className="border-2 border-black" />
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

export default CreateChapter;
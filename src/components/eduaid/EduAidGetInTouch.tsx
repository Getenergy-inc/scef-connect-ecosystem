import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "@/contexts/LocaleContext";

export default function EduAidGetInTouch() {
  const { t, isRTL } = useLocale();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: t('eduaid.contact.success') || "Message Sent",
      description: t('eduaid.contact.successDesc') || "Thank you for reaching out. We'll respond within 48 hours.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-20 bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#1F892B]/10 text-[#1F892B] rounded-full text-sm font-medium mb-4">
              {t('eduaid.contact.badge') || 'Contact Us'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('eduaid.contact.title') || 'Get In Touch'}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {t('eduaid.contact.description') || 'Have questions about scholarships, partnerships, or volunteering? We\'d love to hear from you.'}
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1F892B]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#1F892B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('eduaid.contact.email') || 'Email'}</h3>
                  <a href="mailto:info@eduaid.africa" className="text-muted-foreground hover:text-[#1F892B] transition-colors">
                    info@eduaid.africa
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1F892B]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#1F892B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('eduaid.contact.phone') || 'Phone'}</h3>
                  <p className="text-muted-foreground">+234 800 EDUAID (338243)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1F892B]/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#1F892B]" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{t('eduaid.contact.office') || 'Head Office'}</h3>
                  <p className="text-muted-foreground">Lagos, Nigeria<br />Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="bg-card border-2 border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('eduaid.contact.name') || 'Full Name'}
                  </label>
                  <Input 
                    required 
                    placeholder={t('eduaid.contact.namePlaceholder') || "Your name"} 
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('eduaid.contact.emailLabel') || 'Email'}
                  </label>
                  <Input 
                    required 
                    type="email" 
                    placeholder={t('eduaid.contact.emailPlaceholder') || "you@example.com"} 
                    className="bg-background"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('eduaid.contact.subject') || 'Subject'}
                </label>
                <Input 
                  required 
                  placeholder={t('eduaid.contact.subjectPlaceholder') || "How can we help?"} 
                  className="bg-background"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('eduaid.contact.message') || 'Message'}
                </label>
                <Textarea 
                  required 
                  rows={5}
                  placeholder={t('eduaid.contact.messagePlaceholder') || "Tell us more..."} 
                  className="bg-background resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#1F892B] hover:bg-[#1F892B]/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('eduaid.contact.sending') || 'Sending...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    {t('eduaid.contact.send') || 'Send Message'}
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

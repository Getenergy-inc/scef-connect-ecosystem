import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmailDirectory } from "@/components/contact/EmailDirectory";
import { emailDirectory } from "@/config/emailDirectory";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 48 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Helmet>
        <title>Contact SCEF - Get in Touch | Santos Creations Educational Foundation</title>
        <meta 
          name="description" 
          content="Contact the Santos Creations Educational Foundation. Reach out for partnerships, membership inquiries, donations, or general questions." 
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 text-cream/90 text-sm mb-6">
                  <MessageSquare className="w-4 h-4" />
                  Contact Us
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                  Let's <span className="text-gradient-gold">Connect</span>
                </h1>
                <p className="text-xl text-cream/80 leading-relaxed">
                  Have questions about our programs, want to partner with us, or interested in joining SCEF? We'd love to hear from you.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-3 gap-12">
                {/* Contact Info */}
                <div className="space-y-6">
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">General Inquiries</h3>
                    <a href={`mailto:${emailDirectory.info}`} className="text-primary hover:underline">
                      {emailDirectory.info}
                    </a>
                  </div>
                  
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-terracotta/10 flex items-center justify-center mb-4">
                      <Phone className="w-6 h-6 text-terracotta" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">Call Us</h3>
                    <a href="tel:+2348056677770" className="text-primary hover:underline">
                      +234 805 667 7770
                    </a>
                    <p className="text-muted-foreground text-sm mt-2">
                      Mon - Fri, 9am - 5pm WAT
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-forest/10 flex items-center justify-center mb-4">
                      <MapPin className="w-6 h-6 text-forest" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">Headquarters</h3>
                    <p className="text-foreground">Lagos, Nigeria</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      SCEF Office
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-2xl p-6 border border-border">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <Clock className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">Response Time</h3>
                    <p className="text-foreground">Within 48 hours</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      We respond to all inquiries
                    </p>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="lg:col-span-2">
                  <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border">
                    <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                      Send us a Message
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Subject
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="membership">Membership Inquiry</option>
                          <option value="donation">Donation Question</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="programs">Programs Information</option>
                          <option value="chapters">Local Chapters</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Message
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={6}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:outline-none transition-colors resize-none"
                          placeholder="Tell us how we can help..."
                          required
                        />
                      </div>
                      
                      <Button variant="default" size="lg" type="submit" className="w-full sm:w-auto">
                        <Send className="w-4 h-4" />
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Email Directory Section */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <EmailDirectory variant="full" />
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;

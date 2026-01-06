import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { Heart, School, GraduationCap, Users, BookOpen, Globe, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const donationAmounts = [25, 50, 100, 250, 500, 1000];

const Donate = () => {
  const { t } = useLocale();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedCause, setSelectedCause] = useState("general");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);

  const causes = [
    { id: "general", name: t("donate.causes.general") || "General Fund", icon: Heart, description: t("donate.causes.generalDesc") || "Support all SCEF initiatives" },
    { id: "scholarships", name: t("donate.causes.scholarships") || "Scholarships", icon: GraduationCap, description: t("donate.causes.scholarshipsDesc") || "Fund student education" },
    { id: "schools", name: t("donate.causes.schools") || "Rebuild Schools", icon: School, description: t("donate.causes.schoolsDesc") || "Infrastructure development" },
    { id: "chapters", name: t("donate.causes.chapters") || "Local Chapters", icon: Users, description: t("donate.causes.chaptersDesc") || "Community programs" },
  ];

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      toast.error(t("donate.errors.invalidAmount") || "Please enter a valid donation amount");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from("donations").insert({
        amount,
        donor_name: isAnonymous ? "Anonymous" : donorName,
        donor_email: donorEmail,
        message,
        is_anonymous: isAnonymous,
        payment_status: "pending",
      });

      if (error) throw error;

      toast.success(t("donate.success") || "Thank you for your donation! You will receive a confirmation email shortly.");
      
      // Reset form
      setSelectedAmount(100);
      setCustomAmount("");
      setDonorName("");
      setDonorEmail("");
      setMessage("");
    } catch (error: any) {
      toast.error(t("donate.errors.failed") || "Failed to process donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("nav.top.donate")} - SCEF</title>
        <meta name="description" content={t("donate.hero.subtitle") || "Make a donation to SCEF and help transform education across Africa."} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="bg-gradient-to-br from-earth to-earth/90 text-cream py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-6">
                <Heart className="w-10 h-10 text-earth" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {t("donate.hero.title") || "Fund Education. Change Lives."}
              </h1>
              <p className="text-lg text-cream/80 max-w-2xl mx-auto">
                {t("donate.hero.subtitle") || "Your donation directly supports scholarships, school infrastructure, and educational programs across Africa."}
              </p>
            </div>
          </section>

          {/* Donation Form */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
                {/* Cause Selection */}
                <div className="md:col-span-2 space-y-4">
                  <h2 className="font-display text-xl font-bold text-foreground mb-4">{t("donate.chooseCause") || "Choose a Cause"}</h2>
                  {causes.map((cause) => (
                    <button
                      key={cause.id}
                      onClick={() => setSelectedCause(cause.id)}
                      className={`w-full p-4 rounded-xl border text-left transition-all ${
                        selectedCause === cause.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedCause === cause.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        }`}>
                          <cause.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{cause.name}</p>
                          <p className="text-sm text-muted-foreground">{cause.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Form */}
                <Card className="md:col-span-3">
                  <CardHeader>
                    <CardTitle>{t("donate.formTitle") || "Make a Donation"}</CardTitle>
                    <CardDescription>{t("donate.formDesc") || "All donations are tax-deductible where applicable."}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDonate} className="space-y-6">
                      {/* Amount Selection */}
                      <div className="space-y-3">
                        <Label>{t("donate.selectAmount") || "Select Amount (USD)"}</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {donationAmounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => {
                                setSelectedAmount(amount);
                                setCustomAmount("");
                              }}
                              className={`py-3 rounded-lg font-medium transition-all ${
                                selectedAmount === amount
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground hover:bg-primary/20"
                              }`}
                            >
                              ${amount}
                            </button>
                          ))}
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            type="number"
                            placeholder={t("donate.customAmount") || "Custom amount"}
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              setSelectedAmount(null);
                            }}
                            className="pl-8"
                          />
                        </div>
                      </div>

                      {/* Donor Info */}
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="donorName">{t("donate.yourName") || "Your Name"}</Label>
                          <Input
                            id="donorName"
                            value={donorName}
                            onChange={(e) => setDonorName(e.target.value)}
                            placeholder="John Doe"
                            disabled={isAnonymous}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="donorEmail">{t("donate.email") || "Email Address"}</Label>
                          <Input
                            id="donorEmail"
                            type="email"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">{t("donate.message") || "Message (Optional)"}</Label>
                          <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t("donate.messagePlaceholder") || "Leave a message of support..."}
                            rows={3}
                          />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="rounded border-border"
                          />
                          <span className="text-sm text-muted-foreground">{t("donate.anonymous") || "Make my donation anonymous"}</span>
                        </label>
                      </div>

                      <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        <Heart className="w-5 h-5 mr-2" />
                        {loading ? (t("donate.processing") || "Processing...") : `${t("nav.top.donate")} $${selectedAmount || customAmount || 0}`}
                      </Button>

                      {/* Payment Gateway Buttons */}
                      <div className="pt-4 border-t border-border">
                        <p className="text-sm text-center text-muted-foreground mb-4">{t("donate.orDonateVia") || "Or donate directly via:"}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <a
                            href="https://paystack.com/pay/scef-donation"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 bg-scef-blue text-scef-gold hover:bg-scef-blue-dark border-2 border-black"
                          >
                            <Heart className="w-4 h-4" />
                            Paystack
                            <ExternalLink className="w-3 h-3" />
                          </a>
                          <a
                            href="https://flutterwave.com/pay/scef"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all duration-300 bg-scef-gold text-scef-blue hover:bg-scef-gold-dark border-2 border-black"
                          >
                            <Heart className="w-4 h-4" />
                            Flutterwave
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>

                      <p className="text-xs text-center text-muted-foreground">
                        {t("donate.terms") || "By donating, you agree to our terms and privacy policy."}
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Impact Stats */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
                {t("home.impact.title")}
              </h2>
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { value: "$2M+", label: t("donate.stats.raised") || "Raised" },
                  { value: "5,000+", label: t("home.impact.metrics.scholarships") },
                  { value: "150+", label: t("home.impact.metrics.schools") },
                  { value: "25+", label: t("home.impact.metrics.chapters") },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-6 bg-background rounded-xl">
                    <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Donate;

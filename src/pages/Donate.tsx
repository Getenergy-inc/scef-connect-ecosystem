import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { Heart, School, GraduationCap, Users, Shield, ExternalLink, Wallet } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import scefLogo from "@/assets/scef-logo.jpg";

const donationAmounts = [25, 50, 100, 250, 500, 1000];

const paymentProviders = [
  {
    id: "paystack",
    name: "Paystack",
    description: "Card, Bank, USSD",
    color: "bg-[#00C3F7]",
    url: "https://paystack.com/pay/scef-donation",
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    description: "Card, Mobile Money",
    color: "bg-[#F5A623]",
    url: "https://flutterwave.com/pay/scef",
  },
  {
    id: "bancable",
    name: "Bancable",
    description: "Direct Bank",
    color: "bg-[#1A237E]",
    url: "#",
  },
  {
    id: "transcertpay",
    name: "TranscertPay",
    description: "International",
    color: "bg-[#2E7D32]",
    url: "#",
  },
];

const Donate = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
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

  const handlePaymentProvider = (provider: typeof paymentProviders[0]) => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      toast.error("Please select a donation amount");
      return;
    }

    if (provider.url === "#") {
      toast.info(`${provider.name} integration coming soon. Please try another payment method.`);
      return;
    }

    const paymentUrl = `${provider.url}?amount=${amount}`;
    window.open(paymentUrl, "_blank");
    toast.success(`Redirecting to ${provider.name}...`);
  };

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
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden mb-6 shadow-xl bg-white p-2">
                <img src={scefLogo} alt="GFA Wallet" className="w-full h-full object-contain" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
                {t("donate.hero.title") || "Fund Education. Change Lives."}
              </h1>
              <p className="text-lg text-gold font-semibold mb-2">Powered by GFA Wallet • GetFinance Africa</p>
              <p className="text-cream/80 max-w-2xl mx-auto">
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

                  {/* Use Wallet CTA */}
                  <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={scefLogo} alt="GFA" className="w-8 h-8 rounded-lg object-contain bg-white p-0.5" />
                      <span className="font-semibold text-foreground">Have a GFA Wallet?</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Donate directly from your wallet balance for faster processing.</p>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/wallet")}>
                      <Wallet className="w-4 h-4 mr-2" />
                      Open My Wallet
                    </Button>
                  </div>
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

                      {/* Payment Provider Buttons */}
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 justify-center">
                          <img src={scefLogo} alt="GFA" className="w-6 h-6 rounded object-contain bg-white p-0.5" />
                          <span className="text-sm font-semibold text-foreground">Pay via GFA Wallet</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {paymentProviders.map((provider) => (
                            <button
                              key={provider.id}
                              type="button"
                              onClick={() => handlePaymentProvider(provider)}
                              disabled={loading}
                              className={`${provider.color} text-white py-3 px-4 rounded-xl font-semibold transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2`}
                            >
                              <span>{provider.name}</span>
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          Select a payment provider above to complete your ${selectedAmount || customAmount || 0} donation
                        </p>
                      </div>

                      {/* Security Notice */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
                        <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-muted-foreground">
                          <p className="font-semibold text-foreground mb-1">Secure & Transparent</p>
                          <p>All transactions are encrypted and auditable. You'll receive a receipt for your records.</p>
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

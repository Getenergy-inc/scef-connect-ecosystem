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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLocale } from "@/contexts/LocaleContext";
import { Heart, Shield, ExternalLink, Wallet, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import gfaWalletLogo from "@/assets/gfa-wallet-logo.jpg";
import { logger } from "@/lib/logger";

const donationAmounts = [5, 10, 25, 50, 100, 250, 500];

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

const designationOptions = [
  {
    id: "general",
    label: "General Support (SCEF)",
    description: "Apply where needed most across programmes.",
  },
  {
    id: "eduaid-scholarship",
    label: "EduAid-Africa — Scholarship Africa Fund",
    description: "Direct education access support (scholarships/learning support).",
  },
  {
    id: "nesa-2025",
    label: "NESA-Africa 2025 — Standards & Awards Delivery",
    description: "Supports verification, public education, and programme delivery (no influence on outcomes).",
  },
  {
    id: "nesa-tv",
    label: "NESA Africa TV — Education Broadcasting",
    description: "Supports production and public education programming.",
  },
  {
    id: "rmsa-2026",
    label: "Rebuild My School Africa (2026–2027) — Special Needs Focus",
    description: "Supports renovation of special needs education facilities across African regions.",
  },
];

const Donate = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [designation, setDesignation] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmedDesignation, setConfirmedDesignation] = useState("");

  const getDesignationLabel = (designationId: string) => {
    const option = designationOptions.find(opt => opt.id === designationId);
    return option ? option.label : "General Support (SCEF)";
  };

  const handlePaymentProvider = (provider: typeof paymentProviders[0]) => {
    const amount = selectedAmount || parseFloat(customAmount);
    if (!amount || amount <= 0) {
      toast.error("Please select or enter a donation amount");
      return;
    }

    if (provider.url === "#") {
      toast.info(`${provider.name} integration coming soon. Please try another payment method.`);
      return;
    }

    // Store designation for confirmation
    const finalDesignation = designation || "general";
    setConfirmedDesignation(getDesignationLabel(finalDesignation));

    const paymentUrl = `${provider.url}?amount=${amount}&designation=${encodeURIComponent(finalDesignation)}`;
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

    const finalDesignation = designation || "general";
    const designationLabel = getDesignationLabel(finalDesignation);

    try {
      const { error } = await supabase.from("donations").insert({
        amount,
        donor_name: isAnonymous ? "Anonymous" : donorName,
        donor_email: donorEmail,
        message: `${message}${message ? '\n\n' : ''}Designation: ${designationLabel}`,
        is_anonymous: isAnonymous,
        payment_status: "pending",
      });

      if (error) throw error;

      setConfirmedDesignation(designationLabel);
      setShowConfirmation(true);
      
      // Reset form
      setSelectedAmount(25);
      setCustomAmount("");
      setDesignation("");
      setDonorName("");
      setDonorEmail("");
      setMessage("");
    } catch (error: unknown) {
      logger.error("Donation error:", error);
      toast.error(t("donate.errors.failed") || "Failed to process donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showConfirmation) {
    return (
      <>
        <Helmet>
          <title>Thank You - SCEF</title>
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-24 pb-20">
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="max-w-lg mx-auto text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                    Thank You for Your Generosity!
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Your donation has been received. A confirmation email will be sent to your inbox shortly.
                  </p>
                  <Card className="text-left mb-8">
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Designation:</span>
                          <span className="font-medium text-foreground">{confirmedDesignation}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => setShowConfirmation(false)}>
                      <Heart className="w-4 h-4 mr-2" />
                      Make Another Donation
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/")}>
                      Return Home
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <Footer />
        </div>
      </>
    );
  }

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
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden mb-6 shadow-xl">
                <img src={gfaWalletLogo} alt="GFA Wallet" className="w-full h-full object-contain" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-2">
                {t("donate.hero.title") || "Fund Education. Change Lives."}
              </h1>
              <p className="text-lg text-scef-gold font-semibold mb-2">Powered by GFA Wallet • GetFinance Africa</p>
              <p className="text-cream/80 max-w-2xl mx-auto">
                {t("donate.hero.subtitle") || "Your donation directly supports scholarships, school infrastructure, and educational programs across Africa."}
              </p>
            </div>
          </section>

          {/* Donation Form */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t("donate.formTitle") || "Make a Donation"}</CardTitle>
                    <CardDescription>{t("donate.formDesc") || "All donations are tax-deductible where applicable."}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleDonate} className="space-y-6">
                      {/* Amount Selection */}
                      <div className="space-y-3">
                        <Label className="text-base font-semibold">
                          Select Amount (USD) <span className="text-destructive">*</span>
                        </Label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                          {donationAmounts.map((amount) => (
                            <button
                              key={amount}
                              type="button"
                              onClick={() => {
                                setSelectedAmount(amount);
                                setCustomAmount("");
                              }}
                              className={`py-3 rounded-lg font-medium transition-all text-sm ${
                                selectedAmount === amount
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground hover:bg-primary/20"
                              }`}
                            >
                              ${amount}
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedAmount(null);
                              document.getElementById('customAmount')?.focus();
                            }}
                            className={`py-3 rounded-lg font-medium transition-all text-sm ${
                              selectedAmount === null && customAmount
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground hover:bg-primary/20"
                            }`}
                          >
                            Custom
                          </button>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input
                            id="customAmount"
                            type="number"
                            min="1"
                            placeholder={t("donate.customAmount") || "Enter custom amount"}
                            value={customAmount}
                            onChange={(e) => {
                              setCustomAmount(e.target.value);
                              setSelectedAmount(null);
                            }}
                            className="pl-8"
                            aria-label="Custom donation amount"
                          />
                        </div>
                      </div>

                      {/* Designation Dropdown */}
                      <div className="space-y-2">
                        <Label htmlFor="designation" className="text-base font-semibold">
                          Designate my donation (optional)
                        </Label>
                        <Select value={designation} onValueChange={setDesignation}>
                          <SelectTrigger 
                            id="designation" 
                            className="w-full bg-background"
                            aria-label="Select donation designation"
                          >
                            <SelectValue placeholder="Select a programme to support..." />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border z-50">
                            {designationOptions.map((option) => (
                              <SelectItem 
                                key={option.id} 
                                value={option.id}
                                className="cursor-pointer"
                              >
                                <div className="flex flex-col py-1">
                                  <span className="font-medium">{option.label}</span>
                                  <span className="text-xs text-muted-foreground">{option.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground flex items-start gap-2">
                          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          If you do not select a designation, your donation will be used for the highest priority needs across SCEF programmes.
                        </p>
                      </div>

                      {/* Donor Info */}
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="donorName">{t("donate.yourName") || "Your Name"}</Label>
                            <Input
                              id="donorName"
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                              placeholder="John Doe"
                              disabled={isAnonymous}
                              aria-label="Donor name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="donorEmail">
                              {t("donate.email") || "Email Address"} <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id="donorEmail"
                              type="email"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                              placeholder="john@example.com"
                              required
                              aria-label="Donor email address"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">{t("donate.message") || "Message (Optional)"}</Label>
                          <Textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t("donate.messagePlaceholder") || "Leave a message of support..."}
                            rows={3}
                            aria-label="Donation message"
                          />
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="rounded border-border"
                            aria-label="Make donation anonymous"
                          />
                          <span className="text-sm text-muted-foreground">{t("donate.anonymous") || "Make my donation anonymous"}</span>
                        </label>
                      </div>

                      {/* Transparency Notice */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                          <strong>Transparency Note:</strong> Donations do not influence award verification, voting, jury review, or results.
                        </p>
                      </div>

                      {/* Payment Provider Buttons */}
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2 justify-center">
                          <img src={gfaWalletLogo} alt="GFA" className="w-6 h-6 rounded object-contain" />
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
                              aria-label={`Pay with ${provider.name}`}
                            >
                              <span>{provider.name}</span>
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          Select a payment provider above to complete your ${selectedAmount || customAmount || 0} donation
                          {designation && ` for ${getDesignationLabel(designation)}`}
                        </p>
                      </div>

                      {/* Governance Notice */}
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-amber-800 dark:text-amber-200">
                          <strong>Important:</strong> Donations and sponsorship payments are processed only via the official GFA Wallet channel. SCEF staff/volunteers will never request payment to personal accounts.
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

                      {/* Use Wallet CTA */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={gfaWalletLogo} alt="GFA" className="w-8 h-8 rounded-lg object-contain" />
                          <span className="font-semibold text-foreground">Have a GFA Wallet?</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">Donate directly from your wallet balance for faster processing.</p>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/wallet")}>
                          <Wallet className="w-4 h-4 mr-2" />
                          Open My Wallet
                        </Button>
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
                {t("home.impact.title") || "Your Impact"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { value: "$2M+", label: t("donate.stats.raised") || "Raised" },
                  { value: "5,000+", label: t("home.impact.metrics.scholarships") || "Scholarships" },
                  { value: "150+", label: t("home.impact.metrics.schools") || "Schools" },
                  { value: "25+", label: t("home.impact.metrics.chapters") || "Chapters" },
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

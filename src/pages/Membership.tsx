import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { 
  Users, CheckCircle, ArrowRight, Star, 
  Globe, Award, BookOpen, Heart, Vote, Coins, Shield 
} from "lucide-react";

const Membership = () => {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState("Active Member");

  const membershipTiers = [
    {
      name: "Basic Member",
      price: t("membership.tiers.basic.price") || "Free",
      description: t("membership.tiers.basic.description") || "Start your journey with SCEF",
      features: [
        "Access to member dashboard",
        "Newsletter subscription",
        "Event notifications",
        "Join local chapters",
        "Access to public resources",
      ],
      popular: false,
    },
    {
      name: "Active Member",
      price: t("membership.tiers.active.price") || "$25/year",
      description: t("membership.tiers.active.description") || "Full access to SCEF programs and governance",
      features: [
        "All Basic features",
        "NESA voting rights",
        "Priority event registration",
        "Official member certificate",
        "Exclusive webinars access",
        "AGC token allocation",
        "Chapter leadership eligibility",
      ],
      popular: true,
    },
    {
      name: "Patron Member",
      price: t("membership.tiers.patron.price") || "$100/year",
      description: t("membership.tiers.patron.description") || "Premium support for Africa's education future",
      features: [
        "All Active features",
        "VIP event access",
        "Named recognition on platforms",
        "Direct impact reports",
        "Advisory board eligibility",
        "Exclusive mentor network",
        "Premium AGC allocation",
        "Governance participation",
      ],
      popular: false,
    },
  ];

  const benefits = [
    { icon: Globe, label: t("home.impact.metrics.chapters"), desc: t("home.chaptersBlock.body") },
    { icon: Vote, label: t("membership.benefits.voting") || "Voting Rights", desc: t("membership.benefits.votingDesc") || "Participate in NESA awards and governance" },
    { icon: Coins, label: t("membership.benefits.tokens") || "AGC Tokens", desc: t("membership.benefits.tokensDesc") || "Receive Afri Gold Coin for exclusive benefits" },
    { icon: Shield, label: t("governance.bgeo.metrics.trust"), desc: t("governance.bgeo.metrics.trustDesc") },
  ];

  return (
    <>
      <Helmet>
        <title>{t("home.hero.ctaPrimary")} - SCEF</title>
        <meta name="description" content={t("about.hero.subtitle")} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero */}
          <section className="relative pt-32 pb-20 bg-scef-blue overflow-hidden">
            <div className="absolute inset-0 bg-african-pattern opacity-10" />
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-scef-gold flex items-center justify-center mb-6 border-2 border-black">
                  <Users className="w-10 h-10 text-scef-blue" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {t("home.hero.ctaPrimary")}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  {t("about.hero.subtitle")}
                </p>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 bg-muted/30 border-b-2 border-black">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {benefits.map((benefit) => (
                  <div key={benefit.label} className="text-center p-6 rounded-xl bg-card border-2 border-black hover:shadow-lg transition-shadow">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-scef-gold/20 flex items-center justify-center mb-4 border-2 border-black">
                      <benefit.icon className="w-7 h-7 text-scef-blue" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">{benefit.label}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tiers */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("membership.chooseTier") || "Choose Your Membership"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("membership.chooseTierDesc") || "Select the membership tier that best fits your commitment to Africa's education future."}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {membershipTiers.map((tier) => (
                  <Card 
                    key={tier.name}
                    className={`relative cursor-pointer transition-all border-2 border-black ${
                      selectedTier === tier.name 
                        ? "shadow-xl ring-2 ring-scef-gold bg-scef-blue/5" 
                        : "hover:shadow-lg hover:border-scef-blue"
                    }`}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-scef-gold text-scef-blue text-xs font-bold rounded-full flex items-center gap-1 border-2 border-black">
                        <Star className="w-3 h-3" />
                        {t("membership.recommended") || "Recommended"}
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <div className="text-3xl font-display font-bold text-scef-blue mt-2">
                        {tier.price}
                      </div>
                      <CardDescription className="mt-2">{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-scef-gold mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button 
                  size="lg" 
                  className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                  onClick={() => navigate("/auth")}
                >
                  {t("membership.continueWith") || "Continue with"} {selectedTier}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  {t("membership.alreadyMember") || "Already a member?"} <Link to="/auth" className="text-scef-blue font-medium hover:underline">{t("nav.top.signin")}</Link>
                </p>
              </div>
            </div>
          </section>

          {/* What You Get */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
                  {t("membership.whatYouGet") || "What Members Receive"}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { icon: Award, title: t("membership.benefits.recognition") || "Official Recognition", desc: t("membership.benefits.recognitionDesc") || "Receive your official SCEF membership certificate and credentials" },
                    { icon: Globe, title: t("membership.benefits.chapters") || "Chapter Access", desc: t("membership.benefits.chaptersDesc") || "Join or create local chapters and connect with members in your area" },
                    { icon: BookOpen, title: t("membership.benefits.learning") || "Learning Resources", desc: t("membership.benefits.learningDesc") || "Access exclusive webinars, courses, and educational materials" },
                    { icon: Heart, title: t("membership.benefits.impact") || "Direct Impact", desc: t("membership.benefits.impactDesc") || "Your membership directly funds scholarships and school programs" },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4 p-6 rounded-xl bg-card border-2 border-black hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-scef-gold/20 flex items-center justify-center flex-shrink-0 border-2 border-black">
                        <item.icon className="w-6 h-6 text-scef-blue" />
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-scef-blue border-t-2 border-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                {t("home.final.title")}
              </h2>
              <p className="text-white/70 max-w-xl mx-auto mb-8">
                {t("about.hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                  onClick={() => navigate("/auth")}
                >
                  {t("home.final.ctaJoin")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" className="bg-transparent text-white border-2 border-scef-gold hover:bg-scef-gold/20" asChild>
                  <Link to="/contact">{t("footer.contact")}</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Membership;

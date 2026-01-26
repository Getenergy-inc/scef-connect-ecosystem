import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const [selectedTier, setSelectedTier] = useState("Standard Member");

  // Read query params from join-online flow
  const chapterCountry = searchParams.get("chapter");
  const participationType = searchParams.get("type");
  const diasporaLocation = searchParams.get("location");

  // Pre-fill context message based on join-online flow
  const joinContext = chapterCountry ? {
    country: chapterCountry,
    type: participationType || "resident",
    location: diasporaLocation,
  } : null;

  const membershipTiers = [
    {
      name: "General Member",
      price: "Free",
      period: "",
      description: "Start your journey with SCEF (18+)",
      features: [
        "Access to online platforms",
        "Newsletter subscription",
        "Chapter observation",
        "Event notifications",
      ],
      popular: false,
      voting: false,
    },
    {
      name: "Youth Member",
      price: "Free",
      period: "",
      description: "For ages 13–17 with parental consent",
      features: [
        "Mentorship programs",
        "Educational resources",
        "Youth workshops",
        "My Career, My Life access",
      ],
      popular: false,
      voting: false,
    },
    {
      name: "Standard Member",
      price: "$50",
      period: "/year",
      description: "Full access to SCEF programs and governance",
      features: [
        "All General features",
        "Voting rights in elections",
        "Priority event registration",
        "Training workshops",
        "Digital recognition",
        "Chapter leadership eligibility",
      ],
      popular: true,
      voting: true,
    },
    {
      name: "Organizational Member",
      price: "$200",
      period: "/year",
      description: "For institutions and organizations",
      features: [
        "All Standard features",
        "Voting rights",
        "Branding opportunities",
        "Program collaboration",
        "Corporate recognition",
        "CSR partnership access",
      ],
      popular: false,
      voting: true,
    },
    {
      name: "Lifetime Member",
      price: "$1,000",
      period: "one-time",
      description: "Permanent commitment to Africa's education",
      features: [
        "All Standard features",
        "Permanent recognition",
        "Advisory board eligibility",
        "VIP event access",
        "Legacy naming opportunities",
        "Premium AGC allocation",
      ],
      popular: false,
      voting: true,
    },
  ];

  const ambassadorTiers = [
    {
      name: "Ambassador-1",
      price: "$100",
      period: "/year",
      requirements: "Requires Standard/Lifetime membership",
      commitment: "5 hours/month",
      description: "Lead outreach for a single program (e.g., EduAid-Africa)",
      features: [
        "Program-specific leadership",
        "Official ambassador badge",
        "Training & mentorship",
        "Impact reporting tools",
      ],
    },
    {
      name: "Ambassador-2",
      price: "$200",
      period: "/year",
      requirements: "Requires Ambassador-1 experience",
      commitment: "10 hours/month",
      description: "Manage multiple programs, mentor other ambassadors",
      features: [
        "Multi-program coordination",
        "Ambassador mentorship role",
        "Regional representation",
        "Enhanced recognition",
      ],
    },
    {
      name: "Ambassador-3",
      price: "$300",
      period: "/year",
      requirements: "Requires Ambassador-2 experience",
      commitment: "15 hours/month",
      description: "Lead global advocacy and high-level partnerships",
      features: [
        "Global advocacy leadership",
        "Partnership development",
        "Board consultation rights",
        "SCEF representation at events",
      ],
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
        <title>{t("membership.hero.title")} - SCEF</title>
        <meta name="description" content={t("membership.hero.subtitle")} />
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
                  {t("membership.hero.title")}
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  {t("membership.hero.subtitle")}
                </p>
                
                {/* Show join context if coming from join-online flow */}
                {joinContext && (
                  <div className="mt-6 p-4 bg-white/10 rounded-xl border border-white/20 backdrop-blur-sm">
                    <p className="text-white/90 text-sm mb-2">
                      <span className="font-semibold">Joining as:</span>{" "}
                      {joinContext.type === "resident" && `Resident of ${joinContext.country}`}
                      {joinContext.type === "diaspora" && `${joinContext.country} Diaspora${joinContext.location ? ` in ${joinContext.location}` : ""}`}
                      {joinContext.type === "friend" && `Friend of ${joinContext.country}`}
                    </p>
                    <p className="text-white/70 text-xs">
                      Your chapter preference has been saved. Complete your membership below.
                    </p>
                  </div>
                )}
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

          {/* Membership Tiers */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {t("membership.chooseTier") || "Membership Tiers"}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t("membership.chooseTierDesc") || "Select the membership tier that best fits your commitment to Africa's education future."}
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
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
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-scef-gold text-scef-blue text-xs font-bold rounded-full flex items-center gap-1 border-2 border-black whitespace-nowrap">
                        <Star className="w-3 h-3" />
                        {t("membership.recommended") || "Recommended"}
                      </div>
                    )}
                    <CardHeader className="text-center pt-8 pb-4">
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <div className="text-2xl font-display font-bold text-scef-blue mt-2">
                        {tier.price}
                        {tier.period && <span className="text-sm font-normal text-muted-foreground">{tier.period}</span>}
                      </div>
                      <CardDescription className="mt-2 text-xs">{tier.description}</CardDescription>
                      {tier.voting && (
                        <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-scef-gold/20 rounded-full text-xs font-medium text-scef-blue">
                          <Vote className="w-3 h-3" />
                          Voting Rights
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-2">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-xs">
                            <CheckCircle className="w-3.5 h-3.5 text-scef-gold mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-8">
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

          {/* Ambassador Tiers */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-scef-gold/20 rounded-full text-scef-blue font-semibold mb-4 border border-scef-gold">
                  <Award className="w-5 h-5" />
                  Higher Commitment Tiers
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ambassador Program
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Ambassadors are project-based leaders who represent SCEF at local, regional, or global levels with specific program responsibilities.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {ambassadorTiers.map((tier, index) => (
                  <Card 
                    key={tier.name}
                    className="relative border-2 border-scef-gold bg-gradient-to-b from-scef-gold/5 to-transparent hover:shadow-xl transition-all"
                  >
                    <div className="absolute -top-3 left-4 px-3 py-1 bg-scef-blue text-white text-xs font-bold rounded-full border-2 border-black">
                      Tier {index + 1}
                    </div>
                    <CardHeader className="text-center pt-8">
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <div className="text-3xl font-display font-bold text-scef-blue mt-2">
                        {tier.price}
                        <span className="text-sm font-normal text-muted-foreground">{tier.period}</span>
                      </div>
                      <CardDescription className="mt-2">{tier.description}</CardDescription>
                      <div className="mt-3 space-y-1 text-xs">
                        <p className="text-scef-blue font-medium">{tier.requirements}</p>
                        <p className="text-muted-foreground">Commitment: {tier.commitment}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
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

              <div className="text-center mt-10">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white font-semibold"
                  onClick={() => navigate("/get-involved/ambassador")}
                >
                  Apply to Become an Ambassador
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
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
                  <Link to="/contact">{t("footer.columns.contact")}</Link>
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

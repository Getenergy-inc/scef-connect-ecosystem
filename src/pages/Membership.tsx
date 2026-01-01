import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, CheckCircle, ArrowRight, Star, 
  Globe, Award, BookOpen, Heart, Vote, Coins, Shield 
} from "lucide-react";

const membershipTiers = [
  {
    name: "Basic Member",
    price: "Free",
    description: "Start your journey with SCEF",
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
    price: "$25/year",
    description: "Full access to SCEF programs and governance",
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
    price: "$100/year",
    description: "Premium support for Africa's education future",
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
  { icon: Globe, label: "Pan-African Network", desc: "Connect with members across 25+ countries" },
  { icon: Vote, label: "Voting Rights", desc: "Participate in NESA awards and governance" },
  { icon: Coins, label: "AGC Tokens", desc: "Receive Afri Gold Coin for exclusive benefits" },
  { icon: Shield, label: "Institutional Backing", desc: "Be part of a governed, trusted institution" },
];

const Membership = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState("Active Member");

  return (
    <>
      <Helmet>
        <title>Join SCEF | Become a Member - Africa's Education Institution</title>
        <meta name="description" content="Join SCEF membership to support and participate in Africa's education transformation. Access programs, voting rights, and connect with chapters." />
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
                  Join <span className="text-scef-gold">SCEF</span>
                </h1>
                <p className="text-xl text-white/80 leading-relaxed">
                  Become part of Africa's premier education institution. Your membership supports 
                  scholarships, programs, and community chapters across the continent.
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
                  Choose Your <span className="text-scef-gold">Membership</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Select the membership tier that best fits your commitment to Africa's education future.
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
                        Recommended
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
                  Continue with {selectedTier}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Already a member? <Link to="/auth" className="text-scef-blue font-medium hover:underline">Sign in here</Link>
                </p>
              </div>
            </div>
          </section>

          {/* What You Get */}
          <section className="py-20 bg-muted/30 border-y-2 border-black">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
                  What Members <span className="text-scef-gold">Receive</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { icon: Award, title: "Official Recognition", desc: "Receive your official SCEF membership certificate and credentials" },
                    { icon: Globe, title: "Chapter Access", desc: "Join or create local chapters and connect with members in your area" },
                    { icon: BookOpen, title: "Learning Resources", desc: "Access exclusive webinars, courses, and educational materials" },
                    { icon: Heart, title: "Direct Impact", desc: "Your membership directly funds scholarships and school programs" },
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

          {/* FAQ */}
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
                Frequently Asked <span className="text-scef-gold">Questions</span>
              </h2>
              <div className="max-w-2xl mx-auto space-y-6">
                {[
                  {
                    q: "Can I change my membership tier later?",
                    a: "Yes, you can upgrade or downgrade your membership at any time through your dashboard.",
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept credit/debit cards, bank transfers, mobile money, and payments via GFA Wallet.",
                  },
                  {
                    q: "Is my membership tax-deductible?",
                    a: "SCEF is a registered non-profit. Membership fees may be tax-deductible depending on your jurisdiction.",
                  },
                  {
                    q: "How do I receive my AGC tokens?",
                    a: "AGC tokens are automatically credited to your GFA Wallet upon membership activation.",
                  },
                ].map((faq) => (
                  <div key={faq.q} className="p-6 bg-card rounded-xl border-2 border-black hover:shadow-lg transition-shadow">
                    <h3 className="font-medium text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-scef-blue border-t-2 border-black">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Join Africa's Education <span className="text-scef-gold">Movement</span>?
              </h2>
              <p className="text-white/70 max-w-xl mx-auto mb-8">
                Become a member today and start making an impact on education across the continent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-scef-gold text-scef-blue hover:bg-scef-gold-light border-2 border-black font-semibold"
                  onClick={() => navigate("/auth")}
                >
                  Join SCEF Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button size="lg" className="bg-transparent text-white border-2 border-scef-gold hover:bg-scef-gold/20" asChild>
                  <Link to="/contact">Contact Us</Link>
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

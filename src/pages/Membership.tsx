import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, CheckCircle, ArrowRight, Star, 
  Globe, Award, BookOpen, Heart 
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
    ],
    popular: false,
  },
  {
    name: "Active Member",
    price: "$25/year",
    description: "Full access to SCEF programs",
    features: [
      "All Basic features",
      "NESA voting rights",
      "Priority event registration",
      "Member certificate",
      "Exclusive webinars",
      "AGC token bonus",
    ],
    popular: true,
  },
  {
    name: "Patron Member",
    price: "$100/year",
    description: "Premium support for education",
    features: [
      "All Active features",
      "VIP event access",
      "Named recognition",
      "Direct impact reports",
      "Leadership opportunities",
      "Mentor access",
      "Premium AGC bonus",
    ],
    popular: false,
  },
];

const Membership = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState("Active Member");

  return (
    <>
      <Helmet>
        <title>Become a Member | SCEF - Join Africa's Education Network</title>
        <meta name="description" content="Join SCEF membership to support education across Africa. Access exclusive programs, voting rights, and connect with chapters." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="bg-gradient-to-br from-earth to-earth/90 text-cream py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mb-6">
                <Users className="w-10 h-10 text-earth" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                Become a <span className="text-gold">SCEF Member</span>
              </h1>
              <p className="text-lg text-cream/80 max-w-2xl mx-auto">
                Join thousands of education advocates across Africa. Your membership supports 
                scholarships, programs, and community chapters.
              </p>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {[
                  { icon: Globe, label: "Pan-African Network" },
                  { icon: Award, label: "NESA Voting Rights" },
                  { icon: BookOpen, label: "Exclusive Programs" },
                  { icon: Heart, label: "Direct Impact" },
                ].map((benefit) => (
                  <div key={benefit.label} className="text-center">
                    <div className="w-14 h-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <benefit.icon className="w-7 h-7 text-primary" />
                    </div>
                    <p className="font-medium text-foreground">{benefit.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tiers */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
                Choose Your Membership
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {membershipTiers.map((tier) => (
                  <Card 
                    key={tier.name}
                    className={`relative cursor-pointer transition-all ${
                      selectedTier === tier.name 
                        ? "border-primary shadow-lg ring-2 ring-primary/20" 
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Most Popular
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <div className="text-3xl font-display font-bold text-primary">
                        {tier.price}
                      </div>
                      <CardDescription>{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" onClick={() => navigate("/auth")}>
                  Continue with {selectedTier}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 className="font-display text-3xl font-bold text-center text-foreground mb-12">
                Frequently Asked Questions
              </h2>
              <div className="max-w-2xl mx-auto space-y-6">
                {[
                  {
                    q: "Can I change my membership tier later?",
                    a: "Yes, you can upgrade or downgrade your membership at any time through your dashboard.",
                  },
                  {
                    q: "What payment methods do you accept?",
                    a: "We accept credit/debit cards, bank transfers, and mobile money in supported regions.",
                  },
                  {
                    q: "Is my membership tax-deductible?",
                    a: "SCEF is a registered non-profit. Membership fees may be tax-deductible depending on your jurisdiction.",
                  },
                ].map((faq) => (
                  <div key={faq.q} className="p-6 bg-background rounded-xl border border-border">
                    <h3 className="font-medium text-foreground mb-2">{faq.q}</h3>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
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

export default Membership;

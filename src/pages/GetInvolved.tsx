import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { Users, Award, HandHeart, ArrowRight, CheckCircle } from "lucide-react";

const GetInvolved = () => {
  const { t } = useLocale();

  const involvementOptions = [
    {
      id: "member",
      title: t("nav.dropdown.getInvolved.member"),
      description: t("about.hero.subtitle"),
      icon: Users,
      benefits: [
        t("membership.benefits.learning") || "Access to exclusive programs and events",
        t("membership.benefits.voting") || "Voting rights in NESA Awards",
        t("membership.benefits.chapters") || "Connect with chapters nationwide",
        t("membership.benefits.impact") || "Receive impact reports",
        "Member dashboard access",
      ],
      cta: t("home.hero.ctaPrimary"),
      href: "/membership",
      color: "from-gold to-gold-light",
    },
    {
      id: "ambassador",
      title: t("nav.dropdown.getInvolved.ambassador"),
      description: t("home.hero.ctaAmbassador"),
      icon: Award,
      benefits: [
        "Leadership training and certification",
        "Official SCEF ambassador title",
        "Priority event invitations",
        "Networking opportunities",
        "Recognition in media",
      ],
      cta: t("home.hero.ctaAmbassador"),
      href: "/ambassador",
      color: "from-terracotta to-terracotta-light",
    },
    {
      id: "volunteer",
      title: t("nav.dropdown.getInvolved.volunteer"),
      description: t("home.media.ctaVolunteer"),
      icon: HandHeart,
      benefits: [
        "Flexible commitment options",
        "Skills development",
        "Certificate of appreciation",
        "Volunteer network access",
        "Make direct impact",
      ],
      cta: t("nav.dropdown.getInvolved.volunteer"),
      href: "/volunteer",
      color: "from-forest to-forest-light",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t("nav.top.getInvolved")} - SCEF</title>
        <meta name="description" content={t("about.hero.subtitle")} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="bg-gradient-to-br from-earth to-earth/90 text-cream py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {t("nav.top.getInvolved")}
              </h1>
              <p className="text-lg text-cream/80 max-w-2xl mx-auto">
                {t("about.hero.subtitle")}
              </p>
            </div>
          </section>

          {/* Options */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {involvementOptions.map((option) => (
                  <Card key={option.id} className="relative overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${option.color}`} />
                    <CardHeader className="pt-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}>
                        <option.icon className="w-8 h-8 text-earth" />
                      </div>
                      <CardTitle className="text-2xl">{option.title}</CardTitle>
                      <CardDescription className="text-base">{option.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {option.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-forest mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full" asChild>
                        <Link to={option.href}>
                          {option.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                {t("home.final.title")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                {t("about.hero.subtitle")}
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">{t("footer.contact")}</Link>
              </Button>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GetInvolved;

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocale } from "@/contexts/LocaleContext";
import { Users, Award, HandHeart, ArrowRight, CheckCircle, Briefcase } from "lucide-react";
import { emailDirectory } from "@/config/emailDirectory";

const GetInvolved = () => {
  const { t } = useLocale();

  const involvementOptions = [
    {
      id: "member",
      title: t("getInvolved.options.member.title"),
      description: t("getInvolved.options.member.description"),
      icon: Users,
      benefits: [
        "Access to exclusive programs and events",
        "Voting rights in NESA Awards",
        "Connect with chapters nationwide",
        "Receive impact reports",
        "Member dashboard access",
      ],
      cta: t("membership.cta.join"),
      href: "/membership",
      color: "from-gold to-gold-light",
    },
    {
      id: "ambassador",
      title: t("getInvolved.options.ambassador.title"),
      description: t("getInvolved.options.ambassador.description"),
      icon: Award,
      benefits: [
        "Leadership training and certification",
        "Official SCEF ambassador title",
        "Priority event invitations",
        "Networking opportunities",
        "Recognition in media",
      ],
      cta: t("cta.becomeAmbassador"),
      href: "/ambassador",
      color: "from-terracotta to-terracotta-light",
    },
    {
      id: "volunteer",
      title: t("getInvolved.options.volunteer.title"),
      description: t("getInvolved.options.volunteer.description"),
      icon: HandHeart,
      benefits: [
        "Flexible commitment options",
        "Skills development",
        "Certificate of appreciation",
        "Volunteer network access",
        "Make direct impact",
      ],
      cta: t("getInvolved.options.volunteer.title"),
      href: "/volunteer",
      email: emailDirectory.volunteer,
      color: "from-forest to-forest-light",
    },
    {
      id: "careers",
      title: "Join Our Team",
      description: "Explore career opportunities at SCEF",
      icon: Briefcase,
      benefits: [
        "Full-time & part-time positions",
        "Internship programs",
        "Remote work options",
        "Professional development",
        "Make a Pan-African impact",
      ],
      cta: "View Vacancies",
      href: "/vacancies",
      email: emailDirectory.hr,
      color: "from-primary to-primary/80",
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
          <section className="bg-gradient-to-br from-scef-blue-darker to-scef-blue-dark text-white py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {t("nav.top.getInvolved")}
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                {t("about.hero.subtitle")}
              </p>
            </div>
          </section>

          {/* Options */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {involvementOptions.map((option) => (
                  <Card key={option.id} className="relative overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${option.color}`} />
                    <CardHeader className="pt-8">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center mb-4`}>
                        <option.icon className="w-7 h-7 text-earth" />
                      </div>
                      <CardTitle className="text-xl">{option.title}</CardTitle>
                      <CardDescription className="text-sm">{option.description}</CardDescription>
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
                      <div className="space-y-2">
                        <Button className="w-full" asChild>
                          <Link to={option.href}>
                            {option.cta}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                        {option.email && (
                          <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                            <a href={`mailto:${option.email}`}>
                              Or email: {option.email}
                            </a>
                          </Button>
                        )}
                      </div>
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
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">{t("footer.columns.contact")}</Link>
                </Button>
                <Button size="lg" asChild>
                  <Link to="/partners">Partner With Us</Link>
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

export default GetInvolved;

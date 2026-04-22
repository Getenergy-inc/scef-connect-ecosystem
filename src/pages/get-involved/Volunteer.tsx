import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, HandHeart, Clock, Award, Users, Mail } from "lucide-react";
import { emailDirectory } from "@/config/emailDirectory";

const Volunteer = () => {
  const benefits = [
    { icon: Clock, title: "Flexible Commitment", desc: "Choose your hours and engagement style — remote or local." },
    { icon: Award, title: "Skills Development", desc: "Training, certificates, and a recognised volunteer record." },
    { icon: Users, title: "Pan-African Network", desc: "Join a community of changemakers across regions." },
    { icon: HandHeart, title: "Direct Impact", desc: "Contribute to programs, chapters, events, and outreach." },
  ];

  const tracks = [
    "Programs Support (EduAid, RMSA, EOA, eLibrary)",
    "Local Chapter Operations",
    "Media & Communications",
    "Events & Awards (NESA-Africa)",
    "Research, Policy & Documentation",
    "Translation & Language Support",
  ];

  return (
    <>
      <Helmet>
        <title>Volunteer with SCEF — Pan-African Education Impact</title>
        <meta name="description" content="Join SCEF as a volunteer and contribute to advancing education across Africa. Flexible roles in programs, chapters, media, and events." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-scef-blue-darker via-scef-blue to-scef-blue-dark text-white py-24 md:py-32 overflow-hidden">
            <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-forest/15 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 text-center relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-scef-gold text-xs font-semibold uppercase tracking-widest mb-8">
                Volunteer Programme
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
                Give your <span className="text-scef-gold">time</span>, change a continent
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8">
                Volunteers power SCEF's programs, chapters, and media. Choose a track that fits your skills and schedule.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button size="lg" asChild className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-light">
                  <Link to="/auth/sign-up?path=volunteer">
                    Apply to Volunteer
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                  <a href={`mailto:${emailDirectory.volunteer}`}>
                    <Mail className="w-4 h-4 mr-2" />
                    {emailDirectory.volunteer}
                  </a>
                </Button>
              </div>
            </div>
          </section>

          {/* Benefits */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {benefits.map((b) => (
                  <Card key={b.title} className="border-border/60">
                    <CardHeader className="pb-2">
                      <div className="w-11 h-11 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-3">
                        <b.icon className="w-5 h-5" />
                      </div>
                      <CardTitle className="text-base">{b.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{b.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Tracks */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                  Volunteer tracks
                </h2>
                <p className="text-muted-foreground">
                  Pick the area where your skills create the most impact.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {tracks.map((track) => (
                  <div key={track} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/60">
                    <CheckCircle className="w-5 h-5 text-forest mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{track}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Button size="lg" asChild>
                  <Link to="/auth/sign-up?path=volunteer">
                    Start your application
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
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

export default Volunteer;

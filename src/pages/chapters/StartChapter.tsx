import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Compass } from "lucide-react";

const steps = [
  { icon: Compass, title: "Express Interest", desc: "Tell us about your region, motivation, and capacity to lead." },
  { icon: Users, title: "Convene a Founding Team", desc: "Build a small founding team aligned with SCEF values." },
  { icon: MapPin, title: "Charter Your Chapter", desc: "Receive your chapter charter and onboarding kit." },
];

const StartChapter = () => (
  <>
    <Helmet>
      <title>Start a Chapter — SCEF</title>
      <meta name="description" content="Lead SCEF in your region. Start a chapter and bring Education for All advocacy to your community." />
    </Helmet>
    <div className="min-h-screen bg-background">
      <HeaderScreenshot />
      <div className="h-[76px] md:h-[84px]" />
      <main>
        <section className="bg-scef-blue-darker py-24 text-white md:py-32">
          <div className="container mx-auto px-6 md:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-scef-gold">Start a Chapter</p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Bring SCEF to <span className="text-gradient-gold italic">your region</span>.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/75">
              Chapters are the regional engine of SCEF — leading advocacy, programs, and recognition pathways close to home.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover">
                <Link to="/contact">Express Interest <ArrowRight className="ms-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/chapters">Browse Existing Chapters</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background py-20">
          <div className="container mx-auto px-6 md:px-8">
            <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">How it works</p>
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="rounded-2xl border border-border bg-card p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-xs font-semibold text-scef-gold-dark">0{i + 1}</span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-scef-blue-darker/[0.06] text-scef-blue-darker">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-scef-blue-darker">{title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-2xl border border-border bg-muted/30 p-8 text-center md:p-12">
              <p className="text-sm text-muted-foreground">Detailed chapter charter, eligibility, and online application coming soon.</p>
              <Button asChild className="mt-5 bg-scef-blue-darker text-white hover:bg-scef-blue-dark">
                <Link to="/contact">Contact the Chapters Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  </>
);

export default StartChapter;

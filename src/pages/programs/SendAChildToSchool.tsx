import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Shirt, Utensils, GraduationCap } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";

const includes = [
  { icon: GraduationCap, label: "School fees for one academic year" },
  { icon: BookOpen, label: "Books, stationery & learning materials" },
  { icon: Shirt, label: "School uniform & basic essentials" },
  { icon: Utensils, label: "Daily school meal where applicable" },
];

const tiers = [
  { name: "Primary Learner", price: "USD 250 / year", body: "Sponsor one primary-school child for a full academic year." },
  { name: "Secondary Learner", price: "USD 450 / year", body: "Sponsor one secondary-school student including books and exam fees." },
  { name: "Special Needs Learner", price: "USD 600 / year", body: "Sponsor a learner with special needs — includes assistive support." },
  { name: "Sponsor a Classroom", price: "USD 5,000+", body: "Cover an entire classroom of learners with one consolidated gift." },
];

const SendAChildToSchool = () => (
  <PageShell
    title="Send a Child to School"
    description="Sponsor a learner's full academic year — fees, books, uniform and meals — through SCEF and EduAid-Africa."
    eyebrow="Programs"
    heading="Send a Child to School"
    intro="Give one African child a full academic year of education. Every sponsorship is delivered through verified schools and tracked under EduAid-Africa."
  >
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
        <div>
          <h2 className="font-display text-2xl font-bold text-scef-blue-darker mb-4">What your sponsorship covers</h2>
          <ul className="space-y-3">
            {includes.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-scef-gold/15 text-scef-gold flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-muted-foreground">{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-scef-blue/10 bg-scef-pattern p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">How it works</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Choose a sponsorship tier below.</li>
            <li>Complete payment via the GFA Wallet or verified channel.</li>
            <li>SCEF matches your gift with a learner through a verified school.</li>
            <li>Receive yearly impact updates and reports.</li>
          </ol>
        </div>
      </div>
    </section>

    <section className="bg-muted/30 border-y border-scef-blue/10">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-8 text-center">Sponsorship tiers</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((t) => (
            <div key={t.name} className="rounded-xl border border-scef-blue/10 bg-card p-6 flex flex-col">
              <h3 className="font-display text-lg font-semibold text-scef-blue-darker">{t.name}</h3>
              <p className="text-scef-gold font-bold mt-1">{t.price}</p>
              <p className="text-sm text-muted-foreground mt-3 flex-1">{t.body}</p>
              <Button asChild className="mt-5 bg-scef-blue hover:bg-scef-blue-darker text-white">
                <Link to="/wallet/donate">Sponsor Now <ArrowRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-6">
          Pricing in USD; equivalent local currency accepted. Reporting in progress for current cohort numbers.
        </p>
      </div>
    </section>

    <section className="container mx-auto px-4 py-12 md:py-16 text-center">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-4">Other ways to help</h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="outline" className="border-scef-blue/30">
          <Link to="/programs/eduaid-africa">Explore EduAid-Africa</Link>
        </Button>
        <Button asChild variant="outline" className="border-scef-blue/30">
          <Link to="/partner-with-us">Become a Corporate Partner</Link>
        </Button>
        <Button asChild variant="outline" className="border-scef-blue/30">
          <Link to="/get-involved/membership">Join SCEF</Link>
        </Button>
      </div>
    </section>
  </PageShell>
);

export default SendAChildToSchool;

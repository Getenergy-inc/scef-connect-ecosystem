import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Award,
  Compass,
  Hammer,
  GraduationCap,
  BookOpen,
  Library,
  Calendar,
  Megaphone,
  Footprints,
  ShoppingBag,
  Ticket,
  Plane,
  Building2,
  ArrowRight,
} from "lucide-react";

type CTA = {
  title: string;
  purpose: string;
  account: "NESA-Africa" | "EduAid-Africa" | "SCEF" | "EduAid-Africa / SCEF" | "GFA / SCEF" | "NESA-Africa / SCEF" | "SCEF / EduAid-Africa";
  icon: typeof Award;
  to: string;
};

const ctas: CTA[] = [
  { title: "Sponsor NESA-Africa", purpose: "Awards, nominations, gala, NESA TV, education recognition.", account: "NESA-Africa", icon: Award, to: "/wallet/donate?fund=nesa-africa" },
  { title: "Support My Career, My Life", purpose: "Career guidance, mentorship, employability, youth development.", account: "EduAid-Africa", icon: Compass, to: "/wallet/donate?fund=mcml" },
  { title: "Rebuild My School Africa", purpose: "School renovation, infrastructure, furniture, digital labs.", account: "EduAid-Africa", icon: Hammer, to: "/wallet/donate?fund=rmsa" },
  { title: "Send a Child to School", purpose: "Scholarships, school fees, learning materials.", account: "EduAid-Africa", icon: GraduationCap, to: "/wallet/donate?fund=scholarships" },
  { title: "Support eLibrary Africa", purpose: "Digital learning, eBooks, teacher resources, rural knowledge hubs.", account: "EduAid-Africa / SCEF", icon: BookOpen, to: "/wallet/donate?fund=elibrary" },
  { title: "Sponsor a Digital Library Hub", purpose: "Community learning centres, school eLibrary access, rural digital inclusion.", account: "EduAid-Africa", icon: Library, to: "/wallet/donate?fund=digital-hub" },
  { title: "Attend Seminars & Webinars", purpose: "Monthly training, capacity building, certificates.", account: "EduAid-Africa / SCEF", icon: Calendar, to: "/media/eduaid-webinars" },
  { title: "Sponsor an Advocacy Campaign", purpose: "Education, health, ESG, girls' education, teacher wellbeing.", account: "SCEF", icon: Megaphone, to: "/wallet/donate?fund=advocacy" },
  { title: "Join an Advocacy Walk", purpose: "Public awareness, community campaigns, school outreach.", account: "SCEF", icon: Footprints, to: "/get-involved/volunteer" },
  { title: "Buy Merchandise to Support", purpose: "Branded items supporting SCEF projects.", account: "GFA / SCEF", icon: ShoppingBag, to: "/wallet/donate?fund=merchandise" },
  { title: "Buy Award Gala Tickets", purpose: "NESA-Africa dinner, expo, award ceremony.", account: "NESA-Africa", icon: Ticket, to: "/wallet/donate?fund=gala-tickets" },
  { title: "Join Our Next Edu-Tourism Program", purpose: "Educational tours, cultural learning, youth exposure.", account: "SCEF / EduAid-Africa", icon: Plane, to: "/media/education-tourism-show" },
  { title: "Bid to Host the Next Event", purpose: "Host NESA, EduAid Expo, webinars, regional summits.", account: "NESA-Africa / SCEF", icon: Building2, to: "/partner-with-us" },
];

const accountStyle: Record<CTA["account"], string> = {
  "NESA-Africa": "bg-scef-gold/15 text-scef-gold-dark ring-scef-gold/30",
  "EduAid-Africa": "bg-[#1F892B]/10 text-[#1F892B] ring-[#1F892B]/30",
  "SCEF": "bg-scef-blue/10 text-scef-blue-darker ring-scef-blue/30",
  "EduAid-Africa / SCEF": "bg-[#1F892B]/10 text-[#1F892B] ring-[#1F892B]/30",
  "GFA / SCEF": "bg-scef-blue/10 text-scef-blue-darker ring-scef-blue/30",
  "NESA-Africa / SCEF": "bg-scef-gold/15 text-scef-gold-dark ring-scef-gold/30",
  "SCEF / EduAid-Africa": "bg-scef-blue/10 text-scef-blue-darker ring-scef-blue/30",
};

const SupportUs = () => {
  return (
    <>
      <Helmet>
        <title>Support & Payment Options — SCEF</title>
        <meta
          name="description"
          content="Choose how you want to support Africa's education future — scholarships, school rebuilding, career guidance, eLibrary, advocacy, training, awards, merchandise, gala tickets, edu-tourism, and event hosting."
        />
        <link rel="canonical" href="https://santoscreations.org/support-us" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-scef-blue-darker via-scef-blue to-scef-blue-dark text-white py-20 md:py-28 overflow-hidden">
            <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-scef-gold/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-scef-gold text-xs font-semibold uppercase tracking-widest mb-6">
                Support & Payment Options
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                Choose How You Want to Support{" "}
                <span className="text-scef-gold">Africa's Education Future</span>
              </h1>
              <p className="text-lg md:text-xl text-white/75 max-w-3xl mx-auto leading-relaxed">
                Support SCEF, NESA-Africa, and EduAid-Africa through scholarships, school rebuilding, career guidance, digital library access, advocacy, training, awards, merchandise, gala tickets, edu-tourism, and event hosting partnerships.
              </p>
              <p className="mt-6 text-sm text-white/60">
                All payments are processed securely through the GFA Wallet (Paystack, Flutterwave, Bancable, TranscertPay).
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/payments" className="inline-flex items-center gap-2 rounded-lg bg-scef-gold text-scef-blue-darker px-5 py-3 text-sm font-semibold hover:bg-scef-gold-hover">
                  View Official Bank Accounts <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/wallet/donate" className="inline-flex items-center gap-2 rounded-lg border-2 border-scef-gold/50 text-white px-5 py-3 text-sm font-semibold hover:bg-scef-gold/10">
                  Donate via GFA Wallet
                </Link>
              </div>
            </div>
          </section>

          {/* CTA grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {ctas.map(({ title, purpose, account, icon: Icon, to }) => (
                  <Link
                    key={title}
                    to={to}
                    className="group relative flex flex-col rounded-2xl border-2 border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-scef-gold/15 ring-1 ring-scef-gold/30 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-scef-gold-dark" strokeWidth={1.75} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-lg font-bold text-scef-blue-darker leading-snug">
                          {title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                      {purpose}
                    </p>
                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-border">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ring-1 ${accountStyle[account]}`}>
                        {account}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-scef-blue-darker group-hover:text-scef-gold-dark transition-colors">
                        Support
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <section className="py-16 bg-muted/40">
            <div className="container mx-auto px-4 text-center max-w-2xl">
              <h2 className="font-display text-3xl font-bold text-scef-blue-darker mb-4">
                Need a tailored partnership?
              </h2>
              <p className="text-muted-foreground mb-8">
                Corporates, foundations, and governments can co-fund flagship initiatives across NESA-Africa, EduAid-Africa, and SCEF programs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/partner-with-us"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-scef-blue-darker text-white font-semibold hover:bg-scef-blue transition-colors"
                >
                  Partner With Us <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-scef-blue-darker text-scef-blue-darker font-semibold hover:bg-scef-blue-darker hover:text-white transition-colors"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SupportUs;

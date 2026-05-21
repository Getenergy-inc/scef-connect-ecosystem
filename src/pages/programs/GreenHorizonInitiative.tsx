import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Sprout, Users, Leaf, HandCoins, ShieldCheck, MapPin, ArrowRight,
  Tractor, BookOpen, HeartHandshake, Building2,
} from "lucide-react";
import heroImage from "@/assets/photos/scef-landscape-aerial.jpg";
import farmImage from "@/assets/photos/scef-volunteers-outreach.jpg";

const pillars = [
  {
    icon: HandCoins,
    title: "Livelihoods for IDPs",
    body:
      "Engage internally displaced persons in dignified farming work that provides daily income, food security and a path out of dependency.",
  },
  {
    icon: BookOpen,
    title: "Permaculture Training",
    body:
      "Hands-on training in permaculture and regenerative best practices — building soil health, water retention and higher yields without chemicals.",
  },
  {
    icon: Sprout,
    title: "Affordable Food Access",
    body:
      "Crops are purchased directly from farmers and sold to local communities, removing exploitative middlemen and stabilising food prices.",
  },
  {
    icon: Users,
    title: "1,000 Local Participants",
    body:
      "Targeting massive community engagement in Borno — aiming to reduce the local IDP population by up to 90% within 12 months.",
  },
];

const objectives = [
  "Restore the earth's dignity and human nutrition through chemical-free farming.",
  "Replace dependency on aid with sustained, locally owned livelihoods.",
  "Train a new generation of African farmers in permaculture and climate-smart practices.",
  "Shorten the food supply chain between farm and family.",
  "Strengthen partnership between SCEF, local government and host communities.",
  "Document a scalable model that can be replicated across other Nigerian states and African regions.",
];

const partnership = [
  {
    icon: Building2,
    title: "Local Government Partnership",
    body:
      "We invite the Borno State Government and local councils to walk this journey with us. The success of this project is the success of the leadership.",
  },
  {
    icon: MapPin,
    title: "Access to Land",
    body:
      "We are seeking access to suitable arable land in Borno — land will be paid for under fair terms agreed with the community and authorities.",
  },
  {
    icon: HeartHandshake,
    title: "Community Mobilisation",
    body:
      "We request government support in identifying and convening the IDPs, host communities and youth who will most benefit from this opportunity.",
  },
];

export default function GreenHorizonInitiative() {
  return (
    <>
      <Helmet>
        <title>Green Horizon Initiative — Permaculture & Livelihoods for Borno IDPs | SCEF</title>
        <meta
          name="description"
          content="The Green Horizon Initiative is a SCEF EduAid-Africa project launching in Borno State, Nigeria — engaging 1,000 IDPs in permaculture farming, livelihoods, training and direct-to-community food supply."
        />
        <link rel="canonical" href="https://santoscreations.org/programs/green-horizon-initiative" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <HeaderScreenshot />
        <div className="h-[88px]" />

        <main>
          {/* HERO */}
          <section className="relative isolate overflow-hidden bg-scef-blue-darker text-white">
            <div className="absolute inset-0 -z-10">
              <img
                src={heroImage}
                alt="Aerial view of farmland in northern Nigeria"
                className="h-full w-full object-cover opacity-30"
                width={1600}
                height={900}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker via-scef-blue-darker/85 to-scef-blue-darker/40" />
            </div>

            <div className="container mx-auto max-w-6xl px-6 md:px-8 py-20 md:py-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-scef-gold/40 bg-scef-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-scef-gold">
                <Leaf className="h-3.5 w-3.5" />
                EduAid-Africa Flagship Project · Borno State, Nigeria
              </div>
              <h1 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.05] tracking-tight md:text-5xl">
                Green Horizon Initiative
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                Restoring livelihoods, soil and dignity for internally displaced persons in Borno through
                permaculture farming, hands-on training and a direct farm-to-family food supply.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-darker font-semibold">
                  <Link to="/partner-with-us?project=green-horizon">
                    Partner with the Initiative
                    <ArrowRight className="ms-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/wallet/donate?project=green-horizon">Fund a Farmer</Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl">
                {[
                  { v: "1,000", l: "IDPs engaged" },
                  { v: "90%", l: "IDP reduction target (12 mo.)" },
                  { v: "0", l: "Synthetic chemicals" },
                  { v: "1st", l: "Site: Borno State" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <div className="font-display text-2xl font-bold text-scef-gold">{s.v}</div>
                    <div className="mt-1 text-[12px] uppercase tracking-wider text-white/70">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* OVERVIEW */}
          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                Why Borno · Why Now
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-4xl">
                A regenerative answer to displacement, hunger and rising food prices.
              </h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted-foreground md:text-base">
                <p>
                  Borno State is home to the highest number of internally displaced persons in Nigeria.
                  The Green Horizon Initiative begins here — turning fertile but underused land into productive
                  permaculture farms run by and for the people who need this opportunity most.
                </p>
                <p>
                  This is more than a farming project. It is a livelihood programme, a training academy, a food
                  supply system and a poverty-reduction strategy — built on the principle that the earth, treated
                  with care, can feed and dignify its people again.
                </p>
                <p>
                  By buying directly from the farmers and selling directly to local families, we eliminate the
                  exploitative middlemen who drive up the cost of food, and we keep value circulating inside the
                  community.
                </p>
              </div>
            </div>
          </section>

          {/* PILLARS */}
          <section className="bg-muted/40 border-y border-border py-16 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                  What this project delivers
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                  Four pillars of impact
                </h2>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
                {pillars.map(({ icon: Icon, title, body }) => (
                  <article
                    key={title}
                    className="rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-scef-gold/40 hover:shadow-lg"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight text-scef-blue-darker">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SPLIT — PERMACULTURE */}
          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-8 grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                  Restoring the earth's dignity
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                  Farming without chemicals. Yields without compromise.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  Permaculture is at the heart of the Green Horizon Initiative. We are training local people so
                  that anyone who thinks of farming is no longer thinking of buying chemicals. Instead, they think
                  of healthy soil, water cycles, companion planting and food that nourishes.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-scef-blue-darker">
                  {[
                    "Soil regeneration and composting systems",
                    "Water-smart design for the Sahel climate",
                    "Companion planting and seasonal crop rotation",
                    "Seed sovereignty and indigenous crop preservation",
                    "Farmer-to-farmer knowledge transfer",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Leaf className="mt-0.5 h-4 w-4 flex-none text-scef-gold-dark" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <img
                  src={farmImage}
                  alt="SCEF community outreach volunteers working with local people"
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="w-full rounded-2xl object-cover shadow-xl"
                />
              </div>
            </div>
          </section>

          {/* OBJECTIVES */}
          <section className="bg-scef-blue-darker text-white py-16 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold">
                Project Objectives
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                A year-one mission with measurable outcomes
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                {objectives.map((o) => (
                  <li
                    key={o}
                    className="flex items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-4"
                  >
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-scef-gold" />
                    <span className="text-sm leading-relaxed text-white/90">{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* GOVERNMENT PARTNERSHIP */}
          <section className="bg-white py-16 md:py-20">
            <div className="container mx-auto max-w-6xl px-6 md:px-8">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                  What we need from local government
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                  A partnership for a lasting Borno legacy
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                  We are inviting the Borno State Government and its local councils to walk this journey with us.
                  We will deliver. The leadership will share in the success.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
                {partnership.map(({ icon: Icon, title, body }) => (
                  <article key={title} className="rounded-2xl border border-border bg-card p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-scef-blue/10 text-scef-blue-darker ring-1 ring-scef-blue/20">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight text-scef-blue-darker">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* OUTCOMES */}
          <section className="bg-muted/40 border-y border-border py-16 md:py-20">
            <div className="container mx-auto max-w-5xl px-6 md:px-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
                12-Month Outlook
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-scef-blue-darker md:text-[2rem]">
                What success looks like in year one
              </h2>
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                {[
                  {
                    icon: Users,
                    title: "Massive community engagement",
                    body: "Up to 1,000 locals directly engaged across farming, training, processing and distribution roles.",
                  },
                  {
                    icon: Tractor,
                    title: "Productive permaculture farms",
                    body: "Operational regenerative farms producing staple and high-value crops on community-secured land.",
                  },
                  {
                    icon: HandCoins,
                    title: "Lower food prices",
                    body: "Direct farm-to-family supply that bypasses exploitative middlemen and stabilises local food costs.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "90% IDP reduction target",
                    body: "A measurable shift from displacement to dignity as families regain land, work and self-reliance.",
                  },
                ].map(({ icon: Icon, title, body }) => (
                  <article key={title} className="rounded-2xl border border-border bg-card p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-display text-lg font-bold leading-tight text-scef-blue-darker">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section className="bg-scef-blue-darker text-white py-16 md:py-20">
            <div className="container mx-auto max-w-4xl px-6 md:px-8 text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Stand with Borno. Stand with the Green Horizon.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/85">
                Partners, sponsors, government allies and diaspora supporters — join SCEF in launching a
                regenerative livelihood project that gives Borno's IDPs a path back to dignity through the soil.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg" className="bg-scef-gold hover:bg-scef-gold-dark text-scef-blue-darker font-semibold">
                  <Link to="/partner-with-us?project=green-horizon">Partner With Us</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/wallet/donate?project=green-horizon">Fund a Farmer</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-scef-blue-darker">
                  <Link to="/get-involved">Get Involved</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

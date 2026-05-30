import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import OfficialAccountsTable from "@/components/payments/OfficialAccountsTable";
import GFAWalletPaySection from "@/components/payments/GFAWalletPaySection";
import {
  officialAccounts,
  paymentPurposes,
  accountGroupById,
  AccountGroupId,
  SOPHIA_PAYMENT_WHATSAPP,
} from "@/config/officialAccounts";
import {
  Landmark,
  Wallet,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
  Heart,
} from "lucide-react";

const Donate = () => {
  const [purpose, setPurpose] = useState<string>("");
  const recommendedGroups = (() => {
    const p = paymentPurposes.find((x) => x.label === purpose);
    return p?.groups.filter((id) => id !== "gfa").map((id) => accountGroupById(id)) ?? [];
  })();

  return (
    <>
      <Helmet>
        <title>Donate to SCEF — Official Donation Channels</title>
        <meta
          name="description"
          content="Support Santos Creations Educational Foundation, EduAid-Africa, and NESA-Africa through verified Providus Bank accounts and GFA Wallet payment options."
        />
        <link rel="canonical" href="https://santoscreations.org/donate" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-scef-blue-darker via-scef-blue to-scef-blue-dark text-white py-20 md:py-28 overflow-hidden">
            <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-scef-gold/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-scef-gold text-xs font-semibold uppercase tracking-widest mb-6">
                <Heart className="h-3.5 w-3.5" /> Donate
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                Fund education. <span className="text-scef-gold">Change lives.</span>
              </h1>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
                Support SCEF, EduAid-Africa, and NESA-Africa through verified Providus Bank
                accounts and GFA Wallet payment options for donations, memberships,
                sponsorships, scholarships, training, advocacy, awards, and education impact
                programs.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#official-accounts"
                  className="inline-flex items-center gap-2 rounded-lg bg-scef-gold text-scef-blue-darker px-5 py-3 text-sm font-semibold hover:bg-scef-gold-hover"
                >
                  <Landmark className="h-4 w-4" /> Pay via Providus Bank
                </a>
                <a
                  href="#gfa-wallet"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-scef-gold/50 text-white px-5 py-3 text-sm font-semibold hover:bg-scef-gold/10"
                >
                  <Wallet className="h-4 w-4" /> Pay with GFA Wallet
                </a>
                <a
                  href={SOPHIA_PAYMENT_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] text-white px-5 py-3 text-sm font-semibold hover:bg-[#1ebe57]"
                >
                  <MessageCircle className="h-4 w-4" /> Chat with Sophia
                </a>
              </div>
            </div>
          </section>

          {/* Trust note */}
          <section className="py-10 bg-scef-gold/5 border-y border-scef-gold/20">
            <div className="container mx-auto px-4 max-w-4xl flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-scef-gold-dark shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-scef-blue-darker">
                All payments should be made only through the verified Providus Bank accounts and
                approved GFA Wallet payment options listed on this page. Donors, sponsors, members,
                and partners may request receipts, payment confirmation, sponsorship documentation,
                and impact reports.
              </p>
            </div>
          </section>

          {/* How would you like to support us? */}
          <section className="py-14">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-2">
                How would you like to support us?
              </h2>
              <p className="text-muted-foreground mb-6">
                Choose one of the official payment options below.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="#official-accounts"
                  className="flex items-start gap-4 rounded-xl border-2 border-border bg-card p-5 hover:border-scef-gold/60 transition"
                >
                  <div className="w-11 h-11 rounded-lg bg-scef-blue/10 text-scef-blue-darker flex items-center justify-center shrink-0">
                    <Landmark className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-scef-blue-darker">
                      Providus Bank Direct Transfer
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Verified Naira, USD, EUR and GBP accounts for SCEF, EduAid-Africa and
                      NESA-Africa.
                    </p>
                  </div>
                </a>
                <a
                  href="#gfa-wallet"
                  className="flex items-start gap-4 rounded-xl border-2 border-border bg-card p-5 hover:border-scef-gold/60 transition"
                >
                  <div className="w-11 h-11 rounded-lg bg-scef-gold/15 text-scef-gold-dark flex items-center justify-center shrink-0">
                    <Wallet className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-scef-blue-darker">GFA Wallet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Request your GFA Wallet payment link from Sophia for donations,
                      sponsorships, memberships and CSR contributions.
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* Payment purpose guide */}
          <section className="py-14 bg-muted/30 border-y border-border">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker mb-2">
                What are you paying for?
              </h2>
              <p className="text-muted-foreground mb-6">
                Please select the correct service and purpose before making payment.
              </p>
              <div className="flex flex-wrap gap-2">
                {paymentPurposes.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setPurpose(p.label)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ring-1 transition-colors ${
                      purpose === p.label
                        ? "bg-scef-blue-darker text-white ring-scef-blue-darker"
                        : "bg-background text-scef-blue-darker ring-border hover:bg-muted"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              {recommendedGroups.length > 0 && (
                <div className="mt-6 rounded-2xl border-2 border-scef-gold/30 bg-scef-gold/5 p-5">
                  <p className="text-sm text-muted-foreground mb-3">
                    For <strong className="text-scef-blue-darker">{purpose}</strong>, please pay
                    into the {recommendedGroups.map((g) => g.shortName).join(" or ")} account
                    {recommendedGroups.length > 1 ? "s" : ""} below.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {recommendedGroups.map((g) => (
                      <a
                        key={g.id}
                        href={`#account-${g.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border-2 border-scef-blue-darker text-scef-blue-darker text-sm font-semibold px-4 py-2 hover:bg-scef-blue-darker hover:text-white"
                      >
                        <Landmark className="h-4 w-4" /> {g.shortName} Bank
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Official Providus Bank Accounts (3 groups) */}
          <section id="official-accounts" className="py-14">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-scef-blue/10 ring-1 ring-scef-blue/20 text-scef-blue-darker text-[11px] font-semibold uppercase tracking-widest mb-3">
                  <Landmark className="h-3.5 w-3.5" /> Providus Bank — Verified Accounts
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker">
                  Official Providus Bank Accounts
                </h2>
              </div>
              <div className="space-y-8">
                {officialAccounts
                  .filter((g) => g.id !== "gfa")
                  .map((g) => (
                    <div id={`account-${g.id}`} key={g.id} className="scroll-mt-28">
                      <OfficialAccountsTable groupIds={[g.id as AccountGroupId]} showFilters={false} />
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* GFA Wallet */}
          <div id="gfa-wallet" className="scroll-mt-28">
            <GFAWalletPaySection
              title="Pay with GFA Wallet"
              description="GFA Wallet is available as an official payment option for SCEF, EduAid-Africa, and NESA-Africa donations, sponsorships, scholarships, training payments, gala tickets, membership payments, and CSR education contributions. The full wallet checkout interface is not yet connected to the website — please contact Sophia to request the correct GFA Wallet payment link or instruction."
            />
          </div>

          {/* Manual confirmation */}
          <section className="py-14">
            <div className="container mx-auto px-4 max-w-3xl">
              <div className="rounded-2xl border-2 border-scef-gold/30 bg-scef-gold/5 p-8 md:p-10">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker">
                  After Making Payment
                </h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  After payment, please send your proof of payment to Sophia through WhatsApp for
                  confirmation. Please include:
                </p>
                <ul className="mt-4 space-y-2 text-sm text-foreground list-disc pl-5">
                  <li>Your full name or organization name</li>
                  <li>Payment purpose</li>
                  <li>Service paid for: SCEF, EduAid-Africa, or NESA-Africa</li>
                  <li>Amount paid</li>
                  <li>Currency</li>
                  <li>Account paid into or GFA Wallet reference</li>
                  <li>Date of payment</li>
                  <li>Proof of payment screenshot or receipt</li>
                </ul>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  Receipts, sponsorship documentation, membership confirmation, and impact reports
                  may be requested after payment confirmation.
                </p>
                <div className="mt-6">
                  <a
                    href={SOPHIA_PAYMENT_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-scef-gold text-scef-blue-darker px-5 py-3 text-sm font-semibold hover:bg-scef-gold-hover"
                  >
                    <MessageCircle className="h-4 w-4" /> Confirm Payment with Sophia
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-14 bg-scef-blue-darker text-white">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Support SCEF Today
              </h2>
              <p className="text-white/80 mb-8">
                Every contribution funds scholarships, school transformation, teacher training,
                digital learning, advocacy, and education impact across Africa.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/get-involved/partner-with-scef"
                  className="inline-flex items-center gap-2 rounded-lg bg-scef-gold text-scef-blue-darker px-5 py-3 text-sm font-semibold hover:bg-scef-gold-hover"
                >
                  Partner with SCEF <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/membership"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-scef-gold/50 text-white px-5 py-3 text-sm font-semibold hover:bg-scef-gold/10"
                >
                  Become a Member
                </Link>
                <a
                  href={SOPHIA_PAYMENT_WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] text-white px-5 py-3 text-sm font-semibold hover:bg-[#1ebe57]"
                >
                  <MessageCircle className="h-4 w-4" /> Chat with Sophia
                </a>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Donate;

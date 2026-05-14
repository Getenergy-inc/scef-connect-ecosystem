import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import OfficialAccountsTable from "@/components/payments/OfficialAccountsTable";
import PaymentConfirmationForm from "@/components/payments/PaymentConfirmationForm";
import GFAWalletPaySection from "@/components/payments/GFAWalletPaySection";
import {
  AccountGroupId,
  accountGroupById,
  paymentPurposes,
  officialAccounts,
} from "@/config/officialAccounts";
import {
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  GraduationCap,
  Award,
  Cpu,
  FileCheck2,
  Receipt,
  ClipboardList,
  Wallet,
  Landmark,
  Upload,
} from "lucide-react";

const heroCtas = [
  { label: "Pay via GFA Wallet", to: "/wallet/donate", primary: true, icon: Wallet },
  { label: "Donate via GFA Wallet", to: "/wallet/donate?fund=scef", icon: Wallet },
  { label: "View Bank Transfer Details", to: "#official-accounts", icon: Landmark },
  { label: "Upload Proof of Payment", to: "#confirm-payment", icon: Upload },
];

const categoryCards = [
  {
    id: "scef" as AccountGroupId,
    icon: HeartHandshake,
    title: "SCEF Foundation",
    cta: "Support SCEF",
  },
  {
    id: "eduaid" as AccountGroupId,
    icon: GraduationCap,
    title: "EduAid-Africa",
    cta: "Support EduAid-Africa",
  },
  {
    id: "nesa" as AccountGroupId,
    icon: Award,
    title: "NESA-Africa",
    cta: "Sponsor NESA-Africa",
  },
  {
    id: "gfa" as AccountGroupId,
    icon: Cpu,
    title: "GFA Wallet / Technology",
    cta: "Support Digital Innovation",
  },
];

const trustItems = [
  { icon: ShieldCheck, label: "Verified payment channels" },
  { icon: Receipt, label: "Official receipts" },
  { icon: FileCheck2, label: "Donor confirmation" },
  { icon: ClipboardList, label: "Sponsorship documentation" },
  { icon: FileCheck2, label: "Impact reporting" },
  { icon: ClipboardList, label: "CSR utilization reports" },
  { icon: ShieldCheck, label: "ESG-aligned reporting" },
  { icon: ShieldCheck, label: "BOT & governance oversight" },
];

export default function OfficialAccountsPage() {
  const [purpose, setPurpose] = useState<string>("");
  const recommended = useMemo(() => {
    const p = paymentPurposes.find((x) => x.label === purpose);
    return p?.groups.map((id) => accountGroupById(id)) ?? [];
  }, [purpose]);

  return (
    <>
      <Helmet>
        <title>Support SCEF Through GFA Wallet — Payments & Bank Transfer</title>
        <meta
          name="description"
          content="Make secure payments, donations, sponsorships, registrations, memberships, and program contributions through GFA Wallet. Verified Providus Bank transfer details remain available for manual and institutional payments."
        />
        <link rel="canonical" href="https://santoscreations.org/payments" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          {/* Hero */}
          <section className="relative bg-gradient-to-br from-scef-blue-darker via-scef-blue to-scef-blue-dark text-white py-20 md:py-28 overflow-hidden">
            <div className="absolute top-0 right-0 w-[36rem] h-[36rem] bg-scef-gold/10 rounded-full blur-3xl" />
            <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-scef-gold text-xs font-semibold uppercase tracking-widest mb-6">
                <Wallet className="h-3.5 w-3.5" /> Powered by GFA Wallet
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
                Support SCEF Through{" "}
                <span className="text-scef-gold">GFA Wallet</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Make secure payments, donations, sponsorships, registrations, memberships, and
                program contributions through the GFA Wallet. Bank transfer details remain
                available for manual payments and institutional partners.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {heroCtas.map((c) => {
                  const Icon = c.icon;
                  return (
                    <Link
                      key={c.label}
                      to={c.to}
                      className={`inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                        c.primary
                          ? "bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover"
                          : "border-2 border-scef-gold/50 text-white hover:bg-scef-gold/10"
                      }`}
                    >
                      <Icon className="h-4 w-4" /> {c.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>

          {/* GFA Wallet primary payment block */}
          <GFAWalletPaySection
            title="Pay Securely via GFA Wallet"
            description="GFA Wallet is the recommended payment option for faster tracking, official receipts, and program reporting. Manual bank transfer remains available below for institutional and corporate payments."
          />

          {/* Section 1: Purpose Selector */}
          <section className="py-16">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker">
                  What Are You Paying For?
                </h2>
                <p className="text-muted-foreground mt-3">
                  Select a purpose and we'll guide you to the correct account group.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
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
              {recommended.length > 0 && (
                <div className="mt-8 rounded-2xl border-2 border-scef-gold/30 bg-scef-gold/5 p-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    For <strong className="text-scef-blue-darker">{purpose}</strong>, GFA Wallet
                    routes your payment to the correct program account
                    {recommended.length > 1 ? "s" : ""}: {recommended.map((g) => g.shortName).join(", ")}.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/wallet/donate?purpose=${encodeURIComponent(purpose)}&fund=${recommended[0].id}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-scef-gold text-scef-blue-darker text-sm font-semibold px-5 py-2.5 hover:bg-scef-gold-hover"
                    >
                      <Wallet className="h-4 w-4" /> Pay via GFA Wallet
                    </Link>
                    {recommended.map((g) => (
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

          {/* Section 2: Quick Category Cards */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {categoryCards.map((c) => {
                  const g = accountGroupById(c.id);
                  const Icon = c.icon;
                  return (
                    <a
                      key={c.id}
                      href={`#account-${c.id}`}
                      className="group flex flex-col rounded-2xl border-2 border-border bg-card p-6 hover:border-scef-gold/40 hover:-translate-y-1 transition-all"
                    >
                      <div className="w-12 h-12 rounded-xl bg-scef-gold/15 ring-1 ring-scef-gold/30 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-scef-gold-dark" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-scef-blue-darker">
                        {c.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 flex-1">
                        {g.tagline}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-scef-blue-darker group-hover:text-scef-gold-dark">
                        {c.cta} <ArrowRight className="h-4 w-4" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Section 3: Official Bank Accounts */}
          <section id="official-accounts" className="py-16">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-scef-blue/10 ring-1 ring-scef-blue/20 text-scef-blue-darker text-[11px] font-semibold uppercase tracking-widest mb-3">
                  <Landmark className="h-3.5 w-3.5" /> Manual Bank Transfer Option
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker">
                  Official Bank Transfer Details
                </h2>
                <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
                  GFA Wallet is the recommended payment option for faster tracking, receipts, and
                  program reporting. Manual bank transfer remains available through verified
                  Providus Bank accounts. Payments should only be made through the verified
                  accounts shown on this page.
                </p>
              </div>
              <div className="space-y-8">
                {officialAccounts.map((g) => (
                  <div id={`account-${g.id}`} key={g.id} className="scroll-mt-28">
                    <OfficialAccountsTable groupIds={[g.id]} showFilters={false} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Transparency */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="rounded-3xl border-2 border-border bg-card p-8 md:p-12">
                <h2 className="font-display text-3xl font-bold text-scef-blue-darker">
                  Transparency & Accountability
                </h2>
                <p className="text-muted-foreground mt-4">
                  SCEF is committed to transparent donor communication, responsible fund
                  management, ESG-aligned governance, and impact reporting. Donors, members,
                  partners, and sponsors may request payment confirmation, receipts,
                  sponsorship documentation, CSR reports, or impact updates.
                </p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  {trustItems.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2"
                    >
                      <Icon className="h-4 w-4 text-scef-gold-dark shrink-0" />
                      <span className="text-xs font-semibold text-scef-blue-darker">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="mailto:support@santoscreations.org?subject=Request%20Payment%20Confirmation"
                    className="inline-flex items-center gap-2 rounded-lg bg-scef-blue-darker text-white px-4 py-2 text-sm font-semibold hover:bg-scef-blue"
                  >
                    Request Payment Confirmation
                  </a>
                  <a
                    href="mailto:partnerships@santoscreations.org?subject=Sponsorship%20Documentation"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-scef-blue-darker text-scef-blue-darker px-4 py-2 text-sm font-semibold hover:bg-scef-blue-darker hover:text-white"
                  >
                    Request Sponsorship Documentation
                  </a>
                  <a
                    href="mailto:impact@santoscreations.org?subject=Impact%20Report%20Request"
                    className="inline-flex items-center gap-2 rounded-lg border-2 border-border text-scef-blue-darker px-4 py-2 text-sm font-semibold hover:bg-muted"
                  >
                    Request Impact Report
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Confirmation Form */}
          <section id="confirm-payment" className="py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl font-bold text-scef-blue-darker">
                  I Have Paid — Confirm Your Payment
                </h2>
                <p className="text-muted-foreground mt-3">
                  Submit your details and upload your receipt so our team can issue
                  confirmation, receipts, or sponsorship documentation.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-border bg-card p-6 md:p-8">
                <PaymentConfirmationForm />
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 bg-scef-blue-darker text-white">
            <div className="container mx-auto px-4 text-center max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Join Us in Building <span className="text-scef-gold">Africa's Future</span>
              </h2>
              <p className="text-white/80 mt-4">
                Your support helps train teachers, empower girls, build sustainable
                schools, expand digital learning, advance ESG education, support African
                youth, strengthen local chapters, and create measurable education impact
                across Africa.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  { label: "Donate Now", to: "/wallet/donate" },
                  { label: "Become a Partner", to: "/partner-with-us" },
                  { label: "Sponsor NESA-Africa", to: "/wallet/donate?fund=nesa-africa" },
                  { label: "Support EduAid-Africa", to: "/wallet/donate?fund=eduaid" },
                  { label: "Join the Movement", to: "/get-involved/membership" },
                ].map((c) => (
                  <Link
                    key={c.label}
                    to={c.to}
                    className="inline-flex items-center gap-2 rounded-lg bg-scef-gold text-scef-blue-darker px-5 py-3 text-sm font-semibold hover:bg-scef-gold-hover"
                  >
                    {c.label} <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

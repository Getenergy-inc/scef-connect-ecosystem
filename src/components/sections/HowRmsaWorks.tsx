import { ClipboardCheck, ShieldCheck, Heart, Vote, Sparkles } from "lucide-react";

const steps = [
  { icon: ClipboardCheck, title: "Nominate", desc: "Members and chapters submit schools needing rebuilding or special needs support." },
  { icon: ShieldCheck, title: "Verify", desc: "Local chapter leads and SCEF assessors confirm conditions and prioritize." },
  { icon: Heart, title: "Donate", desc: "Fund a school directly through GFA Wallet — Paystack, Flutterwave or AGC." },
  { icon: Vote, title: "Vote with AGC", desc: "Community votes determine which campaigns get matched funding first." },
  { icon: Sparkles, title: "Fund & Transform", desc: "Funds disbursed; renovation, equipment and training tracked publicly." },
];

export const HowRmsaWorks = () => {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0B5D3B]">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-scef-blue-darker md:text-4xl">
            From nomination to a transformed school
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A transparent, community-driven pipeline backed by the GFA Wallet
            and verifiable disbursement records.
          </p>
        </div>

        <div className="relative mt-14">
          {/* connecting line (desktop) */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[#0B5D3B]/30 to-transparent lg:block" />

          <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0B5D3B] to-[#083D27] text-white shadow-xl ring-4 ring-white">
                  <Icon className="h-7 w-7" strokeWidth={1.75} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-scef-gold text-[11px] font-bold text-[#0A0A0A] ring-2 ring-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-scef-blue-darker">
                  {title}
                </h3>
                <p className="mt-2 max-w-[220px] text-sm leading-snug text-muted-foreground">
                  {desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

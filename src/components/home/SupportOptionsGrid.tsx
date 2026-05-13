import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { supportOptions } from "@/config/supportOptions";

/**
 * 12 action cards — "Choose How You Want to Support Africa's Education Future".
 * Every CTA routes through the existing GFA Wallet flow via the donate page
 * with a `?designation=` query param.
 */
export const SupportOptionsGrid = () => {
  return (
    <section id="support-options" className="bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
            Support Options
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker leading-tight">
            Choose How You Want to Support Africa's Education Future
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every contribution flows through the SCEF GFA Wallet to a designated programme account
            with full transparency and receipts.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {supportOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <article
                key={opt.id}
                className={`group flex flex-col rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                  opt.featured
                    ? "border-scef-gold/60 ring-1 ring-scef-gold/20"
                    : "border-border hover:border-scef-gold/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-scef-blue-darker text-scef-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-semibold text-scef-blue-darker leading-snug">
                      {opt.title}
                    </h3>
                    {opt.featured && (
                      <span className="mt-1 inline-flex items-center rounded-full bg-scef-gold/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-scef-blue-darker">
                        Priority
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {opt.purpose}
                </p>

                <div className="mt-4 rounded-md bg-muted/60 px-3 py-2 text-[11px] font-medium text-foreground/80">
                  <span className="text-muted-foreground">Designated account · </span>
                  {opt.account}
                </div>

                <Link
                  to={opt.href}
                  className="mt-4 inline-flex items-center justify-between rounded-lg bg-scef-blue-darker px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-scef-blue-darker/90"
                  data-analytics-event="support_option_click"
                  data-analytics-id={opt.id}
                >
                  {opt.cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-xs text-muted-foreground italic max-w-2xl">
          All payments are processed through the SCEF GFA Wallet (Paystack, Flutterwave, Bancable,
          TranscertPay). Full bank account disclosures are available on the Governance & Trust page.
        </p>
      </div>
    </section>
  );
};

export default SupportOptionsGrid;

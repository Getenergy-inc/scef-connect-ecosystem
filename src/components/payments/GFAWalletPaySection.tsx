import { Link } from "react-router-dom";
import {
  Wallet,
  Landmark,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

interface Props {
  /** Primary action label, e.g. "Pay Membership via GFA Wallet" */
  primaryLabel?: string;
  /** Fund query param routed to /wallet/donate */
  fund?: string;
  /** Optional payment purpose label (passes to donate flow) */
  purpose?: string;
  /** Section heading */
  title?: string;
  /** Section subheading */
  description?: string;
  /** Anchor id on /payments to deep-link bank details (e.g. "scef") */
  bankAnchor?: string;
  /** Hide section background */
  bare?: boolean;
}

/**
 * Reusable "Pay via GFA Wallet" payment block.
 * GFA Wallet is the primary CTA. Bank transfer is shown as a secondary, manual option.
 */
export default function GFAWalletPaySection({
  primaryLabel = "Request GFA Wallet Payment Link",
  fund,
  purpose,
  title = "Pay with GFA Wallet",
  description = "GFA Wallet is available as an official payment option for SCEF, EduAid-Africa, and NESA-Africa donations, sponsorships, scholarships, training, gala tickets, membership payments, and CSR education contributions. The full wallet checkout interface is not yet connected to the website — please contact Sophia to request the correct GFA Wallet payment link or instruction.",
  bankAnchor,
  bare = false,
}: Props) {
  const sophiaPurposeMsg = purpose
    ? `Hello Sophia, I want to pay via GFA Wallet for ${purpose}${fund ? ` (${fund})` : ""}. Please send me the payment link.`
    : `Hello Sophia, I want to pay via GFA Wallet${fund ? ` for ${fund}` : ""}. Please send me the payment link.`;
  const donateHref = `https://wa.me/2348109765897?text=${encodeURIComponent(sophiaPurposeMsg)}`;
  const bankHref = bankAnchor ? `/payments#account-${bankAnchor}` : "/payments#official-accounts";
  const sophiaHref = `https://wa.me/2348109765897?text=${encodeURIComponent(
    "Hello Sophia, I need help with GFA Wallet payment.",
  )}`;

  const wrapperClass = bare
    ? ""
    : "py-16 bg-gradient-to-br from-scef-blue-darker via-scef-blue to-scef-blue-dark text-white";

  return (
    <section className={wrapperClass}>
      <div className={bare ? "" : "container mx-auto px-4 max-w-5xl"}>
        <div
          className={`rounded-3xl border-2 ${
            bare
              ? "border-border bg-card text-foreground"
              : "border-scef-gold/30 bg-white/5 backdrop-blur-md text-white"
          } p-6 md:p-10`}
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-3 ${
                  bare
                    ? "bg-scef-gold/15 ring-1 ring-scef-gold/30 text-scef-gold-dark"
                    : "bg-scef-gold/15 ring-1 ring-scef-gold/30 text-scef-gold"
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" /> Verified · Secure · Traceable
              </div>
              <h2
                className={`font-display text-2xl md:text-3xl font-bold leading-tight ${
                  bare ? "text-scef-blue-darker" : "text-white"
                }`}
              >
                {title}
              </h2>
              <p className={`mt-3 text-sm md:text-base ${bare ? "text-muted-foreground" : "text-white/80"}`}>
                {description}
              </p>
            </div>
            <Wallet
              className={`h-14 w-14 shrink-0 ${bare ? "text-scef-gold-dark" : "text-scef-gold"}`}
              strokeWidth={1.5}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to={donateHref}
              className="inline-flex items-center gap-2 rounded-lg bg-scef-gold text-scef-blue-darker px-5 py-3 text-sm font-semibold hover:bg-scef-gold-hover"
              data-analytics="gfa_wallet_pay_click"
              data-fund={fund || "general"}
            >
              <Wallet className="h-4 w-4" /> {primaryLabel}
            </Link>
            <Link
              to={bankHref}
              className={`inline-flex items-center gap-2 rounded-lg border-2 px-5 py-3 text-sm font-semibold ${
                bare
                  ? "border-scef-blue-darker text-scef-blue-darker hover:bg-scef-blue-darker hover:text-white"
                  : "border-scef-gold/50 text-white hover:bg-scef-gold/10"
              }`}
              data-analytics="bank_transfer_view"
            >
              <Landmark className="h-4 w-4" /> View Bank Transfer Details
            </Link>
            <a
              href={sophiaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border-2 px-5 py-3 text-sm font-semibold ${
                bare
                  ? "border-border text-scef-blue-darker hover:bg-muted"
                  : "border-white/30 text-white hover:bg-white/10"
              }`}
              data-analytics="sophia_wallet_support"
            >
              <MessageCircle className="h-4 w-4" /> Chat with Sophia for Wallet Payment Support
            </a>
          </div>

          <div
            className={`mt-6 flex flex-wrap items-center justify-between gap-3 pt-5 border-t ${
              bare ? "border-border" : "border-white/10"
            }`}
          >
            <p className={`text-xs ${bare ? "text-muted-foreground" : "text-white/70"} max-w-2xl`}>
              Your payment supports verified SCEF ecosystem programs. GFA Wallet improves
              tracking, receipts, transparency, donor reporting, and impact accountability across
              SCEF, EduAid-Africa, NESA-Africa, and local chapter projects.
            </p>
            <a
              href={sophiaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold ${
                bare
                  ? "bg-[#25D366]/10 text-[#1f8f4d] ring-1 ring-[#25D366]/30 hover:bg-[#25D366]/20"
                  : "bg-[#25D366] text-white hover:bg-[#1ebe57]"
              }`}
              data-analytics="sophia_payment_chat"
            >
              <MessageCircle className="h-3.5 w-3.5" /> Chat with Sophia for Payment Help
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

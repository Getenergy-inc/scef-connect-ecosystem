import { Link } from "react-router-dom";
import { Heart, Landmark, Eye, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOPHIA_PAYMENT_WHATSAPP } from "@/config/officialAccounts";

const channels = [
  {
    icon: Heart,
    title: "Donate Now",
    blurb: "One-time or recurring donation to SCEF education programs.",
    href: "/wallet/donate?fund=scef",
    cta: "Give Today",
    external: false,
  },
  {
    icon: Landmark,
    title: "Pay via Providus Bank",
    blurb: "Use verified Providus Bank accounts for SCEF, EduAid-Africa and NESA-Africa.",
    href: "/payments#official-accounts",
    cta: "Bank Transfer",
    external: false,
  },
  {
    icon: Eye,
    title: "View Official Accounts",
    blurb: "See all verified Naira, USD, GBP and EUR accounts by program and purpose.",
    href: "/payments",
    cta: "View Accounts",
    external: false,
  },
  {
    icon: MessageCircle,
    title: "Chat with Sophia",
    blurb: "Get payment help, receipts, and sponsorship guidance on WhatsApp.",
    href: SOPHIA_PAYMENT_WHATSAPP,
    cta: "Open WhatsApp",
    external: true,
  },
];

export const DonationChannels = () => {
  return (
    <section className="bg-scef-blue-darker/[0.03] py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
            Official Channels
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-scef-blue-darker md:text-[2rem]">
            Official donation & payment channels
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            All SCEF transactions flow through verified channels. Choose how you want to
            contribute — full options live on the Support page.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ icon: Icon, title, blurb, href, cta, external }) => {
            const inner = (
              <>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-display text-base font-bold leading-tight text-scef-blue-darker">
                  {title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {blurb}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-scef-blue-darker group-hover:text-scef-gold-dark">
                  {cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </>
            );
            const cls =
              "group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-scef-gold/50 hover:shadow-md";
            return external ? (
              <a key={title} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <Link key={title} to={href} className={cls}>
                {inner}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Button asChild size="lg" className="bg-scef-blue hover:bg-scef-blue-darker text-white">
            <Link to="/support-us">
              See All Support Options
              <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

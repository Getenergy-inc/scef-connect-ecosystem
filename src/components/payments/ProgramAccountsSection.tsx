import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, Landmark } from "lucide-react";
import OfficialAccountsTable from "@/components/payments/OfficialAccountsTable";
import GFAWalletPaySection from "@/components/payments/GFAWalletPaySection";
import { AccountGroupId } from "@/config/officialAccounts";

interface Props {
  groupIds: AccountGroupId[];
  title?: string;
  description?: string;
  showFilters?: boolean;
  /** Primary GFA Wallet CTA label, e.g. "Pay Membership via GFA Wallet" */
  payLabel?: string;
  /** Designation/fund key passed to /wallet/donate */
  fund?: string;
  /** Payment purpose label (analytics + donate flow context) */
  purpose?: string;
  /** Hide the GFA Wallet pay block (rare — only when host page already shows one) */
  hidePayBlock?: boolean;
}

export default function ProgramAccountsSection({
  groupIds,
  title = "Official Bank Transfer Details",
  description = "Manual bank transfer remains available through verified Providus Bank accounts. For faster confirmation and automated tracking, we recommend Pay via GFA Wallet above.",
  showFilters = false,
  payLabel,
  fund,
  purpose,
  hidePayBlock = false,
}: Props) {
  const primaryGroup = groupIds[0];
  return (
    <>
      {!hidePayBlock && (
        <GFAWalletPaySection
          primaryLabel={payLabel || "Pay via GFA Wallet"}
          fund={fund}
          purpose={purpose}
          bankAnchor={primaryGroup}
          bare
        />
      )}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-scef-blue/10 ring-1 ring-scef-blue/20 text-scef-blue-darker text-[11px] font-semibold uppercase tracking-widest mb-3">
                <Landmark className="h-3.5 w-3.5" /> Manual Bank Transfer Option
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker">
                {title}
              </h2>
              <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
              <p className="mt-2 inline-flex items-center gap-2 text-xs text-scef-gold-dark">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Providus Bank accounts only.
              </p>
            </div>
            <Link
              to="/payments"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-scef-blue-darker text-scef-blue-darker text-sm font-semibold px-4 py-2 hover:bg-scef-blue-darker hover:text-white"
            >
              View All Official Accounts <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <OfficialAccountsTable groupIds={groupIds} showFilters={showFilters} />
        </div>
      </section>
    </>
  );
}

import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";
import OfficialAccountsTable from "@/components/payments/OfficialAccountsTable";
import { AccountGroupId } from "@/config/officialAccounts";

interface Props {
  groupIds: AccountGroupId[];
  title?: string;
  description?: string;
  showFilters?: boolean;
}

export default function ProgramAccountsSection({
  groupIds,
  title = "Verified Payment Accounts",
  description = "Use the verified Providus Bank accounts below for this program. Need a different program? View all official accounts.",
  showFilters = false,
}: Props) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-scef-gold/15 ring-1 ring-scef-gold/30 text-scef-gold-dark text-[11px] font-semibold uppercase tracking-widest mb-3">
              <ShieldCheck className="h-3.5 w-3.5" /> Verified Providus Bank
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker">
              {title}
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">{description}</p>
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
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ShieldCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  AccountGroup,
  AccountGroupId,
  Currency,
  officialAccounts,
} from "@/config/officialAccounts";

interface Props {
  groupIds?: AccountGroupId[];
  showFilters?: boolean;
  compact?: boolean;
}

const currencies: Currency[] = ["NGN", "USD", "GBP", "EUR"];

const groupAccent: Record<AccountGroupId, string> = {
  scef: "from-scef-blue/10 to-scef-blue/0 ring-scef-blue/30 text-scef-blue-darker",
  eduaid: "from-[#1F892B]/10 to-[#1F892B]/0 ring-[#1F892B]/30 text-[#1F892B]",
  nesa: "from-scef-gold/15 to-scef-gold/0 ring-scef-gold/40 text-scef-gold-dark",
  gfa: "from-slate-500/10 to-slate-500/0 ring-slate-400/30 text-slate-700",
};

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        toast.success("Account number copied");
        setTimeout(() => setCopied(false), 1800);
      }}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-semibold text-scef-blue-darker hover:bg-scef-gold/10"
      aria-label={`Copy account ${value}`}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function GroupCard({ group, currencyFilter }: { group: AccountGroup; currencyFilter: Currency | "ALL" }) {
  const accounts = group.accounts.filter((a) => currencyFilter === "ALL" || a.currency === currencyFilter);
  return (
    <div className={`rounded-2xl border-2 border-border bg-card overflow-hidden`}>
      <div className={`bg-gradient-to-r ${groupAccent[group.id]} p-6 ring-1 ring-inset`}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest opacity-80">
              {group.shortName} · {group.bank}
            </p>
            <h3 className="font-display text-xl md:text-2xl font-bold text-scef-blue-darker mt-1">
              {group.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">{group.tagline}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 backdrop-blur px-3 py-1 text-[11px] font-semibold text-scef-blue-darker ring-1 ring-scef-blue/20">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified Account
          </span>
        </div>
      </div>

      <div className="p-6">
        {accounts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No accounts match the selected currency.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-4 py-3 font-semibold text-scef-blue-darker">Bank</th>
                  <th className="px-4 py-3 font-semibold text-scef-blue-darker">Currency</th>
                  <th className="px-4 py-3 font-semibold text-scef-blue-darker">Account Number</th>
                  <th className="px-4 py-3 font-semibold text-scef-blue-darker">Purpose</th>
                  <th className="px-4 py-3 font-semibold text-scef-blue-darker text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((a) => (
                  <tr key={a.accountNumber} className="border-t border-border">
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-md bg-scef-blue/10 text-scef-blue-darker ring-1 ring-scef-blue/20 px-2 py-0.5 text-xs font-semibold">
                        {a.bank || group.bank}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center rounded-md bg-scef-gold/15 text-scef-gold-dark ring-1 ring-scef-gold/30 px-2 py-0.5 text-xs font-bold">
                        {a.currency}
                      </span>
                      <div className="text-[11px] text-muted-foreground mt-1">{a.currencyLabel}</div>
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-scef-blue-darker tracking-wide">
                      {a.accountNumber}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{a.purpose}</td>
                    <td className="px-4 py-3 text-right">
                      <CopyBtn value={a.accountNumber} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Recommended Use
            </p>
            <ul className="text-sm text-scef-blue-darker space-y-1">
              {group.recommendedUse.slice(0, 6).map((u) => (
                <li key={u} className="flex gap-2">
                  <span className="text-scef-gold-dark">•</span> {u}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Quick Actions
            </p>
            <div className="flex flex-wrap gap-2">
              {group.ctas.map((c) => (
                <Link
                  key={c.label}
                  to={c.to}
                  className="inline-flex items-center gap-1 rounded-lg bg-scef-blue-darker text-white text-xs font-semibold px-3 py-2 hover:bg-scef-blue transition-colors"
                >
                  {c.label} <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OfficialAccountsTable({
  groupIds,
  showFilters = true,
}: Props) {
  const groups = officialAccounts.filter(
    (g) => !groupIds || groupIds.includes(g.id),
  );
  const [currency, setCurrency] = useState<Currency | "ALL">("ALL");
  const [activeGroup, setActiveGroup] = useState<AccountGroupId | "ALL">("ALL");

  const visible = groups.filter((g) => activeGroup === "ALL" || g.id === activeGroup);

  return (
    <div className="space-y-6">
      {showFilters && groups.length > 1 && (
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground self-center mr-1">
              Program:
            </span>
            <button
              onClick={() => setActiveGroup("ALL")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ${
                activeGroup === "ALL"
                  ? "bg-scef-blue-darker text-white ring-scef-blue-darker"
                  : "bg-background text-scef-blue-darker ring-border"
              }`}
            >
              All
            </button>
            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ${
                  activeGroup === g.id
                    ? "bg-scef-blue-darker text-white ring-scef-blue-darker"
                    : "bg-background text-scef-blue-darker ring-border"
                }`}
              >
                {g.shortName}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground self-center mr-1">
              Currency:
            </span>
            {(["ALL", ...currencies] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c as Currency | "ALL")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ring-1 ${
                  currency === c
                    ? "bg-scef-gold text-scef-blue-darker ring-scef-gold"
                    : "bg-background text-scef-blue-darker ring-border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {visible.map((g) => (
          <GroupCard key={g.id} group={g} currencyFilter={currency} />
        ))}
      </div>
    </div>
  );
}

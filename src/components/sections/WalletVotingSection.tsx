import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, TrendingUp, Trophy, ArrowUpRight, Coins, Vote } from "lucide-react";

const leaderboard = [
  { rank: 1, name: "Hope Primary School", country: "Nigeria", votes: "Reporting in progress" },
  { rank: 2, name: "Sunrise Deaf Academy", country: "Kenya", votes: "Reporting in progress" },
  { rank: 3, name: "Ubuntu Inclusive School", country: "South Africa", votes: "Reporting in progress" },
  { rank: 4, name: "Sahel Vocational Centre", country: "Senegal", votes: "Reporting in progress" },
];

export const WalletVotingSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B5D3B] via-[#083D27] to-[#0A0A0A] py-20 text-white md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(45_92%_42%/0.15),transparent_60%)]" />

      <div className="container relative mx-auto px-6 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold">
            GFA Wallet · Afri Gold Coin (AGC)
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight md:text-4xl">
            Fund. Vote. Transform.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75">
            Every donation and every AGC vote moves a real school campaign
            forward. Tracked transparently, disbursed accountably.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Wallet balance card */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-scef-gold/15 text-scef-gold ring-1 ring-scef-gold/40">
                <Wallet className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                AGC Balance
              </span>
            </div>
            <div className="mt-6">
              <div className="font-display text-4xl font-bold tracking-tight">
                — <span className="text-lg font-medium text-scef-gold">AGC</span>
              </div>
              <p className="mt-1 text-xs text-white/55">
                Sign in to view your wallet balance
              </p>
            </div>
            <Button
              asChild
              className="mt-6 w-full bg-scef-gold font-semibold text-[#0A0A0A] hover:bg-scef-gold-hover"
            >
              <Link to="/wallet">
                <Coins className="me-2 h-4 w-4" /> Fund Wallet
              </Link>
            </Button>
          </div>

          {/* Donation tracker */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0E7549] text-white ring-1 ring-[#0E7549]/60">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                Live Donations
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {[
                { label: "Schools funded this cycle", value: "Reporting in progress" },
                { label: "Total raised this cycle", value: "Reporting in progress" },
                { label: "Active campaigns", value: "Reporting in progress" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0">
                  <span className="text-xs text-white/60">{row.label}</span>
                  <span className="text-sm font-semibold text-white">{row.value}</span>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-5 w-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link to="/donate">
                Donate <ArrowUpRight className="ms-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Leaderboard */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-scef-gold/15 text-scef-gold ring-1 ring-scef-gold/40">
                <Trophy className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                AGC Leaderboard
              </span>
            </div>
            <ul className="mt-5 space-y-2.5">
              {leaderboard.map((s) => (
                <li key={s.rank} className="flex items-center gap-3 rounded-lg bg-white/[0.04] px-3 py-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-scef-gold/20 text-[11px] font-bold text-scef-gold">
                    {s.rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-white">{s.name}</div>
                    <div className="text-[11px] text-white/50">{s.country}</div>
                  </div>
                  <span className="text-[10px] font-medium text-white/55">{s.votes}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-5 w-full bg-[#0B5D3B] font-semibold text-white hover:bg-[#0E7549]">
              <Link to="/vote">
                <Vote className="me-2 h-4 w-4" /> Vote Now
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

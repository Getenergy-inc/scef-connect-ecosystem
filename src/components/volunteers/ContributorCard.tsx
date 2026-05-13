import { ContributorAvatar } from "./ContributorAvatar";
import { Badge } from "@/components/ui/badge";
import type { Contributor } from "@/config/contributorsDirectory";
import { MapPin } from "lucide-react";

interface ContributorCardProps {
  contributor: Contributor;
  onClick?: () => void;
}

export const ContributorCard = ({ contributor: c, onClick }: ContributorCardProps) => {
  return (
    <button
      onClick={onClick}
      className="group text-left w-full rounded-2xl border border-border bg-card p-5 hover:border-scef-gold/50 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-scef-gold"
    >
      <div className="flex flex-col items-center text-center">
        <ContributorAvatar src={c.photo} alt={c.name} size="w-24 h-24" />
        <h3 className="mt-4 font-display text-base font-semibold text-scef-blue-darker leading-snug">
          {c.name}
        </h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-scef-gold">
          {c.role}
        </p>
        <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          {c.chapter ? `${c.chapter}, ${c.country}` : c.country}
          <span className="mx-1">·</span>
          Since {c.yearJoined}
        </p>

        <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-3">
          {c.summary}
        </p>

        {c.programs.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {c.programs.slice(0, 3).map((p) => (
              <Badge key={p} variant="secondary" className="text-[10px] font-semibold">
                {p}
              </Badge>
            ))}
          </div>
        )}

        {c.badges.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {c.badges.slice(0, 2).map((b) => (
              <span
                key={b}
                className="inline-flex items-center rounded-full border border-scef-gold/40 bg-scef-gold/10 px-2 py-0.5 text-[10px] font-semibold text-scef-blue-darker"
              >
                {b}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
};

export default ContributorCard;

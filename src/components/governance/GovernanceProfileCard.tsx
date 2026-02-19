import { User, Mail, Linkedin } from "lucide-react";

export interface GovernanceProfile {
  id: string;
  name: string;
  title: string;
  bio?: string;
  photo_url?: string;
  board_type: "bot" | "boa" | "bod" | "lcp" | "management";
  display_order: number;
  linkedin_url?: string;
  email?: string;
}

interface GovernanceProfileCardProps {
  profile: GovernanceProfile;
  variant?: "compact" | "full";
}

const boardLabels: Record<string, string> = {
  bot: "Trustee",
  boa: "Advisor",
  bod: "Director",
  lcp: "Chapter President",
  management: "Management",
};

export const GovernanceProfileCard = ({ profile, variant = "compact" }: GovernanceProfileCardProps) => {
  return (
    <div className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/30 hover:shadow-xl transition-all duration-500">
      {/* Gold accent top bar */}
      <div className="h-1 bg-gradient-to-r from-scef-gold via-scef-gold/70 to-transparent" />

      {/* Photo */}
      <div className="relative aspect-[4/5] bg-muted overflow-hidden">
        {profile.photo_url ? (
          <img
            src={profile.photo_url}
            alt={`Portrait of ${profile.name}`}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-scef-blue-darker/10 to-primary/5">
            <User className="w-20 h-20 text-primary/25" />
          </div>
        )}

        {/* Gradient overlay at bottom of photo */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Board type badge on photo */}
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-scef-gold/90 text-scef-blue-darker text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
          {boardLabels[profile.board_type] || profile.board_type}
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display font-bold text-foreground text-lg leading-snug mb-1.5">
          {profile.name}
        </h3>
        <p className="text-sm text-scef-gold-dark font-medium leading-snug mb-3">
          {profile.title}
        </p>

        {variant === "full" && profile.bio && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
            {profile.bio}
          </p>
        )}

        {/* Contact Links */}
        {(profile.email || profile.linkedin_url) && (
          <div className="flex items-center gap-3 pt-3 border-t border-border/60">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                title={`Email ${profile.name}`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Email</span>
              </a>
            )}
            {profile.linkedin_url && (
              <a
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
                title={`${profile.name} on LinkedIn`}
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

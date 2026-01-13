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

export const GovernanceProfileCard = ({ profile, variant = "compact" }: GovernanceProfileCardProps) => {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Photo */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        {profile.photo_url ? (
          <img 
            src={profile.photo_url} 
            alt={profile.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <User className="w-16 h-16 text-primary/40" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display font-bold text-foreground text-lg mb-1">
          {profile.name}
        </h3>
        <p className="text-sm text-primary font-medium mb-2">
          {profile.title}
        </p>
        
        {variant === "full" && profile.bio && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {profile.bio}
          </p>
        )}

        {/* Contact Links */}
        {(profile.email || profile.linkedin_url) && (
          <div className="flex items-center gap-3 pt-2 border-t border-border">
            {profile.email && (
              <a 
                href={`mailto:${profile.email}`}
                className="text-muted-foreground hover:text-primary transition-colors"
                title={`Email ${profile.name}`}
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
            {profile.linkedin_url && (
              <a 
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title={`${profile.name} on LinkedIn`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

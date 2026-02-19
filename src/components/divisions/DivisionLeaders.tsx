import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Mail, Linkedin } from "lucide-react";

const divisionLeaderMap: Record<string, { code: string; division: string }> = {
  "Chief Visionary Officer (CVO)": { code: "BGEO", division: "Board Governance & Executive Office" },
  "Director of Operations": { code: "SOBCD", division: "Strategic Operations & Business Compliance" },
  "Director of Technology": { code: "TDSD", division: "Technology & Digital Services" },
  "Director of Media Business": { code: "OMBDD", division: "Online Media Business Development" },
  "Director of Santos Media": { code: "Santos Media", division: "Santos Media Division" },
  "Director of Chapter Services": { code: "LCS", division: "Local Chapter Services" },
};

export const DivisionLeaders = () => {
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["division-leaders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("governance_profiles")
        .select("*")
        .eq("board_type", "management")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      // Filter to only division heads
      return (data || []).filter((p) => divisionLeaderMap[p.title]);
    },
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border">
                <Skeleton className="aspect-[4/5]" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!profiles || profiles.length === 0) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Leadership
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Meet the <span className="text-gradient-gold">Division Heads</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Each division is led by a dedicated professional ensuring accountability, innovation, and impact.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {profiles.map((profile) => {
            const mapping = divisionLeaderMap[profile.title];
            return (
              <div
                key={profile.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Gold accent */}
                <div className="h-1.5 bg-gradient-to-r from-scef-gold to-scef-gold/60" />

                {/* Photo */}
                <div className="relative aspect-[4/5] bg-muted overflow-hidden">
                  {profile.photo_url ? (
                    <img
                      src={profile.photo_url}
                      alt={profile.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-scef-blue-darker/10">
                      <Users className="w-16 h-16 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Division badge */}
                  {mapping && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-scef-gold text-scef-blue-darker text-xs font-bold shadow">
                      {mapping.code}
                    </span>
                  )}

                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-lg font-bold text-white leading-tight">
                      {profile.name}
                    </h3>
                    <p className="text-scef-gold text-sm font-medium mt-1">
                      {profile.title}
                    </p>
                  </div>
                </div>

                {/* Division + contacts */}
                <div className="p-5">
                  {mapping && (
                    <p className="text-xs text-muted-foreground mb-3">
                      {mapping.division}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    {profile.email && (
                      <a
                        href={`mailto:${profile.email}`}
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={`Email ${profile.name}`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {profile.linkedin_url && (
                      <a
                        href={profile.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={`${profile.name} LinkedIn`}
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

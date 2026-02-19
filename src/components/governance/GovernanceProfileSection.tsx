import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GovernanceProfileCard, GovernanceProfile } from "./GovernanceProfileCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Users, Building2, Globe, Briefcase } from "lucide-react";

interface GovernanceProfileSectionProps {
  boardType: "bot" | "boa" | "bod" | "lcp" | "management";
  title: string;
  subtitle?: string;
  excludeTitles?: string[];
}

const boardIcons = {
  bot: Shield,
  boa: Users,
  bod: Building2,
  lcp: Globe,
  management: Briefcase,
};

const boardAccents = {
  bot: "from-scef-gold/20 to-scef-gold/5 border-scef-gold/30",
  boa: "from-primary/15 to-primary/5 border-primary/25",
  bod: "from-scef-gold/20 to-scef-gold/5 border-scef-gold/30",
  lcp: "from-primary/15 to-primary/5 border-primary/25",
  management: "from-primary/15 to-primary/5 border-primary/25",
};

const iconColors = {
  bot: "bg-scef-gold text-scef-blue-darker",
  boa: "bg-primary text-primary-foreground",
  bod: "bg-scef-gold text-scef-blue-darker",
  lcp: "bg-primary text-primary-foreground",
  management: "bg-primary text-primary-foreground",
};

export const GovernanceProfileSection = ({
  boardType,
  title,
  subtitle,
  excludeTitles,
}: GovernanceProfileSectionProps) => {
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["governance-profiles", boardType, excludeTitles],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("governance_profiles")
        .select("*")
        .eq("board_type", boardType)
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      let results = data as GovernanceProfile[];
      if (excludeTitles?.length) {
        results = results.filter((p) => !excludeTitles.includes(p.title));
      }
      return results;
    },
  });

  const Icon = boardIcons[boardType];

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="aspect-[4/5]" />
                <div className="p-5 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-xl ${iconColors[boardType]} flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">{title}</h3>
              {subtitle && <p className="text-muted-foreground text-sm">{subtitle}</p>}
            </div>
          </div>
          <div className="bg-muted/50 rounded-2xl p-10 text-center border border-border">
            <p className="text-muted-foreground">
              Profile information will be added soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Determine grid cols based on count
  const gridCols =
    profiles.length === 1
      ? "max-w-sm mx-auto"
      : profiles.length === 2
      ? "grid sm:grid-cols-2 max-w-2xl mx-auto"
      : profiles.length === 3
      ? "grid sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
      : "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-10">
          <div className={`w-14 h-14 rounded-xl ${iconColors[boardType]} flex items-center justify-center shadow-lg`}>
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h3>
            {subtitle && (
              <p className="text-muted-foreground text-sm mt-0.5">{subtitle}</p>
            )}
          </div>
          <div className="hidden md:block ml-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium border border-border">
              {profiles.length} {profiles.length === 1 ? "Member" : "Members"}
            </span>
          </div>
        </div>

        {/* Profile grid */}
        <div className={`${gridCols} gap-6`}>
          {profiles.map((profile) => (
            <GovernanceProfileCard
              key={profile.id}
              profile={profile}
              variant="full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

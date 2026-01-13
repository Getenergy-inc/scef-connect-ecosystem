import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GovernanceProfileCard, GovernanceProfile } from "./GovernanceProfileCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Users, Building2, Globe, Briefcase } from "lucide-react";

interface GovernanceProfileSectionProps {
  boardType: "bot" | "boa" | "bod" | "lcp" | "management";
  title: string;
  subtitle?: string;
}

const boardIcons = {
  bot: Shield,
  boa: Users,
  bod: Building2,
  lcp: Globe,
  management: Briefcase,
};

const boardColors = {
  bot: "bg-gold/10 text-gold border-gold/20",
  boa: "bg-terracotta/10 text-terracotta border-terracotta/20",
  bod: "bg-forest/10 text-forest border-forest/20",
  lcp: "bg-primary/10 text-primary border-primary/20",
  management: "bg-primary/10 text-primary border-primary/20",
};

export const GovernanceProfileSection = ({ 
  boardType, 
  title, 
  subtitle 
}: GovernanceProfileSectionProps) => {
  const { data: profiles, isLoading } = useQuery({
    queryKey: ["governance-profiles", boardType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("governance_profiles")
        .select("*")
        .eq("board_type", boardType)
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data as GovernanceProfile[];
    },
  });

  const Icon = boardIcons[boardType];

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-[3/4] rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show placeholder if no profiles
  if (!profiles || profiles.length === 0) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-xl ${boardColors[boardType]} border flex items-center justify-center`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">{title}</h3>
              {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
            </div>
          </div>
          <div className="bg-muted/50 rounded-xl p-8 text-center">
            <p className="text-muted-foreground">
              Profile information will be added soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-xl ${boardColors[boardType]} border flex items-center justify-center`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">{title}</h3>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

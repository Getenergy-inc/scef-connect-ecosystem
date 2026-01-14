import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/contexts/LocaleContext";
import { Award, ExternalLink } from "lucide-react";

interface Endorsement {
  id: string;
  name: string;
  acronym: string | null;
  logo_url: string;
  website_url: string | null;
  description: string | null;
  display_order: number;
}

export const EndorsedBySection = () => {
  const { t, isRTL } = useLocale();

  const { data: endorsements = [], isLoading } = useQuery({
    queryKey: ["endorsements"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("endorsements")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Endorsement[];
    },
  });

  if (isLoading || endorsements.length === 0) return null;

  return (
    <section 
      className="py-16 bg-gradient-to-b from-muted/30 to-background border-t border-border/50"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-gold/20 text-scef-blue text-sm font-medium mb-4 border border-scef-gold/30">
            <Award className="w-4 h-4" />
            {t("home.endorsedBy.badge") || "Endorsed By"}
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {t("home.endorsedBy.title") || "Trusted & Endorsed By Leading Organizations"}
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            {t("home.endorsedBy.subtitle") || "SCEF is proudly endorsed by these distinguished education advocacy organizations across Africa."}
          </p>
        </div>

        {/* Endorsement Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {endorsements.map((endorsement) => (
            <a
              key={endorsement.id}
              href={endorsement.website_url || "#"}
              target={endorsement.website_url ? "_blank" : undefined}
              rel={endorsement.website_url ? "noopener noreferrer" : undefined}
              className="group relative flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:bg-card hover:shadow-lg hover:border-scef-gold/30 border border-transparent"
              title={endorsement.name}
            >
              {/* Logo */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white shadow-md border-2 border-border group-hover:border-scef-gold transition-colors">
                <img
                  src={endorsement.logo_url}
                  alt={endorsement.name}
                  className="w-full h-full object-contain p-1"
                  loading="lazy"
                />
              </div>

              {/* Name & Acronym */}
              <div className="mt-3 text-center">
                <p className="font-semibold text-sm text-foreground group-hover:text-scef-blue transition-colors">
                  {endorsement.acronym || endorsement.name}
                </p>
                {endorsement.website_url && (
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>

              {/* Tooltip with full name */}
              {endorsement.acronym && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  <div className="bg-foreground text-background text-xs px-3 py-2 rounded-lg shadow-lg max-w-xs text-center whitespace-nowrap">
                    {endorsement.name}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
                  </div>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

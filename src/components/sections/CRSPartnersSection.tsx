import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/contexts/LocaleContext";
import { Handshake, ExternalLink } from "lucide-react";

interface CRSPartner {
  id: string;
  name: string;
  acronym: string | null;
  logo_url: string;
  website_url: string | null;
  service_description: string;
  partner_since: number;
}

interface CRSPartnersSectionProps {
  variant?: "full" | "compact";
  className?: string;
}

export const CRSPartnersSection = ({ variant = "full", className = "" }: CRSPartnersSectionProps) => {
  const { t } = useLocale();

  const { data: partners, isLoading } = useQuery({
    queryKey: ["crs-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crs_partners")
        .select("id, name, acronym, logo_url, website_url, service_description, partner_since")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as CRSPartner[];
    },
  });

  if (isLoading || !partners?.length) return null;

  if (variant === "compact") {
    return (
      <div className={`py-8 bg-muted/30 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <span className="text-sm text-muted-foreground font-medium">CRS Partners:</span>
            {partners.map((partner) => (
              <a
                key={partner.id}
                href={partner.website_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm font-medium text-foreground">
                  {partner.acronym || partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className={`py-16 bg-background ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
            <Handshake className="w-4 h-4" />
            Corporate Responsibility Support
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our CRS Partners
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Strategic partners providing essential services for SCEF operations and sustainability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.website_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden border border-border">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                    {partner.acronym || partner.name}
                  </h3>
                  {partner.acronym && (
                    <p className="text-sm text-muted-foreground truncate">{partner.name}</p>
                  )}
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium text-foreground">{partner.service_description}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Partner since:</span>
                  <span className="font-medium text-primary">{partner.partner_since}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/contexts/LocaleContext";

interface CRSPartner {
  id: string;
  name: string;
  acronym: string | null;
  logo_url: string;
  website_url: string | null;
}

/**
 * Supporting Partners — lean logo strip for landing page (no filters/cards).
 * Use heavy <CRSPartnersSection /> only on dedicated partner pages.
 */
export const CRSPartnersStrip = () => {
  const { t, isRTL } = useLocale();

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ["crs-partners-strip"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("crs_partners")
        .select("id,name,acronym,logo_url,website_url")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as CRSPartner[];
    },
  });

  if (isLoading || partners.length === 0) return null;

  return (
    <section className="border-t border-border bg-card py-12 md:py-14" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-6 md:px-8">
        <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-scef-gold-dark">
          {t("home.crsPartners.title") || "Supporting Partners"}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {partners.map((p, idx) => (
            <a
              key={p.id}
              href={p.website_url || "#"}
              target={p.website_url ? "_blank" : undefined}
              rel={p.website_url ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-2 animate-fade-in"
              style={{ animationDelay: `${idx * 40}ms` }}
              title={p.name}
            >
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-background p-1.5 transition-all duration-300 group-hover:-translate-y-0.5 md:h-14 md:w-14">
                <img
                  src={p.logo_url}
                  alt={p.name}
                  className="h-full w-full object-contain opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground transition-colors group-hover:text-scef-blue-darker">
                {p.acronym || p.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

import { ExternalLink } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const partners = [
  { name: "UNESCO", type: "International", logo: "🇺🇳" },
  { name: "African Union", type: "Continental", logo: "🌍" },
  { name: "World Bank", type: "Financial", logo: "🏦" },
  { name: "USAID", type: "Development", logo: "🇺🇸" },
  { name: "British Council", type: "Cultural", logo: "🇬🇧" },
  { name: "GIZ", type: "Development", logo: "🇩🇪" },
  { name: "DFID", type: "Development", logo: "🇬🇧" },
  { name: "Mastercard Foundation", type: "Philanthropy", logo: "💳" }
];

export default function EduAidPartners() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-muted/30" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-sm font-medium mb-4 border border-secondary/30">
            {t('eduaid.partners.badge') || 'Strategic Alliances'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('eduaid.partners.title') || 'Our Partners'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('eduaid.partners.subtitle') || 'Collaborating with leading organizations to maximize educational impact across Africa'}
          </p>
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-[#1F892B]/40 transition-colors"
            >
              <div className="text-4xl mb-3">{partner.logo}</div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{partner.name}</h3>
              <p className="text-xs text-muted-foreground">{partner.type}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-muted-foreground italic">
          {t('eduaid.partners.disclaimer') || 'Partnership details are subject to formal agreements and verification'}
        </p>
      </div>
    </section>
  );
}

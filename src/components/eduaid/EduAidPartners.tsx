import { useLocale } from "@/contexts/LocaleContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Handshake } from "lucide-react";

/**
 * EduAid-Africa Partners section.
 *
 * Per SCEF policy, only verified, formally agreed partners may appear here.
 * Until partner logos and agreements are confirmed, this section shows a
 * neutral CSR partnership invitation — no unverified UN / AU / UNESCO /
 * UNICEF / GPE / World Bank / USAID / Mastercard claims.
 */
export default function EduAidPartners() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-muted/30" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container px-4 md:px-8">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/20 text-secondary-foreground rounded-full text-xs font-semibold uppercase tracking-wider border border-secondary/30">
            <Handshake className="h-3.5 w-3.5" />
            {t("eduaid.partners.badge") || "CSR & Strategic Partnerships"}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            {t("eduaid.partners.title") || "Partner With EduAid-Africa"}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            EduAid-Africa partners with companies, foundations, diaspora supporters, and
            education-aligned organisations to fund scholarships, school transformation,
            teacher training, and community education projects across Africa.
          </p>
          <p className="text-sm text-muted-foreground italic mt-4">
            Verified partners are listed only after formal agreement and logo-use confirmation.
            Reporting in progress.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <Link to="/csr-education-funds-management">CSR Education Funds Management</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/partner-with-us">Request Partnership Proposal</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

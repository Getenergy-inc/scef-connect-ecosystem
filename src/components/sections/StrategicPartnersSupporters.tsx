import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, FileText, Handshake } from "lucide-react";
import csacefaLogo from "@/assets/endorsements/csacefa-logo.jpg";
import faweLogo from "@/assets/endorsements/fawe-logo.jpg";
import pkisLogo from "@/assets/partners/pkis-logo.jpg";
import getenergyLogo from "@/assets/partners/getenergy-logo.jpg";

/**
 * Strategic Partners, Endorsers & Operational Supporters
 *
 * Rules:
 * - Only show logo cards for organizations whose logos are confirmed available.
 *   Until verified logo assets are added, all entries render as initials-based
 *   monogram placeholders inside equal-size cards (NOT recreated logos).
 * - Organizations without confirmed logo rights live in the
 *   "Text-Only Strategic References" list.
 */

type LogoPartner = {
  name: string;
  caption?: string;
  logoUrl?: string; // when a verified logo asset is added, set this
};

const verifiedEducationPartners: LogoPartner[] = [
  { name: "CSACEFA", caption: "Civil Society Action Coalition on Education For All" },
  { name: "UNESCO", caption: "UNESCO Regional Office for Africa" },
  { name: "UNICEF Africa" },
  { name: "GPE", caption: "Global Partnership for Education" },
  { name: "ADEA", caption: "Association for the Development of Education in Africa" },
  { name: "FAWE Kenya", caption: "Forum for African Women Educationalists – Kenya Chapter" },
  { name: "ANCEFA", caption: "African Network Campaign on Education for All" },
];

const textOnlyReferences: string[] = [
  "African Union Commission – Education Division",
  "Education International Africa",
  "Pan-African Conference on Sex Education",
];

const operationalPartners: LogoPartner[] = [
  { name: "PKIS", caption: "PancoKrato Integrated Services — Operational & CSR support partner" },
  { name: "GetEnergy.ng", caption: "Energy and digital support partner" },
];

function initials(name: string) {
  return name
    .replace(/[^A-Za-z0-9 .]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function LogoCard({ partner }: { partner: LogoPartner }) {
  return (
    <div className="flex h-full flex-col items-center rounded-xl border border-border bg-card p-5 text-center transition-colors hover:border-scef-gold/40">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
        {partner.logoUrl ? (
          <img
            src={partner.logoUrl}
            alt={partner.name}
            className="max-h-full max-w-full object-contain"
            loading="lazy"
          />
        ) : (
          <span className="font-display text-lg font-bold text-scef-blue-darker">
            {initials(partner.name)}
          </span>
        )}
      </div>
      <div className="mt-4 font-semibold text-foreground">{partner.name}</div>
      {partner.caption && (
        <p className="mt-1 text-xs leading-snug text-muted-foreground">{partner.caption}</p>
      )}
    </div>
  );
}

export const StrategicPartnersSupporters = () => {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-scef-gold/30 bg-scef-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-scef-blue-darker">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Network
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-scef-blue-darker md:text-3xl">
            Trusted Education, Advocacy & Operational Partners
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Working with verified education networks, development institutions, CSR partners, and
            operational supporters to expand measurable education impact across Africa.
          </p>
        </div>

        {/* 1. Verified Education & Advocacy Partners */}
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-scef-gold" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Verified Education & Advocacy Partners
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {verifiedEducationPartners.map((p) => (
              <LogoCard key={p.name} partner={p} />
            ))}
          </div>
        </div>

        {/* 2. Text-Only Strategic References */}
        <div className="mb-14">
          <div className="mb-6 flex items-center gap-2">
            <FileText className="h-4 w-4 text-scef-blue-darker" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Text-Only Strategic References
            </h3>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {textOnlyReferences.map((ref) => (
              <li
                key={ref}
                className="rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3 text-sm text-foreground"
              >
                {ref}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs italic text-muted-foreground">
            Listed as references pending confirmation of public logo usage rights.
          </p>
        </div>

        {/* 3. Operational & Supporting Partners */}
        <div className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Handshake className="h-4 w-4 text-scef-gold" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Operational & Supporting Partners
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {operationalPartners.map((p) => (
              <LogoCard key={p.name} partner={p} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold/90">
            <Link to="/partner-with-us">
              Partner With SCEF
              <ArrowRight className="ms-1 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-scef-blue-darker text-scef-blue-darker">
            <Link to="/partner-with-us#inquiry">Submit Partnership Interest</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StrategicPartnersSupporters;

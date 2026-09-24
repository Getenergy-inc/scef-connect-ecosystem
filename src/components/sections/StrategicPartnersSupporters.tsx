import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake } from "lucide-react";
import csacefaLogo from "@/assets/endorsements/csacefa-logo.jpg";
import faweLogo from "@/assets/endorsements/fawe-logo.jpg";
import pkisLogo from "@/assets/partners/pkis-logo.jpg";
import getenergyLogo from "@/assets/partners/getenergy-logo.jpg";

/**
 * Organisations SCEF has engaged with. Relationship classifications remain
 * subject to documentary confirmation and logo-use permission.
 */

type LogoPartner = {
  name: string;
  caption?: string;
  logoUrl?: string;
};

const educationOrganisations: LogoPartner[] = [
  { name: "CSACEFA", caption: "Civil Society Action Coalition on Education For All", logoUrl: csacefaLogo },
  { name: "FAWE Kenya", caption: "Forum for African Women Educationalists — Kenya Chapter", logoUrl: faweLogo },
];

const operationalPartners: LogoPartner[] = [
  { name: "PKIS", caption: "PancoKrato Integrated Services — Operational & CSR support partner", logoUrl: pkisLogo },
  { name: "GetEnergy.ng", caption: "Energy and digital support partner", logoUrl: getenergyLogo },
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
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-scef-gold/30 bg-scef-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-scef-blue-darker">
            <Handshake className="h-3.5 w-3.5" />
            Engagement Network
          </span>
          <h2 className="mt-4 font-display text-2xl font-bold text-scef-blue-darker md:text-3xl">
            Organisations SCEF Has Engaged With
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            These listings record engagement and do not imply endorsement or a formal partnership.
            Relationship classification and logo-use permission are under documentary review.
          </p>
        </div>

        <div className="mb-14">
          <div className="mb-6 flex items-center gap-2">
            <Handshake className="h-4 w-4 text-scef-gold" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Education Organisations Engaged
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {educationOrganisations.map((p) => (
              <LogoCard key={p.name} partner={p} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="mb-6 flex items-center gap-2">
            <Handshake className="h-4 w-4 text-scef-gold" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Operational Organisations Engaged
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {operationalPartners.map((p) => (
              <LogoCard key={p.name} partner={p} />
            ))}
          </div>
        </div>

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

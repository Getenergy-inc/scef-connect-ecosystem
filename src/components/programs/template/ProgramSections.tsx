import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon, ShieldCheck } from "lucide-react";

/* Reusable section primitives that match the EduAid Africa Teacher Corps
 * page standard. Uses existing design tokens only — no new colours/fonts. */

export const Section = ({
  kicker,
  title,
  children,
  bordered = true,
}: {
  kicker?: string;
  title: string;
  children: ReactNode;
  bordered?: boolean;
}) => (
  <section
    className={`container mx-auto max-w-6xl px-6 md:px-8 py-12 md:py-16 ${
      bordered ? "border-t border-border" : ""
    }`}
  >
    {kicker && (
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary mb-2">
        {kicker}
      </p>
    )}
    <h2 className="font-display text-2xl md:text-[28px] font-bold tracking-tight text-scef-blue-darker mb-6">
      {title}
    </h2>
    {children}
  </section>
);

export const HeroCTAs = ({
  primary,
  secondary,
  tertiary,
  tagline,
}: {
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
  tertiary?: { label: string; to: string };
  tagline?: string;
}) => (
  <section className="container mx-auto max-w-6xl px-6 md:px-8 py-10">
    <div className="flex flex-wrap gap-3">
      <Button asChild size="lg"><Link to={primary.to}>{primary.label}</Link></Button>
      {secondary && (
        <Button asChild size="lg" variant="secondary"><Link to={secondary.to}>{secondary.label}</Link></Button>
      )}
      {tertiary && (
        <Button asChild size="lg" variant="outline"><Link to={tertiary.to}>{tertiary.label}</Link></Button>
      )}
    </div>
    {tagline && (
      <p className="mt-4 text-sm font-semibold text-scef-gold uppercase tracking-wider">{tagline}</p>
    )}
  </section>
);

export const Prose = ({ children }: { children: ReactNode }) => (
  <div className="prose prose-slate max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
    {children}
  </div>
);

export const BulletGrid = ({ items, cols = 3 }: { items: string[]; cols?: 2 | 3 }) => (
  <ul
    className={`grid gap-2 sm:grid-cols-2 ${
      cols === 3 ? "lg:grid-cols-3" : ""
    } text-[14px] text-muted-foreground`}
  >
    {items.map((w) => (
      <li key={w} className="flex items-start gap-2">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />
        {w}
      </li>
    ))}
  </ul>
);

export type TrackCard = { icon: LucideIcon; title: string; body: string };

export const CardGrid = ({ items }: { items: TrackCard[] }) => (
  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((t) => {
      const Icon = t.icon;
      return (
        <div key={t.title} className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary mb-3">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-display text-[16px] font-bold text-scef-blue-darker leading-tight">
            {t.title}
          </h3>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{t.body}</p>
        </div>
      );
    })}
  </div>
);

export const Steps = ({ steps }: { steps: Array<[string, string]> }) => (
  <ol className="space-y-4 max-w-3xl">
    {steps.map(([step, body], i) => (
      <li key={step} className="flex gap-4 rounded-lg border border-border bg-card p-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-scef-blue-darker text-white font-bold text-sm">
          {i + 1}
        </span>
        <div>
          <h3 className="font-display font-bold text-scef-blue-darker">{step}</h3>
          <p className="text-[14px] text-muted-foreground mt-1">{body}</p>
        </div>
      </li>
    ))}
  </ol>
);

export const Safeguarding = ({
  intro,
  rules,
}: {
  intro?: string;
  rules: string[];
}) => (
  <div className="max-w-3xl space-y-4 text-[14.5px] leading-relaxed text-muted-foreground">
    {intro && <p>{intro}</p>}
    <ul className="grid gap-2 sm:grid-cols-2">
      {rules.map((r) => (
        <li key={r} className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-scef-gold" />
          {r}
        </li>
      ))}
    </ul>
  </div>
);

export const FeesTable = ({
  rows,
  note,
  headers = ["Category", "Form Fee"],
}: {
  rows: Array<[string, string]>;
  note?: string;
  headers?: [string, string];
}) => (
  <>
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-[14px]">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold text-scef-blue-darker">{headers[0]}</th>
            <th className="px-4 py-3 font-semibold text-scef-blue-darker">{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([cat, fee]) => (
            <tr key={cat} className="border-t border-border">
              <td className="px-4 py-3 text-muted-foreground">{cat}</td>
              <td className="px-4 py-3 font-semibold text-scef-blue-darker">{fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {note && (
      <p className="mt-4 text-[13px] text-muted-foreground max-w-3xl">{note}</p>
    )}
  </>
);

export const PartnershipBlock = ({
  intro,
  categories,
  support,
  ctaLabel = "Partner With Us",
  ctaTo = "/partner-with-us",
}: {
  intro: string;
  categories: string[];
  support: string[];
  ctaLabel?: string;
  ctaTo?: string;
}) => (
  <div className="max-w-3xl space-y-4 text-[14.5px] leading-relaxed text-muted-foreground">
    <p>{intro}</p>
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <h3 className="font-semibold text-scef-blue-darker mb-2">Partner categories</h3>
        <ul className="space-y-1">
          {categories.map((c) => (
            <li key={c} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />{c}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-scef-blue-darker mb-2">Partners may support</h3>
        <ul className="space-y-1">
          {support.map((c) => (
            <li key={c} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-scef-gold" />{c}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <Button asChild className="mt-2"><Link to={ctaTo}>{ctaLabel}</Link></Button>
  </div>
);

export const FinalCTA = ({
  title,
  body,
  buttons,
}: {
  title: string;
  body?: string;
  buttons: Array<{ label: string; to: string; variant?: "default" | "secondary" | "outline" }>;
}) => (
  <section className="bg-scef-pattern border-t border-border">
    <div className="container mx-auto max-w-5xl px-6 md:px-8 py-14 md:py-20 text-center">
      <h2 className="font-display text-2xl md:text-3xl font-bold text-scef-blue-darker">{title}</h2>
      {body && (
        <p className="mt-3 max-w-2xl mx-auto text-[15px] text-muted-foreground">{body}</p>
      )}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {buttons.map((b) => (
          <Button key={b.label} asChild size="lg" variant={b.variant ?? "default"}>
            <Link to={b.to}>{b.label}</Link>
          </Button>
        ))}
      </div>
    </div>
  </section>
);

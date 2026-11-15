import { ReactNode, ButtonHTMLAttributes, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export const Section = ({ id, title, eyebrow, intro, dark, children, className }: {
  id?: string; title: ReactNode; eyebrow?: string; intro?: ReactNode; dark?: boolean; children?: ReactNode; className?: string;
}) => (
  <section id={id} tabIndex={id ? -1 : undefined} aria-labelledby={id ? `${id}-title` : undefined}
    className={cn("scroll-mt-24 py-14 md:py-20 outline-none", dark ? "bg-eduaid-deep text-eduaid-cream" : "", className)}>
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mb-8">
        {eyebrow && <p className={cn("text-xs font-bold uppercase tracking-[0.16em] mb-3", dark ? "text-eduaid-tan" : "text-eduaid-brown")}>{eyebrow}</p>}
        <h2 id={id ? `${id}-title` : undefined} className={cn("text-3xl md:text-4xl leading-tight", dark ? "text-eduaid-cream" : "text-eduaid-dark")}>{title}</h2>
        {intro && <div className={cn("mt-4 text-base md:text-lg leading-relaxed", dark ? "text-eduaid-sand" : "text-eduaid-muted")}>{intro}</div>}
      </div>
      {children}
    </div>
  </section>
);

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("rounded-[20px] border border-eduaid-line bg-eduaid-paper p-5 md:p-6", className)}>{children}</div>
);

type Variant = "primary" | "outline" | "tan" | "ghostDark";
const pill: Record<Variant, string> = {
  primary: "bg-eduaid-green text-eduaid-paper hover:bg-eduaid-dark border border-eduaid-green",
  outline: "border border-eduaid-green text-eduaid-dark bg-eduaid-paper hover:bg-eduaid-sand",
  tan: "bg-eduaid-tan text-eduaid-ink hover:bg-eduaid-sand border border-eduaid-tan",
  ghostDark: "border border-eduaid-tan/60 text-eduaid-cream hover:bg-eduaid-dark",
};
export const pillClass = (v: Variant = "primary", extra?: string) =>
  cn("inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors min-h-[44px] text-center disabled:opacity-60 disabled:cursor-not-allowed", pill[v], extra);

export const PillButton = ({ variant = "primary", className, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) => (
  <button type="button" {...p} className={pillClass(variant, className)} />
);
export const PillLink = ({ href, variant = "primary", className, children, external }: { href: string; variant?: Variant; className?: string; children: ReactNode; external?: boolean }) => (
  <a href={href} className={pillClass(variant, className)} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>
);

export const Notice = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <p className={cn("rounded-2xl border-l-4 border-eduaid-tan p-4 text-sm leading-relaxed", dark ? "bg-eduaid-dark text-eduaid-cream" : "bg-eduaid-sand text-eduaid-ink")}>{children}</p>
);

export const Chip = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("inline-flex items-center rounded-full border border-eduaid-line bg-eduaid-paper px-3 py-1 text-xs font-medium text-eduaid-ink", className)}>{children}</span>
);

export const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [done, setDone] = useState(false);
  return (
    <button type="button" aria-label={`Copy ${label}`}
      onClick={async () => { try { await navigator.clipboard.writeText(value); setDone(true); setTimeout(() => setDone(false), 1500); } catch { /* clipboard unavailable */ } }}
      className="inline-flex items-center gap-1 rounded-full border border-eduaid-line px-3 py-1 text-xs font-semibold text-eduaid-dark hover:bg-eduaid-sand min-h-[32px]">
      {done ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}{done ? "Copied" : "Copy"}
    </button>
  );
};

export const fmtMoney = (n: number, cur: string) =>
  `${cur} ${n.toLocaleString("en-GB", { maximumFractionDigits: 2 })}`;
export const dash = (v: number | string | null | undefined, fmt?: (n: number) => string) =>
  v === null || v === undefined || v === "" ? "—" : typeof v === "number" && fmt ? fmt(v) : String(v);

export const fieldClass = "w-full rounded-xl border border-eduaid-line bg-eduaid-paper px-3 py-2.5 text-sm text-eduaid-ink placeholder:text-eduaid-muted/70";
export const labelClass = "block text-sm font-semibold text-eduaid-ink mb-1";

export const ChipToggle = ({ pressed, onClick, children, color }: { pressed: boolean; onClick: () => void; children: ReactNode; color?: string }) => (
  <button type="button" aria-pressed={pressed} onClick={onClick}
    className={cn("inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium min-h-[36px]",
      pressed ? "border-eduaid-green bg-eduaid-green text-eduaid-paper" : "border-eduaid-line bg-eduaid-paper text-eduaid-ink hover:bg-eduaid-sand")}>
    {color && <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />}
    {children}
  </button>
);

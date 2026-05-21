import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Mail, MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

export type ConversionPageProps = {
  // SEO
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  // Hero
  kicker: string;
  headline: string;
  subheadline: string;
  heroImage: string;
  heroImageAlt: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  // Body
  audience: string[];        // "Who this is for"
  whyItMatters: string;      // Short paragraph
  whatYouGet: string[];      // Bullet list (what you get / support)
  steps: { title: string; description: string }[]; // Process
  requirements?: string[];   // Optional eligibility
  trustPoints?: { value: string; label: string }[]; // Impact proof
  faqs: { question: string; answer: string }[];
  contactEmail?: string;
};

export const ConversionPageTemplate = ({
  metaTitle, metaDescription, canonicalPath,
  kicker, headline, subheadline, heroImage, heroImageAlt,
  primaryCta, secondaryCta,
  audience, whyItMatters, whatYouGet, steps, requirements, trustPoints,
  faqs, contactEmail = "info@santoscreations.org",
}: ConversionPageProps) => {
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={`https://santoscreations.org${canonicalPath}`} />
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section className="relative bg-scef-blue-darker border-b border-border">
          <div className="absolute inset-0">
            <img src={heroImage} alt={heroImageAlt} className="h-full w-full object-cover" loading="eager" />
            <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker/95 via-scef-blue-darker/80 to-scef-blue-darker/40" />
          </div>
          <div className="relative container mx-auto max-w-6xl px-6 md:px-8 py-20 md:py-24">
            <div className="max-w-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-scef-gold">{kicker}</p>
              <h1 className="font-display text-white text-[clamp(1.9rem,4vw,2.75rem)] font-bold leading-[1.12] tracking-tight">
                {headline}
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-white/85 max-w-xl">{subheadline}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button asChild size="sm" className="h-10 px-5 text-[13px] rounded-md">
                  <Link to={primaryCta.href}>
                    {primaryCta.label} <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                </Button>
                {secondaryCta && (
                  <Button asChild size="sm" variant="outline" className="h-10 px-5 text-[13px] rounded-md bg-white/95 text-scef-blue-darker border-white hover:bg-white">
                    <Link to={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        {trustPoints && trustPoints.length > 0 && (
          <section className="bg-white border-b border-border">
            <div className="container mx-auto max-w-6xl px-6 md:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {trustPoints.map((t) => (
                  <div key={t.label}>
                    <p className="font-display text-2xl font-bold text-scef-blue-darker">{t.value}</p>
                    <p className="text-[12px] text-muted-foreground mt-1">{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Who + Why */}
        <section className="bg-white">
          <div className="container mx-auto max-w-6xl px-6 md:px-8 py-14 md:py-16 grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Who this is for</p>
              <h2 className="mt-2 font-display text-xl md:text-2xl font-bold text-scef-blue-darker">
                Designed for the people who move education forward
              </h2>
              <ul className="mt-5 space-y-2.5">
                {audience.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-[14px] text-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Why it matters</p>
              <h2 className="mt-2 font-display text-xl md:text-2xl font-bold text-scef-blue-darker">
                Your contribution turns advocacy into outcomes
              </h2>
              <p className="mt-5 text-[14.5px] leading-relaxed text-muted-foreground">{whyItMatters}</p>
            </div>
          </div>
        </section>

        {/* What you get / support */}
        <section className="bg-muted/40 border-y border-border">
          <div className="container mx-auto max-w-6xl px-6 md:px-8 py-14 md:py-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">What you get or support</p>
            <h2 className="mt-2 font-display text-xl md:text-2xl font-bold text-scef-blue-darker">
              The value you receive and the impact you enable
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-lg border border-border bg-white p-4 text-[13.5px] text-foreground">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Steps */}
        <section className="bg-white">
          <div className="container mx-auto max-w-6xl px-6 md:px-8 py-14 md:py-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">How it works</p>
            <h2 className="mt-2 font-display text-xl md:text-2xl font-bold text-scef-blue-darker">
              Simple steps from interest to impact
            </h2>
            <ol className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-lg border border-border p-5 bg-card">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-scef-blue-darker text-white text-[12px] font-bold">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-[15px] font-bold text-scef-blue-darker">{s.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{s.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Requirements */}
        {requirements && requirements.length > 0 && (
          <section className="bg-muted/40 border-y border-border">
            <div className="container mx-auto max-w-6xl px-6 md:px-8 py-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Eligibility & requirements</p>
              <h2 className="mt-2 font-display text-xl md:text-2xl font-bold text-scef-blue-darker">
                What you need to get started
              </h2>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {requirements.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-[14px] text-foreground">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CTA band */}
        <section className="bg-scef-blue-darker text-white">
          <div className="container mx-auto max-w-6xl px-6 md:px-8 py-12 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="font-display text-xl md:text-2xl font-bold">Ready to take the next step?</h2>
              <p className="mt-1.5 text-[14px] text-white/75 max-w-xl">
                Complete the short form and a SCEF coordinator will follow up within five working days.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="sm" className="h-10 px-5 text-[13px] rounded-md bg-scef-gold text-scef-blue-darker hover:bg-scef-gold/90">
                <Link to={primaryCta.href}>{primaryCta.label}</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="h-10 px-5 text-[13px] rounded-md bg-transparent text-white border-white/30 hover:bg-white/10">
                <Link to="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white">
          <div className="container mx-auto max-w-3xl px-6 md:px-8 py-14 md:py-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Frequently asked questions</p>
            <h2 className="mt-2 font-display text-xl md:text-2xl font-bold text-scef-blue-darker">
              Answers to common questions
            </h2>
            <Accordion type="single" collapsible className="mt-6">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-[14px] font-medium">{f.question}</AccordionTrigger>
                  <AccordionContent className="text-[13.5px] leading-relaxed text-muted-foreground">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Help / Contact */}
        <section className="bg-muted/40 border-t border-border">
          <div className="container mx-auto max-w-6xl px-6 md:px-8 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[14px] text-foreground">
              Still have questions? Reach the SCEF team directly.
            </p>
            <div className="flex flex-wrap gap-3 text-[13.5px]">
              <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 text-primary hover:text-scef-blue-darker">
                <Mail className="w-3.5 h-3.5" /> {contactEmail}
              </a>
              <a href="https://wa.me/2348056677770" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-scef-blue-darker">
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ConversionPageTemplate;

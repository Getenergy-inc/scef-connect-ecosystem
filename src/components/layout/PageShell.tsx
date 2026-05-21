import { Helmet } from "react-helmet-async";
import { ReactNode } from "react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";

interface PageShellProps {
  title: string;
  description: string;
  eyebrow?: string;
  heading: string;
  intro?: string;
  children: ReactNode;
}

export const PageShell = ({ title, description, eyebrow, heading, intro, children }: PageShellProps) => {
  return (
    <>
      <Helmet>
        <title>{`${title} — SCEF`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`https://santoscreationsorg.lovable.app${typeof window !== "undefined" ? window.location.pathname : ""}`} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />

        <header className="bg-scef-pattern border-b border-scef-blue/10">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="max-w-3xl">
              {eyebrow && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
                  {eyebrow}
                </p>
              )}
              <h1 className="font-display text-3xl md:text-5xl font-bold text-scef-blue-darker leading-tight mb-4">
                {heading}
              </h1>
              {intro && (
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {intro}
                </p>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </>
  );
};

export default PageShell;

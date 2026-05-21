import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Hammer } from "lucide-react";
import { HeaderScreenshot } from "@/components/layout/HeaderScreenshot";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

const ComingSoon = ({ title, description }: ComingSoonProps) => {
  const location = useLocation();
  const pageTitle =
    title ||
    location.pathname
      .split("/")
      .filter(Boolean)
      .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
      .join(" — ") ||
    "Page";

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} — SCEF`}</title>
        <meta
          name="description"
          content={description || `${pageTitle} — Santos Creations Educational Foundation. Detailed page coming soon.`}
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <HeaderScreenshot />
        <div className="h-[76px] md:h-[84px]" />

        <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-scef-gold/15 text-scef-gold mb-6">
              <Hammer className="w-7 h-7" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
              In production
            </p>
            <h1 className="font-display text-3xl md:text-5xl font-bold text-scef-blue-darker mb-4">
              {pageTitle}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
              {description ||
                "This page is part of the SCEF 2026–2037 work plan and is being prepared with verified content. Meanwhile, explore our active programs, support options, or contact us directly."}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="bg-scef-blue hover:bg-scef-blue-darker text-white">
                <Link to="/programs">Explore Programs<ArrowRight className="w-4 h-4 ml-1.5" /></Link>
              </Button>
              <Button asChild variant="outline" className="border-scef-blue/30">
                <Link to="/support-us">Support & Payment Options</Link>
              </Button>
              <Button asChild variant="outline" className="border-scef-blue/30">
                <Link to="/contact">Contact SCEF</Link>
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ComingSoon;

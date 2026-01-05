import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { Handshake, FileText, Award, ArrowRight } from "lucide-react";

export const PartnershipsTrust = () => {
  const { t } = useLocale();

  return (
    <section className="py-20 bg-muted/30 border-y-2 border-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scef-blue/10 text-scef-blue text-sm font-medium mb-6 border-2 border-black">
            <Handshake className="w-4 h-4" />
            CSR & Partnerships
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Partner With <span className="text-scef-gold">SCEF</span>
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10">
            Join leading corporations, governments, and institutions in advancing education across Africa. 
            Our transparent systems ensure accountability and measurable impact.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-scef-gold text-scef-blue hover:bg-scef-gold-dark font-semibold border-2 border-black"
            >
              <Link to="/partners">
                <Handshake className="w-4 h-4" />
                Partner with Us
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white font-semibold border-2"
            >
              <Link to="/contact">
                <FileText className="w-4 h-4" />
                Request Proposal
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-scef-blue text-scef-blue hover:bg-scef-blue hover:text-white font-semibold border-2"
            >
              <Link to="/partners#endorse">
                <Award className="w-4 h-4" />
                Endorse SCEF
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, FileText } from "lucide-react";

export const EOAHighlight = () => {
  const { t } = useLocale();

  return (
    <section className="py-12 bg-gradient-to-r from-scef-blue-dark to-scef-blue border-y-2 border-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-scef-gold flex items-center justify-center border-2 border-black">
              <GraduationCap className="w-8 h-8 text-scef-blue" />
            </div>
            <div>
              <h3 className="font-display text-xl md:text-2xl font-bold text-white">
                Education Online Africa (EOA)
              </h3>
              <p className="text-scef-gold font-medium">{t('eoa.tagline')}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              className="bg-scef-gold text-scef-blue hover:bg-scef-gold-dark font-semibold border-2 border-black"
            >
              <Link to="/programs/digital-learning">
                <GraduationCap className="w-4 h-4" />
                {t('eoa.start')}
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-scef-blue"
            >
              <Link to="/programs/digital-learning#awpc">
                <Award className="w-4 h-4" />
                AWPC
              </Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="border-scef-gold text-scef-gold hover:bg-scef-gold hover:text-scef-blue"
            >
              <Link to="/certifications">
                <FileText className="w-4 h-4" />
                {t('eoa.exams')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

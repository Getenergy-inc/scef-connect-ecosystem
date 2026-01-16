import { Heart, ArrowRight, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

export default function EduAidDonationSection() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-gradient-to-br from-[#1F892B] to-[#0A5518] text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8 text-center">
        <Heart className="w-16 h-16 mx-auto mb-6 text-scef-gold" />
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          {t('eduaid.donate.title') || 'Ready to Make a Difference?'}
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
          {t('eduaid.donate.description') || 'Your contribution transforms lives. Every donation funds scholarships, builds schools, and trains teachers across Africa.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-scef-gold text-scef-blue-dark hover:bg-scef-gold-hover font-semibold">
            <Link to="/donate" className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              {t('eduaid.donate.cta') || 'Donate Now'}
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link to="/get-involved" className="flex items-center gap-2">
              {t('eduaid.donate.volunteer') || 'Become a Volunteer'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

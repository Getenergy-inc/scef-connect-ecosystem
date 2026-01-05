import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { Users, Heart, Handshake } from "lucide-react";

export const FinalCTA = () => {
  const { t } = useLocale();

  return (
    <section className="py-20 bg-scef-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Join thousands of members, donors, and partners working together to transform education across Africa.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-scef-gold text-scef-blue hover:bg-scef-gold-dark font-semibold border-2 border-black"
            >
              <Link to="/membership">
                <Users className="w-5 h-5" />
                {t('hero.cta.member')}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white text-white hover:bg-white hover:text-scef-blue font-semibold"
            >
              <Link to="/donate">
                <Heart className="w-5 h-5" />
                {t('hero.cta.donate')}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-scef-gold text-scef-gold hover:bg-scef-gold hover:text-scef-blue font-semibold"
            >
              <Link to="/partners">
                <Handshake className="w-5 h-5" />
                {t('hero.cta.partner')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

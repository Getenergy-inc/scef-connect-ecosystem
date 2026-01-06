import { Link } from "react-router-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Award, 
  FileText, 
  RefreshCcw, 
  ArrowUpCircle, 
  Building2 
} from "lucide-react";

export const EOAHighlight = () => {
  const { t, isRTL } = useLocale();

  const ctaButtons = [
    {
      key: 'start',
      icon: GraduationCap,
      href: '/programs/digital-learning',
      variant: 'gold' as const,
    },
    {
      key: 'certify',
      icon: Award,
      href: '/programs/digital-learning#certification',
      variant: 'outline-white' as const,
    },
    {
      key: 'exam',
      icon: FileText,
      href: '/certifications',
      variant: 'outline-gold' as const,
    },
    {
      key: 'rpl',
      icon: ArrowUpCircle,
      href: '/programs/digital-learning#rpl',
      variant: 'outline-white' as const,
    },
    {
      key: 'renew',
      icon: RefreshCcw,
      href: '/programs/digital-learning#renewal',
      variant: 'outline-gold' as const,
    },
    {
      key: 'affiliate',
      icon: Building2,
      href: '/partners#test-center',
      variant: 'outline-white' as const,
    },
  ];

  const getButtonClasses = (variant: string) => {
    switch (variant) {
      case 'gold':
        return 'bg-scef-gold text-scef-blue hover:bg-scef-gold-dark font-semibold border-2 border-black';
      case 'outline-white':
        return 'border-white text-white hover:bg-white hover:text-scef-blue bg-transparent';
      case 'outline-gold':
        return 'border-scef-gold text-scef-gold hover:bg-scef-gold hover:text-scef-blue bg-transparent';
      default:
        return '';
    }
  };

  return (
    <section 
      className="py-12 md:py-16 bg-gradient-to-r from-scef-blue-dark to-scef-blue border-y-2 border-black"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-scef-gold flex items-center justify-center border-2 border-black shrink-0">
            <GraduationCap className="w-10 h-10 text-scef-blue" />
          </div>
          <div className="flex-1">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              {t('home.eoa.title')}
            </h2>
            <p className="text-scef-gold/90 text-base md:text-lg max-w-2xl">
              {t('home.eoa.body')}
            </p>
          </div>
        </div>

        {/* CTA Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ctaButtons.map((btn) => (
            <Button
              key={btn.key}
              asChild
              variant="outline"
              className={`${getButtonClasses(btn.variant)} text-sm h-auto py-3 px-4 flex flex-col items-center gap-2`}
            >
              <Link to={btn.href}>
                <btn.icon className="w-5 h-5" />
                <span className="text-center leading-tight">
                  {t(`home.eoa.cta${btn.key.charAt(0).toUpperCase() + btn.key.slice(1)}`)}
                </span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};
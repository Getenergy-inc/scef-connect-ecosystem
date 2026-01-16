import { MapPin, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

const chapters = [
  { country: "Nigeria", city: "Lagos", members: "500+", status: "Active" },
  { country: "Kenya", city: "Nairobi", members: "350+", status: "Active" },
  { country: "Ghana", city: "Accra", members: "280+", status: "Active" },
  { country: "South Africa", city: "Johannesburg", members: "400+", status: "Active" },
  { country: "Tanzania", city: "Dar es Salaam", members: "200+", status: "Growing" },
  { country: "Rwanda", city: "Kigali", members: "150+", status: "Growing" }
];

export default function EduAidLocalChapters() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-background" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#1F892B]/10 text-[#1F892B] rounded-full text-sm font-medium mb-4">
              {t('eduaid.chapters.badge') || 'Local Presence'}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('eduaid.chapters.title') || 'EduAid Local Chapters'}
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              {t('eduaid.chapters.description') || 'Our growing network of local chapters brings EduAid\'s mission to communities across Africa, enabling grassroots impact and sustainable change.'}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1F892B]/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#1F892B]" />
                </div>
                <span className="text-foreground font-medium">{t('eduaid.chapters.point1') || 'Present in 15+ African countries'}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-scef-gold/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-scef-gold-dark" />
                </div>
                <span className="text-foreground font-medium">{t('eduaid.chapters.point2') || '2,000+ active chapter members'}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-[#1F892B] hover:bg-[#1F892B]/90">
                <Link to="/chapters" className="flex items-center gap-2">
                  {t('eduaid.chapters.browse') || 'Browse Chapters'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/chapters/join-online">
                  {t('eduaid.chapters.start') || 'Start a Chapter'}
                </Link>
              </Button>
            </div>
          </div>

          {/* Chapters grid */}
          <div className="grid grid-cols-2 gap-4">
            {chapters.map((chapter, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-4 hover:border-[#1F892B]/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#1F892B]" />
                  <span className="font-semibold text-foreground text-sm">{chapter.city}</span>
                </div>
                <p className="text-muted-foreground text-xs mb-3">{chapter.country}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground italic">{t('eduaid.reporting') || 'Reporting in progress'}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    chapter.status === 'Active' 
                      ? 'bg-[#1F892B]/10 text-[#1F892B]' 
                      : 'bg-scef-gold/20 text-scef-gold-dark'
                  }`}>
                    {chapter.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

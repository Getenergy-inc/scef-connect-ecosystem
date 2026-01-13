import { Trophy, GraduationCap, Star, Quote } from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const achievers = [
  {
    name: "Amina Ibrahim",
    country: "Nigeria",
    achievement: "Medical Doctor",
    story: "From scholarship recipient to leading surgeon, now mentoring the next generation of African medical professionals.",
    year: "2024"
  },
  {
    name: "Kwame Mensah",
    country: "Ghana",
    achievement: "Tech Entrepreneur",
    story: "EduAid scholarship enabled his computer science degree. Now employing 50+ developers across West Africa.",
    year: "2023"
  },
  {
    name: "Fatou Diallo",
    country: "Senegal",
    achievement: "Education Minister",
    story: "From rural student to national education policy leader, championing inclusive education reforms.",
    year: "2024"
  },
  {
    name: "John Kariuki",
    country: "Kenya",
    achievement: "Agricultural Scientist",
    story: "Developing drought-resistant crops that benefit millions of farmers across East Africa.",
    year: "2023"
  }
];

export default function EduAidWallOfAchievers() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-[#0A1628] text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700] rounded-full text-sm font-medium mb-4">
            {t('eduaid.achievers.badge') || 'Success Stories'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t('eduaid.achievers.title') || 'Wall of Achievers'}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('eduaid.achievers.subtitle') || 'Celebrating the remarkable journeys of EduAid scholarship recipients who are now transforming their communities'}
          </p>
        </div>

        {/* Achievers grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {achievers.map((achiever, index) => (
            <div
              key={index}
              className="relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-[#FFD700]/40 transition-colors overflow-hidden"
            >
              {/* Quote decoration */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-[#FFD700]/20" />
              
              {/* Content */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1F892B] to-[#4ADE80] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {achiever.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">{achiever.name}</h3>
                  <p className="text-slate-400 text-sm">{achiever.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Trophy className="w-4 h-4 text-[#FFD700]" />
                <span className="text-[#FFD700] font-medium text-sm">{achiever.achievement}</span>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {achiever.story}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Star className="w-3 h-3" />
                <span>Featured {achiever.year}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-sm text-slate-500 mt-12 italic">
          {t('eduaid.achievers.disclaimer') || 'Stories are verified and published with consent of featured individuals'}
        </p>
      </div>
    </section>
  );
}

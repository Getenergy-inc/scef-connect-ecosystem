import { 
  Target, 
  TrendingUp, 
  Calendar,
  CheckCircle2
} from "lucide-react";
import { useLocale } from "@/contexts/LocaleContext";

const goals = [
  {
    title: "Empower 10 Million Students",
    description: "Through scholarships, e-learning platforms, and vocational training programs across all 54 African nations.",
    target: "10,000,000",
    deadline: "2032",
    milestone: "To be verified"
  },
  {
    title: "Renovate or Build 10,000 Schools",
    description: "Creating safe, modern learning environments with libraries, laboratories, and digital facilities.",
    target: "10,000",
    deadline: "2032",
    milestone: "To be verified"
  },
  {
    title: "Train 500,000 Teachers in ICT",
    description: "Comprehensive professional development in modern teaching methodologies and digital literacy.",
    target: "500,000",
    deadline: "2032",
    milestone: "To be verified"
  },
  {
    title: "Establish 1,000 Digital Learning Centers",
    description: "Bridging the digital divide with computer labs, internet access, and e-learning resources.",
    target: "1,000",
    deadline: "2032",
    milestone: "To be verified"
  }
];

export default function EduAidSmartGoals() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-[#0A1628] text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#FFD700] rounded-full text-sm font-medium mb-4">
            {t('eduaid.goals.badge') || 'SMART Goals'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            {t('eduaid.goals.title') || 'Vision 2032 Targets'}
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            {t('eduaid.goals.subtitle') || 'Specific, Measurable, Achievable, Relevant, and Time-bound objectives for transformational impact'}
          </p>
        </div>

        {/* Goals grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="relative bg-slate-800/50 border border-slate-700 rounded-2xl p-6 overflow-hidden group hover:border-[#FFD700]/40 transition-colors"
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-bl-[100px]" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#FFD700]/10 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-[#FFD700]" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="w-4 h-4" />
                    {goal.deadline}
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {goal.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  {goal.description}
                </p>

                {/* Target display */}
                <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Target</p>
                    <p className="text-2xl font-bold text-[#FFD700] font-display">{goal.target}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Current</p>
                    <p className="text-sm text-slate-400 italic flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#1F892B]" />
                      {goal.milestone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm italic flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {t('eduaid.goals.disclaimer') || 'Impact metrics are subject to independent verification and audit'}
          </p>
        </div>
      </div>
    </section>
  );
}

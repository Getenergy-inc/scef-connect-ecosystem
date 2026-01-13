import { 
  Handshake, 
  Building2, 
  Globe, 
  Users,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

const engagementTypes = [
  {
    icon: Building2,
    title: "Corporate Partnerships",
    description: "CSR collaborations, employee giving programs, and corporate sponsorships for education initiatives.",
    cta: "Become a Corporate Partner",
    link: "/partner-with-us"
  },
  {
    icon: Globe,
    title: "Government Collaborations",
    description: "Policy partnerships with ministries of education and local government authorities across Africa.",
    cta: "Government Partnership",
    link: "/partner-with-us"
  },
  {
    icon: Handshake,
    title: "NGO & Foundation Alliances",
    description: "Strategic alliances with foundations, INGOs, and civil society organizations for broader impact.",
    cta: "Alliance Inquiry",
    link: "/partner-with-us"
  },
  {
    icon: Users,
    title: "Individual Supporters",
    description: "Donors, volunteers, ambassadors, and mentors contributing to educational transformation.",
    cta: "Join Our Network",
    link: "/get-involved"
  }
];

export default function EduAidEngagement() {
  const { t, isRTL } = useLocale();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            {t('eduaid.engagement.badge') || 'Collaboration'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('eduaid.engagement.title') || 'Engagement & Partnerships'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('eduaid.engagement.subtitle') || 'Join our network of partners committed to transforming education across Africa'}
          </p>
        </div>

        {/* Engagement grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {engagementTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <div
                key={index}
                className="bg-card border-2 border-border rounded-2xl p-8 hover:border-[#1F892B]/40 transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-[#1F892B]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-[#1F892B]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {type.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5">
                      {type.description}
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <Link to={type.link} className="flex items-center gap-2">
                        {type.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

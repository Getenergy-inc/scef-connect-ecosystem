import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocale } from "@/contexts/LocaleContext";
import { programsPageContent } from "@/config/programsPageContent";
import { LucideIcon } from "lucide-react";
import { ScrollAnimation, StaggerContainer, StaggerItem } from "@/components/ui/scroll-animation";

interface TrackCardProps {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  titleFallback: string;
  tagKey: string;
  tagFallback: string;
  descriptionKey: string;
  descriptionFallback: string;
  ctas: Array<{ labelKey: string; labelFallback: string; href: string }>;
}

function TrackCard({
  id,
  icon: Icon,
  titleKey,
  titleFallback,
  tagKey,
  tagFallback,
  descriptionKey,
  descriptionFallback,
  ctas,
}: TrackCardProps) {
  const { t, isRTL } = useLocale();

  return (
    <div
      id={id === "webinars" ? "webinars-track" : undefined}
      className="bg-card rounded-xl border-2 border-border p-5 hover:border-eduaid-green/40 hover:shadow-md transition-all duration-300"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-eduaid-green/10 border border-eduaid-green/20 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-eduaid-green" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-display text-lg font-bold text-foreground">
            {t(titleKey) || titleFallback}
          </h4>
          <Badge variant="secondary" className="mt-1 text-xs bg-eduaid-green/10 text-eduaid-green border-eduaid-green/20">
            {t(tagKey) || tagFallback}
          </Badge>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        {t(descriptionKey) || descriptionFallback}
      </p>

      <div className="flex flex-wrap gap-2">
        {ctas.map((cta, idx) => (
          <Button
            key={idx}
            variant={idx === 0 ? "default" : "outline"}
            size="sm"
            className={idx === 0 ? "bg-eduaid-green hover:bg-eduaid-green/90 text-white" : "border-border"}
            asChild
          >
            <Link to={cta.href} className="gap-1">
              {t(cta.labelKey) || cta.labelFallback}
              <ArrowRight className={`w-3 h-3 ${isRTL ? "rotate-180" : ""}`} />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

export function EduAidTracksSection() {
  const { t, isRTL } = useLocale();
  const { eduaidTracks } = programsPageContent;

  return (
    <section
      id="eduaid-tracks"
      className="py-16 md:py-20 bg-muted/30"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container px-4 md:px-8">
        {/* Section Header */}
        <ScrollAnimation animation="fadeUp" className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
            {t(eduaidTracks.sectionTitleKey) || eduaidTracks.sectionTitleFallback}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(eduaidTracks.oneLineKey) || eduaidTracks.oneLineFallback}
          </p>
        </ScrollAnimation>

        {/* Tracks Grid */}
        <StaggerContainer className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto mb-8" staggerDelay={0.12}>
          {eduaidTracks.tracks.map((track) => (
            <StaggerItem key={track.id} animation="scale">
              <TrackCard
                id={track.id}
                icon={track.icon}
                titleKey={track.titleKey}
                titleFallback={track.titleFallback}
                tagKey={track.tagKey}
                tagFallback={track.tagFallback}
                descriptionKey={track.descriptionKey}
                descriptionFallback={track.descriptionFallback}
                ctas={track.ctas}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Note */}
        <ScrollAnimation animation="fadeUp" delay={0.3}>
          <p className="text-center text-sm text-muted-foreground italic max-w-xl mx-auto">
            {t(eduaidTracks.noteKey) || eduaidTracks.noteFallback}
          </p>
        </ScrollAnimation>
      </div>
    </section>
  );
}

import { ENGAGEMENT_PATHS, PATH_NEXT_STEP, type EngagementPath } from "@/lib/onboarding";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock } from "lucide-react";

interface PathStubProps {
  path: EngagementPath;
}

export const PathStub = ({ path }: PathStubProps) => {
  const meta = ENGAGEMENT_PATHS.find((p) => p.id === path);
  const nextStep = PATH_NEXT_STEP[path];
  if (!meta) return null;
  const Icon = meta.icon;

  return (
    <Card className="p-5 bg-muted/40 border-dashed">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-sm text-foreground">{meta.title}</h4>
            <Badge variant="outline" className="text-[10px] py-0 px-1.5">
              <Clock className="w-3 h-3 mr-1" />
              Detailed setup coming soon
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We'll save your basic profile now. The full {meta.title.toLowerCase()} questionnaire
            (preferences, focus areas, and credentials) will be available from your dashboard
            after sign-in.
          </p>
          <div className="flex items-center gap-2 text-xs text-primary pt-1">
            <Sparkles className="w-3 h-3" />
            <span>Recommended next: {nextStep.label}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

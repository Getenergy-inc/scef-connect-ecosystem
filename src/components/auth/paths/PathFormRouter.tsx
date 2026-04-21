import type { EngagementPath } from "@/lib/onboarding";
import { MemberPathForm } from "./MemberPathForm";
import { ChapterPathForm } from "./ChapterPathForm";
import { AmbassadorPathForm } from "./AmbassadorPathForm";
import { VolunteerPathForm } from "./VolunteerPathForm";
import { SponsorPathForm } from "./SponsorPathForm";
import { EndorserPathForm } from "./EndorserPathForm";
import { AwardsPathForm } from "./AwardsPathForm";
import { StaffPathForm } from "./StaffPathForm";

interface Props {
  path: EngagementPath;
  userId: string;
  onComplete: () => void;
}

export const PathFormRouter = ({ path, userId, onComplete }: Props) => {
  switch (path) {
    case "member":
      return <MemberPathForm userId={userId} onComplete={onComplete} />;
    case "chapter":
      return <ChapterPathForm userId={userId} onComplete={onComplete} />;
    case "ambassador":
      return <AmbassadorPathForm userId={userId} onComplete={onComplete} />;
    case "volunteer":
      return <VolunteerPathForm userId={userId} onComplete={onComplete} />;
    case "sponsor":
      return <SponsorPathForm userId={userId} onComplete={onComplete} />;
    case "endorser":
      return <EndorserPathForm userId={userId} onComplete={onComplete} />;
    case "awards":
      return <AwardsPathForm userId={userId} onComplete={onComplete} />;
    case "staff":
      return <StaffPathForm userId={userId} onComplete={onComplete} />;
    default:
      return null;
  }
};

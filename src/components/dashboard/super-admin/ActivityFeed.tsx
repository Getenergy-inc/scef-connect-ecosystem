import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, FileText, Users, Wallet, MapPin, Award } from "lucide-react";

interface ActivityItem {
  id: string;
  icon: "user" | "file" | "users" | "wallet" | "chapter" | "award";
  message: string;
  timestamp: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

const iconMap: Record<string, React.ElementType> = {
  user: User,
  file: FileText,
  users: Users,
  wallet: Wallet,
  chapter: MapPin,
  award: Award
};

const iconColors: Record<string, string> = {
  user: "text-blue-500",
  file: "text-green-500",
  users: "text-purple-500",
  wallet: "text-amber-500",
  chapter: "text-teal-500",
  award: "text-orange-500"
};

const defaultActivities: ActivityItem[] = [
  { id: "1", icon: "wallet", message: "New donation received from donor@example.com", timestamp: "2h ago" },
  { id: "2", icon: "file", message: "Rebuild My School Africa project report approved", timestamp: "5h ago" },
  { id: "3", icon: "users", message: "10 new member registrations", timestamp: "8h ago" },
  { id: "4", icon: "user", message: "Augueer registered on the platform", timestamp: "11:15 AM" },
  { id: "5", icon: "file", message: "Report submitted by Cape Town Chapter", timestamp: "02:41 PM" },
  { id: "6", icon: "award", message: "Rebuild My School Africa achieved milestone", timestamp: "Yesterday" }
];

export function ActivityFeed({ activities = defaultActivities, maxItems = 5 }: ActivityFeedProps) {
  const displayedActivities = activities.slice(0, maxItems);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {displayedActivities.length > 0 ? (
            displayedActivities.map((activity) => {
              const Icon = iconMap[activity.icon];
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`mt-0.5 ${iconColors[activity.icon]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-tight">{activity.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.timestamp}</span>
                </div>
              );
            })
          ) : (
            <p className="text-center py-4 text-muted-foreground text-sm">No recent activity</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

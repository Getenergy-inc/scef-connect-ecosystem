import { Card, CardContent } from "@/components/ui/card";
import { Coins, HandCoins, FolderKanban, Award } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  sublabel?: string;
}

function StatCard({ icon: Icon, iconBg, iconColor, label, value, sublabel }: StatCardProps) {
  return (
    <Card className="border border-border">
      <CardContent className="pt-5 pb-4 px-5">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">{label}</p>
            <p className="text-2xl font-bold text-foreground">
              {value}
              {sublabel && <span className="text-sm font-normal text-muted-foreground ml-1">{sublabel}</span>}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface DashboardStatsCardsProps {
  totalAGC: string;
  totalDonations: string;
  activeProjects: number;
  scholarshipsAwarded: number;
}

export function DashboardStatsCards({
  totalAGC = "1,230.000",
  totalDonations = "$750,000",
  activeProjects = 44,
  scholarshipsAwarded = 1420
}: DashboardStatsCardsProps) {
  const stats: StatCardProps[] = [
    {
      icon: Coins,
      iconBg: "bg-amber-50 dark:bg-amber-950",
      iconColor: "text-amber-600",
      label: "Total AGC Circulating",
      value: totalAGC,
      sublabel: "AGC"
    },
    {
      icon: HandCoins,
      iconBg: "bg-blue-50 dark:bg-blue-950",
      iconColor: "text-blue-600",
      label: "Total Donations Received",
      value: totalDonations
    },
    {
      icon: FolderKanban,
      iconBg: "bg-slate-100 dark:bg-slate-800",
      iconColor: "text-slate-600 dark:text-slate-400",
      label: "Active Projects",
      value: String(activeProjects)
    },
    {
      icon: Award,
      iconBg: "bg-orange-50 dark:bg-orange-950",
      iconColor: "text-orange-500",
      label: "Scholarships Awarded",
      value: scholarshipsAwarded.toLocaleString()
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}

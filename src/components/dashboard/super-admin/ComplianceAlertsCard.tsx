import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, FileWarning } from "lucide-react";

interface ComplianceAlert {
  id: string;
  type: "warning" | "overdue" | "review";
  message: string;
}

interface ComplianceAlertsCardProps {
  alerts: ComplianceAlert[];
}

const iconMap: Record<string, React.ElementType> = {
  warning: AlertCircle,
  overdue: Clock,
  review: FileWarning
};

const iconColors: Record<string, string> = {
  warning: "text-amber-500",
  overdue: "text-red-500",
  review: "text-blue-500"
};

const dotColors: Record<string, string> = {
  warning: "bg-amber-500",
  overdue: "bg-red-500",
  review: "bg-blue-500"
};

const defaultAlerts: ComplianceAlert[] = [
  { id: "1", type: "warning", message: "Pending MoU approval for EduAid-Africa" },
  { id: "2", type: "overdue", message: "Diaspora Chapter quarterly report overdue" },
  { id: "3", type: "review", message: "2 new chapter applications pending review" },
  { id: "4", type: "warning", message: "RMSA budget allocation needs approval" },
  { id: "5", type: "overdue", message: "Lagos Chapter annual audit pending" }
];

export function ComplianceAlertsCard({ alerts = defaultAlerts }: ComplianceAlertsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Compliance Alerts</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {alerts.slice(0, 5).map((alert) => (
            <div key={alert.id} className="flex items-start gap-3">
              <div className={`w-2 h-2 mt-1.5 rounded-full ${dotColors[alert.type]}`} />
              <p className="text-sm text-foreground leading-tight">{alert.message}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

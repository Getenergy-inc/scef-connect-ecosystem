import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";

interface RegisteredMembersCardProps {
  totalMembers: number;
  monthlyGrowth?: number;
}

export function RegisteredMembersCard({ 
  totalMembers = 22580, 
  monthlyGrowth = 8.5 
}: RegisteredMembersCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Registered Members</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{totalMembers.toLocaleString()}</p>
            {monthlyGrowth > 0 && (
              <div className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+{monthlyGrowth}% this month</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

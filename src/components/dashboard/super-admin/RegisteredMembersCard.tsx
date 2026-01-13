import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, TrendingUp } from "lucide-react";

interface RegisteredMembersCardProps {
  totalMembers: number;
  monthlyGrowth?: number;
  isLoading?: boolean;
}

export function RegisteredMembersCard({ 
  totalMembers = 0, 
  monthlyGrowth = 0,
  isLoading = false
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
            {isLoading ? (
              <>
                <Skeleton className="h-9 w-24 mb-1" />
                <Skeleton className="h-4 w-32" />
              </>
            ) : (
              <>
                <p className="text-3xl font-bold text-foreground">{totalMembers.toLocaleString()}</p>
                {monthlyGrowth > 0 && (
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+{monthlyGrowth}% this month</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

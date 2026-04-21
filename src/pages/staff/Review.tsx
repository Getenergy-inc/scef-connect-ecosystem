import { Helmet } from "react-helmet-async";
import { StaffGuard } from "@/components/staff/StaffGuard";
import { StaffLayout } from "@/components/staff/StaffLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const Page = () => (
  <StaffGuard>
    <StaffLayout title="Team Review">
      <Helmet><title>Team Review | SCEF Staff</title></Helmet>
      <Card className="max-w-2xl">
        <CardContent className="pt-6 text-center space-y-3">
          <Users className="w-10 h-10 text-primary mx-auto" />
          <h2 className="font-semibold text-lg text-foreground">Manager review queue</h2>
          <p className="text-sm text-muted-foreground">
            Submit → review → approve/request changes workflow ships in the next phase along with auto-rollups.
          </p>
        </CardContent>
      </Card>
    </StaffLayout>
  </StaffGuard>
);
export default Page;

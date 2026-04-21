import { Helmet } from "react-helmet-async";
import { StaffGuard } from "@/components/staff/StaffGuard";
import { StaffLayout } from "@/components/staff/StaffLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const Page = () => (
  <StaffGuard>
    <StaffLayout title="Reports">
      <Helmet><title>Reports | SCEF Staff</title></Helmet>
      <Card className="max-w-2xl">
        <CardContent className="pt-6 text-center space-y-3">
          <Sparkles className="w-10 h-10 text-primary mx-auto" />
          <h2 className="font-semibold text-lg text-foreground">Daily / Weekly / Monthly reports</h2>
          <p className="text-sm text-muted-foreground">
            Reporting workflow with manager review, AI-assisted drafts, and auto-rollups arrives in the next phase.
          </p>
        </CardContent>
      </Card>
    </StaffLayout>
  </StaffGuard>
);
export default Page;

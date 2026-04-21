import { Helmet } from "react-helmet-async";
import { StaffGuard } from "@/components/staff/StaffGuard";
import { StaffLayout } from "@/components/staff/StaffLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const Page = () => (
  <StaffGuard>
    <StaffLayout title="AI Assistant">
      <Helmet><title>AI Assistant | SCEF Staff</title></Helmet>
      <Card className="max-w-2xl">
        <CardContent className="pt-6 text-center space-y-3">
          <Sparkles className="w-10 h-10 text-primary mx-auto" />
          <h2 className="font-semibold text-lg text-foreground">Embedded AI tools</h2>
          <p className="text-sm text-muted-foreground">
            Daily/weekly/monthly planner suggestions are already wired into the planner pages. Report drafts, meeting summaries, communication helper, and partner/chapter assistants ship in the next phase.
          </p>
        </CardContent>
      </Card>
    </StaffLayout>
  </StaffGuard>
);
export default Page;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const HistoryCTAs = () => (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Button asChild className="bg-scef-blue hover:bg-scef-blue-darker text-white">
      <Link to="/partner-with-us">Partner With SCEF</Link>
    </Button>
    <Button asChild variant="secondary">
      <Link to="/programs/eduaid-africa">Support EduAid-Africa</Link>
    </Button>
    <Button asChild variant="outline" className="border-scef-blue/30">
      <Link to="/programs/nesa-africa">Join NESA-Africa</Link>
    </Button>
    <Button asChild variant="outline" className="border-scef-blue/30">
      <Link to="/contact">Contact SCEF</Link>
    </Button>
    <Button asChild variant="outline" className="border-scef-blue/30">
      <Link to="/reports">View Annual Report</Link>
    </Button>
    <Button asChild variant="outline" className="border-scef-blue/30">
      <Link to="/programs">View Our Programs</Link>
    </Button>
  </div>
);

export default HistoryCTAs;

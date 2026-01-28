import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LayoutDashboard, Image, Award, Handshake, Briefcase, 
  Wallet, Building2, CreditCard, ArrowRight 
} from "lucide-react";
import { useAuthState } from "@/hooks/useAuthState";

const AdminIndex = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuthState();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/auth/sign-in");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-primary">Loading...</div>
      </div>
    );
  }

  const adminSections = [
    {
      title: "Digital Board",
      description: "Manage homepage announcements and media",
      icon: Image,
      href: "/admin/digital-board",
    },
    {
      title: "Endorsements",
      description: "Manage endorsement logos and partners",
      icon: Award,
      href: "/admin/endorsements",
    },
    {
      title: "CRS Partners",
      description: "Manage corporate social responsibility partners",
      icon: Handshake,
      href: "/admin/crs-partners",
    },
    {
      title: "Vacancies",
      description: "Manage job postings and applications",
      icon: Briefcase,
      href: "/admin/vacancies",
    },
    {
      title: "Finance Overview",
      description: "View financial summaries and reports",
      icon: Wallet,
      href: "/admin/finance/overview",
    },
    {
      title: "Bank Accounts",
      description: "Manage organizational bank accounts",
      icon: Building2,
      href: "/admin/finance/bank-accounts",
    },
    {
      title: "Disbursements",
      description: "Manage fund disbursements and requests",
      icon: CreditCard,
      href: "/admin/finance/disbursements",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - SCEF</title>
      </Helmet>
      
      <DashboardLayout role="admin" title="Admin Dashboard">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-scef-gold/10 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-scef-gold" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage SCEF platform and content</p>
            </div>
          </div>

          {/* Admin Sections Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminSections.map((section, index) => (
              <Link key={index} to={section.href}>
                <Card className="h-full hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <section.icon className="w-5 h-5 text-primary" />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AdminIndex;

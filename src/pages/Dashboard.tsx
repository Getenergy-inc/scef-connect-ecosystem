import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { logger } from "@/lib/logger";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MemberDashboard } from "@/components/dashboard/MemberDashboard";
import { AmbassadorDashboard } from "@/components/dashboard/AmbassadorDashboard";
import { VolunteerDashboard } from "@/components/dashboard/VolunteerDashboard";
import { ChapterAdminDashboard } from "@/components/dashboard/ChapterAdminDashboard";
import { SuperAdminDashboard } from "@/components/dashboard/SuperAdminDashboard";
import { useUserRole } from "@/hooks/useUserRole";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const { primaryRole, loading: rolesLoading } = useUserRole(user?.id || null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      logger.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || rolesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-primary">Loading dashboard...</div>
      </div>
    );
  }

  const getDashboardTitle = (role: AppRole): string => {
    const titles: Record<AppRole, string> = {
      member: "Member Dashboard",
      ambassador: "Ambassador Dashboard",
      volunteer: "Volunteer Dashboard",
      donor: "Donor Dashboard",
      partner: "Partner Dashboard",
      chapter_admin: "Chapter Admin Dashboard",
      admin: "Admin Dashboard",
      super_admin: "Super Admin Dashboard",
      hq_admin: "HQ Admin Dashboard",
      staff: "Staff Dashboard",
      division_lead: "Division Lead Dashboard",
      board_bot: "Board of Trustees Dashboard",
      board_boa: "Board of Advisers Dashboard",
      board_bod: "Board of Directors Dashboard",
      lcp: "Local Chapter President Dashboard",
    };
    return titles[role] || "Dashboard";
  };

  const renderDashboard = () => {
    switch (primaryRole) {
      case "super_admin":
      case "admin":
        return <SuperAdminDashboard profile={profile} user={user} />;
      case "chapter_admin":
        return <ChapterAdminDashboard profile={profile} user={user} />;
      case "ambassador":
        return <AmbassadorDashboard profile={profile} user={user} />;
      case "volunteer":
        return <VolunteerDashboard profile={profile} user={user} />;
      default:
        return <MemberDashboard profile={profile} user={user} />;
    }
  };

  // Map role to layout role type
  const getLayoutRole = (role: AppRole): "member" | "ambassador" | "volunteer" | "chapter_admin" | "admin" | "super_admin" => {
    if (role === "super_admin") return "super_admin";
    if (role === "admin") return "admin";
    if (role === "chapter_admin") return "chapter_admin";
    if (role === "ambassador") return "ambassador";
    if (role === "volunteer") return "volunteer";
    return "member";
  };

  return (
    <>
      <Helmet>
        <title>{getDashboardTitle(primaryRole)} | SCEF</title>
        <meta name="description" content="Access your SCEF dashboard to manage your profile, activities, and contributions." />
      </Helmet>

      <DashboardLayout 
        role={getLayoutRole(primaryRole)} 
        title={getDashboardTitle(primaryRole)}
      >
        {renderDashboard()}
      </DashboardLayout>
    </>
  );
};

export default Dashboard;

/**
 * Digital Board Admin Page
 * 
 * SECURITY NOTE: This page performs client-side role checks for UX purposes only.
 * The actual security is enforced by Row-Level Security (RLS) policies on the
 * digital_board_items table, which use the is_admin() function to verify admin status
 * server-side. Even if a malicious user bypasses the client-side redirect, they
 * cannot perform any CRUD operations without proper admin role in the database.
 * 
 * See: RLS policy "Admins can manage board items" on digital_board_items table
 */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DigitalBoardAdmin } from "@/components/admin/DigitalBoardAdmin";
import { Loader2 } from "lucide-react";

const DigitalBoardAdminPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    /**
     * Client-side access check for UX - redirects non-admins to dashboard.
     * NOTE: This is NOT a security measure. Security is enforced via RLS policies.
     * This check exists solely to provide a better user experience by not showing
     * admin UI to users who cannot perform admin operations.
     */
    const checkAdminAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      const hasAdminAccess = roles?.some(r => 
        r.role === 'admin' || r.role === 'super_admin'
      );

      if (!hasAdminAccess) {
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
      setIsLoading(false);
    };

    checkAdminAccess();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <DashboardLayout role="super_admin" title="Digital Board CMS">
      <DigitalBoardAdmin />
    </DashboardLayout>
  );
};

export default DigitalBoardAdminPage;

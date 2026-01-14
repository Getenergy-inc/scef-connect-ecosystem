import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CRSPartnersAdmin } from "@/components/admin/CRSPartnersAdmin";
import { Loader2 } from "lucide-react";

const CRSPartnersAdminPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      const hasAdminRole = roles?.some(r => 
        r.role === 'admin' || r.role === 'super_admin' || r.role === 'hq_admin'
      );

      if (!hasAdminRole) {
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
      setIsLoading(false);
    };

    checkAccess();
  }, [navigate]);

  if (isLoading) {
    return (
      <DashboardLayout role="super_admin" title="CRS Partners Management">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <DashboardLayout role="super_admin" title="CRS Partners Management">
      <CRSPartnersAdmin />
    </DashboardLayout>
  );
};

export default CRSPartnersAdminPage;

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

interface UseUserRoleResult {
  roles: AppRole[];
  primaryRole: AppRole;
  loading: boolean;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  hasRole: (role: AppRole) => boolean;
}

export const useUserRole = (userId: string | null): UseUserRoleResult => {
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setRoles([]);
      setLoading(false);
      return;
    }

    const fetchRoles = async () => {
      try {
        const { data, error } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId);

        if (error) throw error;
        
        const userRoles = data?.map((r) => r.role) || [];
        setRoles(userRoles.length > 0 ? userRoles : ["member"]);
      } catch (error) {
        console.error("Error fetching user roles:", error);
        setRoles(["member"]);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [userId]);

  // Priority order for determining primary role
  const rolePriority: AppRole[] = [
    "super_admin",
    "admin",
    "chapter_admin",
    "partner",
    "donor",
    "ambassador",
    "volunteer",
    "member",
  ];

  const primaryRole: AppRole = rolePriority.find((r) => roles.includes(r)) || "member";
  const isAdmin = roles.includes("admin") || roles.includes("super_admin");
  const isSuperAdmin = roles.includes("super_admin");
  const hasRole = (role: AppRole) => roles.includes(role);

  return {
    roles,
    primaryRole,
    loading,
    isAdmin,
    isSuperAdmin,
    hasRole,
  };
};

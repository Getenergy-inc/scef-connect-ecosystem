import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface StaffProfile {
  id: string;
  user_id: string;
  department_slug: string | null;
  job_role: string | null;
  office_type: string | null;
  work_region: string | null;
  access_level: "standard" | "manager" | "director" | "executive";
  status: "pending" | "active" | "suspended" | "archived";
  employee_id: string | null;
}

export interface UseStaffAccessResult {
  loading: boolean;
  profile: StaffProfile | null;
  hasAccess: boolean;
  isManager: boolean;
  isPending: boolean;
}

export const useStaffAccess = (userId: string | null): UseStaffAccessResult => {
  const [profile, setProfile] = useState<StaffProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("staff_profiles")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      if (!cancelled) {
        setProfile((data as StaffProfile | null) ?? null);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [userId]);

  const hasAccess = profile?.status === "active";
  const isManager =
    !!profile &&
    profile.status === "active" &&
    ["manager", "director", "executive"].includes(profile.access_level);

  return {
    loading,
    profile,
    hasAccess,
    isManager,
    isPending: profile?.status === "pending",
  };
};

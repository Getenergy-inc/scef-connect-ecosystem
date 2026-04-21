import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { logger } from "@/lib/logger";
import { Briefcase, ShieldAlert } from "lucide-react";

interface Department {
  slug: string;
  name: string;
}

interface Props {
  userId: string;
  onComplete: () => void;
}

const OFFICE_TYPES = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

export const StaffPathForm = ({ userId, onComplete }: Props) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    department_slug: "",
    job_role: "",
    office_type: "remote",
    work_region: "",
    supervisor_name: "",
    reporting_line: "",
    notes: "",
  });

  useEffect(() => {
    supabase
      .from("staff_departments")
      .select("slug, name")
      .eq("is_active", true)
      .order("display_order")
      .then(({ data }) => setDepartments(data ?? []));
  }, []);

  const handleSubmit = async () => {
    if (!form.department_slug || !form.job_role) {
      toast.error("Please select a department and provide your job role.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from("staff_profiles").insert({
        user_id: userId,
        department_slug: form.department_slug,
        job_role: form.job_role,
        office_type: form.office_type,
        work_region: form.work_region || null,
        reporting_line: form.reporting_line || (form.supervisor_name ? `Reports to ${form.supervisor_name}` : null),
        access_level: "standard",
        status: "pending",
      });
      if (error) throw error;

      // Submit an application record for admin review
      await supabase.from("applications").insert({
        user_id: userId,
        application_type: "staff_access",
        status: "submitted",
        payload: {
          department: form.department_slug,
          job_role: form.job_role,
          office_type: form.office_type,
          work_region: form.work_region,
          supervisor: form.supervisor_name,
          notes: form.notes,
        },
      });

      toast.success("Staff application submitted. An admin will review shortly.");
      onComplete();
    } catch (error) {
      logger.error("Staff path form error:", error);
      toast.error("Could not save staff details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200">
          Staff access requires admin approval. Your account will be active immediately, but the Staff Office will unlock after a manager activates your profile.
        </div>
      </div>

      <div className="space-y-2">
        <Label>Department / Division *</Label>
        <Select value={form.department_slug} onValueChange={(v) => setForm({ ...form, department_slug: v })}>
          <SelectTrigger>
            <SelectValue placeholder="Choose your department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((d) => (
              <SelectItem key={d.slug} value={d.slug}>{d.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Job role *</Label>
          <Input
            placeholder="e.g. Programs Officer"
            value={form.job_role}
            onChange={(e) => setForm({ ...form, job_role: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Office type</Label>
          <Select value={form.office_type} onValueChange={(v) => setForm({ ...form, office_type: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {OFFICE_TYPES.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Work region</Label>
          <Input
            placeholder="e.g. West Africa, Lagos HQ"
            value={form.work_region}
            onChange={(e) => setForm({ ...form, work_region: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Supervisor name</Label>
          <Input
            placeholder="Optional"
            value={form.supervisor_name}
            onChange={(e) => setForm({ ...form, supervisor_name: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Notes for the reviewer</Label>
        <Textarea
          rows={3}
          placeholder="Anything the admin should know about your role or onboarding..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      <Button onClick={handleSubmit} disabled={loading} className="w-full" size="lg">
        <Briefcase className="w-4 h-4 mr-2" />
        {loading ? "Submitting..." : "Submit staff application"}
      </Button>
    </div>
  );
};

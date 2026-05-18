import { supabase } from "@/integrations/supabase/client";
import { WAITLIST_SOURCE } from "@/config/waitlistConfig";

export interface WaitlistSubmissionInput {
  fullName: string;
  country: string;
  organization: string;
  role: string;
  language: string;
}

export type WaitlistSubmitResult =
  | { ok: true }
  | { ok: false; reason: "duplicate" | "error"; message?: string };

/**
 * Persists a waiting-list submission to Lovable Cloud (Supabase) table
 * `waitlist_submissions`. RLS allows anonymous inserts with basic validation.
 */
export async function submitWaitlistEntry(
  input: WaitlistSubmissionInput,
): Promise<WaitlistSubmitResult> {
  const { error } = await supabase.from("waitlist_submissions").insert({
    full_name: input.fullName.trim(),
    country: input.country.trim(),
    organization: input.organization.trim(),
    role: input.role.trim(),
    language: input.language,
    source: WAITLIST_SOURCE,
    submission_status: "submitted",
  });

  if (error) {
    // Unique-constraint violation -> duplicate signup
    if (error.code === "23505") {
      return { ok: false, reason: "duplicate", message: error.message };
    }
    return { ok: false, reason: "error", message: error.message };
  }
  return { ok: true };
}

/** Returns total number of submissions for the Seychelles 2027 waiting list. */
export async function getWaitlistCount(): Promise<number> {
  const { data, error } = await supabase.rpc("get_waitlist_count", {
    _source: WAITLIST_SOURCE,
  });
  if (error || data == null) return 0;
  return Number(data) || 0;
}

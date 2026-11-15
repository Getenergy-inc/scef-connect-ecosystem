/**
 * The only data layer for the Support Fund. Ring-fenced: never touches SCEF donation tables.
 * Later this can be pointed at the shared EduAid-Africa backend API.
 */
import { supabase } from "@/integrations/supabase/client";
import { SITE, PUBLIC_STATS } from "@/config/schoolSupport";

export interface PledgeInput {
  reference: string;
  pledge_type: "donate" | "sponsor" | "partner";
  frequency?: "one-time" | "monthly" | "annual" | null;
  currency?: "USD" | "NGN" | "GBP" | "EUR" | null;
  amount?: number | null;
  region?: string | null;
  category?: string | null;
  sponsor_scope?: string | null;
  projects?: string[];
  contributions?: string[];
  regions_of_interest?: string[];
  in_kind_description?: string | null;
  recognition_name?: string | null;
  no_recognition?: boolean;
  name: string;
  organisation?: string | null;
  organisation_type?: string | null;
  role?: string | null;
  donating_as?: string | null;
  email: string;
  phone?: string | null;
  country?: string | null;
  website?: string | null;
  preferred_contact?: string | null;
  message?: string | null;
  anonymous_public?: boolean;
  acknowledged: true;
}

export interface TransferReportInput {
  reference: string;
  date_paid: string;
  amount_sent: number;
  currency?: "USD" | "NGN" | "GBP" | "EUR" | null;
  sender_account_name: string;
  bank_transaction_id?: string | null;
}

export async function createPledge(input: PledgeInput): Promise<void> {
  const { error } = await supabase.from("support_fund_pledges").insert({ ...input, site: SITE });
  if (error) throw new Error("We could not save your form. Please try again or email the regional desk.");
}

export async function reportTransfer(input: TransferReportInput): Promise<void> {
  const { error } = await supabase.from("support_fund_transfer_reports").insert({ ...input, site: SITE });
  if (error) throw new Error("We could not save your transfer report. Please try again.");
}

/** Public figures come only from approved data. Until the shared feed exists, returns the empty config. */
export async function getPublicStats() {
  return PUBLIC_STATS;
}

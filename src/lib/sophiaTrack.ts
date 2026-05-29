// Sophia visitor analytics tracker (client-side)
// Generates an anonymous visitor_id (persistent) and session_id (30-min window),
// then posts events to the public `sophia-track` edge function.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ENDPOINT = `${SUPABASE_URL}/functions/v1/sophia-track`;

const VISITOR_KEY = "scef_sophia_visitor_id";
const SESSION_KEY = "scef_sophia_session_id";
const SESSION_TS_KEY = "scef_sophia_session_ts";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return "v-" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function getVisitorId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    let v = localStorage.getItem(VISITOR_KEY);
    if (!v) {
      v = uuid();
      localStorage.setItem(VISITOR_KEY, v);
    }
    return v;
  } catch {
    return uuid();
  }
}

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  try {
    const now = Date.now();
    const last = Number(sessionStorage.getItem(SESSION_TS_KEY) || 0);
    let s = sessionStorage.getItem(SESSION_KEY);
    if (!s || now - last > SESSION_TIMEOUT_MS) {
      s = uuid();
      sessionStorage.setItem(SESSION_KEY, s);
    }
    sessionStorage.setItem(SESSION_TS_KEY, String(now));
    return s;
  } catch {
    return uuid();
  }
}

export type SophiaEventType =
  | "page_view"
  | "chatbot_opened"
  | "chatbot_message_sent"
  | "faq_search"
  | "faq_view"
  | "faq_feedback"
  | "auto_answer_given"
  | "unanswered_question"
  | "escalation_requested"
  | "whatsapp_click"
  | "donation_link_click"
  | "membership_link_click"
  | "training_registration_click"
  | "partner_link_click";

export interface SophiaTrackPayload {
  event_type: SophiaEventType;
  event_label?: string;
  source_channel?: string;
  faq_category?: string;
  related_program?: string;
  audience_type?: string;
  question_text?: string;
  matched_faq_id?: string | null;
  escalation_required?: boolean;
  escalation_department?: string;
  whatsapp_clicked?: boolean;
  // optional client-supplied geo (browser timezone only)
  timezone?: string;
}

export async function trackSophia(payload: SophiaTrackPayload): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const body = {
      ...payload,
      visitor_id: getVisitorId(),
      session_id: getSessionId(),
      page_url: window.location.href,
      page_title: document.title,
      referrer_url: document.referrer || null,
      timezone:
        payload.timezone ||
        Intl.DateTimeFormat().resolvedOptions().timeZone ||
        null,
    };
    const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
    // sendBeacon is best for fire-and-forget; falls back to fetch
    if (navigator.sendBeacon && navigator.sendBeacon(ENDPOINT, blob)) return;
    await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch (e) {
    // never throw from analytics
    console.debug("sophia track failed", e);
  }
}

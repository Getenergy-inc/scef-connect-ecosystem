import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ALLOWED_EVENTS = new Set([
  "page_view",
  "chatbot_opened",
  "chatbot_message_sent",
  "faq_search",
  "faq_view",
  "faq_feedback",
  "auto_answer_given",
  "unanswered_question",
  "escalation_requested",
  "whatsapp_click",
  "donation_link_click",
  "membership_link_click",
  "training_registration_click",
  "partner_link_click",
]);

async function sha256(s: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function parseUA(ua: string) {
  const u = ua.toLowerCase();
  const device = /mobile|android|iphone|ipad/.test(u) ? "mobile" : "desktop";
  const browser = u.includes("edg/")
    ? "Edge"
    : u.includes("chrome/")
    ? "Chrome"
    : u.includes("firefox/")
    ? "Firefox"
    : u.includes("safari/")
    ? "Safari"
    : "Other";
  const os = u.includes("windows")
    ? "Windows"
    : u.includes("mac os")
    ? "macOS"
    : u.includes("android")
    ? "Android"
    : u.includes("iphone") || u.includes("ipad")
    ? "iOS"
    : u.includes("linux")
    ? "Linux"
    : "Other";
  return { device, browser, os };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST")
    return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const body = await req.json();
    const event_type = String(body.event_type || "");
    if (!ALLOWED_EVENTS.has(event_type)) {
      return new Response(JSON.stringify({ error: "invalid event_type" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const visitor_id = String(body.visitor_id || "");
    const session_id = String(body.session_id || "");
    if (!visitor_id || !session_id) {
      return new Response(JSON.stringify({ error: "visitor_id and session_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "";
    const ua = req.headers.get("user-agent") || "";
    const { device, browser, os } = parseUA(ua);
    const ip_hash = ip ? await sha256(ip + ":sophia") : null;

    // Geo: prefer CF/Vercel-style headers, otherwise client-provided
    let country = req.headers.get("cf-ipcountry-name") || body.country || null;
    let country_code =
      req.headers.get("cf-ipcountry") || body.country_code || null;
    let region = req.headers.get("cf-region") || body.region || null;
    let city = req.headers.get("cf-ipcity") || body.city || null;
    const timezone = req.headers.get("cf-timezone") || body.timezone || null;

    // Fallback: ipapi.co lookup (free, no key, low volume) when country missing
    if (!country_code && ip && !ip.startsWith("127.") && !ip.startsWith("10.")) {
      try {
        const r = await fetch(`https://ipapi.co/${ip}/json/`, {
          headers: { "User-Agent": "SCEF-Sophia/1.0" },
        });
        if (r.ok) {
          const j = await r.json();
          country = country || j.country_name;
          country_code = country_code || j.country_code;
          region = region || j.region;
          city = city || j.city;
        }
      } catch {
        /* ignore geo failure */
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const row = {
      visitor_id,
      session_id,
      user_id: body.user_id || null,
      user_name: body.user_name || null,
      user_email: body.user_email || null,
      user_phone: body.user_phone || null,
      ip_hash,
      country,
      country_code,
      region,
      city,
      timezone,
      page_url: body.page_url || null,
      page_title: body.page_title || null,
      referrer_url: body.referrer_url || null,
      source_channel: body.source_channel || null,
      device_type: device,
      browser,
      operating_system: os,
      faq_category: body.faq_category || null,
      related_program: body.related_program || null,
      audience_type: body.audience_type || null,
      event_type,
      event_label: body.event_label || null,
      question_text: body.question_text || null,
      matched_faq_id: body.matched_faq_id || null,
      escalation_required: !!body.escalation_required,
      escalation_department: body.escalation_department || null,
      whatsapp_clicked: event_type === "whatsapp_click" || !!body.whatsapp_clicked,
    };

    const { error } = await supabase.from("sophia_visitor_analytics").insert(row);
    if (error) throw error;

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sophia-track error", e);
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

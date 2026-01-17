import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// Simple in-memory rate limiting (resets on function cold start)
// For production, consider using a persistent store like Redis
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_HOUR = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getClientIP(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    req.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function checkRateLimit(clientIP: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = Math.floor(now / RATE_LIMIT_WINDOW_MS) * RATE_LIMIT_WINDOW_MS;
  
  const entry = rateLimitMap.get(clientIP);
  
  if (!entry || entry.resetTime !== windowStart) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: windowStart });
    return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - 1 };
  }
  
  if (entry.count >= MAX_REQUESTS_PER_HOUR) {
    return { allowed: false, remaining: 0 };
  }
  
  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS_PER_HOUR - entry.count };
}

// Input validation
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PHONE_REGEX = /^[+]?[\d\s\-().]{7,20}$/;

interface InquiryInput {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  partnership_type?: string;
  message?: string;
  honeypot?: string; // Hidden field for bot detection
}

function validateInput(data: InquiryInput): { valid: boolean; error?: string } {
  // Honeypot check - if this hidden field is filled, it's likely a bot
  if (data.honeypot && data.honeypot.length > 0) {
    // Silently reject but return success to confuse bots
    return { valid: false, error: "HONEYPOT" };
  }

  if (!data.company_name || data.company_name.trim().length === 0) {
    return { valid: false, error: "Organization name is required" };
  }
  if (data.company_name.length > 200) {
    return { valid: false, error: "Organization name must be 200 characters or less" };
  }

  if (!data.contact_name || data.contact_name.trim().length === 0) {
    return { valid: false, error: "Contact name is required" };
  }
  if (data.contact_name.length > 200) {
    return { valid: false, error: "Contact name must be 200 characters or less" };
  }

  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return { valid: false, error: "Valid email address is required" };
  }

  if (data.phone && !PHONE_REGEX.test(data.phone)) {
    return { valid: false, error: "Invalid phone number format" };
  }

  if (data.message && data.message.length > 5000) {
    return { valid: false, error: "Message must be 5000 characters or less" };
  }

  const validPartnershipTypes = ["corporate", "institutional", "funding", "technical", ""];
  if (data.partnership_type && !validPartnershipTypes.includes(data.partnership_type)) {
    return { valid: false, error: "Invalid partnership type" };
  }

  return { valid: true };
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const clientIP = getClientIP(req);
    
    // Rate limit check
    const { allowed, remaining } = checkRateLimit(clientIP);
    if (!allowed) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "X-RateLimit-Remaining": "0",
            "Retry-After": "3600"
          } 
        }
      );
    }

    // Parse and validate input
    const body = await req.json() as InquiryInput;
    const validation = validateInput(body);
    
    if (!validation.valid) {
      // If honeypot triggered, return success to confuse bots
      if (validation.error === "HONEYPOT") {
        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for insert
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert the inquiry
    const { error: insertError } = await supabase.from("partnership_inquiries").insert({
      company_name: body.company_name.trim(),
      contact_name: body.contact_name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      partnership_type: body.partnership_type || null,
      message: body.message?.trim() || null,
    });

    if (insertError) {
      console.error("Database insert error:", insertError.message);
      return new Response(
        JSON.stringify({ error: "Failed to submit inquiry. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Thank you for your inquiry. We will be in touch soon." 
      }),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          "X-RateLimit-Remaining": remaining.toString()
        } 
      }
    );

  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

/**
 * Paystack Webhook Handler
 * 
 * Handles payment notifications from Paystack with:
 * - Signature verification (HMAC SHA512)
 * - Rate limiting (100 requests per minute per IP)
 * - Idempotency checking (prevents duplicate transaction processing)
 * - Request size limits
 */
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-paystack-signature",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100; // Max 100 requests per minute per IP
const MAX_REQUEST_SIZE_BYTES = 1024 * 1024; // 1MB max payload

// In-memory rate limiting store (resets on cold start, but provides protection during high traffic)
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

// In-memory idempotency store for recently processed transactions
const processedTransactions = new Map<string, number>();
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function getClientIP(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
         req.headers.get("cf-connecting-ip") || 
         req.headers.get("x-real-ip") || 
         "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  
  // Clean up old entries periodically
  if (rateLimitStore.size > 10000) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now - value.windowStart > RATE_LIMIT_WINDOW_MS) {
        rateLimitStore.delete(key);
      }
    }
  }
  
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    // New window
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }
  
  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

function checkIdempotency(reference: string): boolean {
  const now = Date.now();
  
  // Clean up expired entries
  for (const [key, timestamp] of processedTransactions.entries()) {
    if (now - timestamp > IDEMPOTENCY_TTL_MS) {
      processedTransactions.delete(key);
    }
  }
  
  if (processedTransactions.has(reference)) {
    console.log(`Duplicate transaction detected: ${reference}`);
    return false; // Already processed
  }
  
  processedTransactions.set(reference, now);
  return true; // New transaction
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIP = getClientIP(req);
  console.log(`Paystack webhook request from IP: ${clientIP}`);

  // Rate limiting check
  const rateLimit = checkRateLimit(clientIP);
  if (!rateLimit.allowed) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(JSON.stringify({ error: "Too many requests" }), {
      status: 429,
      headers: { 
        "Content-Type": "application/json", 
        "Retry-After": "60",
        "X-RateLimit-Remaining": "0",
        ...corsHeaders 
      },
    });
  }

  try {
    // Check request size via Content-Length header
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE_BYTES) {
      console.warn(`Request too large from IP: ${clientIP}, size: ${contentLength}`);
      return new Response(JSON.stringify({ error: "Request too large" }), {
        status: 413,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    
    if (!paystackSecretKey) {
      console.error("PAYSTACK_SECRET_KEY not configured");
      return new Response(JSON.stringify({ error: "Webhook not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Verify webhook signature
    const signature = req.headers.get("x-paystack-signature");
    const body = await req.text();
    
    // Validate body size after reading
    if (body.length > MAX_REQUEST_SIZE_BYTES) {
      console.warn(`Request body too large from IP: ${clientIP}`);
      return new Response(JSON.stringify({ error: "Request too large" }), {
        status: 413,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    if (signature) {
      const hash = createHmac("sha512", paystackSecretKey)
        .update(body)
        .digest("hex");
      
      if (hash !== signature) {
        console.error(`Invalid Paystack signature from IP: ${clientIP}`);
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    } else {
      console.warn(`Missing signature from IP: ${clientIP}`);
      return new Response(JSON.stringify({ error: "Missing signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const event = JSON.parse(body);
    console.log("Paystack webhook event:", event.event);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle charge.success event
    if (event.event === "charge.success") {
      const data = event.data;
      
      // Idempotency check - prevent duplicate processing
      if (!checkIdempotency(data.reference)) {
        console.log(`Skipping duplicate transaction: ${data.reference}`);
        return new Response(JSON.stringify({ received: true, duplicate: true }), {
          status: 200,
          headers: { 
            "Content-Type": "application/json", 
            "X-RateLimit-Remaining": rateLimit.remaining.toString(),
            ...corsHeaders 
          },
        });
      }
      
      console.log("Payment successful:", {
        reference: data.reference,
        amount: data.amount / 100, // Paystack amounts are in kobo
        email: data.customer?.email,
      });

      // Update donation record if exists
      const { error: updateError } = await supabase
        .from("donations")
        .update({
          payment_status: "completed",
          payment_method: "paystack",
        })
        .eq("donor_email", data.customer?.email)
        .eq("payment_status", "pending")
        .order("created_at", { ascending: false })
        .limit(1);

      if (updateError) {
        console.error("Error updating donation:", updateError);
      } else {
        console.log("Donation record updated successfully");
      }

      // If no existing record, create a new one
      const { data: existingDonation } = await supabase
        .from("donations")
        .select("id")
        .eq("donor_email", data.customer?.email)
        .eq("payment_status", "completed")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!existingDonation) {
        const { error: insertError } = await supabase.from("donations").insert({
          amount: data.amount / 100,
          donor_email: data.customer?.email,
          donor_name: data.customer?.first_name 
            ? `${data.customer.first_name} ${data.customer.last_name || ""}`.trim()
            : "Anonymous",
          payment_status: "completed",
          payment_method: "paystack",
          currency: data.currency?.toUpperCase() || "NGN",
        });

        if (insertError) {
          console.error("Error inserting donation:", insertError);
        } else {
          console.log("New donation record created");
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 
        "Content-Type": "application/json", 
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        ...corsHeaders 
      },
    });
  } catch (error: any) {
    console.error("Paystack webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});

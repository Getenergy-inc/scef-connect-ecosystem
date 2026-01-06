import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, verif-hash",
};

// Rate limiting and idempotency storage (in-memory for edge function lifecycle)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const processedWebhooks = new Map<string, number>(); // tx_ref -> timestamp

const MAX_REQUESTS_PER_MINUTE = 100;
const MAX_BODY_SIZE = 1024 * 1024; // 1MB
const IDEMPOTENCY_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const windowStart = Math.floor(now / 60000) * 60000; // Current minute
  
  const entry = rateLimitMap.get(clientIP);
  
  if (!entry || entry.resetTime !== windowStart) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: windowStart });
    return true;
  }
  
  if (entry.count >= MAX_REQUESTS_PER_MINUTE) {
    return false;
  }
  
  entry.count++;
  return true;
}

function isWebhookProcessed(txRef: string): boolean {
  const processedTime = processedWebhooks.get(txRef);
  if (!processedTime) return false;
  
  // Check if still within idempotency window
  if (Date.now() - processedTime < IDEMPOTENCY_WINDOW_MS) {
    return true;
  }
  
  // Expired, remove it
  processedWebhooks.delete(txRef);
  return false;
}

function markWebhookProcessed(txRef: string): void {
  processedWebhooks.set(txRef, Date.now());
  
  // Cleanup old entries (basic garbage collection)
  const now = Date.now();
  for (const [ref, time] of processedWebhooks.entries()) {
    if (now - time > IDEMPOTENCY_WINDOW_MS) {
      processedWebhooks.delete(ref);
    }
  }
}

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check request size
    const contentLength = parseInt(req.headers.get("content-length") || "0");
    if (contentLength > MAX_BODY_SIZE) {
      return new Response(JSON.stringify({ error: "Payload too large" }), {
        status: 413,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    if (!checkRateLimit(clientIP)) {
      console.warn("Rate limit exceeded for IP:", clientIP);
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const flutterwaveSecretHash = Deno.env.get("FLUTTERWAVE_SECRET_HASH");
    
    if (!flutterwaveSecretHash) {
      console.error("FLUTTERWAVE_SECRET_HASH not configured");
      return new Response(JSON.stringify({ error: "Webhook not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Verify webhook signature
    const signature = req.headers.get("verif-hash");
    
    if (signature !== flutterwaveSecretHash) {
      console.error("Invalid Flutterwave signature");
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const event = await req.json();
    console.log("Flutterwave webhook event:", event.event);

    // Handle charge.completed event
    if (event.event === "charge.completed" && event.data?.status === "successful") {
      const data = event.data;
      const txRef = data.tx_ref;
      
      // Idempotency check - prevent duplicate processing
      if (txRef && isWebhookProcessed(txRef)) {
        console.log("Duplicate webhook ignored:", txRef);
        return new Response(JSON.stringify({ received: true, duplicate: true }), {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      console.log("Payment successful:", {
        tx_ref: txRef,
        amount: data.amount,
        email: data.customer?.email,
      });

      // Initialize Supabase client
      const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
      const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      // Update existing pending donation or create new one
      const { data: updatedDonations, error: updateError } = await supabase
        .from("donations")
        .update({
          payment_status: "completed",
          payment_method: "flutterwave",
        })
        .eq("donor_email", data.customer?.email)
        .eq("payment_status", "pending")
        .order("created_at", { ascending: false })
        .limit(1)
        .select("id");

      if (updateError) {
        console.error("Error updating donation:", updateError);
      } else if (updatedDonations && updatedDonations.length > 0) {
        console.log("Donation record updated successfully:", updatedDonations[0].id);
      } else {
        // No pending donation found, check if completed donation already exists
        const { data: existingDonation } = await supabase
          .from("donations")
          .select("id")
          .eq("donor_email", data.customer?.email)
          .eq("payment_status", "completed")
          .gte("created_at", new Date(Date.now() - 60000).toISOString()) // Within last minute
          .limit(1)
          .maybeSingle();

        if (!existingDonation) {
          // Create new donation record
          const { error: insertError } = await supabase.from("donations").insert({
            amount: data.amount,
            donor_email: data.customer?.email,
            donor_name: data.customer?.name || "Anonymous",
            payment_status: "completed",
            payment_method: "flutterwave",
            currency: data.currency?.toUpperCase() || "NGN",
          });

          if (insertError) {
            console.error("Error inserting donation:", insertError);
          } else {
            console.log("New donation record created");
          }
        } else {
          console.log("Completed donation already exists, skipping insert");
        }
      }

      // Mark webhook as processed
      if (txRef) {
        markWebhookProcessed(txRef);
      }
    }

    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Flutterwave webhook error:", errorMessage);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});

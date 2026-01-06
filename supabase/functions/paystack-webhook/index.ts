import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-paystack-signature",
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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
    
    if (signature) {
      const hash = createHmac("sha512", paystackSecretKey)
        .update(body)
        .digest("hex");
      
      if (hash !== signature) {
        console.error("Invalid Paystack signature");
        return new Response(JSON.stringify({ error: "Invalid signature" }), {
          status: 401,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
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
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Paystack webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});

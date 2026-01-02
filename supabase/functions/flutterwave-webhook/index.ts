import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, verif-hash",
};

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
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

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Handle charge.completed event
    if (event.event === "charge.completed" && event.data?.status === "successful") {
      const data = event.data;
      console.log("Payment successful:", {
        tx_ref: data.tx_ref,
        amount: data.amount,
        email: data.customer?.email,
      });

      // Update donation record if exists
      const { error: updateError } = await supabase
        .from("donations")
        .update({
          payment_status: "completed",
          payment_method: "flutterwave",
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
      }
    }

    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Flutterwave webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});

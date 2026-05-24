// Public canonical chapter directory used by NESA-Africa, EduAid-Africa
// and eLibrary Nigeria microsites to stay in sync with SCEF.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const country = url.searchParams.get("country");
    const region = url.searchParams.get("region");
    const type = url.searchParams.get("type");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    let q = supabase
      .from("chapters")
      .select("id,name,slug,country,city,region,chapter_type,status,description,image_url,member_count,updated_at")
      .eq("status", "active")
      .order("region", { ascending: true })
      .order("name", { ascending: true });

    if (country) q = q.ilike("country", country);
    if (region) q = q.ilike("region", region);
    if (type && ["online", "hybrid", "physical"].includes(type)) q = q.eq("chapter_type", type);

    const { data, error } = await q;
    if (error) throw error;

    return new Response(
      JSON.stringify({
        source: "scef.org",
        generated_at: new Date().toISOString(),
        count: data?.length ?? 0,
        chapters: data ?? [],
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300, s-maxage=600",
        },
      },
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PROMPTS: Record<string, string> = {
  daily_planner: "You are a productivity coach for an NGO staff member. Suggest 3-5 concrete daily tasks (each ≤ 12 words) based on context. Return JSON only.",
  weekly_planner: "Suggest 4-6 weekly goals for an NGO staff member. Each ≤ 14 words, action-oriented. JSON only.",
  monthly_planner: "Suggest 4-6 monthly milestones for an NGO staff member (campaigns, reports, strategic deliverables). Each ≤ 16 words. JSON only.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { tool, context } = await req.json();
    const system = PROMPTS[tool] ?? PROMPTS.daily_planner;
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Context: ${JSON.stringify(context ?? {})}` },
        ],
        tools: [{
          type: "function",
          function: {
            name: "return_suggestions",
            description: "Return task/goal suggestions",
            parameters: {
              type: "object",
              properties: { suggestions: { type: "array", items: { type: "string" } } },
              required: ["suggestions"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "return_suggestions" } },
      }),
    });

    if (resp.status === 429) return new Response(JSON.stringify({ error: "Rate limit, please retry" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (resp.status === 402) return new Response(JSON.stringify({ error: "AI credits required (402)" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const data = await resp.json();
    const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    let suggestions: string[] = [];
    try { suggestions = JSON.parse(args ?? "{}").suggestions ?? []; } catch { suggestions = []; }
    return new Response(JSON.stringify({ suggestions }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});

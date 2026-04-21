import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Tool prompts — system messages keep outputs focused & editable
const PROMPTS: Record<string, string> = {
  daily_planner:
    "You are a productivity coach for an NGO staff member. Suggest 3-5 concrete daily tasks (each ≤ 12 words) based on context. Return JSON only.",
  weekly_planner:
    "Suggest 4-6 weekly goals for an NGO staff member. Each ≤ 14 words, action-oriented. JSON only.",
  monthly_planner:
    "Suggest 4-6 monthly milestones for an NGO staff member (campaigns, reports, strategic deliverables). Each ≤ 16 words. JSON only.",
  task_breakdown:
    "Break the user's high-level goal into 4-7 actionable tasks (each ≤ 14 words). JSON only.",
  report_draft:
    "You draft concise NGO staff progress reports. Use the structured fields provided. Keep each field under 80 words, professional, scannable. Return JSON with: key_tasks_completed, issues_encountered, pending_tasks, support_needed, next_priorities, highlights.",
  weekly_rollup:
    "You summarise multiple daily reports into ONE weekly summary. Aggregate themes, highlight wins & blockers. Return JSON with the same fields as report_draft. Be concise.",
  monthly_rollup:
    "You summarise weekly reports into ONE monthly summary. Focus on milestones achieved, strategic outcomes, and next-month priorities. Return JSON with the same report fields. Be concise.",
  meeting_summary:
    "Summarise the meeting notes into: a 3-sentence summary, then action_items (array of {owner, task, due}). JSON only.",
  comm_draft:
    "Draft a professional internal/external message based on the brief. Tone: warm, institutional, concise. Return JSON with: subject, body. Body ≤ 180 words.",
  partner_summary:
    "Summarise the partner/CSR engagement context into: status_summary (3-4 sentences), outstanding_deliverables (array of strings), recommended_next_steps (array). JSON only.",
  chapter_support:
    "Organise the chapter request context into: priority (low|medium|high|urgent), category, suggested_response (≤ 120 words), follow_up_tasks (array). JSON only.",
};

// Schema per tool — drives structured output via tool calling
const SCHEMAS: Record<string, any> = {
  daily_planner: { suggestions: { type: "array", items: { type: "string" } } },
  weekly_planner: { suggestions: { type: "array", items: { type: "string" } } },
  monthly_planner: { suggestions: { type: "array", items: { type: "string" } } },
  task_breakdown: { suggestions: { type: "array", items: { type: "string" } } },
  report_draft: {
    key_tasks_completed: { type: "string" },
    issues_encountered: { type: "string" },
    pending_tasks: { type: "string" },
    support_needed: { type: "string" },
    next_priorities: { type: "string" },
    highlights: { type: "string" },
  },
  weekly_rollup: {
    key_tasks_completed: { type: "string" },
    issues_encountered: { type: "string" },
    pending_tasks: { type: "string" },
    support_needed: { type: "string" },
    next_priorities: { type: "string" },
    highlights: { type: "string" },
  },
  monthly_rollup: {
    key_tasks_completed: { type: "string" },
    issues_encountered: { type: "string" },
    pending_tasks: { type: "string" },
    support_needed: { type: "string" },
    next_priorities: { type: "string" },
    highlights: { type: "string" },
  },
  meeting_summary: {
    summary: { type: "string" },
    action_items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          owner: { type: "string" },
          task: { type: "string" },
          due: { type: "string" },
        },
      },
    },
  },
  comm_draft: { subject: { type: "string" }, body: { type: "string" } },
  partner_summary: {
    status_summary: { type: "string" },
    outstanding_deliverables: { type: "array", items: { type: "string" } },
    recommended_next_steps: { type: "array", items: { type: "string" } },
  },
  chapter_support: {
    priority: { type: "string" },
    category: { type: "string" },
    suggested_response: { type: "string" },
    follow_up_tasks: { type: "array", items: { type: "string" } },
  },
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { tool, context } = await req.json();
    const system = PROMPTS[tool];
    const schemaProps = SCHEMAS[tool];
    if (!system || !schemaProps) {
      return new Response(JSON.stringify({ error: `Unknown tool: ${tool}` }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const required = Object.keys(schemaProps);

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: `Context: ${JSON.stringify(context ?? {})}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_result",
              description: "Return structured AI output",
              parameters: {
                type: "object",
                properties: schemaProps,
                required,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_result" } },
      }),
    });

    if (resp.status === 429)
      return new Response(JSON.stringify({ error: "Rate limit, please retry" }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    if (resp.status === 402)
      return new Response(JSON.stringify({ error: "AI credits required (402)" }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI gateway error:", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    let parsed: any = {};
    try {
      parsed = JSON.parse(args ?? "{}");
    } catch {
      parsed = {};
    }

    // Backwards compat: planner tools were previously read as `suggestions`
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

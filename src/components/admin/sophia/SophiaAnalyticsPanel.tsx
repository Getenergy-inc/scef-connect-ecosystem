import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Download, Users, Globe2, MessageCircle, AlertTriangle, Search, Sparkles, ArrowUpRight } from "lucide-react";

type Row = {
  id: string;
  visitor_id: string;
  session_id: string;
  country: string | null;
  country_code: string | null;
  city: string | null;
  source_channel: string | null;
  faq_category: string | null;
  event_type: string;
  question_text: string | null;
  whatsapp_clicked: boolean;
  escalation_required: boolean;
  escalation_department: string | null;
  created_at: string;
};

const RANGES = [
  { id: "7d", label: "Last 7 days", days: 7 },
  { id: "30d", label: "Last 30 days", days: 30 },
  { id: "90d", label: "Last 90 days", days: 90 },
  { id: "365d", label: "Last 12 months", days: 365 },
] as const;
type RangeId = (typeof RANGES)[number]["id"];

const PIE_COLORS = ["#1e3a8a", "#d4af37", "#0f766e", "#b45309", "#7c3aed", "#dc2626", "#0369a1", "#64748b"];

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function csv(rows: any[][]) {
  return rows
    .map((r) =>
      r
        .map((v) => {
          const s = v == null ? "" : String(v);
          return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
        })
        .join(","),
    )
    .join("\n");
}

export default function SophiaAnalyticsPanel() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<RangeId>("30d");
  const [country, setCountry] = useState<string>("all");
  const [channel, setChannel] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const days = RANGES.find((r) => r.id === range)!.days;
      const since = new Date(Date.now() - days * 86400000).toISOString();
      const { data, error } = await supabase
        .from("sophia_visitor_analytics")
        .select(
          "id,visitor_id,session_id,country,country_code,city,source_channel,faq_category,event_type,question_text,whatsapp_clicked,escalation_required,escalation_department,created_at",
        )
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(50000);
      if (cancelled) return;
      if (error) console.error(error);
      setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [range]);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          (country === "all" || r.country_code === country) &&
          (channel === "all" || r.source_channel === channel) &&
          (category === "all" || r.faq_category === category),
      ),
    [rows, country, channel, category],
  );

  const stats = useMemo(() => {
    const visitors = new Set<string>();
    const sessions = new Set<string>();
    const today = startOfDay(new Date()).getTime();
    const weekAgo = today - 6 * 86400000;
    const monthAgo = today - 29 * 86400000;
    let todayV = new Set<string>(),
      weekV = new Set<string>(),
      monthV = new Set<string>();
    let pageViews = 0,
      faqViews = 0,
      questions = 0,
      autoAns = 0,
      unanswered = 0,
      escalations = 0,
      wa = 0;
    const countries = new Map<string, number>();
    const channels = new Map<string, number>();
    const categories = new Map<string, number>();
    const askedQs = new Map<string, number>();
    const dayMap = new Map<string, Set<string>>();

    for (const r of filtered) {
      visitors.add(r.visitor_id);
      sessions.add(r.session_id);
      const ts = new Date(r.created_at).getTime();
      if (ts >= today) todayV.add(r.visitor_id);
      if (ts >= weekAgo) weekV.add(r.visitor_id);
      if (ts >= monthAgo) monthV.add(r.visitor_id);

      const day = new Date(r.created_at).toISOString().slice(0, 10);
      if (!dayMap.has(day)) dayMap.set(day, new Set());
      dayMap.get(day)!.add(r.visitor_id);

      if (r.event_type === "page_view") pageViews++;
      else if (r.event_type === "faq_view") faqViews++;
      else if (r.event_type === "chatbot_message_sent") questions++;
      else if (r.event_type === "auto_answer_given") autoAns++;
      else if (r.event_type === "unanswered_question") unanswered++;
      else if (r.event_type === "escalation_requested") escalations++;
      if (r.whatsapp_clicked || r.event_type === "whatsapp_click") wa++;

      if (r.country) countries.set(r.country, (countries.get(r.country) ?? 0) + 1);
      if (r.source_channel)
        channels.set(r.source_channel, (channels.get(r.source_channel) ?? 0) + 1);
      if (r.faq_category)
        categories.set(r.faq_category, (categories.get(r.faq_category) ?? 0) + 1);
      if (r.question_text)
        askedQs.set(r.question_text, (askedQs.get(r.question_text) ?? 0) + 1);
    }

    const trend = Array.from(dayMap.entries())
      .map(([d, set]) => ({ date: d, visitors: set.size }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const top = <K, V>(m: Map<K, V>, n = 10) =>
      Array.from(m.entries())
        .sort((a, b) => (b[1] as any) - (a[1] as any))
        .slice(0, n);

    return {
      visitors: visitors.size,
      sessions: sessions.size,
      todayV: todayV.size,
      weekV: weekV.size,
      monthV: monthV.size,
      countriesReached: countries.size,
      pageViews,
      faqViews,
      questions,
      autoAns,
      unanswered,
      escalations,
      wa,
      topCountries: top(countries),
      topChannels: top(channels),
      topCategories: top(categories),
      topQuestions: top(askedQs, 8),
      trend,
    };
  }, [filtered]);

  // Country-by-country table aggregation
  const countryTable = useMemo(() => {
    const map = new Map<
      string,
      {
        country: string;
        code: string | null;
        visitors: Set<string>;
        sessions: Set<string>;
        faqViews: number;
        questions: number;
        wa: number;
        escalations: number;
        last: string;
      }
    >();
    for (const r of filtered) {
      const key = r.country || "Unknown";
      let agg = map.get(key);
      if (!agg) {
        agg = {
          country: key,
          code: r.country_code,
          visitors: new Set(),
          sessions: new Set(),
          faqViews: 0,
          questions: 0,
          wa: 0,
          escalations: 0,
          last: r.created_at,
        };
        map.set(key, agg);
      }
      agg.visitors.add(r.visitor_id);
      agg.sessions.add(r.session_id);
      if (r.event_type === "faq_view") agg.faqViews++;
      if (r.event_type === "chatbot_message_sent") agg.questions++;
      if (r.whatsapp_clicked || r.event_type === "whatsapp_click") agg.wa++;
      if (r.event_type === "escalation_requested") agg.escalations++;
      if (r.created_at > agg.last) agg.last = r.created_at;
    }
    const total = filtered.length || 1;
    return Array.from(map.values())
      .map((a) => ({
        country: a.country,
        code: a.code,
        visitors: a.visitors.size,
        sessions: a.sessions.size,
        faqViews: a.faqViews,
        questions: a.questions,
        wa: a.wa,
        escalations: a.escalations,
        last: a.last,
        pct: ((a.visitors.size / total) * 100).toFixed(1),
      }))
      .sort((a, b) => b.visitors - a.visitors);
  }, [filtered]);

  const uniqueCountries = useMemo(
    () =>
      Array.from(new Set(rows.map((r) => r.country_code).filter(Boolean))) as string[],
    [rows],
  );
  const uniqueChannels = useMemo(
    () => Array.from(new Set(rows.map((r) => r.source_channel).filter(Boolean))) as string[],
    [rows],
  );
  const uniqueCategories = useMemo(
    () => Array.from(new Set(rows.map((r) => r.faq_category).filter(Boolean))) as string[],
    [rows],
  );

  const exportCsv = () => {
    const header = [
      "Country",
      "Code",
      "Visitors",
      "Sessions",
      "FAQ Views",
      "Questions",
      "WhatsApp Clicks",
      "Escalations",
      "% of Total",
      "Last Visit",
    ];
    const body = countryTable.map((c) => [
      c.country,
      c.code ?? "",
      c.visitors,
      c.sessions,
      c.faqViews,
      c.questions,
      c.wa,
      c.escalations,
      c.pct + "%",
      c.last,
    ]);
    const blob = new Blob([csv([header, ...body])], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sophia-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const cards = [
    { label: "Today's Visitors", value: stats.todayV, icon: Users },
    { label: "This Week", value: stats.weekV, icon: Users },
    { label: "This Month", value: stats.monthV, icon: Users },
    { label: "All-Time (range)", value: stats.visitors, icon: Users },
    { label: "Countries Reached", value: stats.countriesReached, icon: Globe2 },
    { label: "WhatsApp Clicks", value: stats.wa, icon: MessageCircle },
    { label: "FAQ Views", value: stats.faqViews, icon: Search },
    { label: "Escalations", value: stats.escalations, icon: AlertTriangle },
    {
      label: "Top Country",
      value: stats.topCountries[0]?.[0] ?? "—",
      icon: Globe2,
      isText: true,
    },
    {
      label: "Top Support Category",
      value: stats.topCategories[0]?.[0] ?? "—",
      icon: Sparkles,
      isText: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm text-muted-foreground">
          Sophia Analytics helps SCEF understand visitor demand, country reach, support needs, FAQ
          usage, WhatsApp conversion, and unanswered questions across SCEF, EduAid-Africa, NESA-Africa,
          GFA Wallet, Local Chapters, Membership, Payments, Training, Volunteers, Partnerships,
          Advocacy, Media, and Support.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {RANGES.map((r) => (
          <button
            key={r.id}
            onClick={() => setRange(r.id)}
            className={`text-xs px-3 py-1.5 rounded-md border ${
              range === r.id
                ? "bg-scef-blue-darker text-white border-scef-blue-darker"
                : "border-border text-foreground hover:bg-muted"
            }`}
          >
            {r.label}
          </button>
        ))}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="text-xs h-8 px-2 rounded-md border border-border bg-background"
        >
          <option value="all">All countries</option>
          {uniqueCountries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value)}
          className="text-xs h-8 px-2 rounded-md border border-border bg-background"
        >
          <option value="all">All channels</option>
          {uniqueChannels.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-xs h-8 px-2 rounded-md border border-border bg-background"
        >
          <option value="all">All categories</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <Button onClick={exportCsv} size="sm" variant="outline" className="ml-auto">
          <Download className="w-4 h-4 mr-1.5" /> Export CSV
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="w-3.5 h-3.5 text-scef-gold" /> {c.label}
              </div>
              <div
                className={`mt-1 font-bold text-scef-blue-darker ${
                  c.isText ? "text-base truncate" : "text-2xl"
                }`}
                title={String(c.value)}
              >
                {c.isText ? c.value : Number(c.value).toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>

      {/* Trend + Channel split */}
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2">Visitor Trend (unique per day)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" fontSize={11} />
                <YAxis fontSize={11} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="visitors" stroke="#1e3a8a" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-2">Source Channels</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.topChannels.map(([name, value]) => ({ name, value }))}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label={(d) => d.name}
                >
                  {stats.topChannels.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top countries bar */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h3 className="text-sm font-semibold mb-2">Top Countries (events)</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.topCountries.map(([name, value]) => ({ name, value }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={11} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#d4af37" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Country table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold">Country-by-Country Analytics</h3>
          <span className="text-xs text-muted-foreground">{countryTable.length} countries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left">
                <th className="p-2.5">Country</th>
                <th className="p-2.5">Code</th>
                <th className="p-2.5 text-right">Visitors</th>
                <th className="p-2.5 text-right">Sessions</th>
                <th className="p-2.5 text-right">FAQ Views</th>
                <th className="p-2.5 text-right">Questions</th>
                <th className="p-2.5 text-right">WhatsApp</th>
                <th className="p-2.5 text-right">Escalations</th>
                <th className="p-2.5 text-right">% Total</th>
                <th className="p-2.5">Last Visit</th>
              </tr>
            </thead>
            <tbody>
              {countryTable.slice(0, 50).map((c) => (
                <tr key={c.country} className="border-t border-border hover:bg-muted/30">
                  <td className="p-2.5 font-medium">{c.country}</td>
                  <td className="p-2.5 text-xs text-muted-foreground">{c.code ?? "—"}</td>
                  <td className="p-2.5 text-right">{c.visitors}</td>
                  <td className="p-2.5 text-right">{c.sessions}</td>
                  <td className="p-2.5 text-right">{c.faqViews}</td>
                  <td className="p-2.5 text-right">{c.questions}</td>
                  <td className="p-2.5 text-right">{c.wa}</td>
                  <td className="p-2.5 text-right">{c.escalations}</td>
                  <td className="p-2.5 text-right text-xs text-muted-foreground">{c.pct}%</td>
                  <td className="p-2.5 text-xs text-muted-foreground">
                    {new Date(c.last).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {countryTable.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-6 text-center text-muted-foreground">
                    {loading ? "Loading…" : "No visitor data yet for this range."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top questions + categories */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3">Most Asked Questions</h3>
          <ul className="space-y-2 text-sm">
            {stats.topQuestions.length === 0 && (
              <li className="text-muted-foreground text-xs">No questions logged yet.</li>
            )}
            {stats.topQuestions.map(([q, n]) => (
              <li key={String(q)} className="flex items-start gap-2">
                <ArrowUpRight className="w-3.5 h-3.5 text-scef-gold shrink-0 mt-0.5" />
                <span className="flex-1 truncate" title={String(q)}>
                  {String(q)}
                </span>
                <span className="text-xs text-muted-foreground">{String(n)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-semibold mb-3">Top FAQ Categories</h3>
          <ul className="space-y-2 text-sm">
            {stats.topCategories.length === 0 && (
              <li className="text-muted-foreground text-xs">No category data yet.</li>
            )}
            {stats.topCategories.map(([c, n]) => (
              <li key={String(c)} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-scef-blue-darker" />
                <span className="flex-1">{String(c)}</span>
                <span className="text-xs text-muted-foreground">{String(n)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Conversion summary */}
      <div className="grid md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Auto-answer rate</p>
          <p className="text-2xl font-bold text-scef-blue-darker">
            {stats.questions
              ? Math.round((stats.autoAns / stats.questions) * 100)
              : 0}
            %
          </p>
          <p className="text-xs text-muted-foreground">
            {stats.autoAns.toLocaleString()} of {stats.questions.toLocaleString()} questions
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Escalation rate</p>
          <p className="text-2xl font-bold text-scef-blue-darker">
            {stats.questions
              ? Math.round((stats.escalations / stats.questions) * 100)
              : 0}
            %
          </p>
          <p className="text-xs text-muted-foreground">
            {stats.escalations.toLocaleString()} escalations
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="text-xs text-muted-foreground">Chatbot → WhatsApp conversion</p>
          <p className="text-2xl font-bold text-scef-blue-darker">
            {stats.sessions ? Math.round((stats.wa / stats.sessions) * 100) : 0}%
          </p>
          <p className="text-xs text-muted-foreground">
            {stats.wa.toLocaleString()} clicks over {stats.sessions.toLocaleString()} sessions
          </p>
        </div>
      </div>
    </div>
  );
}

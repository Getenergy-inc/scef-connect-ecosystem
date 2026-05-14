import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Search, MessageCircle, ChevronDown, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Faq {
  id: string;
  faq_number: number | null;
  category: string;
  question: string;
  short_answer: string;
  full_answer: string | null;
  keywords: string[] | null;
  related_program: string | null;
  related_url: string | null;
}

const WA_LINK = "https://wa.me/2348109765897?text=" + encodeURIComponent("Hello Sophia, I need support with SCEF.");

const submitSchema = z.object({
  question: z.string().trim().min(5, "Please describe your question").max(2000),
  contact: z.string().trim().max(200).optional(),
  category: z.string().trim().max(100).optional(),
});

export default function SophiaFAQs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  // Submit form
  const [q, setQ] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("sophia_faqs")
        .select("id,faq_number,category,question,short_answer,full_answer,keywords,related_program,related_url")
        .eq("status", "published")
        .order("faq_number", { ascending: true });
      const list = (data ?? []) as Faq[];
      setFaqs(list);
      setCategories(Array.from(new Set(list.map((f) => f.category))).sort());
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    return faqs.filter((f) => {
      if (activeCat !== "All" && f.category !== activeCat) return false;
      if (!s) return true;
      const hay = [f.question, f.short_answer, f.full_answer ?? "", (f.keywords ?? []).join(" ")]
        .join(" ")
        .toLowerCase();
      return hay.includes(s);
    });
  }, [faqs, search, activeCat]);

  const popular = faqs.slice(0, 6);

  const submitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = submitSchema.safeParse({ question: q, contact, category: activeCat === "All" ? undefined : activeCat });
    if (!parsed.success) {
      toast.error(parsed.error.errors[0]?.message ?? "Invalid input");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("sophia_unanswered_questions").insert({
      question_text: parsed.data.question,
      user_contact: parsed.data.contact || null,
      suggested_category: parsed.data.category || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not send question. Please try again.");
      return;
    }
    toast.success("Thank you! Sophia's team will follow up soon.");
    setQ("");
    setContact("");
  };

  return (
    <>
      <Helmet>
        <title>Sophia Help Center — SCEF FAQs & Support</title>
        <meta
          name="description"
          content="Find answers about SCEF, EduAid-Africa, NESA-Africa, GFA Wallet, membership, donations, training, partnerships, and local chapters."
        />
        <link rel="canonical" href="/support/faqs" />
      </Helmet>

      {/* Hero */}
      <section className="bg-scef-blue-darker text-white py-16">
        <div className="container px-4 md:px-8 max-w-5xl">
          <span className="inline-block px-3 py-1 rounded-full bg-scef-gold/20 text-scef-gold text-xs font-semibold mb-4">
            Sophia Help Center
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Find answers across the SCEF ecosystem
          </h1>
          <p className="text-white/80 max-w-2xl mb-6">
            Search verified answers about SCEF, EduAid-Africa, NESA-Africa, GFA Wallet, membership,
            donations, training, partnerships, and local chapters.
          </p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions, programs, or keywords…"
              className="pl-12 h-12 text-base bg-white text-foreground"
            />
          </div>
          <div className="mt-4">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              <MessageCircle className="w-4 h-4" /> Chat with Sophia on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container px-4 md:px-8 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap",
                  activeCat === c
                    ? "bg-scef-blue-darker text-white border-scef-blue-darker"
                    : "bg-background text-foreground border-border hover:border-scef-gold"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular */}
      {!search && activeCat === "All" && popular.length > 0 && (
        <section className="py-10 bg-muted/30">
          <div className="container px-4 md:px-8 max-w-5xl">
            <h2 className="font-display text-xl font-bold mb-4 text-scef-blue-darker">Popular questions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {popular.map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setOpenId(f.id);
                    document.getElementById(`faq-${f.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                  }}
                  className="text-left p-4 rounded-xl bg-card border border-border hover:border-scef-gold transition-colors"
                >
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.category}</span>
                  <p className="font-medium text-sm text-foreground mt-1">{f.question}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ list */}
      <section className="py-12">
        <div className="container px-4 md:px-8 max-w-4xl">
          {loading ? (
            <p className="text-muted-foreground text-center py-12">Loading FAQs…</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No matching FAQs found.</p>
              <p className="text-sm">Use the form below to send your question to Sophia's team.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((f) => {
                const open = openId === f.id;
                return (
                  <div
                    key={f.id}
                    id={`faq-${f.id}`}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenId(open ? null : f.id)}
                      className="w-full flex items-start justify-between gap-4 p-5 text-left"
                    >
                      <div>
                        <span className="inline-block text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-scef-gold/10 text-scef-blue-darker font-semibold mb-2">
                          {f.category}
                        </span>
                        <p className="font-semibold text-foreground">{f.question}</p>
                      </div>
                      <ChevronDown
                        className={cn("w-5 h-5 text-muted-foreground shrink-0 transition-transform", open && "rotate-180")}
                      />
                    </button>
                    {open && (
                      <div className="px-5 pb-5 text-sm text-muted-foreground space-y-3">
                        <p className="text-foreground/90">{f.short_answer}</p>
                        {f.full_answer && <p className="whitespace-pre-line">{f.full_answer}</p>}
                        {f.related_url && (
                          <a
                            href={f.related_url}
                            className="inline-flex items-center text-scef-blue-darker font-medium hover:underline"
                          >
                            Learn more →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Submit a question */}
      <section className="py-14 bg-muted/30 border-t border-border">
        <div className="container px-4 md:px-8 max-w-2xl">
          <h2 className="font-display text-2xl font-bold text-scef-blue-darker mb-2">
            Didn't find your answer?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            Send your question to Sophia's team. We'll add it to the knowledge base and reach back out if you provide contact details.
          </p>
          <form onSubmit={submitQuestion} className="space-y-3 bg-card border border-border rounded-xl p-5">
            <Textarea
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type your question…"
              rows={4}
              required
              maxLength={2000}
            />
            <Input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Your email or phone (optional)"
              maxLength={200}
            />
            <Button type="submit" disabled={submitting} className="w-full bg-scef-blue-darker hover:bg-scef-blue-darker/90">
              <Send className="w-4 h-4 mr-2" />
              {submitting ? "Sending…" : "Send to Sophia"}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

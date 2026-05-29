import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const HIDDEN_PREFIXES = ["/auth", "/dashboard", "/admin", "/staff", "/portal", "/chapter/inbox", "/messages"];
const WA_NUMBER = "2348109765897";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const buildWA = (text: string) => `${WA_BASE}?text=${encodeURIComponent(text)}`;
const WELCOME_WA = buildWA("Hello Sophia, I need support with SCEF.");

const WELCOME =
  "Welcome to Santos Creations Educational Foundation (SCEF). I am Sophia, your support assistant. I can help you with membership, EduAid-Africa, NESA-Africa, donations, payments, local chapters, webinars, volunteering, partnerships, and general support. How may I help you today?";

const QUICK_REPLIES = [
  "Membership",
  "EduAid-Africa",
  "NESA-Africa",
  "Donate & Payments",
  "Local Chapters",
  "Training & Webinars",
  "Volunteer / Internship",
  "Partnership & CSR",
  "GFA Wallet",
];

type Msg = {
  id: string;
  role: "assistant" | "user";
  content: string;
  url?: string;
  escalation?: { department?: string; departments?: string[] } | null;
};

const isInIframe = () => {
  try {
    return typeof window !== "undefined" && window.self !== window.top;
  } catch {
    return true;
  }
};

const openWA = (url: string) => (e: React.MouseEvent) => {
  if (!isInIframe()) return;
  e.preventDefault();
  try {
    if (window.open(url, "_blank", "noopener,noreferrer")) return;
  } catch {}
  try {
    if (window.top) {
      window.top.location.href = url;
      return;
    }
  } catch {}
  window.location.href = url;
};

export const SophiaWhatsAppWidget = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [convId, setConvId] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { id: "welcome", role: "assistant", content: WELCOME },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setShowTip(true), 4000);
    const t2 = setTimeout(() => setShowTip(false), 12000);
    const h = () => {
      setOpen(true);
      setShowTip(false);
    };
    window.addEventListener("sophia:open", h);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("sophia:open", h);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const ask = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);

    const history = messages
      .filter((m) => m.id !== "welcome")
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const { data, error } = await supabase.functions.invoke("sophia-chat", {
        body: {
          question: trimmed,
          conversation_id: convId,
          channel: "web_widget",
          history,
        },
      });

      if (error) throw error;

      if (data?.conversation_id) setConvId(data.conversation_id);

      const assistantMsg: Msg = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          data?.clarifying_question?.length > 0
            ? `${data.answer}\n\n${data.clarifying_question}`
            : data?.answer || "I'm having trouble right now. Please try again or reach us on WhatsApp.",
        url: data?.related_url || undefined,
        escalation: data?.escalation_required
          ? { department: data.escalation_department, departments: data.escalation_departments }
          : null,
      };
      setMessages((m) => [...m, assistantMsg]);
    } catch (e) {
      console.error(e);
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "I'm having trouble reaching the support service. Would you like to continue this conversation on WhatsApp?",
          escalation: { department: "", departments: [] },
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Sophia, SCEF Support Assistant"
          className="fixed z-50 bottom-36 right-4 md:bottom-24 md:right-6 w-[calc(100vw-2rem)] max-w-[380px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-card animate-fade-in flex flex-col max-h-[78vh]"
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-start gap-3 shrink-0">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full bg-scef-gold flex items-center justify-center text-scef-blue-darker font-bold text-lg ring-2 ring-white/30">
                S
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] ring-2 ring-[#075E54]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm leading-tight">Sophia</div>
              <div className="text-[11px] text-white/80">SCEF Support Assistant · 24/7</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-[#ECE5DD] dark:bg-muted p-3 space-y-2"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm whitespace-pre-line",
                    m.role === "user"
                      ? "bg-[#DCF8C6] dark:bg-primary/20 text-foreground rounded-tr-none"
                      : "bg-white dark:bg-card text-foreground rounded-tl-none",
                  )}
                >
                  {m.content}
                  {m.url && (
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-scef-blue-darker hover:underline"
                    >
                      Learn more <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {m.escalation && (
                    <div className="mt-2 pt-2 border-t border-border/60 space-y-1.5">
                      <p className="text-[11px] text-muted-foreground">
                        I may need a team member to assist with this. Would you like to connect?
                      </p>
                      <a
                        href={buildWA(`Hello Sophia, please connect me with the ${m.escalation.department || "SCEF support"} desk. My question: ${[...messages].reverse().find((x) => x.role === "user")?.content ?? ""}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={openWA(
                          buildWA(
                            `Hello Sophia, please connect me with the ${m.escalation.department || "SCEF support"} desk.`,
                          ),
                        )}
                        className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1EBE5B] text-white text-xs font-semibold px-3 py-1.5 rounded-md"
                      >
                        <MessageCircle className="w-3 h-3" />
                        {m.escalation.department
                          ? `Continue with ${m.escalation.department} on WhatsApp`
                          : "Continue on WhatsApp"}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-card rounded-lg rounded-tl-none px-3 py-2 text-xs text-muted-foreground inline-flex items-center gap-2 shadow-sm">
                  <Loader2 className="w-3 h-3 animate-spin" /> Sophia is typing…
                </div>
              </div>
            )}

            {/* Quick replies only on first turn */}
            {messages.length === 1 && !sending && (
              <div className="pt-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 px-1">
                  Choose a topic
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => ask(`Tell me about ${q}`)}
                      className="text-[11px] font-medium text-left px-2 py-1.5 rounded-md bg-white dark:bg-card border border-[#25D366]/30 text-scef-blue-darker dark:text-foreground hover:bg-[#25D366]/10 hover:border-[#25D366] transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                  <a
                    href={WELCOME_WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={openWA(WELCOME_WA)}
                    className="col-span-2 text-[11px] font-semibold text-center px-2 py-1.5 rounded-md bg-[#25D366] text-white hover:bg-[#1EBE5B]"
                  >
                    🟢 Speak with Support on WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="bg-card p-2 border-t border-border flex items-center gap-2 shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              maxLength={500}
              disabled={sending}
              aria-label="Message Sophia"
              className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              aria-label="Send message"
              className="h-10 w-10 inline-flex items-center justify-center rounded-md bg-scef-blue-darker text-white hover:bg-scef-blue-darker/90 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {!open && showTip && (
        <div className="fixed z-40 bottom-[8.25rem] right-4 md:bottom-[5.5rem] md:right-24 bg-card text-foreground text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-border animate-fade-in hidden sm:block">
          Need Help? Chat with Sophia
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Sophia chat" : "Open Sophia chat – SCEF Support Assistant"}
        aria-expanded={open}
        className={cn(
          "fixed z-40 right-4 md:right-6 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-105",
          "bottom-20 md:bottom-6",
          open ? "h-12 w-12 justify-center" : "h-12 px-4 md:h-14 md:px-5",
        )}
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <MessageCircle className="h-6 w-6" />
          {!open && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-scef-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-scef-gold" />
            </span>
          )}
        </span>
        {!open && <span className="text-sm font-semibold hidden sm:inline">Chat with Sophia</span>}
      </button>
    </>
  );
};

export default SophiaWhatsAppWidget;

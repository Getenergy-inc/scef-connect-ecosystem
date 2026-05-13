import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const HIDDEN_PREFIXES = ["/auth", "/dashboard", "/admin", "/staff", "/portal", "/chapter/inbox", "/messages"];

const WA_NUMBER = "2348109765897";
const WA_BASE = `https://wa.me/${WA_NUMBER}`;
const QR_IMAGE = "/sophia-whatsapp-qr.jpg";

const buildLink = (text: string) => `${WA_BASE}?text=${encodeURIComponent(text)}`;

const WELCOME_LINK = buildLink("Hello Sophia, I need support with SCEF.");

const QUICK_ACTIONS: { label: string; text: string }[] = [
  { label: "Membership", text: "Hello Sophia, I want to know more about SCEF membership." },
  { label: "Donations & Payments", text: "Hello Sophia, I need help with donations and payment options." },
  { label: "NESA-Africa", text: "Hello Sophia, I need support regarding NESA-Africa." },
  { label: "EduAid-Africa", text: "Hello Sophia, I need support regarding EduAid-Africa." },
  { label: "Local Chapters", text: "Hello Sophia, I want to learn about SCEF local chapters." },
  { label: "Partnership", text: "Hello Sophia, I'd like to discuss a partnership with SCEF." },
  { label: "Volunteer / Internship", text: "Hello Sophia, I'm interested in volunteering or interning with SCEF." },
  { label: "Training & Webinars", text: "Hello Sophia, I'd like info on SCEF training and webinars." },
  { label: "Report Payment", text: "Hello Sophia, I'd like to report a payment I made to SCEF." },
  { label: "Sponsor a Program", text: "Hello Sophia, I want to sponsor an SCEF program." },
];

const trackOpen = (source: string) => {
  try {
    // @ts-ignore
    window.gtag?.("event", "sophia_whatsapp_open", { source });
  } catch {}
};

export const SophiaWhatsAppWidget = () => {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 4000);
    const h = setTimeout(() => setShowTooltip(false), 12000);
    return () => { clearTimeout(t); clearTimeout(h); };
  }, []);

  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <>
      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Sophia, SCEF Support Assistant"
          className="fixed z-50 bottom-36 right-4 md:bottom-24 md:right-6 w-[calc(100vw-2rem)] max-w-[360px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-card animate-fade-in"
        >
          {/* Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-start gap-3">
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full bg-scef-gold flex items-center justify-center text-scef-blue-darker font-bold text-lg ring-2 ring-white/30">
                S
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] ring-2 ring-[#075E54]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm leading-tight">Chat with Sophia</div>
              <div className="text-[11px] text-white/80">SCEF Support Assistant</div>
              <div className="text-[10px] text-white/70 mt-0.5">Mon–Sat · 8AM–6PM WAT</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/80 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="bg-[#ECE5DD] dark:bg-muted p-4 max-h-[60vh] overflow-y-auto">
            {/* Welcome bubble */}
            <div className="bg-white dark:bg-card rounded-lg rounded-tl-none p-3 shadow-sm mb-3 text-sm text-foreground/90 leading-relaxed">
              <p className="font-semibold mb-1">Hello 👋</p>
              <p>I'm Sophia, your SCEF support assistant.</p>
              <p>How can we assist you today?</p>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-2">
              {QUICK_ACTIONS.map((a) => (
                <a
                  key={a.label}
                  href={buildLink(a.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOpen(`quick:${a.label}`)}
                  className="text-[11px] font-medium text-center px-2 py-2 rounded-lg bg-white dark:bg-card border border-[#25D366]/30 text-scef-blue-darker dark:text-foreground hover:bg-[#25D366]/10 hover:border-[#25D366] transition-colors"
                >
                  {a.label}
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-card p-3 border-t border-border flex items-center gap-2">
            <a
              href={WELCOME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOpen("primary")}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Start WhatsApp Chat
            </a>
            <a
              href={QR_IMAGE}
              download="sophia-scef-whatsapp-qr.jpg"
              aria-label="Download Sophia WhatsApp QR code"
              title="Scan to chat with Sophia"
              className="shrink-0 p-2 rounded-lg border border-border bg-background hover:bg-muted transition-colors"
            >
              <Download className="w-4 h-4 text-foreground" />
            </a>
          </div>
        </div>
      )}

      {/* Tooltip */}
      {!open && showTooltip && (
        <div className="fixed z-40 bottom-[8.25rem] right-4 md:bottom-[5.5rem] md:right-24 bg-card text-foreground text-xs font-medium px-3 py-2 rounded-lg shadow-lg border border-border animate-fade-in hidden sm:block">
          Need Help? Chat with Sophia
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => { setOpen((v) => !v); setShowTooltip(false); if (!open) trackOpen("widget"); }}
        aria-label={open ? "Close Sophia chat" : "Open Sophia chat – SCEF WhatsApp Support"}
        aria-expanded={open}
        className={cn(
          "fixed z-40 right-4 md:right-6 flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-105",
          "bottom-20 md:bottom-6",
          open ? "h-12 w-12 justify-center" : "h-12 px-4 md:h-14 md:px-5"
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
        {!open && <span className="text-sm font-semibold hidden sm:inline">Need Help?</span>}
      </button>
    </>
  );
};

export default SophiaWhatsAppWidget;

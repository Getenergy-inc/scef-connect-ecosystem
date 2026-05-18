import { Mail, MapPin, CalendarDays, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import seychellesBg from "@/assets/seychelles-2027-conference.jpg";

const EMAIL = "eduaidafrica.santos@gmail.com";
const SUBJECT = "Seychelles 2027 — Waiting List Registration";
const BODY =
  "Hello EduAid-Africa Team,%0D%0A%0D%0AI would like to join the waiting list for the EduAid Africa Indian Ocean Islands Edu-Tourism Conference 2027 — Seychelles Regional Edition (15–24 October 2027).%0D%0A%0D%0AName:%0D%0ACountry:%0D%0AOrganisation / School:%0D%0ARole:%0D%0A%0D%0AThank you.";

const regions = ["Comoros", "Madagascar", "Mauritius", "Seychelles"];
const pillars = ["Learn", "Serve", "Tour", "Partner", "Transform"];

export const Seychelles2027WaitingList = () => {
  return (
    <section className="relative py-16 md:py-24 bg-scef-blue-darker overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={seychellesBg}
          alt="Seychelles coastline — EduAid Africa Indian Ocean Islands Edu-Tourism Conference 2027"
          loading="lazy"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-scef-blue-darker via-scef-blue-darker/85 to-scef-blue-darker/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-scef-blue-darker/90 via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Content */}
          <div className="lg:col-span-7 text-white">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-scef-gold/15 border border-scef-gold/40 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-scef-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold">
                EduAid-Africa · Edu-Tourism Conference · Hybrid
              </span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4">
              Seychelles 2027 — Join the Waiting List
            </h2>

            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-6 max-w-2xl">
              Be the first to secure a seat at the{" "}
              <strong className="text-scef-gold">
                EduAid Africa Indian Ocean Islands Edu-Tourism Conference 2027
              </strong>{" "}
              — Seychelles Regional Edition.
            </p>

            {/* Meta strip */}
            <div className="grid sm:grid-cols-2 gap-3 mb-6 max-w-2xl">
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
                <CalendarDays className="w-4 h-4 text-scef-gold mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-scef-gold">Dates</div>
                  <div className="text-sm font-medium">15–24 October 2027</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-lg p-3 backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-scef-gold mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-scef-gold">Host Hub</div>
                  <div className="text-sm font-medium">Seychelles</div>
                </div>
              </div>
            </div>

            {/* Theme */}
            <div className="mb-5 max-w-2xl">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-1.5">Theme</div>
              <p className="text-sm md:text-base text-white/90">
                Girls' Education, Gender Inclusion, Safeguarding &amp; Inclusive Education Support
              </p>
            </div>

            {/* Regional focus */}
            <div className="mb-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-2">
                Regional Focus
              </div>
              <div className="flex flex-wrap gap-1.5">
                {regions.map((r) => (
                  <Badge
                    key={r}
                    variant="outline"
                    className="border-white/30 text-white bg-white/5 backdrop-blur-sm text-xs"
                  >
                    {r}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-scef-gold hover:bg-scef-gold/90 text-scef-blue-darker font-semibold"
              >
                <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${BODY}`}>
                  <Mail className="w-4 h-4 mr-2" /> Join the Waiting List
                </a>
              </Button>
              <a
                href={`mailto:${EMAIL}`}
                className="text-sm text-white/80 hover:text-scef-gold underline-offset-4 hover:underline break-all"
              >
                {EMAIL}
              </a>
            </div>

            {/* Pillars */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-7 pt-5 border-t border-white/15">
              {pillars.map((p, i) => (
                <div key={p} className="flex items-center gap-2">
                  <span className="font-display text-sm md:text-base font-semibold text-scef-gold">
                    {p}.
                  </span>
                  {i < pillars.length - 1 && (
                    <ArrowRight className="w-3 h-3 text-white/40 hidden sm:block" />
                  )}
                </div>
              ))}
              <span className="text-xs text-white/70 italic w-full sm:w-auto sm:ml-2">
                Transform Education in Africa.
              </span>
            </div>
          </div>

          {/* Decorative card */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="absolute -top-3 -right-3 bg-scef-gold text-scef-blue-darker text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                Limited Seats
              </div>
              <div className="font-display text-6xl font-bold text-scef-gold leading-none mb-2">
                2027
              </div>
              <div className="text-white/80 text-sm uppercase tracking-[0.2em] mb-6">
                Indian Ocean Islands Edition
              </div>
              <ul className="space-y-3 text-sm text-white/90">
                <li className="flex gap-2"><span className="text-scef-gold">›</span> 10-day immersive conference programme</li>
                <li className="flex gap-2"><span className="text-scef-gold">›</span> School visits across 4 island nations</li>
                <li className="flex gap-2"><span className="text-scef-gold">›</span> Cultural &amp; eco-tourism experiences</li>
                <li className="flex gap-2"><span className="text-scef-gold">›</span> Partnership &amp; safeguarding roundtables</li>
                <li className="flex gap-2"><span className="text-scef-gold">›</span> Networking with African education leaders</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Seychelles2027WaitingList;

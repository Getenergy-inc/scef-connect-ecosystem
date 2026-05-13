import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  contributors,
  contributorCategoryLabels,
  allCountries,
  allRoles,
  allPrograms,
  allYears,
  type Contributor,
  type ContributorCategory,
} from "@/config/contributorsDirectory";
import { ContributorCard } from "./ContributorCard";
import { ContributorModal } from "./ContributorModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Handshake, Award, MapPin, Users, Send } from "lucide-react";

const featuredCategories: ContributorCategory[] = [
  "founding",
  "volunteer-leaders",
  "ambassadors",
  "educators",
  "media-advocacy",
  "chapter-presidents",
  "boa",
  "youth-leaders",
  "sustainability",
];

export const ContributorDirectory = () => {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState<string>("all");
  const [role, setRole] = useState<string>("all");
  const [program, setProgram] = useState<string>("all");
  const [year, setYear] = useState<string>("all");
  const [category, setCategory] = useState<ContributorCategory | "all">("all");
  const [active, setActive] = useState<Contributor | null>(null);

  const filtered = useMemo(() => {
    return contributors.filter((c) => {
      if (country !== "all" && c.country !== country) return false;
      if (role !== "all" && c.role !== role) return false;
      if (program !== "all" && !c.programs.includes(program as never)) return false;
      if (year !== "all" && c.yearJoined !== year) return false;
      if (category !== "all" && !c.categories.includes(category)) return false;
      if (query) {
        const q = query.toLowerCase();
        const hay = `${c.name} ${c.country} ${c.chapter ?? ""} ${c.role} ${c.programs.join(" ")} ${c.summary}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [country, role, program, year, category, query]);

  const Select = ({
    value,
    onChange,
    children,
    ariaLabel,
  }: {
    value: string;
    onChange: (v: string) => void;
    children: React.ReactNode;
    ariaLabel: string;
  }) => (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-md border border-input bg-background px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-scef-gold"
    >
      {children}
    </select>
  );

  return (
    <section className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-3xl mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-scef-gold mb-3">
            Contributor Directory
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-scef-blue-darker leading-tight">
            Meet Our Volunteers, Ambassadors & Contributors
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real people. Real stories. Real educational impact across Africa.
          </p>
        </div>

        {/* Featured category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              category === "all"
                ? "bg-scef-blue-darker text-white"
                : "bg-muted text-foreground hover:bg-scef-gold/15"
            }`}
          >
            All contributors
          </button>
          {featuredCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                category === cat
                  ? "bg-scef-blue-darker text-white"
                  : "bg-muted text-foreground hover:bg-scef-gold/15"
              }`}
            >
              {contributorCategoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Search + filters */}
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto_auto] mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, chapter, programme…"
              className="pl-9 h-9"
            />
          </div>
          <Select value={country} onChange={setCountry} ariaLabel="Filter by country">
            <option value="all">All countries</option>
            {allCountries.map((c) => <option key={c} value={c}>{c}</option>)}
          </Select>
          <Select value={role} onChange={setRole} ariaLabel="Filter by role">
            <option value="all">All roles</option>
            {allRoles.map((r) => <option key={r} value={r}>{r}</option>)}
          </Select>
          <Select value={program} onChange={setProgram} ariaLabel="Filter by programme">
            <option value="all">All programmes</option>
            {allPrograms.map((p) => <option key={p} value={p}>{p}</option>)}
          </Select>
          <Select value={year} onChange={setYear} ariaLabel="Filter by year joined">
            <option value="all">All years</option>
            {allYears.map((y) => <option key={y} value={y}>{y}</option>)}
          </Select>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No contributors match these filters yet.
          </p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((c) => (
              <ContributorCard key={c.id} contributor={c} onClick={() => setActive(c)} />
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-border bg-scef-blue-darker text-white p-8 md:p-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">
            Become Part of Africa's Education Transformation Movement
          </h3>
          <p className="mt-2 text-white/80 max-w-2xl">
            Join volunteers, ambassadors, educators and partners building real impact across the continent.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild className="bg-scef-gold hover:bg-scef-gold-hover text-scef-blue-darker font-semibold">
              <Link to="/get-involved/volunteer"><Handshake className="w-4 h-4 mr-2" /> Become a Volunteer</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
              <Link to="/get-involved/ambassador"><Award className="w-4 h-4 mr-2" /> Become an Ambassador</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
              <Link to="/chapters"><MapPin className="w-4 h-4 mr-2" /> Join a Local Chapter</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
              <Link to="/partner-with-us"><Users className="w-4 h-4 mr-2" /> Partner With SCEF</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold">
              <Link to="/media/submit"><Send className="w-4 h-4 mr-2" /> Submit Your Story</Link>
            </Button>
          </div>
          <p className="mt-5 text-[11px] text-white/60 italic">
            Passport photographs, headshots and verified contributor records are being integrated
            from SCEF, NESA-Africa, EduAid-Africa archives and Facebook archive sources. Names shown
            as “record pending” will be updated as verified records arrive — no AI-generated faces
            or stock profile images are ever used.
          </p>
        </div>

        <ContributorModal contributor={active} onClose={() => setActive(null)} />
      </div>
    </section>
  );
};

export default ContributorDirectory;

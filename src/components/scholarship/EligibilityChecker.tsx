import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type Result = "eligible" | "review" | null;

export const EligibilityChecker = () => {
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [level, setLevel] = useState("");
  const [institution, setInstitution] = useState("");
  const [need, setNeed] = useState(false);
  const [disability, setDisability] = useState(false);
  const [rural, setRural] = useState(false);
  const [result, setResult] = useState<Result>(null);

  const onCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age || "0", 10);
    const ok =
      country.trim().length >= 2 &&
      ageNum >= 16 &&
      ageNum <= 45 &&
      level &&
      institution;
    setResult(ok ? "eligible" : "review");
  };

  return (
    <form
      onSubmit={onCheck}
      className="rounded-2xl border border-border bg-card p-6 md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="elig-country">Country</Label>
          <Input
            id="elig-country"
            value={country}
            onChange={(e) => setCountry(e.target.value.slice(0, 60))}
            placeholder="e.g. Nigeria"
            required
          />
        </div>
        <div>
          <Label htmlFor="elig-age">Age</Label>
          <Input
            id="elig-age"
            type="number"
            min={16}
            max={45}
            value={age}
            onChange={(e) => setAge(e.target.value.slice(0, 2))}
            required
          />
        </div>
        <div>
          <Label>Education level</Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="secondary">Secondary completed</SelectItem>
              <SelectItem value="vocational">Vocational / technical</SelectItem>
              <SelectItem value="college">College / polytechnic</SelectItem>
              <SelectItem value="undergrad">Undergraduate</SelectItem>
              <SelectItem value="postgrad">Postgraduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Institution type</Label>
          <Select value={institution} onValueChange={setInstitution}>
            <SelectTrigger>
              <SelectValue placeholder="Select institution" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vocational">Vocational / technical</SelectItem>
              <SelectItem value="college">College</SelectItem>
              <SelectItem value="polytechnic">Polytechnic</SelectItem>
              <SelectItem value="university">University</SelectItem>
              <SelectItem value="professional">Professional / certification body</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { v: need, set: setNeed, label: "Financial need" },
          { v: disability, set: setDisability, label: "Disability / special needs" },
          { v: rural, set: setRural, label: "Rural / underserved" },
        ].map((c) => (
          <label
            key={c.label}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm"
          >
            <Checkbox checked={c.v} onCheckedChange={(x) => c.set(Boolean(x))} />
            {c.label}
          </label>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Button type="submit" className="bg-scef-blue-darker hover:bg-scef-blue">
          Check My Eligibility
        </Button>
        {result === "eligible" && (
          <p className="flex items-center gap-2 text-sm font-semibold text-[hsl(145_63%_28%)]">
            <CheckCircle2 className="h-4 w-4" />
            Looks eligible — continue to apply.
          </p>
        )}
        {result === "review" && (
          <p className="flex items-center gap-2 text-sm font-semibold text-amber-700">
            <AlertCircle className="h-4 w-4" />
            We'll review case-by-case. You can still apply.
          </p>
        )}
      </div>

      {result && (
        <div className="mt-5 border-t border-border pt-5">
          <Button
            asChild
            className="bg-scef-gold text-scef-blue-darker hover:bg-scef-gold-hover"
          >
            <Link to="/scholarship/apply">
              Continue to Application <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </form>
  );
};

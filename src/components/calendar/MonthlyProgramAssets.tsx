import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, MapPin, Trash2, Upload, Loader2 } from "lucide-react";

type AssetType = "brief" | "regional_report";

interface Asset {
  id: string;
  program_slug: string;
  asset_type: AssetType;
  title: string;
  region: string | null;
  country: string | null;
  file_url: string;
  file_name: string | null;
  file_size: number | null;
  is_published: boolean;
  created_at: string;
}

const BUCKET = "monthly-program-assets";

const formatBytes = (b?: number | null) => {
  if (!b) return "";
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(1)} MB`;
};

interface Props {
  programSlug: string;
  programMonth: string;
}

export const MonthlyProgramAssets = ({ programSlug, programMonth }: Props) => {
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [uploading, setUploading] = useState(false);

  // form state
  const [assetType, setAssetType] = useState<AssetType>("brief");
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("monthly_program_assets")
      .select("*")
      .eq("program_slug", programSlug)
      .order("created_at", { ascending: false });
    setAssets((data as Asset[] | null) ?? []);
    setLoading(false);
  }, [programSlug]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      setIsAdmin(!!roles?.some((r) => r.role === "admin" || r.role === "super_admin"));
    })();
  }, []);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      toast({ title: "Missing fields", description: "Title and file are required.", variant: "destructive" });
      return;
    }
    if (assetType === "regional_report" && !region.trim()) {
      toast({ title: "Region required", description: "Regional reports need a region.", variant: "destructive" });
      return;
    }
    setUploading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const path = `${programSlug}/${assetType}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });
      if (upErr) throw upErr;
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
      const { error: insErr } = await supabase.from("monthly_program_assets").insert({
        program_slug: programSlug,
        asset_type: assetType,
        title: title.trim(),
        region: region.trim() || null,
        country: country.trim() || null,
        file_url: pub.publicUrl,
        file_name: file.name,
        file_size: file.size,
        uploaded_by: user?.id ?? null,
      });
      if (insErr) throw insErr;
      toast({ title: "Uploaded", description: "Asset published." });
      setTitle(""); setRegion(""); setCountry(""); setFile(null);
      (document.getElementById("mpa-file") as HTMLInputElement | null)?.value && ((document.getElementById("mpa-file") as HTMLInputElement).value = "");
      load();
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message ?? String(err), variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (a: Asset) => {
    if (!confirm(`Delete "${a.title}"?`)) return;
    const { error } = await supabase.from("monthly_program_assets").delete().eq("id", a.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    // best-effort remove storage object
    try {
      const url = new URL(a.file_url);
      const idx = url.pathname.indexOf(`/${BUCKET}/`);
      if (idx >= 0) {
        const path = decodeURIComponent(url.pathname.slice(idx + BUCKET.length + 2));
        await supabase.storage.from(BUCKET).remove([path]);
      }
    } catch { /* ignore */ }
    toast({ title: "Deleted" });
    load();
  };

  const briefs = assets.filter((a) => a.asset_type === "brief");
  const reports = assets.filter((a) => a.asset_type === "regional_report");

  return (
    <section className="mt-12 space-y-6" aria-labelledby="mpa-heading">
      <div>
        <h3 id="mpa-heading" className="font-display text-xl font-bold text-scef-blue-darker">
          Program Brief & Regional Participation Reports
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Download the {programMonth} program brief and view regional participation reports submitted by chapters and partners.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Briefs */}
        <div className="rounded-xl border border-scef-gold/30 bg-scef-gold/5 p-5">
          <h4 className="flex items-center gap-2 font-display text-base font-bold text-scef-blue-darker">
            <FileText className="h-4 w-4" /> Program Brief
          </h4>
          {loading ? (
            <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
          ) : briefs.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Reporting in progress — brief will be published before the program week opens.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {briefs.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-3 rounded-lg bg-background/60 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.file_name} {formatBytes(a.file_size) && `· ${formatBytes(a.file_size)}`}</p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button asChild size="sm" variant="outline">
                      <a href={a.file_url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="mr-1 h-3.5 w-3.5" /> Download
                      </a>
                    </Button>
                    {isAdmin && (
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(a)} aria-label="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Regional reports */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h4 className="flex items-center gap-2 font-display text-base font-bold text-scef-blue-darker">
            <MapPin className="h-4 w-4" /> Regional Participation Reports
          </h4>
          {loading ? (
            <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
          ) : reports.length === 0 ? (
            <p className="mt-3 text-sm text-muted-foreground">Reporting in progress — chapter and regional reports will appear here as they are submitted.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {reports.map((a) => (
                <li key={a.id} className="flex items-start justify-between gap-3 rounded-lg bg-muted/40 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {[a.region, a.country].filter(Boolean).join(" · ")}
                      {a.file_name && <> · {a.file_name}</>}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button asChild size="sm" variant="outline">
                      <a href={a.file_url} target="_blank" rel="noopener noreferrer" download>
                        <Download className="mr-1 h-3.5 w-3.5" /> View
                      </a>
                    </Button>
                    {isAdmin && (
                      <Button size="sm" variant="ghost" onClick={() => handleDelete(a)} aria-label="Delete">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {isAdmin && (
        <form
          onSubmit={handleUpload}
          className="rounded-xl border border-dashed border-scef-blue-darker/30 bg-scef-blue-darker/[0.03] p-5"
        >
          <h4 className="flex items-center gap-2 font-display text-base font-bold text-scef-blue-darker">
            <Upload className="h-4 w-4" /> Admin: Upload Asset
          </h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Asset type</Label>
              <Select value={assetType} onValueChange={(v) => setAssetType(v as AssetType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="brief">Program Brief</SelectItem>
                  <SelectItem value="regional_report">Regional Participation Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs" htmlFor="mpa-title">Title</Label>
              <Input id="mpa-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. October 2026 Program Brief" />
            </div>
            {assetType === "regional_report" && (
              <>
                <div>
                  <Label className="text-xs" htmlFor="mpa-region">Region</Label>
                  <Input id="mpa-region" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="e.g. West Africa" />
                </div>
                <div>
                  <Label className="text-xs" htmlFor="mpa-country">Country (optional)</Label>
                  <Input id="mpa-country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="e.g. Nigeria" />
                </div>
              </>
            )}
            <div className="sm:col-span-2">
              <Label className="text-xs" htmlFor="mpa-file">File (PDF / DOCX)</Label>
              <Input
                id="mpa-file"
                type="file"
                accept=".pdf,.doc,.docx,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button type="submit" disabled={uploading}>
              {uploading ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <Upload className="mr-1 h-4 w-4" />}
              {uploading ? "Uploading…" : "Upload"}
            </Button>
          </div>
        </form>
      )}
    </section>
  );
};

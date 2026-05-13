import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { Loader2, ImagePlus, LogIn } from "lucide-react";

interface Submission {
  id: string;
  created_at: string;
  caption: string;
  category: string;
  program: string | null;
  year: string | null;
  status: "pending" | "approved" | "rejected" | "archived";
  reviewer_notes: string | null;
  photo_url: string;
}

const statusStyles: Record<Submission["status"], string> = {
  pending: "bg-scef-gold/15 text-scef-gold-dark",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
  archived: "bg-muted text-muted-foreground",
};

const MyMediaSubmissions = () => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [items, setItems] = useState<Submission[]>([]);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        setAuthed(false);
        setLoading(false);
        return;
      }
      setAuthed(true);
      const { data, error } = await supabase
        .from("media_submissions")
        .select("id,created_at,caption,category,program,year,status,reviewer_notes,photo_url")
        .order("created_at", { ascending: false });
      if (!error && data) setItems(data as Submission[]);
      setLoading(false);
    })();
  }, []);

  return (
    <PageShell
      title="My Media Submissions"
      description="Track the review status of media you've submitted to the SCEF Media Archive."
      eyebrow="Media · My Submissions"
      heading="My Media Submissions"
      intro="Track the review status of every photo and story you've contributed to the SCEF Media Archive."
    >
      <section className="container mx-auto px-4 py-10 max-w-4xl">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
          </div>
        ) : authed === false ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <p className="text-sm text-muted-foreground mb-4">
              Sign in to track your submissions across devices.
            </p>
            <div className="flex justify-center gap-3">
              <Button asChild>
                <Link to="/auth/sign-in">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/media/submit">
                  <ImagePlus className="w-4 h-4 mr-2" />
                  Submit Media
                </Link>
              </Button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <p className="text-sm text-muted-foreground mb-4">
              You haven't submitted any media yet.
            </p>
            <Button asChild>
              <Link to="/media/submit">
                <ImagePlus className="w-4 h-4 mr-2" />
                Submit your first photo
              </Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((s) => (
              <li
                key={s.id}
                className="flex gap-4 rounded-xl border border-border bg-card p-4"
              >
                <img
                  src={s.photo_url}
                  alt={s.caption}
                  loading="lazy"
                  className="h-24 w-24 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full ${statusStyles[s.status]}`}
                    >
                      {s.status}
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                      {s.category.replace("-", " ")}
                      {s.program ? ` · ${s.program}` : ""}
                      {s.year ? ` · ${s.year}` : ""}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-semibold text-foreground leading-snug">
                    {s.caption}
                  </p>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Submitted {new Date(s.created_at).toLocaleDateString()}
                  </p>
                  {s.reviewer_notes && (
                    <p className="mt-2 text-xs italic text-muted-foreground border-l-2 border-scef-gold pl-3">
                      Reviewer note: {s.reviewer_notes}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageShell>
  );
};

export default MyMediaSubmissions;

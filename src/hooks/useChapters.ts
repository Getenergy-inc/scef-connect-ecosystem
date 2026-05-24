import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type ChapterRow = {
  id: string;
  name: string;
  slug: string;
  country: string;
  city: string | null;
  region: string | null;
  chapter_type: "online" | "hybrid" | "physical";
  status: "pending" | "active" | "suspended";
  description: string | null;
  image_url: string | null;
  member_count: number | null;
};

export function useChapters() {
  return useQuery({
    queryKey: ["chapters", "public"],
    queryFn: async (): Promise<ChapterRow[]> => {
      const { data, error } = await supabase
        .from("chapters")
        .select("id,name,slug,country,city,region,chapter_type,status,description,image_url,member_count")
        .eq("status", "active")
        .order("region", { ascending: true })
        .order("name", { ascending: true });
      if (error) throw error;
      return (data ?? []) as ChapterRow[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useChapterBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ["chapter", slug],
    enabled: !!slug,
    queryFn: async (): Promise<ChapterRow | null> => {
      const { data, error } = await supabase
        .from("chapters")
        .select("id,name,slug,country,city,region,chapter_type,status,description,image_url,member_count")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data as ChapterRow | null;
    },
  });
}

export const CHAPTER_TYPE_LABEL: Record<ChapterRow["chapter_type"], "Online" | "Hybrid" | "Physical"> = {
  online: "Online",
  hybrid: "Hybrid",
  physical: "Physical",
};

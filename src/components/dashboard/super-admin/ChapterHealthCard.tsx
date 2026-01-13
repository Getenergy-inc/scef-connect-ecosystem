import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChapterHealth {
  name: string;
  status: "good" | "fair" | "poor";
  members: number;
  country?: string;
}

interface ChapterHealthCardProps {
  chapters: ChapterHealth[];
  isLoading?: boolean;
}

const statusColors: Record<string, { text: string; dot: string }> = {
  good: { text: "text-green-600", dot: "bg-green-500" },
  fair: { text: "text-amber-500", dot: "bg-amber-500" },
  poor: { text: "text-red-500", dot: "bg-red-500" }
};

const defaultChapters: ChapterHealth[] = [];

export function ChapterHealthCard({ chapters = defaultChapters, isLoading = false }: ChapterHealthCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Chapter Health</CardTitle>
          <span className="text-sm text-muted-foreground">Members</span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-2 h-2 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            ))
          ) : chapters.length > 0 ? (
            chapters.slice(0, 5).map((chapter) => (
              <div key={chapter.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${statusColors[chapter.status].dot}`} />
                  <span className="text-sm font-medium text-foreground">{chapter.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-medium capitalize ${statusColors[chapter.status].text}`}>
                    {chapter.status.charAt(0).toUpperCase() + chapter.status.slice(1)}
                  </span>
                  <span className="text-sm text-muted-foreground w-12 text-right">{chapter.members}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">No chapters available</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

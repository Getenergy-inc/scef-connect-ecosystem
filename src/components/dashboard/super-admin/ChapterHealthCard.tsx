import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChapterHealth {
  name: string;
  status: "good" | "fair" | "poor";
  members: number;
}

interface ChapterHealthCardProps {
  chapters: ChapterHealth[];
}

const statusColors: Record<string, { text: string; dot: string }> = {
  good: { text: "text-green-600", dot: "bg-green-500" },
  fair: { text: "text-amber-500", dot: "bg-amber-500" },
  poor: { text: "text-red-500", dot: "bg-red-500" }
};

const defaultChapters: ChapterHealth[] = [
  { name: "Eritrean Diaspora", status: "good", members: 120 },
  { name: "Lagos", status: "fair", members: 210 },
  { name: "Nairobi", status: "fair", members: 186 },
  { name: "Pretoria", status: "good", members: 135 },
  { name: "Accra", status: "good", members: 98 },
  { name: "Johannesburg", status: "poor", members: 45 }
];

export function ChapterHealthCard({ chapters = defaultChapters }: ChapterHealthCardProps) {
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
          {chapters.slice(0, 5).map((chapter) => (
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

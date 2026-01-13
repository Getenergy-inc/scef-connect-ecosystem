import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChaptersDataPoint {
  month: string;
  chapters: number;
}

interface ChaptersOverviewChartProps {
  data?: ChaptersDataPoint[];
  activeChapters: number;
  totalChapters: number;
}

const defaultData: ChaptersDataPoint[] = [
  { month: "Jan", chapters: 8 },
  { month: "Feb", chapters: 10 },
  { month: "Mar", chapters: 12 },
  { month: "May", chapters: 18 },
  { month: "Sep", chapters: 25 },
  { month: "Oct", chapters: 32 },
  { month: "Nov", chapters: 38 },
  { month: "Dec", chapters: 44 }
];

export function ChaptersOverviewChart({ 
  data = defaultData, 
  activeChapters = 44, 
  totalChapters = 57 
}: ChaptersOverviewChartProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Active Chapters</CardTitle>
          <div className="text-right">
            <span className="text-2xl font-bold text-foreground">{activeChapters}</span>
            <span className="text-muted-foreground"> / {totalChapters}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="chaptersGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="chapters" 
                stroke="#1e3a5f" 
                strokeWidth={2}
                fill="url(#chaptersGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

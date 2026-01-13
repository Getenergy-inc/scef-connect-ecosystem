import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ChartDataPoint {
  month: string;
  donations: number;
  disbursements: number;
}

interface DonationsDisbursementsChartProps {
  data: ChartDataPoint[];
}

const defaultData: ChartDataPoint[] = [
  { month: "Nov", donations: 45000, disbursements: 30000 },
  { month: "Dec", donations: 52000, disbursements: 38000 },
  { month: "Jan", donations: 78000, disbursements: 55000 },
  { month: "Feb", donations: 95000, disbursements: 72000 },
  { month: "Mar", donations: 110000, disbursements: 85000 },
  { month: "Apr", donations: 88000, disbursements: 92000 },
  { month: "May", donations: 125000, disbursements: 105000 },
  { month: "Jun", donations: 145000, disbursements: 118000 },
  { month: "Jul", donations: 138000, disbursements: 130000 }
];

export function DonationsDisbursementsChart({ data = defaultData }: DonationsDisbursementsChartProps) {
  const formatYAxis = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}k`;
    }
    return String(value);
  };

  const formatTooltip = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Donations & Disbursements</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickFormatter={formatYAxis}
              />
              <Tooltip 
                formatter={formatTooltip}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Legend 
                iconType="circle" 
                iconSize={8}
                wrapperStyle={{ paddingTop: '10px' }}
              />
              <Line 
                type="monotone" 
                dataKey="donations" 
                name="Donations"
                stroke="#f97316" 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="disbursements" 
                name="Disbursements"
                stroke="#1e3a5f" 
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

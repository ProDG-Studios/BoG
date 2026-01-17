import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ChannelMixChartProps {
  data: {
    bank: number;
    mmo: number;
    cash: number;
    digital: number;
  };
}

const COLORS = [
  'hsl(222, 47%, 25%)',   // Bank - Primary
  'hsl(45, 93%, 58%)',    // MMO - Accent gold
  'hsl(220, 9%, 46%)',    // Cash - Muted
  'hsl(199, 89%, 48%)',   // Digital - Info blue
];

export function ChannelMixChart({ data }: ChannelMixChartProps) {
  const chartData = [
    { name: 'Bank', value: data.bank },
    { name: 'Mobile Money', value: data.mmo },
    { name: 'Cash', value: data.cash },
    { name: 'Digital Asset', value: data.digital },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Share']}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

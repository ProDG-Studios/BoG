import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus, DollarSign, Activity, Users } from 'lucide-react';
import { fxMarketSegments, vwapTrend, sectoralFlows } from '@/data/fxMarketData';

const COLORS = ['hsl(45, 93%, 58%)', 'hsl(222, 47%, 35%)', 'hsl(199, 89%, 48%)', 'hsl(142, 71%, 45%)', 'hsl(280, 65%, 60%)', 'hsl(25, 95%, 53%)'];

export function FXMarketSegments() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  // Transform segment data for chart
  const segmentChartData = fxMarketSegments.map(s => ({
    name: s.segment.split(' ')[0],
    value: s.weeklyValue / 1000000,
    spread: s.spreadBps,
  }));

  return (
    <div className="space-y-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/30">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-accent-foreground" />
            <span className="text-xs text-muted-foreground">Weekly Volume</span>
          </div>
          <p className="text-2xl font-bold">$427M</p>
          <p className="text-xs text-success flex items-center gap-1 mt-1">
            <TrendingUp size={12} /> +5.2% vs last week
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">VWAP Rate</span>
          </div>
          <p className="text-2xl font-bold">12.42</p>
          <p className="text-xs text-muted-foreground mt-1">USD/GHS</p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Avg Spread</span>
          </div>
          <p className="text-2xl font-bold">85 bps</p>
          <p className="text-xs text-success flex items-center gap-1 mt-1">
            <TrendingDown size={12} /> -12 bps
          </p>
        </div>
        <div className="p-4 rounded-lg bg-muted/50 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Participants</span>
          </div>
          <p className="text-2xl font-bold">84</p>
          <p className="text-xs text-muted-foreground mt-1">Active this week</p>
        </div>
      </div>

      {/* VWAP Trend Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="text-sm font-semibold mb-4">VWAP Rate Trend (7 Days)</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vwapTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis 
                  domain={[12.3, 12.5]} 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={11}
                  tickFormatter={(v) => v.toFixed(2)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [value.toFixed(4), 'VWAP']}
                />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="hsl(45, 93%, 58%)" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(45, 93%, 58%)', strokeWidth: 0, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Segment Volume Chart */}
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="text-sm font-semibold mb-4">Weekly Volume by Segment ($M)</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={10}
                  width={70}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`$${value.toFixed(1)}M`, 'Volume']}
                />
                <Bar dataKey="value" fill="hsl(222, 47%, 35%)" radius={[0, 4, 4, 0]}>
                  {segmentChartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sectoral Flows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inflows */}
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success" />
            FX Inflows by Sector
          </h4>
          <div className="flex gap-4">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectoralFlows.inflows}
                    dataKey="value"
                    nameKey="sector"
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={50}
                  >
                    {sectoralFlows.inflows.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {sectoralFlows.inflows.map((flow, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-muted-foreground">{flow.sector}</span>
                  </div>
                  <span className="font-medium">{flow.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outflows */}
        <div className="p-4 rounded-lg border border-border bg-card">
          <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-destructive" />
            FX Outflows by Sector
          </h4>
          <div className="flex gap-4">
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectoralFlows.outflows}
                    dataKey="value"
                    nameKey="sector"
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={50}
                  >
                    {sectoralFlows.outflows.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {sectoralFlows.outflows.map((flow, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span className="text-muted-foreground">{flow.sector}</span>
                  </div>
                  <span className="font-medium">{flow.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Segments Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-2 border-b border-border">
          <h4 className="text-sm font-semibold">FX Market Segments Detail</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-4 py-2 font-medium text-muted-foreground">Segment</th>
                <th className="text-right px-4 py-2 font-medium text-muted-foreground">Weekly Vol</th>
                <th className="text-right px-4 py-2 font-medium text-muted-foreground">Weekly Value</th>
                <th className="text-right px-4 py-2 font-medium text-muted-foreground">VWAP</th>
                <th className="text-right px-4 py-2 font-medium text-muted-foreground">Spread</th>
                <th className="text-center px-4 py-2 font-medium text-muted-foreground">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {fxMarketSegments.map((segment, idx) => (
                <tr key={idx} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium">{segment.segment}</p>
                      <p className="text-xs text-muted-foreground">{segment.participantCount} participants</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">{segment.weeklyVolume.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-medium">{formatCurrency(segment.weeklyValue)}</td>
                  <td className="px-4 py-3 text-right">{segment.vwapRate.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right">{segment.spreadBps} bps</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {getTrendIcon(segment.trend)}
                      <span className={`text-xs ${getTrendColor(segment.trend)}`}>
                        {segment.changePercent > 0 ? '+' : ''}{segment.changePercent}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FXMarketSegments;

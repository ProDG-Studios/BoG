import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Zap, TrendingUp, Globe } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { corridorData } from '@/data/mockData';

const COLORS = {
  bank: 'hsl(222, 47%, 25%)',
  mmo: 'hsl(45, 93%, 58%)',
  cash: 'hsl(220, 9%, 46%)',
  digital: 'hsl(199, 89%, 48%)',
};

export function CorridorsPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const chartData = corridorData.map(c => ({
    name: c.corridor,
    value: c.totalValue / 1000000,
  })).sort((a, b) => b.value - a.value);

  const totalDigitalRailValue = corridorData.reduce((sum, c) => 
    sum + (c.totalValue * c.emergingRailPercent / 100), 0
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Corridors & Channels</h1>
        <p className="text-muted-foreground mt-1">
          Supervisory visibility across current and emerging remittance rails
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="dashboard-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Corridors</p>
              <p className="text-2xl font-bold">{corridorData.length}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Source countries with active remittance flows
          </p>
        </div>

        <div className="dashboard-card p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Top Corridor</p>
              <p className="text-2xl font-bold">US-GH</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {formatCurrency(corridorData[0].totalValue)} in inflows
          </p>
        </div>

        <div className="dashboard-card p-5 border-l-4 border-l-info">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Digital Asset Rails</p>
              <p className="text-2xl font-bold">{formatCurrency(totalDigitalRailValue)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Emerging rails including stablecoin settlements
          </p>
        </div>
      </div>

      {/* Corridor Chart and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="dashboard-card p-6">
          <h3 className="module-header mb-4">Inflow by Corridor (USD Millions)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))" 
                  fontSize={12}
                  width={60}
                />
                <Tooltip
                  formatter={(value: number) => [`$${value.toFixed(1)}M`, 'Inflows']}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="value" fill="hsl(222, 47%, 25%)" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? 'hsl(45, 93%, 58%)' : 'hsl(222, 47%, 25%)'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Mix Legend */}
        <div className="dashboard-card p-6">
          <h3 className="module-header mb-4">Channel Mix by Corridor</h3>
          <div className="space-y-4">
            {corridorData.slice(0, 5).map((corridor) => (
              <div key={corridor.corridor} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{corridor.corridor}</span>
                  <span className="text-sm text-muted-foreground">{corridor.origin}</span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden">
                  <div 
                    className="transition-all duration-500"
                    style={{ width: `${corridor.channelMix.bank}%`, backgroundColor: COLORS.bank }}
                    title={`Bank: ${corridor.channelMix.bank}%`}
                  />
                  <div 
                    className="transition-all duration-500"
                    style={{ width: `${corridor.channelMix.mmo}%`, backgroundColor: COLORS.mmo }}
                    title={`MMO: ${corridor.channelMix.mmo}%`}
                  />
                  <div 
                    className="transition-all duration-500"
                    style={{ width: `${corridor.channelMix.cash}%`, backgroundColor: COLORS.cash }}
                    title={`Cash: ${corridor.channelMix.cash}%`}
                  />
                  <div 
                    className="transition-all duration-500"
                    style={{ width: `${corridor.channelMix.digital}%`, backgroundColor: COLORS.digital }}
                    title={`Digital: ${corridor.channelMix.digital}%`}
                  />
                </div>
              </div>
            ))}
            {/* Legend */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-border mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.bank }} />
                <span className="text-sm">Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.mmo }} />
                <span className="text-sm">Mobile Money</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.cash }} />
                <span className="text-sm">Cash</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS.digital }} />
                <span className="text-sm">Digital Asset</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="dashboard-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="module-header">Corridor Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="data-table-header">
                <TableHead>Corridor</TableHead>
                <TableHead>Origin Country</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead className="text-right">Avg FX Rate</TableHead>
                <TableHead>Emerging Rail %</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {corridorData.map((corridor) => (
                <TableRow key={corridor.corridor} className="hover:bg-muted/50">
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-sm font-medium">
                      {corridor.corridor}
                    </span>
                  </TableCell>
                  <TableCell>{corridor.origin}</TableCell>
                  <TableCell className="text-right">{corridor.totalVolume.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(corridor.totalValue)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {corridor.avgFxRate.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={corridor.emergingRailPercent} className="w-16 h-2" />
                      <span className={`text-sm ${corridor.emergingRailPercent > 10 ? 'text-info font-medium' : 'text-muted-foreground'}`}>
                        {corridor.emergingRailPercent}%
                        {corridor.emergingRailPercent > 10 && ' ⚡'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="status-success">Active</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default CorridorsPage;

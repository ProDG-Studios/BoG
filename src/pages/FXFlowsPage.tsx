import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, Minus, Eye, ChevronRight, Filter, Calendar, Download, Layers, PieChart, BarChart3, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AreaChart, Area, BarChart, Bar, PieChart as RechartsPie, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line
} from 'recharts';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { LiveIndicator } from '@/components/dashboard/LiveIndicator';
import { 
  fxFlowSegments, 
  dailyFlowBreakdown,
  segmentComposition,
  getTotalInflows,
  getTotalOutflows,
  getNetPosition,
  getInflowSegments,
  getOutflowSegments,
  FXFlowSegment
} from '@/data/fxFlowsData';
import { cn } from '@/lib/utils';

const FXFlowsPage = () => {
  const [selectedSegment, setSelectedSegment] = useState<FXFlowSegment | null>(null);
  const [timeRange, setTimeRange] = useState('week');
  const [viewMode, setViewMode] = useState('overview');

  const formatCurrency = (value: number) => {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-400" />;
      default: return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string, change: number) => {
    if (trend === 'up') return 'text-emerald-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-muted-foreground';
  };

  const totalInflows = getTotalInflows();
  const totalOutflows = getTotalOutflows();
  const netPosition = getNetPosition();
  const inflowSegments = getInflowSegments();
  const outflowSegments = getOutflowSegments();

  // Prepare chart data
  const flowCompositionData = dailyFlowBreakdown.map(d => ({
    date: d.date,
    'Diaspora': d.diasporaInflows / 1000000,
    'FDI': d.fdiInflows / 1000000,
    'FPI': d.fpiInflows / 1000000,
    'Exports': d.exportReceipts / 1000000,
    'Services': d.servicesInflows / 1000000,
    'Imports': -(d.importPayments / 1000000),
    'Debt': -(d.debtService / 1000000),
    'Repatriation': -(d.dividendRepatriation / 1000000),
    netPosition: d.netPosition / 1000000
  }));

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))', 'hsl(var(--accent))'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        title="FX Flows Dashboard"
        subtitle="Comprehensive view of all FX segment flows - Inflows, Outflows & Net Position"
        actions={
          <div className="flex items-center gap-3">
            <LiveIndicator />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="ytd">Year to Date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        }
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Inflows</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{formatCurrency(totalInflows)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">+8.5%</span>
                  <span className="text-xs text-muted-foreground">vs last week</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <ArrowUpRight className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Outflows</p>
                <p className="text-2xl font-bold text-red-400 mt-1">{formatCurrency(totalOutflows)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <ArrowDownRight className="w-4 h-4 text-amber-400" />
                  <span className="text-sm text-amber-400">+2.1%</span>
                  <span className="text-xs text-muted-foreground">vs last week</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                <ArrowDownRight className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net FX Position</p>
                <p className={cn(
                  "text-2xl font-bold mt-1",
                  netPosition >= 0 ? "text-emerald-400" : "text-red-400"
                )}>{netPosition >= 0 ? '+' : ''}{formatCurrency(netPosition)}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400">Surplus</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Segments</p>
                <p className="text-2xl font-bold text-foreground mt-1">{fxFlowSegments.length}</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="text-sm text-muted-foreground">{inflowSegments.length} inflows, {outflowSegments.length} outflows</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Layers className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-6">
        <TabsList className="bg-card/50 border border-border/50 p-1">
          <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <PieChart className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="composition" className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <BarChart3 className="w-4 h-4" />
            Daily Composition
          </TabsTrigger>
          <TabsTrigger value="segments" className="gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Layers className="w-4 h-4" />
            All Segments
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inflows Pie Chart */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                  FX Inflows Composition
                </CardTitle>
                <CardDescription>Weekly breakdown by segment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={segmentComposition.inflows.breakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {segmentComposition.inflows.breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {segmentComposition.inflows.breakdown.map((item, idx) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-mono">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Outflows Pie Chart */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownRight className="w-5 h-5 text-red-400" />
                  FX Outflows Composition
                </CardTitle>
                <CardDescription>Weekly breakdown by payment type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie>
                      <Pie
                        data={segmentComposition.outflows.breakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {segmentComposition.outflows.breakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                      />
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {segmentComposition.outflows.breakdown.map((item, idx) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                        <span className="text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-mono">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Segments Quick View */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Inflow Segments */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Top Inflow Segments</CardTitle>
                <CardDescription>Click to drill down into any segment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {inflowSegments.slice(0, 5).map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => setSelectedSegment(segment)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-card/80 border border-border/30 hover:border-accent/50 transition-all group"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{segment.name}</span>
                        <Badge variant="outline" className="text-xs">{segment.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-muted-foreground">{formatCurrency(segment.weeklyValue)}/week</span>
                        <span className={cn("text-sm flex items-center gap-1", getTrendColor(segment.trend, segment.changePercent))}>
                          {getTrendIcon(segment.trend)}
                          {segment.changePercent > 0 ? '+' : ''}{segment.changePercent}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20">
                        <Progress value={segment.marketShare} className="h-2" />
                        <span className="text-xs text-muted-foreground">{segment.marketShare}% share</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Top Outflow Segments */}
            <Card className="glass-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Top Outflow Segments</CardTitle>
                <CardDescription>Click to drill down into any segment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {outflowSegments.slice(0, 5).map((segment) => (
                  <button
                    key={segment.id}
                    onClick={() => setSelectedSegment(segment)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-card/80 border border-border/30 hover:border-accent/50 transition-all group"
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{segment.name}</span>
                        <Badge variant="outline" className="text-xs">{segment.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-muted-foreground">{formatCurrency(segment.weeklyValue)}/week</span>
                        <span className={cn("text-sm flex items-center gap-1", getTrendColor(segment.trend, segment.changePercent))}>
                          {getTrendIcon(segment.trend)}
                          {segment.changePercent > 0 ? '+' : ''}{segment.changePercent}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20">
                        <Progress value={segment.marketShare} className="h-2" />
                        <span className="text-xs text-muted-foreground">{segment.marketShare}% share</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Daily Composition Tab */}
        <TabsContent value="composition" className="space-y-6">
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle>Daily FX Flow Composition</CardTitle>
              <CardDescription>Stacked view of all inflow and outflow segments by day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={flowCompositionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                      formatter={(value: number) => [`$${Math.abs(value).toFixed(1)}M`, '']}
                    />
                    <Legend />
                    {/* Inflows (positive) */}
                    <Bar dataKey="Diaspora" stackId="inflows" fill="hsl(var(--chart-1))" name="Diaspora" />
                    <Bar dataKey="FDI" stackId="inflows" fill="hsl(var(--chart-2))" name="FDI" />
                    <Bar dataKey="FPI" stackId="inflows" fill="hsl(var(--chart-3))" name="FPI" />
                    <Bar dataKey="Exports" stackId="inflows" fill="hsl(var(--chart-4))" name="Exports" />
                    <Bar dataKey="Services" stackId="inflows" fill="hsl(var(--chart-5))" name="Services" />
                    {/* Outflows (negative) */}
                    <Bar dataKey="Imports" stackId="outflows" fill="hsl(var(--destructive))" name="Imports" />
                    <Bar dataKey="Debt" stackId="outflows" fill="hsl(212, 60%, 40%)" name="Debt Service" />
                    <Bar dataKey="Repatriation" stackId="outflows" fill="hsl(280, 60%, 40%)" name="Repatriation" />
                    {/* Net Position Line */}
                    <Line type="monotone" dataKey="netPosition" stroke="hsl(var(--accent))" strokeWidth={3} dot={{ fill: 'hsl(var(--accent))' }} name="Net Position" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Net Position Trend */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle>Net FX Position Trend</CardTitle>
              <CardDescription>Daily surplus/deficit position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={flowCompositionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `$${v}M`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                      formatter={(value: number) => [`$${value.toFixed(1)}M`, 'Net Position']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="netPosition" 
                      stroke="hsl(var(--accent))" 
                      fill="hsl(var(--accent))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* All Segments Tab */}
        <TabsContent value="segments" className="space-y-6">
          <Card className="glass-card border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All FX Segments</CardTitle>
                  <CardDescription>Complete breakdown of all monitored FX flow segments</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="text-muted-foreground">Segment</TableHead>
                    <TableHead className="text-muted-foreground">Type</TableHead>
                    <TableHead className="text-right text-muted-foreground">Daily Value</TableHead>
                    <TableHead className="text-right text-muted-foreground">Weekly Value</TableHead>
                    <TableHead className="text-right text-muted-foreground">Market Share</TableHead>
                    <TableHead className="text-center text-muted-foreground">Trend</TableHead>
                    <TableHead className="text-center text-muted-foreground">Data Quality</TableHead>
                    <TableHead className="text-center text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fxFlowSegments.map((segment) => (
                    <TableRow 
                      key={segment.id} 
                      className="border-border/30 hover:bg-card/50 cursor-pointer"
                      onClick={() => setSelectedSegment(segment)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {segment.category === 'inflow' ? (
                            <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-400" />
                          )}
                          <div>
                            <div className="font-medium">{segment.name}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">{segment.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">{segment.type}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono">{formatCurrency(segment.dailyValue)}</TableCell>
                      <TableCell className="text-right font-mono">{formatCurrency(segment.weeklyValue)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Progress value={segment.marketShare} className="w-16 h-2" />
                          <span className="text-sm">{segment.marketShare}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className={cn("flex items-center justify-center gap-1", getTrendColor(segment.trend, segment.changePercent))}>
                          {getTrendIcon(segment.trend)}
                          <span className="text-sm">{segment.changePercent > 0 ? '+' : ''}{segment.changePercent}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs",
                            segment.dataQuality === 'High' && "border-emerald-500/50 text-emerald-400",
                            segment.dataQuality === 'Medium' && "border-amber-500/50 text-amber-400",
                            segment.dataQuality === 'Low' && "border-red-500/50 text-red-400"
                          )}
                        >
                          {segment.dataQuality}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye className="w-4 h-4" />
                          Drill Down
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Segment Drill-Down Modal/Drawer */}
      {selectedSegment && (
        <Card className="glass-card border-accent/50 border-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {selectedSegment.category === 'inflow' ? (
                  <ArrowUpRight className="w-5 h-5 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-red-400" />
                )}
                {selectedSegment.name} - Drill Down
              </CardTitle>
              <CardDescription>{selectedSegment.description}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setSelectedSegment(null)}>
              Close
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                <p className="text-sm text-muted-foreground">Daily Volume</p>
                <p className="text-xl font-bold">{selectedSegment.dailyVolume.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                <p className="text-sm text-muted-foreground">Daily Value</p>
                <p className="text-xl font-bold">{formatCurrency(selectedSegment.dailyValue)}</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                <p className="text-sm text-muted-foreground">YTD Value</p>
                <p className="text-xl font-bold">{formatCurrency(selectedSegment.ytdValue)}</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                <p className="text-sm text-muted-foreground">Compliance Score</p>
                <p className="text-xl font-bold">{selectedSegment.complianceScore}%</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                <p className="text-sm text-muted-foreground">Avg Rate</p>
                <p className="text-xl font-bold font-mono">{selectedSegment.averageRate.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-xl font-bold">{selectedSegment.participantCount}</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                <p className="text-sm text-muted-foreground">Reporting</p>
                <p className="text-xl font-bold">{selectedSegment.reportingFrequency}</p>
              </div>
              <div className="p-4 rounded-lg bg-card/50 border border-border/30">
                <p className="text-sm text-muted-foreground">Data Quality</p>
                <Badge 
                  className={cn(
                    selectedSegment.dataQuality === 'High' && "bg-emerald-500/20 text-emerald-400",
                    selectedSegment.dataQuality === 'Medium' && "bg-amber-500/20 text-amber-400",
                    selectedSegment.dataQuality === 'Low' && "bg-red-500/20 text-red-400"
                  )}
                >
                  {selectedSegment.dataQuality}
                </Badge>
              </div>
            </div>
            {selectedSegment.name === 'Diaspora Remittances' && (
              <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/30">
                <p className="text-sm font-medium text-accent">💡 This segment has detailed corridor and channel data</p>
                <p className="text-sm text-muted-foreground mt-1">Navigate to Corridors & Channels for full remittance drill-down analysis.</p>
                <Button variant="outline" size="sm" className="mt-3 gap-2" onClick={() => window.location.href = '/corridors'}>
                  View Remittance Details <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FXFlowsPage;

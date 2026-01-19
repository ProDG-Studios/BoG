import { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ReferenceLine, ComposedChart, Bar, Area, AreaChart
} from 'recharts';
import { 
  Shield, TrendingUp, TrendingDown, Activity, AlertTriangle, 
  Gauge, Eye, Zap, MessageCircle, ChevronRight, ArrowUp, ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { priceDiscoveryTrend, marketActivitySummary, priceDiscoverySummary } from '@/data/fxTransparencyData';

// FX Stability Assessment Types
type StabilityStatus = 'Stable' | 'Watch' | 'Stress';

interface StabilityMetric {
  score: number;
  status: StabilityStatus;
  volatility7d: number;
  volatility30d: number;
  spreadToParallel: number;
  volumeTrend: number;
}

interface TopDriver {
  id: string;
  message: string;
  impact: 'positive' | 'negative' | 'neutral';
  metric: string;
  change: string;
}

// Calculate stability score based on volatility and spread
const calculateStability = (): StabilityMetric => {
  const volatility7d = priceDiscoverySummary.avgVolatility;
  const volatility30d = 0.85; // simulated
  const spreadToParallel = priceDiscoverySummary.parallelSpread;
  const volumeTrend = marketActivitySummary.volumeGrowth;

  // Score calculation (0-100)
  let score = 100;
  score -= volatility7d * 20; // Lower score if volatile
  score -= spreadToParallel * 5; // Lower score if parallel spread is high
  score += volumeTrend * 0.5; // Higher score if volume growing

  score = Math.max(0, Math.min(100, score));

  let status: StabilityStatus = 'Stable';
  if (score < 40) status = 'Stress';
  else if (score < 70) status = 'Watch';

  return { score, status, volatility7d, volatility30d, spreadToParallel, volumeTrend };
};

// Generate auto-insights (simulating rule-based or LLM analysis)
const generateTopDrivers = (): TopDriver[] => {
  return [
    {
      id: '1',
      message: 'Remittance volumes up 8.5% WoW driven by US corridor',
      impact: 'positive',
      metric: 'Volume',
      change: '+8.5%',
    },
    {
      id: '2',
      message: 'Parallel spread compressed 18bps as formal flows increase',
      impact: 'positive',
      metric: 'Spread',
      change: '-18 bps',
    },
    {
      id: '3',
      message: 'Top 5 concentration decreased to 52% indicating broader participation',
      impact: 'positive',
      metric: 'Concentration',
      change: '-6%',
    },
    {
      id: '4',
      message: 'IMTO settlement delays in UK corridor flagged (avg T+2)',
      impact: 'negative',
      metric: 'Settlement',
      change: '+0.5 days',
    },
    {
      id: '5',
      message: 'Intraday volatility stable at 0.5% within acceptable band',
      impact: 'neutral',
      metric: 'Volatility',
      change: '0.5%',
    },
  ];
};

export function FXStabilityCockpit() {
  const [showExplainer, setShowExplainer] = useState(false);
  const stability = calculateStability();
  const topDrivers = generateTopDrivers();

  const getStatusColor = (status: StabilityStatus) => {
    switch (status) {
      case 'Stable': return 'bg-success text-success-foreground';
      case 'Watch': return 'bg-warning text-warning-foreground';
      case 'Stress': return 'bg-destructive text-destructive-foreground';
    }
  };

  const getStatusGlow = (status: StabilityStatus) => {
    switch (status) {
      case 'Stable': return 'shadow-[0_0_30px_rgba(34,197,94,0.4)]';
      case 'Watch': return 'shadow-[0_0_30px_rgba(245,158,11,0.4)]';
      case 'Stress': return 'shadow-[0_0_30px_rgba(239,68,68,0.4)]';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Governor Headline - 10 second answer */}
      <div className="dashboard-card p-6 border-l-4 border-l-accent">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Stability Score */}
          <div className="flex items-center gap-6">
            <div className={`relative w-24 h-24 rounded-2xl flex flex-col items-center justify-center ${getStatusColor(stability.status)} ${getStatusGlow(stability.status)}`}>
              <Gauge className="w-6 h-6 mb-1" />
              <span className="text-2xl font-bold">{stability.status}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">FX Market is {stability.status}</h2>
              <p className="text-muted-foreground">
                {stability.status === 'Stable' && 'Markets operating within acceptable parameters. No intervention required.'}
                {stability.status === 'Watch' && 'Elevated volatility detected. Enhanced monitoring recommended.'}
                {stability.status === 'Stress' && 'Significant stress indicators. Intervention consideration required.'}
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 gap-2 text-accent"
                onClick={() => setShowExplainer(!showExplainer)}
              >
                <MessageCircle size={14} />
                {showExplainer ? 'Hide' : 'Explain this'}
              </Button>
            </div>
          </div>

          {/* Key Numbers */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Official VWAP</p>
              <p className="text-xl font-bold font-mono">{priceDiscoverySummary.currentVwap.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">USD/GHS</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Parallel Rate</p>
              <p className="text-xl font-bold font-mono text-destructive">
                {(priceDiscoverySummary.currentVwap * (1 + priceDiscoverySummary.parallelSpread / 100)).toFixed(2)}
              </p>
              <p className="text-xs text-destructive">+{priceDiscoverySummary.parallelSpread}% spread</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">7d Volatility</p>
              <p className="text-xl font-bold font-mono">{stability.volatility7d}%</p>
              <p className="text-xs text-success">Within band</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Weekly Volume</p>
              <p className="text-xl font-bold font-mono">{formatCurrency(marketActivitySummary.weeklyVolume)}</p>
              <p className="text-xs text-success">+{marketActivitySummary.volumeGrowth}%</p>
            </div>
          </div>
        </div>

        {/* Explainer Panel (auto-generated narrative) */}
        {showExplainer && (
          <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Eye size={16} className="text-accent" />
              Auto-Generated Market Narrative
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The FX market is currently <strong>{stability.status.toLowerCase()}</strong> with a stability score of <strong>{stability.score.toFixed(0)}</strong>. 
              The official VWAP rate of <strong>{priceDiscoverySummary.currentVwap.toFixed(2)} GHS/USD</strong> shows convergence with parallel markets, 
              with the spread narrowing to <strong>{priceDiscoverySummary.parallelSpread}%</strong> (down {Math.abs(priceDiscoverySummary.spreadCompression)} bps WoW). 
              Weekly trading volume reached <strong>{formatCurrency(marketActivitySummary.weeklyVolume)}</strong> across <strong>{marketActivitySummary.weeklyTrades.toLocaleString()}</strong> trades, 
              representing <strong>+{marketActivitySummary.volumeGrowth}%</strong> week-on-week growth. Intraday volatility remains contained at <strong>{priceDiscoverySummary.avgVolatility}%</strong>, 
              well within the 2% threshold. Diaspora remittances continue to be the primary FX supply source at 42% of total flows.
            </p>
          </div>
        )}
      </div>

      {/* Official vs Parallel Rate Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 dashboard-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Official vs Parallel Rate Trend</h3>
                <p className="text-xs text-muted-foreground">7-day rate convergence tracking</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-success">
                <TrendingDown size={14} />
                Spread narrowing
              </span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceDiscoveryTrend}>
                <defs>
                  <linearGradient id="colorVwap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(45, 93%, 58%)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(45, 93%, 58%)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis 
                  domain={[12.2, 13.0]} 
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
                />
                <ReferenceLine y={priceDiscoverySummary.currentVwap} stroke="hsl(45, 93%, 58%)" strokeDasharray="5 5" />
                <Area 
                  type="monotone" 
                  dataKey="vwap" 
                  stroke="hsl(45, 93%, 58%)" 
                  strokeWidth={3}
                  fill="url(#colorVwap)" 
                  name="Official VWAP"
                />
                <Line 
                  type="monotone" 
                  dataKey="parallelRate" 
                  stroke="hsl(0, 84%, 60%)" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={{ r: 3 }}
                  name="Parallel Rate"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Buy/Sell Band Indicator */}
          <div className="mt-4 p-3 rounded-lg bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Buy/Sell Band:</span>
              <span className="font-mono font-bold text-success">{priceDiscoverySummary.weeklyLow.toFixed(2)}</span>
              <span className="text-muted-foreground">—</span>
              <span className="font-mono font-bold text-success">{priceDiscoverySummary.weeklyHigh.toFixed(2)}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Intraday Range: </span>
              <span className="font-mono">{(priceDiscoverySummary.weeklyHigh - priceDiscoverySummary.weeklyLow).toFixed(2)} GHS</span>
            </div>
          </div>
        </div>

        {/* Top Drivers - Auto-generated bullets */}
        <div className="dashboard-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-5 h-5 text-accent" />
            <div>
              <h3 className="font-semibold">Top Drivers</h3>
              <p className="text-xs text-muted-foreground">Auto-generated insights</p>
            </div>
          </div>

          <div className="space-y-3">
            {topDrivers.map((driver) => (
              <div 
                key={driver.id}
                className={`p-3 rounded-lg border ${
                  driver.impact === 'positive' ? 'bg-success/5 border-success/20' :
                  driver.impact === 'negative' ? 'bg-destructive/5 border-destructive/20' :
                  'bg-muted/30 border-border'
                }`}
              >
                <div className="flex items-start gap-2">
                  {driver.impact === 'positive' && <ArrowUp className="w-4 h-4 text-success mt-0.5" />}
                  {driver.impact === 'negative' && <ArrowDown className="w-4 h-4 text-destructive mt-0.5" />}
                  {driver.impact === 'neutral' && <ChevronRight className="w-4 h-4 text-muted-foreground mt-0.5" />}
                  <div>
                    <p className="text-sm leading-snug">{driver.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        {driver.metric}
                      </span>
                      <span className={`text-xs font-mono font-bold ${
                        driver.impact === 'positive' ? 'text-success' :
                        driver.impact === 'negative' ? 'text-destructive' :
                        'text-muted-foreground'
                      }`}>
                        {driver.change}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="dashboard-card p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Today's Volume</p>
          <p className="text-lg font-bold">{formatCurrency(35800000)}</p>
          <p className="text-xs text-success">+12.3% vs yesterday</p>
        </div>
        <div className="dashboard-card p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Week-to-Date</p>
          <p className="text-lg font-bold">{formatCurrency(marketActivitySummary.weeklyVolume)}</p>
          <p className="text-xs text-muted-foreground">{marketActivitySummary.weeklyTrades.toLocaleString()} trades</p>
        </div>
        <div className="dashboard-card p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">30d Volatility</p>
          <p className="text-lg font-bold">{stability.volatility30d}%</p>
          <p className="text-xs text-success">Below threshold</p>
        </div>
        <div className="dashboard-card p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Spread Δ (WoW)</p>
          <p className="text-lg font-bold text-success">{priceDiscoverySummary.spreadCompression} bps</p>
          <p className="text-xs text-success">Compressing</p>
        </div>
        <div className="dashboard-card p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Formal Share</p>
          <p className="text-lg font-bold">78%</p>
          <p className="text-xs text-success">↑ from 72%</p>
        </div>
        <div className="dashboard-card p-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Intervention</p>
          <p className="text-lg font-bold text-success">None</p>
          <p className="text-xs text-muted-foreground">Not required</p>
        </div>
      </div>

      {/* Demo Cue Footer */}
      <div className="p-4 rounded-lg bg-accent/10 border border-accent/30 text-center">
        <p className="text-sm text-accent font-medium">
          🎯 Governor View: "In 10 seconds — Stable/Not Stable + Why"
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          This cockpit answers: "Is FX stable today?" before any drill-down.
        </p>
      </div>
    </div>
  );
}

export default FXStabilityCockpit;

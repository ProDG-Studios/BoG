import { 
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart,
  ReferenceLine
} from 'recharts';
import { 
  Activity, TrendingUp, TrendingDown, Minus, DollarSign, 
  Users, BarChart3, Shield, Zap, Target, Scale
} from 'lucide-react';
import {
  marketActivityTrend,
  marketActivitySummary,
  priceDiscoveryTrend,
  priceDiscoverySummary,
  flowComposition,
  confidenceIndicators,
  tradingWindowSummary,
} from '@/data/fxTransparencyData';

export function FXTransparencyLayers() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getTrendIcon = (trend: string, size = 14) => {
    switch (trend) {
      case 'up': return <TrendingUp size={size} className="text-success" />;
      case 'down': return <TrendingDown size={size} className="text-destructive" />;
      default: return <Minus size={size} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Layer 1: Market Activity - "Is this a real market or a thin illusion?" */}
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Market Activity Layer</h3>
            <p className="text-sm text-muted-foreground italic">Is this a real market or a thin illusion?</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Weekly Volume</p>
            <p className="text-xl font-bold">{formatCurrency(marketActivitySummary.weeklyVolume)}</p>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp size={10} /> +{marketActivitySummary.volumeGrowth}%
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Number of Trades</p>
            <p className="text-xl font-bold">{marketActivitySummary.weeklyTrades.toLocaleString()}</p>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp size={10} /> +{marketActivitySummary.tradeGrowth}%
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Avg Ticket Size</p>
            <p className="text-xl font-bold">{formatCurrency(marketActivitySummary.avgTicketSize)}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Top 5 Concentration</p>
            <p className="text-xl font-bold">{marketActivitySummary.concentrationIndex}%</p>
            <p className="text-xs text-muted-foreground mt-1">Market share</p>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={marketActivityTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis 
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))" 
                fontSize={11}
                tickFormatter={(v) => `$${(v/1000000).toFixed(0)}M`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))" 
                fontSize={11}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'dailyVolume') return [formatCurrency(value), 'Volume'];
                  if (name === 'numberOfTrades') return [value, 'Trades'];
                  return [value, name];
                }}
              />
              <Bar yAxisId="left" dataKey="dailyVolume" fill="hsl(222, 47%, 35%)" radius={[4, 4, 0, 0]} opacity={0.7} />
              <Line yAxisId="right" type="monotone" dataKey="numberOfTrades" stroke="hsl(45, 93%, 58%)" strokeWidth={2} dot={{ r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Layer 2: Price Discovery - "Is the market working?" */}
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
            <Scale className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Price Discovery Layer</h3>
            <p className="text-sm text-muted-foreground italic">Is the market working?</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
            <p className="text-xs text-muted-foreground mb-1">VWAP Rate</p>
            <p className="text-xl font-bold">{priceDiscoverySummary.currentVwap.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">USD/GHS</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">High-Low Band</p>
            <p className="text-xl font-bold">{priceDiscoverySummary.weeklyHigh.toFixed(2)} - {priceDiscoverySummary.weeklyLow.toFixed(2)}</p>
          </div>
          <div className="p-4 rounded-lg bg-muted/30 border border-border">
            <p className="text-xs text-muted-foreground mb-1">Intraday Volatility</p>
            <p className="text-xl font-bold">{priceDiscoverySummary.avgVolatility}%</p>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingDown size={10} /> Stable
            </p>
          </div>
          <div className="p-4 rounded-lg bg-success/10 border border-success/30">
            <p className="text-xs text-muted-foreground mb-1">Parallel Spread</p>
            <p className="text-xl font-bold text-success">{priceDiscoverySummary.parallelSpread}%</p>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingDown size={10} /> {Math.abs(priceDiscoverySummary.spreadCompression)} bps compression
            </p>
          </div>
        </div>

        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceDiscoveryTrend}>
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
              <ReferenceLine y={12.44} stroke="hsl(var(--accent))" strokeDasharray="5 5" label={{ value: 'VWAP', position: 'right', fontSize: 10 }} />
              <Area type="monotone" dataKey="high" stackId="1" stroke="transparent" fill="hsl(222, 47%, 35%)" fillOpacity={0.2} />
              <Area type="monotone" dataKey="low" stackId="2" stroke="transparent" fill="transparent" />
              <Line type="monotone" dataKey="vwap" stroke="hsl(45, 93%, 58%)" strokeWidth={2} dot={{ r: 3 }} name="Official VWAP" />
              <Line type="monotone" dataKey="parallelRate" stroke="hsl(0, 84%, 60%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="Parallel Rate" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-accent" />
            <span className="text-muted-foreground">Official VWAP</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-destructive" style={{ background: 'repeating-linear-gradient(90deg, hsl(0, 84%, 60%) 0, hsl(0, 84%, 60%) 4px, transparent 4px, transparent 8px)' }} />
            <span className="text-muted-foreground">Parallel Rate</span>
          </div>
        </div>
      </div>

      {/* Layer 3: Flow Composition - "Where is FX really coming from?" */}
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
            <Users className="w-5 h-5 text-info" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Flow Composition Layer</h3>
            <p className="text-sm text-muted-foreground italic">Where is FX really coming from?</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flowComposition.map((flow, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: flow.color }} />
                <span className="text-xs text-muted-foreground">{flow.category}</span>
              </div>
              <p className="text-3xl font-bold">{flow.percentage}%</p>
              <p className={`text-xs flex items-center gap-1 mt-1 ${flow.weeklyChange > 0 ? 'text-success' : 'text-destructive'}`}>
                {flow.weeklyChange > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {flow.weeklyChange > 0 ? '+' : ''}{flow.weeklyChange}% WoW
              </p>
            </div>
          ))}
        </div>

        {/* Stacked Bar Visualization */}
        <div className="mt-6 h-8 rounded-full overflow-hidden flex">
          {flowComposition.map((flow, idx) => (
            <div 
              key={idx}
              className="h-full transition-all duration-500 relative group"
              style={{ width: `${flow.percentage}%`, backgroundColor: flow.color }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-white drop-shadow-lg">{flow.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-3">
          {flowComposition.map((flow, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: flow.color }} />
              <span className="text-xs text-muted-foreground">{flow.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 4: Confidence Indicators - "Is the market gaining trust?" */}
      <div className="dashboard-card p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Confidence Indicators</h3>
            <p className="text-sm text-muted-foreground italic">Is the market gaining trust?</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {confidenceIndicators.map((indicator, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-lg border ${
                indicator.isPositive ? 'bg-success/5 border-success/30' : 'bg-destructive/5 border-destructive/30'
              }`}
            >
              <p className="text-xs text-muted-foreground mb-2">{indicator.metric}</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold">{indicator.currentValue}{indicator.unit}</p>
                {getTrendIcon(indicator.trend)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Previous: {indicator.previousValue}{indicator.unit}
              </p>
            </div>
          ))}
        </div>

        {/* Trading Window Summary */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <Zap size={14} className="text-accent" />
            EFEM/WBWS Trading Windows (Today)
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground">Morning Session</p>
              <p className="text-xs text-accent font-medium">{tradingWindowSummary.morningSession.window}</p>
              <p className="text-lg font-bold mt-1">{formatCurrency(tradingWindowSummary.morningSession.volume)}</p>
              <p className="text-xs text-muted-foreground">{tradingWindowSummary.morningSession.trades} trades @ {tradingWindowSummary.morningSession.vwap}</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border">
              <p className="text-xs text-muted-foreground">Afternoon Session</p>
              <p className="text-xs text-accent font-medium">{tradingWindowSummary.afternoonSession.window}</p>
              <p className="text-lg font-bold mt-1">{formatCurrency(tradingWindowSummary.afternoonSession.volume)}</p>
              <p className="text-xs text-muted-foreground">{tradingWindowSummary.afternoonSession.trades} trades @ {tradingWindowSummary.afternoonSession.vwap}</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/30">
              <p className="text-xs text-muted-foreground">Daily Total</p>
              <p className="text-xs text-accent font-medium">Combined</p>
              <p className="text-lg font-bold mt-1">{formatCurrency(tradingWindowSummary.totalDaily.volume)}</p>
              <p className="text-xs text-muted-foreground">{tradingWindowSummary.totalDaily.trades} trades @ {tradingWindowSummary.totalDaily.avgVwap}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Principle Footer */}
      <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border text-center">
        <p className="text-sm text-muted-foreground italic">
          "Transparency must stabilize the market, not spook it."
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Post-trade • Anonymized • Aggregated • No counterparty names
        </p>
      </div>
    </div>
  );
}

export default FXTransparencyLayers;

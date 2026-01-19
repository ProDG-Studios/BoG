import { useState } from 'react';
import { 
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart,
  ReferenceLine, PieChart, Pie
} from 'recharts';
import { 
  Activity, TrendingUp, TrendingDown, DollarSign, 
  Target, Shield, Zap, AlertTriangle, ArrowRight,
  BarChart3, Scale, Building, Landmark
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  nafemTurnoverData,
  rateAnalysisSummary,
  cbnInterventions,
  imtoPerformanceData,
  fxSupplySources,
  fxDemandCategories,
  transparencyMetrics,
  marketIntelligenceSummary,
  strategicRecommendations,
} from '@/data/nafemMarketData';

export function NAFEMDashboard() {
  const [activeSection, setActiveSection] = useState<'turnover' | 'imto' | 'supplydemand' | 'recommendations'>('turnover');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-destructive';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-8">
      {/* Market Intelligence Header */}
      <div className="dashboard-card p-6 border-l-4 border-l-accent">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Landmark className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Market Intelligence Dashboard</h2>
              <p className="text-sm text-muted-foreground">
                NAFEM-equivalent FX Market Analysis • Based on Central Bank Methodology
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-accent">{marketIntelligenceSummary.currentVWAP.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Current VWAP (USD/GHS)</div>
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold">{formatCurrency(marketIntelligenceSummary.weeklyTurnover)}</p>
            <p className="text-xs text-muted-foreground">Weekly Turnover</p>
            <p className="text-xs text-success">+{marketIntelligenceSummary.turnoverGrowth}% WoW</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{marketIntelligenceSummary.parallelPremium}%</p>
            <p className="text-xs text-muted-foreground">Parallel Premium</p>
            <p className="text-xs text-success">↓ {marketIntelligenceSummary.spreadCompression} bps YTD</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{marketIntelligenceSummary.formalMarketShare}%</p>
            <p className="text-xs text-muted-foreground">Formal Market Share</p>
            <p className="text-xs text-muted-foreground">Target: {marketIntelligenceSummary.targetFormalShare}%</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{marketIntelligenceSummary.remittanceShare}%</p>
            <p className="text-xs text-muted-foreground">Remittance Share</p>
            <p className="text-xs text-muted-foreground">of FX Supply</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{marketIntelligenceSummary.confidenceIndex}</p>
            <p className="text-xs text-muted-foreground">Confidence Index</p>
            <p className="text-xs text-success">↑ from {marketIntelligenceSummary.previousConfidenceIndex}</p>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'turnover', label: 'Turnover & Rates', icon: BarChart3 },
          { id: 'imto', label: 'IMTO Performance', icon: Building },
          { id: 'supplydemand', label: 'Supply & Demand', icon: Scale },
          { id: 'recommendations', label: 'Strategic Insights', icon: Target },
        ].map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveSection(section.id as typeof activeSection)}
            className="gap-2"
          >
            <section.icon size={14} />
            {section.label}
          </Button>
        ))}
      </div>

      {/* Section Content */}
      {activeSection === 'turnover' && (
        <div className="space-y-6">
          {/* Turnover Chart */}
          <div className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-5 h-5 text-primary" />
              <div>
                <h3 className="text-lg font-semibold">Weekly Market Turnover & Rate Analysis</h3>
                <p className="text-sm text-muted-foreground">Volume-weighted analysis with parallel rate tracking</p>
              </div>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={nafemTurnoverData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="weekEnding" stroke="hsl(var(--muted-foreground))" fontSize={11} />
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
                    domain={[12, 13.2]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number, name: string) => {
                      if (name === 'turnover') return [formatCurrency(value), 'Turnover'];
                      if (name === 'vwap') return [value.toFixed(2), 'VWAP Rate'];
                      if (name === 'parallelRate') return [value.toFixed(2), 'Parallel Rate'];
                      return [value, name];
                    }}
                  />
                  <Bar yAxisId="left" dataKey="turnover" fill="hsl(222, 47%, 30%)" radius={[4, 4, 0, 0]} opacity={0.8} />
                  <Line yAxisId="right" type="monotone" dataKey="vwap" stroke="hsl(45, 93%, 58%)" strokeWidth={3} dot={{ r: 4, fill: 'hsl(45, 93%, 58%)' }} />
                  <Line yAxisId="right" type="monotone" dataKey="parallelRate" stroke="hsl(0, 84%, 60%)" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-8 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[hsl(222,47%,30%)]" />
                <span className="text-muted-foreground">Weekly Turnover</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-accent rounded" />
                <span className="text-muted-foreground">Official VWAP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-destructive" style={{ background: 'repeating-linear-gradient(90deg, hsl(0, 84%, 60%) 0, hsl(0, 84%, 60%) 3px, transparent 3px, transparent 6px)' }} />
                <span className="text-muted-foreground">Parallel Rate</span>
              </div>
            </div>
          </div>

          {/* Rate Analysis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rateAnalysisSummary.slice(0, 6).map((item, idx) => (
              <div key={idx} className="dashboard-card p-4">
                <p className="text-xs text-muted-foreground mb-1">{item.metric}</p>
                <p className="text-2xl font-bold">{typeof item.value === 'number' ? item.value.toFixed(2) : item.value}</p>
                <p className="text-xs text-accent mt-1">{item.market}</p>
                <p className="text-xs text-muted-foreground mt-2 italic">{item.significance}</p>
              </div>
            ))}
          </div>

          {/* CBN Interventions */}
          <div className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Landmark className="w-5 h-5 text-info" />
              <h3 className="text-lg font-semibold">Central Bank Intervention Schedule</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cbnInterventions.map((intervention, idx) => (
                <div key={idx} className="p-4 rounded-lg bg-info/5 border border-info/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{intervention.date}</span>
                    <span className="text-xs px-2 py-1 rounded bg-info/20 text-info">{intervention.type}</span>
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(intervention.amount)}</p>
                  <p className="text-sm text-muted-foreground">@ {intervention.rate.toFixed(2)}</p>
                  <p className="text-xs text-success mt-2">Impact: {intervention.impactBps} bps</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'imto' && (
        <div className="space-y-6">
          {/* IMTO Performance Table */}
          <div className="dashboard-card overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold">IMTO Performance & Compliance Matrix</h3>
              <p className="text-sm text-muted-foreground">Volume-based ranking with FX pricing compliance scores</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-4 text-sm font-semibold">IMTO</th>
                    <th className="text-left p-4 text-sm font-semibold">Category</th>
                    <th className="text-right p-4 text-sm font-semibold">Monthly Value</th>
                    <th className="text-right p-4 text-sm font-semibold">Market Share</th>
                    <th className="text-center p-4 text-sm font-semibold">FX Compliance</th>
                    <th className="text-center p-4 text-sm font-semibold">Data Transparency</th>
                    <th className="text-center p-4 text-sm font-semibold">Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  {imtoPerformanceData.map((imto, idx) => (
                    <tr key={imto.id} className="border-b border-border hover:bg-muted/30">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <span className="font-medium">{imto.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          imto.category === 'Tier 1 IMTO' ? 'bg-success/20 text-success' :
                          imto.category === 'FinTech' ? 'bg-info/20 text-info' :
                          imto.category === 'Crypto Rails' ? 'bg-warning/20 text-warning' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {imto.category}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono">{formatCurrency(imto.monthlyValue)}</td>
                      <td className="p-4 text-right font-mono">{imto.marketShare}%</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <Progress value={imto.fxPricingCompliance} className="w-16 h-2" />
                          <span className="text-sm">{imto.fxPricingCompliance}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          imto.dataTransparency === 'High' ? 'bg-success/20 text-success' :
                          imto.dataTransparency === 'Medium' ? 'bg-warning/20 text-warning' :
                          'bg-destructive/20 text-destructive'
                        }`}>
                          {imto.dataTransparency}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-bold ${
                          imto.riskScore < 25 ? 'text-success' :
                          imto.riskScore < 45 ? 'text-warning' :
                          'text-destructive'
                        }`}>
                          {imto.riskScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Transparency Metrics */}
          <div className="dashboard-card p-6">
            <h3 className="text-lg font-semibold mb-4">Market Transparency Score Card</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transparencyMetrics.map((metric, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{metric.dimension}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      metric.trend === 'improving' ? 'bg-success/20 text-success' :
                      metric.trend === 'declining' ? 'bg-destructive/20 text-destructive' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {metric.trend === 'improving' ? '↑' : metric.trend === 'declining' ? '↓' : '→'} {metric.trend}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Progress value={(metric.score / metric.maxScore) * 100} className="h-3" />
                    </div>
                    <span className="text-lg font-bold">{metric.score}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
                  <p className="text-xs text-accent mt-1 italic">→ {metric.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'supplydemand' && (
        <div className="space-y-6">
          {/* Supply Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-5 h-5 text-success" />
                <div>
                  <h3 className="text-lg font-semibold">FX Supply Sources</h3>
                  <p className="text-sm text-muted-foreground">Weekly inflow composition</p>
                </div>
              </div>
              <div className="space-y-4">
                {fxSupplySources.map((source, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-success/5 border border-success/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{source.source}</span>
                      <span className="text-lg font-bold">{formatCurrency(source.weeklyValue)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">{source.share}% share</span>
                      <span className={getTrendColor(source.monthlyTrend)}>
                        {source.monthlyTrend > 0 ? '+' : ''}{source.monthlyTrend}% MoM
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        source.reliability === 'High' ? 'bg-success/20 text-success' :
                        source.reliability === 'Medium' ? 'bg-warning/20 text-warning' :
                        source.reliability === 'Variable' ? 'bg-info/20 text-info' :
                        'bg-destructive/20 text-destructive'
                      }`}>
                        {source.reliability}
                      </span>
                    </div>
                    <p className="text-xs text-accent mt-2 italic">→ {source.policyImplication}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingDown className="w-5 h-5 text-destructive" />
                <div>
                  <h3 className="text-lg font-semibold">FX Demand Categories</h3>
                  <p className="text-sm text-muted-foreground">Weekly outflow allocation</p>
                </div>
              </div>
              <div className="space-y-4">
                {fxDemandCategories.map((category, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{category.category}</span>
                      <span className="text-lg font-bold">{formatCurrency(category.weeklyValue)}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">{category.share}% share</span>
                      <span className={getTrendColor(category.growthRate)}>
                        {category.growthRate > 0 ? '+' : ''}{category.growthRate}% growth
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        category.priority === 'Essential' ? 'bg-success/20 text-success' :
                        category.priority === 'Commercial' ? 'bg-info/20 text-info' :
                        'bg-warning/20 text-warning'
                      }`}>
                        {category.priority}
                      </span>
                    </div>
                    <p className="text-xs text-accent mt-2 italic">→ {category.policyImplication}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === 'recommendations' && (
        <div className="space-y-6">
          <div className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-5 h-5 text-accent" />
              <div>
                <h3 className="text-lg font-semibold">Strategic Recommendations</h3>
                <p className="text-sm text-muted-foreground">Based on Market Intelligence Analysis</p>
              </div>
            </div>

            <div className="space-y-4">
              {strategicRecommendations.map((rec) => (
                <div key={rec.id} className="p-6 rounded-lg border border-border hover:border-accent/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${
                        rec.priority === 'High' ? 'bg-destructive/20 text-destructive' :
                        rec.priority === 'Medium' ? 'bg-warning/20 text-warning' :
                        'bg-info/20 text-info'
                      }`}>
                        {rec.priority} Priority
                      </span>
                      <span className={`px-3 py-1 rounded text-sm ${
                        rec.status === 'In Progress' ? 'bg-success/20 text-success' :
                        rec.status === 'Pilot' ? 'bg-info/20 text-info' :
                        rec.status === 'Planning' ? 'bg-warning/20 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{rec.timeline}</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                  <div className="flex items-center gap-2 text-sm text-success">
                    <ArrowRight size={14} />
                    <span>Impact: {rec.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer Principle */}
      <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border text-center">
        <p className="text-sm text-muted-foreground italic">
          "Data and Transparency are the Key Pillars for Unlocking the Full Potential of the Remittance Sector"
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Post-trade • Anonymized • Aggregated • Policy-Enabling
        </p>
      </div>
    </div>
  );
}

export default NAFEMDashboard;

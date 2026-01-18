import { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart,
  ReferenceLine, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { 
  Activity, TrendingUp, TrendingDown, Minus, Database, Eye, Layers,
  Users, Shield, Zap, Target, Scale, AlertTriangle, CheckCircle2,
  XCircle, Clock, FileText, Globe, ArrowRight, Bookmark
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  mandatoryReturnsSources,
  dataVisibilityMetrics,
  priceStabilityTrend,
  crossCountryBenchmarks,
  stabilityLensSummary,
  fxSegments,
  segmentContribution,
  policyMarkers,
  policyImpacts,
  elasticityIndicators,
  leakageIndicators,
  complianceFrictions,
  liquidityStress,
  interventionScenarios,
  interventionReadinessSummary,
} from '@/data/policyLayersData';

const SEGMENT_COLORS = {
  remittance: 'hsl(45, 93%, 58%)',
  bank: 'hsl(222, 47%, 45%)',
  fintech: 'hsl(199, 89%, 48%)',
  crypto: 'hsl(280, 65%, 55%)',
  export: 'hsl(142, 71%, 45%)',
};

export function FXTransparencyLayers() {
  const [activeLayer, setActiveLayer] = useState<string>('layer1');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getQualityBadge = (quality: string) => {
    const styles = {
      excellent: 'bg-success/20 text-success border-success/40',
      good: 'bg-primary/20 text-primary border-primary/40',
      needs_attention: 'bg-warning/20 text-warning border-warning/40',
      critical: 'bg-destructive/20 text-destructive border-destructive/40',
    };
    return styles[quality as keyof typeof styles] || styles.needs_attention;
  };

  const getRiskBadge = (risk: string) => {
    const styles = {
      low: 'bg-success/20 text-success',
      medium: 'bg-warning/20 text-warning',
      high: 'bg-destructive/20 text-destructive',
      critical: 'bg-destructive/30 text-destructive',
    };
    return styles[risk as keyof typeof styles] || styles.medium;
  };

  const getAssessmentIcon = (assessment: string) => {
    switch (assessment) {
      case 'effective': return <CheckCircle2 size={14} className="text-success" />;
      case 'partially_effective': return <Clock size={14} className="text-warning" />;
      case 'ineffective': return <XCircle size={14} className="text-destructive" />;
      default: return <Clock size={14} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Philosophy */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20">
        <p className="text-sm font-medium text-center italic">
          "We are not selling software. We are selling a policy learning system for FX stability."
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          Makes informal flows visible without criminalizing them • Optimizes for net impact on stability, not perfection
        </p>
      </div>

      {/* Layer Navigation */}
      <Tabs value={activeLayer} onValueChange={setActiveLayer}>
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 gap-1">
          <TabsTrigger value="layer0" className="text-xs gap-1">
            <Database size={12} />
            <span className="hidden lg:inline">L0:</span> Data Truth
          </TabsTrigger>
          <TabsTrigger value="layer1" className="text-xs gap-1">
            <Eye size={12} />
            <span className="hidden lg:inline">L1:</span> Stability
          </TabsTrigger>
          <TabsTrigger value="layer2" className="text-xs gap-1">
            <Layers size={12} />
            <span className="hidden lg:inline">L2:</span> Segments
          </TabsTrigger>
          <TabsTrigger value="layer3" className="text-xs gap-1">
            <Bookmark size={12} />
            <span className="hidden lg:inline">L3:</span> Policy
          </TabsTrigger>
          <TabsTrigger value="layer4" className="text-xs gap-1">
            <Shield size={12} />
            <span className="hidden lg:inline">L4:</span> Leakage
          </TabsTrigger>
          <TabsTrigger value="layer5" className="text-xs gap-1">
            <Target size={12} />
            <span className="hidden lg:inline">L5:</span> Readiness
          </TabsTrigger>
        </TabsList>

        {/* LAYER 0: DATA TRUTH */}
        <TabsContent value="layer0" className="space-y-6 mt-6">
          <div className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Layer 0 — Data Truth (Foundational)</h3>
                <p className="text-sm text-muted-foreground italic">"Am I seeing reality — or only a subset of reality?"</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-accent/10 border-l-4 border-accent mt-4">
              <p className="text-sm font-medium">Key Insight: If it is not declared, it does not exist to policy.</p>
              <p className="text-xs text-muted-foreground mt-1">The first win is not analysis — it is increasing declared flows.</p>
            </div>
          </div>

          {/* Visibility Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Declared Flows</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(dataVisibilityMetrics.totalDeclaredFlows)}</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp size={10} /> +{dataVisibilityMetrics.declaredGrowthTrend}% WoW
              </p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Estimated Actual</p>
              <p className="text-2xl font-bold">{formatCurrency(dataVisibilityMetrics.estimatedActualFlows)}</p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Visibility Ratio</p>
              <p className="text-2xl font-bold text-success">{dataVisibilityMetrics.visibilityRatio}%</p>
              <p className="text-xs text-muted-foreground mt-1">Flows visible to policy</p>
            </div>
            <div className="dashboard-card p-4 border-destructive/30">
              <p className="text-xs text-muted-foreground">Blind Spot</p>
              <p className="text-2xl font-bold text-destructive">{formatCurrency(dataVisibilityMetrics.blindSpotEstimate)}</p>
              <p className="text-xs text-destructive mt-1">Flows not captured</p>
            </div>
          </div>

          {/* Mandatory Returns Sources */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">Mandatory Returns Sources</h4>
            <div className="space-y-3">
              {mandatoryReturnsSources.map((source, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{source.type}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getQualityBadge(source.dataQuality)}`}>
                        {source.dataQuality.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{source.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{source.submissionRate}%</p>
                    <p className="text-xs text-muted-foreground">{source.expectedFrequency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* LAYER 1: PRICE STABILITY LENS */}
        <TabsContent value="layer1" className="space-y-6 mt-6">
          <div className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Layer 1 — Market Price Stability Lens (Governor View)</h3>
                <p className="text-sm text-muted-foreground italic">"Is the FX system stable or unstable — and why?"</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              No transaction lists. No noise. Depends primarily on returns + reference feeds.
            </p>
          </div>

          {/* Stability Score */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="dashboard-card p-4 border-success/30 bg-success/5">
              <p className="text-xs text-muted-foreground">Stability Score</p>
              <p className="text-3xl font-bold text-success">{stabilityLensSummary.stabilityScore}</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp size={10} /> {stabilityLensSummary.stabilityTrend}
              </p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Official vs Parallel</p>
              <p className="text-2xl font-bold">{stabilityLensSummary.currentSpread}%</p>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingDown size={10} /> {stabilityLensSummary.spreadDirection}
              </p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Volatility Index</p>
              <p className="text-2xl font-bold">{stabilityLensSummary.volatilityIndex}</p>
              <p className="text-xs text-muted-foreground mt-1">{stabilityLensSummary.volatilityStatus}</p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Rolling Window</p>
              <p className="text-2xl font-bold">{stabilityLensSummary.rollingWindow}</p>
            </div>
          </div>

          {/* Price Band Chart */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">Historical FX Buy/Sell Bands</h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={priceStabilityTrend}>
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
                  <Area type="monotone" dataKey="parallelSell" fill="hsl(0, 84%, 60%)" fillOpacity={0.1} stroke="transparent" />
                  <Area type="monotone" dataKey="parallelBuy" fill="transparent" stroke="transparent" />
                  <Line type="monotone" dataKey="officialSell" stroke="hsl(222, 47%, 45%)" strokeWidth={2} dot={false} name="Official Sell" />
                  <Line type="monotone" dataKey="officialBuy" stroke="hsl(222, 47%, 35%)" strokeWidth={2} dot={false} name="Official Buy" />
                  <Line type="monotone" dataKey="vwap" stroke="hsl(45, 93%, 58%)" strokeWidth={3} dot={{ r: 3 }} name="VWAP" />
                  <Line type="monotone" dataKey="parallelSell" stroke="hsl(0, 84%, 60%)" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Parallel" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-accent" />
                <span className="text-muted-foreground">VWAP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-primary" />
                <span className="text-muted-foreground">Official Band</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-destructive opacity-50" style={{ borderBottom: '2px dashed' }} />
                <span className="text-muted-foreground">Parallel</span>
              </div>
            </div>
          </div>

          {/* Cross-Country Benchmarks */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Globe size={14} />
              Cross-Country Reference Benchmarking
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {crossCountryBenchmarks.map((country, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${country.country === 'Ghana' ? 'border-success/50 bg-success/5' : 'border-border'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{country.country}</span>
                    <span className="text-xs text-muted-foreground">{country.currency}</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Premium</span>
                      <span className="font-medium">{country.parallelPremium}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volatility</span>
                      <span className="font-medium">{country.volatilityIndex}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Formal Share</span>
                      <span className="font-medium">{country.formalMarketShare}%</span>
                    </div>
                  </div>
                  <div className={`text-xs mt-2 text-center py-1 rounded ${
                    country.trend === 'improving' ? 'bg-success/20 text-success' :
                    country.trend === 'stable' ? 'bg-muted text-muted-foreground' :
                    'bg-destructive/20 text-destructive'
                  }`}>
                    {country.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* LAYER 2: SEGMENT FLOW DECOMPOSITION */}
        <TabsContent value="layer2" className="space-y-6 mt-6">
          <div className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Layers className="w-5 h-5 text-info" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Layer 2 — Segment Flow Decomposition (Diagnostic)</h3>
                <p className="text-sm text-muted-foreground italic">"Which segments are driving demand, supply, or leakage?"</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-warning/10 border-l-4 border-warning mt-4">
              <p className="text-sm font-medium">Critical Insight</p>
              <p className="text-xs text-muted-foreground mt-1">
                Any system that aggregates "FX" without segment differentiation will mislead policymakers.
              </p>
            </div>
          </div>

          {/* Segment Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="dashboard-card p-4 border-success/30">
              <p className="text-xs text-muted-foreground">Total Supply</p>
              <p className="text-2xl font-bold text-success">{formatCurrency(segmentContribution.totalSupply)}</p>
            </div>
            <div className="dashboard-card p-4 border-destructive/30">
              <p className="text-xs text-muted-foreground">Total Demand</p>
              <p className="text-2xl font-bold text-destructive">{formatCurrency(segmentContribution.totalDemand)}</p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Net Position</p>
              <p className="text-2xl font-bold text-success">+{formatCurrency(segmentContribution.netPosition)}</p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Formal Flow Share</p>
              <p className="text-2xl font-bold">{segmentContribution.formalFlowShare}%</p>
            </div>
          </div>

          {/* Segments Detail */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">FX Market Segments</h4>
            <div className="space-y-3">
              {fxSegments.map((segment) => (
                <div key={segment.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                      <div>
                        <span className="font-medium">{segment.name}</span>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                          segment.category === 'supply' ? 'bg-success/20 text-success' :
                          segment.category === 'demand' ? 'bg-destructive/20 text-destructive' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {segment.category}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getRiskBadge(segment.blindSpotRisk)}`}>
                      {segment.blindSpotRisk} blind spot risk
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Weekly Volume</p>
                      <p className="font-bold">{formatCurrency(segment.weeklyVolume)}</p>
                      <p className={`text-xs ${segment.weeklyChange >= 0 ? 'text-success' : 'text-destructive'}`}>
                        {segment.weeklyChange >= 0 ? '+' : ''}{segment.weeklyChange}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Formal Share</p>
                      <p className="font-bold">{segment.formalShare}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Returns Compliance</p>
                      <p className="font-bold">{segment.returnsCompliance}%</p>
                    </div>
                    <div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${segment.formalShare}%`,
                            backgroundColor: segment.color
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Formalization</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* LAYER 3: POLICY MARKER & ATTRIBUTION */}
        <TabsContent value="layer3" className="space-y-6 mt-6">
          <div className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Bookmark className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Layer 3 — Policy Marker & Attribution Engine</h3>
                <p className="text-sm text-muted-foreground italic">"Did our policy work — and where did it fail?"</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-success/10 border-l-4 border-success mt-4">
              <p className="text-sm font-medium">"When I issue a policy, I should see its effect in the data."</p>
              <p className="text-xs text-muted-foreground mt-1">This layer turns the dashboard into a learning system. Rare globally.</p>
            </div>
          </div>

          {/* Active Policies */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">Active Policy Markers</h4>
            <div className="space-y-3">
              {policyMarkers.filter(p => p.status === 'active').map((policy) => (
                <div key={policy.id} className="p-4 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        policy.type === 'directive' ? 'bg-primary/20 text-primary' :
                        policy.type === 'incentive' ? 'bg-success/20 text-success' :
                        policy.type === 'rate_change' ? 'bg-accent/20 text-accent-foreground' :
                        'bg-warning/20 text-warning'
                      }`}>
                        {policy.type.replace('_', ' ')}
                      </span>
                      <span className="font-medium">{policy.title}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{policy.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{policy.description}</p>
                  <div className="flex gap-2 mt-2">
                    {policy.targetSegments.map((seg, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 rounded bg-muted">{seg}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Impact Assessment */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">Before/After Impact Assessment</h4>
            <div className="space-y-4">
              {policyImpacts.map((impact, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getAssessmentIcon(impact.assessment)}
                      <span className="font-medium">{impact.policyTitle}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      impact.assessment === 'effective' ? 'bg-success/20 text-success' :
                      impact.assessment === 'partially_effective' ? 'bg-warning/20 text-warning' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {impact.assessment.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">{impact.metric}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{impact.beforeValue}</span>
                        <ArrowRight size={14} />
                        <span className="font-bold">{impact.afterValue}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Change</p>
                      <p className={`font-bold ${impact.changePercent < 0 ? 'text-success' : 'text-destructive'}`}>
                        {impact.changePercent > 0 ? '+' : ''}{impact.changePercent}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Elasticity Score</p>
                      <p className="font-bold">{impact.elasticityScore.toFixed(2)}</p>
                    </div>
                    <div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-success rounded-full"
                          style={{ width: `${impact.elasticityScore * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Response Rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Elasticity Indicators */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">Segment Elasticity (Who Responded, Who Didn't)</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {elasticityIndicators.map((indicator, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${
                  indicator.responseLevel === 'high' ? 'border-success/50 bg-success/5' :
                  indicator.responseLevel === 'medium' ? 'border-warning/50 bg-warning/5' :
                  'border-destructive/50 bg-destructive/5'
                }`}>
                  <p className="font-medium">{indicator.segment}</p>
                  <p className={`text-2xl font-bold mt-1 ${
                    indicator.responseLevel === 'high' ? 'text-success' :
                    indicator.responseLevel === 'medium' ? 'text-warning' :
                    'text-destructive'
                  }`}>
                    {indicator.responseLevel}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">{indicator.behaviorShift}</p>
                  <p className="text-xs mt-1">
                    Volume: <span className="font-medium">{indicator.volumeChange > 0 ? '+' : ''}{indicator.volumeChange}%</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* LAYER 4: LEAKAGE & DIAGNOSTICS */}
        <TabsContent value="layer4" className="space-y-6 mt-6">
          <div className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Layer 4 — Compliance, Leakage & Incentive Diagnostics</h3>
                <p className="text-sm text-muted-foreground italic">"Where is the system being gamed?"</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-warning/10 border-l-4 border-warning mt-4">
              <p className="text-sm font-medium">Important: This layer is NOT enforcement. It is policy friction detection.</p>
              <p className="text-xs text-muted-foreground mt-1">
                If everyone is circumventing the system, the policy is wrong — not the users.
              </p>
            </div>
          </div>

          {/* Leakage Indicators */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">Leakage Indicators</h4>
            <div className="space-y-3">
              {leakageIndicators.map((indicator, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${
                  indicator.riskLevel === 'critical' || indicator.riskLevel === 'high' 
                    ? 'border-destructive/50 bg-destructive/5' 
                    : 'border-border'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <AlertTriangle size={16} className={
                        indicator.riskLevel === 'critical' || indicator.riskLevel === 'high' 
                          ? 'text-destructive' 
                          : 'text-warning'
                      } />
                      <span className="font-medium">{indicator.type}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${getRiskBadge(indicator.riskLevel)}`}>
                      {indicator.riskLevel}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{indicator.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Est. Volume</p>
                      <p className="font-bold text-destructive">{formatCurrency(indicator.estimatedVolume)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Detection Method</p>
                      <p className="font-medium">{indicator.detectionMethod}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Corridors</p>
                      <p className="font-medium">{indicator.corridorAffected}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Frictions */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">Policy Friction Points (Why Participants Struggle)</h4>
            <div className="space-y-3">
              {complianceFrictions.map((friction, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{friction.segment}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      friction.impactLevel === 'high' ? 'bg-destructive/20 text-destructive' :
                      'bg-warning/20 text-warning'
                    }`}>
                      {friction.impactLevel} impact
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{friction.frictionType}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">{friction.participantsAffected} participants affected</span>
                    <span className="text-xs text-success font-medium">→ {friction.suggestedAction}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* LAYER 5: INTERVENTION READINESS */}
        <TabsContent value="layer5" className="space-y-6 mt-6">
          <div className="dashboard-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Layer 5 — Intervention Readiness (Not Intervention Itself)</h3>
                <p className="text-sm text-muted-foreground italic">"If we intervene, where, how much, and why?"</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-primary/10 border-l-4 border-primary mt-4">
              <p className="text-sm font-medium">The system must NOT intervene — it must INFORM intervention.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Trading feeds the dashboard. The dashboard never "talks back" in real time.
              </p>
            </div>
          </div>

          {/* Current Status */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`dashboard-card p-4 ${
              interventionReadinessSummary.currentRecommendation === 'Monitor' 
                ? 'border-success/30 bg-success/5' 
                : 'border-warning/30 bg-warning/5'
            }`}>
              <p className="text-xs text-muted-foreground">Recommendation</p>
              <p className="text-2xl font-bold">{interventionReadinessSummary.currentRecommendation}</p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Stress Level</p>
              <p className="text-2xl font-bold">{interventionReadinessSummary.stressLevel}</p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Reserve Capacity</p>
              <p className="text-2xl font-bold">{formatCurrency(interventionReadinessSummary.reserveCapacity)}</p>
            </div>
            <div className="dashboard-card p-4">
              <p className="text-xs text-muted-foreground">Days Since Intervention</p>
              <p className="text-2xl font-bold">{interventionReadinessSummary.daysSinceIntervention}</p>
            </div>
          </div>

          {/* Liquidity Stress by Segment */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">Segment-Specific Supply Gaps</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {liquidityStress.map((segment, idx) => (
                <div key={idx} className={`p-4 rounded-lg border ${
                  segment.stressLevel === 'elevated' ? 'border-warning/50 bg-warning/5' :
                  'border-border'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{segment.segment}</span>
                    {segment.recommendedWatch && (
                      <Eye size={14} className="text-warning" />
                    )}
                  </div>
                  <p className={`text-lg font-bold ${
                    segment.stressLevel === 'elevated' ? 'text-warning' :
                    segment.stressLevel === 'low' ? 'text-success' :
                    ''
                  }`}>
                    {segment.stressLevel}
                  </p>
                  <div className="mt-2 text-xs">
                    <p className="text-muted-foreground">Gap: {formatCurrency(segment.supplyGap)}</p>
                    <p className="text-muted-foreground">Pressure: +{segment.demandPressure}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intervention Scenarios */}
          <div className="dashboard-card p-6">
            <h4 className="text-sm font-semibold mb-4">Intervention Simulation Scenarios ("What if we add $X?")</h4>
            <div className="space-y-3">
              {interventionScenarios.map((scenario, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{scenario.scenario}</span>
                    <span className="text-xs text-muted-foreground">{scenario.historicalPrecedent}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Injection</p>
                      <p className="font-bold text-primary">{formatCurrency(scenario.injectionAmount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Spread Impact</p>
                      <p className="font-bold text-success">-{scenario.expectedSpreadImpact} bps</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-bold">{scenario.durationEffect}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Confidence</p>
                      <p className="font-bold">{scenario.confidenceLevel}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Clean Separation Footer */}
      <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium mb-2">The EFEM / Trading Tool:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Executes interventions</li>
              <li>• Matches willing buyers/sellers</li>
              <li>• Settles FX</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-2">This Dashboard:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Observes outcomes</li>
              <li>• Measures effectiveness</li>
              <li>• Guides future action</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground mt-4 italic">
          One-way dependency: Trading feeds the dashboard. The dashboard never "talks back" in real time.
        </p>
      </div>
    </div>
  );
}

export default FXTransparencyLayers;

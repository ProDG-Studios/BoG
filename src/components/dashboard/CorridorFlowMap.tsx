import { useState, useMemo } from 'react';
import { Globe, TrendingUp, ArrowRight, Zap, Activity } from 'lucide-react';
import { corridorData } from '@/data/mockData';

// Geographic coordinates for major remittance source regions
const regionCoordinates: Record<string, { x: number; y: number; name: string }> = {
  'United States': { x: 22, y: 42, name: 'USA' },
  'United Kingdom': { x: 47, y: 32, name: 'UK' },
  'European Union': { x: 50, y: 35, name: 'EU' },
  'Nigeria': { x: 52, y: 52, name: 'NG' },
  'China': { x: 78, y: 40, name: 'CN' },
  'Canada': { x: 20, y: 32, name: 'CA' },
  'South Africa': { x: 56, y: 72, name: 'ZA' },
  'UAE': { x: 62, y: 45, name: 'UAE' },
};

// Ghana as destination
const ghanaCoords = { x: 48, y: 52, name: 'GH' };

interface FlowData {
  origin: string;
  corridor: string;
  value: number;
  volume: number;
  percentage: number;
  emergingRail: number;
}

export function CorridorFlowMap() {
  const [selectedCorridor, setSelectedCorridor] = useState<string | null>(null);
  const [hoveredCorridor, setHoveredCorridor] = useState<string | null>(null);

  const flowData: FlowData[] = useMemo(() => {
    const totalValue = corridorData.reduce((sum, c) => sum + c.totalValue, 0);
    return corridorData.map(c => ({
      origin: c.origin,
      corridor: c.corridor,
      value: c.totalValue,
      volume: c.totalVolume,
      percentage: (c.totalValue / totalValue) * 100,
      emergingRail: c.emergingRailPercent,
    }));
  }, []);

  const totalInflows = flowData.reduce((sum, f) => sum + f.value, 0);
  const topCorridor = flowData.reduce((max, f) => f.value > max.value ? f : max, flowData[0]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getFlowColor = (percentage: number) => {
    if (percentage > 25) return 'hsl(var(--primary))';
    if (percentage > 15) return 'hsl(45, 93%, 58%)';
    if (percentage > 10) return 'hsl(199, 89%, 48%)';
    return 'hsl(var(--muted-foreground))';
  };

  const getFlowWidth = (percentage: number) => {
    if (percentage > 25) return 4;
    if (percentage > 15) return 3;
    if (percentage > 10) return 2;
    return 1.5;
  };

  const activeFlow = hoveredCorridor || selectedCorridor;
  const activeFlowData = activeFlow ? flowData.find(f => f.corridor === activeFlow) : null;

  return (
    <div className="space-y-6">
      {/* Map Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-2xl font-bold text-primary">{corridorData.length}</p>
          <p className="text-xs text-muted-foreground">Active Corridors</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-2xl font-bold text-accent-foreground">{formatCurrency(totalInflows)}</p>
          <p className="text-xs text-muted-foreground">Total Inflows</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-2xl font-bold">{topCorridor.corridor}</p>
          <p className="text-xs text-muted-foreground">Top Corridor</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-info/10 border border-info/30">
          <p className="text-2xl font-bold text-info">
            {flowData.filter(f => f.emergingRail > 10).length}
          </p>
          <p className="text-xs text-muted-foreground">Digital Rail Active</p>
        </div>
      </div>

      {/* Interactive Map */}
      <div className="relative w-full aspect-[2/1] bg-gradient-to-br from-background via-muted/20 to-background rounded-xl border border-border overflow-hidden">
        {/* World Map Background - Simplified SVG */}
        <svg 
          viewBox="0 0 100 60" 
          className="absolute inset-0 w-full h-full"
          style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.1))' }}
        >
          {/* Gradient Definitions */}
          <defs>
            {flowData.map((flow) => (
              <linearGradient 
                key={`gradient-${flow.corridor}`}
                id={`flow-gradient-${flow.corridor}`}
                x1="0%" y1="0%" x2="100%" y2="0%"
              >
                <stop offset="0%" stopColor={getFlowColor(flow.percentage)} stopOpacity="0.3" />
                <stop offset="50%" stopColor={getFlowColor(flow.percentage)} stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="1" />
              </linearGradient>
            ))}
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Simplified continent outlines */}
          <g className="opacity-20" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3">
            {/* North America */}
            <path d="M5,25 Q15,20 25,25 Q30,30 25,40 Q20,45 15,42 Q10,38 5,35 Z" />
            {/* South America */}
            <path d="M22,48 Q28,50 30,55 Q28,65 22,68 Q18,65 18,55 Z" />
            {/* Europe */}
            <path d="M42,25 Q50,22 55,28 Q52,35 45,38 Q42,35 42,25 Z" />
            {/* Africa */}
            <path d="M42,42 Q55,38 58,50 Q55,68 48,72 Q42,68 42,55 Z" />
            {/* Asia */}
            <path d="M58,25 Q75,20 88,28 Q90,40 82,48 Q70,52 62,45 Q58,38 58,25 Z" />
            {/* Australia */}
            <path d="M78,58 Q88,55 90,62 Q88,68 80,68 Q78,65 78,58 Z" />
          </g>

          {/* Flow Lines - Curved paths from origin to Ghana */}
          {flowData.map((flow) => {
            const originCoords = regionCoordinates[flow.origin];
            if (!originCoords) return null;

            const isActive = activeFlow === flow.corridor;
            const opacity = activeFlow ? (isActive ? 1 : 0.2) : 0.7;

            // Calculate control point for curved path
            const midX = (originCoords.x + ghanaCoords.x) / 2;
            const midY = (originCoords.y + ghanaCoords.y) / 2 - 8;

            return (
              <g key={flow.corridor}>
                {/* Flow path */}
                <path
                  d={`M${originCoords.x},${originCoords.y} Q${midX},${midY} ${ghanaCoords.x},${ghanaCoords.y}`}
                  fill="none"
                  stroke={`url(#flow-gradient-${flow.corridor})`}
                  strokeWidth={isActive ? getFlowWidth(flow.percentage) + 1 : getFlowWidth(flow.percentage)}
                  strokeLinecap="round"
                  opacity={opacity}
                  className={`transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`}
                  filter={isActive ? 'url(#glow)' : undefined}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => setHoveredCorridor(flow.corridor)}
                  onMouseLeave={() => setHoveredCorridor(null)}
                  onClick={() => setSelectedCorridor(selectedCorridor === flow.corridor ? null : flow.corridor)}
                />
                
                {/* Animated flow particles */}
                {isActive && (
                  <>
                    <circle r="0.8" fill={getFlowColor(flow.percentage)}>
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        path={`M${originCoords.x},${originCoords.y} Q${midX},${midY} ${ghanaCoords.x},${ghanaCoords.y}`}
                      />
                    </circle>
                    <circle r="0.6" fill={getFlowColor(flow.percentage)}>
                      <animateMotion
                        dur="2s"
                        repeatCount="indefinite"
                        begin="0.5s"
                        path={`M${originCoords.x},${originCoords.y} Q${midX},${midY} ${ghanaCoords.x},${ghanaCoords.y}`}
                      />
                    </circle>
                  </>
                )}
              </g>
            );
          })}

          {/* Origin Region Nodes */}
          {flowData.map((flow) => {
            const originCoords = regionCoordinates[flow.origin];
            if (!originCoords) return null;

            const isActive = activeFlow === flow.corridor;

            return (
              <g 
                key={`node-${flow.corridor}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredCorridor(flow.corridor)}
                onMouseLeave={() => setHoveredCorridor(null)}
                onClick={() => setSelectedCorridor(selectedCorridor === flow.corridor ? null : flow.corridor)}
              >
                {/* Outer glow */}
                <circle
                  cx={originCoords.x}
                  cy={originCoords.y}
                  r={isActive ? 3.5 : 2.5}
                  fill={getFlowColor(flow.percentage)}
                  opacity={isActive ? 0.3 : 0.15}
                  className="transition-all duration-300"
                />
                {/* Inner circle */}
                <circle
                  cx={originCoords.x}
                  cy={originCoords.y}
                  r={isActive ? 2 : 1.5}
                  fill={isActive ? getFlowColor(flow.percentage) : 'hsl(var(--muted))'}
                  stroke={getFlowColor(flow.percentage)}
                  strokeWidth="0.3"
                  className="transition-all duration-300"
                />
                {/* Label */}
                <text
                  x={originCoords.x}
                  y={originCoords.y - 4}
                  textAnchor="middle"
                  className="fill-foreground text-[2.5px] font-bold"
                  opacity={isActive ? 1 : 0.7}
                >
                  {originCoords.name}
                </text>
              </g>
            );
          })}

          {/* Ghana Destination Node */}
          <g>
            {/* Pulsing ring */}
            <circle
              cx={ghanaCoords.x}
              cy={ghanaCoords.y}
              r="4"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="0.3"
              opacity="0.5"
            >
              <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Main node */}
            <circle
              cx={ghanaCoords.x}
              cy={ghanaCoords.y}
              r="2.5"
              fill="hsl(var(--primary))"
              stroke="hsl(var(--primary-foreground))"
              strokeWidth="0.4"
              filter="url(#glow)"
            />
            {/* Label */}
            <text
              x={ghanaCoords.x}
              y={ghanaCoords.y + 6}
              textAnchor="middle"
              className="fill-primary text-[3px] font-bold"
            >
              GHANA
            </text>
          </g>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-background/80 backdrop-blur-sm border border-border text-xs space-y-2">
          <p className="font-semibold text-foreground">Flow Volume</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: 'hsl(var(--primary))' }} />
            <span className="text-muted-foreground">&gt;25%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 rounded" style={{ backgroundColor: 'hsl(45, 93%, 58%)' }} />
            <span className="text-muted-foreground">15-25%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 rounded" style={{ backgroundColor: 'hsl(199, 89%, 48%)' }} />
            <span className="text-muted-foreground">&lt;15%</span>
          </div>
        </div>

        {/* Active Corridor Details Panel */}
        {activeFlowData && (
          <div className="absolute top-4 right-4 p-4 rounded-lg bg-background/95 backdrop-blur-sm border border-primary/30 shadow-lg w-64 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground">{activeFlowData.corridor}</p>
                <p className="text-xs text-muted-foreground">{activeFlowData.origin} → Ghana</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inflow Value</span>
                <span className="font-semibold text-primary">{formatCurrency(activeFlowData.value)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-medium">{activeFlowData.volume.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Share of Total</span>
                <span className="font-medium">{activeFlowData.percentage.toFixed(1)}%</span>
              </div>
              {activeFlowData.emergingRail > 10 && (
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Zap className="w-3 h-3 text-info" />
                    Digital Rails
                  </span>
                  <span className="font-medium text-info">{activeFlowData.emergingRail}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Activity Indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/20 border border-success/30">
          <Activity className="w-3 h-3 text-success animate-pulse" />
          <span className="text-xs font-medium text-success">Live Flows</span>
        </div>
      </div>

      {/* Corridor Quick Select */}
      <div className="flex flex-wrap gap-2">
        {flowData.map((flow) => (
          <button
            key={flow.corridor}
            onClick={() => setSelectedCorridor(selectedCorridor === flow.corridor ? null : flow.corridor)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all
              ${selectedCorridor === flow.corridor 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted/50 hover:bg-muted text-foreground border border-border/50'}
            `}
          >
            <span className="font-medium">{flow.corridor}</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-xs opacity-80">{formatCurrency(flow.value)}</span>
            {flow.emergingRail > 10 && <Zap className="w-3 h-3 text-info" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CorridorFlowMap;

import { useState, useMemo, useCallback, memo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from 'react-simple-maps';
import { 
  Globe, TrendingUp, ZoomIn, ZoomOut, RotateCcw, Zap, Activity, 
  ArrowRight, MapPin, DollarSign, Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { corridorData } from '@/data/mockData';

// World map TopoJSON
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Country coordinates (capital cities / major financial centers)
const countryCoordinates: Record<string, { 
  coords: [number, number]; 
  name: string; 
  code: string;
  region: string;
}> = {
  'United States': { coords: [-98.5795, 39.8283], name: 'United States', code: 'USA', region: 'North America' },
  'United Kingdom': { coords: [-0.1276, 51.5074], name: 'United Kingdom', code: 'UK', region: 'Europe' },
  'European Union': { coords: [4.3517, 50.8503], name: 'European Union', code: 'EU', region: 'Europe' },
  'Nigeria': { coords: [7.4951, 9.0820], name: 'Nigeria', code: 'NG', region: 'West Africa' },
  'China': { coords: [116.4074, 39.9042], name: 'China', code: 'CN', region: 'Asia' },
  'Canada': { coords: [-106.3468, 56.1304], name: 'Canada', code: 'CA', region: 'North America' },
  'South Africa': { coords: [28.0473, -26.2041], name: 'South Africa', code: 'ZA', region: 'Southern Africa' },
  'UAE': { coords: [54.3773, 24.4539], name: 'UAE', code: 'UAE', region: 'Middle East' },
};

// Ghana destination
const ghanaCoords: [number, number] = [-1.0232, 7.9465];

interface FlowData {
  origin: string;
  corridor: string;
  value: number;
  volume: number;
  percentage: number;
  emergingRail: number;
  coords: [number, number];
}

// Memoized Geography component
const MemoizedGeography = memo(({ 
  geo, 
  isSource, 
  isGhana, 
  onMouseEnter, 
  onMouseLeave 
}: {
  geo: any;
  isSource: boolean;
  isGhana: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <Geography
    geography={geo}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    style={{
      default: {
        fill: isGhana 
          ? 'hsl(45, 93%, 48%)' 
          : isSource 
            ? 'hsl(222, 47%, 35%)' 
            : 'hsl(222, 20%, 18%)',
        stroke: 'hsl(222, 20%, 25%)',
        strokeWidth: 0.5,
        outline: 'none',
        transition: 'all 0.3s ease',
      },
      hover: {
        fill: isGhana 
          ? 'hsl(45, 93%, 58%)' 
          : isSource 
            ? 'hsl(222, 47%, 45%)' 
            : 'hsl(222, 20%, 28%)',
        stroke: 'hsl(45, 93%, 58%)',
        strokeWidth: 1,
        outline: 'none',
        cursor: 'pointer',
      },
      pressed: {
        fill: 'hsl(45, 93%, 40%)',
        outline: 'none',
      },
    }}
  />
));

MemoizedGeography.displayName = 'MemoizedGeography';

export function InteractiveWorldMap() {
  const [position, setPosition] = useState({ coordinates: [0, 20] as [number, number], zoom: 1.5 });
  const [selectedCorridor, setSelectedCorridor] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [hoveredCorridor, setHoveredCorridor] = useState<string | null>(null);

  // Process corridor data
  const flowData: FlowData[] = useMemo(() => {
    const totalValue = corridorData.reduce((sum, c) => sum + c.totalValue, 0);
    return corridorData
      .filter(c => countryCoordinates[c.origin])
      .map(c => ({
        origin: c.origin,
        corridor: c.corridor,
        value: c.totalValue,
        volume: c.totalVolume,
        percentage: (c.totalValue / totalValue) * 100,
        emergingRail: c.emergingRailPercent,
        coords: countryCoordinates[c.origin].coords,
      }));
  }, []);

  const sourceCountries = useMemo(() => 
    new Set(flowData.map(f => f.origin)), [flowData]);

  const totalInflows = useMemo(() => 
    flowData.reduce((sum, f) => sum + f.value, 0), [flowData]);

  const formatCurrency = useCallback((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  }, []);

  // Zoom controls
  const handleZoomIn = useCallback(() => {
    if (position.zoom < 8) {
      setPosition(pos => ({ ...pos, zoom: pos.zoom * 1.5 }));
    }
  }, [position.zoom]);

  const handleZoomOut = useCallback(() => {
    if (position.zoom > 1) {
      setPosition(pos => ({ ...pos, zoom: pos.zoom / 1.5 }));
    }
  }, [position.zoom]);

  const handleReset = useCallback(() => {
    setPosition({ coordinates: [0, 20], zoom: 1.5 });
    setSelectedCorridor(null);
  }, []);

  const handleMoveEnd = useCallback((pos: { coordinates: [number, number]; zoom: number }) => {
    setPosition(pos);
  }, []);

  // Focus on corridor
  const focusOnCorridor = useCallback((corridor: string) => {
    const flow = flowData.find(f => f.corridor === corridor);
    if (flow) {
      const midLon = (flow.coords[0] + ghanaCoords[0]) / 2;
      const midLat = (flow.coords[1] + ghanaCoords[1]) / 2;
      setPosition({ coordinates: [midLon, midLat], zoom: 2.5 });
      setSelectedCorridor(corridor);
    }
  }, [flowData]);

  const getFlowColor = useCallback((percentage: number) => {
    if (percentage > 25) return '#d4a537';
    if (percentage > 15) return '#3b82f6';
    if (percentage > 10) return '#22c55e';
    return '#64748b';
  }, []);

  const getStrokeWidth = useCallback((percentage: number, isActive: boolean) => {
    const base = percentage > 25 ? 3 : percentage > 15 ? 2.5 : 2;
    return isActive ? base + 1 : base;
  }, []);

  const activeFlow = hoveredCorridor || selectedCorridor;
  const activeFlowData = activeFlow ? flowData.find(f => f.corridor === activeFlow) : null;

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-2xl font-bold text-primary">{flowData.length}</p>
          <p className="text-xs text-muted-foreground">Active Corridors</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-2xl font-bold text-accent-foreground">{formatCurrency(totalInflows)}</p>
          <p className="text-xs text-muted-foreground">Total Inflows</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-muted/30 border border-border/50">
          <p className="text-2xl font-bold">{flowData[0]?.corridor || 'N/A'}</p>
          <p className="text-xs text-muted-foreground">Top Corridor</p>
        </div>
        <div className="text-center p-4 rounded-lg bg-info/10 border border-info/30">
          <p className="text-2xl font-bold text-info">
            {flowData.filter(f => f.emergingRail > 10).length}
          </p>
          <p className="text-xs text-muted-foreground">Digital Rails Active</p>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border border-border overflow-hidden shadow-2xl">
        {/* Live Indicator */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/20 border border-success/30 backdrop-blur-sm">
          <Activity className="w-3 h-3 text-success animate-pulse" />
          <span className="text-xs font-medium text-success">Live Remittance Flows</span>
        </div>

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleZoomIn}
            disabled={position.zoom >= 8}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleZoomOut}
            disabled={position.zoom <= 1}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-9 w-9 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Map */}
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 150,
            center: [0, 20],
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <ZoomableGroup
            zoom={position.zoom}
            center={position.coordinates}
            onMoveEnd={handleMoveEnd}
            minZoom={1}
            maxZoom={8}
          >
            {/* Countries */}
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const isSource = sourceCountries.has(countryName);
                  const isGhana = countryName === 'Ghana';
                  
                  return (
                    <MemoizedGeography
                      key={geo.rsmKey}
                      geo={geo}
                      isSource={isSource}
                      isGhana={isGhana}
                      onMouseEnter={() => setHoveredCountry(countryName)}
                      onMouseLeave={() => setHoveredCountry(null)}
                    />
                  );
                })
              }
            </Geographies>

            {/* Flow Lines */}
            {flowData.map((flow) => {
              const isActive = activeFlow === flow.corridor;
              const opacity = activeFlow ? (isActive ? 1 : 0.15) : 0.6;
              
              return (
                <Line
                  key={flow.corridor}
                  from={flow.coords}
                  to={ghanaCoords}
                  stroke={getFlowColor(flow.percentage)}
                  strokeWidth={getStrokeWidth(flow.percentage, isActive)}
                  strokeLinecap="round"
                  strokeOpacity={opacity}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredCorridor(flow.corridor)}
                  onMouseLeave={() => setHoveredCorridor(null)}
                  onClick={() => focusOnCorridor(flow.corridor)}
                />
              );
            })}

            {/* Source Country Markers */}
            {flowData.map((flow) => {
              const country = countryCoordinates[flow.origin];
              const isActive = activeFlow === flow.corridor;
              
              return (
                <Marker
                  key={`marker-${flow.corridor}`}
                  coordinates={flow.coords}
                  onMouseEnter={() => setHoveredCorridor(flow.corridor)}
                  onMouseLeave={() => setHoveredCorridor(null)}
                  onClick={() => focusOnCorridor(flow.corridor)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer glow */}
                  <circle
                    r={isActive ? 12 : 8}
                    fill={getFlowColor(flow.percentage)}
                    fillOpacity={isActive ? 0.4 : 0.2}
                    className="transition-all duration-300"
                  />
                  {/* Inner circle */}
                  <circle
                    r={isActive ? 6 : 4}
                    fill={isActive ? getFlowColor(flow.percentage) : '#1e293b'}
                    stroke={getFlowColor(flow.percentage)}
                    strokeWidth={2}
                    className="transition-all duration-300"
                  />
                  {/* Label */}
                  <text
                    textAnchor="middle"
                    y={-14}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: isActive ? 11 : 9,
                      fontWeight: isActive ? 700 : 500,
                      fill: isActive ? '#ffffff' : '#94a3b8',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {country.code}
                  </text>
                </Marker>
              );
            })}

            {/* Ghana Destination Marker */}
            <Marker coordinates={ghanaCoords}>
              {/* Pulsing outer ring */}
              <circle
                r={16}
                fill="none"
                stroke="#d4a537"
                strokeWidth={2}
                opacity={0.6}
              >
                <animate
                  attributeName="r"
                  values="12;20;12"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0.2;0.6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Main marker */}
              <circle
                r={10}
                fill="#d4a537"
                stroke="#ffffff"
                strokeWidth={3}
              />
              {/* Inner icon area */}
              <circle
                r={6}
                fill="#1e293b"
              />
              {/* Label */}
              <text
                textAnchor="middle"
                y={28}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12,
                  fontWeight: 700,
                  fill: '#d4a537',
                }}
              >
                GHANA
              </text>
            </Marker>
          </ZoomableGroup>
        </ComposableMap>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 z-20 p-4 rounded-lg bg-background/90 backdrop-blur-sm border border-border text-xs space-y-3 min-w-[160px]">
          <p className="font-semibold text-foreground flex items-center gap-2">
            <MapPin className="w-3 h-3" />
            Flow Volume
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-1 rounded-full" style={{ backgroundColor: '#d4a537' }} />
              <span className="text-muted-foreground">&gt;25% share</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: '#3b82f6' }} />
              <span className="text-muted-foreground">15-25%</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 rounded-full" style={{ backgroundColor: '#22c55e' }} />
              <span className="text-muted-foreground">10-15%</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-0.5 rounded-full" style={{ backgroundColor: '#64748b' }} />
              <span className="text-muted-foreground">&lt;10%</span>
            </div>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-muted-foreground">
              <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: 'hsl(222, 47%, 35%)' }} />
              Source Countries
            </p>
          </div>
        </div>

        {/* Active Corridor Details Panel */}
        {activeFlowData && (
          <div className="absolute bottom-4 right-4 z-20 p-5 rounded-xl bg-background/95 backdrop-blur-md border border-primary/30 shadow-2xl w-72 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-lg text-foreground">{activeFlowData.corridor}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  {activeFlowData.origin} 
                  <ArrowRight className="w-3 h-3" /> 
                  Ghana
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <span className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Inflow Value
                </span>
                <span className="font-bold text-primary text-lg">{formatCurrency(activeFlowData.value)}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Transactions
                </span>
                <span className="font-semibold">{activeFlowData.volume.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <span className="text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Market Share
                </span>
                <span className="font-semibold">{activeFlowData.percentage.toFixed(1)}%</span>
              </div>
              {activeFlowData.emergingRail > 10 && (
                <div className="flex items-center justify-between p-2 rounded-lg bg-info/10 border border-info/30">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-info" />
                    Digital Rails
                  </span>
                  <span className="font-semibold text-info">{activeFlowData.emergingRail}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hovered Country Tooltip */}
        {hoveredCountry && !activeFlowData && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-lg bg-background/95 backdrop-blur-sm border border-border shadow-lg">
            <p className="text-sm font-medium text-foreground">{hoveredCountry}</p>
          </div>
        )}
      </div>

      {/* Corridor Quick Select */}
      <div className="flex flex-wrap gap-2">
        {flowData.map((flow) => (
          <button
            key={flow.corridor}
            onClick={() => focusOnCorridor(flow.corridor)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm transition-all duration-200
              ${selectedCorridor === flow.corridor 
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                : 'bg-muted/50 hover:bg-muted text-foreground border border-border/50 hover:border-primary/50'}
            `}
          >
            <span className="font-semibold">{flow.corridor}</span>
            <ArrowRight className="w-3 h-3 opacity-50" />
            <span className="text-xs opacity-80">{formatCurrency(flow.value)}</span>
            {flow.emergingRail > 10 && <Zap className="w-3 h-3 text-info" />}
          </button>
        ))}
      </div>

      {/* Instructions */}
      <div className="text-center text-xs text-muted-foreground">
        <p>🖱️ Click and drag to pan • Scroll to zoom • Click on flows or buttons to focus</p>
      </div>
    </div>
  );
}

export default InteractiveWorldMap;

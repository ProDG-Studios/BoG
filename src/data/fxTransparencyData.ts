// FX Transparency Dashboard Data - Post-trade, anonymized, aggregated truth layer
// Critical rule: No counterparty names. Ever.

// Market Activity Layer - "Is this a real market or a thin illusion?"
export interface MarketActivityData {
  date: string;
  dailyVolume: number; // USD
  numberOfTrades: number;
  avgTicketSize: number;
  top5Share: number; // Market concentration index
}

export const marketActivityTrend: MarketActivityData[] = [
  { date: 'Jan 10', dailyVolume: 28500000, numberOfTrades: 342, avgTicketSize: 83333, top5Share: 62 },
  { date: 'Jan 11', dailyVolume: 31200000, numberOfTrades: 387, avgTicketSize: 80620, top5Share: 58 },
  { date: 'Jan 12', dailyVolume: 26800000, numberOfTrades: 298, avgTicketSize: 89933, top5Share: 65 },
  { date: 'Jan 13', dailyVolume: 33500000, numberOfTrades: 412, avgTicketSize: 81311, top5Share: 54 },
  { date: 'Jan 14', dailyVolume: 29100000, numberOfTrades: 356, avgTicketSize: 81742, top5Share: 59 },
  { date: 'Jan 15', dailyVolume: 35800000, numberOfTrades: 428, avgTicketSize: 83645, top5Share: 52 },
  { date: 'Jan 16', dailyVolume: 32400000, numberOfTrades: 395, avgTicketSize: 82025, top5Share: 56 },
];

export const marketActivitySummary = {
  weeklyVolume: 217300000,
  weeklyTrades: 2618,
  avgTicketSize: 83025,
  concentrationIndex: 58, // top 5 share %
  volumeGrowth: 8.5, // week-on-week %
  tradeGrowth: 12.3,
};

// Price Discovery Layer - "Is the market working?"
export interface PriceDiscoveryData {
  date: string;
  vwap: number;
  high: number;
  low: number;
  parallelRate: number;
  intradayVolatility: number; // percentage
}

export const priceDiscoveryTrend: PriceDiscoveryData[] = [
  { date: 'Jan 10', vwap: 12.35, high: 12.42, low: 12.28, parallelRate: 12.85, intradayVolatility: 0.8 },
  { date: 'Jan 11', vwap: 12.38, high: 12.45, low: 12.31, parallelRate: 12.82, intradayVolatility: 0.9 },
  { date: 'Jan 12', vwap: 12.42, high: 12.48, low: 12.36, parallelRate: 12.78, intradayVolatility: 0.7 },
  { date: 'Jan 13', vwap: 12.40, high: 12.46, low: 12.34, parallelRate: 12.75, intradayVolatility: 0.6 },
  { date: 'Jan 14', vwap: 12.41, high: 12.47, low: 12.35, parallelRate: 12.72, intradayVolatility: 0.5 },
  { date: 'Jan 15', vwap: 12.42, high: 12.48, low: 12.38, parallelRate: 12.68, intradayVolatility: 0.4 },
  { date: 'Jan 16', vwap: 12.44, high: 12.50, low: 12.40, parallelRate: 12.65, intradayVolatility: 0.5 },
];

export const priceDiscoverySummary = {
  currentVwap: 12.44,
  weeklyHigh: 12.50,
  weeklyLow: 12.28,
  parallelSpread: 1.7, // percentage premium
  spreadCompression: -18, // bps improvement week-on-week
  avgVolatility: 0.63,
};

// Flow Composition Layer - "Where is FX really coming from?"
export interface FlowCompositionData {
  category: string;
  percentage: number;
  weeklyChange: number;
  color: string;
}

export const flowComposition: FlowCompositionData[] = [
  { category: 'Diaspora Remittances', percentage: 42, weeklyChange: 2.5, color: 'hsl(45, 93%, 58%)' },
  { category: 'Exporter Receipts', percentage: 28, weeklyChange: -1.2, color: 'hsl(222, 47%, 35%)' },
  { category: 'Financial Institutions', percentage: 18, weeklyChange: 0.8, color: 'hsl(199, 89%, 48%)' },
  { category: 'Corporate Demand', percentage: 12, weeklyChange: -2.1, color: 'hsl(142, 71%, 45%)' },
];

// Confidence Indicators - "Is the market gaining trust?"
export interface ConfidenceData {
  metric: string;
  currentValue: number;
  previousValue: number;
  unit: string;
  isPositive: boolean;
  trend: 'up' | 'down' | 'stable';
}

export const confidenceIndicators: ConfidenceData[] = [
  { metric: 'Parallel vs Official Spread', currentValue: 1.7, previousValue: 3.2, unit: '%', isPositive: true, trend: 'down' },
  { metric: 'Volume Growth (WoW)', currentValue: 8.5, previousValue: 5.2, unit: '%', isPositive: true, trend: 'up' },
  { metric: 'Formal Flow Share', currentValue: 78, previousValue: 72, unit: '%', isPositive: true, trend: 'up' },
  { metric: 'Repeat Participation', currentValue: 85, previousValue: 81, unit: '%', isPositive: true, trend: 'up' },
];

// EFEM/WBWS Window Summary (Willing Buyer-Willing Seller)
export const tradingWindowSummary = {
  morningSession: {
    window: '09:00 - 12:00',
    volume: 85000000,
    trades: 156,
    vwap: 12.42,
  },
  afternoonSession: {
    window: '14:00 - 16:00',
    volume: 62000000,
    trades: 98,
    vwap: 12.44,
  },
  totalDaily: {
    volume: 147000000,
    trades: 254,
    avgVwap: 12.43,
  },
};

// Sectoral FX Netting (for Phase 2)
export const sectoralNetting = [
  { sector: 'Gold Mining', grossInflows: 48000000, netPosition: 32000000, nettingRatio: 33 },
  { sector: 'Cocoa Exports', grossInflows: 35000000, netPosition: 28000000, nettingRatio: 20 },
  { sector: 'Oil & Gas', grossInflows: 28000000, netPosition: 15000000, nettingRatio: 46 },
  { sector: 'Telecoms', grossInflows: 18000000, netPosition: 8000000, nettingRatio: 56 },
];

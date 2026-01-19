// NAFEM Market Data - Based on CBN Market Intelligence Reports
// Real FX market terminology and structures from Nigerian/West African markets

// ═══════════════════════════════════════════════════════════════════════════
// NAFEM (Nigerian Autonomous Foreign Exchange Market) EQUIVALENT DATA
// Adapted for Bank of Ghana FX Transparency Framework
// ═══════════════════════════════════════════════════════════════════════════

export interface NAFEMTurnoverData {
  week: string;
  weekEnding: string;
  turnover: number; // USD
  tradeCount: number;
  vwap: number;
  high: number;
  low: number;
  parallelRate: number;
  spreadBps: number;
  fpiVolume: number; // Foreign Portfolio Investment
  remittanceVolume: number;
  corporateVolume: number;
}

export interface CBNInterventionData {
  date: string;
  type: 'Sale to BDC' | 'Retail Dutch Auction' | 'Direct Injection' | 'Special Window';
  amount: number;
  rate: number;
  impactBps: number;
  description: string;
}

export interface RateAnalysis {
  metric: string;
  value: number | string;
  market: string;
  period: string;
  significance: string;
}

// Weekly NAFEM Turnover (Based on CBN Vol. 1 structure)
export const nafemTurnoverData: NAFEMTurnoverData[] = [
  { week: 'W1', weekEnding: 'Jan 5', turnover: 285000000, tradeCount: 342, vwap: 12.42, high: 12.55, low: 12.28, parallelRate: 12.95, spreadBps: 426, fpiVolume: 42000000, remittanceVolume: 168000000, corporateVolume: 75000000 },
  { week: 'W2', weekEnding: 'Jan 12', turnover: 312000000, tradeCount: 398, vwap: 12.38, high: 12.48, low: 12.25, parallelRate: 12.88, spreadBps: 404, fpiVolume: 61000000, remittanceVolume: 175000000, corporateVolume: 76000000 },
  { week: 'W3', weekEnding: 'Jan 19', turnover: 298000000, tradeCount: 365, vwap: 12.35, high: 12.45, low: 12.22, parallelRate: 12.78, spreadBps: 348, fpiVolume: 48000000, remittanceVolume: 180000000, corporateVolume: 70000000 },
  { week: 'W4', weekEnding: 'Jan 26', turnover: 335000000, tradeCount: 412, vwap: 12.40, high: 12.52, low: 12.32, parallelRate: 12.72, spreadBps: 258, fpiVolume: 55000000, remittanceVolume: 195000000, corporateVolume: 85000000 },
  { week: 'W5', weekEnding: 'Feb 2', turnover: 358000000, tradeCount: 445, vwap: 12.42, high: 12.50, low: 12.35, parallelRate: 12.68, spreadBps: 209, fpiVolume: 68000000, remittanceVolume: 205000000, corporateVolume: 85000000 },
  { week: 'W6', weekEnding: 'Feb 9', turnover: 342000000, tradeCount: 425, vwap: 12.44, high: 12.52, low: 12.38, parallelRate: 12.62, spreadBps: 145, fpiVolume: 52000000, remittanceVolume: 210000000, corporateVolume: 80000000 },
];

// Rate Analysis Summary (Based on NAFEM YTD 2024 Report)
export const rateAnalysisSummary: RateAnalysis[] = [
  { metric: 'YTD Daily Highest Rate', value: 13.25, market: 'Parallel', period: 'YTD 2024', significance: 'Peak pressure point - June 2024' },
  { metric: 'YTD Daily Lowest Rate', value: 11.85, market: 'Official VWAP', period: 'Q1 2024', significance: 'Post-intervention stability' },
  { metric: 'Average Daily Rate', value: 12.42, market: 'Official VWAP', period: 'Current Week', significance: 'Benchmark reference rate' },
  { metric: 'Weekly Highest Turnover', value: '$358M', market: 'Official Market', period: 'Feb W1', significance: 'Strong liquidity indicator' },
  { metric: 'Spread Compression', value: '-217 bps', market: 'Official vs Parallel', period: '4 Weeks', significance: 'Market convergence trend' },
];

// Central Bank Intervention Schedule
export const cbnInterventions: CBNInterventionData[] = [
  { date: 'Jan 15', type: 'Sale to BDC', amount: 25000000, rate: 12.35, impactBps: -15, description: 'Regular forex bureau supply' },
  { date: 'Jan 22', type: 'Direct Injection', amount: 45000000, rate: 12.38, impactBps: -22, description: 'Targeted market support' },
  { date: 'Jan 29', type: 'Retail Dutch Auction', amount: 35000000, rate: 12.40, impactBps: -18, description: 'Price discovery mechanism' },
  { date: 'Feb 5', type: 'Special Window', amount: 60000000, rate: 12.42, impactBps: -35, description: 'Importers support window' },
];

// ═══════════════════════════════════════════════════════════════════════════
// IMTO PERFORMANCE DATA (Based on CBN Vol. 4 - IMTOs and Remittance Players)
// ═══════════════════════════════════════════════════════════════════════════

export interface IMTOPerformanceData {
  id: string;
  name: string;
  category: 'Tier 1 IMTO' | 'Tier 2 IMTO' | 'FinTech' | 'Crypto Rails';
  monthlyVolume: number;
  monthlyValue: number;
  marketShare: number;
  avgTicketSize: number;
  fxPricingCompliance: number; // % within reference rate band
  dataTransparency: 'High' | 'Medium' | 'Low';
  settlementMethod: 'Direct to NAFEM' | 'Bank Intermediary' | 'Prefunded' | 'Crypto Bridge';
  riskScore: number; // 1-100
}

export const imtoPerformanceData: IMTOPerformanceData[] = [
  { id: 'IMTO001', name: 'Western Union', category: 'Tier 1 IMTO', monthlyVolume: 4200, monthlyValue: 52000000, marketShare: 22.5, avgTicketSize: 12380, fxPricingCompliance: 98, dataTransparency: 'High', settlementMethod: 'Direct to NAFEM', riskScore: 12 },
  { id: 'IMTO002', name: 'MoneyGram', category: 'Tier 1 IMTO', monthlyVolume: 3100, monthlyValue: 38500000, marketShare: 16.7, avgTicketSize: 12419, fxPricingCompliance: 96, dataTransparency: 'High', settlementMethod: 'Direct to NAFEM', riskScore: 15 },
  { id: 'IMTO003', name: 'WorldRemit', category: 'FinTech', monthlyVolume: 2800, monthlyValue: 35200000, marketShare: 15.2, avgTicketSize: 12571, fxPricingCompliance: 94, dataTransparency: 'High', settlementMethod: 'Bank Intermediary', riskScore: 18 },
  { id: 'IMTO004', name: 'Remitly', category: 'FinTech', monthlyVolume: 1650, monthlyValue: 20400000, marketShare: 8.8, avgTicketSize: 12363, fxPricingCompliance: 92, dataTransparency: 'High', settlementMethod: 'Prefunded', riskScore: 22 },
  { id: 'IMTO005', name: 'Ria Money Transfer', category: 'Tier 2 IMTO', monthlyVolume: 1900, monthlyValue: 23600000, marketShare: 10.2, avgTicketSize: 12421, fxPricingCompliance: 88, dataTransparency: 'Medium', settlementMethod: 'Bank Intermediary', riskScore: 28 },
  { id: 'IMTO006', name: 'Sendwave', category: 'FinTech', monthlyVolume: 1200, monthlyValue: 14800000, marketShare: 6.4, avgTicketSize: 12333, fxPricingCompliance: 85, dataTransparency: 'Medium', settlementMethod: 'Prefunded', riskScore: 32 },
  { id: 'IMTO007', name: 'Chipper Cash', category: 'FinTech', monthlyVolume: 850, monthlyValue: 10500000, marketShare: 4.5, avgTicketSize: 12353, fxPricingCompliance: 78, dataTransparency: 'Medium', settlementMethod: 'Crypto Bridge', riskScore: 45 },
  { id: 'IMTO008', name: 'Circle USDC', category: 'Crypto Rails', monthlyVolume: 420, monthlyValue: 5200000, marketShare: 2.3, avgTicketSize: 12381, fxPricingCompliance: 72, dataTransparency: 'Low', settlementMethod: 'Crypto Bridge', riskScore: 58 },
];

// ═══════════════════════════════════════════════════════════════════════════
// FX SUPPLY & DEMAND DYNAMICS (Based on CBN Vol. 3)
// ═══════════════════════════════════════════════════════════════════════════

export interface FXSupplySource {
  source: string;
  weeklyValue: number;
  monthlyTrend: number;
  share: number;
  reliability: 'High' | 'Medium' | 'Low' | 'Variable';
  policyImplication: string;
}

export interface FXDemandCategory {
  category: string;
  weeklyValue: number;
  priority: 'Essential' | 'Commercial' | 'Discretionary';
  share: number;
  growthRate: number;
  policyImplication: string;
}

export const fxSupplySources: FXSupplySource[] = [
  { source: 'Diaspora Remittances', weeklyValue: 168000000, monthlyTrend: 8.5, share: 35.2, reliability: 'High', policyImplication: 'Key stabilization source - incentivize formal channels' },
  { source: 'Exporter Receipts (Gold)', weeklyValue: 92000000, monthlyTrend: 12.3, share: 19.3, reliability: 'Medium', policyImplication: 'Mandate NAFEM settlement' },
  { source: 'Exporter Receipts (Cocoa)', weeklyValue: 78000000, monthlyTrend: -2.1, share: 16.4, reliability: 'High', policyImplication: 'Seasonal - plan interventions' },
  { source: 'Oil & Gas Sector', weeklyValue: 58000000, monthlyTrend: 5.8, share: 12.2, reliability: 'Variable', policyImplication: 'NNPC coordination critical' },
  { source: 'FPI/FDI Inflows', weeklyValue: 36000000, monthlyTrend: -5.2, share: 7.5, reliability: 'Low', policyImplication: 'Sentiment-driven - monitor closely' },
  { source: 'Other Exports', weeklyValue: 45000000, monthlyTrend: 3.4, share: 9.4, reliability: 'Medium', policyImplication: 'Diversification potential' },
];

export const fxDemandCategories: FXDemandCategory[] = [
  { category: 'Import Payments (Essential)', weeklyValue: 95000000, priority: 'Essential', share: 22.0, growthRate: 4.2, policyImplication: 'Priority allocation window' },
  { category: 'Import Payments (Commercial)', weeklyValue: 90000000, priority: 'Commercial', share: 20.8, growthRate: 6.8, policyImplication: 'NAFEM bidding process' },
  { category: 'Debt Service', weeklyValue: 68000000, priority: 'Essential', share: 15.7, growthRate: 2.1, policyImplication: 'Scheduled - pre-allocated' },
  { category: 'Profit Repatriation', weeklyValue: 52000000, priority: 'Commercial', share: 12.0, growthRate: 8.5, policyImplication: 'Monitor MNC outflows' },
  { category: 'Travel & Education', weeklyValue: 48000000, priority: 'Discretionary', share: 11.1, growthRate: 12.3, policyImplication: 'BTA/PTA limits apply' },
  { category: 'Oil & Fuel Imports', weeklyValue: 45000000, priority: 'Essential', share: 10.4, growthRate: -3.2, policyImplication: 'Refinery impact expected' },
  { category: 'Other Outflows', weeklyValue: 34000000, priority: 'Discretionary', share: 7.9, growthRate: 5.1, policyImplication: 'Scrutinize for round-tripping' },
];

// ═══════════════════════════════════════════════════════════════════════════
// MARKET TRANSPARENCY METRICS
// ═══════════════════════════════════════════════════════════════════════════

export interface TransparencyMetric {
  dimension: string;
  score: number;
  maxScore: number;
  trend: 'improving' | 'stable' | 'declining';
  description: string;
  recommendation: string;
}

export const transparencyMetrics: TransparencyMetric[] = [
  { dimension: 'Rate Discovery', score: 78, maxScore: 100, trend: 'improving', description: 'VWAP publication and reference rate adoption', recommendation: 'Mandate all IMTOs within 2.5% band' },
  { dimension: 'Volume Reporting', score: 72, maxScore: 100, trend: 'improving', description: 'Daily trade volume disclosure', recommendation: 'Real-time reporting for Tier 1 IMTOs' },
  { dimension: 'Flow Composition', score: 65, maxScore: 100, trend: 'stable', description: 'Visibility into FX sources', recommendation: 'Crypto flow monitoring required' },
  { dimension: 'Participant Compliance', score: 85, maxScore: 100, trend: 'improving', description: 'Licensed entity adherence', recommendation: 'Audit schedule for Tier 2 IMTOs' },
  { dimension: 'Settlement Tracking', score: 68, maxScore: 100, trend: 'stable', description: 'End-to-end settlement visibility', recommendation: 'T+0 settlement mandate' },
  { dimension: 'Data Quality', score: 82, maxScore: 100, trend: 'improving', description: 'Accuracy and completeness', recommendation: 'Automated validation rules' },
];

// Market Intelligence Summary
export const marketIntelligenceSummary = {
  currentVWAP: 12.44,
  weeklyChange: -0.8,
  parallelPremium: 1.45,
  spreadCompression: 217, // bps improvement from peak
  formalMarketShare: 78,
  informalMarketShare: 22,
  targetFormalShare: 90,
  weeklyTurnover: 342000000,
  turnoverGrowth: 8.5,
  avgDailyVolume: 48900000,
  remittanceShare: 61.4,
  interventionImpact: -35, // bps
  nextInterventionEstimate: 'Feb 12',
  confidenceIndex: 72,
  previousConfidenceIndex: 65,
};

// Strategic Recommendations (Based on CBN Reports)
export const strategicRecommendations = [
  {
    id: 'REC001',
    title: 'Unified Benchmark Reference Rate',
    priority: 'High',
    status: 'In Progress',
    description: 'Implement standardized VWAP reference rate for all IMTO transactions within 2.5% band',
    impact: 'Reduces parallel market premium by estimated 150 bps',
    timeline: '60 days',
  },
  {
    id: 'REC002',
    title: 'IMTO Settlement via NAFEM',
    priority: 'High',
    status: 'Pilot',
    description: 'Mandate direct NAFEM settlement for Tier 1 IMTOs, bank intermediary phase-out',
    impact: 'Increases formal market liquidity by $50M weekly',
    timeline: '90 days',
  },
  {
    id: 'REC003',
    title: 'Crypto Rails Monitoring Framework',
    priority: 'Medium',
    status: 'Planning',
    description: 'Establish SEC collaboration for stablecoin transaction monitoring',
    impact: 'Captures estimated $15M weekly informal flows',
    timeline: '120 days',
  },
  {
    id: 'REC004',
    title: 'Outbound Remittance Authorization',
    priority: 'Medium',
    status: 'Under Review',
    description: 'Authorize limited outbound as 25% of inbound to formalize offshore settlements',
    impact: 'Kenya model: 16% YoY growth after liberalization',
    timeline: '180 days',
  },
];

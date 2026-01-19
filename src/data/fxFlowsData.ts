// Comprehensive FX Flows Data - All Segments for Regulatory Dashboard

export interface FXFlowSegment {
  id: string;
  name: string;
  category: 'inflow' | 'outflow';
  type: 'Diaspora' | 'FDI' | 'FPI' | 'Trade' | 'Services' | 'Transfers' | 'Debt' | 'Investment';
  description: string;
  dailyVolume: number;
  dailyValue: number;
  weeklyValue: number;
  monthlyValue: number;
  ytdValue: number;
  marketShare: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  averageRate: number;
  participantCount: number;
  complianceScore: number;
  dataQuality: 'High' | 'Medium' | 'Low';
  reportingFrequency: 'Real-time' | 'Daily' | 'Weekly' | 'Monthly';
}

export interface DailyFlowBreakdown {
  date: string;
  diasporaInflows: number;
  fdiInflows: number;
  fpiInflows: number;
  exportReceipts: number;
  servicesInflows: number;
  otherInflows: number;
  importPayments: number;
  debtService: number;
  dividendRepatriation: number;
  servicesOutflows: number;
  otherOutflows: number;
  netPosition: number;
}

// FX Flow Segments - Comprehensive breakdown
export const fxFlowSegments: FXFlowSegment[] = [
  // INFLOWS
  {
    id: 'FX-IN-001',
    name: 'Diaspora Remittances',
    category: 'inflow',
    type: 'Diaspora',
    description: 'Personal transfers from Ghanaian diaspora to families and businesses',
    dailyVolume: 12500,
    dailyValue: 24000000,
    weeklyValue: 168000000,
    monthlyValue: 720000000,
    ytdValue: 8640000000,
    marketShare: 35.2,
    trend: 'up',
    changePercent: 8.5,
    averageRate: 12.42,
    participantCount: 9,
    complianceScore: 94,
    dataQuality: 'High',
    reportingFrequency: 'Real-time'
  },
  {
    id: 'FX-IN-002',
    name: 'Foreign Direct Investment',
    category: 'inflow',
    type: 'FDI',
    description: 'Long-term capital investments into Ghana by foreign entities',
    dailyVolume: 45,
    dailyValue: 18500000,
    weeklyValue: 92500000,
    monthlyValue: 370000000,
    ytdValue: 4440000000,
    marketShare: 18.4,
    trend: 'up',
    changePercent: 12.3,
    averageRate: 12.38,
    participantCount: 156,
    complianceScore: 98,
    dataQuality: 'High',
    reportingFrequency: 'Daily'
  },
  {
    id: 'FX-IN-003',
    name: 'Foreign Portfolio Investment',
    category: 'inflow',
    type: 'FPI',
    description: 'Securities investments - equities and debt instruments',
    dailyVolume: 128,
    dailyValue: 8200000,
    weeklyValue: 41000000,
    monthlyValue: 164000000,
    ytdValue: 1968000000,
    marketShare: 8.2,
    trend: 'down',
    changePercent: -15.2,
    averageRate: 12.40,
    participantCount: 42,
    complianceScore: 96,
    dataQuality: 'High',
    reportingFrequency: 'Real-time'
  },
  {
    id: 'FX-IN-004',
    name: 'Export Receivables - Gold',
    category: 'inflow',
    type: 'Trade',
    description: 'FX inflows from gold mining and exports',
    dailyVolume: 12,
    dailyValue: 13200000,
    weeklyValue: 92000000,
    monthlyValue: 368000000,
    ytdValue: 4416000000,
    marketShare: 19.3,
    trend: 'up',
    changePercent: 12.3,
    averageRate: 12.36,
    participantCount: 8,
    complianceScore: 92,
    dataQuality: 'High',
    reportingFrequency: 'Daily'
  },
  {
    id: 'FX-IN-005',
    name: 'Export Receivables - Cocoa',
    category: 'inflow',
    type: 'Trade',
    description: 'FX inflows from cocoa board exports',
    dailyVolume: 8,
    dailyValue: 11150000,
    weeklyValue: 78000000,
    monthlyValue: 312000000,
    ytdValue: 3744000000,
    marketShare: 16.4,
    trend: 'stable',
    changePercent: 2.1,
    averageRate: 12.35,
    participantCount: 3,
    complianceScore: 99,
    dataQuality: 'High',
    reportingFrequency: 'Weekly'
  },
  {
    id: 'FX-IN-006',
    name: 'Export Receivables - Oil & Gas',
    category: 'inflow',
    type: 'Trade',
    description: 'Petroleum export receipts and offshore services',
    dailyVolume: 6,
    dailyValue: 8300000,
    weeklyValue: 58000000,
    monthlyValue: 232000000,
    ytdValue: 2784000000,
    marketShare: 12.2,
    trend: 'stable',
    changePercent: 2.1,
    averageRate: 12.38,
    participantCount: 6,
    complianceScore: 97,
    dataQuality: 'High',
    reportingFrequency: 'Daily'
  },
  {
    id: 'FX-IN-007',
    name: 'Other Export Receivables',
    category: 'inflow',
    type: 'Trade',
    description: 'Non-traditional exports including cashew, shea, timber',
    dailyVolume: 85,
    dailyValue: 6400000,
    weeklyValue: 45000000,
    monthlyValue: 180000000,
    ytdValue: 2160000000,
    marketShare: 9.4,
    trend: 'up',
    changePercent: 5.8,
    averageRate: 12.39,
    participantCount: 124,
    complianceScore: 78,
    dataQuality: 'Medium',
    reportingFrequency: 'Weekly'
  },
  {
    id: 'FX-IN-008',
    name: 'Services Inflows',
    category: 'inflow',
    type: 'Services',
    description: 'Tourism, ICT services, business services exports',
    dailyVolume: 320,
    dailyValue: 4800000,
    weeklyValue: 33600000,
    monthlyValue: 134400000,
    ytdValue: 1612800000,
    marketShare: 7.1,
    trend: 'up',
    changePercent: 18.5,
    averageRate: 12.41,
    participantCount: 215,
    complianceScore: 72,
    dataQuality: 'Medium',
    reportingFrequency: 'Weekly'
  },
  // OUTFLOWS
  {
    id: 'FX-OUT-001',
    name: 'Import Payments',
    category: 'outflow',
    type: 'Trade',
    description: 'Letters of credit and direct import payments',
    dailyVolume: 1850,
    dailyValue: 26400000,
    weeklyValue: 185000000,
    monthlyValue: 740000000,
    ytdValue: 8880000000,
    marketShare: 42.8,
    trend: 'stable',
    changePercent: 1.2,
    averageRate: 12.45,
    participantCount: 1250,
    complianceScore: 88,
    dataQuality: 'High',
    reportingFrequency: 'Daily'
  },
  {
    id: 'FX-OUT-002',
    name: 'External Debt Service',
    category: 'outflow',
    type: 'Debt',
    description: 'Sovereign and corporate external debt payments',
    dailyVolume: 12,
    dailyValue: 9700000,
    weeklyValue: 68000000,
    monthlyValue: 272000000,
    ytdValue: 3264000000,
    marketShare: 15.7,
    trend: 'stable',
    changePercent: 0.5,
    averageRate: 12.40,
    participantCount: 45,
    complianceScore: 100,
    dataQuality: 'High',
    reportingFrequency: 'Daily'
  },
  {
    id: 'FX-OUT-003',
    name: 'Dividend & Profit Repatriation',
    category: 'outflow',
    type: 'Investment',
    description: 'Foreign investor dividend and profit transfers',
    dailyVolume: 68,
    dailyValue: 7400000,
    weeklyValue: 52000000,
    monthlyValue: 208000000,
    ytdValue: 2496000000,
    marketShare: 12.0,
    trend: 'down',
    changePercent: -8.5,
    averageRate: 12.43,
    participantCount: 89,
    complianceScore: 95,
    dataQuality: 'High',
    reportingFrequency: 'Daily'
  },
  {
    id: 'FX-OUT-004',
    name: 'Travel & Education',
    category: 'outflow',
    type: 'Services',
    description: 'BTA, PTA, tuition and education-related transfers',
    dailyVolume: 2400,
    dailyValue: 6850000,
    weeklyValue: 48000000,
    monthlyValue: 192000000,
    ytdValue: 2304000000,
    marketShare: 11.1,
    trend: 'up',
    changePercent: 6.2,
    averageRate: 12.48,
    participantCount: 850,
    complianceScore: 82,
    dataQuality: 'Medium',
    reportingFrequency: 'Daily'
  },
  {
    id: 'FX-OUT-005',
    name: 'Oil & Fuel Imports',
    category: 'outflow',
    type: 'Trade',
    description: 'Petroleum product imports and bunker fuel',
    dailyVolume: 18,
    dailyValue: 6430000,
    weeklyValue: 45000000,
    monthlyValue: 180000000,
    ytdValue: 2160000000,
    marketShare: 10.4,
    trend: 'down',
    changePercent: -3.2,
    averageRate: 12.44,
    participantCount: 12,
    complianceScore: 96,
    dataQuality: 'High',
    reportingFrequency: 'Daily'
  },
  {
    id: 'FX-OUT-006',
    name: 'Telecom Repatriation',
    category: 'outflow',
    type: 'Services',
    description: 'Telecom operators dividend and service payments',
    dailyVolume: 8,
    dailyValue: 3140000,
    weeklyValue: 22000000,
    monthlyValue: 88000000,
    ytdValue: 1056000000,
    marketShare: 5.1,
    trend: 'down',
    changePercent: -5.8,
    averageRate: 12.42,
    participantCount: 4,
    complianceScore: 94,
    dataQuality: 'High',
    reportingFrequency: 'Weekly'
  },
  {
    id: 'FX-OUT-007',
    name: 'Other Outflows',
    category: 'outflow',
    type: 'Transfers',
    description: 'Miscellaneous current account outflows',
    dailyVolume: 420,
    dailyValue: 4850000,
    weeklyValue: 34000000,
    monthlyValue: 136000000,
    ytdValue: 1632000000,
    marketShare: 7.9,
    trend: 'stable',
    changePercent: 1.5,
    averageRate: 12.46,
    participantCount: 380,
    complianceScore: 68,
    dataQuality: 'Low',
    reportingFrequency: 'Weekly'
  }
];

// Daily flow breakdown for time-series analysis
export const dailyFlowBreakdown: DailyFlowBreakdown[] = [
  { date: 'Jan 12', diasporaInflows: 22800000, fdiInflows: 15200000, fpiInflows: 7800000, exportReceipts: 35200000, servicesInflows: 4200000, otherInflows: 2800000, importPayments: 25800000, debtService: 9200000, dividendRepatriation: 6800000, servicesOutflows: 9500000, otherOutflows: 4200000, netPosition: 32500000 },
  { date: 'Jan 13', diasporaInflows: 24500000, fdiInflows: 18900000, fpiInflows: 8500000, exportReceipts: 38600000, servicesInflows: 4800000, otherInflows: 3100000, importPayments: 26200000, debtService: 9800000, dividendRepatriation: 7200000, servicesOutflows: 10100000, otherOutflows: 4500000, netPosition: 40600000 },
  { date: 'Jan 14', diasporaInflows: 23200000, fdiInflows: 16800000, fpiInflows: 6200000, exportReceipts: 32100000, servicesInflows: 4500000, otherInflows: 2600000, importPayments: 24500000, debtService: 8900000, dividendRepatriation: 6500000, servicesOutflows: 9200000, otherOutflows: 4100000, netPosition: 32200000 },
  { date: 'Jan 15', diasporaInflows: 25800000, fdiInflows: 21500000, fpiInflows: 9200000, exportReceipts: 41200000, servicesInflows: 5200000, otherInflows: 3400000, importPayments: 28100000, debtService: 10500000, dividendRepatriation: 7800000, servicesOutflows: 10800000, otherOutflows: 4800000, netPosition: 44300000 },
  { date: 'Jan 16', diasporaInflows: 24100000, fdiInflows: 19200000, fpiInflows: 8100000, exportReceipts: 36800000, servicesInflows: 4600000, otherInflows: 2900000, importPayments: 26800000, debtService: 9600000, dividendRepatriation: 7100000, servicesOutflows: 9800000, otherOutflows: 4400000, netPosition: 38000000 },
  { date: 'Jan 17', diasporaInflows: 26200000, fdiInflows: 22800000, fpiInflows: 9800000, exportReceipts: 42500000, servicesInflows: 5400000, otherInflows: 3600000, importPayments: 29200000, debtService: 11200000, dividendRepatriation: 8200000, servicesOutflows: 11200000, otherOutflows: 5100000, netPosition: 45400000 },
  { date: 'Jan 18', diasporaInflows: 24800000, fdiInflows: 18500000, fpiInflows: 7600000, exportReceipts: 38900000, servicesInflows: 4900000, otherInflows: 3200000, importPayments: 27500000, debtService: 9900000, dividendRepatriation: 7400000, servicesOutflows: 10200000, otherOutflows: 4600000, netPosition: 38300000 },
];

// Segment composition by type for pie charts
export const segmentComposition = {
  inflows: {
    total: 477000000,
    breakdown: [
      { name: 'Diaspora Remittances', value: 168000000, color: 'hsl(var(--chart-1))' },
      { name: 'FDI', value: 92500000, color: 'hsl(var(--chart-2))' },
      { name: 'FPI', value: 41000000, color: 'hsl(var(--chart-3))' },
      { name: 'Export Receivables', value: 141000000, color: 'hsl(var(--chart-4))' },
      { name: 'Services', value: 33600000, color: 'hsl(var(--chart-5))' },
    ]
  },
  outflows: {
    total: 432000000,
    breakdown: [
      { name: 'Import Payments', value: 185000000, color: 'hsl(var(--destructive))' },
      { name: 'Debt Service', value: 68000000, color: 'hsl(var(--chart-2))' },
      { name: 'Profit Repatriation', value: 52000000, color: 'hsl(var(--chart-3))' },
      { name: 'Travel & Education', value: 48000000, color: 'hsl(var(--chart-4))' },
      { name: 'Oil & Fuel', value: 45000000, color: 'hsl(var(--chart-5))' },
      { name: 'Other', value: 34000000, color: 'hsl(var(--muted))' },
    ]
  }
};

// Helper functions
export const getTotalInflows = () => fxFlowSegments.filter(s => s.category === 'inflow').reduce((sum, s) => sum + s.weeklyValue, 0);
export const getTotalOutflows = () => fxFlowSegments.filter(s => s.category === 'outflow').reduce((sum, s) => sum + s.weeklyValue, 0);
export const getNetPosition = () => getTotalInflows() - getTotalOutflows();
export const getInflowSegments = () => fxFlowSegments.filter(s => s.category === 'inflow');
export const getOutflowSegments = () => fxFlowSegments.filter(s => s.category === 'outflow');

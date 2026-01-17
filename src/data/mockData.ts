// Synthetic dataset for Remittance Visibility & Oversight Dashboard

export interface Institution {
  id: string;
  name: string;
  type: 'IMTO' | 'Bank' | 'PSP' | 'MMO';
  country: string;
  isActive: boolean;
  complianceScore: number;
  lastSubmission: string;
}

export interface RemittanceTransaction {
  id: string;
  sendingInstitution: string;
  receivingInstitution: string;
  corridor: string;
  amountSent: number;
  currencySent: string;
  amountPaid: number;
  currencyPaid: string;
  fxRate: number;
  settlementRail: 'Bank' | 'MMO' | 'Cash' | 'Digital Asset';
  status: 'Pending' | 'Matched' | 'Settled' | 'Exception';
  exceptionType?: string;
  timestamp: string;
  emergingRail: boolean;
}

export interface SettlementRecord {
  id: string;
  transactionId: string;
  offshoreSettlement: {
    amount: number;
    currency: string;
    date: string;
    status: 'Completed' | 'Pending' | 'Failed';
  };
  domesticPayout: {
    amount: number;
    currency: string;
    date: string;
    status: 'Completed' | 'Pending' | 'Failed';
  };
  reconciliationStatus: 'Matched' | 'Unmatched' | 'Pending Review' | 'Exception';
  variance: number;
}

export interface Submission {
  id: string;
  institutionId: string;
  institutionName: string;
  submissionDate: string;
  reportingPeriod: string;
  transactionCount: number;
  totalValue: number;
  status: 'Draft' | 'Submitted' | 'Validated' | 'Approved' | 'Published' | 'Rejected';
  dataQualityScore: number;
  errorCount: number;
}

export interface CorridorData {
  corridor: string;
  origin: string;
  totalVolume: number;
  totalValue: number;
  channelMix: {
    bank: number;
    mmo: number;
    cash: number;
    digital: number;
  };
  avgFxRate: number;
  emergingRailPercent: number;
}

// Institutions
export const institutions: Institution[] = [
  { id: 'INST001', name: 'Western Union Ghana', type: 'IMTO', country: 'Ghana', isActive: true, complianceScore: 94, lastSubmission: '2024-01-15' },
  { id: 'INST002', name: 'MoneyGram Ghana', type: 'IMTO', country: 'Ghana', isActive: true, complianceScore: 91, lastSubmission: '2024-01-15' },
  { id: 'INST003', name: 'WorldRemit', type: 'IMTO', country: 'Ghana', isActive: true, complianceScore: 88, lastSubmission: '2024-01-14' },
  { id: 'INST004', name: 'Ria Money Transfer', type: 'IMTO', country: 'Ghana', isActive: true, complianceScore: 85, lastSubmission: '2024-01-15' },
  { id: 'INST005', name: 'Ghana Commercial Bank', type: 'Bank', country: 'Ghana', isActive: true, complianceScore: 96, lastSubmission: '2024-01-15' },
  { id: 'INST006', name: 'Ecobank Ghana', type: 'Bank', country: 'Ghana', isActive: true, complianceScore: 93, lastSubmission: '2024-01-15' },
  { id: 'INST007', name: 'Stanbic Bank Ghana', type: 'Bank', country: 'Ghana', isActive: true, complianceScore: 92, lastSubmission: '2024-01-14' },
  { id: 'INST008', name: 'MTN Mobile Money', type: 'MMO', country: 'Ghana', isActive: true, complianceScore: 89, lastSubmission: '2024-01-15' },
  { id: 'INST009', name: 'Vodafone Cash', type: 'MMO', country: 'Ghana', isActive: true, complianceScore: 87, lastSubmission: '2024-01-15' },
  { id: 'INST010', name: 'AirtelTigo Money', type: 'MMO', country: 'Ghana', isActive: false, complianceScore: 78, lastSubmission: '2024-01-10' },
  { id: 'INST011', name: 'Zeepay', type: 'PSP', country: 'Ghana', isActive: true, complianceScore: 90, lastSubmission: '2024-01-15' },
  { id: 'INST012', name: 'Fidelity Bank Ghana', type: 'Bank', country: 'Ghana', isActive: true, complianceScore: 91, lastSubmission: '2024-01-15' },
];

// Remittance Transactions
export const transactions: RemittanceTransaction[] = [
  { id: 'TXN001', sendingInstitution: 'Western Union UK', receivingInstitution: 'Western Union Ghana', corridor: 'UK-GH', amountSent: 500, currencySent: 'GBP', amountPaid: 7850, currencyPaid: 'GHS', fxRate: 15.70, settlementRail: 'Bank', status: 'Settled', timestamp: '2024-01-15T09:30:00Z', emergingRail: false },
  { id: 'TXN002', sendingInstitution: 'MoneyGram USA', receivingInstitution: 'MoneyGram Ghana', corridor: 'US-GH', amountSent: 1000, currencySent: 'USD', amountPaid: 12450, currencyPaid: 'GHS', fxRate: 12.45, settlementRail: 'Bank', status: 'Matched', timestamp: '2024-01-15T10:15:00Z', emergingRail: false },
  { id: 'TXN003', sendingInstitution: 'WorldRemit DE', receivingInstitution: 'MTN Mobile Money', corridor: 'DE-GH', amountSent: 200, currencySent: 'EUR', amountPaid: 2680, currencyPaid: 'GHS', fxRate: 13.40, settlementRail: 'MMO', status: 'Settled', timestamp: '2024-01-15T11:00:00Z', emergingRail: false },
  { id: 'TXN004', sendingInstitution: 'Ria Money USA', receivingInstitution: 'Ghana Commercial Bank', corridor: 'US-GH', amountSent: 2500, currencySent: 'USD', amountPaid: 31000, currencyPaid: 'GHS', fxRate: 12.40, settlementRail: 'Bank', status: 'Pending', timestamp: '2024-01-15T11:30:00Z', emergingRail: false },
  { id: 'TXN005', sendingInstitution: 'Western Union CA', receivingInstitution: 'Vodafone Cash', corridor: 'CA-GH', amountSent: 300, currencySent: 'CAD', amountPaid: 2775, currencyPaid: 'GHS', fxRate: 9.25, settlementRail: 'MMO', status: 'Exception', exceptionType: 'FX Variance', timestamp: '2024-01-15T12:00:00Z', emergingRail: false },
  { id: 'TXN006', sendingInstitution: 'BitPesa', receivingInstitution: 'Zeepay', corridor: 'NG-GH', amountSent: 150000, currencySent: 'NGN', amountPaid: 1450, currencyPaid: 'GHS', fxRate: 0.0097, settlementRail: 'Digital Asset', status: 'Settled', timestamp: '2024-01-15T12:30:00Z', emergingRail: true },
  { id: 'TXN007', sendingInstitution: 'WorldRemit UK', receivingInstitution: 'Ecobank Ghana', corridor: 'UK-GH', amountSent: 750, currencySent: 'GBP', amountPaid: 11700, currencyPaid: 'GHS', fxRate: 15.60, settlementRail: 'Bank', status: 'Settled', timestamp: '2024-01-15T13:00:00Z', emergingRail: false },
  { id: 'TXN008', sendingInstitution: 'MoneyGram UK', receivingInstitution: 'MoneyGram Ghana', corridor: 'UK-GH', amountSent: 400, currencySent: 'GBP', amountPaid: 6240, currencyPaid: 'GHS', fxRate: 15.60, settlementRail: 'Cash', status: 'Matched', timestamp: '2024-01-15T13:30:00Z', emergingRail: false },
  { id: 'TXN009', sendingInstitution: 'Chipper Cash', receivingInstitution: 'MTN Mobile Money', corridor: 'US-GH', amountSent: 100, currencySent: 'USD', amountPaid: 1240, currencyPaid: 'GHS', fxRate: 12.40, settlementRail: 'Digital Asset', status: 'Pending', timestamp: '2024-01-15T14:00:00Z', emergingRail: true },
  { id: 'TXN010', sendingInstitution: 'Remitly', receivingInstitution: 'Fidelity Bank Ghana', corridor: 'US-GH', amountSent: 800, currencySent: 'USD', amountPaid: 9920, currencyPaid: 'GHS', fxRate: 12.40, settlementRail: 'Bank', status: 'Settled', timestamp: '2024-01-15T14:30:00Z', emergingRail: false },
  { id: 'TXN011', sendingInstitution: 'Western Union NL', receivingInstitution: 'Western Union Ghana', corridor: 'NL-GH', amountSent: 350, currencySent: 'EUR', amountPaid: 4690, currencyPaid: 'GHS', fxRate: 13.40, settlementRail: 'Bank', status: 'Settled', timestamp: '2024-01-15T15:00:00Z', emergingRail: false },
  { id: 'TXN012', sendingInstitution: 'Ria Money UK', receivingInstitution: 'Stanbic Bank Ghana', corridor: 'UK-GH', amountSent: 600, currencySent: 'GBP', amountPaid: 9360, currencyPaid: 'GHS', fxRate: 15.60, settlementRail: 'Bank', status: 'Exception', exceptionType: 'Missing Settlement', timestamp: '2024-01-15T15:30:00Z', emergingRail: false },
  { id: 'TXN013', sendingInstitution: 'MoneyGram DE', receivingInstitution: 'Vodafone Cash', corridor: 'DE-GH', amountSent: 250, currencySent: 'EUR', amountPaid: 3350, currencyPaid: 'GHS', fxRate: 13.40, settlementRail: 'MMO', status: 'Settled', timestamp: '2024-01-15T16:00:00Z', emergingRail: false },
  { id: 'TXN014', sendingInstitution: 'Sendwave', receivingInstitution: 'MTN Mobile Money', corridor: 'US-GH', amountSent: 200, currencySent: 'USD', amountPaid: 2480, currencyPaid: 'GHS', fxRate: 12.40, settlementRail: 'MMO', status: 'Matched', timestamp: '2024-01-15T16:30:00Z', emergingRail: false },
  { id: 'TXN015', sendingInstitution: 'Circle USDC', receivingInstitution: 'Zeepay', corridor: 'US-GH', amountSent: 5000, currencySent: 'USD', amountPaid: 62000, currencyPaid: 'GHS', fxRate: 12.40, settlementRail: 'Digital Asset', status: 'Settled', timestamp: '2024-01-15T17:00:00Z', emergingRail: true },
];

// Settlement Records
export const settlements: SettlementRecord[] = transactions.map((txn, idx) => ({
  id: `STL${String(idx + 1).padStart(3, '0')}`,
  transactionId: txn.id,
  offshoreSettlement: {
    amount: txn.amountSent,
    currency: txn.currencySent,
    date: txn.timestamp,
    status: txn.status === 'Exception' && txn.exceptionType === 'Missing Settlement' ? 'Pending' : 'Completed',
  },
  domesticPayout: {
    amount: txn.amountPaid,
    currency: txn.currencyPaid,
    date: txn.status === 'Pending' ? '' : txn.timestamp,
    status: txn.status === 'Pending' ? 'Pending' : txn.status === 'Exception' ? 'Failed' : 'Completed',
  },
  reconciliationStatus: txn.status === 'Settled' ? 'Matched' : txn.status === 'Exception' ? 'Exception' : txn.status === 'Matched' ? 'Matched' : 'Pending Review',
  variance: txn.status === 'Exception' && txn.exceptionType === 'FX Variance' ? 2.5 : 0,
}));

// Submissions
export const submissions: Submission[] = [
  { id: 'SUB001', institutionId: 'INST001', institutionName: 'Western Union Ghana', submissionDate: '2024-01-15', reportingPeriod: 'Jan 2024 Week 2', transactionCount: 1250, totalValue: 15500000, status: 'Published', dataQualityScore: 96, errorCount: 0 },
  { id: 'SUB002', institutionId: 'INST002', institutionName: 'MoneyGram Ghana', submissionDate: '2024-01-15', reportingPeriod: 'Jan 2024 Week 2', transactionCount: 890, totalValue: 11200000, status: 'Approved', dataQualityScore: 92, errorCount: 3 },
  { id: 'SUB003', institutionId: 'INST005', institutionName: 'Ghana Commercial Bank', submissionDate: '2024-01-15', reportingPeriod: 'Jan 2024 Week 2', transactionCount: 2100, totalValue: 28500000, status: 'Validated', dataQualityScore: 98, errorCount: 0 },
  { id: 'SUB004', institutionId: 'INST008', institutionName: 'MTN Mobile Money', submissionDate: '2024-01-15', reportingPeriod: 'Jan 2024 Week 2', transactionCount: 3500, totalValue: 8900000, status: 'Submitted', dataQualityScore: 85, errorCount: 12 },
  { id: 'SUB005', institutionId: 'INST003', institutionName: 'WorldRemit', submissionDate: '2024-01-14', reportingPeriod: 'Jan 2024 Week 2', transactionCount: 780, totalValue: 9800000, status: 'Rejected', dataQualityScore: 72, errorCount: 28 },
  { id: 'SUB006', institutionId: 'INST006', institutionName: 'Ecobank Ghana', submissionDate: '2024-01-15', reportingPeriod: 'Jan 2024 Week 2', transactionCount: 1650, totalValue: 22100000, status: 'Published', dataQualityScore: 94, errorCount: 1 },
  { id: 'SUB007', institutionId: 'INST011', institutionName: 'Zeepay', submissionDate: '2024-01-15', reportingPeriod: 'Jan 2024 Week 2', transactionCount: 420, totalValue: 5200000, status: 'Draft', dataQualityScore: 0, errorCount: 0 },
];

// Corridor Data
export const corridorData: CorridorData[] = [
  { corridor: 'US-GH', origin: 'United States', totalVolume: 4520, totalValue: 56200000, channelMix: { bank: 45, mmo: 30, cash: 15, digital: 10 }, avgFxRate: 12.42, emergingRailPercent: 8 },
  { corridor: 'UK-GH', origin: 'United Kingdom', totalVolume: 3890, totalValue: 48500000, channelMix: { bank: 55, mmo: 25, cash: 18, digital: 2 }, avgFxRate: 15.65, emergingRailPercent: 3 },
  { corridor: 'DE-GH', origin: 'Germany', totalVolume: 1250, totalValue: 15800000, channelMix: { bank: 40, mmo: 35, cash: 20, digital: 5 }, avgFxRate: 13.38, emergingRailPercent: 5 },
  { corridor: 'CA-GH', origin: 'Canada', totalVolume: 980, totalValue: 12100000, channelMix: { bank: 50, mmo: 28, cash: 20, digital: 2 }, avgFxRate: 9.22, emergingRailPercent: 2 },
  { corridor: 'NL-GH', origin: 'Netherlands', totalVolume: 720, totalValue: 8900000, channelMix: { bank: 48, mmo: 32, cash: 15, digital: 5 }, avgFxRate: 13.40, emergingRailPercent: 4 },
  { corridor: 'NG-GH', origin: 'Nigeria', totalVolume: 450, totalValue: 3200000, channelMix: { bank: 20, mmo: 40, cash: 10, digital: 30 }, avgFxRate: 0.0097, emergingRailPercent: 28 },
  { corridor: 'IT-GH', origin: 'Italy', totalVolume: 680, totalValue: 8200000, channelMix: { bank: 52, mmo: 28, cash: 18, digital: 2 }, avgFxRate: 13.35, emergingRailPercent: 2 },
  { corridor: 'FR-GH', origin: 'France', totalVolume: 560, totalValue: 6800000, channelMix: { bank: 50, mmo: 30, cash: 18, digital: 2 }, avgFxRate: 13.42, emergingRailPercent: 2 },
];

// Dashboard Summary Stats
export const dashboardStats = {
  totalInflows: {
    value: 159700000,
    volume: 13050,
    change: 12.5,
  },
  activeInstitutions: {
    active: 11,
    total: 12,
  },
  settlementSplit: {
    offshore: 65,
    onshore: 35,
  },
  reconciliationRate: 94.2,
  channelMix: {
    bank: 48,
    mmo: 30,
    cash: 16,
    digital: 6,
  },
  exceptions: {
    high: 2,
    medium: 5,
    low: 8,
  },
};

// Monthly Trend Data
export const monthlyTrends = [
  { month: 'Aug', inflows: 125000000, volume: 10200, reconciled: 92 },
  { month: 'Sep', inflows: 132000000, volume: 10800, reconciled: 93 },
  { month: 'Oct', inflows: 140000000, volume: 11500, reconciled: 91 },
  { month: 'Nov', inflows: 148000000, volume: 12200, reconciled: 94 },
  { month: 'Dec', inflows: 155000000, volume: 12800, reconciled: 95 },
  { month: 'Jan', inflows: 159700000, volume: 13050, reconciled: 94 },
];

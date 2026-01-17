// FX Market Segments & Commingling Data for Regulatory Dashboard

// International Remittance Players (Sending Side)
export interface InternationalPlayer {
  id: string;
  name: string;
  type: 'IMTO' | 'FinTech' | 'Bank' | 'CryptoRails';
  headquarters: string;
  corridors: string[];
  monthlyVolume: number;
  monthlyValue: number;
  avgTransactionSize: number;
  complianceRating: 'A' | 'B' | 'C';
}

// Local Termination Partners (Receiving Side in Ghana)
export interface LocalTerminationPartner {
  id: string;
  name: string;
  type: 'Bank' | 'MMO' | 'PSP' | 'Cash Agent Network';
  licenseNumber: string;
  isRegulated: boolean;
  settlementSpeed: 'Instant' | 'Same-Day' | 'T+1' | 'T+2';
  monthlyPayouts: number;
  avgPayoutSize: number;
  concentrationRisk: 'High' | 'Medium' | 'Low';
}

// Commingling Relationships (International ↔ Local)
export interface ComminglingRelationship {
  internationalPlayerId: string;
  internationalPlayerName: string;
  localPartnerId: string;
  localPartnerName: string;
  corridor: string;
  monthlyVolume: number;
  monthlyValue: number;
  settlementMethod: 'Prefunded' | 'Net Settlement' | 'Real-time' | 'Credit Line';
  comminglingRisk: 'High' | 'Medium' | 'Low';
  lastAuditDate: string;
  issues: string[];
}

// FX Market Segments
export interface FXMarketSegment {
  segment: string;
  description: string;
  weeklyVolume: number;
  weeklyValue: number;
  vwapRate: number;
  spreadBps: number;
  participantCount: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
}

// International Players
export const internationalPlayers: InternationalPlayer[] = [
  { id: 'IP001', name: 'Western Union', type: 'IMTO', headquarters: 'USA', corridors: ['US-GH', 'UK-GH', 'CA-GH', 'NL-GH'], monthlyVolume: 4200, monthlyValue: 52000000, avgTransactionSize: 12380, complianceRating: 'A' },
  { id: 'IP002', name: 'MoneyGram', type: 'IMTO', headquarters: 'USA', corridors: ['US-GH', 'UK-GH', 'DE-GH'], monthlyVolume: 3100, monthlyValue: 38500000, avgTransactionSize: 12419, complianceRating: 'A' },
  { id: 'IP003', name: 'WorldRemit', type: 'FinTech', headquarters: 'UK', corridors: ['UK-GH', 'DE-GH', 'FR-GH'], monthlyVolume: 2800, monthlyValue: 35200000, avgTransactionSize: 12571, complianceRating: 'A' },
  { id: 'IP004', name: 'Ria Money Transfer', type: 'IMTO', headquarters: 'USA', corridors: ['US-GH', 'UK-GH', 'IT-GH'], monthlyVolume: 1900, monthlyValue: 23600000, avgTransactionSize: 12421, complianceRating: 'B' },
  { id: 'IP005', name: 'Remitly', type: 'FinTech', headquarters: 'USA', corridors: ['US-GH', 'UK-GH'], monthlyVolume: 1650, monthlyValue: 20400000, avgTransactionSize: 12363, complianceRating: 'A' },
  { id: 'IP006', name: 'Sendwave', type: 'FinTech', headquarters: 'USA', corridors: ['US-GH', 'UK-GH'], monthlyVolume: 1200, monthlyValue: 14800000, avgTransactionSize: 12333, complianceRating: 'B' },
  { id: 'IP007', name: 'Chipper Cash', type: 'FinTech', headquarters: 'USA', corridors: ['US-GH', 'NG-GH'], monthlyVolume: 850, monthlyValue: 10500000, avgTransactionSize: 12353, complianceRating: 'B' },
  { id: 'IP008', name: 'Circle (USDC)', type: 'CryptoRails', headquarters: 'USA', corridors: ['US-GH', 'UK-GH'], monthlyVolume: 420, monthlyValue: 5200000, avgTransactionSize: 12381, complianceRating: 'B' },
  { id: 'IP009', name: 'BitPesa/AZA', type: 'CryptoRails', headquarters: 'Kenya', corridors: ['NG-GH', 'KE-GH'], monthlyVolume: 280, monthlyValue: 3400000, avgTransactionSize: 12142, complianceRating: 'C' },
];

// Local Termination Partners
export const localTerminationPartners: LocalTerminationPartner[] = [
  { id: 'LP001', name: 'Ghana Commercial Bank', type: 'Bank', licenseNumber: 'GCB-001', isRegulated: true, settlementSpeed: 'Same-Day', monthlyPayouts: 4500, avgPayoutSize: 8900, concentrationRisk: 'Low' },
  { id: 'LP002', name: 'Ecobank Ghana', type: 'Bank', licenseNumber: 'ECO-002', isRegulated: true, settlementSpeed: 'Same-Day', monthlyPayouts: 3800, avgPayoutSize: 9200, concentrationRisk: 'Low' },
  { id: 'LP003', name: 'Stanbic Bank Ghana', type: 'Bank', licenseNumber: 'STB-003', isRegulated: true, settlementSpeed: 'Same-Day', monthlyPayouts: 2900, avgPayoutSize: 11500, concentrationRisk: 'Low' },
  { id: 'LP004', name: 'Fidelity Bank Ghana', type: 'Bank', licenseNumber: 'FID-004', isRegulated: true, settlementSpeed: 'Same-Day', monthlyPayouts: 2200, avgPayoutSize: 8400, concentrationRisk: 'Low' },
  { id: 'LP005', name: 'MTN Mobile Money', type: 'MMO', licenseNumber: 'MTN-MMO-001', isRegulated: true, settlementSpeed: 'Instant', monthlyPayouts: 8500, avgPayoutSize: 3200, concentrationRisk: 'High' },
  { id: 'LP006', name: 'Vodafone Cash', type: 'MMO', licenseNumber: 'VOD-MMO-002', isRegulated: true, settlementSpeed: 'Instant', monthlyPayouts: 4200, avgPayoutSize: 2800, concentrationRisk: 'Medium' },
  { id: 'LP007', name: 'AirtelTigo Money', type: 'MMO', licenseNumber: 'ATM-MMO-003', isRegulated: true, settlementSpeed: 'Instant', monthlyPayouts: 1800, avgPayoutSize: 2500, concentrationRisk: 'Medium' },
  { id: 'LP008', name: 'Zeepay', type: 'PSP', licenseNumber: 'ZEE-PSP-001', isRegulated: true, settlementSpeed: 'Instant', monthlyPayouts: 2100, avgPayoutSize: 4100, concentrationRisk: 'Medium' },
  { id: 'LP009', name: 'Express Cash Network', type: 'Cash Agent Network', licenseNumber: 'ECN-AGT-001', isRegulated: true, settlementSpeed: 'Same-Day', monthlyPayouts: 1500, avgPayoutSize: 6800, concentrationRisk: 'High' },
  { id: 'LP010', name: 'PaySwitch', type: 'PSP', licenseNumber: 'PSW-PSP-002', isRegulated: true, settlementSpeed: 'Instant', monthlyPayouts: 980, avgPayoutSize: 5200, concentrationRisk: 'Low' },
];

// Commingling Relationships
export const comminglingRelationships: ComminglingRelationship[] = [
  { internationalPlayerId: 'IP001', internationalPlayerName: 'Western Union', localPartnerId: 'LP001', localPartnerName: 'Ghana Commercial Bank', corridor: 'US-GH', monthlyVolume: 1800, monthlyValue: 22300000, settlementMethod: 'Prefunded', comminglingRisk: 'Low', lastAuditDate: '2024-01-10', issues: [] },
  { internationalPlayerId: 'IP001', internationalPlayerName: 'Western Union', localPartnerId: 'LP009', localPartnerName: 'Express Cash Network', corridor: 'UK-GH', monthlyVolume: 950, monthlyValue: 11800000, settlementMethod: 'Net Settlement', comminglingRisk: 'High', lastAuditDate: '2023-11-15', issues: ['Delayed reporting', 'FX variance detected'] },
  { internationalPlayerId: 'IP002', internationalPlayerName: 'MoneyGram', localPartnerId: 'LP002', localPartnerName: 'Ecobank Ghana', corridor: 'US-GH', monthlyVolume: 1400, monthlyValue: 17400000, settlementMethod: 'Prefunded', comminglingRisk: 'Low', lastAuditDate: '2024-01-08', issues: [] },
  { internationalPlayerId: 'IP002', internationalPlayerName: 'MoneyGram', localPartnerId: 'LP005', localPartnerName: 'MTN Mobile Money', corridor: 'DE-GH', monthlyVolume: 850, monthlyValue: 10500000, settlementMethod: 'Real-time', comminglingRisk: 'Medium', lastAuditDate: '2024-01-05', issues: ['High volume variance'] },
  { internationalPlayerId: 'IP003', internationalPlayerName: 'WorldRemit', localPartnerId: 'LP005', localPartnerName: 'MTN Mobile Money', corridor: 'UK-GH', monthlyVolume: 2200, monthlyValue: 27300000, settlementMethod: 'Real-time', comminglingRisk: 'Medium', lastAuditDate: '2024-01-12', issues: [] },
  { internationalPlayerId: 'IP003', internationalPlayerName: 'WorldRemit', localPartnerId: 'LP006', localPartnerName: 'Vodafone Cash', corridor: 'DE-GH', monthlyVolume: 600, monthlyValue: 7500000, settlementMethod: 'Real-time', comminglingRisk: 'Low', lastAuditDate: '2024-01-11', issues: [] },
  { internationalPlayerId: 'IP005', internationalPlayerName: 'Remitly', localPartnerId: 'LP004', localPartnerName: 'Fidelity Bank Ghana', corridor: 'US-GH', monthlyVolume: 1100, monthlyValue: 13600000, settlementMethod: 'Prefunded', comminglingRisk: 'Low', lastAuditDate: '2024-01-09', issues: [] },
  { internationalPlayerId: 'IP006', internationalPlayerName: 'Sendwave', localPartnerId: 'LP005', localPartnerName: 'MTN Mobile Money', corridor: 'US-GH', monthlyVolume: 900, monthlyValue: 11100000, settlementMethod: 'Credit Line', comminglingRisk: 'High', lastAuditDate: '2023-12-20', issues: ['Settlement delay', 'Concentration risk'] },
  { internationalPlayerId: 'IP007', internationalPlayerName: 'Chipper Cash', localPartnerId: 'LP008', localPartnerName: 'Zeepay', corridor: 'NG-GH', monthlyVolume: 520, monthlyValue: 6400000, settlementMethod: 'Real-time', comminglingRisk: 'Medium', lastAuditDate: '2024-01-06', issues: ['Emerging rail monitoring'] },
  { internationalPlayerId: 'IP008', internationalPlayerName: 'Circle (USDC)', localPartnerId: 'LP008', localPartnerName: 'Zeepay', corridor: 'US-GH', monthlyVolume: 380, monthlyValue: 4700000, settlementMethod: 'Real-time', comminglingRisk: 'High', lastAuditDate: '2023-12-15', issues: ['Crypto settlement variance', 'FX exposure'] },
  { internationalPlayerId: 'IP009', internationalPlayerName: 'BitPesa/AZA', localPartnerId: 'LP008', localPartnerName: 'Zeepay', corridor: 'NG-GH', monthlyVolume: 280, monthlyValue: 3400000, settlementMethod: 'Real-time', comminglingRisk: 'High', lastAuditDate: '2023-11-28', issues: ['Limited transparency', 'Cross-border settlement'] },
];

// FX Market Segments
export const fxMarketSegments: FXMarketSegment[] = [
  { segment: 'Diaspora Remittances', description: 'Individual transfers from diaspora to families', weeklyVolume: 8500, weeklyValue: 42000000, vwapRate: 12.42, spreadBps: 185, participantCount: 9, trend: 'up', changePercent: 8.5 },
  { segment: 'Trade FX (Imports)', description: 'Commercial FX for import payments', weeklyVolume: 1200, weeklyValue: 85000000, vwapRate: 12.38, spreadBps: 45, participantCount: 23, trend: 'stable', changePercent: 1.2 },
  { segment: 'Trade FX (Exports)', description: 'FX inflows from export receipts', weeklyVolume: 650, weeklyValue: 62000000, vwapRate: 12.35, spreadBps: 38, participantCount: 18, trend: 'down', changePercent: -3.2 },
  { segment: 'Interbank Market', description: 'Bank-to-bank FX trading', weeklyVolume: 280, weeklyValue: 125000000, vwapRate: 12.40, spreadBps: 25, participantCount: 12, trend: 'stable', changePercent: 0.8 },
  { segment: 'Digital/Crypto Rails', description: 'Stablecoin and crypto-settled remittances', weeklyVolume: 420, weeklyValue: 5200000, vwapRate: 12.45, spreadBps: 210, participantCount: 4, trend: 'up', changePercent: 28.5 },
  { segment: 'Gold & Commodity FX', description: 'FX for gold exports and commodity trade', weeklyVolume: 85, weeklyValue: 48000000, vwapRate: 12.36, spreadBps: 32, participantCount: 8, trend: 'up', changePercent: 12.3 },
  { segment: 'Oil & Gas Services', description: 'Offshore oil service payments', weeklyVolume: 45, weeklyValue: 38000000, vwapRate: 12.38, spreadBps: 28, participantCount: 6, trend: 'stable', changePercent: 2.1 },
  { segment: 'Telecoms Offshore', description: 'Telecom operators FX repatriation', weeklyVolume: 32, weeklyValue: 22000000, vwapRate: 12.39, spreadBps: 35, participantCount: 4, trend: 'down', changePercent: -5.8 },
];

// VWAP Daily Trend
export const vwapTrend = [
  { date: 'Jan 10', rate: 12.35, volume: 18500000 },
  { date: 'Jan 11', rate: 12.38, volume: 22100000 },
  { date: 'Jan 12', rate: 12.42, volume: 19800000 },
  { date: 'Jan 13', rate: 12.40, volume: 21500000 },
  { date: 'Jan 14', rate: 12.41, volume: 20200000 },
  { date: 'Jan 15', rate: 12.42, volume: 24800000 },
  { date: 'Jan 16', rate: 12.44, volume: 23100000 },
];

// Sectoral FX Flows Summary
export const sectoralFlows = {
  inflows: [
    { sector: 'Diaspora Remittances', value: 168000000, share: 35.2 },
    { sector: 'Gold Exports', value: 92000000, share: 19.3 },
    { sector: 'Cocoa Exports', value: 78000000, share: 16.4 },
    { sector: 'Oil & Gas', value: 58000000, share: 12.2 },
    { sector: 'Other Exports', value: 45000000, share: 9.4 },
    { sector: 'FDI & Portfolio', value: 36000000, share: 7.5 },
  ],
  outflows: [
    { sector: 'Import Payments', value: 185000000, share: 42.8 },
    { sector: 'Debt Service', value: 68000000, share: 15.7 },
    { sector: 'Profit Repatriation', value: 52000000, share: 12.0 },
    { sector: 'Travel & Education', value: 48000000, share: 11.1 },
    { sector: 'Oil & Fuel', value: 45000000, share: 10.4 },
    { sector: 'Other Outflows', value: 34000000, share: 7.9 },
  ],
};

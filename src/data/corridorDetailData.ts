// Corridor Intelligence Data - Based on spec requirements
// "If diaspora is the lever, corridors are the knobs."

export interface CorridorDetail {
  corridorId: string;
  name: string;
  origin: string;
  destination: string;
  currency: string;
  volumeTrend: Array<{
    week: string;
    volume: number;
    value: number;
  }>;
  rateTrend: Array<{
    week: string;
    offeredRate: number;
    marketRate: number;
    spread: number;
  }>;
  settlementMix: {
    bankSettlement: number;
    netting: number;
    cryptoOffRamp: number;
    directPayout: number;
  };
  topOriginators: Array<{
    rank: number;
    name: string; // Anonymized: "IMTO A", "IMTO B" etc
    volume: number;
    share: number;
    avgTicket: number;
  }>;
  topTerminators: Array<{
    rank: number;
    name: string;
    volume: number;
    share: number;
    settlementSpeed: string;
  }>;
  metrics: {
    totalVolume: number;
    totalValue: number;
    avgTicketSize: number;
    weeklyGrowth: number;
    avgRate: number;
    parallelSpread: number;
    settlementT: number; // T+n days
    dataCompleteness: number;
  };
}

export const corridorDetails: CorridorDetail[] = [
  {
    corridorId: 'US-GH',
    name: 'United States → Ghana',
    origin: 'United States',
    destination: 'Ghana',
    currency: 'USD/GHS',
    volumeTrend: [
      { week: 'W1 Dec', volume: 4200, value: 52000000 },
      { week: 'W2 Dec', volume: 4350, value: 54200000 },
      { week: 'W3 Dec', volume: 4100, value: 51000000 },
      { week: 'W4 Dec', volume: 4800, value: 59500000 },
      { week: 'W1 Jan', volume: 4400, value: 54800000 },
      { week: 'W2 Jan', volume: 4520, value: 56200000 },
    ],
    rateTrend: [
      { week: 'W1 Dec', offeredRate: 12.35, marketRate: 12.42, spread: 0.56 },
      { week: 'W2 Dec', offeredRate: 12.38, marketRate: 12.45, spread: 0.56 },
      { week: 'W3 Dec', offeredRate: 12.40, marketRate: 12.44, spread: 0.32 },
      { week: 'W4 Dec', offeredRate: 12.42, marketRate: 12.46, spread: 0.32 },
      { week: 'W1 Jan', offeredRate: 12.40, marketRate: 12.44, spread: 0.32 },
      { week: 'W2 Jan', offeredRate: 12.42, marketRate: 12.44, spread: 0.16 },
    ],
    settlementMix: {
      bankSettlement: 45,
      netting: 25,
      cryptoOffRamp: 18,
      directPayout: 12,
    },
    topOriginators: [
      { rank: 1, name: 'IMTO A (Tier 1)', volume: 1450, share: 32, avgTicket: 12400 },
      { rank: 2, name: 'IMTO B (Tier 1)', volume: 980, share: 22, avgTicket: 11800 },
      { rank: 3, name: 'FinTech C', volume: 720, share: 16, avgTicket: 8500 },
      { rank: 4, name: 'IMTO D (Tier 2)', volume: 560, share: 12, avgTicket: 9200 },
      { rank: 5, name: 'Crypto Rails E', volume: 410, share: 9, avgTicket: 15200 },
    ],
    topTerminators: [
      { rank: 1, name: 'Tier-1 Bank A', volume: 1800, share: 40, settlementSpeed: 'T+1' },
      { rank: 2, name: 'MMO Provider B', volume: 1350, share: 30, settlementSpeed: 'T+0' },
      { rank: 3, name: 'Tier-1 Bank C', volume: 680, share: 15, settlementSpeed: 'T+1' },
      { rank: 4, name: 'PSP Provider D', volume: 450, share: 10, settlementSpeed: 'T+0' },
      { rank: 5, name: 'Tier-2 Bank E', volume: 240, share: 5, settlementSpeed: 'T+2' },
    ],
    metrics: {
      totalVolume: 4520,
      totalValue: 56200000,
      avgTicketSize: 12430,
      weeklyGrowth: 2.7,
      avgRate: 12.42,
      parallelSpread: 1.7,
      settlementT: 1.2,
      dataCompleteness: 94,
    },
  },
  {
    corridorId: 'UK-GH',
    name: 'United Kingdom → Ghana',
    origin: 'United Kingdom',
    destination: 'Ghana',
    currency: 'GBP/GHS',
    volumeTrend: [
      { week: 'W1 Dec', volume: 3600, value: 45000000 },
      { week: 'W2 Dec', volume: 3750, value: 47200000 },
      { week: 'W3 Dec', volume: 3500, value: 44000000 },
      { week: 'W4 Dec', volume: 4100, value: 51500000 },
      { week: 'W1 Jan', volume: 3800, value: 47800000 },
      { week: 'W2 Jan', volume: 3890, value: 48500000 },
    ],
    rateTrend: [
      { week: 'W1 Dec', offeredRate: 15.55, marketRate: 15.62, spread: 0.45 },
      { week: 'W2 Dec', offeredRate: 15.58, marketRate: 15.65, spread: 0.45 },
      { week: 'W3 Dec', offeredRate: 15.60, marketRate: 15.65, spread: 0.32 },
      { week: 'W4 Dec', offeredRate: 15.62, marketRate: 15.66, spread: 0.26 },
      { week: 'W1 Jan', offeredRate: 15.60, marketRate: 15.64, spread: 0.26 },
      { week: 'W2 Jan', offeredRate: 15.62, marketRate: 15.65, spread: 0.19 },
    ],
    settlementMix: {
      bankSettlement: 55,
      netting: 28,
      cryptoOffRamp: 5,
      directPayout: 12,
    },
    topOriginators: [
      { rank: 1, name: 'IMTO A (Tier 1)', volume: 1200, share: 31, avgTicket: 12500 },
      { rank: 2, name: 'IMTO B (Tier 1)', volume: 850, share: 22, avgTicket: 11200 },
      { rank: 3, name: 'FinTech C', volume: 620, share: 16, avgTicket: 7800 },
      { rank: 4, name: 'IMTO D (Tier 2)', volume: 480, share: 12, avgTicket: 8900 },
      { rank: 5, name: 'Bank Transfer E', volume: 380, share: 10, avgTicket: 18500 },
    ],
    topTerminators: [
      { rank: 1, name: 'Tier-1 Bank A', volume: 1550, share: 40, settlementSpeed: 'T+1' },
      { rank: 2, name: 'MMO Provider B', volume: 1170, share: 30, settlementSpeed: 'T+0' },
      { rank: 3, name: 'Tier-1 Bank C', volume: 580, share: 15, settlementSpeed: 'T+1' },
      { rank: 4, name: 'PSP Provider D', volume: 390, share: 10, settlementSpeed: 'T+0' },
      { rank: 5, name: 'Tier-2 Bank E', volume: 200, share: 5, settlementSpeed: 'T+2' },
    ],
    metrics: {
      totalVolume: 3890,
      totalValue: 48500000,
      avgTicketSize: 12470,
      weeklyGrowth: 2.4,
      avgRate: 15.65,
      parallelSpread: 1.2,
      settlementT: 1.0,
      dataCompleteness: 96,
    },
  },
  {
    corridorId: 'EU-GH',
    name: 'EU Countries → Ghana',
    origin: 'European Union',
    destination: 'Ghana',
    currency: 'EUR/GHS',
    volumeTrend: [
      { week: 'W1 Dec', volume: 2100, value: 27000000 },
      { week: 'W2 Dec', volume: 2200, value: 28500000 },
      { week: 'W3 Dec', volume: 2050, value: 26500000 },
      { week: 'W4 Dec', volume: 2400, value: 31000000 },
      { week: 'W1 Jan', volume: 2250, value: 29000000 },
      { week: 'W2 Jan', volume: 2350, value: 30500000 },
    ],
    rateTrend: [
      { week: 'W1 Dec', offeredRate: 13.32, marketRate: 13.38, spread: 0.45 },
      { week: 'W2 Dec', offeredRate: 13.35, marketRate: 13.40, spread: 0.37 },
      { week: 'W3 Dec', offeredRate: 13.36, marketRate: 13.40, spread: 0.30 },
      { week: 'W4 Dec', offeredRate: 13.38, marketRate: 13.42, spread: 0.30 },
      { week: 'W1 Jan', offeredRate: 13.36, marketRate: 13.40, spread: 0.30 },
      { week: 'W2 Jan', offeredRate: 13.38, marketRate: 13.40, spread: 0.15 },
    ],
    settlementMix: {
      bankSettlement: 48,
      netting: 30,
      cryptoOffRamp: 8,
      directPayout: 14,
    },
    topOriginators: [
      { rank: 1, name: 'IMTO A (Germany)', volume: 750, share: 32, avgTicket: 13000 },
      { rank: 2, name: 'IMTO B (Netherlands)', volume: 520, share: 22, avgTicket: 12500 },
      { rank: 3, name: 'FinTech C (France)', volume: 380, share: 16, avgTicket: 8200 },
      { rank: 4, name: 'IMTO D (Italy)', volume: 280, share: 12, avgTicket: 9500 },
      { rank: 5, name: 'Bank E (Belgium)', volume: 210, share: 9, avgTicket: 16000 },
    ],
    topTerminators: [
      { rank: 1, name: 'Tier-1 Bank A', volume: 940, share: 40, settlementSpeed: 'T+1' },
      { rank: 2, name: 'MMO Provider B', volume: 705, share: 30, settlementSpeed: 'T+0' },
      { rank: 3, name: 'Tier-1 Bank C', volume: 350, share: 15, settlementSpeed: 'T+1' },
      { rank: 4, name: 'PSP Provider D', volume: 235, share: 10, settlementSpeed: 'T+0' },
      { rank: 5, name: 'Tier-2 Bank E', volume: 120, share: 5, settlementSpeed: 'T+2' },
    ],
    metrics: {
      totalVolume: 2350,
      totalValue: 30500000,
      avgTicketSize: 12980,
      weeklyGrowth: 4.4,
      avgRate: 13.40,
      parallelSpread: 1.4,
      settlementT: 1.1,
      dataCompleteness: 91,
    },
  },
  {
    corridorId: 'NG-GH',
    name: 'Nigeria → Ghana',
    origin: 'Nigeria',
    destination: 'Ghana',
    currency: 'NGN/GHS',
    volumeTrend: [
      { week: 'W1 Dec', volume: 380, value: 2700000 },
      { week: 'W2 Dec', volume: 400, value: 2850000 },
      { week: 'W3 Dec', volume: 360, value: 2550000 },
      { week: 'W4 Dec', volume: 420, value: 3000000 },
      { week: 'W1 Jan', volume: 430, value: 3050000 },
      { week: 'W2 Jan', volume: 450, value: 3200000 },
    ],
    rateTrend: [
      { week: 'W1 Dec', offeredRate: 0.0095, marketRate: 0.0097, spread: 2.10 },
      { week: 'W2 Dec', offeredRate: 0.0096, marketRate: 0.0097, spread: 1.03 },
      { week: 'W3 Dec', offeredRate: 0.0096, marketRate: 0.0097, spread: 1.03 },
      { week: 'W4 Dec', offeredRate: 0.0097, marketRate: 0.0097, spread: 0.00 },
      { week: 'W1 Jan', offeredRate: 0.0096, marketRate: 0.0097, spread: 1.03 },
      { week: 'W2 Jan', offeredRate: 0.0097, marketRate: 0.0097, spread: 0.00 },
    ],
    settlementMix: {
      bankSettlement: 20,
      netting: 15,
      cryptoOffRamp: 45,
      directPayout: 20,
    },
    topOriginators: [
      { rank: 1, name: 'Crypto Rails A', volume: 180, share: 40, avgTicket: 7100 },
      { rank: 2, name: 'FinTech B', volume: 110, share: 24, avgTicket: 6800 },
      { rank: 3, name: 'IMTO C', volume: 70, share: 16, avgTicket: 8200 },
      { rank: 4, name: 'Bank D', volume: 50, share: 11, avgTicket: 12000 },
      { rank: 5, name: 'P2P Platform E', volume: 40, share: 9, avgTicket: 4500 },
    ],
    topTerminators: [
      { rank: 1, name: 'MMO Provider A', volume: 180, share: 40, settlementSpeed: 'T+0' },
      { rank: 2, name: 'Crypto Wallet B', volume: 135, share: 30, settlementSpeed: 'T+0' },
      { rank: 3, name: 'Tier-1 Bank C', volume: 67, share: 15, settlementSpeed: 'T+1' },
      { rank: 4, name: 'PSP Provider D', volume: 45, share: 10, settlementSpeed: 'T+0' },
      { rank: 5, name: 'Cash Agent E', volume: 23, share: 5, settlementSpeed: 'T+0' },
    ],
    metrics: {
      totalVolume: 450,
      totalValue: 3200000,
      avgTicketSize: 7111,
      weeklyGrowth: 4.7,
      avgRate: 0.0097,
      parallelSpread: 3.5,
      settlementT: 0.5,
      dataCompleteness: 78,
    },
  },
];

// Get corridor detail by ID
export const getCorridorById = (id: string): CorridorDetail | undefined => {
  return corridorDetails.find(c => c.corridorId === id);
};

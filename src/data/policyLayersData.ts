// Policy Learning System for FX Stability - 5-Layer Architecture
// "We are not selling software. We are selling a policy learning system for FX stability."
// Critical rule: No counterparty names. Ever.

// ==============================================================================
// LAYER 0: DATA TRUTH (Foundational, Non-Negotiable)
// Question: "Am I seeing reality — or only a subset of reality?"
// Key insight: "If it is not declared, it does not exist to policy."
// ==============================================================================

export interface ReturnSubmissionSource {
  type: string;
  description: string;
  submissionRate: number; // percentage
  expectedFrequency: string;
  lastSubmission: string;
  dataQuality: 'excellent' | 'good' | 'needs_attention' | 'critical';
  declaredVolume: number;
  estimatedActual: number; // for visibility gap calculation
}

export const mandatoryReturnsSources: ReturnSubmissionSource[] = [
  {
    type: 'Commercial Banks',
    description: 'Daily FX buy/sell, inventory, settlement',
    submissionRate: 98.5,
    expectedFrequency: 'Daily by 17:00',
    lastSubmission: '2026-01-17 16:45',
    dataQuality: 'excellent',
    declaredVolume: 285000000,
    estimatedActual: 290000000,
  },
  {
    type: 'IMTOs',
    description: 'Originated FX, conversion rates, settlement',
    submissionRate: 92.3,
    expectedFrequency: 'Daily by 18:00',
    lastSubmission: '2026-01-17 17:32',
    dataQuality: 'good',
    declaredVolume: 142000000,
    estimatedActual: 168000000,
  },
  {
    type: 'PSPs / Fintechs',
    description: 'Termination volumes',
    submissionRate: 78.5,
    expectedFrequency: 'Daily by 19:00',
    lastSubmission: '2026-01-17 18:15',
    dataQuality: 'needs_attention',
    declaredVolume: 58000000,
    estimatedActual: 85000000,
  },
  {
    type: 'Licensed Crypto Off-Ramps',
    description: 'Aggregate inflows only',
    submissionRate: 65.2,
    expectedFrequency: 'Weekly by Monday',
    lastSubmission: '2026-01-13 09:00',
    dataQuality: 'needs_attention',
    declaredVolume: 12000000,
    estimatedActual: 35000000,
  },
];

export const dataVisibilityMetrics = {
  totalDeclaredFlows: 497000000,
  estimatedActualFlows: 578000000,
  visibilityRatio: 86, // percentage of flows visible to policy
  declaredGrowthTrend: 12.5, // percentage WoW
  blindSpotEstimate: 81000000, // flows not captured
};

// ==============================================================================
// LAYER 1: MARKET PRICE STABILITY LENS (Executive/Governor View)
// Question: "Is the FX system stable or unstable — and why?"
// This is the FIRST dashboard page. Everything else is secondary.
// ==============================================================================

export interface PriceStabilityBand {
  date: string;
  officialBuy: number;
  officialSell: number;
  parallelBuy: number;
  parallelSell: number;
  vwap: number;
  volatilityIndex: number;
}

export const priceStabilityTrend: PriceStabilityBand[] = [
  { date: 'Jan 10', officialBuy: 12.32, officialSell: 12.38, parallelBuy: 12.75, parallelSell: 12.85, vwap: 12.35, volatilityIndex: 2.8 },
  { date: 'Jan 11', officialBuy: 12.35, officialSell: 12.41, parallelBuy: 12.72, parallelSell: 12.82, vwap: 12.38, volatilityIndex: 2.5 },
  { date: 'Jan 12', officialBuy: 12.38, officialSell: 12.45, parallelBuy: 12.68, parallelSell: 12.78, vwap: 12.42, volatilityIndex: 2.2 },
  { date: 'Jan 13', officialBuy: 12.36, officialSell: 12.43, parallelBuy: 12.65, parallelSell: 12.75, vwap: 12.40, volatilityIndex: 2.0 },
  { date: 'Jan 14', officialBuy: 12.38, officialSell: 12.44, parallelBuy: 12.62, parallelSell: 12.72, vwap: 12.41, volatilityIndex: 1.8 },
  { date: 'Jan 15', officialBuy: 12.40, officialSell: 12.46, parallelBuy: 12.58, parallelSell: 12.68, vwap: 12.43, volatilityIndex: 1.5 },
  { date: 'Jan 16', officialBuy: 12.42, officialSell: 12.48, parallelBuy: 12.55, parallelSell: 12.65, vwap: 12.45, volatilityIndex: 1.3 },
  { date: 'Jan 17', officialBuy: 12.43, officialSell: 12.49, parallelBuy: 12.52, parallelSell: 12.62, vwap: 12.46, volatilityIndex: 1.2 },
];

export interface CrossCountryBenchmark {
  country: string;
  currency: string;
  parallelPremium: number;
  volatilityIndex: number;
  formalMarketShare: number;
  trend: 'improving' | 'stable' | 'deteriorating';
}

export const crossCountryBenchmarks: CrossCountryBenchmark[] = [
  { country: 'Ghana', currency: 'GHS', parallelPremium: 1.3, volatilityIndex: 1.2, formalMarketShare: 78, trend: 'improving' },
  { country: 'Nigeria', currency: 'NGN', parallelPremium: 8.5, volatilityIndex: 4.2, formalMarketShare: 42, trend: 'deteriorating' },
  { country: 'Kenya', currency: 'KES', parallelPremium: 2.1, volatilityIndex: 1.8, formalMarketShare: 72, trend: 'stable' },
  { country: 'Egypt', currency: 'EGP', parallelPremium: 12.3, volatilityIndex: 5.1, formalMarketShare: 38, trend: 'deteriorating' },
];

export const stabilityLensSummary = {
  currentSpread: 1.3, // official vs parallel percentage
  spreadDirection: 'compressing' as const,
  volatilityIndex: 1.2,
  volatilityStatus: 'low' as const,
  stabilityScore: 87, // out of 100
  stabilityTrend: 'improving' as const,
  rollingWindow: '7-day',
};

// ==============================================================================
// LAYER 2: SEGMENT FLOW DECOMPOSITION (Diagnostic Layer)
// Question: "Which segments are driving demand, supply, or leakage?"
// Insight: Any system that aggregates "FX" without segment differentiation will mislead policymakers.
// ==============================================================================

export interface FXSegment {
  id: string;
  name: string;
  category: 'supply' | 'demand' | 'mixed';
  weeklyVolume: number;
  weeklyChange: number;
  formalShare: number; // percentage through formal channels
  returnsCompliance: number; // percentage filing returns
  blindSpotRisk: 'low' | 'medium' | 'high';
  color: string;
}

export const fxSegments: FXSegment[] = [
  {
    id: 'remittance',
    name: 'Remittance Inflows (IMTO-led)',
    category: 'supply',
    weeklyVolume: 168000000,
    weeklyChange: 8.5,
    formalShare: 72,
    returnsCompliance: 92,
    blindSpotRisk: 'medium',
    color: 'hsl(45, 93%, 58%)',
  },
  {
    id: 'bank',
    name: 'Bank-Mediated FX',
    category: 'mixed',
    weeklyVolume: 285000000,
    weeklyChange: 3.2,
    formalShare: 98,
    returnsCompliance: 99,
    blindSpotRisk: 'low',
    color: 'hsl(222, 47%, 45%)',
  },
  {
    id: 'fintech',
    name: 'Fintech / PSP Termination',
    category: 'demand',
    weeklyVolume: 85000000,
    weeklyChange: 15.2,
    formalShare: 65,
    returnsCompliance: 78,
    blindSpotRisk: 'high',
    color: 'hsl(199, 89%, 48%)',
  },
  {
    id: 'crypto',
    name: 'Crypto / Stablecoin Corridors',
    category: 'supply',
    weeklyVolume: 35000000,
    weeklyChange: 28.5,
    formalShare: 35,
    returnsCompliance: 65,
    blindSpotRisk: 'high',
    color: 'hsl(280, 65%, 55%)',
  },
  {
    id: 'export',
    name: 'Major Export Inflows (Gold, Cocoa)',
    category: 'supply',
    weeklyVolume: 125000000,
    weeklyChange: -2.1,
    formalShare: 95,
    returnsCompliance: 97,
    blindSpotRisk: 'low',
    color: 'hsl(142, 71%, 45%)',
  },
];

export const segmentContribution = {
  totalSupply: 496000000,
  totalDemand: 412000000,
  netPosition: 84000000,
  formalFlowShare: 78,
  parallelLeakage: 22,
};

// ==============================================================================
// LAYER 3: POLICY MARKER & ATTRIBUTION ENGINE (Most Important Insight)
// Question: "Did our policy work — and where did it fail?"
// Insight: "When I issue a policy, I should see its effect in the data."
// This turns the dashboard into a LEARNING SYSTEM.
// ==============================================================================

export interface PolicyMarker {
  id: string;
  date: string;
  type: 'rate_change' | 'incentive' | 'directive' | 'intervention';
  title: string;
  description: string;
  targetSegments: string[];
  status: 'active' | 'expired' | 'superseded';
}

export const policyMarkers: PolicyMarker[] = [
  {
    id: 'pm-001',
    date: '2026-01-05',
    type: 'directive',
    title: 'IMTO Rate Transparency Directive',
    description: 'Required all IMTOs to publish conversion rates within 2% of VWAP',
    targetSegments: ['remittance'],
    status: 'active',
  },
  {
    id: 'pm-002',
    date: '2026-01-08',
    type: 'incentive',
    title: 'Diaspora Remittance Incentive',
    description: 'Tax holiday on remittance fees for formal channel usage',
    targetSegments: ['remittance', 'fintech'],
    status: 'active',
  },
  {
    id: 'pm-003',
    date: '2026-01-12',
    type: 'rate_change',
    title: 'Reference Rate Adjustment',
    description: 'BoG reference rate aligned closer to market VWAP',
    targetSegments: ['bank', 'remittance', 'fintech'],
    status: 'active',
  },
];

export interface PolicyImpact {
  policyId: string;
  policyTitle: string;
  metric: string;
  beforeValue: number;
  afterValue: number;
  changePercent: number;
  elasticityScore: number; // how responsive was the segment
  assessment: 'effective' | 'partially_effective' | 'ineffective' | 'too_early';
}

export const policyImpacts: PolicyImpact[] = [
  {
    policyId: 'pm-001',
    policyTitle: 'IMTO Rate Transparency',
    metric: 'IMTO Rate Spread',
    beforeValue: 3.8,
    afterValue: 1.9,
    changePercent: -50,
    elasticityScore: 0.85,
    assessment: 'effective',
  },
  {
    policyId: 'pm-002',
    policyTitle: 'Diaspora Incentive',
    metric: 'Formal Channel Volume',
    beforeValue: 142,
    afterValue: 168,
    changePercent: 18.3,
    elasticityScore: 0.72,
    assessment: 'effective',
  },
  {
    policyId: 'pm-003',
    policyTitle: 'Reference Rate Adjustment',
    metric: 'Parallel Premium',
    beforeValue: 2.8,
    afterValue: 1.3,
    changePercent: -53.6,
    elasticityScore: 0.91,
    assessment: 'effective',
  },
];

export interface ElasticityIndicator {
  segment: string;
  responseLevel: 'high' | 'medium' | 'low' | 'none';
  volumeChange: number;
  behaviorShift: string;
}

export const elasticityIndicators: ElasticityIndicator[] = [
  { segment: 'IMTOs', responseLevel: 'high', volumeChange: 18.3, behaviorShift: 'Shifted to formal rates' },
  { segment: 'Banks', responseLevel: 'medium', volumeChange: 5.2, behaviorShift: 'Increased market making' },
  { segment: 'Fintechs', responseLevel: 'medium', volumeChange: 12.5, behaviorShift: 'Improved compliance' },
  { segment: 'Crypto Off-ramps', responseLevel: 'low', volumeChange: 2.1, behaviorShift: 'Limited response' },
];

// ==============================================================================
// LAYER 4: COMPLIANCE, LEAKAGE & INCENTIVE DIAGNOSTICS (Quiet but deadly)
// Question: "Where is the system being gamed?"
// Important: This layer is NOT enforcement. It is policy friction detection.
// Insight: If everyone is circumventing the system, the policy is wrong — not the users.
// ==============================================================================

export interface LeakageIndicator {
  type: string;
  description: string;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  estimatedVolume: number;
  detectionMethod: string;
  corridorAffected: string;
}

export const leakageIndicators: LeakageIndicator[] = [
  {
    type: 'Unmatched Terminations',
    description: 'FX terminates locally without corresponding declared inflows',
    riskLevel: 'high',
    estimatedVolume: 28000000,
    detectionMethod: 'Cross-reference IMTO vs PSP volumes',
    corridorAffected: 'UK-GH, US-GH',
  },
  {
    type: 'Rate Anomaly',
    description: 'Systematic deviation from VWAP by specific corridors',
    riskLevel: 'medium',
    estimatedVolume: 15000000,
    detectionMethod: 'Mystery shopping rate capture',
    corridorAffected: 'UAE-GH',
  },
  {
    type: 'Settlement Mismatch',
    description: 'Expected vs actual settlement timing deviation',
    riskLevel: 'medium',
    estimatedVolume: 8500000,
    detectionMethod: 'T+2 settlement audit',
    corridorAffected: 'Multiple',
  },
];

export interface ComplianceFriction {
  segment: string;
  frictionType: string;
  impactLevel: 'high' | 'medium' | 'low';
  participantsAffected: number;
  suggestedAction: string;
}

export const complianceFrictions: ComplianceFriction[] = [
  {
    segment: 'Crypto Off-Ramps',
    frictionType: 'Complex reporting requirements',
    impactLevel: 'high',
    participantsAffected: 12,
    suggestedAction: 'Simplify aggregate reporting template',
  },
  {
    segment: 'PSPs',
    frictionType: 'Late submission penalties disproportionate',
    impactLevel: 'medium',
    participantsAffected: 28,
    suggestedAction: 'Tiered penalty structure',
  },
  {
    segment: 'Small IMTOs',
    frictionType: 'Technical integration barriers',
    impactLevel: 'medium',
    participantsAffected: 15,
    suggestedAction: 'Provide API toolkit',
  },
];

// ==============================================================================
// LAYER 5: INTERVENTION READINESS LAYER (Not intervention itself)
// Question: "If we intervene, where, how much, and why?"
// Critical: The system must NOT intervene — it must INFORM intervention.
// The dashboard never "talks back" in real time. Trading feeds the dashboard.
// ==============================================================================

export interface LiquidityStressIndicator {
  segment: string;
  stressLevel: 'elevated' | 'normal' | 'low';
  supplyGap: number; // USD
  demandPressure: number; // percentage above normal
  recommendedWatch: boolean;
}

export const liquidityStress: LiquidityStressIndicator[] = [
  { segment: 'Bank Interbank', stressLevel: 'low', supplyGap: 0, demandPressure: 2, recommendedWatch: false },
  { segment: 'Retail FX', stressLevel: 'normal', supplyGap: 5000000, demandPressure: 8, recommendedWatch: false },
  { segment: 'Corporate Demand', stressLevel: 'elevated', supplyGap: 28000000, demandPressure: 18, recommendedWatch: true },
  { segment: 'Import Cover', stressLevel: 'normal', supplyGap: 12000000, demandPressure: 5, recommendedWatch: false },
];

export interface InterventionScenario {
  scenario: string;
  injectionAmount: number;
  expectedSpreadImpact: number; // bps compression
  durationEffect: string;
  confidenceLevel: number; // percentage
  historicalPrecedent: string;
}

export const interventionScenarios: InterventionScenario[] = [
  {
    scenario: 'Moderate Injection',
    injectionAmount: 50000000,
    expectedSpreadImpact: 25,
    durationEffect: '3-5 days',
    confidenceLevel: 78,
    historicalPrecedent: 'Similar to Dec 2025',
  },
  {
    scenario: 'Targeted Corporate',
    injectionAmount: 30000000,
    expectedSpreadImpact: 15,
    durationEffect: '1-2 days',
    confidenceLevel: 85,
    historicalPrecedent: 'Q3 2025 pattern',
  },
  {
    scenario: 'Full Market Support',
    injectionAmount: 100000000,
    expectedSpreadImpact: 45,
    durationEffect: '7-10 days',
    confidenceLevel: 65,
    historicalPrecedent: 'Feb 2025 intervention',
  },
];

export interface HistoricalIntervention {
  date: string;
  amount: number;
  targetSegment: string;
  preInterventionSpread: number;
  postInterventionSpread: number;
  effectivenessScore: number;
}

export const historicalInterventions: HistoricalIntervention[] = [
  { date: '2025-12-15', amount: 75000000, targetSegment: 'Retail', preInterventionSpread: 4.2, postInterventionSpread: 2.1, effectivenessScore: 85 },
  { date: '2025-11-22', amount: 50000000, targetSegment: 'Corporate', preInterventionSpread: 3.8, postInterventionSpread: 2.5, effectivenessScore: 72 },
  { date: '2025-10-08', amount: 100000000, targetSegment: 'Full Market', preInterventionSpread: 5.5, postInterventionSpread: 2.8, effectivenessScore: 78 },
];

export const interventionReadinessSummary = {
  currentRecommendation: 'Monitor' as const,
  stressLevel: 'Normal' as const,
  reserveCapacity: 3200000000, // estimated
  lastIntervention: '2025-12-15',
  daysSinceIntervention: 33,
};

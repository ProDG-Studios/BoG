import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  dashboardStats, 
  transactions, 
  corridorData, 
  monthlyTrends,
  institutions,
  settlements 
} from '@/data/mockData';
import {
  marketActivitySummary,
  priceDiscoverySummary,
  flowComposition,
  confidenceIndicators,
} from '@/data/fxTransparencyData';
import {
  comminglingRelationships,
  fxMarketSegments,
  sectoralFlows,
} from '@/data/fxMarketData';

interface ReportConfig {
  title: string;
  subtitle: string;
  reportingPeriod: string;
  generatedBy: string;
}

const COLORS = {
  primary: [30, 41, 59] as [number, number, number],
  gold: [245, 189, 65] as [number, number, number],
  success: [34, 197, 94] as [number, number, number],
  warning: [245, 158, 11] as [number, number, number],
  danger: [239, 68, 68] as [number, number, number],
  info: [59, 130, 246] as [number, number, number],
  gray: [107, 114, 128] as [number, number, number],
  dark: [15, 23, 42] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const formatCurrency = (value: number, compact = true) => {
  if (compact) {
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(2)}K`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(value);
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const addHeader = (doc: jsPDF, config: ReportConfig, pageNum: number, totalPages: number) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Header background
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, 0, pageWidth, 35, 'F');

  // Gold accent line
  doc.setFillColor(...COLORS.gold);
  doc.rect(0, 35, pageWidth, 2, 'F');

  // Logo placeholder
  doc.setFillColor(...COLORS.gold);
  doc.circle(20, 17, 8, 'F');
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.dark);
  doc.setFont('helvetica', 'bold');
  doc.text('BoG', 20, 19, { align: 'center' });

  // Title
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(config.title, 35, 15);

  // Subtitle
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 180, 180);
  doc.text(config.subtitle, 35, 22);

  // Classification badge
  doc.setFillColor(...COLORS.gold);
  doc.roundedRect(pageWidth - 55, 8, 45, 12, 2, 2, 'F');
  doc.setFontSize(7);
  doc.setTextColor(...COLORS.dark);
  doc.setFont('helvetica', 'bold');
  doc.text('CONFIDENTIAL', pageWidth - 32.5, 15, { align: 'center' });

  // Reporting period
  doc.setFontSize(8);
  doc.setTextColor(180, 180, 180);
  doc.text(`Period: ${config.reportingPeriod}`, pageWidth - 32.5, 28, { align: 'center' });

  // Footer
  doc.setFillColor(...COLORS.dark);
  doc.rect(0, pageHeight - 15, pageWidth, 15, 'F');
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text(`Generated: ${formatDate(new Date())} | ${config.generatedBy}`, 15, pageHeight - 6);
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 15, pageHeight - 6, { align: 'right' });
};

const addSectionHeader = (doc: jsPDF, title: string, y: number, icon?: string) => {
  doc.setFillColor(245, 245, 250);
  doc.roundedRect(15, y - 5, doc.internal.pageSize.getWidth() - 30, 12, 2, 2, 'F');
  
  doc.setFillColor(...COLORS.gold);
  doc.rect(15, y - 5, 4, 12, 'F');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.dark);
  doc.text(title, 25, y + 3);
};

// ═══════════════════════════════════════════════════════════════════════════
// EXECUTIVE SUMMARY REPORT
// ═══════════════════════════════════════════════════════════════════════════

export const generateExecutiveSummaryReport = () => {
  const doc = new jsPDF();
  const config: ReportConfig = {
    title: 'FX & Remittance Transparency Report',
    subtitle: 'Executive Summary - Bank of Ghana Regulatory Dashboard',
    reportingPeriod: 'January 2024 Week 2',
    generatedBy: 'BoG Remittance Oversight Division',
  };

  addHeader(doc, config, 1, 3);

  let y = 50;

  // Key Metrics Section
  addSectionHeader(doc, 'KEY PERFORMANCE INDICATORS', y);
  y += 20;

  // KPI Grid
  const kpiData = [
    { label: 'Total Remittance Inflows', value: formatCurrency(dashboardStats.totalInflows.value), change: `+${dashboardStats.totalInflows.change}%` },
    { label: 'Transaction Volume', value: dashboardStats.totalInflows.volume.toLocaleString(), change: '+8.5%' },
    { label: 'Reconciliation Rate', value: `${dashboardStats.reconciliationRate}%`, change: '+2.1%' },
    { label: 'Active Institutions', value: `${dashboardStats.activeInstitutions.active}/${dashboardStats.activeInstitutions.total}`, change: 'Stable' },
  ];

  autoTable(doc, {
    startY: y,
    head: [['Metric', 'Value', 'Change']],
    body: kpiData.map(kpi => [kpi.label, kpi.value, kpi.change]),
    theme: 'grid',
    headStyles: { 
      fillColor: COLORS.dark, 
      textColor: COLORS.white,
      fontStyle: 'bold',
      fontSize: 9,
    },
    bodyStyles: { 
      fontSize: 10,
      textColor: COLORS.dark,
    },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 50, halign: 'right', fontStyle: 'bold' },
      2: { cellWidth: 40, halign: 'center' },
    },
    margin: { left: 15, right: 15 },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  // Market Confidence Indicators
  addSectionHeader(doc, 'MARKET CONFIDENCE INDICATORS', y);
  y += 20;

  const confidenceData = confidenceIndicators.map(ci => [
    ci.metric,
    `${ci.currentValue}${ci.unit}`,
    `${ci.previousValue}${ci.unit}`,
    ci.trend === 'up' ? '↑ Improving' : ci.trend === 'down' ? '↓ Declining' : '→ Stable',
  ]);

  autoTable(doc, {
    startY: y,
    head: [['Indicator', 'Current', 'Previous', 'Trend']],
    body: confidenceData,
    theme: 'striped',
    headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 15, right: 15 },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  // Flow Composition
  addSectionHeader(doc, 'FX FLOW COMPOSITION', y);
  y += 20;

  autoTable(doc, {
    startY: y,
    head: [['Source Category', 'Share (%)', 'Week-on-Week Change']],
    body: flowComposition.map(fc => [fc.category, `${fc.percentage}%`, `${fc.weeklyChange > 0 ? '+' : ''}${fc.weeklyChange}%`]),
    theme: 'striped',
    headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 15, right: 15 },
  });

  // Page 2 - Corridor Analysis
  doc.addPage();
  addHeader(doc, config, 2, 3);

  y = 50;
  addSectionHeader(doc, 'CORRIDOR ANALYSIS', y);
  y += 20;

  autoTable(doc, {
    startY: y,
    head: [['Corridor', 'Origin', 'Volume', 'Value (USD)', 'Avg FX Rate', 'Digital Rail %']],
    body: corridorData.map(c => [
      c.corridor,
      c.origin,
      c.totalVolume.toLocaleString(),
      formatCurrency(c.totalValue),
      c.avgFxRate.toFixed(4),
      `${c.emergingRailPercent}%`,
    ]),
    theme: 'grid',
    headStyles: { fillColor: COLORS.dark, textColor: COLORS.white, fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    columnStyles: {
      3: { halign: 'right' },
      4: { halign: 'right' },
      5: { halign: 'center' },
    },
    margin: { left: 15, right: 15 },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  // Settlement Distribution
  addSectionHeader(doc, 'SETTLEMENT DISTRIBUTION', y);
  y += 20;

  doc.setFontSize(10);
  doc.setTextColor(...COLORS.dark);
  doc.text(`Offshore Settlement: ${dashboardStats.settlementSplit.offshore}%`, 25, y);
  doc.text(`Onshore Settlement: ${dashboardStats.settlementSplit.onshore}%`, 100, y);

  // Page 3 - Exceptions & Risk
  doc.addPage();
  addHeader(doc, config, 3, 3);

  y = 50;
  addSectionHeader(doc, 'EXCEPTION SUMMARY', y);
  y += 20;

  const exceptionData = [
    ['High Priority', dashboardStats.exceptions.high.toString(), 'Immediate attention required'],
    ['Medium Priority', dashboardStats.exceptions.medium.toString(), 'Review within 24 hours'],
    ['Low Priority', dashboardStats.exceptions.low.toString(), 'Standard review queue'],
  ];

  autoTable(doc, {
    startY: y,
    head: [['Priority Level', 'Count', 'Action Required']],
    body: exceptionData,
    theme: 'grid',
    headStyles: { fillColor: COLORS.danger, textColor: COLORS.white, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 15, right: 15 },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  // Commingling Risk Assessment
  addSectionHeader(doc, 'COMMINGLING RISK ASSESSMENT', y);
  y += 20;

  const highRiskRelationships = comminglingRelationships.filter(r => r.comminglingRisk === 'High');
  
  autoTable(doc, {
    startY: y,
    head: [['Int\'l Player', 'Local Partner', 'Corridor', 'Risk Level', 'Issues']],
    body: highRiskRelationships.map(r => [
      r.internationalPlayerName,
      r.localPartnerName,
      r.corridor,
      r.comminglingRisk,
      r.issues.join('; ') || 'None',
    ]),
    theme: 'grid',
    headStyles: { fillColor: COLORS.warning, textColor: COLORS.dark, fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 15, right: 15 },
  });

  y = (doc as any).lastAutoTable.finalY + 20;

  // Signature block
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.gray);
  doc.text('This report is generated automatically by the Bank of Ghana FX Transparency Dashboard.', 15, y);
  doc.text('Data reflects post-trade, anonymized, aggregated information. No counterparty names disclosed.', 15, y + 5);

  return doc;
};

// ═══════════════════════════════════════════════════════════════════════════
// FX MARKET TRANSPARENCY REPORT
// ═══════════════════════════════════════════════════════════════════════════

export const generateFXMarketReport = () => {
  const doc = new jsPDF();
  const config: ReportConfig = {
    title: 'FX Market Transparency Report',
    subtitle: 'VWAP, Spreads, and Market Activity Analysis',
    reportingPeriod: 'January 2024 Week 2',
    generatedBy: 'BoG FX Surveillance Unit',
  };

  addHeader(doc, config, 1, 2);

  let y = 50;

  // Market Activity Summary
  addSectionHeader(doc, 'MARKET ACTIVITY SUMMARY', y);
  y += 20;

  const activityData = [
    ['Weekly Volume', formatCurrency(marketActivitySummary.weeklyVolume)],
    ['Number of Trades', marketActivitySummary.weeklyTrades.toLocaleString()],
    ['Average Ticket Size', formatCurrency(marketActivitySummary.avgTicketSize)],
    ['Top 5 Concentration', `${marketActivitySummary.concentrationIndex}%`],
    ['Volume Growth (WoW)', `+${marketActivitySummary.volumeGrowth}%`],
  ];

  autoTable(doc, {
    startY: y,
    body: activityData,
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80, fontStyle: 'bold' },
      1: { cellWidth: 60, halign: 'right' },
    },
    margin: { left: 25, right: 15 },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  // Price Discovery
  addSectionHeader(doc, 'PRICE DISCOVERY METRICS', y);
  y += 20;

  const priceData = [
    ['Current VWAP (USD/GHS)', priceDiscoverySummary.currentVwap.toFixed(4)],
    ['Weekly High', priceDiscoverySummary.weeklyHigh.toFixed(4)],
    ['Weekly Low', priceDiscoverySummary.weeklyLow.toFixed(4)],
    ['Parallel Market Spread', `${priceDiscoverySummary.parallelSpread}%`],
    ['Spread Compression', `${priceDiscoverySummary.spreadCompression} bps`],
    ['Avg Intraday Volatility', `${priceDiscoverySummary.avgVolatility}%`],
  ];

  autoTable(doc, {
    startY: y,
    body: priceData,
    theme: 'plain',
    bodyStyles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80, fontStyle: 'bold' },
      1: { cellWidth: 60, halign: 'right' },
    },
    margin: { left: 25, right: 15 },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  // FX Market Segments
  addSectionHeader(doc, 'FX MARKET SEGMENTS', y);
  y += 20;

  autoTable(doc, {
    startY: y,
    head: [['Segment', 'Weekly Volume', 'Weekly Value', 'VWAP', 'Spread (bps)', 'Trend']],
    body: fxMarketSegments.map(s => [
      s.segment,
      s.weeklyVolume.toLocaleString(),
      formatCurrency(s.weeklyValue),
      s.vwapRate.toFixed(2),
      s.spreadBps.toString(),
      `${s.changePercent > 0 ? '+' : ''}${s.changePercent}%`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: COLORS.info, textColor: COLORS.white, fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 15, right: 15 },
  });

  // Page 2 - Sectoral Flows
  doc.addPage();
  addHeader(doc, config, 2, 2);

  y = 50;
  addSectionHeader(doc, 'SECTORAL FX INFLOWS', y);
  y += 20;

  autoTable(doc, {
    startY: y,
    head: [['Sector', 'Value (USD)', 'Share (%)']],
    body: sectoralFlows.inflows.map(f => [f.sector, formatCurrency(f.value), `${f.share}%`]),
    theme: 'grid',
    headStyles: { fillColor: COLORS.success, textColor: COLORS.white, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 15, right: 100 },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  addSectionHeader(doc, 'SECTORAL FX OUTFLOWS', y);
  y += 20;

  autoTable(doc, {
    startY: y,
    head: [['Sector', 'Value (USD)', 'Share (%)']],
    body: sectoralFlows.outflows.map(f => [f.sector, formatCurrency(f.value), `${f.share}%`]),
    theme: 'grid',
    headStyles: { fillColor: COLORS.danger, textColor: COLORS.white, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 15, right: 100 },
  });

  return doc;
};

// ═══════════════════════════════════════════════════════════════════════════
// INSTITUTIONAL COMPLIANCE REPORT
// ═══════════════════════════════════════════════════════════════════════════

export const generateComplianceReport = () => {
  const doc = new jsPDF('landscape');
  const config: ReportConfig = {
    title: 'Institutional Compliance Report',
    subtitle: 'Licensed Institution Performance & Data Quality Assessment',
    reportingPeriod: 'January 2024 Week 2',
    generatedBy: 'BoG Compliance Division',
  };

  addHeader(doc, config, 1, 1);

  let y = 50;

  addSectionHeader(doc, 'INSTITUTION COMPLIANCE STATUS', y);
  y += 20;

  autoTable(doc, {
    startY: y,
    head: [['Institution', 'Type', 'Status', 'Compliance Score', 'Last Submission', 'Country']],
    body: institutions.map(inst => [
      inst.name,
      inst.type,
      inst.isActive ? 'Active' : 'Inactive',
      `${inst.complianceScore}%`,
      inst.lastSubmission,
      inst.country,
    ]),
    theme: 'grid',
    headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      3: { halign: 'center' },
    },
    margin: { left: 15, right: 15 },
  });

  return doc;
};

// ═══════════════════════════════════════════════════════════════════════════
// SETTLEMENT RECONCILIATION REPORT
// ═══════════════════════════════════════════════════════════════════════════

export const generateSettlementReport = () => {
  const doc = new jsPDF('landscape');
  const config: ReportConfig = {
    title: 'Settlement & Reconciliation Report',
    subtitle: 'End-to-End Transaction Settlement Analysis',
    reportingPeriod: 'January 2024 Week 2',
    generatedBy: 'BoG Settlement Operations',
  };

  addHeader(doc, config, 1, 1);

  let y = 50;

  // Summary stats
  const matched = settlements.filter(s => s.reconciliationStatus === 'Matched').length;
  const pending = settlements.filter(s => s.reconciliationStatus === 'Pending Review').length;
  const exceptions = settlements.filter(s => s.reconciliationStatus === 'Exception').length;

  doc.setFontSize(10);
  doc.setTextColor(...COLORS.dark);
  doc.text(`Matched: ${matched} | Pending: ${pending} | Exceptions: ${exceptions} | Rate: ${((matched / settlements.length) * 100).toFixed(1)}%`, 15, y);
  y += 15;

  addSectionHeader(doc, 'SETTLEMENT DETAILS', y);
  y += 20;

  autoTable(doc, {
    startY: y,
    head: [['Settlement ID', 'Transaction ID', 'Offshore Amount', 'Offshore Status', 'Domestic Amount', 'Domestic Status', 'Variance', 'Reconciliation']],
    body: settlements.map(s => [
      s.id,
      s.transactionId,
      `${s.offshoreSettlement.currency} ${s.offshoreSettlement.amount.toLocaleString()}`,
      s.offshoreSettlement.status,
      `${s.domesticPayout.currency} ${s.domesticPayout.amount.toLocaleString()}`,
      s.domesticPayout.status,
      s.variance > 0 ? `${s.variance}%` : '0%',
      s.reconciliationStatus,
    ]),
    theme: 'grid',
    headStyles: { fillColor: COLORS.dark, textColor: COLORS.white, fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    margin: { left: 10, right: 10 },
  });

  return doc;
};

// ═══════════════════════════════════════════════════════════════════════════
// CORRIDOR DEEP DIVE REPORT
// ═══════════════════════════════════════════════════════════════════════════

export const generateCorridorReport = () => {
  const doc = new jsPDF();
  const config: ReportConfig = {
    title: 'Corridor & Channel Analysis',
    subtitle: 'Remittance Flow by Source Country and Payment Channel',
    reportingPeriod: 'January 2024 Week 2',
    generatedBy: 'BoG Remittance Analytics',
  };

  addHeader(doc, config, 1, 1);

  let y = 50;

  addSectionHeader(doc, 'CORRIDOR PERFORMANCE', y);
  y += 20;

  autoTable(doc, {
    startY: y,
    head: [['Corridor', 'Origin', 'Volume', 'Value (USD)', 'Bank %', 'MMO %', 'Cash %', 'Digital %']],
    body: corridorData.map(c => [
      c.corridor,
      c.origin,
      c.totalVolume.toLocaleString(),
      formatCurrency(c.totalValue),
      `${c.channelMix.bank}%`,
      `${c.channelMix.mmo}%`,
      `${c.channelMix.cash}%`,
      `${c.channelMix.digital}%`,
    ]),
    theme: 'grid',
    headStyles: { fillColor: COLORS.primary, textColor: COLORS.white, fontSize: 8 },
    bodyStyles: { fontSize: 8 },
    columnStyles: {
      3: { halign: 'right' },
    },
    margin: { left: 10, right: 10 },
  });

  y = (doc as any).lastAutoTable.finalY + 20;

  // Monthly Trends
  addSectionHeader(doc, 'MONTHLY INFLOW TRENDS', y);
  y += 20;

  autoTable(doc, {
    startY: y,
    head: [['Month', 'Inflows (USD)', 'Volume', 'Reconciliation Rate']],
    body: monthlyTrends.map(m => [
      m.month,
      formatCurrency(m.inflows),
      m.volume.toLocaleString(),
      `${m.reconciled}%`,
    ]),
    theme: 'striped',
    headStyles: { fillColor: COLORS.info, textColor: COLORS.white, fontSize: 9 },
    bodyStyles: { fontSize: 9 },
    margin: { left: 15, right: 15 },
  });

  return doc;
};

// Download helper
export const downloadPDF = (doc: jsPDF, filename: string) => {
  doc.save(`${filename}_${new Date().toISOString().split('T')[0]}.pdf`);
};

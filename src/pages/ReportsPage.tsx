import { useState } from 'react';
import { 
  FileText, Download, Calendar, Building2, GitBranch, FileSpreadsheet, 
  TrendingUp, Shield, Globe, Loader2, CheckCircle, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import {
  generateExecutiveSummaryReport,
  generateFXMarketReport,
  generateComplianceReport,
  generateSettlementReport,
  generateCorridorReport,
  downloadPDF,
} from '@/lib/reportGenerator';
import { toast } from '@/hooks/use-toast';

const reports = [
  {
    id: 'executive-summary',
    title: 'Executive Summary Report',
    description: 'Comprehensive FX & remittance overview with KPIs, confidence indicators, and risk assessment',
    format: 'PDF',
    icon: TrendingUp,
    pages: 3,
    generator: generateExecutiveSummaryReport,
  },
  {
    id: 'fx-market',
    title: 'FX Market Transparency Report',
    description: 'VWAP analysis, market segments, sectoral flows, and price discovery metrics',
    format: 'PDF',
    icon: BarChart3,
    pages: 2,
    generator: generateFXMarketReport,
  },
  {
    id: 'compliance',
    title: 'Institutional Compliance Report',
    description: 'Licensed institution status, compliance scores, and data quality assessment',
    format: 'PDF',
    icon: Shield,
    pages: 1,
    generator: generateComplianceReport,
  },
  {
    id: 'settlement',
    title: 'Settlement & Reconciliation Report',
    description: 'End-to-end settlement tracking with variance analysis and exception details',
    format: 'PDF',
    icon: GitBranch,
    pages: 1,
    generator: generateSettlementReport,
  },
  {
    id: 'corridor',
    title: 'Corridor & Channel Analysis',
    description: 'Remittance flows by source country, payment channel distribution, and trends',
    format: 'PDF',
    icon: Globe,
    pages: 1,
    generator: generateCorridorReport,
  },
];

export function ReportsPage() {
  const [generating, setGenerating] = useState<string | null>(null);

  const handleGenerate = async (reportId: string, generator: () => any, title: string) => {
    setGenerating(reportId);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate generation time
      const doc = generator();
      downloadPDF(doc, reportId);
      toast({
        title: "Report Generated",
        description: `${title} has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "An error occurred while generating the report.",
        variant: "destructive",
      });
    } finally {
      setGenerating(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <DashboardHeader
          title="Regulatory Reports"
          subtitle="Generate comprehensive, regulator-ready PDF reports with full data transparency"
        />
        <Select defaultValue="jan-2024-w2">
          <SelectTrigger className="w-56">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jan-2024-w2">January 2024 Week 2</SelectItem>
            <SelectItem value="jan-2024-w1">January 2024 Week 1</SelectItem>
            <SelectItem value="dec-2023-w4">December 2023 Week 4</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div 
            key={report.id} 
            className="dashboard-card p-6 group"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <report.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-foreground">{report.title}</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-destructive/20 text-destructive">
                    {report.format}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {report.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <span className="text-xs text-muted-foreground">{report.pages} page{report.pages > 1 ? 's' : ''}</span>
              <Button 
                onClick={() => handleGenerate(report.id, report.generator, report.title)}
                disabled={generating !== null}
                className="gap-2"
              >
                {generating === report.id ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Generate & Download
                  </>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Note */}
      <div className="dashboard-card p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-success" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Data Compliance</h4>
            <p className="text-sm text-muted-foreground">
              All reports are generated using post-trade, anonymized, aggregated data. 
              No counterparty names are disclosed. Reports reflect validated institutional submissions only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;

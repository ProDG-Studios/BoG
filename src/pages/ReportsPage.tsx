import { FileText, Download, Calendar, Building2, GitBranch, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const reports = [
  {
    id: 'inflows-summary',
    title: 'Remittance Inflows Summary',
    description: 'Comprehensive overview of all remittance inflows by corridor, channel, and institution',
    format: 'PDF',
    icon: FileText,
    lastGenerated: '15 Jan 2024',
    size: '2.4 MB',
  },
  {
    id: 'institutional-compliance',
    title: 'Institutional Reporting & Compliance',
    description: 'Detailed compliance status, data quality scores, and submission history for all licensed institutions',
    format: 'Excel',
    icon: Building2,
    lastGenerated: '15 Jan 2024',
    size: '1.8 MB',
  },
  {
    id: 'settlement-reconciliation',
    title: 'Settlement & Reconciliation Summary',
    description: 'End-to-end settlement tracking with reconciliation status and exception analysis',
    format: 'PDF',
    icon: GitBranch,
    lastGenerated: '14 Jan 2024',
    size: '3.1 MB',
  },
  {
    id: 'corridor-analysis',
    title: 'Corridor & Channel Analysis',
    description: 'Breakdown of remittance flows by source country, payment channel, and settlement rail',
    format: 'Excel',
    icon: FileSpreadsheet,
    lastGenerated: '15 Jan 2024',
    size: '1.2 MB',
  },
];

export function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Regulatory Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and export regulator-ready reports and data exports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="jan-2024-w2">
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jan-2024-w2">Jan 2024 Week 2</SelectItem>
              <SelectItem value="jan-2024-w1">Jan 2024 Week 1</SelectItem>
              <SelectItem value="dec-2023-w4">Dec 2023 Week 4</SelectItem>
              <SelectItem value="dec-2023-w3">Dec 2023 Week 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="dashboard-card hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <report.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{report.title}</CardTitle>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      report.format === 'PDF' 
                        ? 'bg-destructive/10 text-destructive' 
                        : 'bg-success/10 text-success'
                    }`}>
                      {report.format}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription className="text-sm">
                {report.description}
              </CardDescription>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Last generated: {report.lastGenerated}</span>
                <span>{report.size}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2">
                  <Download size={16} />
                  Download
                </Button>
                <Button variant="default" className="flex-1">
                  Generate New
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scheduled Reports Info */}
      <div className="dashboard-card p-6">
        <h3 className="module-header mb-4">Scheduled Reports</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="font-medium">Weekly Inflows Report</p>
                <p className="text-sm text-muted-foreground">Every Monday at 08:00 GMT</p>
              </div>
            </div>
            <span className="status-success">Active</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <p className="font-medium">Monthly Compliance Summary</p>
                <p className="text-sm text-muted-foreground">1st of each month at 06:00 GMT</p>
              </div>
            </div>
            <span className="status-success">Active</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-warning" />
              </div>
              <div>
                <p className="font-medium">Daily Exception Alert</p>
                <p className="text-sm text-muted-foreground">Daily at 18:00 GMT (if exceptions exist)</p>
              </div>
            </div>
            <span className="status-warning">Conditional</span>
          </div>
        </div>
      </div>

      {/* Export Note */}
      <div className="p-4 bg-muted/30 rounded-lg border border-border text-sm text-muted-foreground">
        <p>
          <strong>Note:</strong> All reports reflect exactly what is visible in the corresponding dashboard modules. 
          Reports are generated in real-time using the latest validated data from institutional submissions.
        </p>
      </div>
    </div>
  );
}

export default ReportsPage;

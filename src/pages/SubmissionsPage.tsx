import { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge, getStatusType } from '@/components/dashboard/StatusBadge';
import { submissions, institutions } from '@/data/mockData';

export function SubmissionsPage() {
  const [selectedTab, setSelectedTab] = useState<'submissions' | 'upload'>('submissions');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'GHS',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getQualityColor = (score: number) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getWorkflowIcon = (status: string) => {
    switch (status) {
      case 'Published':
      case 'Approved':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'Rejected':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Institutional Submissions</h1>
        <p className="text-muted-foreground mt-1">
          Data submissions from licensed institutions with validation workflow
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2">
        <Button
          variant={selectedTab === 'submissions' ? 'default' : 'outline'}
          onClick={() => setSelectedTab('submissions')}
        >
          Submissions History
        </Button>
        <Button
          variant={selectedTab === 'upload' ? 'default' : 'outline'}
          onClick={() => setSelectedTab('upload')}
        >
          New Submission
        </Button>
      </div>

      {selectedTab === 'submissions' ? (
        <>
          {/* Workflow Status Overview */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Draft', 'Submitted', 'Validated', 'Approved', 'Published'].map((status) => {
              const count = submissions.filter(s => s.status === status).length;
              return (
                <div key={status} className="dashboard-card p-4 text-center">
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-muted-foreground">{status}</p>
                </div>
              );
            })}
          </div>

          {/* Submissions Table */}
          <div className="dashboard-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="data-table-header">
                    <TableHead>Institution</TableHead>
                    <TableHead>Reporting Period</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead className="text-right">Transactions</TableHead>
                    <TableHead className="text-right">Total Value</TableHead>
                    <TableHead>Data Quality</TableHead>
                    <TableHead>Errors</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub) => (
                    <TableRow key={sub.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{sub.institutionName}</TableCell>
                      <TableCell>{sub.reportingPeriod}</TableCell>
                      <TableCell>{sub.submissionDate}</TableCell>
                      <TableCell className="text-right">{sub.transactionCount.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(sub.totalValue)}
                      </TableCell>
                      <TableCell>
                        {sub.dataQualityScore > 0 ? (
                          <div className="flex items-center gap-2">
                            <Progress value={sub.dataQualityScore} className="w-16 h-2" />
                            <span className={`text-sm font-medium ${getQualityColor(sub.dataQualityScore)}`}>
                              {sub.dataQualityScore}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {sub.errorCount > 0 ? (
                          <span className="text-destructive font-medium">{sub.errorCount}</span>
                        ) : (
                          <span className="text-muted-foreground">0</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getWorkflowIcon(sub.status)}
                          <StatusBadge status={getStatusType(sub.status)} label={sub.status} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Eye size={14} />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </>
      ) : (
        /* Upload Interface */
        <div className="dashboard-card p-8">
          <div className="max-w-2xl mx-auto">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Upload Remittance Report</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your Excel file or click to browse
              </p>
              <Button variant="outline" className="gap-2">
                <FileSpreadsheet size={16} />
                Select Excel File
              </Button>
            </div>

            {/* Validation Rules Info */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium mb-3">Validation Rules Applied:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Mandatory fields check (Transaction ID, Amount, Currency)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Date format validation (ISO 8601)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  FX rate consistency check
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Institution registration verification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Corridor code validation
                </li>
              </ul>
            </div>

            {/* Workflow Info */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span className="px-3 py-1 bg-muted rounded">Draft</span>
              <span>→</span>
              <span className="px-3 py-1 bg-muted rounded">Submitted</span>
              <span>→</span>
              <span className="px-3 py-1 bg-muted rounded">Validated</span>
              <span>→</span>
              <span className="px-3 py-1 bg-muted rounded">Approved</span>
              <span>→</span>
              <span className="px-3 py-1 bg-success/20 text-success rounded">Published</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmissionsPage;

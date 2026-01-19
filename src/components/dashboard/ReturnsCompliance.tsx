import { useState } from 'react';
import { 
  CheckCircle2, XCircle, AlertTriangle, Clock, Building2, 
  TrendingUp, FileWarning, BarChart3, Calendar, AlertOctagon
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { institutions, submissions } from '@/data/mockData';

interface ReturnStatus {
  institutionId: string;
  institutionName: string;
  type: string;
  expectedDate: string;
  submittedDate: string | null;
  status: 'submitted' | 'missing' | 'late';
  daysOverdue: number;
}

interface AnomalyCheck {
  id: string;
  institutionName: string;
  metric: string;
  expected: string;
  actual: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
}

// Generate returns status
const generateReturnsStatus = (): ReturnStatus[] => {
  return institutions.map((inst, idx) => {
    const submission = submissions.find(s => s.institutionId === inst.id);
    const hasSubmitted = !!submission && submission.status !== 'Draft';
    const isLate = inst.lastSubmission < '2024-01-14';

    return {
      institutionId: inst.id,
      institutionName: inst.name,
      type: inst.type,
      expectedDate: '2024-01-15',
      submittedDate: hasSubmitted ? inst.lastSubmission : null,
      status: hasSubmitted ? (isLate ? 'late' : 'submitted') : 'missing',
      daysOverdue: hasSubmitted ? 0 : 2,
    };
  });
};

// Generate anomaly checks
const anomalyChecks: AnomalyCheck[] = [
  {
    id: '1',
    institutionName: 'WorldRemit',
    metric: 'FX Rate Deviation',
    expected: '12.40 - 12.50',
    actual: '12.85',
    severity: 'high',
    description: 'Reported rate 2.8% above market VWAP',
  },
  {
    id: '2',
    institutionName: 'MTN Mobile Money',
    metric: 'Volume Spike',
    expected: '<10% daily change',
    actual: '+45% spike',
    severity: 'medium',
    description: 'Unusual volume increase detected Jan 13',
  },
  {
    id: '3',
    institutionName: 'Vodafone Cash',
    metric: 'Transaction Gap',
    expected: 'Continuous',
    actual: '4 hour gap',
    severity: 'low',
    description: 'No transactions between 10:00-14:00',
  },
  {
    id: '4',
    institutionName: 'Zeepay',
    metric: 'Settlement Delay',
    expected: 'T+1',
    actual: 'T+3',
    severity: 'medium',
    description: '15 transactions with extended settlement',
  },
];

export function ReturnsCompliance() {
  const [activeView, setActiveView] = useState<'coverage' | 'missing' | 'anomalies' | 'timeliness'>('coverage');
  const returnsStatus = generateReturnsStatus();

  const stats = {
    totalInstitutions: institutions.length,
    submitted: returnsStatus.filter(r => r.status === 'submitted').length,
    late: returnsStatus.filter(r => r.status === 'late').length,
    missing: returnsStatus.filter(r => r.status === 'missing').length,
    coveragePercent: Math.round((returnsStatus.filter(r => r.status !== 'missing').length / institutions.length) * 100),
    onTimePercent: Math.round((returnsStatus.filter(r => r.status === 'submitted').length / institutions.length) * 100),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="dashboard-card p-6 border-l-4 border-l-info">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-info/20 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-info" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Returns Compliance & Data Quality</h2>
            <p className="text-sm text-muted-foreground">
              Show what is visible, what is missing, and whether it can be trusted
            </p>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold">{stats.totalInstitutions}</p>
            <p className="text-xs text-muted-foreground">Total Institutions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{stats.submitted}</p>
            <p className="text-xs text-muted-foreground">On-Time Submissions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-warning">{stats.late}</p>
            <p className="text-xs text-muted-foreground">Late Submissions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-destructive">{stats.missing}</p>
            <p className="text-xs text-muted-foreground">Missing Returns</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Progress value={stats.coveragePercent} className="w-16 h-3" />
              <span className="text-xl font-bold">{stats.coveragePercent}%</span>
            </div>
            <p className="text-xs text-muted-foreground">Coverage Rate</p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'coverage', label: 'Reporting Coverage', icon: Building2 },
          { id: 'missing', label: 'Missing Returns', icon: FileWarning },
          { id: 'anomalies', label: 'Anomaly Checks', icon: AlertOctagon },
          { id: 'timeliness', label: 'Timeliness Score', icon: Clock },
        ].map((view) => (
          <Button
            key={view.id}
            variant={activeView === view.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveView(view.id as typeof activeView)}
            className="gap-2"
          >
            <view.icon size={14} />
            {view.label}
          </Button>
        ))}
      </div>

      {/* Coverage View */}
      {activeView === 'coverage' && (
        <div className="dashboard-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Active Reporting Institutions</h3>
            <p className="text-sm text-muted-foreground">Current period: January 2024 Week 2</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 text-sm font-semibold">Institution</th>
                  <th className="text-left p-4 text-sm font-semibold">Type</th>
                  <th className="text-center p-4 text-sm font-semibold">Expected Date</th>
                  <th className="text-center p-4 text-sm font-semibold">Submitted Date</th>
                  <th className="text-center p-4 text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {returnsStatus.map((item) => (
                  <tr key={item.institutionId} className="border-b border-border hover:bg-muted/30">
                    <td className="p-4 font-medium">{item.institutionName}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.type === 'IMTO' ? 'bg-accent/20 text-accent' :
                        item.type === 'Bank' ? 'bg-info/20 text-info' :
                        item.type === 'MMO' ? 'bg-success/20 text-success' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 text-center font-mono text-sm">{item.expectedDate}</td>
                    <td className="p-4 text-center font-mono text-sm">
                      {item.submittedDate || <span className="text-destructive">—</span>}
                    </td>
                    <td className="p-4 text-center">
                      {item.status === 'submitted' && (
                        <span className="flex items-center justify-center gap-1 text-success">
                          <CheckCircle2 size={16} />
                          <span className="text-sm">On Time</span>
                        </span>
                      )}
                      {item.status === 'late' && (
                        <span className="flex items-center justify-center gap-1 text-warning">
                          <Clock size={16} />
                          <span className="text-sm">Late</span>
                        </span>
                      )}
                      {item.status === 'missing' && (
                        <span className="flex items-center justify-center gap-1 text-destructive">
                          <XCircle size={16} />
                          <span className="text-sm">Missing</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Missing Returns Alert */}
      {activeView === 'missing' && (
        <div className="space-y-4">
          <div className="dashboard-card p-6 bg-destructive/5 border-destructive/20">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-destructive" />
              <h3 className="font-semibold text-destructive">Missing Returns Alert</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The following institutions have not submitted their returns for the current reporting period.
            </p>

            <div className="space-y-3">
              {returnsStatus.filter(r => r.status === 'missing').map((item) => (
                <div 
                  key={item.institutionId}
                  className="p-4 rounded-lg bg-card border border-destructive/30 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{item.institutionName}</p>
                    <p className="text-sm text-muted-foreground">{item.type} • Expected: {item.expectedDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-destructive font-bold">{item.daysOverdue} days overdue</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Send Reminder
                    </Button>
                  </div>
                </div>
              ))}
              {returnsStatus.filter(r => r.status === 'missing').length === 0 && (
                <div className="text-center py-8 text-success">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">All institutions have submitted their returns</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Anomaly Checks */}
      {activeView === 'anomalies' && (
        <div className="dashboard-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Anomaly Detection Results</h3>
            <p className="text-sm text-muted-foreground">Spikes, gaps, and impossible rate checks</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 text-sm font-semibold">Institution</th>
                  <th className="text-left p-4 text-sm font-semibold">Metric</th>
                  <th className="text-center p-4 text-sm font-semibold">Expected</th>
                  <th className="text-center p-4 text-sm font-semibold">Actual</th>
                  <th className="text-center p-4 text-sm font-semibold">Severity</th>
                  <th className="text-left p-4 text-sm font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {anomalyChecks.map((anomaly) => (
                  <tr key={anomaly.id} className="border-b border-border hover:bg-muted/30">
                    <td className="p-4 font-medium">{anomaly.institutionName}</td>
                    <td className="p-4 text-sm">{anomaly.metric}</td>
                    <td className="p-4 text-center font-mono text-sm text-muted-foreground">{anomaly.expected}</td>
                    <td className="p-4 text-center font-mono text-sm font-bold">{anomaly.actual}</td>
                    <td className="p-4 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        anomaly.severity === 'high' ? 'bg-destructive/20 text-destructive' :
                        anomaly.severity === 'medium' ? 'bg-warning/20 text-warning' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {anomaly.severity === 'high' ? 'Critical' : anomaly.severity === 'medium' ? 'Warning' : 'Info'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{anomaly.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timeliness Scoreboard */}
      {activeView === 'timeliness' && (
        <div className="dashboard-card p-6">
          <h3 className="font-semibold mb-6">Timeliness Scoreboard</h3>
          <p className="text-sm text-muted-foreground mb-4">Institutions ranked by on-time submission rate (30 days)</p>

          <div className="space-y-4">
            {institutions.slice(0, 8).map((inst, idx) => {
              const score = 100 - (idx * 5) - Math.random() * 10;
              return (
                <div key={inst.id} className="flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span className="flex-1 font-medium">{inst.name}</span>
                  <div className="w-32">
                    <Progress value={score} className="h-2" />
                  </div>
                  <span className={`text-sm font-bold ${
                    score >= 90 ? 'text-success' : score >= 70 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {score.toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Demo Cue */}
      <div className="p-4 rounded-lg bg-info/10 border border-info/30 text-center">
        <p className="text-sm text-info font-medium">
          🔍 Truth Layer: "Show what is visible, what is missing, and whether it can be trusted"
        </p>
      </div>
    </div>
  );
}

export default ReturnsCompliance;

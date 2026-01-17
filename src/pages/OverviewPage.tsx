import { 
  DollarSign, 
  Building2, 
  GitBranch, 
  Layers, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RAGIndicator } from '@/components/dashboard/RAGIndicator';
import { ChannelMixChart } from '@/components/dashboard/ChannelMixChart';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { dashboardStats, monthlyTrends } from '@/data/mockData';

export function OverviewPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Remittance Overview</h1>
        <p className="text-muted-foreground mt-1">
          Executive snapshot of Ghana's remittance inflows and regulatory oversight
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Total Remittance Inflows"
          value={formatCurrency(dashboardStats.totalInflows.value)}
          subtitle={`${dashboardStats.totalInflows.volume.toLocaleString()} transactions`}
          change={dashboardStats.totalInflows.change}
          icon={DollarSign}
          variant="success"
        />
        
        <StatCard
          title="Active Reporting Institutions"
          value={`${dashboardStats.activeInstitutions.active}/${dashboardStats.activeInstitutions.total}`}
          subtitle="Licensed institutions reporting"
          icon={Building2}
          variant="default"
        />
        
        <StatCard
          title="Reconciliation Rate"
          value={`${dashboardStats.reconciliationRate}%`}
          subtitle="Matched transactions"
          icon={CheckCircle}
          variant="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 dashboard-card p-6">
          <h3 className="module-header mb-4">Inflow Trends (6 Months)</h3>
          <TrendChart data={monthlyTrends} />
        </div>

        {/* Channel Mix */}
        <div className="dashboard-card p-6">
          <h3 className="module-header mb-4">Channel Distribution</h3>
          <ChannelMixChart data={dashboardStats.channelMix} />
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Settlement Split */}
        <div className="dashboard-card p-6">
          <h3 className="module-header mb-4">Settlement Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-chart-1" />
                <span className="text-sm font-medium">Offshore Settlement</span>
              </div>
              <span className="text-lg font-bold">{dashboardStats.settlementSplit.offshore}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-chart-2" />
                <span className="text-sm font-medium">Onshore Settlement</span>
              </div>
              <span className="text-lg font-bold">{dashboardStats.settlementSplit.onshore}%</span>
            </div>
            <div className="flex h-3 rounded-full overflow-hidden bg-muted mt-4">
              <div 
                className="bg-chart-1 transition-all duration-500"
                style={{ width: `${dashboardStats.settlementSplit.offshore}%` }}
              />
              <div 
                className="bg-chart-2 transition-all duration-500"
                style={{ width: `${dashboardStats.settlementSplit.onshore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Exceptions Summary */}
        <div className="dashboard-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <h3 className="module-header">Outstanding Exceptions</h3>
          </div>
          <RAGIndicator 
            high={dashboardStats.exceptions.high}
            medium={dashboardStats.exceptions.medium}
            low={dashboardStats.exceptions.low}
          />
        </div>
      </div>

      {/* System Status */}
      <div className="dashboard-card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">System Status</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Last data sync: 2 min ago</span>
            <span>Reporting period: Jan 2024 Week 2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;

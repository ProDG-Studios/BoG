import { useState } from 'react';
import { 
  DollarSign, 
  Building2, 
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Eye,
  Layers
} from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { RAGIndicator } from '@/components/dashboard/RAGIndicator';
import { ChannelMixChart } from '@/components/dashboard/ChannelMixChart';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { LiveIndicator } from '@/components/dashboard/LiveIndicator';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { FXTransparencyLayers } from '@/components/dashboard/FXTransparencyLayers';
import { dashboardStats, monthlyTrends, transactions } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';

export function OverviewPage() {
  const [activeView, setActiveView] = useState<'executive' | 'transparency'>('transparency');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  // Get recent transactions for the activity feed
  const recentTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header with Quick Actions */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <DashboardHeader
          title="FX & Remittance Transparency Dashboard"
          subtitle="Market infrastructure layer for credibility, not control — Post-trade, anonymized, aggregated"
        />
        <div className="flex items-center gap-3">
          <LiveIndicator />
          <QuickActions />
        </div>
      </div>

      {/* View Toggle */}
      <Tabs value={activeView} onValueChange={(v) => setActiveView(v as typeof activeView)} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-flex">
          <TabsTrigger value="transparency" className="gap-2">
            <Layers size={14} />
            FX Transparency Layers
          </TabsTrigger>
          <TabsTrigger value="executive" className="gap-2">
            <Eye size={14} />
            Executive Overview
          </TabsTrigger>
        </TabsList>

        {/* Executive Overview Tab */}
        <TabsContent value="executive" className="mt-6 space-y-6">
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="module-header">Inflow Trends (6 Months)</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp size={16} className="text-success" />
                  <span>+{dashboardStats.totalInflows.change}% growth</span>
                </div>
              </div>
              <TrendChart data={monthlyTrends} />
            </div>

            {/* Channel Mix */}
            <div className="dashboard-card p-6">
              <h3 className="module-header mb-4">Channel Distribution</h3>
              <ChannelMixChart data={dashboardStats.channelMix} />
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                    className="bg-chart-1 transition-all duration-700"
                    style={{ width: `${dashboardStats.settlementSplit.offshore}%` }}
                  />
                  <div 
                    className="bg-chart-2 transition-all duration-700"
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
              <Link to="/settlements">
                <Button variant="ghost" size="sm" className="mt-4 gap-2 text-muted-foreground hover:text-foreground">
                  View all exceptions <ArrowRight size={14} />
                </Button>
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="module-header">Recent Activity</h3>
                <Link to="/register">
                  <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-foreground">
                    View all
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentTransactions.map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        txn.status === 'Settled' ? 'bg-success' :
                        txn.status === 'Exception' ? 'bg-destructive' :
                        txn.status === 'Matched' ? 'bg-info' : 'bg-warning'
                      }`} />
                      <div>
                        <p className="text-sm font-medium">{txn.corridor}</p>
                        <p className="text-xs text-muted-foreground">{txn.sendingInstitution}</p>
                      </div>
                    </div>
                    <span className="text-sm font-medium">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GHS', maximumFractionDigits: 0 }).format(txn.amountPaid)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="dashboard-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-success animate-ping opacity-75" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">All Systems Operational</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <span>Last data sync: 2 min ago</span>
                <span className="hidden sm:inline">Reporting period: Jan 2024 Week 2</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* FX Transparency Layers Tab */}
        <TabsContent value="transparency" className="mt-6">
          <FXTransparencyLayers />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OverviewPage;

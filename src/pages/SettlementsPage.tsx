import { useState } from 'react';
import { Search, CheckCircle2, XCircle, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge, getStatusType } from '@/components/dashboard/StatusBadge';
import { settlements, transactions } from '@/data/mockData';

export function SettlementsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSettlements = settlements.filter((stl) => {
    return stl.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stl.id.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getReconciliationIcon = (status: string) => {
    switch (status) {
      case 'Matched':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'Exception':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'Pending Review':
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const stats = {
    matched: settlements.filter(s => s.reconciliationStatus === 'Matched').length,
    pendingReview: settlements.filter(s => s.reconciliationStatus === 'Pending Review').length,
    exception: settlements.filter(s => s.reconciliationStatus === 'Exception').length,
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'GHS' ? 'GHS' : currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settlement & Reconciliation</h1>
        <p className="text-muted-foreground mt-1">
          End-to-end tracking from offshore settlement to domestic payout
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="dashboard-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.matched}</p>
              <p className="text-sm text-muted-foreground">Matched</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.pendingReview}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <XCircle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.exception}</p>
              <p className="text-sm text-muted-foreground">Exceptions</p>
            </div>
          </div>
        </div>
        <div className="dashboard-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <span className="text-lg font-bold text-info">%</span>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {((stats.matched / settlements.length) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Reconciliation Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="dashboard-card p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Transaction ID or Settlement ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="dashboard-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="data-table-header">
                <TableHead>Settlement ID</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Offshore Settlement</TableHead>
                <TableHead></TableHead>
                <TableHead>Domestic Payout</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Reconciliation Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSettlements.map((stl) => {
                const txn = transactions.find(t => t.id === stl.transactionId);
                return (
                  <TableRow key={stl.id} className="hover:bg-muted/50">
                    <TableCell className="font-mono text-sm">{stl.id}</TableCell>
                    <TableCell className="font-mono text-sm">{stl.transactionId}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {formatCurrency(stl.offshoreSettlement.amount, stl.offshoreSettlement.currency)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(stl.offshoreSettlement.date)}
                        </p>
                        <StatusBadge 
                          status={getStatusType(stl.offshoreSettlement.status)} 
                          label={stl.offshoreSettlement.status} 
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">
                          {formatCurrency(stl.domesticPayout.amount, stl.domesticPayout.currency)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(stl.domesticPayout.date)}
                        </p>
                        <StatusBadge 
                          status={getStatusType(stl.domesticPayout.status)} 
                          label={stl.domesticPayout.status} 
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {stl.variance > 0 ? (
                        <span className="text-destructive font-medium">{stl.variance}%</span>
                      ) : (
                        <span className="text-success">0%</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getReconciliationIcon(stl.reconciliationStatus)}
                        <StatusBadge 
                          status={getStatusType(stl.reconciliationStatus)} 
                          label={stl.reconciliationStatus} 
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <div className="px-4 py-3 border-t border-border text-sm text-muted-foreground">
          Showing {filteredSettlements.length} of {settlements.length} settlement records
        </div>
      </div>
    </div>
  );
}

export default SettlementsPage;

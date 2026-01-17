import { useState } from 'react';
import { Search, Filter, Download, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge, getStatusType } from '@/components/dashboard/StatusBadge';
import { transactions } from '@/data/mockData';

export function RegisterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [corridorFilter, setCorridorFilter] = useState<string>('all');

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.sendingInstitution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.receivingInstitution.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    const matchesCorridor = corridorFilter === 'all' || txn.corridor === corridorFilter;
    return matchesSearch && matchesStatus && matchesCorridor;
  });

  const uniqueCorridors = [...new Set(transactions.map(t => t.corridor))];

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === 'GHS' ? 'GHS' : currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Remittance Register</h1>
          <p className="text-muted-foreground mt-1">
            Transaction-level view of all remittance flows
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download size={16} />
          Export Data
        </Button>
      </div>

      {/* Filters */}
      <div className="dashboard-card p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID, institution..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Matched">Matched</SelectItem>
              <SelectItem value="Settled">Settled</SelectItem>
              <SelectItem value="Exception">Exception</SelectItem>
            </SelectContent>
          </Select>
          <Select value={corridorFilter} onValueChange={setCorridorFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Corridor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Corridors</SelectItem>
              {uniqueCorridors.map((corridor) => (
                <SelectItem key={corridor} value={corridor}>{corridor}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-card overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="data-table-header">
                <TableHead>Transaction ID</TableHead>
                <TableHead>Corridor</TableHead>
                <TableHead>Sending Institution</TableHead>
                <TableHead>Receiving Institution</TableHead>
                <TableHead className="text-right">Amount Sent</TableHead>
                <TableHead className="text-right">Amount Paid</TableHead>
                <TableHead className="text-right">FX Rate</TableHead>
                <TableHead>Rail</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((txn) => (
                <TableRow key={txn.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-muted text-xs font-medium">
                      {txn.corridor}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">{txn.sendingInstitution}</TableCell>
                  <TableCell className="max-w-[150px] truncate">{txn.receivingInstitution}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(txn.amountSent, txn.currencySent)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(txn.amountPaid, txn.currencyPaid)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {txn.fxRate.toFixed(4)}
                  </TableCell>
                  <TableCell>
                    <span className={`text-xs font-medium ${txn.emergingRail ? 'text-info' : ''}`}>
                      {txn.settlementRail}
                      {txn.emergingRail && ' ⚡'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={getStatusType(txn.status)} label={txn.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(txn.timestamp)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-4 py-3 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing {filteredTransactions.length} of {transactions.length} transactions</span>
          <span>Page 1 of 1</span>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

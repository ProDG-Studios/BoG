import { useMemo } from 'react';
import { AlertTriangle, CheckCircle, ArrowRight, Building2, Smartphone, Wallet, Landmark } from 'lucide-react';
import { comminglingRelationships, internationalPlayers, localTerminationPartners } from '@/data/fxMarketData';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ComminglingMapProps {
  filterRisk?: 'all' | 'High' | 'Medium' | 'Low';
}

export function ComminglingMap({ filterRisk = 'all' }: ComminglingMapProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Bank': return <Landmark className="w-4 h-4" />;
      case 'MMO': return <Smartphone className="w-4 h-4" />;
      case 'PSP': return <Wallet className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-destructive border-destructive bg-destructive/10';
      case 'Medium': return 'text-warning border-warning bg-warning/10';
      case 'Low': return 'text-success border-success bg-success/10';
      default: return 'text-muted-foreground border-border';
    }
  };

  const getFlowColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'from-destructive/50 to-destructive/30';
      case 'Medium': return 'from-warning/50 to-warning/30';
      case 'Low': return 'from-success/50 to-success/30';
      default: return 'from-muted to-muted';
    }
  };

  const filteredRelationships = useMemo(() => {
    if (filterRisk === 'all') return comminglingRelationships;
    return comminglingRelationships.filter(r => r.comminglingRisk === filterRisk);
  }, [filterRisk]);

  // Get unique international players and local partners that are in the filtered relationships
  const activeInternationalIds = new Set(filteredRelationships.map(r => r.internationalPlayerId));
  const activeLocalIds = new Set(filteredRelationships.map(r => r.localPartnerId));

  const activeInternational = internationalPlayers.filter(p => activeInternationalIds.has(p.id));
  const activeLocal = localTerminationPartners.filter(p => activeLocalIds.has(p.id));

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold text-foreground">{internationalPlayers.length}</p>
          <p className="text-xs text-muted-foreground">Int'l Players</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-muted/50">
          <p className="text-2xl font-bold text-foreground">{localTerminationPartners.length}</p>
          <p className="text-xs text-muted-foreground">Local Partners</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-destructive/10">
          <p className="text-2xl font-bold text-destructive">{comminglingRelationships.filter(r => r.comminglingRisk === 'High').length}</p>
          <p className="text-xs text-destructive">High Risk</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-warning/10">
          <p className="text-2xl font-bold text-warning">{comminglingRelationships.filter(r => r.issues.length > 0).length}</p>
          <p className="text-xs text-warning">With Issues</p>
        </div>
      </div>

      {/* Relationship Flow Visualization */}
      <div className="relative">
        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-start">
          {/* International Players Column */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Building2 size={14} /> International Players
            </h4>
            {activeInternational.map((player) => (
              <div 
                key={player.id}
                className="p-3 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{player.name}</p>
                    <p className="text-xs text-muted-foreground">{player.type} • {player.headquarters}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    player.complianceRating === 'A' ? 'bg-success/10 text-success' :
                    player.complianceRating === 'B' ? 'bg-warning/10 text-warning' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {player.complianceRating}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatCurrency(player.monthlyValue)}/mo
                </p>
              </div>
            ))}
          </div>

          {/* Flow Arrows */}
          <div className="flex flex-col items-center justify-center py-8 space-y-2">
            {filteredRelationships.slice(0, 6).map((rel, idx) => (
              <Tooltip key={idx}>
                <TooltipTrigger>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gradient-to-r ${getFlowColor(rel.comminglingRisk)}`}>
                    <ArrowRight size={12} />
                    <span>{rel.corridor}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs">
                    <p className="font-medium">{rel.internationalPlayerName} → {rel.localPartnerName}</p>
                    <p>{formatCurrency(rel.monthlyValue)}/mo</p>
                    <p className="text-muted-foreground">{rel.settlementMethod}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Local Partners Column */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Smartphone size={14} /> Local Termination Partners
            </h4>
            {activeLocal.map((partner) => (
              <div 
                key={partner.id}
                className={`p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors ${
                  partner.concentrationRisk === 'High' ? 'border-destructive/50' : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(partner.type)}
                    <div>
                      <p className="font-medium text-sm">{partner.name}</p>
                      <p className="text-xs text-muted-foreground">{partner.type} • {partner.settlementSpeed}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground">
                    {partner.monthlyPayouts.toLocaleString()} payouts
                  </p>
                  {partner.concentrationRisk === 'High' && (
                    <span className="text-xs text-destructive flex items-center gap-1">
                      <AlertTriangle size={10} /> Concentration
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Relationship Details Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="bg-muted/50 px-4 py-2 border-b border-border">
          <h4 className="text-sm font-semibold">Commingling Relationships</h4>
        </div>
        <div className="divide-y divide-border max-h-64 overflow-y-auto">
          {filteredRelationships.map((rel, idx) => (
            <div key={idx} className="px-4 py-3 hover:bg-muted/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getRiskColor(rel.comminglingRisk)}`}>
                    {rel.comminglingRisk}
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      {rel.internationalPlayerName} <span className="text-muted-foreground mx-1">→</span> {rel.localPartnerName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {rel.corridor} • {rel.settlementMethod} • Last audit: {rel.lastAuditDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatCurrency(rel.monthlyValue)}</p>
                  <p className="text-xs text-muted-foreground">{rel.monthlyVolume.toLocaleString()} txns</p>
                </div>
              </div>
              {rel.issues.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {rel.issues.map((issue, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive flex items-center gap-1">
                      <AlertTriangle size={10} /> {issue}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComminglingMap;

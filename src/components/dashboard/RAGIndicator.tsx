import { cn } from '@/lib/utils';

interface RAGIndicatorProps {
  high: number;
  medium: number;
  low: number;
}

export function RAGIndicator({ high, medium, low }: RAGIndicatorProps) {
  const total = high + medium + low;
  
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          <span className="text-sm font-medium">{high} High</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-warning" />
          <span className="text-sm font-medium">{medium} Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm font-medium">{low} Low</span>
        </div>
      </div>
      
      <div className="flex h-2 rounded-full overflow-hidden bg-muted">
        {high > 0 && (
          <div 
            className="bg-destructive transition-all duration-500"
            style={{ width: `${(high / total) * 100}%` }}
          />
        )}
        {medium > 0 && (
          <div 
            className="bg-warning transition-all duration-500"
            style={{ width: `${(medium / total) * 100}%` }}
          />
        )}
        {low > 0 && (
          <div 
            className="bg-success transition-all duration-500"
            style={{ width: `${(low / total) * 100}%` }}
          />
        )}
      </div>
      
      <p className="text-xs text-muted-foreground">
        {total} total exceptions requiring attention
      </p>
    </div>
  );
}

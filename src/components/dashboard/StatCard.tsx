import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  icon?: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export function StatCard({ title, value, subtitle, change, icon: Icon, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'border-l-4 border-l-primary',
    success: 'border-l-4 border-l-success',
    warning: 'border-l-4 border-l-warning',
    danger: 'border-l-4 border-l-destructive',
  };

  return (
    <div className={cn('stat-card', variantStyles[variant])}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>
      {change !== undefined && (
        <div className={cn(
          'mt-3 flex items-center gap-1',
          change >= 0 ? 'stat-change-positive' : 'stat-change-negative'
        )}>
          {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>{Math.abs(change)}% vs last period</span>
        </div>
      )}
    </div>
  );
}

import { cn } from '@/lib/utils';

type StatusType = 'success' | 'warning' | 'error' | 'info' | 'neutral';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
}

const statusStyles: Record<StatusType, string> = {
  success: 'status-success',
  warning: 'status-warning',
  error: 'status-error',
  info: 'status-info',
  neutral: 'status-neutral',
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={cn(statusStyles[status])}>
      {label}
    </span>
  );
}

// Helper to convert transaction/submission status to badge type
export function getStatusType(status: string): StatusType {
  switch (status) {
    case 'Settled':
    case 'Matched':
    case 'Published':
    case 'Approved':
    case 'Completed':
      return 'success';
    case 'Pending':
    case 'Submitted':
    case 'Pending Review':
      return 'warning';
    case 'Exception':
    case 'Rejected':
    case 'Unmatched':
    case 'Failed':
      return 'error';
    case 'Validated':
      return 'info';
    case 'Draft':
    default:
      return 'neutral';
  }
}

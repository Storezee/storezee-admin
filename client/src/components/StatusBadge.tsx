import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';

const STATUS_OPTIONS = [
  // { value: 'pending', label: 'Pending' },
  // { value: 'active', label: 'Active' },
  { value: 'confirmed', label: 'Confirmed' },
  // { value: 'pickup', label: 'Pickup' },
  // { value: 'out_for_delivery', label: 'Out for Delivery' },
  { value: 'luggage_Stored', label: 'Luggage Stored' },
  // { value: 'luggage_reached', label: 'Luggage Reached' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    // pending: 'bg-status-pending/10 text-status-pending border-status-pending/20',
    // active: 'bg-status-active/10 text-status-active border-status-active/20',
    confirmed: 'bg-status-confirmed/10 text-status-confirmed border-status-confirmed/20',
    // pickup: 'bg-status-pickup/10 text-status-pickup border-status-pickup/20',
    // out_for_delivery: 'bg-status-delivery/10 text-status-delivery border-status-delivery/20',
    luggage_Stored: 'bg-status-stored/10 text-status-stored border-status-stored/20',
    // luggage_reached: 'bg-status-delivery/10 text-status-delivery border-status-delivery/20',
    completed: 'bg-status-completed/10 text-status-completed border-status-completed/20',
    cancelled: 'bg-status-cancelled/10 text-status-cancelled border-status-cancelled/20',
  };
  
  return statusMap[status] || 'bg-muted text-muted-foreground border-border';
};

const formatStatusLabel = (status: string): string => {
  const label = STATUS_OPTIONS.find(opt => opt.value === status)?.label;
  return label || status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

interface StatusBadgeProps {
  status: string;
  onStatusChange?: (newStatus: string) => void;
  editable?: boolean;
}

export default function StatusBadge({ status, onStatusChange, editable = false }: StatusBadgeProps) {
  if (!editable) {
    return (
      <Badge 
        variant="outline" 
        className={`${getStatusColor(status)} no-default-hover-elevate no-default-active-elevate font-medium`}
        data-testid={`badge-status-${status}`}
      >
        {formatStatusLabel(status)}
      </Badge>
    );
  }

  return (
    <Select value={status} onValueChange={onStatusChange}>
      <SelectTrigger 
        className={`w-full max-w-[200px] h-auto py-1 px-3 border ${getStatusColor(status)}`}
        data-testid="select-status"
      >
        <SelectValue>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{formatStatusLabel(status)}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent data-testid="select-status-content">
        {STATUS_OPTIONS.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            data-testid={`select-status-option-${option.value}`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(option.value).split(' ')[0]}`} />
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

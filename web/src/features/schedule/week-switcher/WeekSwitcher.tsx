import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { addDays, formatWeekLabel } from '@/shared/lib/date';

interface WeekSwitcherProps {
  weekStart: Date;
  onChange: (weekStart: Date) => void;
}

export function WeekSwitcher({ weekStart, onChange }: WeekSwitcherProps) {
  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="icon" onClick={() => onChange(addDays(weekStart, -7))}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">{formatWeekLabel(weekStart)}</span>
      <Button variant="outline" size="icon" onClick={() => onChange(addDays(weekStart, 7))}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

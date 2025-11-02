import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Check, X } from 'lucide-react';

interface AmountEditorProps {
  amount: number | null;
  onSave: (amount: string) => void;
}

export default function AmountEditor({ amount, onSave }: AmountEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(amount?.toString() || '');

  const handleSave = () => {
    if (value.trim()) {
      onSave(value);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setValue(amount?.toString() || '');
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div 
        className="flex items-center gap-2 group"
        data-testid="amount-display"
      >
        <span className="font-medium font-mono">
          {amount ? `₹${amount}` : '—'}
        </span>
        <Button
          size="icon"
          variant="ghost"
          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditing(true)}
          data-testid="button-edit-amount"
        >
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2" data-testid="amount-editor">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          ₹
        </span>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-32 pl-7 h-8"
          placeholder="0"
          autoFocus
          data-testid="input-amount"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
        />
      </div>
      <Button
        size="icon"
        variant="default"
        className="h-7 w-7"
        onClick={handleSave}
        data-testid="button-save-amount"
      >
        <Check className="h-3.5 w-3.5" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="h-7 w-7"
        onClick={handleCancel}
        data-testid="button-cancel-amount"
      >
        <X className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

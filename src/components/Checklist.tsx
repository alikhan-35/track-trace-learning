import { Check } from 'lucide-react';
import type { ChecklistItem } from '../types/training';

interface ChecklistProps {
  items: ChecklistItem[];
  completedItems: string[];
  onToggle: (itemId: string) => void;
}

const Checklist = ({ items, completedItems, onToggle }: ChecklistProps) => (
  <div className="space-y-3">
    {items.map((item) => {
      const isChecked = completedItems.includes(item.id);

      return (
        <button
          key={item.id}
          type="button"
          onClick={() => onToggle(item.id)}
          className="focus-ring flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-brand-200 hover:bg-brand-50/40"
        >
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
              isChecked ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 bg-white text-transparent'
            }`}
          >
            <Check className="h-4 w-4" />
          </span>
          <span className={`text-sm font-medium ${isChecked ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
            {item.label}
          </span>
        </button>
      );
    })}
  </div>
);

export default Checklist;

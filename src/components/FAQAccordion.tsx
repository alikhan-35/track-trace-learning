import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { FAQItem } from '../types/training';

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion = ({ items }: FAQAccordionProps) => {
  const [openId, setOpenId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    setOpenId(items[0]?.id ?? '');
  }, [items]);

  return (
    <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <section key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? '' : item.id)}
              className="focus-ring flex w-full items-center justify-between gap-4 rounded-lg px-5 py-4 text-left"
            >
              <span>
                <span className="block text-xs font-bold uppercase tracking-wide text-brand-600">{item.category}</span>
                <span className="mt-1 block font-semibold text-slate-950">{item.question}</span>
              </span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <p className="px-5 pb-5 text-sm leading-6 text-slate-600">{item.answer}</p>}
          </section>
        );
      })}
    </div>
  );
};

export default FAQAccordion;

import { useMemo, useState } from 'react';
import FAQAccordion from '../components/FAQAccordion';
import SearchBar from '../components/SearchBar';
import { commonMistakes, faqItems } from '../data/trainingData';

const FAQPage = () => {
  const [query, setQuery] = useState('');

  const filteredFaq = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return faqItems;
    }

    return faqItems.filter((item) =>
      [item.category, item.question, item.answer].join(' ').toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">FAQ</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Ответы на частые вопросы по доступам, статусам, поиску и прохождению обучения.
          </p>
        </div>
        <div className="w-full lg:max-w-md">
          <SearchBar value={query} onChange={setQuery} placeholder="Поиск по FAQ" />
        </div>
      </div>

      {filteredFaq.length > 0 ? (
        <FAQAccordion items={filteredFaq} />
      ) : (
        <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
          По вашему запросу ничего не найдено.
        </div>
      )}

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">Частые ошибки</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {commonMistakes.map((mistake) => (
            <div key={mistake} className="rounded-lg bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200">
              {mistake}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FAQPage;

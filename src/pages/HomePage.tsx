import { ArrowRight, BookOpen, CheckCircle2, RefreshCw, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import RoleCard from '../components/RoleCard';
import SearchBar from '../components/SearchBar';
import { commonMistakes, roles } from '../data/trainingData';

const HomePage = () => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    return roles.flatMap((role) =>
      role.modules
        .filter((module) =>
          [role.title, module.title, module.description, ...module.lessons]
            .join(' ')
            .toLowerCase()
            .includes(normalizedQuery),
        )
        .map((module) => ({ role, module })),
    );
  }, [query]);

  return (
    <div className="space-y-10">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-8 p-6 lg:grid-cols-[1.15fr_0.85fr] lg:p-8">
          <div>
            <span className="inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">
              Обучающий портал
            </span>
            <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">
              Track&Trace для уверенной работы с процессами прослеживаемости
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Выберите роль, пройдите персональный маршрут, закрепите знания тестами и используйте
              чек-листы в ежедневной работе.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/roles"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
              >
                Начать обучение
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/faq"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Открыть FAQ
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-lg bg-slate-50 p-5 ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-white p-3 text-brand-700 shadow-sm">
                  <UserPlus className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-950">Новые пользователи</h2>
                  <p className="text-sm text-slate-600">Старт с входа, навигации и базовых операций.</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-blue-50 p-5 ring-1 ring-blue-100">
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-white p-3 text-brand-700 shadow-sm">
                  <RefreshCw className="h-6 w-6" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-950">Текущие пользователи</h2>
                  <p className="text-sm text-slate-600">Быстрое повторение, ошибки и проверка знаний.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          ['7', 'ролей и маршрутов'],
          ['35+', 'учебных блоков'],
          ['100%', 'локальные мок-данные'],
        ].map(([value, label]) => (
          <div key={label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-3xl font-bold text-brand-700">{value}</p>
            <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">Поиск по материалам</h2>
            <p className="mt-1 text-sm text-slate-600">Найдите модуль по роли, задаче или ключевому слову.</p>
          </div>
          <div className="w-full sm:max-w-md">
            <SearchBar value={query} onChange={setQuery} />
          </div>
        </div>
        {query && (
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            {searchResults.length > 0 ? (
              <div className="grid gap-3">
                {searchResults.map(({ role, module }) => (
                  <Link
                    key={`${role.id}-${module.id}`}
                    to={`/roles/${role.id}/modules/${module.id}`}
                    className="focus-ring flex items-center justify-between rounded-lg p-3 hover:bg-slate-50"
                  >
                    <span>
                      <span className="block font-semibold text-slate-900">{module.title}</span>
                      <span className="text-sm text-slate-500">{role.title}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-600">Материалы по запросу не найдены.</p>
            )}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-brand-700" />
          <h2 className="text-2xl font-bold text-slate-950">Популярные маршруты</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {roles.slice(0, 6).map((role) => (
            <RoleCard key={role.id} role={role} />
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-brand-700" />
          <h2 className="text-2xl font-bold text-slate-950">Частые ошибки</h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
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

export default HomePage;

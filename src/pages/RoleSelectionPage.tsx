import { useMemo, useState } from 'react';
import RoleCard from '../components/RoleCard';
import SearchBar from '../components/SearchBar';
import { roles } from '../data/trainingData';

const RoleSelectionPage = () => {
  const [query, setQuery] = useState('');

  const filteredRoles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return roles;
    }

    return roles.filter((role) =>
      [role.title, role.description, ...role.responsibilities].join(' ').toLowerCase().includes(normalizedQuery),
    );
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-950">Выберите роль пользователя</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Каждый маршрут содержит введение, основные функции, типовые задачи, сценарии, тест и финальный чек-лист.
          </p>
        </div>
        <div className="w-full lg:max-w-md">
          <SearchBar value={query} onChange={setQuery} placeholder="Найти роль или задачу" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredRoles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
};

export default RoleSelectionPage;

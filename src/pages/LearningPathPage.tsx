import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import ModuleCard from '../components/ModuleCard';
import ProgressBar from '../components/ProgressBar';
import { roles } from '../data/trainingData';
import type { ProgressState } from '../utils/progress';
import { calculateModuleProgress, createProgressKey, readProgress } from '../utils/progress';

const LearningPathPage = () => {
  const { roleId } = useParams();
  const role = roles.find((item) => item.id === roleId);
  const [progress, setProgress] = useState<ProgressState>({});

  useEffect(() => {
    setProgress(readProgress());
  }, [roleId]);

  const routeProgress = useMemo(() => {
    if (!role) {
      return 0;
    }

    const allItems = role.modules.flatMap((module) => module.checklist);
    const completedCount = role.modules.reduce((total, module) => {
      const key = createProgressKey(role.id, module.id);
      return total + (progress[key]?.length ?? 0);
    }, 0);

    return calculateModuleProgress(completedCount, allItems.length);
  }, [progress, role]);

  if (!role) {
    return <Navigate to="/roles" replace />;
  }

  return (
    <div className="space-y-6">
      <Link
        to="/roles"
        className="focus-ring inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Все роли
      </Link>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-lg ring-1 ${role.accent}`}>
              <role.icon className="h-7 w-7" />
            </span>
            <div>
              <h1 className="text-3xl font-bold text-slate-950">{role.title}</h1>
              <p className="mt-2 max-w-3xl leading-7 text-slate-600">{role.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {role.responsibilities.map((item) => (
                  <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200 lg:max-w-sm">
            <ProgressBar value={routeProgress} label="Прогресс маршрута" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {role.modules.map((module) => {
            const key = createProgressKey(role.id, module.id);
            const moduleProgress = calculateModuleProgress(progress[key]?.length ?? 0, module.checklist.length);

            return <ModuleCard key={module.id} roleId={role.id} module={module} progress={moduleProgress} />;
          })}
        </div>

        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-brand-700" />
            <h2 className="font-bold text-slate-950">Структура маршрута</h2>
          </div>
          <ol className="mt-4 space-y-3 text-sm text-slate-600">
            <li>1. Введение в Track&Trace</li>
            <li>2. Основные функции</li>
            <li>3. Типовые задачи</li>
            <li>4. Пошаговые сценарии работы</li>
            <li>5. Проверка знаний</li>
            <li>6. Финальный чек-лист</li>
          </ol>
        </aside>
      </section>
    </div>
  );
};

export default LearningPathPage;

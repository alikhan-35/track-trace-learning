import { ArrowLeft, ArrowRight, BookOpen, ListChecks } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Checklist from '../components/Checklist';
import ProgressBar from '../components/ProgressBar';
import VideoPlaceholder from '../components/VideoPlaceholder';
import { roles } from '../data/trainingData';
import type { ProgressState } from '../utils/progress';
import {
  calculateModuleProgress,
  createProgressKey,
  readProgress,
  toggleChecklistItem,
  writeProgress,
} from '../utils/progress';

const ModulePage = () => {
  const { roleId, moduleId } = useParams();
  const role = roles.find((item) => item.id === roleId);
  const module = role?.modules.find((item) => item.id === moduleId);
  const [progress, setProgress] = useState<ProgressState>({});

  useEffect(() => {
    setProgress(readProgress());
  }, [roleId, moduleId]);

  const progressKey = role && module ? createProgressKey(role.id, module.id) : '';
  const completedItems = progressKey ? progress[progressKey] ?? [] : [];
  const moduleProgress = useMemo(
    () => calculateModuleProgress(completedItems.length, module?.checklist.length ?? 0),
    [completedItems.length, module?.checklist.length],
  );

  if (!role || !module) {
    return <Navigate to="/roles" replace />;
  }

  const handleToggle = (itemId: string) => {
    const nextProgress = toggleChecklistItem(progress, progressKey, itemId);
    setProgress(nextProgress);
    writeProgress(nextProgress);
  };

  return (
    <div className="space-y-6">
      <Link
        to={`/roles/${role.id}`}
        className="focus-ring inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100"
      >
        <ArrowLeft className="h-4 w-4" />
        Маршрут роли
      </Link>

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100">
              <module.icon className="h-7 w-7" />
            </span>
            <div>
              <p className="text-sm font-bold text-brand-700">{role.title}</p>
              <h1 className="mt-1 text-3xl font-bold text-slate-950">{module.title}</h1>
              <p className="mt-2 max-w-3xl leading-7 text-slate-600">{module.description}</p>
            </div>
          </div>
          <div className="w-full rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200 lg:max-w-sm">
            <ProgressBar value={moduleProgress} label="Прогресс модуля" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <main className="space-y-6">
          <VideoPlaceholder title={module.title} />

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-brand-700" />
              <h2 className="text-xl font-bold text-slate-950">Материалы модуля</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {module.lessons.map((lesson, index) => (
                <div key={lesson} className="flex gap-3 rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold text-brand-700 ring-1 ring-slate-200">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-700">{lesson}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ListChecks className="h-6 w-6 text-brand-700" />
              <h2 className="text-xl font-bold text-slate-950">Пошаговая инструкция</h2>
            </div>
            <ol className="mt-5 space-y-4">
              {module.scenarioSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-sm leading-6 text-slate-700">{step}</p>
                </li>
              ))}
            </ol>
          </section>
        </main>

        <aside className="space-y-6">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Интерактивный чек-лист</h2>
            <p className="mt-2 text-sm text-slate-600">Отметьте действия, которые уже можете выполнить.</p>
            <div className="mt-5">
              <Checklist items={module.checklist} completedItems={completedItems} onToggle={handleToggle} />
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-slate-950">Тест после модуля</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Проверьте понимание материала и получите пояснения по каждому вопросу.
            </p>
            <Link
              to={`/roles/${role.id}/modules/${module.id}/quiz`}
              className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
            >
              Перейти к тесту
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default ModulePage;

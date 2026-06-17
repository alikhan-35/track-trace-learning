import { ArrowRight, Clock3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Module } from '../types/training';
import ProgressBar from './ProgressBar';

interface ModuleCardProps {
  roleId: string;
  module: Module;
  progress: number;
}

const audienceLabel = {
  new: 'Для новых пользователей',
  current: 'Для текущих пользователей',
  all: 'Для всех',
};

const ModuleCard = ({ roleId, module, progress }: ModuleCardProps) => (
  <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700 ring-1 ring-brand-100">
          <module.icon className="h-6 w-6" />
        </span>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {module.level}
            </span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {audienceLabel[module.audience]}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold text-slate-950">{module.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{module.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Clock3 className="h-4 w-4" />
        {module.duration}
      </div>
    </div>

    <div className="mt-5">
      <ProgressBar value={progress} label="Выполнение чек-листа" />
    </div>

    <Link
      to={`/roles/${roleId}/modules/${module.id}`}
      className="focus-ring mt-5 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
    >
      Открыть модуль
      <ArrowRight className="h-4 w-4" />
    </Link>
  </article>
);

export default ModuleCard;

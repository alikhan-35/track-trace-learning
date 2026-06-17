import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Role } from '../types/training';

interface RoleCardProps {
  role: Role;
}

const RoleCard = ({ role }: RoleCardProps) => (
  <Link
    to={`/roles/${role.id}`}
    className="focus-ring group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
  >
    <div className="flex items-start justify-between gap-4">
      <span className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ring-1 ${role.accent}`}>
        <role.icon className="h-6 w-6" />
      </span>
      <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-brand-600" />
    </div>
    <div className="mt-5 flex-1">
      <h3 className="text-lg font-bold text-slate-950">{role.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{role.description}</p>
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      {role.responsibilities.map((item) => (
        <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
          {item}
        </span>
      ))}
    </div>
  </Link>
);

export default RoleCard;

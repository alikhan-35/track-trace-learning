import { BookOpen, HelpCircle, Home, LifeBuoy, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { roles } from '../data/trainingData';

const mainLinks = [
  { to: '/', label: 'Обзор', icon: Home },
  { to: '/roles', label: 'Начать обучение', icon: BookOpen },
  { to: '/faq', label: 'FAQ', icon: HelpCircle },
  { to: '/support', label: 'Поддержка', icon: LifeBuoy },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => (
  <>
    <div
      className={`fixed inset-0 z-40 bg-slate-950/40 transition lg:hidden ${
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={onClose}
    />
    <aside
      className={`fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] border-r border-slate-200 bg-white px-4 py-5 transition-transform lg:sticky lg:top-[73px] lg:z-20 lg:h-[calc(100vh-73px)] lg:w-72 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-500">
        <Users className="h-4 w-4" />
        Навигация
      </div>
      <nav className="space-y-1">
        {mainLinks.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">Маршруты</p>
        <div className="space-y-1">
          {roles.map((role) => (
            <NavLink
              key={role.id}
              to={`/roles/${role.id}`}
              onClick={onClose}
              className={({ isActive }) =>
                `focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <role.icon className="h-4 w-4" />
              <span className="truncate">{role.shortTitle}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  </>
);

export default Sidebar;

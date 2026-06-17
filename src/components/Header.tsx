import { Bell, LogIn, Menu, ShieldCheck } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/roles', label: 'Роли' },
  { to: '/faq', label: 'FAQ' },
  { to: '/support', label: 'Поддержка' },
];

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => (
  <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          className="focus-ring rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          type="button"
          onClick={onMenuClick}
          aria-label="Открыть меню"
        >
          <Menu className="h-6 w-6" />
        </button>
        <NavLink to="/" className="focus-ring flex items-center gap-3 rounded-lg">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-600 text-white">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-base font-bold text-slate-950">Track&Trace</span>
            <span className="block text-xs font-medium text-slate-500">Learning Portal</span>
          </span>
        </NavLink>
      </div>

      <nav className="hidden items-center gap-1 md:flex">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `focus-ring rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <button
          className="focus-ring hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100 sm:inline-flex"
          type="button"
          aria-label="Уведомления"
        >
          <Bell className="h-5 w-5" />
        </button>
        <button
          className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          type="button"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Вход</span>
        </button>
      </div>
    </div>
  </header>
);

export default Header;

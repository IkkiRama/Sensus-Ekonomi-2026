import { Link, NavLink, Outlet } from 'react-router-dom';
import { Moon, Sun, LogOut, Database, LayoutDashboard, Home, User } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../firebase/config.js';
import { toggleDarkMode } from '../../redux/uiSlice.js';
import Toast from '../ui/Toast.jsx';
import Button from '../ui/Button.jsx';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/data', label: 'Data', icon: Database },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Profil', icon: User }
];

export default function AppLayout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-app text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
            <Link to="/" className="text-xl font-black text-primary">SE2026</Link>
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-2 rounded px-3 py-2 text-sm font-semibold ${isActive ? 'bg-blue-50 text-primary dark:bg-blue-950' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}`
                    }
                  >
                    <Icon size={18} /> {item.label}
                  </NavLink>
                );
              })}
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="ghost" aria-label="Ganti tema" onClick={() => dispatch(toggleDarkMode())}>
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </Button>
              {user ? (
                <Button variant="soft" onClick={() => signOut(auth)}>
                  <LogOut size={18} /> Keluar
                </Button>
              ) : (
                <Link to="/login"><Button>Login</Button></Link>
              )}
            </div>
          </div>
          <nav className="grid grid-cols-4 border-t border-slate-200 md:hidden dark:border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink key={item.to} to={item.to} className={({ isActive }) => `flex flex-col items-center gap-1 py-2 text-xs font-semibold ${isActive ? 'text-primary' : 'text-slate-500'}`}>
                  <Icon size={18} /> {item.label}
                </NavLink>
              );
            })}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6">
          <Outlet />
        </main>
        <Toast />
      </div>
    </div>
  );
}

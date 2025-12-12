import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Users, Folder, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CheckSquare, label: 'New Task', path: '/tasks' },
    { icon: Folder, label: 'Projects', path: '/projects' },
    { icon: Users, label: 'Teams', path: '/teams' },
  ];

  return (
    <aside className="w-full h-full flex flex-col bg-secondary border-r" style={{ width: '280px', position: 'fixed', left: 0, top: 0, borderRight: '1px solid var(--border-subtle)' }}>
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-primary" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <div className="p-2 bg-primary/10 rounded-lg">
            <CheckSquare size={24} className="text-primary" />
          </div>
          <span>Tasker</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-6">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors font-medium ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-secondary hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-secondary hover:bg-danger/10 hover:text-danger transition-colors font-medium"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

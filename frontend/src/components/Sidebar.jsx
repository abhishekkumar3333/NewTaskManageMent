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
    { icon: CheckSquare, label: 'My Tasks', path: '/tasks' },
    { icon: Folder, label: 'Projects', path: '/projects' },
    { icon: Users, label: 'Teams', path: '/teams' },
  ];

  return (
    <aside className="w-64 bg-secondary border-r border-border h-screen flex flex-col fixed left-0 top-0 overflow-y-auto" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
          <CheckSquare size={28} />
          <span>Tasker</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 py-4">
        <ul className="flex flex-col gap-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-secondary hover:bg-tertiary hover:text-white'
                  }`
                }
                style={({ isActive }) => isActive ? { backgroundColor: 'var(--primary)', color: 'white' } : {}}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-border" style={{ borderColor: 'var(--border-color)' }}>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

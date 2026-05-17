import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, Users, User, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: FolderKanban },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Team', path: '/team', icon: Users, role: 'ADMIN' },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 bg-slate-950 flex flex-col h-screen sticky top-0 shadow-2xl border-r border-white/5 relative z-20">
      <div className="p-8 flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-vibrant rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
          <CheckSquare className="text-white w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg text-white tracking-tighter leading-none">TASK</span>
          <span className="font-bold text-[10px] text-primary-400 tracking-[0.3em]">MANAGER</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          (!link.role || link.role === user?.roles[0]) && (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-5 py-4 rounded-2xl transition-all relative group ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-300'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-vibrant rounded-2xl shadow-xl shadow-primary-500/20 z-0"></div>
                  )}
                  <link.icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-white' : 'group-hover:text-primary-400'}`} />
                  <span className="font-bold text-sm relative z-10 tracking-tight">{link.name}</span>
                  {isActive && <Sparkles className="w-3 h-3 absolute right-4 text-white/50 z-10" />}
                </>
              )}
            </NavLink>
          )
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-white/5 rounded-[2rem] p-4 border border-white/10 mb-6">
           <div className="flex items-center space-x-3">
              <img 
                src={`https://ui-avatars.com/api/?name=${user?.name}&background=8b5cf6&color=fff`} 
                alt="Profile" 
                className="w-8 h-8 rounded-full ring-2 ring-primary-500/30"
              />
              <div className="overflow-hidden">
                <p className="text-[11px] font-black text-white truncate">{user?.name}</p>
                <p className="text-[9px] text-slate-500 font-bold truncate uppercase">{user?.roles[0]}</p>
              </div>
           </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center justify-center space-x-3 w-full px-5 py-4 text-slate-500 hover:bg-red-500/10 hover:text-red-400 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest border border-transparent hover:border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

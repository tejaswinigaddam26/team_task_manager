import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, Settings } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white/70 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-10">
      <div className="flex items-center space-x-8">
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="bg-slate-50 border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-200 transition-all w-64"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <button className="p-2.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
        
        <div className="h-8 w-[1px] bg-slate-100"></div>

        <div className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-slate-800 leading-none">{user?.name}</p>
            <p className="text-[9px] text-primary-500 mt-1 uppercase font-black tracking-[0.2em]">{user?.roles[0]}</p>
          </div>
          <div className="relative">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=8b5cf6&color=fff`} 
              alt="User" 
              className="w-10 h-10 rounded-xl shadow-lg shadow-primary-500/10 border-2 border-white"
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

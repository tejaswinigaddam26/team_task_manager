import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Briefcase, CheckCircle2, Clock, AlertCircle, Users, 
  TrendingUp, Calendar, MoreVertical, Sparkles
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    teamMembers: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pRes, tRes, uRes] = await Promise.all([
          api.get('/projects'),
          api.get('/tasks'),
          api.get('/users')
        ]);
        
        const tasks = tRes.data;
        const now = new Date();
        
        setStats({
          totalProjects: pRes.data.length,
          totalTasks: tasks.length,
          completedTasks: tasks.filter(t => t.status === 'COMPLETED').length,
          pendingTasks: tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS').length,
          overdueTasks: tasks.filter(t => t.dueDate && new Date(t.dueDate) < now && t.status !== 'COMPLETED').length,
          teamMembers: uRes.data.length
        });

        setRecentTasks(tasks.slice(0, 5));
        setMembers(uRes.data.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };
    fetchDashboardData();
  }, []);

  const chartData = user?.roles[0] === 'ADMIN' ? [
    { name: 'Completed', value: stats.completedTasks },
    { name: 'In Progress', value: stats.totalTasks - stats.completedTasks - stats.pendingTasks },
    { name: 'Pending', value: stats.pendingTasks },
    { name: 'Overdue', value: stats.overdueTasks },
  ] : [
    { name: 'Completed', value: stats.completedTasks },
    { name: 'Pending', value: stats.pendingTasks },
  ];

  const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444'];

  const StatCard = ({ title, value, icon: Icon, color, subValue, subColor }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{title}</p>
        <h3 className="text-3xl font-black text-slate-800 mt-1">{value}</h3>
        <div className="flex items-center mt-3 space-x-1">
          <TrendingUp className={`w-3.5 h-3.5 ${subColor}`} />
          <span className={`text-[11px] font-bold ${subColor}`}>{subValue}</span>
        </div>
      </div>
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-black text-primary-500 uppercase tracking-[0.3em] mb-2">
               <Sparkles className="w-3 h-3" />
               <span>Overview</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {user?.roles[0] === 'ADMIN' ? 'Admin Dashboard' : 'Member Dashboard'}
            </h1>
          </div>
          <div className="hidden md:block">
             <span className="text-xs font-bold text-slate-400">Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {user?.roles[0] === 'ADMIN' ? (
            <>
              <StatCard title="Projects" value={stats.totalProjects} icon={Briefcase} color="bg-primary-500" subValue="+2 this month" subColor="text-primary-500" />
              <StatCard title="Total Tasks" value={stats.totalTasks} icon={Calendar} color="bg-secondary-500" subValue="+12 this week" subColor="text-secondary-500" />
              <StatCard title="Completed" value={stats.completedTasks} icon={CheckCircle2} color="bg-emerald-500" subValue="High efficiency" subColor="text-emerald-500" />
              <StatCard title="Overdue" value={stats.overdueTasks} icon={AlertCircle} color="bg-red-500" subValue="Requires action" subColor="text-red-500" />
            </>
          ) : (
            <>
              <StatCard title="My Tasks" value={stats.totalTasks} icon={Calendar} color="bg-primary-500" subValue="Active assignments" subColor="text-primary-500" />
              <StatCard title="Working" value={stats.totalTasks - stats.completedTasks} icon={Clock} color="bg-amber-500" subValue="In progress" subColor="text-amber-500" />
              <StatCard title="Finished" value={stats.completedTasks} icon={CheckCircle2} color="bg-emerald-500" subValue="Tasks done" subColor="text-emerald-500" />
              <StatCard title="Deadline" value={stats.overdueTasks} icon={AlertCircle} color="bg-red-500" subValue="Attention needed" subColor="text-red-500" />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Tasks Overview Chart */}
          <div className="lg:col-span-4 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col">
            <h3 className="text-xs font-black text-slate-800 mb-8 uppercase tracking-widest">Efficiency Analytics</h3>
            <div className="h-64 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-black text-slate-800">{stats.totalTasks}</span>
                <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Total</span>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {chartData.map((data, index) => (
                <div key={data.name} className="flex items-center space-x-3 bg-slate-50 p-2.5 rounded-xl">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-tight">{data.name}</span>
                    <span className="text-xs font-bold text-slate-800">{data.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Recent Activity</h3>
              <button className="text-[10px] text-primary-500 font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Browse All →</button>
            </div>
            <div className="space-y-6">
              {recentTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors border border-slate-100">
                      <Calendar className="w-5 h-5 text-slate-400 group-hover:text-primary-500" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-800 group-hover:text-primary-600 transition-colors">{task.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{task.project.projectName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      task.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' : 
                      task.status === 'IN_PROGRESS' ? 'bg-secondary-100 text-secondary-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {task.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
              {recentTasks.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-xs font-bold text-slate-300 italic">No recent tasks found</p>
                </div>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div className="lg:col-span-3 bg-[#1e1b4b] p-8 rounded-3xl shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="text-xs font-black uppercase tracking-widest text-primary-300">Active Team</h3>
            </div>
            <div className="space-y-6 relative z-10">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between group">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${member.name}&background=8b5cf6&color=fff`} 
                        alt={member.name} 
                        className="w-10 h-10 rounded-2xl ring-2 ring-white/10 group-hover:ring-primary-500/50 transition-all"
                      />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1e1b4b]"></div>
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">{member.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 text-center text-[10px] text-slate-400 font-black uppercase tracking-widest border-t border-white/5 hover:text-primary-400 transition-colors relative z-10">
              Collaborators Overview →
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

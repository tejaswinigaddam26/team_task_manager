import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, CheckCircle2, Clock, AlertCircle, Filter, Trash2, Edit2, Search, Calendar, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CreateTaskModal from '../components/CreateTaskModal';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const { user } = useAuth();

  const fetchTasks = async () => {
    try {
      const endpoint = user?.roles[0] === 'ADMIN' ? '/tasks' : `/tasks/user/${user.id}`;
      const response = await api.get(endpoint);
      setTasks(response.data);
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      toast.success('Task updated');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Task deleted');
        fetchTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const filteredTasks = tasks.filter(t => {
    const matchesFilter = filter === 'ALL' || t.status === filter;
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'HIGH': return <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-100">High</span>;
      case 'MEDIUM': return <span className="bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-100">Medium</span>;
      default: return <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-primary-100">Low</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'COMPLETED': return <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">Completed</span>;
      case 'IN_PROGRESS': return <span className="bg-secondary-50 text-secondary-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-secondary-100">In Progress</span>;
      default: return <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-200">Pending</span>;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-black text-secondary-500 uppercase tracking-[0.3em] mb-2">
               <CheckCircle2 className="w-3 h-3" />
               <span>Workflow</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tasks</h1>
          </div>
          {user?.roles[0] === 'ADMIN' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-vibrant hover:opacity-90 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-xl shadow-primary-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="relative flex-1 max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Search tasks by title..." 
              className="w-full bg-white border border-slate-200 rounded-[1.25rem] py-4 pl-12 pr-4 text-xs font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/5 focus:border-primary-300 transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2 p-1.5 bg-slate-100/50 rounded-2xl border border-slate-100">
            {['ALL', 'PENDING', 'IN_PROGRESS', 'COMPLETED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f 
                    ? 'bg-white text-primary-600 shadow-md' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Task</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned To</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-primary-50/30 transition-all group">
                    <td className="px-8 py-6">
                      <span className="text-sm font-black text-slate-800 group-hover:text-primary-600 transition-colors">{task.title}</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">{task.project.projectName}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${task.assignedTo?.name || 'U'}&background=8b5cf6&color=fff`} 
                          alt="User" 
                          className="w-8 h-8 rounded-xl shadow-sm ring-2 ring-white"
                        />
                        <span className="text-xs font-bold text-slate-700">{task.assignedTo?.name || 'Unassigned'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">{getPriorityBadge(task.priority)}</td>
                    <td className="px-8 py-6">{getStatusBadge(task.status)}</td>
                    <td className="px-8 py-6">
                       <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{task.dueDate || '2026-06-01'}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {task.status !== 'COMPLETED' && (
                          <button
                            onClick={() => updateTaskStatus(task.id, task.status === 'PENDING' ? 'IN_PROGRESS' : 'COMPLETED')}
                            className="bg-white border border-slate-100 text-primary-500 hover:bg-primary-500 hover:text-white transition-all p-2.5 rounded-xl shadow-sm"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {user?.roles[0] === 'ADMIN' && (
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all p-2.5 rounded-xl shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTasks.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-lg font-black text-slate-800">Clear Workspace</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">No tasks found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchTasks}
      />
    </Layout>
  );
};

export default Tasks;

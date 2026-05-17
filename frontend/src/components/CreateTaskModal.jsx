import React, { useState, useEffect } from 'react';
import { X, Loader2, Calendar, FileText, Layout, User, Flag } from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const CreateTaskModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    projectId: '',
    assignedToId: '',
    dueDate: ''
  });
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const [pRes, uRes] = await Promise.all([
            api.get('/projects'),
            api.get('/users')
          ]);
          setProjects(pRes.data);
          setUsers(uRes.data);
        } catch (error) {
          toast.error('Failed to load form options');
        }
      };
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.projectId) return toast.error('Please select a project');
    setLoading(true);
    try {
      await api.post('/tasks', formData);
      toast.success('Task created successfully!');
      onSuccess();
      onClose();
      setFormData({
        title: '',
        description: '',
        priority: 'MEDIUM',
        projectId: '',
        assignedToId: '',
        dueDate: ''
      });
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1e1b4b]/60 backdrop-blur-md p-4">
      <div className="w-full max-w-2xl bg-white rounded-[2rem] border border-slate-100 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-8 border-b border-slate-50">
          <div>
            <h2 className="text-2xl font-black text-slate-800">Create Task</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Add new assignment</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-slate-600 transition-all p-2 bg-slate-50 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-full">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Title</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <input
                  type="text"
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                  placeholder="Implement User Authentication"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Project</label>
              <div className="relative">
                <Layout className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <select
                  required
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all appearance-none font-medium"
                  value={formData.projectId}
                  onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                >
                  <option value="">Select Project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.projectName}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Assign To</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <select
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all appearance-none font-medium"
                  value={formData.assignedToId}
                  onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                >
                  <option value="">Select Member</option>
                  {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Priority</label>
              <div className="relative">
                <Flag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <select
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all appearance-none font-medium"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Due Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all font-medium"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2 col-span-full">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Description</label>
              <textarea
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-4 text-slate-700 focus:outline-none focus:ring-4 focus:ring-primary-500/10 transition-all min-h-[100px] font-medium"
                placeholder="Describe the task..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primary-500/20 flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;

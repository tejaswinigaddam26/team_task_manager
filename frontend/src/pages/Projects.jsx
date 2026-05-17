import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Plus, Folder, Calendar, User, MoreVertical, Trash2, Edit3, Sparkles } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CreateProjectModal from '../components/CreateProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects');
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to load projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        toast.success('Project deleted');
        fetchProjects();
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-black text-primary-500 uppercase tracking-[0.3em] mb-2">
               <Folder className="w-3 h-3" />
               <span>Workspace</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Projects</h1>
          </div>
          {user?.roles[0] === 'ADMIN' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-vibrant hover:opacity-90 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-xl shadow-primary-500/25"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </button>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">#</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Project Details</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tasks</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Created</th>
                  <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {projects.map((project, index) => (
                  <tr key={project.id} className="hover:bg-primary-50/30 transition-all group">
                    <td className="px-8 py-6 text-xs font-bold text-slate-300">{String(index + 1).padStart(2, '0')}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-primary-500 transition-colors shadow-sm">
                           <Folder className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-black text-slate-800 group-hover:text-primary-600 transition-colors">{project.projectName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-medium text-slate-500 line-clamp-1 max-w-[250px]">{project.description || 'No description provided'}</span>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center space-x-2">
                          <span className="text-xs font-black text-slate-700">{project.tasks?.length || 0}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">Tasks</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-600">
                        Active
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase">
                      {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-white border border-slate-100 text-slate-400 hover:text-primary-500 hover:border-primary-100 transition-all p-2 rounded-xl shadow-sm">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        {user?.roles[0] === 'ADMIN' && (
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:border-red-100 transition-all p-2 rounded-xl shadow-sm"
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
          
          {projects.length === 0 && (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                 <Folder className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-lg font-black text-slate-800">No Projects Yet</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Start by creating your first workspace</p>
            </div>
          )}
        </div>
      </div>

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchProjects}
      />
    </Layout>
  );
};

export default Projects;

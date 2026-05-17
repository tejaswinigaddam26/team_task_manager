import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import api from '../services/api';
import { Users, Mail, Shield, Trash2, UserPlus, Sparkles, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Team = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      const response = await api.get('/users');
      setMembers(response.data);
    } catch (error) {
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2">
               <Users className="w-3 h-3" />
               <span>Organization</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Team Members</h1>
          </div>
          <button className="bg-gradient-vibrant hover:opacity-90 text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center space-x-2 transition-all shadow-xl shadow-primary-500/25">
            <UserPlus className="w-4 h-4" />
            <span>Invite Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members.map((member) => (
            <div key={member.id} className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col items-center text-center relative overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              {/* Card Accent */}
              <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${
                member.role === 'ADMIN' ? 'from-indigo-500 to-primary-500' : 'from-emerald-400 to-secondary-400'
              }`}></div>
              
              <div className="relative mb-6">
                <img 
                  src={`https://ui-avatars.com/api/?name=${member.name}&background=${member.role === 'ADMIN' ? '8b5cf6' : '06b6d4'}&color=fff&size=200`} 
                  alt={member.name} 
                  className="w-24 h-24 rounded-3xl shadow-lg ring-4 ring-slate-50 group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-xl flex items-center justify-center text-white shadow-lg ${
                  member.role === 'ADMIN' ? 'bg-indigo-600' : 'bg-emerald-500'
                }`}>
                  {member.role === 'ADMIN' ? <Shield className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-800">{member.name}</h3>
              <div className="flex items-center text-[10px] font-bold text-slate-400 mt-2 mb-6 uppercase tracking-wider">
                <Mail className="w-3 h-3 mr-2 text-primary-400" />
                {member.email}
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  member.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}>
                  {member.role}
                </span>
                <span className="px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-slate-50 text-slate-400 border border-slate-100">
                  Active Now
                </span>
              </div>

              <div className="w-full pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-primary-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest group/btn">
                  <span>Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                  <span>Remove</span>
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {loading && members.length === 0 && (
          <div className="py-24 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin border-4 border-primary-500 border-t-transparent"></div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em]">Synchronizing Team...</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Team;

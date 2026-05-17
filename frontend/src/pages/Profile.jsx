import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, Edit3, Camera, Sparkles } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="space-y-8 max-w-5xl">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-black text-primary-500 uppercase tracking-[0.3em] mb-2">
             <User className="w-3 h-3" />
             <span>Identity</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">My Profile</h1>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="h-48 bg-gradient-vibrant relative">
             <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
             <div className="absolute top-6 right-8">
                <div className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/30">
                   <Sparkles className="w-4 h-4 text-white" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Premium Account</span>
                </div>
             </div>
          </div>
          
          <div className="px-12 pb-12">
            <div className="relative -mt-20 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="relative">
                <img 
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=8b5cf6&color=fff&size=200`} 
                  alt="Avatar" 
                  className="w-40 h-40 rounded-[2.5rem] border-8 border-white shadow-2xl"
                />
                <button className="absolute bottom-2 right-2 p-3 bg-white rounded-2xl shadow-xl border border-slate-100 text-primary-500 hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 md:pb-4">
                 <h2 className="text-3xl font-black text-slate-900">{user?.name}</h2>
                 <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-widest">{user?.roles[0]} • TEAM TASK MANAGER</p>
              </div>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center space-x-3 shadow-xl shadow-slate-900/20 transition-all self-start md:self-auto">
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                   <div className="w-1.5 h-6 bg-primary-500 rounded-full"></div>
                   <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Personal Details</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-5 p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-primary-200 transition-colors">
                    <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:text-primary-500 transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Display Name</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{user?.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-5 p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-primary-200 transition-colors">
                    <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:text-primary-500 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Email Address</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">{user?.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center space-x-3">
                   <div className="w-1.5 h-6 bg-secondary-500 rounded-full"></div>
                   <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">System Access</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-5 p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-secondary-200 transition-colors">
                    <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:text-secondary-500 transition-colors">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Assigned Role</p>
                      <span className="text-[10px] font-black uppercase tracking-widest bg-primary-100 text-primary-600 px-3 py-1 rounded-full mt-1.5 inline-block border border-primary-200">
                        {user?.roles[0]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-5 p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-secondary-200 transition-colors">
                    <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:text-secondary-500 transition-colors">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Member Since</p>
                      <p className="text-sm font-bold text-slate-800 mt-0.5">May 16, 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

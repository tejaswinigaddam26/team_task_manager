import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, Briefcase, Loader2, Sparkles } from 'lucide-react';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'MEMBER'
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(formData);
      toast.success('Account created! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary-600/10 rounded-full blur-[120px]"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Illustration & Branding */}
        <div className="hidden lg:flex flex-col items-start space-y-8 order-2 lg:order-1">
          <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <UserPlus className="w-4 h-4 text-secondary-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Join the Community</span>
          </div>
          
          <h1 className="text-7xl font-black text-white leading-none tracking-tighter">
            START YOUR <br />
            <span className="gradient-text">JOURNEY.</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-medium max-w-md">
            Collaborate with your team, manage your projects, and boost your productivity today.
          </p>

          <div className="relative w-full max-w-lg pt-10">
            <img 
              src="/assets/illustration.png" 
              alt="Collaboration Illustration" 
              className="w-full h-auto drop-shadow-[0_35px_35px_rgba(6,182,212,0.2)] hover:scale-105 transition-transform duration-700 h-flip"
              style={{ transform: 'scaleX(-1)' }}
            />
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full max-w-[500px] mx-auto order-1 lg:order-2">
          <div className="glass-card rounded-[2.5rem] p-10 lg:p-14 border-white/10 bg-slate-900/40">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-black text-white">
                Get Started <span className="inline-block animate-bounce ml-1">🚀</span>
              </h2>
              <p className="text-slate-400 mt-2 font-medium">Create your workspace account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary-500/50 focus:bg-slate-800 transition-all font-medium"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary-500/50 focus:bg-slate-800 transition-all font-medium"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="password"
                    required
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-secondary-500/50 focus:bg-slate-800 transition-all font-medium"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Your Role</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <select
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500/50 focus:bg-slate-800 transition-all appearance-none font-medium"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="MEMBER">Team Member</option>
                    <option value="ADMIN">Project Admin</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-vibrant hover:opacity-90 text-white font-black py-4 rounded-2xl transition-all shadow-2xl shadow-primary-500/20 flex items-center justify-center disabled:opacity-70 text-sm uppercase tracking-[0.2em] mt-6"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <span className="flex items-center">
                    Create Account <Sparkles className="ml-2 w-4 h-4" />
                  </span>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-slate-400 text-sm font-bold tracking-tight">
                Already have an account?{' '}
                <Link to="/login" className="text-primary-400 hover:text-primary-300 font-black underline decoration-2 underline-offset-4">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

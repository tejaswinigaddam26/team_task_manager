import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { LogIn, Mail, Lock, Loader2, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-600/20 rounded-full blur-[120px] animate-pulse"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Illustration & Branding */}
        <div className="hidden lg:flex flex-col items-start space-y-8">
          <div className="flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Next-Gen Management</span>
          </div>
          
          <h1 className="text-7xl font-black text-white leading-none tracking-tighter">
            ORGANIZE <br />
            <span className="gradient-text">EVERYTHING.</span>
          </h1>
          
          <p className="text-xl text-slate-400 font-medium max-w-md">
            The ultimate workspace for teams to collaborate, track, and achieve goals with style.
          </p>

          <div className="relative w-full max-w-lg pt-10">
            <img 
              src="/assets/illustration.png" 
              alt="Collaboration Illustration" 
              className="w-full h-auto drop-shadow-[0_35px_35px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-[500px] mx-auto">
          <div className="glass-card rounded-[2.5rem] p-10 lg:p-14 border-white/10 bg-slate-900/40">
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-3xl font-black text-white">
                Welcome Back <span className="inline-block animate-bounce ml-1">👋</span>
              </h2>
              <p className="text-slate-400 mt-2 font-medium">Please enter your details to sign in.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:bg-slate-800 transition-all font-medium"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    type="password"
                    required
                    className="w-full bg-slate-800/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:bg-slate-800 transition-all font-medium"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center text-xs font-bold text-slate-500 cursor-pointer hover:text-slate-300">
                  <input type="checkbox" className="mr-2 rounded border-white/10 bg-slate-800 text-primary-600 focus:ring-primary-500" />
                  Remember me
                </label>
                <a href="#" className="text-xs font-bold text-primary-400 hover:text-primary-300">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-vibrant hover:opacity-90 text-white font-black py-4 rounded-2xl transition-all shadow-2xl shadow-primary-500/20 flex items-center justify-center disabled:opacity-70 text-sm uppercase tracking-[0.2em] mt-8"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <span className="flex items-center">
                    Sign In <LogIn className="ml-2 w-4 h-4" />
                  </span>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-slate-400 text-sm font-bold tracking-tight">
                Don't have an account?{' '}
                <Link to="/signup" className="text-secondary-400 hover:text-secondary-300 font-black underline decoration-2 underline-offset-4">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

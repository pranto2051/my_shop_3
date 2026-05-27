import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Fingerprint
} from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-tr from-green-500 to-blue-500 rounded-2xl shadow-2xl shadow-green-500/20 mb-6 group">
            <ShieldCheck className="text-white group-hover:scale-110 transition-transform duration-300" size={32} />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-2">ShopAdmin</h1>
          <p className="text-slate-400">Enterprise Resource Planning System</p>
        </div>

        <div className="glass-dark p-8 rounded-[32px] border border-white/10 shadow-2xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white">Sign In</h2>
            <p className="text-sm text-slate-500 mt-1">Enter your credentials to access your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="name@company.com" 
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-4 text-white outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-xs font-bold text-green-500 hover:text-green-400 transition-colors">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors" size={20} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••" 
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-3.5 pl-12 pr-12 text-white outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all placeholder:text-slate-600"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-green-500 focus:ring-green-500/20" />
              <label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer">Remember this device</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-primary py-4 flex items-center justify-center space-x-2 group relative overflow-hidden"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="relative z-10">Sign into Dashboard</span>
                  <ArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">or secure login</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <button className="w-full mt-6 py-3.5 rounded-2xl border border-slate-800 hover:bg-white/5 flex items-center justify-center space-x-3 text-slate-300 transition-all font-medium">
            <Fingerprint size={20} className="text-slate-500" />
            <span>Use Biometric Auth</span>
          </button>
        </div>

        <p className="text-center mt-10 text-slate-500 text-sm">
          Protected by Enterprise-grade Encryption. 
          <br />
          <span className="text-slate-700">© 2026 ShopAdmin Systems</span>
        </p>
      </motion.div>
    </div>
  );
}

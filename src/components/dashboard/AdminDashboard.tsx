import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  Activity, 
  Server, 
  ArrowUpRight, 
  TrendingUp,
  Clock,
  Calendar,
  Layers,
  Shield,
  Briefcase
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', active: 40, tasks: 24 },
  { name: 'Tue', active: 55, tasks: 32 },
  { name: 'Wed', active: 48, tasks: 45 },
  { name: 'Thu', active: 70, tasks: 30 },
  { name: 'Fri', active: 65, tasks: 55 },
  { name: 'Sat', active: 85, tasks: 48 },
  { name: 'Sun', active: 90, tasks: 52 },
];

const StatCard = ({ icon: Icon, label, value, trend, color, onClick }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.02, translateY: -4 }}
    onClick={onClick}
    className={`glass-card cursor-pointer group transition-all duration-300 ${onClick ? 'hover:shadow-lg hover:shadow-green-500/10 hover:border-green-500/30' : ''}`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-500 group-hover:scale-110 transition-transform`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center space-x-1 text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">
        <TrendingUp size={14} />
        <span>{trend}</span>
      </div>
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{label}</h3>
    <div className="flex items-end justify-between mt-1">
      <p className="text-2xl font-bold">{value}</p>
      {onClick && <ArrowUpRight size={18} className="text-slate-600 group-hover:text-green-500 transition-colors" />}
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const handleStatClick = (role: string) => {
    console.log(`Navigating to Staff Management filtered by: ${role}`);
    // In a real app with routing, this would be: router.push(`/admin/staff?role=${role}`)
    // For now, we simulate the interaction
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">সিস্টেম ওভারভিউ</h1>
          <p className="text-slate-400 mt-1">স্বাগতম, অ্যাডমিন। আপনার স্টোরের আজকের অবস্থা দেখুন।</p>
        </div>
        <div className="flex items-center space-x-3 bg-slate-900/50 p-1.5 rounded-xl border border-slate-800">
          <button className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg shadow-lg shadow-green-500/20">লাইভ ভিউ</button>
          <button className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">ইতিহাস</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          label="মোট ইউজার" 
          value="১২৪" 
          trend="+১২%" 
          color="blue" 
          onClick={() => handleStatClick('all')}
        />
        <StatCard 
          icon={Shield} 
          label="মোট অ্যাডমিন" 
          value="০৫" 
          trend="স্থির" 
          color="purple" 
          onClick={() => handleStatClick('admin')}
        />
        <StatCard 
          icon={Briefcase} 
          label="মোট স্টাফ" 
          value="১১৯" 
          trend="+৮%" 
          color="orange" 
          onClick={() => handleStatClick('employee')}
        />
        <StatCard 
          icon={UserCheck} 
          label="সক্রিয় ইউজার" 
          value="৮৬" 
          trend="+৫%" 
          color="green" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Activity className="text-green-500" size={20} />
              ইউজার একটিভিটি মেট্রিক্স
            </h2>
            <select className="bg-slate-800 border-none rounded-lg text-xs font-medium px-3 py-1.5 outline-none ring-1 ring-slate-700 focus:ring-green-500 text-slate-300">
              <option>গত ৭ দিন</option>
              <option>গত ৩০ দিন</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E293B" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '12px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Area type="monotone" dataKey="active" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card flex flex-col">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="text-orange-500" size={20} />
            সাম্প্রতিক একটিভিটি
          </h2>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {[১, ২, ৩, ৪, ৫].map((i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">জন ডো <span className="text-slate-500">টাস্ক আপডেট করেছেন</span> #১২৪</p>
                  <p className="text-xs text-slate-600 mt-1">২ মিনিট আগে</p>
                </div>
                <ArrowUpRight size={14} className="text-slate-600" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-medium text-slate-400 hover:text-white border border-slate-800 hover:bg-white/5 rounded-xl transition-all">
            সব লগ দেখুন
          </button>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Calendar className="text-blue-500" size={20} />
            আসন্ন টাস্কসমূহ
          </h2>
          <div className="space-y-4">
            {[১, ২, ৩].map((i) => (
              <div key={i} className="group p-4 rounded-xl border border-slate-800 hover:border-green-500/50 hover:bg-green-500/5 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 uppercase tracking-wider">Dev</span>
                  <span className="text-xs text-slate-500 italic">২ দিন বাকি</span>
                </div>
                <h3 className="font-semibold text-slate-200">সিস্টেম সিকিউরিটি প্রোটোকল আপডেট</h3>
                <p className="text-sm text-slate-500 mt-1">নতুন RBAC পারমিশন লজিক ব্যাকএন্ডে ইমপ্লিমেন্ট করুন...</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Users className="text-purple-500" size={20} />
            ডিপার্টমেন্ট স্ট্যাটাস
          </h2>
          <div className="space-y-6">
            {['ম্যানেজমেন্ট', 'সেলস', 'প্রোডাকশন', 'ডেলিভারি'].map((dept, i) => (
              <div key={dept} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-300">{dept}</span>
                  <span className="text-slate-500">৮৫% সম্পন্ন</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${70 + (i * 5)}%` }}
                      className={`h-full bg-linear-to-r ${i % 2 === 0 ? 'from-green-500 to-emerald-400' : 'from-blue-500 to-indigo-400'}`}
                    />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

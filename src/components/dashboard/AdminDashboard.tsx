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
    className={`bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm cursor-pointer group transition-all duration-300 ${onClick ? 'hover:shadow-xl hover:shadow-[#7C4B2A]/10 hover:border-[#7C4B2A]/30' : ''}`}
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3.5 rounded-2xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform shadow-sm`}>
        <Icon size={24} />
      </div>
      <div className="flex items-center space-x-1 text-emerald-600 text-[10px] font-black bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
        <TrendingUp size={14} />
        <span>{trend}</span>
      </div>
    </div>
    <h3 className="text-gray-400 text-[11px] font-black uppercase tracking-[0.15em]">{label}</h3>
    <div className="flex items-end justify-between mt-1">
      <p className="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
      {onClick && <ArrowUpRight size={18} className="text-gray-300 group-hover:text-[#7C4B2A] transition-colors" />}
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const handleStatClick = (role: string) => {
    console.log(`Navigating to Staff Management filtered by: ${role}`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#7C4B2A]/5 to-transparent rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
        <div className="relative z-1">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">সিস্টেম ওভারভিউ</h1>
          <p className="text-gray-500 mt-2 font-medium">স্বাগতম, অ্যাডমিন। আপনার স্টোরের আজকের অবস্থা দেখুন।</p>
        </div>
        <div className="flex items-center space-x-3 bg-gray-50 p-1.5 rounded-2xl border border-gray-100 relative z-1">
          <button className="px-6 py-2.5 text-sm font-black bg-[#7C4B2A] text-white rounded-xl shadow-lg shadow-[#7C4B2A]/30 transition-all active:scale-95">লাইভ ভিউ</button>
          <button className="px-6 py-2.5 text-sm font-black text-gray-400 hover:text-gray-900 transition-colors">ইতিহাস</button>
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
          color="amber" 
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
          color="emerald" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm h-[450px] relative overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                <Activity size={20} />
              </div>
              ইউজার একটিভিটি মেট্রিক্স
            </h2>
            <select className="bg-gray-50 border-2 border-gray-100 rounded-xl text-xs font-black px-4 py-2 outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] text-gray-600 transition-all">
              <option>গত ৭ দিন</option>
              <option>গত ৩০ দিন</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C4B2A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#7C4B2A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} fontWeight={700} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} fontWeight={700} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #F1F5F9', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#0F172A', fontWeight: 800 }}
                />
                <Area type="monotone" dataKey="active" stroke="#7C4B2A" strokeWidth={4} fillOpacity={1} fill="url(#colorActive)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm flex flex-col h-[450px]">
          <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-sm">
              <Clock size={20} />
            </div>
            সাম্প্রতিক একটিভিটি
          </h2>
          <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-black text-gray-400 group-hover:bg-[#7C4B2A] group-hover:text-white transition-all duration-300">
                  PI
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">প্রান্ত ইসলাম <span className="text-gray-400 font-medium">টাস্ক আপডেট করেছেন</span> #১২৪</p>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider mt-1">২ মিনিট আগে</p>
                </div>
                <div className="p-2 rounded-lg bg-gray-50 text-gray-300 group-hover:text-[#7C4B2A] group-hover:bg-[#7C4B2A]/5 transition-all">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3.5 text-xs font-black text-gray-400 hover:text-[#7C4B2A] border-2 border-gray-100 hover:border-[#7C4B2A]/20 hover:bg-[#7C4B2A]/5 rounded-2xl transition-all">
            সব লগ দেখুন
          </button>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
              <Calendar size={20} />
            </div>
            আসন্ন টাস্কসমূহ
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group p-5 rounded-3xl border-2 border-gray-50 hover:border-[#7C4B2A]/30 hover:bg-[#7C4B2A]/5 transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-blue-100 text-blue-700 uppercase tracking-widest border border-blue-200/50">Development</span>
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                    <Clock size={12} /> ২ দিন বাকি
                  </span>
                </div>
                <h3 className="font-extrabold text-gray-900 text-base">সিস্টেম সিকিউরিটি প্রোটোকল আপডেট</h3>
                <p className="text-sm text-gray-500 mt-2 font-medium">নতুন RBAC পারমিশন লজিক ব্যাকএন্ডে ইমপ্লিমেন্ট করুন এবং টেস্ট কেস রান করুন।</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h2 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
              <Layers size={20} />
            </div>
            ডিপার্টমেন্ট স্ট্যাটাস
          </h2>
          <div className="space-y-8">
            {['ম্যানেজমেন্ট', 'সেলস', 'প্রোডাকশন', 'ডেলিভারি'].map((dept, i) => (
              <div key={dept} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-black text-gray-900 text-sm uppercase tracking-wide">{dept}</span>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">অপারেশনাল দক্ষতা</p>
                  </div>
                  <span className="text-sm font-black text-[#7C4B2A] bg-[#7C4B2A]/5 px-3 py-1 rounded-lg">{85 + i}%</span>
                </div>
                <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100 p-0.5">
                  <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${85 + i}%` }}
                      className={`h-full rounded-full bg-linear-to-r ${i % 2 === 0 ? 'from-[#7C4B2A] to-[#D4882A]' : 'from-[#4A7C59] to-[#2D8A4E]'}`}
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


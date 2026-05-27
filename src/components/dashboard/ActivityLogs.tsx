import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Download, 
  Filter, 
  Clock, 
  Monitor, 
  Globe,
  Database,
  ArrowRight,
  Plus,
  Trash2,
  Shield,
  Calendar,
  ChevronRight,
  RefreshCw,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const logs = [
  { id: 1, user: 'Pranto Islam', action: 'Created new user', entity: 'User', entityId: 'USR-124', timestamp: '2 mins ago', ip: '192.168.1.1', type: 'create' },
  { id: 2, user: 'Al Amin', action: 'Updated order status', entity: 'Order', entityId: 'ORD-882', timestamp: '15 mins ago', ip: '192.168.1.5', type: 'update' },
  { id: 3, user: 'System', action: 'Database backup successful', entity: 'System', entityId: 'DB-BK', timestamp: '1 hour ago', ip: 'internal', type: 'system' },
  { id: 4, user: 'Tanvir Ahmed', action: 'Deleted task', entity: 'Task', entityId: 'TSK-092', timestamp: '3 hours ago', ip: '192.168.1.12', type: 'delete' },
  { id: 5, user: 'Pranto Islam', action: 'Modified permissions', entity: 'Role', entityId: 'ROLE-EMP', timestamp: '5 hours ago', ip: '192.168.1.1', type: 'security' },
];

const LogIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'create': return <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-600 shadow-sm border border-emerald-200/50"><Plus size={18} /></div>;
    case 'update': return <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600 shadow-sm border border-blue-200/50"><RefreshCw size={18} /></div>;
    case 'delete': return <div className="p-2.5 rounded-xl bg-red-100 text-red-600 shadow-sm border border-red-200/50"><Trash2 size={18} /></div>;
    case 'security': return <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 shadow-sm border border-amber-200/50"><Shield size={18} /></div>;
    case 'system': return <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-600 shadow-sm border border-indigo-200/50"><Database size={18} /></div>;
    default: return <div className="p-2.5 rounded-xl bg-gray-100 text-gray-600 shadow-sm border border-gray-200/50"><History size={18} /></div>;
  }
};

export default function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-[#7C4B2A]/5 to-transparent rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
        <div className="relative z-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#7C4B2A] to-[#5D321A] flex items-center justify-center text-white shadow-xl shadow-[#7C4B2A]/30 transform group-hover:rotate-6 transition-transform">
              <History size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">একটিভিটি অডিট লগ</h1>
              <p className="text-gray-500 text-sm font-medium">সিস্টেমের সকল পরিবর্তন এবং অ্যাক্সেসের রিয়েল-টাইম ট্র্যাকিং।</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 relative z-1">
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 border border-gray-200 shadow-sm transition-all active:scale-95">
            <Download size={18} className="text-[#7C4B2A]" />
            Export CSV
          </button>
          <button className="bg-linear-to-r from-[#7C4B2A] to-[#5D321A] hover:from-[#5D321A] hover:to-[#432412] text-white px-8 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-xl shadow-[#7C4B2A]/25 transition-all active:scale-95">
            <Filter size={18} />
            ফিল্টার করুন
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'সক্রিয় সেশন', value: '১২', icon: Monitor, color: 'emerald', trend: '+২ আজ' },
          { label: 'ভৌগলিক অ্যাক্সেস', value: '৪ দেশ', icon: Globe, color: 'blue', trend: 'স্থির' },
          { label: 'সিকিউরিটি অ্যালার্ট', value: '০', icon: Shield, color: 'amber', trend: 'নিরাপদ' }
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="bg-white p-6 rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3.5 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full bg-${stat.color}-100 text-${stat.color}-700 border border-${stat.color}-200/50`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-1">{stat.label}</p>
            <p className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Logs Table-Card */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-linear-to-br from-gray-50/50 to-white">
          <div className="relative flex-1 max-w-xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C4B2A] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="ইউজার বা অ্যাকশন দিয়ে সার্চ করুন..." 
              className="w-full bg-white border-2 border-gray-100 rounded-2xl py-3.5 pl-14 pr-6 outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all text-sm font-bold placeholder:text-gray-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#7C4B2A]/5 rounded-xl border border-[#7C4B2A]/10">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[11px] font-black text-[#7C4B2A] uppercase tracking-wider">Live Updates</span>
            </div>
            <button className="p-2.5 text-gray-400 hover:text-[#7C4B2A] hover:bg-gray-100 rounded-xl transition-all active:rotate-180">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          <AnimatePresence>
            {logs.map((log, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={log.id} 
                className="p-8 hover:bg-gray-50/80 transition-all group relative overflow-hidden"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#7C4B2A] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                
                <div className="flex items-center justify-between gap-6 relative z-1">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <LogIcon type={log.type} />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center border border-gray-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#7C4B2A]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-base font-black text-gray-900 group-hover:text-[#7C4B2A] transition-colors">{log.user}</span>
                        <ChevronRight size={14} className="text-gray-300" />
                        <span className="text-sm font-bold text-gray-600">{log.action}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-5 mt-2">
                        <div className="flex items-center gap-2 bg-gray-100/50 px-2.5 py-1 rounded-lg border border-gray-200/50">
                          <Database size={12} className="text-gray-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                            {log.entity}: <span className="text-[#7C4B2A]">{log.entityId}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100/50 px-2.5 py-1 rounded-lg border border-gray-200/50">
                          <Monitor size={12} className="text-gray-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{log.ip}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100/50 px-2.5 py-1 rounded-lg border border-gray-200/50">
                          <Clock size={12} className="text-gray-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{log.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 text-gray-500 hover:text-white hover:bg-[#7C4B2A] rounded-xl transition-all shadow-sm font-bold text-xs opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300">
                      <Eye size={14} />
                      বিস্তারিত
                    </button>
                    <div className="p-3 bg-gray-50 text-gray-300 rounded-xl group-hover:text-[#7C4B2A] group-hover:bg-[#7C4B2A]/5 transition-all">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <button className="text-sm font-black text-[#7C4B2A] hover:text-[#5D321A] flex items-center gap-2 transition-all group">
            আরো লগ লোড করুন
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-3">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Showing last 100 activities</span>
          </div>
        </div>
      </div>
    </div>
  );
}


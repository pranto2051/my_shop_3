import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  UserPlus, 
  Trash2, 
  Edit2, 
  Shield, 
  Briefcase,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  X,
  Camera,
  ChevronDown
} from 'lucide-react';

const users = [
  { id: 1, name: 'প্রান্ত ইসলাম', email: 'pranto@myshop.com', mobile: '01700000000', role: 'admin', department: 'Management', status: 'active' },
  { id: 2, name: 'আল আমিন', email: 'alamin@myshop.com', mobile: '01711111111', role: 'employee', department: 'Sales', status: 'active' },
  { id: 3, name: 'তানভীর আহমেদ', email: 'tanvir@myshop.com', mobile: '01722222222', role: 'employee', department: 'Production', status: 'inactive' },
  { id: 4, name: 'রাশেদুল খান', email: 'rashed@myshop.com', mobile: '01733333333', role: 'employee', department: 'Delivery', status: 'active' },
  { id: 5, name: 'সাব্বির হোসেন', email: 'sabbir@myshop.com', mobile: '01744444444', role: 'admin', department: 'Management', status: 'active' },
];

const RoleBadge = ({ role }: { role: string }) => (
  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${
    role === 'admin' 
      ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
      : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
  }`}>
    {role === 'admin' ? <Shield size={12} /> : <Briefcase size={12} />}
    {role === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'}
  </span>
);

const StatusIndicator = ({ status }: { status: string }) => (
  <span className={`flex items-center gap-1.5 text-xs font-medium ${
    status === 'active' ? 'text-green-500' : 'text-slate-500'
  }`}>
    {status === 'active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
    {status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
  </span>
);

export default function StaffManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">অ্যাডমিন ও স্টাফ ব্যবস্থাপনা</h1>
          <p className="text-slate-400 text-sm">আপনার দোকানের সকল অ্যাডমিন ও স্টাফদের তথ্য এবং পারমিশন ম্যানেজ করুন।</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl glass-dark border border-white/10 hover:bg-white/5 transition-all text-sm font-medium flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            ফিল্টার
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <UserPlus size={18} />
            নতুন স্টাফ যোগ করুন
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-dark p-4 rounded-2xl border border-white/5">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="নাম, ইমেইল বা মোবাইল দিয়ে খুঁজুন..." 
            className="w-full bg-slate-800/30 border border-slate-700/50 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-green-500/30 transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          {['all', 'admin', 'employee'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                selectedRole === role 
                  ? 'bg-white/10 text-white border border-white/20' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {role === 'all' ? 'সব' : role === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="glass-dark rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">স্টাফ তথ্য</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">রোল ও ডিপার্টমেন্ট</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">স্ট্যাটাস</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">যোগাযোগ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence>
                {users.map((user) => (
                  <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={user.id} 
                      className="group hover:bg-white/2 transition-colors"
                    >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-400 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        <RoleBadge role={user.role} />
                        <p className="text-xs text-slate-500 font-medium">{user.department}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusIndicator status={user.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Mail size={12} /> {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Phone size={12} /> {user.mobile}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-blue-400 transition-all">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-red-400 transition-all">
                          <Trash2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-slate-500 font-medium">মোট ১২৪ জনের মধ্যে ৫ জন দেখাচ্ছে</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white transition-all disabled:opacity-50" disabled>পূর্ববর্তী</button>
          <button className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-500/30 text-xs font-bold text-green-500">১</button>
          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white transition-all">২</button>
          <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-slate-400 hover:text-white transition-all">পরবর্তী</button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#020617]/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl glass-dark border border-white/10 rounded-[32px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">নতুন স্টাফ যোগ করুন</h2>
                  <p className="text-sm text-slate-500 mt-1">সিস্টেমে নতুন অ্যাডমিন বা স্টাফ সদস্য যুক্ত করুন।</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full text-slate-400 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex items-center gap-6 mb-8">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-slate-800 border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 group-hover:border-green-500 group-hover:text-green-500 transition-all cursor-pointer overflow-hidden">
                      <Camera size={32} />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-green-500 text-white rounded-xl shadow-lg">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-200">প্রোফাইল ফটো</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG অথবা WebP ফর্ম্যাটে আপলোড করুন। সর্বোচ্চ ৫ মেগাবাইট।</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">পূর্ণ নাম</label>
                    <input type="text" placeholder="যেমন: প্রান্ত ইসলাম" className="input-field w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
                    <input type="tel" placeholder="০১৭XXXXXXXX" className="input-field w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">ইমেইল ঠিকানা</label>
                    <input type="email" placeholder="name@myshop.com" className="input-field w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">পাসওয়ার্ড</label>
                    <input type="password" placeholder="••••••••" className="input-field w-full" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">রোল নির্বাচন করুন</label>
                    <div className="relative">
                      <select className="input-field w-full appearance-none cursor-pointer">
                        <option value="employee">স্টাফ (Employee)</option>
                        <option value="admin">অ্যাডমিন (Admin)</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">ডিপার্টমেন্ট</label>
                    <div className="relative">
                      <select className="input-field w-full appearance-none cursor-pointer">
                        <option value="Management">ম্যানেজমেন্ট</option>
                        <option value="Sales">সেলস</option>
                        <option value="Production">প্রোডাকশন</option>
                        <option value="Delivery">ডেলিভারি</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white/5 border-t border-white/5 flex items-center justify-end gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
                >
                  বাতিল করুন
                </button>
                <button className="btn-primary text-sm px-8">
                  সংরক্ষণ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

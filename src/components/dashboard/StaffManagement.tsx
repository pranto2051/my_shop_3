import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  UserPlus, 
  Trash2, 
  Edit2, 
  Shield, 
  Briefcase,
  Mail,
  Phone,
  X,
  ChevronDown,
  Loader2,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useAdmin, addUser, updateUser, deleteUser } from '@/app/context/AdminContext';

const RoleBadge = ({ role }: { role: string }) => (
  <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 w-fit shadow-sm ${
    role === 'admin' 
      ? 'bg-amber-100/90 text-amber-800 border border-amber-200 backdrop-blur-sm' 
      : 'bg-emerald-100/90 text-emerald-800 border border-emerald-200 backdrop-blur-sm'
  }`}>
    {role === 'admin' ? <Shield size={12} className="text-amber-600" /> : <Briefcase size={12} className="text-emerald-600" />}
    {role === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'}
  </span>
);

const StatusIndicator = ({ status }: { status: string }) => (
  <span className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm ${
    status === 'active' 
      ? 'bg-green-100/90 text-green-800 border border-green-200' 
      : 'bg-red-100/90 text-red-800 border border-red-200'
  }`}>
    <span className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'} shadow-[0_0_8px_rgba(34,197,94,0.4)]`} />
    {status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
  </span>
);

export default function StaffManagement() {
  const { state, dispatch, showToast } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    password: '',
    role_id: 'employee',
    department_id: '1',
    status: 'active',
    photo_url: ''
  });

  const filteredUsers = (state.users || []).filter((user: any) => {
    const fullName = `${user.first_name} ${user.last_name || ''}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.mobile.includes(searchTerm);
    const matchesRole = selectedRole === 'all' || user.role_id === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleOpenModal = (user: any = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name || '',
        email: user.email,
        mobile: user.mobile,
        password: '', // Don't show password
        role_id: user.role_id,
        department_id: user.department_id?.toString() || '1',
        status: user.status,
        photo_url: user.photo_url || ''
      });
    } else {
      setEditingUser(null);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        password: '',
        role_id: 'employee',
        department_id: '1',
        status: 'active',
        photo_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (userId: string) => {
    if (!window.confirm('আপনি কি নিশ্চিত যে আপনি এই স্টাফ সদস্যকে মুছে ফেলতে চান?')) return;
    
    setIsDeleting(userId);
    const result = await deleteUser(dispatch, userId);
    setIsDeleting(null);

    if (result.success) {
      showToast('স্টাফ সদস্য সফলভাবে মুছে ফেলা হয়েছে', 'success');
    } else {
      showToast('মুছে ফেলতে সমস্যা হয়েছে: ' + (result.error?.message || 'Unknown error'), 'error');
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    let result: { success: boolean; data?: any; error?: any };
    if (editingUser) {
      result = await updateUser(dispatch, { ...formData, id: editingUser.id });
    } else {
      result = await addUser(dispatch, formData);
    }

    setIsSaving(false);
    if (result.success) {
      showToast(editingUser ? 'তথ্য আপডেট করা হয়েছে' : 'নতুন স্টাফ যোগ করা হয়েছে', 'success');
      setIsModalOpen(false);
    } else {
      showToast('সংরক্ষণ করতে সমস্যা হয়েছে: ' + (result.error?.message || 'Unknown error'), 'error');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-[#FDF8F5] p-10 rounded-[40px] border border-[#E8D5C4] shadow-xl relative overflow-hidden group ring-1 ring-[#7C4B2A]/5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-[#7C4B2A]/10 to-transparent rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-1000 opacity-60" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-[#7C4B2A]/5 to-transparent rounded-full -ml-32 -mb-32 transition-transform group-hover:scale-125 duration-1000 opacity-40" />
        
        <div className="relative z-1">
          <div className="flex items-center gap-6 mb-2">
            <div className="w-16 h-16 rounded-[24px] bg-linear-to-br from-[#7C4B2A] to-[#5D321A] flex items-center justify-center text-white shadow-2xl shadow-[#7C4B2A]/40 transform group-hover:rotate-6 transition-transform">
              <UserPlus size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-[#432412] tracking-tight mb-1">অ্যাডমিন ও স্টাফ ব্যবস্থাপনা</h1>
              <p className="text-[#A0826C] text-sm font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7C4B2A]" />
                আপনার দোকানের সকল অ্যাডমিন ও স্টাফদের তথ্য এবং পারমিশন ম্যানেজ করুন।
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 relative z-1">
          <button 
            onClick={() => handleOpenModal()}
            className="bg-linear-to-r from-[#7C4B2A] to-[#5D321A] hover:from-[#5D321A] hover:to-[#432412] text-white px-10 py-4.5 rounded-[22px] font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-[#7C4B2A]/30 transition-all active:scale-95 group flex-1 sm:flex-none"
          >
            <Plus size={22} className="group-hover:rotate-90 transition-transform duration-500" />
            নতুন স্টাফ যোগ করুন
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-6 items-center bg-[#FDF8F5]/90 backdrop-blur-xl p-6 rounded-[32px] border border-[#E8D5C4] shadow-xl sticky top-4 z-10 ring-1 ring-[#7C4B2A]/5">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#A0826C] group-focus-within:text-[#7C4B2A] transition-colors" size={22} />
          <input 
            type="text" 
            placeholder="নাম, ইমেইল বা মোবাইল দিয়ে খুঁজুন..." 
            className="w-full bg-white border border-[#E8D5C4] rounded-2xl py-4 pl-16 pr-8 outline-none focus:ring-4 focus:ring-[#7C4B2A]/15 focus:border-[#7C4B2A] transition-all text-sm font-semibold text-[#5D321A] placeholder:text-[#A0826C] shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 bg-[#F9F3EF] p-2 rounded-2xl border border-[#E8D5C4]/60 w-full md:w-auto shadow-inner">
          {['all', 'admin', 'employee'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all duration-300 ${
                selectedRole === role 
                  ? 'bg-white text-[#7C4B2A] shadow-md shadow-[#7C4B2A]/10 scale-100 ring-1 ring-[#7C4B2A]/10' 
                  : 'text-[#A0826C] hover:text-[#7C4B2A] hover:bg-white/50 scale-95'
              }`}
            >
              {role === 'all' ? 'সব' : role === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
        <AnimatePresence mode="popLayout">
          {filteredUsers.length > 0 ? filteredUsers.map((user: any) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={user.id}
              className="group bg-[#FDF8F5] rounded-[40px] border border-[#E8D5C4] p-8 hover:shadow-2xl hover:shadow-[#7C4B2A]/20 transition-all duration-500 relative overflow-hidden ring-1 ring-[#7C4B2A]/5 flex flex-col"
            >
              {/* Card Background Decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-linear-to-br from-[#7C4B2A]/10 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000 opacity-50" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-[#7C4B2A]/5 to-transparent rounded-full -ml-16 -mb-16 group-hover:scale-125 transition-transform duration-1000 opacity-30" />
              
              <div className="relative z-1 flex flex-col h-full">
                {/* User Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-5 min-w-0">
                    <div className="relative shrink-0">
                      <div className={`w-20 h-20 rounded-[28px] p-1.5 shadow-xl ${user.role_id === 'admin' ? 'bg-linear-to-br from-[#7C4B2A] to-[#5D321A]' : 'bg-linear-to-br from-[#A0826C] to-[#7C4B2A]'}`}>
                        <div className="w-full h-full rounded-[22px] bg-white overflow-hidden ring-2 ring-white/50">
                          <img 
                            src={user.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name}`} 
                            alt="" 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          />
                        </div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 transform scale-110">
                        <StatusIndicator status={user.status} />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-black text-[#432412] group-hover:text-[#7C4B2A] transition-colors leading-tight mb-2 truncate">
                        {user.first_name} {user.last_name}
                      </h3>
                      <div className="flex flex-col gap-2">
                        <RoleBadge role={user.role_id} />
                        <span className="text-[10px] font-black text-[#A0826C] uppercase tracking-[0.2em] ml-1 truncate">
                          {state.departments?.find((d: any) => d.id === user.department_id)?.name || 'General'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2.5 ml-4 shrink-0">
                    <button 
                      onClick={() => handleOpenModal(user)}
                      className="p-3 bg-white text-[#A0826C] border border-[#E8D5C4]/50 hover:text-[#7C4B2A] hover:border-[#7C4B2A] hover:bg-[#FDF8F5] rounded-2xl transition-all shadow-sm active:scale-90"
                      title="এডিট করুন"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(user.id)}
                      disabled={isDeleting === user.id}
                      className="p-3 bg-white text-[#A0826C] border border-[#E8D5C4]/50 hover:text-red-600 hover:border-red-200 hover:bg-red-50 rounded-2xl transition-all shadow-sm active:scale-90 disabled:opacity-50"
                      title="মুছে ফেলুন"
                    >
                      {isDeleting === user.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-auto space-y-4 bg-white/60 backdrop-blur-sm rounded-[28px] p-6 border border-[#E8D5C4]/50 group-hover:bg-white group-hover:border-[#7C4B2A]/20 transition-all duration-500 shadow-sm">
                  <div className="flex items-center gap-4 group/item overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center text-[#7C4B2A] shadow-xs group-hover/item:scale-110 transition-transform shrink-0">
                      <Mail size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#A0826C] font-black uppercase tracking-[0.15em] mb-1">Email Address</p>
                      <p className="text-sm font-bold text-[#5D321A] truncate" title={user.email}>{user.email}</p>
                    </div>
                  </div>
                  <div className="w-full h-px bg-linear-to-r from-transparent via-[#E8D5C4]/50 to-transparent" />
                  <div className="flex items-center gap-4 group/item overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center text-[#7C4B2A] shadow-xs group-hover/item:scale-110 transition-transform shrink-0">
                      <Phone size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[#A0826C] font-black uppercase tracking-[0.15em] mb-1">Mobile Number</p>
                      <p className="text-sm font-bold text-[#5D321A] truncate">{user.mobile}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 flex items-center justify-between px-2 shrink-0">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-[#F9F3EF] flex items-center justify-center shrink-0">
                      <Clock size={12} className="text-[#A0826C]" />
                    </div>
                    <span className="text-[10px] text-[#A0826C] font-black uppercase tracking-[0.15em] truncate">Added: 24 May 2026</span>
                  </div>
                  <button className="w-10 h-10 rounded-2xl bg-white border border-[#E8D5C4] flex items-center justify-center text-[#A0826C] hover:text-[#7C4B2A] hover:border-[#7C4B2A] hover:bg-[#FDF8F5] transition-all shadow-xs group/btn shrink-0">
                    <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full py-32 text-center bg-[#FDF8F5] rounded-[48px] border-2 border-dashed border-[#E8D5C4] shadow-inner">
              <div className="w-24 h-24 bg-white border border-[#E8D5C4] rounded-full flex items-center justify-center mx-auto mb-6 text-[#A0826C] shadow-sm">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-black text-[#432412]">কোনো তথ্য পাওয়া যায়নি</h3>
              <p className="text-[#A0826C] mt-2 font-bold uppercase tracking-widest text-xs">আপনার সার্চ টার্ম পরিবর্তন করে আবার চেষ্টা করুন।</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-8 bg-[#FDF8F5] rounded-[40px] border border-[#E8D5C4] shadow-xl ring-1 ring-[#7C4B2A]/5">
        <p className="text-sm text-[#A0826C] font-black uppercase tracking-widest">
          মোট <span className="text-[#7C4B2A] text-lg mx-1">{filteredUsers.length}</span> জনের মধ্যে {filteredUsers.length} জন দেখাচ্ছে
        </p>
        <div className="flex items-center gap-3 bg-[#F9F3EF] p-2 rounded-2xl border border-[#E8D5C4]/60 shadow-inner">
          <button className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#A0826C] hover:text-[#7C4B2A] hover:bg-white transition-all disabled:opacity-30" disabled>পূর্ববর্তী</button>
          <button className="w-12 h-12 rounded-xl bg-linear-to-br from-[#7C4B2A] to-[#5D321A] text-white text-sm font-black shadow-xl shadow-[#7C4B2A]/30 scale-110 ring-2 ring-white/20">১</button>
          <button className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-[#A0826C] hover:text-[#7C4B2A] hover:bg-white transition-all" disabled>পরবর্তী</button>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSaving && setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-[#FDF8F5] border border-[#E8D5C4] rounded-[48px] shadow-2xl overflow-hidden ring-1 ring-[#7C4B2A]/5"
            >
              <form onSubmit={handleSave}>
                <div className="p-10 border-b border-[#E8D5C4] flex items-center justify-between bg-linear-to-br from-[#F9F3EF] to-[#FDF8F5]">
                  <div>
                    <h2 className="text-3xl font-black text-[#432412] tracking-tight">
                      {editingUser ? 'স্টাফ তথ্য আপডেট' : 'নতুন স্টাফ যোগ'}
                    </h2>
                    <p className="text-sm text-[#A0826C] font-bold mt-2 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#7C4B2A] animate-pulse" />
                      সিস্টেমে নতুন সদস্য যুক্ত করতে নিচের ফর্মটি পূরণ করুন।
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-4 bg-white border border-[#E8D5C4] hover:bg-red-50 hover:text-red-500 hover:border-red-100 rounded-[24px] text-[#A0826C] shadow-sm transition-all active:scale-90 group"
                  >
                    <X size={24} className="group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar bg-white/40">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#A0826C] uppercase tracking-[0.2em] ml-2">নাম (প্রথম অংশ)</label>
                      <input 
                        type="text" 
                        required
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                        placeholder="যেমন: প্রান্ত" 
                        className="w-full bg-white border-2 border-[#E8D5C4]/60 rounded-3xl px-6 py-4.5 text-sm font-bold text-[#5D321A] outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all placeholder:text-[#E8D5C4]" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#A0826C] uppercase tracking-[0.2em] ml-2">নাম (শেষ অংশ)</label>
                      <input 
                        type="text" 
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                        placeholder="যেমন: ইসলাম" 
                        className="w-full bg-white border-2 border-[#E8D5C4]/60 rounded-3xl px-6 py-4.5 text-sm font-bold text-[#5D321A] outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all placeholder:text-[#E8D5C4]" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#A0826C] uppercase tracking-[0.2em] ml-2">মোবাইল নম্বর</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        placeholder="০১৭XXXXXXXX" 
                        className="w-full bg-white border-2 border-[#E8D5C4]/60 rounded-3xl px-6 py-4.5 text-sm font-bold text-[#5D321A] outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all placeholder:text-[#E8D5C4]" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#A0826C] uppercase tracking-[0.2em] ml-2">ইমেইল ঠিকানা</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="name@myshop.com" 
                        className="w-full bg-white border-2 border-[#E8D5C4]/60 rounded-3xl px-6 py-4.5 text-sm font-bold text-[#5D321A] outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all placeholder:text-[#E8D5C4]" 
                      />
                    </div>
                    {!editingUser && (
                      <div className="space-y-3">
                        <label className="text-[11px] font-black text-[#A0826C] uppercase tracking-[0.2em] ml-2">পাসওয়ার্ড</label>
                        <input 
                          type="password" 
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          placeholder="••••••••" 
                          className="w-full bg-white border-2 border-[#E8D5C4]/60 rounded-3xl px-6 py-4.5 text-sm font-bold text-[#5D321A] outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all placeholder:text-[#E8D5C4]" 
                        />
                      </div>
                    )}
                    <div className="space-y-3 md:col-span-2">
                      <label className="text-[11px] font-black text-[#A0826C] uppercase tracking-[0.2em] ml-2">প্রোফাইল ছবির লিঙ্ক</label>
                      <input 
                        type="url" 
                        value={formData.photo_url}
                        onChange={(e) => setFormData({...formData, photo_url: e.target.value})}
                        placeholder="https://example.com/photo.jpg" 
                        className="w-full bg-white border-2 border-[#E8D5C4]/60 rounded-3xl px-6 py-4.5 text-sm font-bold text-[#5D321A] outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all placeholder:text-[#E8D5C4]" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#A0826C] uppercase tracking-[0.2em] ml-2">রোল নির্বাচন</label>
                      <div className="relative group">
                        <select 
                          value={formData.role_id}
                          onChange={(e) => setFormData({...formData, role_id: e.target.value})}
                          className="w-full bg-white border-2 border-[#E8D5C4]/60 rounded-3xl px-6 py-4.5 text-sm font-black text-[#5D321A] outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all appearance-none cursor-pointer"
                        >
                          <option value="employee">স্টাফ (Employee)</option>
                          <option value="admin">অ্যাডমিন (Admin)</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A0826C] group-focus-within:rotate-180 transition-transform pointer-events-none" size={20} />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[11px] font-black text-[#A0826C] uppercase tracking-[0.2em] ml-2">ডিপার্টমেন্ট</label>
                      <div className="relative group">
                        <select 
                          value={formData.department_id}
                          onChange={(e) => setFormData({...formData, department_id: e.target.value})}
                          className="w-full bg-white border-2 border-[#E8D5C4]/60 rounded-3xl px-6 py-4.5 text-sm font-black text-[#5D321A] outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all appearance-none cursor-pointer"
                        >
                          {state.departments?.map((dept: any) => (
                            <option key={dept.id} value={dept.id.toString()}>{dept.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-[#A0826C] group-focus-within:rotate-180 transition-transform pointer-events-none" size={20} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-[#F9F3EF] border-t border-[#E8D5C4] flex items-center justify-end gap-5">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-10 py-4.5 rounded-3xl border-2 border-[#E8D5C4] bg-white text-[#A0826C] hover:bg-[#FDF8F5] hover:text-[#7C4B2A] transition-all font-black text-sm active:scale-95 shadow-sm"
                  >
                    বাতিল করুন
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="bg-linear-to-r from-[#7C4B2A] to-[#5D321A] hover:from-[#5D321A] hover:to-[#432412] text-white px-12 py-4.5 rounded-3xl font-black text-sm shadow-2xl shadow-[#7C4B2A]/40 transition-all active:scale-95 flex items-center gap-3 ring-2 ring-white/10"
                  >
                    {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                    সংরক্ষণ করুন
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  Loader2,
  Clock,
  ChevronDown,
  X,
  Phone,
  Mail,
  Briefcase,
  Shield,
  Edit2,
  Trash2,
  UserPlus,
  Plus,
  Search
} from 'lucide-react';

import { useAdmin, addUser, updateUser, deleteUser } from '@/app/context/AdminContext';

const RoleBadge = ({ role }: { role: string }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.12em] border ${
    role === 'admin' 
      ? 'bg-amber-50 text-amber-700 border-amber-200' 
      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }`}>
    {role === 'admin' 
      ? <Shield size={10} strokeWidth={2.5} /> 
      : <Briefcase size={10} strokeWidth={2.5} />}
    {role === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'}
  </span>
);

const StatusPill = ({ status }: { status: string }) => (
  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.15em] ${
    status === 'active' 
      ? 'bg-green-100 text-green-700' 
      : 'bg-red-100 text-red-700'
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
    {status === 'active' ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
  </div>
);

export default function StaffManagement() {
  const { state, dispatch, showToast } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

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
        password: '',
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
    <div className="space-y-6 animate-in fade-in duration-700 px-[18px]">

      {/* ── PAGE HEADER ── */}
      <div className="relative overflow-hidden rounded-[40px] bg-linear-to-br from-[#3D1F0D] via-[#5D321A] to-[#7C4B2A] shadow-2xl p-8 md:p-12 lg:p-14">
        {/* Decorative elements for depth */}
        <div className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full border border-white/10 " />
        <div className="pointer-events-none absolute -right-12 -top-12 w-64 h-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute right-20 bottom-10 w-48 h-48 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />

        <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-10">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
            <div className="w-20 h-20 rounded-[28px] bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <UserPlus size={36} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
                অ্যাডমিন ও স্টাফ <br className="hidden md:block lg:hidden" /> ব্যবস্থাপনা
              </h1>
              <p className="text-white/70 text-sm md:text-base font-medium mt-3 max-w-xl leading-relaxed">
                আপনার প্রতিষ্ঠানের সকল কর্মকর্তা ও কর্মচারীদের তথ্য, পদবী এবং পারমিশন এখান থেকে সুচারুভাবে নিয়ন্ত্রণ করুন।
              </p>
            </div>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="group flex items-center gap-3 bg-white text-[#5D321A] px-8 py-4.5 rounded-[22px] font-black text-base shadow-2xl hover:bg-[#FDF8F5] hover:scale-[1.02] transition-all active:scale-95"
          >
            <Plus size={22} className="group-hover:rotate-90 transition-transform duration-500" />
            নতুন স্টাফ যোগ করুন
          </button>
        </div>

        {/* Stats Grid */}
        <div className="relative z-10 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: 'মোট সদস্য', value: (state.users || []).length, icon: <Shield size={16} /> },
            { label: 'অ্যাডমিন', value: (state.users || []).filter((u: any) => u.role_id === 'admin').length, icon: <Shield size={16} /> },
            { label: 'স্টাফ', value: (state.users || []).filter((u: any) => u.role_id === 'employee').length, icon: <Briefcase size={16} /> },
          ].map((stat, idx) => (
            <div key={stat.label} className="group relative rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <p className="text-3xl md:text-4xl font-black text-white tracking-tighter">{stat.value}</p>
                <div className="text-white/30 group-hover:text-white/60 transition-colors">
                  {stat.icon}
                </div>
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CONTROL BAR ── */}
      <div className="flex flex-col xl:flex-row gap-6 items-stretch xl:items-center bg-white/50 backdrop-blur-sm p-4 rounded-[32px] border border-[#E8D5C4]/50 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl shadow-sm border border-[#E8D5C4] flex items-center justify-center text-[#A0826C] group-focus-within:text-[#7C4B2A] group-focus-within:border-[#7C4B2A] transition-all">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="নাম, ইমেইল বা মোবাইল নম্বর দিয়ে খুঁজুন..."
            className="w-full h-14 bg-white border border-[#E8D5C4] rounded-[22px] pl-18 pr-6 outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] text-base font-bold text-[#5D321A] placeholder:text-[#C4A898]/60 shadow-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Role Filter */}
        <div className="flex items-center gap-2 bg-white border border-[#E8D5C4] p-2 rounded-[22px] shadow-sm">
          {[
            { key: 'all', label: 'সবাই' },
            { key: 'admin', label: 'অ্যাডমিন' },
            { key: 'employee', label: 'স্টাফ' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSelectedRole(key)}
              className={`px-8 py-3 rounded-xl text-xs font-black uppercase tracking-[0.15em] transition-all duration-300 ${
                selectedRole === key
                  ? 'bg-linear-to-br from-[#7C4B2A] to-[#5D321A] text-white shadow-lg shadow-[#7C4B2A]/20'
                  : 'text-[#A0826C] hover:text-[#7C4B2A] hover:bg-[#7C4B2A]/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── STAFF CARDS GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
        <AnimatePresence mode="popLayout">
          {filteredUsers.length > 0 ? filteredUsers.map((user: any, i: number) => (
            <motion.div
              layout
              key={user.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative bg-white border border-[#EDE0D6] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#7C4B2A]/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Top accent strip based on role */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${
                user.role_id === 'admin'
                  ? 'bg-linear-to-r from-amber-400 via-[#7C4B2A] to-amber-500'
                  : 'bg-linear-to-r from-emerald-400 via-teal-500 to-emerald-400'
              }`} />

              {/* Card Body */}
              <div className="p-6">
                {/* Top row: avatar + name + actions */}
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className={`w-16 h-16 rounded-2xl overflow-hidden ring-2 ${
                      user.role_id === 'admin' ? 'ring-amber-200' : 'ring-emerald-200'
                    } shadow-md`}>
                      <img
                        src={user.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name}`}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Online dot */}
                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      user.status === 'active' ? 'bg-green-500' : 'bg-red-400'
                    }`} />
                  </div>

                  {/* Name & role */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-black text-[#2D1505] truncate leading-tight">
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className="text-[10px] font-bold text-[#A0826C] uppercase tracking-widest mt-0.5 truncate">
                      {state.departments?.find((d: any) => d.id === user.department_id)?.name || 'General'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <RoleBadge role={user.role_id} />
                      <StatusPill status={user.status} />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="w-8 h-8 rounded-xl bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center text-[#A0826C] hover:text-[#7C4B2A] hover:border-[#7C4B2A] hover:bg-[#7C4B2A]/10 transition-all active:scale-90"
                      title="এডিট করুন"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      disabled={isDeleting === user.id}
                      className="w-8 h-8 rounded-xl bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center text-[#A0826C] hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all active:scale-90 disabled:opacity-40"
                      title="মুছে ফেলুন"
                    >
                      {isDeleting === user.id
                        ? <Loader2 size={14} className="animate-spin" />
                        : <Trash2 size={14} />}
                    </button>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-linear-to-r from-transparent via-[#E8D5C4] to-transparent" />

                {/* Contact Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 group/c">
                    <div className="w-7 h-7 rounded-lg bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center shrink-0">
                      <Mail size={13} className="text-[#7C4B2A]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-[#B8967E] uppercase tracking-widest">ইমেইল</p>
                      <p className="text-xs font-bold text-[#5D321A] truncate" title={user.email}>{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 group/c">
                    <div className="w-7 h-7 rounded-lg bg-[#FDF8F5] border border-[#E8D5C4] flex items-center justify-center shrink-0">
                      <Phone size={13} className="text-[#7C4B2A]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black text-[#B8967E] uppercase tracking-widest">মোবাইল</p>
                      <p className="text-xs font-bold text-[#5D321A] truncate">{user.mobile}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between px-6 py-3.5 bg-[#FDFAF8] border-t border-[#EDE0D6]">
                <div className="flex items-center gap-2">
                  <Clock size={11} className="text-[#B8967E]" />
                  <span className="text-[10px] font-bold text-[#B8967E] uppercase tracking-wider">যোগ দেওয়া: ২৪ মে ২০২৬</span>
                </div>
                <button className="w-7 h-7 rounded-xl bg-white border border-[#E8D5C4] flex items-center justify-center text-[#B8967E] hover:text-[#7C4B2A] hover:border-[#7C4B2A] hover:bg-[#7C4B2A]/5 transition-all group/arr">
                  <ArrowRight size={13} className="group-hover/arr:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </motion.div>
          )) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-28 flex flex-col items-center gap-4 bg-[#FDF8F5] rounded-3xl border-2 border-dashed border-[#E8D5C4]"
            >
              <div className="w-16 h-16 rounded-2xl bg-white border border-[#E8D5C4] flex items-center justify-center text-[#C4A898] shadow-sm">
                <Search size={28} />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-black text-[#432412]">কোনো তথ্য পাওয়া যায়নি</h3>
                <p className="text-[#A0826C] text-xs font-bold uppercase tracking-widest mt-1">আপনার সার্চ টার্ম পরিবর্তন করুন</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── PAGINATION ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FDF8F5] border border-[#E8D5C4] rounded-3xl px-7 py-5">
        <p className="text-sm text-[#A0826C] font-bold">
          মোট <span className="text-[#7C4B2A] font-black">{filteredUsers.length}</span> জনের মধ্যে {filteredUsers.length} জন দেখাচ্ছে
        </p>
        <div className="flex items-center gap-2 bg-white border border-[#E8D5C4] p-1.5 rounded-2xl">
          <button className="px-4 py-2 rounded-xl text-xs font-black text-[#C4A898] uppercase tracking-wider disabled:opacity-40" disabled>পূর্ববর্তী</button>
          <button className="w-9 h-9 rounded-xl bg-[#7C4B2A] text-white text-sm font-black shadow-md">১</button>
          <button className="px-4 py-2 rounded-xl text-xs font-black text-[#C4A898] uppercase tracking-wider disabled:opacity-40" disabled>পরবর্তী</button>
        </div>
      </div>

      {/* ── ADD / EDIT MODAL ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isSaving && setIsModalOpen(false)}
              className="absolute inset-0 bg-[#1A0A00]/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              className="relative w-full max-w-2xl bg-white rounded-[36px] shadow-2xl overflow-hidden border border-[#E8D5C4]"
            >
              <form onSubmit={handleSave}>
                {/* Modal Header */}
                <div className="relative overflow-hidden bg-linear-to-br from-[#3D1F0D] to-[#7C4B2A] px-8 py-7">
                  <div className="pointer-events-none absolute -right-10 -top-10 w-40 h-40 rounded-full border border-white/10" />
                  <div className="pointer-events-none absolute right-12 bottom-4 w-20 h-20 rounded-full border border-white/10" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-black text-white tracking-tight">
                        {editingUser ? 'স্টাফ তথ্য আপডেট করুন' : 'নতুন স্টাফ যোগ করুন'}
                      </h2>
                      <p className="text-white/50 text-xs font-semibold mt-1">
                        সিস্টেমে নতুন সদস্য যুক্ত করতে ফর্মটি পূরণ করুন
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="w-9 h-9 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-8 max-h-[62vh] overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* First Name */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-[#A0826C] uppercase tracking-[0.15em]">নাম (প্রথম অংশ)</label>
                      <input
                        type="text"
                        required
                        value={formData.first_name}
                        onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                        placeholder="যেমন: প্রান্ত"
                        className="w-full h-12 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-5 text-sm font-bold text-[#5D321A] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all placeholder:text-[#D4B8A8]"
                      />
                    </div>

                    {/* Last Name */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-[#A0826C] uppercase tracking-[0.15em]">নাম (শেষ অংশ)</label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                        placeholder="যেমন: ইসলাম"
                        className="w-full h-12 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-5 text-sm font-bold text-[#5D321A] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all placeholder:text-[#D4B8A8]"
                      />
                    </div>

                    {/* Mobile */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-[#A0826C] uppercase tracking-[0.15em]">মোবাইল নম্বর</label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0826C]" />
                        <input
                          type="tel"
                          required
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                          placeholder="০১৭XXXXXXXX"
                          className="w-full h-12 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl pl-10 pr-5 text-sm font-bold text-[#5D321A] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all placeholder:text-[#D4B8A8]"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-[#A0826C] uppercase tracking-[0.15em]">ইমেইল ঠিকানা</label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A0826C]" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@myshop.com"
                          className="w-full h-12 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl pl-10 pr-5 text-sm font-bold text-[#5D321A] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all placeholder:text-[#D4B8A8]"
                        />
                      </div>
                    </div>

                    {/* Password (add only) */}
                    {!editingUser && (
                      <div className="space-y-2">
                        <label className="block text-[10px] font-black text-[#A0826C] uppercase tracking-[0.15em]">পাসওয়ার্ড</label>
                        <input
                          type="password"
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full h-12 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-5 text-sm font-bold text-[#5D321A] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all placeholder:text-[#D4B8A8]"
                        />
                      </div>
                    )}

                    {/* Photo URL */}
                    <div className={`space-y-2 ${!editingUser ? '' : 'md:col-span-2'}`}>
                      <label className="block text-[10px] font-black text-[#A0826C] uppercase tracking-[0.15em]">প্রোফাইল ছবির লিঙ্ক</label>
                      <input
                        type="url"
                        value={formData.photo_url}
                        onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full h-12 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-5 text-sm font-bold text-[#5D321A] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all placeholder:text-[#D4B8A8]"
                      />
                    </div>

                    {/* Role */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-[#A0826C] uppercase tracking-[0.15em]">রোল নির্বাচন</label>
                      <div className="relative">
                        <select
                          value={formData.role_id}
                          onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                          className="w-full h-12 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-5 text-sm font-bold text-[#5D321A] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all appearance-none cursor-pointer"
                        >
                          <option value="employee">স্টাফ (Employee)</option>
                          <option value="admin">অ্যাডমিন (Admin)</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0826C] pointer-events-none" />
                      </div>
                    </div>

                    {/* Department */}
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-[#A0826C] uppercase tracking-[0.15em]">ডিপার্টমেন্ট</label>
                      <div className="relative">
                        <select
                          value={formData.department_id}
                          onChange={(e) => setFormData({ ...formData, department_id: e.target.value })}
                          className="w-full h-12 bg-[#FDF8F5] border border-[#E8D5C4] rounded-2xl px-5 text-sm font-bold text-[#5D321A] outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all appearance-none cursor-pointer"
                        >
                          {state.departments?.map((dept: any) => (
                            <option key={dept.id} value={dept.id.toString()}>{dept.name}</option>
                          ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#A0826C] pointer-events-none" />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 px-8 py-5 bg-[#FDF8F5] border-t border-[#E8D5C4]">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-7 py-3 rounded-2xl border border-[#E8D5C4] bg-white text-sm font-black text-[#A0826C] hover:text-[#7C4B2A] hover:border-[#7C4B2A] hover:bg-[#7C4B2A]/5 transition-all active:scale-95"
                  >
                    বাতিল করুন
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-linear-to-r from-[#7C4B2A] to-[#5D321A] text-white px-8 py-3 rounded-2xl text-sm font-black shadow-lg shadow-[#7C4B2A]/30 hover:shadow-xl transition-all active:scale-95 disabled:opacity-60"
                  >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
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
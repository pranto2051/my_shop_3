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
  Loader2
} from 'lucide-react';
import { useAdmin, addUser, updateUser, deleteUser } from '@/app/context/AdminContext';

const RoleBadge = ({ role }: { role: string }) => (
  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit ${
    role === 'admin' 
      ? 'bg-amber-100 text-amber-700 border border-amber-200' 
      : 'bg-blue-100 text-blue-700 border border-blue-200'
  }`}>
    {role === 'admin' ? <Shield size={12} /> : <Briefcase size={12} />}
    {role === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'}
  </span>
);

const StatusIndicator = ({ status }: { status: string }) => (
  <span className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-lg ${
    status === 'active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
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
    status: 'active'
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
        status: user.status
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
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (userId: string) => {
    console.log('Attempting to delete user with ID:', userId);
    if (!window.confirm('আপনি কি নিশ্চিত যে আপনি এই স্টাফ সদস্যকে মুছে ফেলতে চান?')) return;
    
    setIsDeleting(userId);
    const result = await deleteUser(dispatch, userId);
    setIsDeleting(null);

    if (result.success) {
      console.log('User deleted successfully');
      showToast('স্টাফ সদস্য সফলভাবে মুছে ফেলা হয়েছে', 'success');
    } else {
      console.error('Failed to delete user:', result.error);
      showToast('মুছে ফেলতে সমস্যা হয়েছে: ' + (result.error?.message || 'Unknown error'), 'error');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving user data:', formData, editingUser ? 'Editing ID: ' + editingUser.id : 'New User');
    setIsSaving(true);

    let result;
    if (editingUser) {
      result = await updateUser(dispatch, { ...formData, id: editingUser.id });
    } else {
      result = await addUser(dispatch, formData);
    }

    setIsSaving(false);
    if (result.success) {
      console.log('User saved successfully');
      showToast(editingUser ? 'তথ্য আপডেট করা হয়েছে' : 'নতুন স্টাফ যোগ করা হয়েছে', 'success');
      setIsModalOpen(false);
    } else {
      console.error('Failed to save user:', result.error);
      showToast('সংরক্ষণ করতে সমস্যা হয়েছে: ' + (result.error?.message || 'Unknown error'), 'error');
    }
  };

  return (
    <div className="space-y-6 bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-[#7C4B2A] flex items-center justify-center text-white shadow-lg shadow-[#7C4B2A]/20">
              <UserPlus size={22} />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">অ্যাডমিন ও স্টাফ ব্যবস্থাপনা</h1>
          </div>
          <p className="text-gray-500 text-sm font-medium ml-13">আপনার দোকানের সকল অ্যাডমিন ও স্টাফদের তথ্য এবং পারমিশন ম্যানেজ করুন।</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleOpenModal()}
            className="bg-[#7C4B2A] hover:bg-[#5D321A] text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#7C4B2A]/20 transition-all active:scale-95"
          >
            <Plus size={18} />
            নতুন স্টাফ যোগ করুন
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative md:col-span-2">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="নাম, ইমেইল বা মোবাইল দিয়ে খুঁজুন..." 
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#7C4B2A]/20 focus:border-[#7C4B2A] transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-end gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100">
          {['all', 'admin', 'employee'].map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-6 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                selectedRole === role 
                  ? 'bg-white text-[#7C4B2A] shadow-md' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {role === 'all' ? 'সব' : role === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'}
            </button>
          ))}
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">স্টাফ তথ্য</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">রোল ও ডিপার্টমেন্ট</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-center">স্ট্যাটাস</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">যোগাযোগ</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {filteredUsers.length > 0 ? filteredUsers.map((user: any) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={user.id} 
                    className="group hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl p-0.5 ${user.role_id === 'admin' ? 'bg-amber-400' : 'bg-blue-400'}`}>
                          <div className="w-full h-full rounded-[14px] bg-white overflow-hidden flex items-center justify-center">
                            <img src={user.photo_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name}`} alt="" className="w-full h-full" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800 group-hover:text-[#7C4B2A] transition-colors">{user.first_name} {user.last_name}</p>
                          <p className="text-[11px] text-gray-500 font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        <RoleBadge role={user.role_id} />
                        <p className="text-[11px] text-gray-500 font-bold ml-1">
                          {state.departments?.find((d: any) => d.id === user.department_id)?.name || 'N/A'}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-block">
                        <StatusIndicator status={user.status} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[11px] text-gray-600 font-bold">
                          <Mail size={12} className="text-gray-400" /> {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-600 font-bold">
                          <Phone size={12} className="text-gray-400" /> {user.mobile}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button 
                          onClick={() => handleOpenModal(user)}
                          className="p-2 hover:bg-blue-50 rounded-xl text-gray-400 hover:text-blue-600 transition-all"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          disabled={isDeleting === user.id}
                          className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-all disabled:opacity-50"
                        >
                          {isDeleting === user.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center text-gray-400 font-bold">
                      কোনো স্টাফ তথ্য পাওয়া যায়নি
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-2">
        <p className="text-xs text-gray-500 font-bold">মোট {filteredUsers.length} জনের মধ্যে {filteredUsers.length} জন দেখাচ্ছে</p>
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          <button className="px-4 py-2 rounded-lg text-xs font-bold text-gray-400 hover:text-gray-700 disabled:opacity-30" disabled>পূর্ববর্তী</button>
          <button className="w-8 h-8 rounded-lg bg-[#7C4B2A] text-white text-xs font-bold shadow-md shadow-[#7C4B2A]/20">১</button>
          <button className="px-4 py-2 rounded-lg text-xs font-bold text-gray-500 hover:text-gray-700" disabled>পরবর্তী</button>
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
              onClick={() => !isSaving && setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-white border border-gray-100 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <form onSubmit={handleSave}>
                <div className="p-10 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
                      {editingUser ? 'স্টাফ তথ্য আপডেট করুন' : 'নতুন স্টাফ যোগ করুন'}
                    </h2>
                    <p className="text-sm text-gray-500 font-medium mt-1">
                      সিস্টেমে {editingUser ? 'স্টাফ সদস্যের তথ্য পরিবর্তন' : 'নতুন স্টাফ সদস্য যুক্ত'} করুন।
                    </p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-3 bg-white border border-gray-200 hover:bg-red-50 hover:text-red-500 rounded-2xl text-gray-400 shadow-sm transition-all active:scale-95"
                  >
                    <X size={22} />
                  </button>
                </div>

                <div className="p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">নাম (প্রথম অংশ)</label>
                      <input 
                        type="text" 
                        required
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                        placeholder="যেমন: প্রান্ত" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">নাম (শেষ অংশ)</label>
                      <input 
                        type="text" 
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                        placeholder="যেমন: ইসলাম" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.mobile}
                        onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                        placeholder="০১৭XXXXXXXX" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">ইমেইল ঠিকানা</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="name@myshop.com" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all" 
                      />
                    </div>
                    {!editingUser && (
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">পাসওয়ার্ড</label>
                        <input 
                          type="password" 
                          required
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          placeholder="••••••••" 
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-semibold outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all" 
                        />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">রোল নির্বাচন করুন</label>
                      <div className="relative group">
                        <select 
                          value={formData.role_id}
                          onChange={(e) => setFormData({...formData, role_id: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all appearance-none cursor-pointer"
                        >
                          <option value="employee">স্টাফ (Employee)</option>
                          <option value="admin">অ্যাডমিন (Admin)</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:rotate-180 transition-transform pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">ডিপার্টমেন্ট</label>
                      <div className="relative group">
                        <select 
                          value={formData.department_id}
                          onChange={(e) => setFormData({...formData, department_id: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all appearance-none cursor-pointer"
                        >
                          {state.departments?.map((dept: any) => (
                            <option key={dept.id} value={dept.id.toString()}>{dept.name}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:rotate-180 transition-transform pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">স্ট্যাটাস</label>
                      <div className="relative group">
                        <select 
                          value={formData.status}
                          onChange={(e) => setFormData({...formData, status: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] transition-all appearance-none cursor-pointer"
                        >
                          <option value="active">সক্রিয় (Active)</option>
                          <option value="inactive">নিষ্ক্রিয় (Inactive)</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:rotate-180 transition-transform pointer-events-none" size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-10 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-8 py-3 rounded-2xl border border-gray-200 bg-white text-gray-600 hover:bg-gray-100 transition-all font-bold text-sm active:scale-95"
                  >
                    বাতিল করুন
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="bg-[#7C4B2A] hover:bg-[#5D321A] text-white px-10 py-3 rounded-2xl font-extrabold text-sm shadow-xl shadow-[#7C4B2A]/30 transition-all active:scale-95 flex items-center gap-2"
                  >
                    {isSaving && <Loader2 size={18} className="animate-spin" />}
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

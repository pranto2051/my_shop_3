import React, { useState, useMemo } from 'react';
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
  Eye,
  User,
  CheckCircle2,
  AlertTriangle,
  X,
  Copy,
  Check,
  LayoutGrid,
  List,
  Activity,
  FileText,
  Sparkles,
  MapPin,
  Laptop,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface LogItem {
  id: string;
  user: string;
  userRole: string;
  userAvatar?: string | null;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  date: string;
  ip: string;
  location: string;
  device: string;
  type: 'create' | 'update' | 'delete' | 'security' | 'system';
  severity: 'low' | 'info' | 'warning' | 'high' | 'success';
  details?: Record<string, unknown>;
}

const initialLogs: LogItem[] = [
  { 
    id: 'LOG-1001', 
    user: 'Pranto Islam', 
    userRole: 'অ্যাডমিন',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
    action: 'নতুন ব্যবহারকারী তৈরি করেছেন', 
    entity: 'User', 
    entityId: 'USR-124', 
    timestamp: '২ মিনিট আগে', 
    date: '২০২৬-০৯-১১ ০৫:১২:০০',
    ip: '192.168.1.1', 
    location: 'ঢাকা, বাংলাদেশ',
    device: 'Chrome / MacOS',
    type: 'create',
    severity: 'low',
    details: {
      changedFields: ['username', 'email', 'role'],
      newValue: { username: 'rahim_dev', email: 'rahim@myshop.com', role: 'Editor' },
      previousValue: null
    }
  },
  { 
    id: 'LOG-1002', 
    user: 'Al Amin', 
    userRole: 'ম্যানেজার',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120',
    action: 'অর্ডার স্ট্যাটাস আপডেট করেছেন', 
    entity: 'Order', 
    entityId: 'ORD-882', 
    timestamp: '১৫ মিনিট আগে', 
    date: '২০২৬-০৯-১১ ০৪:৫৯:০০',
    ip: '192.168.1.5', 
    location: 'চট্টগ্রাম, বাংলাদেশ',
    device: 'Safari / iOS',
    type: 'update',
    severity: 'info',
    details: {
      changedFields: ['order_status', 'payment_status'],
      newValue: { status: 'Delivered', paid: true },
      previousValue: { status: 'Processing', paid: false }
    }
  },
  { 
    id: 'LOG-1003', 
    user: 'System Bot', 
    userRole: 'অটোমেশন',
    userAvatar: null,
    action: 'ডাটাবেস ব্যাকআপ সফলভাবে সম্পন্ন', 
    entity: 'System', 
    entityId: 'DB-BK-99', 
    timestamp: '১ ঘন্টা আগে', 
    date: '২০২৬-০৯-১১ ০৪:১৪:০০',
    ip: '127.0.0.1 (Internal)', 
    location: 'ক্লাউড সার্ভার',
    device: 'Cron Service Engine',
    type: 'system',
    severity: 'success',
    details: {
      backupSize: '142.5 MB',
      tablesBackedUp: 24,
      storageLocation: 's3://backups/myshop/2026-09-11.sql.gz'
    }
  },
  { 
    id: 'LOG-1004', 
    user: 'Tanvir Ahmed', 
    userRole: 'স্টাফ',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    action: 'ইনভেন্টরি টাস্ক মুছে ফেলেছেন', 
    entity: 'Task', 
    entityId: 'TSK-092', 
    timestamp: '৩ ঘন্টা আগে', 
    date: '২০২৬-০৯-১১ ০২:১৪:০০',
    ip: '192.168.1.12', 
    location: 'সিলেট, বাংলাদেশ',
    device: 'Firefox / Windows',
    type: 'delete',
    severity: 'warning',
    details: {
      deletedItem: 'Inventory audit for Branch 2',
      reason: 'Duplicate entry removed by supervisor'
    }
  },
  { 
    id: 'LOG-1005', 
    user: 'Pranto Islam', 
    userRole: 'অ্যাডমিন',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120',
    action: 'রোল পারমিশন পরিবর্তন করা হয়েছে', 
    entity: 'Role', 
    entityId: 'ROLE-EMP', 
    timestamp: '৫ ঘন্টা আগে', 
    date: '২০২৬-০৯-১০ ২৩:১৪:০০',
    ip: '192.168.1.1', 
    location: 'ঢাকা, বাংলাদেশ',
    device: 'Chrome / MacOS',
    type: 'security',
    severity: 'high',
    details: {
      permissionChanged: 'CAN_EXPORT_REPORTS',
      grantedTo: ['Manager', 'Accountant'],
      revokedFrom: ['Staff']
    }
  },
  { 
    id: 'LOG-1006', 
    user: 'Kazi Naim', 
    userRole: 'স্টাফ',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    action: 'নতুন ডিসকাউন্ট কুপন যোগ করেছেন', 
    entity: 'Coupon', 
    entityId: 'CPN-SUMMER', 
    timestamp: '৮ ঘন্টা আগে', 
    date: '২০২৬-০৯-১০ ২০:১০:০০',
    ip: '192.168.1.18', 
    location: 'ঢাকা, বাংলাদেশ',
    device: 'Edge / Windows',
    type: 'create',
    severity: 'low',
    details: {
      couponCode: 'SUMMER20',
      discount: '20%',
      validUntil: '2026-09-30'
    }
  }
];

const getTypeConfig = (type: LogItem['type']) => {
  switch (type) {
    case 'create':
      return {
        label: 'তৈরি',
        bg: 'bg-emerald-50 hover:bg-emerald-100/80',
        border: 'border-emerald-200/70',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300/60',
        iconBg: 'bg-emerald-500 text-white shadow-emerald-500/30',
        accentColor: '#10B981',
        icon: Plus
      };
    case 'update':
      return {
        label: 'আপডেট',
        bg: 'bg-blue-50 hover:bg-blue-100/80',
        border: 'border-blue-200/70',
        badgeBg: 'bg-blue-100 text-blue-800 border-blue-300/60',
        iconBg: 'bg-blue-500 text-white shadow-blue-500/30',
        accentColor: '#3B82F6',
        icon: RefreshCw
      };
    case 'delete':
      return {
        label: 'ডিলিট',
        bg: 'bg-rose-50 hover:bg-rose-100/80',
        border: 'border-rose-200/70',
        badgeBg: 'bg-rose-100 text-rose-800 border-rose-300/60',
        iconBg: 'bg-rose-500 text-white shadow-rose-500/30',
        accentColor: '#F43F5E',
        icon: Trash2
      };
    case 'security':
      return {
        label: 'সিকিউরিটি',
        bg: 'bg-amber-50 hover:bg-amber-100/80',
        border: 'border-amber-200/70',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-300/60',
        iconBg: 'bg-amber-500 text-white shadow-amber-500/30',
        accentColor: '#F59E0B',
        icon: Shield
      };
    case 'system':
      return {
        label: 'সিস্টেম',
        bg: 'bg-indigo-50 hover:bg-indigo-100/80',
        border: 'border-indigo-200/70',
        badgeBg: 'bg-indigo-100 text-indigo-800 border-indigo-300/60',
        iconBg: 'bg-indigo-500 text-white shadow-indigo-500/30',
        accentColor: '#6366F1',
        icon: Database
      };
    default:
      return {
        label: 'সাধারণ',
        bg: 'bg-gray-50 hover:bg-gray-100/80',
        border: 'border-gray-200/70',
        badgeBg: 'bg-gray-100 text-gray-800 border-gray-300/60',
        iconBg: 'bg-gray-500 text-white shadow-gray-500/30',
        accentColor: '#6B7280',
        icon: History
      };
  }
};

export default function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedLog, setSelectedLog] = useState<LogItem | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState(false);

  const filteredLogs = useMemo(() => {
    return initialLogs.filter((log) => {
      const matchesSearch = 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'all' || log.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <div className="w-full max-w-full space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 overflow-x-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {exportNotice && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 max-w-[calc(100vw-2rem)] bg-[#7C4B2A] text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-semibold text-xs sm:text-sm border border-white/20"
          >
            <CheckCircle className="text-emerald-400 shrink-0" size={20} />
            <span>একটিভিটি লগ সফলভাবে CSV ফাইল হিসেবে এক্সপোর্ট হয়েছে!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-[#2A180E] via-[#5D321A] to-[#7C4B2A] text-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[32px] shadow-2xl overflow-hidden">
        {/* Background Decorative Shapes */}
        <div className="absolute top-0 right-0 w-80 h-80 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 sm:w-64 sm:h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          <div className="space-y-2 sm:space-y-3 max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-200 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} className="animate-spin text-amber-400 shrink-0" style={{ animationDuration: '4s' }} />
              অডিট ও গভর্ন্যান্স সেন্টার
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3 break-words">
              একটিভিটি অডিট লগ
            </h1>
            <p className="text-amber-100/80 text-xs sm:text-sm md:text-base font-normal leading-relaxed break-words">
              সিস্টেমের সকল ব্যবহারকারীর কার্যকলাপ, পারমিশন পরিবর্তন এবং সিস্টেম ডায়াগনস্টিকের রিয়েল-টাইম ট্র্যাকিং কার্ড।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            <button 
              onClick={handleExportCSV}
              className="bg-white/10 hover:bg-white/20 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 border border-white/20 backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              <Download size={16} className="text-amber-300 shrink-0" />
              <span>এক্সপোর্ট CSV</span>
            </button>
            <button 
              onClick={handleRefresh}
              className="bg-white text-[#5D321A] hover:bg-amber-50 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl transition-all active:scale-95 cursor-pointer"
            >
              <RefreshCw size={16} className={`shrink-0 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>রিফ্রেশ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[
          { label: 'মোট অ্যাক্টিভিটি', value: initialLogs.length.toString(), icon: Activity, color: 'emerald', bgLight: 'bg-emerald-500/10', textColor: 'text-emerald-600', sub: '+৬টি আজ' },
          { label: 'সক্রিয় সেশন', value: '১২ জন', icon: Monitor, color: 'blue', bgLight: 'bg-blue-500/10', textColor: 'text-blue-600', sub: 'লাইভ মনিটরিং' },
          { label: 'ভৌগলিক লোকেশন', value: '৪ এলাকা', icon: Globe, color: 'indigo', bgLight: 'bg-indigo-500/10', textColor: 'text-indigo-600', sub: 'ঢাকা, চট্টগ্রাম...' },
          { label: 'সিকিউরিটি অ্যালার্ট', value: '১ ইভেন্ট', icon: Shield, color: 'amber', bgLight: 'bg-amber-500/10', textColor: 'text-amber-600', sub: 'উচ্চ গুরুত্ব' }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-[28px] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-3 gap-2">
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${stat.bgLight} ${stat.textColor} flex items-center justify-center group-hover:scale-110 transition-transform shrink-0`}>
                <stat.icon size={20} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 shrink-0">
                {stat.sub}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-gray-400 tracking-wide uppercase mb-1">{stat.label}</p>
            <p className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Control Bar: Search & Category Chips */}
      <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-[32px] border border-gray-100 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-0 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#7C4B2A] transition-colors shrink-0" size={18} />
            <input 
              type="text" 
              placeholder="ইউজার, অ্যাকশন, আইডি বা আইপি দিয়ে খুজুন..." 
              className="w-full bg-gray-50/80 border border-gray-200 rounded-xl sm:rounded-2xl py-3 pl-11 pr-9 outline-none focus:ring-4 focus:ring-[#7C4B2A]/10 focus:border-[#7C4B2A] focus:bg-white transition-all text-xs sm:text-sm font-semibold text-gray-800 placeholder:text-gray-400 truncate"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* View Mode Toggle & Live Indicator */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-xl border border-emerald-200/60">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shrink-0" />
              <span className="text-[11px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wider">রিয়েল-টাইম</span>
            </div>

            <div className="flex items-center bg-gray-100 p-1 rounded-xl sm:rounded-2xl border border-gray-200/60">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-white text-[#7C4B2A] shadow-xs' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="গ্রিড ভিউ"
              >
                <LayoutGrid size={15} />
                <span>গ্রিড</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list' 
                    ? 'bg-white text-[#7C4B2A] shadow-xs' 
                    : 'text-gray-500 hover:text-gray-800'
                }`}
                title="লিস্ট ভিউ"
              >
                <List size={15} />
                <span>লিস্ট</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-4 border-t border-gray-100 max-w-full scrollbar-thin">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-1 flex items-center gap-1 shrink-0">
            <Filter size={13} /> ফিল্টার:
          </span>

          {[
            { id: 'all', label: 'সকল অডিট', count: initialLogs.length, icon: History },
            { id: 'create', label: 'তৈরি', count: initialLogs.filter(l => l.type === 'create').length, icon: Plus },
            { id: 'update', label: 'আপডেট', count: initialLogs.filter(l => l.type === 'update').length, icon: RefreshCw },
            { id: 'delete', label: 'ডিলিট', count: initialLogs.filter(l => l.type === 'delete').length, icon: Trash2 },
            { id: 'security', label: 'সিকিউরিটি', count: initialLogs.filter(l => l.type === 'security').length, icon: Shield },
            { id: 'system', label: 'সিস্টেম', count: initialLogs.filter(l => l.type === 'system').length, icon: Database },
          ].map((tab) => {
            const isActive = selectedType === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl sm:rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#7C4B2A] text-white shadow-md shadow-[#7C4B2A]/20 scale-102'
                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70'
                }`}
              >
                <TabIcon size={13} className="shrink-0" />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logs Container: Grid vs List Cards */}
      {filteredLogs.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 sm:p-12 rounded-2xl sm:rounded-[32px] border border-gray-100 shadow-xs text-center space-y-4"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto">
            <Search size={28} />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">কোন একটিভিটি লগ পাওয়া যায়নি</h3>
          <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto">
            আপনার সার্চ ফিল্টারের সাথে মিলে এমন কোনো ডেটা সিস্টেমে পাওয়া যায়নি। ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
          </p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedType('all'); }}
            className="px-5 py-2.5 bg-[#7C4B2A] text-white rounded-xl font-bold text-xs hover:bg-[#5D321A] transition-colors"
          >
            সব ফিল্টার ক্লিয়ার করুন
          </button>
        </motion.div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6' 
            : 'space-y-4'
        }>
          <AnimatePresence>
            {filteredLogs.map((log, index) => {
              const cfg = getTypeConfig(log.type);
              const LogIcon = cfg.icon;

              return (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl sm:rounded-[28px] border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group relative"
                >
                  {/* Left Highlight Strip */}
                  <div 
                    className="absolute top-0 bottom-0 left-0 w-2 transition-all duration-300 group-hover:w-2.5"
                    style={{ backgroundColor: cfg.accentColor }}
                  />

                  <div className="p-5 sm:p-6 pl-6 sm:pl-7 space-y-4 min-w-0">
                    {/* Header Row: User Info & Type Badge */}
                    <div className="flex items-start justify-between gap-3 min-w-0">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {log.userAvatar ? (
                          <img 
                            src={log.userAvatar} 
                            alt={log.user} 
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover ring-2 ring-gray-100 shadow-xs shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-xs shrink-0">
                            {log.user.charAt(0)}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-extrabold text-gray-900 group-hover:text-[#7C4B2A] transition-colors text-sm sm:text-base truncate max-w-[160px] sm:max-w-none">
                              {log.user}
                            </h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md shrink-0">
                              {log.userRole}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 font-medium flex items-center gap-1.5 mt-0.5 truncate">
                            <Clock size={12} className="text-gray-400 shrink-0" />
                            <span>{log.timestamp}</span>
                          </p>
                        </div>
                      </div>

                      {/* Type Badge */}
                      <span className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold border shrink-0 ${cfg.badgeBg}`}>
                        <LogIcon size={12} className="shrink-0" />
                        <span>{cfg.label}</span>
                      </span>
                    </div>

                    {/* Action Text Box */}
                    <div className="bg-gray-50/80 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-gray-100 space-y-2.5 min-w-0">
                      <p className="text-xs sm:text-sm font-extrabold text-gray-800 leading-snug break-words">
                        {log.action}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-600 pt-0.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-gray-200 text-gray-700 shadow-2xs shrink-0">
                          <Database size={13} className="text-gray-400 shrink-0" />
                          <span className="text-gray-400 font-bold">আইটেম:</span>
                          <span className="font-extrabold text-gray-800">{log.entity}</span>
                        </span>
                        
                        <button 
                          type="button"
                          onClick={() => handleCopy(log.entityId)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-amber-50 rounded-lg border border-gray-200 text-[#7C4B2A] font-bold shadow-2xs transition-colors cursor-pointer shrink-0 max-w-full truncate"
                          title="আইডি কপি করুন"
                        >
                          <span className="truncate">{log.entityId}</span>
                          {copiedId === log.entityId ? (
                            <Check size={13} className="text-emerald-600 shrink-0" />
                          ) : (
                            <Copy size={13} className="text-gray-400 group-hover:text-[#7C4B2A] shrink-0" />
                          )}
                        </button>
                      </div>
                    </div>


                    {/* Tech Meta Tags (IP, Location, Device) */}
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 text-xs font-medium text-gray-500 pt-1 min-w-0">
                      <div className="flex items-center gap-1.5 min-w-0 max-w-[50%]">
                        <Globe size={13} className="text-gray-400 shrink-0" />
                        <span className="truncate">{log.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0 max-w-[50%]">
                        <Monitor size={13} className="text-gray-400 shrink-0" />
                        <span className="truncate">{log.ip}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-5 sm:px-6 py-3 bg-gray-50/90 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                    <span className="text-[11px] font-bold text-gray-400 truncate">
                      ID: {log.id}
                    </span>

                    <button
                      onClick={() => setSelectedLog(log)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#7C4B2A] hover:text-[#5D321A] hover:bg-[#7C4B2A]/10 px-2.5 py-1 rounded-lg transition-all cursor-pointer shrink-0"
                    >
                      <Eye size={13} />
                      <span>বিস্তারিত দেখুন</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Log Details Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-2xl sm:rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-7 bg-gradient-to-r from-[#2A180E] to-[#7C4B2A] text-white flex items-center justify-between gap-4 shrink-0 relative">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] sm:text-xs font-bold uppercase shrink-0">
                      {selectedLog.id}
                    </span>
                    <span className="text-amber-200 text-xs font-medium truncate">
                      {selectedLog.date}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white truncate">অডিট লগের বিস্তারিত বিবরণ</h3>
                </div>

                <button 
                  onClick={() => setSelectedLog(null)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-5 sm:p-7 space-y-5 overflow-y-auto min-w-0">
                {/* User & Action Box */}
                <div className="flex items-center gap-3.5 bg-gray-50 p-4 rounded-xl sm:rounded-2xl border border-gray-100 min-w-0">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#7C4B2A] text-white font-black flex items-center justify-center text-base sm:text-lg shrink-0">
                    {selectedLog.user.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-gray-900 text-sm sm:text-base truncate">{selectedLog.user}</h4>
                    <p className="text-xs text-gray-500 font-semibold break-words">{selectedLog.userRole} • {selectedLog.action}</p>
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">টাইপ</p>
                    <p className="text-xs sm:text-sm font-extrabold text-gray-800 capitalize mt-0.5 truncate">{selectedLog.type}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Entity</p>
                    <p className="text-xs sm:text-sm font-extrabold text-gray-800 mt-0.5 truncate">{selectedLog.entity} ({selectedLog.entityId})</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">IP এড্রেস</p>
                    <p className="text-xs sm:text-sm font-extrabold text-gray-800 mt-0.5 truncate">{selectedLog.ip}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">ডিভাইস / ব্রাউজার</p>
                    <p className="text-xs sm:text-sm font-extrabold text-gray-800 mt-0.5 truncate">{selectedLog.device}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">লোকেশন</p>
                    <p className="text-xs sm:text-sm font-extrabold text-gray-800 mt-0.5 truncate">{selectedLog.location}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">ঝুঁকি মাত্রা (Severity)</p>
                    <p className="text-xs sm:text-sm font-extrabold text-amber-600 uppercase mt-0.5 truncate">{selectedLog.severity}</p>
                  </div>
                </div>

                {/* Additional Payload Details */}
                {selectedLog.details && (
                  <div className="space-y-2 min-w-0">
                    <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">পরিবর্তনের পে-লোড (JSON payload)</h4>
                    <div className="bg-gray-900 p-4 rounded-xl sm:rounded-2xl shadow-inner border border-gray-800 max-w-full overflow-x-auto">
                      <pre className="whitespace-pre-wrap break-all max-w-full font-mono text-xs text-amber-300">
                        {JSON.stringify(selectedLog.details, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-end shrink-0">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="px-5 py-2 bg-gray-800 text-white rounded-xl font-bold text-xs hover:bg-gray-900 transition-colors cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}




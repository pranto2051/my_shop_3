import React, { useState, useMemo } from 'react';
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronDown,
  Package,
  ShoppingCart,
  Users2,
  Wallet,
  MessageSquare,
  Layout,
  Calendar,
  Database,
  HelpCircle,
  Store
} from 'lucide-react';

// Import Context
import { useAdmin } from '@/app/context/AdminContext';

// Import New Dashboard Components
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';
import StaffManagement from './StaffManagement';
import ActivityLogs from './ActivityLogs';

// Import Existing Panels (JS components)
import OrdersPanel from '../admin/panels/OrdersPanel';
import ProductsPanel from '../admin/panels/ProductsPanel';
import CategoriesPanel from '../admin/panels/CategoriesPanel';
import InventoryPanel from '../admin/panels/InventoryPanel';
import DeliveryManagementPanel from '../admin/panels/DeliveryManagementPanel';
import StageManagerPanel from '../admin/panels/StageManagerPanel';
import CustomerManagementPanel from '../admin/panels/CustomerManagementPanel';
import ReviewsPanel from '../admin/panels/ReviewsPanel';
import FinancialManagementPanel from '../admin/panels/FinancialManagementPanel';
import NotificationsPanel from '../admin/panels/NotificationsPanel';
import GalleryPanel from '../admin/panels/GalleryPanel';
import DesignsPanel from '../admin/panels/DesignsPanel';
import PromotionalPopupPanel from '../admin/panels/PromotionalPopupPanel';
import ContentManagementPanel from '../admin/panels/ContentManagementPanel';
import SettingsPanel from '../admin/panels/SettingsPanel';
import CalendarPanel from '../admin/panels/CalendarPanel';
import BackupPanel from '../admin/panels/BackupPanel';
import HelpPanel from '../admin/panels/HelpPanel';
import StoreProfilePanel from '../admin/panels/StoreProfilePanel';
import CreateOrderModal from '../admin/panels/CreateOrderModal';
import OrderDetailsView from '../admin/panels/OrderDetailsView';

interface SidebarItemData {
  icon: React.ElementType;
  label: string;
  roles: string[];
  subItems?: { label: string; roles: string[]; count?: number }[];
}

interface MenuGroup {
  title: string;
  items: SidebarItemData[];
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
  isOpen?: boolean;
  hasSubmenu?: boolean;
  isSidebarOpen: boolean;
}

const SidebarItem = ({ icon: Icon, label, active, onClick, isOpen, hasSubmenu, isSidebarOpen }: SidebarItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon size={18} />
    {isSidebarOpen && (
      <>
        <span className="font-medium text-sm flex-1 text-left">{label}</span>
        {hasSubmenu && (
          <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDown size={14} />
          </div>
        )}
      </>
    )}
    {!isSidebarOpen && active && <div className="absolute left-0 w-1 h-6 bg-green-500 rounded-r-full" />}
  </button>
);

const SidebarSubItem = ({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 pl-11 pr-4 py-2 rounded-lg transition-all duration-200 text-xs ${
      active 
        ? 'text-green-500 font-bold' 
        : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
    }`}
  >
    <span>{label}</span>
  </button>
);

export default function DashboardLayout({ children, role }: { children?: React.ReactNode, role: 'admin' | 'employee' }) {
  const { state, dispatch } = useAdmin();
  const { products, categories: categoriesData, customers, orders } = state;

  const [activeTab, setActiveTab] = useState('ড্যাশবোর্ড');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['পণ্য ব্যবস্থাপনা', 'অর্ডার ব্যবস্থাপনা', 'টিম ব্যবস্থাপনা']);
  
  // Modal states
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]
    );
  };

  const menuGroups: MenuGroup[] = [
    {
      title: 'প্রধান',
      items: [
        { icon: LayoutDashboard, label: 'ড্যাশবোর্ড', roles: ['admin', 'employee'] },
      ]
    },
    {
      title: 'পণ্য ব্যবস্থাপনা',
      items: [
        { 
          icon: Package, 
          label: 'পণ্য ব্যবস্থাপনা', 
          roles: ['admin', 'employee'],
          subItems: [
            { label: 'পণ্য তালিকা', roles: ['admin', 'employee'] },
            { label: 'ক্যাটাগরি', roles: ['admin'] },
            { label: 'ইনভেন্টরি ম্যানেজমেন্ট', roles: ['admin'] },
          ]
        },
      ]
    },
    {
      title: 'অর্ডার ব্যবস্থাপনা',
      items: [
        { 
          icon: ShoppingCart, 
          label: 'অর্ডার ব্যবস্থাপনা', 
          roles: ['admin', 'employee'],
          subItems: [
            { label: 'অর্ডার তালিকা', roles: ['admin', 'employee'], count: 1 },
            { label: 'নতুন অর্ডার', roles: ['admin', 'employee'] },
            { label: 'ডেলিভারি ম্যানেজমেন্ট', roles: ['admin', 'employee'] },
            { label: 'অর্ডার স্টেজ ব্যবস্থাপনা', roles: ['admin'], count: 9 },
          ]
        },
      ]
    },
    {
      title: 'গ্রাহক ব্যবস্থাপনা',
      items: [
        { 
          icon: Users2, 
          label: 'গ্রাহক ব্যবস্থাপনা', 
          roles: ['admin', 'employee'],
          subItems: [
            { label: 'গ্রাহক তালিকা', roles: ['admin', 'employee'] },
            { label: 'রিভিউ ও রেটিং', roles: ['admin', 'employee'] },
          ]
        },
      ]
    },
    {
      title: 'টিম ব্যবস্থাপনা',
      items: [
        { 
          icon: ShieldCheck, 
          label: 'টিম ব্যবস্থাপনা', 
          roles: ['admin'],
          subItems: [
            { label: 'অ্যাডমিন ও স্টাফ ব্যবস্থাপনা', roles: ['admin'] },
            { label: 'একটিভিটি লগ', roles: ['admin'] },
          ]
        },
      ]
    },
    {
      title: 'আর্থিক',
      items: [
        { icon: Wallet, label: 'আর্থিক ব্যবস্থাপনা', roles: ['admin'] },
      ]
    },
    {
      title: 'যোগাযোগ',
      items: [
        { icon: MessageSquare, label: 'নোটিফিকেশন', roles: ['admin', 'employee'] },
      ]
    },
    {
      title: 'কন্টেন্ট',
      items: [
        { 
          icon: Layout, 
          label: 'কন্টেন্ট', 
          roles: ['admin'],
          subItems: [
            { label: 'ফটো গ্যালারি', roles: ['admin'] },
            { label: 'ডিজাইন গ্যালারি', roles: ['admin'] },
            { label: 'প্রোমোশনাল পপআপ', roles: ['admin'] },
            { label: 'কন্টেন্ট ম্যানেজমেন্ট', roles: ['admin'] },
            { label: 'SEO ও মার্কেটিং', roles: ['admin'] },
          ]
        },
      ]
    },
    {
      title: 'সিস্টেম',
      items: [
        { icon: Calendar, label: 'ক্যালেন্ডার ও টাস্কস', roles: ['admin', 'employee'] },
        { icon: Database, label: 'ডেটা ব্যাকআপ', roles: ['admin'] },
        { icon: Settings, label: 'সেটিিংস', roles: ['admin'] },
        { icon: HelpCircle, label: 'হেল্প সেন্টার', roles: ['admin', 'employee'] },
      ]
    },
    {
      title: 'প্রোফাইল',
      items: [
        { icon: Store, label: 'স্টোর প্রোফাইল', roles: ['admin'] },
      ]
    }
  ];

  const renderContent = () => {
    if (children) return children;

    switch (activeTab) {
      case 'ড্যাশবোর্ড':
        return role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />;
      case 'পণ্য তালিকা':
        return (
          <ProductsPanel 
            products={products} 
            setProducts={(newProducts: any) => dispatch({ type: 'SET_INITIAL_DATA', payload: { products: newProducts, categories: categoriesData } })} 
            categoriesData={categoriesData} 
          />
        );
      case 'ক্যাটাগরি':
        return (
          <CategoriesPanel 
            categories={categoriesData} 
            onUpdateCategories={(newCats: any) => dispatch({ type: 'SET_INITIAL_DATA', payload: { products: products, categories: newCats } })} 
          />
        );
      case 'ইনভেন্টরি ম্যানেজমেন্ট':
        return <InventoryPanel />;
      case 'অর্ডার তালিকা':
      case 'নতুন অর্ডার':
        return (
          <OrdersPanel 
            openCreateModal={() => setShowCreateOrder(true)} 
            openOrderDetail={(order: any) => setSelectedOrder(order)} 
          />
        );
      case 'ডেলিভারি ম্যানেজমেন্ট':
        return <DeliveryManagementPanel />;
      case 'অর্ডার স্টেজ ব্যবস্থাপনা':
        return <StageManagerPanel />;
      case 'গ্রাহক তালিকা':
        return <CustomerManagementPanel customers={customers} orders={orders} setActiveTab={setActiveTab} />;
      case 'রিভিউ ও রেটিং':
        return <ReviewsPanel />;
      case 'অ্যাডমিন ও স্টাফ ব্যবস্থাপনা':
        return <StaffManagement />;
      case 'একটিভিটি লগ':
        return <ActivityLogs />;
      case 'আর্থিক ব্যবস্থাপনা':
        return <FinancialManagementPanel />;
      case 'নোটিফিকেশন':
        return <NotificationsPanel />;
      case 'ফটো গ্যালারি':
        return <GalleryPanel />;
      case 'ডিজাইন গ্যালারি':
        return <DesignsPanel />;
      case 'প্রোমোショナル পপআপ':
        return <PromotionalPopupPanel />;
      case 'কন্টেন্ট ম্যানেজমেন্ট':
      case 'SEO ও মার্কেটিং':
        return <ContentManagementPanel />; 
      case 'ক্যালেন্ডার ও টাস্কস':
        return <CalendarPanel />;
      case 'ডেটা ব্যাকআপ':
        return <BackupPanel />;
      case 'সেটিিংস':
        return <SettingsPanel />;
      case 'হেল্প সেন্টার':
        return <HelpPanel />;
      case 'স্টোর প্রোফাইল':
        return <StoreProfilePanel />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
              <LayoutDashboard className="text-slate-700" size={32} />
            </div>
            <p className="font-medium">অনুগ্রহ করে একটি মেনু নির্বাচন করুন</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-72' : 'w-20'
        } transition-all duration-300 glass-dark border-r border-slate-800 flex flex-col z-50`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)]">
                <ShieldCheck className="text-white" size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight">মা ফার্নিচার</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg text-slate-400"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6 custom-scrollbar">
          {menuGroups.map((group) => {
            const visibleItems = group.items.filter(item => item.roles.includes(role));
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.title} className="space-y-1">
                {isSidebarOpen && (
                  <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2">
                    {group.title}
                  </p>
                )}
                {visibleItems.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <SidebarItem
                      icon={item.icon}
                      label={item.label}
                      isSidebarOpen={isSidebarOpen}
                      active={activeTab === item.label}
                      hasSubmenu={!!item.subItems}
                      isOpen={expandedMenus.includes(item.label)}
                      onClick={() => {
                        if (item.subItems) {
                          toggleMenu(item.label);
                        } else {
                          setActiveTab(item.label);
                        }
                      }}
                    />
                    {isSidebarOpen && item.subItems && expandedMenus.includes(item.label) && (
                      <div className="space-y-1 mt-1">
                        {item.subItems.map((sub) => (
                          <SidebarSubItem
                            key={sub.label}
                            label={sub.label}
                            active={activeTab === sub.label}
                            onClick={() => setActiveTab(sub.label)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
            <LogOut size={18} />
            {isSidebarOpen && <span className="font-medium text-sm">লগআউট</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-20 glass border-b border-slate-800 flex items-center justify-between px-8 z-40">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-green-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="সার্চ করুন..." 
                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#020617]" />
            </button>
            
            <div className="flex items-center space-x-4 pl-4 border-l border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold">Pranto Islam</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{role === 'admin' ? 'অ্যাডমিন' : 'স্টাফ'}</p>
              </div>
              <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-800 p-0.5 bg-linear-to-tr from-green-500 to-blue-500">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Pranto" 
                  alt="Avatar" 
                  className="w-full h-full rounded-lg bg-slate-900"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-950/50">
          {renderContent()}
        </div>
      </main>

      {/* Modals & Drawers */}
      {showCreateOrder && (
        <CreateOrderModal onClose={() => setShowCreateOrder(false)} />
      )}

      {selectedOrder && (
        <OrderDetailsView 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
}

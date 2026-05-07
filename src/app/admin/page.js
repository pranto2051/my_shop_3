'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

import Sidebar from '@/components/admin/Sidebar';
import OrdersPanel from '@/components/admin/panels/OrdersPanel';
import OrderDetailsView from '@/components/admin/panels/OrderDetailsView';
import CreateOrderModal from '@/components/admin/panels/CreateOrderModal';
import StageManagerPanel from '@/components/admin/panels/StageManagerPanel';
import CategoriesPanel from '@/components/admin/panels/CategoriesPanel';
import AdminLogin from '@/components/admin/login/AdminLogin';
import OrderTrackingPanel from '@/components/admin/panels/OrderTrackingPanel';
import ProductsPanel from '@/components/admin/panels/ProductsPanel';
import SettingsPanel from '@/components/admin/panels/SettingsPanel';
import DesignsPanel from '@/components/admin/panels/DesignsPanel';
import GalleryPanel from '@/components/admin/panels/GalleryPanel';

// New Panels
import CustomerManagementPanel from '@/components/admin/panels/CustomerManagementPanel';
import DeliveryManagementPanel from '@/components/admin/panels/DeliveryManagementPanel';
import ReviewsPanel from '@/components/admin/panels/ReviewsPanel';
import ContentManagementPanel from '@/components/admin/panels/ContentManagementPanel';
import FinancialManagementPanel from '@/components/admin/panels/FinancialManagementPanel';
import InventoryPanel from '@/components/admin/panels/InventoryPanel';
import NotificationsPanel from '@/components/admin/panels/NotificationsPanel';
import HelpPanel from '@/components/admin/panels/HelpPanel';
import CalendarPanel from '@/components/admin/panels/CalendarPanel';
import BackupPanel from '@/components/admin/panels/BackupPanel';
import StoreProfilePanel from '@/components/admin/panels/StoreProfilePanel';
import PromotionalPopupPanel from '@/components/admin/panels/PromotionalPopupPanel';

import { useAdmin } from '@/app/context/AdminContext';
import { FaBars, FaXmark, FaMagnifyingGlass, FaBell, FaUser, FaGear, FaArrowRight, FaArrowTrendUp, FaArrowTrendDown, FaScaleBalanced, FaTruckFast, FaStar, FaMoneyBillTrendUp, FaClipboardList, FaUsers, FaCirclePlus } from 'react-icons/fa6';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false);
  const { state, dispatch } = useAdmin();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { 
    products, 
    categories: categoriesData, 
    designs, 
    gallery,
    shopInfo: fetchedShopInfo
  } = state;

  const storeInfo = fetchedShopInfo || {
    name: "মা ফার্নিচার",
    contactLabel: "যোগাযোগ করুন",
    showroomAddress: { label: "শোরুমের ঠিকানা", address: "মিরপুর ১০, ঢাকা" },
    callNumbers: { label: "সরাসরি কল করুন", numbers: ["01711-000000"] },
    whatsapp: { label: "WhatsApp মেসেজ", number: "01711000000" },
    email: { label: "ইমেইল", address: "মিরপুর ১০, ঢাকা" },
    directMessageLabel: "সরাসরি মেসেজ দিন",
    openingHours: { label: "খোলা থাকার সময়", schedule: ["09:00 AM - 09:00 PM"] }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dashboard Metrics Calculation
  const dashboardMetrics = useMemo(() => {
    if (!state) return {};
    
    // Action Required
    const paymentVerificationCount = state.orders.filter(o => o.status === 'active' && (o.advancePaid || 0) === 0).length;
    
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    const stageUpdateCount = state.orders.filter(o => o.status === 'active' && new Date(o.updatedAt || o.createdAt) < oneDayAgo).length;
    
    const pendingReviewsCount = state.reviews.filter(r => !r.is_approved).length;
    
    const lowStockCount = state.products.filter(p => (p.inStock || 0) < 5).length;

    // Hero Stats
    const todayTotalIncome = state.transactions
      .filter(t => new Date(t.date).toDateString() === new Date().toDateString() && t.type === 'Income')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
      
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthTotalIncome = state.transactions
      .filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear && t.type === 'Income';
      })
      .reduce((sum, t) => sum + (t.amount || 0), 0);
      
    const activeOrdersCount = state.orders.filter(o => o.status === 'active').length;
    const totalCustomersCount = state.customers.length;
    
    const totalRemainingPayment = state.orders
      .filter(o => o.status === 'active')
      .reduce((sum, o) => sum + (o.remainingAmount || 0), 0);

    // Top Selling
    const topSellingProducts = state.products
      .filter(p => p.isTopSelling)
      .slice(0, 3);

    // Upcoming Deliveries
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const upcomingDeliveries = state.orders
      .filter(o => o.status === 'active' && o.estimatedDelivery)
      .sort((a, b) => new Date(a.estimatedDelivery) - new Date(b.estimatedDelivery))
      .slice(0, 3);

    return {
      paymentVerificationCount,
      stageUpdateCount,
      pendingReviewsCount,
      lowStockCount,
      todayTotalIncome,
      monthTotalIncome,
      activeOrdersCount,
      totalCustomersCount,
      totalRemainingPayment,
      topSellingProducts,
      upcomingDeliveries
    };
  }, [state.orders, state.transactions, state.reviews, state.products, state.customers]);

  // Order Management State
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Toggle sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar on tab change (mobile)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Login logic
  const handleLogin = async () => {
    // Check against Supabase admins table
    const { data: admins, error } = await supabase
      .from('admins')
      .select('*')
      .or(`email.eq.${email},mobile.eq.${email}`)
      .eq('password', password);

    if (!error && admins && admins.length > 0) {
      setIsLoggedIn(true);
      setLoginError(false);
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminInfo', JSON.stringify(admins[0]));
    } else {
      setLoginError(true);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
      setIsLoggedIn(true);
    }

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminLoggedIn');
  };

  if (!isClient) return null;

  if (!isLoggedIn) {
    return (
      <AdminLogin 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        loginError={loginError}
        storeInfo={storeInfo}
      />
    );
  }

  return (
    <main className="admin-wrapper" suppressHydrationWarning>
      <section className={`admin-dashboard-layout ${isSidebarOpen ? 'sidebar-open' : ''}`} suppressHydrationWarning>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={handleTabChange} 
          handleLogout={handleLogout} 
          storeInfo={storeInfo} 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {isSidebarOpen && (
          <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
        )}

        <div className="admin-main-content">
          <header className="dashboard-top-bar">
            <div className="top-bar-left">
              <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
                {isSidebarOpen ? <FaXmark /> : <FaBars />}
              </button>
              <div className="breadcrumb">
                <span className="root-path">অ্যাডমিন</span>
                <i className="fas fa-chevron-right separator"></i>
                <span className="current-path">
                  {activeTab === 'dashboard' ? 'ড্যাশবোর্ড' :
                  //  activeTab === 'analytics' ? 'Analytics & Reports' :
                   activeTab === 'products' ? 'পণ্য তালিকা' :
                   activeTab === 'create-product' ? 'নতুন পণ্য যোগ' :
                   activeTab === 'categories' ? 'ক্যাটাগরি' :
                   activeTab === 'inventory' ? 'Inventory Management' :
                   activeTab === 'orders' ? 'অর্ডার তালিকা' :
                   activeTab === 'create-order' ? 'নতুন অর্ডার' :
                   activeTab === 'delivery' ? 'ডেলিভারি ম্যানেজমেন্ট' :
                   activeTab === 'order-stages' ? 'অর্ডার স্টেজ কনফিগ' :
                   activeTab === 'customers' ? 'গ্রাহক ম্যানেজমেন্ট' :
                   activeTab === 'payments' ? 'পেমেন্ট ম্যানেজমেন্ট' :
                   activeTab === 'coupons' ? 'কুপন ও ডিসকাউন্ট' :
                   activeTab === 'reviews' ? 'রিভিউ ও রেটিং' :
                   activeTab === 'pnl' ? 'আর্থিক ব্যবস্থাপনা' :
                   activeTab === 'promotional-popups' ? 'প্রোমোশনাল পপআপ' :
                   activeTab === 'cms' ? 'Content Management' :
                   activeTab === 'settings' ? 'সেটিংস' : 'অর্ডার ব্যবস্থাপনা'}
                </span>
              </div>
            </div>
            
            <div className="top-bar-right">
              <div className="global-search-bar" onClick={() => {/* Open Search Modal */}}>
                <FaMagnifyingGlass />
                <span>সার্চ করুন... (Ctrl+K)</span>
              </div>
              <div className="top-bar-actions">
                <button className="top-action-btn pulse"><FaBell /><span className="btn-badge">৫</span></button>
                <div className="user-profile-mini">
                  <div className="user-info-txt">
                    <span className="u-name">অ্যাডমিন</span>
                    <span className="u-status">সক্রিয়</span>
                  </div>
                  <div className="u-avatar"><FaUser /></div>
                </div>
              </div>
            </div>
          </header>

          <div className="dashboard-content-scroll">
            {activeTab === 'dashboard' && (
              <div className="tab-pane active dashboard-home">
                {/* Quick Stats Ticker */}
                <div className="stats-ticker-wrap">
                  <div className="stats-ticker">
                    <span>আজ {state.orders?.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length || 0}টি নতুন অর্ডার</span>
                    <span className="ticker-sep">|</span>
                    <span>৳{(dashboardMetrics.todayTotalIncome || 0).toLocaleString('bn-BD')} মোট আয়</span>
                    <span className="ticker-sep">|</span>
                    <span>{state.orders?.filter(o => o.currentStageId === 'stage_008').length || 0}টি ডেলিভারি আজ</span>
                    <span className="ticker-sep">|</span>
                    <span>{dashboardMetrics.activeOrdersCount || 0}টি অর্ডার পেন্ডিং</span>
                    <span className="ticker-sep">|</span>
                    <span>{state.reviews?.length || 0}টি মোট রিভিউ</span>
                  </div>
                </div>

                {/* ROW 1: HERO STATS */}
                <div className="hero-stats-grid">
                  <div className="hero-stat-card">
                    <div className="h-icon income"><FaArrowTrendUp /></div>
                    <div className="h-info">
                      <span className="h-label">আজকের আয়</span>
                      <span className="h-value">৳{(dashboardMetrics.todayTotalIncome || 0).toLocaleString('bn-BD')}</span>
                    </div>
                  </div>
                  <div className="hero-stat-card">
                    <div className="h-icon monthly"><FaMoneyBillTrendUp /></div>
                    <div className="h-info">
                      <span className="h-label">এই মাসের আয়</span>
                      <span className="h-value">৳{(dashboardMetrics.monthTotalIncome || 0).toLocaleString('bn-BD')}</span>
                    </div>
                  </div>
                  <div className="hero-stat-card">
                    <div className="h-icon active-ord"><FaClipboardList /></div>
                    <div className="h-info">
                      <span className="h-label">সক্রিয় অর্ডার</span>
                      <span className="h-value">{dashboardMetrics.activeOrdersCount || 0}</span>
                    </div>
                  </div>
                  <div className="hero-stat-card">
                    <div className="h-icon customers"><FaUsers /></div>
                    <div className="h-info">
                      <span className="h-label">মোট গ্রাহক</span>
                      <span className="h-value">{dashboardMetrics.totalCustomersCount || 0}</span>
                    </div>
                  </div>
                  <div className="hero-stat-card">
                    <div className="h-icon dues"><FaScaleBalanced /></div>
                    <div className="h-info">
                      <span className="h-label">বাকি পেমেন্ট</span>
                      <span className="h-value">৳{(dashboardMetrics.totalRemainingPayment || 0).toLocaleString('bn-BD')}</span>
                    </div>
                  </div>
                </div>

                {/* ROW 2: CHARTS */}
                <div className="dashboard-charts-row">
                  <div className="chart-container main-chart">
                    <div className="chart-header">
                      <h3>আয় রিপোর্ট (গত ১৪ দিন)</h3>
                      <select><option>গত ১৪ দিন</option><option>গত ৩০ দিন</option></select>
                    </div>
                    <div className="mock-bar-chart-large">
                      {Array.from({ length: 14 }).map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() - (13 - i));
                        const dailyIncome = state.transactions
                          ?.filter(t => new Date(t.date).toDateString() === date.toDateString() && t.type === 'Income')
                          .reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
                        
                        // Scale height based on max income in the range
                        const maxIncome = Math.max(...Array.from({ length: 14 }).map((_, j) => {
                          const d = new Date();
                          d.setDate(d.getDate() - j);
                          return state.transactions?.filter(t => new Date(t.date).toDateString() === d.toDateString() && t.type === 'Income').reduce((sum, t) => sum + (t.amount || 0), 0) || 0;
                        }), 1000); // minimum 1000 for scale
                        
                        const h = Math.min(Math.max((dailyIncome / maxIncome) * 100, 5), 100);
                        
                        return (
                          <div key={i} className="bar-wrapper" title={`৳${dailyIncome.toLocaleString('bn-BD')}`}>
                            <div className="bar" style={{height: `${h}%`}}></div>
                            <span className="bar-day">{date.getDate()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="chart-container side-chart">
                    <div className="chart-header">
                      <h3>অর্ডার স্ট্যাটাস</h3>
                    </div>
                    <div className="mock-donut-chart">
                      <div className="donut-hole">
                        <span className="d-total">{state.orders?.length || 0}</span>
                        <span className="d-label">মোট</span>
                      </div>
                      <svg viewBox="0 0 36 36" className="donut-svg">
                        <circle className="donut-ring" cx="18" cy="18" r="15.915" fill="transparent" stroke="#eee" strokeWidth="3"></circle>
                        {(() => {
                          const total = state.orders?.length || 1;
                          const active = state.orders?.filter(o => o.status === 'active').length || 0;
                          const completed = state.orders?.filter(o => o.status === 'completed').length || 0;
                          const cancelled = state.orders?.filter(o => o.status === 'cancelled').length || 0;
                          
                          const activePct = (active / total) * 100;
                          const completedPct = (completed / total) * 100;
                          
                          return (
                            <>
                              <circle 
                                className="donut-segment" cx="18" cy="18" r="15.915" fill="transparent" stroke="#7C4B2A" strokeWidth="3" 
                                strokeDasharray={`${activePct} ${100 - activePct}`} strokeDashoffset="25"
                              ></circle>
                              <circle 
                                className="donut-segment" cx="18" cy="18" r="15.915" fill="transparent" stroke="#27ae60" strokeWidth="3" 
                                strokeDasharray={`${completedPct} ${100 - completedPct}`} strokeDashoffset={100 - activePct + 25}
                              ></circle>
                            </>
                          );
                        })()}
                      </svg>
                    </div>
                    <div className="donut-legend">
                      <div className="leg-item"><span className="dot active"></span> সক্রিয় ({state.orders?.filter(o => o.status === 'active').length || 0})</div>
                      <div className="leg-item"><span className="dot done"></span> সম্পন্ন ({state.orders?.filter(o => o.status === 'completed').length || 0})</div>
                      <div className="leg-item"><span className="dot cancel"></span> বাতিল ({state.orders?.filter(o => o.status === 'cancelled').length || 0})</div>
                    </div>
                  </div>
                </div>

                {/* ROW 3: ACTION REQUIRED */}
                <div className="action-required-section">
                  <h3 className="section-title">অ্যাকশন প্রয়োজন</h3>
                  <div className="action-cards-scroll">
                    <div className="action-mini-card">
                      <div className="a-badge">{dashboardMetrics.paymentVerificationCount || 0}</div>
                      <div className="a-txt">পেমেন্ট ভেরিফিকেশন বাকি</div>
                      <button className="a-btn" onClick={() => setActiveTab('orders')}>দেখুন</button>
                    </div>
                    <div className="action-mini-card">
                      <div className="a-badge">{dashboardMetrics.stageUpdateCount || 0}</div>
                      <div className="a-txt">অর্ডার স্টেজ আপডেট করা হয়নি</div>
                      <button className="a-btn" onClick={() => setActiveTab('orders')}>দেখুন</button>
                    </div>
                    <div className="action-mini-card">
                      <div className="a-badge">{dashboardMetrics.pendingReviewsCount || 0}</div>
                      <div className="a-txt">রিভিউ পেন্ডিং আছে</div>
                      <button className="a-btn" onClick={() => setActiveTab('reviews')}>দেখুন</button>
                    </div>
                    <div className="action-mini-card">
                      <div className="a-badge alert">{dashboardMetrics.lowStockCount || 0}</div>
                      <div className="a-txt">পণ্যের স্টক শেষ পর্যায়ে</div>
                      <button className="a-btn" onClick={() => setActiveTab('inventory')}>স্টক আপডেট</button>
                    </div>
                  </div>
                </div>

                {/* ROW 4: RECENT ORDERS & LIVE FEED */}
                <div className="dashboard-double-row">
                  <div className="content-box recent-orders">
                    <div className="box-header">
                      <h3>সাম্প্রতিক অর্ডার সমূহ</h3>
                      <button className="view-all" onClick={() => setActiveTab('orders')}>সব দেখুন</button>
                    </div>
                    <div className="mini-order-list">
                      {state.orders && state.orders.length > 0 ? (
                        state.orders.slice(0, 6).map(order => (
                          <div key={order.id} className="mini-order-card" onClick={() => setSelectedOrder(order)}>
                            <div className="mo-left">
                              <span className="mo-id">#{order.id}</span>
                              <span className="mo-name">{order.customerName}</span>
                            </div>
                            <div className="mo-right">
                              <span className="mo-amount">৳{order.totalPrice?.toLocaleString('bn-BD')}</span>
                              <span className={`mo-status ${order.status}`}>
                                {order.status === 'active' ? 'সক্রিয়' : 
                                 order.status === 'completed' ? 'সম্পন্ন' : 
                                 order.status === 'cancelled' ? 'বাতিল' : order.status}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="empty-txt">কোন অর্ডার পাওয়া যায়নি</p>
                      )}
                    </div>
                  </div>
                  <div className="content-box activity-feed">
                    <div className="box-header">
                      <h3>লাইভ অ্যাক্টিভিটি ফিড</h3>
                      <span className="live-dot pulse"></span>
                    </div>
                    <div className="feed-list">
                      {state.notifications.length > 0 ? (
                        state.notifications.slice(0, 5).map(notif => (
                          <div key={notif.id} className="feed-item">
                            <div className={`f-icon ${notif.type.toLowerCase()}`}>
                              {notif.type === 'Success' ? <FaCirclePlus /> : 
                               notif.type === 'Warning' ? <FaGear /> : <FaBell />}
                            </div>
                            <div className="f-txt"><strong>{notif.title}</strong>: {notif.message}</div>
                            <span className="f-time">{new Date(notif.created_at).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="feed-item">
                            <div className="f-icon plus"><FaCirclePlus /></div>
                            <div className="f-txt"><strong>অ্যাডমিন</strong> একটি নতুন অর্ডার তৈরি করেছেন (ORD-1025)</div>
                            <span className="f-time">২ মিনিট আগে</span>
                          </div>
                          <div className="feed-item">
                            <div className="f-icon update"><FaGear /></div>
                            <div className="f-txt">অর্ডার <strong>ORD-1020</strong> এর স্টেজ পরিবর্তন করা হয়েছে</div>
                            <span className="f-time">১৫ মিনিট আগে</span>
                          </div>
                          <div className="feed-item">
                            <div className="f-icon review"><FaStar /></div>
                            <div className="f-txt">একজন গ্রাহক <strong>রয়্যাল চেয়ার</strong> এ ৫-স্টার রিভিউ দিয়েছেন</div>
                            <span className="f-time">১ ঘণ্টা আগে</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* ROW 5: TOP SELLING, NEW CUSTOMERS, DELIVERIES */}
                <div className="dashboard-triple-row">
                  <div className="content-box">
                    <h3>টপ সেলিং পণ্য</h3>
                    <div className="mini-list">
                      {dashboardMetrics.topSellingProducts && dashboardMetrics.topSellingProducts.length > 0 ? (
                        dashboardMetrics.topSellingProducts.map(p => (
                          <div key={p.id} className="mini-item">
                            <img src={p.image} alt="" />
                            <div className="mi-info">
                              <span className="mi-name">{p.name}</span>
                              <span className="mi-sub">{p.reviewCount || 0}টি রিভিউ</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="empty-txt">কোন পণ্য নেই</p>
                      )}
                    </div>
                  </div>
                  <div className="content-box">
                    <h3>নতুন গ্রাহক</h3>
                    <div className="mini-list">
                      {state.customers.length > 0 ? (
                        state.customers.slice(0, 3).map(c => (
                          <div key={c.id} className="mini-item">
                            <div className="mi-avatar"><FaUser /></div>
                            <div className="mi-info">
                              <span className="mi-name">{c.full_name || 'বেনামী গ্রাহক'}</span>
                              <span className="mi-sub">জয়েন: {new Date(c.created_at).toLocaleDateString('bn-BD')}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="empty-txt">কোন গ্রাহক নেই</p>
                      )}
                    </div>
                  </div>
                  <div className="content-box">
                    <h3>আসন্ন ডেলিভারি</h3>
                    <div className="mini-list">
                      {dashboardMetrics.upcomingDeliveries && dashboardMetrics.upcomingDeliveries.length > 0 ? (
                        dashboardMetrics.upcomingDeliveries.map(o => (
                          <div key={o.id} className="mini-item">
                            <div className="mi-icon"><FaTruckFast /></div>
                            <div className="mi-info">
                              <span className="mi-name">{o.id}</span>
                              <span className="mi-sub">{new Date(o.estimatedDelivery).toLocaleDateString('bn-BD')}, {o.deliveryAddress}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="empty-txt">কোন আসন্ন ডেলিভারি নেই</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <ProductsPanel 
                products={products} 
                setProducts={(newProducts) => dispatch({ type: 'SET_INITIAL_DATA', payload: { products: newProducts, categories: categoriesData } })} 
                categoriesData={categoriesData} 
              />
            )}

            {activeTab === 'orders' && (
              <OrdersPanel 
                openCreateModal={() => setShowCreateOrder(true)} 
                openOrderDetail={(order) => setSelectedOrder(order)} 
              />
            )}

            {activeTab === 'create-order' && (
              <CreateOrderModal onClose={() => setActiveTab('orders')} />
            )}

            {activeTab === 'order-stages' && (
              <StageManagerPanel />
            )}

            {activeTab === 'order-tracking' && (
              <OrderTrackingPanel />
            )}

            {activeTab === 'categories' && (
              <CategoriesPanel 
                categories={categoriesData} 
                onUpdateCategories={(newCategories) => dispatch({ type: 'SET_INITIAL_DATA', payload: { products, categories: newCategories } })} 
              />
            )}

            {activeTab === 'designs' && (
              <DesignsPanel />
            )}

            {activeTab === 'gallery' && (
              <GalleryPanel />
            )}

            {activeTab === 'promotional-popups' && (
              <PromotionalPopupPanel />
            )}

            {activeTab === 'inventory' && (
              <InventoryPanel />
            )}

            {activeTab === 'customers' && (
              <CustomerManagementPanel 
                customers={state.customers} 
                orders={state.orders}
                setActiveTab={handleTabChange}
              />
            )}

            {activeTab === 'delivery' && (
              <DeliveryManagementPanel 
                deliveryZones={state.deliveryZones}
                deliveryLocations={state.deliveryLocations}
              />
            )}

            {activeTab === 'reviews' && (
              <ReviewsPanel reviews={state.reviews} />
            )}


            {activeTab === 'pnl' && (
              <FinancialManagementPanel 
                transactions={state.transactions} 
                initialTab="pnl"
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationsPanel />
            )}

            {activeTab === 'performance' && (
              <PerformancePanel />
            )}

            {activeTab === 'calendar' && (
              <CalendarPanel tasks={state.tasks} />
            )}

            {activeTab === 'backup' && (
              <BackupPanel />
            )}

            {activeTab === 'help' && (
              <HelpPanel />
            )}

            {activeTab === 'cms' && (
              <ContentManagementPanel />
            )}

            {activeTab === 'profile' && (
              <StoreProfilePanel />
            )}

            {activeTab === 'settings' && (
              <SettingsPanel />
            )}
          </div>
        </div>
      </section>

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

      <style jsx>{`
        .admin-wrapper { height: 100vh; overflow: hidden; background: #f8f9fa; position: relative; }
        .admin-dashboard-layout { display: flex; height: 100vh; transition: all 0.3s ease; }
        .admin-main-content { flex: 1; padding: 30px; overflow-y: auto; height: 100vh; transition: all 0.3s ease; width: 100%; }
        
        .dashboard-top-bar { 
          background: white; 
          padding: 15px 30px; 
          border-bottom: 1px solid #eee; 
          margin: -30px -30px 30px -30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .top-bar-left { display: flex; align-items: center; gap: 15px; }
        .sidebar-toggle-btn { 
          display: none; 
          background: #7C4B2A; 
          color: white; 
          border: none; 
          width: 40px; 
          height: 40px; 
          border-radius: 8px; 
          align-items: center; 
          justify-content: center; 
          font-size: 1.2rem; 
          cursor: pointer;
          transition: 0.2s;
        }

        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(3px);
          z-index: 999;
          display: none;
        }

        @media (max-width: 1024px) {
          .sidebar-toggle-btn { display: flex; }
          .admin-main-content { padding: 20px; }
          .dashboard-top-bar { padding: 12px 20px; margin: -20px -20px 20px -20px; }
          .sidebar-overlay { display: block; }
          
          .admin-dashboard-layout:not(.sidebar-open) .admin-main-content {
            margin-left: 0;
          }
        }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 15px; }
          .stat-card { padding: 15px; }
          .stat-icon { width: 40px; height: 40px; font-size: 1.2rem; }
          .stat-info h3 { font-size: 0.85rem; }
          .stat-info p { font-size: 1.2rem; }
        }

        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr; }
          .breadcrumb { font-size: 0.85rem; }
          .current-path { max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        }

        .admin-login-overlay { position: fixed; inset: 0; background: #FDF6E8; z-index: 2000; justify-content: center; align-items: center; }
        .login-card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        .login-header { text-align: center; margin-bottom: 30px; }
        .logo-circle { width: 60px; height: 60px; background: #7C4B2A; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 24px; }
        .login-submit-btn { width: 100%; background: #7C4B2A; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; margin-top: 20px; }
        .admin-dashboard-layout { min-height: 100vh; }
        .admin-sidebar { width: 260px; background: #2c3e50; color: white; padding: 20px; }
        .stat-card { background: white; padding: 20px; border-radius: 15px; display: flex; align-items: center; gap: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .premium-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .premium-table th, .premium-table td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
        .mini-img { width: 40px; height: 40px; border-radius: 5px; object-fit: cover; }
        .product-cell { display: flex; align-items: center; gap: 10px; }
        .product-names { display: flex; flex-direction: column; }
        .name-bn { font-weight: 600; font-size: 14px; }
        .name-en { font-size: 12px; color: #777; }
        .badge { padding: 5px 10px; border-radius: 20px; font-size: 12px; }
        .stock-in { background: #e8f5e9; color: #2e7d32; }
        .stock-out { background: #ffebee; color: #c62828; }
        .action-btns { display: flex; gap: 5px; }
        .action-btn { border: none; background: none; cursor: pointer; padding: 5px; border-radius: 5px; transition: 0.2s; }
        .action-btn.edit { color: #1976d2; }
        .action-btn.delete { color: #d32f2f; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 3000; justify-content: center; align-items: center; }
        .modal-card { background: white; padding: 30px; border-radius: 20px; width: 90%; max-width: 800px; max-height: 90vh; overflow-y: auto; }
        .form-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }
        .form-group { display: flex; flex-direction: column; gap: 5px; }
        .form-label { font-weight: 600; font-size: 14px; }
        .form-toggles { display: flex; gap: 20px; margin: 20px 0; }
        .form-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 30px; }
        .btn-primary { background: #7C4B2A; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
        .btn-secondary { background: #eee; color: #333; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }

        /* Dashboard Top Bar Enhancements */
        .top-bar-right { display: flex; align-items: center; gap: 25px; }
        .global-search-bar { 
          background: #f1f3f5; 
          border: 1px solid #e9ecef; 
          border-radius: 10px; 
          padding: 8px 15px; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          color: #adb5bd; 
          width: 300px; 
          cursor: pointer;
          transition: 0.2s;
        }
        .global-search-bar:hover { background: #e9ecef; border-color: #dee2e6; color: #495057; }
        .top-bar-actions { display: flex; align-items: center; gap: 15px; }
        .top-action-btn { 
          background: white; 
          border: 1px solid #eee; 
          width: 40px; 
          height: 40px; 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          color: #2c3e50; 
          position: relative;
          cursor: pointer;
        }
        .btn-badge { 
          position: absolute; 
          top: -5px; 
          right: -5px; 
          background: #e74c3c; 
          color: white; 
          font-size: 10px; 
          font-weight: 700; 
          width: 18px; 
          height: 18px; 
          border-radius: 50%; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          border: 2px solid white;
        }
        .user-profile-mini { display: flex; align-items: center; gap: 12px; padding-left: 15px; border-left: 1px solid #eee; }
        .user-info-txt { display: flex; flex-direction: column; text-align: right; }
        .u-name { font-weight: 700; font-size: 14px; color: #2c3e50; }
        .u-status { font-size: 11px; color: #27ae60; font-weight: 600; }
        .u-avatar { width: 40px; height: 40px; background: #E6D5B8; color: #7C4B2A; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }

        /* Stats Ticker */
        .stats-ticker-wrap { background: #7C4B2A; margin: -10px -10px 25px -10px; padding: 10px; border-radius: 10px; overflow: hidden; }
        .stats-ticker { display: flex; align-items: center; gap: 20px; color: white; font-weight: 600; font-size: 13px; animation: scroll-ticker 30s linear infinite; white-space: nowrap; }
        @keyframes scroll-ticker { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
        .ticker-sep { opacity: 0.3; }

        /* Hero Stats Grid */
        .hero-stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .hero-stat-card { background: white; padding: 20px; border-radius: 15px; border: 1px solid #eee; display: flex; align-items: center; gap: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .h-icon { width: 45px; height: 45px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .h-icon.income { background: #e8f5e9; color: #2e7d32; }
        .h-icon.monthly { background: #e3f2fd; color: #1565c0; }
        .h-icon.active-ord { background: #fff3e0; color: #e65100; }
        .h-icon.customers { background: #f3e5f5; color: #7b1fa2; }
        .h-icon.dues { background: #ffebee; color: #c62828; }
        .h-info { display: flex; flex-direction: column; }
        .h-label { font-size: 11px; color: #7f8c8d; font-weight: 600; text-transform: uppercase; }
        .h-value { font-size: 18px; font-weight: 800; color: #2c3e50; }

        /* Charts Row */
        .dashboard-charts-row { display: grid; grid-template-columns: 1fr 320px; gap: 20px; margin-bottom: 30px; }
        .chart-container { background: white; border-radius: 20px; border: 1px solid #eee; padding: 25px; box-shadow: 0 5px 15px rgba(0,0,0,0.02); }
        .chart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .chart-header h3 { font-size: 16px; color: #2c3e50; }
        .mock-bar-chart-large { height: 220px; display: flex; align-items: flex-end; gap: 12px; padding-bottom: 25px; border-bottom: 1px solid #f8f9fa; }
        .bar-wrapper { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; justify-content: flex-end; }
        .bar { width: 100%; background: linear-gradient(to top, #7C4B2A, #A67B5B); border-radius: 4px 4px 0 0; transition: 0.3s; }
        .bar:hover { background: #2c3e50; transform: scaleX(1.1); }
        .bar-day { font-size: 10px; color: #adb5bd; font-weight: 600; }

        .mock-donut-chart { width: 150px; height: 150px; margin: 0 auto 20px; position: relative; display: flex; align-items: center; justify-content: center; }
        .donut-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
        .donut-segment { transition: stroke-dasharray 0.3s ease; }
        .donut-hole { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .d-total { font-size: 24px; font-weight: 800; color: #2c3e50; }
        .d-label { font-size: 11px; color: #7f8c8d; font-weight: 600; }
        .donut-legend { display: flex; flex-direction: column; gap: 10px; }
        .leg-item { display: flex; align-items: center; gap: 10px; font-size: 13px; color: #2c3e50; font-weight: 600; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.active { background: #7C4B2A; }
        .dot.done { background: #27ae60; }
        .dot.cancel { background: #e74c3c; }

        /* Action Required */
        .action-required-section { margin-bottom: 30px; }
        .section-title { font-size: 18px; color: #2c3e50; margin-bottom: 15px; }
        .action-cards-scroll { display: flex; gap: 15px; overflow-x: auto; padding-bottom: 10px; }
        .action-mini-card { flex-shrink: 0; background: white; border: 1px solid #eee; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 12px; min-width: 250px; }
        .a-badge { background: #f1f3f5; color: #2c3e50; width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; }
        .a-badge.alert { background: #fee2e2; color: #ef4444; }
        .a-txt { font-size: 13px; color: #495057; font-weight: 600; flex: 1; }
        .a-btn { background: #f8f9fa; border: 1px solid #eee; padding: 5px 12px; border-radius: 6px; font-size: 11px; font-weight: 700; cursor: pointer; }

        /* Double Row Boxes */
        .dashboard-double-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .content-box { background: white; border-radius: 20px; border: 1px solid #eee; padding: 20px; }
        .box-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .box-header h3 { font-size: 16px; color: #2c3e50; }
        .view-all { background: none; border: none; color: #7C4B2A; font-weight: 700; font-size: 13px; cursor: pointer; }

        .mini-order-list { display: flex; flex-direction: column; gap: 12px; }
        .mini-order-card { display: flex; justify-content: space-between; align-items: center; padding: 12px; background: #f8f9fa; border-radius: 12px; }
        .mo-left { display: flex; flex-direction: column; }
        .mo-id { font-size: 11px; font-weight: 800; color: #7C4B2A; }
        .mo-name { font-size: 13px; font-weight: 600; color: #2c3e50; }
        .mo-right { display: flex; flex-direction: column; align-items: flex-end; }
        .mo-amount { font-weight: 700; font-size: 13px; color: #2c3e50; }
        .mo-status { font-size: 10px; font-weight: 700; text-transform: uppercase; padding: 2px 8px; border-radius: 5px; }
        .mo-status.active { background: #e3f2fd; color: #1565c0; }

        .feed-list { display: flex; flex-direction: column; gap: 15px; }
        .feed-item { display: flex; gap: 15px; position: relative; }
        .f-icon { width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .f-icon.plus { background: #e8f5e9; color: #2e7d32; }
        .f-icon.update { background: #f3e5f5; color: #7b1fa2; }
        .f-icon.review { background: #fffde7; color: #fbc02d; }
        .f-txt { font-size: 13px; color: #495057; line-height: 1.4; flex: 1; }
        .f-txt strong { color: #2c3e50; }
        .f-time { font-size: 10px; color: #adb5bd; font-weight: 600; }
        .live-dot { width: 8px; height: 8px; background: #27ae60; border-radius: 50%; }

        /* Triple Row */
        .dashboard-triple-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .mini-list { display: flex; flex-direction: column; gap: 12px; margin-top: 15px; }
        .mini-item { display: flex; align-items: center; gap: 12px; padding: 10px; background: #f8f9fa; border-radius: 10px; }
        .mini-item img { width: 40px; height: 40px; border-radius: 6px; object-fit: cover; }
        .mi-info { display: flex; flex-direction: column; }
        .mi-name { font-size: 13px; font-weight: 700; color: #2c3e50; }
        .mi-sub { font-size: 11px; color: #7f8c8d; }
        .mi-avatar { width: 35px; height: 35px; background: #eee; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #777; }
        .mi-icon { width: 35px; height: 35px; background: #e3f2fd; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #1565c0; }

        .pulse { animation: pulse-animation 2s infinite; }
        @keyframes pulse-animation { 0% { box-shadow: 0 0 0 0px rgba(39, 174, 96, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(39, 174, 96, 0); } 100% { box-shadow: 0 0 0 0px rgba(39, 174, 96, 0); } }

        @media (max-width: 1200px) {
          .dashboard-charts-row { grid-template-columns: 1fr; }
          .dashboard-triple-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 900px) {
          .dashboard-double-row { grid-template-columns: 1fr; }
          .dashboard-triple-row { grid-template-columns: 1fr; }
          .global-search-bar { width: 200px; }
        }
      `}</style>
    </main>
  );
}

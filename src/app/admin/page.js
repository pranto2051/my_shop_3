'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import productsRaw from '@/data/products';
import categoriesRaw from '@/data/categories';
import designsRaw from '@/data/designs';
import galleryRaw from '@/data/gallery';
import storeInfoRaw from '@/data/shopInfo';

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
import { useAdmin } from '@/app/context/AdminContext';
import { FaBars, FaXmark } from 'react-icons/fa6';

export default function AdminPage() {
  const { state, dispatch } = useAdmin();
  const { 
    products, 
    categories: categoriesData, 
    designs, 
    gallery 
  } = state;

  const getArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (val.default && Array.isArray(val.default)) return val.default;
    if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
    return [];
  };

  const storeInfo = storeInfoRaw.default || storeInfoRaw;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
  const handleLogin = () => {
    if (password === 'furniture2024' || password === 'demo123') {
      setIsLoggedIn(true);
      setLoginError(false);
      localStorage.setItem('adminLoggedIn', 'true');
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


  if (!isLoggedIn) {
    return (
      <AdminLogin 
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        loginError={loginError}
        storeInfo={storeInfo}
      />
    );
  }

  return (
    <main className="admin-wrapper">
      <section className={`admin-dashboard-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
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
                   activeTab === 'products' ? 'পণ্য ব্যবস্থাপনা' :
                   activeTab === 'categories' ? 'ক্যাটাগরি সমূহ' :
                   activeTab === 'designs' ? 'ডিজাইন সমূহ' :
                   activeTab === 'gallery' ? 'আমাদের কাজ' :
                   activeTab === 'orders' ? 'অর্ডার তালিকা' :
                   activeTab === 'create-order' ? 'নতুন অর্ডার' :
                   activeTab === 'order-stages' ? 'অর্ডার স্টেজ' :
                   activeTab === 'order-tracking' ? 'অর্ডার ট্র্যাকিং' :
                   activeTab === 'settings' ? 'সেটিংস' : 'অর্ডার ব্যবস্থাপনা'}
                </span>
              </div>
            </div>
          </header>

          <div className="dashboard-content-scroll">
            {activeTab === 'dashboard' && (
              <div className="tab-pane active">
                <div className="stats-grid">
                  <div className="stat-card primary">
                    <div className="stat-icon"><i className="fas fa-couch"></i></div>
                    <div className="stat-info"><h3>মোট পণ্য</h3><p>{products.length}</p></div>
                  </div>
                  <div className="stat-card accent">
                    <div className="stat-icon"><i className="fas fa-th-large"></i></div>
                    <div className="stat-info"><h3>ক্যাটাগরি</h3><p>{categoriesData.length}</p></div>
                  </div>
                  <div className="stat-card success">
                    <div className="stat-icon"><i className="fas fa-palette"></i></div>
                    <div className="stat-info"><h3>ডিজাইন</h3><p>{designs.length}</p></div>
                  </div>
                  <div className="stat-card error">
                    <div className="stat-icon"><i className="fas fa-hammer"></i></div>
                    <div className="stat-info"><h3>আমাদের কাজ</h3><p>{gallery.length}</p></div>
                  </div>
                </div>

                <div className="recent-products-card" style={{ marginTop: '30px' }}>
                  <div className="card-header">
                    <h3 className="visual-title">সাম্প্রতিক পণ্যসমূহ</h3>
                    <button className="view-all-btn" onClick={() => setActiveTab('products')}>সব দেখুন <i className="fas fa-arrow-right"></i></button>
                  </div>
                  <div className="table-responsive">
                    <table className="premium-table">
                      <thead>
                        <tr>
                          <th>পণ্য</th>
                          <th>ক্যাটাগরি</th>
                          <th>মূল্য</th>
                          <th>স্টক</th>
                          <th>অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.slice(0, 5).map(product => (
                          <tr key={product.id}>
                            <td>
                              <div className="product-cell">
                                <img src={product.image} alt="" className="mini-img" />
                                <div className="product-names">
                                  <span className="name-bn">{product.name}</span>
                                  <span className="name-en">{product.nameEn}</span>
                                </div>
                              </div>
                            </td>
                            <td><span className="badge category-badge">{(categoriesData.find(c => c.id === product.categoryId) || {}).name}</span></td>
                            <td>৳{product.price.toLocaleString('bn-BD')}</td>
                            <td><span className={`badge ${product.inStock ? 'stock-in' : 'stock-out'}`}>{product.inStock ? 'স্টকে আছে' : 'স্টক শেষ'}</span></td>
                            <td>
                              <button className="view-all-btn" style={{ padding: '5px 10px', fontSize: '12px' }} onClick={() => setActiveTab('products')}>ব্যবস্থাপনা</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
        .admin-wrapper { min-height: 100vh; background: #f8f9fa; position: relative; }
        .admin-dashboard-layout { display: flex; min-height: 100vh; transition: all 0.3s ease; }
        .admin-main-content { flex: 1; padding: 30px; overflow-y: auto; transition: all 0.3s ease; width: 100%; }
        
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
      `}</style>
    </main>
  );
}

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

export default function AdminPage() {
  const getArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (val.default && Array.isArray(val.default)) return val.default;
    if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
    return [];
  };

  const productsData = getArray(productsRaw);
  const categories = getArray(categoriesRaw);
  const designs = getArray(designsRaw);
  const gallery = getArray(galleryRaw);
  const storeInfo = storeInfoRaw.default || storeInfoRaw;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(productsData);
  const [categoriesData, setCategoriesData] = useState(categories);

  // Order Management State
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

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
      <section className="admin-dashboard-layout" style={{ display: 'flex' }}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          handleLogout={handleLogout} 
          storeInfo={storeInfo} 
        />

        <div className="admin-main-content">
          <header className="dashboard-top-bar">
            <div className="breadcrumb">
              <span className="root-path">অ্যাডমিন</span>
              <i className="fas fa-chevron-right separator"></i>
              <span className="current-path">
                {activeTab === 'dashboard' ? 'ড্যাশবোর্ড' :
                 activeTab === 'products' ? 'পণ্য ব্যবস্থাপনা' :
                 activeTab === 'categories' ? 'ক্যাটাগরি সমূহ' :
                 activeTab === 'orders' ? 'অর্ডার তালিকা' :
                 activeTab === 'create-order' ? 'নতুন অর্ডার' :
                 activeTab === 'order-stages' ? 'অর্ডার স্টেজ' :
                 activeTab === 'order-tracking' ? 'অর্ডার ট্র্যাকিং' : 'অর্ডার ব্যবস্থাপনা'}
              </span>
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
                    <div className="stat-icon"><i className="fas fa-drafting-compass"></i></div>
                    <div className="stat-info"><h3>ডিজাইন</h3><p>{designs.length}</p></div>
                  </div>
                  <div className="stat-card error">
                    <div className="stat-icon"><i className="fas fa-images"></i></div>
                    <div className="stat-info"><h3>গ্যালারি</h3><p>{gallery.length}</p></div>
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
                setProducts={setProducts} 
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
                onUpdateCategories={setCategoriesData} 
              />
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
        .admin-wrapper { min-height: 100vh; background: #f8f9fa; }
        .admin-login-overlay { position: fixed; inset: 0; background: #FDF6E8; z-index: 2000; justify-content: center; align-items: center; }
        .login-card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
        .login-header { text-align: center; margin-bottom: 30px; }
        .logo-circle { width: 60px; height: 60px; background: #7C4B2A; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; font-size: 24px; }
        .login-submit-btn { width: 100%; background: #7C4B2A; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; margin-top: 20px; }
        .admin-dashboard-layout { min-height: 100vh; }
        .admin-sidebar { width: 260px; background: #2c3e50; color: white; padding: 20px; }
        .admin-main-content { flex: 1; padding: 30px; overflow-y: auto; }
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

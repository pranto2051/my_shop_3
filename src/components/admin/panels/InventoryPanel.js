'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { 
  FaBoxesStacked, 
  FaTriangleExclamation, 
  FaArrowRotateRight,
  FaMagnifyingGlass,
  FaArrowUpRightFromSquare,
  FaPlus,
  FaMinus,
  FaCheck
} from 'react-icons/fa6';

export default function InventoryPanel() {
  const { state, dispatch } = useAdmin();
  const { products } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, low, out

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         p.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'low') return matchesSearch && p.inStock > 0 && p.inStock <= 5;
    if (filter === 'out') return matchesSearch && p.inStock <= 0;
    return matchesSearch;
  });

  const lowStockCount = products.filter(p => p.inStock > 0 && p.inStock <= 5).length;
  const outOfStockCount = products.filter(p => p.inStock <= 0).length;

  return (
    <div className="inventory-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>Inventory Management</h2>
          <p>আপনার স্টকের পরিমাণ এবং রি-অর্ডার লেভেল পর্যবেক্ষণ করুন</p>
        </div>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          <FaArrowRotateRight /> রিফ্রেশ
        </button>
      </div>

      <div className="inventory-stats-grid">
        <div className="inv-stat-card total">
          <div className="inv-stat-icon"><FaBoxesStacked /></div>
          <div className="inv-stat-info">
            <span className="label">মোট আইটেম</span>
            <span className="value">{products.length}</span>
          </div>
        </div>
        <div className="inv-stat-card warning">
          <div className="inv-stat-icon"><FaTriangleExclamation /></div>
          <div className="inv-stat-info">
            <span className="label">স্টক কম (Low)</span>
            <span className="value">{lowStockCount}</span>
          </div>
        </div>
        <div className="inv-stat-card danger">
          <div className="inv-stat-icon"><FaTriangleExclamation /></div>
          <div className="inv-stat-info">
            <span className="label">স্টক আউট</span>
            <span className="value">{outOfStockCount}</span>
          </div>
        </div>
      </div>

      <div className="inventory-controls">
        <div className="search-box">
          <FaMagnifyingGlass />
          <input 
            type="text" 
            placeholder="পণ্য খুঁজুন..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-tabs">
          <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>সব</button>
          <button className={filter === 'low' ? 'active' : ''} onClick={() => setFilter('low')}>স্টক কম ({lowStockCount})</button>
          <button className={filter === 'out' ? 'active' : ''} onClick={() => setFilter('out')}>স্টক আউট ({outOfStockCount})</button>
        </div>
      </div>

      <div className="inventory-table-wrapper">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>পণ্য</th>
              <th>ক্যাটাগরি</th>
              <th>বর্তমান স্টক</th>
              <th>অবস্থা</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="p-cell">
                    <img src={product.image} alt="" className="p-img" />
                    <div className="p-info">
                      <span className="p-name">{product.name}</span>
                      <span className="p-sku">ID: {product.id.substring(0, 8)}</span>
                    </div>
                  </div>
                </td>
                <td>{product.categoryId}</td>
                <td>
                  <div className="stock-counter">
                    <button className="stock-btn minus"><FaMinus /></button>
                    <span className="stock-val">{product.inStock}</span>
                    <button className="stock-btn plus"><FaPlus /></button>
                  </div>
                </td>
                <td>
                  {product.inStock <= 0 ? (
                    <span className="stock-tag out">Out of Stock</span>
                  ) : product.inStock <= 5 ? (
                    <span className="stock-tag low">Low Stock</span>
                  ) : (
                    <span className="stock-tag ok"><FaCheck /> Healthy</span>
                  )}
                </td>
                <td>
                  <button className="view-btn"><FaArrowUpRightFromSquare /> ডিটেইলস</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .inventory-panel { padding: 20px; }
        .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }
        .refresh-btn { display: flex; align-items: center; gap: 8px; padding: 10px 15px; border: 1px solid #ddd; background: white; border-radius: 8px; cursor: pointer; font-weight: 600; }

        .inventory-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .inv-stat-card { background: white; padding: 25px; border-radius: 15px; border: 1px solid #eee; display: flex; align-items: center; gap: 20px; }
        .inv-stat-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
        .total .inv-stat-icon { background: #e3f2fd; color: #1565c0; }
        .warning .inv-stat-icon { background: #fff3e0; color: #e65100; }
        .danger .inv-stat-icon { background: #ffebee; color: #c62828; }
        .inv-stat-info { display: flex; flex-direction: column; }
        .label { font-size: 12px; color: #7f8c8d; font-weight: 600; }
        .value { font-size: 24px; font-weight: 800; color: #2c3e50; }

        .inventory-controls { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; gap: 20px; }
        .search-box { flex: 1; background: white; border: 1px solid #eee; border-radius: 10px; padding: 10px 15px; display: flex; align-items: center; gap: 12px; color: #adb5bd; }
        .search-box input { border: none; outline: none; width: 100%; font-size: 14px; }
        .filter-tabs { display: flex; gap: 10px; }
        .filter-tabs button { padding: 10px 20px; border: 1px solid #eee; background: white; border-radius: 10px; cursor: pointer; font-weight: 600; color: #7f8c8d; transition: 0.3s; }
        .filter-tabs button.active { background: #7C4B2A; color: white; border-color: #7C4B2A; }

        .inventory-table-wrapper { background: white; border: 1px solid #eee; border-radius: 15px; overflow: hidden; }
        .inventory-table { width: 100%; border-collapse: collapse; }
        .inventory-table th { text-align: left; padding: 15px; background: #f8f9fa; color: #7f8c8d; font-size: 13px; font-weight: 700; text-transform: uppercase; }
        .inventory-table td { padding: 15px; border-bottom: 1px solid #eee; font-size: 14px; }

        .p-cell { display: flex; align-items: center; gap: 15px; }
        .p-img { width: 45px; height: 45px; border-radius: 8px; object-fit: cover; }
        .p-info { display: flex; flex-direction: column; }
        .p-name { font-weight: 700; color: #2c3e50; }
        .p-sku { font-size: 11px; color: #95a5a6; }

        .stock-counter { display: flex; align-items: center; gap: 12px; }
        .stock-btn { width: 28px; height: 28px; border-radius: 6px; border: 1px solid #ddd; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #7f8c8d; transition: 0.2s; }
        .stock-btn:hover { background: #f8f9fa; border-color: #7C4B2A; color: #7C4B2A; }
        .stock-val { font-weight: 800; min-width: 20px; text-align: center; }

        .stock-tag { padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
        .stock-tag.ok { background: #e8f5e9; color: #2e7d32; display: flex; align-items: center; gap: 5px; }
        .stock-tag.low { background: #fff3e0; color: #e65100; }
        .stock-tag.out { background: #ffebee; color: #c62828; }

        .view-btn { display: flex; align-items: center; gap: 8px; background: none; border: 1px solid #eee; padding: 6px 12px; border-radius: 6px; color: #1565c0; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .view-btn:hover { background: #e3f2fd; border-color: #1565c0; }
      `}</style>
    </div>
  );
}

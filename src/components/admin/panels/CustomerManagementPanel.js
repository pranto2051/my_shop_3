'use client';

import React, { useState } from 'react';
import styles from './ProductsPanel.module.css'; // Reusing some base styles if possible, but let's define specific ones
import { 
  FaUser, 
  FaPhone, 
  FaEnvelope, 
  FaBagShopping, 
  FaMoneyBillWave, 
  FaClock, 
  FaEllipsisVertical,
  FaFilter,
  FaMagnifyingGlass,
  FaArrowUpWideShort,
  FaPlus,
  FaWhatsapp,
  FaBan,
  FaCrown,
  FaFileExport,
  FaXmark
} from 'react-icons/fa6';

export default function CustomerManagementPanel({ customers = [] }) {
  const [activeSegment, setActiveSegment] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const segments = [
    { label: 'All', icon: '👥' },
    { label: 'Active', icon: '🔥' },
    { label: 'New', icon: '💎', sub: 'এই মাস' },
    { label: 'VIP', icon: '🏆', sub: '৳৫০,০০০+' },
    { label: 'Blocked', icon: '⚠️' }
  ];

  const filteredCustomers = customers.filter(c => {
    if (activeSegment === 'VIP') return c.is_vip;
    if (activeSegment === 'New') return c.status === 'New';
    if (activeSegment === 'Active') return c.status === 'Active';
    if (activeSegment === 'Blocked') return c.status === 'Blocked';
    return true;
  }).filter(c => 
    (c.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.phone || '').includes(searchQuery) ||
    (c.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map(c => c.id));
    }
  };

  const toggleSelectCustomer = (id) => {
    if (selectedCustomers.includes(id)) {
      setSelectedCustomers(selectedCustomers.filter(item => item !== id));
    } else {
      setSelectedCustomers([...selectedCustomers, id]);
    }
  };

  const openDetails = (customer) => {
    setCurrentCustomer(customer);
    setShowDetailDrawer(true);
  };

  return (
    <div className="crm-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>গ্রাহক ব্যবস্থাপনা</h2>
          <p>আপনার দোকানের সকল গ্রাহকদের তালিকা ও প্রোফাইল</p>
        </div>
        <div className="header-actions">
          <button className="export-btn">
            <FaFileExport /> এক্সপোর্ট CSV
          </button>
          <button className="add-btn">
            <FaPlus /> নতুন গ্রাহক
          </button>
        </div>
      </div>

      <div className="segment-container">
        {segments.map(seg => (
          <button 
            key={seg.label}
            className={`segment-card ${activeSegment === seg.label ? 'active' : ''}`}
            onClick={() => setActiveSegment(seg.label)}
          >
            <span className="seg-icon">{seg.icon}</span>
            <div className="seg-info">
              <span className="seg-label">{seg.label}</span>
              {seg.sub && <span className="seg-sub">{seg.sub}</span>}
            </div>
          </button>
        ))}
      </div>

      <div className="table-controls">
        <div className="search-box">
          <FaMagnifyingGlass />
          <input 
            type="text" 
            placeholder="নাম, ফোন বা ইমেইল দিয়ে খুঁজুন..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="control-group">
          <div className="sort-box">
            <FaArrowUpWideShort />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">নতুন আগে</option>
              <option value="orders">অর্ডার সংখ্যা</option>
              <option value="spent">সর্বোচ্চ খরচ</option>
            </select>
          </div>
          {selectedCustomers.length > 0 && (
            <div className="bulk-actions">
              <span>{selectedCustomers.length} জন নির্বাচিত</span>
              <button className="bulk-btn wa">
                <FaWhatsapp /> মেসেজ
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="customer-table-wrapper">
        <table className="customer-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input 
                  type="checkbox" 
                  checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>গ্রাহক</th>
              <th>যোগাযোগ</th>
              <th>অর্ডার</th>
              <th>মোট খরচ</th>
              <th>সর্বশেষ অর্ডার</th>
              <th>স্ট্যাটাস</th>
              <th>অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id} className={selectedCustomers.includes(customer.id) ? 'selected' : ''}>
                <td className="checkbox-col">
                  <input 
                    type="checkbox" 
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => toggleSelectCustomer(customer.id)}
                  />
                </td>
                <td>
                  <div className="customer-info-cell" onClick={() => openDetails(customer)}>
                    <img src={customer.avatar} alt="" className="customer-avatar" />
                    <div className="customer-names">
                      <span className="customer-name">{customer.name} {customer.isVIP && <FaCrown className="vip-icon" title="VIP Customer" />}</span>
                      <span className="customer-id">{customer.id}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="contact-cell">
                    <span><FaPhone /> {customer.phone}</span>
                    <span className="email-sub"><FaEnvelope /> {customer.email}</span>
                  </div>
                </td>
                <td>
                  <div className="order-count">
                    <FaBagShopping /> {customer.totalOrders}টি
                  </div>
                </td>
                <td>
                  <div className="spent-amount">
                    ৳{customer.totalSpent.toLocaleString('bn-BD')}
                  </div>
                </td>
                <td>
                  <div className="date-cell">
                    <FaClock /> {customer.lastOrderDate}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn" onClick={() => openDetails(customer)}>
                    <FaEllipsisVertical />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Detail Drawer */}
      {showDetailDrawer && currentCustomer && (
        <div className="drawer-overlay" onClick={() => setShowDetailDrawer(false)}>
          <div className="detail-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>গ্রাহক প্রোফাইল</h3>
              <button className="close-btn" onClick={() => setShowDetailDrawer(false)}>
                <FaXmark />
              </button>
            </div>

            <div className="drawer-content">
              <div className="profile-hero">
                <img src={currentCustomer.avatar} alt="" className="hero-avatar" />
                <div className="hero-info">
                  <h4>{currentCustomer.name}</h4>
                  <p>{currentCustomer.isVIP ? '🏆 VIP মেম্বার' : 'সাধারণ মেম্বার'}</p>
                  <span className={`badge ${currentCustomer.status.toLowerCase()}`}>{currentCustomer.status}</span>
                </div>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <label>ফোন নম্বর</label>
                  <span>{currentCustomer.phone}</span>
                </div>
                <div className="info-item">
                  <label>ইমেইল</label>
                  <span>{currentCustomer.email}</span>
                </div>
                <div className="info-item">
                  <label>ঠিকানা</label>
                  <span>{currentCustomer.address}</span>
                </div>
                <div className="info-item">
                  <label>সদস্য হয়েছেন</label>
                  <span>{currentCustomer.joinedDate}</span>
                </div>
              </div>

              <div className="stats-row">
                <div className="stat-mini-card">
                  <span className="stat-label">মোট অর্ডার</span>
                  <span className="stat-value">{currentCustomer.totalOrders}</span>
                </div>
                <div className="stat-mini-card">
                  <span className="stat-label">মোট খরচ</span>
                  <span className="stat-value">৳{currentCustomer.totalSpent.toLocaleString('bn-BD')}</span>
                </div>
                <div className="stat-mini-card">
                  <span className="stat-label">গড় অর্ডার</span>
                  <span className="stat-value">৳{(currentCustomer.totalSpent / currentCustomer.totalOrders).toLocaleString('bn-BD')}</span>
                </div>
              </div>

              <div className="drawer-sections">
                <div className="section">
                  <h5>অ্যাকশন</h5>
                  <div className="action-grid">
                    <button className="action-btn-p wa">
                      <FaWhatsapp /> WhatsApp এ মেসেজ
                    </button>
                    <button className="action-btn-p order">
                      <FaPlus /> অর্ডার তৈরি করুন
                    </button>
                    <button className="action-btn-p block">
                      <FaBan /> ব্লক করুন
                    </button>
                    <button className="action-btn-p vip">
                      <FaCrown /> VIP মার্ক করুন
                    </button>
                  </div>
                </div>

                <div className="section">
                  <h5>অ্যাডমিন নোটস</h5>
                  <div className="notes-box">
                    <textarea placeholder="গ্রাহক সম্পর্কে কিছু লিখুন..."></textarea>
                    <button className="save-note-btn">সংরক্ষণ করুন</button>
                  </div>
                  <div className="notes-timeline">
                    <div className="note-item">
                      <span className="note-date">May 05, 2024</span>
                      <p>গ্রাহক সেগুন কাঠের কাজ পছন্দ করেন। গত অর্ডারে ডেলিভারি দ্রুত চেয়েছিলেন।</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .crm-panel {
          padding: 20px;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }

        .panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .header-title h2 {
          font-size: 24px;
          color: #2c3e50;
          margin-bottom: 5px;
          font-family: 'Noto Sans Bengali', sans-serif;
        }

        .header-title p {
          color: #7f8c8d;
          font-size: 14px;
        }

        .header-actions {
          display: flex;
          gap: 10px;
        }

        .export-btn, .add-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s;
          border: none;
        }

        .export-btn {
          background: #f8f9fa;
          color: #2c3e50;
          border: 1px solid #ddd;
        }

        .add-btn {
          background: #7C4B2A;
          color: white;
        }

        .segment-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .segment-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: #f8f9fa;
          border: 2px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: 0.3s;
          text-align: left;
        }

        .segment-card.active {
          background: #fff;
          border-color: #7C4B2A;
          box-shadow: 0 5px 15px rgba(124, 75, 42, 0.1);
        }

        .seg-icon {
          font-size: 24px;
        }

        .seg-info {
          display: flex;
          flex-direction: column;
        }

        .seg-label {
          font-weight: 700;
          color: #2c3e50;
        }

        .seg-sub {
          font-size: 11px;
          color: #7f8c8d;
        }

        .table-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 20px;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 300px;
        }

        .search-box svg {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #95a5a6;
        }

        .search-box input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 14px;
          outline: none;
          transition: 0.3s;
        }

        .search-box input:focus {
          border-color: #7C4B2A;
          box-shadow: 0 0 0 3px rgba(124, 75, 42, 0.1);
        }

        .control-group {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .sort-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f8f9fa;
          padding: 8px 15px;
          border-radius: 10px;
          border: 1px solid #ddd;
        }

        .sort-box select {
          background: transparent;
          border: none;
          outline: none;
          font-weight: 600;
          color: #2c3e50;
          cursor: pointer;
        }

        .bulk-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff8f0;
          padding: 8px 15px;
          border-radius: 10px;
          border: 1px solid #ffe8cc;
          color: #7C4B2A;
          font-weight: 600;
          font-size: 14px;
        }

        .bulk-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 13px;
        }

        .bulk-btn.wa { background: #25D366; color: white; }

        .customer-table-wrapper {
          overflow-x: auto;
        }

        .customer-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1000px;
        }

        .customer-table th {
          text-align: left;
          padding: 15px;
          background: #f8f9fa;
          color: #7f8c8d;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .customer-table td {
          padding: 15px;
          border-bottom: 1px solid #f1f1f1;
          transition: 0.2s;
        }

        .customer-table tr:hover td {
          background: #fcfcfc;
        }

        .customer-table tr.selected td {
          background: #fff8f0;
        }

        .checkbox-col {
          width: 40px;
        }

        .customer-info-cell {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .customer-avatar {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          object-fit: cover;
        }

        .customer-names {
          display: flex;
          flex-direction: column;
        }

        .customer-name {
          font-weight: 700;
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .vip-icon {
          color: #f1c40f;
          font-size: 12px;
        }

        .customer-id {
          font-size: 11px;
          color: #95a5a6;
        }

        .contact-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 13px;
          color: #2c3e50;
        }

        .email-sub {
          color: #7f8c8d;
          font-size: 12px;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-badge.active { background: #e8f5e9; color: #2e7d32; }
        .status-badge.new { background: #e3f2fd; color: #1565c0; }
        .status-badge.inactive { background: #f5f5f5; color: #616161; }
        .status-badge.blocked { background: #ffebee; color: #c62828; }

        .action-btn {
          background: none;
          border: none;
          color: #95a5a6;
          cursor: pointer;
          font-size: 18px;
          padding: 5px;
          transition: 0.2s;
        }

        .action-btn:hover {
          color: #2c3e50;
          background: #eee;
          border-radius: 5px;
        }

        /* Drawer Styles */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(4px);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
        }

        .detail-drawer {
          width: 100%;
          max-width: 450px;
          background: white;
          height: 100vh;
          box-shadow: -10px 0 30px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .drawer-header h3 {
          font-family: 'Noto Sans Bengali', sans-serif;
          margin: 0;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #95a5a6;
        }

        .drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: 25px;
        }

        .profile-hero {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .hero-avatar {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          object-fit: cover;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .hero-info h4 {
          font-size: 20px;
          margin-bottom: 5px;
        }

        .hero-info p {
          font-size: 13px;
          color: #7f8c8d;
          margin-bottom: 10px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 15px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .info-item label {
          font-size: 11px;
          text-transform: uppercase;
          color: #95a5a6;
          font-weight: 700;
        }

        .info-item span {
          font-weight: 600;
          color: #2c3e50;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 30px;
        }

        .stat-mini-card {
          background: #fff;
          border: 1px solid #eee;
          padding: 15px;
          border-radius: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .stat-label {
          font-size: 11px;
          color: #95a5a6;
        }

        .stat-value {
          font-weight: 800;
          color: #7C4B2A;
          font-size: 16px;
        }

        .section {
          margin-bottom: 30px;
        }

        .section h5 {
          font-size: 14px;
          color: #2c3e50;
          margin-bottom: 15px;
          border-bottom: 2px solid #f1f1f1;
          padding-bottom: 8px;
        }

        .action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .action-btn-p {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #ddd;
          background: white;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .action-btn-p:hover { background: #f8f9fa; }
        .action-btn-p.wa { color: #25D366; border-color: #25D366; }
        .action-btn-p.wa:hover { background: #e8f5e9; }
        .action-btn-p.order { color: #7C4B2A; border-color: #7C4B2A; }
        .action-btn-p.order:hover { background: #fff8f0; }
        .action-btn-p.block { color: #c62828; border-color: #c62828; }
        .action-btn-p.block:hover { background: #ffebee; }

        .notes-box {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .notes-box textarea {
          width: 100%;
          height: 80px;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 10px;
          outline: none;
          font-size: 14px;
          resize: none;
        }

        .save-note-btn {
          align-self: flex-end;
          background: #2c3e50;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
        }

        .note-item {
          padding: 12px;
          background: #fcfcfc;
          border-left: 3px solid #7C4B2A;
          margin-bottom: 10px;
          border-radius: 0 8px 8px 0;
        }

        .note-date {
          font-size: 11px;
          color: #95a5a6;
          display: block;
          margin-bottom: 5px;
        }

        .note-item p {
          font-size: 13px;
          color: #2c3e50;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

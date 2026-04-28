'use client';

import React from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import styles from './Sidebar.module.css';
import { 
  FaTableCellsLarge, 
  FaCouch, 
  FaClipboardList, 
  FaCirclePlus, 
  FaListCheck, 
  FaRightFromBracket,
  FaShield,
  FaLayerGroup,
  FaTruckFast,
  FaGear,
  FaXmark
} from 'react-icons/fa6';

export default function Sidebar({ activeTab, setActiveTab, handleLogout, storeInfo, isOpen, onClose }) {
  const { state } = useAdmin();
  
  const activeOrdersCount = state.orders.filter(o => o.status === 'active').length;
  const stagesCount = state.orderStages.length;

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.brand}>
        <div className={styles.brandIcon}><FaShield /></div>
        <div className={styles.brandText}>
          <span className={styles.brandName}>{storeInfo.name}</span>
          <span className={styles.brandRole}>অ্যাডমিন প্যানেল</span>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaXmark />
        </button>
      </div>
      
      <nav className={styles.nav}>
        <button 
          className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.active : ''}`} 
          onClick={() => setActiveTab('dashboard')}
        >
          <FaTableCellsLarge /> <span>ড্যাশবোর্ড</span>
        </button>
        
        <div className={styles.sectionLabel}>পণ্য ব্যবস্থাপনা</div>
        <button 
          className={`${styles.navItem} ${activeTab === 'products' ? styles.active : ''}`} 
          onClick={() => setActiveTab('products')}
        >
          <FaCouch /> <span>পণ্যসমূহ</span>
        </button>

        <button 
          className={`${styles.navItem} ${activeTab === 'categories' ? styles.active : ''}`} 
          onClick={() => setActiveTab('categories')}
        >
          <FaLayerGroup /> <span>ক্যাটাগরি সমূহ</span>
        </button>

        <div className={`${styles.sectionLabel} ${styles.orderMgmtLabel}`}>অর্ডার ব্যবস্থাপনা</div>
        <button 
          className={`${styles.navItem} ${activeTab === 'orders' ? styles.active : ''}`} 
          onClick={() => setActiveTab('orders')}
        >
          <FaClipboardList /> 
          <span>অর্ডার তালিকা</span>
          {activeOrdersCount > 0 && (
            <span className={`${styles.badge} ${styles.honeyBadge} ${styles.pulse}`}>{activeOrdersCount}</span>
          )}
        </button>
        
        <button 
          className={`${styles.navItem} ${activeTab === 'create-order' ? styles.active : ''}`} 
          onClick={() => setActiveTab('create-order')}
        >
          <FaCirclePlus /> <span>নতুন অর্ডার</span>
        </button>
        
        <button 
          className={`${styles.navItem} ${activeTab === 'order-stages' ? styles.active : ''}`} 
          onClick={() => setActiveTab('order-stages')}
        >
          <FaListCheck /> 
          <span>অর্ডার স্টেজ</span>
          <span className={styles.badge}>{stagesCount}</span>
        </button>

        <button 
          className={`${styles.navItem} ${activeTab === 'order-tracking' ? styles.active : ''}`} 
          onClick={() => setActiveTab('order-tracking')}
        >
          <FaTruckFast /> <span>অর্ডার ট্র্যাকিং</span>
        </button>

        <button 
          className={`${styles.navItem} ${activeTab === 'settings' ? styles.active : ''}`} 
          onClick={() => setActiveTab('settings')}
        >
          <FaGear /> <span>সেটিংস</span>
        </button>

        <div className={styles.sectionLabel}>অন্যান্য</div>
        <button className={styles.navItem} onClick={handleLogout}>
          <FaRightFromBracket /> <span>লগআউট</span>
        </button>
      </nav>
    </aside>
  );
}

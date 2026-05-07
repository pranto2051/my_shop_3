'use client';

import React, { useEffect } from 'react';
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
  FaXmark,
  FaPalette,
  FaBoxesStacked,
  FaUsers,
  FaCreditCard,
  FaTicket,
  FaStar,
  FaMoneyBillTrendUp,
  FaScaleBalanced,
  FaBell,
  FaEnvelope,
  FaPenToSquare,
  FaMagnifyingGlassChart,
  FaUserGroup,
  FaClockRotateLeft,
  FaCalendarDays,
  FaDatabase,
  FaGaugeHigh,
  FaCircleQuestion,
  FaStore,
  FaImages
} from 'react-icons/fa6';

export default function Sidebar({ activeTab, setActiveTab, handleLogout, storeInfo, isOpen, onClose }) {
  const { state } = useAdmin();
  
  const activeOrdersCount = state.orders.filter(o => o.status === 'active').length;
  const stagesCount = state.orderStages.length;

  // Handle background scroll lock for mobile sidebar
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  const navGroups = [
    {
      title: 'প্রধান',
      items: [
        { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: <FaTableCellsLarge /> }
      ]
    },
    {
      title: 'পণ্য ব্যবস্থাপনা',
      items: [
        { id: 'products', label: 'পণ্য তালিকা', icon: <FaCouch /> },
        { id: 'categories', label: 'ক্যাটাগরি', icon: <FaLayerGroup /> },
        { id: 'inventory', label: 'Inventory Management', icon: <FaBoxesStacked /> }
      ]
    },
    {
      title: 'অর্ডার ব্যবস্থাপনা',
      items: [
        { id: 'orders', label: 'অর্ডার তালিকা', icon: <FaClipboardList />, badge: activeOrdersCount, badgeType: 'honey' },
        { id: 'create-order', label: 'নতুন অর্ডার', icon: <FaCirclePlus /> },
        { id: 'delivery', label: 'Delivery Management', icon: <FaTruckFast /> },
        { id: 'order-stages', label: 'Order Stage Config', icon: <FaListCheck />, badge: stagesCount }
      ]
    },
    {
      title: 'গ্রাহক ব্যবস্থাপনা',
      items: [
        { id: 'customers', label: 'Customer Management', icon: <FaUsers /> },
        { id: 'reviews', label: 'Reviews & Ratings', icon: <FaStar /> }
      ]
    },
    {
      title: 'আর্থিক',
      items: [
        { id: 'finance', label: 'Financial Management', icon: <FaMoneyBillTrendUp /> },
        { id: 'pnl', label: 'Profit & Loss', icon: <FaScaleBalanced /> }
      ]
    },
    {
      title: 'যোগাযোগ',
      items: [
        { id: 'notifications', label: 'Notifications', icon: <FaBell /> }
      ]
    },
    {
      title: 'কন্টেন্ট',
      items: [
        { id: 'gallery', label: 'ফটো গ্যালারি', icon: <FaImages /> },
        { id: 'designs', label: 'ডিজাইন গ্যালারি', icon: <FaPalette /> },
        { id: 'cms', label: 'Content Management', icon: <FaPenToSquare /> },
        { id: 'seo', label: 'SEO & Marketing', icon: <FaMagnifyingGlassChart /> }
      ]
    },
    {
      title: 'সিস্টেম',
      items: [
        { id: 'calendar', label: 'Calendar & Tasks', icon: <FaCalendarDays /> },
        { id: 'backup', label: 'Data & Backup', icon: <FaDatabase /> },
        { id: 'settings', label: 'সেটিংস', icon: <FaGear /> },
        { id: 'help', label: 'Help Center', icon: <FaCircleQuestion /> }
      ]
    },
    {
      title: 'প্রোফাইল',
      items: [
        { id: 'profile', label: 'Store Profile', icon: <FaStore /> },
        { id: 'logout', label: 'লগআউট', icon: <FaRightFromBracket />, onClick: handleLogout }
      ]
    }
  ];

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
        {navGroups.map((group, gIdx) => (
          <div key={gIdx} className={styles.navGroup}>
            <div className={styles.sectionLabel}>{group.title}</div>
            {group.items.map(item => (
              <button 
                key={item.id}
                className={`${styles.navItem} ${activeTab === item.id ? styles.active : ''}`} 
                onClick={item.onClick || (() => setActiveTab(item.id))}
              >
                {item.icon} 
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`${styles.badge} ${item.badgeType === 'honey' ? styles.honeyBadge : ''} ${item.badgeType === 'honey' ? styles.pulse : ''}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

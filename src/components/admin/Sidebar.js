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
  FaImages,
  FaGift
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
        { id: 'inventory', label: 'ইনভেন্টরি ম্যানেজমেন্ট', icon: <FaBoxesStacked /> }
      ]
    },
    {
      title: 'অর্ডার ব্যবস্থাপনা',
      items: [
        { id: 'orders', label: 'অর্ডার তালিকা', icon: <FaClipboardList />, badge: activeOrdersCount, badgeType: 'honey' },
        { id: 'create-order', label: 'নতুন অর্ডার', icon: <FaCirclePlus /> },
        { id: 'delivery', label: 'ডেলিভারি ম্যানেজমেন্ট', icon: <FaTruckFast /> },
        { id: 'order-stages', label: 'অর্ডার স্টেজ ব্যবস্থাপনা', icon: <FaListCheck />, badge: stagesCount }
      ]
    },
    {
      title: 'গ্রাহক ব্যবস্থাপনা',
      items: [
        { id: 'customers', label: 'গ্রাহক ব্যবস্থাপনা', icon: <FaUsers /> },
        { id: 'reviews', label: 'রিভিউ ও রেটিং', icon: <FaStar /> }
      ]
    },
    {
      title: 'আর্থিক',
      items: [
        { id: 'pnl', label: 'আর্থিক ব্যবস্থাপনা', icon: <FaScaleBalanced /> }
      ]
    },
    {
      title: 'যোগাযোগ',
      items: [
        { id: 'notifications', label: 'নোটিফিকেশন', icon: <FaBell /> }
      ]
    },
    {
      title: 'কন্টেন্ট',
      items: [
        { id: 'gallery', label: 'ফটো গ্যালারি', icon: <FaImages /> },
        { id: 'designs', label: 'ডিজাইন গ্যালারি', icon: <FaPalette /> },
        { id: 'promotional-popups', label: 'প্রোমোশনাল পপআপ', icon: <FaGift /> },
        { id: 'cms', label: 'কন্টেন্ট ম্যানেজমেন্ট', icon: <FaPenToSquare /> },
        { id: 'seo', label: 'SEO ও মার্কেটিং', icon: <FaMagnifyingGlassChart /> }
      ]
    },
    {
      title: 'সিস্টেম',
      items: [
        { id: 'calendar', label: 'ক্যালেন্ডার ও টাস্কস', icon: <FaCalendarDays /> },
        { id: 'backup', label: 'ডেটা ব্যাকআপ', icon: <FaDatabase /> },
        { id: 'settings', label: 'সেটিংস', icon: <FaGear /> },
        { id: 'help', label: 'হেল্প সেন্টার', icon: <FaCircleQuestion /> }
      ]
    },
    {
      title: 'প্রোফাইল',
      items: [
        { id: 'profile', label: 'স্টোর প্রোফাইল', icon: <FaStore /> },
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

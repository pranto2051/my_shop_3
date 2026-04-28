'use client';

import React, { useState } from 'react';
import { useAdmin, getOrderProgress } from '@/app/context/AdminContext';
import styles from './OrdersPanel.module.css';
import { FaPlus, FaPhone, FaClipboardList, FaCheckCircle, FaBan, FaCalendarDay } from 'react-icons/fa6';

export default function OrdersPanel({ openCreateModal, openOrderDetail }) {
  const { state, dispatch } = useAdmin();
  const { orders, orderStages, orderFilter, orderSearch } = state;

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerPhone.includes(orderSearch) || 
                          order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
                          order.customerName.toLowerCase().includes(orderSearch.toLowerCase());
    
    const matchesFilter = orderFilter === 'all' || order.status === orderFilter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    active: orders.filter(o => o.status === 'active').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    today: orders.filter(o => new Date(o.createdAt).toDateString() === new Date().toDateString()).length
  };

  const handleSearch = (e) => {
    dispatch({ type: 'SET_ORDER_SEARCH', payload: e.target.value });
  };

  const handleFilter = (filter) => {
    dispatch({ type: 'SET_ORDER_FILTER', payload: filter });
  };

  const getStageColor = (stageId) => {
    const stage = orderStages.find(s => s.id === stageId);
    return stage ? stage.color : 'var(--stage-pending)';
  };

  const getStageName = (stageId) => {
    const stage = orderStages.find(s => s.id === stageId);
    return stage ? stage.name : 'অজানা';
  };

  const getStageIcon = (stageId) => {
    // For simplicity, returning a default icon if not found
    return <FaClipboardList size={12} />;
  };

  return (
    <div className={styles.panelContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>অর্ডার তালিকা</h1>
          <p className={styles.subtitle}>{stats.active}টি সক্রিয় অর্ডার</p>
        </div>
        <button className={styles.createBtn} onClick={openCreateModal}>
          <FaPlus /> <span>নতুন অর্ডার গ্রহণ</span>
        </button>
      </header>

      <div className={styles.statsRow}>
        <div className={`${styles.statCard} ${styles.activeStat}`}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>সক্রিয়</span>
            <span className={styles.statValue}>{stats.active}</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.completedStat}`}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>সম্পন্ন</span>
            <span className={styles.statValue}>{stats.completed}</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.cancelledStat}`}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>বাতিল</span>
            <span className={styles.statValue}>{stats.cancelled}</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.todayStat}`}>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>আজকের</span>
            <span className={styles.statValue}>{stats.today}</span>
          </div>
        </div>
      </div>

      <div className={styles.filterRow}>
        <div className={styles.filterTabs}>
          {['all', 'active', 'completed', 'cancelled'].map(filter => (
            <button 
              key={filter}
              className={`${styles.filterTab} ${orderFilter === filter ? styles.activeTab : ''}`}
              onClick={() => handleFilter(filter)}
            >
              {filter === 'all' ? 'সব' : filter === 'active' ? 'সক্রিয়' : filter === 'completed' ? 'সম্পন্ন' : 'বাতিল'}
              <span className={styles.count}>({orders.filter(o => filter === 'all' || o.status === filter).length})</span>
            </button>
          ))}
        </div>

        <div className={styles.searchBox}>
          <FaPhone className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="মোবাইল নম্বর দিয়ে খুঁজুন..." 
            value={orderSearch}
            onChange={handleSearch}
          />
        </div>

        <div className={styles.sortDropdown}>
          <select>
            <option>সর্বশেষ আগে</option>
            <option>পুরনো আগে</option>
            <option>স্টেজ অনুযায়ী</option>
          </select>
        </div>
      </div>

      <div className={styles.orderGrid}>
        {filteredOrders.map(order => {
          const progress = getOrderProgress(order, orderStages);
          const stageColor = getStageColor(order.currentStageId);
          
          return (
            <div 
              key={order.id} 
              className={styles.orderCard} 
              style={{ borderLeftColor: stageColor }}
              onClick={() => openOrderDetail(order)}
            >
              <div className={styles.cardTop}>
                <div className={styles.idBadge}>#{order.id}</div>
                <div 
                  className={styles.statusBadge} 
                  style={{ backgroundColor: `${stageColor}15`, color: stageColor }}
                >
                  {getStageIcon(order.currentStageId)}
                  <span>{getStageName(order.currentStageId)}</span>
                </div>
              </div>

              <div className={styles.customerName}>{order.customerName}</div>

              <div className={styles.cardMiddle}>
                <div className={styles.productInfo}>
                  <img src={order.productImage} alt={order.productName} className={styles.productThumb} />
                  <div>
                    <div className={styles.pName}>{order.productName}</div>
                    <div className={styles.pQty}>×{order.quantity}</div>
                  </div>
                </div>
                <div className={styles.customerPhone}>
                  <FaPhone size={12} />
                  <span>{order.customerPhone}</span>
                </div>
              </div>

              <div className={styles.progressSection}>
                <div className={styles.progressLabel}>
                  <span>অগ্রগতি</span>
                  <span>{order.currentStageIndex + 1} / {orderStages.filter(s => s.id !== 'stage_010').length} ধাপ</span>
                </div>
                <div className={styles.progressBarTrack}>
                  <div 
                    className={styles.progressBarFill} 
                    style={{ 
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${stageColor}, ${stageColor}aa)`
                    }}
                  />
                  {orderStages.filter(s => s.id !== 'stage_010').map((stage, idx) => (
                    <div 
                      key={stage.id} 
                      className={`${styles.stageDot} ${idx <= order.currentStageIndex ? styles.completedDot : ''} ${idx === order.currentStageIndex ? styles.pulsingDot : ''}`}
                      style={{ 
                        left: `${(idx / (orderStages.filter(s => s.id !== 'stage_010').length - 1)) * 100}%`,
                        borderColor: idx === order.currentStageIndex ? stageColor : 'transparent',
                        backgroundColor: idx < order.currentStageIndex ? stageColor : idx === order.currentStageIndex ? 'white' : 'var(--linen-dark)'
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.cardBottom}>
                <div className={styles.dateInfo}>
                  <div className={styles.dateItem}>অর্ডার: {new Date(order.createdAt).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long' })}</div>
                  <div className={styles.dateItem} style={{ color: 'var(--accent)' }}>ডেলিভারি: {new Date(order.estimatedDelivery).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long' })}</div>
                </div>
                <div className={styles.amountInfo}>
                  <div className={styles.totalAmount}>৳{order.totalPrice.toLocaleString('bn-BD')}</div>
                  <div className={styles.paidAmount}>অগ্রিম: ৳{order.advancePaid.toLocaleString('bn-BD')}</div>
                  <div className={styles.remainingAmount}>বাকি: ৳{order.remainingAmount.toLocaleString('bn-BD')}</div>
                </div>
              </div>

              <div className={styles.hoverActions}>
                <span>বিস্তারিত দেখুন ও আপডেট করুন →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

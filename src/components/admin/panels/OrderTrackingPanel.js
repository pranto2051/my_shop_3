'use client';

import React, { useState } from 'react';
import { useAdmin, getOrderProgress, getNextStage } from '@/app/context/AdminContext';
import styles from './OrderTrackingPanel.module.css';
import { FaMagnifyingGlass, FaPhone, FaList, FaCircleCheck, FaClock, FaChevronRight, FaTruck } from 'react-icons/fa6';

export default function OrderTrackingPanel() {
  const { state, dispatch } = useAdmin();
  const { orders, orderStages } = state;

  const [phone, setPhone] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showStageModal, setShowStageModal] = useState(false);
  const [stageNote, setStageNote] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!phone) return;

    setIsLoading(true);
    setError('');
    setSearchResult(null);
    setCustomerOrders([]);
    setSelectedOrder(null);

    setTimeout(() => {
      const foundOrders = orders.filter(order => order.customerPhone.includes(phone));

      if (foundOrders.length > 0) {
        setSearchResult(foundOrders[0]);
        setCustomerOrders(foundOrders);
        setSelectedOrder(foundOrders[0]);
      } else {
        setError('দুঃখিত, এই মোবাইল নাম্বারে কোনো অর্ডার পাওয়া যায়নি।');
      }
      setIsLoading(false);
    }, 500);
  };

  const getStageColor = (stageId) => {
    const stage = orderStages.find(s => s.id === stageId);
    return stage ? stage.color : 'var(--stage-pending)';
  };

  const getStageName = (stageId) => {
    const stage = orderStages.find(s => s.id === stageId);
    return stage ? stage.name : 'অজানা';
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStageUpdate = (orderId) => {
    const nextStage = getNextStage(selectedOrder, orderStages);
    if (!nextStage) return;

    dispatch({
      type: 'UPDATE_ORDER_STAGE',
      payload: {
        orderId: orderId,
        stageId: nextStage.id,
        stageIndex: nextStage.order - 1
      }
    });

    dispatch({
      type: 'ADD_STAGE_HISTORY',
      payload: {
        orderId: orderId,
        historyItem: {
          stageId: nextStage.id,
          stageName: nextStage.name,
          timestamp: new Date().toISOString(),
          adminNote: stageNote || nextStage.name + ' ধাপে আপডেট করা হয়েছে।',
          completedBy: 'Admin'
        }
      }
    });

    setStageNote('');
    setShowStageModal(false);

    const updatedOrder = orders.find(o => o.id === orderId);
    if (updatedOrder) {
      setSelectedOrder({ ...updatedOrder, currentStageId: nextStage.id, currentStageIndex: nextStage.order - 1 });
    }
  };

  const nextStage = selectedOrder ? getNextStage(selectedOrder, orderStages) : null;

  return (
    <div className={styles.panelContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>অর্ডার ট্র্যাকিং</h1>
          <p className={styles.subtitle}>গ্রাহকের অর্ডার খুঁজুন এবং আপডেট করুন</p>
        </div>
      </header>

      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.inputGroup}>
            <div className={styles.icon}><FaPhone /></div>
            <input
              type="tel"
              placeholder="গ্রাহকের মোবাইল নাম্বার দিন..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit" className={styles.searchBtn} disabled={isLoading}>
              {isLoading ? 'খোঁজা হচ্ছে...' : <><FaMagnifyingGlass /> খুঁজুন</>}
            </button>
          </div>
        </form>
        {error && <p className={styles.errorMsg}>{error}</p>}
      </div>

      {searchResult && (
        <div className={styles.resultSection}>
          <div className={styles.customerHeader}>
            <div className={styles.customerInfo}>
              <h2 className={styles.customerName}>{searchResult.customerName}</h2>
              <p className={styles.customerPhone}><FaPhone size={14} /> {searchResult.customerPhone}</p>
              <p className={styles.totalOrders}>
                <FaList size={14} /> মোট {customerOrders.length}টি অর্ডার
              </p>
            </div>
          </div>

          <div className={styles.ordersTabs}>
            {customerOrders.map((order, index) => (
              <button
                key={order.id}
                className={`${styles.orderTab} ${selectedOrder?.id === order.id ? styles.activeTab : ''}`}
                onClick={() => setSelectedOrder(order)}
              >
                <span className={styles.tabOrderId}>#{order.id}</span>
                <span className={styles.tabProduct}>{order.productName.substring(0, 15)}...</span>
                <span
                  className={styles.tabStatus}
                  style={{
                    backgroundColor: `${getStageColor(order.currentStageId)}15`,
                    color: getStageColor(order.currentStageId)
                  }}
                >
                  {order.status === 'completed' ? 'সম্পন্ন' : order.status === 'cancelled' ? 'বাতিল' : 'চলমান'}
                </span>
              </button>
            ))}
          </div>

          {selectedOrder && (
            <div className={styles.orderDetail}>
              <div className={styles.orderDetailHeader}>
                <div className={styles.orderIdSection}>
                  <span className={styles.orderIdLabel}>অর্ডার আইডি</span>
                  <strong className={styles.orderIdValue}>#{selectedOrder.id}</strong>
                </div>
                <div className={styles.orderStatusSection}>
                  <span
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: `${getStageColor(selectedOrder.currentStageId)}15`,
                      color: getStageColor(selectedOrder.currentStageId),
                      borderColor: getStageColor(selectedOrder.currentStageId)
                    }}
                  >
                    <FaCircleCheck size={14} />
                    {getStageName(selectedOrder.currentStageId)}
                  </span>
                </div>
              </div>

              <div className={styles.orderInfoGrid}>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>পণ্যের নাম</span>
                  <span className={styles.infoValue}>{selectedOrder.productName}</span>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>পরিমাণ</span>
                  <span className={styles.infoValue}>×{selectedOrder.quantity}</span>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>মোট মূল্য</span>
                  <span className={styles.infoValue}>৳{selectedOrder.totalPrice.toLocaleString('bn-BD')}</span>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>অগ্রিম</span>
                  <span className={styles.infoValue}>৳{selectedOrder.advancePaid.toLocaleString('bn-BD')}</span>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>বাকি</span>
                  <span className={styles.infoValue}>৳{selectedOrder.remainingAmount.toLocaleString('bn-BD')}</span>
                </div>
                <div className={styles.infoCard}>
                  <span className={styles.infoLabel}>ডেলিভারি</span>
                  <span className={styles.infoValue}>
                    <FaTruck size={12} style={{ marginRight: '4px' }} />
                    {formatDate(selectedOrder.estimatedDelivery)}
                  </span>
                </div>
              </div>

              <div className={styles.deliveryAddress}>
                <span className={styles.infoLabel}>ডেলিভারি ঠিকানা</span>
                <p className={styles.addressText}>{selectedOrder.deliveryAddress}</p>
              </div>

              {selectedOrder.orderNote && (
                <div className={styles.orderNote}>
                  <span className={styles.infoLabel}>অর্ডার নোট</span>
                  <p className={styles.noteText}>{selectedOrder.orderNote}</p>
                </div>
              )}

              <div className={styles.timelineSection}>
                <h3 className={styles.sectionTitle}>
                  <FaList size={16} /> অর্ডারের ইতিহাস
                </h3>
                <div className={styles.timeline}>
                  {selectedOrder.stageHistory.map((history, index) => (
                    <div key={index} className={styles.timelineItem}>
                      <div
                        className={styles.timelineDot}
                        style={{ backgroundColor: getStageColor(history.stageId) }}
                      />
                      <div className={styles.timelineContent}>
                        <div className={styles.timelineHeader}>
                          <span className={styles.timelineStage}>{history.stageName}</span>
                          <span className={styles.timelineDate}>
                            <FaClock size={12} /> {formatDateTime(history.timestamp)}
                          </span>
                        </div>
                        <p className={styles.timelineNote}>{history.adminNote}</p>
                        <span className={styles.timelineAdmin}>by {history.completedBy}</span>
                      </div>
                      {index < selectedOrder.stageHistory.length - 1 && (
                        <div className={styles.timelineLine} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.progressSection}>
                <h3 className={styles.sectionTitle}>অগ্রগতি</h3>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressFill}
                    style={{
                      width: `${getOrderProgress(selectedOrder, orderStages)}%`,
                      backgroundColor: getStageColor(selectedOrder.currentStageId)
                    }}
                  />
                </div>
                <div className={styles.progressStages}>
                  {orderStages.filter(s => s.id !== 'stage_010').map((stage, idx) => (
                    <div
                      key={stage.id}
                      className={`${styles.stageItem} ${idx <= selectedOrder.currentStageIndex ? styles.completedStage : ''} ${idx === selectedOrder.currentStageIndex ? styles.currentStage : ''}`}
                    >
                      <div
                        className={styles.stageIndicator}
                        style={{
                          backgroundColor: idx <= selectedOrder.currentStageIndex ? stage.color : 'var(--linen-dark)',
                          borderColor: idx === selectedOrder.currentStageIndex ? stage.color : 'transparent'
                        }}
                      />
                      <span className={styles.stageName}>{stage.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOrder.status === 'active' && nextStage && (
                <div className={styles.updateSection}>
                  <h3 className={styles.sectionTitle}>অর্ডার আপডেট করুন</h3>
                  <div className={styles.nextStageInfo}>
                    <span className={styles.nextStageLabel}>পরবর্তী ধাপ:</span>
                    <span
                      className={styles.nextStageName}
                      style={{ color: nextStage.color }}
                    >
                      <FaChevronRight size={14} /> {nextStage.name}
                    </span>
                  </div>
                  <textarea
                    className={styles.noteInput}
                    placeholder="এই ধাপ সম্পর্কে নোট লিখুন (ঐচ্ছিক)..."
                    value={stageNote}
                    onChange={(e) => setStageNote(e.target.value)}
                    rows={3}
                  />
                  <button
                    className={styles.updateBtn}
                    style={{ backgroundColor: nextStage.color }}
                    onClick={() => handleStageUpdate(selectedOrder.id)}
                  >
                    <FaCircleCheck size={16} /> {nextStage.name} এ আপডেট করুন
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {!searchResult && !error && (
        <div className={styles.emptyState}>
          <FaMagnifyingGlass size={48} className={styles.emptyIcon} />
          <p>মোবাইল নাম্বার দিয়ে গ্রাহকের অর্ডার খুঁজুন</p>
        </div>
      )}
    </div>
  );
}
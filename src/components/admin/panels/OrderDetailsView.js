'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin, getOrderProgress, getNextStage } from '@/app/context/AdminContext';
import styles from './OrderDetailsView.module.css';
import { 
  FaXmark, FaPhone, FaLocationDot, FaCalendar, FaTruck, 
  FaNoteSticky, FaCheck, FaFloppyDisk, FaWhatsapp, FaPenToSquare,
  FaBan, FaCircleInfo, FaClipboardList, FaUser, FaMoneyBillWave,
  FaBoxesStacked, FaClockRotateLeft, FaCircleCheck
} from 'react-icons/fa6';

export default function OrderDetailsView({ order: initialOrder, onClose }) {
  const { state, dispatch } = useAdmin();
  const { orderStages, orders } = state;
  
  // Find the current order from state to ensure real-time updates
  const order = orders.find(o => o.id === initialOrder.id) || initialOrder;
  
  const [adminNote, setAdminNote] = useState('');
  const [selectedStageId, setSelectedStageId] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (order) {
      const nextStage = getNextStage(order, orderStages);
      setSelectedStageId(nextStage ? nextStage.id : order.currentStageId);
      setAdminNote('');
    }
  }, [order.id, orderStages]); // Use order.id to avoid infinite loops if order object changes

  if (!order) return null;

  const progress = getOrderProgress(order, orderStages);
  const currentStage = orderStages.find(s => s.id === order.currentStageId);
  const nextStage = orderStages.find(s => s.id === selectedStageId);

  const handleUpdate = () => {
    if (!selectedStageId) return;

    setIsUpdating(true);
    
    const stageIndex = orderStages.findIndex(s => s.id === selectedStageId);
    const stageName = orderStages.find(s => s.id === selectedStageId).name;

    // 1. Update order stage
    dispatch({
      type: 'UPDATE_ORDER_STAGE',
      payload: {
        orderId: order.id,
        stageId: selectedStageId,
        stageIndex: stageIndex
      }
    });

    // 2. Add to history
    dispatch({
      type: 'ADD_STAGE_HISTORY',
      payload: {
        orderId: order.id,
        historyItem: {
          stageId: selectedStageId,
          stageName: stageName,
          timestamp: new Date().toISOString(),
          adminNote: adminNote || `${stageName} ধাপে আপডেট করা হয়েছে।`,
          completedBy: 'Admin'
        }
      }
    });

    // 3. Show success UI
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    setIsUpdating(false);
    setAdminNote('');
  };

  const handleCancelOrder = () => {
    if (confirm('আপনি কি নিশ্চিত যে এই অর্ডারটি বাতিল করতে চান?')) {
      dispatch({
        type: 'CANCEL_ORDER',
        payload: { orderId: order.id }
      });
      alert('অর্ডার বাতিল করা হয়েছে ❌');
      onClose();
    }
  };

  const handleWhatsApp = () => {
    const message = `আসসালামু আলাইকুম ${order.customerName}! 🙏
আপনার অর্ডার (ID: ${order.id}) আপডেট:
বর্তমান পর্যায়: ${currentStage.name}
বিবরণ: ${adminNote || 'কাজ চলছে।'}
মা ফার্নিচার — +8801729728818`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/880${order.customerPhone.substring(1)}?text=${encodedMessage}`, '_blank');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('কপি করা হয়েছে!');
  };

  const templates = [
    "কাজ শুরু হয়েছে",
    "আরও ২ দিন লাগবে",
    "প্রায় শেষ",
    "প্যাকেজিং হচ্ছে",
    "ডেলিভারির জন্য প্রস্তুত"
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.modal}>
        {showSuccess && (
          <div className={styles.successToast}>
            <FaCircleCheck className={styles.successIcon} />
            <span>অর্ডার আপডেট সফল হয়েছে!</span>
          </div>
        )}
        <header className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.idBadge}>#{order.id}</div>
            <h2 className={styles.headerTitle}>অর্ডার বিবরণ ও আপডেট</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaXmark />
          </button>
        </header>

        <div className={styles.content}>
          {/* Main Grid Layout */}
          <div className={styles.mainGrid}>
            
            {/* Left Column: Info Cards */}
            <div className={styles.infoCol}>
              {/* Customer Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <FaUser className={styles.cardIcon} />
                  <h3>গ্রাহকের তথ্য</h3>
                </div>
                <div className={styles.customerInfo}>
                  <div className={styles.customerName}>{order.customerName}</div>
                  <div className={styles.phoneRow} onClick={() => copyToClipboard(order.customerPhone)}>
                    <FaPhone size={14} className={styles.icon} />
                    <span className={styles.phoneText}>{order.customerPhone}</span>
                  </div>
                  <div className={styles.addressRow}>
                    <FaLocationDot className={styles.icon} />
                    <span>{order.deliveryAddress}</span>
                  </div>
                  <button className={styles.waBtn} onClick={handleWhatsApp}>
                    <FaWhatsapp /> WhatsApp এ জানান
                  </button>
                </div>
              </div>

              {/* Order Stats Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <FaClipboardList className={styles.cardIcon} />
                  <h3>অর্ডার পরিসংখ্যান</h3>
                </div>
                <div className={styles.statsList}>
                  <div className={styles.statItem}>
                    <FaCalendar className={styles.icon} />
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>অর্ডার তারিখ</span>
                      <span className={styles.statValue}>{new Date(order.createdAt).toLocaleDateString('bn-BD')}</span>
                    </div>
                  </div>
                  <div className={styles.statItem}>
                    <FaTruck className={styles.icon} />
                    <div className={styles.statContent}>
                      <span className={styles.statLabel}>ডেলিভারি তারিখ</span>
                      <span className={styles.statValue}>{new Date(order.estimatedDelivery).toLocaleDateString('bn-BD')}</span>
                    </div>
                  </div>
                  {order.orderNote && (
                    <div className={styles.statItem}>
                      <FaNoteSticky className={styles.icon} />
                      <div className={styles.statContent}>
                        <span className={styles.statLabel}>বিশেষ নোট</span>
                        <span className={styles.statValue}>{order.orderNote}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Card */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <FaBoxesStacked className={styles.cardIcon} />
                  <h3>পণ্য ও পেমেন্ট</h3>
                </div>
                <div className={styles.productDetails}>
                  <div className={styles.productMain}>
                    <img src={order.productImage} alt={order.productName} className={styles.productThumb} />
                    <div className={styles.productInfo}>
                      <div className={styles.pName}>{order.productName}</div>
                      <div className={styles.pQty}>পরিমাণ: {order.quantity}টি</div>
                    </div>
                  </div>
                  <div className={styles.paymentGrid}>
                    <div className={styles.paymentItem}>
                      <span>মোট মূল্য</span>
                      <span className={styles.totalVal}>৳{order.totalPrice.toLocaleString('bn-BD')}</span>
                    </div>
                    <div className={styles.paymentItem}>
                      <span>অগ্রিম</span>
                      <span className={styles.advanceVal}>৳{order.advancePaid.toLocaleString('bn-BD')}</span>
                    </div>
                    <div className={styles.paymentItem}>
                      <span>বাকি</span>
                      <span className={styles.remainingVal}>৳{order.remainingAmount.toLocaleString('bn-BD')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Progress & Update */}
            <div className={styles.updateCol}>
              {/* Progress Timeline */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <FaClockRotateLeft className={styles.cardIcon} />
                  <h3>কাজের অগ্রগতি ({progress}%)</h3>
                </div>
                
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill} 
                    style={{ width: `${progress}%`, backgroundColor: currentStage?.color }} 
                  />
                </div>

                <div className={styles.timeline}>
                  {orderStages.filter(s => s.id !== 'stage_010').map((stage, index) => {
                    const isCompleted = index < order.currentStageIndex;
                    const isCurrent = index === order.currentStageIndex;
                    const history = order.stageHistory.find(h => h.stageId === stage.id);

                    return (
                      <div key={stage.id} className={`${styles.timelineItem} ${isCompleted ? styles.completed : isCurrent ? styles.current : ''}`}>
                        <div className={styles.timelineMarker}>
                          <div className={styles.timelineCircle} style={{ 
                            backgroundColor: isCompleted ? 'var(--stage-approved)' : isCurrent ? stage.color : 'transparent',
                            borderColor: isCompleted ? 'var(--stage-approved)' : isCurrent ? stage.color : 'var(--border)'
                          }}>
                            {isCompleted && <FaCheck size={10} color="white" />}
                          </div>
                          {index < orderStages.filter(s => s.id !== 'stage_010').length - 1 && (
                            <div className={`${styles.timelineLine} ${isCompleted ? styles.lineSolid : ''}`} />
                          )}
                        </div>
                        <div className={styles.timelineContent}>
                          <div className={styles.stageTitle}>
                            <span className={styles.stageName}>{stage.name}</span>
                            {isCurrent && <span className={styles.currentBadge} style={{backgroundColor: stage.color}}>বর্তমান</span>}
                            {history && <span className={styles.timestamp}>{new Date(history.timestamp).toLocaleDateString('bn-BD')}</span>}
                          </div>
                          {history && (
                            <div className={styles.historyNote}>
                              <p>{history.adminNote}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Update Form */}
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <FaFloppyDisk className={styles.cardIcon} />
                  <h3>অবস্থা আপডেট করুন</h3>
                </div>
                
                <div className={styles.updateForm}>
                  <div className={styles.stageSelection}>
                    <label>নতুন পর্যায় নির্বাচন করুন</label>
                    <div className={styles.stagePills}>
                      {orderStages.map(stage => (
                        <button 
                          key={stage.id}
                          className={`${styles.stagePill} ${selectedStageId === stage.id ? styles.activePill : ''}`}
                          style={{ '--pill-color': stage.color }}
                          onClick={() => setSelectedStageId(stage.id)}
                        >
                          {stage.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.noteArea}>
                    <label>আপডেট নোট লিখুন</label>
                    <textarea 
                      placeholder="কাজের বর্তমান অবস্থা লিখুন..."
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      rows={3}
                    />
                    <div className={styles.templates}>
                      {templates.map(tmp => (
                        <button key={tmp} className={styles.templateBtn} onClick={() => setAdminNote(tmp)}>
                          {tmp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={styles.actionRow}>
                    <button 
                      className={styles.saveBtn} 
                      onClick={handleUpdate}
                      disabled={isUpdating}
                    >
                      {isUpdating ? 'আপডেট হচ্ছে...' : 'আপডেট সংরক্ষণ করুন'}
                    </button>
                    <div className={styles.secondaryActions}>
                      <button className={styles.editBtn}>
                        <FaPenToSquare />
                      </button>
                      <button className={styles.cancelBtn} onClick={handleCancelOrder}>
                        <FaBan />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

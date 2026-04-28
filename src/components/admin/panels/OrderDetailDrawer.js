'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin, getOrderProgress, getNextStage } from '@/app/context/AdminContext';
import styles from './OrderDetailDrawer.module.css';
import { 
  FaXmark, FaPhone, FaLocationDot, FaCalendar, FaTruck, 
  FaNoteSticky, FaCheck, FaFloppyDisk, FaWhatsapp, FaPenToSquare,
  FaBan, FaCircleInfo
} from 'react-icons/fa6';

export default function OrderDetailDrawer({ order, onClose }) {
  const { state, dispatch } = useAdmin();
  const { orderStages } = state;
  const [adminNote, setAdminNote] = useState('');
  const [selectedStageId, setSelectedStageId] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (order) {
      const nextStage = getNextStage(order, orderStages);
      setSelectedStageId(nextStage ? nextStage.id : order.currentStageId);
      setAdminNote('');
    }
  }, [order, orderStages]);

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

    // 3. Show success toast (simulated here)
    alert('অর্ডার আপডেট সফল হয়েছে ✅');
    
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
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.drawer}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.orderId}>#{order.id}</span>
            <span 
              className={styles.statusBadge} 
              style={{ backgroundColor: `${currentStage?.color}15`, color: currentStage?.color }}
            >
              {currentStage?.name}
            </span>
          </div>
          <h2 className={styles.headerTitle}>অর্ডার বিবরণ ও আপডেট</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaXmark />
          </button>
        </header>

        <div className={styles.body}>
          {/* Section 1: Customer Info */}
          <section className={styles.section}>
            <div className={styles.customerCard}>
              <div className={styles.cardCol}>
                <label className={styles.label}>👤 গ্রাহকের নাম</label>
                <div className={styles.customerName}>{order.customerName}</div>
                <div className={styles.phoneRow} onClick={() => copyToClipboard(order.customerPhone)}>
                  <FaPhone size={14} className={styles.icon} />
                  <span className={styles.phoneText}>{order.customerPhone}</span>
                </div>
                <button className={styles.waBtn} onClick={handleWhatsApp}>
                  <FaWhatsapp /> WhatsApp এ জানান
                </button>
              </div>
              <div className={styles.cardCol}>
                <div className={styles.infoRow}>
                  <FaLocationDot className={styles.icon} />
                  <span>{order.deliveryAddress}</span>
                </div>
                <div className={styles.infoRow}>
                  <FaCalendar className={styles.icon} />
                  <span>অর্ডার: {new Date(order.createdAt).toLocaleDateString('bn-BD')}</span>
                </div>
                <div className={styles.infoRow}>
                  <FaTruck className={styles.icon} />
                  <span className={styles.accentText}>ডেলিভারি: {new Date(order.estimatedDelivery).toLocaleDateString('bn-BD')}</span>
                </div>
                {order.orderNote && (
                  <div className={styles.noteRow}>
                    <FaNoteSticky className={styles.icon} />
                    <span className={styles.italic}>{order.orderNote}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Section 2: Product Info */}
          <section className={styles.section}>
            <div className={styles.productCard}>
              <div className={styles.productHeader}>
                <img src={order.productImage} alt={order.productName} className={styles.productThumb} />
                <div className={styles.productMain}>
                  <div className={styles.pName}>{order.productName}</div>
                  <div className={styles.pId}>ID: {order.productId}</div>
                  <div className={styles.pQty}>পরিমাণ: {order.quantity}টি</div>
                </div>
              </div>
              <div className={styles.priceGrid}>
                <div className={styles.priceItem}>
                  <span>মোট মূল্য</span>
                  <span className={styles.valWalnut}>৳{order.totalPrice.toLocaleString('bn-BD')}</span>
                </div>
                <div className={styles.priceItem}>
                  <span>অগ্রিম প্রদত্ত</span>
                  <span className={styles.valMoss}>৳{order.advancePaid.toLocaleString('bn-BD')}</span>
                </div>
                <div className={styles.priceItem}>
                  <span>বাকি পরিমাণ</span>
                  <span className={styles.valSienna}>৳{order.remainingAmount.toLocaleString('bn-BD')}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Progress Timeline */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>কাজের অগ্রগতি</h3>
              <div className={styles.progressPercent}>{progress}%</div>
            </div>
            
            <div className={styles.progressBarLarge}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${progress}%`, background: currentStage?.color }} 
              />
            </div>

            <div className={styles.timeline}>
              {orderStages.filter(s => s.id !== 'stage_010').map((stage, index) => {
                const isCompleted = index < order.currentStageIndex;
                const isCurrent = index === order.currentStageIndex;
                const history = order.stageHistory.find(h => h.stageId === stage.id);

                return (
                  <div key={stage.id} className={`${styles.timelineItem} ${isCompleted ? styles.completed : isCurrent ? styles.current : ''}`}>
                    <div className={styles.timelineLeft}>
                      <div className={styles.timelineCircle} style={{ 
                        backgroundColor: isCompleted ? 'var(--stage-approved)' : isCurrent ? stage.color : 'transparent',
                        borderColor: isCompleted ? 'var(--stage-approved)' : isCurrent ? stage.color : 'var(--linen-dark)'
                      }}>
                        {isCompleted && <FaCheck size={12} color="white" />}
                      </div>
                      {index < orderStages.filter(s => s.id !== 'stage_010').length - 1 && (
                        <div className={`${styles.timelineLine} ${isCompleted ? styles.lineSolid : styles.lineDashed}`} />
                      )}
                    </div>
                    <div className={styles.timelineRight}>
                      <div className={styles.stageHeader}>
                        <span className={styles.stageName} style={{ color: isCurrent ? stage.color : isCompleted ? 'var(--stage-approved)' : 'inherit' }}>
                          {stage.name}
                        </span>
                        {isCurrent && <span className={styles.currentBadge}>বর্তমান পর্যায়</span>}
                        {history && <span className={styles.timestamp}>{new Date(history.timestamp).toLocaleString('bn-BD')}</span>}
                      </div>
                      
                      {history && (
                        <div className={styles.historyNote} style={{ borderLeftColor: isCompleted ? 'var(--stage-approved)' : stage.color }}>
                          <p>{history.adminNote}</p>
                          <span className={styles.completedBy}>Completed by {history.completedBy}</span>
                        </div>
                      )}

                      {!history && !isCurrent && (
                        <span className={styles.pendingText}>অপেক্ষায়...</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 4: Admin Update Form */}
          <section className={`${styles.section} ${styles.updateSection}`}>
            <h3 className={styles.sectionTitle}>অগ্রগতি আপডেট করুন</h3>
            
            <div className={styles.updateForm}>
              <div className={styles.nextStageLabel}>পরবর্তী পর্যায়:</div>
              {nextStage && (
                <div className={styles.nextStageCard} style={{ backgroundColor: `${nextStage.color}08`, borderColor: `${nextStage.color}30` }}>
                  <div className={styles.nextStageIcon} style={{ color: nextStage.color }}>
                    <FaCircleInfo size={20} />
                  </div>
                  <div className={styles.nextStageInfo}>
                    <div className={styles.nextStageName}>{nextStage.name}</div>
                    <div className={styles.nextStageDesc}>{nextStage.description}</div>
                  </div>
                </div>
              )}

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>পর্যায় পরিবর্তন করুন</label>
                <div className={styles.stagePills}>
                  {orderStages.map(stage => (
                    <button 
                      key={stage.id}
                      className={`${styles.stagePill} ${selectedStageId === stage.id ? styles.activePill : ''}`}
                      style={{ 
                        '--pill-color': stage.color,
                        borderColor: selectedStageId === stage.id ? stage.color : 'var(--linen-dark)'
                      }}
                      onClick={() => setSelectedStageId(stage.id)}
                    >
                      {stage.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>এই পর্যায়ের বিবরণ/নোট</label>
                <textarea 
                  className={styles.textarea}
                  rows={4}
                  placeholder="গ্রাহককে জানানোর জন্য আপডেট লিখুন..."
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  maxLength={300}
                />
                <div className={styles.charCount}>{adminNote.length}/৩০০</div>
              </div>

              <div className={styles.templates}>
                {templates.map(tmp => (
                  <button key={tmp} className={styles.templateBtn} onClick={() => setAdminNote(tmp)}>
                    {tmp}
                  </button>
                ))}
              </div>

              <button 
                className={styles.saveBtn} 
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                <FaFloppyDisk /> <span>{isUpdating ? 'সংরক্ষণ হচ্ছে...' : 'আপডেট সংরক্ষণ করুন'}</span>
              </button>

              <div className={styles.actionButtons}>
                <button className={styles.editBtn}>
                  <FaPenToSquare /> অর্ডার সম্পাদনা
                </button>
                <button className={styles.cancelBtn} onClick={handleCancelOrder}>
                  <FaBan /> অর্ডার বাতিল
                </button>
              </div>
            </div>
          </section>
        </div>

        <footer className={styles.footer}>
          <div className={styles.footerInfo}>
            <span>ID: {order.id}</span>
            <span>অর্ডার: {new Date(order.createdAt).toLocaleDateString('bn-BD')}</span>
          </div>
          <div className={styles.lastUpdated}>
            শেষ আপডেট: {new Date(order.updatedAt).toLocaleString('bn-BD')}
          </div>
        </footer>
      </div>
    </>
  );
}

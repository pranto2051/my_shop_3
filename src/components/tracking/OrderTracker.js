'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import styles from './OrderTracker.module.css';
import { FaMagnifyingGlass, FaPhone, FaTruckFast, FaCircleCheck } from 'react-icons/fa6';
import TrackingTimeline from './TrackingTimeline';

export default function OrderTracker() {
  const { state } = useAdmin();
  const { orders } = state;
  
  const [phone, setPhone] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!phone) return;
    
    setIsLoading(true);
    setError('');
    setTrackingResult(null);

    // Simulate network delay
    setTimeout(() => {
      const order = orders.find(o => o.customerPhone === phone);
      
      if (order) {
        setTrackingResult(order);
      } else {
        setError('দুঃখিত, এই মোবাইল নাম্বারে কোনো অর্ডার পাওয়া যায়নি।');
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.searchBox}>
        <h2 className={styles.title}>আপনার অর্ডার ট্র্যাক করুন</h2>
        <p className={styles.subtitle}>মোবাইল নাম্বার দিয়ে অর্ডারের বর্তমান অবস্থা জানুন</p>
        
        <form onSubmit={handleTrack} className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.icon}><FaPhone /></div>
            <input 
              type="tel" 
              placeholder="আপনার মোবাইল নাম্বার দিন..." 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? 'খোঁজা হচ্ছে...' : <><FaMagnifyingGlass /> খুঁজুন</>}
            </button>
          </div>
        </form>
        {error && <p className={styles.errorMsg}>{error}</p>}
      </div>

      {trackingResult && (
        <div className={styles.resultCard}>
          <div className={styles.orderHeader}>
            <div className={styles.orderId}>
              <span>অর্ডার আইডি:</span>
              <strong>#{trackingResult.id}</strong>
            </div>
            <div className={`${styles.statusBadge} ${styles[trackingResult.status]}`}>
              {trackingResult.status === 'active' ? 'চলমান' : 
               trackingResult.status === 'completed' ? 'সম্পন্ন' : 'বাতিল'}
            </div>
          </div>

          <div className={styles.orderInfo}>
            <div className={styles.infoItem}>
              <span className={styles.label}>গ্রাহকের নাম:</span>
              <span className={styles.value}>{trackingResult.customerName}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>পণ্য:</span>
              <span className={styles.value}>{trackingResult.productName}</span>
            </div>
          </div>

          <div className={styles.timelineSection}>
            <h3 className={styles.timelineTitle}>ডেলিভারি টাইমলাইন</h3>
            <TrackingTimeline order={trackingResult} />
          </div>

          <div className={styles.deliveryEstimate}>
            <FaTruckFast className={styles.truckIcon} />
            <div>
              <p>সম্ভাব্য ডেলিভারি তারিখ:</p>
              <strong>{new Date(trackingResult.estimatedDelivery).toLocaleDateString('bn-BD', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

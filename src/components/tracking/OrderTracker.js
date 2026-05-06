'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { supabase } from '@/lib/supabase';
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

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!phone) return;
    
    setIsLoading(true);
    setError('');
    setTrackingResult(null);

    try {
      // 1. Fetch order directly from Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select(`
          id, customerName:customer_name, customerPhone:customer_phone, 
          productName:product_name, productImage:product_image, 
          quantity, totalPrice:total_price, advancePaid:advance_paid, 
          remainingAmount:remaining_amount, deliveryAddress:delivery_address, 
          estimatedDelivery:estimated_delivery, status, currentStageId:current_stage_id,
          currentStageIndex:current_stage_index
        `)
        .eq('customer_phone', phone)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (orderError || !order) {
        setError('দুঃখিত, এই মোবাইল নাম্বারে কোনো অর্ডার পাওয়া যায়নি।');
        setIsLoading(false);
        return;
      }

      // 2. Fetch stage history for this order
      const { data: history, error: historyError } = await supabase
        .from('order_stage_history')
        .select('stageId:stage_id, stageName:stage_name, timestamp, adminNote:admin_note, completedBy:completed_by')
        .eq('order_id', order.id)
        .order('timestamp', { ascending: true });

      if (historyError) throw historyError;

      // 3. Combine data
      setTrackingResult({
        ...order,
        stageHistory: history || []
      });

    } catch (err) {
      console.error('Tracking error:', err);
      setError('অর্ডার ট্র্যাক করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
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

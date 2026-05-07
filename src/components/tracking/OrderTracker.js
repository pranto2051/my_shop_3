'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import { supabase } from '@/lib/supabase';
import styles from './OrderTracker.module.css';
import { FaMagnifyingGlass, FaPhone, FaTruckFast, FaCircleCheck, FaChevronLeft } from 'react-icons/fa6';
import TrackingTimeline from './TrackingTimeline';
import ReviewForm from './ReviewForm';

export default function OrderTracker() {
  const { state } = useAdmin();
  const { orders } = state;
  
  const [phone, setPhone] = useState('');
  const [ordersList, setOrdersList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!phone) return;
    
    setIsLoading(true);
    setError('');
    setOrdersList([]);
    setSelectedOrder(null);
    setHasReviewed(false);

    try {
      // 1. Fetch all orders for this phone number
      const { data: ordersData, error: ordersError } = await supabase
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
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      if (!ordersData || ordersData.length === 0) {
        setError('দুঃখিত, এই মোবাইল নাম্বারে কোনো অর্ডার পাওয়া যায়নি।');
        setIsLoading(false);
        return;
      }

      setOrdersList(ordersData);

    } catch (err) {
      console.error('Tracking error:', err);
      setError('অর্ডার ট্র্যাক করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  const selectOrder = async (order) => {
    setIsDetailLoading(true);
    setHasReviewed(false);
    
    try {
      // 1. Fetch stage history for this specific order
      const { data: history, error: historyError } = await supabase
        .from('order_stage_history')
        .select('stageId:stage_id, stageName:stage_name, timestamp, adminNote:admin_note, completedBy:completed_by')
        .eq('order_id', order.id)
        .order('timestamp', { ascending: true });

      if (historyError) throw historyError;

      // 2. Check if review already exists
      let existingReview = null;
      try {
        const { data } = await supabase
          .from('customer_reviews')
          .select('id')
          .eq('order_id', order.id)
          .maybeSingle();
        existingReview = data;
      } catch (e) {
        // Fallback if order_id column doesn't exist
        const { data } = await supabase
          .from('customer_reviews')
          .select('id')
          .eq('customer_phone', order.customerPhone)
          .eq('product_name', order.productName)
          .maybeSingle();
        existingReview = data;
      }

      if (existingReview) {
        setHasReviewed(true);
      }

      // 3. Combine data
      setSelectedOrder({
        ...order,
        stageHistory: history || []
      });

    } catch (err) {
      console.error('Detail fetch error:', err);
      alert('অর্ডারের বিস্তারিত তথ্য আনতে সমস্যা হয়েছে।');
    } finally {
      setIsDetailLoading(false);
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

      {/* Orders List View */}
      {ordersList.length > 0 && !selectedOrder && (
        <div className={styles.ordersGrid}>
          {ordersList.map((order) => (
            <div 
              key={order.id} 
              className={styles.orderSummaryCard}
              onClick={() => selectOrder(order)}
            >
              <div className={styles.summaryImage}>
                <img src={order.productImage} alt={order.productName} />
              </div>
              <div className={styles.summaryContent}>
                <span className={styles.summaryOrderId}>আইডি: #{order.id}</span>
                <h3 className={styles.summaryProductName}>{order.productName}</h3>
                <p className={styles.summaryPhone}>{order.customerPhone}</p>
                <div className={`${styles.statusBadge} ${styles[order.status]}`}>
                  {order.status === 'active' ? 'চলমান' : 
                   order.status === 'completed' ? 'সম্পন্ন' : 'বাতিল'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Detail View */}
      {selectedOrder && (
        <div className={styles.trackingWrapper}>
          <button 
            className={styles.backButton}
            onClick={() => setSelectedOrder(null)}
          >
            <FaChevronLeft /> আগের পৃষ্ঠায় ফিরে যান
          </button>

          {/* First Row: Two Columns */}
          <div className={styles.mainGrid}>
            {/* Left Side: Product Details */}
            <div className={styles.leftCol}>
              <div className={styles.productCard}>
                <div className={styles.imageBox}>
                  <img src={selectedOrder.productImage} alt={selectedOrder.productName} />
                </div>
                <div className={styles.productDetails}>
                  <h3>{selectedOrder.productName}</h3>
                  <div className={styles.detailList}>
                    <div className={styles.detailItem}>
                      <span>পরিমাণ:</span>
                      <strong>{selectedOrder.quantity}টি</strong>
                    </div>
                    <div className={styles.detailItem}>
                      <span>মোট মূল্য:</span>
                      <strong>৳{selectedOrder.totalPrice}</strong>
                    </div>
                    <div className={styles.detailItem}>
                      <span>অগ্রিম:</span>
                      <strong>৳{selectedOrder.advancePaid}</strong>
                    </div>
                    <div className={styles.detailItem}>
                      <span>বাকি:</span>
                      <strong>৳{selectedOrder.remainingAmount}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.deliveryEstimate}>
                <FaTruckFast className={styles.truckIcon} />
                <div>
                  <p>সম্ভাব্য ডেলিভারি তারিখ:</p>
                  <strong>{new Date(selectedOrder.estimatedDelivery).toLocaleDateString('bn-BD', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}</strong>
                </div>
              </div>
            </div>

            {/* Right Side: Order Info & Timeline */}
            <div className={styles.rightCol}>
              <div className={styles.statusSection}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderId}>
                    <span>অর্ডার আইডি:</span>
                    <strong>#{selectedOrder.id}</strong>
                  </div>
                  <div className={`${styles.statusBadge} ${styles[selectedOrder.status]}`}>
                    {selectedOrder.status === 'active' ? 'চলমান' : 
                     selectedOrder.status === 'completed' ? 'সম্পন্ন' : 'বাতিল'}
                  </div>
                </div>

                <div className={styles.orderInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>গ্রাহকের নাম:</span>
                    <span className={styles.value}>{selectedOrder.customerName}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>পণ্য:</span>
                    <span className={styles.value}>{selectedOrder.productName}</span>
                  </div>
                </div>
              </div>

              <div className={styles.timelineSection}>
                <h3 className={styles.timelineTitle}>ডেলিভারি টাইমলাইন</h3>
                <TrackingTimeline order={selectedOrder} />
              </div>
            </div>
          </div>

          {/* Second Row: Review Section */}
          <div className={styles.reviewRow}>
            {selectedOrder.status === 'completed' && !hasReviewed && (
              <ReviewForm 
                order={selectedOrder} 
                onSubmitted={() => setHasReviewed(true)} 
              />
            )}

            {selectedOrder.status === 'completed' && hasReviewed && (
              <div className={styles.alreadyReviewed}>
                <FaCircleCheck /> আপনি ইতিমধ্যেই এই পণ্যের জন্য একটি রিভিউ দিয়েছেন। ধন্যবাদ!
              </div>
            )}
          </div>
        </div>
      )}

      {/* Loading Overlay for details */}
      {isDetailLoading && (
        <div className={styles.detailLoadingOverlay}>
          <div className={styles.spinner}></div>
          <p>তথ্য লোড হচ্ছে...</p>
        </div>
      )}
    </div>
  );
}

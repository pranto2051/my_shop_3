'use client';

import React, { useState } from 'react';
import { FaStar, FaPaperPlane, FaCircleCheck } from 'react-icons/fa6';
import { supabase } from '@/lib/supabase';
import styles from './ReviewForm.module.css';

export default function ReviewForm({ order, onSubmitted }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('দয়া করে একটি রেটিং সিলেক্ট করুন।');
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewData = {
        product_name: order.productName,
        product_image: order.productImage,
        customer_name: order.customerName,
        customer_phone: order.customerPhone,
        rating: rating,
        review_text: comment,
        is_approved: false,
        order_id: order.id
      };

      let { error } = await supabase
        .from('customer_reviews')
        .insert([reviewData]);

      if (error && error.code === '42703') { // Undefined column error
        delete reviewData.order_id;
        const retry = await supabase
          .from('customer_reviews')
          .insert([reviewData]);
        error = retry.error;
      }

      if (error) throw error;

      setIsSuccess(true);
      if (onSubmitted) onSubmitted();
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('রিভিউ জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={styles.successCard}>
        <div className={styles.successIcon}><FaCircleCheck /></div>
        <h3>ধন্যবাদ!</h3>
        <p>আপনার মূল্যবান রিভিউটি সফলভাবে জমা দেওয়া হয়েছে। এডমিন অনুমোদনের পর এটি ওয়েবসাইটে প্রদর্শিত হবে।</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewFormCard}>
      <div className={styles.header}>
        <h3>আপনার মতামত দিন</h3>
        <p>আপনার কেনা পণ্যটি কেমন লেগেছে তা আমাদের জানান।</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.productBrief}>
          <img src={order.productImage} alt={order.productName} className={styles.prodImg} />
          <div className={styles.prodInfo}>
            <h4>{order.productName}</h4>
            <span>অর্ডার আইডি: #{order.id}</span>
          </div>
        </div>

        <div className={styles.ratingSection}>
          <p className={styles.ratingLabel}>রেটিং দিন:</p>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`${styles.starBtn} ${star <= (hover || rating) ? styles.active : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <FaStar />
              </button>
            ))}
          </div>
          <span className={styles.ratingText}>
            {rating === 1 && 'খুবই খারাপ'}
            {rating === 2 && 'মোটামুটি'}
            {rating === 3 && 'ভালো'}
            {rating === 4 && 'খুব ভালো'}
            {rating === 5 && 'অসাধারণ'}
          </span>
        </div>

        <div className={styles.inputGroup}>
          <label>আপনার মন্তব্য (ঐচ্ছিক):</label>
          <textarea
            placeholder="পণ্যটি সম্পর্কে আপনার অভিজ্ঞতা লিখুন..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className={styles.submitBtn} 
          disabled={isSubmitting || rating === 0}
        >
          {isSubmitting ? 'জমা দেওয়া হচ্ছে...' : <><FaPaperPlane /> রিভিউ জমা দিন</>}
        </button>
      </form>
    </div>
  );
}

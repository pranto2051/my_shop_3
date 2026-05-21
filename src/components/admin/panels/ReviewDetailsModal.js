'use client';

import React, { useEffect, useState } from 'react';
import { FaXmark, FaReply, FaPaperPlane, FaStar } from 'react-icons/fa6';
import { supabase } from '@/lib/supabase';
import styles from './ReviewDetailsModal.module.css';

export default function ReviewDetailsModal({ review, renderStars, getStatusLabel, onClose, onReplySaved }) {
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inlineError, setInlineError] = useState('');

  useEffect(() => {
    setReplyText(review?.reply || '');
    setInlineError('');
  }, [review]);

  if (!review) return null;

  const formatDateTime = (value) => {
    if (!value) return 'N/A';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'N/A';

    return date.toLocaleString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSendReply = async () => {
    const trimmedReply = replyText.trim();

    if (!trimmedReply) {
      setInlineError('দয়া করে রিপ্লাই লিখুন।');
      return;
    }

    setIsSubmitting(true);
    setInlineError('');

    try {
      const replySavedAt = new Date().toISOString();
      const payloadVariants = [
        { admin_reply: trimmedReply, admin_reply_at: replySavedAt },
        { admin_reply: trimmedReply }
      ];

      let lastError = null;
      for (const payload of payloadVariants) {
        const { error } = await supabase
          .from('customer_reviews')
          .update(payload)
          .eq('id', review.id);

        if (!error) {
          if (typeof onReplySaved === 'function') {
            onReplySaved(review.id, trimmedReply, replySavedAt);
          }
          return;
        }

        lastError = error;
        const errorMessage = (error.message || '').toLowerCase();
        const isMissingColumnError =
          errorMessage.includes('column') &&
          (errorMessage.includes('does not exist') || errorMessage.includes('schema cache'));

        if (!isMissingColumnError) {
          break;
        }
      }

      throw lastError;
    } catch (error) {
      console.error('Saving review reply failed:', error);
      setInlineError(error?.message || 'রিপ্লাই সেভ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <span className={styles.eyebrow}>রিভিউ ডিটেইলস</span>
            <h3>{review.productName}</h3>
            <p>গ্রাহক: {review.customerName}</p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close review details">
            <FaXmark />
          </button>
        </div>

        <div className={styles.grid}>
          <div className={styles.mainColumn}>
            <div className={`${styles.card} ${styles.highlightCard}`}>
              <div className={styles.productRow}>
                <div className={styles.productImage}>
                  <img src={review.productImage} alt={review.productName} />
                </div>
                <div className={styles.productCopy}>
                  <span className={`${styles.statusPill} ${styles[review.status.toLowerCase()]}`}>
                    {getStatusLabel(review.status)}
                  </span>
                  <h4>{review.productName}</h4>
                  <p>{review.customerName} এই পণ্যের জন্য রিভিউ দিয়েছেন।</p>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <div className={styles.sectionHead}>
                <h4>রিভিউ টেক্সট</h4>
                <div className={styles.starsBox}>{renderStars(review.rating, '14px')}</div>
              </div>
              <p className={styles.reviewText}>{review.text || 'কোন মন্তব্য নেই'}</p>
            </div>

            {review.images.length > 0 && (
              <div className={styles.card}>
                <div className={styles.sectionHead}>
                  <h4>রিভিউ ছবি</h4>
                  <span className={styles.metaChip}>{review.images.length}টি</span>
                </div>
                <div className={styles.gallery}>
                  {review.images.map((img, idx) => (
                    <div key={idx} className={styles.galleryItem}>
                      <img src={img} alt={`রিভিউ ছবি ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.card}>
              <div className={styles.sectionHead}>
                <h4>অ্যাডমিন রিপ্লাই</h4>
                <span className={`${styles.metaChip} ${review.reply ? styles.success : styles.neutral}`}>
                  {review.reply ? 'রিপ্লাই আছে' : 'এখনও রিপ্লাই নেই'}
                </span>
              </div>
              {review.reply ? (
                <div className={styles.replyBubble}>
                  <div className={styles.replyHead}><FaReply /> আপনার রিপ্লাই</div>
                  <div className={styles.replyMeta}>শেষ আপডেট: {formatDateTime(review.replyUpdatedAt)}</div>
                  <p>{review.reply}</p>
                </div>
              ) : (
                <p className={styles.mutedText}>এখনও কোন রিপ্লাই দেওয়া হয়নি। চাইলে নিচে রিপ্লাই লিখতে পারেন।</p>
              )}
            </div>

            <div className={`${styles.card} ${styles.replyEditor}`}>
              <div className={styles.sectionHead}>
                <h4>নতুন রিপ্লাই</h4>
                <span className={styles.metaChip}>দ্রুত উত্তর</span>
              </div>
              <textarea
                placeholder="এখানে আপনার উত্তর লিখুন..."
                value={replyText}
                onChange={(event) => setReplyText(event.target.value)}
                disabled={isSubmitting}
              />
              {inlineError && <p className={styles.inlineError}>{inlineError}</p>}
              <div className={styles.replyActions}>
                <span className={styles.replyHint}>রিভিউতে আপনার উত্তর দেখানো হবে।</span>
                <button
                  className={styles.sendButton}
                  type="button"
                  onClick={handleSendReply}
                  disabled={isSubmitting}
                >
                  <FaPaperPlane /> পাঠান
                </button>
              </div>
            </div>
          </div>

          <div className={styles.sideColumn}>
            <div className={`${styles.card} ${styles.sideCard}`}>
              <h4>গ্রাহক তথ্য</h4>
              <div className={styles.detailStack}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>নাম</span>
                  <span className={styles.detailValue}>{review.customerName}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ফোন</span>
                  <span className={styles.detailValue}>{review.customerPhone || 'N/A'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>রিভিউ তারিখ</span>
                  <span className={styles.detailValue}>{review.date}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>রিভিউ আইডি</span>
                  <span className={styles.detailValue}>#{review.id}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>শেষ রিপ্লাই</span>
                  <span className={styles.detailValue}>{formatDateTime(review.replyUpdatedAt)}</span>
                </div>
              </div>
            </div>

            <div className={`${styles.card} ${styles.sideCard}`}>
              <h4>পণ্য তথ্য</h4>
              <div className={styles.detailStack}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>পণ্যের নাম</span>
                  <span className={styles.detailValue}>{review.productName}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>রেটিং</span>
                  <span className={styles.detailValue}>{review.rating}/5</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ফিচার্ড</span>
                  <span className={styles.detailValue}>{review.isFeatured ? 'হ্যাঁ' : 'না'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>অ্যাটাচমেন্ট</span>
                  <span className={styles.detailValue}>{review.images.length}টি ছবি</span>
                </div>
              </div>
            </div>

            <div className={`${styles.card} ${styles.sideCard}`}>
              <h4>স্ট্যাটাস</h4>
              <div className={styles.statusRow}>
                <span className={`${styles.statusPill} ${styles[review.status.toLowerCase()]}`}>
                  {getStatusLabel(review.status)}
                </span>
                {review.isFeatured && <span className={`${styles.metaChip} ${styles.success}`}>Featured</span>}
                <span className={styles.metaChip}>
                  <FaStar /> {review.rating}/5
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  FaStar, 
  FaCheck, 
  FaXmark, 
  FaReply, 
  FaTrash,
  FaFilter,
  FaChartBar,
  FaArrowTrendUp,
  FaBullhorn,
  FaCircleInfo,
  FaRobot
} from 'react-icons/fa6';
import ReviewDetailsModal from './ReviewDetailsModal';
import styles from './ReviewsPanel.module.css';

export default function ReviewsPanel({ reviews: dbReviews = [] }) {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [ratingFilter, setRatingFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Data normalization
  const reviews = dbReviews.map(r => ({
    id: r.id,
    productName: r.product_name || 'পণ্য',
    productImage: r.product_image || 'https://placehold.co/100x100/7C4B2A/FDF6E8?text=Review',
    customerName: r.customer_name || 'বেনামী গ্রাহক',
    customerPhone: r.customer_phone || '',
    rating: r.rating || 0,
    text: r.review_text || '',
    date: new Date(r.created_at).toLocaleDateString('bn-BD'),
    status: r.is_approved ? 'Approved' : 'Pending',
    images: r.images || [],
    reply: r.admin_reply || null,
    isFeatured: r.is_featured || false
  }));

  const stats = {
    total: reviews.length,
    average: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0,
    distribution: [5, 4, 3, 2, 1].map(stars => {
      const count = reviews.filter(r => r.rating === stars).length;
      return {
        stars,
        count,
        percentage: reviews.length > 0 ? (count / reviews.length) * 100 : 0
      };
    })
  };

  const filteredReviews = reviews.filter(r => {
    const matchesTab = activeTab === 'All' || r.status === activeTab;
    const matchesRating = ratingFilter === 'All' || r.rating === parseInt(ratingFilter);
    return matchesTab && matchesRating;
  });

  const getStatusLabel = (status) => {
    if (status === 'Pending') return 'অপেক্ষমান';
    if (status === 'Approved') return 'অনুমোদিত';
    return 'বাতিল';
  };

  const openReviewDetails = (review) => {
    setSelectedReview(review);
    setReplyingTo(review.id);
  };

  const closeReviewDetails = () => {
    setSelectedReview(null);
    setReplyingTo(null);
  };

  const renderStars = (count, size = "14px") => {
    return [...Array(5)].map((_, i) => (
      <FaStar 
        key={i} 
        style={{ fontSize: size }}
        className={`${styles.star} ${i < count ? styles.starFilled : styles.starEmpty}`}
      />
    ));
  };

  return (
    <div className={styles.reviewsContainer}>
      {/* Header Section */}
      <div className={styles.panelHero}>
        <div className={styles.heroContent}>
          <h1>রিভিউ ও রেটিং</h1>
          <p>আপনার গ্রাহকদের অভিজ্ঞতা এবং মতামত এখানে ম্যানেজ করুন। ভালো রিভিউ আপনার ব্র্যান্ড ভ্যালু বাড়াতে সাহায্য করে।</p>
        </div>
        <div className={styles.heroActions}>
          <button className={styles.secondaryAction} type="button">
            <FaChartBar /> রিপোর্ট ডাউনলোড
          </button>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className={styles.analyticsDashboard}>
        <div className={`${styles.analyticsCard} ${styles.scoreCard}`}>
          <div className={styles.scoreHeader}>
            <h3>গড় রেটিং</h3>
            <span className={`${styles.trend} ${styles.positive}`}><FaArrowTrendUp /> ৫%</span>
          </div>
          <div className={styles.scoreMain}>
            <div className={styles.bigScore}>{stats.average}</div>
            <div className={styles.scoreDetails}>
              <div className={styles.starsDisplay}>{renderStars(Math.round(stats.average), "20px")}</div>
              <p className={styles.totalCount}>{stats.total}টি রিভিউ থেকে</p>
            </div>
          </div>
          <div className={styles.scoreFooter}>
            গত ৩০ দিনে ০টি নতুন রিভিউ
          </div>
        </div>

        <div className={`${styles.analyticsCard} ${styles.distributionCard}`}>
          <h3>রেটিং ডিস্ট্রিবিউশন</h3>
          <div className={styles.distList}>
            {stats.distribution.map(d => (
              <div key={d.stars} className={styles.distItem} onClick={() => setRatingFilter(d.stars.toString())}>
                <span className={styles.label}>{d.stars} স্টার</span>
                <div className={styles.barBg}>
                  <div className={styles.barFill} style={{ width: `${d.percentage}%` }}></div>
                </div>
                <span className={styles.pct}>{Math.round(d.percentage)}%</span>
                <span className={styles.count}>({d.count})</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.analyticsCard} ${styles.automationCard}`}>
          <div className={styles.autoIcon}>
            <FaRobot />
          </div>
          <div className={styles.autoInfo}>
            <h3>অটো-রিকুয়েস্ট রিভিউ</h3>
            <p>ডেলিভারি সম্পন্ন হওয়ার ৩ দিন পর গ্রাহককে অটোমেটিক এসএমএস রিকুয়েস্ট পাঠানো হবে।</p>
          </div>
          <div className={`${styles.autoStatus} ${styles.autoActive}`}>
            <div className={styles.statusToggle}>
              <span>অবস্থা: <strong>সক্রিয়</strong></span>
              <div className={`${styles.switch} ${styles.switchOn}`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.sectionHeader}>
        <div className={styles.tabsWrapper}>
          {[
            { id: 'All', label: 'সব', count: reviews.length },
            { id: 'Pending', label: 'অপেক্ষমান', count: reviews.filter(r => r.status === 'Pending').length },
            { id: 'Approved', label: 'অনুমোদিত', count: reviews.filter(r => r.status === 'Approved').length },
            { id: 'Rejected', label: 'বাতিল', count: reviews.filter(r => r.status === 'Rejected').length }
          ].map(tab => (
            <button 
              key={tab.id} 
              type="button"
              className={`${styles.modernTab} ${activeTab === tab.id ? styles.tabActive : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setRatingFilter('All');
              }}
            >
              {tab.label}
              <span className={styles.pill}>{tab.count}</span>
            </button>
          ))}
        </div>
        <div className={styles.filterActions}>
          <button 
            type="button"
            className={`${styles.iconBtn} ${ratingFilter !== 'All' ? styles.filterActive : ''}`}
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <FaFilter /> {ratingFilter === 'All' ? 'ফিল্টার' : `${ratingFilter} স্টার`}
          </button>

          {showFilterDropdown && (
            <div className={styles.filterDropdown}>
              <div className={styles.dropdownItem} onClick={() => { setRatingFilter('All'); setShowFilterDropdown(false); }}>সব রেটিং</div>
              {[5, 4, 3, 2, 1].map(num => (
                <div key={num} className={styles.dropdownItem} onClick={() => { setRatingFilter(num.toString()); setShowFilterDropdown(false); }}>
                  {num} স্টার রিভিউ
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className={styles.reviewsGrid}>
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <div
              key={review.id}
              className={styles.modernReviewCard}
              role="button"
              tabIndex={0}
              onClick={() => openReviewDetails(review)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openReviewDetails(review);
                }
              }}
            >
              <div className={`${styles.cardTop} ${styles.compactTop}`}>
                <div className={styles.prodMeta}>
                  <div className={`${styles.prodImgBox} ${styles.compactImage}`}>
                    <img src={review.productImage} alt={review.productName} />
                  </div>
                  <div className={styles.prodDetails}>
                    <div className={styles.cardKicker}>{review.date}</div>
                    <h4 className={styles.pTitle}>{review.productName}</h4>
                    <span className={styles.summaryLine}>{review.customerName}</span>
                  </div>
                </div>
                <div className={styles.custMeta}>
                  <div className={styles.rStatusBadge}>
                    <span className={`${styles.statusDot} ${styles[`status${review.status}`]}`}></span>
                    {getStatusLabel(review.status)}
                  </div>
                </div>
              </div>

              <div className={`${styles.cardMid} ${styles.compactMid}`}>
                <div className={styles.ratingRow}>
                  <div className={styles.ratingIcon}><FaStar /></div>
                  <div className={styles.ratingMeta}>
                    <div className={styles.starsBox}>{renderStars(review.rating)}</div>
                    <span className={styles.ratingText}>{review.rating}/5 রেটিং</span>
                  </div>
                  {review.isFeatured && <span className={styles.featuredPill}><FaStar /> Featured</span>}
                </div>

                <div className={styles.summaryDetails}>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>ফোন</span>
                    <span className={styles.summaryValue}>{review.customerPhone || 'N/A'}</span>
                  </div>
                  <div className={styles.summaryItem}>
                    <span className={styles.summaryLabel}>ছবি</span>
                    <span className={styles.summaryValue}>{review.images.length}</span>
                  </div>
                </div>

                <div className={`${styles.reviewContent} ${styles.compactContent}`}>
                  <p>{review.text || 'কোন মন্তব্য নেই'}</p>
                </div>

                <div className={styles.summaryFooter}>
                  <span className={styles.openDetailsPill}>বিস্তারিত দেখুন</span>
                  {review.reply ? <span className={styles.replyMarker}>রিপ্লাই আছে</span> : <span className={`${styles.replyMarker} ${styles.muted}`}>রিপ্লাই নেই</span>}
                </div>
              </div>

              <div className={`${styles.cardBottom} ${styles.compactBottom}`} onClick={(event) => event.stopPropagation()}>
                <div className={styles.actionGroup}>
                  {review.status === 'Pending' && (
                    <>
                      <button type="button" className={`${styles.actionBtn} ${styles.approve}`}><FaCheck /> অনুমোদন</button>
                      <button type="button" className={`${styles.actionBtn} ${styles.reject}`}><FaXmark /> বাতিল</button>
                    </>
                  )}
                  <button
                    type="button"
                    className={`${styles.actionBtn} ${styles.reply} ${replyingTo === review.id ? styles.replyActive : ''}`}
                    onClick={() => openReviewDetails(review)}
                  >
                    <FaReply /> রিপ্লাই
                  </button>
                  <button type="button" className={`${styles.actionBtn} ${styles.feature}`}><FaBullhorn /> ফিচার</button>
                </div>
                <div className={styles.dangerGroup}>
                  <button type="button" className={`${styles.actionBtn} ${styles.delete}`}><FaTrash /></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <FaCircleInfo />
            <h3>কোন রিভিউ পাওয়া যায়নি</h3>
            <p>আপনার সিলেক্ট করা ফিল্টারে এই মুহূর্তে কোন রিভিউ নেই।</p>
          </div>
        )}
      </div>

      {selectedReview && (
        <ReviewDetailsModal
          review={selectedReview}
          getStatusLabel={getStatusLabel}
          renderStars={renderStars}
          onClose={closeReviewDetails}
        />
      )}

    </div>
  );
}

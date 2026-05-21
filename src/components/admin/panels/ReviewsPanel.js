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
        className={i < count ? 'star filled' : 'star empty'} 
      />
    ));
  };

  return (
    <div className="reviews-container">
      {/* Header Section */}
      <div className="panel-hero">
        <div className="hero-content">
          <h1>রিভিউ ও রেটিং</h1>
          <p>আপনার গ্রাহকদের অভিজ্ঞতা এবং মতামত এখানে ম্যানেজ করুন। ভালো রিভিউ আপনার ব্র্যান্ড ভ্যালু বাড়াতে সাহায্য করে।</p>
        </div>
        <div className="hero-actions">
          <button className="secondary-action">
            <FaChartBar /> রিপোর্ট ডাউনলোড
          </button>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="analytics-dashboard">
        <div className="analytics-card score-card">
          <div className="score-header">
            <h3>গড় রেটিং</h3>
            <span className="trend positive"><FaArrowTrendUp /> ৫%</span>
          </div>
          <div className="score-main">
            <div className="big-score">{stats.average}</div>
            <div className="score-details">
              <div className="stars-display">{renderStars(Math.round(stats.average), "20px")}</div>
              <p className="total-count">{stats.total}টি রিভিউ থেকে</p>
            </div>
          </div>
          <div className="score-footer">
            গত ৩০ দিনে ০টি নতুন রিভিউ
          </div>
        </div>

        <div className="analytics-card distribution-card">
          <h3>রেটিং ডিস্ট্রিবিউশন</h3>
          <div className="dist-list">
            {stats.distribution.map(d => (
              <div key={d.stars} className="dist-item" style={{ cursor: 'pointer' }} onClick={() => setRatingFilter(d.stars.toString())}>
                <span className="label">{d.stars} স্টার</span>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: `${d.percentage}%` }}></div>
                </div>
                <span className="pct">{Math.round(d.percentage)}%</span>
                <span className="count">({d.count})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card automation-card">
          <div className="auto-icon">
            <FaRobot />
          </div>
          <div className="auto-info">
            <h3>অটো-রিকুয়েস্ট রিভিউ</h3>
            <p>ডেলিভারি সম্পন্ন হওয়ার ৩ দিন পর গ্রাহককে অটোমেটিক এসএমএস রিকুয়েস্ট পাঠানো হবে।</p>
          </div>
          <div className="auto-status active">
            <div className="status-toggle">
              <span>অবস্থা: <strong>সক্রিয়</strong></span>
              <div className="switch on"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="section-header">
        <div className="tabs-wrapper">
          {[
            { id: 'All', label: 'সব', count: reviews.length },
            { id: 'Pending', label: 'অপেক্ষমান', count: reviews.filter(r => r.status === 'Pending').length },
            { id: 'Approved', label: 'অনুমোদিত', count: reviews.filter(r => r.status === 'Approved').length },
            { id: 'Rejected', label: 'বাতিল', count: reviews.filter(r => r.status === 'Rejected').length }
          ].map(tab => (
            <button 
              key={tab.id} 
              className={`modern-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id);
                setRatingFilter('All');
              }}
            >
              {tab.label}
              <span className="pill">{tab.count}</span>
            </button>
          ))}
        </div>
        <div className="filter-actions" style={{ position: 'relative' }}>
          <button 
            className={`icon-btn ${ratingFilter !== 'All' ? 'active' : ''}`}
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <FaFilter /> {ratingFilter === 'All' ? 'ফিল্টার' : `${ratingFilter} স্টার`}
          </button>

          {showFilterDropdown && (
            <div className="filter-dropdown">
              <div className="dropdown-item" onClick={() => { setRatingFilter('All'); setShowFilterDropdown(false); }}>সব রেটিং</div>
              {[5, 4, 3, 2, 1].map(num => (
                <div key={num} className="dropdown-item" onClick={() => { setRatingFilter(num.toString()); setShowFilterDropdown(false); }}>
                  {num} স্টার রিভিউ
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="reviews-grid">
        {filteredReviews.length > 0 ? (
          filteredReviews.map(review => (
            <div
              key={review.id}
              className={`modern-review-card ${review.status.toLowerCase()}`}
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
              <div className="card-top compact-top">
                <div className="prod-meta">
                  <div className="prod-img-box compact-image">
                    <img src={review.productImage} alt={review.productName} />
                  </div>
                  <div className="prod-details">
                    <div className="card-kicker">{review.date}</div>
                    <h4 className="p-title">{review.productName}</h4>
                    <span className="summary-line">{review.customerName}</span>
                  </div>
                </div>
                <div className="cust-meta">
                  <div className="r-status-badge">
                    <span className={`status-dot ${review.status.toLowerCase()}`}></span>
                    {getStatusLabel(review.status)}
                  </div>
                </div>
              </div>

              <div className="card-mid compact-mid">
                <div className="rating-row compact-row">
                  <div className="stars-box">{renderStars(review.rating)}</div>
                  {review.isFeatured && <span className="featured-pill"><FaStar /> Featured</span>}
                </div>

                <div className="summary-details">
                  <div className="summary-item">
                    <span className="summary-label">ফোন</span>
                    <span className="summary-value">{review.customerPhone || 'N/A'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">ছবি</span>
                    <span className="summary-value">{review.images.length}</span>
                  </div>
                </div>

                <div className="review-content compact-content">
                  <p>{review.text || 'কোন মন্তব্য নেই'}</p>
                </div>

                <div className="summary-footer">
                  <span className="open-details-pill">বিস্তারিত দেখুন</span>
                  {review.reply ? <span className="reply-marker">রিপ্লাই আছে</span> : <span className="reply-marker muted">রিপ্লাই নেই</span>}
                </div>
              </div>

              <div className="card-bottom compact-bottom" onClick={(event) => event.stopPropagation()}>
                <div className="action-group">
                  {review.status === 'Pending' && (
                    <>
                      <button className="action-btn approve"><FaCheck /> অনুমোদন</button>
                      <button className="action-btn reject"><FaXmark /> বাতিল</button>
                    </>
                  )}
                  <button
                    className={`action-btn reply ${replyingTo === review.id ? 'active' : ''}`}
                    onClick={() => openReviewDetails(review)}
                  >
                    <FaReply /> রিপ্লাই
                  </button>
                  <button className="action-btn feature"><FaBullhorn /> ফিচার</button>
                </div>
                <div className="danger-group">
                  <button className="action-btn delete"><FaTrash /></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
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

      <style jsx>{`
        .reviews-container {
          padding: 10px;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
          overflow-x: hidden;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Hero Section */
        .panel-hero {
          background: linear-gradient(135deg, #7C4B2A 0%, #a67c52 100%);
          padding: 40px;
          border-radius: 24px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          box-shadow: 0 10px 30px rgba(124, 75, 42, 0.15);
        }

        .hero-content h1 { font-size: 32px; margin-bottom: 12px; font-weight: 800; letter-spacing: -0.5px; }
        .hero-content p { font-size: 16px; opacity: 0.9; max-width: 600px; line-height: 1.6; }
        
        .secondary-action {
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: 0.3s;
        }
        .secondary-action:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); }

        /* Analytics Cards */
        .analytics-dashboard {
          display: grid;
          grid-template-columns: 1fr 1fr 1.2fr;
          gap: 20px;
          margin-bottom: 40px;
        }

        .analytics-card {
          background: white;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid #f0f0f0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: 0.3s;
        }
        .analytics-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.06); }

        .analytics-card h3 { font-size: 16px; color: #64748b; margin-bottom: 20px; font-weight: 600; }

        .score-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .trend { font-size: 12px; font-weight: 700; padding: 4px 8px; border-radius: 20px; }
        .trend.positive { background: #ecfdf5; color: #10b981; }

        .score-main { display: flex; align-items: center; gap: 20px; margin-bottom: 15px; }
        .big-score { font-size: 54px; font-weight: 900; color: #1e293b; line-height: 1; }
        .stars-display { margin-bottom: 5px; }
        .total-count { font-size: 13px; color: #94a3b8; }
        .score-footer { font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9; pt: 15px; }

        .dist-list { display: flex; flex-direction: column; gap: 10px; }
        .dist-item { display: flex; align-items: center; gap: 12px; }
        .dist-item .label { font-size: 12px; color: #475569; min-width: 50px; font-weight: 600; }
        .bar-bg { flex: 1; height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; }
        .bar-fill { height: 100%; background: #f59e0b; border-radius: 4px; }
        .dist-item .pct { font-size: 12px; color: #1e293b; font-weight: 700; min-width: 35px; }
        .dist-item .count { font-size: 12px; color: #94a3b8; min-width: 30px; }

        .automation-card { display: flex; flex-direction: column; background: #f8fafc; border: 1px solid #e2e8f0; }
        .auto-icon { width: 50px; height: 50px; background: #7C4B2A; color: white; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 15px; }
        .auto-info h3 { color: #1e293b; margin-bottom: 8px; }
        .auto-info p { font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 20px; }
        .auto-status { margin-top: auto; }
        .status-toggle { display: flex; justify-content: space-between; align-items: center; background: white; padding: 12px 16px; border-radius: 12px; border: 1px solid #e2e8f0; }
        .switch { width: 44px; height: 22px; background: #cbd5e1; border-radius: 20px; position: relative; cursor: pointer; transition: 0.3s; }
        .switch::after { content: ''; position: absolute; left: 3px; top: 3px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: 0.3s; }
        .switch.on { background: #10b981; }
        .switch.on::after { left: 25px; }

        /* Filter Section */
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .tabs-wrapper { display: flex; gap: 8px; background: #f1f5f9; padding: 6px; border-radius: 14px; }
        .modern-tab { 
          padding: 10px 18px; 
          border: none; 
          background: transparent; 
          color: #64748b; 
          font-weight: 700; 
          font-size: 14px; 
          cursor: pointer; 
          border-radius: 10px; 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          transition: 0.2s;
        }
        .modern-tab.active { background: white; color: #7C4B2A; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .pill { background: #e2e8f0; color: #475569; padding: 2px 8px; border-radius: 20px; font-size: 11px; }
        .active .pill { background: #FDF6E8; color: #7C4B2A; }

        .filter-actions .icon-btn { 
          padding: 10px 22px; 
          border-radius: 14px; 
          border: 1px solid #e2e8f0; 
          background: white; 
          color: #1e293b; 
          font-weight: 700; 
          display: flex; 
          align-items: center; 
          gap: 10px; 
          cursor: pointer; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 14px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        
        .filter-actions .icon-btn:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .filter-actions .icon-btn.active { 
          background: #7C4B2A; 
          color: white; 
          border-color: #7C4B2A; 
          box-shadow: 0 8px 20px rgba(124, 75, 42, 0.25);
        }
        
        .filter-actions .icon-btn :global(svg) {
          font-size: 13px;
          transition: transform 0.3s ease;
        }
        .filter-actions .icon-btn:hover :global(svg) { transform: rotate(15deg); }

        .filter-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          background: white;
          border-radius: 18px;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
          width: 200px;
          overflow: hidden;
          z-index: 1000;
          transform-origin: top right;
          animation: menuAppear 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }

        @keyframes menuAppear {
          from { opacity: 0; transform: scale(0.9) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .dropdown-item {
          padding: 14px 20px;
          font-size: 14px;
          color: #475569;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .dropdown-item:hover { 
          background: #FDF6E8; 
          color: #7C4B2A;
          padding-left: 25px;
        }
        .dropdown-item:not(:last-child) { border-bottom: 1px solid #f8fafc; }

        /* Review Cards */
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 16px;
          width: 100%;
          min-width: 0;
        }
        .modern-review-card {
          background: linear-gradient(180deg, #ffffff 0%, #fcfcfd 100%);
          border-radius: 22px;
          padding: 16px;
          border: 1px solid #edf2f7;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
          transition: 0.25s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          min-height: 100%;
          position: relative;
          overflow: hidden;
        }
        .modern-review-card::before {
          content: '';
          position: absolute;
          inset: 0 auto auto 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #7C4B2A, #f59e0b);
          opacity: 0.9;
        }
        .modern-review-card:hover,
        .modern-review-card:focus-visible {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(15, 23, 42, 0.09);
          border-color: #dbe3ef;
          outline: none;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .compact-top { margin-bottom: 14px; }
        .prod-meta {
          display: flex;
          gap: 12px;
          align-items: center;
          min-width: 0;
        }
        .prod-img-box {
          width: 60px;
          height: 60px;
          border-radius: 14px;
          overflow: hidden;
          background: #f8fafc;
          border: 1px solid #eef2f7;
          flex-shrink: 0;
        }
        .compact-image { width: 54px; height: 54px; }
        .prod-img-box img { width: 100%; height: 100%; object-fit: cover; }
        .prod-details { min-width: 0; }
        .card-kicker {
          display: inline-flex;
          align-items: center;
          padding: 3px 8px;
          border-radius: 999px;
          background: #f8fafc;
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .p-title {
          font-size: 14px;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 4px 0;
          line-height: 1.25;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .summary-line {
          display: block;
          font-size: 12px;
          color: #64748b;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .cust-meta { text-align: right; }
        .r-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          padding: 5px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          color: #475569;
        }
        .status-dot { width: 7px; height: 7px; border-radius: 50%; }
        .status-dot.pending { background: #f59e0b; }
        .status-dot.approved { background: #10b981; }
        .status-dot.rejected { background: #ef4444; }

        .compact-mid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .compact-row { margin-bottom: 0; }
        .star { color: #e2e8f0; margin-right: 2px; }
        .star.filled { color: #f59e0b; }

        .featured-pill {
          background: #fffbeb;
          color: #b45309;
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border: 1px solid #fef3c7;
        }

        .summary-details {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
        }
        .summary-item {
          background: #f8fafc;
          border: 1px solid #eef2f7;
          border-radius: 14px;
          padding: 10px 12px;
        }
        .summary-label {
          display: block;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #94a3b8;
          margin-bottom: 4px;
          font-weight: 800;
        }
        .summary-value { font-size: 12px; color: #0f172a; font-weight: 700; }

        .review-content { flex: 1; }
        .compact-content p {
          font-size: 13px;
          color: #334155;
          line-height: 1.55;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .summary-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: auto;
          padding-top: 4px;
        }
        .open-details-pill,
        .reply-marker {
          font-size: 11px;
          font-weight: 800;
          border-radius: 999px;
          padding: 4px 8px;
          background: #f8fafc;
          color: #64748b;
        }
        .reply-marker.muted { opacity: 0.8; }

        .card-mid { margin-bottom: 0; }
        .card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 14px;
          margin-top: 14px;
          border-top: 1px solid #eef2f7;
        }
        .compact-bottom { flex-wrap: wrap; gap: 10px; }
        .action-group, .danger-group { display: flex; gap: 8px; flex-wrap: wrap; }

        .action-btn {
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: white;
          color: #475569;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: 0.2s;
        }
        .action-btn:hover { background: #f8fafc; border-color: #cbd5e1; }
        .action-btn.approve { background: #f0fdf4; color: #166534; border-color: #dcfce7; }
        .action-btn.approve:hover { background: #dcfce7; }
        .action-btn.reject { background: #fef2f2; color: #991b1b; border-color: #fee2e2; }
        .action-btn.reject:hover { background: #fee2e2; }
        .action-btn.reply.active { background: #7C4B2A; color: white; border-color: #7C4B2A; }
        .action-btn.delete { color: #94a3b8; border: none; padding: 8px; }
        .action-btn.delete:hover { color: #ef4444; background: #fef2f2; }

        .empty-state { text-align: center; padding: 60px 20px; background: #f8fafc; border-radius: 24px; border: 2px dashed #e2e8f0; color: #94a3b8; }
        .empty-state h3 { color: #475569; margin: 15px 0 5px; }
        .empty-state :global(svg) { font-size: 48px; }

        .review-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          z-index: 60;
          animation: fadeIn 0.18s ease;
        }
        .review-modal {
          width: min(1200px, 100%);
          max-height: min(92vh, 980px);
          overflow: auto;
          background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.55);
          box-shadow: 0 30px 80px rgba(15, 23, 42, 0.28);
          padding: 24px;
          animation: modalRise 0.22s ease;
        }
        @keyframes modalRise {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .review-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 20px;
        }
        .modal-eyebrow {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 999px;
          background: #f8fafc;
          color: #7C4B2A;
          font-size: 11px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .review-modal-header h3 {
          margin: 0 0 6px;
          font-size: 28px;
          color: #0f172a;
          line-height: 1.2;
        }
        .review-modal-header p { margin: 0; color: #64748b; }
        .modal-close {
          width: 42px;
          height: 42px;
          border: none;
          border-radius: 999px;
          background: #f8fafc;
          color: #334155;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: 0.2s ease;
          flex-shrink: 0;
        }
        .modal-close:hover { background: #e2e8f0; transform: rotate(6deg); }

        .review-modal-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.8fr) minmax(300px, 0.9fr);
          gap: 18px;
        }
        .review-modal-main,
        .review-modal-side {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .modal-card {
          background: white;
          border: 1px solid #edf2f7;
          border-radius: 22px;
          padding: 18px;
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.03);
        }
        .highlight-card {
          background: linear-gradient(135deg, #fff9f4 0%, #ffffff 60%);
          border-color: #f4e6db;
        }
        .modal-product-row {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .modal-product-image { width: 88px; height: 88px; border-radius: 18px; }
        .modal-product-copy h4 {
          font-size: 20px;
          color: #0f172a;
          margin: 6px 0 6px;
        }
        .modal-product-copy p { margin: 0; color: #64748b; line-height: 1.6; }

        .modal-section-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .modal-section-head h4,
        .side-card h4 {
          margin: 0;
          font-size: 15px;
          color: #0f172a;
        }
        .modal-review-text {
          margin: 0;
          color: #334155;
          line-height: 1.75;
          font-size: 15px;
        }

        .modal-gallery {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        .modal-gallery-img { width: 100%; height: 120px; border-radius: 16px; }

        .meta-chip,
        .status-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          line-height: 1;
        }
        .meta-chip { background: #f8fafc; color: #475569; }
        .meta-chip.success { background: #ecfdf5; color: #047857; }
        .meta-chip.neutral { background: #f8fafc; color: #64748b; }
        .status-pill.pending { background: #fff7ed; color: #b45309; }
        .status-pill.approved { background: #ecfdf5; color: #047857; }
        .status-pill.rejected { background: #fef2f2; color: #b91c1c; }

        .modal-reply-bubble { margin-top: 0; }
        .modal-muted { margin: 0; color: #64748b; line-height: 1.7; }
        .reply-editor textarea {
          width: 100%;
          min-height: 100px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 14px 16px;
          font-size: 14px;
          resize: vertical;
          margin-bottom: 12px;
          transition: 0.2s ease;
        }
        .reply-editor textarea:focus {
          outline: none;
          border-color: #7C4B2A;
          box-shadow: 0 0 0 4px rgba(124, 75, 42, 0.1);
        }
        .reply-editor .send-btn { width: fit-content; }

        .detail-stack { display: flex; flex-direction: column; gap: 10px; }
        .detail-row {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #eef2f7;
        }
        .detail-row:last-child { border-bottom: none; padding-bottom: 0; }
        .detail-label { font-size: 12px; color: #94a3b8; font-weight: 700; }
        .detail-value { font-size: 13px; color: #0f172a; font-weight: 700; text-align: right; }
        .status-chip-row { display: flex; gap: 8px; flex-wrap: wrap; }

        @media (max-width: 1024px) {
          .analytics-dashboard { grid-template-columns: 1fr 1.2fr; }
          .automation-card { grid-column: span 2; }
          .reviews-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .review-modal-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .analytics-dashboard { grid-template-columns: 1fr; }
          .automation-card { grid-column: span 1; }
          .panel-hero { flex-direction: column; text-align: center; gap: 20px; padding: 30px 20px; }
          .card-top { flex-direction: column; gap: 15px; }
          .cust-meta { text-align: left; }
          .card-bottom { flex-wrap: wrap; gap: 15px; }
          .reviews-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .review-modal { padding: 18px; }
          .review-modal-header h3 { font-size: 22px; }
          .review-modal-backdrop { padding: 14px; }
          .modal-gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .detail-row { flex-direction: column; }
          .detail-value { text-align: left; }
        }
        @media (max-width: 560px) {
          .reviews-grid { grid-template-columns: 1fr; }
          .summary-details { grid-template-columns: 1fr; }
          .modal-product-row { flex-direction: column; align-items: flex-start; }
          .modal-gallery { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}

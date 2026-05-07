'use client';

import React, { useState } from 'react';
import { 
  FaStar, 
  FaUser, 
  FaCheck, 
  FaXmark, 
  FaReply, 
  FaTrash,
  FaFilter,
  FaChartBar,
  FaCircleCheck,
  FaImage,
  FaChevronDown,
  FaChevronUp,
  FaPaperPlane
} from 'react-icons/fa6';

export default function ReviewsPanel({ reviews: dbReviews = [] }) {
  const [activeTab, setActiveTab] = useState('All');
  const [expandedReview, setExpandedReview] = useState(null);

  const reviews = dbReviews.map(r => ({
    id: r.id,
    productName: 'পণ্য',
    productImage: 'https://placehold.co/100x100/7C4B2A/FDF6E8?text=Review',
    customerName: r.customer_name,
    customerPhone: r.customer_phone,
    rating: r.rating,
    text: r.review_text,
    date: new Date(r.created_at).toLocaleDateString('bn-BD'),
    status: r.is_approved ? 'Approved' : 'Pending',
    images: [],
    reply: null
  }));

  const stats = {
    total: reviews.length,
    average: reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0,
    distribution: [5, 4, 3, 2, 1].map(stars => ({
      stars,
      count: reviews.filter(r => r.rating === stars).length
    }))
  };

  const filteredReviews = reviews.filter(r => {
    if (activeTab === 'Pending') return r.status === 'Pending';
    if (activeTab === 'Approved') return r.status === 'Approved';
    if (activeTab === 'Rejected') return r.status === 'Rejected';
    return true;
  });

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <FaStar key={i} className={i < count ? 'star filled' : 'star empty'} />
    ));
  };

  return (
    <div className="reviews-panel">
      <div className="panel-header">
        <div className="header-title">
          <h2>রিভিউ ও রেটিং</h2>
          <p>গ্রাহকদের মতামত ও রেটিং ব্যবস্থাপনা করুন</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="stat-card main-stat">
          <div className="avg-rating">
            <span className="big-num">{stats.average}</span>
            <div className="stars-row">{renderStars(Math.round(stats.average))}</div>
            <span className="total-label">{stats.total}টি রিভিউ</span>
          </div>
          <div className="growth-label">
            <span className="plus">0%</span> গত মাসের চেয়ে
          </div>
        </div>
        <div className="stat-card distribution">
          {stats.distribution.map(d => (
            <div key={d.stars} className="dist-row">
              <span className="star-num">{d.stars} <FaStar /></span>
              <div className="progress-bg">
                <div className="progress-fill" style={{ width: `${(d.count / stats.total) * 100}%` }}></div>
              </div>
              <span className="count-num">{d.count}</span>
            </div>
          ))}
        </div>
        <div className="stat-card automation">
          <h4>অটো-রিকুয়েস্ট রিভিউ</h4>
          <p>ডেলিভারির ৩ দিন পর গ্রাহককে অটোমেটিক এসএমএস পাঠানো হবে।</p>
          <div className="toggle-container">
            <span className="toggle-label">অবস্থা: <strong>সক্রিয়</strong></span>
            <div className="toggle-switch active"></div>
          </div>
        </div>
      </div>

      <div className="filter-tabs">
        {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
          <button 
            key={tab} 
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'All' ? 'সব' : tab === 'Pending' ? 'অপেক্ষমান' : tab === 'Approved' ? 'অনুমোদিত' : 'বাতিল'}
            <span className="count">{reviews.filter(r => tab === 'All' ? true : r.status === tab).length}</span>
          </button>
        ))}
      </div>

      <div className="reviews-list">
        {filteredReviews.map(review => (
          <div key={review.id} className={`review-card ${review.status.toLowerCase()}`}>
            <div className="review-header">
              <div className="product-info">
                <img src={review.productImage} alt="" className="mini-prod-img" />
                <div className="p-names">
                  <span className="p-name">{review.productName}</span>
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              <div className="customer-info">
                <span className="c-name"><FaUser /> {review.customerName}</span>
                <span className="c-phone">{review.customerPhone}</span>
              </div>
              <div className="rating-box">
                <div className="stars-row">{renderStars(review.rating)}</div>
                {review.isFeatured && <span className="featured-badge"><FaCircleCheck /> Featured</span>}
              </div>
            </div>

            <div className="review-body">
              <p className={expandedReview === review.id ? 'expanded' : 'truncated'}>
                {review.text}
              </p>
              {review.text.length > 100 && (
                <button className="toggle-text" onClick={() => setExpandedReview(expandedReview === review.id ? null : review.id)}>
                  {expandedReview === review.id ? 'কম দেখুন' : 'আরও দেখুন'} {expandedReview === review.id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              )}

              {review.images.length > 0 && (
                <div className="review-images">
                  {review.images.map((img, idx) => (
                    <img key={idx} src={img} alt="" className="review-img" />
                  ))}
                </div>
              )}

              {review.reply && (
                <div className="admin-reply">
                  <div className="reply-header"><FaReply /> অ্যাডমিন রিপ্লাই</div>
                  <p>{review.reply}</p>
                </div>
              )}
            </div>

            <div className="review-footer">
              <div className="status-indicator">
                <span className={`dot ${review.status.toLowerCase()}`}></span>
                {review.status}
              </div>
              <div className="actions">
                {review.status === 'Pending' && (
                  <>
                    <button className="btn approve"><FaCheck /> অনুমোদন</button>
                    <button className="btn reject"><FaXmark /> বাতিল</button>
                  </>
                )}
                <button className="btn reply-btn"><FaReply /> রিপ্লাই</button>
                <button className="btn feature-btn"><FaStar /> ফিচার</button>
                <button className="btn delete-btn"><FaTrash /></button>
              </div>
            </div>

            <div className="reply-input-box">
              <textarea placeholder="রিপ্লাই লিখুন..."></textarea>
              <button className="send-reply"><FaPaperPlane /></button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .reviews-panel { padding: 20px; }
        .panel-header { margin-bottom: 30px; }
        .header-title h2 { font-size: 24px; color: #2c3e50; font-family: 'Noto Sans Bengali', sans-serif; }
        .header-title p { color: #7f8c8d; font-size: 14px; }

        .analytics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .stat-card { background: white; border-radius: 15px; padding: 25px; border: 1px solid #eee; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        
        .avg-rating { text-align: center; margin-bottom: 15px; }
        .big-num { font-size: 48px; font-weight: 800; color: #7C4B2A; display: block; line-height: 1; }
        .stars-row { display: flex; justify-content: center; gap: 4px; margin: 10px 0; }
        .star { font-size: 14px; }
        .star.filled { color: #f1c40f; }
        .star.empty { color: #ddd; }
        .total-label { font-size: 13px; color: #95a5a6; }
        .growth-label { text-align: center; font-size: 12px; color: #7f8c8d; }
        .growth-label .plus { color: #27ae60; font-weight: 700; }

        .dist-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .star-num { font-size: 12px; font-weight: 700; color: #2c3e50; min-width: 30px; display: flex; align-items: center; gap: 3px; }
        .progress-bg { flex: 1; height: 8px; background: #f1f1f1; border-radius: 10px; overflow: hidden; }
        .progress-fill { height: 100%; background: #f1c40f; border-radius: 10px; }
        .count-num { font-size: 12px; color: #95a5a6; min-width: 25px; }

        .automation h4 { margin-bottom: 10px; color: #2c3e50; }
        .automation p { font-size: 13px; color: #7f8c8d; margin-bottom: 20px; }
        .toggle-container { display: flex; justify-content: space-between; align-items: center; background: #f8f9fa; padding: 12px; border-radius: 10px; }
        .toggle-label { font-size: 13px; color: #2c3e50; }
        .toggle-switch { width: 40px; height: 20px; background: #ddd; border-radius: 20px; position: relative; cursor: pointer; transition: 0.3s; }
        .toggle-switch::after { content: ''; position: absolute; left: 2px; top: 2px; width: 16px; height: 16px; background: white; border-radius: 50%; transition: 0.3s; }
        .toggle-switch.active { background: #27ae60; }
        .toggle-switch.active::after { left: 22px; }

        .filter-tabs { display: flex; gap: 10px; margin-bottom: 30px; }
        .tab-btn { padding: 10px 20px; border-radius: 10px; border: 1px solid #ddd; background: white; color: #7f8c8d; font-weight: 600; cursor: pointer; transition: 0.2s; display: flex; gap: 8px; align-items: center; }
        .tab-btn.active { background: #7C4B2A; color: white; border-color: #7C4B2A; }
        .count { background: rgba(0,0,0,0.05); padding: 2px 8px; border-radius: 10px; font-size: 11px; }
        .active .count { background: rgba(255,255,255,0.2); }

        .review-card { background: white; border: 1px solid #eee; border-radius: 15px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.02); }
        .review-card.pending { border-left: 5px solid #f1c40f; }
        .review-card.approved { border-left: 5px solid #27ae60; }

        .review-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 20px; margin-bottom: 20px; }
        .product-info { display: flex; gap: 12px; align-items: center; }
        .mini-prod-img { width: 50px; height: 50px; border-radius: 10px; object-fit: cover; }
        .p-names { display: flex; flex-direction: column; }
        .p-name { font-weight: 700; color: #2c3e50; font-size: 14px; }
        .review-date { font-size: 11px; color: #95a5a6; }

        .customer-info { display: flex; flex-direction: column; gap: 5px; }
        .c-name { font-weight: 600; font-size: 13px; display: flex; align-items: center; gap: 6px; }
        .c-phone { font-size: 12px; color: #7f8c8d; }

        .featured-badge { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #1565c0; font-weight: 700; background: #e3f2fd; padding: 3px 8px; border-radius: 5px; margin-top: 5px; }

        .review-body { background: #fcfcfc; padding: 15px; border-radius: 10px; margin-bottom: 20px; }
        .review-body p { margin: 0; font-size: 14px; line-height: 1.6; color: #2c3e50; }
        .truncated { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .toggle-text { background: none; border: none; color: #7C4B2A; font-weight: 700; font-size: 12px; cursor: pointer; margin-top: 10px; display: flex; align-items: center; gap: 5px; }

        .review-images { display: flex; gap: 10px; margin-top: 15px; }
        .review-img { width: 60px; height: 60px; border-radius: 8px; object-fit: cover; border: 1px solid #eee; }

        .admin-reply { margin-top: 15px; padding: 12px; background: #f0f7f2; border-radius: 8px; border-left: 3px solid #27ae60; }
        .reply-header { font-size: 11px; font-weight: 800; color: #27ae60; text-transform: uppercase; margin-bottom: 5px; display: flex; align-items: center; gap: 5px; }
        .admin-reply p { font-size: 13px; color: #2e7d32; font-style: italic; }

        .review-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 15px; border-top: 1px solid #f1f1f1; }
        .status-indicator { font-size: 12px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.pending { background: #f1c40f; }
        .dot.approved { background: #27ae60; }
        
        .actions { display: flex; gap: 10px; }
        .btn { display: flex; align-items: center; gap: 6px; padding: 8px 12px; border-radius: 8px; border: 1px solid #ddd; background: white; font-size: 12px; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .btn:hover { background: #f8f9fa; }
        .btn.approve { background: #e8f5e9; color: #2e7d32; border-color: #c8e6c9; }
        .btn.reject { background: #ffebee; color: #c62828; border-color: #ffcdd2; }
        .btn.delete-btn { color: #95a5a6; }
        .btn.delete-btn:hover { color: #c62828; background: #ffebee; }

        .reply-input-box { display: none; margin-top: 20px; gap: 10px; }
        .reply-input-box textarea { flex: 1; height: 40px; padding: 10px; border-radius: 8px; border: 1px solid #ddd; resize: none; font-size: 13px; }
        .send-reply { width: 40px; height: 40px; background: #7C4B2A; color: white; border: none; border-radius: 8px; cursor: pointer; }
      `}</style>
    </div>
  );
}

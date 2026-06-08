'use client';

import styles from './ShowReview.module.css';

export default function ShowReview({ reviews = [], orders = [] }) {
  // Filter only 5-star reviews (coerce rating to number) and limit to 5
  const fiveStar = (reviews || []).filter(r => {
    if (!r) return false;
    const ratingNum = Number(r.rating);
    return ratingNum === 5;
  }).slice(0,5);

  // Debug info to help troubleshoot DB vs UI mismatches
  if (typeof window !== 'undefined') {
    console.debug('ShowReview: total reviews=', (reviews || []).length, 'fiveStarCount=', fiveStar.length);
  }

  const getAddressFor = (review) => {
    if (!review || !review.order_id) return '';
    const order = (orders || []).find(o => String(o.id) === String(review.order_id));
    return order ? (order.deliveryAddress || order.delivery_address || '') : '';
  };

  const initials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    return (parts[0]?.[0] || '') + (parts[1]?.[0] || '');
  };

  return (
    <section className={styles.showReviewSection} aria-labelledby="customer-reviews-title">
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 id="customer-reviews-title">গ্রাহকের মতামত</h2>
          <p className="section-subtitle">গ্রাহকদের বাস্তব ফিডব্যাক — কেবল ৫-তারকারি রিভিউ</p>
        </div>

        <div className={styles.reviewsGrid}>
          {fiveStar.length === 0 && (
            <div className={styles.reviewCard}>কোনো রিভিউ পাওয়া যায়নি।</div>
          )}

          {fiveStar.map((rev) => (
            <article key={rev.id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <div className={styles.avatar} aria-hidden>
                  {initials(rev.customer_name)}
                </div>
                <div>
                  <div className={styles.reviewerName}>{rev.customer_name || 'অতিথি'}</div>
                  <div className={styles.address}>{getAddressFor(rev)}</div>
                </div>
                
              </div>
              <div className={styles.rating} aria-label={`Rating ${rev.rating} out of 5`}>
                  <span className={styles.stars}>
                    {'★'.repeat(rev.rating || 0)}{'☆'.repeat(5 - (rev.rating || 0))}
                  </span>
                </div>
              <div className={styles.comment}>{rev.review_text || ''}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

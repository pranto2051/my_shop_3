'use client';

import OrderProcess from '@/components/OrderProcess';
import storeInfoRaw from '@/data/shopInfo';

export default function OrderProcessPage() {
  const storeInfo = storeInfoRaw.default || storeInfoRaw;

  return (
    <div className="order-process-page-wrapper">
      <div className="page-banner">
        <div className="container">
          <h1 className="page-title">অর্ডার প্রক্রিয়া</h1>
          <p className="page-subtitle">কিভাবে আপনার পছন্দের ফার্নিচার অর্ডার করবেন তার বিস্তারিত ধাপসমূহ</p>
        </div>
      </div>
      
      <OrderProcess storeInfo={storeInfo} />
      
      <style jsx>{`
        .page-banner {
          background: var(--primary);
          padding: 4rem 0;
          text-align: center;
          color: white;
          margin-bottom: 2rem;
        }
        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .page-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
        }
        .order-process-page-wrapper {
          padding-top: 80px; /* Offset for sticky header */
        }
      `}</style>
    </div>
  );
}

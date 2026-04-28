'use client';

import ContactSection from '@/components/ContactSection';
import storeInfoRaw from '@/data/shopInfo';

export default function ContactPage() {
  const storeInfo = storeInfoRaw.default || storeInfoRaw;

  return (
    <div className="contact-page-wrapper">
      <div className="page-banner">
        <div className="container">
          <h1 className="page-title">যোগাযোগ</h1>
          <p className="page-subtitle">আমাদের সাথে যোগাযোগ করুন এবং আপনার পছন্দের ফার্নিচার অর্ডার করুন</p>
        </div>
      </div>
      
      <ContactSection storeInfo={storeInfo} />
      
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
        .contact-page-wrapper {
          padding-top: 80px; /* Offset for sticky header */
        }
      `}</style>
    </div>
  );
}

'use client';

import OrderProcess from '@/components/OrderProcess';
import { useAdmin } from '@/app/context/AdminContext';

export default function OrderProcessPage() {
  const { state } = useAdmin();
  const storeInfo = state.shopInfo || {
    name: "মা ফার্নিচার",
    contactLabel: "যোগাযোগ করুন",
    showroomAddress: { label: "শোরুমের ঠিকানা", address: "মিরপুর ১০, ঢাকা" },
    callNumbers: { label: "সরাসরি কল করুন", numbers: ["01711-000000"] },
    whatsapp: { label: "WhatsApp মেসেজ", number: "01711000000" },
    email: { label: "ইমেইল", address: "মিরপুর ১০, ঢাকা" },
    directMessageLabel: "সরাসরি মেসেজ দিন",
    openingHours: { label: "খোলা থাকার সময়", schedule: ["09:00 AM - 09:00 PM"] }
  };

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

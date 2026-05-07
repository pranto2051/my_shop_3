'use client';

import React from 'react';
import { useAdmin } from '@/app/context/AdminContext';

export default function OurWorkPage() {
  const { state } = useAdmin();
  const { gallery } = state;

  return (
    <main className="gallery-page" suppressHydrationWarning>
      {/* Page Header */}
      <section className="gallery-header" suppressHydrationWarning>
        <div className="container" suppressHydrationWarning>
          <div className="header-content" suppressHydrationWarning>
            <span className="subtitle" suppressHydrationWarning>গ্যালারি</span>
            <h1 suppressHydrationWarning>আমাদের বাস্তব কাজসমূহ</h1>
            <div className="title-divider" suppressHydrationWarning></div>
            <p suppressHydrationWarning>আমাদের শোরুম থেকে সরবরাহকৃত কিছু পণ্যের বাস্তব ছবি। আমরা বিশ্বাস করি কাজের গুণমানই আমাদের মূল পরিচয়।</p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="gallery-grid-section" suppressHydrationWarning>
        <div className="container" suppressHydrationWarning>
          <div className="gallery-masonry" suppressHydrationWarning>
            {gallery.map((item, index) => (
              <div key={item.id} className="gallery-item-premium" style={{ '--delay': `${index * 0.1}s` }} suppressHydrationWarning>
                <div className="image-container" suppressHydrationWarning>
                  <img src={item.image} alt={item.title} className="gallery-img" suppressHydrationWarning />
                  <div className="image-overlay" suppressHydrationWarning>
                    <div className="overlay-content" suppressHydrationWarning>
                      <h3 suppressHydrationWarning>{item.title}</h3>
                      <p suppressHydrationWarning>সফল ডেলিভারি ও সন্তুষ্ট গ্রাহক</p>
                      <div className="zoom-icon" suppressHydrationWarning>
                        <i className="fas fa-search-plus"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {gallery.length === 0 && (
            <div className="empty-gallery" suppressHydrationWarning>
              <i className="fas fa-hammer"></i>
              <p suppressHydrationWarning>গ্যালারিতে বর্তমানে কোন ছবি নেই।</p>
            </div>
          )}
        </div>
      </section>

      {/* Quality Commitment Section */}
      <section className="commitment-section" suppressHydrationWarning>
        <div className="container" suppressHydrationWarning>
          <div className="commitment-card" suppressHydrationWarning>
            <div className="card-icon" suppressHydrationWarning>
              <i className="fas fa-check-circle"></i>
            </div>
            <h2 suppressHydrationWarning>সেরা মানের নিশ্চয়তা</h2>
            <p suppressHydrationWarning>আমরা প্রতিটি আসবাবপত্র তৈরিতে সর্বোচ্চ মানের কাঠ এবং আধুনিক প্রযুক্তি ব্যবহার করি। আমাদের প্রতিটি কাজ আমাদের কারিগরদের দক্ষতার স্বাক্ষর বহন করে।</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        .gallery-page {
          background-color: #ffffff;
          min-height: 100vh;
        }

        .gallery-header {
          padding: 140px 0 80px;
          background-color: #2c3e50;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .gallery-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('https://www.transparenttextures.com/patterns/dark-wood.png');
          opacity: 0.1;
        }

        .header-content {
          position: relative;
          z-index: 1;
        }

        .subtitle {
          display: block;
          font-family: 'Bebas Neue', cursive;
          font-size: 1.5rem;
          letter-spacing: 4px;
          color: #d4af37;
          margin-bottom: 10px;
        }

        .header-content h1 {
          font-family: 'Noto Sans Bengali', sans-serif;
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .title-divider {
          width: 80px;
          height: 4px;
          background: #d4af37;
          margin: 0 auto 25px;
          border-radius: 2px;
        }

        .header-content p {
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
          opacity: 0.8;
        }

        .gallery-grid-section {
          padding: 80px 0;
          background-color: #f9f9f9;
        }

        .gallery-masonry {
          columns: 3 300px;
          column-gap: 25px;
        }

        .gallery-item-premium {
          break-inside: avoid;
          margin-bottom: 25px;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.08);
          position: relative;
          background: white;
          animation: scaleIn 0.6s ease forwards;
          animation-delay: var(--delay);
          opacity: 0;
          transform: scale(0.9);
        }

        @keyframes scaleIn {
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .image-container {
          position: relative;
          cursor: pointer;
        }

        .gallery-img {
          width: 100%;
          display: block;
          height: auto;
          transition: transform 0.5s ease;
        }

        .gallery-item-premium:hover .gallery-img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          align-items: flex-end;
          padding: 30px;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .gallery-item-premium:hover .image-overlay {
          opacity: 1;
        }

        .overlay-content h3 {
          color: white;
          font-size: 1.2rem;
          margin-bottom: 5px;
          transform: translateY(20px);
          transition: transform 0.4s ease;
        }

        .overlay-content p {
          color: #d4af37;
          font-size: 0.85rem;
          margin-bottom: 15px;
          transform: translateY(20px);
          transition: transform 0.4s ease 0.1s;
        }

        .zoom-icon {
          width: 40px;
          height: 40px;
          background: rgba(212, 175, 55, 0.9);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(20px);
          transition: transform 0.4s ease 0.2s;
        }

        .gallery-item-premium:hover .overlay-content h3,
        .gallery-item-premium:hover .overlay-content p,
        .gallery-item-premium:hover .zoom-icon {
          transform: translateY(0);
        }

        .commitment-section {
          padding: 100px 0;
          background: white;
          text-align: center;
        }

        .commitment-card {
          max-width: 800px;
          margin: 0 auto;
          padding: 60px;
          background: #fdfaf6;
          border-radius: 30px;
          border: 1px solid #eee;
          box-shadow: 0 15px 40px rgba(0,0,0,0.03);
        }

        .card-icon {
          font-size: 3.5rem;
          color: #d4af37;
          margin-bottom: 25px;
        }

        .commitment-card h2 {
          font-size: 2.2rem;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        .commitment-card p {
          font-size: 1.1rem;
          color: #7f8c8d;
          line-height: 1.8;
        }

        .empty-gallery {
          text-align: center;
          padding: 100px 0;
          color: #bdc3c7;
        }

        .empty-gallery i {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .gallery-header {
            padding: 120px 0 60px;
          }
          .header-content h1 {
            font-size: 2.2rem;
          }
          .gallery-masonry {
            columns: 1;
            padding: 0 20px;
          }
          .commitment-card {
            padding: 40px 20px;
            margin: 0 20px;
          }
        }
      `}</style>
    </main>
  );
}

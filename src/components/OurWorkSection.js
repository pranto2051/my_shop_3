'use client';

import React from 'react';
import Link from 'next/link';

export default function OurWorkSection({ gallery }) {
  if (!gallery || gallery.length === 0) return null;

  return (
    <section className="category-section" id="our-work-section" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            <div className="cat-section-icon"><i className="fas fa-hammer"></i></div>
            <div>
              <h2 className="cat-section-title">আমাদের কাজ</h2>
              <p className="cat-section-desc">আমাদের তৈরি কিছু পণ্যের বাস্তব ছবি</p>
              <div className="section-divider"></div>
            </div>
          </div>
          <Link href="/our-work" className="see-all-link">সকল কাজ দেখুন <i className="fas fa-arrow-right"></i></Link>
        </div>
        
        <div className="work-gallery">
          {gallery.slice(0, 3).map((item) => (
            <div key={item.id} className="work-item">
              <div className="work-image-wrapper">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="work-image"
                />
                <div className="work-info-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .work-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }
        .work-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 4/3;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .work-image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }
        .work-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .work-item:hover .work-image {
          transform: scale(1.1);
        }
        .work-info-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          padding: 20px;
          color: white;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .work-item:hover .work-info-overlay {
          opacity: 1;
        }
        .work-info-overlay h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 500;
        }
        @media (max-width: 768px) {
          .work-gallery {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            gap: 15px;
          }
          .work-info-overlay {
            opacity: 1;
            background: linear-gradient(transparent, rgba(0,0,0,0.6));
            padding: 10px;
          }
          .work-info-overlay h3 {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';

export default function DesignSection({ designs }) {
  if (!designs || designs.length === 0) return null;

  return (
    <section className="category-section" id="design-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            <div className="cat-section-icon"><i className="fas fa-palette"></i></div>
            <div>
              <h2 className="cat-section-title">আমাদের ডিজাইনসমূহ</h2>
              <p className="cat-section-desc">আপনার পছন্দের ডিজাইনটি বেছে নিন</p>
              <div className="section-divider"></div>
            </div>
          </div>
          <Link href="/designs" className="see-all-link">সকল ডিজাইন দেখুন <i className="fas fa-arrow-right"></i></Link>
        </div>
        
        <div className="design-grid">
          {designs.slice(0, 4).map((design) => (
            <div key={design.id} className="design-card">
              <div className="design-image-container">
                <img 
                  src={design.image} 
                  alt={design.name} 
                  className="design-image"
                />
                <div className="design-overlay">
                  <span className="design-category">{design.category}</span>
                </div>
              </div>
              <div className="design-info">
                <h3>{design.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .design-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 25px;
          margin-top: 30px;
        }
        .design-card {
          background: #fff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
        }
        .design-card:hover {
          transform: translateY(-5px);
        }
        .design-image-container {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .design-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .design-card:hover .design-image {
          transform: scale(1.1);
        }
        .design-overlay {
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .design-category {
          background: rgba(var(--primary-rgb, 139, 69, 19), 0.9);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }
        .design-info {
          padding: 15px;
          text-align: center;
        }
        .design-info h3 {
          margin: 0;
          font-size: 1.1rem;
          color: #333;
          font-weight: 600;
        }
        @media (max-width: 768px) {
          .design-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
          }
          .design-image-container {
            height: 150px;
          }
        }
      `}</style>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import Image from 'next/image';

export default function DesignsPage() {
  const { state } = useAdmin();
  const { designs } = state;
  const [activeFilter, setActiveFilter] = useState('সবগুলো');

  const categories = ['সবগুলো', ...new Set(designs.map(d => d.category))];
  
  const filteredDesigns = activeFilter === 'সবগুলো' 
    ? designs 
    : designs.filter(d => d.category === activeFilter);

  return (
    <main className="designs-page">
      {/* Hero Section */}
      <section className="designs-hero">
        <div className="container">
          <div className="hero-content">
            <h1>আমাদের ডিজাইন কালেকশন</h1>
            <p>আপনার পছন্দের আসবাবপত্রের জন্য সেরা এবং আধুনিক ডিজাইনগুলো এখানে খুঁজে পাবেন। প্রতিটি ডিজাইন আমাদের দক্ষ কারিগরদের দ্বারা নিপুণভাবে তৈরি।</p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-wrapper">
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="designs-grid-section">
        <div className="container">
          {filteredDesigns.length > 0 ? (
            <div className="designs-grid">
              {filteredDesigns.map((design, index) => (
                <div key={design.id} className="design-card-premium" style={{ '--delay': `${index * 0.1}s` }}>
                  <div className="card-image-wrapper">
                    <img src={design.image} alt={design.name} className="card-img" />
                    <div className="card-badge">{design.category}</div>
                    <div className="card-overlay">
                      <button className="view-details-btn">বিস্তারিত দেখুন</button>
                    </div>
                  </div>
                  <div className="card-info">
                    <h3>{design.name}</h3>
                    <div className="card-divider"></div>
                    <p>প্রিমিয়াম কোয়ালিটি এবং আধুনিক কারুকার্য</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fas fa-palette"></i>
              <p>এই ক্যাটাগরিতে কোন ডিজাইন পাওয়া যায়নি।</p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .designs-page {
          background-color: #fdfaf6;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        .designs-hero {
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
          background-size: cover;
          background-position: center;
          padding: 120px 0 80px;
          color: white;
          text-align: center;
          margin-bottom: 40px;
        }

        .hero-content h1 {
          font-family: 'Noto Sans Bengali', sans-serif;
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .hero-content p {
          font-size: 1.2rem;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.6;
          opacity: 0.9;
        }

        .filter-section {
          margin-bottom: 50px;
        }

        .filter-wrapper {
          display: flex;
          justify-content: center;
          gap: 15px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 10px 25px;
          border-radius: 30px;
          border: 2px solid #8b4513;
          background: transparent;
          color: #8b4513;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover, .filter-btn.active {
          background: #8b4513;
          color: white;
        }

        .designs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        .design-card-premium {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          animation: fadeInUp 0.6s ease forwards;
          animation-delay: var(--delay);
          opacity: 0;
          transform: translateY(20px);
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .design-card-premium:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .card-image-wrapper {
          position: relative;
          height: 250px;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .design-card-premium:hover .card-img {
          transform: scale(1.1);
        }

        .card-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(139, 69, 19, 0.9);
          color: white;
          padding: 5px 15px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          backdrop-filter: blur(5px);
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .design-card-premium:hover .card-overlay {
          opacity: 1;
        }

        .view-details-btn {
          padding: 10px 25px;
          background: white;
          color: #8b4513;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transform: translateY(20px);
          transition: all 0.3s ease;
        }

        .design-card-premium:hover .view-details-btn {
          transform: translateY(0);
        }

        .card-info {
          padding: 25px;
          text-align: center;
        }

        .card-info h3 {
          font-size: 1.3rem;
          color: #2c3e50;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .card-divider {
          width: 40px;
          height: 3px;
          background: #8b4513;
          margin: 0 auto 15px;
          border-radius: 2px;
        }

        .card-info p {
          color: #7f8c8d;
          font-size: 0.95rem;
        }

        .empty-state {
          text-align: center;
          padding: 100px 0;
          color: #bdc3c7;
        }

        .empty-state i {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.2rem;
          }
          .hero-content p {
            font-size: 1rem;
            padding: 0 20px;
          }
          .designs-grid {
            grid-template-columns: 1fr;
            padding: 0 20px;
          }
        }
      `}</style>
    </main>
  );
}

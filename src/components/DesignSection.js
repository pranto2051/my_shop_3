'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaTimes, FaTree, FaMoneyBillWave, FaClock, FaFingerprint, FaDownload, FaSearchPlus, FaSearchMinus, FaExpand } from 'react-icons/fa';

export default function DesignSection({ designs }) {
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  if (!designs || designs.length === 0) return null;

  const handleDownload = (imageUrl, imageName) => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${imageName || 'design'}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(() => alert('ছবি ডাউনলোড করা সম্ভব হয়নি।'));
  };

  const toggleFullScreen = () => {
    setFullScreenImage(!fullScreenImage);
    setZoomScale(1);
  };

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoomScale(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoomScale(prev => Math.max(prev - 0.5, 1));
  };

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
            <div 
              key={design.id} 
              className="design-card"
              onClick={() => setSelectedDesign(design)}
              style={{ cursor: 'pointer' }}
            >
              <div className="design-image-container">
                <img 
                  src={design.image} 
                  alt={design.name} 
                  className="design-image"
                />
                <div className="design-overlay">
                  <span className="design-category">{design.category}</span>
                </div>
                <div className="design-hover-overlay">
                  <span>বিস্তারিত দেখুন</span>
                </div>
              </div>
              <div className="design-info">
                <h3>{design.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Design Details Modal */}
      {selectedDesign && (
        <div className="modal-overlay" onClick={() => setSelectedDesign(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedDesign(null)}>
              <FaTimes />
            </button>
            
            <div className="modal-grid">
              <div className="modal-image-side" onClick={toggleFullScreen}>
                <img src={selectedDesign.image} alt={selectedDesign.name} />
                <div className="image-hint">
                  <FaExpand /> বড় করে দেখতে ক্লিক করুন
                </div>
              </div>
              <div className="modal-info-side">
                <div className="modal-header-info">
                  <span className="modal-badge">{selectedDesign.category}</span>
                  <h2>{selectedDesign.name}</h2>
                  <div className="id-badge">
                    <FaFingerprint /> ID: {selectedDesign.id}
                  </div>
                </div>

                <div className="details-list">
                  <div className="detail-item">
                    <div className="detail-icon"><FaTree /></div>
                    <div className="detail-text">
                      <label>কাঠের ধরন</label>
                      <p>{selectedDesign.woodType || 'অনির্ধারিত'}</p>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-icon"><FaMoneyBillWave /></div>
                    <div className="detail-text">
                      <label>আনুমানিক খরচ</label>
                      <p className="price-tag">{selectedDesign.cost ? `${selectedDesign.cost} টাকা` : 'আলোচনা সাপেক্ষে'}</p>
                    </div>
                  </div>
                  
                  <div className="detail-item">
                    <div className="detail-icon"><FaClock /></div>
                    <div className="detail-text">
                      <label>তৈরি করতে সময়</label>
                      <p>{selectedDesign.duration || 'আলোচনা সাপেক্ষে'}</p>
                    </div>
                  </div>
                </div>

                <div className="modal-description">
                  <p>আমাদের দক্ষ কারিগরদের দ্বারা নিপুণভাবে তৈরি করা এই ডিজাইনটি আপনার ঘরের সৌন্দর্য বহুগুণ বাড়িয়ে দেবে। আমরা উন্নত মানের কাঠ এবং আধুনিক ফিনিশিং ব্যবহার করি যা দীর্ঘস্থায়ী এবং টেকসই।</p>
                </div>

                <div className="modal-actions">
                  <button className="order-btn" onClick={() => alert('অর্ডার করতে আমাদের সাথে যোগাযোগ করুন।')}>
                    অর্ডার করতে যোগাযোগ করুন
                  </button>
                  <button className="download-btn-secondary" onClick={() => handleDownload(selectedDesign.image, selectedDesign.name)}>
                    <FaDownload /> ডিজাইন ডাউনলোড করুন
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Screen Image Viewer */}
      {fullScreenImage && selectedDesign && (
        <div className="fullscreen-overlay" onClick={toggleFullScreen}>
          <div className="fullscreen-controls">
            <button className="control-btn" onClick={handleZoomIn} title="Zoom In"><FaSearchPlus /></button>
            <button className="control-btn" onClick={handleZoomOut} title="Zoom Out"><FaSearchMinus /></button>
            <button className="control-btn" onClick={() => handleDownload(selectedDesign.image, selectedDesign.name)} title="Download"><FaDownload /></button>
            <button className="control-btn close" onClick={toggleFullScreen} title="Close"><FaTimes /></button>
          </div>
          <div className="fullscreen-image-container">
            <img 
              src={selectedDesign.image} 
              alt={selectedDesign.name} 
              style={{ transform: `scale(${zoomScale})` }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

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
          z-index: 2;
        }
        .design-hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(139, 69, 19, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.3s ease;
          backdrop-filter: blur(3px);
          color: white;
          font-weight: 600;
          z-index: 1;
        }
        .design-card:hover .design-hover-overlay {
          opacity: 1;
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

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
          backdrop-filter: blur(8px);
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: #fff;
          width: 95vw;
          max-width: 1300px;
          height: 90vh;
          max-height: 850px;
          border-radius: 40px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,0.4);
          animation: scaleUp 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          display: flex;
          border: 1px solid rgba(255,255,255,0.2);
        }

        @keyframes scaleUp {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: white;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          color: #333;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .modal-close:hover {
          background: #8b4513;
          color: white;
          transform: rotate(90deg);
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          width: 100%;
          height: 100%;
        }

        .modal-image-side {
          height: 100%;
          background: #1a1a1a;
          position: relative;
          cursor: zoom-in;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-image-side::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%);
          pointer-events: none;
        }

        .modal-image-side img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .modal-image-side:hover img {
          transform: scale(1.02);
        }

        .image-hint {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.1);
          color: white;
          padding: 12px 25px;
          border-radius: 30px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255,255,255,0.2);
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .modal-image-side:hover .image-hint {
          opacity: 1;
          bottom: 40px;
        }

        .modal-info-side {
          padding: 60px;
          display: flex;
          flex-direction: column;
          text-align: left;
          background: #fff;
          overflow-y: auto;
          height: 100%;
          position: relative;
        }

        .modal-info-side::-webkit-scrollbar {
          width: 6px;
        }

        .modal-info-side::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 10px;
        }

        .modal-header-info {
          margin-bottom: 45px;
        }

        .modal-badge {
          background: #fdf2e9;
          color: #8b4513;
          padding: 8px 20px;
          border-radius: 30px;
          font-size: 0.9rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .modal-header-info h2 {
          font-size: 3rem;
          color: #2d1810;
          margin-bottom: 15px;
          font-weight: 900;
          line-height: 1.1;
          font-family: 'Noto Sans Bengali', sans-serif;
        }

        .id-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #8b4513;
          font-size: 0.9rem;
          font-family: 'Courier New', monospace;
          background: #fdf2e9;
          width: fit-content;
          padding: 6px 15px;
          border-radius: 10px;
          font-weight: 600;
        }

        .details-list {
          display: grid;
          gap: 30px;
          margin-bottom: 50px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 25px;
          padding: 20px;
          background: #fafafa;
          border-radius: 20px;
          transition: transform 0.3s ease;
        }

        .detail-item:hover {
          transform: translateX(10px);
          background: #fdf2e9;
        }

        .detail-icon {
          width: 60px;
          height: 60px;
          background: #fff;
          color: #8b4513;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          box-shadow: 0 10px 20px rgba(139, 69, 19, 0.1);
        }

        .detail-text label {
          display: block;
          font-size: 0.85rem;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 5px;
          font-weight: 700;
        }

        .detail-text p {
          font-size: 1.4rem;
          color: #333;
          font-weight: 800;
          margin: 0;
        }

        .price-tag {
          color: #8b4513 !important;
        }

        .modal-description {
          color: #555;
          line-height: 1.8;
          margin-bottom: 50px;
          font-size: 1.15rem;
          padding: 25px;
          background: #fdf2e9;
          border-radius: 20px;
          border-left: 6px solid #8b4513;
        }

        .modal-actions {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .order-btn {
          width: 100%;
          background: #8b4513;
          color: white;
          border: none;
          padding: 22px 40px;
          border-radius: 20px;
          font-size: 1.2rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 15px 30px rgba(139, 69, 19, 0.3);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .order-btn:hover {
          background: #6f370f;
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(139, 69, 19, 0.4);
        }

        .download-btn-secondary {
          width: 100%;
          background: #fff;
          color: #8b4513;
          border: 2px solid #8b4513;
          padding: 18px 40px;
          border-radius: 20px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .download-btn-secondary:hover {
          background: #fdf2e9;
          transform: translateY(-2px);
        }

        /* Fullscreen Viewer Styles */
        .fullscreen-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.95);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }

        .fullscreen-controls {
          position: absolute;
          top: 30px;
          right: 30px;
          display: flex;
          gap: 15px;
          z-index: 2001;
        }

        .control-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .control-btn:hover {
          background: #8b4513;
          border-color: #8b4513;
          transform: scale(1.1);
        }

        .control-btn.close {
          background: rgba(255,59,48,0.2);
        }

        .control-btn.close:hover {
          background: #ff3b30;
        }

        .fullscreen-image-container {
          width: 90vw;
          height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: auto;
          scrollbar-width: none;
        }

        .fullscreen-image-container::-webkit-scrollbar {
          display: none;
        }

        .fullscreen-image-container img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
          cursor: grab;
        }

        .fullscreen-image-container img:active {
          cursor: grabbing;
        }

        @media (max-width: 1024px) {
          .modal-grid {
            grid-template-columns: 1fr;
          }
          .modal-content {
            height: 95vh;
            max-height: none;
          }
          .modal-image-side {
            height: 450px;
          }
          .modal-info-side {
            padding: 40px;
          }
          .modal-header-info h2 {
            font-size: 2.2rem;
          }
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

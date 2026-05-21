'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/app/context/AdminContext';
import Image from 'next/image';
import { FaTimes, FaTree, FaMoneyBillWave, FaClock, FaFingerprint, FaDownload, FaSearchPlus, FaSearchMinus, FaExpand } from 'react-icons/fa';
import styles from './page.module.css';

export default function DesignsPage() {
  const { state } = useAdmin();
  const { designs } = state;
  const [activeFilter, setActiveFilter] = useState('সবগুলো');
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  const categories = ['সবগুলো', ...new Set(designs.map(d => d.category))];

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
  
  const filteredDesigns = activeFilter === 'সবগুলো' 
    ? designs 
    : designs.filter(d => d.category === activeFilter);

  return (
    <main className={styles.pageShell}>
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
                <div 
                  key={design.id} 
                  className="design-card-premium" 
                  style={{ '--delay': `${index * 0.1}s` }}
                  onClick={() => setSelectedDesign(design)}
                >
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

    </main>
  );
}

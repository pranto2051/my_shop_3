'use client';

import { useState, useEffect } from 'react';

export default function ProductModal({ isOpen, onClose, product, categories, storeInfo }) {
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
    }
  }, [product]);

  // Handle background scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const cat = categories.find(c => c.id === product.categoryId);
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const waText = encodeURIComponent(
    `আসসালামু আলাইকুম, আমি ${product.name} (ID: ${product.id}) অর্ডার করতে চাই। পরিমাণ: 1 টি।`
  );

  const images = product.images || [product.image];

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-container active" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="বন্ধ করুন">
          <i className="fas fa-times"></i>
        </button>
        
        <div className="modal-content" id="modalContent">
          <div className="modal-left">
            <img src={activeImage || product.image} alt={product.name} className="modal-main-img" id="modalMainImg"
                 onError={(e) => { e.target.src = 'https://placehold.co/600x500/8B4E38/FAF6F1?text=No+Image'; }} />
            <div className="modal-thumbnails">
              {images.map((img, i) => (
                <img 
                  key={i}
                  src={img} 
                  alt={`${product.name} - ছবি ${i + 1}`} 
                  loading="lazy"
                  className={`modal-thumb ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                  onError={(e) => { e.target.src = 'https://placehold.co/600x500/8B4E38/FAF6F1?text=No+Image'; }}
                />
              ))}
            </div>
          </div>
          <div className="modal-right">
            <button className="modal-id" onClick={() => navigator.clipboard.writeText(product.id)} title="ক্লিক করে কপি করুন">
              <i className="fas fa-copy"></i> #{product.id}
            </button>

            <h2 className="modal-name">{product.name}</h2>
            {product.nameEn && <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 500 }}>{product.nameEn}</p>}

            <div className="modal-rating-row">
              <div className="modal-rating-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <i 
                    key={i}
                    className={`fas fa-star${i <= Math.floor(product.rating) ? '' : (i - product.rating < 1 && i - product.rating > 0 ? '-half-alt' : '-o')}`}
                    style={{ color: 'var(--accent)' }}
                  ></i>
                ))}
              </div>
              <span className="modal-rating-count"><strong>{product.rating.toFixed(1)}</strong> তারকা ({product.reviewCount} রিভিউ)</span>
            </div>

            <div className="modal-price-row">
              <span className="modal-price">৳{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="modal-original-price">৳{product.originalPrice.toLocaleString()}</span>
                  <span className="modal-discount-badge">-{discount}% ছাড়</span>
                </>
              )}
            </div>

            <div className="modal-description">
              <p>{product.description}</p>
            </div>

            <div className="modal-specs">
              {product.material && (
                <div className="spec-row">
                  <span className="spec-label">উপাদান</span>
                  <span className="spec-value">{product.material}</span>
                </div>
              )}
              {product.dimensions && (
                <div className="spec-row">
                  <span className="spec-label">মাপ</span>
                  <span className="spec-value">{product.dimensions}</span>
                </div>
              )}
              {product.color && (
                <div className="spec-row">
                  <span className="spec-label">রঙ</span>
                  <span className="spec-value">{product.color}</span>
                </div>
              )}
              <div className="spec-row">
                <span className="spec-label">ক্যাটাগরি</span>
                <span className="spec-value">{cat ? cat.name : '—'}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">স্টক</span>
                <span className="spec-value">
                  {product.inStock 
                    ? <span className="spec-in-stock"><i className="fas fa-check-circle"></i> পাওয়া যাচ্ছে</span>
                    : <span className="spec-out-stock"><i className="fas fa-times-circle"></i> স্টকে নেই</span>
                  }
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <a href={`https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=${waText}`} 
                 className="modal-wa-btn" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i> WhatsApp এ অর্ডার করুন
              </a>
              <button className="modal-call-btn" onClick={() => window.location.href = `tel:${storeInfo.callNumbers.numbers[0].replace(/-/g, '')}`}>
                <i className="fas fa-phone-alt"></i> কল করুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

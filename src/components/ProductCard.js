'use client';

import { useAdmin } from '@/app/context/AdminContext';

export default function ProductCard({ product, categories, storeInfo, openProductDetail, index }) {
  const { showToast } = useAdmin();
  const cat = categories.find(c => c.id === product.categoryId);
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  const handleCopyId = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(product.id);
    showToast('ID সফলভাবে কপি করা হয়েছে!', 'success');
  };

  return (
    <div className="product-card" style={{ animationDelay: `${index * 0.08}s` }} suppressHydrationWarning>
      <div className="card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" className="card-img" />
        <div className="card-badges">
          {discount > 0 && <span className="badge badge-discount">-{discount}%</span>}
          {product.isTopSelling && <span className="badge badge-top">TOP</span>}
          {!product.inStock && <span className="badge badge-out">স্টক নেই</span>}
        </div>
        <div className="card-overlay-actions">
          <a href={`https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=আমি+${encodeURIComponent(product.name)}+(ID%3A+${product.id})+অর্ডার+করতে+চাই।`} className="card-wa-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp অর্ডার"><i className="fab fa-whatsapp"></i></a>
        </div>
        <button className="product-id-badge" onClick={handleCopyId} aria-label="ID কপি করুন">#{product.id}</button>
      </div>
      <div className="card-body">
        {cat && <div className="category-tag"><i className={`fas fa-${cat.icon}`}></i> {cat.name}</div>}
        <h3 className="product-name">{product.name}</h3>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((i) => (
            <i key={i} className={`fas fa-star${i <= Math.floor(product.rating) ? '' : (i - product.rating < 1 && i - product.rating > 0 ? '-half-alt' : '')}`}></i>
          ))}
          <span>({product.reviewCount})</span>
        </div>
        <div className="price-row">
          <span className="price">৳{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && <span className="original-price">৳{product.originalPrice.toLocaleString()}</span>}
        </div>
        <button className="btn-detail btn-card-detail" onClick={() => openProductDetail(product)}>বিস্তারিত দেখুন</button>
      </div>
    </div>
  );
}

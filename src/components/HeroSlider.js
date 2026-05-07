'use client';

import { useState, useEffect, useRef } from 'react';

export default function HeroSlider({ products, categories, storeInfo, openProductDetail }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderInterval = useRef(null);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [currentSlide, products.length]);

  const startAutoplay = () => {
    if (products.length <= 1) return;
    stopAutoplay();
    sliderInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);
  };

  const stopAutoplay = () => {
    if (sliderInterval.current) clearInterval(sliderInterval.current);
  };

  console.log('HeroSlider - products:', products?.length);
  if (!products || products.length === 0) return null;

  return (
    <section className="hero-slider-section" id="heroSlider" aria-label="হিরো স্লাইডার" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
      <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {products.map((product, index) => {
          const cat = categories.find(c => c.id === product.categoryId);
          const discount = product.originalPrice > product.price
            ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
          return (
            <div key={product.id} className={`slide ${index === currentSlide ? 'active' : ''}`}>
              <div className="slide-bg"></div>
              <div className="slide-inner container">
                <div className="slide-image-side">
                  <div className="slide-img-wrap">
                    <img src={product.image} alt={product.name} loading={index === 0 ? 'eager' : 'lazy'} className="slide-img" />
                  </div>
                </div>
                <div className="slide-text-side">
                  {cat && <div className="slide-badge"><i className={`fas fa-${cat.icon}`}></i> {cat.name}</div>}
                  <h1 className="slide-title">{product.name}</h1>
                  <p className="slide-desc">{product.description.substring(0, 80)}...</p>
                  <div className="slide-price-row">
                    <span className="slide-price">৳{product.price.toLocaleString('bn-BD')}</span>
                    {discount > 0 && <span className="slide-discount">-{discount}%</span>}
                  </div>
                  <div className="slide-actions">
                    <button className="btn-outline-hero" onClick={() => openProductDetail(product)}>বিস্তারিত দেখুন</button>
                    <a href={`https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=আসসালামু+আলাইকুম%2C+আমি+${encodeURIComponent(product.name)}+(ID%3A+${product.id})+অর্ডার+করতে+চাই।`} className="btn-filled-hero" target="_blank" rel="noopener noreferrer">অর্ডার করুন <i className="fas fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="slider-arrow slider-prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)} aria-label="পূর্ববর্তী">
        <i className="fas fa-chevron-left"></i>
      </button>
      <button className="slider-arrow slider-next" onClick={() => setCurrentSlide((prev) => (prev + 1) % products.length)} aria-label="পরবর্তী">
        <i className="fas fa-chevron-right"></i>
      </button>

      <div className="slider-dots" role="tablist">
        {products.map((_, i) => (
          <button key={i} className={`dot ${i === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(i)} role="tab" aria-label={`স্লাইড ${i + 1}`}></button>
        ))}
      </div>
    </section>
  );
}

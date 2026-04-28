'use client';

import ProductCard from './ProductCard';
import Link from 'next/link';

export default function ProductRow({ title, products, categories, storeInfo, openProductDetail, id, icon, description, viewAllLink, countBadge }) {
  const handleScroll = (id, direction) => {
    const el = document.getElementById(id);
    if (el) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  console.log(`ProductRow [${title}] - products:`, products?.length);
  if (!products || products.length === 0) return null;

  return (
    <section className={icon ? "category-section" : "top-selling-section"} id={id}>
      <div className="container">
        <div className="section-header">
          <div className="section-title-wrap">
            {icon && <div className="cat-section-icon"><i className={`fas fa-${icon}`}></i></div>}
            {!icon && <i className="fas fa-fire fire-icon"></i>}
            <div>
              <h2 className={icon ? "cat-section-title" : ""}>
                {title} {countBadge && <span className="count-badge">{countBadge}টি পণ্য</span>}
              </h2>
              {description && <p className="cat-section-desc">{description}</p>}
              <div className="section-divider"></div>
            </div>
          </div>
          {viewAllLink && <Link href={viewAllLink} className="see-all-link">সকল দেখুন <i className="fas fa-arrow-right"></i></Link>}
        </div>
        
        <div className="h-scroll-wrap">
          <button className="h-scroll-btn prev-btn" onClick={() => handleScroll(`row-${id}`, 'left')} aria-label="পূর্ববর্তী"><i className="fas fa-chevron-left"></i></button>
          <div className="product-h-row" id={`row-${id}`}>
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                categories={categories} 
                storeInfo={storeInfo} 
                openProductDetail={openProductDetail} 
                index={index} 
              />
            ))}
          </div>
          <button className="h-scroll-btn next-btn" onClick={() => handleScroll(`row-${id}`, 'right')} aria-label="পরবর্তী"><i className="fas fa-chevron-right"></i></button>
        </div>

        {icon && viewAllLink && (
          <div className="cat-section-footer">
            <Link href={viewAllLink} className="btn-see-more">আরও পণ্য দেখুন <i className="fas fa-arrow-right"></i></Link>
          </div>
        )}
      </div>
    </section>
  );
}

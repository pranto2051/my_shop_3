'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import productsRaw from '@/data/products';
import categoriesRaw from '@/data/categories';
import storeInfo from '@/data/shopInfo';
import ProductModal from '@/components/ProductModal';

export default function CategoryPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const categoryId = params.id;
  
  const getArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (val.default && Array.isArray(val.default)) return val.default;
    if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
    return [];
  };

  const productsData = getArray(productsRaw);
  const categories = getArray(categoriesRaw);
  const category = categories.find(c => c.id === categoryId);
  
  console.log('CategoryPage - id:', categoryId);
  console.log('CategoryPage - category found:', category?.name);
  console.log('CategoryPage - total products:', productsData.length);
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close sort dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSortOpen && !event.target.closest('.custom-sort-dropdown')) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSortOpen]);

  const sortOptions = [
    { value: 'newest', label: 'সর্বশেষ যোগ' },
    { value: 'price_asc', label: 'মূল্য (কম–বেশি)' },
    { value: 'price_desc', label: 'মূল্য (বেশি–কম)' },
    { value: 'popular', label: 'জনপ্রিয়তা' }
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label;

  useEffect(() => {
    let result = productsData.filter(p => p.categoryId === categoryId);

    if (minPrice) {
      result = result.filter(p => p.price >= parseInt(minPrice));
    }
    if (maxPrice) {
      result = result.filter(p => p.price <= parseInt(maxPrice));
    }

    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        result.sort((a, b) => b.id.localeCompare(a.id));
    }

    setFilteredProducts(result);
  }, [categoryId, minPrice, maxPrice, sortBy]);

  // Handle background scroll lock for sidebar
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isSidebarOpen]);

  if (!category) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>ক্যাটাগরি পাওয়া যায়নি</h2>
        <Link href="/" className="btn-go-home">হোমে ফিরুন</Link>
      </div>
    );
  }

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <main className="inner-page">
      <div className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb" aria-label="ব্রেডক্রাম্ব">
            <Link href="/">হোম</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{category.name}</span>
          </nav>
        </div>
      </div>

      <div className="category-hero-banner">
        <div className="container">
          <div className="cat-hero-inner">
            <div className="cat-hero-icon"><i className={`fas fa-${category.icon}`}></i></div>
            <div className="cat-hero-text">
              <h1>{category.name}</h1>
              <p>{category.description}</p>
              <span className="cat-product-count">{filteredProducts.length}টি পণ্য পাওয়া গেছে</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="category-layout">
          {/* Sidebar Overlay for mobile */}
          <div 
            className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`} 
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <aside className={`filter-sidebar ${isSidebarOpen ? 'open' : ''}`} id="filterSidebar">
            <div className="sidebar-header">
              <h3><i className="fas fa-sliders-h"></i> ফিল্টার</h3>
              <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)} aria-label="ফিল্টার বন্ধ করুন"><i className="fas fa-times"></i></button>
            </div>

            <div className="filter-group">
              <h4>মূল্য পরিসীমা</h4>
              <div className="price-range-inputs">
                <input 
                  type="number" 
                  placeholder="সর্বনিম্ন" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="filter-input" 
                />
                <span>—</span>
                <input 
                  type="number" 
                  placeholder="সর্বোচ্চ" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="filter-input" 
                />
              </div>
            </div>

            <div className="filter-group">
              <h4>সাজানো</h4>
              <div className="sort-radio-group">
                {['newest', 'price_asc', 'price_desc', 'popular'].map((opt) => (
                  <label key={opt} className="radio-label">
                    <input 
                      type="radio" 
                      name="catSort" 
                      value={opt} 
                      checked={sortBy === opt}
                      onChange={() => setSortBy(opt)}
                    /> 
                    {opt === 'newest' ? 'সর্বশেষ যোগ' : opt === 'price_asc' ? 'মূল্য (কম–বেশি)' : opt === 'price_desc' ? 'মূল্য (বেশি–কম)' : 'জনপ্রিয়তা'}
                  </label>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <h4>অন্যান্য ক্যাটাগরি</h4>
              <ul className="sidebar-cat-list">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.id}`} className={cat.id === categoryId ? 'active' : ''}>
                      <i className={`fas fa-${cat.icon}`}></i> {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div className="products-main">
            <div className="products-toolbar">
              <div className="toolbar-left">
                <button className="filter-toggle-btn" onClick={() => setIsSidebarOpen(true)}>
                  <i className="fas fa-sliders-h"></i> ফিল্টার
                </button>
                <span className="result-count">{filteredProducts.length}টি পণ্য</span>
              </div>
              <div className="toolbar-right">
                <div className={`custom-sort-dropdown ${isSortOpen ? 'active' : ''}`}>
                  <button className="sort-trigger" onClick={() => setIsSortOpen(!isSortOpen)}>
                    <span>{currentSortLabel}</span>
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  {isSortOpen && (
                    <div className="sort-options-menu">
                      {sortOptions.map((opt) => (
                        <button 
                          key={opt.value} 
                          className={`sort-option-item ${sortBy === opt.value ? 'active' : ''}`}
                          onClick={() => {
                            setSortBy(opt.value);
                            setIsSortOpen(false);
                          }}
                        >
                          {opt.label}
                          {sortBy === opt.value && <i className="fas fa-check"></i>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><i className="fas fa-box-open"></i></div>
                <h3>কোন পণ্য নেই</h3>
                <p>আপনার ফিল্টার অনুযায়ী কোন পণ্য খুঁজে পাওয়া যায়নি।</p>
                <button className="btn-go-home" onClick={() => { setMinPrice(''); setMaxPrice(''); setSortBy('newest'); }}>ফিল্টার মুছুন</button>
              </div>
            ) : (
              <div className="products-grid" id="categoryProductGrid">
                {filteredProducts.map((product, index) => {
                  const discount = product.originalPrice > product.price
                    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
                  return (
                    <div key={product.id} className="product-card fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
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
                        <button className="product-id-badge" onClick={() => navigator.clipboard.writeText(product.id)} aria-label="ID কপি করুন">#{product.id}</button>
                      </div>
                      <div className="card-body">
                        <div className="category-tag"><i className={`fas fa-${category.icon}`}></i> {category.name}</div>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="rating">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <i key={i} className={`fas fa-star${i <= Math.floor(product.rating) ? '' : (i - product.rating < 1 && i - product.rating > 0 ? '-half-alt' : '-o')}`}></i>
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
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
        categories={categories} 
        storeInfo={storeInfo} 
      />
    </main>
  );
}

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import productsRaw from '@/data/products';
import categoriesRaw from '@/data/categories';
import storeInfoRaw from '@/data/shopInfo';
import ProductModal from '@/components/ProductModal';
import ProductCard from '@/components/ProductCard';

function SearchResults() {
  const getArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (val.default && Array.isArray(val.default)) return val.default;
    if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
    return [];
  };

  const productsData = getArray(productsRaw);
  const categories = getArray(categoriesRaw);
  const storeInfo = storeInfoRaw.default || storeInfoRaw;

  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryId = searchParams.get('categoryId') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || '';

  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let filtered = [...productsData];

    if (query) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(p => {
        const idMatch = p.id.toLowerCase() === q;
        const nameMatch = p.name.toLowerCase().includes(q);
        const nameEnMatch = p.nameEn?.toLowerCase().includes(q);
        const tagMatch = p.tags && p.tags.some(t => t.toLowerCase().includes(q));
        return idMatch || nameMatch || nameEnMatch || tagMatch;
      });
    }

    if (categoryId && categoryId !== 'all') {
      filtered = filtered.filter(p => p.categoryId === categoryId);
    }

    if (minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
    }

    switch (sort) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        filtered.sort((a, b) => b.id.localeCompare(a.id));
    }

    setResults(filtered);
  }, [query, categoryId, minPrice, maxPrice, sort]);

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="search-page-header">
        <div className="container">
          {query ? (
            <h1>&quot;{query}&quot; এর জন্য <span className="result-number">{results.length}টি</span> পণ্য পাওয়া গেছে</h1>
          ) : (
            <h1>সকল পণ্য — <span className="result-number">{results.length}টি</span> পণ্য</h1>
          )}
        </div>
      </div>

      <div className="search-filter-bar">
        <div className="container">
          <form action="/search" method="GET" className="search-bar-form compact">
            <div className="search-fields">
              <div className="search-field">
                <i className="fas fa-search field-icon"></i>
                <input type="text" name="q" defaultValue={query} placeholder="পণ্যের নাম বা ID..." className="search-input" />
              </div>
              <div className="search-field">
                <i className="fas fa-th-large field-icon"></i>
                <select name="categoryId" defaultValue={categoryId} className="search-select">
                  <option value="">সকল ক্যাটাগরি</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="search-field price-range-field">
                <input type="number" name="minPrice" defaultValue={minPrice} placeholder="সর্বনিম্ন ৳" className="search-input price-input" min="0" />
                <span className="price-sep">—</span>
                <input type="number" name="maxPrice" defaultValue={maxPrice} placeholder="সর্বোচ্চ ৳" className="search-input price-input" min="0" />
              </div>
              <div className="search-field">
                <select name="sort" defaultValue={sort} className="search-select">
                  <option value="">সর্বশেষ যোগ</option>
                  <option value="price_asc">মূল্য (কম–বেশি)</option>
                  <option value="price_desc">মূল্য (বেশি–কম)</option>
                  <option value="popular">জনপ্রিয়তা</option>
                </select>
              </div>
              <button type="submit" className="search-btn"><i className="fas fa-search"></i> খুঁজুন</button>
            </div>
          </form>
        </div>
      </div>

      <div className="container">
        {results.length === 0 ? (
          <div className="empty-state large-empty">
            <div className="empty-icon"><i className="fas fa-search"></i></div>
            <h2>কোন পণ্য পাওয়া যায়নি</h2>
            <p>অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন অথবা ক্যাটাগরি পরিবর্তন করুন।</p>
            <div className="empty-suggestions">
              <p>পরামর্শ:</p>
              <ul>
                {categories.map((cat) => (
                  <li key={cat.id}><Link href={`/search?categoryId=${cat.id}`}>{cat.name}</Link></li>
                ))}
              </ul>
            </div>
            <Link href="/" className="btn-go-home">হোমে ফিরুন</Link>
          </div>
        ) : (
          <div className="products-grid search-grid" id="searchResultGrid">
            {results.map((product, index) => (
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
        )}
      </div>

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
        categories={categories} 
        storeInfo={storeInfo} 
      />
    </>
  );
}

export default function SearchPage() {
  return (
    <main className="inner-page">
      <div className="breadcrumb-bar">
        <div className="container">
          <nav className="breadcrumb" aria-label="ব্রেডক্রাম্ব">
            <Link href="/">হোম</Link>
            <i className="fas fa-chevron-right"></i>
            <span>খোঁজার ফলাফল</span>
          </nav>
        </div>
      </div>
      <Suspense fallback={<div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>খুঁজছি...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}

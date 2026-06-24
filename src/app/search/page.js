'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAdmin } from '@/app/context/AdminContext';
import ProductModal from '@/components/ProductModal';
import ProductCard from '@/components/ProductCard';

function SearchResults() {
  const { state } = useAdmin();
  const { products: productsData, categories, shopInfo: fetchedShopInfo } = state;
  const router = useRouter();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const storeInfo = fetchedShopInfo || {
    name: "মা ফার্নিচার",
    contactLabel: "যোগাযোগ করুন",
    showroomAddress: { label: "শোরুমের ঠিকানা", address: "মিরপুর ১০, ঢাকা" },
    callNumbers: { label: "সরাসরি কল করুন", numbers: ["01711-000000"] },
    whatsapp: { label: "WhatsApp মেসেজ", number: "01711000000" },
    email: { label: "ইমেইল", address: "মিরপুর ১০, ঢাকা" },
    directMessageLabel: "সরাসরি মেসেজ দিন",
    openingHours: { label: "খোলা থাকার সময়", schedule: ["09:00 AM - 09:00 PM"] }
  };

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
  }, [query, categoryId, minPrice, maxPrice, sort, productsData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    
    const q = formData.get('q');
    const catId = formData.get('categoryId');
    const minP = formData.get('minPrice');
    const maxP = formData.get('maxPrice');
    const s = formData.get('sort');

    if (q) params.set('q', q);
    if (catId) params.set('categoryId', catId);
    if (minP) params.set('minPrice', minP);
    if (maxP) params.set('maxPrice', maxP);
    if (s) params.set('sort', s);

    router.push(`/search?${params.toString()}`);
    setIsSidebarOpen(false);
  };

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

      <div className="container" suppressHydrationWarning>
        <div className="category-layout" suppressHydrationWarning>
          {/* Sidebar Overlay for mobile */}
          <div 
            className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`} 
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <aside className={`filter-sidebar ${isSidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <h3><i className="fas fa-search"></i> খুঁজুন</h3>
              <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)} aria-label="ফিল্টার বন্ধ করুন"><i className="fas fa-times"></i></button>
            </div>
            
            <div className="filter-group">
              <form onSubmit={handleSubmit}>
                <div className="search-field" style={{ marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    name="q" 
                    defaultValue={query} 
                    placeholder="পণ্যের নাম বা ID..." 
                    className="filter-input" 
                  />
                </div>
                
                <h4>ক্যাটাগরি</h4>
                <select name="categoryId" defaultValue={categoryId} className="filter-input" style={{ marginBottom: '1rem' }}>
                  <option value="">সকল ক্যাটাগরি</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>

                <h4>মূল্য পরিসীমা</h4>
                <div className="price-range-inputs">
                  <input type="number" name="minPrice" defaultValue={minPrice} placeholder="সর্বনিম্ন" className="filter-input" min="0" />
                  <span>—</span>
                  <input type="number" name="maxPrice" defaultValue={maxPrice} placeholder="সর্বোচ্চ" className="filter-input" min="0" />
                </div>

                <h4>সাজানো</h4>
                <select name="sort" defaultValue={sort} className="filter-input" style={{ marginBottom: '1rem' }}>
                  <option value="">সর্বশেষ যোগ</option>
                  <option value="price_asc">মূল্য (কম–বেশি)</option>
                  <option value="price_desc">মূল্য (বেশি–কম)</option>
                  <option value="popular">জনপ্রিয়তা</option>
                </select>

                <button type="submit" className="apply-filter-btn" style={{ marginTop: '0.5rem' }}>
                  ফিল্টার প্রয়োগ করুন
                </button>
              </form>
            </div>

            <div className="filter-group">
              <h4>ক্যাটাগরি তালিকা</h4>
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
                <span className="result-count">{results.length}টি পণ্য পাওয়া গেছে</span>
              </div>
            </div>

            {results.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon"><i className="fas fa-search"></i></div>
                <h3>কোন পণ্য পাওয়া যায়নি</h3>
                <p>অন্য কীওয়ার্ড দিয়ে চেষ্টা করুন অথবা ক্যাটাগরি পরিবর্তন করুন।</p>
                <Link href="/" className="btn-go-home">হোমে ফিরুন</Link>
              </div>
            ) : (
              <div className="products-grid" id="searchResultGrid">
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
        </div>
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
    <main className="inner-page" suppressHydrationWarning>
      <div className="breadcrumb-bar" suppressHydrationWarning>
        <div className="container" suppressHydrationWarning>
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

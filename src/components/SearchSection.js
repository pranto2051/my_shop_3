'use client';

import { useRouter } from 'next/navigation';

export default function SearchSection({ categories }) {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    
    const q = formData.get('q');
    const categoryId = formData.get('categoryId');
    const minPrice = formData.get('minPrice');
    const maxPrice = formData.get('maxPrice');
    const sort = formData.get('sort');

    if (q) params.set('q', q);
    if (categoryId) params.set('categoryId', categoryId);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sort) params.set('sort', sort);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <section className="search-section">
      <div className="container">
        <h2 className="search-section-title">আপনার পছন্দের পণ্য খুঁজুন</h2>
        <form onSubmit={handleSubmit} className="search-bar-form">
          <div className="search-fields">
            <div className="search-field">
              <i className="fas fa-search field-icon"></i>
              <input type="text" name="q" placeholder="পণ্যের নাম বা ID লিখুন..." className="search-input" autoComplete="off" />
            </div>
            <div className="search-field">
              <i className="fas fa-th-large field-icon"></i>
              <select name="categoryId" className="search-select">
                <option value="">সকল ক্যাটাগরি</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="search-field price-range-field">
              <i className="fas fa-taka-sign field-icon"></i>
              <input type="number" name="minPrice" placeholder="সর্বনিম্ন ৳" className="search-input price-input" min="0" />
              <span className="price-sep">—</span>
              <input type="number" name="maxPrice" placeholder="সর্বোচ্চ ৳" className="search-input price-input" min="0" />
            </div>
            <div className="search-field">
              <i className="fas fa-sort field-icon"></i>
              <select name="sort" className="search-select">
                <option value="">সর্বশেষ যোগ</option>
                <option value="price_asc">মূল্য (কম–বেশি)</option>
                <option value="price_desc">মূল্য (বেশি–কম)</option>
                <option value="popular">জনপ্রিয়তা</option>
              </select>
            </div>
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i> খুঁজুন
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

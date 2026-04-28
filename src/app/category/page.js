'use client';
import Link from 'next/link';
import categoriesRaw from '@/data/categories';

export default function CategoriesPage() {
  const categories = Array.isArray(categoriesRaw) ? categoriesRaw : (categoriesRaw.default || []);
  
  return (
    <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1>সকল ক্যাটাগরি</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
        {categories.map(cat => (
          <Link key={cat.id} href={`/category/${cat.id}`} style={{ padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <i className={`fas fa-${cat.icon}`} style={{ fontSize: '2rem', marginBottom: '10px', display: 'block' }}></i>
            <h3>{cat.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

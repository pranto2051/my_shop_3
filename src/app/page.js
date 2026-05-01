'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import productsRaw from '@/data/products';
import categoriesRaw from '@/data/categories';
import storeInfoRaw from '@/data/shopInfo';
import ProductModal from '@/components/ProductModal';
import OrderProcess from '@/components/OrderProcess';
import ContactSection from '@/components/ContactSection';
import HeroSlider from '@/components/HeroSlider';
import SearchSection from '@/components/SearchSection';
import ProductRow from '@/components/ProductRow';
import DesignSection from '@/components/DesignSection';
import OurWorkSection from '@/components/OurWorkSection';
import OrderTrackingSection from '@/components/home/OrderTrackingSection';
import PremiumLoading from '@/components/PremiumLoading';
import { useAdmin } from '@/app/context/AdminContext';

export default function Home() {
  const { state } = useAdmin();
  const { 
    products: allProducts, 
    categories: allCategories, 
    designs, 
    gallery 
  } = state;

  const [isLoading, setIsLoading] = useState(true);
  
  const getArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (val.default && Array.isArray(val.default)) return val.default;
    if (val.allProducts && Array.isArray(val.allProducts)) return val.allProducts;
    return [];
  };

  const storeInfo = storeInfoRaw.default || storeInfoRaw;
  
  console.log('Home Page - allProducts:', allProducts);
  console.log('Home Page - allProducts Length:', allProducts.length);
  console.log('Home Page - allCategories:', allCategories);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showStickyNav, setShowStickyNav] = useState(false);

  const featuredProducts = allProducts.filter(p => p.isFeatured).slice(0, 5);
  const topSelling = allProducts.filter(p => p.isTopSelling);

  const getCategoryProducts = () => {
    return allCategories.map(cat => ({
      ...cat,
      products: allProducts.filter(p => p.categoryId === cat.id),
      productCount: allProducts.filter(p => p.categoryId === cat.id).length
    }));
  };

  const categoryWithProducts = getCategoryProducts();

  useEffect(() => {
    const handleScrollEvent = () => {
      // Show sticky nav after hero section
      const heroHeight = document.getElementById('heroSlider')?.offsetHeight || 600;
      setShowStickyNav(window.scrollY > heroHeight);

      // Highlight active category based on scroll position
      const sections = categoryWithProducts.map(cat => document.getElementById(`section-${cat.id}`));
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveCategory(categoryWithProducts[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, [categoryWithProducts]);

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <PremiumLoading onComplete={handleLoadingComplete} />}
      
      <main className={`main-content ${isLoading ? 'is-loading' : 'is-loaded'}`}>
        <div className={`sticky-cat-nav ${showStickyNav ? 'visible' : ''}`}>
        <div className="container">
          <div className="cat-nav-scroll">
            {categoryWithProducts.map((cat) => (
              cat.products && cat.products.length > 0 && (
                <a 
                  key={cat.id} 
                  href={`#section-${cat.id}`} 
                  className={`cat-nav-pill ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`section-${cat.id}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <i className={`fas fa-${cat.icon}`}></i> {cat.name}
                </a>
              )
            ))}
          </div>
        </div>
      </div>

      <HeroSlider 
        products={featuredProducts} 
        categories={allCategories} 
        storeInfo={storeInfo} 
        openProductDetail={openProductDetail} 
      />

      <SearchSection categories={allCategories} />

      <ProductRow 
        title="সর্বাধিক বিক্রিত পণ্য" 
        products={topSelling} 
        categories={allCategories} 
        storeInfo={storeInfo} 
        openProductDetail={openProductDetail} 
        id="topSelling" 
        viewAllLink="/search?sort=popular" 
      />

      {categoryWithProducts.map((cat) => (
        cat.products && cat.products.length > 0 && (
          <ProductRow 
            key={cat.id}
            id={`section-${cat.id}`}
            title={cat.name}
            icon={cat.icon}
            description={cat.description}
            products={cat.products.slice(0, 6)}
            categories={allCategories}
            storeInfo={storeInfo}
            openProductDetail={openProductDetail}
            viewAllLink={`/category/${cat.id}`}
            countBadge={cat.products.length}
          />
        )
      ))}

      <DesignSection designs={designs} />
      <OurWorkSection gallery={gallery} />

      <OrderProcess storeInfo={storeInfo} />
      <OrderTrackingSection />
      <ContactSection storeInfo={storeInfo} />

      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct} 
        categories={allCategories} 
        storeInfo={storeInfo} 
      />
      </main>
    </>
  );
}

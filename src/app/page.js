'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import ProductModal from '@/components/ProductModal';
import OrderProcess from '@/components/OrderProcess';
import ShowReview from '@/components/home/ShowReview';
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
    products: allProducts = [], 
    categories: allCategories = [], 
    designs = [], 
    gallery = [],
    shopInfo: fetchedShopInfo,
    reviews: fetchedReviews = [],
    orders: fetchedOrders = []
  } = state || {};

  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  const storeInfo = useMemo(() => fetchedShopInfo || {
    name: "মা ফার্নিচার",
    contactLabel: "যোগাযোগ করুন",
    showroomAddress: { label: "শোরুমের ঠিকানা", address: "মিরপুর ১০, ঢাকা" },
    callNumbers: { label: "সরাসরি কল করুন", numbers: ["01711-000000"] },
    whatsapp: { label: "WhatsApp মেসেজ", number: "01711000000" },
    email: { label: "ইমেইল", address: "মিরপুর ১০, ঢাকা" },
    directMessageLabel: "সরাসরি মেসেজ দিন",
    openingHours: { label: "খোলা থাকার সময়", schedule: ["09:00 AM - 09:00 PM"] }
  }, [fetchedShopInfo]);
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showStickyNav, setShowStickyNav] = useState(false);

  const featuredProducts = useMemo(() => allProducts.filter(p => p.isFeatured).slice(0, 5), [allProducts]);
  const topSelling = useMemo(() => allProducts.filter(p => p.isTopSelling), [allProducts]);

  const categoryWithProducts = useMemo(() => {
    return allCategories.map(cat => {
      const catProducts = allProducts.filter(p => p.categoryId === cat.id);
      return {
        ...cat,
        products: catProducts,
        productCount: catProducts.length
      };
    });
  }, [allCategories, allProducts]);

  useEffect(() => {
    setIsMounted(true);
    
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
      
      {isMounted && (
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

        {categoryWithProducts.length > 0 ? (
          categoryWithProducts.map((cat) => (
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
          ))
        ) : !isLoading && (
          <div className="container py-20 text-center">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">কোনো পণ্য পাওয়া যায়নি</h2>
              <p className="text-gray-600 mb-6">দুঃখিত, আমাদের ডেটাবেজে বর্তমানে কোনো ক্যাটাগরি বা পণ্য নেই।</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.reload()} 
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  আবার চেষ্টা করুন
                </button>
                <Link 
                  href="/admin" 
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  অ্যাডমিন প্যানেলে যান
                </Link>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100 text-sm text-gray-500">
                <p>আপনি যদি অ্যাডমিন হন, তবে <code>insertdata.sql</code> স্ক্রিপ্টটি আপনার Supabase SQL এডিটরে রান করুন।</p>
              </div>
            </div>
          </div>
        )}

        <DesignSection designs={designs} />
        <OurWorkSection gallery={gallery} />

        <OrderProcess storeInfo={storeInfo} />

        <ShowReview reviews={fetchedReviews} orders={fetchedOrders} />

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
      )}
    </>
  );
}

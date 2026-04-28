'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/app/context/AdminContext';

export default function Header({ storeInfo, categories }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { state } = useAdmin();
  const showAdminHeader = state?.settings?.showAdminHeader;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  // Hide header on admin routes unless explicitly enabled in settings
  if (pathname?.startsWith('/admin') && !showAdminHeader) {
    return null;
  }

  return (
    <>
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-left">
            <span><i className="fas fa-phone"></i> {storeInfo.callNumbers.numbers[0]}</span>
            <span><i className="fas fa-map-marker-alt"></i> {storeInfo.showroomAddress.address.split(',')[0]}</span>
            <span><i className="fas fa-clock"></i> {storeInfo.openingHours.schedule[0].split(':')[0]} ৯টা–৯টা</span>
          </div>
          <div className="top-bar-right">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href={`https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>

      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
        <div className="container">
          <div className="header-inner">
            <Link href="/" className="logo" aria-label={storeInfo.name}>
              <div className="logo-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="28" width="30" height="5" rx="2" fill="currentColor"/>
                  <rect x="8" y="15" width="24" height="14" rx="2" fill="currentColor" opacity="0.8"/>
                  <rect x="10" y="10" width="8" height="8" rx="1" fill="currentColor" opacity="0.6"/>
                  <rect x="22" y="10" width="8" height="8" rx="1" fill="currentColor" opacity="0.6"/>
                  <rect x="8" y="33" width="4" height="6" rx="1" fill="currentColor"/>
                  <rect x="28" y="33" width="4" height="6" rx="1" fill="currentColor"/>
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-name">{storeInfo.name}</span>
                <span className="logo-tagline">মানসম্পন্ন আসবাবপত্র</span>
              </div>
            </Link>

            <nav className="main-nav" id="mainNav" aria-label="মূল নেভিগেশন">
              <ul>
                <li><Link href="/" className="nav-link">হোম</Link></li>
                <li className="has-dropdown">
                  <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>ক্যাটাগরি <i className="fas fa-chevron-down"></i></a>
                  <div className="dropdown-menu">
                    {categories && categories.map((cat) => (
                      <Link key={cat.id} href={`/category/${cat.id}`} className="dropdown-item">
                        <i className={`fas fa-${cat.icon}`}></i>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </li>
                <li><Link href="/order-process" className="nav-link">অর্ডার প্রক্রিয়া</Link></li>
                <li><Link href="/order-tracking" className="nav-link">অর্ডার ট্র্যাকিং</Link></li>
                <li><Link href="/contact" className="nav-link">যোগাযোগ</Link></li>
              </ul>
            </nav>

            <div className="header-actions">
              <button className="search-toggle" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="খুঁজুন">
                <i className="fas fa-search"></i>
              </button>
              <button 
                className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                aria-label="মেনু" 
                aria-expanded={isMobileMenuOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)} aria-hidden={!isMobileMenuOpen}>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
          <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="বন্ধ করুন">
            <i className="fas fa-times"></i>
          </button>
          <div className="mobile-logo">
            <span className="logo-name">{storeInfo.name}</span>
          </div>
          <nav className="mobile-nav">
            <ul>
              <li><Link href="/" className="nav-link">হোম</Link></li>
              <li>
                <button className="mobile-cat-toggle" onClick={() => setIsMobileCatOpen(!isMobileCatOpen)}>
                  <span>ক্যাটাগরি</span>
                  <i className={`fas fa-chevron-${isMobileCatOpen ? 'up' : 'down'}`}></i>
                </button>
                <div className={`mobile-cat-list ${isMobileCatOpen ? 'open' : ''}`}>
                  {categories && categories.map((cat) => (
                    <li key={cat.id}>
                      <Link href={`/category/${cat.id}`} className="mobile-cat-item">
                        <i className={`fas fa-${cat.icon}`}></i>
                        <span>{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                </div>
              </li>
              <li><Link href="/order-process" className="nav-link">অর্ডার প্রক্রিয়া</Link></li>
              <li><Link href="/order-tracking" className="nav-link">অর্ডার ট্র্যাকিং</Link></li>
              <li><Link href="/contact" className="nav-link">যোগাযোগ</Link></li>
              <li><Link href="/admin" className="nav-link admin-link">অ্যাডমিন প্যানেল</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`search-overlay ${isSearchOpen ? 'active' : ''}`} id="searchOverlay">
        <div className="search-container">
          <button className="search-close" onClick={() => setIsSearchOpen(false)} aria-label="বন্ধ করুন">
            <i className="fas fa-times"></i>
          </button>
          <form action="/search" method="GET" className="search-form">
            <input type="text" name="q" placeholder="কি খুঁজছেন? (যেমন: চেয়ার, বেড...)" required autoFocus={isSearchOpen} />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i> খুঁজুন
            </button>
          </form>
          <div className="search-suggestions">
            <p>জনপ্রিয় ক্যাটাগরি:</p>
            <div className="suggestion-tags">
              {categories && categories.slice(0, 5).map(cat => (
                <Link key={cat.id} href={`/category/${cat.id}`}>{cat.name}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

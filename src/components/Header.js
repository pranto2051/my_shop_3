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
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileCatOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    setIsMobileCatOpen(false);
  }, [pathname]);

  // Handle background scroll lock
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isMobileMenuOpen, isSearchOpen]);

  // Hide header on admin routes unless explicitly enabled in settings
  if (pathname?.startsWith('/admin') && !showAdminHeader) {
    return null;
  }

  return (
    <>
      <div className="top-bar" suppressHydrationWarning>
        <div className="container" suppressHydrationWarning>
          <div className="top-bar-left" suppressHydrationWarning>
            <span><i className="fas fa-phone"></i> {storeInfo.callNumbers.numbers[0]}</span>
            <span><i className="fas fa-map-marker-alt"></i> {storeInfo.showroomAddress.address.split(',')[0]}</span>
            <span><i className="fas fa-clock"></i> {storeInfo.openingHours.schedule[0].split(':')[0]} ৯টা–৯টা</span>
          </div>
          <div className="top-bar-right" suppressHydrationWarning>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href={`https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
          </div>
        </div>
      </div>

      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader" suppressHydrationWarning>
        <div className="container" suppressHydrationWarning>
          <div className="header-inner" suppressHydrationWarning>
            <Link href="/" className="logo" aria-label={storeInfo.name} suppressHydrationWarning>
              <div className="logo-icon" suppressHydrationWarning>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="28" width="30" height="5" rx="2" fill="currentColor"/>
                  <rect x="8" y="15" width="24" height="14" rx="2" fill="currentColor" opacity="0.8"/>
                  <rect x="10" y="10" width="8" height="8" rx="1" fill="currentColor" opacity="0.6"/>
                  <rect x="22" y="10" width="8" height="8" rx="1" fill="currentColor" opacity="0.6"/>
                  <rect x="8" y="33" width="4" height="6" rx="1" fill="currentColor"/>
                  <rect x="28" y="33" width="4" height="6" rx="1" fill="currentColor"/>
                </svg>
              </div>
              <div className="logo-text" suppressHydrationWarning>
                <span className="logo-name">{storeInfo.name}</span>
                <span className="logo-tagline">মানসম্পন্ন আসবাবপত্র</span>
              </div>
            </Link>

            <nav className="main-nav" id="mainNav" aria-label="মূল নেভিগেশন" suppressHydrationWarning>
              <ul suppressHydrationWarning>
                <li><Link href="/" className="nav-link">হোম</Link></li>
                <li className="has-dropdown" suppressHydrationWarning>
                  <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>ক্যাটাগরি <i className="fas fa-chevron-down"></i></a>
                  <div className="dropdown-menu" suppressHydrationWarning>
                    {categories && categories.map((cat) => (
                      <Link key={cat.id} href={`/category/${cat.id}`} className="dropdown-item">
                        <i className={`fas fa-${cat.icon}`}></i>
                        <span>{cat.name}</span>
                      </Link>
                    ))}
                  </div>
                </li>
                <li><Link href="/order-process" className="nav-link">অর্ডার প্রক্রিয়া</Link></li>
                <li><Link href="/designs" className="nav-link">ডিজাইন</Link></li>
                <li><Link href="/our-work" className="nav-link">আমাদের কাজ</Link></li>
                <li><Link href="/order-tracking" className="nav-link">অর্ডার ট্র্যাকিং</Link></li>
                <li><Link href="/contact" className="nav-link">যোগাযোগ</Link></li>
              </ul>
            </nav>

            <div className="header-actions" suppressHydrationWarning>
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
      <div className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)} aria-hidden={!isMobileMenuOpen} suppressHydrationWarning>
        <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()} suppressHydrationWarning>
          <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)} aria-label="বন্ধ করুন">
            <i className="fas fa-times"></i>
          </button>
          <div className="mobile-logo" suppressHydrationWarning>
            <span className="logo-name">{storeInfo.name}</span>
          </div>
          <nav className="mobile-nav" suppressHydrationWarning>
            <ul>
              <li><Link href="/" className="nav-link">হোম</Link></li>
              <li>
                <button className="mobile-cat-toggle" onClick={() => setIsMobileCatOpen(!isMobileCatOpen)}>
                  <span>ক্যাটাগরি</span>
                  <i className={`fas fa-chevron-${isMobileCatOpen ? 'up' : 'down'}`}></i>
                </button>
                <ul className={`mobile-cat-list ${isMobileCatOpen ? 'open' : ''}`} suppressHydrationWarning>
                  {categories && categories.map((cat) => (
                    <li key={cat.id}>
                      <Link href={`/category/${cat.id}`} className="mobile-cat-item">
                        <i className={`fas fa-${cat.icon}`}></i>
                        <span>{cat.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li><Link href="/order-process" className="nav-link">অর্ডার প্রক্রিয়া</Link></li>
              <li><Link href="/designs" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>ডিজাইন</Link></li>
              <li><Link href="/our-work" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>আমাদের কাজ</Link></li>
              <li><Link href="/order-tracking" className="nav-link">অর্ডার ট্র্যাকিং</Link></li>
              <li><Link href="/contact" className="nav-link">যোগাযোগ</Link></li>
              <li><Link href="/admin" className="nav-link admin-link">অ্যাডমিন প্যানেল</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={`search-overlay ${isSearchOpen ? 'active' : ''}`} id="searchOverlay" suppressHydrationWarning>
        <div className="search-container" suppressHydrationWarning>
          <button className="search-close" onClick={() => setIsSearchOpen(false)} aria-label="বন্ধ করুন">
            <i className="fas fa-times"></i>
          </button>
          <form action="/search" method="GET" className="search-form" suppressHydrationWarning>
            <input type="text" name="q" placeholder="কি খুঁজছেন? (যেমন: চেয়ার, বেড...)" required autoFocus={isSearchOpen} />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i> খুঁজুন
            </button>
          </form>
          <div className="search-suggestions" suppressHydrationWarning>
            <p suppressHydrationWarning>জনপ্রিয় ক্যাটাগরি:</p>
            <div className="suggestion-tags" suppressHydrationWarning>
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

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/app/context/AdminContext';

export default function Footer({ storeInfo, categories }) {
  const pathname = usePathname();
  const { state } = useAdmin();
  const showAdminFooter = state?.settings?.showAdminFooter;
  
  // Hide footer on admin routes unless explicitly enabled in settings
  if (pathname?.startsWith('/admin') && !showAdminFooter) {
    return null;
  }

  return (
    <>
      <footer className="site-footer" suppressHydrationWarning>
        <div className="footer-main" suppressHydrationWarning>
          <div className="container" suppressHydrationWarning>
            <div className="footer-grid" suppressHydrationWarning>
              <div className="footer-col" suppressHydrationWarning>
                <div className="footer-logo" suppressHydrationWarning>
                  <div className="logo-icon" style={{ color: 'var(--accent)' }} suppressHydrationWarning>
                    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="5" y="28" width="30" height="5" rx="2" fill="currentColor"/>
                      <rect x="8" y="15" width="24" height="14" rx="2" fill="currentColor" opacity="0.8"/>
                      <rect x="10" y="10" width="8" height="8" rx="1" fill="currentColor" opacity="0.6"/>
                      <rect x="22" y="10" width="8" height="8" rx="1" fill="currentColor" opacity="0.6"/>
                      <rect x="8" y="33" width="4" height="6" rx="1" fill="currentColor"/>
                      <rect x="28" y="33" width="4" height="6" rx="1" fill="currentColor"/>
                    </svg>
                  </div>
                  <span suppressHydrationWarning>{storeInfo.name}</span>
                </div>
                <p className="footer-about" suppressHydrationWarning>{storeInfo.showroomAddress.address.split(',')[0]}, ঢাকার সেরা ফার্নিচার শোরুম। আমরা ২০+ বছর ধরে মানসম্পন্ন আসবাবপত্র সরবরাহ করে আসছি।</p>
                <div className="footer-social" suppressHydrationWarning>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                  <a href={`https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                </div>
              </div>
              <div className="footer-col" suppressHydrationWarning>
                <h4 suppressHydrationWarning>দ্রুত লিংক</h4>
                <ul className="footer-links" suppressHydrationWarning>
                  <li><Link href="/"><i className="fas fa-chevron-right"></i> হোম</Link></li>
                  <li><Link href="/order-process"><i className="fas fa-chevron-right"></i> অর্ডার প্রক্রিয়া</Link></li>
                  <li><Link href="/search"><i className="fas fa-chevron-right"></i> পণ্য খুঁজুন</Link></li>
                  <li><Link href="/contact"><i className="fas fa-chevron-right"></i> যোগাযোগ</Link></li>
                  <li><Link href="/admin"><i className="fas fa-chevron-right"></i> অ্যাডমিন প্যানেল</Link></li>
                </ul>
              </div>
              <div className="footer-col" suppressHydrationWarning>
                <h4 suppressHydrationWarning>ক্যাটাগরি সমূহ</h4>
                <ul className="footer-links" suppressHydrationWarning>
                  {categories && categories.map((cat) => (
                    <li key={cat.id}>
                      <Link href={`/category/${cat.id}`}>
                        <i className={`fas fa-${cat.icon}`}></i> {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="footer-col" suppressHydrationWarning>
                <h4 suppressHydrationWarning>যোগাযোগ</h4>
                <ul className="footer-contact-list" suppressHydrationWarning>
                  <li><i className="fas fa-map-marker-alt"></i> {storeInfo.showroomAddress.address}</li>
                  <li><i className="fas fa-phone"></i> <a href={`tel:${storeInfo.callNumbers.numbers[0].replace(/-/g, '')}`}>{storeInfo.callNumbers.numbers[0]}</a></li>
                  <li><i className="fab fa-whatsapp"></i> {storeInfo.whatsapp.number}</li>
                  <li><i className="fas fa-envelope"></i> {storeInfo.email.address}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom" suppressHydrationWarning>
          <div className="container" suppressHydrationWarning>
            <p suppressHydrationWarning>&copy; {new Date().getFullYear()} {storeInfo.name} | সর্বস্বত্ব সংরক্ষিত</p>
            <p className="dev-credit" suppressHydrationWarning>Developed with <i className="fas fa-heart"></i> for Quality Furniture</p>
          </div>
        </div>
      </footer>
    </>
  );
}

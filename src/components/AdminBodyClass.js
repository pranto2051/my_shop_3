'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAdmin } from '@/app/context/AdminContext';

export default function AdminBodyClass() {
  const pathname = usePathname();
  const { state } = useAdmin();
  const showAdminHeader = state?.settings?.showAdminHeader;
  const showAdminFooter = state?.settings?.showAdminFooter;

  useEffect(() => {
    if (pathname?.startsWith('/admin')) {
      // Add a base class for admin pages
      document.body.classList.add('on-admin-page');
      
      // Control specific visibility overrides based on settings
      if (showAdminHeader) {
        document.body.classList.add('show-header-on-admin');
      } else {
        document.body.classList.remove('show-header-on-admin');
      }
      
      if (showAdminFooter) {
        document.body.classList.add('show-footer-on-admin');
      } else {
        document.body.classList.remove('show-footer-on-admin');
      }
    } else {
      document.body.classList.remove('on-admin-page');
      document.body.classList.remove('show-header-on-admin');
      document.body.classList.remove('show-footer-on-admin');
    }
  }, [pathname, showAdminHeader, showAdminFooter]);

  return null;
}

'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AdminBodyClass() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith('/admin')) {
      document.body.classList.add('on-admin-page');
    } else {
      document.body.classList.remove('on-admin-page');
    }
  }, [pathname]);

  return null;
}

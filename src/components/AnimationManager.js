'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnimationManager() {
  const pathname = usePathname();

  useEffect(() => {
    // Select all elements that should be animated
    const selectors = [
      '.product-card',
      '.fade-in-up',
      '.fade-in-left',
      '.fade-in-right',
      '.cat-section-title',
      '.section-header h2',
      '.step-item',
      '[data-animate]'
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('visible');
            el.classList.add('card-visible');
            el.classList.add('animated');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.01, // Very low threshold to ensure it triggers
        rootMargin: '50px' // Trigger slightly before it enters the viewport
      }
    );

    const observeElements = () => {
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          // If already visible, skip
          if (el.classList.contains('visible') || 
              el.classList.contains('card-visible') || 
              el.classList.contains('animated')) {
            return;
          }
          
          observer.observe(el);
          
          // Fallback: If still not visible after 2 seconds, force it
          setTimeout(() => {
            if (el && !el.classList.contains('visible') && !el.classList.contains('card-visible')) {
              el.classList.add('visible');
              el.classList.add('card-visible');
            }
          }, 2000);
        });
      });
    };

    // Initial check
    observeElements();

    // Re-check when the path changes (Next.js route changes)
    const timer = setTimeout(observeElements, 100);

    // Watch for DOM changes to observe new elements (like after loading screen)
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldCheck = false;
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) {
          shouldCheck = true;
        }
      });
      if (shouldCheck) {
        observeElements();
      }
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]);

  return null; // This component doesn't render anything
}

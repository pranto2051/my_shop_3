(function () {
  'use strict';

  // ===================== HEADER SCROLL =====================
  const header = document.getElementById('siteHeader');
  let lastScrollY = 0;

  function onScroll() {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('scrolled', y > 50);
    }
    handleStickyCatNav(y);
    lastScrollY = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ===================== STICKY CATEGORY NAV =====================
  const stickyCatNav = document.getElementById('stickyCatNav');
  const categorySections = document.querySelectorAll('.category-section');

  function handleStickyCatNav(scrollY) {
    if (!stickyCatNav || categorySections.length === 0) return;
    const firstSection = categorySections[0];
    const firstTop = firstSection.getBoundingClientRect().top + scrollY;
    stickyCatNav.classList.toggle('visible', scrollY > firstTop - 120);

    categorySections.forEach(section => {
      const top = section.getBoundingClientRect().top;
      const bottom = section.getBoundingClientRect().bottom;
      if (top < 150 && bottom > 100) {
        const id = section.dataset.catId;
        document.querySelectorAll('.cat-nav-pill').forEach(pill => {
          pill.classList.toggle('active', pill.dataset.cat === id);
        });
      }
    });
  }

  // Smooth scroll for cat nav pills
  document.querySelectorAll('.cat-nav-pill').forEach(pill => {
    pill.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(pill.getAttribute('href'));
      if (target) {
        const headerH = (header ? header.offsetHeight : 70) + (stickyCatNav ? stickyCatNav.offsetHeight : 40);
        window.scrollTo({ top: target.offsetTop - headerH - 12, behavior: 'smooth' });
      }
    });
  });

  // ===================== HERO SLIDER =====================
  const sliderTrack = document.getElementById('sliderTrack');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const slides = document.querySelectorAll('.slide');

  if (sliderTrack && slides.length > 0) {
    let currentSlide = 0;
    let autoplayTimer = null;

    function goToSlide(index) {
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
      currentSlide = (index + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    function stopAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
    }

    slides[0].classList.add('active');
    if (dots[0]) dots[0].classList.add('active');

    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); startAutoplay(); });

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); startAutoplay(); });
    });

    const sliderSection = document.getElementById('heroSlider');
    if (sliderSection) {
      sliderSection.addEventListener('mouseenter', stopAutoplay);
      sliderSection.addEventListener('mouseleave', startAutoplay);

      let touchStartX = 0;
      sliderSection.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
      sliderSection.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
          startAutoplay();
        }
      }, { passive: true });
    }

    startAutoplay();
  }

  // ===================== HORIZONTAL SCROLL ROWS =====================
  function setupHScrollRow(rowId) {
    const row = document.getElementById(rowId);
    if (!row) return;

    const prevBtns = document.querySelectorAll(`.prev-btn[data-target="${rowId}"]`);
    const nextBtns = document.querySelectorAll(`.next-btn[data-target="${rowId}"]`);
    const scrollAmt = 280;

    prevBtns.forEach(btn => btn.addEventListener('click', () => { row.scrollBy({ left: -scrollAmt, behavior: 'smooth' }); }));
    nextBtns.forEach(btn => btn.addEventListener('click', () => { row.scrollBy({ left: scrollAmt, behavior: 'smooth' }); }));
  }

  // Top selling row
  setupHScrollRow('topSellingRow');

  // Category rows
  document.querySelectorAll('[id^="catRow-"]').forEach(row => {
    setupHScrollRow(row.id);
  });

  // Auto-scroll category rows
  const categoryRows = document.querySelectorAll('.category-section .product-h-row');
  categoryRows.forEach(row => {
    let autoScroll = null;
    let isPaused = false;

    function startCatAutoScroll() {
      if (isPaused) return;
      autoScroll = setInterval(() => {
        if (row.scrollLeft + row.clientWidth >= row.scrollWidth - 10) {
          row.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          row.scrollBy({ left: 270, behavior: 'smooth' });
        }
      }, 4000);
    }

    function stopCatAutoScroll() {
      clearInterval(autoScroll);
    }

    row.addEventListener('mouseenter', () => { isPaused = true; stopCatAutoScroll(); });
    row.addEventListener('mouseleave', () => { isPaused = false; startCatAutoScroll(); });

    startCatAutoScroll();
  });

  // Auto-scroll top selling row
  const topSellingRow = document.getElementById('topSellingRow');
  if (topSellingRow) {
    let topAutoScroll = null;

    function startTopAutoScroll() {
      topAutoScroll = setInterval(() => {
        if (topSellingRow.scrollLeft + topSellingRow.clientWidth >= topSellingRow.scrollWidth - 10) {
          topSellingRow.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          topSellingRow.scrollBy({ left: 270, behavior: 'smooth' });
        }
      }, 3000);
    }

    topSellingRow.addEventListener('mouseenter', () => clearInterval(topAutoScroll));
    topSellingRow.addEventListener('mouseleave', startTopAutoScroll);

    startTopAutoScroll();
  }

  // ===================== MOBILE MENU =====================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileClose');
  const mobileCatToggle = document.querySelector('.mobile-cat-toggle');
  const mobileCatList = document.querySelector('.mobile-cat-list');
  const bottomMenuToggle = document.getElementById('bottomMenuToggle');

  function openMobileMenu() {
    mobileOverlay.classList.add('open');
    mobileOverlay.removeAttribute('aria-hidden');
    mobileMenuBtn.classList.add('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileOverlay.classList.remove('open');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (bottomMenuToggle) bottomMenuToggle.addEventListener('click', openMobileMenu);

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', e => {
      if (e.target === mobileOverlay) closeMobileMenu();
    });
  }

  if (mobileCatToggle && mobileCatList) {
    mobileCatToggle.addEventListener('click', () => {
      const isOpen = mobileCatList.classList.toggle('open');
      mobileCatToggle.querySelector('i').style.transform = isOpen ? 'rotate(180deg)' : '';
    });
  }

  // ===================== SEARCH TOGGLE =====================
  const searchToggle = document.getElementById('searchToggle');
  const headerSearchBar = document.getElementById('headerSearchBar');
  const searchClose = document.getElementById('searchClose');
  const searchInline = document.querySelector('.search-input-inline');

  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      headerSearchBar.classList.toggle('open');
      if (headerSearchBar.classList.contains('open') && searchInline) {
        setTimeout(() => searchInline.focus(), 150);
      }
    });
  }

  if (searchClose) {
    searchClose.addEventListener('click', () => headerSearchBar.classList.remove('open'));
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      headerSearchBar && headerSearchBar.classList.remove('open');
      closeMobileMenu();
    }
  });

  // ===================== PRODUCT ID COPY =====================
  document.addEventListener('click', e => {
    const idBadge = e.target.closest('.product-id-badge');
    if (idBadge) {
      const id = idBadge.dataset.id;
      if (!id) return;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(id).then(() => showToast('ID কপি হয়েছে! ✅', 'success'));
      } else {
        showToast(`ID: ${id}`, 'info');
      }
    }
  });

  // ===================== INTERSECTION OBSERVER =====================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'card-visible', 'animated');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.fade-in-up, .fade-in-left, .fade-in-right, .step-item, [data-animate], .section-header h2, .cat-section-title, .product-card'
  ).forEach(el => fadeObserver.observe(el));

  // ===================== CATEGORY PAGE FILTER =====================
  const catProductGrid = document.getElementById('categoryProductGrid');
  if (catProductGrid) {
    const applyBtn = document.getElementById('applyPriceFilter');
    const minInput = document.getElementById('filterMinPrice');
    const maxInput = document.getElementById('filterMaxPrice');
    const sortRadios = document.querySelectorAll('input[name="catSort"]');
    const toolbarSort = document.getElementById('toolbarSort');
    const resultCountEl = document.getElementById('resultCount');
    const filterToggle = document.getElementById('filterToggle');
    const filterSidebar = document.getElementById('filterSidebar');
    const sidebarClose = document.getElementById('sidebarClose');

    let currentMin = 0;
    let currentMax = Infinity;
    let currentSort = 'newest';

    function getCards() {
      return Array.from(catProductGrid.querySelectorAll('.product-card'));
    }

    function applyFilters() {
      const cards = getCards();
      let visible = 0;

      cards.forEach(card => {
        const price = parseInt(card.dataset.price || '0');
        const inRange = price >= currentMin && price <= currentMax;
        card.style.display = inRange ? '' : 'none';
        if (inRange) visible++;
      });

      if (resultCountEl) resultCountEl.textContent = `${visible}টি পণ্য`;

      sortCards(cards.filter(c => c.style.display !== 'none'));
    }

    function sortCards(cards) {
      if (!catProductGrid) return;
      let sorted;
      if (currentSort === 'price_asc') {
        sorted = cards.slice().sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
      } else if (currentSort === 'price_desc') {
        sorted = cards.slice().sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
      } else if (currentSort === 'popular') {
        sorted = cards.slice().sort((a, b) => parseFloat(b.dataset.rating || '0') - parseFloat(a.dataset.rating || '0'));
      } else {
        return;
      }
      sorted.forEach(card => catProductGrid.appendChild(card));
    }

    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        currentMin = parseInt(minInput.value) || 0;
        currentMax = parseInt(maxInput.value) || Infinity;
        applyFilters();
      });
    }

    sortRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        currentSort = radio.value;
        if (toolbarSort) toolbarSort.value = radio.value;
        applyFilters();
      });
    });

    if (toolbarSort) {
      toolbarSort.addEventListener('change', () => {
        currentSort = toolbarSort.value;
        sortRadios.forEach(r => { r.checked = r.value === currentSort; });
        applyFilters();
      });
    }

    if (filterToggle && filterSidebar) {
      filterToggle.addEventListener('click', () => {
        filterSidebar.classList.add('open');
        ensureSidebarOverlay();
      });
    }

    if (sidebarClose && filterSidebar) {
      sidebarClose.addEventListener('click', () => {
        filterSidebar.classList.remove('open');
        removeSidebarOverlay();
      });
    }

    function ensureSidebarOverlay() {
      let overlay = document.getElementById('sidebarOverlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebarOverlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => {
          filterSidebar.classList.remove('open');
          overlay.classList.remove('visible');
        });
      }
      requestAnimationFrame(() => overlay.classList.add('visible'));
    }

    function removeSidebarOverlay() {
      const overlay = document.getElementById('sidebarOverlay');
      if (overlay) overlay.classList.remove('visible');
    }
  }

  // ===================== TOAST =====================
  window.showToast = function(msg, type) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type || 'info'}`;
    toast.textContent = msg;
    container.appendChild(toast);
    requestAnimationFrame(() => { requestAnimationFrame(() => toast.classList.add('show')); });
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => { if (toast.parentNode) toast.remove(); }, 400);
    }, 2500);
  };

  // ===================== RECENTLY VIEWED =====================
  const RV_KEY = 'al_amin_rv';
  const RV_MAX = 5;

  window.saveRecentlyViewed = function(productId) {
    let rv = [];
    try { rv = JSON.parse(localStorage.getItem(RV_KEY) || '[]'); } catch (e) {}
    rv = rv.filter(id => id !== productId);
    rv.unshift(productId);
    rv = rv.slice(0, RV_MAX);
    try { localStorage.setItem(RV_KEY, JSON.stringify(rv)); } catch (e) {}
  };

  window.getRecentlyViewed = function() {
    try { return JSON.parse(localStorage.getItem(RV_KEY) || '[]'); } catch (e) { return []; }
  };

  // ===================== BOTTOM NAV ACTIVE =====================
  const path = window.location.pathname;
  document.querySelectorAll('.bottom-nav-item[href]').forEach(item => {
    if (item.getAttribute('href') === path || (path === '/' && item.getAttribute('href') === '/')) {
      item.classList.add('active');
    }
  });

  // ===================== LAST CATEGORY =====================
  const catSections = document.querySelectorAll('.category-section');
  if (catSections.length > 0) {
    const lastCat = localStorage.getItem('al_amin_last_cat');
    if (lastCat) {
      const section = document.getElementById('section-' + lastCat);
    }
  }

  document.querySelectorAll('.category-section').forEach(section => {
    const id = section.dataset.catId;
    if (id) {
      new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          try { localStorage.setItem('al_amin_last_cat', id); } catch (e) {}
        }
      }, { threshold: 0.3 }).observe(section);
    }
  });

  // ===================== INIT COMPLETE =====================
  document.body.classList.add('js-loaded');

})();

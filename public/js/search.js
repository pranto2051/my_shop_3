(function () {
  'use strict';

  const products = window.__PRODUCTS__ || [];
  const categories = window.__CATEGORIES__ || [];

  // ===================== SEARCH HELPER =====================
  function filterProducts(q, categoryId, minPrice, maxPrice, sort) {
    let results = products.slice();

    if (q && q.trim()) {
      const query = q.trim().toLowerCase();
      results = results.filter(p => {
        const idMatch = p.id.toLowerCase() === query;
        const nameMatch = p.name.toLowerCase().includes(query);
        const nameEnMatch = (p.nameEn || '').toLowerCase().includes(query);
        const tagMatch = Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(query));
        return idMatch || nameMatch || nameEnMatch || tagMatch;
      });
    }

    if (categoryId && categoryId !== '') {
      results = results.filter(p => p.categoryId === categoryId);
    }

    if (minPrice && !isNaN(minPrice)) {
      results = results.filter(p => p.price >= parseInt(minPrice));
    }

    if (maxPrice && !isNaN(maxPrice)) {
      results = results.filter(p => p.price <= parseInt(maxPrice));
    }

    switch (sort) {
      case 'price_asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        results.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        break;
    }

    return results;
  }

  // ===================== DEBOUNCE =====================
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ===================== RENDER PRODUCT CARD =====================
  function renderCard(product) {
    const cat = categories.find(c => c.id === product.categoryId);
    const discount = product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

    const stars = Array.from({ length: 5 }, (_, i) =>
      `<i class="fas fa-star" style="color:${i < Math.floor(product.rating) ? 'var(--accent)' : '#ddd'}"></i>`
    ).join('');

    const badges = [
      discount > 0 ? `<span class="badge badge-discount">-${discount}%</span>` : '',
      product.isTopSelling ? `<span class="badge badge-top">TOP</span>` : '',
      !product.inStock ? `<span class="badge badge-out">স্টক নেই</span>` : ''
    ].filter(Boolean).join('');

    const originalPriceHtml = product.originalPrice > product.price
      ? `<span class="original-price">৳${product.originalPrice.toLocaleString()}</span>` : '';

    const waLink = `https://wa.me/${window.__WA_NUMBER__ || '8801700000000'}?text=${encodeURIComponent(`আমি ${product.name} (ID: ${product.id}) অর্ডার করতে চাই।`)}`;

    return `
      <div class="product-card fade-in-up card-visible">
        <div class="card-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy" class="card-img">
          <div class="card-badges">${badges}</div>
          <div class="card-overlay-actions">
            <a href="${waLink}" class="card-wa-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp অর্ডার">
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>
          <button class="product-id-badge" data-id="${product.id}" aria-label="ID কপি করুন">#${product.id}</button>
        </div>
        <div class="card-body">
          ${cat ? `<div class="category-tag"><i class="fas fa-${cat.icon}"></i> ${cat.name}</div>` : ''}
          <h3 class="product-name">${product.name}</h3>
          <div class="rating">${stars} <span>(${product.reviewCount})</span></div>
          <div class="price-row">
            <span class="price">৳${product.price.toLocaleString()}</span>
            ${originalPriceHtml}
          </div>
          <button class="btn-detail btn-card-detail" data-id="${product.id}">বিস্তারিত দেখুন</button>
        </div>
      </div>
    `;
  }

  // ===================== SEARCH RESULTS GRID LIVE UPDATE =====================
  const searchResultGrid = document.getElementById('searchResultGrid');
  if (searchResultGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    const sortSelect = document.querySelector('.sort-select-toolbar');

    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('sort', this.value);
        window.location.href = currentUrl.toString();
      });
    }
  }

  // ===================== CATEGORY PAGE CLIENT-SIDE SORT/FILTER =====================
  const catGrid = document.getElementById('categoryProductGrid');
  if (catGrid) {
    const toolbarSort = document.getElementById('toolbarSort');

    if (toolbarSort) {
      toolbarSort.addEventListener('change', function () {
        const sort = this.value;
        const cards = Array.from(catGrid.querySelectorAll('.product-card'));
        let sorted;

        if (sort === 'price_asc') {
          sorted = cards.sort((a, b) => parseInt(a.dataset.price || 0) - parseInt(b.dataset.price || 0));
        } else if (sort === 'price_desc') {
          sorted = cards.sort((a, b) => parseInt(b.dataset.price || 0) - parseInt(a.dataset.price || 0));
        } else if (sort === 'popular') {
          sorted = cards.sort((a, b) => parseFloat(b.dataset.rating || 0) - parseFloat(a.dataset.rating || 0));
        } else {
          return;
        }

        sorted.forEach(card => catGrid.appendChild(card));
      });
    }
  }

  // ===================== HOMEPAGE LIVE SEARCH =====================
  const mainSearchForm = document.getElementById('mainSearchForm');
  const searchQInput = document.getElementById('searchQ');

  if (mainSearchForm && searchQInput) {
    let liveResultsContainer = null;

    const debouncedLiveSearch = debounce(function (value) {
      if (value.length < 2) {
        hideLiveResults();
        return;
      }

      const results = filterProducts(value, '', 0, Infinity, '').slice(0, 6);
      showLiveResults(results, value);
    }, 300);

    searchQInput.addEventListener('input', function () {
      debouncedLiveSearch(this.value.trim());
    });

    searchQInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') hideLiveResults();
    });

    function showLiveResults(results, query) {
      if (!liveResultsContainer) {
        liveResultsContainer = document.createElement('div');
        liveResultsContainer.className = 'live-search-results';
        liveResultsContainer.style.cssText = `
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: 0 8px 25px var(--shadow-md);
          z-index: 500;
          max-height: 400px;
          overflow-y: auto;
          margin-top: 4px;
        `;
        const searchField = searchQInput.closest('.search-field') || searchQInput.parentNode;
        searchField.style.position = 'relative';
        searchField.appendChild(liveResultsContainer);
      }

      if (results.length === 0) {
        liveResultsContainer.innerHTML = `<div style="padding:1rem;text-align:center;color:var(--text-muted);font-size:0.875rem">কোন পণ্য পাওয়া যায়নি</div>`;
      } else {
        liveResultsContainer.innerHTML = results.map(p => {
          const cat = categories.find(c => c.id === p.categoryId);
          return `
            <div class="live-result-item" data-id="${p.id}" style="
              display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;cursor:pointer;
              border-bottom:1px solid var(--border-light);transition:background 0.2s;
            " onmouseover="this.style.background='var(--bg-secondary)'" onmouseout="this.style.background=''">
              <img src="${p.image}" alt="${p.name}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;flex-shrink:0;">
              <div style="flex:1;min-width:0;">
                <div style="font-size:0.875rem;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.name}</div>
                <div style="font-size:0.75rem;color:var(--text-muted)">${cat ? cat.name : ''} · #${p.id}</div>
              </div>
              <div style="font-weight:700;color:var(--primary);font-size:0.9rem;flex-shrink:0">৳${p.price.toLocaleString()}</div>
            </div>
          `;
        }).join('') + `
          <div style="padding:0.75rem 1rem;text-align:center;border-top:1px solid var(--border-light)">
            <a href="/search?q=${encodeURIComponent(query)}" style="color:var(--accent);font-size:0.875rem;font-weight:600">
              সকল ফলাফল দেখুন →
            </a>
          </div>
        `;

        liveResultsContainer.querySelectorAll('.live-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const id = item.dataset.id;
            if (window.openProductModal) window.openProductModal(id);
            hideLiveResults();
          });
        });
      }

      liveResultsContainer.style.display = 'block';
    }

    function hideLiveResults() {
      if (liveResultsContainer) liveResultsContainer.style.display = 'none';
    }

    document.addEventListener('click', e => {
      if (!mainSearchForm.contains(e.target)) hideLiveResults();
    });
  }

  window.__filterProducts = filterProducts;

})();

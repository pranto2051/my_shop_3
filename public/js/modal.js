(function () {
  'use strict';

  const products = window.__PRODUCTS__ || [];
  const categories = window.__CATEGORIES__ || [];
  const WA_NUMBER = window.__WA_NUMBER__ || '8801700000000';

  const modal = document.getElementById('productModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  if (!modal || !modalContent) return;

  // ===================== OPEN MODAL =====================
  function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cat = categories.find(c => c.id === product.categoryId);
    const discount = product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

    const stars = Array.from({ length: 5 }, (_, i) => {
      if (i < Math.floor(product.rating)) return '<i class="fas fa-star" style="color:var(--accent)"></i>';
      if (product.rating - i > 0 && product.rating - i < 1) return '<i class="fas fa-star-half-alt" style="color:var(--accent)"></i>';
      return '<i class="far fa-star" style="color:var(--accent)"></i>';
    }).join('');

    const images = product.images || [product.image];
    const mainImgSrc = images[0] || product.image;

    const thumbsHtml = images.map((img, i) => `
      <img src="${img}" alt="${product.name} - ছবি ${i + 1}" loading="lazy"
           class="modal-thumb ${i === 0 ? 'active' : ''}" data-src="${img}"
           onerror="this.src='https://placehold.co/600x500/8B4E38/FAF6F1?text=No+Image'">
    `).join('');

    const specs = [
      { label: 'উপাদান', value: product.material },
      { label: 'মাপ', value: product.dimensions },
      { label: 'রঙ', value: product.color },
      { label: 'ওজন', value: product.weight },
      { label: 'ক্যাটাগরি', value: cat ? cat.name : '—' },
      { label: 'স্টক',
        value: product.inStock
          ? '<span class="spec-in-stock"><i class="fas fa-check-circle"></i> পাওয়া যাচ্ছে</span>'
          : '<span class="spec-out-stock"><i class="fas fa-times-circle"></i> স্টকে নেই</span>'
      }
    ].filter(s => s.value).map(s => `
      <div class="spec-row">
        <span class="spec-label">${s.label}</span>
        <span class="spec-value">${s.value}</span>
      </div>
    `).join('');

    const recentlyViewed = (window.getRecentlyViewed ? window.getRecentlyViewed() : [])
      .filter(id => id !== productId)
      .slice(0, 5)
      .map(id => products.find(p => p.id === id))
      .filter(Boolean);

    const rvHtml = recentlyViewed.length > 0 ? `
      <div class="modal-recently-viewed">
        <h5>সম্প্রতি দেখা</h5>
        <div class="recently-viewed-list">
          ${recentlyViewed.map(p => `
            <div class="rv-item" data-id="${p.id}" title="${p.name}">
              <img src="${p.image}" alt="${p.name}" loading="lazy"
                   onerror="this.src='https://placehold.co/600x500/8B4E38/FAF6F1?text=No+Image'">
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    const waText = encodeURIComponent(
      `আসসালামু আলাইকুম, আমি ${product.name} (ID: ${product.id}) অর্ডার করতে চাই। পরিমাণ: 1 টি।`
    );

    modalContent.innerHTML = `
      <div class="modal-left">
        <img src="${mainImgSrc}" alt="${product.name}" class="modal-main-img" id="modalMainImg"
             onerror="this.src='https://placehold.co/600x500/8B4E38/FAF6F1?text=No+Image'">
        <div class="modal-thumbnails">
          ${thumbsHtml}
        </div>
      </div>
      <div class="modal-right">
        <button class="modal-id" id="modalIdBadge" data-id="${product.id}" title="ক্লিক করে কপি করুন">
          <i class="fas fa-copy"></i> #${product.id}
        </button>

        <h2 class="modal-name">${product.name}</h2>
        ${product.nameEn ? `<p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.75rem;font-weight:500">${product.nameEn}</p>` : ''}

        <div class="modal-rating-row">
          <div class="modal-rating-stars">${stars}</div>
          <span class="modal-rating-count"><strong>${product.rating.toFixed(1)}</strong> তারকা (${product.reviewCount} রিভিউ)</span>
        </div>

        <div class="modal-price-row">
          <div>
            <span class="modal-price">৳${product.price.toLocaleString()}</span>
            ${product.originalPrice > product.price ? `<span class="modal-original-price">৳${product.originalPrice.toLocaleString()}</span>` : ''}
          </div>
          ${product.originalPrice > product.price ? `<span class="modal-discount-badge">-${discount}% ছাড়</span>` : ''}
        </div>

        <div class="modal-divider"></div>

        <h4 style="font-size:0.9rem;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem">পণ্যের বৈশিষ্ট্য</h4>
        <div class="modal-specs">${specs}</div>

        <h4 style="font-size:0.9rem;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.75rem;margin-top:0.5rem">বিবরণ</h4>
        <p class="modal-description">${product.description}</p>

        <div class="quantity-row">
          <span class="qty-label">পরিমাণ</span>
          <div class="qty-control">
            <button class="qty-btn" id="qtyMinus" aria-label="কমান"><i class="fas fa-minus"></i></button>
            <input type="number" class="qty-input" id="qtyInput" value="1" min="1" max="99" aria-label="পরিমাণ">
            <button class="qty-btn" id="qtyPlus" aria-label="বাড়ান"><i class="fas fa-plus"></i></button>
          </div>
        </div>

        <div class="modal-actions">
          <a href="https://wa.me/${WA_NUMBER}?text=${waText}" class="modal-wa-btn" id="modalWaBtn" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-whatsapp"></i> অর্ডার করুন
          </a>
          <button class="modal-copy-btn" id="modalCopyBtn">
            <i class="fas fa-clipboard"></i> কপি করুন
          </button>
        </div>

        ${rvHtml}
      </div>
    `;

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';

    if (window.saveRecentlyViewed) window.saveRecentlyViewed(productId);

    setupModalListeners(product);
  }

  // ===================== MODAL LISTENERS =====================
  function setupModalListeners(product) {
    const mainImg = document.getElementById('modalMainImg');
    const thumbs = modalContent.querySelectorAll('.modal-thumb');
    const qtyInput = document.getElementById('qtyInput');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const copyBtn = document.getElementById('modalCopyBtn');
    const idBadge = document.getElementById('modalIdBadge');
    const waBtn = document.getElementById('modalWaBtn');

    // Thumbnail swap
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        if (mainImg) {
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.src = thumb.dataset.src;
            mainImg.style.opacity = '1';
          }, 200);
        }
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });

    // Quantity
    if (qtyMinus) {
      qtyMinus.addEventListener('click', () => {
        const val = parseInt(qtyInput.value) || 1;
        if (val > 1) {
          qtyInput.value = val - 1;
          updateWaLink(product, qtyInput.value);
        }
      });
    }

    if (qtyPlus) {
      qtyPlus.addEventListener('click', () => {
        const val = parseInt(qtyInput.value) || 1;
        if (val < 99) {
          qtyInput.value = val + 1;
          updateWaLink(product, qtyInput.value);
        }
      });
    }

    if (qtyInput) {
      qtyInput.addEventListener('input', () => {
        const val = parseInt(qtyInput.value) || 1;
        qtyInput.value = Math.max(1, Math.min(99, val));
        updateWaLink(product, qtyInput.value);
      });
    }

    // WhatsApp link updater
    function updateWaLink(p, qty) {
      if (!waBtn) return;
      const text = encodeURIComponent(
        `আসসালামু আলাইকুম, আমি ${p.name} (ID: ${p.id}) অর্ডার করতে চাই। পরিমাণ: ${qty} টি।`
      );
      waBtn.href = `https://wa.me/${WA_NUMBER}?text=${text}`;
    }

    // Copy product info
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const qty = qtyInput ? (qtyInput.value || 1) : 1;
        const info = `পণ্য: ${product.name} | ID: ${product.id} | মূল্য: ৳${product.price.toLocaleString()} | পরিমাণ: ${qty}টি`;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(info).then(() => {
            if (window.showToast) window.showToast('✅ কপি হয়েছে!', 'success');
          });
        } else {
          if (window.showToast) window.showToast(info, 'info');
        }
      });
    }

    // Copy product ID
    if (idBadge) {
      idBadge.addEventListener('click', () => {
        const id = idBadge.dataset.id;
        if (navigator.clipboard) {
          navigator.clipboard.writeText(id).then(() => {
            if (window.showToast) window.showToast('ID কপি হয়েছে! ✅', 'success');
          });
        }
      });
    }

    // Recently viewed click
    modalContent.querySelectorAll('.rv-item').forEach(item => {
      item.addEventListener('click', () => {
        openModal(item.dataset.id);
      });
    });
  }

  // ===================== CLOSE MODAL =====================
  function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    modalContent.innerHTML = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // ===================== EVENT DELEGATION =====================
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-detail, .btn-card-detail');
    if (btn && btn.dataset.id) {
      e.preventDefault();
      openModal(btn.dataset.id);
    }
  });

  window.openProductModal = openModal;
  window.closeProductModal = closeModal;

})();

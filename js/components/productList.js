/* ==========================================================================
   AMAZON CLONE - PRODUCT LIST & CAROUSEL COMPONENTS
   ========================================================================== */

function renderProductCard(product) {
  const isWish = window.store.isInWishlist(product.id);
  const dollars = Math.floor(product.price);
  const cents = Math.round((product.price - dollars) * 100).toString().padStart(2, '0');

  return `
    <div class="product-card">
      <button class="wishlist-toggle-btn ${isWish ? 'active' : ''}" onclick="window.store.toggleWishlist('${product.id}')" title="Add to Wishlist">
        ${isWish ? '❤️' : '🤍'}
      </button>

      <div class="product-card-img-wrapper" onclick="window.location.hash='#product/${product.id}'">
        <img src="${product.image}" alt="${product.title}" class="product-card-img" />
      </div>

      <div class="product-card-brand">${product.brand}</div>
      <div class="product-card-title" onclick="window.location.hash='#product/${product.id}'" title="${product.title}">
        ${product.title}
      </div>

      <div class="rating-stars">
        ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
        <span class="rating-count">(${product.reviewsCount})</span>
      </div>

      <div class="product-card-price-row">
        ${product.isTodayDeal ? `<span class="badge-deal">Today's Deal</span>` : ''}
        <div>
          <span class="product-price">
            <span class="product-price-currency">$</span>${dollars}<span class="product-price-cents">${cents}</span>
          </span>
          ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
        </div>
        <div class="badge-prime" style="margin-top:4px;">prime <span>Free Delivery</span></div>
      </div>

      <div class="product-card-actions">
        <button class="btn-amazon-primary" style="width:100%; font-size:12px;" onclick="window.store.addToCart('${product.id}'); alert('Added ${product.brand} to cart!');">
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

function renderFlashSaleSection(products) {
  const flashProducts = products.filter(p => p.isFlashSale);
  if (flashProducts.length === 0) return '';

  return `
    <section class="deal-section-card">
      <div class="flash-sale-header">
        <div style="display:flex; align-items:center; gap:12px;">
          <h2 style="font-size:22px; font-weight:800; color:#cc0c39;">⚡ Flash Sale</h2>
          <span class="badge-deal" style="font-size:13px; padding:4px 10px;">Up to 50% Off</span>
        </div>
        <div class="countdown-timer">
          <span>Ends in:</span>
          <span class="timer-box" id="flash-timer-hours">04</span>:
          <span class="timer-box" id="flash-timer-mins">32</span>:
          <span class="timer-box" id="flash-timer-secs">15</span>
        </div>
      </div>

      <div class="product-grid">
        ${flashProducts.map(p => `
          <div>
            ${renderProductCard(p)}
            <div class="deal-progress-container">
              <div class="deal-progress-bar">
                <div class="deal-progress-fill" style="width: ${p.claimedPercent || 65}%;"></div>
              </div>
              <div class="deal-progress-text">${p.claimedPercent || 65}% claimed</div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function renderCategoryQuadCards() {
  return `
    <div class="category-cards-grid">
      <div class="category-card">
        <h3 class="category-card-title">Latest Electronics & Gadgets</h3>
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80" alt="Electronics" class="category-card-img" onclick="window.location.hash='#category/Electronics'" />
        <a href="#category/Electronics" class="category-card-link">See all Electronics →</a>
      </div>

      <div class="category-card">
        <h3 class="category-card-title">Trending Fashion & Style</h3>
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" alt="Fashion" class="category-card-img" onclick="window.location.hash='#category/Fashion'" />
        <a href="#category/Fashion" class="category-card-link">See all Fashion →</a>
      </div>

      <div class="category-card">
        <h3 class="category-card-title">Home & Kitchen Essentials</h3>
        <img src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80" alt="Home & Kitchen" class="category-card-img" onclick="window.location.hash='#category/Home & Kitchen'" />
        <a href="#category/Home & Kitchen" class="category-card-link">See all Home & Kitchen →</a>
      </div>

      <div class="category-card">
        <h3 class="category-card-title">Best Selling Books & Read</h3>
        <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80" alt="Books" class="category-card-img" onclick="window.location.hash='#category/Books'" />
        <a href="#category/Books" class="category-card-link">See all Books →</a>
      </div>
    </div>
  `;
}

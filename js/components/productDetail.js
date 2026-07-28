/* ==========================================================================
   AMAZON CLONE - PRODUCT DETAIL VIEW COMPONENT
   ========================================================================== */

function renderProductDetail(productId) {
  const product = window.store.products.find(p => p.id === productId);
  if (!product) {
    return `<div class="container" style="padding:40px; text-align:center;"><h2>Product Not Found</h2><a href="#home">Back to Home</a></div>`;
  }

  const isWish = window.store.isInWishlist(product.id);
  const relatedProducts = window.store.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return `
    <div class="container animate-fade-in" style="margin-top:20px;">
      <div style="font-size:12px; color:#565959; margin-bottom:16px;">
        <a href="#home">Home</a> › <a href="#category/${product.category}">${product.category}</a> › <span>${product.title}</span>
      </div>

      <div class="product-detail-layout">
        <!-- Gallery -->
        <div class="detail-gallery">
          <div class="detail-main-img-box" id="main-img-box">
            <img id="detail-main-img" src="${product.image}" alt="${product.title}" />
          </div>
          <div class="detail-thumbnails">
            <img class="thumbnail-item active" src="${product.image}" onclick="document.getElementById('detail-main-img').src='${product.image}';" />
            <img class="thumbnail-item" src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80" onclick="document.getElementById('detail-main-img').src='https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80';" />
          </div>
        </div>

        <!-- Info & Specs -->
        <div class="detail-info">
          <div class="detail-brand">Brand: ${product.brand}</div>
          <h1 class="detail-title">${product.title}</h1>

          <div class="rating-stars" style="font-size:16px;">
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            <span class="rating-count">${product.rating} out of 5 (${product.reviewsCount} customer reviews)</span>
          </div>

          <hr style="border:none; border-top:1px solid #e7e7e7; margin:8px 0;" />

          <div>
            <div style="font-size:13px; color:#565959;">Price:</div>
            <div style="display:flex; align-items:baseline; gap:8px;">
              <span class="buy-box-price">$${product.price.toFixed(2)}</span>
              ${product.originalPrice ? `<span class="product-original-price" style="font-size:16px;">$${product.originalPrice.toFixed(2)}</span>` : ''}
              ${product.originalPrice ? `<span class="badge-deal">Save $${(product.originalPrice - product.price).toFixed(2)}</span>` : ''}
            </div>
            <div class="badge-prime" style="margin-top:6px;">prime <span>FREE One-Day Delivery & FREE Returns</span></div>
          </div>

          <hr style="border:none; border-top:1px solid #e7e7e7; margin:8px 0;" />

          <div>
            <h4 style="font-size:14px; font-weight:700; margin-bottom:6px;">About this item</h4>
            <p style="font-size:14px; line-height:1.5; color:#333;">${product.description}</p>
            <ul class="detail-specs-list">
              ${(product.specs || []).map(spec => `<li>${spec}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Buy Box Right -->
        <div class="detail-buy-box">
          <div style="font-size:24px; font-weight:800; color:#b12704;">$${product.price.toFixed(2)}</div>
          <div class="badge-stock-in">✓ ${product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}</div>
          
          <div style="font-size:13px; color:#565959;">
            Ships from <strong>Amazon.com</strong><br/>
            Sold by <strong>${product.brand} Official Store</strong>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px; margin-top:8px;">
            <button class="btn-amazon-primary" style="width:100%; padding:12px;" onclick="window.store.addToCart('${product.id}'); alert('Added to Cart!');">
              🛒 Add to Cart
            </button>
            <button class="btn-amazon-secondary" style="width:100%; padding:12px; background:linear-gradient(to bottom, #ffa41c, #e67a00); color:white; border:none;" onclick="window.store.addToCart('${product.id}'); window.location.hash='#checkout';">
              ⚡ Buy Now
            </button>
            <button class="btn-amazon-secondary" style="width:100%; font-size:12px;" onclick="window.store.toggleWishlist('${product.id}'); alert('${isWish ? 'Removed from' : 'Added to'} Wishlist!');">
              ${isWish ? '❤️ Remove from Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      <!-- Customer Reviews & Rating Breakdown -->
      <section class="reviews-section">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <h2 style="font-size:20px; font-weight:700;">Customer Reviews</h2>
          <button class="btn-amazon-secondary" onclick="openReviewModal('${product.id}')">Write a Customer Review</button>
        </div>

        <div style="display:grid; grid-template-columns: 280px 1fr; gap:32px;">
          <div>
            <div style="font-size:32px; font-weight:800;">${product.rating} <span style="font-size:16px; color:#666;">out of 5</span></div>
            <div class="rating-stars">${'★'.repeat(Math.floor(product.rating))}</div>
            <p style="font-size:12px; color:#666; margin-top:4px;">${product.reviewsCount} global ratings</p>
          </div>

          <div>
            ${(product.reviews || []).map(r => `
              <div class="review-card">
                <div class="review-author">
                  <div class="review-author-avatar">${r.author.charAt(0)}</div>
                  <span>${r.author}</span>
                  <span style="font-size:11px; color:#067d62; font-weight:normal; margin-left:8px;">✓ Verified Purchase</span>
                </div>
                <div class="rating-stars">${'★'.repeat(r.rating)}</div>
                <p style="font-size:13px; margin-top:6px; color:#333;">${r.comment}</p>
                <div style="font-size:11px; color:#888; margin-top:4px;">Reviewed on ${r.date}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    </div>
  `;
}

function openReviewModal(productId) {
  const comment = prompt("Write your review comment:");
  if (comment) {
    const product = window.store.products.find(p => p.id === productId);
    if (product) {
      if (!product.reviews) product.reviews = [];
      product.reviews.unshift({
        id: `r-${Date.now()}`,
        author: window.store.currentUser ? window.store.currentUser.name : "Verified Customer",
        rating: 5,
        date: new Date().toISOString().split('T')[0],
        comment
      });
      product.reviewsCount += 1;
      window.store.saveStorage('amazon_products', window.store.products);
      alert("Thank you! Your review has been published.");
      window.store.notify();
    }
  }
}

window.openReviewModal = openReviewModal;

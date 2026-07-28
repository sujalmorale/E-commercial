/* ==========================================================================
   AMAZON CLONE - WISHLIST COMPONENT
   ========================================================================== */

function renderWishlistPage() {
  const wishIds = window.store.wishlist;
  const wishProducts = wishIds.map(id => window.store.products.find(p => p.id === id)).filter(Boolean);

  if (wishProducts.length === 0) {
    return `
      <div class="container animate-fade-in" style="margin-top:40px;">
        <div class="cart-main-container" style="text-align:center; padding:60px 20px;">
          <h2 style="font-size:24px; font-weight:700; margin-bottom:12px;">Your Wishlist is Empty</h2>
          <p style="color:#565959; margin-bottom:24px;">Save your favorite items here to track price drops and purchase later.</p>
          <button class="btn-amazon-primary" onclick="window.location.hash='#home'">Explore Products</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="container animate-fade-in" style="margin-top:24px;">
      <div class="cart-main-container">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #ddd; padding-bottom:12px; margin-bottom:20px;">
          <h1 style="font-size:24px; font-weight:700;">Your Wishlist (${wishProducts.length} items)</h1>
          <button class="btn-amazon-secondary" onclick="wishProducts.forEach(p => window.store.addToCart(p.id)); alert('Moved all wishlist items to cart!');">Add All to Cart</button>
        </div>

        <div class="product-grid">
          ${wishProducts.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </div>
  `;
}

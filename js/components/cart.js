/* ==========================================================================
   AMAZON CLONE - SHOPPING CART COMPONENT
   ========================================================================== */

function renderCartPage() {
  const details = window.store.getCartDetails();
  const sflItems = window.store.saveForLater.map(s => ({
    ...s,
    product: window.store.products.find(p => p.id === s.productId)
  })).filter(s => s.product);

  if (details.items.length === 0 && sflItems.length === 0) {
    return `
      <div class="container animate-fade-in" style="margin-top:40px;">
        <div class="cart-main-container" style="text-align:center; padding:60px 20px;">
          <h2 style="font-size:24px; font-weight:700; margin-bottom:12px;">Your Amazon Cart is empty</h2>
          <p style="color:#565959; margin-bottom:24px;">Your shopping cart is waiting. Give it purpose – fill it with electronics, books, fashion, and deals.</p>
          <button class="btn-amazon-primary" onclick="window.location.hash='#home'">Continue Shopping</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="container animate-fade-in">
      <div class="cart-page-layout">
        <!-- Main Cart Items -->
        <div class="cart-main-container">
          <div class="cart-header">
            <h1 class="cart-title">Shopping Cart</h1>
            <span style="font-size:14px; color:#565959;">Price</span>
          </div>

          ${details.items.length === 0 ? `<p style="padding:20px 0; color:#666;">No items currently in your cart.</p>` : ''}

          ${details.items.map(item => `
            <div class="cart-item">
              <img src="${item.product.image}" alt="${item.product.title}" class="cart-item-img" onclick="window.location.hash='#product/${item.product.id}'" style="cursor:pointer;" />
              <div class="cart-item-info">
                <div class="cart-item-title" onclick="window.location.hash='#product/${item.product.id}'" style="cursor:pointer;">${item.product.title}</div>
                <div class="badge-stock-in" style="font-size:12px;">In Stock</div>
                <div style="font-size:12px; color:#565959;">Eligible for FREE Shipping</div>
                
                <div class="cart-item-actions">
                  <label>Qty:
                    <select class="qty-select" onchange="window.store.updateCartQty('${item.product.id}', parseInt(this.value))">
                      ${[1,2,3,4,5,6,7,8,9,10].map(q => `<option value="${q}" ${item.quantity === q ? 'selected' : ''}>${q}</option>`).join('')}
                    </select>
                  </label>
                  <span>|</span>
                  <a href="javascript:void(0)" onclick="window.store.removeFromCart('${item.product.id}')">Delete</a>
                  <span>|</span>
                  <a href="javascript:void(0)" onclick="window.store.moveToSaveForLater('${item.product.id}')">Save for later</a>
                </div>
              </div>
              <div style="text-align:right; font-size:18px; font-weight:700;">
                $${(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          `).join('')}

          <div style="text-align:right; margin-top:20px; font-size:18px;">
            Subtotal (${details.itemCount} items): <strong style="color:#b12704;">$${details.subtotal.toFixed(2)}</strong>
          </div>

          <!-- Save for Later Section -->
          ${sflItems.length > 0 ? `
            <div style="margin-top:40px; border-top:2px solid #eaeded; padding-top:20px;">
              <h3 style="font-size:18px; font-weight:700; margin-bottom:16px;">Saved for later (${sflItems.length} items)</h3>
              <div class="product-grid">
                ${sflItems.map(s => `
                  <div class="product-card">
                    <img src="${s.product.image}" style="height:120px; object-fit:contain; margin-bottom:8px;" />
                    <div style="font-size:13px; font-weight:600; height:32px; overflow:hidden;">${s.product.title}</div>
                    <div style="font-weight:700; color:#b12704; margin:4px 0;">$${s.product.price.toFixed(2)}</div>
                    <button class="btn-amazon-secondary" style="width:100%; font-size:12px; margin-top:8px;" onclick="window.store.moveToCartFromSaveForLater('${s.product.id}')">Move to Cart</button>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Summary & Checkout Sidebar -->
        <div class="cart-summary-box">
          <div class="free-shipping-progress">
            ${details.freeShipping ? '🎉 Your order qualifies for FREE Shipping!' : `Add $${(25 - details.subtotal).toFixed(2)} more of eligible items to get FREE Shipping.`}
          </div>

          <div style="font-size:18px;">
            Subtotal (${details.itemCount} items): <br/>
            <strong style="font-size:24px; color:#b12704;">$${details.grandTotal.toFixed(2)}</strong>
            <div style="font-size:11px; color:#666;">(Includes estimated tax & shipping)</div>
          </div>

          <!-- Coupon Box -->
          <div>
            <label style="font-size:12px; font-weight:600;">Have a Coupon Code?</label>
            <div class="coupon-section" style="margin-top:4px;">
              <input type="text" id="coupon-code-input" class="coupon-input" placeholder="e.g. AMAZON20" value="${window.store.activeCoupon ? window.store.activeCoupon.code : ''}" />
              <button class="btn-amazon-secondary" onclick="applyCouponCode()">Apply</button>
            </div>
            ${window.store.activeCoupon ? `<div style="font-size:11px; color:#067d62; font-weight:bold; margin-top:4px;">✓ ${window.store.activeCoupon.description}</div>` : ''}
          </div>

          <button class="btn-amazon-primary" style="width:100%; padding:12px; font-size:15px;" onclick="window.location.hash='#checkout'">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  `;
}

function applyCouponCode() {
  const input = document.getElementById('coupon-code-input');
  if (input) {
    const res = window.store.applyCoupon(input.value);
    alert(res.message);
  }
}

window.applyCouponCode = applyCouponCode;

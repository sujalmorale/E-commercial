/* ==========================================================================
   AMAZON CLONE - 5-STEP CHECKOUT WIZARD
   ========================================================================== */

let currentCheckoutStep = 1;
let selectedPaymentType = "card";
let checkoutShippingData = {
  name: "Srujal",
  street: "123 Innovation Drive",
  city: "San Jose",
  state: "CA",
  zip: "95110",
  country: "United States"
};
let selectedShippingSpeed = "Standard";

function renderCheckoutWizard() {
  const details = window.store.getCartDetails();
  if (details.items.length === 0) {
    return `<div class="container" style="padding:40px; text-align:center;"><h2>No items in cart for checkout!</h2><a href="#home">Shop Now</a></div>`;
  }

  return `
    <div class="checkout-container animate-fade-in">
      <div style="text-align:center; margin-bottom:24px;">
        <h1 style="font-size:26px; font-weight:800; color:#131921;">Checkout <span style="font-weight:400; font-size:18px; color:#565959;">(${details.itemCount} items)</span></h1>
      </div>

      <!-- Stepper Progress Header -->
      <div class="checkout-stepper">
        <div class="step-item ${currentCheckoutStep >= 1 ? (currentCheckoutStep > 1 ? 'completed' : 'active') : ''}">
          <div class="step-number">${currentCheckoutStep > 1 ? '✓' : '1'}</div>
          <span>1. Address</span>
        </div>
        <div class="step-item ${currentCheckoutStep >= 2 ? (currentCheckoutStep > 2 ? 'completed' : 'active') : ''}">
          <div class="step-number">${currentCheckoutStep > 2 ? '✓' : '2'}</div>
          <span>2. Shipping</span>
        </div>
        <div class="step-item ${currentCheckoutStep >= 3 ? (currentCheckoutStep > 3 ? 'completed' : 'active') : ''}">
          <div class="step-number">${currentCheckoutStep > 3 ? '✓' : '3'}</div>
          <span>3. Payment</span>
        </div>
        <div class="step-item ${currentCheckoutStep >= 4 ? (currentCheckoutStep > 4 ? 'completed' : 'active') : ''}">
          <div class="step-number">${currentCheckoutStep > 4 ? '✓' : '4'}</div>
          <span>4. Review</span>
        </div>
        <div class="step-item ${currentCheckoutStep === 5 ? 'active' : ''}">
          <div class="step-number">5</div>
          <span>5. Place Order</span>
        </div>
      </div>

      <!-- STEP 1: Shipping Address -->
      <div class="checkout-step-panel ${currentCheckoutStep === 1 ? 'active' : ''}">
        <h3 style="font-size:18px; font-weight:700; margin-bottom:16px;">1. Select or Enter a Shipping Address</h3>
        <form id="address-form" onsubmit="event.preventDefault(); nextCheckoutStep(2);">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="chk-name" class="form-control" value="${checkoutShippingData.name}" required />
          </div>
          <div class="form-group">
            <label>Street Address</label>
            <input type="text" id="chk-street" class="form-control" value="${checkoutShippingData.street}" required />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
            <div class="form-group">
              <label>City</label>
              <input type="text" id="chk-city" class="form-control" value="${checkoutShippingData.city}" required />
            </div>
            <div class="form-group">
              <label>State</label>
              <input type="text" id="chk-state" class="form-control" value="${checkoutShippingData.state}" required />
            </div>
            <div class="form-group">
              <label>ZIP Code</label>
              <input type="text" id="chk-zip" class="form-control" value="${checkoutShippingData.zip}" required />
            </div>
          </div>
          <button type="submit" class="btn-amazon-primary" style="margin-top:16px;">Use This Address →</button>
        </form>
      </div>

      <!-- STEP 2: Shipping Options -->
      <div class="checkout-step-panel ${currentCheckoutStep === 2 ? 'active' : ''}">
        <h3 style="font-size:18px; font-weight:700; margin-bottom:16px;">2. Choose Shipping Options</h3>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <label style="border:1px solid #ccc; padding:12px; border-radius:4px; display:flex; align-items:center; gap:12px; cursor:pointer;">
            <input type="radio" name="shipping-speed" value="Standard" checked onchange="selectedShippingSpeed = this.value" />
            <div>
              <strong>FREE Prime Standard Delivery</strong> (3-5 Business Days)
              <div style="font-size:12px; color:#565959;">Included with your order</div>
            </div>
          </label>

          <label style="border:1px solid #ccc; padding:12px; border-radius:4px; display:flex; align-items:center; gap:12px; cursor:pointer;">
            <input type="radio" name="shipping-speed" value="Express" onchange="selectedShippingSpeed = this.value" />
            <div>
              <strong>Expedited Two-Day Shipping ($5.99)</strong>
              <div style="font-size:12px; color:#565959;">Delivered by Thursday</div>
            </div>
          </label>

          <label style="border:1px solid #ccc; padding:12px; border-radius:4px; display:flex; align-items:center; gap:12px; cursor:pointer;">
            <input type="radio" name="shipping-speed" value="NextDay" onchange="selectedShippingSpeed = this.value" />
            <div>
              <strong>Prime One-Day Priority Delivery ($9.99)</strong>
              <div style="font-size:12px; color:#565959;">Guaranteed Delivery Tomorrow</div>
            </div>
          </label>
        </div>
        <div style="margin-top:20px; display:flex; gap:12px;">
          <button class="btn-amazon-secondary" onclick="currentCheckoutStep = 1; window.store.notify();">← Back</button>
          <button class="btn-amazon-primary" onclick="nextCheckoutStep(3);">Continue to Payment →</button>
        </div>
      </div>

      <!-- STEP 3: Payment Method -->
      <div class="checkout-step-panel ${currentCheckoutStep === 3 ? 'active' : ''}">
        <h3 style="font-size:18px; font-weight:700; margin-bottom:16px;">3. Select Payment Method</h3>
        <div class="payment-options-grid">
          <div class="payment-card-option ${selectedPaymentType === 'card' ? 'selected' : ''}" onclick="selectPaymentType('card')">
            <div style="font-weight:700;">💳 Credit or Debit Card</div>
            <div style="font-size:12px; color:#666;">Visa, Mastercard, Amex, Discover</div>
          </div>
          <div class="payment-card-option ${selectedPaymentType === 'amazon_pay' ? 'selected' : ''}" onclick="selectPaymentType('amazon_pay')">
            <div style="font-weight:700;">🟧 Amazon Pay Balance</div>
            <div style="font-size:12px; color:#067d62;">Available: $500.00</div>
          </div>
          <div class="payment-card-option ${selectedPaymentType === 'cod' ? 'selected' : ''}" onclick="selectPaymentType('cod')">
            <div style="font-weight:700;">💵 Cash on Delivery (COD)</div>
            <div style="font-size:12px; color:#666;">Pay upon delivery</div>
          </div>
        </div>

        ${selectedPaymentType === 'card' ? `
          <div style="background:#f9f9f9; padding:16px; border-radius:4px; border:1px solid #ddd; max-width:480px; margin-bottom:16px;">
            <div class="form-group">
              <label>Card Number</label>
              <input type="text" class="form-control" placeholder="4242 •••• •••• 4242" value="4242 8810 9923 4242" required />
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div class="form-group">
                <label>Expiration (MM/YY)</label>
                <input type="text" class="form-control" placeholder="12/28" value="12/28" required />
              </div>
              <div class="form-group">
                <label>CVV Security Code</label>
                <input type="password" class="form-control" placeholder="123" value="888" maxlength="4" required />
              </div>
            </div>
          </div>
        ` : ''}

        <div style="display:flex; gap:12px;">
          <button class="btn-amazon-secondary" onclick="currentCheckoutStep = 2; window.store.notify();">← Back</button>
          <button class="btn-amazon-primary" onclick="nextCheckoutStep(4);">Review Order Details →</button>
        </div>
      </div>

      <!-- STEP 4 & 5: Review & Place Order -->
      <div class="checkout-step-panel ${currentCheckoutStep >= 4 ? 'active' : ''}">
        <h3 style="font-size:18px; font-weight:700; margin-bottom:16px;">4. Review and Place Your Order</h3>
        
        <div style="display:grid; grid-template-columns:1fr 300px; gap:24px;">
          <div>
            <div style="border:1px solid #ddd; border-radius:4px; padding:16px; margin-bottom:16px;">
              <h4 style="font-size:14px; font-weight:700;">Shipping Address:</h4>
              <p style="font-size:13px; margin-top:4px;">${checkoutShippingData.name}<br/>${checkoutShippingData.street}, ${checkoutShippingData.city}, ${checkoutShippingData.state} ${checkoutShippingData.zip}</p>
            </div>

            <div style="border:1px solid #ddd; border-radius:4px; padding:16px; margin-bottom:16px;">
              <h4 style="font-size:14px; font-weight:700;">Payment Method:</h4>
              <p style="font-size:13px; margin-top:4px;">${selectedPaymentType === 'card' ? 'Credit Card ending in 4242' : (selectedPaymentType === 'amazon_pay' ? 'Amazon Pay Balance' : 'Cash on Delivery')}</p>
            </div>

            <div style="border:1px solid #ddd; border-radius:4px; padding:16px;">
              <h4 style="font-size:14px; font-weight:700; margin-bottom:12px;">Order Items:</h4>
              ${details.items.map(i => `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:13px;">
                  <span>${i.product.title} (x${i.quantity})</span>
                  <strong>$${(i.product.price * i.quantity).toFixed(2)}</strong>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="background:#fafafa; border:1px solid #ddd; border-radius:4px; padding:16px; height:fit-content;">
            <h4 style="font-size:16px; font-weight:700; margin-bottom:12px;">Order Summary</h4>
            <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px;"><span>Items:</span> <span>$${details.subtotal.toFixed(2)}</span></div>
            ${details.discount > 0 ? `<div style="display:flex; justify-content:space-between; font-size:13px; color:#cc0c39; margin-bottom:6px;"><span>Discount:</span> <span>-$${details.discount.toFixed(2)}</span></div>` : ''}
            <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px;"><span>Shipping & handling:</span> <span>${details.shippingFee === 0 ? 'FREE' : '$' + details.shippingFee.toFixed(2)}</span></div>
            <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:6px;"><span>Estimated tax:</span> <span>$${details.tax.toFixed(2)}</span></div>
            <hr style="margin:8px 0;" />
            <div style="display:flex; justify-content:space-between; font-size:18px; font-weight:800; color:#b12704; margin-bottom:16px;">
              <span>Order Total:</span> <span>$${details.grandTotal.toFixed(2)}</span>
            </div>

            <button class="btn-amazon-primary" style="width:100%; padding:14px; font-size:16px;" onclick="placeFinalOrder()">
              🔒 Place Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function selectPaymentType(type) {
  selectedPaymentType = type;
  window.store.notify();
}

function nextCheckoutStep(step) {
  if (step === 2) {
    const name = document.getElementById('chk-name').value;
    const street = document.getElementById('chk-street').value;
    const city = document.getElementById('chk-city').value;
    const state = document.getElementById('chk-state').value;
    const zip = document.getElementById('chk-zip').value;
    checkoutShippingData = { name, street, city, state, zip };
  }
  currentCheckoutStep = step;
  window.store.notify();
}

function placeFinalOrder() {
  const order = window.store.createOrder({
    shippingAddress: checkoutShippingData,
    paymentMethod: selectedPaymentType === 'card' ? 'Credit Card ending in 4242' : (selectedPaymentType === 'amazon_pay' ? 'Amazon Pay Balance' : 'Cash on Delivery')
  });

  if (order) {
    alert(`🎉 Order Placed Successfully! Your Order ID is ${order.id}`);
    currentCheckoutStep = 1;
    window.location.hash = '#orders';
  }
}

window.selectPaymentType = selectPaymentType;
window.nextCheckoutStep = nextCheckoutStep;
window.placeFinalOrder = placeFinalOrder;

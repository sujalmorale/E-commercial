/* ==========================================================================
   AMAZON CLONE - MY ORDERS & TRACKING COMPONENT
   ========================================================================== */

function renderOrdersPage() {
  const user = window.store.currentUser;
  const userOrders = window.store.orders.filter(o => !user || o.userId === user.id || o.userId === 'usr-demo');

  return `
    <div class="container animate-fade-in" style="margin-top:24px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <h1 style="font-size:26px; font-weight:700;">Your Orders</h1>
        <div style="font-size:13px; color:#565959;">${userOrders.length} orders placed</div>
      </div>

      ${userOrders.length === 0 ? `
        <div class="cart-main-container" style="text-align:center; padding:40px;">
          <h3>You haven't placed any orders yet.</h3>
          <button class="btn-amazon-primary" style="margin-top:16px;" onclick="window.location.hash='#home'">Start Shopping</button>
        </div>
      ` : ''}

      ${userOrders.map(order => {
        const formattedDate = new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        
        return `
          <div class="order-card">
            <!-- Header Bar -->
            <div class="order-card-header">
              <div class="order-meta-group">
                <div>
                  <div class="order-meta-label">ORDER PLACED</div>
                  <div class="order-meta-val">${formattedDate}</div>
                </div>
                <div>
                  <div class="order-meta-label">TOTAL</div>
                  <div class="order-meta-val">$${order.grandTotal.toFixed(2)}</div>
                </div>
                <div>
                  <div class="order-meta-label">SHIP TO</div>
                  <div class="order-meta-val">${order.shippingAddress.name}</div>
                </div>
              </div>

              <div style="text-align:right;">
                <div class="order-meta-label">ORDER # ${order.id}</div>
                <div style="display:flex; gap:12px; margin-top:4px;">
                  <button class="btn-amazon-secondary" style="font-size:11px; padding:4px 8px;" onclick="window.printOrderInvoice('${order.id}')">
                    📄 Download Invoice
                  </button>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="order-card-body">
              <div style="margin-bottom:16px;">
                <span style="font-size:18px; font-weight:700; color:${order.status === 'Cancelled' ? '#cc0c39' : '#067d62'};">
                  ${order.status === 'Delivered' ? '✓ Delivered' : order.status}
                </span>
                <span style="font-size:12px; color:#565959; margin-left:8px;">Package status update</span>
              </div>

              <!-- Tracking Timeline -->
              <div class="order-tracking-timeline">
                ${order.trackingTimeline.map(t => `
                  <div class="tracking-node ${t.done ? 'completed' : ''}">
                    <div class="node-dot">${t.done ? '✓' : ''}</div>
                    <span>${t.status}</span>
                  </div>
                `).join('')}
              </div>

              <!-- Items list -->
              <div style="margin-top:20px;">
                ${order.items.map(item => `
                  <div style="display:flex; align-items:center; gap:16px; padding:12px 0; border-top:1px solid #f0f0f0;">
                    <img src="${item.image}" style="width:70px; height:70px; object-fit:contain;" />
                    <div style="flex:1;">
                      <div style="font-weight:600; font-size:14px; cursor:pointer;" onclick="window.location.hash='#product/${item.id}'">${item.title}</div>
                      <div style="font-size:12px; color:#666;">Qty: ${item.quantity} | Price: $${item.price.toFixed(2)}</div>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:6px;">
                      <button class="btn-amazon-primary" style="font-size:11px; padding:4px 8px;" onclick="window.store.addToCart('${item.id}'); alert('Added to cart!');">Buy it again</button>
                      ${order.status !== 'Cancelled' && order.status !== 'Delivered' ? `<button class="btn-amazon-secondary" style="font-size:11px; padding:4px 8px; color:#cc0c39;" onclick="handleCancelOrder('${order.id}')">Cancel Order</button>` : ''}
                      ${order.status === 'Delivered' ? `<button class="btn-amazon-secondary" style="font-size:11px; padding:4px 8px;" onclick="alert('Return request initiated for Order ${order.id}. A return label has been emailed to your account.')">Return Item</button>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function handleCancelOrder(orderId) {
  if (confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
    const success = window.store.cancelOrder(orderId);
    if (success) {
      alert("Order cancelled successfully.");
    } else {
      alert("Unable to cancel order at this stage.");
    }
  }
}

window.handleCancelOrder = handleCancelOrder;

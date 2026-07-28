/* ==========================================================================
   AMAZON CLONE - INTEGRATED ADMIN PANEL COMPONENT
   ========================================================================== */

let activeAdminTab = "products";

function renderAdminPanel() {
  const user = window.store.currentUser;
  if (!user || user.role !== 'admin') {
    return `
      <div class="container" style="padding:60px; text-align:center;">
        <h2 style="color:#cc0c39;">Access Restricted</h2>
        <p>You must be signed in as an Admin user to view this panel.</p>
        <button class="btn-amazon-primary" style="margin-top:16px;" onclick="window.store.loginUser('admin@amazon.com', 'admin123'); window.location.hash='#admin';">Sign in as Admin Demo</button>
      </div>
    `;
  }

  const products = window.store.products;
  const orders = window.store.orders;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.grandTotal : 0), 0);

  return `
    <div class="admin-layout animate-fade-in">
      <!-- Admin Sidebar -->
      <aside class="admin-sidebar">
        <div class="admin-brand">
          amazon <span style="font-weight:300; font-size:12px; color:white;">ADMIN CONTROL</span>
        </div>
        <div style="margin-top:16px;">
          <div class="admin-nav-item ${activeAdminTab === 'dashboard' ? 'active' : ''}" onclick="switchAdminTab('dashboard')">
            📊 Overview Stats
          </div>
          <div class="admin-nav-item ${activeAdminTab === 'products' ? 'active' : ''}" onclick="switchAdminTab('products')">
            📦 Product Catalog (${products.length})
          </div>
          <div class="admin-nav-item ${activeAdminTab === 'orders' ? 'active' : ''}" onclick="switchAdminTab('orders')">
            🛒 Orders Management (${orders.length})
          </div>
          <div class="admin-nav-item" onclick="window.location.hash='#home'">
            🌐 Return to Store Front
          </div>
        </div>
      </aside>

      <!-- Main Admin Content -->
      <main class="admin-content">
        <!-- Overview Stats Cards -->
        <div class="admin-stats-grid">
          <div class="admin-stat-card">
            <div class="stat-icon-wrapper sales">💰</div>
            <div>
              <div class="stat-val">$${totalRevenue.toFixed(2)}</div>
              <div class="stat-lbl">Total Gross Revenue</div>
            </div>
          </div>

          <div class="admin-stat-card">
            <div class="stat-icon-wrapper orders">🛒</div>
            <div>
              <div class="stat-val">${orders.length}</div>
              <div class="stat-lbl">Total Customer Orders</div>
            </div>
          </div>

          <div class="admin-stat-card">
            <div class="stat-icon-wrapper products">📦</div>
            <div>
              <div class="stat-val">${products.length}</div>
              <div class="stat-lbl">Active Products</div>
            </div>
          </div>

          <div class="admin-stat-card">
            <div class="stat-icon-wrapper users">👥</div>
            <div>
              <div class="stat-val">${window.store.users.length}</div>
              <div class="stat-lbl">Registered Accounts</div>
            </div>
          </div>
        </div>

        <div id="admin-tab-body">
          ${activeAdminTab === 'products' ? renderAdminProductsTable() : renderAdminOrdersTable()}
        </div>
      </main>
    </div>

    <!-- Product Add/Edit Modal -->
    <div id="admin-product-modal" class="modal-overlay">
      <div class="modal-card">
        <h3 id="product-modal-title" style="font-size:18px; font-weight:700; margin-bottom:16px;">Add New Product</h3>
        <form id="admin-product-form" onsubmit="handleProductFormSubmit(event)">
          <input type="hidden" id="admin-prod-id" />
          <div class="form-group">
            <label>Product Title</label>
            <input type="text" id="admin-prod-title" class="form-control" required />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
            <div class="form-group">
              <label>Brand</label>
              <input type="text" id="admin-prod-brand" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Category</label>
              <select id="admin-prod-category" class="form-control" required>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Books">Books</option>
                <option value="Beauty">Beauty</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px;">
            <div class="form-group">
              <label>Price ($)</label>
              <input type="number" step="0.01" id="admin-prod-price" class="form-control" required />
            </div>
            <div class="form-group">
              <label>Original Price ($)</label>
              <input type="number" step="0.01" id="admin-prod-original" class="form-control" />
            </div>
            <div class="form-group">
              <label>Stock Qty</label>
              <input type="number" id="admin-prod-stock" class="form-control" value="20" required />
            </div>
          </div>
          <div class="form-group">
            <label>Image URL</label>
            <input type="url" id="admin-prod-image" class="form-control" required />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea id="admin-prod-desc" class="form-control" rows="3" required></textarea>
          </div>
          <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:20px;">
            <button type="button" class="btn-amazon-secondary" onclick="closeAdminProductModal()">Cancel</button>
            <button type="submit" class="btn-amazon-primary">Save Product</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderAdminProductsTable() {
  const products = window.store.products;

  return `
    <div class="admin-table-card">
      <div class="admin-table-header">
        <h3 style="font-size:18px; font-weight:700;">Manage Product Inventory</h3>
        <button class="btn-amazon-primary" onclick="openAddProductModal()">+ Add New Product</button>
      </div>

      <table class="admin-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${products.map(p => `
            <tr>
              <td>
                <div style="display:flex; align-items:center; gap:10px;">
                  <img src="${p.image}" style="width:36px; height:36px; object-fit:contain;" />
                  <span style="font-weight:600; max-width:240px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.title}</span>
                </div>
              </td>
              <td>${p.category}</td>
              <td>${p.brand}</td>
              <td><strong>$${p.price.toFixed(2)}</strong></td>
              <td><span class="${p.stock > 10 ? 'badge-stock-in' : 'badge-stock-low'}">${p.stock} units</span></td>
              <td>★ ${p.rating} (${p.reviewsCount})</td>
              <td>
                <button class="btn-amazon-secondary" style="font-size:11px; padding:4px 8px;" onclick="openEditProductModal('${p.id}')">Edit</button>
                <button class="btn-amazon-secondary" style="font-size:11px; padding:4px 8px; color:#cc0c39;" onclick="if(confirm('Delete product ${p.title}?')) window.store.deleteProduct('${p.id}');">Delete</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderAdminOrdersTable() {
  const orders = window.store.orders;

  return `
    <div class="admin-table-card">
      <div class="admin-table-header">
        <h3 style="font-size:18px; font-weight:700;">All Customer Orders</h3>
      </div>

      <table class="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(o => `
            <tr>
              <td><strong>${o.id}</strong></td>
              <td>${o.shippingAddress.name}</td>
              <td>${new Date(o.date).toLocaleDateString()}</td>
              <td>${o.items.length} items</td>
              <td><strong>$${o.grandTotal.toFixed(2)}</strong></td>
              <td><span class="badge-deal" style="background:${o.status === 'Delivered' ? '#067d62' : (o.status === 'Cancelled' ? '#cc0c39' : '#232f3e')};">${o.status}</span></td>
              <td>
                <select style="padding:4px;" onchange="window.store.updateOrderStatus('${o.id}', this.value)">
                  <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
                  <option value="Shipped" ${o.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                  <option value="Out for Delivery" ${o.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
                  <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                  <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function switchAdminTab(tab) {
  activeAdminTab = tab;
  window.store.notify();
}

function openAddProductModal() {
  document.getElementById('product-modal-title').innerText = "Add New Product";
  document.getElementById('admin-prod-id').value = "";
  document.getElementById('admin-product-form').reset();
  document.getElementById('admin-product-modal').classList.add('active');
}

function openEditProductModal(productId) {
  const p = window.store.products.find(item => item.id === productId);
  if (!p) return;

  document.getElementById('product-modal-title').innerText = "Edit Product";
  document.getElementById('admin-prod-id').value = p.id;
  document.getElementById('admin-prod-title').value = p.title;
  document.getElementById('admin-prod-brand').value = p.brand;
  document.getElementById('admin-prod-category').value = p.category;
  document.getElementById('admin-prod-price').value = p.price;
  document.getElementById('admin-prod-original').value = p.originalPrice || "";
  document.getElementById('admin-prod-stock').value = p.stock;
  document.getElementById('admin-prod-image').value = p.image;
  document.getElementById('admin-prod-desc').value = p.description;
  document.getElementById('admin-product-modal').classList.add('active');
}

function closeAdminProductModal() {
  document.getElementById('admin-product-modal').classList.remove('active');
}

function handleProductFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('admin-prod-id').value;
  const title = document.getElementById('admin-prod-title').value;
  const brand = document.getElementById('admin-prod-brand').value;
  const category = document.getElementById('admin-prod-category').value;
  const price = parseFloat(document.getElementById('admin-prod-price').value);
  const originalPrice = parseFloat(document.getElementById('admin-prod-original').value) || undefined;
  const stock = parseInt(document.getElementById('admin-prod-stock').value);
  const image = document.getElementById('admin-prod-image').value;
  const description = document.getElementById('admin-prod-desc').value;

  if (id) {
    window.store.updateProduct(id, { title, brand, category, price, originalPrice, stock, image, description });
    alert("Product updated!");
  } else {
    window.store.addProduct({ title, brand, category, price, originalPrice, stock, image, description, specs: ["High quality product", "Warranty included"] });
    alert("New product added to catalog!");
  }

  closeAdminProductModal();
}

window.switchAdminTab = switchAdminTab;
window.openAddProductModal = openAddProductModal;
window.openEditProductModal = openEditProductModal;
window.closeAdminProductModal = closeAdminProductModal;
window.handleProductFormSubmit = handleProductFormSubmit;

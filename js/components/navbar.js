/* ==========================================================================
   AMAZON CLONE - NAVBAR COMPONENT (HEADER & LIVE SEARCH)
   ========================================================================== */

function renderNavbar() {
  const container = document.getElementById('navbar-container');
  if (!container) return;

  const cartDetails = window.store.getCartDetails();
  const user = window.store.currentUser;
  const categories = ["All", "Electronics", "Fashion", "Home & Kitchen", "Books", "Beauty", "Sports"];

  container.innerHTML = `
    <header class="amazon-header">
      <!-- Top Main Navbar -->
      <nav class="nav-main">
        <!-- Logo -->
        <div class="nav-logo" onclick="window.location.hash = '#home'">
          <span class="nav-logo-text">amazon<span class="smile">.com</span></span>
          <span class="nav-logo-tag">prime</span>
        </div>

        <!-- Deliver to Location -->
        <div class="nav-location" onclick="alert('Deliver to Location: San Jose, CA 95110')">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 21s-8-7.5-8-12a8 8 0 1116 0c0 4.5-8 12-8 12z"/><circle cx="12" cy="9" r="3"/></svg>
          <div class="nav-location-text">
            <span class="nav-line-1">Deliver to ${user ? user.name.split(' ')[0] : 'Customer'}</span>
            <span class="nav-line-2">San Jose 95110</span>
          </div>
        </div>

        <!-- Live Search Bar -->
        <div class="nav-search-container">
          <select id="nav-category-select" class="nav-search-category">
            ${categories.map(cat => `<option value="${cat}" ${window.store.selectedCategory === cat ? 'selected' : ''}>${cat}</option>`).join('')}
          </select>
          <input type="text" id="nav-search-input" class="nav-search-input" placeholder="Search Amazon" value="${window.store.searchQuery}">
          <button class="nav-search-btn" id="nav-search-btn" title="Search">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>

          <!-- Live Auto-Suggest Popup -->
          <div id="search-suggestions-popup" class="search-suggestions-popup"></div>
        </div>

        <!-- Nav Right Tools -->
        <div class="nav-tools">
          <!-- User / Account Dropdown -->
          <div class="nav-item">
            <div class="nav-line-1">Hello, ${user ? user.name : 'Sign in'}</div>
            <div class="nav-line-2">Account & Lists ▾</div>
            <div class="nav-dropdown">
              <div class="nav-dropdown-header">
                ${user ? `Logged in as <strong>${user.name}</strong>` : `<button class="btn-amazon-primary" style="width:100%" onclick="window.location.hash='#auth'">Sign In</button>`}
              </div>
              <div class="nav-dropdown-item" onclick="window.location.hash='#dashboard'">Your Account</div>
              <div class="nav-dropdown-item" onclick="window.location.hash='#orders'">Your Orders</div>
              <div class="nav-dropdown-item" onclick="window.location.hash='#wishlist'">Your Wishlist</div>
              ${user && user.role === 'admin' ? `<div class="nav-dropdown-item" style="color:#d97706; font-weight:bold;" onclick="window.location.hash='#admin'">⚙️ Admin Dashboard</div>` : ''}
              ${user ? `<div class="nav-dropdown-item" style="color:#cc0c39; border-top:1px solid #eee;" onclick="window.store.logoutUser(); window.location.hash='#home';">Sign Out</div>` : ''}
            </div>
          </div>

          <!-- Orders -->
          <div class="nav-item" onclick="window.location.hash='#orders'">
            <div class="nav-line-1">Returns</div>
            <div class="nav-line-2">& Orders</div>
          </div>

          <!-- Cart Icon -->
          <div class="nav-item nav-cart-btn" onclick="window.location.hash='#cart'">
            <div class="cart-icon-wrapper">
              <svg width="34" height="34" fill="none" stroke="currentColor" stroke-width="1.8" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
              <span class="cart-count-badge">${cartDetails.itemCount}</span>
            </div>
            <span class="cart-title">Cart</span>
          </div>
        </div>
      </nav>

      <!-- Sub Navbar -->
      <nav class="nav-sub">
        <div class="nav-sub-item highlight" onclick="window.location.hash='#home'"><svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg> All</div>
        <div class="nav-sub-item" onclick="window.location.hash='#home'">Today's Deals</div>
        <div class="nav-sub-item" onclick="window.location.hash='#category/Electronics'">Electronics</div>
        <div class="nav-sub-item" onclick="window.location.hash='#category/Fashion'">Fashion</div>
        <div class="nav-sub-item" onclick="window.location.hash='#category/Home & Kitchen'">Home & Kitchen</div>
        <div class="nav-sub-item" onclick="window.location.hash='#category/Books'">Books</div>
        <div class="nav-sub-item" onclick="window.location.hash='#category/Beauty'">Beauty</div>
        <div class="nav-sub-item" onclick="window.location.hash='#category/Sports'">Sports</div>
        <div class="nav-sub-item" onclick="window.location.hash='#wishlist'">Wishlist (${window.store.wishlist.length})</div>
        ${user && user.role === 'admin' ? `<div class="nav-sub-item highlight" style="margin-left:auto; background:#d97706; padding:2px 8px; border-radius:2px;" onclick="window.location.hash='#admin'">Admin Portal</div>` : ''}
      </nav>
    </header>
  `;

  // Attach search listeners
  const searchInput = document.getElementById('nav-search-input');
  const categorySelect = document.getElementById('nav-category-select');
  const searchBtn = document.getElementById('nav-search-btn');
  const popup = document.getElementById('search-suggestions-popup');

  categorySelect.addEventListener('change', (e) => {
    window.store.selectedCategory = e.target.value;
  });

  const handleSearch = () => {
    const query = searchInput.value.trim();
    window.store.searchQuery = query;
    popup.classList.remove('active');
    window.location.hash = query ? `#search?q=${encodeURIComponent(query)}` : '#home';
  };

  searchBtn.addEventListener('click', handleSearch);

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Live Auto-Suggest as user types
  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    if (!val) {
      popup.classList.remove('active');
      return;
    }

    const matches = window.store.products.filter(p => 
      p.title.toLowerCase().includes(val) || p.brand.toLowerCase().includes(val) || p.category.toLowerCase().includes(val)
    ).slice(0, 6);

    if (matches.length === 0) {
      popup.innerHTML = `<div class="suggestion-item"><span style="color:#888;">No products found for "${val}"</span></div>`;
    } else {
      popup.innerHTML = matches.map(p => `
        <div class="suggestion-item" onclick="window.location.hash='#product/${p.id}'; document.getElementById('search-suggestions-popup').classList.remove('active');">
          <img src="${p.image}" alt="${p.title}" />
          <div class="suggestion-details">
            <div class="suggestion-title">${highlightMatch(p.title, val)}</div>
            <div class="suggestion-category">${p.category} | ${p.brand}</div>
          </div>
          <div class="suggestion-price">$${p.price.toFixed(2)}</div>
        </div>
      `).join('');
    }
    popup.classList.add('active');
  });

  // Close search suggestions on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search-container')) {
      popup.classList.remove('active');
    }
  });
}

function highlightMatch(text, query) {
  const reg = new RegExp(`(${query})`, 'gi');
  return text.replace(reg, '<strong style="color:#e68a00;">$1</strong>');
}

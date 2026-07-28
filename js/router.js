/* ==========================================================================
   AMAZON CLONE - SPA ROUTER & RENDER ENGINE
   ========================================================================== */

function handleRouting() {
  const hash = window.location.hash.slice(1) || 'home';
  const mainContainer = document.getElementById('app-main');
  if (!mainContainer) return;

  // Re-render Navbar to stay synced
  renderNavbar();

  if (hash === 'home') {
    renderHomePage(mainContainer);
  } else if (hash.startsWith('category/')) {
    const category = decodeURIComponent(hash.split('/')[1]);
    renderCategoryPage(mainContainer, category);
  } else if (hash.startsWith('search')) {
    const query = new URLSearchParams(hash.split('?')[1]).get('q') || '';
    renderSearchResultsPage(mainContainer, query);
  } else if (hash.startsWith('product/')) {
    const productId = hash.split('/')[1];
    mainContainer.innerHTML = renderProductDetail(productId);
  } else if (hash === 'cart') {
    mainContainer.innerHTML = renderCartPage();
  } else if (hash === 'checkout') {
    mainContainer.innerHTML = renderCheckoutWizard();
  } else if (hash === 'wishlist') {
    mainContainer.innerHTML = renderWishlistPage();
  } else if (hash === 'orders') {
    mainContainer.innerHTML = renderOrdersPage();
  } else if (hash === 'dashboard') {
    mainContainer.innerHTML = renderDashboardPage();
  } else if (hash === 'admin') {
    mainContainer.innerHTML = renderAdminPanel();
  } else if (hash === 'auth') {
    mainContainer.innerHTML = renderAuthPage();
  } else {
    renderHomePage(mainContainer);
  }

  window.scrollTo(0, 0);
}

function renderHomePage(container) {
  const products = window.store.products;
  const bestSellers = products.filter(p => p.isBestSeller);
  const todayDeals = products.filter(p => p.isTodayDeal);

  container.innerHTML = `
    <!-- Hero Banner Slider -->
    ${renderHeroSlider()}

    <div class="container home-content-section">
      <!-- 4-Quadrant Category Cards -->
      ${renderCategoryQuadCards()}

      <!-- Flash Sale Deals Section -->
      ${renderFlashSaleSection(products)}

      <!-- Today's Deals Carousel/Grid -->
      <section class="deal-section-card">
        <div class="section-heading">
          <h2>Today's Deals</h2>
          <a href="#category/Electronics" class="see-more">See all deals →</a>
        </div>
        <div class="product-grid">
          ${todayDeals.map(p => renderProductCard(p)).join('')}
        </div>
      </section>

      <!-- Best Sellers -->
      <section class="deal-section-card">
        <div class="section-heading">
          <h2>Best Sellers in All Departments</h2>
        </div>
        <div class="product-grid">
          ${bestSellers.map(p => renderProductCard(p)).join('')}
        </div>
      </section>
    </div>
  `;
}

function renderCategoryPage(container, category) {
  let filtered = window.store.products;
  if (category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }

  container.innerHTML = `
    <div class="container animate-fade-in" style="margin-top:20px;">
      <div class="section-heading">
        <h2>${category} Department (${filtered.length} products)</h2>
      </div>
      <div class="product-grid">
        ${filtered.map(p => renderProductCard(p)).join('')}
      </div>
    </div>
  `;
}

function renderSearchResultsPage(container, query) {
  const q = query.toLowerCase();
  const results = window.store.products.filter(p => 
    p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  container.innerHTML = `
    <div class="container animate-fade-in" style="margin-top:20px;">
      <div style="font-size:13px; color:#565959; margin-bottom:12px;">
        1-${results.length} of ${results.length} results for "<strong style="color:#c7511f;">${query}</strong>"
      </div>

      <div class="product-grid">
        ${results.length === 0 ? `<div style="grid-column:1/-1; text-align:center; padding:40px;"><h3>No products found for "${query}"</h3><p>Try checking spelling or using more general terms.</p></div>` : ''}
        ${results.map(p => renderProductCard(p)).join('')}
      </div>
    </div>
  `;
}

// Router Event Listeners
window.addEventListener('hashchange', handleRouting);
window.addEventListener('DOMContentLoaded', () => {
  window.store.subscribe(() => handleRouting());
  handleRouting();
});

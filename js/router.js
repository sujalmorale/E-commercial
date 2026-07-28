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

  const isHomeKitchen = (category === 'Home & Kitchen');
  const isBooks = (category === 'Books');
  const isFashion = (category === 'Fashion');

  container.innerHTML = `
    <div class="container animate-fade-in" style="margin-top:16px;">
      
      <!-- Top Banner Header for Home & Kitchen -->
      ${isHomeKitchen ? `
        <div style="background: linear-gradient(135deg, #fff7eb 0%, #fff0db 100%); border-radius: 8px; padding: 24px 32px; margin-bottom: 20px; border: 1px solid #fed7aa;">
          <h1 style="font-size: 24px; font-weight: 800; color: #9a3412; margin-bottom: 6px;">
            Buy products across Home, Kitchen, Furniture & Appliances online at Amazon
          </h1>
          <p style="font-size: 13px; color: #7c2d12;">
            Browse through wide range of Home & Kitchen products such as cookers, air fryers, colanders, clocks, lighting, bottles, and storage essentials.
          </p>
        </div>

        <!-- Quick Sub-category Icon Bar -->
        <div style="display: flex; gap: 16px; overflow-x: auto; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 100px; cursor: pointer;" onclick="filterCategoryBrand('')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">🍳</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Kitchenware</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 100px; cursor: pointer;" onclick="filterCategoryBrand('Prestige')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #ffedd5; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">⚡</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Appliances</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 100px; cursor: pointer;" onclick="filterCategoryBrand('Titan')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #fef08a; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">🕒</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Decor & Clocks</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 100px; cursor: pointer;" onclick="filterCategoryBrand('Orient')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">💡</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Lighting</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 100px; cursor: pointer;" onclick="filterCategoryBrand('MILTON')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #f3e8ff; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">🚰</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Thermosteel</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 100px; cursor: pointer;" onclick="filterCategoryBrand('Scotch-Brite')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #ffe4e6; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">🧼</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Cleaning</span>
          </div>
        </div>

        <!-- Room by Room Grid Section -->
        <div style="background: white; border-radius: 8px; padding: 20px; margin-bottom: 24px; box-shadow: var(--shadow-sm);">
          <h3 style="font-size: 18px; font-weight: 700; margin-bottom: 16px;">Shop by Room & Category</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
            <div style="position: relative; border-radius: 8px; overflow: hidden; height: 140px; background: url('https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80') center/cover; display: flex; align-items: flex-end; padding: 12px; cursor: pointer;" onclick="filterCategoryBrand('')">
              <span style="background: rgba(255,255,255,0.92); padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 12px;">Kitchen ➔</span>
            </div>

            <div style="position: relative; border-radius: 8px; overflow: hidden; height: 140px; background: url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80') center/cover; display: flex; align-items: flex-end; padding: 12px; cursor: pointer;" onclick="filterCategoryBrand('')">
              <span style="background: rgba(255,255,255,0.92); padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 12px;">Living Room ➔</span>
            </div>

            <div style="position: relative; border-radius: 8px; overflow: hidden; height: 140px; background: url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=500&q=80') center/cover; display: flex; align-items: flex-end; padding: 12px; cursor: pointer;" onclick="filterCategoryBrand('')">
              <span style="background: rgba(255,255,255,0.92); padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 12px;">Bedroom ➔</span>
            </div>

            <div style="position: relative; border-radius: 8px; overflow: hidden; height: 140px; background: url('https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=500&q=80') center/cover; display: flex; align-items: flex-end; padding: 12px; cursor: pointer;" onclick="filterCategoryBrand('')">
              <span style="background: rgba(255,255,255,0.92); padding: 4px 12px; border-radius: 12px; font-weight: 700; font-size: 12px;">Dining Room ➔</span>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Top Banner Header for Books -->
      ${isBooks ? `
        <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border-radius: 8px; padding: 24px 32px; margin-bottom: 20px; border: 1px solid #bfdbfe;">
          <h1 style="font-size: 24px; font-weight: 800; color: #1e40af; margin-bottom: 6px;">
            The Amazon Bookstore – Best Sellers, Self-Help, Business & Philosophy
          </h1>
          <p style="font-size: 13px; color: #1e3a8a;">
            Explore millions of books including Think and Grow Rich, How to Win Friends, Rich Dad Poor Dad, Atomic Habits, and classic boxsets.
          </p>
        </div>

        <!-- Quick Sub-category Icon Bar for Books -->
        <div style="display: flex; gap: 16px; overflow-x: auto; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('Napoleon Hill')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #fef3c7; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">📚</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Self-Help</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('Robert Kiyosaki')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">💡</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Business & Wealth</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('Dale Carnegie')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #e0f2fe; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">🤝</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Communication</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('Classics Library')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #f3e8ff; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">🏛️</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Philosophy</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('Boxset Classics')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #ffe4e6; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">🎁</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Boxsets</span>
          </div>
        </div>
      ` : ''}

      <!-- Top Banner Header for Fashion -->
      ${isFashion ? `
        <div style="background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%); border-radius: 8px; padding: 24px 32px; margin-bottom: 20px; border: 1px solid #fbcfe8;">
          <h1 style="font-size: 24px; font-weight: 800; color: #9d174d; margin-bottom: 6px;">
            Amazon Fashion – Trending Shirts, Ethnic Kurta Sets, Jeans & Activewear
          </h1>
          <p style="font-size: 13px; color: #831843;">
            Upgrade your wardrobe with top styles from AUSK, ANNI DESIGNER, The Pant Project, Symbol Premium, KLOSIA, Nike, and Levi's.
          </p>
        </div>

        <!-- Quick Sub-category Icon Bar for Fashion -->
        <div style="display: flex; gap: 16px; overflow-x: auto; padding-bottom: 16px; margin-bottom: 24px;">
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('AUSK')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #fae8ff; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">👔</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Polos & Shirts</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('ANNI DESIGNER')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #fce7f3; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">👗</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Women's Ethnic</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('The Pant Project')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #e0e7ff; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">👖</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Formal & Jeans</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('TOPLOT')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">👚</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Co-ords & Tops</span>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 110px; cursor: pointer;" onclick="filterCategoryBrand('Lymio')">
            <div style="width: 72px; height: 72px; border-radius: 50%; background: #fef3c7; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">🩳</div>
            <span style="font-size: 12px; font-weight: 600; text-align: center;">Cargo & Shorts</span>
          </div>
        </div>
      ` : ''}

      <!-- Main Layout with Sidebar Filters & Product Grid -->
      <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
        
        <!-- Left Sidebar Filters -->
        <aside style="background: white; border-radius: 4px; padding: 16px; box-shadow: var(--shadow-sm); height: fit-content; font-size: 13px;">
          <h4 style="font-weight: 700; font-size: 14px; margin-bottom: 12px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">Category</h4>
          <ul style="line-height: 1.8; color: #333; margin-bottom: 16px;">
            <li><a href="#category/Fashion" style="font-weight:bold; color:var(--amazon-link);">${category}</a></li>
            ${isFashion ? `
              <li style="margin-left:10px;"><a href="javascript:void(0)" onclick="filterCategoryBrand('AUSK')">Men's Shirts & Polos</a></li>
              <li style="margin-left:10px;"><a href="javascript:void(0)" onclick="filterCategoryBrand('ANNI DESIGNER')">Women's Ethnic & Kurtas</a></li>
              <li style="margin-left:10px;"><a href="javascript:void(0)" onclick="filterCategoryBrand('The Pant Project')">Formal Trousers & Pants</a></li>
              <li style="margin-left:10px;"><a href="javascript:void(0)" onclick="filterCategoryBrand('Symbol Premium')">Denim Jeans & Jackets</a></li>
              <li style="margin-left:10px;"><a href="javascript:void(0)" onclick="filterCategoryBrand('TOPLOT')">Co-ord Sets & Tops</a></li>
              <li style="margin-left:10px;"><a href="javascript:void(0)" onclick="filterCategoryBrand('Lymio')">Cargo Shorts & Casuals</a></li>
            ` : (isBooks ? `
              <li style="margin-left:10px;"><a href="javascript:void(0)" onclick="filterCategoryBrand('Napoleon Hill')">Self-Help & Mindset</a></li>
              <li style="margin-left:10px;"><a href="javascript:void(0)" onclick="filterCategoryBrand('Robert Kiyosaki')">Business & Economics</a></li>
            ` : `
              <li style="margin-left:10px;"><a href="javascript:void(0)">Kitchen Appliances</a></li>
              <li style="margin-left:10px;"><a href="javascript:void(0)">Home Decor & Clocks</a></li>
            `)}
          </ul>

          <h4 style="font-weight: 700; font-size: 14px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">Brands</h4>
          <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:16px;">
            ${isFashion ? `
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'AUSK')" /> AUSK</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'ANNI DESIGNER')" /> ANNI DESIGNER</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'The Pant Project')" /> The Pant Project</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Symbol Premium')" /> Symbol Premium</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'KLOSIA')" /> KLOSIA</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Lymio')" /> Lymio</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'TOPLOT')" /> TOPLOT</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Ada')" /> Ada</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Leriya Fashion')" /> Leriya Fashion</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Nike')" /> Nike</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Levi\'s')" /> Levi's</label>
            ` : (isBooks ? `
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Napoleon Hill')" /> Napoleon Hill</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Dale Carnegie')" /> Dale Carnegie</label>
            ` : `
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Prestige')" /> Prestige</label>
              <label><input type="checkbox" onchange="filterBrandCheck(this, 'Philips')" /> Philips</label>
            `)}
          </div>

          ${isFashion ? `
            <h4 style="font-weight: 700; font-size: 14px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">Size</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:16px; font-size:11px; text-align:center;">
              <span style="border:1px solid #ccc; padding:4px; border-radius:4px; cursor:pointer;">S</span>
              <span style="border:1px solid #ccc; padding:4px; border-radius:4px; cursor:pointer;">M</span>
              <span style="border:1px solid #ccc; padding:4px; border-radius:4px; cursor:pointer;">L</span>
              <span style="border:1px solid #ccc; padding:4px; border-radius:4px; cursor:pointer;">XL</span>
              <span style="border:1px solid #ccc; padding:4px; border-radius:4px; cursor:pointer;">2XL</span>
              <span style="border:1px solid #ccc; padding:4px; border-radius:4px; cursor:pointer;">Free</span>
            </div>
          ` : ''}

          <h4 style="font-weight: 700; font-size: 14px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">Customer Reviews</h4>
          <div style="color: #ffa41c; cursor: pointer; margin-bottom: 16px;" onclick="filterCategoryRating(4)">
            ★★★★☆ & Up <span style="color:#565959;">(4.0+)</span>
          </div>

          <h4 style="font-weight: 700; font-size: 14px; margin-bottom: 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px;">Price Range</h4>
          <div style="display:flex; flex-direction:column; gap:4px; color:var(--amazon-link); cursor:pointer;">
            <span onclick="filterPriceRange(0, 20)">Under $20</span>
            <span onclick="filterPriceRange(20, 40)">$20 to $40</span>
            <span onclick="filterPriceRange(40, 80)">$40 to $80</span>
            <span onclick="filterPriceRange(80, 500)">$80 & Above</span>
          </div>
        </aside>

        <!-- Right Products Section -->
        <div>
          <div class="section-heading" style="background:white; padding:12px 16px; border-radius:4px; box-shadow:var(--shadow-sm);">
            <h2 style="font-size:18px;">${category} Department <span style="font-size:13px; font-weight:normal; color:#565959;">(${filtered.length} items)</span></h2>
            <select id="sort-category-select" class="qty-select" onchange="sortCategoryProducts(this.value, '${category}')">
              <option value="featured">Sort by: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Avg. Customer Review</option>
            </select>
          </div>

          <div class="product-grid" id="cat-product-grid" style="margin-top:16px;">
            ${filtered.map(p => renderProductCard(p)).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function filterCategoryBrand(brandName) {
  const container = document.getElementById('app-main');
  let filtered = window.store.products.filter(p => p.category === 'Home & Kitchen');
  if (brandName) {
    filtered = filtered.filter(p => p.brand.toLowerCase() === brandName.toLowerCase());
  }
  const grid = document.getElementById('cat-product-grid');
  if (grid) {
    grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }
}

function filterBrandCheck(checkbox, brandName) {
  filterCategoryBrand(checkbox.checked ? brandName : '');
}

function filterCategoryRating(minRating) {
  const grid = document.getElementById('cat-product-grid');
  if (grid) {
    const filtered = window.store.products.filter(p => p.category === 'Home & Kitchen' && p.rating >= minRating);
    grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }
}

function filterPriceRange(min, max) {
  const grid = document.getElementById('cat-product-grid');
  if (grid) {
    const filtered = window.store.products.filter(p => p.category === 'Home & Kitchen' && p.price >= min && p.price <= max);
    grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }
}

function sortCategoryProducts(sortType, category) {
  let filtered = window.store.products.filter(p => category === 'All' || p.category === category);
  if (sortType === 'low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortType === 'high-low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortType === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }
  const grid = document.getElementById('cat-product-grid');
  if (grid) {
    grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
  }
}

window.filterCategoryBrand = filterCategoryBrand;
window.filterBrandCheck = filterBrandCheck;
window.filterCategoryRating = filterCategoryRating;
window.filterPriceRange = filterPriceRange;
window.sortCategoryProducts = sortCategoryProducts;


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

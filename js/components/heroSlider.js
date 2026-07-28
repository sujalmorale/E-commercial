/* ==========================================================================
   AMAZON CLONE - HERO BANNER SLIDER COMPONENT
   ========================================================================== */

let currentSlideIndex = 0;
let sliderInterval = null;

function renderHeroSlider() {
  const slides = [
    {
      title: "Electronics Mega Flash Sale",
      subtitle: "Save up to 40% on Laptops, Noise Canceling Headphones & 4K Smart TVs",
      btnText: "Shop Electronics Deals",
      category: "Electronics",
      bgImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80"
    },
    {
      title: "New Season Fashion Arrivals",
      subtitle: "Explore top brands in apparel, footwear, and luxury lifestyle accessories",
      btnText: "Explore Fashion",
      category: "Fashion",
      bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80"
    },
    {
      title: "Upgrade Your Home & Kitchen",
      subtitle: "Premium Espresso machines, Instant Pots & culinary appliances with Free Prime Delivery",
      btnText: "Shop Home Deals",
      category: "Home & Kitchen",
      bgImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80"
    }
  ];

  const html = `
    <div class="hero-slider-container">
      <button class="hero-nav-btn prev" id="hero-prev-btn">❮</button>
      <button class="hero-nav-btn next" id="hero-next-btn">❯</button>
      
      <div class="hero-slider-track" id="hero-slider-track">
        ${slides.map((slide, idx) => `
          <div class="hero-slide" style="background-image: url('${slide.bgImage}');">
            <div class="hero-slide-overlay">
              <div class="hero-content-box animate-fade-in">
                <div class="badge-deal" style="margin-bottom:8px;">PRIME DAY EXCLUSIVE</div>
                <h2 class="hero-title">${slide.title}</h2>
                <p class="hero-subtitle">${slide.subtitle}</p>
                <button class="btn-amazon-primary" onclick="window.location.hash='#category/${slide.category}'">${slide.btnText}</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  setTimeout(() => {
    const track = document.getElementById('hero-slider-track');
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');

    if (!track) return;

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    };

    if (prevBtn && nextBtn) {
      prevBtn.onclick = () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        updateSlider();
      };
      nextBtn.onclick = () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlider();
      };
    }

    if (sliderInterval) clearInterval(sliderInterval);
    sliderInterval = setInterval(() => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateSlider();
    }, 6000);
  }, 50);

  return html;
}

/* ==========================================================================
   AMAZON CLONE - CENTRAL REACTIVE STORE & LOCALSTORAGE ENGINE
   ========================================================================== */

class AppStore {
  constructor() {
    this.listeners = [];
    this.initStore();
  }

  initStore() {
    // Load from LocalStorage or initialize with defaults
    this.products = this.loadStorage('amazon_products', INITIAL_PRODUCTS);
    if (this.products.length < INITIAL_PRODUCTS.length) {
      this.products = INITIAL_PRODUCTS;
      this.saveStorage('amazon_products', this.products);
    }
    this.users = this.loadStorage('amazon_users', INITIAL_USERS);
    this.orders = this.loadStorage('amazon_orders', INITIAL_ORDERS);
    this.coupons = INITIAL_COUPONS;

    // Active session
    this.currentUser = this.loadStorage('amazon_current_user', INITIAL_USERS[1]); // Default logged-in demo user
    if (this.currentUser && (this.currentUser.name === "Srujal" || this.currentUser.name === "Sujal Morale" || this.currentUser.name === "Sujal")) {
      this.currentUser.name = "Customer";
      this.saveStorage('amazon_current_user', this.currentUser);
    }
    this.cart = this.loadStorage('amazon_cart', []);
    this.wishlist = this.loadStorage('amazon_wishlist', []);
    this.saveForLater = this.loadStorage('amazon_sfl', []);
    
    // Applied coupon
    this.activeCoupon = null;

    // UI state
    this.searchQuery = "";
    this.selectedCategory = "All";
    this.activeRoute = "home";
    this.selectedProductId = null;
    this.checkoutStep = 1;
  }

  loadStorage(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      console.warn(`Error reading ${key} from LocalStorage`, e);
      return defaultVal;
    }
  }

  saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing ${key} to LocalStorage`, e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this));
  }

  /* Cart Methods */
  addToCart(productId, qty = 1) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.cart.findIndex(item => item.productId === productId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += qty;
    } else {
      this.cart.push({
        productId,
        quantity: qty,
        addedAt: new Date().toISOString()
      });
    }

    this.saveStorage('amazon_cart', this.cart);
    this.notify();
  }

  updateCartQty(productId, qty) {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const item = this.cart.find(i => i.productId === productId);
    if (item) {
      item.quantity = qty;
      this.saveStorage('amazon_cart', this.cart);
      this.notify();
    }
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter(i => i.productId !== productId);
    this.saveStorage('amazon_cart', this.cart);
    this.notify();
  }

  moveToSaveForLater(productId) {
    const item = this.cart.find(i => i.productId === productId);
    if (item) {
      this.removeFromCart(productId);
      this.saveForLater.push(item);
      this.saveStorage('amazon_sfl', this.saveForLater);
      this.notify();
    }
  }

  moveToCartFromSaveForLater(productId) {
    const item = this.saveForLater.find(i => i.productId === productId);
    if (item) {
      this.saveForLater = this.saveForLater.filter(i => i.productId !== productId);
      this.saveStorage('amazon_sfl', this.saveForLater);
      this.addToCart(productId, item.quantity);
    }
  }

  clearCart() {
    this.cart = [];
    this.activeCoupon = null;
    this.saveStorage('amazon_cart', this.cart);
    this.notify();
  }

  getCartDetails() {
    let subtotal = 0;
    const items = this.cart.map(cartItem => {
      const product = this.products.find(p => p.id === cartItem.productId);
      const itemSubtotal = (product ? product.price : 0) * cartItem.quantity;
      subtotal += itemSubtotal;
      return {
        ...cartItem,
        product,
        itemSubtotal
      };
    });

    let discount = 0;
    let freeShipping = subtotal >= 25;

    if (this.activeCoupon) {
      if (this.activeCoupon.discountPercent > 0) {
        discount = subtotal * (this.activeCoupon.discountPercent / 100);
      }
      if (this.activeCoupon.freeShipping) {
        freeShipping = true;
      }
    }

    const shippingFee = freeShipping ? 0 : 5.99;
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = taxableAmount * 0.08; // 8% Tax
    const grandTotal = taxableAmount + shippingFee + tax;

    return {
      items,
      subtotal,
      discount,
      shippingFee,
      freeShipping,
      tax,
      grandTotal,
      itemCount: this.cart.reduce((sum, i) => sum + i.quantity, 0)
    };
  }

  /* Wishlist Methods */
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
    } else {
      this.wishlist.push(productId);
    }
    this.saveStorage('amazon_wishlist', this.wishlist);
    this.notify();
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  /* Coupon Methods */
  applyCoupon(code) {
    const coupon = this.coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (coupon) {
      this.activeCoupon = coupon;
      this.notify();
      return { success: true, message: `Coupon '${coupon.code}' applied successfully!` };
    }
    return { success: false, message: "Invalid coupon code!" };
  }

  /* Order & Checkout Methods */
  createOrder(checkoutData) {
    const cartDetails = this.getCartDetails();
    if (cartDetails.items.length === 0) return null;

    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: this.currentUser ? this.currentUser.id : "guest",
      date: new Date().toISOString(),
      status: "Processing",
      items: cartDetails.items.map(i => ({
        id: i.product.id,
        title: i.product.title,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image
      })),
      subtotal: cartDetails.subtotal,
      shippingFee: cartDetails.shippingFee,
      tax: cartDetails.tax,
      discount: cartDetails.discount,
      grandTotal: cartDetails.grandTotal,
      shippingAddress: checkoutData.shippingAddress,
      paymentMethod: checkoutData.paymentMethod,
      trackingTimeline: [
        { status: "Ordered", date: new Date().toLocaleString(), done: true },
        { status: "Processing", date: "In Progress", done: true },
        { status: "Shipped", date: "Pending", done: false },
        { status: "Out for Delivery", date: "Pending", done: false },
        { status: "Delivered", date: "Pending", done: false }
      ]
    };

    this.orders.unshift(newOrder);
    this.saveStorage('amazon_orders', this.orders);
    this.clearCart();
    return newOrder;
  }

  cancelOrder(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    if (order && (order.status === "Processing" || order.status === "Ordered")) {
      order.status = "Cancelled";
      this.saveStorage('amazon_orders', this.orders);
      this.notify();
      return true;
    }
    return false;
  }

  /* Admin Product CRUD */
  addProduct(productData) {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      reviews: []
    };
    this.products.unshift(newProduct);
    this.saveStorage('amazon_products', this.products);
    this.notify();
    return newProduct;
  }

  updateProduct(productId, updatedFields) {
    const index = this.products.findIndex(p => p.id === productId);
    if (index > -1) {
      this.products[index] = { ...this.products[index], ...updatedFields };
      this.saveStorage('amazon_products', this.products);
      this.notify();
    }
  }

  deleteProduct(productId) {
    this.products = this.products.filter(p => p.id !== productId);
    this.saveStorage('amazon_products', this.products);
    this.notify();
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      // Update timeline step
      order.trackingTimeline.forEach(step => {
        if (step.status === newStatus) step.done = true;
      });
      this.saveStorage('amazon_orders', this.orders);
      this.notify();
    }
  }

  /* Auth User State */
  loginUser(email, password) {
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      this.currentUser = user;
      this.saveStorage('amazon_current_user', this.currentUser);
      this.notify();
      return { success: true, user };
    }
    return { success: false, message: "Invalid email or password!" };
  }

  registerUser(name, email, password) {
    const existing = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, message: "An account with this email already exists!" };
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      password,
      role: "customer",
      addresses: []
    };
    this.users.push(newUser);
    this.currentUser = newUser;
    this.saveStorage('amazon_users', this.users);
    this.saveStorage('amazon_current_user', this.currentUser);
    this.notify();
    return { success: true, user: newUser };
  }

  logoutUser() {
    this.currentUser = null;
    this.saveStorage('amazon_current_user', null);
    this.notify();
  }
}

window.store = new AppStore();

/* ==========================================================================
   AMAZON CLONE - INITIAL SEED DATASET
   ========================================================================== */

const INITIAL_PRODUCTS = [
  {
    id: "prod-101",
    title: "Apple MacBook Pro 16\" (M3 Max, 36GB RAM, 1TB SSD) - Space Black",
    brand: "Apple",
    category: "Electronics",
    price: 3499.00,
    originalPrice: 3899.00,
    rating: 4.8,
    reviewsCount: 342,
    stock: 12,
    isFlashSale: true,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 78,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    description: "The 16-inch MacBook Pro with M3 Max drives extreme performance for demanding workflows like rendering 3D content and training AI models. Up to 22 hours of battery life.",
    specs: [
      "Apple M3 Max 16-Core CPU & 40-Core GPU",
      "36GB Unified Memory | 1TB Superfast SSD",
      "16.2-inch Liquid Retina XDR Display (3024 x 1964)",
      "Three Thunderbolt 4 ports, HDMI port, SDXC card slot, MagSafe 3"
    ],
    reviews: [
      { id: "r1", author: "Alexander K.", rating: 5, date: "2026-06-14", comment: "Unbelievable speed and thermal management. The battery lasts through a full day of video editing!" },
      { id: "r2", author: "Sarah Jenkins", rating: 5, date: "2026-05-20", comment: "The liquid retina display is breathtaking. Worth every single penny." }
    ]
  },
  {
    id: "prod-102",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    brand: "Sony",
    category: "Electronics",
    price: 348.00,
    originalPrice: 399.99,
    rating: 4.7,
    reviewsCount: 1289,
    stock: 25,
    isFlashSale: true,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 64,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description: "Industry-leading noise canceling with two processors and 8 microphones. Ultra-comfortable lightweight design with soft fit leather.",
    specs: [
      "Up to 30-hour battery life with quick charging (3 min for 3 hours)",
      "Magnificent Sound with new Integrated Processor V1",
      "Crystal clear hands-free calling with 4 beamforming microphones",
      "Multipoint connection allows fast switching between devices"
    ],
    reviews: [
      { id: "r3", author: "David M.", rating: 5, date: "2026-07-02", comment: "ANC is lightyears ahead of Bose. Noise completely disappears on flights." }
    ]
  },
  {
    id: "prod-103",
    title: "Samsung 65-Inch Class OLED S90C Series 4K Smart TV",
    brand: "Samsung",
    category: "Electronics",
    price: 1597.99,
    originalPrice: 2099.99,
    rating: 4.6,
    reviewsCount: 512,
    stock: 8,
    isFlashSale: false,
    isTodayDeal: true,
    isBestSeller: false,
    claimedPercent: 45,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    description: "Neural Quantum Processor with 4K Upscaling, Motion Xcelerator Turbo Pro 144Hz, and Quantum HDR OLED for deep blacks and clear whites.",
    specs: [
      "65-inch 4K OLED (3840 x 2160)",
      "Refresh Rate: 120Hz (Up to 144Hz)",
      "Dolby Atmos & Object Tracking Sound Lite",
      "Gaming Hub with FreeSync Premium Pro"
    ],
    reviews: [
      { id: "r4", author: "Chris P.", rating: 5, date: "2026-06-28", comment: "Colors pop like never before. PS5 gaming at 144Hz is buttery smooth." }
    ]
  },
  {
    id: "prod-104",
    title: "Nike Men's Air Max 270 Athletic Running Shoes",
    brand: "Nike",
    category: "Fashion",
    price: 129.95,
    originalPrice: 160.00,
    rating: 4.5,
    reviewsCount: 840,
    stock: 40,
    isFlashSale: true,
    isTodayDeal: false,
    isBestSeller: true,
    claimedPercent: 82,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description: "Features Nike's biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks. Breathable mesh upper.",
    specs: [
      "Large Max Air unit delivers responsive cushioning",
      "Neoprene stretch bootie design for a snug fit",
      "Rubber outsole for durable traction"
    ],
    reviews: [
      { id: "r5", author: "Marcus B.", rating: 4, date: "2026-05-19", comment: "Extremely comfortable for daily walk and gym sessions." }
    ]
  },
  {
    id: "prod-105",
    title: "Levi's Men's 501 Original Fit Jeans",
    brand: "Levi's",
    category: "Fashion",
    price: 59.99,
    originalPrice: 79.50,
    rating: 4.4,
    reviewsCount: 2310,
    stock: 65,
    isFlashSale: false,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 50,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    description: "The blueprint for every pair of jeans in existence. Crafted with classic straight leg and iconic button fly since 1873.",
    specs: [
      "100% Cotton heavy denim",
      "Regular fit through thigh with straight leg",
      "Iconic 5-pocket styling & leather logo patch"
    ],
    reviews: [
      { id: "r6", author: "Robert T.", rating: 5, date: "2026-06-01", comment: "Timeless classic. Fits exactly as expected." }
    ]
  },
  {
    id: "prod-106",
    title: "De'Longhi Magnifica S Automatic Espresso & Cappuccino Machine",
    brand: "De'Longhi",
    category: "Home & Kitchen",
    price: 649.95,
    originalPrice: 799.95,
    rating: 4.6,
    reviewsCount: 480,
    stock: 14,
    isFlashSale: true,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 91,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    description: "Compact bean-to-cup machine with integrated burr grinder. Manual Cappuccino System for rich milk foam.",
    specs: [
      "15-bar professional pressure pump",
      "13 adjustable grinder settings for fresh beans",
      "Removable 1.8L water reservoir",
      "Easy cleaning with removable brewing unit"
    ],
    reviews: [
      { id: "r7", author: "Elena R.", rating: 5, date: "2026-07-10", comment: "Replaced my daily Starbucks trip. Makes café quality shots in seconds!" }
    ]
  },
  {
    id: "prod-107",
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6 Quart",
    brand: "Instant Pot",
    category: "Home & Kitchen",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewsCount: 4120,
    stock: 50,
    isFlashSale: false,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 68,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
    description: "7-in-1 functionality: pressure cooker, slow cooker, rice cooker, yogurt maker, steamer, sauté pan, and food warmer.",
    specs: [
      "13 customizable Smart Programs",
      "Over 10 safety features including Easy Seal Lid",
      "Dishwasher-safe stainless steel pot"
    ],
    reviews: [
      { id: "r8", author: "Patricia W.", rating: 5, date: "2026-06-22", comment: "Saves hours in the kitchen! Stews and rice turn out perfect every time." }
    ]
  },
  {
    id: "prod-108",
    title: "Atomic Habits by James Clear (Hardcover)",
    brand: "Penguin Random House",
    category: "Books",
    price: 13.79,
    originalPrice: 27.00,
    rating: 4.9,
    reviewsCount: 9800,
    stock: 120,
    isFlashSale: false,
    isTodayDeal: false,
    isBestSeller: true,
    claimedPercent: 30,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    description: "An Easy & Proven Way to Build Good Habits & Break Bad Ones. Over 15 million copies sold worldwide.",
    specs: [
      "Format: Hardcover, 320 pages",
      "Publisher: Avery (October 2018)",
      "Language: English"
    ],
    reviews: [
      { id: "r9", author: "Daniel H.", rating: 5, date: "2026-07-15", comment: "Life changing perspective on tiny incremental changes." }
    ]
  },
  {
    id: "prod-109",
    title: "Dyson Airwrap Multi-Styler Complete Long - Copper/Nickel",
    brand: "Dyson",
    category: "Beauty",
    price: 599.99,
    originalPrice: 649.99,
    rating: 4.7,
    reviewsCount: 930,
    stock: 9,
    isFlashSale: true,
    isTodayDeal: true,
    isBestSeller: false,
    claimedPercent: 88,
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    description: "Style with air, not extreme heat. Re-engineered attachments harness Coanda airflow to curl, shape, and hide flyaways.",
    specs: [
      "Dyson digital motor V9 creates 3.2kPa air pressure",
      "Intelligent heat control measures airflow temperature 40x/sec",
      "Includes 6 versatile styling attachments & storage case"
    ],
    reviews: [
      { id: "r10", author: "Sophia G.", rating: 5, date: "2026-07-04", comment: "Salons blowout results at home without frying your hair." }
    ]
  },
  {
    id: "prod-110",
    title: "Fitbit Charge 6 Fitness & Health Tracker with GPS",
    brand: "Fitbit",
    category: "Sports",
    price: 139.95,
    originalPrice: 159.95,
    rating: 4.4,
    reviewsCount: 760,
    stock: 35,
    isFlashSale: false,
    isTodayDeal: true,
    isBestSeller: false,
    claimedPercent: 40,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80",
    description: "Advanced fitness tracker with heart rate on gym equipment, 40+ exercise modes, built-in GPS, ECG app, and YouTube Music controls.",
    specs: [
      "7-day battery life | Water resistant to 50m",
      "Daily Readiness Score & Sleep Profile",
      "Includes 6-month Premium membership"
    ],
    reviews: [
      { id: "r11", author: "Tom C.", rating: 4, date: "2026-06-30", comment: "Accurate GPS tracking during long distance outdoor runs." }
    ]
  },
  {
    id: "prod-201",
    title: "Prestige Iris Plus 1600 Watts Induction Cooktop with Push Button Control",
    brand: "Prestige",
    category: "Home & Kitchen",
    price: 42.99,
    originalPrice: 59.99,
    rating: 4.4,
    reviewsCount: 2396,
    stock: 22,
    isFlashSale: true,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 70,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80",
    description: "High efficiency 1600W induction cooktop with Indian menu preset options, automatic voltage regulator, and durable micro-crystal glass plate.",
    specs: [
      "1600 Watt Power with fast heating technology",
      "Soft Touch Push Button controls with LED display",
      "Automatic shut-off & pause function for enhanced safety",
      "1-Year Manufacturer Warranty"
    ],
    reviews: [
      { id: "hk1", author: "Anish Sharma", rating: 5, date: "2026-07-12", comment: "Boils water in under 2 minutes. Easy to clean and saves gas!" }
    ]
  },
  {
    id: "prod-202",
    title: "Titan Essence Classic Silent Movement Wall Clock (12-inch, Black)",
    brand: "Titan",
    category: "Home & Kitchen",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.5,
    reviewsCount: 625,
    stock: 45,
    isFlashSale: false,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 40,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=800&q=80",
    description: "Elegant 12-inch wall clock with non-ticking silent sweep quartz movement. Perfect for living room, bedroom, and office decor.",
    specs: [
      "Silent quartz sweep movement (no ticking sound)",
      "High quality durable ABS casing with clear glass cover",
      "Requires 1 AA battery (included)"
    ],
    reviews: [
      { id: "hk2", author: "Priya V.", rating: 5, date: "2026-06-18", comment: "Looks sleek and modern on my living room wall. Completely silent!" }
    ]
  },
  {
    id: "prod-203",
    title: "Clazkit Food Strainer Colander Bowl Set for Washing Fruits & Vegetables",
    brand: "Clazkit",
    category: "Home & Kitchen",
    price: 9.99,
    originalPrice: 14.99,
    rating: 4.3,
    reviewsCount: 8097,
    stock: 80,
    isFlashSale: false,
    isTodayDeal: false,
    isBestSeller: true,
    claimedPercent: 55,
    image: "https://images.unsplash.com/photo-1590794056226-77ef3a6c4743?auto=format&fit=crop&w=800&q=80",
    description: "Multi-functional 2-in-1 kitchen colander strainer bowl. Ideal for washing pasta, rice, fruits, and draining water efficiently.",
    specs: [
      "BPA-free food grade durable plastic",
      "Dual layer 360-degree rotation design",
      "Ergonomic handle for firm grip"
    ],
    reviews: [
      { id: "hk3", author: "Meera K.", rating: 4, date: "2026-05-29", comment: "Super convenient for rinsing vegetables and berries!" }
    ]
  },
  {
    id: "prod-204",
    title: "Orient Electric 12W Inverter Rechargeable Emergency LED Bulb",
    brand: "Orient",
    category: "Home & Kitchen",
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.4,
    reviewsCount: 8228,
    stock: 60,
    isFlashSale: true,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 85,
    image: "https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&w=800&q=80",
    description: "Rechargeable LED emergency bulb with built-in lithium-ion battery. Provides up to 4 hours of continuous backup light during power outages.",
    specs: [
      "12W Bright Cool Daylight (6500K)",
      "Built-in 2200mAh rechargeable Li-ion battery",
      "Automatic switching to emergency mode during power failure"
    ],
    reviews: [
      { id: "hk4", author: "Rajesh P.", rating: 5, date: "2026-07-08", comment: "Lifesaver during power cuts. Brightness is identical to regular LED!" }
    ]
  },
  {
    id: "prod-205",
    title: "Scotch-Brite Heavy Duty Scrub Pad (Pack of 5 Pads)",
    brand: "Scotch-Brite",
    category: "Home & Kitchen",
    price: 6.99,
    originalPrice: 9.99,
    rating: 4.6,
    reviewsCount: 10565,
    stock: 150,
    isFlashSale: false,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 30,
    image: "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=800&q=80",
    description: "Heavy duty scouring pads with ALO (Aluminum Oxide) technology to cut through tough burnt food and grease without scratching cookware.",
    specs: [
      "Stain removal power for stainless steel & iron cookware",
      "Longer lasting non-wearing fiber texture",
      "Pack of 5 individual scrub pads"
    ],
    reviews: [
      { id: "hk5", author: "Sunita G.", rating: 5, date: "2026-06-25", comment: "The gold standard for cleaning pots and pans." }
    ]
  },
  {
    id: "prod-206",
    title: "Zulaxy Heavy Duty Wall Hooks for Photo Frames & Kitchen Storage (Pack of 10)",
    brand: "Zulaxy",
    category: "Home & Kitchen",
    price: 8.99,
    originalPrice: 12.99,
    rating: 4.2,
    reviewsCount: 10481,
    stock: 90,
    isFlashSale: false,
    isTodayDeal: false,
    isBestSeller: false,
    claimedPercent: 20,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    description: "Transparent self-adhesive heavy-duty wall hooks. Supports up to 10kg load for wall frames, kitchen utensils, and bath accessories.",
    specs: [
      "No drilling required – strong waterproof adhesive back",
      "Rustproof stainless steel hook structure",
      "Suitable for tile, glass, wood, and smooth walls"
    ],
    reviews: [
      { id: "hk6", author: "Karan M.", rating: 4, date: "2026-07-01", comment: "Holds heavy pans in the kitchen without falling off!" }
    ]
  },
  {
    id: "prod-207",
    title: "MILTON Thermosteel Stainless Steel Vacuum Insulated Bottle 1000ml",
    brand: "MILTON",
    category: "Home & Kitchen",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.7,
    reviewsCount: 3420,
    stock: 55,
    isFlashSale: true,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 76,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    description: "Double wall vacuum insulated thermosteel flask. Keeps beverages hot for 24 hours or cold for 24 hours.",
    specs: [
      "100% Rust-free 304 grade stainless steel inside and outside",
      "Leakproof copper-coated temperature retention liner",
      "1000ml capacity with insulated drinking cup cap"
    ],
    reviews: [
      { id: "hk7", author: "Vikram R.", rating: 5, date: "2026-07-14", comment: "Coffee stays piping hot all day at work!" }
    ]
  },
  {
    id: "prod-208",
    title: "Philips HD9200/90 Essential Air Fryer with Rapid Air Technology (4.1 Liter)",
    brand: "Philips",
    category: "Home & Kitchen",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewsCount: 1840,
    stock: 18,
    isFlashSale: true,
    isTodayDeal: true,
    isBestSeller: true,
    claimedPercent: 92,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=800&q=80",
    description: "Fry with up to 90% less fat. Rapid Air technology with starfish design swirls hot air to create delicious foods crisp on the outside and tender inside.",
    specs: [
      "Adjustable time and temperature control up to 200°C",
      "1400W power with quick clean removable dishwasher-safe basket",
      "Includes free NutriU app access with hundreds of air fryer recipes"
    ],
    reviews: [
      { id: "hk8", author: "Neha Gupta", rating: 5, date: "2026-07-20", comment: "Crispy fries and chicken without soaking in oil. Essential kitchen gear!" }
    ]
  }
];


const INITIAL_COUPONS = [
  { code: "AMAZON20", discountPercent: 20, description: "20% Off Storewide" },
  { code: "FREESHIP", discountPercent: 0, freeShipping: true, description: "Free Express Shipping" },
  { code: "PRIME10", discountPercent: 10, description: "10% Prime Member Discount" }
];

const INITIAL_USERS = [
  {
    id: "usr-admin",
    name: "System Admin",
    email: "admin@amazon.com",
    password: "admin123",
    role: "admin",
    addresses: [
      { id: "addr-1", name: "HQ Warehouse", street: "410 Terry Ave N", city: "Seattle", state: "WA", zip: "98109", country: "United States", isDefault: true }
    ]
  },
  {
    id: "usr-demo",
    name: "Customer",
    email: "customer@example.com",
    password: "password123",
    role: "customer",
    addresses: [
      { id: "addr-2", name: "Home Address", street: "123 Innovation Drive", city: "San Jose", state: "CA", zip: "95110", country: "United States", isDefault: true }
    ]
  }
];

const INITIAL_ORDERS = [
  {
    id: "ORD-982341",
    userId: "usr-demo",
    date: "2026-07-20T10:30:00Z",
    status: "Delivered",
    items: [
      { id: "prod-102", title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones", price: 348.00, quantity: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" }
    ],
    subtotal: 348.00,
    shippingFee: 0,
    tax: 27.84,
    discount: 0,
    grandTotal: 375.84,
    shippingAddress: { name: "Customer", street: "123 Innovation Drive", city: "San Jose", state: "CA", zip: "95110" },
    paymentMethod: "Credit Card ending in 4242",
    trackingTimeline: [
      { status: "Ordered", date: "July 20, 10:30 AM", done: true },
      { status: "Processing", date: "July 20, 02:15 PM", done: true },
      { status: "Shipped", date: "July 21, 09:00 AM", done: true },
      { status: "Out for Delivery", date: "July 22, 08:30 AM", done: true },
      { status: "Delivered", date: "July 22, 02:45 PM", done: true }
    ]
  }
];

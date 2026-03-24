// Product data (you can replace images with your own)
const PRODUCTS = [
  {
    id: "perf-001",
    name: "Berries Weekend",
    price: 160.00,
    tag: "Best Seller",
    image: "images/berries.jpg"
  },
  {
    id: "perf-002",
    name: "Oud-Al-Layl",
    price: 170.00,
    tag: "New",
    image: "images/Oud-Al-Layl.jpg"
  },
  {
    id: "perf-003",
    name: "Cocktail Intense",
    price: 140.00,
    tag: "New",
    image: "images/cocktail intense.jpeg"
  },
  {
    id: "perf-004",
    name: "Exchange White",
    price: 150.00,
    tag: "Limited",     
    image: "images/exchange white.png"
  },
   {
    id: "perf-005",
    name: "Vintage Radio Gift Set",
    price: 400.00,
    tag: "Best Seller",
    image: "images/vintage gs.webp"
  },
  {
    id: "perf-006",
    name: "Aventos",
    price: 170.00,
    tag: "Best Seller",
    image: "images/avent.webp"
  },
  {
    id: "cap-003",
    name: "Vintage Radio",
    price: 350.00,
    tag: "Trending",
    image: "images/vintage radio.webp"
  },
  {
    id: "cap-004",
    name: "Encrypt",
    price: 150.00,
    tag: "Limited",     
    image: "images/encrypt1.webp"
  },
   {
    id: "cap-001",
    name: "Sara",
    price: 160.00,
    tag: "New",
    image: "images/sara.webp"
  },
  {
    id: "cap-002",
    name: "Proud Of You Tobacco",
    price: 150.00,
    tag: "Best Seller",
    image: "images/tobacco.jpeg"
  },
  {
    id: "cap-003",
    name: "Lattafa Emeer",
    price: 400.00,
    tag: "Trending",
    image: "images/emeer.jpg"
  },
  {
    id: "cap-004",
    name: "Lattafa Angham",
    price: 320.00,
    tag: "Limited",     
    image: "images/angham1.png"
  },
   {
    id: "cap-001",
    name: "Classic Black Snapback",
    price: 120.00,
    tag: "New",
    image: "images/rayhaan kiss.jpg"
  },
  {
    id: "cap-004",
    name: "Street Red Flat Brim",
    price: 120.00,
    tag: "Limited",     
    image: "images/suave1.png"
  },
  {
    id: "cap-004",
    name: "Street Red Flat Brim",
    price: 120.00,
    tag: "Limited",     
    image: "images/shamoki1.jpg"
  },
   {
    id: "cap-003",
    name: "Rayhaan Corium",
    price: 270.00,
    tag: "Trending",
    image: "images/corium.webp"
  },
  {
    id: "cap-002",
    name: "Royal Blue Baseball Cap",
    price: 120.00,
    tag: "Best Seller",
    image: "images/"
  },
   {
    id: "cap-001",
    name: "Classic Black Snapback",
    price: 120.00,
    tag: "New",
    image: "images/"
  },
  {
    id: "cap-002",
    name: "Royal Blue Baseball Cap",
    price: 120.00,
    tag: "Best Seller",
    image: "images/elysia.jpg"
  },
  {
    id: "cap-003",
    name: "Minimalist White Dad Hat",
    price: 130.00,
    tag: "Trending",
    image: "images/"
  },
];

// State
let cart = [];

// Elements
const productGrid = document.getElementById("productGrid");
const cartToggle = document.getElementById("cartToggle");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartClose = document.getElementById("cartClose");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const yearEl = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Utils
const formatCurrency = (n) => `GHC${n.toFixed(2)}`;

// Render products
function renderProducts(list) {
  productGrid.innerHTML = list.map(p => `
    <article class="card">
      <div class="card__media">
        <img class="card__img" src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="card__body">
        <h4 class="card__title">${p.name}</h4>
        <div class="card__meta">
          <span class="price">${formatCurrency(p.price)}</span>
          <span class="badge">${p.tag}</span>
        </div>
        <button class="btn btn--primary" data-add="${p.id}">Add to cart</button>
      </div>
    </article>
  `).join("");
}

// Cart operations
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, qty: 1 });
  }
  updateCartUI();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    updateCartUI();
  }
}

function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function updateCartUI() {
  cartItemsEl.innerHTML = cart.length === 0
    ? `<p style="color:#8a93a3">Your cart is empty.</p>`
    : cart.map(item => `
      <div class="cart-item">
        <img class="cart-item__img" src="${item.image}" alt="${item.name}" />
        <div>
          <p class="cart-item__title">${item.name}</p>
          <p style="margin:0;color:#8a93a3">${formatCurrency(item.price)} × ${item.qty}</p>
          <div class="cart-item__controls">
            <button class="qty-btn" data-qty="${item.id}" data-delta="-1">−</button>
            <button class="qty-btn" data-qty="${item.id}" data-delta="1">+</button>
            <button class="remove-btn" data-remove="${item.id}">Remove</button>
          </div>
        </div>
        <strong>${formatCurrency(item.price * item.qty)}</strong>
      </div>
    `).join("");

  cartCountEl.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  cartTotalEl.textContent = formatCurrency(cartTotal());
}

// Drawer controls
function openCart() {
  cartDrawer.classList.add("cart--open");
  cartBackdrop.classList.add("backdrop--show");
}
function closeCart() {
  cartDrawer.classList.remove("cart--open");
  cartBackdrop.classList.remove("backdrop--show");
}

// Search & sort
function applyFilters() {
  const q = (searchInput.value || "").toLowerCase().trim();
  let list = PRODUCTS.filter(p => p.name.toLowerCase().includes(q));

  switch (sortSelect.value) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      list.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      // keep original order
      break;
  }
  renderProducts(list);
}

// Contact form validation (basic)
function validateForm() {
  let valid = true;
  const fields = ["name", "email", "message"];
  fields.forEach(id => {
    const input = document.getElementById(id);
    const errorEl = document.querySelector(`[data-error-for="${id}"]`);
    errorEl.textContent = "";
    if (!input.value.trim()) {
      errorEl.textContent = "This field is required.";
      valid = false;
    } else if (id === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())) {
      errorEl.textContent = "Enter a valid email address.";
      valid = false;
    }
  });
  return valid;
}

// Init
function init() {
  yearEl.textContent = new Date().getFullYear();
  renderProducts(PRODUCTS);
  updateCartUI();

  // Product grid click
  productGrid.addEventListener("click", (e) => {
    const addId = e.target.getAttribute("data-add");
    if (addId) {
      addToCart(addId);
      openCart();
    }
  });

  // Cart controls
  cartItemsEl.addEventListener("click", (e) => {
    const removeId = e.target.getAttribute("data-remove");
    if (removeId) removeFromCart(removeId);

    const qtyId = e.target.getAttribute("data-qty");
    const delta = parseInt(e.target.getAttribute("data-delta"), 10);
    if (qtyId && !isNaN(delta)) changeQty(qtyId, delta);
  });

  // Drawer toggles
  cartToggle.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartBackdrop.addEventListener("click", closeCart);

  // Filters
  searchInput.addEventListener("input", applyFilters);
  sortSelect.addEventListener("change", applyFilters);

  // Checkout
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  });

  // Contact form
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "";
    if (!validateForm()) return;
    // Simulate submit
    formStatus.textContent = "Thanks! Your message has been sent.";
    contactForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", init);


checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const totalAmount = cartTotal() * 100; // Paystack expects amount in pesewas

  var handler = PaystackPop.setup({
    key: 'pk_test_dd191b31799574ae2d1267c07eeb2f41021e8dda', // Replace with your public key
    email: 'gn834142@gmail.com',
    amount: totalAmount,
    currency: 'GHS',
    callback: function(response) {
      alert('Payment successful! Transaction ref: ' + response.reference);
      cart = []; // clear cart
      updateCartUI();
      closeCart();
    },
    onClose: function() {
      alert('Payment window closed.');
    }
  });
  handler.openIframe();
});

if (product.stock_quantity > 0) {
  document.getElementById("buyBtn").style.display = "block";
} else {
  document.getElementById("soldOutMsg").style.display = "block";
}


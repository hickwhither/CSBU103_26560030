import { products } from './products.js';
import { addToCart, clearCart, getItemQty, getTotalCount, getTotalPrice } from './cart.js';

const productGrid = document.getElementById('product-grid');
const filterContainer = document.getElementById('category-filters');
const searchInput = document.getElementById('search-input');
const cartTotalEl = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart-btn');
const cartBadgeEl = document.querySelector('.cart-badge');

let currentCategory = 'all';
let currentSearch = '';

const formatVND = (amount) => `${amount.toLocaleString('vi-VN')} ₫`;

// Render product cards
function renderProducts(list) {
  if (!list.length) {
    productGrid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#64748b;padding:40px 0;">No products found.</p>`;
    return;
  }

  productGrid.innerHTML = list
    .map((p) => {
      const qty = getItemQty(p.id);
      const btnText = qty > 0 ? `Add to cart (${qty} in cart)` : 'Add to cart';

      return `
        <article class="product-card">
          <div class="product-image">
            <img src="${p.image}" alt="${p.name}">
          </div>
          <div class="product-info">
            <span class="product-category">${p.category}</span>
            <h3 class="product-title">${p.name}</h3>
            <p class="product-price">${formatVND(p.price)}</p>
          </div>
          <button class="add-to-cart-btn" data-id="${p.id}">${btnText}</button>
        </article>
      `;
    })
    .join('');
}

// Update navbar badge and total bar
function updateCartUI() {
  if (cartBadgeEl) cartBadgeEl.textContent = getTotalCount();
  if (cartTotalEl) cartTotalEl.textContent = formatVND(getTotalPrice(products));
}

// Filter by category and search keyword
function filterAndRender() {
  const keyword = currentSearch.toLowerCase().trim();
  const filtered = products.filter((p) => {
    const matchCat = currentCategory === 'all' || p.category.toLowerCase() === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(keyword);
    return matchCat && matchSearch;
  });

  renderProducts(filtered);
}

// Category filter click
filterContainer.addEventListener('click', (e) => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  filterContainer.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  currentCategory = btn.dataset.category.toLowerCase();
  filterAndRender();
});

// Search input
searchInput?.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  filterAndRender();
});

// Add to cart click
productGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-to-cart-btn');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  addToCart(id);
  btn.textContent = `Add to cart (${getItemQty(id)} in cart)`;
  updateCartUI();
});

// Clear cart click
clearCartBtn?.addEventListener('click', () => {
  clearCart();
  updateCartUI();
  filterAndRender();
});

// Init
updateCartUI();
renderProducts(products);
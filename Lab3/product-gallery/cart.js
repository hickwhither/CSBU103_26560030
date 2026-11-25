const STORAGE_KEY = 'mini_shop_cart';

// Load saved cart or initialize empty object
const cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  saveCart();
}

export function clearCart() {
  Object.keys(cart).forEach((key) => delete cart[key]);
  localStorage.removeItem(STORAGE_KEY);
}

export function getItemQty(id) {
  return cart[id] || 0;
}

export function getTotalCount() {
  return Object.values(cart).reduce((sum, qty) => sum + qty, 0);
}

export function getTotalPrice(products) {
  return products.reduce((sum, item) => sum + item.price * (cart[item.id] || 0), 0);
}
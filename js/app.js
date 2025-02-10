// js/app.js
import { setupBooks } from './components/books';
import { setupCart } from './components/cart';

let state = {
	activeCategory: null,
	cart: [],
};

function handleCategoryChange(category) {
	state.activeCategory = category;
	setupBooks(category);
}

export function addToCart(book) {
	state.cart.push(book);
	updateCartUI();
	localStorage.setItem('cart', JSON.stringify(state.cart));
}

export function removeFromCart(bookId) {
	state.cart = state.cart.filter(book => book.id !== bookId);
	updateCartUI();
	localStorage.setItem('cart', JSON.stringify(state.cart));
}

function updateCartUI() {
	setupCart(state.cart);
}

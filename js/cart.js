const cart = [];

//  Добавление книги в корзину
export function addToCart(book) {
	const existingBook = cart.find(item => item.id === book.id);

	if (existingBook) {
		existingBook.quantity += 1;
	} else {
		cart.push({ ...book, quantity: 1 });
	}

	updateCartUI();
}

//  Удаление книги из корзины
export function removeFromCart(bookId) {
	const index = cart.findIndex(item => item.id === bookId);

	if (index !== -1) {
		cart.splice(index, 1);
	}

	updateCartUI();
}

//  Очистка корзины
export function clearCart() {
	cart.length = 0;
	updateCartUI();
}

//  Обновление интерфейса корзины
function updateCartUI() {
	const cartContainer = document.querySelector('.cart-container');
	cartContainer.innerHTML = '';

	cart.forEach(book => {
		const bookElement = document.createElement('div');
		bookElement.classList.add('cart-item');
		bookElement.innerHTML = `
            <p>${book.title} - ${book.quantity} шт.</p>
            <button class="remove" data-id="${book.id}">Удалить</button>
        `;
		cartContainer.appendChild(bookElement);
	});

	// Добавляем обработчики на кнопки удаления
	document.querySelectorAll('.cart-item .remove').forEach(button => {
		button.addEventListener('click', (event) => {
			const bookId = event.target.dataset.id;
			removeFromCart(bookId);
		});
	});
}

//  Инициализация корзины
export function setupCart() {
	document.querySelector('.cart').addEventListener('click', () => {
		document.querySelector('.cart-container').classList.toggle('visible');
	});
}

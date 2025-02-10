const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';

// Функция для создания карточки книги
export function createBookCard(book) {
	const { volumeInfo, saleInfo } = book;

	const title = volumeInfo.title || 'No title';
	const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown author';
	const cover = volumeInfo.imageLinks?.thumbnail || PLACEHOLDER_IMAGE;
	const description = volumeInfo.description ? truncateText(volumeInfo.description, 150) : 'No description available';
	const price = saleInfo.listPrice ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` : null;
	const rating = volumeInfo.averageRating ? generateStars(volumeInfo.averageRating, volumeInfo.ratingsCount) : '';

	const bookCard = document.createElement('div');
	bookCard.classList.add('book-card');

	bookCard.innerHTML = `
        <img src="${cover}" alt="${title}" class="book-cover">
        <h3 class="book-title">${title}</h3>
        <p class="book-author">${authors}</p>
        ${rating}
        <p class="book-description">${description}</p>
        ${price ? `<p class="book-price">${price}</p>` : ''}
        <button class="buy-btn">Buy now</button>
    `;

	const buyButton = bookCard.querySelector('.buy-btn');
	buyButton.addEventListener('click', () => toggleCart(book, buyButton));

	return bookCard;
}

// Функция обрезки текста
function truncateText(text, maxLength) {
	return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

// Генерация звёздочек рейтинга
function generateStars(rating, count) {
	const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
	return `<p class="book-rating">${stars} (${count} reviews)</p>`;
}

// Функция добавления/удаления книги в корзину
function toggleCart(book, button) {
	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	const bookIndex = cart.findIndex(item => item.id === book.id);

	if (bookIndex === -1) {
		cart.push(book);
		button.textContent = 'In Cart';
		button.classList.add('in-cart');
	} else {
		cart.splice(bookIndex, 1);
		button.textContent = 'Buy now';
		button.classList.remove('in-cart');
	}

	localStorage.setItem('cart', JSON.stringify(cart));
}
import { initSlider } from './slider.js';
import { fetchBooks, changeCategory, loadMoreBooks } from 'books';
import { AddToCart, setupCart } from './cart.js';
import { createBookCard } from './bookCard.js';

//  Функция рендеринга списка книг
function displayBooks(books) {
	const booksContainer = document.querySelector('.books-container');
	booksContainer.innerHTML = ''; // Очищаем перед загрузкой новых книг

	books.forEach(book => {
		booksContainer.innerHTML += renderBookCard(book);
	});
}

// После рендеринга добавляем обработчики на кнопки "Добавить в корзину"
document.querySelectorAll('.add-to-cart').forEach(button => {
	button.addEventListener('click', (event) => {
		const bookId = event.target.dataset.id;
		const bookTitle = event.target.dataset.title;

		addToCart({ id: bookId, title: bookTitle });
	});
});


//  Функция инициализации приложения
async function initializeApp() {
	initSlider(); // Запуск слайдера
	setupCart(); // Инициализация корзины

	//  Загружаем и рендерим книги
	const books = await fetchBooks();
	displayBooks(books);

	//  Назначаем обработчики событий
	document.querySelector('.categories').addEventListener('click', async (event) => {
		const category = event.target.dataset.category;
		if (category) {
			const newBooks = await changeCategory(category);
			displayBooks(newBooks);
		}
	});

	document.querySelector('.load-more').addEventListener('click', async () => {
		const moreBooks = await loadMoreBooks();
		displayBooks(moreBooks);
	});
}

//  Запускаем приложение
document.addEventListener('DOMContentLoaded', initializeApp);

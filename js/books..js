const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=';

let currentCategory = 'fiction'; // Категория по умолчанию
let startIndex = 0; // Индекс для пагинации
const maxResults = 6; // Количество книг за 1 запрос

// 📌 Функция загрузки книг
export async function fetchBooks(category = currentCategory) {
	try {
		const response = await fetch(`${API_URL}${category}&startIndex=${startIndex}&maxResults=${maxResults}`);
		const data = await response.json();

		if (data.items) {
			startIndex += maxResults; // Увеличиваем индекс для "Load more"
			return data.items;
		}
		return [];
	} catch (error) {
		console.error('Ошибка загрузки книг:', error);
		return [];
	}
}

// 📌 Функция смены категории
export async function changeCategory(category) {
	if (category !== currentCategory) {
		currentCategory = category;
		startIndex = 0; // Сбрасываем индекс при смене категории
	}
	return fetchBooks();
}

// 📌 Функция для загрузки дополнительных книг
export async function loadMoreBooks() {
	return fetchBooks();
}


// Загрузка книг при старте (первая категория)
fetchBooks('fiction');

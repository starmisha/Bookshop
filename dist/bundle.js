/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/bookCard.js":
/*!************************!*\
  !*** ./js/bookCard.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createBookCard: () => (/* binding */ createBookCard)\n/* harmony export */ });\nconst PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';\n\n// Функция для создания карточки книги\nfunction createBookCard(book) {\n  const {\n    volumeInfo,\n    saleInfo\n  } = book;\n  const title = volumeInfo.title || 'No title';\n  const authors = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown author';\n  const cover = volumeInfo.imageLinks?.thumbnail || PLACEHOLDER_IMAGE;\n  const description = volumeInfo.description ? truncateText(volumeInfo.description, 150) : 'No description available';\n  const price = saleInfo.listPrice ? `${saleInfo.listPrice.amount} ${saleInfo.listPrice.currencyCode}` : null;\n  const rating = volumeInfo.averageRating ? generateStars(volumeInfo.averageRating, volumeInfo.ratingsCount) : '';\n  const bookCard = document.createElement('div');\n  bookCard.classList.add('book-card');\n  bookCard.innerHTML = `\n        <img src=\"${cover}\" alt=\"${title}\" class=\"book-cover\">\n        <h3 class=\"book-title\">${title}</h3>\n        <p class=\"book-author\">${authors}</p>\n        ${rating}\n        <p class=\"book-description\">${description}</p>\n        ${price ? `<p class=\"book-price\">${price}</p>` : ''}\n        <button class=\"buy-btn\">Buy now</button>\n    `;\n  const buyButton = bookCard.querySelector('.buy-btn');\n  buyButton.addEventListener('click', () => toggleCart(book, buyButton));\n  return bookCard;\n}\n\n// Функция обрезки текста\nfunction truncateText(text, maxLength) {\n  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;\n}\n\n// Генерация звёздочек рейтинга\nfunction generateStars(rating, count) {\n  const stars = '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));\n  return `<p class=\"book-rating\">${stars} (${count} reviews)</p>`;\n}\n\n// Функция добавления/удаления книги в корзину\nfunction toggleCart(book, button) {\n  let cart = JSON.parse(localStorage.getItem('cart')) || [];\n  const bookIndex = cart.findIndex(item => item.id === book.id);\n  if (bookIndex === -1) {\n    cart.push(book);\n    button.textContent = 'In Cart';\n    button.classList.add('in-cart');\n  } else {\n    cart.splice(bookIndex, 1);\n    button.textContent = 'Buy now';\n    button.classList.remove('in-cart');\n  }\n  localStorage.setItem('cart', JSON.stringify(cart));\n}\n\n//# sourceURL=webpack://bookshop/./js/bookCard.js?");

/***/ }),

/***/ "./js/cart.js":
/*!********************!*\
  !*** ./js/cart.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart),\n/* harmony export */   clearCart: () => (/* binding */ clearCart),\n/* harmony export */   removeFromCart: () => (/* binding */ removeFromCart),\n/* harmony export */   setupCart: () => (/* binding */ setupCart)\n/* harmony export */ });\nconst cart = [];\n\n//  Добавление книги в корзину\nfunction addToCart(book) {\n  const existingBook = cart.find(item => item.id === book.id);\n  if (existingBook) {\n    existingBook.quantity += 1;\n  } else {\n    cart.push({\n      ...book,\n      quantity: 1\n    });\n  }\n  updateCartUI();\n}\n\n//  Удаление книги из корзины\nfunction removeFromCart(bookId) {\n  const index = cart.findIndex(item => item.id === bookId);\n  if (index !== -1) {\n    cart.splice(index, 1);\n  }\n  updateCartUI();\n}\n\n//  Очистка корзины\nfunction clearCart() {\n  cart.length = 0;\n  updateCartUI();\n}\n\n//  Обновление интерфейса корзины\nfunction updateCartUI() {\n  const cartContainer = document.querySelector('.cart-container');\n  cartContainer.innerHTML = '';\n  cart.forEach(book => {\n    const bookElement = document.createElement('div');\n    bookElement.classList.add('cart-item');\n    bookElement.innerHTML = `\n            <p>${book.title} - ${book.quantity} шт.</p>\n            <button class=\"remove\" data-id=\"${book.id}\">Удалить</button>\n        `;\n    cartContainer.appendChild(bookElement);\n  });\n\n  // Добавляем обработчики на кнопки удаления\n  document.querySelectorAll('.cart-item .remove').forEach(button => {\n    button.addEventListener('click', event => {\n      const bookId = event.target.dataset.id;\n      removeFromCart(bookId);\n    });\n  });\n}\n\n//  Инициализация корзины\nfunction setupCart() {\n  document.querySelector('.cart').addEventListener('click', () => {\n    document.querySelector('.cart-container').classList.toggle('visible');\n  });\n}\n\n//# sourceURL=webpack://bookshop/./js/cart.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider.js */ \"./js/slider.js\");\n/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slider_js__WEBPACK_IMPORTED_MODULE_0__);\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './books.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cart.js */ \"./js/cart.js\");\n/* harmony import */ var _bookCard_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bookCard.js */ \"./js/bookCard.js\");\n\n\n\n\n\n//  Функция рендеринга списка книг\nfunction displayBooks(books) {\n  const booksContainer = document.querySelector('.books-container');\n  booksContainer.innerHTML = ''; // Очищаем перед загрузкой новых книг\n\n  books.forEach(book => {\n    booksContainer.innerHTML += renderBookCard(book);\n  });\n}\n\n// После рендеринга добавляем обработчики на кнопки \"Добавить в корзину\"\ndocument.querySelectorAll('.add-to-cart').forEach(button => {\n  button.addEventListener('click', event => {\n    const bookId = event.target.dataset.id;\n    const bookTitle = event.target.dataset.title;\n    addToCart({\n      id: bookId,\n      title: bookTitle\n    });\n  });\n});\n\n//  Функция инициализации приложения\nasync function initializeApp() {\n  (0,_slider_js__WEBPACK_IMPORTED_MODULE_0__.initSlider)(); // Запуск слайдера\n  (0,_cart_js__WEBPACK_IMPORTED_MODULE_2__.setupCart)(); // Инициализация корзины\n\n  //  Загружаем и рендерим книги\n  const books = await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './books.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n  displayBooks(books);\n\n  //  Назначаем обработчики событий\n  document.querySelector('.categories').addEventListener('click', async event => {\n    const category = event.target.dataset.category;\n    if (category) {\n      const newBooks = await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './books.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(category);\n      displayBooks(newBooks);\n    }\n  });\n  document.querySelector('.load-more').addEventListener('click', async () => {\n    const moreBooks = await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './books.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\n    displayBooks(moreBooks);\n  });\n}\n\n//  Запускаем приложение\ndocument.addEventListener('DOMContentLoaded', initializeApp);\n\n//# sourceURL=webpack://bookshop/./js/index.js?");

/***/ }),

/***/ "./js/slider.js":
/*!**********************!*\
  !*** ./js/slider.js ***!
  \**********************/
/***/ (() => {

eval("document.addEventListener(\"DOMContentLoaded\", () => {\n  const slides = document.querySelectorAll(\".slide\");\n  const dots = document.querySelectorAll(\".dot\");\n  let currentIndex = 0;\n  const intervalTime = 5000;\n  function showSlide(index) {\n    slides.forEach((slide, i) => {\n      slide.classList.toggle(\"active\", i === index);\n      dots[i].classList.toggle(\"active\", i === index);\n    });\n  }\n  function nextSlide() {\n    currentIndex = (currentIndex + 1) % slides.length;\n    showSlide(currentIndex);\n  }\n  dots.forEach((dot, index) => {\n    dot.addEventListener(\"click\", () => {\n      currentIndex = index;\n      showSlide(currentIndex);\n    });\n  });\n  showSlide(currentIndex);\n  setInterval(nextSlide, intervalTime);\n});\n\n//# sourceURL=webpack://bookshop/./js/slider.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/index.js");
/******/ 	
/******/ })()
;
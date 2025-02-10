document.addEventListener("DOMContentLoaded", () => {
	const slides = document.querySelectorAll(".slide");
	const dots = document.querySelectorAll(".dot");
	let currentIndex = 0;
	const intervalTime = 5000;

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.toggle("active", i === index);
			dots[i].classList.toggle("active", i === index);
		});
	}

	function nextSlide() {
		currentIndex = (currentIndex + 1) % slides.length;
		showSlide(currentIndex);
	}

	dots.forEach((dot, index) => {
		dot.addEventListener("click", () => {
			currentIndex = index;
			showSlide(currentIndex);
		});
	});

	showSlide(currentIndex);
	setInterval(nextSlide, intervalTime);
});
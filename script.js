document.addEventListener('DOMContentLoaded', function() {
    const createCarousel = (carouselClass, imagesToShow) => {
        const track = document.querySelector(`.${carouselClass} .carousel-track`);
        const slides = Array.from(track.children);
        const prevButton = document.querySelector(`.${carouselClass} .carousel-button.left`);
        const nextButton = document.querySelector(`.${carouselClass} .carousel-button.right`);

        const slideWidth = slides[0].getBoundingClientRect().width;

        // Расставляем слайды по горизонтали
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });

        let currentSlide = 0;

        const moveToSlide = (track, currentSlide, targetSlide) => {
            const amountToMove = targetSlide.style.left;
            track.style.transform = 'translateX(-' + amountToMove + ')';
            currentSlide = targetSlide;
        };

        nextButton.addEventListener('click', () => {
            const currentSlideElement = slides[currentSlide];
            const nextSlide = currentSlideElement.nextElementSibling || slides[0]; // Зацикливаем
            moveToSlide(track, currentSlide, nextSlide);
            currentSlide = (currentSlide + 1) % slides.length;

            // Условие для возврата в начало после показа 3 и 4
            if (currentSlide >= slides.length - imagesToShow) {
                currentSlide = 0; // Возврат в начало
                track.style.transition = 'none'; // Убираем анимацию
                track.style.transform = 'translateX(0)'; // Перемещаем в начало
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease'; // Восстанавливаем анимацию
                }, 50);
            }
        });

        prevButton.addEventListener('click', () => {
            const currentSlideElement = slides[currentSlide];
            const prevSlide = currentSlideElement.previousElementSibling || slides[slides.length - 1]; // Зацикливаем
            moveToSlide(track, currentSlide, prevSlide);
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;

            // Условие для возврата в начало
            if (currentSlide < 0) {
                currentSlide = slides.length - imagesToShow; // Показать последние 2-3
                track.style.transition = 'none'; // Убираем анимацию
                track.style.transform = `translateX(-${(currentSlide * slideWidth)}px)`; // Перемещаем к последним
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s ease'; // Восстанавливаем анимацию
                }, 50);
            }
        });
    };

    // Инициализация каруселей
    createCarousel('carousel-awards', 1); // 2 - количество показанных изображений в карусели наград
    createCarousel('carousel-students', 1); // 2 - количество показанных изображений в карусели учеников
});

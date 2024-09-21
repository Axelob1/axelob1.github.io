document.addEventListener('DOMContentLoaded', function () {
    const createCarousel = (carouselClass, imagesToShow) => {
        const track = document.querySelector(`.${carouselClass} .carousel-track`);
        const slides = Array.from(track.children);
        const prevButton = document.querySelector(`.${carouselClass} .carousel-button.left`);
        const nextButton = document.querySelector(`.${carouselClass} .carousel-button.right`);

        const slideWidth = slides[0].getBoundingClientRect().width;

        // Клонируем первый и последний слайды для непрерывной карусели
        const firstClone = slides[0].cloneNode(true);
        const lastClone = slides[slides.length - 1].cloneNode(true);

        track.appendChild(firstClone); // Добавляем клон первого слайда в конец
        track.insertBefore(lastClone, slides[0]); // Добавляем клон последнего слайда в начало

        const allSlides = Array.from(track.children); // Теперь включаем клоны в список всех слайдов

        // Расставляем слайды по горизонтали с учётом клонов
        allSlides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });

        let currentSlide = 1; // Старт с первого слайда (не с клона)
        track.style.transform = `translateX(-${slideWidth * currentSlide}px)`; // Смещаем трек к первому реальному слайду

        const moveToSlide = (targetSlideIndex) => {
            track.style.transform = 'translateX(-' + slideWidth * targetSlideIndex + 'px)';
            currentSlide = targetSlideIndex;
        };

        nextButton.addEventListener('click', () => {
            if (currentSlide >= allSlides.length - imagesToShow) return; // Предотвращаем переход дальше клонированных слайдов

            moveToSlide(currentSlide + 1);

            // Если мы на клонированном первом слайде (в конце трека), мгновенно переносим к настоящему первому слайду
            if (currentSlide === allSlides.length - imagesToShow) {
                setTimeout(() => {
                    track.style.transition = 'none'; // Отключаем анимацию
                    moveToSlide(1); // Возвращаем к первому реальному слайду
                    setTimeout(() => track.style.transition = 'transform 0.5s ease'); // Восстанавливаем анимацию
                }, 500); // Задержка соответствует длительности анимации
            }
        });

        prevButton.addEventListener('click', () => {
            if (currentSlide <= 0) return; // Предотвращаем переход дальше клонированных слайдов

            moveToSlide(currentSlide - 1);

            // Если мы на клонированном последнем слайде (в начале трека), мгновенно переносим к настоящему последнему слайду
            if (currentSlide === 0) {
                setTimeout(() => {
                    track.style.transition = 'none'; // Отключаем анимацию
                    moveToSlide(allSlides.length - imagesToShow - 1); // Возвращаем к последнему реальному слайду
                    setTimeout(() => track.style.transition = 'transform 0.5s ease'); // Восстанавливаем анимацию
                }, 500); // Задержка соответствует длительности анимации
            }
        });
    };

    // Инициализация каруселей
    createCarousel('carousel-awards', 1); // 1 - количество показанных изображений в карусели наград
    createCarousel('carousel-students', 1); // 1 - количество показанных изображений в карусели учеников
});

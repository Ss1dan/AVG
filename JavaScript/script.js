document.addEventListener('DOMContentLoaded', function() {
    // Слайдер
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');
    let currentIndex = 0;
    const animationDuration = 500;
    let isAnimating = false;

    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'flex' : 'none';
    });

    function changeSlide(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const oldIndex = currentIndex;
        currentIndex = direction === 'next' 
            ? (currentIndex + 1) % slides.length 
            : (currentIndex - 1 + slides.length) % slides.length;

        slides[currentIndex].style.display = 'flex';
        slides[currentIndex].style.opacity = '0';
        slides[currentIndex].style.transform = direction === 'next' 
            ? 'translateX(100%)' 
            : 'translateX(-100%)';

        setTimeout(() => {
            slides[oldIndex].style.transition = `transform ${animationDuration}ms ease-in-out`;
            slides[currentIndex].style.transition = `transform ${animationDuration}ms ease-in-out, opacity ${animationDuration}ms ease-in-out`;
            
            slides[oldIndex].style.transform = direction === 'next' 
                ? 'translateX(-100%)' 
                : 'translateX(100%)';
            
            slides[currentIndex].style.opacity = '1';
            slides[currentIndex].style.transform = 'translateX(0)';

            setTimeout(() => {
                slides[oldIndex].style.display = 'none';
                slides[oldIndex].style.transition = 'none';
                slides[oldIndex].style.transform = 'translateX(0)';
                isAnimating = false;
            }, animationDuration);
        }, 10);
    }

    nextBtn.addEventListener('click', () => changeSlide('next'));
    prevBtn.addEventListener('click', () => changeSlide('prev'));

    let autoSlide = setInterval(() => changeSlide('next'), 5000);
    
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
    sliderContainer.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => changeSlide('next'), 5000);
    });
    
    // Анимации
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about, .projects, .vacancies, .contacts');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    const animatedElements = document.querySelectorAll('.about, .projects, .vacancies, .contacts');
    animatedElements.forEach(element => {
        element.style.transition = 'opacity 1s ease, transform 1s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
    });
    
    animateOnScroll();

    window.addEventListener('scroll', animateOnScroll);
});
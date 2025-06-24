document.addEventListener('DOMContentLoaded', function() {
    // Фото
    const mainImage = document.querySelector('.main-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const reviewForm = document.getElementById('review-form');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src;
            mainImage.alt = this.alt;
            
            mainImage.style.opacity = '0';
            setTimeout(() => {
                mainImage.style.opacity = '1';
            }, 100);
        });
    });
    
    // Отзывы
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('review-name');
            const textInput = document.getElementById('review-text');
            const ratingInput = document.getElementById('review-rating');
            
            const newReview = {
                author: nameInput.value.trim(),
                text: textInput.value.trim(),
                rating: parseInt(ratingInput.value),
                date: new Date().toLocaleDateString('ru-RU')
            };
            
            if (newReview.author && newReview.text && newReview.rating > 0) {
                addReview(newReview);
                saveReview(newReview);
                
                nameInput.value = '';
                textInput.value = '';
                ratingInput.value = '5';
            } else {
                alert('Пожалуйста, заполните все поля формы!');
            }
        });
    }
    
    loadReviews();
});

// Функция добавления отзыва на страницу
function addReview(review) {
    const reviewsSection = document.querySelector('.reviews-section');
    
    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';
    
    const reviewHeader = document.createElement('div');
    reviewHeader.className = 'review-header';
    
    const authorSpan = document.createElement('span');
    authorSpan.className = 'review-author';
    authorSpan.textContent = review.author;
    
    const dateSpan = document.createElement('span');
    dateSpan.className = 'review-date';
    dateSpan.textContent = review.date;
    
    reviewHeader.appendChild(authorSpan);
    reviewHeader.appendChild(dateSpan);
    
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'review-rating';
    ratingDiv.textContent = '* '.repeat(review.rating);
    
    const textP = document.createElement('p');
    textP.className = 'review-text';
    textP.textContent = review.text;
    
    reviewItem.appendChild(reviewHeader);
    reviewItem.appendChild(ratingDiv);
    reviewItem.appendChild(textP);
    
    reviewsSection.insertBefore(reviewItem, reviewsSection.firstChild);
}

// Функция сохрвнения в localStorage
function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem('gameReviews')) || [];
    reviews.push(review);
    localStorage.setItem('gameReviews', JSON.stringify(reviews));
}

// Функция загрузки из localStorage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('gameReviews')) || [];
    reviews.forEach(review => addReview(review));
}
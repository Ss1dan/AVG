const searchInput = document.getElementById('search-input');
const sortButtons = document.querySelectorAll('.sort-btn');
const portfolioItemsContainer = document.getElementById('portfolio-items');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Функция поиска
searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();

    portfolioItems.forEach(item => {
        const itemName = item.dataset.name.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.style.display = 'block';
            const link = item.closest('a');
            if(link) {
                link.style.display = 'block';
            }
        } else {
            item.style.display = 'none';
            const link = item.closest('a');
            if(link) {
                link.style.display = 'none';
            }
        }
    });
});

// Функция сортировки
sortButtons.forEach(button => {
    button.addEventListener('click', function() {
        const sortBy = this.dataset.sort;
        sortProjects(sortBy);
    });
});

function sortProjects(sortBy) {
    const itemsArray = Array.from(portfolioItems);

    itemsArray.sort((a, b) => {
        if (sortBy === 'date-desc') {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        } else if (sortBy === 'date-asc') {
            return new Date(a.dataset.date) - new Date(b.dataset.date);
        } else if (sortBy === 'name-asc') {
            return a.dataset.name.localeCompare(b.dataset.name);
        }
    });

    portfolioItemsContainer.innerHTML = '';

    itemsArray.forEach(item => {
        const link = item.closest('a');
        if (link) {
            portfolioItemsContainer.appendChild(link);
        } else {
            portfolioItemsContainer.appendChild(item);
        }
    });
}
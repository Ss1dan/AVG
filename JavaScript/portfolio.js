class Portfolio {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentPage = 1;
        this.itemsPerPage = 6;
        
        this.searchInput = document.getElementById('search-input');
        this.sortButtons = document.querySelectorAll('.sort-btn');
        this.portfolioContainer = document.getElementById('portfolio-items');
        this.prevPageButton = document.getElementById('prev-page');
        this.nextPageButton = document.getElementById('next-page');
        this.pageInfo = document.getElementById('page-info');
        
        this.initProjects();
        this.setupEventListeners();
        this.render();
    }
    
    initProjects() {
        this.projects = [
            {
                name: "Прятки с барсиком",
                date: "2025-11-15",
                category: "Платформер",
                image: "imgs/coding_cat.png",
                description: "Платформер с уникальной механикой пряток.",
                url:"project.html"
            },
            {
                name: "Лабиринт Смерти x_x",
                date: "2025-08-22",
                category: "Головоломка",
                image: "imgs/labirint_smerti.jpg",
                description: "Лабиринт головоломка с элементами квеста.",
                url:"project.html"
            },
            {
                name: "Висилица",
                date: "2025-01-10",
                category: "Головоломка",
                image: "imgs/visilica.jpg",
                description: "Головоломка с элементами мультиплеера.",
                url:"project.html"
            },
            {
                name: "КубиМейз",
                date: "2022-05-26",
                category: "Головоломка",
                image: "imgs/cubemaze.jpg",
                description: "Головоломка с элементами лабиринта.",
                url:"project.html"
            },
            {
                name: "Нинзя Стас",
                date: "2023-03-15",
                category: "Инди",
                image: "imgs/ninja-stas.jpg",
                description: "2D платформер с элементами файтинга.",
                url:"project.html"
            },
            {
                name: "ПК клуб",
                date: "2024-07-03",
                category: "Симулятор",
                image: "imgs/pc-club.jpg",
                description: "Симулятор владельца ПК клуба.",
                url:"project.html"
            },
            {
                name: "Нубик толкач",
                date: "2024-07-28",
                category: "Симулятор",
                image: "imgs/roking-noobick.jpg",
                description: "Симулятор переноса вещей.",
                url:"project.html"
            },
            {
                name: "Страшно хоррор",
                date: "2022-10-10",
                category: "Хоррор",
                image: "imgs/strashno-horror.jpg",
                description: "Хоррор с элементами головоломки.",
                url:"project.html"
            },
            {
                name: "Светлая женщина",
                date: "2021-06-22",
                category: "Файтинг",
                image: "imgs/light-women.jpg",
                description: "2D файтинг соулс проект.",
                url:"project.html"
            }
        ];
        
        this.filteredProjects = [...this.projects];
    }
    
    setupEventListeners() {

        this.searchInput.addEventListener('input', () => {
            this.filterProjects();
            this.currentPage = 1;
            this.render();
        });
        
        this.sortButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.sortProjects(button.dataset.sort);
                this.currentPage = 1;
                this.render();
            });
        });
        
        this.prevPageButton.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.render();
            }
        });
        
        this.nextPageButton.addEventListener('click', () => {
            if (this.currentPage < this.totalPages()) {
                this.currentPage++;
                this.render();
            }
        });
    }
    
    filterProjects() {
        const searchTerm = this.searchInput.value.toLowerCase();
        
        if (searchTerm === '') {
            this.filteredProjects = [...this.projects];
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.name.toLowerCase().includes(searchTerm) || 
                project.description.toLowerCase().includes(searchTerm)
            );
        }
    }
    
    sortProjects(sortBy) {
        this.filteredProjects.sort((a, b) => {
            if (sortBy === 'date-desc') {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === 'date-asc') {
                return new Date(a.date) - new Date(b.date);
            } else if (sortBy === 'name-asc') {
                return a.name.localeCompare(b.name);
            }
            return 0;
        });
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    }
    
    getCurrentPageProjects() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredProjects.slice(startIndex, startIndex + this.itemsPerPage);
    }
    
    totalPages() {
        return Math.ceil(this.filteredProjects.length / this.itemsPerPage);
    }
    
    updatePagination() {
        const totalPages = this.totalPages();
        
        this.prevPageButton.disabled = this.currentPage === 1;
        this.nextPageButton.disabled = this.currentPage === totalPages || totalPages === 0;
        
        this.pageInfo.textContent = `${this.currentPage} из ${totalPages}`;
    }
    
    // Рендер проектов
renderProjects() {
    this.portfolioContainer.innerHTML = '';
    
    const projectsToRender = this.getCurrentPageProjects();
    
    projectsToRender.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-item';
        projectElement.dataset.name = project.name;
        projectElement.dataset.date = project.date;
        projectElement.dataset.category = project.category;
        
        const projectLink = document.createElement('a');
        projectLink.href = project.url;
        projectLink.style.textDecoration = 'none';
        projectLink.style.color = 'inherit';
        
        projectElement.innerHTML = `
            <img src="${project.image}" width="350px" height="200px" alt="${project.name}">
            <div class="portfolio-item-content">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="portfolio-meta">
                    <span class="category">${project.category}</span>
                    <span class="date">${this.formatDate(project.date)}</span>
                </div>
            </div>
        `;
        
        projectLink.appendChild(projectElement);
        this.portfolioContainer.appendChild(projectLink);
    });
}
    
    render() {
        this.renderProjects();
        this.updatePagination();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
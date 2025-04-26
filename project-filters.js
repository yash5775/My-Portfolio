// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create filter container and buttons
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;
    
    // Collect all unique tags from project cards
    const tags = new Set(['All']);
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add data-tags attribute to each project card based on its tech stack
    projectCards.forEach(card => {
        const techSpans = card.querySelectorAll('.tech-stack span');
        const cardTags = [];
        
        techSpans.forEach(span => {
            const tag = span.textContent.trim();
            cardTags.push(tag);
            tags.add(tag);
        });
        
        card.setAttribute('data-tags', cardTags.join(','));
    });
    
    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    
    // Add filter buttons
    tags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-btn' + (tag === 'All' ? ' active' : '');
        button.setAttribute('data-filter', tag === 'All' ? 'all' : tag);
        // Change "All" to "All Projects" to match the design
        button.textContent = tag === 'All' ? 'All Projects' : tag;
        filterContainer.appendChild(button);
    });
    
    // Insert filter container before project grid
    projectGrid.parentNode.insertBefore(filterContainer, projectGrid);
    
    // Add filtering functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    const cardTags = card.getAttribute('data-tags').split(',');
                    if (cardTags.includes(filterValue)) {
                        card.style.display = '';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Add styles for filter components
    const style = document.createElement('style');
    style.textContent = `
        .filter-container {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            margin: 2rem 0;
            justify-content: center;
        }
        
        .filter-btn {
            padding: 0.8rem 1.5rem;
            background: rgba(26, 75, 75, 0.08);
            color: var(--primary-color);
            border: 1px solid transparent;
            border-radius: 30px;
            font-family: inherit;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .filter-btn:hover, .filter-btn.active {
            background: var(--primary-color);
            color: white;
            transform: translateY(-3px);
        }
        
        .project-card {
            transition: all 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .filter-container {
                gap: 0.5rem;
            }
            
            .filter-btn {
                padding: 0.6rem 1rem;
                font-size: 0.9rem;
            }
        }
    `;
    document.head.appendChild(style);
}); 
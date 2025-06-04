document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const skillItems = document.querySelectorAll('.skill-item');
    const graphPlaceholder = document.querySelector('.graph-placeholder');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // simple tooltip functionality
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = item.dataset.tooltip;
            document.body.appendChild(tooltip);
            const rect = item.getBoundingClientRect();
            const tipRect = tooltip.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tipRect.width / 2}px`;
            tooltip.style.top = `${rect.top - tipRect.height - 8 + window.scrollY}px`;
            item._tooltip = tooltip;
        });
        item.addEventListener('mouseleave', () => {
            if (item._tooltip) {
                item._tooltip.remove();
                item._tooltip = null;
            }
        });
    });

    // generate placeholder squares for GitHub graph
    if (graphPlaceholder) {
        for (let i = 0; i < 120; i++) {
            graphPlaceholder.appendChild(document.createElement('div'));
        }
    }

    // project filtering
    const projectCards = document.querySelectorAll('.project-card');
    const typeButtons = document.querySelectorAll('[data-type-filter]');
    const techButtons = document.querySelectorAll('[data-tech-filter]');
    let activeType = 'all';
    let activeTech = 'all';

    function filterProjects() {
        projectCards.forEach(card => {
            const category = card.dataset.category;
            const tags = card.dataset.tags.split(' ');
            const typeMatch =
                activeType === 'all' ||
                (activeType === 'ai' && tags.includes('ai')) ||
                category === activeType;
            const techMatch =
                activeTech === 'all' ||
                tags.includes(activeTech);
            card.style.display = typeMatch && techMatch ? '' : 'none';
        });
    }

    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeType = btn.dataset.typeFilter;
            typeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects();
        });
    });

    techButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            activeTech = btn.dataset.techFilter;
            techButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects();
        });
    });
});

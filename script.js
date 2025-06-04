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
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

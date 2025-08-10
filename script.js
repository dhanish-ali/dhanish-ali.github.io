document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // --- Theme Toggler ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleButton.querySelector('i');

    const setTheme = (theme) => {
        body.dataset.theme = theme;
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', theme);
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeToggleButton.addEventListener('click', () => {
        const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });

    // --- Pop-in on Scroll Animation ---
    const popInElements = document.querySelectorAll('.pop-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    popInElements.forEach(el => {
        observer.observe(el);
    });

});


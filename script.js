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

    // Function to set theme
    const setTheme = (theme) => {
        body.dataset.theme = theme;
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', theme);
    };

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    // Toggle theme on button click
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = body.dataset.theme;
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
    
    // --- Hero Mouse Effect ---
    const heroEffect = document.querySelector('.hero-tech-effect');
    if (heroEffect) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            heroEffect.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,188,212,0.1) 0%, rgba(0,188,212,0) 70%)`;
        });
    }

    // --- Snake Game ---
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const finalScoreEl = document.getElementById('finalScore');
    const restartButton = document.getElementById('restartButton');

    const gridSize = 20;
    let snake, food, score, direction, gameInterval;

    function initGame() {
        snake = [{ x: 10, y: 10 }];
        food = {};
        score = 0;
        direction = { x: 0, y: 0 };
        gameOverScreen.classList.add('hidden');
        placeFood();
        if(gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(gameLoop, 100); // Game speed
    }

    function gameLoop() {
        update();
        draw();
    }

    function update() {
        // Move snake
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
            score++;
            placeFood();
        } else {
            snake.pop();
        }

        // Check for collision with walls or self
        if (
            head.x < 0 || head.x >= canvas.width / gridSize ||
            head.y < 0 || head.y >= canvas.height / gridSize ||
            checkSelfCollision(head)
        ) {
            gameOver();
        }
    }

    function checkSelfCollision(head) {
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function draw() {
        // Clear canvas
        ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('background-color');
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        ctx.fillStyle = '#00bcd4'; // Accent color
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });

        // Draw food
        ctx.fillStyle = '#ff4081'; // A contrasting color for food
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }

    function placeFood() {
        food.x = Math.floor(Math.random() * (canvas.width / gridSize));
        food.y = Math.floor(Math.random() * (canvas.height / gridSize));
    }

    function gameOver() {
        clearInterval(gameInterval);
        finalScoreEl.textContent = score;
        gameOverScreen.classList.remove('hidden');
    }
    
    // Event Listeners
    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    });

    restartButton.addEventListener('click', initGame);

    // Initial game start
    initGame();
});


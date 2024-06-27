// JavaScript remains unchanged from the previous version
let stopwatch = 0;
let timer;
let startTime = 0;
let running = false;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');

function startTimer() {
    if (!running) {
        running = true;
        startTime = Date.now() - stopwatch;
        timer = setInterval(updateDisplay, 10);
    }
}

function stopTimer() {
    if (running) {
        running = false;
        clearInterval(timer);
        stopwatch = Date.now() - startTime;
    }
}

function resetTimer() {
    running = false;
    clearInterval(timer);
    stopwatch = 0;
    display.textContent = '00:00:00';
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((elapsedTime / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor((elapsedTime % 1000) / 10).toString().padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// Animated background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.classList.add('background');
document.body.appendChild(canvas);

const colors = ['#4CAF50', '#F44336', '#2196F3', '#FF9800', '#9C27B0'];
const particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 3 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) {
            this.vx = -this.vx;
        }
        if (this.y < 0 || this.y > canvas.height) {
            this.vy = -this.vy;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(drawBackground);
}

for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

drawBackground();

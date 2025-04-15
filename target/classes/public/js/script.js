// Simulated user database
const users = {
    approved: [
        { username: 'admin1', password: 'admin123', type: 'admin' },
        { username: 'driver1', password: 'drive123', type: 'bus-driver' },
        { username: 'student2', password: 'pass456', type: 'student-teacher' }
    ],
    pending: [
        { username: 'student1', password: 'pass123', type: 'student-teacher' },
        { username: 'teacher1', password: 'teach123', type: 'student-teacher' }
    ]
};

// Image Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots-container');

// Initialize slider dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(index));
    dotsContainer.appendChild(dot);
});

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.dot')[currentSlide].classList.remove('active');

    currentSlide = (n + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.dot')[currentSlide].classList.add('active');
}

function changeSlide(n) {
    showSlide(currentSlide + n);
}

// Auto-advance slides every 5 seconds
setInterval(() => changeSlide(1), 5000);

// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.menu-toggle').classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelector('.menu-toggle').classList.remove('active');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Form Handling
document.addEventListener('DOMContentLoaded', () => {
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userType = document.getElementById('user-type').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const approvedUser = users.approved.find(u =>
                u.username === username && u.password === password && u.type === userType
            );
            const pendingUser = users.pending.find(u =>
                u.username === username && u.password === password && u.type === userType
            );

            if (approvedUser) {
                alert(`Welcome ${username}! Redirecting to dashboard...`);
                window.location.href = `${userType}/dashboard.html`;
            } else if (pendingUser) {
                alert('Your account is pending admin approval. Please wait.');
            } else {
                alert('Invalid credentials or account not found.');
            }
        });
    }

    // Signup Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const userType = document.getElementById('user-type').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            const existingUser = [...users.approved, ...users.pending].find(u => u.username === username);
            if (existingUser) {
                alert('Username already exists!');
                return;
            }

            const newUser = { username, password, type: userType };
            if (userType === 'student-teacher') {
                users.pending.push(newUser);
                alert('Account created! Awaiting admin approval.');
            } else {
                users.approved.push(newUser);
                alert('Account created! You can now log in.');
            }

            signupForm.reset();
            window.location.href = 'login.html';
        });
    }
});
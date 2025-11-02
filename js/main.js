// Main JavaScript for Cyberpunk Portfolio

// Loading Screen Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');

        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            mainContent.style.opacity = '0';

            setTimeout(() => {
                mainContent.style.transition = 'opacity 1s ease';
                mainContent.style.opacity = '1';
            }, 50);
        }, 500);
    }, 2000); // Show loading screen for 2 seconds
});

// Typing Effect for Hero Subtitle
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = [
    'Full-Stack Developer',
    'Open Source Contributor',
    'Tech Enthusiast',
    'Problem Solver',
    'Code Artist'
];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Start typing effect after loading screen
setTimeout(() => {
    if (typedTextSpan) {
        type();
    }
}, 2500);

// Floating Particles Background
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = Math.random() * 100 + '%';

        // Random animation duration (10-30 seconds)
        const duration = 10 + Math.random() * 20;
        particle.style.animationDuration = duration + 's';

        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';

        // Random drift
        const drift = (Math.random() - 0.5) * 100;
        particle.style.setProperty('--drift', drift + 'px');

        // Random color (cyan, pink, or purple)
        const colors = ['#00f3ff', '#ff006e', '#b803ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 5px ${color}`;

        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Interactive Hover Effects for Cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.project-card, .gallery-card, .contact-card, .stat-item');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const cyberGrid = document.querySelector('.cyber-grid');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }

    if (cyberGrid) {
        cyberGrid.style.transform = `perspective(500px) rotateX(60deg) translateY(${scrolled * 0.1}px)`;
    }
});

// Add Active State to Navigation Links
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Glitch Effect on Hover for Gallery Items
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-card');

    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const title = this.querySelector('h4');
            if (title) {
                title.style.animation = 'glitch 0.5s ease';
            }
        });

        item.addEventListener('mouseleave', function() {
            const title = this.querySelector('h4');
            if (title) {
                title.style.animation = '';
            }
        });
    });
});

// Random Glitch Effect on Title
setInterval(() => {
    const navLogo = document.querySelector('.glitch-small');
    if (navLogo && Math.random() > 0.95) {
        navLogo.style.animation = 'glitch 0.3s ease';
        setTimeout(() => {
            navLogo.style.animation = '';
        }, 300);
    }
}, 1000);

// Cursor Trail Effect (Optional - Cyberpunk aesthetic)
let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    // Create trail dot
    const dot = document.createElement('div');
    dot.style.position = 'fixed';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.width = '4px';
    dot.style.height = '4px';
    dot.style.background = '#00f3ff';
    dot.style.borderRadius = '50%';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '9999';
    dot.style.boxShadow = '0 0 10px #00f3ff';
    dot.style.transition = 'opacity 0.5s ease';

    document.body.appendChild(dot);
    cursorTrail.push(dot);

    if (cursorTrail.length > trailLength) {
        const oldDot = cursorTrail.shift();
        oldDot.style.opacity = '0';
        setTimeout(() => oldDot.remove(), 500);
    }
});

console.log('%c🌃 WELCOME TO THE CYBERPUNK REALM 🌃', 'color: #00f3ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00f3ff;');
console.log('%cVesper Portfolio v1.0', 'color: #ff006e; font-size: 14px;');

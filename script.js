// Dark/Light mode toggle functionality
const themeToggleBtn = document.getElementById('themeToggleBtn');
const toggleIcon = document.querySelector('.toggle-icon');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    if (toggleIcon) {
        toggleIcon.classList.remove('fa-moon');
        toggleIcon.classList.add('fa-sun');
    }
}

// Toggle theme function
function toggleTheme() {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-moon');
            toggleIcon.classList.add('fa-sun');
        }
    } else {
        localStorage.setItem('theme', 'light');
        if (toggleIcon) {
            toggleIcon.classList.remove('fa-sun');
            toggleIcon.classList.add('fa-moon');
        }
    }
}

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileMenuBtn) {
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});

// Active navigation on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Side scroll container with mouse drag functionality
function initDragScroll(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let isDown = false;
    let startX;
    let scrollLeft;
    
    container.addEventListener('mousedown', (e) => {
        isDown = true;
        container.style.cursor = 'grabbing';
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('mouseleave', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
        isDown = false;
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
    
    // Touch support for mobile
    container.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
    
    container.addEventListener('touchend', () => {
        isDown = false;
    });
    
    container.style.cursor = 'grab';
}

// Initialize scroll container
initDragScroll('allProjectsContainer');

// Custom cursor (only on desktop devices with fine pointer)
if (window.matchMedia("(pointer: fine)").matches) {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        const interactiveElements = document.querySelectorAll('a, button, .btn-primary, .btn-outline, .project-card-small, .social-links a, .nav-link, .skill-items span, .scroll-container');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1.8)';
                follower.style.opacity = '0.8';
                if (cursor) cursor.style.opacity = '0';
            });
            
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'translate(-50%, -50%) scale(1)';
                follower.style.opacity = '0.5';
                if (cursor) cursor.style.opacity = '1';
            });
        });
    }
}

// Header scroll effect
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (header) {
        if (currentScroll > 50) {
            header.style.padding = '12px 32px';
            header.style.boxShadow = 'var(--shadow-sm)';
        } else {
            header.style.padding = '16px 32px';
            header.style.boxShadow = 'none';
        }
        
        if (window.innerWidth <= 768) {
            if (currentScroll > 50) {
                header.style.padding = '12px 20px';
            } else {
                header.style.padding = '12px 20px';
            }
        }
    }
});


const heroSection = document.querySelector('.hero');
const spotlight = document.getElementById('heroSpotlight');

if (heroSection && spotlight) {
    // Update spotlight position on mouse move
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        spotlight.style.left = mouseX + 'px';
        spotlight.style.top = mouseY + 'px';
    });
    
    // Smooth enter effect
    heroSection.addEventListener('mouseenter', () => {
        spotlight.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Smooth exit effect
    heroSection.addEventListener('mouseleave', () => {
        spotlight.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => {
            spotlight.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
    });
}

// Console greeting
console.log('%c✨ April Mae | Portfolio ✨', 'color: #ff6b9d; font-size: 16px; font-weight: bold;');
console.log('%cCursor spotlight glow activated! Move your mouse over the hero section.', 'color: #ff8fb3; font-size: 12px;');
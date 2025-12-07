// ===========================
// MOBILE MENU TOGGLE
// ===========================

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav__link');

// Toggle menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Change icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Initial check
window.addEventListener('DOMContentLoaded', revealOnScroll);

// Check on scroll
window.addEventListener('scroll', revealOnScroll);

// ===========================
// HEADER BACKGROUND ON SCROLL
// ===========================

const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(26, 26, 26, 1)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================

const sections = document.querySelectorAll('section[id]');

function activeNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activeNavLink);

// ===========================
// WHATSAPP BUTTON TRACKING
// ===========================

const whatsappButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');

whatsappButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log('WhatsApp button clicked');
        // Aqui você pode adicionar código de tracking (Google Analytics, Facebook Pixel, etc.)
    });
});

// ===========================
// FORM VALIDATION (Se adicionar formulário)
// ===========================

function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
        
        // Phone validation
        if (input.type === 'tel' && input.value.trim()) {
            const phoneRegex = /^[\d\s\-\(\)]+$/;
            if (!phoneRegex.test(input.value) || input.value.length < 10) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });
    
    return isValid;
}

// ===========================
// LAZY LOADING IMAGES
// ===========================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ===========================
// COUNTER ANIMATION (Para métricas/estatísticas)
// ===========================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Exemplo de uso:
// const counters = document.querySelectorAll('.counter');
// counters.forEach(counter => {
//     const target = parseInt(counter.dataset.target);
//     animateCounter(counter, target);
// });

// ===========================
// PERFORMANCE: DEBOUNCE SCROLL
// ===========================

function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce nas funções de scroll
const debouncedReveal = debounce(revealOnScroll, 10);
const debouncedActiveNav = debounce(activeNavLink, 10);

window.addEventListener('scroll', debouncedReveal);
window.addEventListener('scroll', debouncedActiveNav);

// ===========================
// LOADING SCREEN (Opcional)
// ===========================

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// ===========================
// SCROLL TO TOP BUTTON (Opcional)
// ===========================

const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    color: var(--secondary-color);
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 998;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// CONSOLE MESSAGE
// ===========================

console.log('%c🚗 VendCAR Landing Page', 'color: #D4AF37; font-size: 20px; font-weight: bold;');
console.log('%cDesenvolvido com ❤️ para conversão', 'color: #666; font-size: 12px;');

// ===========================
// TRACKING & ANALYTICS READY
// ===========================

// Google Analytics Event Tracking Example
function trackEvent(category, action, label) {
    // Se você usar Google Analytics, descomente a linha abaixo:
    // gtag('event', action, { 'event_category': category, 'event_label': label });
    
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Exemplo de uso:
// trackEvent('Button', 'Click', 'WhatsApp CTA');

// ===========================
// ACCESSIBILITY IMPROVEMENTS
// ===========================

// Trap focus in mobile menu
navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.focus();
    }
});

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#inicio';
skipLink.textContent = 'Pular para o conteúdo';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: var(--secondary-color);
    padding: 8px;
    text-decoration: none;
    z-index: 9999;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.insertBefore(skipLink, document.body.firstChild);
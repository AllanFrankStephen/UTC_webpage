// =====================================================
// UNIQUE TECHNOLOGIES & CONSULTANCY
// Animation & Interactive Elements Script
// =====================================================

// Initialize WOW.js for scroll animations
document.addEventListener('DOMContentLoaded', function () {
    // Initialize WOW.js
    if (typeof WOW !== 'undefined') {
        new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: true,
            live: true
        }).init();
    }

    // Floating WhatsApp Button
    createWhatsAppButton();

    // Scroll to Top Button
    createScrollToTopButton();

    // Smooth Scroll for Anchor Links
    initSmoothScroll();

    // Counter Up Animation (if counter elements exist)
    initCounters();

    // Lazy Load Images
    initLazyLoad();
});

// ============ FLOATING WHATSAPP BUTTON ============
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/919876543210'; // Replace with actual number
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = `
        <svg viewBox="0 0 32 32" width="32" height="32">
            <path fill="currentColor" d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.203 1.393 1.401-5.233-0.321-0.53c-1.362-2.247-2.083-4.847-2.083-7.533 0-7.72 6.28-14 14-14s14 6.28 14 14-6.28 14-14 14zM21.803 18.14c-0.397-0.197-2.343-1.157-2.707-1.29-0.363-0.13-0.627-0.197-0.893 0.197s-1.027 1.29-1.257 1.557-0.463 0.293-0.86 0.097c-0.397-0.197-1.673-0.617-3.187-1.963-1.177-1.050-1.970-2.347-2.203-2.743s-0.023-0.607 0.173-0.803c0.177-0.174 0.397-0.457 0.593-0.684 0.197-0.23 0.26-0.393 0.397-0.66 0.133-0.264 0.067-0.497-0.033-0.694s-0.893-2.15-1.223-2.944c-0.32-0.773-0.647-0.667-0.893-0.68-0.23-0.013-0.497-0.013-0.763-0.013s-0.697 0.097-1.060 0.493c-0.363 0.397-1.387 1.357-1.387 3.307s1.42 3.833 1.617 4.1c0.197 0.264 2.78 4.243 6.733 5.953 0.94 0.407 1.677 0.65 2.25 0.833 0.95 0.3 1.813 0.257 2.497 0.157 0.76-0.113 2.343-0.957 2.673-1.88 0.333-0.927 0.333-1.72 0.233-1.88s-0.363-0.267-0.76-0.463z"/>
        </svg>
    `;
    document.body.appendChild(whatsappBtn);
}

// ============ SCROLL TO TOP BUTTON ============
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============ COUNTER UP ANIMATION ============
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Animation speed

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counter.innerText = '0';
        counterObserver.observe(counter);
    });
}

// ============ LAZY LOAD IMAGES ============
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ============ NAVBAR SCROLL EFFECT ============
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

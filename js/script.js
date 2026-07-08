/**
 * Complete Website - Nghệ Thuật Diễn Xuất Tương Việt Nam
 * Scroll animations, navigation, and interactive features
 */

document.addEventListener('DOMContentLoaded', function () {
    // ========================================
    // Intersection Observer - Fade In on Scroll
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and footer
    const sections = document.querySelectorAll('.section, .footer');
    sections.forEach(function (section) {
        observer.observe(section);
    });

    // ========================================
    // Smooth Scroll Navigation
    // ========================================
    const navItems = document.querySelectorAll('.nav-item');
    const navItemsArray = Array.from(navItems);

    navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all items
            navItemsArray.forEach(function (nav) {
                nav.classList.remove('nav-item-active');
            });

            // Add active class to clicked item
            this.classList.add('nav-item-active');

            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // Update Active Nav Item on Scroll
    // ========================================
    const sections_array = Array.from(document.querySelectorAll('.section, .hero, .footer'));
    const sectionIds = ['hero', 'section-1', 'section-2', 'section-3', 'section-4', 'section-5', 'section-6', 'footer'];

    window.addEventListener('scroll', function () {
        let current = '';

        sectionIds.forEach(function (sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = sectionId;
                }
            }
        });

        // Update nav items
        navItemsArray.forEach(function (item) {
            item.classList.remove('nav-item-active');
            const href = item.getAttribute('href');
            if (href === '#' + current) {
                item.classList.add('nav-item-active');
            }
        });
    });

    // ========================================
    // Scroll to Top Button
    // ========================================
    const scrollTopBtn = document.querySelector('.scroll-top');

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Show/hide scroll button
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.pointerEvents = 'auto';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.pointerEvents = 'none';
            }
        });

        // Initial state
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.pointerEvents = 'none';
        scrollTopBtn.style.transition = 'opacity 300ms ease-in-out';
    }

    // ========================================
    // Button Click Interactions
    // ========================================
    const buttons = document.querySelectorAll(
        '.emotion-btn, .ideal-btn, .option-tag, .technique-item, .character-card'
    );

    buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(function () {
                button.style.transform = '';
            }, 100);
        });

        // Keyboard support
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');

        button.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ========================================
    // Card Hover Effects
    // ========================================
    const cards = document.querySelectorAll(
        '.character-card, .emotion-type, .technique-item, .integration-item'
    );

    cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            this.style.willChange = 'transform';
        });

        card.addEventListener('mouseleave', function () {
            this.style.willChange = 'auto';
        });
    });

    // ========================================
    // Image Loading Optimization
    // ========================================
    const images = document.querySelectorAll('img');

    images.forEach(function (img) {
        img.addEventListener('error', function () {
            console.warn('Image failed to load:', this.src);
            this.style.opacity = '0.5';
        });

        // Preload images
        if (!img.complete) {
            img.addEventListener('load', function () {
                // Image loaded successfully
            });
        }
    });

    // ========================================
    // Accessibility Enhancements
    // ========================================
    const focusableElements = document.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
    );

    // Focus visible style (already in CSS, but can enhance here if needed)
    focusableElements.forEach(function (element) {
        element.addEventListener('focus', function () {
            this.classList.add('focus-visible');
        });

        element.addEventListener('blur', function () {
            this.classList.remove('focus-visible');
        });
    });

    // ========================================
    // Parallax Effect (Optional Enhancement)
    // ========================================
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrollPosition = window.pageYOffset;
            const heroHeight = heroSection.clientHeight;

            if (scrollPosition < heroHeight) {
                const parallaxOffset = scrollPosition * 0.5;
                heroSection.style.backgroundPosition = '0% ' + parallaxOffset + 'px';
            }
        });
    }

    // ========================================
    // Performance: Debounce Scroll Handler
    // ========================================
    let ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                // Scroll-based logic already handled above
                ticking = false;
            });
            ticking = true;
        }
    });

    // ========================================
    // Contact Form Validation (if added in future)
    // ========================================
    const contactLinks = document.querySelectorAll('.contact-info a');

    contactLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            // Allow default behavior for mailto links
        });
    });

    console.log('Website initialized successfully');
});

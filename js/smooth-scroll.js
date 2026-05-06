// Minotti-style Luxury Scrolling Experience with Lenis + GSAP

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    lerp: 0.15, // Slower, heavier, more luxurious feel (increased from 0.08)
    wheelMultiplier: 0.8, // Reduce scroll responsiveness
    smoothWheel: true,
    smoothTouch: false,
    duration: 1.5, // Increase scroll duration
});

// Connect Lenis to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ==================== Image Parallax with Zoom Reveal ====================
gsap.utils.toArray('img[data-parallax]').forEach((image) => {
    // Initial zoom-out reveal
    gsap.fromTo(image,
        {
            scale: 1.08,
            opacity: 0.85,
        },
        {
            scale: 1,
            opacity: 1,
            duration: 2, // Slower reveal (increased from 1.5)
            ease: 'power2.out',
            scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: 'center center',
            },
        }
    );

    // Parallax effect - image moves slower than page scroll
    ScrollTrigger.create({
        trigger: image,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
            gsap.to(image, {
                y: self.getVelocity() * -0.15,
                duration: 0.7,
                overwrite: 'auto',
            });
        },
    });
});

// ==================== Text Fade + Slide Up Animations ====================
gsap.utils.toArray('[data-fade-in]').forEach((element) => {
    gsap.fromTo(element,
        {
            opacity: 0,
            y: 40,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.3, // Slower (increased from 1)
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 50%',
            },
        }
    );
});

// ==================== Staggered Element Reveals ====================
gsap.utils.toArray('[data-stagger-group]').forEach((group) => {
    const children = group.querySelectorAll('[data-stagger-item]');

    gsap.fromTo(children,
        {
            opacity: 0,
            y: 50,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1, // Slower reveal
            stagger: 0.2, // Increased delay between items
            ease: 'power2.out',
            scrollTrigger: {
                trigger: group,
                start: 'top 75%',
            },
        }
    );
});

// ==================== Heading Animations ====================
gsap.utils.toArray('h1, h2, h3').forEach((heading) => {
    if (!heading.closest('[data-no-animate]')) {
        gsap.fromTo(heading,
            {
                opacity: 0,
                y: 60,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.4, // Slower (increased from 1.2)
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                },
            }
        );
    }
});

// ==================== Image Container Animations ====================
gsap.utils.toArray('[data-image-reveal]').forEach((container) => {
    const img = container.querySelector('img');

    if (img) {
        gsap.fromTo(img,
            {
                scale: 1.12,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 1.8, // Slower (increased from 1.5)
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 70%',
                },
            }
        );
    }
});

// ==================== Button Hover Effects ====================
gsap.utils.toArray('a[href], button').forEach((button) => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.03, // Subtle scale
            duration: 0.4, // Slower hover
            ease: 'power2.out',
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
        });
    });
});

console.log('✨ Ultra-smooth Minotti-style luxury scrolling initialized');

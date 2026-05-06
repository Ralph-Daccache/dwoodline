// Ultra-Smooth Luxury Scrolling - Minotti Style
// No snap behavior - pure flowing elegance

const lenis = new Lenis({
    lerp: 0.25, // Much higher = ultra smooth, flowing (like silk)
    wheelMultiplier: 0.6, // Very reduced responsiveness
    smoothWheel: true,
    smoothTouch: false,
    duration: 1.8, // Increased duration
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
});

// Connect to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ==================== Image Parallax ====================
gsap.utils.toArray('img[data-parallax]').forEach((image) => {
    gsap.fromTo(image,
        {
            scale: 1.08,
            opacity: 0.85,
        },
        {
            scale: 1,
            opacity: 1,
            duration: 2.2,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: image,
                start: 'top bottom',
                end: 'center center',
            },
        }
    );

    ScrollTrigger.create({
        trigger: image,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
            gsap.to(image, {
                y: self.getVelocity() * -0.12,
                duration: 1,
                ease: 'power1.inOut',
                overwrite: 'auto',
            });
        },
    });
});

// ==================== Text Fade + Slide Up ====================
gsap.utils.toArray('[data-fade-in]').forEach((element) => {
    gsap.fromTo(element,
        {
            opacity: 0,
            y: 40,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.6,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 50%',
            },
        }
    );
});

// ==================== Staggered Reveals ====================
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
            duration: 1.2,
            stagger: 0.25,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: group,
                start: 'top 75%',
            },
        }
    );
});

// ==================== Headings ====================
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
                duration: 1.6,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                },
            }
        );
    }
});

// ==================== Image Reveals ====================
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
                duration: 2,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 70%',
                },
            }
        );
    }
});

// ==================== Button Hover ====================
gsap.utils.toArray('a[href], button').forEach((button) => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.02,
            duration: 0.5,
            ease: 'power1.inOut',
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.5,
            ease: 'power1.inOut',
        });
    });
});

console.log('✨ Pure flowing luxury scrolling initialized - like silk');

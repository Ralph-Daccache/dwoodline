// Ultra-Calm Luxury Scrolling - Maximum Smoothness

const lenis = new Lenis({
    lerp: 0.35, // Maximum smoothness - very slow, deliberate
    wheelMultiplier: 0.4, // Extremely reduced - barely responsive
    smoothWheel: true,
    smoothTouch: false,
    duration: 2.2, // Very leisurely
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
            scale: 1.05,
            opacity: 0.9,
        },
        {
            scale: 1,
            opacity: 1,
            duration: 2.8,
            ease: 'sine.inOut',
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
                y: self.getVelocity() * -0.08,
                duration: 1.2,
                ease: 'sine.inOut',
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
            y: 20,
        },
        {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'sine.inOut',
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
            y: 25,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.3,
            ease: 'sine.inOut',
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
                y: 30,
            },
            {
                opacity: 1,
                y: 0,
                duration: 2.2,
                ease: 'sine.inOut',
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
                scale: 1.08,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 2.6,
                ease: 'sine.inOut',
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
            scale: 1.01,
            duration: 0.6,
            ease: 'sine.inOut',
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.6,
            ease: 'sine.inOut',
        });
    });
});

console.log('✨ Calm, serene luxury scrolling - pure elegance');

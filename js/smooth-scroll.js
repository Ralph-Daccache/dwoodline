// Smooth Snap Scrolling - Calm Section Transitions

const lenis = new Lenis({
    lerp: 0.32, // Smooth momentum for snap transitions
    wheelMultiplier: 0.5, // Controlled snap speed
    smoothWheel: true,
    smoothTouch: false,
    duration: 2, // Smooth snap duration
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
            duration: 2.4,
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
                y: self.getVelocity() * -0.1,
                duration: 1,
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
            duration: 1.8,
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
            duration: 1.3,
            stagger: 0.2,
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
                y: 25,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1.8,
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
                duration: 2.2,
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
            scale: 1.02,
            duration: 0.5,
            ease: 'sine.inOut',
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.5,
            ease: 'sine.inOut',
        });
    });
});

console.log('✨ Smooth snap scrolling - calm section transitions');

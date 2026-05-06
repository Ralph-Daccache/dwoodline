// Rolls-Royce Style Luxury Scrolling - Snap Sections with Elegant Reveals

const lenis = new Lenis({
    lerp: 0.38, // Very slow, heavy scroll momentum
    wheelMultiplier: 0.45, // Controlled, subtle responsiveness
    smoothWheel: true,
    smoothTouch: false,
    duration: 2.5, // Very leisurely snap transitions
});

// Connect to ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ==================== Image Parallax - Elegant Movement ====================
gsap.utils.toArray('img[data-parallax]').forEach((image) => {
    // Very slow fade-in with subtle zoom
    gsap.fromTo(image,
        {
            scale: 1.06,
            opacity: 0.8,
        },
        {
            scale: 1,
            opacity: 1,
            duration: 3.5, // Very slow fade
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: image,
                start: 'top 85%',
                end: 'center 30%',
                scrub: 0.5, // Tied to scroll
            },
        }
    );

    // Elegant parallax effect
    ScrollTrigger.create({
        trigger: image,
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
            gsap.to(image, {
                y: self.getVelocity() * -0.15,
                duration: 1.2,
                ease: 'sine.inOut',
                overwrite: 'auto',
            });
        },
    });
});

// ==================== Text Fade + Slide - Elegant Reveal ====================
gsap.utils.toArray('[data-fade-in]').forEach((element) => {
    gsap.fromTo(element,
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
                trigger: element,
                start: 'top 80%',
                end: 'top 45%',
                scrub: 0.3,
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
            y: 35,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1.8,
            stagger: 0.25,
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: group,
                start: 'top 75%',
            },
        }
    );
});

// ==================== Headings - Fade + Slide ====================
gsap.utils.toArray('h1, h2, h3').forEach((heading) => {
    if (!heading.closest('[data-no-animate]')) {
        gsap.fromTo(heading,
            {
                opacity: 0,
                y: 40,
            },
            {
                opacity: 1,
                y: 0,
                duration: 2.4,
                ease: 'sine.inOut',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    end: 'top 55%',
                    scrub: 0.3,
                },
            }
        );
    }
});

// ==================== Image Reveals - Very Slow Fade ====================
gsap.utils.toArray('[data-image-reveal]').forEach((container) => {
    const img = container.querySelector('img');

    if (img) {
        gsap.fromTo(img,
            {
                scale: 1.1,
                opacity: 0,
            },
            {
                scale: 1,
                opacity: 1,
                duration: 3.8, // Very slow image fade
                ease: 'sine.inOut',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 80%',
                    end: 'center 20%',
                    scrub: 0.5,
                },
            }
        );
    }
});

// ==================== Button Hover - Subtle Elegance ====================
gsap.utils.toArray('a[href], button').forEach((button) => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.015,
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

console.log('✨ Rolls-Royce luxury scrolling: snap sections, elegant reveals');

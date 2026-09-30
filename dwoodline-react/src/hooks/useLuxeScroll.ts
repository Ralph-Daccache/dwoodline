import { useEffect } from 'react';
import type { RefObject } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'sine.inOut';

/**
 * Lenis smooth scrolling + GSAP/ScrollTrigger reveals — a faithful React port of
 * the project's `js/smooth-scroll.js` (which runs on the root `index.html` but was
 * dead on the static Heritage/Inquiry pages because the libraries were never loaded).
 *
 * Reveals are scoped to `scopeRef` and torn down via `gsap.context().revert()` on
 * unmount / route change; Lenis is created and destroyed with the page. Honors
 * `prefers-reduced-motion` by skipping all motion (content stays at its natural,
 * fully-visible state).
 *
 * Opt-in hooks in the markup: `data-parallax` (image fade + velocity parallax),
 * `data-fade-in` (text slide-up), `data-stagger-group` + `data-stagger-item`,
 * `data-image-reveal` (slow image reveal). All `h1/h2/h3` inside the scope reveal
 * automatically unless wrapped in `[data-no-animate]`.
 */
export function useLuxeScroll(scopeRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      lerp: 0.38,
      wheelMultiplier: 0.45,
      smoothWheel: true,
      duration: 2.5,
    });

    const onLenisScroll = (): void => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);

    const raf = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const hoverCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Image fade-in + velocity parallax
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.06, opacity: 0.8 },
          {
            scale: 1,
            opacity: 1,
            ease: EASE,
            scrollTrigger: { trigger: image, start: 'top 85%', end: 'center 30%', scrub: 0.5 },
          },
        );
        ScrollTrigger.create({
          trigger: image,
          start: 'top center',
          end: 'bottom center',
          onUpdate: (self) => {
            gsap.to(image, {
              y: self.getVelocity() * -0.15,
              duration: 1.2,
              ease: EASE,
              overwrite: 'auto',
            });
          },
        });
      });

      // Text fade + slide-up
      gsap.utils.toArray<HTMLElement>('[data-fade-in]').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 45%', scrub: 0.3 },
          },
        );
      });

      // Staggered group reveals
      gsap.utils.toArray<HTMLElement>('[data-stagger-group]').forEach((group) => {
        const children = group.querySelectorAll('[data-stagger-item]');
        gsap.fromTo(
          children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.25,
            ease: EASE,
            scrollTrigger: { trigger: group, start: 'top 75%' },
          },
        );
      });

      // Heading reveals
      gsap.utils.toArray<HTMLElement>('h1, h2, h3').forEach((heading) => {
        if (heading.closest('[data-no-animate]')) return;
        gsap.fromTo(
          heading,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: EASE,
            scrollTrigger: { trigger: heading, start: 'top 85%', end: 'top 55%', scrub: 0.3 },
          },
        );
      });

      // Slow image reveals
      gsap.utils.toArray<HTMLElement>('[data-image-reveal]').forEach((container) => {
        const img = container.querySelector('img');
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 1.1, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            ease: EASE,
            scrollTrigger: { trigger: container, start: 'top 80%', end: 'center 20%', scrub: 0.5 },
          },
        );
      });

      // Button / link hover lift
      scope.querySelectorAll<HTMLElement>('a[href], button').forEach((btn) => {
        const enter = (): void => {
          gsap.to(btn, { scale: 1.015, duration: 0.6, ease: EASE });
        };
        const leave = (): void => {
          gsap.to(btn, { scale: 1, duration: 0.6, ease: EASE });
        };
        btn.addEventListener('mouseenter', enter);
        btn.addEventListener('mouseleave', leave);
        hoverCleanups.push(() => {
          btn.removeEventListener('mouseenter', enter);
          btn.removeEventListener('mouseleave', leave);
        });
      });
    }, scope);

    return () => {
      hoverCleanups.forEach((fn) => fn());
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
    };
  }, [scopeRef]);
}

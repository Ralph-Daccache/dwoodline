import { useEffect } from 'react';
import type { RefObject } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ENTER_EASE = 'expo.out';

/**
 * Lenis smooth scrolling + GSAP/ScrollTrigger reveals for the editorial pages
 * (Home, Heritage, Inquiry).
 *
 * Motion feel: natural Lenis smoothing (default lerp, full wheel travel) — not the
 * heavy/sluggish original. Reveals are **one-shot on enter** (play once when the
 * element scrolls in) rather than scrubbed to the scrollbar, which reads as
 * intentional instead of laggy. Parallax is a gentle scroll-linked translate, not
 * velocity-based (no jitter).
 *
 * Scoped to `scopeRef`, torn down via `gsap.context().revert()` + `lenis.destroy()`
 * on unmount / route change. Honors `prefers-reduced-motion` (skips all motion).
 *
 * Opt-in markup hooks: `data-parallax` (image reveal + parallax), `data-fade-in`
 * (text slide-up), `data-stagger-group` + `data-stagger-item`, `data-image-reveal`
 * (slow image reveal). All `h1/h2/h3` in scope reveal unless inside `[data-no-animate]`.
 */
export function useLuxeScroll(scopeRef: RefObject<HTMLElement>): void {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    const onLenisScroll = (): void => ScrollTrigger.update();
    lenis.on('scroll', onLenisScroll);
    const raf = (time: number): void => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const hoverCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // Image reveal (one-shot) + gentle scroll-linked parallax
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((image) => {
        gsap.from(image, {
          scale: 1.08,
          opacity: 0,
          duration: 1.2,
          ease: ENTER_EASE,
          scrollTrigger: { trigger: image, start: 'top 85%', toggleActions: 'play none none none' },
        });
        gsap.to(image, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      // Text fade + slide-up (one-shot)
      gsap.utils.toArray<HTMLElement>('[data-fade-in]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: ENTER_EASE,
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
        });
      });

      // Staggered group reveals (one-shot)
      gsap.utils.toArray<HTMLElement>('[data-stagger-group]').forEach((group) => {
        gsap.from(group.querySelectorAll('[data-stagger-item]'), {
          opacity: 0,
          y: 32,
          duration: 0.8,
          stagger: 0.12,
          ease: ENTER_EASE,
          scrollTrigger: { trigger: group, start: 'top 78%', toggleActions: 'play none none none' },
        });
      });

      // Heading reveals (one-shot)
      gsap.utils.toArray<HTMLElement>('h1, h2, h3').forEach((heading) => {
        if (heading.closest('[data-no-animate]')) return;
        gsap.from(heading, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: ENTER_EASE,
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Slow image reveals (one-shot)
      gsap.utils.toArray<HTMLElement>('[data-image-reveal]').forEach((container) => {
        const img = container.querySelector('img');
        if (!img) return;
        gsap.from(img, {
          scale: 1.12,
          opacity: 0,
          duration: 1.3,
          ease: ENTER_EASE,
          scrollTrigger: {
            trigger: container,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      });

      // Button / link hover lift
      scope.querySelectorAll<HTMLElement>('a[href], button').forEach((btn) => {
        const enter = (): void => {
          gsap.to(btn, { scale: 1.015, duration: 0.4, ease: 'power2.out' });
        };
        const leave = (): void => {
          gsap.to(btn, { scale: 1, duration: 0.4, ease: 'power2.out' });
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

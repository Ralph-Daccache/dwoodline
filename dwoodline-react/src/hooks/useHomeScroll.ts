import { useEffect } from 'react';

/**
 * Home (01-hero) scroll behavior:
 *  - IntersectionObserver adds `.visible` to each `.snap-target` (one-way
 *    reveal; CSS handles the staggered child fade-in).
 *  - The hero's progress dots track the current section on scroll.
 *
 * Ported from the inline script in 01-hero.html.
 */
export function useHomeScroll(): void {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('.snap-target');
    const dots = document.querySelectorAll<HTMLElement>('.progress-dot');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const updateProgressDots = (): void => {
      let currentSection = 0;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < bottom) currentSection = index;
      });
      dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSection));
    };

    let scrollTimeout: number | undefined;
    const onScroll = (): void => {
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(updateProgressDots, 10);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgressDots();

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.clearTimeout(scrollTimeout);
    };
  }, []);
}

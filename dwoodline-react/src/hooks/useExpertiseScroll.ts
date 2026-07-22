import { useEffect } from 'react';

/**
 * Expertise (03) scroll behavior — a near-verbatim port of the page's inline
 * script, wrapped in a single effect with full listener/observer cleanup:
 *  - IntersectionObserver reveals sections + their `.reveal` children and drives
 *    the side progress dots.
 *  - Progress-dot clicks smooth-scroll to their target section.
 *  - A lightweight parallax translates the chapter-2 background on scroll.
 *  - Desktop-only wheel/touch/keyboard navigation snaps between the four
 *    sections, reveals the four chapter-1 detail circles one scroll at a time,
 *    and treats the footer as a virtual final section.
 */
const ANIMATION_MS = 900;
const WHEEL_COOLDOWN_MS = 150;
const TOUCH_THRESHOLD = 50;

export function useExpertiseScroll(): void {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.snap-section'));
    const dots = Array.from(document.querySelectorAll<HTMLElement>('.progress-dot'));

    // ---- Reveal + progress dots ----
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('visible');
          entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
          const targetId = entry.target.id;
          dots.forEach((dot) => dot.classList.toggle('active', dot.dataset.target === targetId));
        });
      },
      { threshold: 0.35, root: null },
    );
    sections.forEach((section) => observer.observe(section));

    // ---- Progress dot clicks ----
    const dotCleanups = dots.map((dot) => {
      const handler = (): void => {
        const id = dot.dataset.target;
        const target = id ? document.getElementById(id) : null;
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      };
      dot.addEventListener('click', handler);
      return () => dot.removeEventListener('click', handler);
    });

    // ---- Parallax on chapter-2 background ----
    const onParallax = (): void => {
      document.querySelectorAll<HTMLElement>('.parallax-bg').forEach((img) => {
        const parent = img.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top < vh && rect.bottom > 0) {
          const offset = (rect.top / vh) * 50;
          img.style.transform = `translateY(${offset}px) scale(1.1)`;
        }
      });
    };
    window.addEventListener('scroll', onParallax, { passive: true });

    // ---- Chapter-1 circle reveal state ----
    let ch1Step = 0;
    let atFooter = false;
    const getCircles = () => document.querySelectorAll<HTMLElement>('.detail-circle');
    const revealCircle = (i: number): void => {
      const circles = getCircles();
      circles[i]?.classList.add('revealed');
    };
    const resetCircles = (): void => {
      ch1Step = 0;
      getCircles().forEach((c) => c.classList.remove('revealed'));
    };

    // ---- Desktop-only wheel / touch / keyboard navigation ----
    let cleanupNav = (): void => {};
    if (window.innerWidth >= 768) {
      const footer = document.querySelector<HTMLElement>('footer');
      let isAnimating = false;
      let lastWheelTime = 0;
      let touchStartY = 0;
      let touchStartX = 0;

      const getCurrentSectionIndex = (): number => {
        const viewportCenter = window.scrollY + window.innerHeight / 2;
        let closest = 0;
        let minDist = Infinity;
        sections.forEach((s, i) => {
          const rect = s.getBoundingClientRect();
          const center = window.scrollY + rect.top + rect.height / 2;
          const d = Math.abs(viewportCenter - center);
          if (d < minDist) {
            minDist = d;
            closest = i;
          }
        });
        return closest;
      };

      const snapTo = (index: number): void => {
        if (index < 0 || index >= sections.length) return;
        isAnimating = true;
        sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.setTimeout(() => {
          isAnimating = false;
        }, ANIMATION_MS);
      };

      const goToFooter = (): void => {
        atFooter = true;
        footer?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        isAnimating = true;
        window.setTimeout(() => {
          isAnimating = false;
        }, ANIMATION_MS);
      };

      const handleWheel = (e: WheelEvent): void => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
        if (isAnimating) {
          e.preventDefault();
          return;
        }
        const now = Date.now();
        if (now - lastWheelTime < WHEEL_COOLDOWN_MS) {
          e.preventDefault();
          return;
        }
        lastWheelTime = now;
        const dir = e.deltaY > 0 ? 1 : -1;
        const cur = getCurrentSectionIndex();
        if (atFooter && dir === -1) {
          e.preventDefault();
          atFooter = false;
          snapTo(sections.length - 1);
          return;
        }
        if (cur === sections.length - 1 && dir === 1 && !atFooter) {
          e.preventDefault();
          goToFooter();
          return;
        }
        if (cur === 0 && dir === 1 && ch1Step < 4) {
          e.preventDefault();
          revealCircle(ch1Step++);
          isAnimating = true;
          window.setTimeout(() => {
            isAnimating = false;
          }, ANIMATION_MS);
          return;
        }
        if (cur === 1 && dir === -1) resetCircles();
        const next = cur + dir;
        if (next >= 0 && next < sections.length) {
          e.preventDefault();
          snapTo(next);
        }
      };

      const handleTouchStart = (e: TouchEvent): void => {
        if (e.touches.length > 0) {
          touchStartY = e.touches[0].clientY;
          touchStartX = e.touches[0].clientX;
        }
      };

      const handleTouchMove = (e: TouchEvent): void => {
        if (e.touches.length === 0) return;
        const dy = touchStartY - e.touches[0].clientY;
        const dx = touchStartX - e.touches[0].clientX;
        if (Math.abs(dx) > Math.abs(dy)) return;
        e.preventDefault();
        if (isAnimating || Math.abs(dy) < TOUCH_THRESHOLD) return;
        const dir = dy > 0 ? 1 : -1;
        const cur = getCurrentSectionIndex();
        const resetTouchOrigin = (): void => {
          touchStartY = e.touches[0].clientY;
          touchStartX = e.touches[0].clientX;
        };
        if (atFooter && dir === -1) {
          atFooter = false;
          snapTo(sections.length - 1);
          resetTouchOrigin();
          return;
        }
        if (cur === sections.length - 1 && dir === 1 && !atFooter) {
          goToFooter();
          resetTouchOrigin();
          return;
        }
        if (cur === 0 && dir === 1 && ch1Step < 4) {
          revealCircle(ch1Step++);
          isAnimating = true;
          window.setTimeout(() => {
            isAnimating = false;
          }, ANIMATION_MS);
          resetTouchOrigin();
          return;
        }
        if (cur === 1 && dir === -1) resetCircles();
        const next = cur + dir;
        if (next >= 0 && next < sections.length) {
          resetTouchOrigin();
          snapTo(next);
        }
      };

      const handleKey = (e: KeyboardEvent): void => {
        if (isAnimating) return;
        const cur = getCurrentSectionIndex();
        const isDown = e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ';
        const isUp = e.key === 'ArrowUp' || e.key === 'PageUp';
        if (atFooter && isUp) {
          e.preventDefault();
          atFooter = false;
          snapTo(sections.length - 1);
          return;
        }
        if (cur === sections.length - 1 && isDown && !atFooter) {
          e.preventDefault();
          goToFooter();
          return;
        }
        if (cur === 0 && isDown && ch1Step < 4) {
          e.preventDefault();
          revealCircle(ch1Step++);
          isAnimating = true;
          window.setTimeout(() => {
            isAnimating = false;
          }, ANIMATION_MS);
          return;
        }
        if (cur === 1 && isUp) resetCircles();
        let next: number | null = null;
        if (isDown) next = cur + 1;
        else if (isUp) next = cur - 1;
        else if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = sections.length - 1;
        if (next !== null && next >= 0 && next < sections.length) {
          e.preventDefault();
          snapTo(next);
        }
      };

      window.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('touchstart', handleTouchStart, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('keydown', handleKey);

      cleanupNav = () => {
        window.removeEventListener('wheel', handleWheel);
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('keydown', handleKey);
      };
    }

    return () => {
      observer.disconnect();
      dotCleanups.forEach((fn) => fn());
      window.removeEventListener('scroll', onParallax);
      cleanupNav();
    };
  }, []);
}

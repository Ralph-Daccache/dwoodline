import { useEffect } from 'react';

/**
 * Portfolio (04) desktop-only vertical section navigation — the simple
 * "d.kitchen" wheel/touch/keyboard snap over `section.snap-target`. Ported
 * verbatim from the page's inline script, with listener cleanup on unmount.
 */
const ANIMATION_MS = 900;
const WHEEL_COOLDOWN_MS = 150;
const TOUCH_THRESHOLD = 50;

export function useSectionScroll(): void {
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('section.snap-target, footer.snap-target'),
    );
    if (sections.length === 0) return;

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
      const next = getCurrentSectionIndex() + dir;
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
      const next = getCurrentSectionIndex() + dir;
      if (next >= 0 && next < sections.length) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        snapTo(next);
      }
    };

    const handleKey = (e: KeyboardEvent): void => {
      if (isAnimating) return;
      const cur = getCurrentSectionIndex();
      let next: number | null = null;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') next = cur + 1;
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') next = cur - 1;
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

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);
}

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Horizontal project carousel behavior (04-portfolio): prev/next, dot jumps,
 * pointer drag with velocity-biased snap, and scroll-driven active-dot sync.
 * Ported from the per-carousel logic in the page's inline script.
 */
export interface CarouselApi {
  sliderRef: React.RefObject<HTMLDivElement>;
  activeIndex: number;
  goPrev: () => void;
  goNext: () => void;
  goTo: (index: number) => void;
}

export function useCarousel(slideCount: number): CarouselApi {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToSlide = useCallback(
    (index: number) => {
      const slider = sliderRef.current;
      if (!slider) return;
      const clamped = Math.min(Math.max(0, index), slideCount - 1);
      slider.scrollTo({ left: clamped * slider.clientWidth, behavior: 'smooth' });
    },
    [slideCount],
  );

  const currentIndex = useCallback((): number => {
    const slider = sliderRef.current;
    return slider ? Math.round(slider.scrollLeft / slider.clientWidth) : 0;
  }, []);

  const goPrev = useCallback(
    () => scrollToSlide(currentIndex() - 1),
    [scrollToSlide, currentIndex],
  );
  const goNext = useCallback(
    () => scrollToSlide(currentIndex() + 1),
    [scrollToSlide, currentIndex],
  );
  const goTo = useCallback((index: number) => scrollToSlide(index), [scrollToSlide]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let lastX = 0;

    const onScroll = (): void => {
      setActiveIndex(Math.round(slider.scrollLeft / slider.clientWidth));
    };

    const onMouseDown = (e: MouseEvent): void => {
      isDown = true;
      slider.style.cursor = 'grabbing';
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      lastX = e.pageX;
      slider.style.scrollSnapType = 'none';
      slider.style.scrollBehavior = 'auto';
    };

    const endDrag = (): void => {
      if (!isDown) return;
      isDown = false;
      slider.style.cursor = 'grab';
      const slideWidth = slider.clientWidth;
      const currentScroll = slider.scrollLeft;
      let targetIndex = Math.round(currentScroll / slideWidth);
      if (Math.abs(velocity) > 5) {
        targetIndex =
          velocity > 0
            ? Math.floor(currentScroll / slideWidth)
            : Math.ceil(currentScroll / slideWidth);
      }
      slider.style.scrollSnapType = 'x mandatory';
      slider.style.scrollBehavior = 'smooth';
      scrollToSlide(targetIndex);
    };

    const onMouseMove = (e: MouseEvent): void => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
      velocity = e.pageX - lastX;
      lastX = e.pageX;
    };

    const onResize = (): void => {
      scrollToSlide(Math.round(slider.scrollLeft / slider.clientWidth));
    };

    slider.addEventListener('scroll', onScroll);
    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', endDrag);
    slider.addEventListener('mouseup', endDrag);
    slider.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    return () => {
      slider.removeEventListener('scroll', onScroll);
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', endDrag);
      slider.removeEventListener('mouseup', endDrag);
      slider.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, [scrollToSlide]);

  return { sliderRef, activeIndex, goPrev, goNext, goTo };
}

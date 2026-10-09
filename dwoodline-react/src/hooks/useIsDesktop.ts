import { useEffect, useState } from 'react';

/**
 * Tracks whether the viewport is at or above the desktop breakpoint (768px by
 * default), updating on resize/rotate. Used to gate the desktop wheel-hijack
 * section-snap vs native mobile scrolling, so the decision re-evaluates when the
 * viewport crosses the breakpoint instead of being read once at mount.
 */
export function useIsDesktop(query = '(min-width: 768px)'): boolean {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : true,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (): void => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return isDesktop;
}

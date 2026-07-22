import { useEffect } from 'react';

/**
 * Applies a page-specific scroll-snap mode to the <html> element for the
 * lifetime of the page, then removes it. The matching CSS (and its mobile
 * media-query overrides) lives in global.css.
 */
export type SnapMode = 'mandatory' | 'proximity' | 'portfolio' | 'none';

const SNAP_CLASS: Record<Exclude<SnapMode, 'none'>, string> = {
  mandatory: 'snap-mandatory',
  proximity: 'snap-proximity',
  portfolio: 'snap-portfolio',
};

export function useHtmlScrollSnap(mode: SnapMode): void {
  useEffect(() => {
    if (mode === 'none') return;
    const className = SNAP_CLASS[mode];
    const html = document.documentElement;
    html.classList.add(className);
    return () => html.classList.remove(className);
  }, [mode]);
}

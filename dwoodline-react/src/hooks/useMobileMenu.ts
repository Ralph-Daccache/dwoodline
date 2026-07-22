import { useCallback, useState } from 'react';

/**
 * Mobile menu open/close state. Replaces the per-page IIFE that toggled the
 * overlay's translateY. In the SPA the overlay closes on navigation as well.
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false);
  const openMenu = useCallback(() => setOpen(true), []);
  const closeMenu = useCallback(() => setOpen(false), []);
  return { open, openMenu, closeMenu };
}

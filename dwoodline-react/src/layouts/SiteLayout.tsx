import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { ROUTES } from '@/config/routes';
import { Nav } from './Nav';
import { MobileMenu } from './MobileMenu';
import { Footer } from './Footer';

/** Maps a route path to the `data-page` key that scopes per-page CSS. */
const PAGE_KEY: Record<string, string> = {
  [ROUTES.home]: 'home',
  [ROUTES.heritage]: 'heritage',
  [ROUTES.expertise]: 'expertise',
  [ROUTES.portfolio]: 'portfolio',
  [ROUTES.inquiry]: 'inquiry',
};

/**
 * Shared shell: fixed nav, mobile overlay, routed page, footer.
 * Also owns cross-cutting per-route side effects: the body `data-page`
 * attribute (scopes per-page CSS), closing the mobile menu on navigation, and
 * resetting scroll to the top on navigation (matching the original multi-page
 * behavior where each page loaded at the top).
 */
export function SiteLayout() {
  const { open, openMenu, closeMenu } = useMobileMenu();
  const { pathname } = useLocation();

  useEffect(() => {
    const key = PAGE_KEY[pathname] ?? 'home';
    document.body.setAttribute('data-page', key);
    return () => document.body.removeAttribute('data-page');
  }, [pathname]);

  useEffect(() => {
    closeMenu();
    window.scrollTo(0, 0);
  }, [pathname, closeMenu]);

  return (
    <>
      <Nav onOpenMenu={openMenu} />
      <MobileMenu open={open} onClose={closeMenu} />
      <Outlet />
      <Footer />
    </>
  );
}

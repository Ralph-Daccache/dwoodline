/**
 * Canonical route paths and navigation model for the site.
 * Legacy files (01-hero.html … 05-inquiry.html) map to these paths.
 */

export const ROUTES = {
  home: '/',
  heritage: '/heritage',
  expertise: '/expertise',
  portfolio: '/portfolio',
  inquiry: '/inquiry',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface NavItem {
  /** Label shown in the top navigation. */
  label: string;
  path: RoutePath;
}

/** Primary top-nav items, in order. Labels match the original design. */
export const PRIMARY_NAV: readonly NavItem[] = [
  { label: 'Home', path: ROUTES.home },
  { label: 'About', path: ROUTES.heritage },
  { label: 'Services', path: ROUTES.expertise },
  { label: 'Projects', path: ROUTES.portfolio },
  { label: 'Contact', path: ROUTES.inquiry },
] as const;

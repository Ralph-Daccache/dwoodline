/**
 * Static site content that the original markup repeated on every page:
 * brand strings, social links, and the footer link columns.
 */
import { ROUTES, type RoutePath } from './routes';

export interface ExternalLink {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  /** Internal route path, or an external URL. */
  to: RoutePath | string;
  external?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export const SITE = {
  brand: 'dwoodline',
  taglineLines: ['Architectural Woodwork', 'Since 1955'],
  copyright: '© 1955 dwoodline. Architectural Precision. All rights reserved.',
  location: 'Lebanon',
  social: {
    instagram: 'https://instagram.com/dwoodline_sal/',
    whatsapp: 'https://wa.me/96179034563',
  },
} as const;

/** Footer link columns — labels/paths copied verbatim from the original footer. */
export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: 'Studio',
    links: [
      { label: 'Home', to: ROUTES.home },
      { label: 'Heritage', to: ROUTES.heritage },
      { label: 'Services', to: ROUTES.expertise },
      { label: 'Portfolio', to: ROUTES.portfolio },
      { label: 'Inquiry', to: ROUTES.inquiry },
    ],
  },
  {
    heading: 'Work',
    links: [
      { label: 'All Projects', to: ROUTES.portfolio },
      { label: 'Residential', to: ROUTES.portfolio },
      { label: 'Hospitality', to: ROUTES.portfolio },
      { label: 'Commercial', to: ROUTES.portfolio },
    ],
  },
] as const;

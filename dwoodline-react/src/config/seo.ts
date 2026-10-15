/**
 * Search and sharing information for every page: the title, description and
 * canonical URL that Google and link previews use. This file is plain data and
 * string builders (no browser or React code) so the build can also read it to
 * write a ready-made HTML file per page, which crawlers that do not run
 * JavaScript can read directly.
 */
import { normalizePath } from './routes';

export const SITE_URL = 'https://dwoodline.com';
export const SITE_NAME = 'D Woodline';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_IMAGE_ALT = 'D Woodline logo on a warm tan background';

export interface PageSeo {
  path: string;
  title: string;
  description: string;
  /** Main heading, repeated in the no-JavaScript summary. */
  heading: string;
  /** Short plain-text summary for crawlers that do not run JavaScript. */
  summary: string;
  /** Relative importance in the sitemap (0 to 1). */
  priority: number;
}

export const PAGES: readonly PageSeo[] = [
  {
    path: '/',
    title: 'D Woodline | Architectural Woodwork & Millwork in Lebanon',
    description:
      'D Woodline creates high-end architectural woodwork and interiors in Lebanon, combining classical craft with modern precision. Family-run since 1955.',
    heading: 'D Woodline: architectural woodwork since 1955',
    summary:
      'D Woodline is a family-run architectural woodwork company in Lebanon. We combine classical woodworking craft with modern precision to make high-end interiors, working with architects and private clients.',
    priority: 1,
  },
  {
    path: '/heritage',
    title: 'About D Woodline | Family Woodworkers Since 1955',
    description:
      'Founded in 1955 and led today by the third generation, D Woodline merges classical woodworking with advanced manufacturing for elegant, functional interiors.',
    heading: 'Architectural precision, three generations of craft',
    summary:
      'Established in 1955, D Woodline was founded to create exceptional architectural woodwork. Led today by the third generation of the family, we balance classical woodworking techniques with advanced manufacturing technology, using only the finest materials.',
    priority: 0.8,
  },
  {
    path: '/expertise',
    title: 'Services | Shop Drawings, Veneer & Concealed Hardware',
    description:
      'From BIM shop drawings and custom veneer mapping to concealed hardware and precise installation, D Woodline delivers architectural millwork end to end.',
    heading: 'Architectural Millwork Shop Drawings',
    summary:
      'Our services cover architectural millwork shop drawings in CAD and BIM, custom veneer mapping and sequence control, concealed hardware and integrated lighting, and precision installation.',
    priority: 0.9,
  },
  {
    path: '/portfolio',
    title: 'Projects | Residential, Hospitality & Commercial Woodwork',
    description:
      'Selected residential, hospitality and commercial woodwork by D Woodline, made with precision and the finest materials.',
    heading: 'Architectural narratives: selected projects',
    summary:
      'A selection of D Woodline projects across residential, hospitality and commercial interiors.',
    priority: 0.8,
  },
  {
    path: '/inquiry',
    title: 'Contact D Woodline | Halat Industrial Area, Lebanon',
    description:
      'Tell us about your project. Contact D Woodline by form, phone, WhatsApp or email, or visit the studio in Halat Industrial Area, Qartaba Main Road.',
    heading: 'Tell us about your project',
    summary:
      'Contact D Woodline: info@dwoodline.com, +961 79 034 563 (also on WhatsApp). Studio at Halat Industrial Area, Qartaba Main Road, Lebanon. Open Monday to Friday, 08:00 to 17:30.',
    priority: 0.9,
  },
];

/** Public URL of a page. Sub-pages end in a slash because the host serves them as folders. */
export function pageUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}

/** Finds a page from a pathname, ignoring any trailing slash. */
export function findPage(pathname: string): PageSeo | undefined {
  const clean = normalizePath(pathname);
  return PAGES.find((page) => page.path === clean);
}

const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const HEAD_START = '<!--seo:start-->';
export const HEAD_END = '<!--seo:end-->';
export const NOSCRIPT_MARK = '<!--seo:noscript-->';

/** The head tags that differ per page, wrapped in markers so the build can swap them. */
export function headBlock(page: PageSeo): string {
  const t = escapeHtml(page.title);
  const d = escapeHtml(page.description);
  const url = pageUrl(page.path);
  return [
    HEAD_START,
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${OG_IMAGE_ALT}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    HEAD_END,
  ].join('\n    ');
}

/** Plain-text summary for crawlers that do not run JavaScript. */
export function noscriptBlock(page: PageSeo): string {
  return `<noscript><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.summary)}</p></noscript>`;
}

/** The sitemap file, one entry per page (no lastmod: it is only useful when accurate per page). */
export function sitemapXml(): string {
  const urls = PAGES.map(
    (page) =>
      `  <url>\n    <loc>${pageUrl(page.path)}</loc>\n    <priority>${page.priority.toFixed(1)}</priority>\n  </url>`,
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

import { OG_IMAGE, PAGES, findPage, pageUrl } from '@/config/seo';

function setMeta(selector: string, create: () => HTMLElement, attr: string, value: string): void {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

const metaByName = (name: string) => ({
  selector: `meta[name="${name}"]`,
  create: () => {
    const el = document.createElement('meta');
    el.setAttribute('name', name);
    return el;
  },
});

const metaByProperty = (property: string) => ({
  selector: `meta[property="${property}"]`,
  create: () => {
    const el = document.createElement('meta');
    el.setAttribute('property', property);
    return el;
  },
});

/**
 * Keeps the tab title, description, canonical link and share tags in step with
 * the current page when visitors move around the site without a full reload.
 * (A fresh load gets the same values from the HTML file written at build time.)
 */
export function applyPageMeta(pathname: string): void {
  // Unknown routes are redirected to the home page, so fall back to its details.
  const page = findPage(pathname) ?? PAGES[0];
  const url = pageUrl(page.path);

  document.title = page.title;
  const description = metaByName('description');
  setMeta(description.selector, description.create, 'content', page.description);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = url;

  const tags: Array<[ReturnType<typeof metaByProperty>, string]> = [
    [metaByProperty('og:title'), page.title],
    [metaByProperty('og:description'), page.description],
    [metaByProperty('og:url'), url],
    [metaByProperty('og:image'), OG_IMAGE],
    [metaByName('twitter:title'), page.title],
    [metaByName('twitter:description'), page.description],
    [metaByName('twitter:image'), OG_IMAGE],
  ];
  tags.forEach(([tag, value]) => setMeta(tag.selector, tag.create, 'content', value));
}

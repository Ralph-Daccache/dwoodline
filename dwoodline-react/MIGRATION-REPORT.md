# dwoodline — React Migration Report

Static HTML/CSS/JS → **React 18 + Vite 5 + TypeScript + React Router 6 + Tailwind 3**.
The existing design was treated as final and ported pixel-for-pixel; no restyling.

## Routes created (React Router)

| Route        | Page component   | Legacy file        | Nav label |
| ------------ | ---------------- | ------------------ | --------- |
| `/`          | `HomePage`       | `01-hero.html`     | Home      |
| `/heritage`  | `HeritagePage`   | `02-heritage.html` | About     |
| `/expertise` | `ExpertisePage`  | `03-expertise.html`| Services  |
| `/portfolio` | `PortfolioPage`  | `04-portfolio.html`| Projects  |
| `/inquiry`   | `InquiryPage`    | `05-inquiry.html`  | Contact   |
| `*`          | → redirect `/`   | —                  | —         |

`basename` is `import.meta.env.BASE_URL`, so a GitHub Pages sub-path deploy works by
setting `VITE_BASE_PATH` (see `.env.example`).

## Token system

- **`tailwind.config.js`** — the primary token source, ported verbatim from the inline
  `tailwind.config` every page loaded via the Tailwind Play CDN: 40+ color tokens, 7 spacing
  tokens (`stack-sm/md/lg`, `gutter`, `margin-page`, `section-gap`, `unit`), 7 `fontSize`
  tokens, and the radius scale. Plugins: `@tailwindcss/forms`, `@tailwindcss/container-queries`
  (both were loaded by the CDN). Every utility class in the markup was copied unchanged.
- **`src/styles/tokens.css`** — CSS custom properties mirroring those values, plus the few raw
  literals the original `<style>` blocks used that were not Tailwind tokens (brand neutrals
  `#1a1a1a`/`#f5f5f7`, circle border `#6b4e31`, nav height). Consumed by the hand-written CSS.
- **`src/styles/global.css`** — Tailwind layers + the per-page `<style>` blocks, scoped under
  `[data-page="…"]` (set on `<body>` by the layout). Scoping is required because the original
  pages define **conflicting** rules for the same class names (`.progress-dot`, `.snap-target`
  differ between Home and Expertise/Portfolio). A single scoped global stylesheet preserves the
  original cascade far more faithfully than CSS Modules would.

## Services & config (no fetch/data logic in components)

- `services/inquiryService.ts` — `submitInquiry()`. Reproduces the original validate → confirm →
  reset behavior when no endpoint is set; POSTs to `VITE_INQUIRY_ENDPOINT` when provided.
- `services/projectsService.ts` — `getProjectGallery()`, the portfolio gallery image sets.
- `config/routes.ts` (paths + nav model), `config/site.ts` (brand/footer/social), `config/forms.ts`,
  `config/analytics.ts` — all env values read from `.env` (never hardcoded).

## Behavior (JS → hooks)

| Hook                  | Replaces                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `useMobileMenu`       | Per-page hamburger overlay IIFE                                     |
| `useHtmlScrollSnap`   | Per-page `<html>` `scroll-snap-type` (+ mobile media-query classes) |
| `useHomeScroll`       | Home IntersectionObserver reveal + hero progress dots              |
| `useExpertiseScroll`  | Expertise reveal, dots, parallax, circle state machine, wheel/touch/key nav, virtual-footer |
| `useSectionScroll`    | Portfolio desktop wheel/touch/key section snap                     |
| `useCarousel`         | Portfolio carousel drag/momentum, prev/next, dots                  |

Components: `MaterialIcon`, `SocialLinks`, `Carousel`, `GalleryModal`, `InquiryForm`.
Layout shell: `Nav`, `MobileMenu`, `Footer`, `SiteLayout` (owns nav/menu/footer, `data-page`,
close-menu-on-nav, scroll-to-top-on-nav).

## Assets

Zero local assets migrated: all images/video are remote URLs (picsum / unsplash / googleusercontent
/ pexels) preserved verbatim; fonts load from Google Fonts via `<link>` in `index.html` (superset of
every weight the pages used). `public/` is intentionally empty.

## Validation (all green)

- `tsc --noEmit` — **0 errors**, no `any`.
- `eslint . --max-warnings 0` — **clean**.
- `prettier --check .` — **clean**.
- `vite build` — **succeeds** (60 modules; 223 kB JS / 44 kB CSS).
- Visual walkthrough of all 5 routes in a browser against the originals — structure, routing,
  nav active states, footer, gallery modal, and the inquiry form all match; **no console errors**.

> Note: dependencies must be installed on a **local disk**, not the Google Drive folder — npm
> cannot reliably write `node_modules` onto Drive File Stream (EBADF/EPERM). Build was validated
> in a local working copy; the source in this folder is canonical.

## Behavior differences from the raw HTML (intentional, flagged)

1. **`smooth-scroll.js` was not ported.** On the live 02-heritage and 05-inquiry pages that script
   references `Lenis`, `gsap`, and `ScrollTrigger`, **none of which are loaded** — so it throws
   immediately and its parallax/fade/stagger animations never run. Faithful replication = those
   pages have no scroll animation (only the mobile menu / inquiry form run). Not "fixed" by adding
   GSAP, since that would introduce animation the current site does not have.
2. **Projects page heading font (resolved → Noto Serif).** 04-portfolio's config had `"notoSerif"`
   (no space) where every other page has `"Noto Serif"`. `notoSerif` does not resolve to the loaded
   "Noto Serif" family — it falls back to the browser default serif (measured identical to Times),
   so the original Projects headings render in Times, inconsistent with the rest of the site. Per
   user decision, the port uses **"Noto Serif"** (design intent / site-consistent) via the unified
   `tailwind.config.js`. This is the one intentional divergence from the live site's rendering.

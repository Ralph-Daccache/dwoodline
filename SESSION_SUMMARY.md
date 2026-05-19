# Dwoodline Project Session Summary

**Project**: D. Woodline - Architectural Heritage Website
**Repository**: https://github.com/Ralph-Daccache/dwoodline
**Live URL**: https://ralph-daccache.github.io/dwoodline/

---

## CRITICAL DEPLOYMENT RULES

1. **Always push to BOTH main AND gh-pages**: `git push origin main && git push origin main:gh-pages`
2. **GitHub Pages deploys from gh-pages branch** — NOT main
3. **The GitHub Actions workflow is DISABLED** (it was failing) — manual push to gh-pages only
4. **Always update BOTH files**: root-level AND `dwoodline-project/` folder
5. **Hard refresh required** after deploy: Ctrl+Shift+R
6. **NEVER touch root `index.html`** — that is the d.kitchen project

---

## Project Structure

### File Locations
| Page | Root File | dwoodline-project File |
|------|-----------|----------------------|
| Home | `01-hero.html` | `dwoodline-project/01-hero.html` |
| About | `02-heritage.html` | `dwoodline-project/02-heritage.html` |
| Services | `03-expertise.html` | `dwoodline-project/03-expertise.html` |
| Projects | `04-portfolio.html` | `dwoodline-project/04-portfolio.html` |
| Contact | `05-inquiry.html` | `dwoodline-project/05-inquiry.html` |

- **Root `index.html`** = d.kitchen project — DO NOT TOUCH
- **GitHub Pages serves from**: gh-pages branch (NOT main)

---

## Design Tokens
- **Primary**: #5D5E60 | **Secondary**: #705B3F | **Surface**: #F5F5F7 | **On-background**: #1A1A1A
- **Typography**: Noto Serif (headlines), Inter (body)
- **Spacing**: `section-gap: 160px`, `stack-lg: 48px`, `stack-md: 24px`, `gutter: 24px`
- **Page margin**: 80px horizontal padding
- **Roundness**: 0px (sharp corners)

---

## Unified Navigation Header (same on ALL pages, active link differs)

```html
<nav class="fixed top-0 w-full z-50 border-b border-[#1A1A1A]/10 dark:border-[#F5F5F7]/10 bg-[#F5F5F7]/80 backdrop-blur-md dark:bg-[#1A1A1A]/80 flex justify-between items-center px-[80px] py-8">
  <div class="text-2xl font-light tracking-[0.3em] uppercase text-[#1A1A1A] dark:text-[#F5F5F7]">dwoodline</div>
  <div class="hidden md:flex items-center gap-stack-lg">
    <!-- Active link class: text-[#1A1A1A] dark:text-[#F5F5F7] border-b border-[#1A1A1A] dark:border-[#F5F5F7] pb-1 -->
    <!-- Inactive link class: text-[#1A1A1A]/50 dark:text-[#F5F5F7]/50 hover:text-[#1A1A1A] dark:hover:text-[#F5F5F7] -->
    <a class="font-['Noto_Serif'] text-sm tracking-[0.2em] uppercase ... transition-all duration-500" href="01-hero.html">Home</a>
    <a href="02-heritage.html">About</a>
    <a href="03-expertise.html">Services</a>
    <a href="04-portfolio.html">Projects</a>
    <a href="05-inquiry.html">Contact</a>
  </div>
  <div class="md:hidden">
    <span class="material-symbols-outlined text-primary" data-icon="menu">menu</span>
  </div>
</nav>
```

- Header height: ~80px (py-8 = 32px top+bottom + text)
- Home link ALWAYS points to `01-hero.html` — NEVER `index.html`
- No search icon, no extra icons on mobile

---

## Unified Footer (same on ALL pages)

3-column layout with brand block on left + bottom copyright bar:

```
[Brand block]              STUDIO        WORK           CONNECT
dwoodline                  ──────        ──────         ──────
Architectural Woodwork     Home          All Projects   Start a Project
Since 1955                 Heritage      Residential    [ig] Instagram
                           Services      Hospitality    [wa] WhatsApp
                           Portfolio     Commercial
                           Inquiry

──────────────────────────────────────────────────────────────────
© 1955 dwoodline. Architectural Precision. All rights reserved.   Lebanon
```

**Footer HTML structure:**
```html
<footer class="w-full bg-[#1A1A1A] dark:bg-[#0D0D0D] border-t border-[#F5F5F7]/10">
  <div class="px-[80px] pt-16 pb-12 flex flex-col lg:flex-row gap-16 justify-between">
    <!-- Brand block: logo + tagline -->
    <!-- 3 columns: Studio | Work | Connect -->
    <!-- Column headers have: pb-3 border-b border-[#F5F5F7]/10 -->
    <!-- Links: text-[#F5F5F7]/40 hover:text-[#F5F5F7] -->
    <!-- Social links include SVG icons inline -->
  </div>
  <!-- Bottom bar -->
  <div class="px-[80px] py-5 border-t border-[#F5F5F7]/5 flex flex-col md:flex-row justify-between items-center gap-2">
    <p>© 1955 dwoodline. Architectural Precision. All rights reserved.</p>
    <p>Lebanon</p>
  </div>
</footer>
```

**Social links:**
- Instagram: `https://instagram.com/dwoodline_sal/`
- WhatsApp: `https://wa.me/96179034563`

---

## 04-portfolio.html — Current State

### Section Structure
```
<main>
  <!-- Hero Section -->
  <section class="px-[80px] snap-target pt-[160px] pb-[80px]">
    Portfolio — 2024 label + "Architectural Narratives" h1
  </section>

  <!-- RESIDENTIAL SECTION -->
  <section class="snap-target pt-[80px] pb-[40px]">
    <div class="px-[80px] mb-8"><h2>Residential</h2></div>
    <div class="relative w-full group/carousel" data-carousel-id="residential">
      <div class="w-full overflow-x-auto no-scrollbar flex h-[70vh]">
        <!-- 2 project articles: Obsidian Penthouse, Amanita Sky Suites -->
      </div>
      <!-- prev/next buttons, dots -->
    </div>
  </section>

  <!-- HOSPITALITY SECTION (same structure) -->
  <!-- COMMERCIAL SECTION (same structure) -->

  <!-- Footer -->
  <!-- Gallery Modal (OUTSIDE footer tag) -->
</main>
```

### Important Rules for portfolio.html
- Carousel height is `h-[70vh]` — **DO NOT change to `flex-1`** (breaks carousel, images disappear)
- Gallery modal `<div id="galleryModal">` must stay **OUTSIDE** `</footer>` tag
- Placeholder images use `picsum.photos` — real photos will come later via Hostinger
- No upload button in gallery (user will manage files server-side)

### Centering Status (unresolved)
- User wants each section (title + carousel) centered in viewport per scroll
- 8+ approaches tried, all failed for various reasons
- Current state: `pt-[80px] pb-[40px]` — simple padding, not perfect but functional
- **DO NOT touch carousel height** when attempting future fixes

---

## 03-expertise.html — Current State (Stitch Integration Complete)

Full Stitch design integrated (Project 1905448331726766389, Screen c30a057fb8fc4e228e66e701b69340cd).

### Section Structure
- **#ch-1**: SVG live drafting animation (`.drawing-path` stroke-dashoffset)
- **#ch-2**: Veneer mask reveal (`.veneer-mask` mask-image transition) + parallax background
- **#ch-3**: Hardware exploded view (`.hardware-component`, `.hardware-left`, `.hardware-right` animations)
- **#cta-end**: CTA with `<a>` tags → 05-inquiry.html and 04-portfolio.html. `flex-col` layout.

### Key Architecture Decisions
- `html { scroll-snap-type: y mandatory }` (NOT on `<main>` snap-container — that's Stitch's approach, incompatible with d.kitchen script)
- IntersectionObserver: `root: null` (viewport, NOT `.snap-container`)
- Parallax: listens on `window` scroll (NOT snap-container scroll)
- Full d.kitchen script inline (wheel/touch/keyboard, targets `.snap-section`)
- Dynamic nav color-change JS **removed** (incompatible with unified nav)
- Side progress dots: fixed right-10, `.progress-dot` with `data-target` attributes

### Broken Images Fixed (Unsplash)
- Ch-2 BG: `photo-1516455590571-18256e5bb9ff` (wood workshop)
- Ch-2 veneer: `photo-1598928636135-d146006ff4be` (wood grain)
- Ch-3 hardware: `photo-1504328345606-18bbc8c9d7d1` (hardware/tools)

### Other Fixes Applied
- Grain overlay CSS noise: inline SVG data URI (replaced broken aida-public URL)
- Footer: outside `</main>`, never pinned inside section
- Legal/Privacy/Press links removed from cta-end (Stitch artifact)

---

## Scroll Behavior

- **01-hero.html**: Uses Intersection Observer + custom scroll indicator (dots). No d.kitchen script.
- **02-heritage.html**: Uses `<script src="js/smooth-scroll.js">` — d.kitchen script in js/ folder
- **03-expertise.html**: Has inline d.kitchen scroll script targeting `.snap-section`
- **04-portfolio.html**: Has inline d.kitchen scroll script targeting `.snap-target`
- **05-inquiry.html**: Uses `<script src="js/smooth-scroll.js">`

---

## Commit History (Recent)

| Commit | Description |
|--------|-------------|
| (pending) | Integrate Stitch design into 03-expertise.html with unified nav/footer |
| 603980c | Redesign footer: 3-column layout with brand block and copyright bar |
| ca3dcad | Unify nav and footer across all 5 pages |
| e2784d1 | Remove upload button, add placeholder images to gallery |
| 47bf1cc | Revert section centering - use simple padding instead of height/flex approach |
| 8303248 | Revert carousel height back to h-[70vh] |
| fd3ee80 | Fix section layout - carousel fills remaining height (BROKE CAROUSEL) |
| 26ddb68 | Fix viewport centering - account for 80px header with calc(100vh-80px) sections |
| e3551eb | Fix footer - move gallery modal outside, match about page layout |
| 46e0129 | Disable automatic workflow trigger |

---

## Issues & Solutions Log

### Deployment Issues
- **GitHub Actions workflow failing** → Disabled auto-trigger, deploy manually via `git push origin main:gh-pages`
- **gh-pages branch out of sync with main** → Use `git push -f origin main:gh-pages`
- **Changes not showing** → Hard refresh (Ctrl+Shift+R), or check if gh-pages has latest commit
- **01-hero.html 404** → File was missing from root; restored from dwoodline-project copy

### Section Centering Attempts (all partially failed — DO NOT RETRY without reading this)
1. `min-h-screen flex items-center justify-center` → Title cut off by header
2. `py-section-gap` → Too much white space
3. `pb-section-gap` on carousel → Too much bottom space
4. `pb-stack-lg` on carousel → Still too much
5. `min-h-screen flex flex-col justify-center` → Title still cut off
6. `h-[calc(100vh-80px)] flex flex-col justify-center` → Title at very top, white gap at bottom
7. `h-[calc(100vh-80px)] flex flex-col pt-10 pb-4` + carousel `flex-1` → **BROKE CAROUSEL** (images disappeared — flex-1 on carousel removes defined height that h-full children need)
8. Current: `pt-[80px] pb-[40px]` → Simple padding, not perfect, user accepted

### Footer Issues Fixed
- Gallery modal was nested INSIDE `<footer>` tag on 04-portfolio.html — broke layout. Fixed: modal moved outside `</footer>`
- 03-expertise.html had footer pinned INSIDE last snap-section — wrong. Fixed: footer moved outside `</main>`
- 02-heritage.html nav had search/menu icons and linked Home to `index.html` — fixed to unified nav
- 05-inquiry.html nav used `gap-x-12` and linked Home to `index.html` — fixed to unified nav

---

## Next Steps / Pending

1. **Section centering** still pending — user wants title + carousel centered per viewport scroll on 04-portfolio.html
   - Next approach to try: `<main class="pt-[80px]">` + `<section class="snap-target h-[calc(100vh-80px)] flex flex-col justify-between py-8">`
   - `justify-between` would push title to top and carousel to bottom — cleaner approach
2. **Real photos** — User will connect Hostinger hosting later and replace picsum/Unsplash placeholders
3. **Mobile menu** — hamburger icon exists on all pages but no dropdown functionality implemented yet
4. **03-expertise.html** — Stitch integration complete and deployed

---

## Commands Reference

```bash
# Deploy to live site (ALWAYS run both)
git add [files] && git commit -m "message" && git push origin main && git push origin main:gh-pages

# Force sync gh-pages if out of date
git push -f origin main:gh-pages

# Check what's live
git log origin/gh-pages --oneline -3
git log origin/main --oneline -3
```

---

**Last Updated**: May 19, 2026 — Session 3: Stitch integration for 03-expertise.html complete

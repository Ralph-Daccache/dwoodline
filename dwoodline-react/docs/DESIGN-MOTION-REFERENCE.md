# Design & Motion Reference — what the root `index.html` gives us

A quick audit of the repo's root `index.html` (labelled "d.kitchen" in old notes) and what
is worth reusing in `dwoodline-react`.

## Finding: it's a dwoodline home-page variant, not a separate site

The root `index.html` is branded **dwoodline** with the same hero / feature-grid /
technical-spec sections and the same nav+footer as `01-hero.html`. Its **design system is
byte-identical** to dwoodline's (same Tailwind token config: palette, `stack-*`/`margin-page`/
`section-gap` spacing, `display-hero`/`headline-*` type scale, Noto Serif + Inter). So there is
no separate visual language to import — the layouts and tokens already match what we shipped.

## What's actually reusable: the motion layer

The root page is the **only place in the project where the luxury motion runs**, because it is
the only page that loads the libraries:

- `lenis` (smooth momentum scrolling)
- `gsap` + `ScrollTrigger` (scroll-scrubbed reveals)
- `js/smooth-scroll.js` (the setup that wires them together)

`02-heritage.html` and `05-inquiry.html` **reference** `js/smooth-scroll.js` but never load
Lenis/GSAP, so on the live site that script throws and the effects are dead. Porting the motion
layer therefore _fulfils the original intent_ for those two pages.

### The effects `smooth-scroll.js` provides

| Effect                 | Trigger                                        | Notes                                                                           |
| ---------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------- |
| Smooth momentum scroll | global                                         | Lenis `lerp 0.38`, `wheelMultiplier 0.45`, `duration 2.5`, `smoothTouch: false` |
| Image fade + zoom-in   | `img[data-parallax]`                           | scale 1.06→1, opacity 0.8→1, scrubbed                                           |
| Velocity parallax      | `img[data-parallax]`                           | translateY tied to scroll velocity                                              |
| Text fade + slide-up   | `[data-fade-in]`                               | opacity/ y, scrubbed                                                            |
| Staggered reveal       | `[data-stagger-group] > [data-stagger-item]`   | 0.25s stagger                                                                   |
| Heading reveal         | `h1,h2,h3` (unless inside `[data-no-animate]`) | fade + slide, scrubbed                                                          |
| Slow image reveal      | `[data-image-reveal] img`                      | scale 1.1→1, opacity 0→1                                                        |
| Button hover lift      | `a[href]`, `button`                            | scale 1.015 on hover                                                            |

### Small CSS niceties (already in dwoodline, noted for completeness)

`.hero-zoom` (10s background zoom on hover), `.scroll-indicator` + `.scroll-line` (animated
scroll hint), `.section-progress` dots. These already exist on the Home page port.

## Decision

- **Do not** re-theme anything — the token systems are identical.
- **Port the motion layer** as a reusable hook (`useLuxeScroll`) that reproduces
  `smooth-scroll.js` faithfully (Lenis + the GSAP/ScrollTrigger reveals + button hover), with
  proper effect cleanup and a `prefers-reduced-motion` guard.
- **Wire it on Heritage and Inquiry first** — the two pages whose original intent was to use
  `smooth-scroll.js`. Leave Home / Expertise / Portfolio on their existing scroll-snap +
  wheel-hijack behavior, which would conflict with Lenis if combined.

See `src/hooks/useLuxeScroll.ts`.

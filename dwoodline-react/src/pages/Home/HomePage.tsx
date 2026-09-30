import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { useLuxeScroll } from '@/hooks/useLuxeScroll';

const PROCESS = [
  {
    n: '01',
    title: 'Drafting',
    body: 'Every project begins with a 1:1 scale blueprint analysis to ensure structural viability.',
  },
  {
    n: '02',
    title: 'Milling',
    body: 'State-of-the-art CNC precision meets the steady hand of a master carpenter.',
  },
  {
    n: '03',
    title: 'Longevity',
    body: 'Our joinery is designed to outlast the structure it inhabits, guaranteed for decades.',
  },
] as const;

const SPECS = [
  { label: 'Precision', value: '0.01mm Tolerance' },
  { label: 'Sourcing', value: 'Certified Walnut' },
  { label: 'Finish', value: 'Matte Aluminum' },
  { label: 'Heritage', value: 'Since 1955' },
] as const;

const MARQUEE = [
  'Calacatta Marble',
  'Solid Walnut',
  'Blackened Aluminium',
  'Light Oak',
  'CNC Precision',
  'Since 1955',
] as const;

const CTA_PRIMARY =
  'inline-block bg-[#1A1A1A] text-white px-stack-lg py-4 font-technical-label uppercase tracking-widest rounded-none transition-all duration-500 hover:bg-[#705b3f] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2';
const CTA_GHOST =
  'inline-block border border-[#1A1A1A] text-[#1A1A1A] bg-white/20 backdrop-blur-sm px-stack-lg py-4 font-technical-label uppercase tracking-widest rounded-none transition-all duration-500 hover:bg-[#F5F5F7] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2';

export function HomePage() {
  const scopeRef = useRef<HTMLElement>(null);
  // Lenis smooth momentum scroll + GSAP scroll reveals (unified with Heritage/Inquiry).
  useLuxeScroll(scopeRef);

  return (
    <main ref={scopeRef} className="w-full">
      {/* Hero — video, full viewport, Lenis smooth scroll */}
      <section className="snap-target relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden py-20">
        <video
          className="absolute inset-0 z-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/3571904/3571904-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://videos.pexels.com/video-files/3571904/3571904-uhd_2560_1440_30fps.webm"
            type="video/webm"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-white/10 backdrop-contrast-75"></div>
        {/* data-no-animate: the hero is its own moment, not a scroll-reveal */}
        <div
          data-no-animate
          className="relative z-10 text-center px-6 md:px-[80px] max-w-4xl mx-auto"
        >
          <span className="font-technical-label text-technical-label uppercase tracking-[0.4em] text-on-surface-variant block mb-stack-md">
            Architectural Woodwork · Since 1955
          </span>
          <h1 className="font-display-hero text-display-hero text-on-surface tracking-[-0.04em] mix-blend-multiply">
            dwoodline
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mt-stack-md text-balance">
            Bespoke architectural woodwork, engineered to the millimetre — marble, walnut, and
            blackened aluminium.
          </p>
          <div className="mt-stack-lg flex flex-col md:flex-row items-center justify-center gap-gutter">
            <Link to={ROUTES.portfolio} className={CTA_PRIMARY}>
              View Portfolio
            </Link>
            <Link to={ROUTES.expertise} className={CTA_GHOST}>
              Our Process
            </Link>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="scroll-indicator flex flex-col items-center gap-4 text-on-surface-variant">
          <div className="w-[2px] h-16 bg-on-surface-variant/40 relative overflow-hidden rounded-full">
            <div className="scroll-line absolute top-0 left-0 w-full bg-on-surface-variant rounded-full"></div>
          </div>
          <span className="font-technical-label text-technical-label uppercase tracking-widest text-on-surface-variant font-light text-[11px]">
            Scroll
          </span>
        </div>
      </section>

      {/* Materiality — asymmetric feature */}
      <section className="snap-target px-6 md:px-[80px] bg-surface flex flex-col items-start justify-center pt-32 pb-32">
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-stack-lg max-w-2xl" data-fade-in>
            <h2 className="font-headline-lg text-headline-lg text-on-background mb-stack-sm text-balance">
              Structural minimalism meets heritage.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant text-pretty">
              Our practice is rooted in the mathematical intent of architectural blueprints —
              Calacatta marble and premium walnut, shaped into spaces that hold their authority
              quietly.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-gutter items-stretch">
            <div
              className="col-span-12 md:col-span-7 aspect-[16/9] bg-surface-container overflow-hidden group"
              data-image-reveal
            >
              <img
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9odQsBgZudrfZXPYsu9JhpTZNGzUVwjudFCK1BbpMjNEJ7CgPV1e7qcKkxFlAFSANtoepzO7i1q4TcCEp83x2cJFIahBae3Hgugk3BzjKh67cXzMHb8uJVLPjEDU3cdBJlIXcxEpqZPCAqgRJnwKJmLQ9lql9xm7Pc-UwccHxREBkcWjKySAy7V0ZEQDE42jxHARuUE0-DmJSx0jBFGxRtYwcw45UYgXN6uI3ZNY5diEIFLgUmmbcG53T1fg4uEDPuPwJwl3pdJI"
                alt="Floor-to-ceiling walnut cabinetry framing a Calacatta marble island in a minimalist bespoke kitchen."
              />
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col gap-stack-md" data-fade-in>
              <div className="text-right border-l border-outline-variant/30 pl-stack-md">
                <span className="font-headline-md text-headline-md block tabular-nums">1955</span>
                <span className="font-body-md text-sm text-on-surface-variant">
                  Founded in Michigan
                </span>
              </div>
              <div className="flex flex-col justify-between p-stack-md border border-outline-variant/10 bg-surface-container-low h-full">
                <div>
                  <span className="font-technical-label text-technical-label bg-secondary text-white px-3 py-1 mb-stack-sm inline-block">
                    Solid Walnut
                  </span>
                  <h3 className="font-headline-md text-body-lg font-bold mt-stack-sm">
                    The Heritage Library
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-stack-sm text-sm">
                    Structural black aluminum inserts supporting cantilevered oak shelving.
                  </p>
                </div>
                <div className="pt-stack-md border-t border-outline-variant/20 mt-auto">
                  <Link
                    to={ROUTES.portfolio}
                    className="font-technical-label text-technical-label uppercase tracking-widest inline-flex items-center gap-unit group text-xs transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  >
                    Explore Project
                    <MaterialIcon
                      name="arrow_forward"
                      className="text-[14px] group-hover:translate-x-2 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials marquee — kinetic accent */}
      <section
        aria-hidden="true"
        className="overflow-hidden border-y border-outline-variant/20 bg-surface py-5"
      >
        <div className="marquee-track flex w-max whitespace-nowrap font-technical-label text-technical-label uppercase tracking-[0.3em] text-on-surface-variant/50">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {MARQUEE.map((item) => (
                <span key={item} className="flex items-center">
                  <span className="px-8">{item}</span>
                  <span className="text-secondary/50">&#9670;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specification — intentional dark color-block with texture */}
      <section className="snap-target relative bg-[#1A1A1A] text-[#F5F5F7] px-6 md:px-[80px] flex items-center justify-center pt-40 pb-40 overflow-hidden">
        <img
          className="pointer-events-none absolute inset-0 z-0 w-full h-full object-cover opacity-[0.06]"
          src="https://picsum.photos/seed/dwoodline-workshop/1920/1080"
          alt=""
          aria-hidden="true"
        />
        <div className="grain-overlay pointer-events-none absolute inset-0 z-0"></div>
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div
            className="flex flex-col md:flex-row justify-between items-start gap-stack-lg"
            data-fade-in
          >
            <div className="max-w-xl">
              <span className="font-technical-label text-technical-label text-secondary-fixed-dim uppercase tracking-[0.2em]">
                Material Integrity
              </span>
              <h2 className="font-display-hero text-headline-lg mt-stack-sm leading-tight text-balance">
                Calculated elegance.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-gutter gap-y-stack-lg w-full md:w-auto">
              {SPECS.map((spec) => (
                <div key={spec.label}>
                  <p className="font-technical-label text-[10px] text-[#F5F5F7]/40 uppercase mb-unit">
                    {spec.label}
                  </p>
                  <p className="font-body-md text-body-md tabular-nums">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Numbered process — replaces the generic 3-equal-card row */}
          <div className="mt-section-gap border-t border-[#F5F5F7]/10">
            {PROCESS.map((step) => (
              <div
                key={step.n}
                className="group grid grid-cols-1 md:grid-cols-[8rem_1fr] gap-4 md:gap-12 py-10 border-b border-[#F5F5F7]/10 transition-colors duration-500 hover:bg-[#F5F5F7]/[0.03]"
                data-fade-in
              >
                <span className="font-display-hero text-5xl md:text-6xl leading-none tabular-nums text-[#F5F5F7]/20 transition-colors duration-500 group-hover:text-secondary-fixed-dim">
                  {step.n}
                </span>
                <div className="max-w-xl">
                  <h3 className="font-headline-md text-2xl mb-stack-sm">{step.title}</h3>
                  <p className="font-body-md text-body-md text-[#F5F5F7]/60 text-pretty">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

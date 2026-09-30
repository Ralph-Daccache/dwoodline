import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { useHomeScroll } from '@/hooks/useHomeScroll';
import { useSectionScroll } from '@/hooks/useSectionScroll';

const PROCESS = [
  {
    n: '01',
    title: 'Drafting',
    body: 'Every project begins with a 1:1 scale blueprint analysis to ensure structural viability before a single board is cut.',
  },
  {
    n: '02',
    title: 'Milling',
    body: 'State-of-the-art CNC precision meets the steady hand of a master carpenter — tolerances held to 0.01mm.',
  },
  {
    n: '03',
    title: 'Longevity',
    body: 'Our joinery is engineered to outlast the structure it inhabits, guaranteed for decades.',
  },
] as const;

const SPECS = [
  { label: 'Precision', value: '0.01mm Tolerance' },
  { label: 'Sourcing', value: 'Certified Walnut' },
  { label: 'Finish', value: 'Matte Aluminum' },
  { label: 'Heritage', value: 'Since 1955' },
] as const;

const CTA_PRIMARY =
  'inline-block bg-[#1A1A1A] text-white px-stack-lg py-4 font-technical-label uppercase tracking-widest rounded-none transition-all duration-500 hover:bg-[#705b3f] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2';
const CTA_GHOST =
  'inline-block border border-[#1A1A1A] text-[#1A1A1A] bg-white/20 backdrop-blur-sm px-stack-lg py-4 font-technical-label uppercase tracking-widest rounded-none transition-all duration-500 hover:bg-[#F5F5F7] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2';

/** Interactive process — click a step to switch; sliding indicator + crossfading detail. */
function ProcessSteps() {
  const [active, setActive] = useState(0);
  return (
    <div className="mt-stack-lg">
      <div className="relative grid grid-cols-3 border-t border-[#F5F5F7]/15">
        <span
          aria-hidden="true"
          className="absolute -top-px left-0 h-[2px] bg-secondary-fixed-dim transition-transform duration-500 ease-out"
          style={{ width: 'calc(100% / 3)', transform: `translateX(${active * 100}%)` }}
        />
        {PROCESS.map((step, i) => (
          <button
            key={step.n}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`text-left pt-6 pr-4 pb-2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-fixed-dim ${
              i === active ? 'text-surface-bright' : 'text-[#F5F5F7]/40 hover:text-[#F5F5F7]/70'
            }`}
          >
            <span className="font-display-hero text-4xl md:text-5xl tabular-nums leading-none">
              {step.n}
            </span>
            <span className="mt-3 block font-technical-label text-technical-label uppercase tracking-[0.2em]">
              {step.title}
            </span>
          </button>
        ))}
      </div>
      <div className="relative mt-8 min-h-[5.5rem]">
        {PROCESS.map((step, i) => (
          <p
            key={step.n}
            aria-hidden={i !== active}
            className={`font-body-lg text-body-lg max-w-2xl text-[#F5F5F7]/70 transition-all duration-500 ${
              i === active
                ? 'opacity-100 translate-y-0'
                : 'pointer-events-none absolute inset-0 opacity-0 translate-y-2'
            }`}
          >
            {step.body}
          </p>
        ))}
      </div>
    </div>
  );
}

export function HomePage() {
  // Reveal + hero progress dots, and Projects-style desktop section snap.
  useHomeScroll();
  useSectionScroll();

  return (
    <main className="w-full">
      {/* Hero — video, one full viewport */}
      <section className="snap-target relative w-full flex items-center justify-center overflow-hidden py-20">
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
        <div className="relative z-10 text-center px-6 md:px-[80px] max-w-4xl mx-auto">
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
        <div className="scroll-indicator flex flex-col items-center gap-4 text-on-surface-variant">
          <div className="w-[2px] h-16 bg-on-surface-variant/40 relative overflow-hidden rounded-full">
            <div className="scroll-line absolute top-0 left-0 w-full bg-on-surface-variant rounded-full"></div>
          </div>
          <span className="font-technical-label text-technical-label uppercase tracking-widest text-on-surface-variant font-light text-[11px]">
            Scroll
          </span>
          <div className="section-progress">
            <div className="progress-dot active"></div>
            <div className="progress-dot"></div>
            <div className="progress-dot"></div>
          </div>
        </div>
      </section>

      {/* Materiality — asymmetric feature, fits one viewport */}
      <section className="snap-target px-6 md:px-[80px] bg-surface flex flex-col justify-center pt-28 pb-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-stack-lg max-w-2xl">
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
            <div className="col-span-12 md:col-span-7 aspect-[16/9] bg-surface-container overflow-hidden group">
              <img
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9odQsBgZudrfZXPYsu9JhpTZNGzUVwjudFCK1BbpMjNEJ7CgPV1e7qcKkxFlAFSANtoepzO7i1q4TcCEp83x2cJFIahBae3Hgugk3BzjKh67cXzMHb8uJVLPjEDU3cdBJlIXcxEpqZPCAqgRJnwKJmLQ9lql9xm7Pc-UwccHxREBkcWjKySAy7V0ZEQDE42jxHARuUE0-DmJSx0jBFGxRtYwcw45UYgXN6uI3ZNY5diEIFLgUmmbcG53T1fg4uEDPuPwJwl3pdJI"
                alt="Floor-to-ceiling walnut cabinetry framing a Calacatta marble island in a minimalist bespoke kitchen."
              />
            </div>
            <div className="col-span-12 md:col-span-5 flex flex-col gap-stack-md">
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

      {/* Technical Specification — dark, textured, interactive process */}
      <section className="snap-target relative bg-[#1A1A1A] text-[#F5F5F7] px-6 md:px-[80px] flex items-center justify-center py-24 overflow-hidden">
        <img
          className="pointer-events-none absolute inset-0 z-0 w-full h-full object-cover opacity-[0.06]"
          src="https://picsum.photos/seed/dwoodline-workshop/1920/1080"
          alt=""
          aria-hidden="true"
        />
        <div className="grain-overlay pointer-events-none absolute inset-0 z-0"></div>
        <div className="relative z-10 w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-stack-lg">
            <div className="max-w-xl">
              <span className="font-technical-label text-technical-label text-secondary-fixed-dim uppercase tracking-[0.2em]">
                Material Integrity
              </span>
              <h2 className="font-display-hero text-headline-lg mt-stack-sm leading-tight text-balance">
                Calculated elegance.
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-gutter gap-y-stack-md w-full md:w-auto">
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
          <ProcessSteps />
        </div>
      </section>
    </main>
  );
}

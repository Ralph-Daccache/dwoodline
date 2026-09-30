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
    image:
      'https://images.unsplash.com/photo-1736506159893-22cca29b8018?w=1400&q=75&auto=format&fit=crop',
  },
  {
    n: '02',
    title: 'Milling',
    body: 'State-of-the-art CNC precision meets the steady hand of a master carpenter, with tolerances held to 0.01mm.',
    image:
      'https://images.unsplash.com/photo-1700973408133-b45276ec8feb?w=1400&q=75&auto=format&fit=crop',
  },
  {
    n: '03',
    title: 'Longevity',
    body: 'Our joinery is engineered to outlast the structure it inhabits, guaranteed for decades.',
    image:
      'https://images.unsplash.com/photo-1571205086863-9d186c5cb8fb?w=1400&q=75&auto=format&fit=crop',
  },
] as const;

const SPECS = [
  { label: 'Precision', value: '0.01mm Tolerance' },
  { label: 'Sourcing', value: 'Certified Walnut' },
  { label: 'Finish', value: 'Matte Aluminum' },
  { label: 'Heritage', value: 'Since 1955' },
] as const;

const RECENT = [
  {
    title: 'The Obsidian Penthouse',
    location: 'Milan, Italy',
    year: '2024',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBo9EdbdFsjsDzDV3L5NVDS5FzxmiAGo11Mzbp6B3wMhH3NuaScmGOylEAU8xKpgaSAsr0SNlE0N1XfNfaK_idLfOt0xupZimkCigAgEsiDaLVSSQrg9vshKNIxoZnF1mgb8ZjNQ-TXgOEsKMZjDAkVDQDeLRJiu35GzX_Uomrfm9qIv49Md1Nq-xR-vCB7itKISNwGno7PV2Z0M1RqmE3Wo_FvRY1I_kB-tn6YPJKWkgQ-E-XcecXxz1qi6PV7QvToOr6pZM9bSKQ',
    alt: 'The Obsidian Penthouse: Calacatta marble and charred cedar interior, Milan.',
  },
  {
    title: 'The Ritz Suites',
    location: 'Paris, France',
    year: '2024',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ9eRwwgbAKxpxfJ0NERJe8sohHkN1gbBNMtG3bwkzDL3MaSJHuyuZhYpOaJxdEYu65l8WpBfRqm466oD5gzB4VqMsAHXqwWWeU5WxPMYEsRK-MOWtQ_VVJoHLnd3g2TMMk-aiW7PbOkRhwSXPoQgtq6pkVMfJc4U4qz36FFuARV94CXsdrd7X4YyPJqKRavOJxZK_nmIvo7u-wL4ncujMarntjui04YkD8Rjp1BOWN8701UB2VXBS1JKwc1Vcf-sM4Sg4vDZT6us',
    alt: 'The Ritz Suites: silk-panelled walls and brushed brass, Paris.',
  },
  {
    title: 'Corporate Headquarters',
    location: 'Berlin, Germany',
    year: '2024',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASEMcfBX8ZALZP_1J47nIfOVsJ8uuK9OzqeTkoskiszglyBjItVcVZ5dq8pHyc2vD5NUi3X30JAMLWYtCjTCZUD_82yzKsmYc4eeUq4B7_m-_TW-zN2m8w1LIutnXYNPzWUV2Jwkn8_z57AX30bc-jOMOAcJX9GqJ8TW9SUSqVPbdpQSkJvt8ZpLZ_iDqL7Fba2S2vzb8zKnIr5SOb6rUNjbwSYwA38RW2iCxuxI_h8nc6PaDRBcb9_QP245hK4Zgbq5BS2w-5h0k',
    alt: 'Corporate Headquarters: concrete and precision-milled aluminium workspace, Berlin.',
  },
] as const;

const CTA_PRIMARY =
  'inline-block bg-[#1A1A1A] text-white px-stack-lg py-4 font-technical-label uppercase tracking-widest rounded-none transition-all duration-500 hover:bg-[#705b3f] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2';
const CTA_GHOST =
  'inline-block border border-[#1A1A1A] text-[#1A1A1A] bg-white/20 backdrop-blur-sm px-stack-lg py-4 font-technical-label uppercase tracking-widest rounded-none transition-all duration-500 hover:bg-[#F5F5F7] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2';

/** Veneer stack: click a veneer and its description unrolls left to right, led by a curl edge. */
function VeneerRolls() {
  const [active, setActive] = useState(0);
  return (
    <div className="veneer-stack mt-stack-lg">
      {PROCESS.map((step, i) => {
        const open = i === active;
        return (
          <button
            key={step.n}
            type="button"
            onClick={() => setActive(i)}
            aria-expanded={open}
            aria-label={`${step.title}. ${step.body}`}
            style={{ backgroundImage: `url(${step.image})` }}
            className={`veneer ${open ? 'veneer-open' : ''}`}
          >
            <span className="veneer-cap">
              <span className="veneer-num">{step.n}</span>
              <span className="veneer-title">{step.title}</span>
            </span>
            <span className="veneer-hint" aria-hidden="true">
              Unroll <span className="veneer-ar">&rsaquo;</span>
            </span>
            <span className="veneer-curl" aria-hidden="true" />
            <span className="veneer-desc">
              <span className="veneer-desc-p">{step.body}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function HomePage() {
  // Reveal + hero progress dots, and Projects-style desktop section snap.
  useHomeScroll();
  useSectionScroll();

  return (
    <main className="w-full">
      {/* Hero: video, one full viewport */}
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
            Bespoke architectural woodwork, engineered to the millimetre in marble, walnut, and
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

      {/* Materiality: asymmetric feature, fits one viewport */}
      <section className="snap-target px-6 md:px-[80px] bg-surface flex flex-col justify-center pt-28 pb-20">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-stack-md mb-stack-lg">
            <div className="max-w-xl">
              <span className="font-technical-label text-technical-label text-secondary uppercase tracking-[0.3em]">
                Selected Work
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-background mt-stack-sm text-balance">
                Recent projects.
              </h2>
            </div>
            <Link
              to={ROUTES.portfolio}
              className="inline-flex items-center gap-unit group font-technical-label text-technical-label uppercase tracking-widest text-on-background border-b border-on-background/30 pb-1 transition-colors hover:text-secondary hover:border-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              Explore Projects
              <MaterialIcon
                name="arrow_forward"
                className="text-[14px] group-hover:translate-x-2 transition-transform"
              />
            </Link>
          </div>
          {/* Expanding project panels: hover a panel to open it (desktop) */}
          <div className="flex flex-col md:flex-row gap-2 md:h-[52vh]">
            {RECENT.map((p, i) => (
              <Link
                key={p.title}
                to={ROUTES.portfolio}
                aria-label={`${p.title}, ${p.location}`}
                className="group relative flex-1 md:hover:flex-[2.5] h-[26vh] md:h-full overflow-hidden transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                <img
                  src={p.image}
                  alt={p.alt}
                  className="w-full h-full object-cover grayscale md:group-hover:grayscale-0 scale-105 md:group-hover:scale-100 transition-all duration-[900ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/85 via-on-background/20 to-transparent"></div>
                <span className="absolute top-stack-md right-stack-md font-display-hero text-2xl text-white/30 tabular-nums">
                  0{i + 1}
                </span>
                <div className="absolute bottom-0 left-0 p-stack-md text-white">
                  <span className="font-technical-label text-technical-label uppercase tracking-widest text-white/60 block mb-1">
                    {p.location} · {p.year}
                  </span>
                  <h3 className="font-headline-md text-xl md:text-2xl text-white whitespace-nowrap">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specification: dark, textured, interactive process */}
      <section className="snap-target wood-bg relative bg-[#1A1A1A] text-[#F5F5F7] px-6 md:px-[80px] flex items-center justify-center py-16 md:py-24 overflow-hidden">
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
          <VeneerRolls />
        </div>
      </section>
    </main>
  );
}

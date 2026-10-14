import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes';
import { MaterialIcon } from '@/components/MaterialIcon/MaterialIcon';
import { useHtmlScrollSnap } from '@/hooks/useHtmlScrollSnap';
import { useExpertiseScroll } from '@/hooks/useExpertiseScroll';
import {
  BookMatchViewer,
  DetailDrawing,
  ExplodedHinge,
  type DetailKind,
  type HingePart,
} from './ServiceVisuals';

const CIRCLE_BORDER = { border: '3px solid #6B4E31' } as const;

const DETAILS: { kind: DetailKind; label: string; side: 'left' | 'right' }[] = [
  { kind: 'endgrain', label: 'End grain growth rings', side: 'left' },
  { kind: 'dovetail', label: 'Dovetail joint', side: 'right' },
  { kind: 'profile', label: 'Moulding profile section', side: 'left' },
  { kind: 'tenon', label: 'Mortise and tenon joint', side: 'right' },
];

const TECH_POINTS: {
  icon: string;
  title: string;
  text: string;
  parts: HingePart[];
}[] = [
  {
    icon: 'precision_manufacturing',
    title: 'CNC Accuracy',
    text: 'Sub-millimeter routing for concealed hardware.',
    parts: ['door'],
  },
  {
    icon: 'bolt',
    title: 'LEED Standards',
    text: 'Integrated low-voltage lighting profiles.',
    parts: ['carcass'],
  },
  {
    icon: 'handyman',
    title: 'Installation Rigor',
    text: 'Engineered joinery designed for efficient field assembly.',
    parts: ['plate', 'fixings'],
  },
  {
    icon: 'verified_user',
    title: 'Longevity',
    text: 'Joinery designed to outlast the structure it inhabits.',
    parts: ['cup'],
  },
];

const H2_FIT =
  'font-headline-lg text-[clamp(26px,3.3vw,44px)] serif-text leading-[1.12] mb-[clamp(10px,2vh,20px)]';

export function ExpertisePage() {
  useHtmlScrollSnap('proximity');
  useExpertiseScroll();
  const [activeParts, setActiveParts] = useState<HingePart[]>([]);
  const [assembled, setAssembled] = useState(false);

  return (
    <>
      {/* Side Progress Indicator */}
      <div className="hidden md:flex fixed right-10 top-1/2 -translate-y-1/2 z-50 flex-col space-y-4 items-center">
        <div className="progress-dot" data-target="ch-1"></div>
        <div className="progress-dot" data-target="ch-2"></div>
        <div className="progress-dot" data-target="ch-3"></div>
        <div className="progress-dot" data-target="cta-end"></div>
      </div>

      <main className="w-full">
        {/* Drafting */}
        <section
          className="snap-section flex items-center justify-center bg-surface-container-lowest"
          id="ch-1"
        >
          <div className="absolute inset-0 architectural-grid"></div>
          <div className="light-beam"></div>
          <div className="max-w-6xl mx-auto px-6 md:px-[80px] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center z-10">
            <div className="reveal">
              <span className="font-technical-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-4 block reveal-stagger-1">
                Drafting
              </span>
              <h2 className="font-headline-lg text-headline-lg serif-text leading-tight mb-8 reveal-stagger-2">
                Architectural Millwork Shop Drawings
              </h2>
              <p className="font-body-lg text-on-surface-variant max-w-md mb-12 reveal-stagger-3">
                Precision drafting utilizing mid-century rigor and contemporary BIM software. We
                translate architectural intent into production-ready technical data.
              </p>
              <div className="flex space-x-8 reveal-stagger-3">
                <div className="text-left">
                  <span className="block font-headline-md text-2xl serif-text">1:10</span>
                  <span className="font-technical-label text-[9px] uppercase tracking-widest opacity-40">
                    Detail Scale
                  </span>
                </div>
                <div className="text-left">
                  <span className="block font-headline-md text-2xl serif-text">CAD/BIM</span>
                  <span className="font-technical-label text-[9px] uppercase tracking-widest opacity-40">
                    Drafting Standard
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[clamp(14px,3.2vh,36px)] w-full justify-center py-2">
              {DETAILS.map((d) => (
                <div
                  key={d.kind}
                  className={`detail-circle ${d.side === 'left' ? 'self-start ml-8' : 'self-end mr-8'}`}
                >
                  <div
                    className="w-[clamp(104px,15vh,190px)] h-[clamp(104px,15vh,190px)] rounded-full overflow-hidden"
                    style={CIRCLE_BORDER}
                  >
                    <DetailDrawing kind={d.kind} label={d.label} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Materiality: book-match viewer on real veneer photography */}
        <section
          className="snap-section flex items-center justify-center bg-surface relative overflow-hidden"
          id="ch-2"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-[80px] w-full z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-[clamp(24px,4vw,64px)] items-center">
            <div className="reveal">
              <span className="font-technical-label text-[10px] uppercase tracking-[0.3em] text-secondary mb-3 block reveal-stagger-1">
                Materiality
              </span>
              <h2 className={`${H2_FIT} reveal-stagger-2`}>
                Custom Veneer Mapping &amp; Sequence Control
              </h2>
              <p className="font-body-lg text-on-surface-variant mb-[clamp(14px,3vh,28px)] max-w-md reveal-stagger-3">
                Grain matching is not an afterthought. Our digital mapping process ensures seamless
                heritage-quality interiors through rigorous sequence control.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-[clamp(14px,2.6vh,26px)] border-t border-on-surface-variant/15 reveal-stagger-3">
                <div className="space-y-2">
                  <MaterialIcon name="layers" className="text-secondary" />
                  <h4 className="font-headline-md text-xl serif-text">Book-match Precision</h4>
                  <p className="text-caption text-on-surface-variant">
                    Symmetrical grain alignment across full-height panels.
                  </p>
                </div>
                <div className="space-y-2">
                  <MaterialIcon name="texture" className="text-secondary" />
                  <h4 className="font-headline-md text-xl serif-text">Species Curation</h4>
                  <p className="text-caption text-on-surface-variant">
                    Technical selection of walnut, oak, and exotic burrs.
                  </p>
                </div>
              </div>
            </div>
            <div className="reveal reveal-stagger-2">
              <BookMatchViewer />
            </div>
          </div>
        </section>

        {/* Technicality: exploded concealed-hinge diagram */}
        <section
          className="snap-section flex items-center justify-center bg-[#1C1B1B] text-surface-bright"
          id="ch-3"
        >
          <div className="absolute inset-0 architectural-grid opacity-20 pointer-events-none invert"></div>
          <div className="max-w-6xl mx-auto px-6 md:px-[80px] w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-[clamp(24px,4vw,56px)] items-center z-10">
            <div className="reveal">
              <span className="font-technical-label text-[10px] uppercase tracking-[0.3em] text-tertiary-fixed mb-3 block reveal-stagger-1">
                Technicality
              </span>
              <h2 className={`${H2_FIT} reveal-stagger-2`}>
                Concealed Hardware &amp;
                <br />
                Precision Installation
              </h2>
              <p className="font-body-lg text-surface-container-highest max-w-3xl mb-[clamp(12px,2.4vh,24px)] reveal-stagger-3 opacity-80">
                The details that disappear. We integrate concealed hardware and lighting into the
                woodwork so every mechanism works quietly and each piece sits flawlessly for
                decades.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 reveal-stagger-3">
                {TECH_POINTS.map((t) => (
                  <div
                    key={t.title}
                    tabIndex={0}
                    onPointerEnter={(e) => e.pointerType === 'mouse' && setActiveParts(t.parts)}
                    onPointerLeave={(e) => e.pointerType === 'mouse' && setActiveParts([])}
                    onPointerUp={(e) => {
                      if (e.pointerType === 'mouse') return;
                      setActiveParts((cur) => (cur === t.parts ? [] : t.parts));
                    }}
                    onFocus={() => setActiveParts(t.parts)}
                    onBlur={() => setActiveParts([])}
                    className="p-[clamp(12px,2vh,20px)] border border-surface-bright/10 bg-surface-bright/5 hover:bg-surface-bright/10 focus-visible:bg-surface-bright/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand transition-colors duration-500"
                  >
                    <MaterialIcon name={t.icon} className="text-tertiary-fixed text-2xl mb-1" />
                    <h5 className="font-technical-label text-[11px] uppercase tracking-[0.2em] mb-1">
                      {t.title}
                    </h5>
                    <p className="text-caption opacity-60">{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-stagger-2">
              <div className="h-[clamp(240px,46vh,420px)] w-full">
                <ExplodedHinge active={activeParts} assembled={assembled} />
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-caption opacity-50">Hover or tap a point to find its part.</p>
                <button
                  type="button"
                  aria-pressed={assembled}
                  onClick={() => setAssembled((v) => !v)}
                  className="border border-surface-bright/30 px-4 py-2 font-technical-label text-[10px] uppercase tracking-[0.2em] text-surface-bright transition-colors duration-300 hover:bg-brand hover:text-on-background"
                >
                  {assembled ? 'Explode' : 'Assemble'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Chapter 4: CTA */}
        <section
          className="snap-section flex flex-col bg-surface-container-low relative"
          id="cta-end"
        >
          <div className="flex-grow flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center px-6 md:px-[80px] reveal">
              <h2 className="font-headline-lg text-headline-lg serif-text mb-8">
                Begin the Technical Phase
              </h2>
              <p className="font-body-lg text-on-surface-variant mb-16 max-w-2xl mx-auto">
                Submit your architectural intent drawings for a comprehensive technical feasibility
                review and millwork consultation.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8">
                <Link
                  to={ROUTES.inquiry}
                  className="bg-[#1A1A1A] text-white px-12 py-6 font-technical-label uppercase tracking-[0.2em] text-[10px] transition-all duration-700 hover:tracking-[0.3em] hover:bg-black"
                >
                  Inquire Now
                </Link>
                <Link
                  to={ROUTES.portfolio}
                  className="border border-[#1A1A1A] text-[#1A1A1A] px-12 py-6 font-technical-label uppercase tracking-[0.2em] text-[10px] hover:bg-[#1A1A1A] hover:text-white transition-all duration-700"
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
